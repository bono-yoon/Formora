'use client'

import type { PortfolioDesignVariant } from '@/templates/portfolio/portfolio-variant'
import { previewWebSectionsStack } from '@/templates/preview-layout'
import type {
  PortfolioPageData,
  PortfolioProject,
  PortfolioSkill,
  PortfolioTestimonial,
} from '@/templates/portfolio/schema'

type Tone = {
  card: string
  label: string
  title: string
  muted: string
  border: string
  chip: string
}

const tones: Record<PortfolioDesignVariant, Tone> = {
  'noir-studio': {
    card: 'border-zinc-800 bg-zinc-900/60',
    label: 'text-emerald-500/90',
    title: 'text-white',
    muted: 'text-zinc-400',
    border: 'border-zinc-800',
    chip: 'border-zinc-700 bg-zinc-900 text-zinc-300',
  },
  'daylight-editorial': {
    card: 'border-stone-200 bg-stone-50',
    label: 'text-stone-500',
    title: 'text-stone-900',
    muted: 'text-stone-600',
    border: 'border-stone-200',
    chip: 'border-stone-300 bg-white text-stone-700',
  },
  'film-reel': {
    card: 'border-neutral-800 bg-neutral-900/80',
    label: 'text-amber-500/90',
    title: 'text-neutral-100',
    muted: 'text-neutral-400',
    border: 'border-neutral-800',
    chip: 'border-neutral-700 bg-black font-mono text-xs text-neutral-300',
  },
  'swiss-index': {
    card: 'border-black bg-white',
    label: 'text-black/50',
    title: 'text-black',
    muted: 'text-neutral-600',
    border: 'border-black',
    chip: 'border-black bg-white text-xs font-bold uppercase text-black',
  },
}

function Intro({ s, label, title }: { s: Tone; label: string; title: string }) {
  return (
    <>
      <p className={`text-xs font-semibold uppercase tracking-widest ${s.label}`}>{label}</p>
      <h2 className={`mt-2 text-xl font-semibold tracking-tight sm:text-2xl ${s.title}`}>{title}</h2>
    </>
  )
}

