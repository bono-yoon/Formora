import type { CafeDesignVariant } from '@/templates/cafe/cafe-variant'
import { CafeAmenities } from '@/templates/cafe/cafe-amenities'
import { CafeMenuSection } from '@/templates/cafe/cafe-menu-section'
import type { CafePageData } from '@/templates/cafe/schema'
import type { PageLayoutProfile } from '@/templates/page-layout'
import { CafeWebSections } from '@/templates/cafe/cafe-web-sections'
import { webViewportFill } from '@/templates/web-viewport-fill'

export type { CafeDesignVariant } from '@/templates/cafe/cafe-variant'

type CafeTemplatePreviewProps = {
  data: CafePageData
  variant?: CafeDesignVariant
  layout?: PageLayoutProfile
}

const root = 'min-h-full min-w-0 max-w-full break-words antialiased'

function CafeWarmHeritage({ data, layout, variant }: { data: CafePageData; layout: PageLayoutProfile; variant: CafeDesignVariant }) {
  const map = data.mapUrl.trim()
  const reserve = data.reserveUrl.trim() || '#'
  const isWeb = layout === 'web'
  const menu = data.menuItems.filter((x) => x.name.trim())

  return (
    <div className={`${root} bg-amber-50/80 text-stone-900 ${webViewportFill(isWeb)}`}>
      <div className={isWeb ? 'mx-auto max-w-7xl px-6 sm:px-10 lg:px-14' : 'mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'}>
        <header
          className={
            isWeb
              ? 'flex flex-wrap items-end justify-between gap-4 border-b border-amber-200/60 py-10 lg:py-12'
              : 'border-b border-amber-200/60 py-6'
          }
        >
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-800/80">Cafe &amp; Dining</p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">{data.shopName}</h1>
            {data.tagline.trim() ? (
              <p className="mt-2 max-w-xl text-sm text-stone-600 lg:text-base">{data.tagline}</p>
            ) : null}
          </div>
          {isWeb ? (
            <a
              href={reserve}
              className="inline-flex h-11 shrink-0 items-center justify-center rounded-full bg-stone-900 px-8 text-sm font-medium text-white"
            >
              {data.reserveLabel}
            </a>
          ) : null}
        </header>

        <div className={isWeb ? 'grid min-w-0 items-stretch gap-10 py-12 lg:grid-cols-2 lg:gap-14 lg:py-20' : 'grid min-w-0 gap-6 py-8'}>
          <div
            className={
              isWeb
                ? 'relative min-h-[320px] min-w-0 overflow-hidden rounded-2xl border border-amber-200/60 bg-white'
                : 'relative min-h-[200px] min-w-0 overflow-hidden rounded-2xl border border-amber-200/60 bg-white'
            }
          >
            {data.heroImageUrl.trim() ? (
              <img
                src={data.heroImageUrl.trim()}
                alt=""
                className={isWeb ? 'absolute inset-0 size-full object-cover' : 'size-full max-h-64 object-cover sm:max-h-none'}
              />
            ) : (
              <div
                className={
                  isWeb
                    ? 'flex min-h-[320px] items-center justify-center bg-gradient-to-br from-amber-200 to-orange-100'
                    : 'flex min-h-[200px] items-center justify-center bg-gradient-to-br from-amber-200 to-orange-100'
                }
              />
            )}
          </div>
          <div className="flex min-w-0 flex-col justify-center px-0 sm:px-1 lg:px-2">
            <h2 className="text-xl font-medium text-stone-900 lg:text-3xl">{data.heroTitle}</h2>
            {data.heroText.trim() ? (
              <p className="mt-4 max-w-xl text-pretty text-sm leading-relaxed text-stone-700 lg:text-base">{data.heroText}</p>
            ) : null}
            {!isWeb ? (
              <a
                href={reserve}
                className="mt-6 inline-flex h-11 w-fit items-center justify-center rounded-full bg-stone-900 px-8 text-sm font-medium text-white"
              >
                {data.reserveLabel}
              </a>
            ) : null}
          </div>
        </div>

        {menu.length > 0 ? (
          <CafeMenuSection
            items={menu}
            variant={variant}
            tone="warm"
            className="border-t border-amber-200/50 py-10 lg:py-14"
          />
        ) : null}

        <section className="border-t border-amber-200/50 py-10 lg:py-14">
          <div className={`grid min-w-0 gap-4 ${isWeb ? 'sm:grid-cols-2 lg:gap-6' : ''}`}>
          <div className="min-w-0 rounded-2xl border border-amber-200/70 bg-white/90 p-5 shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-widest text-amber-800/70">영업</p>
            <p className="mt-2 text-sm font-medium text-stone-900">{data.hours.trim() || '—'}</p>
            <p className="mt-2 text-xs text-stone-600">방문 전 확인해 주세요.</p>
          </div>
          <div className="min-w-0 rounded-2xl border border-amber-200/70 bg-white/90 p-5 shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-widest text-amber-800/70">위치</p>
            <p className="mt-2 text-sm font-medium text-stone-900">{data.address.trim() || '—'}</p>
            {map ? (
              <a
                href={map}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-block text-xs font-semibold text-amber-900 underline-offset-2 hover:underline"
              >
                지도 열기
              </a>
            ) : null}
          </div>
          </div>
          <CafeAmenities data={data} tone="warm" className="mt-6" />
        </section>

        {isWeb ? (
          <CafeWebSections data={data} reserveHref={reserve} mapHref={map || undefined} tone="warm" />
        ) : null}
      </div>
    </div>
  )
}

