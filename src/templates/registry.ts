import { isTemplateCategoryId, TEMPLATE_CATALOG } from '@/templates/catalog/categories'
import type { TemplateCategoryId } from '@/templates/catalog/types'

export {
  getCategory,
  getVariant,
  isTemplateCategoryId,
  LEGACY_DEFAULT_VARIANT,
  TEMPLATE_CATALOG,
} from '@/templates/catalog/categories'
export type {
  CatalogIconName,
  PreviewTargetMode,
  TemplateCategoryId,
  TemplateCategoryMeta,
  TemplateVariantMeta,
} from '@/templates/catalog/types'

/** 카테고리 카드용 (하위 호환) */
export const TEMPLATE_LIST = TEMPLATE_CATALOG.map((c) => ({
  id: c.id,
  title: c.title,
  description: c.description,
}))

/** @deprecated `TemplateCategoryId` 사용 권장 */
export type TemplateId = TemplateCategoryId

export function isTemplateId(value: string): value is TemplateId {
  return isTemplateCategoryId(value)
}
