import type { ProductDesignVariant } from '@/templates/product/product-variant'
import type { ProductPageData } from '@/templates/product/schema'
import type { PageLayoutProfile } from '@/templates/page-layout'
import { ProductBrandFooter, ProductWebDetailSection } from '@/templates/product/product-web-sections'
import { webViewportFill } from '@/templates/web-viewport-fill'

export type { ProductDesignVariant } from '@/templates/product/product-variant'

type ProductTemplatePreviewProps = {
  data: ProductPageData
  variant?: ProductDesignVariant
  layout?: PageLayoutProfile
}

const root = 'min-w-0 max-w-full break-words antialiased'

/** 스탠다드·갤러리 퍼스트·프라이싱 포커스·스토리 밴드 × 모바일·웹 레이아웃. */
export function ProductTemplatePreview({
  data,
  variant = 'standard',
  layout = 'mobile',
}: ProductTemplatePreviewProps) {
  const images = data.galleryImageUrls.map((u) => u.trim()).filter(Boolean)
  const buyHref = data.buyUrl.trim() || '#'
  const galleryFirst = variant === 'gallery-first'
  const isWeb = layout === 'web'

  if (variant === 'pricing-focus') {
    return (
      <div className={`${root} flex flex-col bg-zinc-50 text-zinc-900 ${webViewportFill(isWeb)}`}>
        <div className={`border-b border-zinc-200 bg-white px-4 py-3 text-center sm:px-8 ${isWeb ? 'py-5 lg:px-12' : ''}`}>
          <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-zinc-400">Offer</p>
        </div>
        <div className={`mx-auto px-4 py-10 text-center sm:px-8 sm:py-12 ${isWeb ? 'max-w-5xl py-16 lg:px-14 lg:py-20' : 'max-w-3xl'}`}>
          <h1 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">{data.productName}</h1>
          {data.oneLiner.trim() ? (
            <p className="mx-auto mt-3 max-w-xl text-pretty text-sm text-zinc-600 sm:text-base">{data.oneLiner}</p>
          ) : null}
          <div className="mx-auto mt-8 max-w-md rounded-2xl border-2 border-zinc-900 bg-white px-6 py-8 shadow-xl sm:px-8 sm:py-10">
            {data.priceLabel.trim() ? (
              <p className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">{data.priceLabel}</p>
            ) : (
              <p className="text-lg text-zinc-500">가격 정보를 입력하세요</p>
            )}
            <a
              href={buyHref}
              className={`mt-6 flex h-12 w-full min-w-0 items-center justify-center rounded-xl text-sm font-semibold text-white sm:mx-auto sm:max-w-xs ${
                isWeb ? 'bg-zinc-900 hover:bg-zinc-800' : 'bg-zinc-900'
              }`}
            >
              구매하기
            </a>
          </div>
        </div>

        <section className={`border-t border-zinc-200 bg-white px-4 py-10 sm:px-8 ${isWeb ? 'py-14 lg:px-12 lg:py-20' : ''}`}>
          <div className={`mx-auto min-w-0 ${isWeb ? 'max-w-6xl' : 'max-w-4xl'}`}>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-400">스펙</h2>
            <div className="mt-4 overflow-hidden rounded-xl border border-zinc-200">
              <table className="w-full min-w-0 text-left text-sm">
                <tbody>
                  {data.specs.map((row, i) => (
                    <tr key={`${i}-${row.label}`} className={i % 2 === 0 ? 'bg-zinc-50' : 'bg-white'}>
                      <th className="w-36 min-w-0 border-b border-zinc-100 px-4 py-3 font-medium text-zinc-500 sm:w-44 sm:px-5">
                        {row.label}
                      </th>
                      <td className="border-b border-zinc-100 px-4 py-3 text-zinc-900 sm:px-5">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {data.faq.length > 0 ? (
          <section className={`border-t border-zinc-100 bg-zinc-50/80 px-4 py-10 sm:px-8 ${isWeb ? 'py-14 lg:px-12' : ''}`}>
            <div className={`mx-auto min-w-0 ${isWeb ? 'max-w-4xl' : 'max-w-2xl'}`}>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-400">FAQ</h2>
              <ul className="mt-4 space-y-3">
                {data.faq.map((item, i) => (
                  <li key={`${i}-${item.q.slice(0, 24)}`} className="border-b border-zinc-200 pb-3">
                    <p className="text-sm font-medium text-zinc-900">{item.q}</p>
                    {item.a.trim() ? <p className="mt-1 text-sm text-zinc-600">{item.a}</p> : null}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        {isWeb ? <ProductWebDetailSection data={data} tone="pricing" /> : null}

        {isWeb ? (
          <ProductBrandFooter data={data} tone="pricing" />
        ) : (
          <footer className="border-t border-zinc-200 px-4 py-6 text-center text-xs text-zinc-400 sm:px-8">
            Formora · 프라이싱 포커스
          </footer>
        )}
      </div>
    )
  }

  if (variant === 'story-band') {
    return (
      <div className={`${root} flex flex-col bg-white text-zinc-900 ${webViewportFill(isWeb)}`}>
        <section className={`bg-violet-600 px-4 py-14 text-center text-white sm:py-16 ${isWeb ? 'py-20 lg:px-12 lg:py-24' : ''}`}>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-violet-200">Launch</p>
          <h1 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl">{data.productName}</h1>
        </section>

        <section className={`mx-auto px-4 py-12 text-center sm:px-8 sm:py-14 ${isWeb ? 'max-w-5xl py-16 lg:px-14 lg:py-20' : 'max-w-3xl'}`}>
          {data.oneLiner.trim() ? (
            <p className="text-pretty text-lg leading-relaxed text-zinc-700 sm:text-xl">{data.oneLiner}</p>
          ) : null}
          {data.priceLabel.trim() ? <p className="mt-6 text-2xl font-semibold text-zinc-900">{data.priceLabel}</p> : null}
          <div className="mt-8 flex justify-center">
            <a
              href={buyHref}
              className="inline-flex h-11 items-center justify-center rounded-full bg-violet-600 px-10 text-sm font-semibold text-white hover:bg-violet-700"
            >
              구매하기
            </a>
          </div>
        </section>

        {images.length > 0 ? (
          <section className={`grid min-w-0 gap-1 bg-zinc-900 p-1 ${isWeb ? 'grid-cols-4' : 'grid-cols-2'}`}>
            {images.map((src, i) => (
              <div key={`${i}-${src.slice(-20)}`} className="aspect-square min-w-0 bg-zinc-800">
                <img src={src} alt="" className="size-full object-cover" />
              </div>
            ))}
          </section>
        ) : (
          <div className="h-32 bg-gradient-to-r from-violet-500 to-fuchsia-500 sm:h-40" aria-hidden />
        )}

        <section className={`bg-zinc-900 px-4 py-12 text-zinc-100 sm:px-8 sm:py-14 ${isWeb ? 'py-16 lg:px-12 lg:py-20' : ''}`}>
          <div className={`mx-auto min-w-0 ${isWeb ? 'max-w-6xl' : 'max-w-4xl'}`}>
            <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-400">스펙</h2>
            <div className="mt-6 flex min-w-0 flex-wrap gap-2">
              {data.specs.map((row, i) => (
                <span
                  key={`${i}-${row.label}`}
                  className="inline-flex max-w-full min-w-0 items-center gap-2 rounded-full border border-zinc-700 bg-zinc-800/80 px-4 py-2 text-xs sm:text-sm"
                >
                  <span className="shrink-0 text-zinc-400">{row.label}</span>
                  <span className="min-w-0 truncate text-zinc-100">{row.value}</span>
                </span>
              ))}
            </div>
          </div>
        </section>

        {data.faq.length > 0 ? (
          <section className={`border-t border-zinc-200 bg-zinc-50 px-4 py-10 sm:px-8 ${isWeb ? 'py-14 lg:px-12' : ''}`}>
            <div className={`mx-auto min-w-0 space-y-4 ${isWeb ? 'max-w-5xl' : 'max-w-3xl'}`}>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-400">FAQ</h2>
              <ul className="space-y-3">
                {data.faq.map((item, i) => (
                  <li key={`${i}-${item.q.slice(0, 24)}`} className="rounded-lg border border-zinc-200 bg-white p-4">
                    <p className="text-sm font-medium text-zinc-900">{item.q}</p>
                    {item.a.trim() ? <p className="mt-2 text-sm text-zinc-600">{item.a}</p> : null}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        {isWeb ? <ProductWebDetailSection data={data} tone="story" /> : null}

        {isWeb ? (
          <ProductBrandFooter data={data} tone="story" />
        ) : (
          <footer className="mt-auto border-t border-zinc-200 px-4 py-6 text-center text-xs text-zinc-400 sm:px-8">
            Formora · 스토리 밴드
          </footer>
        )}
      </div>
    )
  }

  const galleryCols = galleryFirst ? (isWeb ? 'grid-cols-3 sm:grid-cols-4' : 'grid-cols-2') : 'grid-cols-2'
  const tileAspect = galleryFirst ? (isWeb ? 'aspect-square' : 'aspect-[4/5] sm:aspect-square') : 'aspect-square'

  const galleryBlock =
    images.length > 0 ? (
      <section className={`grid min-w-0 gap-1 bg-zinc-900 p-1 ${galleryCols}`}>
        {images.map((src, i) => (
          <div key={`${i}-${src.slice(-20)}`} className={`min-w-0 bg-zinc-800 ${tileAspect}`}>
            <img src={src} alt="" className="size-full object-cover opacity-95" />
          </div>
        ))}
      </section>
    ) : (
      <div className={galleryFirst ? (isWeb ? 'min-h-64 bg-gradient-to-br from-zinc-800 to-black' : 'h-56 bg-gradient-to-br from-zinc-800 to-black') : 'h-40 bg-gradient-to-br from-zinc-100 to-zinc-200'} />
    )

  if (galleryFirst) {
    return (
      <div className={`${root} flex flex-col bg-zinc-950 text-zinc-100 ${webViewportFill(isWeb)}`}>
        {isWeb ? (
          <div className="mx-auto grid min-w-0 max-w-7xl gap-6 px-4 py-12 sm:grid-cols-12 sm:gap-10 sm:px-8 lg:px-12 lg:py-16">
            <div className="min-w-0 sm:col-span-7">
              <div className="min-w-0 overflow-hidden rounded-xl border border-zinc-800">{galleryBlock}</div>
            </div>
            <div className="flex min-w-0 flex-col justify-center rounded-2xl border border-white/10 bg-zinc-900/90 p-6 sm:col-span-5 sm:p-10 lg:p-12">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-400/90">Product drop</p>
              <h1 className="mt-2 text-balance text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">{data.productName}</h1>
              {data.oneLiner.trim() ? (
                <p className="mt-3 text-pretty text-sm leading-relaxed text-zinc-300">{data.oneLiner}</p>
              ) : null}
              {data.priceLabel.trim() ? <p className="mt-4 text-lg font-semibold text-white">{data.priceLabel}</p> : null}
              <div className="mt-6">
                <a
                  href={buyHref}
                  className="inline-flex h-12 w-full min-w-0 items-center justify-center rounded-lg bg-emerald-500 px-6 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-400"
                >
                  구매하기
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative min-w-0">
            {galleryBlock}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
            <div className="relative -mt-14 px-4 pb-6 sm:-mt-16 sm:px-5">
              <div className="mx-auto max-w-lg min-w-0 rounded-2xl border border-white/10 bg-zinc-900/90 p-5 shadow-2xl backdrop-blur-md sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-400/90">Product drop</p>
                <h1 className="mt-2 text-balance text-2xl font-semibold tracking-tight">{data.productName}</h1>
                {data.oneLiner.trim() ? (
                  <p className="mt-3 text-pretty text-sm leading-relaxed text-zinc-300">{data.oneLiner}</p>
                ) : null}
                {data.priceLabel.trim() ? <p className="mt-3 text-lg font-semibold text-white">{data.priceLabel}</p> : null}
                <div className="mt-5">
                  <a
                    href={buyHref}
                    className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-emerald-500 px-6 text-sm font-semibold text-zinc-950"
                  >
                    구매하기
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        <section className={`mx-auto px-4 py-10 sm:px-8 lg:px-12 ${isWeb ? 'max-w-7xl py-14 lg:py-20' : 'max-w-6xl lg:px-10 lg:py-14'}`}>
          <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">스펙</h2>
          <div className={`mt-6 grid min-w-0 gap-3 ${isWeb ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2'}`}>
            {data.specs.map((row, i) => (
              <div key={`${i}-${row.label}`} className="min-w-0 rounded-xl border border-zinc-800 bg-zinc-900/80 px-4 py-4">
                <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">{row.label}</p>
                <p className="mt-1 text-sm text-zinc-100">{row.value}</p>
              </div>
            ))}
          </div>
        </section>

        {data.faq.length > 0 ? (
          <section className={`border-t border-zinc-800 bg-zinc-900/40 px-4 py-10 sm:px-8 lg:px-10 ${isWeb ? 'py-14 lg:px-12 lg:py-20' : ''}`}>
            <div className={`mx-auto min-w-0 ${isWeb ? 'max-w-7xl' : 'max-w-6xl'}`}>
              <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">FAQ</h2>
              <ul className={`mt-6 grid min-w-0 gap-4 ${isWeb ? 'lg:grid-cols-2' : ''}`}>
                {data.faq.map((item, i) => (
                  <li key={`${i}-${item.q.slice(0, 24)}`} className="min-w-0 rounded-xl border border-zinc-800 bg-zinc-950/80 p-5">
                    <p className="text-sm font-medium text-white">{item.q}</p>
                    {item.a.trim() ? <p className="mt-2 text-sm leading-relaxed text-zinc-400">{item.a}</p> : null}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        {isWeb ? <ProductWebDetailSection data={data} tone="dark" /> : null}

        {isWeb ? (
          <ProductBrandFooter data={data} tone="dark" />
        ) : (
          <footer className="mt-auto border-t border-zinc-800 px-4 py-6 text-center text-xs text-zinc-600 sm:px-8">
            Formora · 갤러리 퍼스트 제품 템플릿
          </footer>
        )}
      </div>
    )
  }

  const headlineBlock = (
    <section className={`border-b border-zinc-100 bg-white px-4 py-10 sm:px-8 sm:py-12 ${isWeb ? 'py-14 lg:px-12 lg:py-16' : ''}`}>
      {isWeb ? (
        <div className="mx-auto grid max-w-6xl min-w-0 gap-8 sm:grid-cols-2 sm:items-center lg:max-w-7xl lg:gap-12">
          <div className="min-w-0 text-left">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">Product</p>
            <h1 className="mt-2 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">{data.productName}</h1>
            {data.oneLiner.trim() ? (
              <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-zinc-600">{data.oneLiner}</p>
            ) : null}
            {data.priceLabel.trim() ? <p className="mt-4 text-xl font-medium text-zinc-900">{data.priceLabel}</p> : null}
            <div className="mt-6">
              <a
                href={buyHref}
                className="inline-flex h-11 items-center justify-center rounded-full bg-zinc-900 px-8 text-sm font-medium text-white transition hover:bg-zinc-800"
              >
                구매하기
              </a>
            </div>
          </div>
          <div className="min-w-0 overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50">
            {images[0] ? (
              <img src={images[0]} alt="" className="aspect-[4/3] w-full object-cover sm:aspect-auto sm:min-h-[240px]" />
            ) : (
              <div className="flex aspect-[4/3] min-h-[200px] items-center justify-center bg-gradient-to-br from-zinc-100 to-zinc-200 sm:min-h-[240px]" />
            )}
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-lg text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">Product</p>
          <h1 className="mt-2 text-balance text-2xl font-semibold tracking-tight sm:text-3xl">{data.productName}</h1>
          {data.oneLiner.trim() ? (
            <p className="mt-3 text-pretty text-sm leading-relaxed text-zinc-600 sm:text-base">{data.oneLiner}</p>
          ) : null}
          {data.priceLabel.trim() ? <p className="mt-4 text-lg font-medium text-zinc-900">{data.priceLabel}</p> : null}
          <div className="mt-6">
            <a
              href={buyHref}
              className="inline-flex h-11 items-center justify-center rounded-full bg-zinc-900 px-8 text-sm font-medium text-white transition hover:bg-zinc-800"
            >
              구매하기
            </a>
          </div>
        </div>
      )}
    </section>
  )

  return (
    <div className={`${root} flex flex-col bg-white text-zinc-900 ${webViewportFill(isWeb)}`}>
      {headlineBlock}
      {galleryBlock}

      <section className={`px-4 py-10 sm:px-8 sm:py-12 ${isWeb ? 'py-14 lg:px-12 lg:py-20' : ''}`}>
        <div className={isWeb ? 'mx-auto max-w-7xl min-w-0' : 'mx-auto max-w-6xl min-w-0'}>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-400">스펙</h2>
          {isWeb ? (
            <div className="mt-4 grid min-w-0 gap-3 sm:grid-cols-2">
              {data.specs.map((row, i) => (
                <div key={`${i}-${row.label}`} className="min-w-0 rounded-xl border border-zinc-100 bg-zinc-50/80 px-4 py-3">
                  <p className="text-xs font-medium text-zinc-500">{row.label}</p>
                  <p className="mt-1 text-sm text-zinc-800">{row.value}</p>
                </div>
              ))}
            </div>
          ) : (
            <dl className="mt-4 divide-y divide-zinc-100 rounded-xl border border-zinc-100 bg-zinc-50/50">
              {data.specs.map((row, i) => (
                <div key={`${i}-${row.label}`} className="flex gap-4 px-4 py-3 sm:px-5">
                  <dt className="w-24 shrink-0 text-xs font-medium text-zinc-500 sm:text-sm">{row.label}</dt>
                  <dd className="min-w-0 flex-1 text-sm text-zinc-800">{row.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </section>

      {data.faq.length > 0 ? (
        <section className={`border-t border-zinc-100 bg-zinc-50/80 px-4 py-10 sm:px-8 sm:py-12 ${isWeb ? 'py-14 lg:px-12' : ''}`}>
          <div className={isWeb ? 'mx-auto max-w-7xl min-w-0 space-y-4' : 'mx-auto max-w-6xl min-w-0 space-y-4'}>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-400">FAQ</h2>
            <ul className={`grid min-w-0 gap-3 ${isWeb ? 'sm:grid-cols-2' : ''}`}>
              {data.faq.map((item, i) => (
                <li
                  key={`${i}-${item.q.slice(0, 24)}`}
                  className="min-w-0 rounded-xl border border-zinc-100 bg-white p-4 shadow-sm"
                >
                  <p className="text-sm font-medium text-zinc-900">{item.q}</p>
                  {item.a.trim() ? <p className="mt-2 text-sm leading-relaxed text-zinc-600">{item.a}</p> : null}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {isWeb ? <ProductWebDetailSection data={data} tone="light" /> : null}

      {isWeb ? (
        <ProductBrandFooter data={data} tone="light" />
      ) : (
        <footer className="mt-auto border-t border-zinc-100 px-4 py-6 text-center text-xs text-zinc-400 sm:px-8">
          Formora · 스탠다드 제품 템플릿 미리보기
        </footer>
      )}
    </div>
  )
}
