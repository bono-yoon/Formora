import { z } from 'zod'

import {
  eventHighlightSchema,
  eventSpeakerSchema,
  faqItemSchema,
  namedLogoSchema,
  scheduleItemSchema,
} from '@/templates/shared/page-section-schemas'

export const eventLikeSchema = z.object({
  eventTitle: z.string().min(1).max(120),
  dateLine: z.string().min(1).max(200),
  venue: z.string().max(200).default(''),
  description: z.string().max(1200).default(''),
  ticketUrl: z.string().max(2000).default('#'),
  heroImageUrl: z.string().max(2000).default(''),
  organizerName: z.string().max(120).default(''),
  highlights: z.array(eventHighlightSchema).max(8).default([]),
  schedule: z.array(scheduleItemSchema).max(16).default([]),
  speakers: z.array(eventSpeakerSchema).max(12).default([]),
  sponsors: z.array(namedLogoSchema).max(12).default([]),
  faqs: z.array(faqItemSchema).max(10).default([]),
})

export type EventHighlight = z.infer<typeof eventHighlightSchema>
export type ScheduleItem = z.infer<typeof scheduleItemSchema>
export type EventSpeaker = z.infer<typeof eventSpeakerSchema>
export type EventSponsor = z.infer<typeof namedLogoSchema>
export type FaqItem = z.infer<typeof faqItemSchema>
export type EventLikeData = z.infer<typeof eventLikeSchema>
