'use client'

import { useState } from 'react'

import type { CafeDesignVariant } from '@/templates/cafe/cafe-variant'
import type { CafeMenuItem } from '@/templates/cafe/schema'

export type CafeMenuTone = 'warm' | 'garden' | 'midnight' | 'espresso'

type ToneStyle = {
  label: string
  title: string
  muted: string
  price: string
  card: string
  button: string
  panel: string
}

const tones: Record<CafeMenuTone, ToneStyle> = {
  warm: {
    label: 'text-amber-800/80',
    title: 'text-stone-900',
    muted: 'text-stone-600',
    price: 'text-amber-900',
    card: 'border-amber-200/70 bg-white shadow-sm',
    button: 'border-amber-300 bg-amber-50 text-amber-900 hover:bg-amber-100',
    panel: 'border-amber-200/60 bg-white/80',
  },
  garden: {
    label: 'text-emerald-700/80',
    title: 'text-emerald-950',
    muted: 'text-emerald-900/75',
    price: 'text-emerald-800',
    card: 'border-emerald-200/80 bg-white shadow-sm',
    button: 'border-emerald-300 bg-emerald-50 text-emerald-900 hover:bg-emerald-100',
    panel: 'border-emerald-200/80 bg-white/90',
  },
  midnight: {
    label: 'text-amber-500/80',
    title: 'text-white',
    muted: 'text-zinc-400',
    price: 'text-amber-300',
    card: 'border-zinc-800/80 bg-zinc-950/40',
    button: 'border-amber-500/50 text-amber-200 hover:bg-amber-500/10',
    panel: 'border-amber-500/30 bg-zinc-950/80',
  },
  espresso: {
    label: 'text-stone-500',
    title: 'text-stone-900',
    muted: 'text-stone-600',
    price: 'text-stone-900',
    card: 'border-stone-900 bg-white',
    button: 'border-stone-900 bg-stone-100 text-stone-900 hover:bg-stone-200',
    panel: 'border-stone-900 bg-white',
  },
}

type MenuLayout = 'featured-expand' | 'grid-expand' | 'menu-board' | 'print-columns'

const layoutByVariant: Record<CafeDesignVariant, MenuLayout> = {
  'warm-heritage': 'featured-expand',
  'garden-terrace': 'grid-expand',
  'midnight-tapas': 'menu-board',
  'espresso-stripe': 'print-columns',
}

function MenuHeading({ s, count }: { s: ToneStyle; count: number }) {
  return (
    <>
      <p className={`text-xs font-semibold uppercase tracking-widest ${s.label}`}>Menu</p>
      <h2 className={`mt-2 text-xl font-semibold tracking-tight sm:text-2xl ${s.title}`}>메뉴</h2>
      <p className={`mt-1 text-xs ${s.muted}`}>총 {count}개</p>
    </>
  )
}

function ExpandButton({
  s,
  expanded,
  hiddenCount,
  onToggle,
}: {
  s: ToneStyle
  expanded: boolean
  hiddenCount: number
  onToggle: () => void
}) {
  if (hiddenCount <= 0) return null
  return (
    <div className="mt-5 text-center">
      <button
        type="button"
        onClick={onToggle}
        className={`inline-flex min-h-10 items-center justify-center rounded-full border px-6 text-sm font-semibold transition ${s.button}`}
      >
        {expanded ? '메뉴 접기' : `메뉴 더 보기 (${hiddenCount}개)`}
      </button>
    </div>
  )
}

