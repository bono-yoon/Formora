import { Navigate, Route, Routes } from 'react-router-dom'

import { AppShellLayout } from '@/components/layout/AppShellLayout'
import { BuilderPage } from '@/features/builder/BuilderPage'
import { LegacyBuildRedirect } from '@/features/builder/LegacyBuildRedirect'
import { TemplatePickerPage } from '@/features/template-picker/TemplatePickerPage'
import { VariantPickerPage } from '@/features/template-picker/VariantPickerPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppShellLayout />}>
        <Route index element={<TemplatePickerPage />} />
        <Route path="templates/:categoryId" element={<VariantPickerPage />} />
        <Route path="build/:categoryId/:variantId" element={<BuilderPage />} />
        <Route path="build/:legacyId" element={<LegacyBuildRedirect />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
