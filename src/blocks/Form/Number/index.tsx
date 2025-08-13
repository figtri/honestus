import type { TextField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import React from 'react'

import { Error } from '../Error'
import { Width } from '../Width'
export const Number: React.FC<
  TextField & {
    errors: Partial<FieldErrorsImpl>
    register: UseFormRegister<FieldValues>
  }
> = ({ name, defaultValue, errors, label, register, required, width }) => {
  return (
    <Width width={width}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-300 mb-2">
        {label}
        {required && <span className="text-emerald-400 ml-1">*</span>}
      </label>
      <input
        type="tel"
        id={name}
        defaultValue={defaultValue}
        required={required}
        className="w-full px-4 py-3 bg-white/[0.05] border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400/50 focus:ring-1 focus:ring-emerald-400/50 transition-colors"
        placeholder="Your phone number"
        {...register(name, { required })}
      />
      {errors[name] && <Error name={name} />}
    </Width>
  )
}
