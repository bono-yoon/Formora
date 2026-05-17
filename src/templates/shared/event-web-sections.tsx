'use client'

import { PartnerMark } from '@/templates/company/company-partner-mark'
import { previewWebSectionsStack } from '@/templates/preview-layout'
import type { EventOnlyDesign, SeminarEventDesign } from '@/templates/shared/event-like-design'
import type {
  EventHighlight,
  EventLikeData,
  EventSpeaker,
  EventSponsor,
  FaqItem,
  ScheduleItem,
} from '@/templates/shared/event-like-schema'

type EventDesign = EventOnlyDesign | SeminarEventDesign

type Tone = {
  section: string
  card: string
  label: string
  title: string
  muted: string
  border: string
  accent: string
}

function toneFor(design: EventDesign, categoryId: 'event' | 'seminar'): Tone {
  if (categoryId === 'seminar') {
    if (design === 'promo-ribbon')
      return {
        section: 'border-sky-200 bg-sky-50/80',
        card: 'border-sky-200 bg-white',
        label: 'text-sky-700',
        title: 'text-slate-900',
        muted: 'text-slate-600',
        border: 'border-sky-200',
        accent: 'bg-sky-600 text-white',
      }
    if (design === 'speaker-fan')
      return {
        section: 'border-violet-200 bg-violet-50/50',
        card: 'border-violet-200 bg-white shadow-sm',
        label: 'text-violet-700',
        title: 'text-slate-900',
        muted: 'text-slate-600',
        border: 'border-violet-200',
        accent: 'bg-violet-600 text-white',
      }
    if (design === 'digest-columns')
      return {
        section: 'border-stone-400 bg-[#faf8f5]',
        card: 'border-stone-300 bg-white',
        label: 'text-stone-600',
        title: 'text-stone-900',
        muted: 'text-stone-600',
        border: 'border-stone-300',
        accent: 'bg-stone-900 text-white',
      }
    return {
      section: 'border-indigo-200 bg-indigo-50/40',
      card: 'border-indigo-100 bg-white',
      label: 'text-indigo-600',
      title: 'text-slate-900',
      muted: 'text-slate-600',
      border: 'border-indigo-200',
      accent: 'bg-indigo-600 text-white',
    }
  }
  if (design === 'neon-stack')
    return {
      section: 'border-violet-500/30 bg-violet-950/40',
      card: 'border-violet-500/40 bg-violet-900/30',
      label: 'text-violet-300',
      title: 'text-violet-50',
      muted: 'text-violet-200/80',
      border: 'border-violet-500/30',
      accent: 'bg-fuchsia-500 text-white',
    }
  if (design === 'billboard-split')
    return {
      section: 'border-lime-400/50 bg-black',
      card: 'border-lime-400/40 bg-zinc-900',
      label: 'text-lime-400',
      title: 'text-white',
      muted: 'text-zinc-400',
      border: 'border-zinc-700',
      accent: 'bg-lime-400 text-black',
    }
  if (design === 'ribbon-row')
    return {
      section: 'border-orange-200 bg-orange-50',
      card: 'border-orange-200 bg-white',
      label: 'text-orange-700',
      title: 'text-stone-900',
      muted: 'text-stone-600',
      border: 'border-orange-200',
      accent: 'bg-orange-600 text-white',
    }
  return {
    section: 'border-stone-300 bg-stone-100',
    card: 'border-stone-300 bg-white',
    label: 'text-stone-600',
    title: 'text-stone-900',
    muted: 'text-stone-600',
    border: 'border-stone-300',
    accent: 'bg-stone-900 text-white',
  }
}

function Intro({ s, label, title }: { s: Tone; label: string; title: string }) {
  return (
    <>
      <p className={`text-xs font-semibold uppercase tracking-widest ${s.label}`}>{label}</p>
      <h2 className={`mt-2 text-xl font-semibold tracking-tight sm:text-2xl ${s.title}`}>{title}</h2>
    </>
  )
}

