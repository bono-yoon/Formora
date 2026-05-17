import type { ReactNode } from 'react'

import { PreviewThemeRoot } from '@/components/builder/PreviewThemeRoot'
import type { TemplateCategoryId } from '@/templates/catalog/types'

type BuilderThemedPreviewProps = {
  categoryId: TemplateCategoryId
  variantId: string
  children: ReactNode
}

export function BuilderThemedPreview({ categoryId, variantId, children }: BuilderThemedPreviewProps) {
  return (
    <PreviewThemeRoot categoryId={categoryId} variantId={variantId}>
      {children}
    </PreviewThemeRoot>
  )
}
