/** 스타트업 — 피치·성장 주제 */
export type StartupIntroDesign = 'mission-split' | 'velocity-rail' | 'horizon-proof' | 'ink-ledger'

/** 건설 / 기업 — 현장·신뢰 주제 */
export type ConstructionIntroDesign = 'site-classic' | 'blueprint-grid' | 'yard-beacon' | 'tender-seal'

/** 앱 소개 — 스토어·기능 주제 */
export type AppIntroDesign = 'store-stage' | 'orbit-cards' | 'spec-slab' | 'chalk-play'

export function startupDesignFromCatalogId(variantId: string): StartupIntroDesign {
  if (variantId === 'velocity-rail') return 'velocity-rail'
  if (variantId === 'horizon-proof') return 'horizon-proof'
  if (variantId === 'ink-ledger') return 'ink-ledger'
  return 'mission-split'
}

export function constructionDesignFromCatalogId(variantId: string): ConstructionIntroDesign {
  if (variantId === 'blueprint-grid') return 'blueprint-grid'
  if (variantId === 'yard-beacon') return 'yard-beacon'
  if (variantId === 'tender-seal') return 'tender-seal'
  if (variantId === 'site-classic' || variantId === 'default') return 'site-classic'
  return 'site-classic'
}

export function appDesignFromCatalogId(variantId: string): AppIntroDesign {
  if (variantId === 'orbit-cards') return 'orbit-cards'
  if (variantId === 'spec-slab') return 'spec-slab'
  if (variantId === 'chalk-play') return 'chalk-play'
  return 'store-stage'
}