function ProjectsSection({
  items,
  s,
  variant,
}: {
  items: PortfolioProject[]
  s: Tone
  variant: PortfolioDesignVariant
}) {
  if (variant === 'film-reel') {
    return (
      <section>
        <Intro s={s} label="Work" title="프로젝트" />
        <ul className="mt-6 flex min-w-0 gap-4 overflow-x-auto pb-2">
          {items.map((p, i) => (
            <li key={`${i}-${p.title}`} className={`w-64 shrink-0 overflow-hidden rounded-lg border ${s.card}`}>
              <div className="aspect-video bg-black/40">
                {p.imageUrl.trim() ? (
                  <img src={p.imageUrl.trim()} alt="" className="size-full object-cover" />
                ) : (
                  <div className="flex size-full items-center justify-center text-[10px] text-neutral-500">Frame</div>
                )}
              </div>
              <div className="p-4">
                <p className={`font-mono text-[10px] ${s.label}`}>{p.role.trim() || 'Project'}</p>
                <p className={`mt-1 text-sm font-semibold ${s.title}`}>{p.title}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    )
  }

  if (variant === 'swiss-index') {
    return (
      <section>
        <Intro s={s} label="Index" title="프로젝트" />
        <ol className="mt-6 divide-y divide-black border-t border-black">
          {items.map((p, i) => (
            <li key={`${i}-${p.title}`} className="grid gap-4 py-5 sm:grid-cols-[3rem_1fr_auto] sm:items-start">
              <span className="text-3xl font-black text-black/15">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <p className="font-bold">{p.title}</p>
                {p.role.trim() ? <p className={`mt-1 text-xs uppercase ${s.muted}`}>{p.role}</p> : null}
                {p.description.trim() ? <p className={`mt-2 text-sm ${s.muted}`}>{p.description}</p> : null}
              </div>
              {p.projectUrl.trim() ? (
                <a href={p.projectUrl.trim()} className="text-xs font-bold underline">
                  View
                </a>
              ) : null}
            </li>
          ))}
        </ol>
      </section>
    )
  }

  if (variant === 'daylight-editorial') {
    return (
      <section>
        <Intro s={s} label="Selected work" title="프로젝트" />
        <ul className="mt-8 space-y-10">
          {items.map((p, i) => (
            <li key={`${i}-${p.title}`} className={`border-b pb-10 ${s.border}`}>
              <p className="font-serif text-5xl font-light text-stone-300">{String(i + 1).padStart(2, '0')}</p>
              <div className="mt-4 grid gap-6 sm:grid-cols-[1fr_200px]">
                <div>
                  <h3 className={`font-serif text-xl ${s.title}`}>{p.title}</h3>
                  {p.role.trim() ? <p className={`mt-1 text-sm italic ${s.muted}`}>{p.role}</p> : null}
                  {p.description.trim() ? <p className={`mt-3 text-sm leading-relaxed ${s.muted}`}>{p.description}</p> : null}
                </div>
                <div className={`aspect-[4/3] overflow-hidden border ${s.card}`}>
                  {p.imageUrl.trim() ? <img src={p.imageUrl.trim()} alt="" className="size-full object-cover" /> : null}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    )
  }

  return (
    <section>
      <Intro s={s} label="Work" title="프로젝트" />
      <ul className="mt-6 grid min-w-0 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p, i) => (
          <li key={`${i}-${p.title}`} className={`overflow-hidden rounded-xl border ${s.card}`}>
            <div className="aspect-[16/10] bg-zinc-800">
              {p.imageUrl.trim() ? <img src={p.imageUrl.trim()} alt="" className="size-full object-cover" /> : null}
            </div>
            <div className="p-4">
              <p className={`text-xs uppercase tracking-wider ${s.label}`}>{p.role.trim() || 'Case study'}</p>
              <p className={`mt-2 font-medium ${s.title}`}>{p.title}</p>
              {p.description.trim() ? <p className={`mt-2 text-xs leading-relaxed ${s.muted}`}>{p.description}</p> : null}
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

function SkillsSection({ items, s, variant }: { items: PortfolioSkill[]; s: Tone; variant: PortfolioDesignVariant }) {
  if (variant === 'swiss-index') {
    return (
      <section className={`border-t pt-10 ${s.border}`}>
        <Intro s={s} label="Stack" title="스킬" />
        <dl className="mt-6 grid gap-3 sm:grid-cols-2">
          {items.map((sk, i) => (
            <div key={`${i}-${sk.name}`} className={`flex justify-between border-b py-2 text-sm ${s.border}`}>
              <dt className="font-bold">{sk.name}</dt>
              <dd className={s.muted}>—</dd>
            </div>
          ))}
        </dl>
      </section>
    )
  }

  return (
    <section className={variant === 'daylight-editorial' ? `border-t pt-10 ${s.border}` : ''}>
      <Intro s={s} label="Skills" title="스킬" />
      <ul className={`mt-5 flex min-w-0 flex-wrap gap-2 ${variant === 'film-reel' ? 'font-mono' : ''}`}>
        {items.map((sk, i) => (
          <li key={`${i}-${sk.name}`} className={`rounded-full border px-3 py-1.5 text-xs font-medium ${s.chip}`}>
            {sk.name}
          </li>
        ))}
      </ul>
    </section>
  )
}

function TestimonialsSection({
  items,
  s,
  variant,
}: {
  items: PortfolioTestimonial[]
  s: Tone
  variant: PortfolioDesignVariant
}) {
  if (variant === 'daylight-editorial') {
    return (
      <section className={`border-t pt-12 ${s.border}`}>
        <Intro s={s} label="Words" title="추천사" />
        <ul className="mt-8 space-y-8">
          {items.map((t, i) => (
            <li key={`${i}-${t.author}`} className="max-w-2xl">
              <p className={`font-serif text-lg italic leading-relaxed ${s.title}`}>&ldquo;{t.quote}&rdquo;</p>
              <p className={`mt-4 text-sm ${s.muted}`}>
                — {t.author.trim() || 'Anonymous'}
                {t.role.trim() ? `, ${t.role}` : ''}
              </p>
            </li>
          ))}
        </ul>
      </section>
    )
  }

  return (
    <section>
      <Intro s={s} label="Testimonials" title="추천사" />
      <ul className={`mt-6 grid gap-4 ${variant === 'noir-studio' ? 'lg:grid-cols-2' : ''}`}>
        {items.map((t, i) => (
          <li
            key={`${i}-${t.author}`}
            className={`rounded-xl border p-5 ${s.card} ${variant === 'noir-studio' ? 'border-l-4 border-l-emerald-500' : ''}`}
          >
            <p className={`text-sm leading-relaxed ${s.muted}`}>&ldquo;{t.quote}&rdquo;</p>
            <p className={`mt-3 text-xs font-semibold ${s.title}`}>
              {t.author.trim() || 'Client'}
              {t.role.trim() ? <span className={`font-normal ${s.muted}`}> · {t.role}</span> : null}
            </p>
          </li>
        ))}
      </ul>
    </section>
  )
}

type Props = {
  data: PortfolioPageData
  variant: PortfolioDesignVariant
}

export function PortfolioWebSections({ data, variant }: Props) {
  const s = tones[variant]
  const projects = data.projects.filter((p) => p.title.trim())
  const skills = data.skills.filter((sk) => sk.name.trim())
  const testimonials = data.testimonials.filter((t) => t.quote.trim())

  if (projects.length === 0 && skills.length === 0 && testimonials.length === 0) return null

  return (
    <div className={previewWebSectionsStack()}>
      {projects.length > 0 ? <ProjectsSection items={projects} s={s} variant={variant} /> : null}
      {skills.length > 0 ? <SkillsSection items={skills} s={s} variant={variant} /> : null}
      {testimonials.length > 0 ? <TestimonialsSection items={testimonials} s={s} variant={variant} /> : null}
    </div>
  )
}
