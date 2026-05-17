import { z } from 'zod'

export const productSpecSchema = z.object({
  label: z.string().min(1).max(80),
  value: z.string().max(200).default(''),
})

export const productFaqSchema = z.object({
  q: z.string().min(1).max(200),
  a: z.string().max(600).default(''),
})

export const productPageSchema = z.object({
  productName: z.string().min(1).max(100),
  oneLiner: z.string().max(200).default(''),
  description: z.string().max(3000).default(''),
  priceLabel: z.string().max(80).default(''),
  buyUrl: z.string().max(2000).default('#'),
  galleryImageUrls: z.array(z.string().max(2000)).max(6).default([]),
  specs: z.array(productSpecSchema).min(1).max(12),
  faq: z.array(productFaqSchema).max(12).default([]),
  brandName: z.string().max(80).default(''),
  brandLogoUrl: z.string().max(2000).default(''),
  brandTagline: z.string().max(160).default(''),
  brandDescription: z.string().max(500).default(''),
  brandEmail: z.string().max(120).default(''),
  brandPhone: z.string().max(40).default(''),
  brandAddress: z.string().max(300).default(''),
})

export type ProductSpec = z.infer<typeof productSpecSchema>
export type ProductFaq = z.infer<typeof productFaqSchema>
export type ProductPageData = z.infer<typeof productPageSchema>
