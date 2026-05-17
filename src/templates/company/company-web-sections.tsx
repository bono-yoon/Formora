'use client'

import { useState } from 'react'

import { PartnerMark } from '@/templates/company/company-partner-mark'
import type { CompanyDesignVariant } from '@/templates/company/company-variant'
import type { CompanyMilestone, CompanyPageData, CompanyPartner, CompanyService } from '@/templates/company/schema'

type ToneStyle = {
  section: string
  card: string
  label: string
  title: string
  muted: string
  border: string
  accent: string
  partner: string
  dot: string
}

const tones: Record<CompanyDesignVariant, ToneStyle> = {
  'glass-b2b': {
    section: 'border-indigo-100/80 bg-white/45 backdrop-blur-sm',
    card: 'border-white/70 bg-white/60 shadow-sm backdrop-blur-md',
    label: 'text-indigo-600/90',
    title: 'text-slate-900',
    muted: 'text-slate-600',
    border: 'border-indigo-200/80',
    accent: 'bg-indigo-600 text-white',
    partner: 'border-indigo-200/60 bg-white/70 text-indigo-950 backdrop-blur-sm',
    dot: 'bg-indigo-500 ring-4 ring-white/80',
  },
  'split-tech': {
    section: 'border-slate-200 bg-slate-50',
    card: 'border-l-4 border-l-indigo-600 border-slate-200 bg-white shadow-sm',
    label: 'text-indigo-600',
    title: 'text-slate-900',
    muted: 'text-slate-600',
    border: 'border-slate-200',
    accent: 'bg-indigo-600 text-white',
    partner: 'border border-slate-200 bg-white text-slate-800',
    dot: 'bg-indigo-600 ring-4 ring-white',
  },
  editorial: {
    section: 'border-neutral-800 bg-neutral-950',
    card: 'border-neutral-800 bg-black',
    label: 'text-neutral-500',
    title: 'text-white',
    muted: 'text-neutral-400',
    border: 'border-neutral-800',
    accent: 'text-neutral-500',
    partner: 'border-neutral-800 text-neutral-300',
    dot: 'bg-white ring-4 ring-neutral-950',
  },
  minimal: {
    section: 'border-slate-200 bg-slate-50/80',
    card: 'border-slate-200 bg-white',
    label: 'text-blue-600',
    title: 'text-slate-900',
    muted: 'text-slate-600',
    border: 'border-slate-200',
    accent: 'bg-blue-600 text-white',
    partner: 'border-slate-200 bg-white text-slate-700',
    dot: 'bg-blue-600 ring-4 ring-white',
  },
  'logo-trust': {
    section: 'border-slate-200 bg-white',
    card: 'border-slate-200 bg-slate-50/80',
    label: 'text-emerald-700',
    title: 'text-slate-900',
    muted: 'text-slate-600',
    border: 'border-slate-200',
    accent: 'bg-emerald-600 text-white',
    partner: 'border-slate-200 bg-white text-slate-600',
    dot: 'bg-emerald-600 ring-4 ring-white',
  },
}

function SectionIntro({
  s,
  label,
  title,
}: {
  s: ToneStyle
  label: string
  title: string
}) {
  return (
    <>
      <p className={`text-xs font-semibold uppercase tracking-widest ${s.label}`}>{label}</p>
      <h2 className={`mt-2 text-xl font-semibold tracking-tight sm:text-2xl ${s.title}`}>{title}</h2>
    </>
  )
}

