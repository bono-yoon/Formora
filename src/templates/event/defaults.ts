import { eventLikeSchema } from '@/templates/shared/event-like-schema'

export const defaultEventPageData = eventLikeSchema.parse({
  eventTitle: '2026 디자인 위크 서울',
  dateLine: '2026년 6월 12일 – 14일 · 코엑스 D홀',
  venue: '서울 강남구 영동대로 513',
  description: '3일간의 키노트, 워크숍, 네트워킹. 얼리버드 티켓 한정 판매 중입니다.',
  ticketUrl: 'https://example.com/tickets',
  heroImageUrl: '',
  organizerName: '서울디자인협회',
  highlights: [
    { title: '키노트 12+', description: '국내외 디자인·프로덕트 리더가 한자리에 모입니다.' },
    { title: '워크숍 30+', description: '실습 중심 세션으로 바로 적용할 수 있는 스킬을 배웁니다.' },
    { title: '네트워킹', description: '업계 동료와의 교류·파트너십 기회.' },
  ],
  schedule: [
    { time: '10:00', title: '개막식', description: '환영 인사와 행사 안내' },
    { time: '11:00', title: '키노트 A', description: '디자인 시스템의 미래' },
    { time: '14:00', title: '워크숍 트랙 1', description: 'Figma 변수와 토큰' },
    { time: '16:30', title: '패널 토크', description: '프로덕트 × 디자인 협업' },
  ],
  speakers: [],
  sponsors: [
    { name: 'Pixel & Co.', logoUrl: 'https://placehold.co/160x48/e2e8f0/475569/png?text=Pixel' },
    { name: 'Harbor Labs', logoUrl: 'https://placehold.co/160x48/e2e8f0/475569/png?text=Harbor' },
    { name: 'Studio Lumen', logoUrl: 'https://placehold.co/160x48/e2e8f0/475569/png?text=Lumen' },
  ],
  faqs: [
    { question: '환불 정책은 어떻게 되나요?', answer: '행사 7일 전까지 전액 환불 가능합니다.' },
    { question: '현장 등록이 가능한가요?', answer: '사전 등록을 권장하며, 현장은 잔여 좌석에 한해 가능합니다.' },
  ],
})
