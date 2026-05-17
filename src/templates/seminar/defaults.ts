import { eventLikeSchema } from '@/templates/shared/event-like-schema'

export const defaultSeminarPageData = eventLikeSchema.parse({
  eventTitle: 'B2B 세일즈 AI 실전 세미나',
  dateLine: '2026년 7월 3일 금요일 14:00 – 17:00',
  venue: '판교 스타트업캠퍼스 3층',
  description: 'CRM 자동화와 리드 스코어링 사례를 중심으로 진행됩니다. 참석자 전원 자료집 제공.',
  ticketUrl: 'https://example.com/register',
  heroImageUrl: '',
  organizerName: '테크에듀 파트너스',
  highlights: [],
  schedule: [
    { time: '14:00', title: '등록 · 네트워킹', description: '명찰 수령 및 라이트 리프레시먼트' },
    { time: '14:30', title: '오프닝 키노트', description: 'B2B 세일즈 트렌드 2026' },
    { time: '15:30', title: '트랙 A · AI 리드 스코어링', description: '실습 데모 포함' },
    { time: '16:30', title: '패널 Q&A', description: '현장 질의응답' },
  ],
  speakers: [
    {
      name: '최윤아',
      role: 'VP Sales, Loop CRM',
      bio: 'B2B SaaS 세일즈 조직 설계와 AI 도입 사례를 공유합니다.',
      photoUrl: '',
    },
    {
      name: '정민호',
      role: 'Head of Growth',
      bio: '리드 스코어링 모델 구축과 파이프라인 최적화.',
      photoUrl: '',
    },
    {
      name: '한소희',
      role: 'Product Marketing',
      bio: '세일즈–마케팅 얼라인먼트 프레임워크.',
      photoUrl: '',
    },
  ],
  sponsors: [
    { name: 'Loop CRM', logoUrl: 'https://placehold.co/160x48/e2e8f0/475569/png?text=Loop' },
    { name: 'TechEdu', logoUrl: 'https://placehold.co/160x48/e2e8f0/475569/png?text=TechEdu' },
  ],
  faqs: [
    { question: '자료집은 어떻게 받나요?', answer: '등록 시 입력한 이메일로 행사 다음 날 발송됩니다.' },
    { question: '오프라인만 가능한가요?', answer: '본 세미나는 오프라인 전용입니다.' },
  ],
})
