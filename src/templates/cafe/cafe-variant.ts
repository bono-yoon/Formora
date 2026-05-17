/** 카페/레스토랑 — 같은 매장 소개 주제, 레이아웃만 구분 */
export type CafeDesignVariant = 'warm-heritage' | 'garden-terrace' | 'midnight-tapas' | 'espresso-stripe'

export function cafeVariantFromCatalogId(variantId: string): CafeDesignVariant {
  if (variantId === 'garden-terrace') return 'garden-terrace'
  if (variantId === 'midnight-tapas') return 'midnight-tapas'
  if (variantId === 'espresso-stripe') return 'espresso-stripe'
  if (variantId === 'warm-heritage' || variantId === 'default') return 'warm-heritage'
  return 'warm-heritage'
}
