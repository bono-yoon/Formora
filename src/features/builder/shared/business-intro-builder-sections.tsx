import { Plus, Trash2 } from 'lucide-react'
import type { Dispatch, SetStateAction } from 'react'

import { BuilderFormField } from '@/features/builder/BuilderFormField'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import type { BusinessIntroData } from '@/templates/shared/business-intro-schema'

type CategoryId = 'startup' | 'construction' | 'app'

type Props = {
  categoryId: CategoryId
  data: BusinessIntroData
  setData: Dispatch<SetStateAction<BusinessIntroData>>
}

export function BusinessIntroBuilderSections({ categoryId, data, setData }: Props) {
  if (categoryId === 'startup') {
    return (
      <>
        <MetricsEditor data={data} setData={setData} />
        <TrustedLogosEditor data={data} setData={setData} />
        <FeatureCardsEditor data={data} setData={setData} />
      </>
    )
  }

  if (categoryId === 'construction') {
    return (
      <>
        <ProjectsEditor data={data} setData={setData} />
        <GalleryEditor data={data} setData={setData} />
        <CertsEditor data={data} setData={setData} />
      </>
    )
  }

  return (
    <>
      <ScreenshotsEditor data={data} setData={setData} />
      <FeatureCardsEditor data={data} setData={setData} />
      <Card>
        <CardHeader>
          <CardTitle className="text-base">??? ??</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <BuilderFormField id="appStoreUrl" label="App Store URL">
            <Input
              id="appStoreUrl"
              value={data.appStoreUrl}
              onChange={(e) => setData((prev) => ({ ...prev, appStoreUrl: e.target.value }))}
            />
          </BuilderFormField>
          <BuilderFormField id="playStoreUrl" label="Google Play URL">
            <Input
              id="playStoreUrl"
              value={data.playStoreUrl}
              onChange={(e) => setData((prev) => ({ ...prev, playStoreUrl: e.target.value }))}
            />
          </BuilderFormField>
        </CardContent>
      </Card>
    </>
  )
}

