'use client'

import React from 'react'
import { Button } from '@payloadcms/ui'

const GoogleDocImportButton: React.FC = () => {
  return (
    <div className="google-doc-import-button">
      <Button buttonStyle="secondary" size="small" disabled>
        Import from Google Doc
      </Button>
      <p className="text-xs text-gray-500 mt-1">
        Paste a Google Doc URL above and save to import content
      </p>
    </div>
  )
}
export default GoogleDocImportButton
