/** ZIP/HTML 파일명에 쓸 수 있도록 안전한 베이스 문자열로 정리합니다. */
export function safeFilenameBase(raw: string, fallback: string): string {
  const trimmed = raw.trim().slice(0, 80)
  const noPath = trimmed.replace(/[/\\?%*:|"<>]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-')
  const base = noPath.replace(/^-+|-+$/g, '').toLowerCase()
  return base || fallback
}
