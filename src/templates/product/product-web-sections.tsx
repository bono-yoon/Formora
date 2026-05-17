import type { ProductPageData } from '@/templates/product/schema'

export type ProductWebTone = 'light' | 'dark' | 'pricing' | 'story'

type ToneStyle = {
  section: string
  card: string
  label: string
  title: string
  muted: string
  footer: string
  footerMuted: string
  placeholder: string
}

const tones: Record<ProductWebTone, ToneStyle> = {
  light: {
    section: 'border-zinc-200 bg-zinc-50/60',
    card: 'border-zinc-200 bg-white',
    label: 'text-zinc-400',
    title: 'text-zinc-900',
    muted: 'text-zinc-600',
    footer: 'border-zinc-200 bg-zinc-900 text-zinc-100',
    footerMuted: 'text-zinc-400',
    placeholder: 'from-zinc-100 to-zinc-200',
  },
  dark: {
    section: 'border-zinc-800 bg-zinc-900/40',
    card: 'border-zinc-800 bg-zinc-950/80',
    label: 'text-zinc-500',
    title: 'text-white',
    muted: 'text-zinc-400',
    footer: 'border-zinc-800 bg-black text-zinc-100',
    footerMuted: 'text-zinc-500',
    placeholder: 'from-zinc-800 to-zinc-900',
  },
  pricing: {
    section: 'border-zinc-200 bg-zinc-50',
    card: 'border-zinc-200 bg-white',
    label: 'text-zinc-400',
    title: 'text-zinc-900',
    muted: 'text-zinc-600',
    footer: 'border-zinc-200 bg-zinc-900 text-zinc-100',
    footerMuted: 'text-zinc-400',
    placeholder: 'from-zinc-100 to-zinc-200',
  },
  story: {
    section: 'border-zinc-200 bg-zinc-50',
    card: 'border-zinc-200 bg-white',
    label: 'text-zinc-400',
    title: 'text-zinc-900',
    muted: 'text-zinc-600',
    footer: 'border-zinc-200 bg-violet-950 text-violet-50',
    footerMuted: 'text-violet-300/80',
    placeholder: 'from-violet-100 to-fuchsia-100',
  },
}

type DetailProps = {
  data: ProductPageData
  tone: ProductWebTone
}

/** 웹 전용 — 상품 상세(이미지·설명) */
export function ProductWebDetailSection({ data, tone }: DetailProps) {
  const s = tones[tone]
  const images = data.galleryImageUrls.map((u) => u.trim()).filter(Boolean)
  const description = data.description.trim()
  if (images.length === 0 && !description) return null

  const paragraphs = description ? description.split(/\n\n+/).filter(Boolean) : []

  return (
    <section className={`border-t px-4 py-12 sm:px-8 lg:px-12 lg:py-16 ${s.section}`}>
      <div className="mx-auto min-w-0 max-w-7xl">
        <p className={`text-xs font-semibold uppercase tracking-widest ${s.label}`}>Product detail</p>
        <h2 className={`mt-2 text-xl font-semibold tracking-tight sm:text-2xl ${s.title}`}>제품 상세 정보</h2>

        <div className="mt-8 grid min-w-0 gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="min-w-0 space-y-3">
            {images.length > 0 ? (
              <>
                <div className={`overflow-hidden rounded-2xl border ${s.card}`}>
                  <img src={images[0]} alt="" className="aspect-[4/3] w-full object-cover" />
                </div>
                {images.length > 1 ? (
                  <div className="grid grid-cols-3 gap-2">
                    {images.slice(1, 4).map((src, i) => (
                      <div key={`${i}-${src.slice(-16)}`} className={`overflow-hidden rounded-xl border ${s.card}`}>
                        <img src={src} alt="" className="aspect-square w-full object-cover" />
                      </div>
                    ))}
                  </div>
                ) : null}
              </>
            ) : (
              <div className={`flex aspect-[4/3] items-center justify-center rounded-2xl border bg-gradient-to-br ${s.placeholder} ${s.card}`}>
                <p className={`text-xs ${s.muted}`}>갤러리 이미지 URL을 추가하세요</p>
              </div>
            )}
          </div>

          <div className="min-w-0">
            {paragraphs.length > 0 ? (
              <div className="space-y-4">
                {paragraphs.map((p, i) => (
                  <p key={i} className={`text-pretty text-sm leading-relaxed sm:text-base ${s.muted}`}>
                    {p}
                  </p>
                ))}
              </div>
            ) : (
              <p className={`text-sm ${s.muted}`}>제품 설명을 입력하면 이 영역에 표시됩니다.</p>
            )}
            {data.oneLiner.trim() ? (
              <p className={`mt-6 border-t pt-6 text-sm font-medium ${s.title}`}>{data.oneLiner}</p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

type FooterProps = {
  data: ProductPageData
  tone: ProductWebTone
}

/** 웹 전용 — 브랜드·회사 정보 푸터 */
export function ProductBrandFooter({ data, tone }: FooterProps) {
  const s = tones[tone]
  const brand = data.brandName.trim()
  const hasInfo =
    brand ||
    data.brandDescription.trim() ||
    data.brandEmail.trim() ||
    data.brandPhone.trim() ||
    data.brandAddress.trim()

  if (!hasInfo) return null

  const mailHref = data.brandEmail.trim() ? `mailto:${data.brandEmail.trim()}` : undefined
  const telHref = data.brandPhone.trim() ? `tel:${data.brandPhone.trim().replace(/\s/g, '')}` : undefined

  return (
    <footer className={`mt-auto border-t px-4 py-10 sm:px-8 lg:px-12 lg:py-14 ${s.footer}`}>
      <div className="mx-auto grid min-w-0 max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-[1fr_auto] lg:items-start">
        <div className="flex min-w-0 gap-4">
          {data.brandLogoUrl.trim() ? (
            <img src={data.brandLogoUrl.trim()} alt="" className="size-12 shrink-0 rounded-lg object-cover" />
          ) : (
            <div className="size-12 shrink-0 rounded-lg bg-white/15" aria-hidden />
          )}
          <div className="min-w-0">
            <p className="text-sm font-semibold">{brand || data.productName}</p>
            {data.brandTagline.trim() ? <p className={`mt-1 text-xs ${s.footerMuted}`}>{data.brandTagline}</p> : null}
            {data.brandDescription.trim() ? (
              <p className={`mt-3 max-w-md text-pretty text-xs leading-relaxed sm:text-sm ${s.footerMuted}`}>
                {data.brandDescription}
              </p>
            ) : null}
          </div>
        </div>
        <dl className={`space-y-2 text-xs sm:text-sm ${s.footerMuted}`}>
          {data.brandAddress.trim() ? (
            <div>
              <dt className="font-semibold text-white/70">주소</dt>
              <dd className="mt-0.5">{data.brandAddress}</dd>
            </div>
          ) : null}
          {mailHref ? (
            <div>
              <dt className="font-semibold text-white/70">이메일</dt>
              <dd className="mt-0.5">
                <a href={mailHref} className="underline-offset-2 hover:underline">
                  {data.brandEmail.trim()}
                </a>
              </dd>
            </div>
          ) : null}
          {telHref ? (
            <div>
              <dt className="font-semibold text-white/70">전화</dt>
              <dd className="mt-0.5">
                <a href={telHref} className="underline-offset-2 hover:underline">
                  {data.brandPhone.trim()}
                </a>
              </dd>
            </div>
          ) : null}
        </dl>
      </div>
    </footer>
  )
}
