import type { PortfolioDesignVariant } from '@/templates/portfolio/portfolio-variant'
import { PortfolioWebSections } from '@/templates/portfolio/portfolio-web-sections'
import type { PortfolioPageData } from '@/templates/portfolio/schema'
import type { PageLayoutProfile } from '@/templates/page-layout'
import { previewPageRoot, previewWebSectionsPad } from '@/templates/preview-layout'
import { cn } from '@/lib/utils'

const portfolioWebShell: Record<PortfolioDesignVariant, string> = {
  'noir-studio': 'bg-zinc-950 text-zinc-100',
  'daylight-editorial': 'bg-white text-stone-900',
  'film-reel': 'bg-neutral-900 text-neutral-100',
  'swiss-index': 'bg-white text-black',
}

export type { PortfolioDesignVariant } from '@/templates/portfolio/portfolio-variant'

type PortfolioTemplatePreviewProps = {
  data: PortfolioPageData
  variant?: PortfolioDesignVariant
  layout?: PageLayoutProfile
}


function PortfolioNoirStudio({ data, layout }: { data: PortfolioPageData; layout: PageLayoutProfile }) {
  const href = data.projectUrl.trim() || '#'
  const isWeb = layout === 'web'

  const imageBlock = (
    <div
      className={
        isWeb
          ? 'relative min-h-[min(70vh,560px)] min-w-0 overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900'
          : 'relative aspect-[16/10] min-w-0 overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 sm:aspect-[5/4]'
      }
    >
      {data.heroImageUrl.trim() ? (
        <img src={data.heroImageUrl.trim()} alt="" className={isWeb ? 'absolute inset-0 size-full object-cover' : 'size-full object-cover'} />
      ) : (
        <div className="flex size-full min-h-[200px] items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-950" />
      )}
    </div>
  )

  const textBlock = (
    <div className="flex min-w-0 flex-col justify-between gap-8">
      <div>
        <h1 className="text-3xl font-light tracking-tight sm:text-4xl lg:text-5xl">{data.displayName}</h1>
        {data.role.trim() ? <p className="mt-3 text-sm text-zinc-400 lg:text-base">{data.role}</p> : null}
        {data.skillLine.trim() ? (
          <p className="mt-4 max-w-2xl border-l-2 border-emerald-500/80 pl-4 text-sm text-zinc-500">{data.skillLine}</p>
        ) : null}
        {data.bio.trim() ? (
          <p className="mt-6 max-w-2xl text-pretty text-sm leading-relaxed text-zinc-300 lg:text-base">{data.bio}</p>
        ) : null}
      </div>
      <div className={`grid min-w-0 gap-4 ${isWeb ? 'sm:grid-cols-2 lg:gap-6' : 'grid-cols-1'}`}>
        <div className="min-w-0 rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 lg:p-7">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Featured</p>
          <p className="mt-2 text-lg font-medium text-white lg:text-xl">{data.projectTitle}</p>
          <a href={href} className="mt-3 inline-flex text-sm font-medium text-emerald-400 hover:underline">
            프로젝트 보기 →
          </a>
        </div>
        <div className="flex min-w-0 flex-col justify-between rounded-xl border border-zinc-800 bg-zinc-900/30 p-5 lg:p-7">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Contact</p>
          {data.email.trim() ? (
            <a href={`mailto:${data.email.trim()}`} className="mt-3 break-all text-sm text-zinc-300 hover:text-white">
              {data.email.trim()}
            </a>
          ) : null}
        </div>
      </div>
    </div>
  )

  return (
    <div className={`${previewPageRoot(layout)} bg-zinc-950 text-zinc-100`}>
      <div className={isWeb ? 'mx-auto max-w-7xl px-6 py-10 sm:px-10 lg:px-14 lg:py-14' : 'mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-10 lg:py-12'}>
        {isWeb ? (
          <div className="grid min-w-0 gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="min-w-0 lg:col-span-5">{imageBlock}</div>
            <div className="min-w-0 lg:col-span-7">{textBlock}</div>
          </div>
        ) : (
          <div className="flex min-w-0 flex-col gap-8">
            {imageBlock}
            {textBlock}
          </div>
        )}
      </div>
    </div>
  )
}

