'use client'

import React, { createContext, useContext, useState } from 'react'

interface AuthVisibilityContextType {
  isUserLoggedIn: boolean
  setIsUserLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

const AuthVisibilityContext = createContext<AuthVisibilityContextType | undefined>(
  undefined,
)

export const AuthVisibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)

  return (
    <AuthVisibilityContext.Provider value={{ isUserLoggedIn, setIsUserLoggedIn }}>
      {children}
    </AuthVisibilityContext.Provider>
  )
}

export const useAuthVisibility = () => {
  const context = useContext(AuthVisibilityContext)
  if (context === undefined) {
    throw new Error('useAuthVisibility must be used within an AuthVisibilityProvider')
  }
  return context
} 