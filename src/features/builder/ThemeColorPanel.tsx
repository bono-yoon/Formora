import { RotateCcw } from 'lucide-react'
import { useMemo } from 'react'

import { useThemeColors } from '@/features/builder/theme-colors-state'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { TemplateCategoryId } from '@/templates/catalog/types'
import { getVariantTheme, resolveThemeColors } from '@/templates/theme/variant-themes'

const PRESET_PALETTES: { name: string; colors: [string, string, string][] }[] = [
  {
    name: '오션',
    colors: [
      ['#0284c7', '#38bdf8', '#0c4a6e'],
      ['#0369a1', '#7dd3fc', '#164e63'],
      ['#0e7490', '#5eead4', '#134e4a'],
    ],
  },
  {
    name: '포레스트',
    colors: [
      ['#059669', '#34d399', '#064e3b'],
      ['#65a30d', '#a3e635', '#365314'],
      ['#166534', '#4ade80', '#14532d'],
    ],
  },
  {
    name: '선셋',
    colors: [
      ['#ea580c', '#fb923c', '#7c2d12'],
      ['#e11d48', '#fb7185', '#881337'],
      ['#c026d3', '#e879f9', '#701a75'],
    ],
  },
  {
    name: '모노',
    colors: [
      ['#18181b', '#71717a', '#fafafa'],
      ['#0f172a', '#64748b', '#f8fafc'],
      ['#1c1917', '#78716c', '#fafaf9'],
    ],
  },
]

type ThemeColorPanelProps = {
  categoryId: TemplateCategoryId
  variantId: string
}

export function ThemeColorPanel({ categoryId, variantId }: ThemeColorPanelProps) {
  const { overrides, setOverride, resetOverrides } = useThemeColors()
  const definition = getVariantTheme(categoryId, variantId)

  const resolved = useMemo(
    () => (definition ? resolveThemeColors(definition, overrides) : null),
    [definition, overrides],
  )

  if (!definition || definition.slots.length === 0) return null

  const coreSlots = definition.slots.slice(0, 5)

  function applyPalette(colors: [string, string, string]) {
    const ids = ['primary', 'secondary', 'accent'] as const
    ids.forEach((id, i) => {
      if (coreSlots.some((s) => s.id === id)) setOverride(id, colors[i])
    })
  }

  return (
    <Card className="border-dashed">
      <CardHeader className="pb-3">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <CardTitle className="text-base">대표 컬러</CardTitle>
            <CardDescription className="mt-1">
              디자인별 메인·보조·강조 등 {coreSlots.length}가지를 hex 또는 팔레트로 조정합니다. 세부 토큰은
              지원하지 않습니다.
            </CardDescription>
          </div>
          <Button type="button" variant="ghost" size="sm" className="gap-1.5" onClick={resetOverrides}>
            <RotateCcw className="size-3.5" aria-hidden />
            기본값
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {PRESET_PALETTES.map((palette) => (
            <Button
              key={palette.name}
              type="button"
              variant="outline"
              size="sm"
              className="gap-1.5"
              onClick={() => applyPalette(palette.colors[0])}
            >
              <span className="flex gap-0.5">
                {palette.colors[0].map((c) => (
                  <span key={c} className="size-3 rounded-full border border-black/10" style={{ backgroundColor: c }} />
                ))}
              </span>
              {palette.name}
            </Button>
          ))}
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {coreSlots.map((slot) => (
            <div key={slot.id} className="space-y-1.5">
              <Label htmlFor={`theme-${slot.id}`} className="text-xs">
                {slot.label}
              </Label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  id={`theme-${slot.id}`}
                  value={resolved?.[slot.id] ?? slot.defaultHex}
                  onChange={(e) => setOverride(slot.id, e.target.value)}
                  className="size-9 shrink-0 cursor-pointer rounded-md border border-border bg-background p-0.5"
                  aria-label={`${slot.label} 색상`}
                />
                <Input
                  value={resolved?.[slot.id] ?? slot.defaultHex}
                  onChange={(e) => {
                    const v = e.target.value.trim()
                    if (/^#[0-9A-Fa-f]{6}$/.test(v)) setOverride(slot.id, v)
                  }}
                  className="h-9 font-mono text-xs"
                  spellCheck={false}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
