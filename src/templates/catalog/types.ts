export type PreviewTargetMode = 'web' | 'mobile'

export type TemplateCategoryId =
  | 'company'
  | 'product'
  | 'wedding'
  | 'cafe'
  | 'portfolio'
  | 'event'
  | 'seminar'
  | 'startup'
  | 'construction'
  | 'app'

export type CatalogIconName =
  | 'Building2'
  | 'Package'
  | 'Heart'
  | 'Coffee'
  | 'Briefcase'
  | 'Calendar'
  | 'Presentation'
  | 'Rocket'
  | 'HardHat'
  | 'Smartphone'

export type TemplateVariantMeta = {
  id: string
  title: string
  description: string
}

export type TemplateCategoryMeta = {
  id: TemplateCategoryId
  title: string
  description: string
  icon: CatalogIconName
  /** true면 Web/Mobile 토글 없이 모바일 프레임만 */
  previewMobileOnly: boolean
  variants: TemplateVariantMeta[]
}