function MetricsEditor({
  data,
  setData,
}: {
  data: BusinessIntroData
  setData: Dispatch<SetStateAction<BusinessIntroData>>
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0">
        <div>
          <CardTitle className="text-base">?? ??</CardTitle>
          <CardDescription>? ???? ?? ??</CardDescription>
        </div>
        <Button
          type="button"
          size="sm"
          variant="outline"
          className="gap-1"
          onClick={() =>
            setData((prev) => ({
              ...prev,
              metrics: [...prev.metrics, { value: '0', label: '??' }].slice(0, 6),
            }))
          }
        >
          <Plus className="size-3.5" aria-hidden />
          ??
        </Button>
      </CardHeader>
      <CardContent className="space-y-2">
        {data.metrics.map((m, i) => (
          <div key={i} className="flex gap-2">
            <Input
              value={m.value}
              onChange={(e) => {
                const next = [...data.metrics]
                next[i] = { ...next[i], value: e.target.value }
                setData((prev) => ({ ...prev, metrics: next }))
              }}
              placeholder="?"
              className="w-24"
            />
            <Input
              value={m.label}
              onChange={(e) => {
                const next = [...data.metrics]
                next[i] = { ...next[i], label: e.target.value }
                setData((prev) => ({ ...prev, metrics: next }))
              }}
              placeholder="??"
              className="min-w-0 flex-1"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setData((prev) => ({ ...prev, metrics: prev.metrics.filter((_, idx) => idx !== i) }))}
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function TrustedLogosEditor({
  data,
  setData,
}: {
  data: BusinessIntroData
  setData: Dispatch<SetStateAction<BusinessIntroData>>
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0">
        <CardTitle className="text-base">??? ??</CardTitle>
        <Button
          type="button"
          size="sm"
          variant="outline"
          className="gap-1"
          onClick={() =>
            setData((prev) => ({
              ...prev,
              trustedLogos: [...prev.trustedLogos, { name: '???', logoUrl: '' }].slice(0, 12),
            }))
          }
        >
          <Plus className="size-3.5" aria-hidden />
          ??
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {data.trustedLogos.map((item, i) => (
          <div key={i} className="space-y-2 rounded-lg border border-border/60 p-3">
            <div className="flex gap-2">
              <Input
                value={item.name}
                onChange={(e) => {
                  const next = [...data.trustedLogos]
                  next[i] = { ...next[i], name: e.target.value }
                  setData((prev) => ({ ...prev, trustedLogos: next }))
                }}
                className="min-w-0 flex-1"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setData((prev) => ({ ...prev, trustedLogos: prev.trustedLogos.filter((_, idx) => idx !== i) }))}
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
            <Input
              value={item.logoUrl}
              onChange={(e) => {
                const next = [...data.trustedLogos]
                next[i] = { ...next[i], logoUrl: e.target.value }
                setData((prev) => ({ ...prev, trustedLogos: next }))
              }}
              placeholder="?? URL"
            />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function FeatureCardsEditor({
  data,
  setData,
}: {
  data: BusinessIntroData
  setData: Dispatch<SetStateAction<BusinessIntroData>>
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0">
        <CardTitle className="text-base">?? ??</CardTitle>
        <Button
          type="button"
          size="sm"
          variant="outline"
          className="gap-1"
          onClick={() =>
            setData((prev) => ({
              ...prev,
              featureCards: [...prev.featureCards, { title: '??', description: '' }].slice(0, 8),
            }))
          }
        >
          <Plus className="size-3.5" aria-hidden />
          ??
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {data.featureCards.map((f, i) => (
          <div key={i} className="space-y-2 rounded-lg border border-border/60 p-3">
            <div className="flex gap-2">
              <Input
                value={f.title}
                onChange={(e) => {
                  const next = [...data.featureCards]
                  next[i] = { ...next[i], title: e.target.value }
                  setData((prev) => ({ ...prev, featureCards: next }))
                }}
                placeholder="??"
                className="min-w-0 flex-1"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setData((prev) => ({ ...prev, featureCards: prev.featureCards.filter((_, idx) => idx !== i) }))}
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
            <Textarea
              value={f.description}
              onChange={(e) => {
                const next = [...data.featureCards]
                next[i] = { ...next[i], description: e.target.value }
                setData((prev) => ({ ...prev, featureCards: next }))
              }}
              rows={2}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function ProjectsEditor({
  data,
  setData,
}: {
  data: BusinessIntroData
  setData: Dispatch<SetStateAction<BusinessIntroData>>
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0">
        <CardTitle className="text-base">?? ??</CardTitle>
        <Button
          type="button"
          size="sm"
          variant="outline"
          className="gap-1"
          onClick={() =>
            setData((prev) => ({
              ...prev,
              projects: [...prev.projects, { title: '????', description: '', year: '', imageUrl: '' }].slice(0, 8),
            }))
          }
        >
          <Plus className="size-3.5" aria-hidden />
          ??
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {data.projects.map((p, i) => (
          <div key={i} className="space-y-2 rounded-lg border border-border/60 p-3">
            <div className="flex gap-2">
              <Input
                value={p.title}
                onChange={(e) => {
                  const next = [...data.projects]
                  next[i] = { ...next[i], title: e.target.value }
                  setData((prev) => ({ ...prev, projects: next }))
                }}
                className="min-w-0 flex-1"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setData((prev) => ({ ...prev, projects: prev.projects.filter((_, idx) => idx !== i) }))}
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              <Input
                value={p.year}
                onChange={(e) => {
                  const next = [...data.projects]
                  next[i] = { ...next[i], year: e.target.value }
                  setData((prev) => ({ ...prev, projects: next }))
                }}
                placeholder="??"
              />
              <Input
                value={p.imageUrl}
                onChange={(e) => {
                  const next = [...data.projects]
                  next[i] = { ...next[i], imageUrl: e.target.value }
                  setData((prev) => ({ ...prev, projects: next }))
                }}
                placeholder="??? URL"
              />
            </div>
            <Textarea
              value={p.description}
              onChange={(e) => {
                const next = [...data.projects]
                next[i] = { ...next[i], description: e.target.value }
                setData((prev) => ({ ...prev, projects: next }))
              }}
              rows={2}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function GalleryEditor({
  data,
  setData,
}: {
  data: BusinessIntroData
  setData: Dispatch<SetStateAction<BusinessIntroData>>
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0">
        <CardTitle className="text-base">?? ???</CardTitle>
        <Button
          type="button"
          size="sm"
          variant="outline"
          className="gap-1"
          disabled={data.galleryImageUrls.length >= 6}
          onClick={() => setData((prev) => ({ ...prev, galleryImageUrls: [...prev.galleryImageUrls, ''] }))}
        >
          <Plus className="size-3.5" aria-hidden />
          ??
        </Button>
      </CardHeader>
      <CardContent className="space-y-2">
        {data.galleryImageUrls.map((url, i) => (
          <div key={i} className="flex gap-2">
            <Input
              value={url}
              onChange={(e) => {
                const next = [...data.galleryImageUrls]
                next[i] = e.target.value
                setData((prev) => ({ ...prev, galleryImageUrls: next }))
              }}
              placeholder="??? URL"
              className="min-w-0 flex-1"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() =>
                setData((prev) => ({ ...prev, galleryImageUrls: prev.galleryImageUrls.filter((_, idx) => idx !== i) }))
              }
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function CertsEditor({
  data,
  setData,
}: {
  data: BusinessIntroData
  setData: Dispatch<SetStateAction<BusinessIntroData>>
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0">
        <CardTitle className="text-base">?? ? ??</CardTitle>
        <Button
          type="button"
          size="sm"
          variant="outline"
          className="gap-1"
          onClick={() =>
            setData((prev) => ({
              ...prev,
              certifications: [...prev.certifications, { title: '??', issuer: '' }].slice(0, 10),
            }))
          }
        >
          <Plus className="size-3.5" aria-hidden />
          ??
        </Button>
      </CardHeader>
      <CardContent className="space-y-2">
        {data.certifications.map((c, i) => (
          <div key={i} className="flex gap-2">
            <Input
              value={c.title}
              onChange={(e) => {
                const next = [...data.certifications]
                next[i] = { ...next[i], title: e.target.value }
                setData((prev) => ({ ...prev, certifications: next }))
              }}
              placeholder="???"
              className="min-w-0 flex-1"
            />
            <Input
              value={c.issuer}
              onChange={(e) => {
                const next = [...data.certifications]
                next[i] = { ...next[i], issuer: e.target.value }
                setData((prev) => ({ ...prev, certifications: next }))
              }}
              placeholder="???"
              className="min-w-0 flex-1"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() =>
                setData((prev) => ({ ...prev, certifications: prev.certifications.filter((_, idx) => idx !== i) }))
              }
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function ScreenshotsEditor({
  data,
  setData,
}: {
  data: BusinessIntroData
  setData: Dispatch<SetStateAction<BusinessIntroData>>
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0">
        <CardTitle className="text-base">????</CardTitle>
        <Button
          type="button"
          size="sm"
          variant="outline"
          className="gap-1"
          disabled={data.screenshots.length >= 6}
          onClick={() => setData((prev) => ({ ...prev, screenshots: [...prev.screenshots, { url: '', caption: '' }] }))}
        >
          <Plus className="size-3.5" aria-hidden />
          ??
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {data.screenshots.map((shot, i) => (
          <div key={i} className="space-y-2 rounded-lg border border-border/60 p-3">
            <div className="flex gap-2">
              <Input
                value={shot.url}
                onChange={(e) => {
                  const next = [...data.screenshots]
                  next[i] = { ...next[i], url: e.target.value }
                  setData((prev) => ({ ...prev, screenshots: next }))
                }}
                placeholder="??? URL"
                className="min-w-0 flex-1"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setData((prev) => ({ ...prev, screenshots: prev.screenshots.filter((_, idx) => idx !== i) }))}
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
            <Input
              value={shot.caption}
              onChange={(e) => {
                const next = [...data.screenshots]
                next[i] = { ...next[i], caption: e.target.value }
                setData((prev) => ({ ...prev, screenshots: next }))
              }}
              placeholder="??"
            />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
