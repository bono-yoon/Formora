export type WeddingDesignVariant = 'classic' | 'cover-focus' | 'pastel-garden' | 'mono-minimal'

export function weddingVariantFromCatalogId(variantId: string): WeddingDesignVariant {
  if (variantId === 'cover-focus') return 'cover-focus'
  if (variantId === 'pastel-garden') return 'pastel-garden'
  if (variantId === 'mono-minimal') return 'mono-minimal'
  return 'classic'
}
