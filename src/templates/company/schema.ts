import { z } from 'zod'

export const companyFeatureSchema = z.object({
  title: z.string().min(1).max(120),
  description: z.string().max(400).default(''),
})

export const companyServiceSchema = z.object({
  title: z.string().min(1).max(120),
  description: z.string().max(400).default(''),
})

export const companyMilestoneSchema = z.object({
  year: z.string().min(1).max(8),
  title: z.string().min(1).max(120),
  description: z.string().max(300).default(''),
})

export const companyPartnerSchema = z.object({
  name: z.string().min(1).max(80),
  logoUrl: z.string().max(2000).default(''),
})

export const companyPageSchema = z.object({
  siteName: z.string().min(1).max(80),
  tagline: z.string().max(160).default(''),
  heroTitle: z.string().min(1).max(120),
  heroSubtitle: z.string().max(300).default(''),
  primaryCtaLabel: z.string().min(1).max(40),
  primaryCtaUrl: z.string().max(2000).default('#'),
  logoUrl: z.string().max(2000).default(''),
  heroImageUrl: z.string().max(2000).default(''),
  features: z.array(companyFeatureSchema).min(1).max(8),
  services: z.array(companyServiceSchema).max(8).default([]),
  milestones: z.array(companyMilestoneSchema).max(12).default([]),
  partners: z.array(companyPartnerSchema).max(12).default([]),
  contactEmail: z.string().max(120).default(''),
  footerNote: z.string().max(300).default(''),
})

export type CompanyFeature = z.infer<typeof companyFeatureSchema>
export type CompanyService = z.infer<typeof companyServiceSchema>
export type CompanyMilestone = z.infer<typeof companyMilestoneSchema>
export type CompanyPartner = z.infer<typeof companyPartnerSchema>
export type CompanyPageData = z.infer<typeof companyPageSchema>
