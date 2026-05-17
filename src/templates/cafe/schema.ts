import { z } from 'zod'

/** 빌더·미리보기에서 추가 가능한 최대 메뉴 수 */
export const CAFE_MENU_MAX = 80

export const cafeMenuItemSchema = z.object({
  name: z.string().min(1).max(80),
  price: z.string().max(40).default(''),
  description: z.string().max(200).default(''),
})

export const cafePageSchema = z.object({
  shopName: z.string().min(1).max(80),
  tagline: z.string().max(160).default(''),
  heroTitle: z.string().min(1).max(120),
  heroText: z.string().max(600).default(''),
  address: z.string().max(300).default(''),
  hours: z.string().max(200).default(''),
  mapUrl: z.string().max(2000).default(''),
  heroImageUrl: z.string().max(2000).default(''),
  reserveLabel: z.string().min(1).max(40),
  reserveUrl: z.string().max(2000).default('#'),
  menuItems: z.array(cafeMenuItemSchema).max(CAFE_MENU_MAX).default([]),
  galleryImageUrls: z.array(z.string().max(2000)).max(6).default([]),
  amenityParking: z.string().max(120).default(''),
  amenityPets: z.string().max(120).default(''),
  amenityWifi: z.string().max(120).default(''),
  amenityAccessibility: z.string().max(120).default(''),
  amenityPayment: z.string().max(120).default(''),
})

export type CafeMenuItem = z.infer<typeof cafeMenuItemSchema>
export type CafePageData = z.infer<typeof cafePageSchema>
