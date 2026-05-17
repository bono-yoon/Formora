import { Plus, Trash2 } from 'lucide-react'
import { useMemo, useState } from 'react'

import { ExportToolbar } from '@/components/builder/ExportToolbar'
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
import { defaultCompanyPageData } from '@/templates/company/defaults'
import { CompanyTemplatePreview } from '@/templates/company/CompanyTemplatePreview'
import { companyVariantFromCatalogId } from '@/templates/company/company-variant'
import type {
  CompanyFeature,
  CompanyMilestone,
  CompanyPageData,
  CompanyPartner,
  CompanyService,
} from '@/templates/company/schema'
import { companyPageSchema } from '@/templates/company/schema'

export function CompanyBuilderView({ variantId }: { variantId: string }) {
  const { target } = usePreviewTarget()
  const [data, setData] = useState<CompanyPageData>(() => structuredClone(defaultCompanyPageData))

  const parseResult = useMemo(() => companyPageSchema.safeParse(data), [data])

  function patch(partial: Partial<CompanyPageData>) {
    setData((prev) => ({ ...prev, ...partial }))
  }

  function patchFeature(index: number, partial: Partial<CompanyFeature>) {
    setData((prev) => {
      const next = [...prev.features]
      next[index] = { ...next[index], ...partial }
      return { ...prev, features: next }
    })
  }

  function addFeature() {
    setData((prev) => ({
      ...prev,
      features: [
        ...prev.features,
        { title: '새 특징', description: '설명을 입력하세요.' },
      ].slice(0, 8),
    }))
  }

  function removeFeature(index: number) {
    setData((prev) => {
      if (prev.features.length <= 1) return prev
      return { ...prev, features: prev.features.filter((_, i) => i !== index) }
    })
  }

  function patchService(index: number, partial: Partial<CompanyService>) {
    setData((prev) => {
      const next = [...prev.services]
      next[index] = { ...next[index], ...partial }
      return { ...prev, services: next }
    })
  }

  function addService() {
    setData((prev) => ({
      ...prev,
      services: [...prev.services, { title: '새 업무', description: '' }].slice(0, 8),
    }))
  }

  function removeService(index: number) {
    setData((prev) => ({ ...prev, services: prev.services.filter((_, i) => i !== index) }))
  }

  function patchMilestone(index: number, partial: Partial<CompanyMilestone>) {
    setData((prev) => {
      const next = [...prev.milestones]
      next[index] = { ...next[index], ...partial }
      return { ...prev, milestones: next }
    })
  }

  function addMilestone() {
    setData((prev) => ({
      ...prev,
      milestones: [...prev.milestones, { year: '2026', title: '새 연혁', description: '' }].slice(0, 12),
    }))
  }

  function removeMilestone(index: number) {
    setData((prev) => ({ ...prev, milestones: prev.milestones.filter((_, i) => i !== index) }))
  }

  function patchPartner(index: number, partial: Partial<CompanyPartner>) {
    setData((prev) => {
      const next = [...prev.partners]
      next[index] = { ...next[index], ...partial }
      return { ...prev, partners: next }
    })
  }

  function addPartner() {
    setData((prev) => ({
      ...prev,
      partners: [...prev.partners, { name: '협력사', logoUrl: '' }].slice(0, 12),
    }))
  }

  function removePartner(index: number) {
    setData((prev) => ({ ...prev, partners: prev.partners.filter((_, i) => i !== index) }))
  }

  function reset() {
    setData(structuredClone(defaultCompanyPageData))
  }

  const issues = parseResult.success ? [] : parseResult.error.issues
  const companyVariant = companyVariantFromCatalogId(variantId)

  return (
    <div className="flex min-w-0 max-w-full flex-1 flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
      <div className="flex w-full min-w-0 flex-col gap-6 lg:max-w-md lg:shrink-0">
        <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <h2 className="text-lg font-semibold tracking-tight">입력</h2>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:justify-end">
            <ExportToolbar
              canExport={parseResult.success}
              categoryId="company"
              variantId={variantId}
              data={data}
              documentTitle={data.siteName}
              filenameHint={data.siteName}
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
                {issues.length > 4 ? <span className="block">외 {issues.length - 4}건</span> : null}
              </CardDescription>
            </CardHeader>
          </Card>
        ) : null}

        <Card>
          <CardHeader>
            <CardTitle className="text-base">브랜드 · 히어로</CardTitle>
            <CardDescription>헤더와 첫 화면에 쓰이는 문구와 링크입니다.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <BuilderFormField id="siteName" label="사이트 이름">
              <Input
                id="siteName"
                value={data.siteName}
                onChange={(e) => patch({ siteName: e.target.value })}
                autoComplete="off"
              />
            </BuilderFormField>
            <BuilderFormField id="tagline" label="태그라인" hint="헤더 아래 한 줄 (선택)">
              <Input
                id="tagline"
                value={data.tagline}
                onChange={(e) => patch({ tagline: e.target.value })}
                autoComplete="off"
              />
            </BuilderFormField>
            <BuilderFormField id="logoUrl" label="로고 이미지 URL" hint="비우면 플레이스홀더 블록이 표시됩니다.">
              <Input
                id="logoUrl"
                value={data.logoUrl}
                onChange={(e) => patch({ logoUrl: e.target.value })}
                placeholder="https://..."
                autoComplete="off"
              />
            </BuilderFormField>
            <BuilderFormField id="heroImageUrl" label="히어로 이미지 URL" hint="비우면 그라데이션 배경을 사용합니다.">
              <Input
                id="heroImageUrl"
                value={data.heroImageUrl}
                onChange={(e) => patch({ heroImageUrl: e.target.value })}
                placeholder="https://..."
                autoComplete="off"
              />
            </BuilderFormField>
            <BuilderFormField id="heroTitle" label="히어로 제목">
              <Input
                id="heroTitle"
                value={data.heroTitle}
                onChange={(e) => patch({ heroTitle: e.target.value })}
                autoComplete="off"
              />
            </BuilderFormField>
            <BuilderFormField id="heroSubtitle" label="히어로 부제">
              <Textarea
                id="heroSubtitle"
                value={data.heroSubtitle}
                onChange={(e) => patch({ heroSubtitle: e.target.value })}
                rows={3}
              />
            </BuilderFormField>
            <div className="grid gap-4 sm:grid-cols-2">
              <BuilderFormField id="primaryCtaLabel" label="CTA 버튼 문구">
                <Input
                  id="primaryCtaLabel"
                  value={data.primaryCtaLabel}
                  onChange={(e) => patch({ primaryCtaLabel: e.target.value })}
                  autoComplete="off"
                />
              </BuilderFormField>
              <BuilderFormField id="primaryCtaUrl" label="CTA 링크" hint="mailto:, https:// 등">
                <Input
                  id="primaryCtaUrl"
                  value={data.primaryCtaUrl}
                  onChange={(e) => patch({ primaryCtaUrl: e.target.value })}
                  autoComplete="off"
                />
              </BuilderFormField>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0">
            <div>
              <CardTitle className="text-base">특징 카드</CardTitle>
              <CardDescription>최소 1개, 최대 8개까지 추가할 수 있습니다.</CardDescription>
            </div>
            <Button type="button" size="sm" variant="outline" className="shrink-0 gap-1" onClick={addFeature}>
              <Plus className="size-3.5" aria-hidden />
              추가
            </Button>
          </CardHeader>
          <CardContent className="space-y-5">
            {data.features.map((feature, index) => (
              <div
                key={index}
                className="space-y-3 rounded-xl border border-border/80 bg-muted/20 p-4"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-medium text-muted-foreground">카드 {index + 1}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-xs"
                    className="text-muted-foreground hover:text-destructive"
                    onClick={() => removeFeature(index)}
                    disabled={data.features.length <= 1}
                    aria-label={`특징 ${index + 1} 삭제`}
                  >
                    <Trash2 className="size-3.5" />
                  </Button>
                </div>
                <BuilderFormField id={`f-title-${index}`} label="제목">
                  <Input
                    id={`f-title-${index}`}
                    value={feature.title}
                    onChange={(e) => patchFeature(index, { title: e.target.value })}
                    autoComplete="off"
                  />
                </BuilderFormField>
                <BuilderFormField id={`f-desc-${index}`} label="설명">
                  <Textarea
                    id={`f-desc-${index}`}
                    value={feature.description}
                    onChange={(e) => patchFeature(index, { description: e.target.value })}
                    rows={2}
                  />
                </BuilderFormField>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0">
            <div>
              <CardTitle className="text-base">하는 업무</CardTitle>
              <CardDescription>웹 미리보기의 Services 섹션에 표시됩니다.</CardDescription>
            </div>
            <Button type="button" size="sm" variant="outline" className="shrink-0 gap-1" onClick={addService}>
              <Plus className="size-3.5" aria-hidden />
              추가
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.services.length === 0 ? (
              <p className="text-sm text-muted-foreground">비우면 웹에서 업무 섹션이 숨겨집니다.</p>
            ) : null}
            {data.services.map((item, index) => (
              <div key={index} className="space-y-3 rounded-xl border border-border/80 bg-muted/20 p-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-medium text-muted-foreground">업무 {index + 1}</span>
                  <Button type="button" variant="ghost" size="icon-xs" onClick={() => removeService(index)} aria-label={`업무 ${index + 1} 삭제`}>
                    <Trash2 className="size-3.5" />
                  </Button>
                </div>
                <BuilderFormField id={`svc-t-${index}`} label="제목">
                  <Input id={`svc-t-${index}`} value={item.title} onChange={(e) => patchService(index, { title: e.target.value })} />
                </BuilderFormField>
                <BuilderFormField id={`svc-d-${index}`} label="설명">
                  <Textarea id={`svc-d-${index}`} value={item.description} onChange={(e) => patchService(index, { description: e.target.value })} rows={2} />
                </BuilderFormField>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0">
            <div>
              <CardTitle className="text-base">연혁</CardTitle>
              <CardDescription>웹 미리보기의 History 타임라인에 표시됩니다.</CardDescription>
            </div>
            <Button type="button" size="sm" variant="outline" className="shrink-0 gap-1" onClick={addMilestone}>
              <Plus className="size-3.5" aria-hidden />
              추가
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.milestones.map((item, index) => (
              <div key={index} className="space-y-3 rounded-xl border border-border/80 bg-muted/20 p-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-medium text-muted-foreground">연혁 {index + 1}</span>
                  <Button type="button" variant="ghost" size="icon-xs" onClick={() => removeMilestone(index)} aria-label={`연혁 ${index + 1} 삭제`}>
                    <Trash2 className="size-3.5" />
                  </Button>
                </div>
                <div className="grid gap-3 sm:grid-cols-[5rem_1fr]">
                  <BuilderFormField id={`ms-y-${index}`} label="연도">
                    <Input id={`ms-y-${index}`} value={item.year} onChange={(e) => patchMilestone(index, { year: e.target.value })} />
                  </BuilderFormField>
                  <BuilderFormField id={`ms-t-${index}`} label="제목">
                    <Input id={`ms-t-${index}`} value={item.title} onChange={(e) => patchMilestone(index, { title: e.target.value })} />
                  </BuilderFormField>
                </div>
                <BuilderFormField id={`ms-d-${index}`} label="설명">
                  <Textarea id={`ms-d-${index}`} value={item.description} onChange={(e) => patchMilestone(index, { description: e.target.value })} rows={2} />
                </BuilderFormField>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0">
            <div>
              <CardTitle className="text-base">협력사</CardTitle>
              <CardDescription>
                협력사 이름과 로고 이미지 URL을 입력합니다. 로고 트러스트 변형은 로고 마크를 크게 표시합니다.
              </CardDescription>
            </div>
            <Button type="button" size="sm" variant="outline" className="shrink-0 gap-1" onClick={addPartner}>
              <Plus className="size-3.5" aria-hidden />
              추가
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.partners.map((item, index) => (
              <div key={index} className="space-y-2 rounded-lg border border-border/60 p-3">
                <div className="flex gap-2">
                  <div className="min-w-0 flex-1">
                    <BuilderFormField id={`pt-n-${index}`} label="이름">
                      <Input
                        id={`pt-n-${index}`}
                        value={item.name}
                        onChange={(e) => patchPartner(index, { name: e.target.value })}
                      />
                    </BuilderFormField>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="mt-6 shrink-0"
                    onClick={() => removePartner(index)}
                    aria-label={`협력사 ${index + 1} 삭제`}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
                <BuilderFormField id={`pt-l-${index}`} label="로고 이미지 URL" hint="비우면 이름 텍스트로 표시됩니다.">
                  <Input
                    id={`pt-l-${index}`}
                    value={item.logoUrl}
                    onChange={(e) => patchPartner(index, { logoUrl: e.target.value })}
                    placeholder="https://..."
                  />
                </BuilderFormField>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">푸터</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <BuilderFormField id="contactEmail" label="연락 이메일" hint="비우면 푸터에서 이메일을 숨깁니다.">
              <Input
                id="contactEmail"
                value={data.contactEmail}
                onChange={(e) => patch({ contactEmail: e.target.value })}
                autoComplete="email"
              />
            </BuilderFormField>
            <BuilderFormField id="footerNote" label="푸터 문구">
              <Textarea
                id="footerNote"
                value={data.footerNote}
                onChange={(e) => patch({ footerNote: e.target.value })}
                rows={2}
              />
            </BuilderFormField>
          </CardContent>
        </Card>
      </div>

      <PreviewFrame className="lg:min-w-0 lg:flex-1">
        <CompanyTemplatePreview data={data} variant={companyVariant} layout={target} />
      </PreviewFrame>
    </div>
  )
}
