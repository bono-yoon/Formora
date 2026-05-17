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
import { defaultProductPageData } from '@/templates/product/defaults'
import { ProductTemplatePreview } from '@/templates/product/ProductTemplatePreview'
import { productVariantFromCatalogId } from '@/templates/product/product-variant'
import type { ProductFaq, ProductPageData, ProductSpec } from '@/templates/product/schema'
import { productPageSchema } from '@/templates/product/schema'

export function ProductBuilderView({ variantId }: { variantId: string }) {
  const { target } = usePreviewTarget()
  const [data, setData] = useState<ProductPageData>(() => structuredClone(defaultProductPageData))

  const parseResult = useMemo(() => productPageSchema.safeParse(data), [data])

  function patch(partial: Partial<ProductPageData>) {
    setData((prev) => ({ ...prev, ...partial }))
  }

  function patchSpec(index: number, partial: Partial<ProductSpec>) {
    setData((prev) => {
      const next = [...prev.specs]
      next[index] = { ...next[index], ...partial }
      return { ...prev, specs: next }
    })
  }

  function addSpec() {
    setData((prev) => ({
      ...prev,
      specs: [...prev.specs, { label: '항목', value: '' }].slice(0, 12),
    }))
  }

  function removeSpec(index: number) {
    setData((prev) => {
      if (prev.specs.length <= 1) return prev
      return { ...prev, specs: prev.specs.filter((_, i) => i !== index) }
    })
  }

  function patchFaq(index: number, partial: Partial<ProductFaq>) {
    setData((prev) => {
      const next = [...prev.faq]
      next[index] = { ...next[index], ...partial }
      return { ...prev, faq: next }
    })
  }

  function addFaq() {
    setData((prev) => ({
      ...prev,
      faq: [...prev.faq, { q: '새 질문', a: '' }].slice(0, 12),
    }))
  }

  function removeFaq(index: number) {
    setData((prev) => ({ ...prev, faq: prev.faq.filter((_, i) => i !== index) }))
  }

  function patchGallery(index: number, value: string) {
    setData((prev) => {
      const next = [...prev.galleryImageUrls]
      next[index] = value
      return { ...prev, galleryImageUrls: next }
    })
  }

  function addGalleryRow() {
    setData((prev) => {
      if (prev.galleryImageUrls.length >= 6) return prev
      return { ...prev, galleryImageUrls: [...prev.galleryImageUrls, ''] }
    })
  }

  function removeGalleryRow(index: number) {
    setData((prev) => ({
      ...prev,
      galleryImageUrls: prev.galleryImageUrls.filter((_, i) => i !== index),
    }))
  }

  function reset() {
    setData(structuredClone(defaultProductPageData))
  }

  const issues = parseResult.success ? [] : parseResult.error.issues
  const productVariant = productVariantFromCatalogId(variantId)

  return (
    <div className="flex min-w-0 max-w-full flex-1 flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
      <div className="flex w-full min-w-0 flex-col gap-6 lg:max-w-md lg:shrink-0">
        <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <h2 className="text-lg font-semibold tracking-tight">입력</h2>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:justify-end">
            <ExportToolbar
              canExport={parseResult.success}
              categoryId="product"
              variantId={variantId}
              data={data}
              documentTitle={data.productName}
              filenameHint={data.productName}
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
            <CardTitle className="text-base">헤드라인 · 구매</CardTitle>
            <CardDescription>제품명, 한 줄 소개, 가격 표기, 구매 링크입니다.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <BuilderFormField id="productName" label="제품 이름">
              <Input
                id="productName"
                value={data.productName}
                onChange={(e) => patch({ productName: e.target.value })}
                autoComplete="off"
              />
            </BuilderFormField>
            <BuilderFormField id="oneLiner" label="한 줄 소개">
              <Input
                id="oneLiner"
                value={data.oneLiner}
                onChange={(e) => patch({ oneLiner: e.target.value })}
                autoComplete="off"
              />
            </BuilderFormField>
            <BuilderFormField id="description" label="제품 상세 설명" hint="웹 미리보기 상세 영역 · 문단은 빈 줄로 구분">
              <Textarea
                id="description"
                value={data.description}
                onChange={(e) => patch({ description: e.target.value })}
                rows={6}
              />
            </BuilderFormField>
            <div className="grid gap-4 sm:grid-cols-2">
              <BuilderFormField id="priceLabel" label="가격 표기" hint="예: ₩189,000부터">
                <Input
                  id="priceLabel"
                  value={data.priceLabel}
                  onChange={(e) => patch({ priceLabel: e.target.value })}
                  autoComplete="off"
                />
              </BuilderFormField>
              <BuilderFormField id="buyUrl" label="구매 링크">
                <Input
                  id="buyUrl"
                  value={data.buyUrl}
                  onChange={(e) => patch({ buyUrl: e.target.value })}
                  placeholder="https://"
                  autoComplete="off"
                />
              </BuilderFormField>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0">
            <div>
              <CardTitle className="text-base">갤러리 이미지 URL</CardTitle>
              <CardDescription>최대 6장. 비운 칸은 미리보기에서 생략됩니다.</CardDescription>
            </div>
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="shrink-0 gap-1"
              onClick={addGalleryRow}
              disabled={data.galleryImageUrls.length >= 6}
            >
              <Plus className="size-3.5" aria-hidden />
              URL 추가
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.galleryImageUrls.length === 0 ? (
              <p className="text-sm text-muted-foreground">이미지가 없으면 그라데이션 영역이 표시됩니다.</p>
            ) : null}
            {data.galleryImageUrls.map((url, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  aria-label={`갤러리 이미지 ${index + 1}`}
                  value={url}
                  onChange={(e) => patchGallery(index, e.target.value)}
                  placeholder="https://..."
                  className="min-w-0 flex-1"
                  autoComplete="off"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="shrink-0 text-muted-foreground hover:text-destructive"
                  onClick={() => removeGalleryRow(index)}
                  aria-label={`갤러리 ${index + 1} 삭제`}
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0">
            <div>
              <CardTitle className="text-base">스펙</CardTitle>
              <CardDescription>최소 1행, 최대 12행입니다.</CardDescription>
            </div>
            <Button type="button" size="sm" variant="outline" className="shrink-0 gap-1" onClick={addSpec}>
              <Plus className="size-3.5" aria-hidden />
              추가
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.specs.map((row, index) => (
              <div
                key={index}
                className="space-y-3 rounded-xl border border-border/80 bg-muted/20 p-4"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-medium text-muted-foreground">행 {index + 1}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-xs"
                    className="text-muted-foreground hover:text-destructive"
                    onClick={() => removeSpec(index)}
                    disabled={data.specs.length <= 1}
                    aria-label={`스펙 ${index + 1} 삭제`}
                  >
                    <Trash2 className="size-3.5" />
                  </Button>
                </div>
                <BuilderFormField id={`spec-l-${index}`} label="라벨">
                  <Input
                    id={`spec-l-${index}`}
                    value={row.label}
                    onChange={(e) => patchSpec(index, { label: e.target.value })}
                    autoComplete="off"
                  />
                </BuilderFormField>
                <BuilderFormField id={`spec-v-${index}`} label="값">
                  <Input
                    id={`spec-v-${index}`}
                    value={row.value}
                    onChange={(e) => patchSpec(index, { value: e.target.value })}
                    autoComplete="off"
                  />
                </BuilderFormField>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0">
            <div>
              <CardTitle className="text-base">FAQ</CardTitle>
              <CardDescription>선택 사항입니다. 비워도 저장 스키마는 통과합니다.</CardDescription>
            </div>
            <Button type="button" size="sm" variant="outline" className="shrink-0 gap-1" onClick={addFaq}>
              <Plus className="size-3.5" aria-hidden />
              추가
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.faq.length === 0 ? (
              <p className="text-sm text-muted-foreground">FAQ가 없으면 미리보기에서 FAQ 섹션이 숨겨집니다.</p>
            ) : null}
            {data.faq.map((item, index) => (
              <div
                key={index}
                className="space-y-3 rounded-xl border border-border/80 bg-muted/20 p-4"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-medium text-muted-foreground">FAQ {index + 1}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-xs"
                    className="text-muted-foreground hover:text-destructive"
                    onClick={() => removeFaq(index)}
                    aria-label={`FAQ ${index + 1} 삭제`}
                  >
                    <Trash2 className="size-3.5" />
                  </Button>
                </div>
                <BuilderFormField id={`faq-q-${index}`} label="질문">
                  <Input
                    id={`faq-q-${index}`}
                    value={item.q}
                    onChange={(e) => patchFaq(index, { q: e.target.value })}
                    autoComplete="off"
                  />
                </BuilderFormField>
                <BuilderFormField id={`faq-a-${index}`} label="답변">
                  <Textarea
                    id={`faq-a-${index}`}
                    value={item.a}
                    onChange={(e) => patchFaq(index, { a: e.target.value })}
                    rows={2}
                  />
                </BuilderFormField>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">브랜드 · 회사 정보</CardTitle>
            <CardDescription>웹 미리보기 하단 푸터에 표시됩니다.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <BuilderFormField id="brandName" label="브랜드/회사명">
              <Input id="brandName" value={data.brandName} onChange={(e) => patch({ brandName: e.target.value })} />
            </BuilderFormField>
            <BuilderFormField id="brandTagline" label="브랜드 태그라인">
              <Input id="brandTagline" value={data.brandTagline} onChange={(e) => patch({ brandTagline: e.target.value })} />
            </BuilderFormField>
            <BuilderFormField id="brandDescription" label="회사 소개">
              <Textarea
                id="brandDescription"
                value={data.brandDescription}
                onChange={(e) => patch({ brandDescription: e.target.value })}
                rows={3}
              />
            </BuilderFormField>
            <BuilderFormField id="brandLogoUrl" label="로고 URL">
              <Input id="brandLogoUrl" value={data.brandLogoUrl} onChange={(e) => patch({ brandLogoUrl: e.target.value })} placeholder="https://" />
            </BuilderFormField>
            <div className="grid gap-4 sm:grid-cols-2">
              <BuilderFormField id="brandEmail" label="이메일">
                <Input id="brandEmail" value={data.brandEmail} onChange={(e) => patch({ brandEmail: e.target.value })} />
              </BuilderFormField>
              <BuilderFormField id="brandPhone" label="전화">
                <Input id="brandPhone" value={data.brandPhone} onChange={(e) => patch({ brandPhone: e.target.value })} />
              </BuilderFormField>
            </div>
            <BuilderFormField id="brandAddress" label="주소">
              <Textarea id="brandAddress" value={data.brandAddress} onChange={(e) => patch({ brandAddress: e.target.value })} rows={2} />
            </BuilderFormField>
          </CardContent>
        </Card>
      </div>

      <PreviewFrame className="lg:min-w-0 lg:flex-1">
        <BuilderThemedPreview categoryId="product" variantId={variantId}>
          <ProductTemplatePreview data={data} variant={productVariant} layout={target} />
        </BuilderThemedPreview>
      </PreviewFrame>
    </div>
  )
}
