import { Plus, Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import type { EventLikeData } from '@/templates/shared/event-like-schema'

type Props = {
  data: EventLikeData
  categoryId: 'event' | 'seminar'
  patchHighlight: (i: number, p: Partial<EventLikeData['highlights'][0]>) => void
  addHighlight: () => void
  removeHighlight: (i: number) => void
  patchSchedule: (i: number, p: Partial<EventLikeData['schedule'][0]>) => void
  addSchedule: () => void
  removeSchedule: (i: number) => void
  patchSpeaker: (i: number, p: Partial<EventLikeData['speakers'][0]>) => void
  addSpeaker: () => void
  removeSpeaker: (i: number) => void
  patchSponsor: (i: number, p: Partial<EventLikeData['sponsors'][0]>) => void
  addSponsor: () => void
  removeSponsor: (i: number) => void
  patchFaq: (i: number, p: Partial<EventLikeData['faqs'][0]>) => void
  addFaq: () => void
  removeFaq: (i: number) => void
}

export function EventLikeBuilderSections({
  data,
  categoryId,
  patchHighlight,
  addHighlight,
  removeHighlight,
  patchSchedule,
  addSchedule,
  removeSchedule,
  patchSpeaker,
  addSpeaker,
  removeSpeaker,
  patchSponsor,
  addSponsor,
  removeSponsor,
  patchFaq,
  addFaq,
  removeFaq,
}: Props) {
  return (
    <>
      {categoryId === 'event' ? (
        <Card>
          <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0">
            <div>
              <CardTitle className="text-base">하이라이트</CardTitle>
              <CardDescription>웹 미리보기에 카드/리본으로 표시됩니다.</CardDescription>
            </div>
            <Button type="button" size="sm" variant="outline" className="gap-1" onClick={addHighlight}>
              <Plus className="size-3.5" aria-hidden />
              추가
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.highlights.map((item, index) => (
              <div key={index} className="space-y-2 rounded-lg border border-border/60 p-3">
                <div className="flex gap-2">
                  <Input
                    value={item.title}
                    onChange={(e) => patchHighlight(index, { title: e.target.value })}
                    placeholder="제목"
                    className="min-w-0 flex-1"
                  />
                  <Button type="button" variant="ghost" size="icon" onClick={() => removeHighlight(index)}>
                    <Trash2 className="size-4" />
                  </Button>
                </div>
                <Textarea
                  value={item.description}
                  onChange={(e) => patchHighlight(index, { description: e.target.value })}
                  rows={2}
                  placeholder="설명"
                />
              </div>
            ))}
          </CardContent>
        </Card>
      ) : null}

      {categoryId === 'seminar' ? (
        <Card>
          <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0">
            <div>
              <CardTitle className="text-base">연사</CardTitle>
              <CardDescription>이름·역할·사진 URL·소개</CardDescription>
            </div>
            <Button type="button" size="sm" variant="outline" className="gap-1" onClick={addSpeaker}>
              <Plus className="size-3.5" aria-hidden />
              추가
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.speakers.map((item, index) => (
              <div key={index} className="space-y-2 rounded-lg border border-border/60 p-3">
                <div className="flex gap-2">
                  <Input
                    value={item.name}
                    onChange={(e) => patchSpeaker(index, { name: e.target.value })}
                    placeholder="이름"
                    className="min-w-0 flex-1"
                  />
                  <Button type="button" variant="ghost" size="icon" onClick={() => removeSpeaker(index)}>
                    <Trash2 className="size-4" />
                  </Button>
                </div>
                <Input value={item.role} onChange={(e) => patchSpeaker(index, { role: e.target.value })} placeholder="역할" />
                <Input
                  value={item.photoUrl}
                  onChange={(e) => patchSpeaker(index, { photoUrl: e.target.value })}
                  placeholder="사진 URL"
                />
                <Textarea
                  value={item.bio}
                  onChange={(e) => patchSpeaker(index, { bio: e.target.value })}
                  rows={2}
                  placeholder="소개"
                />
              </div>
            ))}
          </CardContent>
        </Card>
      ) : null}

      <Card>
        <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0">
          <CardTitle className="text-base">프로그램 · 일정</CardTitle>
          <Button type="button" size="sm" variant="outline" className="gap-1" onClick={addSchedule}>
            <Plus className="size-3.5" aria-hidden />
            추가
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {data.schedule.map((item, index) => (
            <div key={index} className="space-y-2 rounded-lg border border-border/60 p-3">
              <div className="flex gap-2">
                <Input
                  value={item.time}
                  onChange={(e) => patchSchedule(index, { time: e.target.value })}
                  placeholder="시간"
                  className="w-24 shrink-0"
                />
                <Input
                  value={item.title}
                  onChange={(e) => patchSchedule(index, { title: e.target.value })}
                  placeholder="제목"
                  className="min-w-0 flex-1"
                />
                <Button type="button" variant="ghost" size="icon" onClick={() => removeSchedule(index)}>
                  <Trash2 className="size-4" />
                </Button>
              </div>
              <Textarea
                value={item.description}
                onChange={(e) => patchSchedule(index, { description: e.target.value })}
                rows={2}
                placeholder="설명"
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0">
          <div>
            <CardTitle className="text-base">후원 · 협력</CardTitle>
            <CardDescription>로고 URL을 넣으면 마크로 표시됩니다.</CardDescription>
          </div>
          <Button type="button" size="sm" variant="outline" className="gap-1" onClick={addSponsor}>
            <Plus className="size-3.5" aria-hidden />
            추가
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {data.sponsors.map((item, index) => (
            <div key={index} className="space-y-2 rounded-lg border border-border/60 p-3">
              <div className="flex gap-2">
                <Input
                  value={item.name}
                  onChange={(e) => patchSponsor(index, { name: e.target.value })}
                  placeholder="이름"
                  className="min-w-0 flex-1"
                />
                <Button type="button" variant="ghost" size="icon" onClick={() => removeSponsor(index)}>
                  <Trash2 className="size-4" />
                </Button>
              </div>
              <Input
                value={item.logoUrl}
                onChange={(e) => patchSponsor(index, { logoUrl: e.target.value })}
                placeholder="로고 URL"
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0">
          <CardTitle className="text-base">FAQ</CardTitle>
          <Button type="button" size="sm" variant="outline" className="gap-1" onClick={addFaq}>
            <Plus className="size-3.5" aria-hidden />
            추가
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {data.faqs.map((item, index) => (
            <div key={index} className="space-y-2 rounded-lg border border-border/60 p-3">
              <div className="flex gap-2">
                <Input
                  value={item.question}
                  onChange={(e) => patchFaq(index, { question: e.target.value })}
                  placeholder="질문"
                  className="min-w-0 flex-1"
                />
                <Button type="button" variant="ghost" size="icon" onClick={() => removeFaq(index)}>
                  <Trash2 className="size-4" />
                </Button>
              </div>
              <Textarea
                value={item.answer}
                onChange={(e) => patchFaq(index, { answer: e.target.value })}
                rows={2}
                placeholder="답변"
              />
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  )
}
