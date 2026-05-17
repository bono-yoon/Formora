import { companyPageSchema } from '@/templates/company/schema'

/** 스키마를 통과하는 데모 데이터 — 빌더 초기값 */
export const defaultCompanyPageData = companyPageSchema.parse({
  siteName: '에이커 스튜디오',
  tagline: '브랜드와 제품을 돋보이게 하는 웹 경험',
  heroTitle: '클라이언트의 첫인상을 설계합니다',
  heroSubtitle: '랜딩·소개 페이지를 빠르게 제작하고, 정적 HTML로 바로 전달하세요.',
  primaryCtaLabel: '문의하기',
  primaryCtaUrl: 'mailto:hello@example.com',
  logoUrl: '',
  heroImageUrl: '',
  features: [
    {
      title: '빠른 제작',
      description: '검증된 템플릿으로 일정을 단축하고 품질은 유지합니다.',
    },
    {
      title: '모바일 퍼스트',
      description: '작은 화면부터 설계해 어디서나 읽기 좋은 타이포그래피를 만듭니다.',
    },
    {
      title: '정적 보내기',
      description: '호스팅에 올리기 쉬운 HTML 스냅샷으로 납품할 수 있습니다.',
    },
  ],
  services: [
    { title: '브랜드 랜딩', description: '신규 서비스·캠페인용 원페이지를 기획부터 퍼블리싱까지 지원합니다.' },
    { title: '기업 소개', description: '회사 연혁·조직·문의 흐름을 한 페이지에 정리합니다.' },
    { title: '제품 소개', description: '스펙·갤러리·FAQ가 포함된 제품 상세형 레이아웃을 제공합니다.' },
  ],
  milestones: [
    { year: '2022', title: '스튜디오 설립', description: '소규모 브랜드 웹 제작으로 시작했습니다.' },
    { year: '2024', title: '템플릿 라인업 확장', description: '업종별 12종 이상의 디자인 변형을 출시했습니다.' },
    { year: '2026', title: '정적 보내기 기능', description: '빌더에서 바로 HTML 스냅샷을 보낼 수 있습니다.' },
  ],
  partners: [
    { name: 'Northwind', logoUrl: 'https://placehold.co/200x64/e2e8f0/475569/png?text=Northwind' },
    { name: 'Studio Lumen', logoUrl: 'https://placehold.co/200x64/e2e8f0/475569/png?text=Studio+Lumen' },
    { name: 'Pixel & Co.', logoUrl: 'https://placehold.co/200x64/e2e8f0/475569/png?text=Pixel+%26+Co' },
    { name: 'Harbor Labs', logoUrl: 'https://placehold.co/200x64/e2e8f0/475569/png?text=Harbor+Labs' },
  ],
  contactEmail: 'hello@example.com',
  footerNote: '© 에이커 스튜디오. 본 데모는 Formora에서 생성되었습니다.',
})
