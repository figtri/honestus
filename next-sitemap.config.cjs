const SITE_URL = 'https://www.honestus.world'

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  exclude: ['/posts-sitemap.xml', '/pages-sitemap.xml', '/*', '/posts/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: '/admin/*',
      },
    ],
    additionalSitemaps: [`${SITE_URL}/pages-sitemap.xml`, `${SITE_URL}/posts-sitemap.xml`],
  },
  transform: async (config, path) => {
    return {
      loc: `${SITE_URL}${path.replace(/^\//, '')}`,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.lastmod,
      alternateRefs: config.alternateRefs ?? [],
    }
  },
  // This is a critical setting to force the correct domain in all generated files
  sourceDir: '.next',
  outDir: 'public',
  generateIndexSitemap: true,
  trailingSlash: false,
}
