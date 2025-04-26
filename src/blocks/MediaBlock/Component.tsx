import type { StaticImageData } from 'next/image'

import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { MediaBlock as MediaBlockProps } from '@/payload-types'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import { Media } from '../../components/Media'

type Props = MediaBlockProps & {
  breakout?: boolean
  captionClassName?: string
  className?: string
  enableGutter?: boolean
  imgClassName?: string
  staticImage?: StaticImageData
  disableInnerContainer?: boolean
  alignment?: 'left' | 'center' | 'right' | null
  float?: 'none' | 'left' | 'right' | null
  caption?: string | SerializedEditorState | null
  size?: 'small' | 'medium' | 'large' | 'full' | null
}

export const MediaBlock: React.FC<Props> = (props) => {
  const {
    captionClassName,
    className,
    enableGutter = true,
    imgClassName,
    media,
    staticImage,
    disableInnerContainer,
    alignment = 'center',
    float = 'none',
    caption,
    size = 'medium',
  } = props

  // Define size classes
  const sizeClasses = {
    small: 'max-w-md',
    medium: 'max-w-2xl',
    large: 'max-w-4xl',
    full: 'w-full',
  }

  // Define alignment classes
  const alignmentClasses = {
    left: 'text-left',
    center: 'mx-auto text-center',
    right: 'ml-auto text-right',
  }

  // Define float classes
  const floatClasses = {
    none: '',
    left: 'float-left mr-6 mb-4',
    right: 'float-right ml-6 mb-4',
  }

  return (
    <div
      className={cn(
        '',
        {
          container: enableGutter,
        },
        sizeClasses[size as keyof typeof sizeClasses],
        alignmentClasses[alignment as keyof typeof alignmentClasses],
        floatClasses[float as keyof typeof floatClasses],
        className,
      )}
    >
      {(media || staticImage) && (
        <Media
          imgClassName={cn('border border-border rounded-[0.8rem]', imgClassName)}
          resource={media}
          src={staticImage}
        />
      )}
      {/* Handle caption from props */}
      {caption && (
        <div
          className={cn(
            'mt-3 text-sm text-gray-500 italic',
            {
              container: !disableInnerContainer,
            },
            captionClassName,
          )}
        >
          {typeof caption === 'string' ? caption : <RichText data={caption} enableGutter={false} />}
        </div>
      )}
      {/* Handle media caption if no caption from props */}
      {!caption && media && typeof media === 'object' && media.caption && (
        <div
          className={cn(
            'mt-3 text-sm text-gray-500 italic',
            {
              container: !disableInnerContainer,
            },
            captionClassName,
          )}
        >
          <RichText data={media.caption} enableGutter={false} />
        </div>
      )}
    </div>
  )
}
