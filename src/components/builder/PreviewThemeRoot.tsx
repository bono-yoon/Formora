import type { ReactNode } from 'react'
import { useMemo } from 'react'

import { useThemeColors } from '@/features/builder/theme-colors-state'
import { themeColorsToCssVars } from '@/templates/theme/css-vars'
import type { TemplateCategoryId } from '@/templates/catalog/types'
import { getVariantTheme, resolveThemeColors } from '@/templates/theme/variant-themes'
import { cn } from '@/lib/utils'

type PreviewThemeRootProps = {
  categoryId: TemplateCategoryId
  variantId: string
  children: ReactNode
  className?: string
}

/** 미리보기·보내기 본문에 `--formora-*` CSS 변수를 주입합니다. */
export function PreviewThemeRoot({ categoryId, variantId, children, className }: PreviewThemeRootProps) {
  const { overrides } = useThemeColors()
  const definition = getVariantTheme(categoryId, variantId)

  const style = useMemo(() => {
    if (!definition) return undefined
    const resolved = resolveThemeColors(definition, overrides)
    return themeColorsToCssVars(definition.slots, resolved)
  }, [definition, overrides])

  if (!definition) return <>{children}</>

  return (
    <div className={cn('formora-theme-root', className)} style={style}>
      {children}
    </div>
  )
}
