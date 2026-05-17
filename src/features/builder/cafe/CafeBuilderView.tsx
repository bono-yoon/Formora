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
import { CafeTemplatePreview } from '@/templates/cafe/CafeTemplatePreview'
import { cafeVariantFromCatalogId } from '@/templates/cafe/cafe-variant'
import { defaultCafePageData } from '@/templates/cafe/defaults'
import type { CafeMenuItem, CafePageData } from '@/templates/cafe/schema'
import { CAFE_MENU_MAX, cafePageSchema } from '@/templates/cafe/schema'

export function CafeBuilderView({ variantId }: { variantId: string }) {
  const { target } = usePreviewTarget()
  const [data, setData] = useState<CafePageData>(() => structuredClone(defaultCafePageData))
  const parseResult = useMemo(() => cafePageSchema.safeParse(data), [data])

  function patch(partial: Partial<CafePageData>) {
    setData((prev) => ({ ...prev, ...partial }))
  }

  function patchMenu(index: number, partial: Partial<CafeMenuItem>) {
    setData((prev) => {
      const next = [...prev.menuItems]
      next[index] = { ...next[index], ...partial }
      return { ...prev, menuItems: next }
    })
  }

  function addMenu() {
    setData((prev) => ({
      ...prev,
      menuItems: [...prev.menuItems, { name: '새 메뉴', price: '', description: '' }].slice(0, CAFE_MENU_MAX),
    }))
  }

  function removeMenu(index: number) {
    setData((prev) => ({ ...prev, menuItems: prev.menuItems.filter((_, i) => i !== index) }))
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
    setData(structuredClone(defaultCafePageData))
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
              categoryId="cafe"
              variantId={variantId}
              data={data}
              documentTitle={data.shopName}
              filenameHint={data.shopName}
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
            <CardTitle className="text-base">매장 · 히어로</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <BuilderFormField id="shopName" label="매장 이름">
              <Input id="shopName" value={data.shopName} onChange={(e) => patch({ shopName: e.target.value })} />
            </BuilderFormField>
            <BuilderFormField id="tagline" label="태그라인">
              <Input id="tagline" value={data.tagline} onChange={(e) => patch({ tagline: e.target.value })} />
            </BuilderFormField>
            <BuilderFormField id="heroTitle" label="히어로 제목">
              <Input id="heroTitle" value={data.heroTitle} onChange={(e) => patch({ heroTitle: e.target.value })} />
            </BuilderFormField>
            <BuilderFormField id="heroText" label="히어로 본문">
              <Textarea id="heroText" value={data.heroText} onChange={(e) => patch({ heroText: e.target.value })} rows={3} />
            </BuilderFormField>
            <BuilderFormField id="heroImageUrl" label="히어로 이미지 URL">
              <Input
                id="heroImageUrl"
                value={data.heroImageUrl}
                onChange={(e) => patch({ heroImageUrl: e.target.value })}
                placeholder="https://"
              />
            </BuilderFormField>
            <div className="grid gap-4 sm:grid-cols-2">
              <BuilderFormField id="reserveLabel" label="예약 버튼 문구">
                <Input
                  id="reserveLabel"
                  value={data.reserveLabel}
                  onChange={(e) => patch({ reserveLabel: e.target.value })}
                />
              </BuilderFormField>
              <BuilderFormField id="reserveUrl" label="예약 링크">
                <Input id="reserveUrl" value={data.reserveUrl} onChange={(e) => patch({ reserveUrl: e.target.value })} />
              </BuilderFormField>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">위치 · 영업</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <BuilderFormField id="address" label="주소">
              <Textarea id="address" value={data.address} onChange={(e) => patch({ address: e.target.value })} rows={2} />
            </BuilderFormField>
            <BuilderFormField id="hours" label="영업 시간">
              <Input id="hours" value={data.hours} onChange={(e) => patch({ hours: e.target.value })} />
            </BuilderFormField>
            <BuilderFormField id="mapUrl" label="지도 URL">
              <Input id="mapUrl" value={data.mapUrl} onChange={(e) => patch({ mapUrl: e.target.value })} />
            </BuilderFormField>
            <div className="grid gap-4 sm:grid-cols-2">
              <BuilderFormField id="amenityParking" label="주차">
                <Input id="amenityParking" value={data.amenityParking} onChange={(e) => patch({ amenityParking: e.target.value })} placeholder="예: 지하 2시간 무료" />
              </BuilderFormField>
              <BuilderFormField id="amenityPets" label="반려동물">
                <Input id="amenityPets" value={data.amenityPets} onChange={(e) => patch({ amenityPets: e.target.value })} placeholder="예: 소형견 동반 가능" />
              </BuilderFormField>
              <BuilderFormField id="amenityWifi" label="와이파이">
                <Input id="amenityWifi" value={data.amenityWifi} onChange={(e) => patch({ amenityWifi: e.target.value })} placeholder="예: 매장 전 구역 무료" />
              </BuilderFormField>
              <BuilderFormField id="amenityAccessibility" label="접근성">
                <Input id="amenityAccessibility" value={data.amenityAccessibility} onChange={(e) => patch({ amenityAccessibility: e.target.value })} />
              </BuilderFormField>
            </div>
            <BuilderFormField id="amenityPayment" label="결제">
              <Input id="amenityPayment" value={data.amenityPayment} onChange={(e) => patch({ amenityPayment: e.target.value })} placeholder="예: 카드 · 간편결제" />
            </BuilderFormField>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0">
            <div>
              <CardTitle className="text-base">메뉴</CardTitle>
              <CardDescription>최대 {CAFE_MENU_MAX}개 · 디자인별로 추천/메뉴판/다단 등 다른 방식</CardDescription>
            </div>
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="shrink-0 gap-1"
              onClick={addMenu}
              disabled={data.menuItems.length >= CAFE_MENU_MAX}
            >
              <Plus className="size-3.5" aria-hidden />
              추가
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.menuItems.map((item, index) => (
              <div key={index} className="space-y-3 rounded-xl border border-border/80 bg-muted/20 p-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-medium text-muted-foreground">메뉴 {index + 1}</span>
                  <Button type="button" variant="ghost" size="icon-xs" onClick={() => removeMenu(index)} aria-label={`메뉴 ${index + 1} 삭제`}>
                    <Trash2 className="size-3.5" />
                  </Button>
                </div>
                <BuilderFormField id={`menu-n-${index}`} label="이름">
                  <Input id={`menu-n-${index}`} value={item.name} onChange={(e) => patchMenu(index, { name: e.target.value })} />
                </BuilderFormField>
                <BuilderFormField id={`menu-p-${index}`} label="가격">
                  <Input id={`menu-p-${index}`} value={item.price} onChange={(e) => patchMenu(index, { price: e.target.value })} />
                </BuilderFormField>
                <BuilderFormField id={`menu-d-${index}`} label="설명">
                  <Textarea id={`menu-d-${index}`} value={item.description} onChange={(e) => patchMenu(index, { description: e.target.value })} rows={2} />
                </BuilderFormField>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0">
            <div>
              <CardTitle className="text-base">매장 갤러리</CardTitle>
              <CardDescription>웹 미리보기 Gallery 섹션 · 최대 6장</CardDescription>
            </div>
            <Button type="button" size="sm" variant="outline" className="shrink-0 gap-1" onClick={addGalleryRow} disabled={data.galleryImageUrls.length >= 6}>
              <Plus className="size-3.5" aria-hidden />
              URL 추가
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.galleryImageUrls.length === 0 ? (
              <p className="text-sm text-muted-foreground">비우면 히어로 이미지로 갤러리를 채웁니다.</p>
            ) : null}
            {data.galleryImageUrls.map((url, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  aria-label={`갤러리 ${index + 1}`}
                  value={url}
                  onChange={(e) => patchGallery(index, e.target.value)}
                  placeholder="https://"
                  className="min-w-0 flex-1"
                />
                <Button type="button" variant="ghost" size="icon" onClick={() => removeGalleryRow(index)} aria-label={`갤러리 ${index + 1} 삭제`}>
                  <Trash2 className="size-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <PreviewFrame className="lg:min-w-0 lg:flex-1">
        <BuilderThemedPreview categoryId="cafe" variantId={variantId}>
          <CafeTemplatePreview data={data} variant={cafeVariantFromCatalogId(variantId)} layout={target} />
        </BuilderThemedPreview>
      </PreviewFrame>
    </div>
  )
}
