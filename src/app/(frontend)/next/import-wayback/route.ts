import { createLocalReq, getPayload } from 'payload'
import config from '@payload-config'

export const maxDuration = 60

type ImportResult = {
  created: number
  skipped: number
  errors: { url: string; message: string }[]
}

function extractLinksFromIndex(html: string): string[] {
  const links = new Set<string>()
  const re = /href="([^"]+)"[^>]*>\s*(?:Read\s*More|Read More)\s*</gi
  let m: RegExpExecArray | null
  while ((m = re.exec(html))) {
    links.add(m[1] || '')
  }
  return Array.from(links)
}

function stripHtml(input: string): string {
  return input
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function extractTitle(html: string): string | null {
  const h1 = /<h1[^>]*>([\s\S]*?)<\/h1>/i.exec(html)
  if (h1) return stripHtml(h1[1] || '')
  const h2 = /<h2[^>]*>([\s\S]*?)<\/h2>/i.exec(html)
  if (h2) return stripHtml(h2[1] || '')
  return null
}

function extractDate(html: string): string | null {
  const m =
    /(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},\s+\d{4}/i.exec(
      html,
    )
  return m ? m[0] : null
}

function extractParagraphs(html: string): string[] {
  const paras: string[] = []
  const re = /<p[^>]*>([\s\S]*?)<\/p>/gi
  let m: RegExpExecArray | null
  while ((m = re.exec(html))) {
    const text = stripHtml(m[1] || '')
    if (text && text.length > 2) paras.push(text)
  }
  return paras.slice(0, 100)
}

function toLexical(paragraphs: string[]) {
  return {
    root: {
      type: 'root',
      version: 1,
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      children: paragraphs.map((t) => ({
        type: 'paragraph',
        version: 1,
        direction: 'ltr' as const,
        format: '' as const,
        indent: 0,
        children: [{ type: 'text', text: t, version: 1 }],
      })),
    },
  }
}

function slugFromUrl(url: string): string {
  try {
    const u = new URL(url.replace(/^https?:\/\//, 'https://'))
    const parts = u.pathname.split('/').filter(Boolean)
    return parts[parts.length - 1] || `post-${Date.now()}`
  } catch {
    const parts = url.split('/').filter(Boolean)
    return parts[parts.length - 1] || `post-${Date.now()}`
  }
}

export async function POST(req: Request): Promise<Response> {
  const { url = 'https://web.archive.org/web/20241119233622/https://honestus.world/blog/' } =
    (await req.json().catch(() => ({}))) as { url?: string }

  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: await (global as any).headers?.() })
  if (!user && process.env.NODE_ENV !== 'development') {
    return new Response('Action forbidden.', { status: 403 })
  }

  const payloadReq = await createLocalReq({ user: user as any }, payload)

  const result: ImportResult = { created: 0, skipped: 0, errors: [] }

  try {
    const indexRes = await fetch(url)
    const indexHtml = await indexRes.text()
    const links = extractLinksFromIndex(indexHtml)

    for (const link of links) {
      try {
        const res = await fetch(link)
        const html = await res.text()
        const title = extractTitle(html)
        if (!title) {
          result.skipped++
          continue
        }
        const dateStr = extractDate(html)
        const paragraphs = extractParagraphs(html)
        const content = toLexical(paragraphs)
        const slug = slugFromUrl(link)

        // If post with slug exists, skip
        const existing = await payload.find({
          collection: 'posts',
          where: { slug: { equals: slug } },
          limit: 1,
          req: payloadReq,
        })
        if (existing.totalDocs > 0) {
          result.skipped++
          continue
        }

        await payload.create({
          collection: 'posts',
          data: {
            title,
            slug,
            content,
            _status: 'published',
            publishedAt: dateStr ? new Date(dateStr).toISOString() : new Date().toISOString(),
          },
          req: payloadReq,
        })
        result.created++
      } catch (e: any) {
        result.errors.push({ url: link, message: e?.message || 'error' })
      }
    }

    return Response.json(result)
  } catch (e: any) {
    return new Response(`Failed: ${e?.message || e}`, { status: 500 })
  }
}
