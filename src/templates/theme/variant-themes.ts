import type { TemplateCategoryId } from '@/templates/catalog/types'
import type { ResolvedThemeColors, ThemeColorOverrides, ThemeColorSlot, VariantThemeDefinition } from '@/templates/theme/types'

type ThemePreset = {
  primary: string
  secondary: string
  accent: string
  surface?: string
  text?: string
}

const SLOT_LABELS = {
  primary: '메인',
  secondary: '보조',
  accent: '강조',
  surface: '배경',
  text: '텍스트',
} as const

function slotsFromPreset(preset: ThemePreset): ThemeColorSlot[] {
  const base: ThemeColorSlot[] = [
    { id: 'primary', label: SLOT_LABELS.primary, defaultHex: preset.primary },
    { id: 'secondary', label: SLOT_LABELS.secondary, defaultHex: preset.secondary },
    { id: 'accent', label: SLOT_LABELS.accent, defaultHex: preset.accent },
  ]
  if (preset.surface) base.push({ id: 'surface', label: SLOT_LABELS.surface, defaultHex: preset.surface })
  if (preset.text) base.push({ id: 'text', label: SLOT_LABELS.text, defaultHex: preset.text })
  return base
}

function def(categoryId: TemplateCategoryId, variantId: string, preset: ThemePreset): VariantThemeDefinition {
  return { categoryId, variantId, slots: slotsFromPreset(preset) }
}

