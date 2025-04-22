import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

// Helper function to validate and format URLs
const isValidUrl = (url: string): boolean => {
  if (!url) return true; // Empty URLs are considered valid (optional)
  
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

// LinkedIn-specific URL validator
const isValidLinkedInUrl = (url: string): boolean => {
  if (!url) return true; // Empty is valid
  
  try {
    // First check if it's a valid URL
    new URL(url);
    
    // Then check if it follows LinkedIn profile pattern
    const linkedinPattern = /^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/i;
    return linkedinPattern.test(url);
  } catch (e) {
    return false;
  }
};

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'reason', 'description']
    for (const field of requiredFields) {
      if (!body[field] || body[field].trim() === '') {
        console.log(`Validation error: ${field} is required`)
        return NextResponse.json(
          { error: `The ${field} field is required` },
          { status: 400 }
        )
      }
    }
    
    // Validate URLs
    if (body.websiteUrl && !isValidUrl(body.websiteUrl)) {
      return NextResponse.json(
        { error: 'Invalid website URL format' },
        { status: 400 }
      )
    }
    
    if (body.linkedinUrl && !isValidLinkedInUrl(body.linkedinUrl)) {
      return NextResponse.json(
        { error: 'Invalid LinkedIn profile URL format. Please use format: https://www.linkedin.com/in/username/' },
        { status: 400 }
      )
    }

    console.log('Processing feature request submission:', { 
      name: body.name, 
      email: body.email, 
      reason: body.reason.substring(0, 30) + (body.reason.length > 30 ? '...' : '')
    })

    try {
      // Initialize Payload CMS
      const config = await configPromise
      const payload = await getPayload({ config })

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

      // Return success response
      return NextResponse.json({ 
        success: true, 
        message: 'Feature request submitted successfully', 
        id: featureRequest.id 
      })
    } catch (error: any) {
      console.error('Payload CMS error:', error.message || error)
      
      // Check if it's a collection not found error
      if (error.message && error.message.includes('Collection not found')) {
        return NextResponse.json(
          { error: 'The feature requests system is not properly configured.' },
          { status: 500 }
        )
      }
      
      throw error // Re-throw to be caught by outer catch
    }
  } catch (error: any) {
    console.error('Error processing feature request:', error.message || error)
    return NextResponse.json(
      { error: 'Failed to process the feature request. Please try again later.' },
      { status: 500 }
    )
  }
} 