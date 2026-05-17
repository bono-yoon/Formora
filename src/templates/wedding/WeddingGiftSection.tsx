import type { WeddingPageData } from '@/templates/wedding/schema'
import type { WeddingDesignVariant } from '@/templates/wedding/wedding-variant'

type WeddingGiftSectionProps = {
  data: WeddingPageData
  variant: WeddingDesignVariant
}

function paletteFromVariant(v: WeddingDesignVariant): 'classic' | 'cover' | 'pastel' | 'mono' {
  if (v === 'cover-focus') return 'cover'
  if (v === 'pastel-garden') return 'pastel'
  if (v === 'mono-minimal') return 'mono'
  return 'classic'
}

/** 축의금·사양 멘트 — 모든 청첩장 변형에서 동일 데이터로 스타일만 구분 */
export function WeddingGiftSection({ data, variant }: WeddingGiftSectionProps) {
  const p = paletteFromVariant(variant)

  if (data.giftDisplay === 'none') {
    return null
  }

  if (data.giftDisplay === 'decline_only') {
    const text = data.giftDeclineMessage.trim()
    if (!text) return null

    const wrap =
      p === 'classic'
        ? 'rounded-sm border border-amber-900/20 bg-amber-50/50 px-4 py-6 text-center sm:px-6'
        : p === 'cover'
          ? 'border-2 border-neutral-900 bg-neutral-50 px-5 py-6 text-center sm:px-8'
          : p === 'pastel'
            ? 'rounded-3xl border border-violet-200/80 bg-white/70 p-6 text-center shadow-sm backdrop-blur-sm'
            : 'border border-neutral-300 bg-neutral-50 px-4 py-6 text-center'

    const honoree =
      p === 'classic'
        ? 'text-center text-xs text-stone-600'
        : p === 'cover'
          ? 'text-center text-xs text-neutral-600'
          : p === 'pastel'
            ? 'text-center text-xs text-violet-800/80'
            : 'text-center text-xs text-neutral-500'

    const body =
      p === 'classic'
        ? 'mt-3 text-pretty text-sm leading-relaxed text-stone-700'
        : p === 'cover'
          ? 'mt-3 text-pretty text-sm leading-relaxed text-neutral-700'
          : p === 'pastel'
            ? 'mt-3 text-pretty text-sm leading-relaxed text-violet-900/85'
            : 'mt-3 text-pretty text-sm leading-relaxed text-neutral-700'

    return (
      <section className={wrap}>
        {data.giftHonoreeLine.trim() ? <p className={`${honoree} font-medium`}>{data.giftHonoreeLine.trim()}</p> : null}
        <p className={`${p === 'classic' ? 'text-[10px] tracking-[0.35em] text-amber-900/50' : p === 'cover' ? 'text-[10px] font-bold uppercase tracking-widest text-neutral-400' : p === 'pastel' ? 'text-[10px] tracking-[0.35em] text-fuchsia-700/70' : 'text-[10px] font-semibold uppercase tracking-widest text-neutral-400'} ${data.giftHonoreeLine.trim() ? 'mt-4' : ''}`}>
          안내
        </p>
        <p className={body}>{text}</p>
      </section>
    )
  }

  /* accounts */
  const heading = data.giftHeading.trim() || '마음 전하실 곳'
  const sub = data.giftSubNote.trim()

  const shell =
    p === 'classic'
      ? 'rounded-sm border border-amber-900/25 bg-white/85 px-4 py-6 shadow-sm backdrop-blur-sm sm:px-6'
      : p === 'cover'
        ? 'border-2 border-neutral-900 bg-neutral-50 px-5 py-6 sm:px-8'
        : p === 'pastel'
          ? 'rounded-3xl border border-fuchsia-200/70 bg-white/75 p-6 shadow-md backdrop-blur-sm'
          : 'border border-neutral-900 bg-white px-4 py-6'

  const titleClass =
    p === 'classic'
      ? 'text-center text-[10px] font-semibold tracking-[0.35em] text-amber-900/55'
      : p === 'cover'
        ? 'text-center text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-500'
        : p === 'pastel'
          ? 'text-center text-[10px] font-semibold tracking-[0.35em] text-violet-700/75'
          : 'text-center text-[10px] font-semibold uppercase tracking-[0.35em] text-neutral-500'

  const honoreeClass =
    p === 'classic'
      ? 'text-center text-sm italic text-stone-600'
      : p === 'cover'
        ? 'text-center text-sm text-neutral-700'
        : p === 'pastel'
          ? 'text-center text-sm text-violet-900/85'
          : 'text-center text-sm text-neutral-700'

  const entryBox =
    p === 'classic'
      ? 'rounded-sm border border-amber-900/15 bg-amber-50/30 px-3 py-4 text-left'
      : p === 'cover'
        ? 'border border-neutral-200 bg-white px-4 py-4'
        : p === 'pastel'
          ? 'rounded-2xl border border-violet-100 bg-violet-50/40 px-4 py-4 text-left'
          : 'border border-neutral-200 bg-neutral-50 px-3 py-4'

  const labelMuted =
    p === 'classic' ? 'text-[10px] font-semibold uppercase tracking-wider text-stone-500' : 'text-[10px] font-semibold uppercase tracking-wider text-neutral-500'

  const entries = data.giftEntries.filter((e) => e.bankName.trim() || e.accountNumber.trim() || e.accountHolder.trim())

  return (
    <section className={shell}>
      <p className={titleClass}>{heading}</p>
      {data.giftHonoreeLine.trim() ? <p className={`mt-3 ${honoreeClass}`}>{data.giftHonoreeLine.trim()}</p> : null}
      {sub ? (
        <p
          className={
            p === 'pastel'
              ? 'mt-3 text-center text-xs leading-relaxed text-violet-800/75'
              : 'mt-3 text-xs leading-relaxed text-neutral-600'
          }
        >
          {sub}
        </p>
      ) : null}

      {entries.length === 0 ? (
        <p className="mt-4 text-center text-xs text-neutral-500">계좌 정보를 입력하면 이곳에 표시됩니다.</p>
      ) : (
        <ul className="mt-5 space-y-3">
          {entries.map((e, i) => (
            <li key={i} className={entryBox}>
              {e.sideLabel.trim() ? <p className={labelMuted}>{e.sideLabel.trim()}</p> : null}
              <p className={`mt-1 text-sm font-semibold ${p === 'pastel' ? 'text-violet-950' : 'text-neutral-900'}`}>
                {e.bankName.trim() || '은행명'}{e.accountHolder.trim() ? ` · ${e.accountHolder.trim()}` : null}
              </p>
              {e.accountNumber.trim() ? (
                <p className="mt-2 font-mono text-sm tracking-wide text-neutral-800">{e.accountNumber.trim()}</p>
              ) : null}
              {e.transferUrl.trim() ? (
                <a
                  href={e.transferUrl.trim()}
                  target="_blank"
                  rel="noreferrer"
                  className={
                    p === 'classic'
                      ? 'mt-3 inline-flex h-9 w-full min-w-0 items-center justify-center rounded-full bg-[#FEE500] text-xs font-bold text-[#3C1E1E] hover:bg-[#fdd835]'
                      : p === 'cover'
                        ? 'mt-3 inline-flex h-9 w-full min-w-0 items-center justify-center bg-[#FEE500] text-xs font-bold text-[#3C1E1E] hover:bg-[#fdd835]'
                        : p === 'pastel'
                          ? 'mt-3 inline-flex h-9 w-full min-w-0 items-center justify-center rounded-full bg-[#FEE500] text-xs font-bold text-[#3C1E1E] hover:bg-[#fdd835]'
                          : 'mt-3 inline-flex h-9 w-full min-w-0 items-center justify-center border border-neutral-900 bg-[#FEE500] text-xs font-bold text-[#3C1E1E] hover:bg-[#fdd835]'
                  }
                >
                  카카오페이 송금
                </a>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
