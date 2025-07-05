import { getPayload, GlobalSlug } from 'payload'
import configPromise from '@payload-config'

export interface EmailSettings {
  adminEmail: string
  fromEmail: string
  fromName: string
  featureRequestsEnabled: boolean
  featureRequestsSubject?: string
  formSubmissionsEnabled: boolean
  formSubmissionsPrefix: string
}

export async function getEmailSettings(): Promise<EmailSettings> {
  try {
    const config = await configPromise
    const payload = await getPayload({ config })

    const emailSettings = await payload.findGlobal({
      slug: 'email-settings',
    })

    // Return the settings with fallbacks
    return {
      adminEmail:
        emailSettings?.notifications?.adminEmail ||
        process.env.ADMIN_EMAIL ||
        'kayla.bonfiglio01@gmail.com',
      fromEmail: emailSettings?.notifications?.fromEmail || 'forms@honestus.world',
      fromName: emailSettings?.notifications?.fromName || 'Honestus',
      featureRequestsEnabled: emailSettings?.featureRequests?.enabled !== false,
      featureRequestsSubject:
        emailSettings?.featureRequests?.customSubject || 'New Feature Request Submitted',
      formSubmissionsEnabled: emailSettings?.formSubmissions?.enabled !== false,
      formSubmissionsPrefix: emailSettings?.formSubmissions?.subjectPrefix || 'New Form Submission',
    }
  } catch (error) {
    console.warn('Failed to fetch email settings, using fallbacks:', error)

    // Fallback to environment variables and defaults
    return {
      adminEmail: process.env.ADMIN_EMAIL || 'kayla.bonfiglio01@gmail.com',
      fromEmail: 'forms@honestus.world',
      fromName: 'Honestus',
      featureRequestsEnabled: true,
      featureRequestsSubject: 'New Feature Request Submitted',
      formSubmissionsEnabled: true,
      formSubmissionsPrefix: 'New Form Submission',
    }
  }
}
