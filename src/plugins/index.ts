import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { searchPlugin } from '@payloadcms/plugin-search'
import { Plugin } from 'payload'
import { revalidateRedirects } from '@/hooks/revalidateRedirects'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { searchFields } from '@/search/fieldOverrides'
import { beforeSyncWithSearch } from '@/search/beforeSync'

import { Page, Post } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'

const generateTitle: GenerateTitle<Post | Page> = ({ doc }) => {
  return doc?.title ? `${doc.title} | Honestus` : 'Honestus'
}

const generateURL: GenerateURL<Post | Page> = ({ doc }) => {
  const url = getServerSideURL()

  return doc?.slug ? `${url}/${doc.slug}` : url
}

export const plugins: Plugin[] = [
  redirectsPlugin({
    collections: ['pages', 'posts'],
    overrides: {
      // @ts-expect-error - This is a valid override, mapped fields don't resolve to the same type
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'from') {
            return {
              ...field,
              admin: {
                description: 'You will need to rebuild the website when changing this field.',
              },
            }
          }
          return field
        })
      },
      hooks: {
        afterChange: [revalidateRedirects],
      },
    },
  }),
  nestedDocsPlugin({
    collections: ['categories'],
    generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
  }),
  seoPlugin({
    generateTitle,
    generateURL,
  }),
  formBuilderPlugin({
    fields: {
      payment: false,
    },
    formOverrides: {
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'confirmationMessage') {
            return {
              ...field,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    FixedToolbarFeature(),
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                  ]
                },
              }),
            }
          }
          return field
        })
      },
    },
    formSubmissionOverrides: {
      hooks: {
        afterChange: [
          async ({ doc, req }) => {
            // Send admin notification email for form submissions
            if (req?.payload) {
              try {
                // Get the form details
                const form = await req.payload.findByID({
                  collection: 'forms',
                  id: typeof doc.form === 'object' ? doc.form.id : doc.form,
                })

                // Format submission data for email
                const submissionData =
                  doc.submissionData
                    ?.map(
                      (item: { field: string; value: string }) =>
                        `<p style="margin: 0; margin-bottom: 16px; background-color: #ffffff; padding: 10px; border-radius: 6px;"><strong>${item.field}:</strong> ${item.value}</p>`,
                    )
                    .join('') || ''

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
                                    <span style="word-break: break-word">New Submission!</span>
                                  </h1>
                                </td>
                              </tr>
                            </table>
                            <table class="image_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt">
                              <tr>
                                <td class="pad" style="padding-top: 24px; width: 100%; padding-right: 0px; padding-left: 0px;">
                                  <div class="alignment" align="center">
                                    <div class="fullWidth" style="max-width: 600px">
                                      <img src="https://29f792a828.imgdist.com/pub/bfra/mnp82y6j/zkf/8y2/hs9/brooke-cagle-oTweoxMKdkA-unsplash.jpg" style="display: block; height: auto; border: 0; width: 100%" width="600" alt="Form Submission" title="Form Submission" height="auto" />
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
                                    <span style="word-break: break-word">${form.title.toUpperCase()}</span>
                                  </h3>
                                </td>
                              </tr>
                            </table>
                            <table class="paragraph_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                              <tr>
                                <td class="pad" style="padding-bottom: 30px; padding-top: 20px">
                                  <div style="color: #42383e; direction: ltr; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 16px; font-weight: 400; letter-spacing: 0px; line-height: 1.6; text-align: left; mso-line-height-alt: 25px;">
                                    <p style="margin: 0; margin-bottom: 16px"><strong>Form:</strong> ${form.title}</p>
                                    <p style="margin: 0; margin-bottom: 16px"><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
                                    <div style="margin-top: 20px;">
                                      <h4 style="margin: 0; margin-bottom: 12px; color: #150811;">Submission Details:</h4>
                                      ${submissionData}
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

                await req.payload.sendEmail({
                  from: 'forms@honestus.world',
                  to: process.env.ADMIN_EMAIL || 'tanksalif@gmail.com',
                  subject: `New Form Submission: ${form.title}`,
                  html: emailHtml,
                })
              } catch (emailError) {
                console.error('Failed to send admin notification for form submission:', emailError)
              }
            }
          },
        ],
      },
    },
  }),
  searchPlugin({
    collections: ['posts'],
    beforeSync: beforeSyncWithSearch,
    searchOverrides: {
      fields: ({ defaultFields }) => {
        return [...defaultFields, ...searchFields]
      },
    },
  }),
  payloadCloudPlugin(),
]
