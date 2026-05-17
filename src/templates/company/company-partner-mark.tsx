import type { CompanyPartner } from '@/templates/company/schema'

type PartnerMarkProps = {
  item: CompanyPartner
  nameClassName: string
  imgClassName: string
}

/** 로고 URL이 있으면 이미지, 없으면 이름 텍스트 */
export function PartnerMark({ item, nameClassName, imgClassName }: PartnerMarkProps) {
  const logo = item.logoUrl.trim()
  if (logo) {
    return <img src={logo} alt={item.name} className={imgClassName} loading="lazy" decoding="async" />
  }
  return <span className={nameClassName}>{item.name}</span>
}

export function partnerHasLogo(item: CompanyPartner) {
  return Boolean(item.logoUrl.trim())
}

/** 히어로·상단 로고 스트립 — 로고 URL이 있는 협력사만 */
export function CompanyPartnerLogoStrip({
  partners,
  className = '',
}: {
  partners: CompanyPartner[]
  className?: string
}) {
  const items = partners.filter((p) => p.name.trim() && partnerHasLogo(p))
  if (items.length === 0) return null

  return (
    <div className={className}>
      <p className="text-center text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-400">Trusted by</p>
      <ul className="mt-4 flex min-w-0 flex-wrap items-center justify-center gap-x-8 gap-y-6 sm:gap-x-10">
        {items.map((item, i) => (
          <li key={`${i}-${item.name}`}>
            <PartnerMark
              item={item}
              imgClassName="max-h-9 max-w-[8rem] object-contain opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0 sm:max-h-10 sm:max-w-[9rem]"
              nameClassName="text-xs font-semibold text-slate-600"
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
