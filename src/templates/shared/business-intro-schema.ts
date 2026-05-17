import { z } from 'zod'

import {
  appScreenshotSchema,
  certificationSchema,
  featureCardSchema,
  introProjectSchema,
  metricSchema,
  namedLogoSchema,
} from '@/templates/shared/page-section-schemas'

export const businessIntroSchema = z.object({
  orgName: z.string().min(1).max(100),
  headline: z.string().min(1).max(120),
  subline: z.string().max(200).default(''),
  body: z.string().max(2000).default(''),
  ctaLabel: z.string().min(1).max(40),
  ctaUrl: z.string().max(2000).default('#'),
  heroImageUrl: z.string().max(2000).default(''),
  bullets: z.array(z.string().max(160)).max(6).default([]),
  metrics: z.array(metricSchema).max(6).default([]),
  trustedLogos: z.array(namedLogoSchema).max(12).default([]),
  projects: z.array(introProjectSchema).max(8).default([]),
  certifications: z.array(certificationSchema).max(10).default([]),
  galleryImageUrls: z.array(z.string().max(2000)).max(6).default([]),
  screenshots: z.array(appScreenshotSchema).max(6).default([]),
  featureCards: z.array(featureCardSchema).max(8).default([]),
  appStoreUrl: z.string().max(2000).default(''),
  playStoreUrl: z.string().max(2000).default(''),
})

export type BusinessIntroData = z.infer<typeof businessIntroSchema>
export type IntroMetric = z.infer<typeof metricSchema>
export type IntroProject = z.infer<typeof introProjectSchema>
export type IntroCertification = z.infer<typeof certificationSchema>
export type AppScreenshot = z.infer<typeof appScreenshotSchema>
export type IntroFeatureCard = z.infer<typeof featureCardSchema>
export type TrustedLogo = z.infer<typeof namedLogoSchema>
