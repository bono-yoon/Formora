import { Plus, Trash2 } from 'lucide-react'
import { useMemo, useState } from 'react'

import { ExportToolbar } from '@/components/builder/ExportToolbar'
import { BuilderThemedPreview } from '@/components/builder/BuilderThemedPreview'
import { PreviewFrame } from '@/components/builder/PreviewFrame'
import { BuilderFormField } from '@/features/builder/BuilderFormField'
import { usePreviewTarget } from '@/features/builder/use-preview-target'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { defaultAppPageData } from '@/templates/app/defaults'
import { defaultConstructionPageData } from '@/templates/construction/defaults'
import { defaultStartupPageData } from '@/templates/startup/defaults'
import { BusinessIntroBuilderSections } from '@/features/builder/shared/business-intro-builder-sections'
import { BusinessIntroTemplatePreview } from '@/templates/shared/BusinessIntroTemplatePreview'
import {
  appDesignFromCatalogId,
  constructionDesignFromCatalogId,
  startupDesignFromCatalogId,
} from '@/templates/shared/business-intro-design'
import type { BusinessIntroData } from '@/templates/shared/business-intro-schema'
import { businessIntroSchema } from '@/templates/shared/business-intro-schema'
import type { TemplateCategoryId } from '@/templates/catalog/types'

const defaults = {
  startup: defaultStartupPageData,
  construction: defaultConstructionPageData,
  app: defaultAppPageData,
} as const

type BusinessIntroBuilderProps = {
  categoryId: 'startup' | 'construction' | 'app'
  variantId: string
}

export function BusinessIntroBuilderView({ categoryId, variantId }: BusinessIntroBuilderProps) {
  const { target } = usePreviewTarget()
  const design =
    categoryId === 'startup'
      ? startupDesignFromCatalogId(variantId)
      : categoryId === 'app'
        ? appDesignFromCatalogId(variantId)
        : constructionDesignFromCatalogId(variantId)
  const [data, setData] = useState<BusinessIntroData>(() => structuredClone(defaults[categoryId]))
  const parseResult = useMemo(() => businessIntroSchema.safeParse(data), [data])

  function patch(partial: Partial<BusinessIntroData>) {
    setData((prev) => ({ ...prev, ...partial }))
  }

  function patchBullet(i: number, value: string) {
    setData((prev) => {
      const next = [...prev.bullets]
      next[i] = value
      return { ...prev, bullets: next }
    })
  }

  function addBullet() {
    setData((prev) => ({
      ...prev,
      bullets: [...prev.bullets, '새 불릿'].slice(0, 6),
    }))
  }

  function removeBullet(i: number) {
    setData((prev) => ({ ...prev, bullets: prev.bullets.filter((_, idx) => idx !== i) }))
  }

  function reset() {
    setData(structuredClone(defaults[categoryId]))
  }

  const issues = parseResult.success ? [] : parseResult.error.issues

  return (
    <div className="flex min-w-0 max-w-full flex-1 flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
      <div className="flex w-full min-w-0 flex-col gap-6 lg:max-w-md lg:shrink-0">
        <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <h2 className="text-lg font-semibold tracking-tight">입력</h2>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:justify-end">
            <ExportToolbar
              canExport={parseResult.success}
              categoryId={categoryId as TemplateCategoryId}
              variantId={variantId}
              data={data}
              documentTitle={data.orgName}
              filenameHint={data.orgName}
            />
            <Button type="button" variant="ghost" size="sm" onClick={reset}>
              데모 값으로 초기화
            </Button>
          </div>
        </div>

        {!parseResult.success ? (
          <Card className="border-destructive/40 bg-destructive/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-destructive">입력을 다듬어 주세요</CardTitle>
              <CardDescription className="text-xs">
                {issues.slice(0, 4).map((issue) => (
                  <span key={issue.path.join('.') + issue.message} className="block">
                    {issue.path.join('.') || 'root'}: {issue.message}
                  </span>
                ))}
              </CardDescription>
            </CardHeader>
          </Card>
        ) : null}

        <Card>
          <CardHeader>
            <CardTitle className="text-base">헤드라인</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <BuilderFormField id="orgName" label="조직 / 제품 이름">
              <Input id="orgName" value={data.orgName} onChange={(e) => patch({ orgName: e.target.value })} />
            </BuilderFormField>
            <BuilderFormField id="headline" label="헤드라인">
              <Input id="headline" value={data.headline} onChange={(e) => patch({ headline: e.target.value })} />
            </BuilderFormField>
            <BuilderFormField id="subline" label="서브 카피">
              <Input id="subline" value={data.subline} onChange={(e) => patch({ subline: e.target.value })} />
            </BuilderFormField>
            <BuilderFormField id="body" label="본문">
              <Textarea id="body" value={data.body} onChange={(e) => patch({ body: e.target.value })} rows={4} />
            </BuilderFormField>
            <BuilderFormField id="heroImageUrl" label="히어로 이미지 URL">
              <Input
                id="heroImageUrl"
                value={data.heroImageUrl}
                onChange={(e) => patch({ heroImageUrl: e.target.value })}
              />
            </BuilderFormField>
            <div className="grid gap-4 sm:grid-cols-2">
              <BuilderFormField id="ctaLabel" label="CTA 문구">
                <Input id="ctaLabel" value={data.ctaLabel} onChange={(e) => patch({ ctaLabel: e.target.value })} />
              </BuilderFormField>
              <BuilderFormField id="ctaUrl" label="CTA URL">
                <Input id="ctaUrl" value={data.ctaUrl} onChange={(e) => patch({ ctaUrl: e.target.value })} />
              </BuilderFormField>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0">
            <div>
              <CardTitle className="text-base">불릿</CardTitle>
              <CardDescription>최대 6개</CardDescription>
            </div>
            <Button type="button" size="sm" variant="outline" className="gap-1" onClick={addBullet} disabled={data.bullets.length >= 6}>
              <Plus className="size-3.5" aria-hidden />
              추가
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.bullets.map((b, i) => (
              <div key={i} className="flex gap-2">
                <Input
                  value={b}
                  onChange={(e) => patchBullet(i, e.target.value)}
                  aria-label={`불릿 ${i + 1}`}
                  className="min-w-0 flex-1"
                />
                <Button type="button" variant="ghost" size="icon" onClick={() => removeBullet(i)}>
                  <Trash2 className="size-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <BusinessIntroBuilderSections categoryId={categoryId} data={data} setData={setData} />
      </div>

      <PreviewFrame className="lg:min-w-0 lg:flex-1">
        <BuilderThemedPreview categoryId={categoryId} variantId={variantId}>
          <BusinessIntroTemplatePreview data={data} categoryId={categoryId} design={design} layout={target} />
        </BuilderThemedPreview>
      </PreviewFrame>
    </div>
  )
}
