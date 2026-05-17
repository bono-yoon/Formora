import { useMemo, useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'

import { ExportToolbar } from '@/components/builder/ExportToolbar'
import { PreviewFrame } from '@/components/builder/PreviewFrame'
import { BuilderFormField } from '@/features/builder/BuilderFormField'
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
import { defaultWeddingPageData } from '@/templates/wedding/defaults'
import { WeddingTemplatePreview } from '@/templates/wedding/WeddingTemplatePreview'
import { weddingVariantFromCatalogId } from '@/templates/wedding/wedding-variant'
import type { WeddingGiftEntry, WeddingPageData } from '@/templates/wedding/schema'
import { weddingPageSchema } from '@/templates/wedding/schema'

export function WeddingBuilderView({ variantId }: { variantId: string }) {
  const [data, setData] = useState<WeddingPageData>(() => structuredClone(defaultWeddingPageData))

  const parseResult = useMemo(() => weddingPageSchema.safeParse(data), [data])

  function patch(partial: Partial<WeddingPageData>) {
    setData((prev) => ({ ...prev, ...partial }))
  }

  function patchGiftEntry(index: number, partial: Partial<WeddingGiftEntry>) {
    setData((prev) => {
      const next = [...prev.giftEntries]
      const row = next[index]
      if (!row) return prev
      next[index] = { ...row, ...partial }
      return { ...prev, giftEntries: next }
    })
  }

  function addGiftEntry() {
    setData((prev) => ({
      ...prev,
      giftEntries: [
        ...prev.giftEntries,
        { sideLabel: '', bankName: '', accountHolder: '', accountNumber: '', transferUrl: '' },
      ].slice(0, 4),
    }))
  }

  function removeGiftEntry(index: number) {
    setData((prev) => ({ ...prev, giftEntries: prev.giftEntries.filter((_, i) => i !== index) }))
  }

  function reset() {
    setData(structuredClone(defaultWeddingPageData))
  }

  const issues = parseResult.success ? [] : parseResult.error.issues
  const weddingVariant = weddingVariantFromCatalogId(variantId)

  return (
    <div className="flex min-w-0 max-w-full flex-1 flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
      <div className="flex w-full min-w-0 flex-col gap-6 lg:max-w-md lg:shrink-0">
        <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <h2 className="text-lg font-semibold tracking-tight">입력</h2>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:justify-end">
            <ExportToolbar
              canExport={parseResult.success}
              categoryId="wedding"
              variantId={variantId}
              data={data}
              documentTitle={data.coupleNames}
              filenameHint={data.coupleNames}
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
            <CardTitle className="text-base">기본 정보</CardTitle>
            <CardDescription>커플 이름, 날짜, 예식장 정보입니다.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <BuilderFormField id="coupleNames" label="커플 이름" hint="예: 민준 · 서연">
              <Input
                id="coupleNames"
                value={data.coupleNames}
                onChange={(e) => patch({ coupleNames: e.target.value })}
                autoComplete="off"
              />
            </BuilderFormField>
            <BuilderFormField id="weddingDate" label="예식 일시" hint="표시용 문자열로 자유롭게 입력">
              <Textarea
                id="weddingDate"
                value={data.weddingDate}
                onChange={(e) => patch({ weddingDate: e.target.value })}
                rows={2}
              />
            </BuilderFormField>
            <BuilderFormField id="venueName" label="예식장 이름">
              <Input
                id="venueName"
                value={data.venueName}
                onChange={(e) => patch({ venueName: e.target.value })}
                autoComplete="off"
              />
            </BuilderFormField>
            <BuilderFormField id="venueAddress" label="주소">
              <Textarea
                id="venueAddress"
                value={data.venueAddress}
                onChange={(e) => patch({ venueAddress: e.target.value })}
                rows={2}
              />
            </BuilderFormField>
            <BuilderFormField id="mapUrl" label="지도 링크" hint="Google Maps 등 전체 URL">
              <Input
                id="mapUrl"
                value={data.mapUrl}
                onChange={(e) => patch({ mapUrl: e.target.value })}
                placeholder="https://"
                autoComplete="off"
              />
            </BuilderFormField>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">축의금 · 관계 표기</CardTitle>
            <CardDescription>
              모든 디자인에서 동일하게 적용됩니다. 계좌 모드에서는 카카오페이 송금 URL을 넣으면 노란 송금 버튼이
              표시됩니다.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <BuilderFormField id="giftHonoreeLine" label="관계 한 줄 (선택)" hint="예: 홍길동 · 김영희의 아들 민준">
              <Input
                id="giftHonoreeLine"
                value={data.giftHonoreeLine}
                onChange={(e) => patch({ giftHonoreeLine: e.target.value })}
                autoComplete="off"
              />
            </BuilderFormField>

            <BuilderFormField id="giftDisplay" label="축의금 블록">
              <select
                id="giftDisplay"
                value={data.giftDisplay}
                onChange={(e) =>
                  patch({ giftDisplay: e.target.value as WeddingPageData['giftDisplay'] })
                }
                className="h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <option value="none">표시 안 함</option>
                <option value="decline_only">사양 멘트만 (계좌 없음)</option>
                <option value="accounts">계좌 · 송금 링크 표시</option>
              </select>
            </BuilderFormField>

            {data.giftDisplay === 'decline_only' ? (
              <BuilderFormField
                id="giftDeclineMessage"
                label="사양 멘트"
                hint="비우면 이 블록은 미리보기에 나오지 않습니다."
              >
                <Textarea
                  id="giftDeclineMessage"
                  value={data.giftDeclineMessage}
                  onChange={(e) => patch({ giftDeclineMessage: e.target.value })}
                  rows={4}
                />
              </BuilderFormField>
            ) : null}

            {data.giftDisplay === 'accounts' ? (
              <>
                <BuilderFormField id="giftHeading" label="블록 제목" hint="예: 마음 전하실 곳">
                  <Input id="giftHeading" value={data.giftHeading} onChange={(e) => patch({ giftHeading: e.target.value })} />
                </BuilderFormField>
                <BuilderFormField id="giftSubNote" label="부가 안내 (선택)">
                  <Textarea
                    id="giftSubNote"
                    value={data.giftSubNote}
                    onChange={(e) => patch({ giftSubNote: e.target.value })}
                    rows={2}
                  />
                </BuilderFormField>

                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium">계좌 목록 (최대 4)</p>
                    <Button type="button" size="sm" variant="outline" className="gap-1" onClick={addGiftEntry} disabled={data.giftEntries.length >= 4}>
                      <Plus className="size-3.5" aria-hidden />
                      추가
                    </Button>
                  </div>
                  {data.giftEntries.map((row, i) => (
                    <div key={i} className="space-y-3 rounded-lg border border-border p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">#{i + 1}</span>
                        <Button type="button" variant="ghost" size="icon" onClick={() => removeGiftEntry(i)}>
                          <Trash2 className="size-4" aria-hidden />
                        </Button>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <BuilderFormField id={`gift-${i}-side`} label="측 라벨 (선택)">
                          <Input
                            id={`gift-${i}-side`}
                            value={row.sideLabel}
                            onChange={(e) => patchGiftEntry(i, { sideLabel: e.target.value })}
                            placeholder="신랑 측"
                          />
                        </BuilderFormField>
                        <BuilderFormField id={`gift-${i}-bank`} label="은행">
                          <Input
                            id={`gift-${i}-bank`}
                            value={row.bankName}
                            onChange={(e) => patchGiftEntry(i, { bankName: e.target.value })}
                          />
                        </BuilderFormField>
                        <BuilderFormField id={`gift-${i}-holder`} label="예금주">
                          <Input
                            id={`gift-${i}-holder`}
                            value={row.accountHolder}
                            onChange={(e) => patchGiftEntry(i, { accountHolder: e.target.value })}
                          />
                        </BuilderFormField>
                        <BuilderFormField id={`gift-${i}-num`} label="계좌번호">
                          <Input
                            id={`gift-${i}-num`}
                            value={row.accountNumber}
                            onChange={(e) => patchGiftEntry(i, { accountNumber: e.target.value })}
                          />
                        </BuilderFormField>
                      </div>
                      <BuilderFormField id={`gift-${i}-url`} label="송금 링크 (선택)" hint="카카오페이 송금 페이지 등">
                        <Input
                          id={`gift-${i}-url`}
                          value={row.transferUrl}
                          onChange={(e) => patchGiftEntry(i, { transferUrl: e.target.value })}
                          placeholder="https://"
                        />
                      </BuilderFormField>
                    </div>
                  ))}
                  {data.giftEntries.length === 0 ? (
                    <p className="text-xs text-muted-foreground">계좌를 추가하면 미리보기에 표시됩니다.</p>
                  ) : null}
                </div>
              </>
            ) : null}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">커버 · 문구</CardTitle>
            <CardDescription>상단 이미지와 인사말, 안내 문구입니다.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <BuilderFormField id="coverImageUrl" label="커버 이미지 URL" hint="비우면 그라데이션 + 이름 오버레이">
              <Input
                id="coverImageUrl"
                value={data.coverImageUrl}
                onChange={(e) => patch({ coverImageUrl: e.target.value })}
                placeholder="https://"
                autoComplete="off"
              />
            </BuilderFormField>
            <BuilderFormField id="message" label="인사말">
              <Textarea
                id="message"
                value={data.message}
                onChange={(e) => patch({ message: e.target.value })}
                rows={5}
              />
            </BuilderFormField>
            <BuilderFormField id="calendarNote" label="하단 안내" hint="예: 도착 시간 안내">
              <Textarea
                id="calendarNote"
                value={data.calendarNote}
                onChange={(e) => patch({ calendarNote: e.target.value })}
                rows={2}
              />
            </BuilderFormField>
          </CardContent>
        </Card>
      </div>

      <PreviewFrame className="lg:min-w-0 lg:flex-1">
        <WeddingTemplatePreview data={data} variant={weddingVariant} />
      </PreviewFrame>
    </div>
  )
}
