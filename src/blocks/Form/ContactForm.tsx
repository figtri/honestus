'use client'
import type { FormFieldBlock, Form as FormType } from '@payloadcms/plugin-form-builder/types'

import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import RichText from '@/components/RichText'
import { Send } from 'lucide-react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import { fields } from './fields'
import { getClientSideURL } from '@/utilities/getURL'

export type ContactFormType = {
  blockName?: string
  blockType?: 'formBlock'
  enableIntro: boolean
  form: FormType
  introContent?: SerializedEditorState
}

export const ContactForm: React.FC<
  {
    id?: string
  } & ContactFormType
> = (props) => {
  const {
    enableIntro,
    form: formFromProps,
    form: { id: formID, confirmationType, redirect, submitButtonLabel } = {},
    introContent,
  } = props

  const formMethods = useForm({
    defaultValues: formFromProps.fields,
  })
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>()
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()
  const router = useRouter()

  const onSubmit = useCallback(
    (data: FormFieldBlock[]) => {
      let loadingTimerID: ReturnType<typeof setTimeout>
      const submitForm = async () => {
        setError(undefined)

        const dataToSend = Object.entries(data).map(([name, value]) => ({
          field: name,
          value,
        }))

        // delay loading indicator by 1s
        loadingTimerID = setTimeout(() => {
          setIsLoading(true)
        }, 1000)

        try {
          const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
            body: JSON.stringify({
              form: formID,
              submissionData: dataToSend,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          })

          const res = await req.json()

          clearTimeout(loadingTimerID)

          if (req.status >= 400) {
            setIsLoading(false)

            setError({
              message: res.errors?.[0]?.message || 'Internal Server Error',
              status: res.status,
            })

            return
          }

          setIsLoading(false)
          setHasSubmitted(true)

          if (confirmationType === 'redirect' && redirect) {
            const { url } = redirect

            const redirectUrl = url

            if (redirectUrl) router.push(redirectUrl)
          }
        } catch (err) {
          console.warn(err)
          setIsLoading(false)
          setError({
            message: 'Something went wrong.',
          })
        }
      }

      void submitForm()
    },
    [router, formID, redirect, confirmationType],
  )

  return (
    <div>
      {enableIntro && introContent && !hasSubmitted && (
        <RichText
          className="mb-6 text-2xl font-semibold text-emerald-300"
          data={introContent}
          enableGutter={false}
        />
      )}

      <FormProvider {...formMethods}>
        {!isLoading && hasSubmitted && confirmationType === 'message' && (
          <div className="text-center py-8">
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-8 backdrop-blur-sm">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-emerald-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-emerald-300 mb-2">
                Message Sent Successfully!
              </h3>
              <p className="text-gray-300">
                Thank you for reaching out. I&apos;ll get back to you within 24 hours.
              </p>
            </div>
          </div>
        )}

        {isLoading && !hasSubmitted && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-400"></div>
            <p className="mt-2 text-gray-300">Sending your message...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-300 mb-6">
            {`${error.status || '500'}: ${error.message || ''}`}
          </div>
        )}

        {!hasSubmitted && (
          <form id={formID} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {formFromProps &&
              formFromProps.fields &&
              formFromProps.fields?.map((field, index) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const Field: React.FC<any> = fields?.[field.blockType as keyof typeof fields]
                if (Field) {
                  return (
                    <div key={index}>
                      <Field
                        form={formFromProps}
                        {...field}
                        {...formMethods}
                        control={control}
                        errors={errors}
                        register={register}
                      />
                    </div>
                  )
                }
                return null
              })}

            <button
              form={formID}
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-500/50 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 shadow-lg hover:shadow-emerald-700/40 group"
            >
              <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              {submitButtonLabel || 'Send Message'}
            </button>
          </form>
        )}
      </FormProvider>
    </div>
  )
}
