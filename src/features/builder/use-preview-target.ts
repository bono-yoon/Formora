import { useContext } from 'react'

import { PreviewTargetContext } from '@/features/builder/preview-target-state'

export function usePreviewTarget() {
  const ctx = useContext(PreviewTargetContext)
  if (!ctx) {
    return {
      target: 'mobile' as const,
      setTarget: () => {},
      lockedMobile: false,
    }
  }
  return ctx
}
