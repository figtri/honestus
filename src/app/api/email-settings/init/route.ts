import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { adminEmail } = body

    if (!adminEmail) {
      return NextResponse.json({ error: 'Admin email is required' }, { status: 400 })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(adminEmail)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    try {
      // Initialize Payload CMS
      const config = await configPromise
      const payload = await getPayload({ config })

      // Check if email settings already exist
      let emailSettings
      try {
        emailSettings = await payload.findGlobal({
          slug: 'email-settings',
        })
      } catch (error) {
        // Global doesn't exist yet, we'll create it
        emailSettings = null
      }

      // Update or create email settings
      const updatedSettings = await payload.updateGlobal({
        slug: 'email-settings',
        data: {
          notifications: {
            adminEmail: adminEmail,
            fromEmail: emailSettings?.notifications?.fromEmail || 'forms@honestus.world',
            fromName: emailSettings?.notifications?.fromName || 'Honestus',
          },
          featureRequests: {
            enabled: emailSettings?.featureRequests?.enabled !== false,
            customSubject: emailSettings?.featureRequests?.customSubject || '',
          },
          formSubmissions: {
            enabled: emailSettings?.formSubmissions?.enabled !== false,
            subjectPrefix: emailSettings?.formSubmissions?.subjectPrefix || 'New Form Submission',
          },
          testEmail: {
            testEmailAddress: emailSettings?.testEmail?.testEmailAddress || '',
          },
        },
      })

      console.log('Email settings initialized successfully')

      return NextResponse.json({
        success: true,
        message: 'Email settings initialized successfully',
        settings: {
          adminEmail: updatedSettings.notifications.adminEmail,
          fromEmail: updatedSettings.notifications.fromEmail,
          fromName: updatedSettings.notifications.fromName,
        },
      })
    } catch (error: Error | unknown) {
      console.error('Payload CMS error:', error instanceof Error ? error.message : error)
      throw error
    }
  } catch (error: Error | unknown) {
    console.error(
      'Error initializing email settings:',
      error instanceof Error ? error.message : error,
    )
    return NextResponse.json(
      { error: 'Failed to initialize email settings. Please try again later.' },
      { status: 500 },
    )
  }
}

export async function GET() {
  try {
    // Initialize Payload CMS
    const config = await configPromise
    const payload = await getPayload({ config })

    // Get current email settings
    const emailSettings = await payload.findGlobal({
      slug: 'email-settings',
    })

    return NextResponse.json({
      success: true,
      settings: {
        adminEmail: emailSettings?.notifications?.adminEmail || '',
        fromEmail: emailSettings?.notifications?.fromEmail || 'forms@honestus.world',
        fromName: emailSettings?.notifications?.fromName || 'Honestus',
        featureRequestsEnabled: emailSettings?.featureRequests?.enabled !== false,
        formSubmissionsEnabled: emailSettings?.formSubmissions?.enabled !== false,
        isConfigured: !!emailSettings?.notifications?.adminEmail,
      },
    })
  } catch (error: Error | unknown) {
    console.error('Error fetching email settings:', error instanceof Error ? error.message : error)
    return NextResponse.json({ error: 'Failed to fetch email settings' }, { status: 500 })
  }
}
