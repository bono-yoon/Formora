export type ProductDesignVariant = 'standard' | 'gallery-first' | 'pricing-focus' | 'story-band'

export function productVariantFromCatalogId(variantId: string): ProductDesignVariant {
  if (variantId === 'gallery-first') return 'gallery-first'
  if (variantId === 'pricing-focus') return 'pricing-focus'
  if (variantId === 'story-band') return 'story-band'
  return 'standard'
}