/** 웜 헤리티지 — 추천 3종 크게 + 나머지 2열(일부만, 더 보기) */
function FeaturedExpandMenu({ items, s }: { items: CafeMenuItem[]; s: ToneStyle }) {
  const [expanded, setExpanded] = useState(false)
  const featured = items.slice(0, 3)
  const rest = items.slice(3)
  const restPreview = 4
  const restVisible = expanded || rest.length <= restPreview ? rest : rest.slice(0, restPreview)
  const restHidden = Math.max(0, rest.length - restPreview)

  return (
    <div className="mt-6 space-y-8">
      {featured.length > 0 ? (
        <div>
          <p className={`text-[10px] font-bold uppercase tracking-widest ${s.label}`}>추천</p>
          <ul className="mt-3 grid min-w-0 gap-3 sm:grid-cols-3">
            {featured.map((item, i) => (
              <li key={`f-${i}-${item.name}`} className={`rounded-2xl border p-4 sm:p-5 ${s.card}`}>
                <p className={`text-base font-semibold ${s.title}`}>{item.name}</p>
                {item.price.trim() ? <p className={`mt-2 text-sm font-semibold ${s.price}`}>{item.price}</p> : null}
                {item.description.trim() ? (
                  <p className={`mt-2 text-xs leading-relaxed ${s.muted}`}>{item.description}</p>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      {rest.length > 0 ? (
        <div>
          <p className={`text-[10px] font-bold uppercase tracking-widest ${s.label}`}>전체 메뉴</p>
          <ul className="mt-3 grid min-w-0 gap-3 sm:grid-cols-2">
            {restVisible.map((item, i) => (
              <li key={`r-${i}-${item.name}`} className={`rounded-xl border p-4 ${s.card}`}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className={`text-sm font-semibold ${s.title}`}>{item.name}</p>
                  {item.price.trim() ? (
                    <p className={`text-sm font-semibold tabular-nums ${s.price}`}>{item.price}</p>
                  ) : null}
                </div>
                {item.description.trim() ? (
                  <p className={`mt-2 text-xs leading-relaxed ${s.muted}`}>{item.description}</p>
                ) : null}
              </li>
            ))}
          </ul>
          <ExpandButton s={s} expanded={expanded} hiddenCount={restHidden} onToggle={() => setExpanded((v) => !v)} />
        </div>
      ) : null}
    </div>
  )
}

/** 가든 — 2열 카드, 6개 후 더 보기 */
function GridExpandMenu({ items, s, initialCount }: { items: CafeMenuItem[]; s: ToneStyle; initialCount: number }) {
  const [expanded, setExpanded] = useState(false)
  const hiddenCount = Math.max(0, items.length - initialCount)
  const visible = !expanded && hiddenCount > 0 ? items.slice(0, initialCount) : items

  return (
    <>
      <ul className="mt-6 grid min-w-0 gap-3 sm:grid-cols-2">
        {visible.map((item, i) => (
          <li key={`${i}-${item.name}`} className={`rounded-xl border p-4 sm:p-5 ${s.card}`}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className={`text-sm font-semibold ${s.title}`}>{item.name}</p>
              {item.price.trim() ? <p className={`text-sm font-semibold tabular-nums ${s.price}`}>{item.price}</p> : null}
            </div>
            {item.description.trim() ? (
              <p className={`mt-2 text-xs leading-relaxed ${s.muted}`}>{item.description}</p>
            ) : null}
          </li>
        ))}
      </ul>
      <ExpandButton s={s} expanded={expanded} hiddenCount={hiddenCount} onToggle={() => setExpanded((v) => !v)} />
    </>
  )
}

/** 미드나잇 — 메뉴판 프레임 안 세로 스크롤(전체 목록) */
function MenuBoardMenu({ items, s }: { items: CafeMenuItem[]; s: ToneStyle }) {
  return (
    <div className={`relative mt-6 overflow-hidden rounded-2xl border ${s.panel}`}>
      <div className="max-h-[min(52vh,480px)] overflow-y-auto overscroll-contain px-4 py-4 sm:px-6 sm:py-5">
        <ul className="divide-y divide-zinc-800/80">
          {items.map((item, i) => (
            <li key={`${i}-${item.name}`} className="flex flex-wrap items-baseline justify-between gap-x-4 py-3 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className={`text-sm font-medium ${s.title}`}>{item.name}</p>
                {item.description.trim() ? (
                  <p className={`mt-0.5 text-xs ${s.muted}`}>{item.description}</p>
                ) : null}
              </div>
              {item.price.trim() ? (
                <p className={`shrink-0 text-sm font-semibold tabular-nums ${s.price}`}>{item.price}</p>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
      {items.length > 8 ? (
        <p
          className={`pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-zinc-950 via-zinc-950/90 to-transparent px-4 pb-2 pt-8 text-center text-[10px] ${s.muted}`}
          aria-hidden
        >
          아래로 스크롤
        </p>
      ) : null}
    </div>
  )
}

/** 에스프레소 — 인쇄 메뉴형 2~3단, 점선 리더 */
function PrintColumnsMenu({ items, s }: { items: CafeMenuItem[]; s: ToneStyle }) {
  const [expanded, setExpanded] = useState(false)
  const previewCount = 14
  const hiddenCount = Math.max(0, items.length - previewCount)
  const visible = !expanded && hiddenCount > 0 ? items.slice(0, previewCount) : items

  return (
    <>
      <div
        className={`mt-6 columns-1 gap-x-10 sm:columns-2 lg:columns-3 ${!expanded && hiddenCount > 0 ? '' : ''}`}
      >
        {visible.map((item, i) => (
          <article key={`${i}-${item.name}`} className="mb-5 break-inside-avoid">
            <div className="flex min-w-0 items-baseline gap-1">
              <span className={`shrink-0 text-xs font-bold uppercase tracking-wide ${s.title}`}>{item.name}</span>
              <span className={`mx-1 min-w-[1rem] flex-1 border-b border-dotted ${s.muted} opacity-40`} aria-hidden />
              {item.price.trim() ? (
                <span className={`shrink-0 text-xs font-bold tabular-nums ${s.price}`}>{item.price}</span>
              ) : null}
            </div>
            {item.description.trim() ? <p className={`mt-1 text-[11px] leading-snug ${s.muted}`}>{item.description}</p> : null}
          </article>
        ))}
      </div>
      <ExpandButton s={s} expanded={expanded} hiddenCount={hiddenCount} onToggle={() => setExpanded((v) => !v)} />
    </>
  )
}

type Props = {
  items: CafeMenuItem[]
  variant: CafeDesignVariant
  tone: CafeMenuTone
  className?: string
}

/** 변형별 메뉴 레이아웃 — 접기만 쓰지 않고 패턴마다 다르게 */
export function CafeMenuSection({ items, variant, tone, className = '' }: Props) {
  const s = tones[tone]
  const layout = layoutByVariant[variant]

  if (items.length === 0) return null

  return (
    <section className={className}>
      <MenuHeading s={s} count={items.length} />
      {layout === 'featured-expand' ? <FeaturedExpandMenu items={items} s={s} /> : null}
      {layout === 'grid-expand' ? <GridExpandMenu items={items} s={s} initialCount={6} /> : null}
      {layout === 'menu-board' ? <MenuBoardMenu items={items} s={s} /> : null}
      {layout === 'print-columns' ? <PrintColumnsMenu items={items} s={s} /> : null}
    </section>
  )
}
