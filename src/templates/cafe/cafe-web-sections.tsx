import { CafeAmenities } from '@/templates/cafe/cafe-amenities'
import type { CafePageData } from '@/templates/cafe/schema'

export type CafeWebTone = 'warm' | 'garden' | 'midnight' | 'espresso'

type ToneStyle = {
  section: string
  card: string
  label: string
  title: string
  muted: string
  footer: string
  placeholder: string
}

const tones: Record<CafeWebTone, ToneStyle> = {
  warm: {
    section: 'border-amber-200/60 bg-amber-50/40',
    card: 'border-amber-200/70 bg-white',
    label: 'text-amber-800/80',
    title: 'text-stone-900',
    muted: 'text-stone-600',
    footer: 'border-amber-200/60 bg-stone-900 text-stone-100',
    placeholder: 'from-amber-100 to-orange-100',
  },
  garden: {
    section: 'border-emerald-200/80 bg-emerald-50/50',
    card: 'border-emerald-200/80 bg-white',
    label: 'text-emerald-700/80',
    title: 'text-emerald-950',
    muted: 'text-emerald-900/75',
    footer: 'border-emerald-300/80 bg-emerald-900 text-emerald-50',
    placeholder: 'from-emerald-100 to-teal-100',
  },
  midnight: {
    section: 'border-zinc-800 bg-zinc-900/50',
    card: 'border-zinc-800 bg-zinc-950/80',
    label: 'text-amber-500/80',
    title: 'text-white',
    muted: 'text-zinc-400',
    footer: 'border-amber-500/30 bg-black text-zinc-200',
    placeholder: 'from-zinc-800 to-zinc-900',
  },
  espresso: {
    section: 'border-stone-900 bg-stone-50',
    card: 'border-stone-900 bg-white',
    label: 'text-stone-500',
    title: 'text-stone-900',
    muted: 'text-stone-600',
    footer: 'border-stone-900 bg-stone-900 text-stone-100',
    placeholder: 'from-stone-200 to-stone-300',
  },
}

type Props = {
  data: CafePageData
  tone: CafeWebTone
  mapHref?: string
  reserveHref: string
}

/** 웹 전용 — 갤러리·방문 푸터 (메뉴는 본문에 한 번만) */
export function CafeWebSections({ data, tone, mapHref, reserveHref }: Props) {
  const s = tones[tone]
  const gallery = data.galleryImageUrls.map((u) => u.trim()).filter(Boolean)
  const hero = data.heroImageUrl.trim()

  return (
    <>
      <section className="px-4 py-10 sm:px-8 lg:px-12 lg:py-14">
        <p className={`text-xs font-semibold uppercase tracking-widest ${s.label}`}>Gallery</p>
        <h2 className={`mt-2 text-xl font-semibold tracking-tight sm:text-2xl ${s.title}`}>매장 분위기</h2>
        <div className="mt-6 grid min-w-0 grid-cols-2 gap-2 lg:grid-cols-4">
          {(gallery.length > 0 ? gallery : [hero, '', '', '']).slice(0, 4).map((src, i) => (
            <div key={i} className={`aspect-[4/3] min-w-0 overflow-hidden rounded-xl border ${s.card}`}>
              {src ? (
                <img src={src} alt="" className="size-full object-cover" />
              ) : (
                <div className={`flex size-full items-center justify-center bg-gradient-to-br ${s.placeholder}`}>
                  <span className={`text-[10px] ${s.muted}`}>이미지</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <CafeVisitFooter data={data} tone={tone} mapHref={mapHref} reserveHref={reserveHref} />
    </>
  )
}

function CafeVisitFooter({ data, tone, mapHref, reserveHref }: Props) {
  const s = tones[tone]
  return (
    <footer className={`border-t px-4 py-10 sm:px-8 lg:px-12 lg:py-14 ${s.footer}`}>
      <div className="mx-auto min-w-0 max-w-7xl space-y-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <p className="text-sm font-semibold">{data.shopName}</p>
            {data.tagline.trim() ? <p className="mt-1 text-xs opacity-80">{data.tagline}</p> : null}
            <p className="mt-3 text-xs opacity-90">{data.hours.trim() || '영업 시간'}</p>
            <p className="mt-1 text-xs opacity-90">{data.address.trim() || '주소'}</p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2">
            <a
              href={reserveHref}
              className="inline-flex h-10 items-center justify-center rounded-full bg-white/15 px-6 text-sm font-semibold text-white ring-1 ring-white/25"
            >
              {data.reserveLabel}
            </a>
            {mapHref ? (
              <a
                href={mapHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 items-center justify-center rounded-full px-5 text-xs font-semibold underline-offset-2 hover:underline"
              >
                지도 보기
              </a>
            ) : null}
          </div>
        </div>
        <CafeAmenities data={data} tone="footer" />
      </div>
    </footer>
  )
}
