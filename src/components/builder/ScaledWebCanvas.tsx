import { type ReactNode, useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'

/** 웹 미리보기 논리 뷰포트 너비 (데스크톱 기준) */
export const WEB_PREVIEW_LOGICAL_WIDTH = 1280

type ScaledWebCanvasProps = {
  children: ReactNode
  className?: string
  /** 스크롤 영역 최대 높이 */
  maxHeight?: string
}

/**
 * 1280px 너비 콘텐츠를 패널 폭에 맞게 축소해 "브라우저 축소판"처럼 보여 줍니다.
 * 긴 페이지는 축소된 캔버스 안에서 세로 스크롤합니다.
 */
export function ScaledWebCanvas({
  children,
  className,
  maxHeight = 'min(56vh, 520px)',
}: ScaledWebCanvasProps) {
  const hostRef = useRef<HTMLDivElement>(null)
  const measureRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.45)
  const [scaledHeight, setScaledHeight] = useState(480)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    const updateScale = () => {
      const w = host.clientWidth
      if (w <= 0) return
      setScale(Math.min(1, w / WEB_PREVIEW_LOGICAL_WIDTH))
    }

    updateScale()
    const ro = new ResizeObserver(updateScale)
    ro.observe(host)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const el = measureRef.current
    if (!el) return

    const updateHeight = () => {
      setScaledHeight(Math.ceil(el.getBoundingClientRect().height))
    }

    updateHeight()
    const ro = new ResizeObserver(updateHeight)
    ro.observe(el)
    return () => ro.disconnect()
  }, [children, scale])

  const layoutHeight = scaledHeight * scale

  return (
    <div
      ref={hostRef}
      className={cn('min-h-0 w-full flex-1 overflow-auto overscroll-contain bg-muted/15', className)}
      style={{ maxHeight }}
    >
      <div
        className="relative mx-auto"
        style={{
          width: WEB_PREVIEW_LOGICAL_WIDTH * scale,
          height: layoutHeight,
        }}
      >
        <div
          ref={measureRef}
          className="origin-top-left bg-background"
          style={{
            width: WEB_PREVIEW_LOGICAL_WIDTH,
            transform: `scale(${scale})`,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
