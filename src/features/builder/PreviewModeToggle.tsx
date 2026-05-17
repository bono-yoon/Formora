import { Monitor, Smartphone } from 'lucide-react'

import { usePreviewTarget } from '@/features/builder/use-preview-target'
import { Button } from '@/components/ui/button'
import type { PreviewTargetMode } from '@/templates/catalog/types'

function TargetModeButton({
  mode,
  label,
  active,
  onSelect,
}: {
  mode: PreviewTargetMode
  label: string
  active: boolean
  onSelect: (mode: PreviewTargetMode) => void
}) {
  return (
    <Button
      type="button"
      variant={active ? 'secondary' : 'ghost'}
      size="sm"
      className="h-8 gap-1.5 px-2.5"
      onClick={() => onSelect(mode)}
    >
      {mode === 'web' ? <Monitor className="size-3.5" aria-hidden /> : <Smartphone className="size-3.5" aria-hidden />}
      {label}
    </Button>
  )
}

export function PreviewModeToggle() {
  const { target, setTarget, lockedMobile } = usePreviewTarget()

  if (lockedMobile) {
    return (
      <div className="flex items-center gap-2 rounded-lg border border-dashed border-border px-3 py-1.5 text-xs text-muted-foreground">
        <Smartphone className="size-3.5 shrink-0" aria-hidden />
        모바일 전용 템플릿
      </div>
    )
  }

  return (
    <div className="flex items-center gap-1 rounded-lg border border-border bg-muted/30 p-0.5">
      <TargetModeButton mode="mobile" label="모바일" active={target === 'mobile'} onSelect={setTarget} />
      <TargetModeButton mode="web" label="웹" active={target === 'web'} onSelect={setTarget} />
    </div>
  )
}
