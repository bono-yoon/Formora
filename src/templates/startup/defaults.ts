import { businessIntroSchema } from '@/templates/shared/business-intro-schema'

export const defaultStartupPageData = businessIntroSchema.parse({
  orgName: '루프랩',
  headline: '팀이 늘어나도 문서는 한곳에',
  subline: '지식 베이스와 워크플로를 하나로.',
  body: '스타트업과 중소팀을 위한 올인원 위키. 권한, 버전, 검색을 기본으로 제공합니다.',
  ctaLabel: '데모 예약',
  ctaUrl: 'https://example.com/demo',
  heroImageUrl: '',
  bullets: ['SSO · SAML', '감사 로그', '온프레미스 옵션'],
  metrics: [
    { value: '2,400+', label: '활성 팀' },
    { value: '99.9%', label: '업타임 SLA' },
    { value: '4.8', label: 'G2 평점' },
  ],
  trustedLogos: [
    { name: 'Northwind', logoUrl: 'https://placehold.co/160x48/e2e8f0/475569/png?text=Northwind' },
    { name: 'Harbor Labs', logoUrl: 'https://placehold.co/160x48/e2e8f0/475569/png?text=Harbor' },
  ],
  featureCards: [
    { title: '실시간 협업', description: '동시 편집·댓글·멘션으로 결정을 빠르게.' },
    { title: '강력한 검색', description: '본문·첨부·권한 범위 내 통합 검색.' },
    { title: '엔터프라이즈 보안', description: 'SSO, 감사 로그, 데이터 레지던시 옵션.' },
  ],
  projects: [],
  certifications: [],
  galleryImageUrls: [],
  screenshots: [],
  appStoreUrl: '',
  playStoreUrl: '',
})
