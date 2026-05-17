'use client'

import { PartnerMark } from '@/templates/company/company-partner-mark'
import { cn } from '@/lib/utils'
import { previewWebSectionsPad, previewWebSectionsStack } from '@/templates/preview-layout'
import type { AppIntroDesign, ConstructionIntroDesign, StartupIntroDesign } from '@/templates/shared/business-intro-design'
import type {
  AppScreenshot,
  BusinessIntroData,
  IntroCertification,
  IntroFeatureCard,
  IntroMetric,
  IntroProject,
  TrustedLogo,
} from '@/templates/shared/business-intro-schema'

type CategoryId = 'startup' | 'construction' | 'app'
type Design = StartupIntroDesign | ConstructionIntroDesign | AppIntroDesign

type Tone = {
  section: string
  card: string
  label: string
  title: string
  muted: string
  border: string
  accent: string
}

function toneFor(categoryId: CategoryId, design: Design): Tone {
  if (categoryId === 'app') {
    if (design === 'orbit-cards')
      return {
        section: 'border-cyan-500/30 bg-zinc-950/80',
        card: 'border-cyan-500/20 bg-zinc-900/60',
        label: 'text-cyan-400',
        title: 'text-white',
        muted: 'text-zinc-400',
        border: 'border-zinc-800',
        accent: 'bg-cyan-500 text-zinc-950',
      }
    if (design === 'chalk-play')
      return {
        section: 'border-purple-300 bg-purple-50/50',
        card: 'border-purple-300 bg-white',
        label: 'text-purple-700',
        title: 'text-purple-950',
        muted: 'text-purple-800/80',
        border: 'border-purple-200',
        accent: 'bg-purple-600 text-white',
      }
    if (design === 'spec-slab')
      return {
        section: 'border-zinc-900 bg-zinc-100',
        card: 'border-zinc-900 bg-white',
        label: 'text-zinc-500',
        title: 'text-zinc-900',
        muted: 'text-zinc-600',
        border: 'border-zinc-300',
        accent: 'bg-zinc-900 text-white',
      }
    return {
      section: 'border-emerald-200 bg-emerald-50/50',
      card: 'border-emerald-200 bg-white',
      label: 'text-emerald-700',
      title: 'text-slate-900',
      muted: 'text-slate-600',
      border: 'border-emerald-200',
      accent: 'bg-emerald-600 text-white',
    }
  }
  if (categoryId === 'construction') {
    if (design === 'blueprint-grid')
      return {
        section: 'border-sky-300 bg-sky-50/80',
        card: 'border-sky-400/60 bg-white',
        label: 'text-sky-800',
        title: 'text-slate-900',
        muted: 'text-slate-600',
        border: 'border-sky-200',
        accent: 'bg-sky-700 text-white',
      }
    if (design === 'yard-beacon')
      return {
        section: 'border-amber-400 bg-amber-50',
        card: 'border-amber-300 bg-white',
        label: 'text-amber-800',
        title: 'text-slate-900',
        muted: 'text-slate-700',
        border: 'border-amber-200',
        accent: 'bg-amber-500 text-black',
      }
    if (design === 'tender-seal')
      return {
        section: 'border-stone-400 bg-[#f5f0e8]',
        card: 'border-stone-400 bg-white',
        label: 'text-stone-600',
        title: 'text-stone-900',
        muted: 'text-stone-600',
        border: 'border-stone-300',
        accent: 'bg-stone-800 text-white',
      }
    return {
      section: 'border-slate-300 bg-slate-100',
      card: 'border-slate-200 bg-white',
      label: 'text-amber-700',
      title: 'text-slate-900',
      muted: 'text-slate-600',
      border: 'border-slate-200',
      accent: 'bg-amber-600 text-white',
    }
  }
  if (design === 'velocity-rail')
    return {
      section: 'border-cyan-500/20 bg-zinc-900/50',
      card: 'border-zinc-800 bg-zinc-950',
      label: 'text-cyan-400',
      title: 'text-white',
      muted: 'text-zinc-400',
      border: 'border-zinc-800',
      accent: 'bg-cyan-500 text-zinc-950',
    }
  if (design === 'horizon-proof')
    return {
      section: 'border-orange-200 bg-orange-50/80',
      card: 'border-orange-200 bg-white shadow-sm',
      label: 'text-orange-600',
      title: 'text-slate-900',
      muted: 'text-slate-600',
      border: 'border-orange-200',
      accent: 'bg-orange-500 text-white',
    }
  if (design === 'ink-ledger')
    return {
      section: 'border-slate-600 bg-[#f8f4ec]',
      card: 'border-slate-400 bg-white',
      label: 'text-slate-600',
      title: 'text-slate-900',
      muted: 'text-slate-600',
      border: 'border-slate-300',
      accent: 'bg-slate-800 text-white',
    }
  return {
    section: 'border-violet-200 bg-violet-50/50',
    card: 'border-violet-200 bg-white',
    label: 'text-violet-700',
    title: 'text-slate-900',
    muted: 'text-slate-600',
    border: 'border-violet-200',
    accent: 'bg-violet-600 text-white',
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

function MetricsSection({ items, s, design }: { items: IntroMetric[]; s: Tone; design: Design }) {
  return (
    <section className={`rounded-2xl border px-6 py-8 sm:px-10 ${s.section}`}>
      <Intro s={s} label="Traction" title="핵심 지표" />
      <ul
        className={`mt-6 grid gap-4 ${
          design === 'horizon-proof' ? 'sm:grid-cols-3' : 'sm:grid-cols-2 lg:grid-cols-3'
        }`}
      >
        {items.map((m, i) => (
          <li key={`${i}-${m.label}`} className={`rounded-xl border p-5 text-center ${s.card}`}>
            <p className={`text-3xl font-bold tabular-nums ${s.title}`}>{m.value}</p>
            <p className={`mt-2 text-xs font-medium uppercase tracking-wide ${s.muted}`}>{m.label}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

function TrustedSection({ items, s }: { items: TrustedLogo[]; s: Tone }) {
  return (
    <section>
      <Intro s={s} label="Trusted by" title="고객사 · 파트너" />
      <ul className="mt-6 grid min-w-0 grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((item, i) => (
          <li key={`${i}-${item.name}`} className={`flex min-h-14 items-center justify-center rounded-lg border px-3 py-4 ${s.card}`}>
            <PartnerMark
              item={item}
              imgClassName="max-h-9 max-w-full object-contain opacity-80 grayscale"
              nameClassName={`text-xs font-semibold ${s.title}`}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}

function ProjectsSection({ items, s, design }: { items: IntroProject[]; s: Tone; design: Design }) {
  if (design === 'blueprint-grid') {
    return (
      <section>
        <Intro s={s} label="Portfolio" title="시공 실적" />
        <ul className="mt-6 grid gap-px border border-sky-300 bg-sky-300 sm:grid-cols-2">
          {items.map((p, i) => (
            <li key={`${i}-${p.title}`} className="bg-white p-5">
              <p className="font-mono text-[10px] uppercase text-sky-700">{p.year.trim() || 'Project'}</p>
              <p className="mt-2 font-semibold text-slate-900">{p.title}</p>
              {p.description.trim() ? <p className="mt-2 text-sm text-slate-600">{p.description}</p> : null}
            </li>
          ))}
        </ul>
      </section>
    )
  }
  return (
    <section>
      <Intro s={s} label="Projects" title="시공 실적" />
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p, i) => (
          <li key={`${i}-${p.title}`} className={`overflow-hidden rounded-xl border ${s.card}`}>
            <div className="aspect-[16/10] bg-slate-200">
              {p.imageUrl.trim() ? <img src={p.imageUrl.trim()} alt="" className="size-full object-cover" /> : null}
            </div>
            <div className="p-4">
              {p.year.trim() ? <p className={`text-xs font-bold ${s.label}`}>{p.year}</p> : null}
              <p className={`mt-1 font-semibold ${s.title}`}>{p.title}</p>
              {p.description.trim() ? <p className={`mt-2 text-xs leading-relaxed ${s.muted}`}>{p.description}</p> : null}
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

function CertificationsSection({ items, s }: { items: IntroCertification[]; s: Tone }) {
  return (
    <section className={`rounded-xl border p-6 sm:p-8 ${s.section}`}>
      <Intro s={s} label="Credentials" title="인증 · 면허" />
      <ul className={`mt-6 divide-y ${s.border}`}>
        {items.map((c, i) => (
          <li key={`${i}-${c.title}`} className="flex flex-wrap items-baseline justify-between gap-2 py-3">
            <span className={`font-semibold ${s.title}`}>{c.title}</span>
            {c.issuer.trim() ? <span className={`text-sm ${s.muted}`}>{c.issuer}</span> : null}
          </li>
        ))}
      </ul>
    </section>
  )
}

function GallerySection({ urls, s }: { urls: string[]; s: Tone }) {
  return (
    <section>
      <Intro s={s} label="Site" title="현장 갤러리" />
      <div className="mt-6 grid min-w-0 grid-cols-2 gap-2 lg:grid-cols-3">
        {urls.map((src, i) => (
          <div key={i} className={`aspect-[4/3] overflow-hidden rounded-lg border ${s.card}`}>
            <img src={src} alt="" className="size-full object-cover" />
          </div>
        ))}
      </div>
    </section>
  )
}

function ScreenshotsSection({ items, s, design }: { items: AppScreenshot[]; s: Tone; design: Design }) {
  return (
    <section>
      <Intro s={s} label="Screens" title="앱 스크린샷" />
      <ul className={`mt-6 flex min-w-0 gap-4 overflow-x-auto pb-2 ${design === 'store-stage' ? '' : ''}`}>
        {items.map((shot, i) => {
          const url = shot.url.trim()
          if (!url) return null
          return (
            <li key={i} className="w-44 shrink-0">
              <div className={`overflow-hidden rounded-2xl border-4 shadow-lg ${s.card}`}>
                <img src={url} alt={shot.caption.trim() || ''} className="aspect-[9/19] w-full object-cover" />
              </div>
              {shot.caption.trim() ? <p className={`mt-2 text-center text-xs ${s.muted}`}>{shot.caption}</p> : null}
            </li>
          )
        })}
      </ul>
    </section>
  )
}

function FeatureCardsSection({ items, s, design }: { items: IntroFeatureCard[]; s: Tone; design: Design }) {
  return (
    <section>
      <Intro s={s} label="Features" title="주요 기능" />
      <ul className={`mt-6 grid gap-4 ${design === 'chalk-play' ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3'}`}>
        {items.map((f, i) => (
          <li key={`${i}-${f.title}`} className={`rounded-xl border p-5 ${s.card}`}>
            <p className={`font-semibold ${s.title}`}>{f.title}</p>
            {f.description.trim() ? <p className={`mt-2 text-sm leading-relaxed ${s.muted}`}>{f.description}</p> : null}
          </li>
        ))}
      </ul>
    </section>
  )
}

function StoreLinksSection({
  appStore,
  playStore,
  s,
}: {
  appStore: string
  playStore: string
  s: Tone
}) {
  return (
    <section className={`rounded-xl border px-6 py-6 text-center sm:px-10 ${s.section}`}>
      <p className={`text-sm font-semibold ${s.title}`}>앱 스토어에서 다운로드</p>
      <div className="mt-4 flex flex-wrap justify-center gap-3">
        {appStore.trim() ? (
          <a href={appStore.trim()} className={`inline-flex h-11 items-center rounded-lg px-6 text-sm font-semibold ${s.accent}`}>
            App Store
          </a>
        ) : null}
        {playStore.trim() ? (
          <a
            href={playStore.trim()}
            className={`inline-flex h-11 items-center rounded-lg border px-6 text-sm font-semibold ${s.card} ${s.title}`}
          >
            Google Play
          </a>
        ) : null}
      </div>
    </section>
  )
}

type Props = {
  data: BusinessIntroData
  categoryId: CategoryId
  design: Design
}

export function BusinessIntroWebSections({ data, categoryId, design }: Props) {
  const s = toneFor(categoryId, design)
  const metrics = data.metrics.filter((m) => m.label.trim() && m.value.trim())
  const logos = data.trustedLogos.filter((x) => x.name.trim())
  const projects = data.projects.filter((p) => p.title.trim())
  const certs = data.certifications.filter((c) => c.title.trim())
  const gallery = data.galleryImageUrls.map((u) => u.trim()).filter(Boolean)
  const screenshots = data.screenshots.filter((x) => x.url.trim())
  const features = data.featureCards.filter((f) => f.title.trim())
  const hasStores = Boolean(data.appStoreUrl.trim() || data.playStoreUrl.trim())

  const isStoreStageApp = categoryId === 'app' && design === 'store-stage'
  const sectionShell = isStoreStageApp
    ? 'mx-auto max-w-6xl space-y-12 px-4 py-12 sm:px-8 lg:space-y-16 lg:py-16'
    : cn(previewWebSectionsPad('pt-0 pb-12'), previewWebSectionsStack())

  if (categoryId === 'startup') {
    if (metrics.length === 0 && logos.length === 0 && features.length === 0) return null
    return (
      <div className={sectionShell}>
        {metrics.length > 0 ? <MetricsSection items={metrics} s={s} design={design} /> : null}
        {logos.length > 0 ? <TrustedSection items={logos} s={s} /> : null}
        {features.length > 0 ? <FeatureCardsSection items={features} s={s} design={design} /> : null}
      </div>
    )
  }

  if (categoryId === 'construction') {
    if (projects.length === 0 && certs.length === 0 && gallery.length === 0) return null
    return (
      <div className={sectionShell}>
        {projects.length > 0 ? <ProjectsSection items={projects} s={s} design={design} /> : null}
        {gallery.length > 0 ? <GallerySection urls={gallery} s={s} /> : null}
        {certs.length > 0 ? <CertificationsSection items={certs} s={s} /> : null}
      </div>
    )
  }

  if (screenshots.length === 0 && features.length === 0 && !hasStores) return null
  return (
    <div className={sectionShell}>
      {screenshots.length > 0 ? <ScreenshotsSection items={screenshots} s={s} design={design} /> : null}
      {features.length > 0 ? <FeatureCardsSection items={features} s={s} design={design} /> : null}
      {hasStores ? <StoreLinksSection appStore={data.appStoreUrl} playStore={data.playStoreUrl} s={s} /> : null}
    </div>
  )
}