/** 카테고리·변형별 대표 컬러(3~5) 기본값 */
export const VARIANT_THEME_REGISTRY: VariantThemeDefinition[] = [
  // company
  def('company', 'minimal', { primary: '#2563eb', secondary: '#3b82f6', accent: '#1d4ed8', surface: '#ffffff', text: '#0f172a' }),
  def('company', 'editorial', { primary: '#a8a29e', secondary: '#78716c', accent: '#fafaf9', surface: '#0c0a09', text: '#fafaf9' }),
  def('company', 'glass-b2b', { primary: '#4f46e5', secondary: '#818cf8', accent: '#312e81', surface: '#eef2ff', text: '#1e1b4b' }),
  def('company', 'split-tech', { primary: '#0ea5e9', secondary: '#0369a1', accent: '#f0f9ff', surface: '#ffffff', text: '#0c4a6e' }),
  def('company', 'logo-trust', { primary: '#475569', secondary: '#94a3b8', accent: '#0f172a', surface: '#f8fafc', text: '#0f172a' }),
  // product
  def('product', 'standard', { primary: '#059669', secondary: '#10b981', accent: '#047857', surface: '#ffffff', text: '#111827' }),
  def('product', 'gallery-first', { primary: '#f59e0b', secondary: '#fbbf24', accent: '#18181b', surface: '#09090b', text: '#fafafa' }),
  def('product', 'pricing-focus', { primary: '#7c3aed', secondary: '#a78bfa', accent: '#5b21b6', surface: '#faf5ff', text: '#1e1b4b' }),
  def('product', 'story-band', { primary: '#e11d48', secondary: '#fb7185', accent: '#881337', surface: '#fff1f2', text: '#1f2937' }),
  // cafe
  def('cafe', 'warm-heritage', { primary: '#d97706', secondary: '#f59e0b', accent: '#92400e', surface: '#fffbeb', text: '#292524' }),
  def('cafe', 'garden-terrace', { primary: '#65a30d', secondary: '#84cc16', accent: '#365314', surface: '#f7fee7', text: '#1a2e05' }),
  def('cafe', 'midnight-tapas', { primary: '#ca8a04', secondary: '#eab308', accent: '#0a0a0a', surface: '#171717', text: '#fafafa' }),
  def('cafe', 'espresso-stripe', { primary: '#44403c', secondary: '#78716c', accent: '#1c1917', surface: '#fafaf9', text: '#1c1917' }),
  // portfolio
  def('portfolio', 'noir-studio', { primary: '#a1a1aa', secondary: '#52525b', accent: '#fafafa', surface: '#09090b', text: '#fafafa' }),
  def('portfolio', 'daylight-editorial', { primary: '#b45309', secondary: '#d97706', accent: '#1c1917', surface: '#ffffff', text: '#1c1917' }),
  def('portfolio', 'film-reel', { primary: '#d4d4d8', secondary: '#71717a', accent: '#f4f4f5', surface: '#18181b', text: '#fafafa' }),
  def('portfolio', 'swiss-index', { primary: '#dc2626', secondary: '#000000', accent: '#ffffff', surface: '#ffffff', text: '#000000' }),
  // event
  def('event', 'campaign-poster', { primary: '#78716c', secondary: '#a8a29e', accent: '#1c1917', surface: '#fafaf9', text: '#1c1917' }),
  def('event', 'neon-stack', { primary: '#a855f7', secondary: '#c084fc', accent: '#2e1065', surface: '#0f0518', text: '#f5f3ff' }),
  def('event', 'billboard-split', { primary: '#a3e635', secondary: '#000000', accent: '#ecfccb', surface: '#000000', text: '#ffffff' }),
  def('event', 'ribbon-row', { primary: '#f97316', secondary: '#fb923c', accent: '#7c2d12', surface: '#fff7ed', text: '#1c1917' }),
  // seminar
  def('seminar', 'track-board', { primary: '#4f46e5', secondary: '#6366f1', accent: '#312e81', surface: '#f8fafc', text: '#0f172a' }),
  def('seminar', 'promo-ribbon', { primary: '#0284c7', secondary: '#38bdf8', accent: '#0c4a6e', surface: '#f0f9ff', text: '#0f172a' }),
  def('seminar', 'speaker-fan', { primary: '#d97706', secondary: '#fbbf24', accent: '#78350f', surface: '#fffbeb', text: '#1c1917' }),
  def('seminar', 'digest-columns', { primary: '#1e3a5f', secondary: '#64748b', accent: '#0f172a', surface: '#faf8f5', text: '#0f172a' }),
  // startup
  def('startup', 'mission-split', { primary: '#7c3aed', secondary: '#a78bfa', accent: '#4c1d95', surface: '#faf5ff', text: '#1e1b4b' }),
  def('startup', 'velocity-rail', { primary: '#06b6d4', secondary: '#22d3ee', accent: '#083344', surface: '#0f172a', text: '#ecfeff' }),
  def('startup', 'horizon-proof', { primary: '#fb7185', secondary: '#fda4af', accent: '#881337', surface: '#fff1f2', text: '#1f2937' }),
  def('startup', 'ink-ledger', { primary: '#1e3a5f', secondary: '#94a3b8', accent: '#fef3c7', surface: '#f8fafc', text: '#0f172a' }),
  // construction
  def('construction', 'site-classic', { primary: '#f59e0b', secondary: '#475569', accent: '#0f172a', surface: '#f1f5f9', text: '#0f172a' }),
  def('construction', 'blueprint-grid', { primary: '#2563eb', secondary: '#60a5fa', accent: '#1e3a8a', surface: '#eff6ff', text: '#0f172a' }),
  def('construction', 'yard-beacon', { primary: '#eab308', secondary: '#1f2937', accent: '#ca8a04', surface: '#fefce8', text: '#0f172a' }),
  def('construction', 'tender-seal', { primary: '#92400e', secondary: '#d6d3d1', accent: '#44403c', surface: '#fafaf9', text: '#1c1917' }),
  // app
  def('app', 'store-stage', { primary: '#10b981', secondary: '#34d399', accent: '#064e3b', surface: '#ecfdf5', text: '#022c22' }),
  def('app', 'orbit-cards', { primary: '#22d3ee', secondary: '#0891b2', accent: '#164e63', surface: '#09090b', text: '#ecfeff' }),
  def('app', 'spec-slab', { primary: '#52525b', secondary: '#a1a1aa', accent: '#18181b', surface: '#f4f4f5', text: '#18181b' }),
  def('app', 'chalk-play', { primary: '#a855f7', secondary: '#e9d5ff', accent: '#581c87', surface: '#f3e8ff', text: '#3b0764' }),
]

const registryKey = (categoryId: TemplateCategoryId, variantId: string) => `${categoryId}::${variantId}`

const themeByKey = new Map(
  VARIANT_THEME_REGISTRY.map((t) => [registryKey(t.categoryId, t.variantId), t] as const),
)

export function getVariantTheme(
  categoryId: TemplateCategoryId,
  variantId: string,
): VariantThemeDefinition | undefined {
  return themeByKey.get(registryKey(categoryId, variantId))
}

export function resolveThemeColors(
  definition: VariantThemeDefinition,
  overrides: ThemeColorOverrides = {},
): ResolvedThemeColors {
  const resolved: ResolvedThemeColors = {}
  for (const slot of definition.slots) {
    const raw = overrides[slot.id]?.trim()
    resolved[slot.id] = raw && /^#[0-9A-Fa-f]{6}$/.test(raw) ? raw : slot.defaultHex
  }
  return resolved
}