function PortfolioDaylightEditorial({ data, layout }: { data: PortfolioPageData; layout: PageLayoutProfile }) {
  const href = data.projectUrl.trim() || '#'
  const isWeb = layout === 'web'

  return (
    <div className={`${previewPageRoot(layout)} bg-white text-stone-900`}>
      <div className={isWeb ? 'mx-auto max-w-6xl border-x-2 border-stone-200 px-8 py-16 sm:px-12 lg:py-24' : 'mx-auto max-w-3xl border-x border-stone-200 px-6 py-12 sm:px-10 lg:py-16'}>
        <p className="font-serif text-xs italic text-red-800/90">Portfolio</p>
        <h1 className="mt-2 font-serif text-4xl font-medium tracking-tight sm:text-5xl">{data.displayName}</h1>
        {data.role.trim() ? <p className="mt-4 border-b border-stone-300 pb-4 text-sm uppercase tracking-widest text-stone-500">{data.role}</p> : null}
        <div className={`mt-8 gap-10 ${isWeb ? 'grid sm:grid-cols-5' : 'flex flex-col gap-8'}`}>
          <div className={isWeb ? 'sm:col-span-2' : ''}>
            {data.heroImageUrl.trim() ? (
              <img src={data.heroImageUrl.trim()} alt="" className="w-full border border-stone-200 object-cover" />
            ) : (
              <div className="flex aspect-square items-center justify-center border border-dashed border-stone-300 bg-stone-50 text-xs text-stone-400">
                이미지
              </div>
            )}
          </div>
          <div className={`min-w-0 space-y-6 ${isWeb ? 'sm:col-span-3' : ''}`}>
            {data.skillLine.trim() ? <p className="text-sm leading-relaxed text-stone-600">{data.skillLine}</p> : null}
            {data.bio.trim() ? <p className="text-pretty text-sm leading-relaxed text-stone-700">{data.bio}</p> : null}
            <div className="border-t border-stone-200 pt-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-red-900/80">Selected work</p>
              <p className="mt-2 font-serif text-xl text-stone-900">{data.projectTitle}</p>
              <a href={href} className="mt-2 inline-block text-sm text-red-800 underline decoration-red-300 underline-offset-4">
                보기
              </a>
            </div>
            {data.email.trim() ? (
              <p className="font-mono text-xs text-stone-500">
                <a href={`mailto:${data.email.trim()}`} className="hover:text-stone-900">
                  {data.email.trim()}
                </a>
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

function PortfolioFilmReel({ data, layout }: { data: PortfolioPageData; layout: PageLayoutProfile }) {
  const href = data.projectUrl.trim() || '#'
  const isWeb = layout === 'web'

  return (
    <div className={`${previewPageRoot(layout)} bg-neutral-900 text-neutral-100`}>
      <div className="border-b border-neutral-700 bg-black px-4 py-4 sm:px-6">
        <h1 className="text-lg font-bold uppercase tracking-[0.25em] text-neutral-300">{data.displayName}</h1>
        {data.role.trim() ? <p className="mt-1 text-xs text-neutral-500">{data.role}</p> : null}
      </div>
      <div className="overflow-x-auto border-b border-neutral-800">
        <div className="flex gap-3 px-4 py-5 sm:px-6">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-28 w-44 shrink-0 overflow-hidden rounded border-2 border-neutral-600 bg-neutral-800"
            >
              {i === 0 && data.heroImageUrl.trim() ? (
                <img src={data.heroImageUrl.trim()} alt="" className="size-full object-cover" />
              ) : (
                <div className="flex size-full items-center justify-center text-[10px] text-neutral-500">Frame {i + 1}</div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className={`mx-auto max-w-5xl gap-10 px-4 py-10 sm:px-6 ${isWeb ? 'max-w-7xl py-16 lg:px-12 lg:py-20' : ''} ${isWeb ? 'grid lg:grid-cols-3' : 'space-y-8'}`}>
        <div className={isWeb ? 'lg:col-span-2' : ''}>
          {data.bio.trim() ? <p className="text-pretty text-sm leading-relaxed text-neutral-400">{data.bio}</p> : null}
          {data.skillLine.trim() ? <p className="mt-6 text-xs uppercase tracking-wider text-amber-500/90">{data.skillLine}</p> : null}
        </div>
        <div className="space-y-4 rounded-lg border border-neutral-700 bg-neutral-950/50 p-5">
          <p className="text-[10px] font-bold uppercase text-neutral-500">Cue</p>
          <p className="font-medium text-neutral-200">{data.projectTitle}</p>
          <a href={href} className="text-sm text-amber-400 hover:underline">
            열기 →
          </a>
          {data.email.trim() ? (
            <a href={`mailto:${data.email.trim()}`} className="block break-all text-xs text-neutral-500 hover:text-neutral-300">
              {data.email.trim()}
            </a>
          ) : null}
        </div>
      </div>
    </div>
  )
}

function PortfolioSwissIndex({ data, layout }: { data: PortfolioPageData; layout: PageLayoutProfile }) {
  const href = data.projectUrl.trim() || '#'
  const isWeb = layout === 'web'

  return (
    <div className={`${previewPageRoot(layout)} bg-neutral-50 text-neutral-900`}>
      <div className={isWeb ? 'mx-auto max-w-7xl px-6 py-16 sm:px-12 lg:py-24' : 'mx-auto max-w-5xl px-4 py-12 sm:px-8 lg:py-16'}>
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-b-2 border-black pb-6">
          <span className="text-8xl font-black leading-none text-black/10 sm:text-[7rem]">01</span>
          <div className="min-w-0 flex-1 text-right">
            <h1 className="text-3xl font-bold uppercase tracking-tight sm:text-4xl">{data.displayName}</h1>
            {data.role.trim() ? <p className="mt-2 text-xs font-medium uppercase tracking-widest text-neutral-500">{data.role}</p> : null}
          </div>
        </div>
        <div className={`mt-10 gap-12 ${isWeb ? 'grid lg:grid-cols-12' : 'space-y-10'}`}>
          <div className={isWeb ? 'lg:col-span-4' : ''}>
            <span className="text-7xl font-black text-black/10">02</span>
            <p className="mt-4 text-xs font-bold uppercase text-neutral-400">Image</p>
            {data.heroImageUrl.trim() ? (
              <img src={data.heroImageUrl.trim()} alt="" className="mt-3 aspect-square w-full border border-black object-cover" />
            ) : (
              <div className="mt-3 flex aspect-square items-center justify-center border border-black bg-white text-xs">—</div>
            )}
          </div>
          <div className={`min-w-0 space-y-8 ${isWeb ? 'lg:col-span-8' : ''}`}>
            <div>
              <span className="text-7xl font-black text-black/10">03</span>
              {data.bio.trim() ? <p className="mt-4 max-w-prose text-sm leading-relaxed text-neutral-700">{data.bio}</p> : null}
            </div>
            <div className="grid gap-6 border-t border-neutral-300 pt-8 sm:grid-cols-2">
              <div>
                <p className="text-[10px] font-bold uppercase text-neutral-400">Work</p>
                <p className="mt-2 font-semibold">{data.projectTitle}</p>
                <a href={href} className="mt-2 inline-block text-xs underline">
                  Link
                </a>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase text-neutral-400">Mail</p>
                {data.email.trim() ? (
                  <a href={`mailto:${data.email.trim()}`} className="mt-2 block break-all text-sm">
                    {data.email.trim()}
                  </a>
                ) : (
                  <p className="mt-2 text-sm">—</p>
                )}
              </div>
            </div>
            {data.skillLine.trim() ? <p className="font-mono text-xs text-neutral-500">{data.skillLine}</p> : null}
          </div>
        </div>
      </div>
    </div>
  )
}

/** 크리에이터 포트폴리오 4변형 — 같은 주제, 레이아웃만 구분 */
export function PortfolioTemplatePreview({
  data,
  variant = 'noir-studio',
  layout = 'mobile',
}: PortfolioTemplatePreviewProps) {
  const isWeb = layout === 'web'
  let content
  switch (variant) {
    case 'daylight-editorial':
      content = <PortfolioDaylightEditorial data={data} layout={layout} />
      break
    case 'film-reel':
      content = <PortfolioFilmReel data={data} layout={layout} />
      break
    case 'swiss-index':
      content = <PortfolioSwissIndex data={data} layout={layout} />
      break
    default:
      content = <PortfolioNoirStudio data={data} layout={layout} />
  }

  if (!isWeb) return content

  return (
    <div className={previewPageRoot(layout)}>
      {content}
      <div className={cn(portfolioWebShell[variant])}>
        <div className={previewWebSectionsPad('max-w-7xl pt-0 lg:max-w-7xl')}>
          <PortfolioWebSections data={data} variant={variant} />
        </div>
      </div>
    </div>
  )
}
