import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'

import { ThemeColorsContext, type ThemeColorsContextValue } from '@/features/builder/theme-colors-state'
import type { TemplateCategoryId } from '@/templates/catalog/types'
import type { ThemeColorOverrides } from '@/templates/theme/types'

type ThemeColorsProviderProps = {
  categoryId: TemplateCategoryId
  variantId: string
  children: ReactNode
}

export function ThemeColorsProvider({ categoryId, variantId, children }: ThemeColorsProviderProps) {
  const [overrides, setOverrides] = useState<ThemeColorOverrides>({})

  useEffect(() => {
    setOverrides({})
  }, [categoryId, variantId])

  const setOverride = useCallback((slotId: string, hex: string) => {
    setOverrides((prev) => ({ ...prev, [slotId]: hex }))
  }, [])

  const resetOverrides = useCallback(() => setOverrides({}), [])

  const value = useMemo<ThemeColorsContextValue>(
    () => ({ overrides, setOverride, resetOverrides }),
    [overrides, setOverride, resetOverrides],
  )

  return <ThemeColorsContext.Provider value={value}>{children}</ThemeColorsContext.Provider>
}
