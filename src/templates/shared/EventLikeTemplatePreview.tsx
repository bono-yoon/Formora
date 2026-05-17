import type { EventLikeData } from '@/templates/shared/event-like-schema'
import type { EventOnlyDesign, SeminarEventDesign } from '@/templates/shared/event-like-design'
import { EventWebSections } from '@/templates/shared/event-web-sections'
import type { PageLayoutProfile } from '@/templates/page-layout'
import { previewPageRoot, previewWebSectionsPad } from '@/templates/preview-layout'

export type { SeminarEventDesign, EventOnlyDesign } from '@/templates/shared/event-like-design'

export type EventLikeTemplatePreviewProps = {
  data: EventLikeData
  categoryId: 'seminar' | 'event'
  /** 세미나: `SeminarEventDesign`, 이벤트: `EventOnlyDesign` */
  design: SeminarEventDesign | EventOnlyDesign
  layout?: PageLayoutProfile
}

function SeminarTrackBoard({
  data,
  layout,
  ticket,
}: {
  data: EventLikeData
  layout: PageLayoutProfile
  ticket: string
}) {
  const isWeb = layout === 'web'
  return (
    <div className={`${previewPageRoot(layout)} theme-bg-surface flex flex-col text-slate-900`}>
      <header className="theme-gradient-hero shrink-0 border-b border-indigo-200/60 text-white">
        <div className="mx-auto flex min-w-0 max-w-6xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-end sm:justify-between sm:px-6 sm:py-8 lg:px-10 lg:py-14">
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-indigo-200/90">Conference</p>
            <h1 className="mt-2 text-balance text-xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">{data.eventTitle}</h1>
            <p className="mt-2 max-w-xl text-sm text-indigo-100/95">{data.dateLine}</p>
          </div>
          {isWeb ? (
            <a
              href={ticket}
              className="hidden h-12 shrink-0 items-center justify-center rounded-xl bg-white px-6 text-sm font-semibold text-indigo-900 shadow-lg lg:inline-flex"
            >
              등록하기
            </a>
          ) : null}
        </div>
      </header>

      <div className="mx-auto flex min-w-0 w-full max-w-6xl flex-col lg:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-10 lg:px-8 lg:py-12">
        <div className="min-w-0 space-y-0 lg:space-y-10">
          <div
            className={
              isWeb
                ? 'grid gap-px bg-indigo-100/80 sm:grid-cols-3'
                : 'divide-y divide-slate-200 border-b border-slate-200 bg-white'
            }
          >
            <div className="bg-white px-4 py-4 sm:px-5">
              <p className="theme-text-primary text-[10px] font-bold uppercase tracking-widest">일정</p>
              <p className="mt-2 text-sm font-medium text-slate-900">{data.dateLine}</p>
            </div>
            <div className="bg-white px-4 py-4 sm:px-5">
              <p className="theme-text-primary text-[10px] font-bold uppercase tracking-widest">장소</p>
              <p className="mt-2 text-sm font-medium text-slate-900">{data.venue.trim() || '추후 공지'}</p>
            </div>
            <div className="bg-white px-4 py-4 sm:px-5">
              <p className="theme-text-primary text-[10px] font-bold uppercase tracking-widest">주최</p>
              <p className="mt-2 text-sm font-medium text-slate-900">{data.organizerName.trim() || '—'}</p>
            </div>
          </div>

          <div className="px-4 py-8 sm:px-6 lg:px-0 lg:py-0">
            {data.heroImageUrl.trim() ? (
              <img
                src={data.heroImageUrl.trim()}
                alt=""
                className="mb-8 w-full rounded-2xl border border-slate-200 object-cover shadow-sm sm:max-h-72"
              />
            ) : null}
            {data.description.trim() ? (
              <p className="max-w-2xl text-pretty text-sm leading-relaxed text-slate-600 lg:text-base">{data.description}</p>
            ) : null}
          </div>
        </div>

        {isWeb ? (
          <aside className="hidden min-w-0 lg:block">
            <div className="sticky top-6 rounded-2xl border-2 border-indigo-900/90 bg-white p-6 shadow-xl">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">등록</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{data.eventTitle}</p>
              <p className="mt-2 text-sm text-slate-600">{data.dateLine}</p>
              <a
                href={ticket}
                className="theme-fill-primary mt-6 flex h-12 w-full items-center justify-center rounded-xl text-sm font-semibold text-white hover:opacity-90"
              >
                등록하기
              </a>
            </div>
          </aside>
        ) : null}
      </div>

      {!isWeb ? (
        <div className="sticky bottom-0 z-10 shrink-0 border-t border-indigo-200/60 bg-white/95 p-4 backdrop-blur-sm">
          <a
            href={ticket}
            className="theme-fill-primary flex h-11 w-full items-center justify-center rounded-xl text-sm font-semibold text-white shadow-md"
          >
            등록하기
          </a>
        </div>
      ) : null}
    </div>
  )
}

