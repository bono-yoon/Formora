export function downloadBlob(filename: string, blob: Blob) {
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  anchor.rel = 'noopener'
  anchor.click()
  URL.revokeObjectURL(url)
}

export function downloadTextFile(filename: string, content: string, mime = 'text/html;charset=utf-8') {
  downloadBlob(filename, new Blob([content], { type: mime }))
}
