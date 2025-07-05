import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { getEmailSettings } from '@/utilities/getEmailSettings'

// Helper function to validate and format URLs
const isValidUrl = (url: string): boolean => {
  if (!url) return true // Empty URLs are considered valid (optional)

  try {
    new URL(url)
    return true
  } catch (_e) {
    return false
  }
}

// LinkedIn-specific URL validator
const isValidLinkedInUrl = (url: string): boolean => {
  if (!url) return true // Empty is valid

  try {
    // First check if it's a valid URL
    new URL(url)

    // Then check if it follows LinkedIn profile pattern
    const linkedinPattern = /^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/i
    return linkedinPattern.test(url)
  } catch (_e) {
    return false
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = ['name', 'email', 'reason', 'description']
    for (const field of requiredFields) {
      if (!body[field] || body[field].trim() === '') {
        console.log(`Validation error: ${field} is required`)
        return NextResponse.json({ error: `The ${field} field is required` }, { status: 400 })
      }
    }

    // Validate URLs
    if (body.websiteUrl && !isValidUrl(body.websiteUrl)) {
      return NextResponse.json({ error: 'Invalid website URL format' }, { status: 400 })
    }

    if (body.linkedinUrl && !isValidLinkedInUrl(body.linkedinUrl)) {
      return NextResponse.json(
        {
          error:
            'Invalid LinkedIn profile URL format. Please use format: https://www.linkedin.com/in/username/',
        },
        { status: 400 },
      )
    }

    console.log('Processing feature request submission:', {
      name: body.name,
      email: body.email,
      reason: body.reason.substring(0, 30) + (body.reason.length > 30 ? '...' : ''),
    })

    try {
      // Initialize Payload CMS
      const config = await configPromise
      const payload = await getPayload({ config })

      // Get email settings from dashboard
      const emailSettings = await getEmailSettings()

      // Create a new feature request in the CMS
      const featureRequest = await payload.create({
        collection: 'feature-requests',
        data: {
          name: body.name,
          email: body.email,
          linkedinUrl: body.linkedinUrl || undefined,
          websiteUrl: body.websiteUrl || undefined,
          reason: body.reason,
          description: body.description,
          status: 'new',
          createdAt: new Date().toISOString(),
        },
      })

      console.log('Feature request successfully created with ID:', featureRequest.id)

      // Send email notification to admin (only if enabled)
      if (emailSettings.featureRequestsEnabled) {
        try {
          const emailHtml = `
<!doctype html>
<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
  <head>
    <title></title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&amp;display=swap" rel="stylesheet" type="text/css" />
    <link href="https://fonts.googleapis.com/css2?family=Alfa+Slab+One&amp;display=swap" rel="stylesheet" type="text/css" />
    <style>
      * { box-sizing: border-box; }
      body { margin: 0; padding: 0; }
      a[x-apple-data-detectors] { color: inherit !important; text-decoration: inherit !important; }
      #MessageViewBody a { color: inherit; text-decoration: none; }
      p { line-height: inherit; }
      .desktop_hide, .desktop_hide table { mso-hide: all; display: none; max-height: 0px; overflow: hidden; }
      .image_block img + div { display: none; }
      sup, sub { font-size: 75%; line-height: 0; }
      @media (max-width: 620px) {
        .desktop_hide table.icons-inner { display: inline-block !important; }
        .icons-inner { text-align: center; }
        .icons-inner td { margin: 0 auto; }
        .image_block div.fullWidth { max-width: 100% !important; }
        .mobile_hide { display: none; }
        .row-content { width: 100% !important; }
        .stack .column { width: 100%; display: block; }
        .mobile_hide { min-height: 0; max-height: 0; max-width: 0; overflow: hidden; font-size: 0px; }
        .desktop_hide, .desktop_hide table { display: table !important; max-height: none !important; }
        .row-2 .column-1 .block-1.heading_block h1 { font-size: 40px !important; }
        .row-2 .column-1 .block-2.image_block td.pad { padding: 0 !important; }
        .row-3 .column-1 .block-1.heading_block h3 { text-align: center !important; font-size: 16px !important; }
        .row-3 .column-1 .block-1.heading_block td.pad { padding: 20px !important; }
        .row-3 .column-1 .block-2.paragraph_block td.pad > div { font-size: 16px !important; }
        .row-4 .column-1 .block-2.paragraph_block td.pad > div { font-size: 14px !important; }
        .row-4 .column-1 .block-2.paragraph_block td.pad { padding: 20px 0 !important; }
        .row-1 .column-1 { padding: 25px 0 !important; }
        .row-2 .column-1 { padding: 30px 0 0 !important; }
        .row-3 .column-1 { padding: 30px 25px 35px !important; }
        .row-4 .column-1 { padding: 60px 20px !important; }
      }
    </style>
  </head>
  <body class="body" style="margin: 0; background-color: #291f2e; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
    <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #291f2e">
      <tbody>
        <tr>
          <td>
            <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt">
              <tbody>
                <tr>
                  <td>
                    <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #291f2e; color: #000000; width: 600px; margin: 0 auto;" width="600">
                      <tbody>
                        <tr>
                          <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 25px; padding-top: 25px; vertical-align: top;">
                            <table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt">
                              <tr>
                                <td class="pad" style="width: 100%; padding-right: 0px; padding-left: 0px">
                                  <div class="alignment" align="center">
                                    <div style="max-width: 120px">
                                      <img src="https://29f792a828.imgdist.com/pub/bfra/mnp82y6j/yly/3vg/6sq/logo_white.png" style="display: block; height: auto; border: 0; width: 100%" width="120" alt="Honestus Logo" title="Honestus Logo" height="auto" />
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt">
              <tbody>
                <tr>
                  <td>
                    <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f8f9f4; border-radius: 0; color: #000000; width: 600px; margin: 0 auto;" width="600">
                      <tbody>
                        <tr>
                          <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top;">
                            <table class="heading_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt">
                              <tr>
                                <td class="pad" style="text-align: center; width: 100%">
                                  <h1 style="margin: 0; color: #01332d; direction: ltr; font-family: 'Alfa Slab One', 'Arial'; font-size: 85px; font-weight: 400; letter-spacing: normal; line-height: 1.2; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 102px;">
                                    <span style="word-break: break-word">New Request!</span>
                                  </h1>
                                </td>
                              </tr>
                            </table>
                            <table class="image_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt">
                              <tr>
                                <td class="pad" style="padding-top: 24px; width: 100%; padding-right: 0px; padding-left: 0px;">
                                  <div class="alignment" align="center">
                                    <div class="fullWidth" style="max-width: 600px">
                                      <img src="https://29f792a828.imgdist.com/pub/bfra/mnp82y6j/zkf/8y2/hs9/brooke-cagle-oTweoxMKdkA-unsplash.jpg" style="display: block; height: auto; border: 0; width: 100%" width="600" alt="Feature Request" title="Feature Request" height="auto" />
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt">
              <tbody>
                <tr>
                  <td>
                    <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f8f9f4; border-radius: 0; color: #000000; width: 600px; margin: 0 auto;" width="600">
                      <tbody>
                        <tr>
                          <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 60px; padding-left: 50px; padding-right: 50px; padding-top: 48px; vertical-align: top;">
                            <table class="heading_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt">
                              <tr>
                                <td class="pad" style="padding-bottom: 20px; text-align: center; width: 100%">
                                  <h3 style="margin: 0; color: #150811; direction: ltr; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 14px; font-weight: 400; letter-spacing: 2px; line-height: 1.2; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 17px;">
                                    <span style="word-break: break-word">FEATURE REQUEST</span>
                                  </h3>
                                </td>
                              </tr>
                            </table>
                            <table class="paragraph_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                              <tr>
                                <td class="pad" style="padding-bottom: 30px; padding-top: 20px">
                                  <div style="color: #42383e; direction: ltr; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 16px; font-weight: 400; letter-spacing: 0px; line-height: 1.6; text-align: left; mso-line-height-alt: 25px;">
                                    <p style="margin: 0; margin-bottom: 16px"><strong>From:</strong> ${body.name}</p>
                                    <p style="margin: 0; margin-bottom: 16px"><strong>Email:</strong> ${body.email}</p>
                                    <p style="margin: 0; margin-bottom: 16px"><strong>Reason:</strong> ${body.reason}</p>
                                    <p style="margin: 0; margin-bottom: 16px"><strong>Description:</strong></p>
                                    <p style="margin: 0; margin-bottom: 16px; background-color: #ffffff; padding: 15px; border-radius: 8px; border-left: 4px solid #01332d;">${body.description}</p>
                                    ${body.websiteUrl ? `<p style="margin: 0; margin-bottom: 16px"><strong>Website:</strong> <a href="${body.websiteUrl}" style="color: #01332d; text-decoration: none;">${body.websiteUrl}</a></p>` : ''}
                                    ${body.linkedinUrl ? `<p style="margin: 0; margin-bottom: 16px"><strong>LinkedIn:</strong> <a href="${body.linkedinUrl}" style="color: #01332d; text-decoration: none;">${body.linkedinUrl}</a></p>` : ''}
                                    <p style="margin: 0; margin-bottom: 16px"><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
                                    <p style="margin: 0; margin-bottom: 16px"><strong>Status:</strong> <span style="background-color: #01332d; color: #ffffff; padding: 4px 8px; border-radius: 4px; font-size: 12px;">New</span></p>
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table class="row row-4" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt">
              <tbody>
                <tr>
                  <td>
                    <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #291f2e; border-radius: 0; color: #000000; width: 600px; margin: 0 auto;" width="600">
                      <tbody>
                        <tr>
                          <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 60px; padding-top: 60px; vertical-align: top;">
                            <table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt">
                              <tr>
                                <td class="pad" style="width: 100%; padding-right: 0px; padding-left: 0px">
                                  <div class="alignment" align="center">
                                    <div style="max-width: 120px">
                                      <img src="https://29f792a828.imgdist.com/pub/bfra/mnp82y6j/yly/3vg/6sq/logo_white.png" style="display: block; height: auto; border: 0; width: 100%" width="120" alt="Honestus Logo" title="Honestus Logo" height="auto" />
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table class="paragraph_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                              <tr>
                                <td class="pad" style="padding-bottom: 15px; padding-top: 15px">
                                  <div style="color: #f8f9f4; direction: ltr; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 14px; font-weight: 400; letter-spacing: 0px; line-height: 1.5; text-align: center; mso-line-height-alt: 21px;">
                                    <p style="margin: 0">
                                      <strong>©</strong>Honestus<br />The Deeper The Roots, The Greater The Fruits
                                    </p>
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </body>
</html>
`

          await payload.sendEmail({
            from: `${emailSettings.fromName} <${emailSettings.fromEmail}>`,
            to: emailSettings.adminEmail,
            subject: emailSettings.featureRequestsSubject || 'New Feature Request Submitted',
            html: emailHtml,
          })
          console.log('Admin notification email sent successfully to:', emailSettings.adminEmail)
        } catch (emailError) {
          console.error('Failed to send admin notification email:', emailError)
          // Don't fail the request if email fails - just log it
        }
      } else {
        console.log('Feature request email notifications are disabled')
      }

      // Return success response
      return NextResponse.json({
        success: true,
        message: 'Feature request submitted successfully',
        id: featureRequest.id,
      })
    } catch (error: Error | unknown) {
      console.error('Payload CMS error:', error instanceof Error ? error.message : error)

      // Check if it's a collection not found error
      if (error instanceof Error && error.message.includes('Collection not found')) {
        return NextResponse.json(
          { error: 'The feature requests system is not properly configured.' },
          { status: 500 },
        )
      }

      throw error // Re-throw to be caught by outer catch
    }
  } catch (error: Error | unknown) {
    console.error(
      'Error processing feature request:',
      error instanceof Error ? error.message : error,
    )
    return NextResponse.json(
      { error: 'Failed to process the feature request. Please try again later.' },
      { status: 500 },
    )
  }
}
