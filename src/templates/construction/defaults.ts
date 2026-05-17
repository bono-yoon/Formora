import { businessIntroSchema } from '@/templates/shared/business-intro-schema'

export const defaultConstructionPageData = businessIntroSchema.parse({
  orgName: '한강건설 ENG',
  headline: '도심 복합시설 시공 실적 120건',
  subline: '안전 · 정밀 · 기한 준수',
  body: '설계 검토부터 준공까지 EPC 역량을 제공합니다. BIM 기반 협업으로 리스크를 줄입니다.',
  ctaLabel: '프로젝트 문의',
  ctaUrl: 'mailto:bid@example.com',
  heroImageUrl: '',
  bullets: ['특급 도급', '자체 안전 관리단', '전국 현장 네트워크'],
  metrics: [],
  trustedLogos: [],
  projects: [
    {
      title: '강남 복합 오피스 타워',
      description: '지하 3층 · 지상 22층, 철근콘크리트 골조.',
      year: '2025',
      imageUrl: '',
    },
    {
      title: '물류센터 확장 공사',
      description: '기존 시설 증축 및 자동화 라인 동 설치.',
      year: '2024',
      imageUrl: '',
    },
    {
      title: '공공 체육관 리모델링',
      description: '내진 보강 및 MEP 전면 교체.',
      year: '2023',
      imageUrl: '',
    },
  ],
  certifications: [
    { title: '건설업 등록 (토목·건축)', issuer: '국토교통부' },
    { title: 'ISO 45001', issuer: '안전보건 경영' },
    { title: 'ISO 9001', issuer: '품질 경영' },
  ],
  galleryImageUrls: ['', '', ''],
  screenshots: [],
  featureCards: [],
  appStoreUrl: '',
  playStoreUrl: '',
})
