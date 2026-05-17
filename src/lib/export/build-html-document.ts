import { EXPORT_APP_CSS } from '@/lib/export/export-app-css'
import type { PreviewTargetMode } from '@/templates/catalog/types'

function escapeHtmlText(text: string): string {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

/** `</style>` 시퀀스가 CSS 본문에 있으면 HTML이 깨질 수 있어 이스케이프합니다. */
function escapeForStyleElement(css: string): string {
  return css.replaceAll('</', '<\\/')
}

type BuildHtmlDocumentParams = {
  title: string
  bodyMarkup: string
  inlineCss?: string
  exportTarget?: PreviewTargetMode
}

export function buildStandaloneHtmlDocument({
  title,
  bodyMarkup,
  inlineCss = EXPORT_APP_CSS,
  exportTarget = 'mobile',
}: BuildHtmlDocumentParams): string {
  const safeTitle = escapeHtmlText(title)
  const styleBlock = escapeForStyleElement(inlineCss)
  const targetAttr = escapeHtmlText(exportTarget)

  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${safeTitle}</title>
  <style>${styleBlock}</style>
</head>
<body class="min-h-dvh bg-background text-foreground antialiased">
  <div class="export-root" data-export-target="${targetAttr}">${bodyMarkup}</div>
</body>
</html>
`
}
