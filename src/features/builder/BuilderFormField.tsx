import type { ReactNode } from 'react'

import { Label } from '@/components/ui/label'

type BuilderFormFieldProps = {
  id: string
  label: string
  hint?: string
  children: ReactNode
}

export function BuilderFormField({ id, label, hint, children }: BuilderFormFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  )
}
