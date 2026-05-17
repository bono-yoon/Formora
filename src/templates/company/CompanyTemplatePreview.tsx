import type { CompanyDesignVariant } from '@/templates/company/company-variant'
import type { CompanyPageData } from '@/templates/company/schema'
import type { PageLayoutProfile } from '@/templates/page-layout'
import { CompanyPartnerLogoStrip } from '@/templates/company/company-partner-mark'
import { CompanyWebSections } from '@/templates/company/company-web-sections'
import { webViewportFill } from '@/templates/web-viewport-fill'

export type { CompanyDesignVariant } from '@/templates/company/company-variant'

type CompanyTemplatePreviewProps = {
  data: CompanyPageData
  variant?: CompanyDesignVariant
  /** 미리보기·보내기 타깃. 모바일/웹에서 배치를 다르게 합니다. */
  layout?: PageLayoutProfile
}

const root = 'min-w-0 max-w-full break-words antialiased'

/** 미니멀·에디토리얼·글래스 B2B·스플릿 테크·로고 트러스트 × `layout`(모바일·웹). */
export function CompanyTemplatePreview({
  data,
  variant = 'minimal',
  layout = 'mobile',
}: CompanyTemplatePreviewProps) {
  const ctaHref = data.primaryCtaUrl.trim() || '#'
  const mailHref = data.contactEmail.trim() ? `mailto:${data.contactEmail.trim()}` : undefined
  const isEditorial = variant === 'editorial'
  const isWeb = layout === 'web'

  if (variant === 'glass-b2b') {
    return (
      <div className={`${root} bg-gradient-to-br from-slate-50 via-indigo-50/35 to-white text-slate-900 ${webViewportFill(isWeb)}`}>
        <div
          className={
            isWeb
              ? 'mx-auto max-w-7xl px-6 pb-20 pt-8 sm:px-10 lg:px-14'
              : 'mx-auto max-w-6xl px-4 pb-14 pt-5 sm:px-6 lg:px-8'
          }
        >
          <header className="mx-auto flex max-w-4xl min-w-0 items-center justify-between gap-3 rounded-2xl border border-white/70 bg-white/55 px-4 py-3 shadow-sm backdrop-blur-md sm:px-5">
            <div className="flex min-w-0 items-center gap-3">
              {data.logoUrl.trim() ? (
                <img src={data.logoUrl.trim()} alt="" className="size-9 shrink-0 rounded-lg object-cover ring-2 ring-indigo-100" />
              ) : (
                <div className="size-9 shrink-0 rounded-lg bg-indigo-600 ring-2 ring-indigo-100" aria-hidden />
              )}
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-900">{data.siteName}</p>
                {data.tagline.trim() ? <p className="truncate text-xs text-slate-600">{data.tagline}</p> : null}
              </div>
            </div>
            {mailHref ? (
              <a href={mailHref} className="shrink-0 text-xs font-medium text-indigo-700 hover:underline">
                문의
              </a>
            ) : null}
          </header>

          {isWeb ? (
            <div className="mt-8 grid min-w-0 gap-8 lg:grid-cols-2 lg:gap-10">
              <div className="flex min-w-0 flex-col justify-center rounded-3xl border border-indigo-200/50 bg-white/55 p-8 shadow-lg backdrop-blur-md sm:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo-600/90">Glass B2B</p>
                <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">{data.heroTitle}</h1>
                {data.heroSubtitle.trim() ? (
                  <p className="mt-4 text-pretty text-sm leading-relaxed text-slate-600 sm:text-base">{data.heroSubtitle}</p>
                ) : null}
                <div className="mt-8">
                  <a
                    href={ctaHref}
                    className="inline-flex h-11 items-center justify-center rounded-full bg-indigo-600 px-8 text-sm font-semibold text-white shadow-md transition hover:bg-indigo-700"
                  >
                    {data.primaryCtaLabel}
                  </a>
                </div>
              </div>
              <div className="min-w-0 overflow-hidden rounded-3xl border border-indigo-100/80 bg-white/40 shadow-inner backdrop-blur-sm">
                {data.heroImageUrl.trim() ? (
                  <img src={data.heroImageUrl.trim()} alt="" className="aspect-[4/3] size-full object-cover lg:min-h-[420px]" />
                ) : (
                  <div className="flex aspect-[4/3] min-h-[240px] items-center justify-center bg-gradient-to-br from-indigo-100/80 to-slate-100 lg:min-h-[420px]" />
                )}
              </div>
            </div>
          ) : (
            <div className="mx-auto mt-6 max-w-xl min-w-0 overflow-hidden rounded-3xl border border-indigo-200/50 bg-white/55 shadow-lg backdrop-blur-md">
              {data.heroImageUrl.trim() ? (
                <img src={data.heroImageUrl.trim()} alt="" className="aspect-[16/10] w-full object-cover" />
              ) : (
                <div className="aspect-[16/10] w-full bg-gradient-to-br from-indigo-100/80 to-slate-100" />
              )}
              <div className="px-6 py-8 text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo-600/90">Glass B2B</p>
                <h1 className="mt-2 text-balance text-2xl font-semibold text-slate-900">{data.heroTitle}</h1>
                {data.heroSubtitle.trim() ? (
                  <p className="mx-auto mt-3 max-w-prose text-pretty text-sm text-slate-600">{data.heroSubtitle}</p>
                ) : null}
                <div className="mt-6 flex justify-center">
                  <a
                    href={ctaHref}
                    className="inline-flex h-11 items-center justify-center rounded-full bg-indigo-600 px-8 text-sm font-semibold text-white"
                  >
                    {data.primaryCtaLabel}
                  </a>
                </div>
              </div>
            </div>
          )}

          <section className={`mt-12 sm:mt-16 ${isWeb ? 'lg:mt-24' : ''}`}>
            <p className="text-center text-xs font-semibold uppercase tracking-widest text-indigo-600/80">Capabilities</p>
            <div className={`mt-6 grid min-w-0 gap-4 ${isWeb ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2'}`}>
              {data.features.map((f, index) => (
                <div
                  key={`${index}-${f.title}`}
                  className="min-w-0 rounded-2xl border border-white/70 bg-white/50 p-5 shadow-sm backdrop-blur-md"
                >
                  <div className="flex size-10 items-center justify-center rounded-xl bg-indigo-600/10 text-sm font-bold text-indigo-700">
                    {index + 1}
                  </div>
                  <h2 className="mt-3 text-sm font-semibold text-slate-900">{f.title}</h2>
                  {f.description.trim() ? (
                    <p className="mt-2 text-xs leading-relaxed text-slate-600 sm:text-sm">{f.description}</p>
                  ) : null}
                </div>
              ))}
            </div>
          </section>

          {isWeb ? <CompanyWebSections data={data} variant="glass-b2b" /> : null}

          <footer className={`mt-12 border-t border-indigo-100/80 pt-8 text-center text-xs text-slate-500 ${isWeb ? 'mt-20 pb-10 lg:mt-28 lg:pt-12' : ''}`}>
            {data.contactEmail.trim() ? (
              <p>
                <a href={`mailto:${data.contactEmail.trim()}`} className="font-medium text-indigo-800 hover:underline">
                  {data.contactEmail.trim()}
                </a>
              </p>
            ) : null}
            {data.footerNote.trim() ? <p className="mx-auto mt-2 max-w-xl text-pretty">{data.footerNote}</p> : null}
          </footer>
        </div>
      </div>
    )
  }

  if (variant === 'split-tech') {
    return (
      <div className={`${root} bg-slate-50 text-slate-900 ${webViewportFill(isWeb)}`}>
        {isWeb ? (
          <div className="grid min-h-[min(62vh,640px)] min-w-0 grid-cols-1 md:grid-cols-2">
            <div className="flex min-w-0 flex-col justify-center bg-indigo-700 px-8 py-14 text-white md:px-14 md:py-20">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-200">Split tech</p>
              <h1 className="mt-4 text-balance text-3xl font-bold tracking-tight md:text-4xl">{data.heroTitle}</h1>
              {data.heroSubtitle.trim() ? (
                <p className="mt-4 max-w-md text-pretty text-sm leading-relaxed text-indigo-100 md:text-base">{data.heroSubtitle}</p>
              ) : null}
              <div className="mt-8">
                <a
                  href={ctaHref}
                  className="inline-flex h-11 items-center justify-center rounded-md bg-white px-8 text-sm font-semibold text-indigo-800 transition hover:bg-indigo-50"
                >
                  {data.primaryCtaLabel}
                </a>
              </div>
            </div>
            <div
              className={
                isWeb
                  ? 'relative min-h-[320px] min-w-0 bg-white md:min-h-[min(62vh,640px)]'
                  : 'relative min-h-[280px] min-w-0 bg-white md:min-h-0'
              }
            >
              {data.heroImageUrl.trim() ? (
                <img src={data.heroImageUrl.trim()} alt="" className="absolute inset-0 size-full object-cover" />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-100" />
              )}
            </div>
          </div>
        ) : (
          <>
            <div className="bg-indigo-700 px-6 py-12 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-200">Split tech</p>
              <h1 className="mt-3 text-balance text-2xl font-bold tracking-tight">{data.heroTitle}</h1>
              {data.heroSubtitle.trim() ? (
                <p className="mt-3 max-w-prose text-pretty text-sm leading-relaxed text-indigo-100">{data.heroSubtitle}</p>
              ) : null}
              <div className="mt-6">
                <a
                  href={ctaHref}
                  className="inline-flex h-11 items-center justify-center rounded-md bg-white px-6 text-sm font-semibold text-indigo-800"
                >
                  {data.primaryCtaLabel}
                </a>
              </div>
            </div>
            <div className="min-w-0 px-6 py-8">
              {data.heroImageUrl.trim() ? (
                <img src={data.heroImageUrl.trim()} alt="" className="aspect-video w-full max-w-2xl rounded-xl object-cover" />
              ) : (
                <div className="aspect-video w-full max-w-2xl rounded-xl bg-gradient-to-br from-slate-200 to-slate-100" />
              )}
            </div>
          </>
        )}

        <section
          className={`mx-auto px-4 py-12 sm:px-8 ${isWeb ? 'max-w-7xl py-16 lg:px-12 lg:py-24' : 'max-w-6xl'}`}
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Highlights</p>
          <div className="mt-6 space-y-4">
            {data.features.map((f, index) => (
              <div
                key={`${index}-${f.title}`}
                className="min-w-0 border-l-4 border-indigo-600 bg-white px-5 py-4 shadow-sm sm:px-6"
              >
                <h2 className="text-base font-semibold text-slate-900">{f.title}</h2>
                {f.description.trim() ? (
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.description}</p>
                ) : null}
              </div>
            ))}
          </div>
        </section>

        <section className={`mx-auto px-4 sm:px-8 ${isWeb ? 'max-w-7xl lg:px-12' : 'max-w-6xl'}`}>
          {isWeb ? <CompanyWebSections data={data} variant="split-tech" /> : null}
        </section>

        <footer className={`border-t border-slate-200 bg-white px-4 py-8 text-center text-xs text-slate-500 sm:px-8 ${isWeb ? 'py-12 lg:px-12' : ''}`}>
          {data.contactEmail.trim() ? (
            <p>
              <a href={`mailto:${data.contactEmail.trim()}`} className="font-medium text-indigo-700 hover:underline">
                {data.contactEmail.trim()}
              </a>
            </p>
          ) : null}
          {data.footerNote.trim() ? <p className="mx-auto mt-2 max-w-xl text-pretty">{data.footerNote}</p> : null}
        </footer>
      </div>
    )
  }

  if (isEditorial) {
    return (
      <div className={`${root} bg-neutral-950 text-neutral-100 ${webViewportFill(isWeb)}`}>
        <header className="border-b border-neutral-800 px-4 py-4 sm:px-8 lg:px-10">
          <div className={`mx-auto flex min-w-0 items-center justify-between gap-4 ${isWeb ? 'max-w-7xl lg:px-4' : 'max-w-6xl'}`}>
            <div className="flex min-w-0 items-center gap-3">
              {data.logoUrl.trim() ? (
                <img src={data.logoUrl.trim()} alt="" className="size-10 shrink-0 rounded-md object-cover" />
              ) : (
                <div className="size-10 shrink-0 rounded-md bg-neutral-100" aria-hidden />
              )}
              <p className="truncate text-xs font-semibold uppercase tracking-[0.35em] text-neutral-400">
                {data.siteName}
              </p>
            </div>
            {mailHref ? (
              <a
                href={mailHref}
                className="shrink-0 text-xs text-neutral-300 underline-offset-4 hover:text-white hover:underline"
              >
                Contact
              </a>
            ) : null}
          </div>
        </header>

        {isWeb ? (
          <section className="grid min-h-[min(62vh,600px)] min-w-0 grid-cols-1 border-b border-neutral-800 md:grid-cols-2">
            <div className="relative min-h-[220px] min-w-0 overflow-hidden md:min-h-[min(62vh,600px)]">
              {data.heroImageUrl.trim() ? (
                <img src={data.heroImageUrl.trim()} alt="" className="absolute inset-0 size-full object-cover" />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 via-neutral-900 to-black" />
              )}
            </div>
            <div className="flex min-w-0 flex-col justify-center bg-neutral-950 px-6 py-14 sm:px-10 sm:py-20 lg:px-14 lg:py-24">
              <p className="text-xs font-medium uppercase tracking-[0.35em] text-neutral-500">Editorial</p>
              <h1 className="mt-4 text-balance font-serif text-3xl font-light leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl">
                {data.heroTitle}
              </h1>
              {data.heroSubtitle.trim() ? (
                <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-neutral-300">{data.heroSubtitle}</p>
              ) : null}
              <div className="mt-8">
                <a
                  href={ctaHref}
                  className="inline-flex h-12 items-center justify-center border border-white/30 bg-white/10 px-8 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white hover:text-neutral-950 sm:px-10"
                >
                  {data.primaryCtaLabel}
                </a>
              </div>
            </div>
          </section>
        ) : (
          <section className="relative min-h-[min(52vh,520px)] w-full min-w-0 overflow-hidden">
            {data.heroImageUrl.trim() ? (
              <img src={data.heroImageUrl.trim()} alt="" className="absolute inset-0 size-full object-cover" />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 via-neutral-900 to-black" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            <div className="relative mx-auto flex min-h-[min(52vh,520px)] max-w-6xl flex-col justify-end px-4 pb-12 pt-24 sm:px-8 sm:pb-16">
              <p className="text-xs font-medium uppercase tracking-[0.35em] text-white/60">Editorial</p>
              <h1 className="mt-4 max-w-full text-balance font-serif text-3xl font-light leading-[1.05] tracking-tight text-white sm:text-4xl">
                {data.heroTitle}
              </h1>
              {data.heroSubtitle.trim() ? (
                <p className="mt-5 max-w-xl text-pretty text-sm leading-relaxed text-white/80 sm:text-base">
                  {data.heroSubtitle}
                </p>
              ) : null}
              <div className="mt-8">
                <a
                  href={ctaHref}
                  className="inline-flex h-12 items-center justify-center border border-white/30 bg-white/10 px-8 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white hover:text-neutral-950"
                >
                  {data.primaryCtaLabel}
                </a>
              </div>
            </div>
          </section>
        )}

        <section className="border-t border-neutral-800 bg-neutral-950 px-4 py-14 sm:px-8 sm:py-20 lg:px-10 lg:py-28">
          <div className={`mx-auto min-w-0 ${isWeb ? 'max-w-7xl' : 'max-w-6xl'}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">Highlights</p>
            <div
              className={
                isWeb
                  ? 'mt-10 grid min-w-0 grid-cols-1 gap-0 border-y border-neutral-800 sm:grid-cols-2 sm:divide-x sm:divide-neutral-800'
                  : 'mt-10 divide-y divide-neutral-800 border-y border-neutral-800'
              }
            >
              {data.features.map((f, index) => (
                <div key={`${index}-${f.title}`} className="flex min-w-0 gap-4 px-0 py-8 sm:gap-6 sm:px-6 sm:py-10 lg:px-10">
                  <span className="shrink-0 font-serif text-4xl font-light leading-none text-neutral-600 sm:text-5xl">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h2 className="font-serif text-lg font-medium tracking-tight text-white sm:text-xl">{f.title}</h2>
                    {f.description.trim() ? (
                      <p className="mt-2 text-pretty text-sm leading-relaxed text-neutral-400 sm:text-base">{f.description}</p>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>

            {isWeb ? <CompanyWebSections data={data} variant="editorial" /> : null}
          </div>
        </section>

        <footer className="border-t border-neutral-800 bg-black px-4 py-12 sm:px-8 lg:px-10 lg:py-16">
          <div className={`mx-auto min-w-0 text-center text-xs text-neutral-500 ${isWeb ? 'max-w-7xl' : 'max-w-6xl'}`}>
            {data.contactEmail.trim() ? (
              <p>
                <a href={`mailto:${data.contactEmail.trim()}`} className="text-neutral-300 hover:text-white hover:underline">
                  {data.contactEmail.trim()}
                </a>
              </p>
            ) : null}
            {data.footerNote.trim() ? <p className="mx-auto mt-3 max-w-2xl text-pretty text-neutral-500">{data.footerNote}</p> : null}
          </div>
        </footer>
      </div>
    )
  }

  if (variant === 'logo-trust') {
    const logoPartners = data.partners.filter((p) => p.name.trim())

    return (
      <div className={`${root} bg-white text-slate-900 ${webViewportFill(isWeb)}`}>
        <div className={isWeb ? 'mx-auto max-w-7xl px-6 pt-10 sm:px-10 lg:px-14' : 'mx-auto max-w-xl px-4 pt-6 sm:px-6'}>
          <header className="flex items-center justify-between gap-3 border-b border-slate-200 pb-4">
            <div className="flex min-w-0 items-center gap-3">
              {data.logoUrl.trim() ? (
                <img src={data.logoUrl.trim()} alt="" className="size-10 shrink-0 rounded-lg object-cover" />
              ) : (
                <div className="size-10 shrink-0 rounded-lg bg-emerald-600" aria-hidden />
              )}
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-900">{data.siteName}</p>
                {data.tagline.trim() ? <p className="truncate text-xs text-slate-500">{data.tagline}</p> : null}
              </div>
            </div>
            {mailHref ? (
              <a href={mailHref} className="shrink-0 text-xs font-medium text-emerald-700 hover:underline">
                문의
              </a>
            ) : null}
          </header>
        </div>

        <section className={isWeb ? 'mx-auto max-w-7xl px-6 sm:px-10 lg:px-14' : 'mx-auto max-w-xl px-4 sm:px-6'}>
          <div
            className={
              isWeb
                ? 'grid min-w-0 gap-10 rounded-2xl border border-slate-200 bg-slate-50/50 p-8 sm:grid-cols-2 sm:p-10 lg:gap-14 lg:p-12'
                : 'overflow-hidden rounded-2xl border border-slate-200 bg-white'
            }
          >
            <div className={isWeb ? 'flex min-w-0 flex-col justify-center' : 'px-5 py-8 sm:px-8'}>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-700">Logo trust</p>
              <h1 className="mt-3 text-balance text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
                {data.heroTitle}
              </h1>
              {data.heroSubtitle.trim() ? (
                <p className="mt-4 text-pretty text-sm leading-relaxed text-slate-600 sm:text-base">{data.heroSubtitle}</p>
              ) : null}
              <div className="mt-6">
                <a
                  href={ctaHref}
                  className="inline-flex h-11 items-center justify-center rounded-lg bg-emerald-600 px-8 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
                >
                  {data.primaryCtaLabel}
                </a>
              </div>
              {isWeb ? (
                <CompanyPartnerLogoStrip partners={logoPartners} className="mt-10 border-t border-slate-200 pt-8" />
              ) : null}
            </div>
            <div className="min-w-0 overflow-hidden rounded-xl">
              {data.heroImageUrl.trim() ? (
                <img
                  src={data.heroImageUrl.trim()}
                  alt=""
                  className={
                    isWeb
                      ? 'aspect-[4/3] size-full min-h-[280px] object-cover lg:min-h-[340px]'
                      : 'aspect-[16/10] w-full object-cover'
                  }
                />
              ) : (
                <div
                  className={
                    isWeb
                      ? 'aspect-[4/3] min-h-[280px] w-full bg-gradient-to-br from-emerald-50 via-slate-50 to-white lg:min-h-[340px]'
                      : 'aspect-[16/10] w-full bg-gradient-to-br from-emerald-50 via-slate-50 to-white'
                  }
                />
              )}
            </div>
          </div>
          {!isWeb && logoPartners.length > 0 ? (
            <CompanyPartnerLogoStrip partners={logoPartners} className="mt-8 rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-6" />
          ) : null}
        </section>

        <section className={isWeb ? 'mx-auto mt-12 max-w-7xl px-6 pb-20 sm:px-10 lg:px-14' : 'mx-auto mt-10 max-w-xl px-4 pb-14 sm:px-6'}>
          <p className="text-center text-xs font-semibold uppercase tracking-wider text-slate-400">Why us</p>
          <div className={`mt-5 grid gap-4 ${isWeb ? 'sm:grid-cols-2 lg:grid-cols-3' : ''}`}>
            {data.features.map((f, index) => (
              <div key={`${index}-${f.title}`} className="min-w-0 rounded-xl border border-slate-200 bg-white p-5 text-left">
                <h2 className="text-sm font-semibold text-slate-900">{f.title}</h2>
                {f.description.trim() ? (
                  <p className="mt-2 text-xs leading-relaxed text-slate-600 sm:text-sm">{f.description}</p>
                ) : null}
              </div>
            ))}
          </div>
        </section>

        <section className={isWeb ? 'mx-auto max-w-7xl px-6 sm:px-10 lg:px-14' : 'mx-auto max-w-xl px-4 sm:px-6'}>
          {isWeb ? <CompanyWebSections data={data} variant="logo-trust" /> : null}
        </section>

        <footer className={`border-t border-slate-200 px-4 py-10 text-center text-xs text-slate-500 sm:px-8 ${isWeb ? 'py-14' : ''}`}>
          {data.contactEmail.trim() ? (
            <p>
              <a href={`mailto:${data.contactEmail.trim()}`} className="font-medium text-slate-700 hover:underline">
                {data.contactEmail.trim()}
              </a>
            </p>
          ) : null}
          {data.footerNote.trim() ? <p className="mt-2 text-pretty">{data.footerNote}</p> : null}
        </footer>
      </div>
    )
  }

  /* —— minimal —— */
  return (
    <div className={`${root} bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900 ${webViewportFill(isWeb)}`}>
      <div className={isWeb ? 'mx-auto max-w-7xl px-6 pt-10 sm:px-10 lg:px-14' : 'mx-auto max-w-xl px-4 pt-6 sm:px-6'}>
        <header className="rounded-2xl border border-slate-200/80 bg-white/90 px-4 py-4 shadow-sm backdrop-blur-sm sm:px-6">
          <div className={isWeb ? 'flex flex-wrap items-start justify-between gap-4' : 'flex items-start justify-between gap-3'}>
            <div className="flex min-w-0 items-center gap-3">
              {data.logoUrl.trim() ? (
                <img src={data.logoUrl.trim()} alt="" className="size-10 shrink-0 rounded-xl object-cover ring-2 ring-blue-100" />
              ) : (
                <div className="size-10 shrink-0 rounded-xl bg-blue-600 ring-2 ring-blue-100" aria-hidden />
              )}
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold tracking-tight text-slate-900">{data.siteName}</p>
                {data.tagline.trim() ? <p className="truncate text-xs text-slate-500">{data.tagline}</p> : null}
              </div>
            </div>
            {mailHref ? (
              <a href={mailHref} className="shrink-0 text-xs font-medium text-blue-600 hover:underline">
                문의
              </a>
            ) : null}
          </div>
        </header>
      </div>

      <section className={isWeb ? 'mx-auto mt-10 max-w-7xl px-6 sm:px-10 lg:px-14' : 'mx-auto mt-8 max-w-xl px-4 sm:px-6'}>
        {isWeb ? (
          <div className="grid min-w-0 gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:grid-cols-2 sm:gap-10 sm:p-10 lg:p-12">
            <div className="min-w-0 overflow-hidden rounded-2xl">
              {data.heroImageUrl.trim() ? (
                <img src={data.heroImageUrl.trim()} alt="" className="aspect-[4/3] size-full object-cover sm:aspect-auto sm:min-h-[320px] lg:min-h-[360px]" />
              ) : (
                <div className="aspect-[4/3] min-h-[200px] w-full bg-gradient-to-br from-blue-50 via-slate-50 to-indigo-100 sm:min-h-[320px] lg:min-h-[360px]" />
              )}
            </div>
            <div className="flex min-w-0 flex-col justify-center text-left">
              <h1 className="text-balance text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
                {data.heroTitle}
              </h1>
              {data.heroSubtitle.trim() ? (
                <p className="mt-4 text-pretty text-sm leading-relaxed text-slate-600 sm:text-base">{data.heroSubtitle}</p>
              ) : null}
              <div className="mt-6">
                <a
                  href={ctaHref}
                  className="inline-flex h-11 items-center justify-center rounded-full bg-blue-600 px-8 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                >
                  {data.primaryCtaLabel}
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            {data.heroImageUrl.trim() ? (
              <img src={data.heroImageUrl.trim()} alt="" className="aspect-[16/10] w-full object-cover" />
            ) : (
              <div className="aspect-[16/10] w-full bg-gradient-to-br from-blue-50 via-slate-50 to-indigo-100" />
            )}
            <div className="px-5 py-8 text-center sm:px-8 sm:py-10">
              <h1 className="text-balance text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{data.heroTitle}</h1>
              {data.heroSubtitle.trim() ? (
                <p className="mx-auto mt-3 max-w-prose text-pretty text-sm leading-relaxed text-slate-600 sm:text-base">
                  {data.heroSubtitle}
                </p>
              ) : null}
              <div className="mt-7 flex justify-center">
                <a
                  href={ctaHref}
                  className="inline-flex h-11 items-center justify-center rounded-full bg-blue-600 px-8 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                >
                  {data.primaryCtaLabel}
                </a>
              </div>
            </div>
          </div>
        )}
      </section>

      <section className={isWeb ? 'mx-auto mt-12 max-w-7xl px-6 pb-20 sm:px-10 lg:px-14' : 'mx-auto mt-10 max-w-xl px-4 pb-14 sm:px-6'}>
        <p className="text-center text-xs font-semibold uppercase tracking-wider text-slate-400">Why us</p>
        <div className={`mt-5 grid gap-4 ${isWeb ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2'}`}>
          {data.features.map((f, index) => (
            <div
              key={`${index}-${f.title}`}
              className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm"
            >
              <div className="flex size-9 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-blue-700">
                {index + 1}
              </div>
              <h2 className="mt-3 text-sm font-semibold text-slate-900">{f.title}</h2>
              {f.description.trim() ? (
                <p className="mt-2 text-xs leading-relaxed text-slate-600 sm:text-sm">{f.description}</p>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <section className={isWeb ? 'mx-auto max-w-7xl px-6 sm:px-10 lg:px-14' : 'mx-auto max-w-xl px-4 sm:px-6'}>
        {isWeb ? <CompanyWebSections data={data} variant="minimal" /> : null}
      </section>

      <footer className={`border-t border-slate-200 bg-white/80 px-4 py-10 text-center text-xs text-slate-500 sm:px-8 ${isWeb ? 'py-14 lg:px-12' : ''}`}>
        {data.contactEmail.trim() ? (
          <p>
            <a href={`mailto:${data.contactEmail.trim()}`} className="font-medium text-slate-700 hover:underline">
              {data.contactEmail.trim()}
            </a>
          </p>
        ) : null}
        {data.footerNote.trim() ? <p className="mt-2 text-pretty">{data.footerNote}</p> : null}
      </footer>
    </div>
  )
}
