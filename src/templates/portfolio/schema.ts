import { z } from 'zod'

import {
  portfolioProjectSchema,
  portfolioSkillSchema,
  portfolioTestimonialSchema,
} from '@/templates/shared/page-section-schemas'

export const portfolioPageSchema = z.object({
  displayName: z.string().min(1).max(80),
  role: z.string().max(120).default(''),
  bio: z.string().max(1200).default(''),
  projectTitle: z.string().min(1).max(120),
  projectUrl: z.string().max(2000).default('#'),
  email: z.string().max(120).default(''),
  heroImageUrl: z.string().max(2000).default(''),
  skillLine: z.string().max(200).default(''),
  projects: z.array(portfolioProjectSchema).max(8).default([]),
  skills: z.array(portfolioSkillSchema).max(16).default([]),
  testimonials: z.array(portfolioTestimonialSchema).max(6).default([]),
})

export type PortfolioProject = z.infer<typeof portfolioProjectSchema>
export type PortfolioSkill = z.infer<typeof portfolioSkillSchema>
export type PortfolioTestimonial = z.infer<typeof portfolioTestimonialSchema>
export type PortfolioPageData = z.infer<typeof portfolioPageSchema>
