import type { CSSProperties } from 'react'

import type { ResolvedThemeColors, ThemeColorSlot } from '@/templates/theme/types'

/** 슬롯 id를 CSS 변수 `--formora-{id}` 로 노출 */
export function themeColorsToCssVars(
  slots: ThemeColorSlot[],
  resolved: ResolvedThemeColors,
): CSSProperties {
  const style: Record<string, string> = {}
  for (const slot of slots) {
    style[`--formora-${slot.id}`] = resolved[slot.id] ?? slot.defaultHex
  }
  return style as CSSProperties
}

export function themeVar(slotId: string): string {
  return `var(--formora-${slotId})`
}
