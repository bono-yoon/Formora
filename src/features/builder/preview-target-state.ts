import { createContext } from 'react'

import type { PreviewTargetMode } from '@/templates/catalog/types'

export type PreviewTargetContextValue = {
  target: PreviewTargetMode
  setTarget: (t: PreviewTargetMode) => void
  lockedMobile: boolean
}

export const PreviewTargetContext = createContext<PreviewTargetContextValue | null>(null)
