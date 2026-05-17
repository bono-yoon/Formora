import { Navigate, useParams } from 'react-router-dom'

import { getCategory, isTemplateCategoryId, LEGACY_DEFAULT_VARIANT } from '@/templates/catalog'

/** `/build/:oneSegment` — 구 URL 또는 단축 URL을 `/build/:cat/:variant`로 정규화 */
export function LegacyBuildRedirect() {
  const { legacyId = '' } = useParams<{ legacyId: string }>()

  if (!isTemplateCategoryId(legacyId)) {
    return <Navigate to="/" replace />
  }

  const cat = getCategory(legacyId)
  if (!cat) {
    return <Navigate to="/" replace />
  }

  const fromLegacy =
    legacyId in LEGACY_DEFAULT_VARIANT
      ? LEGACY_DEFAULT_VARIANT[legacyId as keyof typeof LEGACY_DEFAULT_VARIANT]
      : undefined
  const variantId = fromLegacy ?? cat.variants[0]?.id ?? 'default'

  return <Navigate to={`/build/${legacyId}/${variantId}`} replace />
}
