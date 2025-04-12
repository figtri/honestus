'use client'

import React, { createContext, useCallback, use, useEffect, useState } from 'react'

import type { Theme, ThemeContextType } from './types'

import canUseDOM from '@/utilities/canUseDOM'

const initialContext: ThemeContextType = {
  setTheme: () => null,
  theme: 'dark',
}

const ThemeContext = createContext(initialContext)

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>('dark')

  const setTheme = useCallback((themeToSet: Theme | null) => {
    const finalTheme: Theme = 'dark'
    setThemeState(finalTheme)
    if (canUseDOM) {
      document.documentElement.setAttribute('data-theme', finalTheme)
    }
  }, [])

  useEffect(() => {
    const forcedTheme: Theme = 'dark'
    document.documentElement.setAttribute('data-theme', forcedTheme)
    setThemeState(forcedTheme)
  }, [])

  return <ThemeContext.Provider value={{ setTheme, theme }}>{children}</ThemeContext.Provider>
}

export const useTheme = (): ThemeContextType => use(ThemeContext)
