import { z } from 'zod'

export const weddingGiftEntrySchema = z.object({
  sideLabel: z.string().max(40).default(''),
  bankName: z.string().max(50).default(''),
  accountHolder: z.string().max(80).default(''),
  accountNumber: z.string().max(50).default(''),
  /** 카카오 송금·카카오페이 등 송금 페이지 URL */
  transferUrl: z.string().max(2000).default(''),
})

export type WeddingGiftEntry = z.infer<typeof weddingGiftEntrySchema>

export const weddingPageSchema = z.object({
  coupleNames: z.string().min(1).max(120),
  weddingDate: z.string().min(1).max(80),
  venueName: z.string().min(1).max(120),
  venueAddress: z.string().max(300).default(''),
  mapUrl: z.string().max(2000).default(''),
  message: z.string().max(800).default(''),
  coverImageUrl: z.string().max(2000).default(''),
  calendarNote: z.string().max(200).default(''),
  /** 예: 홍길동 · 김영희의 아들 민준 */
  giftHonoreeLine: z.string().max(200).default(''),
  /**
   * none: 축의금 블록 미표시
   * decline_only: 사양 멘트만 (축의금 UI 없음)
   * accounts: 계좌·송금 링크 블록
   */
  giftDisplay: z.enum(['none', 'decline_only', 'accounts']).default('none'),
  /** giftDisplay === decline_only 일 때 표시 */
  giftDeclineMessage: z.string().max(800).default(''),
  giftHeading: z.string().max(100).default('마음 전하실 곳'),
  giftSubNote: z.string().max(300).default(''),
  giftEntries: z.array(weddingGiftEntrySchema).max(4).default([]),
})

export type WeddingPageData = z.infer<typeof weddingPageSchema>
