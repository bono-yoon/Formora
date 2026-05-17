/** 포트폴리오 — 크리에이터 소개 주제, 레이아웃만 구분 */
export type PortfolioDesignVariant = 'noir-studio' | 'daylight-editorial' | 'film-reel' | 'swiss-index'

export function portfolioVariantFromCatalogId(variantId: string): PortfolioDesignVariant {
  if (variantId === 'daylight-editorial') return 'daylight-editorial'
  if (variantId === 'film-reel') return 'film-reel'
  if (variantId === 'swiss-index') return 'swiss-index'
  if (variantId === 'noir-studio' || variantId === 'default') return 'noir-studio'
  return 'noir-studio'
}
