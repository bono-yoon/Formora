import { Download, FileArchive } from 'lucide-react'
import { useCallback, useState } from 'react'

import { usePreviewTarget } from '@/features/builder/use-preview-target'
import { Button } from '@/components/ui/button'
import { buildStaticHtmlDocument } from '@/lib/export/build-static-export'
import { downloadBlob, downloadTextFile } from '@/lib/export/download-blob'
import { safeFilenameBase } from '@/lib/export/sanitize-filename'
import { zipSinglePageSite } from '@/lib/export/zip-static-site'
import type { TemplateCategoryId } from '@/templates/catalog/types'

export type ExportToolbarProps = {
  canExport: boolean
  categoryId: TemplateCategoryId
  variantId: string
  data: unknown
  documentTitle: string
  filenameHint: string
}

export function ExportToolbar({
  canExport,
  categoryId,
  variantId,
  data,
  documentTitle,
  filenameHint,
}: ExportToolbarProps) {
  const { target: exportTarget } = usePreviewTarget()
  const [busy, setBusy] = useState<'zip' | null>(null)
  const [error, setError] = useState<string | null>(null)

  const baseName = `${safeFilenameBase(filenameHint, categoryId)}-${safeFilenameBase(variantId, 'v')}`

  const buildHtml = useCallback(() => {
    return buildStaticHtmlDocument({
      categoryId,
      variantId,
      data,
      documentTitle,
      exportTarget,
    })
  }, [categoryId, variantId, data, documentTitle, exportTarget])

  const handleHtml = useCallback(() => {
    setError(null)
    try {
      const html = buildHtml()
      downloadTextFile(`${baseName}.html`, html)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'HTML 생성 실패')
    }
  }, [baseName, buildHtml])

  const handleZip = useCallback(async () => {
    setError(null)
    setBusy('zip')
    try {
      const html = buildHtml()
      const blob = await zipSinglePageSite(html, baseName)
      downloadBlob(`${baseName}.zip`, blob)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'ZIP 생성 실패')
    } finally {
      setBusy(null)
    }
  }, [baseName, buildHtml])

  return (
    <div className="flex w-full min-w-0 flex-col gap-2 sm:w-auto sm:min-w-0">
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="gap-1.5"
          disabled={!canExport}
          onClick={handleHtml}
        >
          <Download className="size-3.5" aria-hidden />
          HTML 받기
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="gap-1.5"
          disabled={!canExport || busy === 'zip'}
          onClick={() => void handleZip()}
        >
          <FileArchive className="size-3.5" aria-hidden />
          {busy === 'zip' ? 'ZIP 준비 중…' : 'ZIP 받기'}
        </Button>
      </div>
      {!canExport ? (
        <p className="text-xs text-muted-foreground">입력이 유효할 때 보내기가 활성화됩니다.</p>
      ) : null}
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  )
}
