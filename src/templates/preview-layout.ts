import type { PageLayoutProfile } from '@/templates/page-layout'
import { cn } from '@/lib/utils'

/** 템플릿 페이지 루트 — 미리보기·보내기 모두 콘텐츠 높이에 맞춤 (웹에서 92vh 강제 금지) */
export function previewPageRoot(_layout?: PageLayoutProfile): string {
  return 'min-h-0 min-w-0 max-w-full break-words antialiased'
}

/** @deprecated previewPageRoot() 사용 */
export function webViewportFill(_isWeb?: boolean): string {
  return ''
}

/** 웹 미리보기 — 본문 바로 아래 추가 섹션(프로젝트·일정·스킬 등) */
export function previewWebSectionsStack(className?: string): string {
  return cn('space-y-8 border-t border-black/10 pt-6 sm:space-y-10 sm:pt-8', className)
}

/** 웹 추가 섹션 바깥 패딩(본문 max-width와 맞춤) */
export function previewWebSectionsPad(className?: string): string {
  return cn('mx-auto w-full max-w-6xl px-4 pb-12 pt-4 sm:px-8 lg:max-w-7xl lg:px-10 lg:pb-16', className)
}

/** @deprecated min-h 제거로 불필요 — 하위 호환용 no-op */
export function previewWebContinuationPull(className?: string): string {
  return cn(className)
}