function CafeGardenTerrace({ data, layout, variant }: { data: CafePageData; layout: PageLayoutProfile; variant: CafeDesignVariant }) {
  const map = data.mapUrl.trim()
  const reserve = data.reserveUrl.trim() || '#'
  const isWeb = layout === 'web'
  const menu = data.menuItems.filter((x) => x.name.trim())

  return (
    <div className={`${root} bg-emerald-50/90 text-emerald-950 ${webViewportFill(isWeb)}`}>
      <div className={isWeb ? 'mx-auto max-w-7xl px-6 py-12 sm:px-10 lg:px-14 lg:py-16' : 'mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-12'}>
        <div className={isWeb ? 'grid gap-10 lg:grid-cols-[minmax(0,280px)_1fr]' : 'flex flex-col gap-8'}>
          <div className="min-w-0 space-y-6 border-l-4 border-emerald-600 pl-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-emerald-700/80">Terrace</p>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{data.shopName}</h1>
            {data.tagline.trim() ? <p className="text-sm text-emerald-900/80">{data.tagline}</p> : null}
            <a
              href={reserve}
              className="inline-flex h-11 w-full items-center justify-center rounded-lg border border-emerald-800 bg-emerald-800 text-sm font-semibold text-white sm:w-auto sm:px-8"
            >
              {data.reserveLabel}
            </a>
            <dl className="space-y-3 border-t border-emerald-200/80 pt-5 text-sm">
              <div>
                <dt className="text-[10px] font-bold uppercase text-emerald-600">영업</dt>
                <dd className="mt-1 font-medium">{data.hours.trim() || '—'}</dd>
              </div>
              <div>
                <dt className="text-[10px] font-bold uppercase text-emerald-600">주소</dt>
                <dd className="mt-1">{data.address.trim() || '—'}</dd>
                {map ? (
                  <dd className="mt-2">
                    <a href={map} target="_blank" rel="noreferrer" className="text-xs font-semibold text-emerald-800 underline">
                      지도
                    </a>
                  </dd>
                ) : null}
              </div>
            </dl>
            <CafeAmenities data={data} tone="garden" />
          </div>
          <div className="min-w-0 space-y-6">
            <div className="overflow-hidden rounded-2xl border border-emerald-200/80 bg-white shadow-sm">
              {data.heroImageUrl.trim() ? (
                <img src={data.heroImageUrl.trim()} alt="" className="aspect-[5/3] w-full object-cover" />
              ) : (
                <div className="flex aspect-[5/3] items-center justify-center bg-gradient-to-br from-emerald-100 to-teal-100" />
              )}
              <div className="p-6">
                <h2 className="text-lg font-semibold text-emerald-950">{data.heroTitle}</h2>
                {data.heroText.trim() ? <p className="mt-3 text-sm leading-relaxed text-emerald-900/80">{data.heroText}</p> : null}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {['시즌', '로컬', '예약'].map((t) => (
                <span key={t} className="rounded-full border border-emerald-300/80 bg-white px-3 py-1 text-xs font-medium text-emerald-900">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {menu.length > 0 ? (
          <CafeMenuSection items={menu} variant={variant} tone="garden" className="mt-10 border-t border-emerald-200/80 pt-10" />
        ) : null}

        {isWeb ? (
          <CafeWebSections data={data} reserveHref={reserve} mapHref={map || undefined} tone="garden" />
        ) : null}
      </div>
    </div>
  )
}

function CafeMidnightTapas({ data, layout, variant }: { data: CafePageData; layout: PageLayoutProfile; variant: CafeDesignVariant }) {
  const reserve = data.reserveUrl.trim() || '#'
  const isWeb = layout === 'web'
  const menu = data.menuItems.filter((x) => x.name.trim())

  return (
    <div className={`${root} bg-zinc-950 text-zinc-100 ${webViewportFill(isWeb)}`}>
      <div className="border-b border-amber-500/30">
        <div className={isWeb ? 'mx-auto max-w-4xl px-6 py-16 text-center sm:py-20 lg:px-10' : 'mx-auto max-w-2xl px-4 py-12 text-center sm:py-16'}>
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-amber-400/90">Night dining</p>
          <h1 className="mt-4 text-3xl font-light tracking-tight text-white sm:text-4xl">{data.shopName}</h1>
          {data.tagline.trim() ? <p className="mt-4 text-sm text-zinc-400">{data.tagline}</p> : null}
          <a
            href={reserve}
            className="mt-8 inline-flex h-12 items-center justify-center border border-amber-500/60 px-10 text-sm font-medium text-amber-200 hover:bg-amber-500/10"
          >
            {data.reserveLabel}
          </a>
        </div>
      </div>
      <div className={isWeb ? 'mx-auto max-w-4xl space-y-8 px-6 py-14 sm:px-10 lg:py-20' : 'mx-auto max-w-2xl space-y-8 px-4 py-10'}>
        <div className="rounded-xl border border-amber-500/25 bg-zinc-900/50 p-6">
          <p className="text-xs uppercase tracking-widest text-amber-500/80">Tonight</p>
          <h2 className="mt-2 text-xl font-medium text-white">{data.heroTitle}</h2>
          {data.heroText.trim() ? <p className="mt-3 text-sm leading-relaxed text-zinc-400">{data.heroText}</p> : null}
        </div>
        {data.heroImageUrl.trim() ? (
          <img src={data.heroImageUrl.trim()} alt="" className="w-full rounded-xl border border-zinc-800 object-cover opacity-90" />
        ) : (
          <div className="flex h-40 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/80 text-xs text-zinc-500">
            비주얼 영역
          </div>
        )}
        <div className={`grid gap-4 text-sm ${isWeb ? 'grid-cols-2' : ''}`}>
          <div className="rounded-lg border border-zinc-800 p-4">
            <p className="text-[10px] font-bold uppercase text-zinc-500">영업</p>
            <p className="mt-2 text-zinc-200">{data.hours.trim() || '—'}</p>
          </div>
          <div className="rounded-lg border border-zinc-800 p-4">
            <p className="text-[10px] font-bold uppercase text-zinc-500">위치</p>
            <p className="mt-2 text-zinc-200">{data.address.trim() || '—'}</p>
          </div>
        </div>
        <CafeAmenities data={data} tone="midnight" />

        {menu.length > 0 ? (
          <CafeMenuSection items={menu} variant={variant} tone="midnight" className="border-t border-zinc-800 pt-10" />
        ) : null}

        {isWeb ? <CafeWebSections data={data} reserveHref={reserve} tone="midnight" /> : null}
      </div>
    </div>
  )
}

function CafeEspressoStripe({ data, layout, variant }: { data: CafePageData; layout: PageLayoutProfile; variant: CafeDesignVariant }) {
  const reserve = data.reserveUrl.trim() || '#'
  const isWeb = layout === 'web'
  const menu = data.menuItems.filter((x) => x.name.trim())

  return (
    <div className={`${root} bg-stone-100 text-stone-900 ${webViewportFill(isWeb)}`}>
      <div className="flex h-3 w-full">
        <div className="flex-1 bg-stone-900" />
        <div className="flex-1 bg-stone-100" />
        <div className="flex-1 bg-stone-900" />
        <div className="flex-1 bg-stone-100" />
      </div>
      <div className={isWeb ? 'mx-auto max-w-6xl px-6 py-14 sm:px-10 lg:py-20' : 'mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:py-16'}>
        <h1 className="text-4xl font-black uppercase leading-none tracking-tighter sm:text-6xl">{data.shopName}</h1>
        {data.tagline.trim() ? <p className="mt-4 max-w-lg text-sm font-medium uppercase tracking-wide text-stone-600">{data.tagline}</p> : null}
        <div className={`mt-10 gap-8 ${isWeb ? 'grid lg:grid-cols-2' : 'flex flex-col gap-8'}`}>
          <div>
            <h2 className="border-b-4 border-stone-900 pb-2 text-xl font-bold">{data.heroTitle}</h2>
            {data.heroText.trim() ? <p className="mt-4 text-sm leading-relaxed text-stone-600">{data.heroText}</p> : null}
            <a
              href={reserve}
              className="mt-8 inline-flex min-h-11 items-center bg-stone-900 px-8 text-sm font-bold uppercase tracking-wider text-stone-100"
            >
              {data.reserveLabel}
            </a>
          </div>
          <div className="space-y-4 border border-stone-900 bg-white p-5">
            <p className="font-mono text-xs text-stone-500">HOURS / ADDRESS</p>
            <p className="text-sm font-semibold">{data.hours.trim() || '—'}</p>
            <p className="text-sm">{data.address.trim() || '—'}</p>
            <CafeAmenities data={data} tone="espresso" />
          </div>
        </div>

        {menu.length > 0 ? (
          <CafeMenuSection items={menu} variant={variant} tone="espresso" className="mt-10 border-t border-stone-300 pt-10" />
        ) : null}

        {isWeb ? <CafeWebSections data={data} reserveHref={reserve} tone="espresso" /> : null}
      </div>
    </div>
  )
}

/** 매장 소개 4변형 — 같은 주제, 레이아웃·톤만 구분 */
export function CafeTemplatePreview({ data, variant = 'warm-heritage', layout = 'mobile' }: CafeTemplatePreviewProps) {
  switch (variant) {
    case 'garden-terrace':
      return <CafeGardenTerrace data={data} layout={layout} variant={variant} />
    case 'midnight-tapas':
      return <CafeMidnightTapas data={data} layout={layout} variant={variant} />
    case 'espresso-stripe':
      return <CafeEspressoStripe data={data} layout={layout} variant={variant} />
    default:
      return <CafeWarmHeritage data={data} layout={layout} variant={variant} />
  }
}
