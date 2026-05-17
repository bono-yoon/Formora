import { z } from 'zod'

export const namedLogoSchema = z.object({
  name: z.string().min(1).max(80),
  logoUrl: z.string().max(2000).default(''),
})

export const metricSchema = z.object({
  value: z.string().min(1).max(24),
  label: z.string().min(1).max(80),
})

export const titledDescriptionSchema = z.object({
  title: z.string().min(1).max(120),
  description: z.string().max(400).default(''),
})

export const portfolioProjectSchema = z.object({
  title: z.string().min(1).max(120),
  role: z.string().max(120).default(''),
  description: z.string().max(400).default(''),
  imageUrl: z.string().max(2000).default(''),
  projectUrl: z.string().max(2000).default('#'),
})

export const portfolioSkillSchema = z.object({
  name: z.string().min(1).max(60),
})

export const portfolioTestimonialSchema = z.object({
  quote: z.string().min(1).max(400),
  author: z.string().max(80).default(''),
  role: z.string().max(120).default(''),
})

export const eventHighlightSchema = z.object({
  title: z.string().min(1).max(120),
  description: z.string().max(300).default(''),
})

export const scheduleItemSchema = z.object({
  time: z.string().min(1).max(40),
  title: z.string().min(1).max(120),
  description: z.string().max(300).default(''),
})

export const eventSpeakerSchema = z.object({
  name: z.string().min(1).max(80),
  role: z.string().max(120).default(''),
  bio: z.string().max(300).default(''),
  photoUrl: z.string().max(2000).default(''),
})

export const faqItemSchema = z.object({
  question: z.string().min(1).max(200),
  answer: z.string().max(600).default(''),
})

export const introProjectSchema = z.object({
  title: z.string().min(1).max(120),
  description: z.string().max(400).default(''),
  year: z.string().max(8).default(''),
  imageUrl: z.string().max(2000).default(''),
})

export const certificationSchema = z.object({
  title: z.string().min(1).max(120),
  issuer: z.string().max(120).default(''),
})

export const appScreenshotSchema = z.object({
  url: z.string().max(2000).default(''),
  caption: z.string().max(120).default(''),
})

export const featureCardSchema = z.object({
  title: z.string().min(1).max(120),
  description: z.string().max(400).default(''),
})