function HighlightsSection({ items, s, design }: { items: EventHighlight[]; s: Tone; design: EventDesign }) {
  if (design === 'ribbon-row') {
    return (
      <section className="space-y-0">
        {items.map((h, i) => (
          <div
            key={`${i}-${h.title}`}
            className={`border-b px-6 py-5 ${i % 2 === 0 ? 'bg-orange-500 text-white' : 'bg-white text-stone-900'}`}
          >
            <p className="text-sm font-bold uppercase tracking-wider">{h.title}</p>
            {h.description.trim() ? <p className="mt-1 text-sm opacity-90">{h.description}</p> : null}
          </div>
        ))}
      </section>
    )
  }
  return (
    <section>
      <Intro s={s} label="Highlights" title="하이라이트" />
      <ul className={`mt-6 grid gap-4 ${design === 'neon-stack' ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3'}`}>
        {items.map((h, i) => (
          <li key={`${i}-${h.title}`} className={`rounded-xl border p-5 ${s.card}`}>
            <p className={`font-semibold ${s.title}`}>{h.title}</p>
            {h.description.trim() ? <p className={`mt-2 text-sm leading-relaxed ${s.muted}`}>{h.description}</p> : null}
          </li>
        ))}
      </ul>
    </section>
  )
}

function ScheduleSection({
  items,
  s,
  design,
}: {
  items: ScheduleItem[]
  s: Tone
  design: EventDesign
}) {
  if (design === 'digest-columns' || design === 'track-board') {
    return (
      <section className={`rounded-xl border p-6 sm:p-8 ${s.section}`}>
        <Intro s={s} label="Schedule" title="일정" />
        <ul className="mt-6 divide-y">
          {items.map((item, i) => (
            <li key={`${i}-${item.time}`} className={`grid gap-2 py-4 sm:grid-cols-[6rem_1fr] sm:gap-6 ${s.border}`}>
              <p className={`text-sm font-bold tabular-nums ${s.label}`}>{item.time}</p>
              <div>
                <p className={`font-semibold ${s.title}`}>{item.title}</p>
                {item.description.trim() ? <p className={`mt-1 text-sm ${s.muted}`}>{item.description}</p> : null}
              </div>
            </li>
          ))}
        </ul>
      </section>
    )
  }
  return (
    <section>
      <Intro s={s} label="Program" title="프로그램" />
      <ol className={`mt-6 space-y-4 border-l-2 pl-6 ${s.border}`}>
        {items.map((item, i) => (
          <li key={`${i}-${item.time}`} className="relative">
            <span className={`absolute -left-[calc(1.5rem+5px)] top-1.5 size-2 rounded-full ${s.accent}`} aria-hidden />
            <p className={`text-xs font-bold uppercase ${s.label}`}>{item.time}</p>
            <p className={`mt-1 font-semibold ${s.title}`}>{item.title}</p>
            {item.description.trim() ? <p className={`mt-1 text-sm ${s.muted}`}>{item.description}</p> : null}
          </li>
        ))}
      </ol>
    </section>
  )
}