/** 글래스 — 벤토 그리드 + 번호 배지 */
function GlassServices({ items, s }: { items: CompanyService[]; s: ToneStyle }) {
  return (
    <section>
      <SectionIntro s={s} label="Services" title="하는 업무" />
      <ul className="mt-6 grid min-w-0 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <li
            key={`${i}-${item.title}`}
            className={`min-w-0 rounded-2xl border p-5 sm:p-6 ${s.card} ${i === 0 && items.length > 2 ? 'sm:col-span-2 lg:col-span-1 lg:row-span-1' : ''}`}
          >
            <span className={`inline-flex size-8 items-center justify-center rounded-full text-xs font-bold ${s.accent}`}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className={`mt-3 text-sm font-semibold sm:text-base ${s.title}`}>{item.title}</h3>
            {item.description.trim() ? (
              <p className={`mt-2 text-pretty text-xs leading-relaxed sm:text-sm ${s.muted}`}>{item.description}</p>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  )
}

/** 스플릿 테크 — 좌측 강조 바 리스트 */
function SplitServices({ items, s }: { items: CompanyService[]; s: ToneStyle }) {
  return (
    <section>
      <SectionIntro s={s} label="Capabilities" title="하는 업무" />
      <ul className="mt-6 space-y-3">
        {items.map((item, i) => (
          <li key={`${i}-${item.title}`} className={`min-w-0 px-5 py-4 sm:px-6 ${s.card}`}>
            <h3 className={`text-base font-semibold ${s.title}`}>{item.title}</h3>
            {item.description.trim() ? (
              <p className={`mt-2 max-w-3xl text-pretty text-sm leading-relaxed ${s.muted}`}>{item.description}</p>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  )
}

/** 에디토리얼 — 세리프 번호 + 구분선 */
function EditorialServices({ items, s }: { items: CompanyService[]; s: ToneStyle }) {
  return (
    <section className={`border-y py-10 sm:py-12 ${s.border}`}>
      <SectionIntro s={s} label="What we do" title="하는 업무" />
      <ul className={`mt-8 divide-y ${s.border}`}>
        {items.map((item, i) => (
          <li key={`${i}-${item.title}`} className="flex min-w-0 gap-5 py-7 first:pt-0 last:pb-0 sm:gap-8">
            <span className={`shrink-0 font-serif text-4xl font-light leading-none sm:text-5xl ${s.accent}`}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="min-w-0 flex-1">
              <h3 className={`font-serif text-lg font-medium sm:text-xl ${s.title}`}>{item.title}</h3>
              {item.description.trim() ? (
                <p className={`mt-2 text-pretty text-sm leading-relaxed ${s.muted}`}>{item.description}</p>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

/** 미니멀 — 2열 라벨·설명 */
function MinimalServices({ items, s }: { items: CompanyService[]; s: ToneStyle }) {
  return (
    <section>
      <SectionIntro s={s} label="Services" title="하는 업무" />
      <dl className="mt-6 grid min-w-0 gap-x-8 gap-y-6 sm:grid-cols-2">
        {items.map((item, i) => (
          <div key={`${i}-${item.title}`} className="min-w-0">
            <dt className={`flex items-center gap-2 text-sm font-semibold ${s.title}`}>
              <span className={`size-1.5 shrink-0 rounded-full ${s.accent}`} aria-hidden />
              {item.title}
            </dt>
            {item.description.trim() ? (
              <dd className={`mt-2 text-pretty text-xs leading-relaxed sm:text-sm ${s.muted}`}>{item.description}</dd>
            ) : null}
          </div>
        ))}
      </dl>
    </section>
  )
}

/** 글래스 — 가로 연도 타임라인 */
function GlassMilestones({ items, s }: { items: CompanyMilestone[]; s: ToneStyle }) {
  return (
    <section className={`rounded-2xl border px-5 py-8 sm:px-8 ${s.section}`}>
      <SectionIntro s={s} label="History" title="연혁" />
      <div className="mt-8 min-w-0 overflow-x-auto pb-2">
        <ol className="flex min-w-max gap-0">
          {items.map((item, i) => (
            <li key={`${i}-${item.year}`} className="relative flex w-44 shrink-0 flex-col px-3 first:pl-0">
              {i < items.length - 1 ? (
                <span className={`absolute left-3 top-4 h-0.5 w-[calc(100%-0.75rem)] ${s.border} bg-indigo-200`} aria-hidden />
              ) : null}
              <span className={`relative z-10 size-3 rounded-full ${s.dot}`} aria-hidden />
              <p className={`mt-3 text-sm font-bold tabular-nums ${s.label}`}>{item.year}</p>
              <p className={`mt-1 text-sm font-semibold ${s.title}`}>{item.title}</p>
              {item.description.trim() ? (
                <p className={`mt-1 line-clamp-3 text-xs leading-relaxed ${s.muted}`}>{item.description}</p>
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/** 스플릿 — 표 형식 */
function SplitMilestones({ items, s }: { items: CompanyMilestone[]; s: ToneStyle }) {
  return (
    <section>
      <SectionIntro s={s} label="Timeline" title="연혁" />
      <div className={`mt-6 overflow-hidden rounded-xl border ${s.border}`}>
        <table className="w-full min-w-0 text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="w-24 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">연도</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">내용</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={`${i}-${item.year}`} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/80'}>
                <td className={`border-b border-slate-100 px-4 py-3 font-bold tabular-nums ${s.label}`}>{item.year}</td>
                <td className="border-b border-slate-100 px-4 py-3">
                  <p className={`font-semibold ${s.title}`}>{item.title}</p>
                  {item.description.trim() ? <p className={`mt-1 text-xs ${s.muted}`}>{item.description}</p> : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

/** 에디토리얼 — 2열 카드 + 큰 연도 */
function EditorialMilestones({ items, s }: { items: CompanyMilestone[]; s: ToneStyle }) {
  return (
    <section className={`rounded-2xl border px-5 py-8 sm:px-8 sm:py-10 ${s.section}`}>
      <SectionIntro s={s} label="History" title="연혁" />
      <ul className="mt-8 grid min-w-0 gap-6 sm:grid-cols-2">
        {items.map((item, i) => (
          <li key={`${i}-${item.year}`} className={`relative min-w-0 overflow-hidden rounded-lg border p-5 sm:p-6 ${s.card}`}>
            <p className={`pointer-events-none absolute -right-2 -top-4 font-serif text-7xl font-light leading-none opacity-[0.07] ${s.title}`}>
              {item.year}
            </p>
            <p className={`text-xs font-bold uppercase tracking-widest ${s.label}`}>{item.year}</p>
            <p className={`relative mt-2 font-serif text-lg font-medium ${s.title}`}>{item.title}</p>
            {item.description.trim() ? (
              <p className={`relative mt-2 text-pretty text-sm leading-relaxed ${s.muted}`}>{item.description}</p>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  )
}

/** 미니멀 — 연도 | 본문 2열 타임라인 */
function MinimalMilestones({ items, s }: { items: CompanyMilestone[]; s: ToneStyle }) {
  return (
    <section>
      <SectionIntro s={s} label="History" title="연혁" />
      <ol className="mt-6 space-y-0">
        {items.map((item, i) => (
          <li
            key={`${i}-${item.year}`}
            className={`grid gap-3 border-b py-5 sm:grid-cols-[5.5rem_1fr] sm:gap-6 ${s.border} last:border-b-0`}
          >
            <p className={`text-lg font-bold tabular-nums ${s.label}`}>{item.year}</p>
            <div>
              <p className={`text-sm font-semibold ${s.title}`}>{item.title}</p>
              {item.description.trim() ? (
                <p className={`mt-1 text-pretty text-xs leading-relaxed sm:text-sm ${s.muted}`}>{item.description}</p>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

/** 글래스 — 파트너 타일 그리드 */
function GlassPartners({ items, s }: { items: CompanyPartner[]; s: ToneStyle }) {
  return (
    <section>
      <SectionIntro s={s} label="Partners" title="협력사" />
      <ul className="mt-6 grid min-w-0 grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((item, i) => (
          <li
            key={`${i}-${item.name}`}
            className={`flex min-h-[4.5rem] items-center justify-center rounded-xl border px-3 py-4 text-center ${s.partner}`}
          >
            <PartnerMark
              item={item}
              imgClassName="max-h-10 max-w-full object-contain"
              nameClassName="text-sm font-semibold"
            />
          </li>
        ))}
      </ul>
    </section>
  )
}

/** 스플릿 — 한 줄 로고 월 */
function SplitPartners({ items, s }: { items: CompanyPartner[]; s: ToneStyle }) {
  return (
    <section className={`rounded-xl border px-5 py-6 sm:px-8 ${s.section}`}>
      <SectionIntro s={s} label="Trusted by" title="협력사" />
      <p className={`mt-6 flex min-w-0 flex-wrap items-center gap-x-2 gap-y-2 text-sm font-medium ${s.title}`}>
        {items.map((item, i) => (
          <span key={`${i}-${item.name}`} className="inline-flex items-center gap-2">
            {i > 0 ? <span className="text-slate-300" aria-hidden>|</span> : null}
            <PartnerMark item={item} imgClassName="max-h-6 max-w-[7rem] object-contain" nameClassName="" />
          </span>
        ))}
      </p>
    </section>
  )
}

/** 에디토리얼 — 2열 명단 */
function EditorialPartners({ items, s }: { items: CompanyPartner[]; s: ToneStyle }) {
  return (
    <section>
      <SectionIntro s={s} label="Partners" title="협력사" />
      <ul className={`mt-8 columns-1 gap-x-10 sm:columns-2 ${s.muted}`}>
        {items.map((item, i) => (
          <li
            key={`${i}-${item.name}`}
            className={`mb-3 break-inside-avoid border-b pb-3 font-serif text-base tracking-wide ${s.partner} border-neutral-800`}
          >
            <PartnerMark item={item} imgClassName="max-h-8 max-w-full object-contain opacity-90" nameClassName="" />
          </li>
        ))}
      </ul>
    </section>
  )
}

/** 로고 트러스트 — 업무 3열 카드 */
function LogoTrustServices({ items, s }: { items: CompanyService[]; s: ToneStyle }) {
  return (
    <section>
      <SectionIntro s={s} label="Services" title="하는 업무" />
      <ul className="mt-6 grid min-w-0 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <li key={`${i}-${item.title}`} className={`rounded-xl border p-5 ${s.card}`}>
            <p className={`text-xs font-semibold uppercase tracking-wider ${s.label}`}>{String(i + 1).padStart(2, '0')}</p>
            <h3 className={`mt-2 text-base font-semibold ${s.title}`}>{item.title}</h3>
            {item.description.trim() ? (
              <p className={`mt-2 text-pretty text-sm leading-relaxed ${s.muted}`}>{item.description}</p>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  )
}

/** 로고 트러스트 — 세로 타임라인 */
function LogoTrustMilestones({ items, s }: { items: CompanyMilestone[]; s: ToneStyle }) {
  return (
    <section className={`rounded-2xl border px-6 py-8 sm:px-10 ${s.section}`}>
      <SectionIntro s={s} label="History" title="연혁" />
      <ol className={`relative mt-8 space-y-8 border-l-2 pl-8 sm:pl-10 ${s.border}`}>
        {items.map((item, i) => (
          <li key={`${i}-${item.year}`} className="relative">
            <span className={`absolute -left-[calc(2rem+5px)] top-1 size-2.5 rounded-full sm:-left-[calc(2.5rem+5px)] ${s.dot}`} aria-hidden />
            <p className={`text-sm font-bold tabular-nums ${s.label}`}>{item.year}</p>
            <p className={`mt-1 text-base font-semibold ${s.title}`}>{item.title}</p>
            {item.description.trim() ? (
              <p className={`mt-1 text-pretty text-sm leading-relaxed ${s.muted}`}>{item.description}</p>
            ) : null}
          </li>
        ))}
      </ol>
    </section>
  )
}

/** 로고 트러스트 — 로고 마크 그리드(그레이스케일) + 이름 캡션 */
function LogoTrustPartners({ items, s }: { items: CompanyPartner[]; s: ToneStyle }) {
  return (
    <section className={`overflow-hidden rounded-2xl border ${s.section}`}>
      <div className="border-b border-slate-200 bg-slate-50/90 px-6 py-8 text-center sm:px-10">
        <p className={`text-xs font-semibold uppercase tracking-[0.25em] ${s.label}`}>Trusted by</p>
        <h2 className={`mt-2 text-2xl font-semibold tracking-tight sm:text-3xl ${s.title}`}>협력사</h2>
      </div>
      <ul className="grid min-w-0 grid-cols-2 gap-px bg-slate-200 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((item, i) => {
          const hasLogo = Boolean(item.logoUrl.trim())
          return (
            <li
              key={`${i}-${item.name}`}
              className="flex min-h-[7.5rem] flex-col items-center justify-center gap-3 bg-white px-4 py-6 sm:min-h-[8.5rem]"
            >
              <div className="flex h-16 w-full items-center justify-center">
                <PartnerMark
                  item={item}
                  imgClassName="max-h-14 max-w-[10rem] object-contain grayscale opacity-75 transition hover:grayscale-0 hover:opacity-100"
                  nameClassName={`text-center text-sm font-semibold ${s.title}`}
                />
              </div>
              {hasLogo ? <p className={`text-center text-[11px] font-medium tracking-wide ${s.muted}`}>{item.name}</p> : null}
            </li>
          )
        })}
      </ul>
    </section>
  )
}

/** 미니멀 — 접기 가능한 그리드 */
function MinimalPartners({ items, s }: { items: CompanyPartner[]; s: ToneStyle }) {
  const [expanded, setExpanded] = useState(false)
  const preview = 6
  const hidden = Math.max(0, items.length - preview)
  const visible = !expanded && hidden > 0 ? items.slice(0, preview) : items

  return (
    <section>
      <SectionIntro s={s} label="Partners" title="협력사" />
      <ul className="mt-6 grid min-w-0 grid-cols-2 gap-px overflow-hidden rounded-xl border bg-slate-200 sm:grid-cols-3">
        {visible.map((item, i) => (
          <li key={`${i}-${item.name}`} className={`flex min-h-11 items-center justify-center bg-white px-3 py-3 text-center ${s.title}`}>
            <PartnerMark
              item={item}
              imgClassName="max-h-8 max-w-full object-contain"
              nameClassName="text-xs font-medium sm:text-sm"
            />
          </li>
        ))}
      </ul>
      {hidden > 0 ? (
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className={`text-sm font-medium underline-offset-2 hover:underline ${s.label}`}
          >
            {expanded ? '접기' : `협력사 더 보기 (+${hidden})`}
          </button>
        </div>
      ) : null}
    </section>
  )
}

type Props = {
  data: CompanyPageData
  variant: CompanyDesignVariant
}

/** 웹 전용 — 변형별 업무·연혁·협력사 */
export function CompanyWebSections({ data, variant }: Props) {
  const s = tones[variant]
  const services = data.services.filter((x) => x.title.trim())
  const milestones = data.milestones.filter((x) => x.title.trim())
  const partners = data.partners.filter((x) => x.name.trim())

  if (services.length === 0 && milestones.length === 0 && partners.length === 0) return null

  return (
    <div className="mt-14 space-y-14 lg:mt-20 lg:space-y-20">
      {services.length > 0 ? (
        <>
          {variant === 'glass-b2b' ? <GlassServices items={services} s={s} /> : null}
          {variant === 'split-tech' ? <SplitServices items={services} s={s} /> : null}
          {variant === 'editorial' ? <EditorialServices items={services} s={s} /> : null}
          {variant === 'minimal' ? <MinimalServices items={services} s={s} /> : null}
          {variant === 'logo-trust' ? <LogoTrustServices items={services} s={s} /> : null}
        </>
      ) : null}

      {milestones.length > 0 ? (
        <>
          {variant === 'glass-b2b' ? <GlassMilestones items={milestones} s={s} /> : null}
          {variant === 'split-tech' ? <SplitMilestones items={milestones} s={s} /> : null}
          {variant === 'editorial' ? <EditorialMilestones items={milestones} s={s} /> : null}
          {variant === 'minimal' ? <MinimalMilestones items={milestones} s={s} /> : null}
          {variant === 'logo-trust' ? <LogoTrustMilestones items={milestones} s={s} /> : null}
        </>
      ) : null}

      {partners.length > 0 ? (
        <>
          {variant === 'glass-b2b' ? <GlassPartners items={partners} s={s} /> : null}
          {variant === 'split-tech' ? <SplitPartners items={partners} s={s} /> : null}
          {variant === 'editorial' ? <EditorialPartners items={partners} s={s} /> : null}
          {variant === 'minimal' ? <MinimalPartners items={partners} s={s} /> : null}
          {variant === 'logo-trust' ? <LogoTrustPartners items={partners} s={s} /> : null}
        </>
      ) : null}
    </div>
  )
}
