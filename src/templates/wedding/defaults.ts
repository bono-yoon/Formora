import { weddingPageSchema } from '@/templates/wedding/schema'

export const defaultWeddingPageData = weddingPageSchema.parse({
  coupleNames: '민준 · 서연',
  weddingDate: '2026년 10월 18일 토요일 오후 2시',
  venueName: '그랜드 하얏트 서울',
  venueAddress: '서울특별시 용산구 소월로 322',
  mapUrl: 'https://maps.google.com',
  message:
    '저희 두 사람이 사랑으로 하나가 되는 자리에 소중한 분들을 초대합니다. 따뜻한 마음으로 축복해 주시면 감사하겠습니다.',
  coverImageUrl: '',
  calendarNote: '예식 30분 전까지 와주시면 감사하겠습니다.',
  giftHonoreeLine: '',
  giftDisplay: 'none',
  giftDeclineMessage:
    '마음은 너무 감사하지만, 저희에게는 오셔서 함께해 주시는 것만으로도 큰 축복입니다. 너그러이 양해 부탁드립니다.',
  giftHeading: '마음 전하실 곳',
  giftSubNote: '부득이한 경우에만 아래 계좌로 부탁드립니다.',
  giftEntries: [
    {
      sideLabel: '신랑 측',
      bankName: '국민은행',
      accountHolder: '김민준',
      accountNumber: '123456-12-123456',
      transferUrl: '',
    },
    {
      sideLabel: '신부 측',
      bankName: '신한은행',
      accountHolder: '이서연',
      accountNumber: '110-123-456789',
      transferUrl: '',
    },
  ],
})
