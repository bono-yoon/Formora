import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'

import { CategoryBuilderRouter } from '@/features/builder/CategoryBuilderRouter'
import { PreviewModeToggle } from '@/features/builder/PreviewModeToggle'
import { PreviewTargetProvider } from '@/features/builder/preview-target-context'
import { ThemeColorPanel } from '@/features/builder/ThemeColorPanel'
import { ThemeColorsProvider } from '@/features/builder/theme-colors-context'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getCategory, getVariant, isTemplateCategoryId, LEGACY_BUILD_VARIANT_ALIASES } from '@/templates/catalog'

export function BuilderPage() {
  const { categoryId = '', variantId = '' } = useParams<{ categoryId: string; variantId: string }>()
  const cat = isTemplateCategoryId(categoryId) ? getCategory(categoryId) : undefined
  const aliasedId =
    cat && !getVariant(categoryId, variantId)
      ? LEGACY_BUILD_VARIANT_ALIASES[cat.id]?.[variantId]
      : undefined
  const effectiveVariantId = aliasedId ?? variantId
  const variant = cat ? getVariant(categoryId, effectiveVariantId) : undefined

  if (!cat || !variant) {
    return (
      <Card className="max-w-lg">
        <CardHeader>
          <CardTitle>빌더를 열 수 없습니다</CardTitle>
          <CardDescription>카테고리 또는 디자인 ID를 확인해 주세요.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Button variant="secondary" asChild>
            <Link to="/">홈</Link>
          </Button>
          {isTemplateCategoryId(categoryId) ? (
            <Button variant="outline" asChild>
              <Link to={`/templates/${categoryId}`}>변형 선택으로</Link>
            </Button>
          ) : null}
        </CardContent>
      </Card>
    )
  }

  return (
    <PreviewTargetProvider lockedMobile={cat.previewMobileOnly}>
      <ThemeColorsProvider categoryId={cat.id} variantId={variant.id}>
      <div className="flex min-w-0 max-w-full flex-1 flex-col gap-6">
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="ghost" size="sm" className="gap-1.5 px-2" asChild>
            <Link to={`/templates/${cat.id}`}>
              <ArrowLeft className="size-4" aria-hidden />
              변형 선택
            </Link>
          </Button>
          <span className="text-sm text-muted-foreground">
            / {cat.title} / {variant.title}
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            미리보기 타깃은 기기 셸(모바일 베젤 / 웹 브라우저 축소판)로 구분됩니다. 웹은 1280px 캔버스를
            축소해 한눈에 보여 주며, 필요 시 <span className="font-medium text-foreground">전체화면</span>으로
            확대할 수 있습니다.
          </p>
          <PreviewModeToggle />
        </div>

        {!cat.previewMobileOnly ? <ThemeColorPanel categoryId={cat.id} variantId={variant.id} /> : null}

        <AnimatePresence mode="wait">
          <motion.div
            key={`${cat.id}-${variant.id}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="flex min-w-0 max-w-full flex-1 flex-col"
          >
            <CategoryBuilderRouter categoryId={cat.id} variantId={variant.id} />
          </motion.div>
        </AnimatePresence>
      </div>
      </ThemeColorsProvider>
    </PreviewTargetProvider>
  )
}
