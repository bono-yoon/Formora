import { BusinessIntroWebSections } from '@/templates/shared/business-intro-web-sections'
import type { BusinessIntroData } from '@/templates/shared/business-intro-schema'
import type {
  AppIntroDesign,
  ConstructionIntroDesign,
  StartupIntroDesign,
} from '@/templates/shared/business-intro-design'
import type { PageLayoutProfile } from '@/templates/page-layout'
import { previewPageRoot } from '@/templates/preview-layout'

export type { AppIntroDesign, ConstructionIntroDesign, StartupIntroDesign } from '@/templates/shared/business-intro-design'

export type BusinessIntroTemplatePreviewProps = {
  data: BusinessIntroData
  categoryId: 'startup' | 'construction' | 'app'
  design: StartupIntroDesign | ConstructionIntroDesign | AppIntroDesign
  layout?: PageLayoutProfile
}


function ConstructionClassic({ data, layout }: { data: BusinessIntroData; layout: PageLayoutProfile }) {
  const cta = data.ctaUrl.trim() || '#'
  const isWeb = layout === 'web'
  const hero = 'from-slate-700 to-slate-900'
  const accent = 'bg-amber-600 hover:bg-amber-500'
  const badge = 'text-amber-200/90'
  const stripe = 'from-amber-500/15 to-slate-600/20'

  const sidebar = (
    <>
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">한눈에</p>
        <dl className="mt-4 space-y-4 text-sm">
          <div>
            <dt className="text-xs text-slate-500">조직</dt>
            <dd className="mt-1 font-medium text-slate-900">{data.orgName}</dd>
          </div>
          <div>
            <dt className="text-xs text-slate-500">핵심 포인트</dt>
            <dd className="mt-1 font-medium text-slate-900">{data.bullets.length}개 항목</dd>
          </div>
          <div>
            <dt className="text-xs text-slate-500">다음 단계</dt>
            <dd className="mt-1 font-medium text-slate-900">{data.ctaLabel}</dd>
          </div>
        </dl>
      </div>
      <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-medium uppercase tracking-wider text-slate-500">
        <div className="rounded-lg border border-slate-200 bg-white py-4">검증</div>
        <div className="rounded-lg border border-slate-200 bg-white py-4">실행</div>
        <div className="rounded-lg border border-slate-200 bg-white py-4">파트너</div>
      </div>
    </>
  )

  return (
    <div className={`${previewPageRoot(layout)} bg-white text-slate-900`}>
      <section className={`relative overflow-hidden bg-gradient-to-br ${hero} px-4 py-12 text-white sm:px-8 sm:py-16 lg:px-10 lg:py-20`}>
        {data.heroImageUrl.trim() ? (
          <img src={data.heroImageUrl.trim()} alt="" className="absolute inset-0 size-full object-cover opacity-40" />
        ) : null}
        <div className="relative mx-auto max-w-6xl min-w-0">
          {isWeb ? (
            <div className="grid min-w-0 gap-10 lg:grid-cols-12 lg:items-end lg:gap-12">
              <div className="min-w-0 lg:col-span-7">
                <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${badge}`}>{data.orgName}</p>
                <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">{data.headline}</h1>
                {data.subline.trim() ? <p className="mt-4 max-w-xl text-sm text-white/85 lg:text-base">{data.subline}</p> : null}
              </div>
              <div className="min-w-0 lg:col-span-5">
                <div className="rounded-2xl border border-white/20 bg-black/20 p-6 backdrop-blur-md">
                  <p className="text-xs font-medium uppercase tracking-wider text-white/70">바로 연결</p>
                  <a
                    href={cta}
                    className={`mt-4 flex h-12 w-full min-w-0 items-center justify-center rounded-xl text-sm font-semibold text-white ${accent}`}
                  >
                    {data.ctaLabel}
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="min-w-0">
              <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${badge}`}>{data.orgName}</p>
              <h1 className="mt-3 text-balance text-2xl font-semibold tracking-tight sm:text-3xl">{data.headline}</h1>
              {data.subline.trim() ? <p className="mt-4 max-w-xl text-sm text-white/85">{data.subline}</p> : null}
              <div className="mt-8">
                <a
                  href={cta}
                  className={`inline-flex h-11 w-full min-w-0 items-center justify-center rounded-full px-6 text-sm font-semibold text-white sm:w-fit sm:px-8 ${accent}`}
                >
                  {data.ctaLabel}
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      <div className={`h-2 w-full bg-gradient-to-r ${stripe}`} aria-hidden />

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-8 lg:px-10 lg:py-14">
        {isWeb ? (
          <div className="grid min-w-0 gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="min-w-0 lg:col-span-8">
              {data.body.trim() ? (
                <p className="text-pretty text-sm leading-relaxed text-slate-600 lg:text-base">{data.body}</p>
              ) : null}
              {data.bullets.length > 0 ? (
                <ul className="mt-8 grid min-w-0 gap-3 sm:grid-cols-2">
                  {data.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex min-w-0 gap-3 rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm text-slate-800"
                    >
                      <span className="shrink-0 text-emerald-600">✓</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
            <aside className="min-w-0 space-y-6 lg:col-span-4">{sidebar}</aside>
          </div>
        ) : (
          <div className="min-w-0 space-y-10">
            <div>
              {data.body.trim() ? (
                <p className="text-pretty text-sm leading-relaxed text-slate-600">{data.body}</p>
              ) : null}
              {data.bullets.length > 0 ? (
                <ul className="mt-6 grid min-w-0 gap-3">
                  {data.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex min-w-0 gap-3 rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm text-slate-800"
                    >
                      <span className="shrink-0 text-emerald-600">✓</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
            <div className="space-y-6">{sidebar}</div>
          </div>
        )}
      </div>
    </div>
  )
}

function StartupMissionSplit({ data, layout }: { data: BusinessIntroData; layout: PageLayoutProfile }) {
  const cta = data.ctaUrl.trim() || '#'
  const isWeb = layout === 'web'
  const fallback = ['문제 정의', '실행 속도', '파트너십'] as const
  const cards = [0, 1, 2].map((i) => data.bullets[i] ?? fallback[i])

  return (
    <div className={`${previewPageRoot(layout)} bg-zinc-50 text-zinc-900`}>
      <section className="border-b border-violet-200/60 bg-gradient-to-b from-violet-600 to-fuchsia-700 px-4 py-14 text-center text-white sm:py-16 lg:py-20">
        {data.heroImageUrl.trim() ? (
          <img src={data.heroImageUrl.trim()} alt="" className="mx-auto mb-8 max-h-40 rounded-2xl object-cover opacity-90 shadow-lg" />
        ) : null}
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-200">{data.orgName}</p>
        <h1 className="mx-auto mt-4 max-w-3xl text-balance text-2xl font-semibold tracking-tight sm:text-4xl">{data.headline}</h1>
        {data.subline.trim() ? <p className="mx-auto mt-4 max-w-2xl text-sm text-white/85 sm:text-base">{data.subline}</p> : null}
        <a
          href={cta}
          className="mt-10 inline-flex h-12 items-center justify-center rounded-full bg-white px-10 text-sm font-semibold text-violet-800 shadow-md hover:bg-violet-50"
        >
          {data.ctaLabel}
        </a>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:py-14">
        <div className={`grid gap-4 ${isWeb ? 'sm:grid-cols-3' : 'grid-cols-1'}`}>
          {cards.map((label, i) => (
            <div key={i} className="rounded-2xl border border-violet-200 bg-white p-5 text-left shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-widest text-violet-500">핵심 {i + 1}</p>
              <p className="mt-2 text-sm font-semibold text-zinc-900">{label}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 max-w-2xl">
          {data.body.trim() ? <p className="text-pretty text-sm leading-relaxed text-zinc-600 sm:text-base">{data.body}</p> : null}
          {data.bullets.length > 0 ? (
            <ol className="mt-8 space-y-4 border-l-2 border-violet-500 pl-5">
              {data.bullets.map((b, i) => (
                <li key={i} className="text-sm text-zinc-800">
                  <span className="font-semibold text-violet-700">{i + 1}. </span>
                  {b}
                </li>
              ))}
            </ol>
          ) : null}
        </div>
      </div>
    </div>
  )
}

function StartupVelocityRail({ data, layout }: { data: BusinessIntroData; layout: PageLayoutProfile }) {
  const cta = data.ctaUrl.trim() || '#'
  const isWeb = layout === 'web'

  return (
    <div className={`${previewPageRoot(layout)} bg-slate-950 text-slate-100`}>
      <div className="border-b border-cyan-500/30 bg-slate-900/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-8">
          <span className="text-xs font-medium uppercase tracking-widest text-cyan-300/90">{data.orgName}</span>
          <a href={cta} className="text-xs font-semibold text-cyan-400 underline-offset-4 hover:text-cyan-300 hover:underline">
            {data.ctaLabel} →
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-8 lg:py-16">
        <h1 className="max-w-3xl text-balance text-2xl font-semibold tracking-tight text-white sm:text-4xl">{data.headline}</h1>
        {data.subline.trim() ? <p className="mt-4 max-w-2xl text-sm text-slate-400 sm:text-base">{data.subline}</p> : null}
        <a
          href={cta}
          className="mt-8 inline-flex h-11 items-center justify-center rounded-lg border border-cyan-400/60 bg-transparent px-6 text-sm font-semibold text-cyan-300 hover:bg-cyan-500/10"
        >
          {data.ctaLabel}
        </a>

        <div className={`mt-14 min-w-0 gap-10 ${isWeb ? 'grid lg:grid-cols-12' : 'flex flex-col gap-8'}`}>
          <div className={isWeb ? 'lg:col-span-4' : ''}>
            <p className="text-[10px] font-bold uppercase tracking-widest text-cyan-500/80">로드맵</p>
            <ul className="mt-6 space-y-6">
              {data.bullets.map((b, i) => (
                <li key={i} className="flex gap-4">
                  <span className="mt-1.5 size-2 shrink-0 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.6)]" aria-hidden />
                  <span className="text-sm text-slate-300">{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className={`min-w-0 ${isWeb ? 'lg:col-span-8' : ''}`}>
            {data.heroImageUrl.trim() ? (
              <img src={data.heroImageUrl.trim()} alt="" className="mb-6 w-full rounded-xl border border-slate-800 object-cover opacity-90" />
            ) : null}
            {data.body.trim() ? <p className="text-pretty text-sm leading-relaxed text-slate-400 sm:text-base">{data.body}</p> : null}
          </div>
        </div>
      </div>
    </div>
  )
}

function StartupHorizonProof({ data, layout }: { data: BusinessIntroData; layout: PageLayoutProfile }) {
  const cta = data.ctaUrl.trim() || '#'
  const isWeb = layout === 'web'

  return (
    <div className={`${previewPageRoot(layout)} bg-gradient-to-b from-orange-200 via-rose-50 to-white text-stone-900`}>
      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-8 lg:py-20">
        <p className="text-center text-[10px] font-bold uppercase tracking-[0.4em] text-orange-900/70">Proof</p>
        <h1 className="mx-auto mt-4 max-w-3xl text-center text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          {data.headline}
        </h1>
        <p className="mx-auto mt-3 text-center text-sm text-stone-600">{data.orgName}</p>
        {data.subline.trim() ? <p className="mx-auto mt-4 max-w-xl text-center text-sm text-stone-700">{data.subline}</p> : null}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {data.bullets.map((b, i) => (
            <span
              key={i}
              className="rounded-full border border-orange-300/80 bg-white/90 px-4 py-2 text-xs font-medium text-orange-950 shadow-sm"
            >
              {b}
            </span>
          ))}
        </div>
        <div className={`mt-12 gap-6 ${isWeb ? 'grid sm:grid-cols-3' : 'space-y-4'}`}>
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-2xl border border-white/80 bg-white/70 p-6 text-center shadow-md backdrop-blur-sm">
              <p className="text-3xl font-bold text-orange-600">{i === 0 ? '24' : i === 1 ? '8' : '3'}</p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-stone-500">
                {i === 0 ? '주요 지표' : i === 1 ? '파트너' : '단계'}
              </p>
            </div>
          ))}
        </div>
        {data.body.trim() ? <p className="mx-auto mt-10 max-w-2xl text-pretty text-center text-sm text-stone-700">{data.body}</p> : null}
        <div className="mt-10 flex justify-center">
          <a
            href={cta}
            className="inline-flex h-12 items-center justify-center rounded-2xl bg-orange-600 px-10 text-sm font-semibold text-white shadow-lg hover:bg-orange-500"
          >
            {data.ctaLabel}
          </a>
        </div>
      </div>
    </div>
  )
}

function StartupInkLedger({ data, layout }: { data: BusinessIntroData; layout: PageLayoutProfile }) {
  const cta = data.ctaUrl.trim() || '#'
  const isWeb = layout === 'web'

  return (
    <div className={`${previewPageRoot(layout)} bg-[#1a2332] text-amber-50`}>
      <div className="border-b border-amber-900/30 bg-[#141c28]">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-amber-200/70">Ledger / entry</p>
          <h1 className="mt-4 font-serif text-3xl font-medium sm:text-4xl">{data.headline}</h1>
          <p className="mt-2 font-mono text-xs text-amber-200/60">{data.orgName}</p>
        </div>
      </div>
      <div className={`mx-auto max-w-4xl gap-10 px-4 py-10 sm:px-8 ${isWeb ? 'grid lg:grid-cols-2' : 'space-y-8'}`}>
        <div className="space-y-4 border-l-2 border-amber-600/50 pl-5">
          {data.bullets.map((b, i) => (
            <p key={i} className="font-mono text-sm text-amber-100/90">
              <span className="text-amber-500/80">/{String(i + 1).padStart(2, '0')}</span> {b}
            </p>
          ))}
        </div>
        <div>
          {data.subline.trim() ? <p className="text-sm italic text-amber-200/70">{data.subline}</p> : null}
          {data.body.trim() ? <p className="mt-4 text-sm leading-relaxed text-amber-100/80">{data.body}</p> : null}
          <a
            href={cta}
            className="mt-8 inline-flex h-11 items-center border border-amber-400/60 px-6 font-mono text-xs font-semibold uppercase tracking-wider text-amber-100 hover:bg-amber-400/10"
          >
            {data.ctaLabel}
          </a>
        </div>
      </div>
    </div>
  )
}

function ConstructionBlueprintGrid({ data, layout }: { data: BusinessIntroData; layout: PageLayoutProfile }) {
  const cta = data.ctaUrl.trim() || '#'
  const isWeb = layout === 'web'
  return (
    <div
      className={`${previewPageRoot(layout)} bg-sky-50 text-slate-900`}
      style={{
        backgroundImage:
          'linear-gradient(rgba(37,99,235,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.07) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    >
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="border-2 border-sky-800 bg-white/95 p-6 shadow-sm sm:p-10">
          <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-sky-700">Drawing no. 01</p>
          <h1 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">{data.headline}</h1>
          <p className="mt-2 text-sm text-slate-600">{data.orgName}</p>
          {data.subline.trim() ? <p className="mt-4 text-sm text-slate-700">{data.subline}</p> : null}
          <a
            href={cta}
            className="mt-6 inline-flex h-11 items-center border-2 border-sky-900 bg-sky-900 px-6 text-sm font-semibold text-white hover:bg-sky-800"
          >
            {data.ctaLabel}
          </a>
        </div>
        <div className={`mt-8 gap-6 ${isWeb ? 'grid sm:grid-cols-2' : 'space-y-6'}`}>
          {data.bullets.map((b, i) => (
            <div key={i} className="border border-sky-800/40 bg-white/90 p-4 font-mono text-xs text-slate-800">
              <span className="text-sky-600">[{String(i + 1).padStart(2, '0')}]</span> {b}
            </div>
          ))}
        </div>
        {data.body.trim() ? (
          <div className="mt-8 border border-dashed border-sky-700/40 bg-white/80 p-5 text-sm text-slate-700">{data.body}</div>
        ) : null}
      </div>
    </div>
  )
}

function ConstructionYardBeacon({ data, layout }: { data: BusinessIntroData; layout: PageLayoutProfile }) {
  const cta = data.ctaUrl.trim() || '#'
  const isWeb = layout === 'web'
  return (
    <div className={`${previewPageRoot(layout)} bg-zinc-800 text-zinc-100`}>
      <div className="flex h-4 w-full bg-[repeating-linear-gradient(-45deg,#facc15_0,#facc15_12px,#171717_12px,#171717_24px)]" aria-hidden />
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-yellow-400">Site</p>
            <h1 className="mt-3 text-3xl font-black uppercase tracking-tight text-white sm:text-4xl">{data.headline}</h1>
            <p className="mt-2 text-sm text-zinc-400">{data.orgName}</p>
          </div>
          <a
            href={cta}
            className="inline-flex h-12 shrink-0 items-center bg-yellow-400 px-6 text-sm font-black uppercase text-zinc-900 hover:bg-yellow-300"
          >
            {data.ctaLabel}
          </a>
        </div>
        <div className={`mt-10 gap-6 ${isWeb ? 'grid lg:grid-cols-3' : 'space-y-4'}`}>
          {data.bullets.slice(0, 6).map((b, i) => (
            <div key={i} className="border-l-4 border-yellow-400 pl-4 text-sm text-zinc-300">
              {b}
            </div>
          ))}
        </div>
        {data.body.trim() ? <p className="mt-10 max-w-3xl text-sm leading-relaxed text-zinc-400">{data.body}</p> : null}
      </div>
    </div>
  )
}

function ConstructionTenderSeal({ data, layout }: { data: BusinessIntroData; layout: PageLayoutProfile }) {
  const cta = data.ctaUrl.trim() || '#'
  const isWeb = layout === 'web'
  return (
    <div className={`${previewPageRoot(layout)} bg-amber-50 text-stone-900`}>
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="relative border-4 border-double border-stone-800 bg-[#fffdf8] p-8 shadow-sm sm:p-12">
          <div className="absolute -right-2 -top-2 flex size-20 items-center justify-center rounded-full border-4 border-red-900/80 bg-red-950/10 text-[10px] font-bold uppercase leading-tight text-red-950">
            Seal
          </div>
          <p className="text-center text-xs uppercase tracking-[0.35em] text-stone-500">Official notice</p>
          <h1 className="mt-4 text-center font-serif text-2xl font-semibold sm:text-3xl">{data.headline}</h1>
          <p className="mt-2 text-center text-sm text-stone-600">{data.orgName}</p>
          {data.subline.trim() ? <p className="mt-6 text-center text-sm italic text-stone-600">{data.subline}</p> : null}
          <div className={`mt-8 gap-6 ${isWeb ? 'grid sm:grid-cols-2' : 'space-y-4'}`}>
            {data.body.trim() ? <p className="text-sm leading-relaxed text-stone-700">{data.body}</p> : null}
            <ul className="space-y-2 text-sm text-stone-800">
              {data.bullets.map((b, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-stone-400">•</span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-10 flex justify-center border-t border-stone-300 pt-8">
            <a
              href={cta}
              className="inline-flex h-11 min-w-[200px] items-center justify-center border-2 border-stone-900 bg-stone-900 text-sm font-semibold text-amber-50"
            >
              {data.ctaLabel}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

function AppStoreStage({ data, layout }: { data: BusinessIntroData; layout: PageLayoutProfile }) {
  const cta = data.ctaUrl.trim() || '#'
  const isWeb = layout === 'web'

  return (
    <div className={`${previewPageRoot(layout)} bg-zinc-100 text-zinc-900`}>
      <div className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-3 px-4 py-4 sm:justify-between sm:px-6">
          <div className="flex gap-2">
            <span className="size-9 rounded-full bg-zinc-200" aria-hidden />
            <span className="size-9 rounded-full bg-zinc-200" aria-hidden />
            <span className="size-9 rounded-full bg-zinc-200" aria-hidden />
          </div>
          <a
            href={cta}
            className="rounded-full bg-emerald-600 px-5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-emerald-700"
          >
            앱 받기
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:py-16">
        <div className={`grid min-w-0 items-center gap-10 ${isWeb ? 'lg:grid-cols-2' : ''}`}>
          <div className="order-2 min-w-0 lg:order-1">
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700">{data.orgName}</p>
            <h1 className="mt-3 text-balance text-2xl font-semibold tracking-tight sm:text-3xl">{data.headline}</h1>
            {data.subline.trim() ? <p className="mt-3 text-sm text-zinc-600 sm:text-base">{data.subline}</p> : null}
            <a
              href={cta}
              className="mt-8 inline-flex h-12 items-center justify-center rounded-2xl bg-zinc-900 px-8 text-sm font-semibold text-white hover:bg-zinc-800"
            >
              {data.ctaLabel}
            </a>
          </div>
          <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
            <div className="relative w-[min(100%,280px)]">
              <div className="aspect-[9/19] w-full rounded-[2rem] border-8 border-zinc-800 bg-gradient-to-b from-emerald-100 to-zinc-200 shadow-2xl">
                <div className="flex h-full flex-col p-6 pt-10">
                  <p className="text-center text-xs font-medium text-zinc-600">스크린샷 영역</p>
                  <p className="mt-4 text-center text-sm font-semibold leading-snug text-zinc-900">{data.headline}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {data.bullets.length > 0 ? (
          <ul className={`mt-14 grid gap-3 ${isWeb ? 'sm:grid-cols-2' : ''}`}>
            {data.bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-3 rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-800">
                <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-xs font-bold text-emerald-800">
                  {i + 1}
                </span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-10 rounded-2xl border border-zinc-200 bg-white p-6">
          {data.body.trim() ? <p className="text-pretty text-sm leading-relaxed text-zinc-600">{data.body}</p> : null}
        </div>
      </div>
    </div>
  )
}

function AppOrbitCards({ data, layout }: { data: BusinessIntroData; layout: PageLayoutProfile }) {
  const cta = data.ctaUrl.trim() || '#'
  const isWeb = layout === 'web'

  return (
    <div className={`${previewPageRoot(layout)} relative overflow-hidden bg-[#0c0518] text-violet-100`}>
      <div className="pointer-events-none absolute inset-0 opacity-40 [background:radial-gradient(circle_at_50%_20%,rgba(139,92,246,0.35),transparent_55%)]" aria-hidden />
      <div className="relative mx-auto max-w-5xl px-4 py-14 sm:px-8">
        <div className="text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.45em] text-fuchsia-400/90">Orbit</p>
          <h1 className="mt-4 text-balance text-2xl font-semibold sm:text-4xl">{data.headline}</h1>
          <p className="mt-2 text-sm text-violet-300/80">{data.orgName}</p>
        </div>
        <div className={`relative mx-auto mt-14 max-w-3xl ${isWeb ? 'grid grid-cols-3 gap-6' : 'flex flex-col gap-5'}`}>
          <div className="pointer-events-none absolute left-1/2 top-1/2 hidden size-48 -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-500/25 sm:block" aria-hidden />
          {data.bullets.slice(0, 3).map((b, i) => (
            <div
              key={i}
              className="relative z-[1] rounded-2xl border border-violet-400/30 bg-violet-950/40 p-5 text-center text-sm text-violet-100 shadow-[0_0_30px_-8px_rgba(167,139,250,0.5)]"
            >
              {b}
            </div>
          ))}
        </div>
        {data.subline.trim() ? <p className="mx-auto mt-10 max-w-xl text-center text-sm text-violet-200/70">{data.subline}</p> : null}
        <div className="mt-10 flex justify-center">
          <a href={cta} className="rounded-full bg-fuchsia-500 px-8 py-3 text-sm font-semibold text-white hover:bg-fuchsia-400">
            {data.ctaLabel}
          </a>
        </div>
        {data.body.trim() ? <p className="mx-auto mt-8 max-w-2xl text-center text-xs text-violet-300/60">{data.body}</p> : null}
      </div>
    </div>
  )
}

function AppSpecSlab({ data, layout }: { data: BusinessIntroData; layout: PageLayoutProfile }) {
  const cta = data.ctaUrl.trim() || '#'
  const isWeb = layout === 'web'

  return (
    <div className={`${previewPageRoot(layout)} bg-zinc-100 font-mono text-zinc-900`}>
      <div className="border-b-2 border-zinc-900 bg-white px-4 py-3 sm:px-6">
        <p className="text-[10px] text-zinc-500">SPEC_SHEET / v1</p>
        <h1 className="mt-1 text-lg font-bold sm:text-xl">{data.headline}</h1>
      </div>
      <div className={`mx-auto max-w-4xl border-x-2 border-zinc-900 bg-white ${isWeb ? 'grid sm:grid-cols-[200px_1fr]' : ''}`}>
        <div className="border-b border-zinc-900 p-4 text-[10px] uppercase text-zinc-500 sm:border-b-0 sm:border-r">
          <p>ORG</p>
          <p className="mt-2 text-sm font-bold text-zinc-900">{data.orgName}</p>
        </div>
        <div className="space-y-px bg-zinc-900">
          {data.bullets.map((b, i) => (
            <div key={i} className="bg-white p-3 text-xs sm:p-4">
              <span className="text-zinc-400">0{i + 1}</span> {b}
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto max-w-4xl border-2 border-t-0 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6">
        {data.body.trim() ? <p className="text-xs leading-relaxed text-zinc-700">{data.body}</p> : null}
        <a href={cta} className="mt-4 inline-block border-2 border-zinc-900 bg-zinc-900 px-4 py-2 text-xs font-bold text-white">
          {data.ctaLabel}
        </a>
      </div>
    </div>
  )
}

function AppChalkPlay({ data, layout }: { data: BusinessIntroData; layout: PageLayoutProfile }) {
  const cta = data.ctaUrl.trim() || '#'
  const isWeb = layout === 'web'

  return (
    <div className={`${previewPageRoot(layout)} bg-purple-100 text-purple-950`}>
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="rounded-[2rem] border-4 border-purple-300 bg-white p-8 shadow-lg sm:p-12">
          <p className="inline-block rounded-full bg-purple-200 px-4 py-1 text-xs font-bold text-purple-900">New app</p>
          <h1 className="mt-6 text-3xl font-black tracking-tight sm:text-4xl">{data.headline}</h1>
          {data.subline.trim() ? <p className="mt-4 text-sm font-medium text-purple-800/90">{data.subline}</p> : null}
          <div className={`mt-8 gap-4 ${isWeb ? 'grid sm:grid-cols-2' : 'space-y-3'}`}>
            {data.bullets.map((b, i) => (
              <div key={i} className="rounded-2xl border-2 border-dashed border-purple-400 bg-purple-50/80 px-4 py-3 text-sm font-medium">
                {b}
              </div>
            ))}
          </div>
          {data.body.trim() ? <p className="mt-8 text-sm leading-relaxed text-purple-900/80">{data.body}</p> : null}
          <a
            href={cta}
            className="mt-8 inline-flex h-12 items-center rounded-full bg-purple-600 px-10 text-sm font-bold text-white hover:bg-purple-500"
          >
            {data.ctaLabel}
          </a>
        </div>
        <p className="mt-6 text-center text-xs text-purple-800/70">{data.orgName}</p>
      </div>
    </div>
  )
}

/**
 * 스타트업·건설·앱: 카테고리별 4변형, 레이아웃으로만 구분.
 */
export function BusinessIntroTemplatePreview({
  data,
  categoryId,
  design,
  layout = 'mobile',
}: BusinessIntroTemplatePreviewProps) {
  const isWeb = layout === 'web'
  let content
  if (categoryId === 'construction') {
    switch (design) {
      case 'blueprint-grid':
        content = <ConstructionBlueprintGrid data={data} layout={layout} />
        break
      case 'yard-beacon':
        content = <ConstructionYardBeacon data={data} layout={layout} />
        break
      case 'tender-seal':
        content = <ConstructionTenderSeal data={data} layout={layout} />
        break
      default:
        content = <ConstructionClassic data={data} layout={layout} />
    }
  } else if (categoryId === 'app') {
    switch (design) {
      case 'orbit-cards':
        content = <AppOrbitCards data={data} layout={layout} />
        break
      case 'spec-slab':
        content = <AppSpecSlab data={data} layout={layout} />
        break
      case 'chalk-play':
        content = <AppChalkPlay data={data} layout={layout} />
        break
      default:
        content = <AppStoreStage data={data} layout={layout} />
    }
  } else {
    switch (design) {
      case 'velocity-rail':
        content = <StartupVelocityRail data={data} layout={layout} />
        break
      case 'horizon-proof':
        content = <StartupHorizonProof data={data} layout={layout} />
        break
      case 'ink-ledger':
        content = <StartupInkLedger data={data} layout={layout} />
        break
      default:
        content = <StartupMissionSplit data={data} layout={layout} />
    }
  }

  if (!isWeb) return content

  const isStoreStage = categoryId === 'app' && design === 'store-stage'
  if (isStoreStage) {
    return (
      <>
        {content}
        <BusinessIntroWebSections data={data} categoryId={categoryId} design={design} />
      </>
    )
  }

  return (
    <div className={previewPageRoot(layout)}>
      {content}
      <BusinessIntroWebSections data={data} categoryId={categoryId} design={design} />
    </div>
  )
}