function SpeakersSection({ items, s, design }: { items: EventSpeaker[]; s: Tone; design: EventDesign }) {
  if (design === 'speaker-fan') {
    return (
      <section>
        <Intro s={s} label="Speakers" title="연사" />
        <ul className="mt-8 flex min-w-0 flex-wrap justify-center gap-6">
          {items.map((sp, i) => (
            <li
              key={`${i}-${sp.name}`}
              className={`w-44 rotate-[${i % 2 === 0 ? '-2' : '2'}deg] rounded-2xl border p-4 text-center shadow-md ${s.card}`}
              style={{ transform: `rotate(${i % 2 === 0 ? -2 : 2}deg)` }}
            >
              <div className="mx-auto size-20 overflow-hidden rounded-full bg-slate-200">
                {sp.photoUrl.trim() ? (
                  <img src={sp.photoUrl.trim()} alt="" className="size-full object-cover" />
                ) : (
                  <div className="flex size-full items-center justify-center text-xs text-slate-400">Photo</div>
                )}
              </div>
              <p className={`mt-3 text-sm font-semibold ${s.title}`}>{sp.name}</p>
              {sp.role.trim() ? <p className={`mt-1 text-xs ${s.muted}`}>{sp.role}</p> : null}
            </li>
          ))}
        </ul>
      </section>
    )
  }
  return (
    <section>
      <Intro s={s} label="Speakers" title="연사" />
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((sp, i) => (
          <li key={`${i}-${sp.name}`} className={`flex gap-4 rounded-xl border p-4 ${s.card}`}>
            <div className="size-16 shrink-0 overflow-hidden rounded-lg bg-slate-200">
              {sp.photoUrl.trim() ? <img src={sp.photoUrl.trim()} alt="" className="size-full object-cover" /> : null}
            </div>
            <div className="min-w-0">
              <p className={`font-semibold ${s.title}`}>{sp.name}</p>
              {sp.role.trim() ? <p className={`text-xs ${s.label}`}>{sp.role}</p> : null}
              {sp.bio.trim() ? <p className={`mt-2 text-xs leading-relaxed ${s.muted}`}>{sp.bio}</p> : null}
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

function SponsorsSection({ items, s, design }: { items: EventSponsor[]; s: Tone; design: EventDesign }) {
  return (
    <section className={`rounded-xl border px-6 py-8 sm:px-10 ${s.section}`}>
      <Intro s={s} label="Partners" title="후원 · 협력" />
      <ul
        className={`mt-6 grid min-w-0 gap-4 ${
          design === 'billboard-split' ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'
        }`}
      >
        {items.map((item, i) => (
          <li
            key={`${i}-${item.name}`}
            className={`flex min-h-[4.5rem] items-center justify-center rounded-lg border px-3 py-4 ${s.card}`}
          >
            <PartnerMark
              item={item}
              imgClassName="max-h-10 max-w-full object-contain"
              nameClassName={`text-center text-xs font-semibold ${s.title}`}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}

function FaqSection({ items, s }: { items: FaqItem[]; s: Tone }) {
  return (
    <section>
      <Intro s={s} label="FAQ" title="자주 묻는 질문" />
      <dl className={`mt-6 divide-y rounded-xl border ${s.border} ${s.card}`}>
        {items.map((f, i) => (
          <div key={`${i}-${f.question}`} className="px-5 py-4">
            <dt className={`text-sm font-semibold ${s.title}`}>{f.question}</dt>
            {f.answer.trim() ? <dd className={`mt-2 text-sm leading-relaxed ${s.muted}`}>{f.answer}</dd> : null}
          </div>
        ))}
      </dl>
    </section>
  )
}

type Props = {
  data: EventLikeData
  categoryId: 'event' | 'seminar'
  design: EventDesign
}

export function EventWebSections({ data, categoryId, design }: Props) {
  const s = toneFor(design, categoryId)
  const highlights = data.highlights.filter((h) => h.title.trim())
  const schedule = data.schedule.filter((x) => x.title.trim())
  const speakers = data.speakers.filter((x) => x.name.trim())
  const sponsors = data.sponsors.filter((x) => x.name.trim())
  const faqs = data.faqs.filter((x) => x.question.trim())

  const showHighlights = categoryId === 'event' && highlights.length > 0
  const showSpeakers = categoryId === 'seminar' && speakers.length > 0

  if (!showHighlights && schedule.length === 0 && !showSpeakers && sponsors.length === 0 && faqs.length === 0) {
    return null
  }

  return (
    <div className={previewWebSectionsStack()}>
      {showHighlights ? <HighlightsSection items={highlights} s={s} design={design} /> : null}
      {schedule.length > 0 ? <ScheduleSection items={schedule} s={s} design={design} /> : null}
      {showSpeakers ? <SpeakersSection items={speakers} s={s} design={design} /> : null}
      {sponsors.length > 0 ? <SponsorsSection items={sponsors} s={s} design={design} /> : null}
      {faqs.length > 0 ? <FaqSection items={faqs} s={s} /> : null}
    </div>
  )
}