function SeminarPromoRibbon({
  data,
  layout,
  ticket,
}: {
  data: EventLikeData
  layout: PageLayoutProfile
  ticket: string
}) {
  const isWeb = layout === 'web'
  const ticketCard = (
    <div
      className={
        isWeb
          ? 'sticky top-4 rounded-2xl border-2 border-sky-900 bg-white p-6 shadow-xl'
          : 'rounded-2xl border-2 border-sky-900 bg-white p-6 shadow-lg'
      }
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-sky-700/80">참가</p>
      <p className="mt-2 text-lg font-semibold text-slate-900">{data.eventTitle}</p>
      <p className="mt-2 text-sm text-slate-600">{data.dateLine}</p>
      <a
        href={ticket}
        className="theme-fill-primary mt-6 flex h-12 w-full min-w-0 items-center justify-center rounded-xl text-sm font-semibold text-white hover:opacity-90"
      >
        등록하기
      </a>
    </div>
  )

  return (
    <div className={`${previewPageRoot(layout)} theme-bg-surface text-slate-900`}>
      <section className="relative min-w-0 overflow-hidden border-b border-sky-200/80">
        {data.heroImageUrl.trim() ? (
          <img
            src={data.heroImageUrl.trim()}
            alt=""
            className={isWeb ? 'h-52 w-full object-cover sm:h-64' : 'h-44 w-full object-cover sm:h-48'}
          />
        ) : (
          <div className={isWeb ? 'theme-gradient-hero-soft h-52 sm:h-64' : 'theme-gradient-hero-soft h-44 sm:h-48'} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-sky-950/60 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 max-w-6xl px-4 pb-6 pt-16 text-white sm:px-8 sm:pb-8 lg:mx-auto lg:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-100/90">Program</p>
          <h1 className="mt-2 max-w-full text-balance text-xl font-semibold sm:text-2xl lg:text-3xl">{data.eventTitle}</h1>
        </div>
      </section>

      <div className="border-b border-sky-200 bg-white">
        <div className="mx-auto max-w-6xl min-w-0">
          <div className="border-b border-sky-100 bg-sky-50/50 px-4 py-3 sm:px-8">
            <p className="text-[10px] font-bold uppercase tracking-widest theme-text-primary">일정</p>
            <p className="mt-1 text-sm font-medium text-slate-900">{data.dateLine}</p>
          </div>
          <div
            className={
              isWeb ? 'grid min-w-0 divide-x divide-sky-100 sm:grid-cols-2' : 'divide-y divide-sky-100'
            }
          >
            <div className="min-w-0 px-4 py-3 sm:px-8">
              <p className="text-[10px] font-bold uppercase tracking-widest theme-text-primary">장소</p>
              <p className="mt-1 text-sm font-medium text-slate-900">{data.venue.trim() || '추후 공지'}</p>
            </div>
            <div className="min-w-0 px-4 py-3 sm:px-8">
              <p className="text-[10px] font-bold uppercase tracking-widest theme-text-primary">주최</p>
              <p className="mt-1 text-sm font-medium text-slate-900">{data.organizerName.trim() || '—'}</p>
            </div>
          </div>
        </div>
      </div>

      {isWeb ? (
        <div className="mx-auto flex min-w-0 max-w-6xl gap-10 px-4 py-10 sm:px-8 lg:gap-12 lg:px-10 lg:py-12">
          <div className="min-w-0 flex-1">
            {data.description.trim() ? (
              <p className="max-w-3xl text-pretty text-sm leading-relaxed text-slate-600 lg:text-base">{data.description}</p>
            ) : null}
          </div>
          <aside className="w-full min-w-0 max-w-[340px] shrink-0">{ticketCard}</aside>
        </div>
      ) : (
        <div className="mx-auto max-w-6xl min-w-0 px-4 py-8 sm:px-8">
          {data.description.trim() ? (
            <p className="text-pretty text-sm leading-relaxed text-slate-600">{data.description}</p>
          ) : null}
          <div className="mt-8">{ticketCard}</div>
        </div>
      )}
    </div>
  )
}

function EventCampaignPoster({ data, layout, ticket }: { data: EventLikeData; layout: PageLayoutProfile; ticket: string }) {
  const isWeb = layout === 'web'
  return (
    <div className={`${previewPageRoot(layout)} bg-amber-50 text-stone-900`}>
      <div className="relative overflow-hidden bg-stone-900 text-amber-50">
        <div className="pointer-events-none absolute -right-16 top-0 h-64 w-64 rounded-full bg-rose-500/25 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-48 w-48 rounded-full bg-amber-400/15 blur-2xl" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
          {isWeb ? (
            <div className="grid min-w-0 gap-10 lg:grid-cols-12 lg:items-end">
              <div className="min-w-0 lg:col-span-8">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber-200/80">Live promo</p>
                <h1 className="mt-4 text-balance font-serif text-3xl font-medium tracking-tight sm:text-4xl lg:text-5xl">{data.eventTitle}</h1>
              </div>
              <div className="min-w-0 lg:col-span-4 lg:text-right">
                <p className="font-mono text-sm text-amber-100/90">{data.dateLine}</p>
                <a
                  href={ticket}
                  className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-full bg-rose-500 px-8 text-sm font-semibold text-white hover:bg-rose-600 lg:w-auto"
                >
                  티켓 보기
                </a>
              </div>
            </div>
          ) : (
            <div className="min-w-0">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber-200/80">Live promo</p>
              <h1 className="mt-4 text-balance font-serif text-2xl font-medium tracking-tight sm:text-3xl">{data.eventTitle}</h1>
              <p className="mt-4 font-mono text-sm text-amber-100/90">{data.dateLine}</p>
              <a
                href={ticket}
                className="mt-8 inline-flex h-12 w-full items-center justify-center rounded-full bg-rose-500 text-sm font-semibold text-white"
              >
                티켓 보기
              </a>
            </div>
          )}
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl flex-wrap gap-2 border-b border-amber-200/80 px-4 py-5 sm:gap-3 sm:px-8 lg:px-10">
        <span className="rounded-full border border-stone-300 bg-white px-4 py-1.5 text-xs font-medium text-stone-800">일정 · {data.dateLine}</span>
        <span className="rounded-full border border-stone-300 bg-white px-4 py-1.5 text-xs font-medium text-stone-800">
          장소 · {data.venue.trim() || '추후 공지'}
        </span>
        <span className="rounded-full border border-stone-300 bg-white px-4 py-1.5 text-xs font-medium text-stone-800">
          주최 · {data.organizerName.trim() || '—'}
        </span>
      </div>

      <div className="mx-auto max-w-2xl px-4 py-10 text-center sm:px-8 lg:py-14">
        {data.heroImageUrl.trim() ? (
          <img src={data.heroImageUrl.trim()} alt="" className="mx-auto mb-10 max-h-56 w-full rounded-xl object-cover shadow-md" />
        ) : null}
        {data.description.trim() ? (
          <p className="text-pretty text-sm leading-relaxed text-stone-600 sm:text-base">{data.description}</p>
        ) : null}
        {!isWeb ? (
          <a
            href={ticket}
            className="mt-10 inline-flex h-12 w-full max-w-xs items-center justify-center rounded-full border-2 border-stone-900 bg-stone-900 text-sm font-semibold text-amber-50"
          >
            티켓 보기
          </a>
        ) : null}
      </div>
    </div>
  )
}

function EventNeonStack({ data, layout, ticket }: { data: EventLikeData; layout: PageLayoutProfile; ticket: string }) {
  const isWeb = layout === 'web'
  return (
    <div className={`${previewPageRoot(layout)} bg-gradient-to-b from-violet-950 via-purple-950 to-zinc-950 text-violet-50`}>
      <div className="mx-auto max-w-lg px-4 py-12 sm:py-16">
        <p className="text-center text-[10px] font-bold uppercase tracking-[0.5em] text-fuchsia-400/90">Promo stack</p>
        <h1 className="mt-6 text-center text-balance text-2xl font-semibold sm:text-3xl">{data.eventTitle}</h1>
        <div className="mt-10 space-y-4">
          {[data.dateLine, data.venue.trim() || '장소 미정', data.organizerName.trim() || '주최'].map((line, i) => (
            <div
              key={i}
              className="rounded-2xl border border-fuchsia-500/35 bg-violet-950/40 p-5 shadow-[0_0_24px_-4px_rgba(217,70,239,0.35)]"
            >
              <p className="text-xs text-fuchsia-200/80">{line}</p>
            </div>
          ))}
        </div>
        {data.description.trim() ? (
          <p className="mt-8 text-center text-pretty text-sm leading-relaxed text-violet-200/80">{data.description}</p>
        ) : null}
        <a
          href={ticket}
          className="mt-10 flex h-12 w-full items-center justify-center rounded-xl bg-fuchsia-500 text-sm font-semibold text-white hover:bg-fuchsia-400"
        >
          티켓 보기
        </a>
        {isWeb && data.heroImageUrl.trim() ? (
          <img src={data.heroImageUrl.trim()} alt="" className="mt-8 w-full rounded-xl border border-fuchsia-500/20 object-cover opacity-90" />
        ) : null}
      </div>
    </div>
  )
}

function EventBillboardSplit({ data, layout, ticket }: { data: EventLikeData; layout: PageLayoutProfile; ticket: string }) {
  const isWeb = layout === 'web'
  return (
    <div className={`${previewPageRoot(layout)} bg-black text-white`}>
      <div className={isWeb ? 'grid min-h-[min(70vh,520px)] sm:grid-cols-2' : 'flex min-h-[420px] flex-col'}>
        <div className="flex flex-col justify-end bg-lime-400 p-6 text-black sm:p-10">
          <p className="text-xs font-black uppercase tracking-widest">On air</p>
          <p className="mt-4 font-mono text-sm leading-snug">{data.dateLine}</p>
        </div>
        <div className="flex flex-col justify-center p-6 sm:p-10">
          <h1 className="text-balance text-3xl font-black uppercase leading-tight sm:text-4xl">{data.eventTitle}</h1>
          <p className="mt-4 text-sm text-neutral-400">{data.venue.trim() || 'Venue TBA'}</p>
          <a
            href={ticket}
            className="mt-8 inline-flex h-12 w-fit items-center bg-lime-400 px-8 text-sm font-bold text-black hover:bg-lime-300"
          >
            티켓 보기
          </a>
        </div>
      </div>
      <div className="border-t border-neutral-800 px-6 py-8 sm:px-10">
        {data.description.trim() ? <p className="max-w-2xl text-sm text-neutral-400">{data.description}</p> : null}
        {data.heroImageUrl.trim() ? (
          <img src={data.heroImageUrl.trim()} alt="" className="mt-6 max-h-48 w-full rounded-lg object-cover" />
        ) : null}
      </div>
    </div>
  )
}

function EventRibbonRow({ data, layout, ticket }: { data: EventLikeData; layout: PageLayoutProfile; ticket: string }) {
  const isWeb = layout === 'web'
  return (
    <div className={`${previewPageRoot(layout)} bg-white text-stone-900`}>
      <div className="divide-y divide-stone-900 border-y-4 border-stone-900">
        <div className="bg-orange-400 px-4 py-4 sm:px-8">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-900">Row 01</p>
          <h1 className="mt-2 text-2xl font-black uppercase sm:text-3xl">{data.eventTitle}</h1>
        </div>
        <div className="bg-pink-400 px-4 py-3 text-sm font-bold text-stone-900 sm:px-8">{data.dateLine}</div>
        <div className="bg-cyan-300 px-4 py-3 text-sm font-semibold text-stone-900 sm:px-8">{data.venue.trim() || '장소'}</div>
        <div className="bg-yellow-300 px-4 py-3 text-sm sm:px-8">주최 · {data.organizerName.trim() || '—'}</div>
      </div>
      <div className={`mx-auto max-w-3xl px-4 py-10 sm:px-8 ${isWeb ? 'text-center' : ''}`}>
        {data.description.trim() ? <p className="text-pretty text-sm text-stone-600">{data.description}</p> : null}
        <a
          href={ticket}
          className="mt-8 inline-flex h-12 w-full max-w-xs items-center justify-center border-2 border-stone-900 bg-stone-900 text-sm font-bold text-white sm:mx-auto sm:block"
        >
          티켓 보기
        </a>
      </div>
    </div>
  )
}

function SeminarSpeakerFan({ data, layout, ticket }: { data: EventLikeData; layout: PageLayoutProfile; ticket: string }) {
  const isWeb = layout === 'web'
  const slots = [
    data.organizerName.trim() || 'Keynote',
    data.venue.trim() || 'Track A',
    data.dateLine.slice(0, 24) || 'Session',
  ]
  return (
    <div className={`${previewPageRoot(layout)} bg-slate-100 text-slate-900`}>
      <header className="border-b border-slate-200 bg-white px-4 py-8 text-center sm:px-8">
        <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-indigo-600">Speakers</p>
        <h1 className="mt-3 text-balance text-2xl font-semibold sm:text-3xl">{data.eventTitle}</h1>
      </header>
      <div className={`mx-auto flex max-w-4xl justify-center gap-4 px-4 py-10 ${isWeb ? 'sm:gap-8' : 'flex-wrap'}`}>
        {slots.map((label, i) => (
          <div key={i} className="flex w-28 flex-col items-center sm:w-32">
            <div className="flex size-20 items-center justify-center rounded-full border-4 border-indigo-200 bg-indigo-50 text-sm font-bold text-indigo-800 shadow-md sm:size-24">
              {i + 1}
            </div>
            <p className="mt-3 text-center text-xs font-medium leading-snug text-slate-700">{label}</p>
          </div>
        ))}
      </div>
      <div className="border-t border-slate-200 bg-indigo-700 px-4 py-6 text-center sm:px-8">
        {data.description.trim() ? (
          <p className="mx-auto max-w-2xl text-pretty text-sm text-indigo-100">{data.description}</p>
        ) : null}
        <a
          href={ticket}
          className="mt-6 inline-flex h-12 w-full max-w-sm items-center justify-center rounded-full bg-white text-sm font-semibold text-indigo-900"
        >
          등록하기
        </a>
      </div>
    </div>
  )
}

function SeminarDigestColumns({ data, layout, ticket }: { data: EventLikeData; layout: PageLayoutProfile; ticket: string }) {
  const isWeb = layout === 'web'
  const desc = data.description.trim()
  const half = desc ? Math.ceil(desc.length / 2) : 0
  const colA = desc.slice(0, half)
  const colB = desc.slice(half)

  return (
    <div className={`${previewPageRoot(layout)} bg-[#faf8f5] text-stone-900`}>
      <div className="border-b-2 border-double border-stone-800">
        <div className="mx-auto max-w-4xl px-4 py-6 sm:px-8">
          <p className="font-serif text-xs uppercase tracking-[0.3em] text-stone-500">Seminar digest</p>
          <h1 className="mt-2 font-serif text-3xl font-semibold sm:text-4xl">{data.eventTitle}</h1>
          <p className="mt-3 font-mono text-xs text-stone-600">{data.dateLine}</p>
        </div>
      </div>
      <div className={`mx-auto max-w-4xl gap-8 px-4 py-8 sm:px-8 ${isWeb ? 'columns-2 gap-10 [column-rule:1px_solid_theme(colors.stone.300)]' : 'space-y-6'}`}>
        <p className="break-inside-avoid text-sm leading-relaxed text-stone-700">{colA || '본문을 입력하세요.'}</p>
        <p className="break-inside-avoid text-sm leading-relaxed text-stone-700">{colB}</p>
      </div>
      <div className="mx-auto grid max-w-4xl gap-px border-y border-stone-300 bg-stone-300 px-4 sm:grid-cols-3 sm:px-8">
        <div className="bg-[#faf8f5] p-4 text-xs">
          <span className="font-bold uppercase text-stone-500">Venue</span>
          <p className="mt-1 font-medium">{data.venue.trim() || '—'}</p>
        </div>
        <div className="bg-[#faf8f5] p-4 text-xs">
          <span className="font-bold uppercase text-stone-500">Host</span>
          <p className="mt-1 font-medium">{data.organizerName.trim() || '—'}</p>
        </div>
        <div className="bg-[#faf8f5] p-4 text-xs sm:col-span-1">
          <a href={ticket} className="mt-2 inline-block font-bold text-stone-900 underline">
            등록하기 →
          </a>
        </div>
      </div>
    </div>
  )
}

/**
 * 세미나: 트랙 보드 / 프로모 리본 / 스피커 팬 / 다이제스트 컬럼.
 * 이벤트: 캠페인 포스터 / 네온 스택 / 빌보드 스플릿 / 리본 로우.
 */
export function EventLikeTemplatePreview({
  data,
  categoryId,
  design,
  layout = 'mobile',
}: EventLikeTemplatePreviewProps) {
  const ticket = data.ticketUrl.trim() || '#'
  const isWeb = layout === 'web'

  let content
  if (categoryId === 'event') {
    switch (design) {
      case 'neon-stack':
        content = <EventNeonStack data={data} layout={layout} ticket={ticket} />
        break
      case 'billboard-split':
        content = <EventBillboardSplit data={data} layout={layout} ticket={ticket} />
        break
      case 'ribbon-row':
        content = <EventRibbonRow data={data} layout={layout} ticket={ticket} />
        break
      default:
        content = <EventCampaignPoster data={data} layout={layout} ticket={ticket} />
    }
  } else {
    switch (design) {
      case 'promo-ribbon':
        content = <SeminarPromoRibbon data={data} layout={layout} ticket={ticket} />
        break
      case 'speaker-fan':
        content = <SeminarSpeakerFan data={data} layout={layout} ticket={ticket} />
        break
      case 'digest-columns':
        content = <SeminarDigestColumns data={data} layout={layout} ticket={ticket} />
        break
      default:
        content = <SeminarTrackBoard data={data} layout={layout} ticket={ticket} />
    }
  }

  if (!isWeb) return content

  return (
    <div className={previewPageRoot(layout)}>
      {content}
      <div className="bg-white text-slate-900">
        <div className={previewWebSectionsPad('pt-0')}>
          <EventWebSections data={data} categoryId={categoryId} design={design} />
        </div>
      </div>
    </div>
  )
}
