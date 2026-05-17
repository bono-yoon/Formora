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
import { EventLikeBuilderSections } from '@/features/builder/shared/event-like-builder-sections'
import { defaultEventPageData } from '@/templates/event/defaults'
import { defaultSeminarPageData } from '@/templates/seminar/defaults'
import { EventLikeTemplatePreview } from '@/templates/shared/EventLikeTemplatePreview'
import { eventDesignFromCatalogId, seminarDesignFromCatalogId } from '@/templates/shared/event-like-design'
import type { EventLikeData } from '@/templates/shared/event-like-schema'
import { eventLikeSchema } from '@/templates/shared/event-like-schema'
import type { TemplateCategoryId } from '@/templates/catalog/types'

type EventLikeBuilderProps = {
  categoryId: 'event' | 'seminar'
  variantId: string
}

export function EventLikeBuilderView({ categoryId, variantId }: EventLikeBuilderProps) {
  const { target } = usePreviewTarget()
  const initial = categoryId === 'seminar' ? defaultSeminarPageData : defaultEventPageData
  const [data, setData] = useState<EventLikeData>(() => structuredClone(initial))
  const parseResult = useMemo(() => eventLikeSchema.safeParse(data), [data])

  function patch(partial: Partial<EventLikeData>) {
    setData((prev) => ({ ...prev, ...partial }))
  }

  function reset() {
    setData(structuredClone(categoryId === 'seminar' ? defaultSeminarPageData : defaultEventPageData))
  }

  function patchHighlight(index: number, partial: Partial<EventLikeData['highlights'][0]>) {
    setData((prev) => {
      const next = [...prev.highlights]
      next[index] = { ...next[index], ...partial }
      return { ...prev, highlights: next }
    })
  }

  function patchSchedule(index: number, partial: Partial<EventLikeData['schedule'][0]>) {
    setData((prev) => {
      const next = [...prev.schedule]
      next[index] = { ...next[index], ...partial }
      return { ...prev, schedule: next }
    })
  }

  function patchSpeaker(index: number, partial: Partial<EventLikeData['speakers'][0]>) {
    setData((prev) => {
      const next = [...prev.speakers]
      next[index] = { ...next[index], ...partial }
      return { ...prev, speakers: next }
    })
  }

  function patchSponsor(index: number, partial: Partial<EventLikeData['sponsors'][0]>) {
    setData((prev) => {
      const next = [...prev.sponsors]
      next[index] = { ...next[index], ...partial }
      return { ...prev, sponsors: next }
    })
  }

  function patchFaq(index: number, partial: Partial<EventLikeData['faqs'][0]>) {
    setData((prev) => {
      const next = [...prev.faqs]
      next[index] = { ...next[index], ...partial }
      return { ...prev, faqs: next }
    })
  }

  const issues = parseResult.success ? [] : parseResult.error.issues
  const eventDesign = eventDesignFromCatalogId(variantId)
  const seminarDesign = seminarDesignFromCatalogId(variantId)

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
              documentTitle={data.eventTitle}
              filenameHint={data.eventTitle}
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
            <CardTitle className="text-base">행사 정보</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <BuilderFormField id="eventTitle" label="행사 제목">
              <Input
                id="eventTitle"
                value={data.eventTitle}
                onChange={(e) => patch({ eventTitle: e.target.value })}
              />
            </BuilderFormField>
            <BuilderFormField id="organizerName" label="주최">
              <Input
                id="organizerName"
                value={data.organizerName}
                onChange={(e) => patch({ organizerName: e.target.value })}
              />
            </BuilderFormField>
            <BuilderFormField id="dateLine" label="일정">
              <Textarea id="dateLine" value={data.dateLine} onChange={(e) => patch({ dateLine: e.target.value })} rows={2} />
            </BuilderFormField>
            <BuilderFormField id="venue" label="장소">
              <Input id="venue" value={data.venue} onChange={(e) => patch({ venue: e.target.value })} />
            </BuilderFormField>
            <BuilderFormField id="description" label="설명">
              <Textarea
                id="description"
                value={data.description}
                onChange={(e) => patch({ description: e.target.value })}
                rows={4}
              />
            </BuilderFormField>
            <BuilderFormField id="ticketUrl" label="티켓 / 등록 URL">
              <Input id="ticketUrl" value={data.ticketUrl} onChange={(e) => patch({ ticketUrl: e.target.value })} />
            </BuilderFormField>
            <BuilderFormField id="heroImageUrl" label="히어로 이미지 URL">
              <Input
                id="heroImageUrl"
                value={data.heroImageUrl}
                onChange={(e) => patch({ heroImageUrl: e.target.value })}
              />
            </BuilderFormField>
          </CardContent>
        </Card>

        <EventLikeBuilderSections
          data={data}
          categoryId={categoryId}
          patchHighlight={patchHighlight}
          addHighlight={() =>
            setData((prev) => ({
              ...prev,
              highlights: [...prev.highlights, { title: '새 하이라이트', description: '' }].slice(0, 8),
            }))
          }
          removeHighlight={(i) => setData((prev) => ({ ...prev, highlights: prev.highlights.filter((_, idx) => idx !== i) }))}
          patchSchedule={patchSchedule}
          addSchedule={() =>
            setData((prev) => ({
              ...prev,
              schedule: [...prev.schedule, { time: '00:00', title: '세션', description: '' }].slice(0, 16),
            }))
          }
          removeSchedule={(i) => setData((prev) => ({ ...prev, schedule: prev.schedule.filter((_, idx) => idx !== i) }))}
          patchSpeaker={patchSpeaker}
          addSpeaker={() =>
            setData((prev) => ({
              ...prev,
              speakers: [...prev.speakers, { name: '연사', role: '', bio: '', photoUrl: '' }].slice(0, 12),
            }))
          }
          removeSpeaker={(i) => setData((prev) => ({ ...prev, speakers: prev.speakers.filter((_, idx) => idx !== i) }))}
          patchSponsor={patchSponsor}
          addSponsor={() =>
            setData((prev) => ({
              ...prev,
              sponsors: [...prev.sponsors, { name: '후원사', logoUrl: '' }].slice(0, 12),
            }))
          }
          removeSponsor={(i) => setData((prev) => ({ ...prev, sponsors: prev.sponsors.filter((_, idx) => idx !== i) }))}
          patchFaq={patchFaq}
          addFaq={() =>
            setData((prev) => ({ ...prev, faqs: [...prev.faqs, { question: '질문', answer: '' }].slice(0, 10) }))
          }
          removeFaq={(i) => setData((prev) => ({ ...prev, faqs: prev.faqs.filter((_, idx) => idx !== i) }))}
        />
      </div>

      <PreviewFrame className="lg:min-w-0 lg:flex-1">
        <EventLikeTemplatePreview
          data={data}
          categoryId={categoryId}
          design={categoryId === 'seminar' ? seminarDesign : eventDesign}
          layout={target}
        />
      </PreviewFrame>
    </div>
  )
}
