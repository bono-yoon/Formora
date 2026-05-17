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
import { defaultPortfolioPageData } from '@/templates/portfolio/defaults'
import { PortfolioTemplatePreview } from '@/templates/portfolio/PortfolioTemplatePreview'
import { portfolioVariantFromCatalogId } from '@/templates/portfolio/portfolio-variant'
import type { PortfolioPageData, PortfolioProject, PortfolioSkill, PortfolioTestimonial } from '@/templates/portfolio/schema'
import { portfolioPageSchema } from '@/templates/portfolio/schema'

export function PortfolioBuilderView({ variantId }: { variantId: string }) {
  const { target } = usePreviewTarget()
  const [data, setData] = useState<PortfolioPageData>(() => structuredClone(defaultPortfolioPageData))
  const parseResult = useMemo(() => portfolioPageSchema.safeParse(data), [data])

  function patch(partial: Partial<PortfolioPageData>) {
    setData((prev) => ({ ...prev, ...partial }))
  }

  function reset() {
    setData(structuredClone(defaultPortfolioPageData))
  }

  function patchProject(index: number, partial: Partial<PortfolioProject>) {
    setData((prev) => {
      const next = [...prev.projects]
      next[index] = { ...next[index], ...partial }
      return { ...prev, projects: next }
    })
  }

  function patchSkill(index: number, partial: Partial<PortfolioSkill>) {
    setData((prev) => {
      const next = [...prev.skills]
      next[index] = { ...next[index], ...partial }
      return { ...prev, skills: next }
    })
  }

  function patchTestimonial(index: number, partial: Partial<PortfolioTestimonial>) {
    setData((prev) => {
      const next = [...prev.testimonials]
      next[index] = { ...next[index], ...partial }
      return { ...prev, testimonials: next }
    })
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
              categoryId="portfolio"
              variantId={variantId}
              data={data}
              documentTitle={data.displayName}
              filenameHint={data.displayName}
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
            <CardTitle className="text-base">프로필</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <BuilderFormField id="displayName" label="이름">
              <Input
                id="displayName"
                value={data.displayName}
                onChange={(e) => patch({ displayName: e.target.value })}
              />
            </BuilderFormField>
            <BuilderFormField id="role" label="역할 / 직함">
              <Input id="role" value={data.role} onChange={(e) => patch({ role: e.target.value })} />
            </BuilderFormField>
            <BuilderFormField id="skillLine" label="스킬 한 줄">
              <Input id="skillLine" value={data.skillLine} onChange={(e) => patch({ skillLine: e.target.value })} />
            </BuilderFormField>
            <BuilderFormField id="bio" label="소개">
              <Textarea id="bio" value={data.bio} onChange={(e) => patch({ bio: e.target.value })} rows={4} />
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

        <Card>
          <CardHeader>
            <CardTitle className="text-base">대표 작업</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <BuilderFormField id="projectTitle" label="프로젝트 제목">
              <Input
                id="projectTitle"
                value={data.projectTitle}
                onChange={(e) => patch({ projectTitle: e.target.value })}
              />
            </BuilderFormField>
            <BuilderFormField id="projectUrl" label="프로젝트 URL">
              <Input id="projectUrl" value={data.projectUrl} onChange={(e) => patch({ projectUrl: e.target.value })} />
            </BuilderFormField>
            <BuilderFormField id="email" label="이메일">
              <Input id="email" value={data.email} onChange={(e) => patch({ email: e.target.value })} />
            </BuilderFormField>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0">
            <div>
              <CardTitle className="text-base">프로젝트</CardTitle>
              <CardDescription>웹 미리보기 작업 목록·그리드</CardDescription>
            </div>
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="gap-1"
              onClick={() =>
                setData((prev) => ({
                  ...prev,
                  projects: [
                    ...prev.projects,
                    { title: '새 프로젝트', role: '', description: '', imageUrl: '', projectUrl: '#' },
                  ].slice(0, 8),
                }))
              }
            >
              <Plus className="size-3.5" aria-hidden />
              추가
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.projects.map((item, index) => (
              <div key={index} className="space-y-2 rounded-lg border border-border/60 p-3">
                <div className="flex gap-2">
                  <Input
                    value={item.title}
                    onChange={(e) => patchProject(index, { title: e.target.value })}
                    placeholder="제목"
                    className="min-w-0 flex-1"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setData((prev) => ({ ...prev, projects: prev.projects.filter((_, i) => i !== index) }))}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
                <Input value={item.role} onChange={(e) => patchProject(index, { role: e.target.value })} placeholder="역할" />
                <Textarea
                  value={item.description}
                  onChange={(e) => patchProject(index, { description: e.target.value })}
                  rows={2}
                />
                <Input
                  value={item.imageUrl}
                  onChange={(e) => patchProject(index, { imageUrl: e.target.value })}
                  placeholder="썸네일 URL"
                />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0">
            <CardTitle className="text-base">스킬</CardTitle>
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="gap-1"
              onClick={() => setData((prev) => ({ ...prev, skills: [...prev.skills, { name: '스킬' }].slice(0, 16) }))}
            >
              <Plus className="size-3.5" aria-hidden />
              추가
            </Button>
          </CardHeader>
          <CardContent className="space-y-2">
            {data.skills.map((item, index) => (
              <div key={index} className="flex gap-2">
                <Input value={item.name} onChange={(e) => patchSkill(index, { name: e.target.value })} className="min-w-0 flex-1" />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setData((prev) => ({ ...prev, skills: prev.skills.filter((_, i) => i !== index) }))}
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0">
            <CardTitle className="text-base">추천사</CardTitle>
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="gap-1"
              onClick={() =>
                setData((prev) => ({
                  ...prev,
                  testimonials: [...prev.testimonials, { quote: '추천 문구', author: '', role: '' }].slice(0, 6),
                }))
              }
            >
              <Plus className="size-3.5" aria-hidden />
              추가
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.testimonials.map((item, index) => (
              <div key={index} className="space-y-2 rounded-lg border border-border/60 p-3">
                <Textarea value={item.quote} onChange={(e) => patchTestimonial(index, { quote: e.target.value })} rows={2} />
                <div className="grid gap-2 sm:grid-cols-2">
                  <Input value={item.author} onChange={(e) => patchTestimonial(index, { author: e.target.value })} placeholder="이름" />
                  <Input value={item.role} onChange={(e) => patchTestimonial(index, { role: e.target.value })} placeholder="직함" />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setData((prev) => ({ ...prev, testimonials: prev.testimonials.filter((_, i) => i !== index) }))}
                >
                  삭제
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <PreviewFrame className="lg:min-w-0 lg:flex-1">
        <BuilderThemedPreview categoryId="portfolio" variantId={variantId}>
          <PortfolioTemplatePreview data={data} variant={portfolioVariantFromCatalogId(variantId)} layout={target} />
        </BuilderThemedPreview>
      </PreviewFrame>
    </div>
  )
}
