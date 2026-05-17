import type { WeddingPageData } from '@/templates/wedding/schema'
import type { WeddingDesignVariant } from '@/templates/wedding/wedding-variant'
import { WeddingGiftSection } from '@/templates/wedding/WeddingGiftSection'

export type { WeddingDesignVariant } from '@/templates/wedding/wedding-variant'

type WeddingTemplatePreviewProps = {
  data: WeddingPageData
  variant?: WeddingDesignVariant
}

const shell = 'max-w-full min-w-0 overflow-x-hidden break-words antialiased'

/** 클래식·커버 포커스·파스텔 가든·모노 미니멀 — 네 가지 톤. */
export function WeddingTemplatePreview({ data, variant = 'classic' }: WeddingTemplatePreviewProps) {
  const mapHref = data.mapUrl.trim()
  const cover = data.coverImageUrl.trim()

  if (variant === 'cover-focus') {
    return (
      <div className={`min-h-full bg-white font-sans text-neutral-900 ${shell}`}>
        <section className="relative min-h-[min(88vh,640px)] w-full max-w-full overflow-hidden">
          {cover ? (
            <img src={cover} alt="" className="absolute inset-0 size-full max-w-full object-cover" />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-black" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/20" />
          <div className="relative flex min-h-[min(88vh,640px)] max-w-full flex-col justify-end px-4 pb-12 pt-24 sm:px-8 sm:pb-16">
            <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-white/70 sm:tracking-[0.5em]">
              Save the date
            </p>
            <h1 className="mt-4 max-w-full text-balance font-sans text-3xl font-extralight tracking-tight text-white sm:text-5xl lg:text-6xl">
              {data.coupleNames}
            </h1>
            <p className="mt-4 max-w-full text-sm font-medium text-white/90">{data.weddingDate}</p>
          </div>
        </section>

        <div className="mx-auto w-full max-w-6xl min-w-0 px-4 py-14 sm:px-8 lg:py-20">
          <div className="grid min-w-0 gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="min-w-0 lg:col-span-7">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400">Invitation</p>
              {data.message.trim() ? (
                <p className="mt-6 border-l-4 border-neutral-900 pl-4 text-pretty text-base leading-relaxed text-neutral-700 sm:pl-6">
                  {data.message}
                </p>
              ) : null}
            </div>
            <aside className="min-w-0 lg:col-span-5">
              <div className="space-y-6 border-2 border-neutral-900 bg-neutral-50 p-6 sm:p-10">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Venue</p>
                  <p className="mt-2 text-xl font-semibold tracking-tight text-neutral-950">{data.venueName}</p>
                  {data.venueAddress.trim() ? (
                    <p className="mt-3 text-sm leading-relaxed text-neutral-600">{data.venueAddress}</p>
                  ) : null}
                </div>
                {mapHref ? (
                  <a
                    href={mapHref}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-12 w-full min-w-0 items-center justify-center bg-neutral-900 text-sm font-semibold text-white transition hover:bg-neutral-800"
                  >
                    지도 · 길찾기
                  </a>
                ) : null}
              </div>
              {data.calendarNote.trim() ? (
                <p className="mt-6 text-center text-xs text-neutral-500 lg:text-left">{data.calendarNote}</p>
              ) : null}
            </aside>
          </div>
          <div className="mx-auto mt-10 w-full max-w-6xl min-w-0 px-4 sm:px-8">
            <WeddingGiftSection data={data} variant="cover-focus" />
          </div>
        </div>

        <footer className="border-t border-neutral-200 px-4 py-8 text-center text-[10px] text-neutral-400 sm:px-10">
          Formora · 커버 포커스 청첩장
        </footer>
      </div>
    )
  }

  if (variant === 'pastel-garden') {
    return (
      <div className={`min-h-full bg-gradient-to-b from-violet-100/90 via-fuchsia-50/80 to-amber-50 font-serif text-violet-950 ${shell}`}>
        <div className="mx-auto w-full max-w-lg min-w-0 px-4 pb-12 pt-8 sm:px-6">
          <p className="text-center text-[10px] tracking-[0.4em] text-violet-700/70">Garden party</p>
          <h1 className="mt-4 text-center text-balance text-3xl font-light text-violet-950 sm:text-4xl">{data.coupleNames}</h1>
          <p className="mt-3 text-center text-sm leading-relaxed text-violet-900/80">{data.weddingDate}</p>

          <div className="mt-8 w-full max-w-full overflow-hidden rounded-[2rem] border border-white/70 bg-white/50 shadow-lg backdrop-blur-md">
            {cover ? (
              <img src={cover} alt="" className="aspect-[4/5] w-full max-w-full object-cover sm:aspect-[16/10]" />
            ) : (
              <div className="flex aspect-[4/5] w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-violet-200/60 to-fuchsia-100/80 px-4 text-center sm:aspect-[16/10]">
                <p className="text-xs tracking-[0.3em] text-violet-800/60">WITH LOVE</p>
                <p className="text-balance text-2xl font-light text-violet-950">{data.coupleNames}</p>
              </div>
            )}
          </div>

          <div className="mt-8 space-y-4">
            <div className="rounded-3xl border-l-4 border-fuchsia-400/90 bg-white/70 p-6 shadow-md backdrop-blur-sm">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-fuchsia-700/80">Place</p>
              <p className="mt-2 font-medium text-violet-950">{data.venueName}</p>
              {data.venueAddress.trim() ? (
                <p className="mt-2 text-sm leading-relaxed text-violet-900/75">{data.venueAddress}</p>
              ) : null}
              {mapHref ? (
                <a
                  href={mapHref}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex w-full min-w-0 items-center justify-center rounded-full bg-violet-700 px-4 py-2.5 text-xs font-semibold text-white hover:bg-violet-800"
                >
                  지도 보기
                </a>
              ) : null}
            </div>

            {data.message.trim() ? (
              <div className="rounded-3xl border border-white/80 bg-white/60 p-6 text-center shadow-sm backdrop-blur-sm">
                <p className="text-[10px] tracking-[0.35em] text-violet-700/70">Dear guests</p>
                <p className="mt-3 text-pretty text-sm leading-relaxed text-violet-900/85">{data.message}</p>
              </div>
            ) : null}

            {data.calendarNote.trim() ? (
              <p className="text-center text-xs leading-relaxed text-violet-800/70">{data.calendarNote}</p>
            ) : null}

            <WeddingGiftSection data={data} variant="pastel-garden" />
          </div>
        </div>

        <footer className="px-4 pb-8 text-center text-[10px] text-violet-700/50">Formora · 파스텔 가든</footer>
      </div>
    )
  }

  if (variant === 'mono-minimal') {
    return (
      <div className={`min-h-full bg-white font-sans text-neutral-900 ${shell}`}>
        <div className="h-1.5 w-full max-w-full bg-neutral-900" aria-hidden />
        <div className="mx-auto w-full max-w-2xl min-w-0 px-4 py-10 sm:px-8">
          <p className="text-[10px] font-medium uppercase tracking-[0.55em] text-neutral-400">Wedding</p>
          <h1 className="mt-6 text-balance text-3xl font-extralight tracking-tight text-neutral-900 sm:text-4xl">
            {data.coupleNames}
          </h1>
          <p className="mt-6 border-b border-neutral-200 pb-6 text-sm leading-relaxed text-neutral-600">{data.weddingDate}</p>

          {cover ? (
            <div className="mt-8 w-full max-w-full overflow-hidden border border-neutral-200">
              <img src={cover} alt="" className="max-h-72 w-full object-cover grayscale" />
            </div>
          ) : (
            <div className="mt-8 h-40 w-full max-w-full bg-neutral-100" aria-hidden />
          )}

          <div className="mt-10 grid min-w-0 divide-y divide-neutral-200 border-y border-neutral-200">
            <div className="grid gap-4 py-6 sm:grid-cols-2 sm:gap-8">
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400">Venue</p>
                <p className="mt-2 text-base font-medium text-neutral-900">{data.venueName}</p>
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400">Address</p>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                  {data.venueAddress.trim() || '—'}
                </p>
              </div>
            </div>
            {mapHref ? (
              <a
                href={mapHref}
                target="_blank"
                rel="noreferrer"
                className="block w-full min-w-0 py-4 text-center text-sm font-medium text-neutral-900 underline-offset-4 hover:underline"
              >
                지도 열기 →
              </a>
            ) : null}
          </div>

          {data.message.trim() ? (
            <p className="mt-10 max-w-full text-pretty text-sm leading-relaxed text-neutral-600">{data.message}</p>
          ) : null}

          {data.calendarNote.trim() ? (
            <p className="mt-8 text-xs leading-relaxed text-neutral-500">{data.calendarNote}</p>
          ) : null}

          <div className="mt-10">
            <WeddingGiftSection data={data} variant="mono-minimal" />
          </div>
        </div>

        <footer className="border-t border-neutral-200 px-4 py-6 text-center text-[10px] text-neutral-400">
          Formora · 모노 미니멀
        </footer>
      </div>
    )
  }

  /* —— classic —— */
  return (
    <div className={`min-h-full bg-[#fdf8f3] font-serif text-stone-800 ${shell}`}>
      <div className="mx-auto w-full max-w-md min-w-0 border-x border-amber-900/10 bg-[#fdf8f3] shadow-sm">
        <div className="px-4 pt-10 text-center sm:px-6">
          <p className="text-[10px] tracking-[0.35em] text-rose-800/70">WEDDING</p>
          <div className="mx-auto mt-4 flex max-w-full items-center gap-3 text-rose-900/40">
            <span className="h-px min-w-0 flex-1 bg-current" aria-hidden />
            <span className="shrink-0 text-xs">✦</span>
            <span className="h-px min-w-0 flex-1 bg-current" aria-hidden />
          </div>
        </div>

        <div className="relative mt-8 aspect-[3/4] w-full max-w-full overflow-hidden px-4 sm:px-6">
          <div className="relative max-w-full overflow-hidden rounded-sm border-[6px] border-double border-amber-900/25 bg-stone-200 shadow-inner">
            {cover ? (
              <img src={cover} alt="" className="size-full max-w-full object-cover" />
            ) : (
              <div className="flex aspect-[3/4] max-w-full flex-col items-center justify-center gap-3 bg-gradient-to-b from-rose-50 to-amber-50 px-4 text-center">
                <p className="text-xs tracking-[0.35em] text-rose-900/50">INVITATION</p>
                <p className="text-balance text-2xl font-light text-rose-950 sm:text-3xl">{data.coupleNames}</p>
              </div>
            )}
            {cover ? (
              <>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 max-w-full px-4 pb-8 pt-16 text-center text-white sm:px-6">
                  <p className="text-balance font-serif text-2xl font-light drop-shadow-md sm:text-3xl">{data.coupleNames}</p>
                </div>
              </>
            ) : null}
          </div>
        </div>

        <div className="space-y-8 px-4 py-10 sm:px-8">
          <section className="text-center">
            <h1 className="font-serif text-xl font-medium text-stone-900 sm:text-2xl">{data.coupleNames}</h1>
            <p className="mt-4 text-sm leading-relaxed text-stone-600">{data.weddingDate}</p>
          </section>

          <div className="flex max-w-full items-center gap-3 text-amber-900/30">
            <span className="h-px min-w-0 flex-1 bg-current" aria-hidden />
            <span className="shrink-0 text-[10px] tracking-widest">오시는 길</span>
            <span className="h-px min-w-0 flex-1 bg-current" aria-hidden />
          </div>

          <section className="rounded-sm border border-amber-900/20 bg-white/70 px-4 py-7 text-center shadow-sm backdrop-blur-sm sm:px-6">
            <p className="font-medium text-stone-900">{data.venueName}</p>
            {data.venueAddress.trim() ? (
              <p className="mt-3 text-sm leading-relaxed text-stone-600">{data.venueAddress}</p>
            ) : null}
            {mapHref ? (
              <a
                href={mapHref}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex h-10 max-w-full min-w-0 items-center justify-center rounded-full border border-rose-300/80 bg-rose-50/80 px-4 text-xs font-medium text-rose-950 transition hover:bg-rose-100"
              >
                지도 열기
              </a>
            ) : null}
          </section>

          {data.message.trim() ? (
            <section className="border border-amber-900/15 bg-amber-50/40 px-4 py-7 text-center sm:px-6">
              <p className="text-[10px] tracking-[0.35em] text-amber-900/50">인사말</p>
              <p className="mt-4 text-pretty text-sm leading-relaxed text-stone-700">{data.message}</p>
            </section>
          ) : null}

          {data.calendarNote.trim() ? (
            <p className="text-center text-xs leading-relaxed text-stone-500">{data.calendarNote}</p>
          ) : null}

          <WeddingGiftSection data={data} variant="classic" />
        </div>

        <footer className="px-4 pb-10 text-center text-[10px] text-stone-400 sm:px-8">Formora · 클래식 청첩장</footer>
      </div>
    </div>
  )
}
