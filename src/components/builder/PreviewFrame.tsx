import { Lock, Maximize2, X } from 'lucide-react'
import { type ReactNode, useEffect, useId, useState } from 'react'
import { createPortal } from 'react-dom'

import { ScaledWebCanvas } from '@/components/builder/ScaledWebCanvas'
import { usePreviewTarget } from '@/features/builder/use-preview-target'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type PreviewFrameProps = {
  title?: string
  children: ReactNode
  className?: string
}

function MobileDeviceShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-0 flex-1 flex-col items-center justify-start overflow-x-hidden rounded-2xl border border-border bg-gradient-to-b from-zinc-200/80 to-zinc-300/60 p-3 shadow-inner sm:p-4 dark:from-zinc-900/80 dark:to-zinc-950/60">
      <p className="mb-3 shrink-0 text-center text-[11px] font-medium text-muted-foreground">
        모바일 기기 · 390×680px 고정 프레임
      </p>
      <div
        className={cn(
          'flex w-[min(100%,390px)] shrink-0 flex-col rounded-[2.35rem] border-[10px] border-zinc-800 bg-zinc-800 p-1 shadow-xl ring-1 ring-black/15',
          'h-[min(68vh,680px)] min-h-[520px] max-h-[680px]',
        )}
      >
        <div className="flex shrink-0 justify-center pb-1 pt-2" aria-hidden>
          <span className="block h-5 w-[4.5rem] rounded-full bg-zinc-950/90" />
        </div>
        <div className="preview-mobile-viewport min-h-0 min-w-0 w-full flex-1 overflow-x-hidden overflow-y-auto rounded-2xl bg-background [&>*]:min-h-0">
          {children}
        </div>
        <div className="flex shrink-0 justify-center py-2" aria-hidden>
          <div className="h-1 w-24 rounded-full bg-zinc-600" />
        </div>
      </div>
    </div>
  )
}

function WebBrowserShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-border bg-muted/30 p-3 shadow-inner sm:p-4">
      <p className="mb-2 shrink-0 text-[11px] font-medium text-muted-foreground">
        데스크톱 브라우저 축소판 · 1280px 기준 비율 축소 (전체화면 없이 레이아웃 확인)
      </p>
      <div
        className={cn(
          'flex min-h-0 w-full flex-1 flex-col overflow-hidden rounded-xl border border-border bg-background shadow-md',
          'h-[min(58vh,540px)] max-h-[min(58vh,540px)]',
        )}
      >
        <div
          className="flex shrink-0 items-center gap-2 border-b border-border bg-muted/70 px-3 py-2"
          aria-hidden
        >
          <div className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-red-400/90" />
            <span className="size-2.5 rounded-full bg-amber-400/90" />
            <span className="size-2.5 rounded-full bg-emerald-400/90" />
          </div>
          <div className="ml-1 flex min-w-0 flex-1 items-center gap-2 rounded-md border border-border/60 bg-background/90 px-3 py-1.5 text-xs text-muted-foreground">
            <Lock className="size-3 shrink-0 opacity-50" />
            <span className="truncate font-mono text-[11px]">https://preview.local/landing</span>
          </div>
        </div>
        <ScaledWebCanvas maxHeight="100%" className="min-h-0 flex-1 bg-background">
          {children}
        </ScaledWebCanvas>
      </div>
    </div>
  )
}

function PreviewFrameImpl({ title = '미리보기', children, className }: PreviewFrameProps) {
  const { target } = usePreviewTarget()
  const isWeb = target === 'web'
  const [fullscreenOpen, setFullscreenOpen] = useState(false)
  const fsTitleId = useId()

  useEffect(() => {
    if (!fullscreenOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setFullscreenOpen(false)
    }
    window.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [fullscreenOpen])

  const shell = isWeb ? <WebBrowserShell>{children}</WebBrowserShell> : <MobileDeviceShell>{children}</MobileDeviceShell>

  const fullscreenPortal =
    fullscreenOpen && isWeb
      ? createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-stretch justify-center bg-black/65 p-2 backdrop-blur-[2px] sm:p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby={fsTitleId}
            onClick={() => setFullscreenOpen(false)}
          >
            <div
              className="flex min-h-0 w-full min-w-0 max-w-full flex-1 flex-col overflow-hidden rounded-xl border border-border bg-background shadow-2xl sm:max-h-[min(100dvh,100vh)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-b border-border bg-muted/50 px-3 py-2.5 sm:px-4">
                <p id={fsTitleId} className="text-sm font-medium">
                  웹 · 전체화면 미리보기
                </p>
                <div className="flex items-center gap-2">
                  <span className="hidden text-xs text-muted-foreground sm:inline">Esc 로 닫기</span>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    className="gap-1.5"
                    onClick={() => setFullscreenOpen(false)}
                  >
                    <X className="size-3.5" aria-hidden />
                    닫기
                  </Button>
                </div>
              </div>
              <div className="min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto bg-background">{children}</div>
            </div>
          </div>,
          document.body,
        )
      : null

  return (
    <div className={cn('flex min-h-0 min-w-0 max-w-full flex-1 flex-col gap-2 overflow-x-hidden', className)}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{title}</p>
        {isWeb ? (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-8 gap-1.5"
            onClick={() => setFullscreenOpen(true)}
            disabled={fullscreenOpen}
          >
            <Maximize2 className="size-3.5" aria-hidden />
            전체화면
          </Button>
        ) : null}
      </div>

      {fullscreenOpen && isWeb ? (
        <div className="flex min-h-[min(52vh,320px)] flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/25 px-4 py-10 text-center text-sm text-muted-foreground">
          <p className="font-medium text-foreground">전체화면으로 보는 중입니다</p>
          <p className="mt-1 max-w-sm text-xs">닫기 또는 Esc 를 누르면 이 영역에 미리보기가 다시 표시됩니다.</p>
        </div>
      ) : (
        shell
      )}

      {fullscreenPortal}
    </div>
  )
}

/** Web / Mobile 타깃에 따라 기기·브라우저 크롬이 다른 셸을 씁니다. 웹일 때 전체화면 보기를 제공합니다. */
export function PreviewFrame(props: PreviewFrameProps) {
  const { target } = usePreviewTarget()
  return <PreviewFrameImpl key={target} {...props} />
}
