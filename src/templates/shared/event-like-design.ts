/** 세미나/컨퍼런스 — 학회·등록 주제, 레이아웃만 구분 (이벤트 템플릿과 겹치지 않음) */
export type SeminarEventDesign = 'track-board' | 'promo-ribbon' | 'speaker-fan' | 'digest-columns'

/** 이벤트 프로모션 — 프로모션 주제, 세미나 변형과 다른 구성만 */
export type EventOnlyDesign = 'campaign-poster' | 'neon-stack' | 'billboard-split' | 'ribbon-row'

export function seminarDesignFromCatalogId(variantId: string): SeminarEventDesign {
  if (variantId === 'promo-ribbon') return 'promo-ribbon'
  if (variantId === 'speaker-fan') return 'speaker-fan'
  if (variantId === 'digest-columns') return 'digest-columns'
  return 'track-board'
}

export function eventDesignFromCatalogId(variantId: string): EventOnlyDesign {
  if (variantId === 'neon-stack') return 'neon-stack'
  if (variantId === 'billboard-split') return 'billboard-split'
  if (variantId === 'ribbon-row') return 'ribbon-row'
  return 'campaign-poster'
}
