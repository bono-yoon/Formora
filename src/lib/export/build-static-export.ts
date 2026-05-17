import { buildStandaloneHtmlDocument } from '@/lib/export/build-html-document'
import { renderExportBody } from '@/templates/render-export-body'
import type { PreviewTargetMode } from '@/templates/catalog/types'
import type { TemplateCategoryId } from '@/templates/catalog/types'

export type StaticExportInput = {
  categoryId: TemplateCategoryId
  variantId: string
  data: unknown
  documentTitle: string
  exportTarget: PreviewTargetMode
}

export function buildStaticHtmlDocument({
  categoryId,
  variantId,
  data,
  documentTitle,
  exportTarget,
}: StaticExportInput): string {
  const body = renderExportBody({ categoryId, variantId, data, exportTarget })
  return buildStandaloneHtmlDocument({
    title: documentTitle,
    bodyMarkup: body,
    exportTarget,
  })
}
