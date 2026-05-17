import { createContext, useContext } from 'react'

import type { ThemeColorOverrides } from '@/templates/theme/types'

export type ThemeColorsContextValue = {
  overrides: ThemeColorOverrides
  setOverride: (slotId: string, hex: string) => void
  resetOverrides: () => void
}

export const ThemeColorsContext = createContext<ThemeColorsContextValue | null>(null)

export function useThemeColors() {
  const ctx = useContext(ThemeColorsContext)
  if (!ctx) {
    throw new Error('useThemeColors must be used within ThemeColorsProvider')
  }
  return ctx
}
