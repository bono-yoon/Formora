import type { CafePageData } from '@/templates/cafe/schema'

export type CafeAmenityTone = 'warm' | 'garden' | 'midnight' | 'espresso' | 'footer'

const chipStyles: Record<CafeAmenityTone, string> = {
  warm: 'border-amber-200/80 bg-white/90 text-stone-800',
  garden: 'border-emerald-200/80 bg-white text-emerald-950',
  midnight: 'border-zinc-700 bg-zinc-900/80 text-zinc-200',
  espresso: 'border-stone-900 bg-white text-stone-900',
  footer: 'border-white/20 bg-white/10 text-white',
}

export function getCafeAmenityEntries(data: CafePageData) {
  return [
    { label: '주차', value: data.amenityParking },
    { label: '반려동물', value: data.amenityPets },
    { label: '와이파이', value: data.amenityWifi },
    { label: '접근성', value: data.amenityAccessibility },
    { label: '결제', value: data.amenityPayment },
  ].filter((x) => x.value.trim())
}

type Props = {
  data: CafePageData
  tone: CafeAmenityTone
  className?: string
}

/** 영업·주소 근처 부가 정보 칩 */
export function CafeAmenities({ data, tone, className = '' }: Props) {
  const entries = getCafeAmenityEntries(data)
  if (entries.length === 0) return null

  const labelClass =
    tone === 'midnight' || tone === 'footer'
      ? 'text-zinc-500'
      : tone === 'garden'
        ? 'text-emerald-600'
        : tone === 'espresso'
          ? 'text-stone-500'
          : 'text-amber-800/70'

  return (
    <div className={`min-w-0 ${className}`}>
      <p className={`text-[10px] font-bold uppercase tracking-widest ${labelClass}`}>매장 안내</p>
      <ul className="mt-3 flex min-w-0 flex-wrap gap-2">
        {entries.map((item) => (
          <li
            key={item.label}
            className={`max-w-full min-w-0 rounded-lg border px-3 py-2 text-xs leading-snug ${chipStyles[tone]}`}
          >
            <span className="font-semibold">{item.label}</span>
            <span className="opacity-80"> · {item.value.trim()}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
