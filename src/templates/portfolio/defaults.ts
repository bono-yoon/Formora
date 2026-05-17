import { portfolioPageSchema } from '@/templates/portfolio/schema'

export const defaultPortfolioPageData = portfolioPageSchema.parse({
  displayName: '김민지',
  role: '프로덕트 디자이너',
  bio: 'B2B SaaS와 모바일 앱에서 복잡한 정보를 단순한 경험으로 바꾸는 일을 좋아합니다.',
  projectTitle: '워크플로 대시보드 리디자인',
  projectUrl: 'https://example.com/case-study',
  email: 'hello@example.com',
  heroImageUrl: '',
  skillLine: 'Figma · Design system · Prototyping',
  projects: [
    {
      title: '워크플로 대시보드',
      role: 'Lead UI',
      description: 'B2B SaaS 대시보드 IA 재설계와 디자인 시스템 정립.',
      imageUrl: '',
      projectUrl: 'https://example.com/case-study',
    },
    {
      title: '모바일 뱅킹 온보딩',
      role: 'Product design',
      description: '가입 퍼널 단축과 접근성 개선.',
      imageUrl: '',
      projectUrl: '#',
    },
    {
      title: '브랜드 랜딩 리뉴얼',
      role: 'Visual',
      description: '스타트업 런칭용 원페이지 퍼블리싱.',
      imageUrl: '',
      projectUrl: '#',
    },
  ],
  skills: [
    { name: 'Figma' },
    { name: 'Design systems' },
    { name: 'Prototyping' },
    { name: 'User research' },
    { name: 'HTML/CSS' },
  ],
  testimonials: [
    {
      quote: '복잡한 요구사항을 명확한 화면 흐름으로 정리해 주셨습니다.',
      author: '박지훈',
      role: 'PM, SaaS 팀',
    },
    {
      quote: '디자인 시스템 덕분에 개발 속도가 눈에 띄게 빨라졌어요.',
      author: '이서연',
      role: '엔지니어링 리드',
    },
  ],
})
