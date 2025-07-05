import { GlobalConfig } from 'payload'

export const EmailSettings: GlobalConfig = {
  slug: 'email-settings',
  label: 'Email Settings',
  admin: {
    group: 'Settings',
    description: 'Configure email addresses for form notifications and system emails',
  },
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'notifications',
      type: 'group',
      label: 'Notification Settings',
      fields: [
        {
          name: 'adminEmail',
          type: 'email',
          label: 'Admin Email Address',
          required: true,
          admin: {
            description: 'Email address where all form submissions and notifications will be sent',
            placeholder: 'admin@yourdomain.com',
          },
        },
        {
          name: 'fromEmail',
          type: 'email',
          label: 'From Email Address',
          required: true,
          defaultValue: 'forms@honestus.world',
          admin: {
            description: 'Email address that will appear as the sender for notifications',
            placeholder: 'noreply@yourdomain.com',
          },
        },
        {
          name: 'fromName',
          type: 'text',
          label: 'From Name',
          defaultValue: 'Honestus',
          admin: {
            description: 'Name that will appear as the sender for notifications',
            placeholder: 'Your Company Name',
          },
        },
      ],
    },
    {
      name: 'featureRequests',
      type: 'group',
      label: 'Feature Request Settings',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          label: 'Enable Feature Request Notifications',
          defaultValue: true,
          admin: {
            description: 'Enable or disable email notifications for feature requests',
          },
        },
        {
          name: 'customSubject',
          type: 'text',
          label: 'Custom Subject Line',
          admin: {
            description: 'Custom subject line for feature request emails (leave empty for default)',
            placeholder: 'New Feature Request Submitted',
          },
        },
      ],
    },
    {
      name: 'formSubmissions',
      type: 'group',
      label: 'Form Submission Settings',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          label: 'Enable Form Submission Notifications',
          defaultValue: true,
          admin: {
            description: 'Enable or disable email notifications for general form submissions',
          },
        },
        {
          name: 'subjectPrefix',
          type: 'text',
          label: 'Subject Prefix',
          defaultValue: 'New Form Submission',
          admin: {
            description: 'Prefix for form submission email subjects',
            placeholder: 'New Form Submission',
          },
        },
      ],
    },
    {
      name: 'testEmail',
      type: 'group',
      label: 'Test Email Settings',
      admin: {
        description: 'Send a test email to verify your configuration is working correctly',
      },
      fields: [
        {
          name: 'testEmailAddress',
          type: 'email',
          label: 'Test Email Address',
          admin: {
            description: 'Email address to send test emails to (optional)',
            placeholder: 'test@yourdomain.com',
          },
        },
      ],
    },
  ],
}
