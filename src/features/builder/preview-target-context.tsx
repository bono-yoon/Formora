import { useCallback, useMemo, useState, type ReactNode } from 'react'

import { PreviewTargetContext, type PreviewTargetContextValue } from '@/features/builder/preview-target-state'
import type { PreviewTargetMode } from '@/templates/catalog/types'

type PreviewTargetProviderProps = {
  children: ReactNode
  /** 웨딩 등: 모바일만 허용 */
  lockedMobile: boolean
}

export function PreviewTargetProvider({ children, lockedMobile }: PreviewTargetProviderProps) {
  const [target, setTargetState] = useState<PreviewTargetMode>('mobile')

  const setTarget = useCallback(
    (t: PreviewTargetMode) => {
      if (lockedMobile) return
      setTargetState(t)
    },
    [lockedMobile],
  )

  const value = useMemo<PreviewTargetContextValue>(
    () => ({
      target: lockedMobile ? 'mobile' : target,
      setTarget,
      lockedMobile,
    }),
    [lockedMobile, target, setTarget],
  )

  return <PreviewTargetContext.Provider value={value}>{children}</PreviewTargetContext.Provider>
}
