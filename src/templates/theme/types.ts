import type { TemplateCategoryId } from '@/templates/catalog/types'

export type ThemeColorSlotId = string

export type ThemeColorSlot = {
  id: ThemeColorSlotId
  /** 빌더 폼 라벨 */
  label: string
  defaultHex: string
}

export type VariantThemeDefinition = {
  categoryId: TemplateCategoryId
  variantId: string
  slots: ThemeColorSlot[]
}

/** 슬롯 id → 사용자 지정 hex (없으면 기본값) */
export type ThemeColorOverrides = Partial<Record<ThemeColorSlotId, string>>

export type ResolvedThemeColors = Record<ThemeColorSlotId, string>
