# Static Page Builder Platform — MVP 계획서

> 목표: 입력값만으로 클라이언트용 정적 사이트를 빠르게 만들고, HTML 정적 파일과 ZIP으로보내는 도구.
> 기술: React, Vite, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, Lucide React.

## 진행 상황 (2026-05-13)

| 단계 | 상태 | 비고 |
|------|------|------|
| **S1** | 완료 | Vite·React·TS·Tailwind·`@/` 별칭·앱 셸 |
| **S2** | 완료 | shadcn(ui)·`ThemeProvider`·다크 토글·`cn()` |
| **S3** | 완료 | `react-router-dom`: `/`, `/build/:templateId`·`templates/registry`·카드형 템플릿 선택 |
| **S4** | 완료 | Company Zod·폼·실시간 미리보기 |
| **S5** | 완료 | Product·Wedding 폼 + 미리보기 |
| **S6~S9** | 완료 | HTML·ZIP 보내기, Framer Motion, 문서·빌드 |
| **E1** | 완료 | 다중 디자인: `TEMPLATE_CATALOG`·`/templates/:categoryId`·`/build/:categoryId/:variantId`·레거시 `/build/:id` 리다이렉트 |
| **E2** | 완료 | Web/Mobile: `PreviewTargetProvider`·`PreviewFrame`·보내기 `data-export-target`·웨딩 모바일 잠금 |
| **E3** | 완료 | SI 카테고리 확장: 카페·포트폴리오·이벤트·세미나·스타트업·건설·앱 등 + `CategoryBuilderRouter` |

**확장 로드맵(다중 디자인·Web/Mobile·추가 카테고리):** [`docs/EXTENDED_ROADMAP.md`](./docs/EXTENDED_ROADMAP.md)  
**진행·기술 부채 기록:** [`docs/PROGRESS.md`](./docs/PROGRESS.md)

**로컬 테스트:** 프로젝트 루트에서 `npm install` 후 `npm run dev` → 브라우저에서 http://localhost:5173 (또는 터미널에 표시된 URL). 자세한 명령은 [`README.md`](./README.md) 참고.

**구현 메모:** `npx shadcn add` 시 `components.json`의 `aliases`가 `@/...`이면 Windows에서 `@` 폴더가 잘못 생성될 수 있어, 현재 저장소는 `src/components` 등 **절대 `src/` 접두**로 설정함.

---

## 1. 프로젝트 아키텍처

### 1.1 레이어 개요

| 레이어 | 역할 |
|--------|------|
| **App Shell** | 라우팅, 테마(다크 모드), 전역 레이아웃, 토스트 등 |
| **Builder UI** | 템플릿 선택, 폼, 실시간 미리보기,보내기 액션 |
| **Template Registry** | 템플릿 메타데이터(id, 이름, 설명, 썸네일, 폼 스키마 참조) |
| **Template Implementations** | 각 템플릿의 React 뷰 + 해당 템플릿 전용 Zod 스키마/기본값 |
| **State** | URL/로컬 상태로 선택 템플릿 + 폼 데이터; 필요 시 Context로 미리보기 트리 공유 |
| **Export** | 미리보기 DOM 또는 전용 “정적 렌더” 경로에서 HTML 문자열 생성 → 단일 `index.html` 또는 폴더 구조 → ZIP |

### 1.2 데이터 흐름

1. 사용자가 템플릿 선택 → 해당 템플릿의 **기본 폼 값** 로드.
2. 폼 입력 변경 → **단일 소스(state)** 업데이트 → 미리보기 컴포넌트에 props 전달.
3. “보내기” → Export 파이프라인이 동일 props로 HTML 생성 → 다운로드.

### 1.3 MVP 범위 내 의도적 제한

- **백엔드 없음**: 모든 데이터는 클라이언트 메모리 + (선택) `localStorage` 자동 저장.
- **에디터 내 자산 업로드**: MVP에서는 **URL 입력**(이미지·로고 링크) 위주. 파일 업로드(Base64)는 복잡도 증가 시 2차 이터레이션.
- **다국어**: UI는 한국어 또는 영어 중 하나로 통일(구현 시 결정). 템플릿 콘텐츠는 폼 문자열로 처리.

---

## 2. 폴더 구조

```
src/
  app/                    # App 진입, 라우터, providers
    App.tsx
    routes.tsx
    providers/
      ThemeProvider.tsx   # 다크 모드 (class on documentElement)
  components/
    ui/                   # shadcn/ui 생성 컴포넌트
    layout/               # Shell, PageHeader, Container
    builder/              # 빌더 전용: TemplateCard, PreviewPane, ExportToolbar
  features/
    template-picker/      # 템플릿 그리드/선택
    builder/              # 폼 + 미리보기 조합 페이지
  templates/
    registry.ts           # 템플릿 목록 등록
    types.ts              # TemplateDefinition, FormFieldMeta 공통 타입
    company/              # 회사 사이트
      schema.ts
      defaults.ts
      CompanyTemplate.tsx
    product/              # 제품 소개
    wedding/              # 모바일 청첩장
  lib/
    utils.ts              # cn() 등
    export/
      build-static-html.ts
      zip-download.ts
  hooks/
    useMediaQuery.ts      # 모바일 퍼스트 보조
  styles/
    index.css             # Tailwind base
  assets/                 # (선택) 공통 SVG 등
public/
```

**원칙**: `features/`는 화면 단위 조합, `templates/`는 도메인별 콘텐츠·스키마·뷰, `components/ui`는 shadcn만.

---

## 3. 컴포넌트 구조

### 3.1 페이지(라우트) 수준

| 경로 | 설명 |
|------|------|
| `/` | **카테고리** 선택 — 카드 그리드 → `/templates/:categoryId` |
| `/templates/:categoryId` | 해당 카테고리의 **디자인 변형** 선택 → `/build/:categoryId/:variantId` |
| `/build/:categoryId/:variantId` | 폼 + 실시간 미리보기 + 보내기 |
| `/build/:legacyId` | 구 URL(단일 세그먼트) → 카탈로그 기준 기본 변형으로 정규화 |

### 3.2 주요 컴포넌트

- **TemplateGrid / TemplateCard**: 카드 UI, Lucide 아이콘, 선택 시 `/build/:id` 이동.
- **BuilderLayout**: 모바일 퍼스트 — 작은 화면에서는 폼/미리보기 **탭 또는 세로 스택**, 큰 화면에서는 2열(폼 | 미리보기).
- **DynamicFormRenderer**: `TemplateDefinition`의 필드 메타를 순회해 shadcn Input, Textarea, Switch 등 렌더링 (MVP는 수동 매핑 테이블로도 충분).
- **PreviewFrame**: 미리보기 영역 — 스크롤 가능한 “기기 폭” 컨테이너(예: max-width 모바일 프레임)로 감싸 상업용 랜딩 느낌 유지.
- **ExportToolbar**: “HTML보내기”, “ZIP 다운로드” 버튼, 진행/완료 피드백.

### 3.3 템플릿별

각 템플릿은 **하나의 메인 뷰 컴포넌트** + **Zod 스키마** + **defaults**로 구성. 섹션은 내부에서 서브컴포넌트로 분리(예: `HeroSection`, `FooterSection`).

---

## 4. 상태 관리

### 4.1 선택

- **React `useState` + `useReducer`(선택)** 로 빌더 페이지의 `formData` 관리.
- **URL**: `templateId`는 `react-router` 경로 파라미터로 고정.
- **선택적 persistence**: `localStorage` 키 `spb:draft:{templateId}`에 JSON 직렬화 — 새로고침 시 복구(MVP 후반에 추가해도 됨).

### 4.2 테마

- `class` 기반 다크 모드 (`dark` on `html`), `ThemeProvider` + 토글. shadcn `ThemeProvider` 패턴과 정렬.

### 4.3 전역 스토어 라이브러리

- **Zustand/Redux 미사용**(요청: 불필요한 라이브러리 지양). 빌더 범위가 한 페이지이면 Context는 **필요 시에만** 도입(예: 미리보기 깊은 트리로 props drilling이 과할 때).

---

## 5. Export 시스템 설계

### 5.1 목표 산출물

- **단일 페이지 템플릿 기준**: `index.html` + 인라인 또는 단일 `styles.css` (Tailwind 빌드 결과는 Vite가 이미 번들링; **보낸 HTML은 “정적 스냅샷”**).
- **ZIP**: `index.html` + `assets/`(이미지는 외부 URL이면 링크 유지; 로컬 에셋 추가 시에만 폴더에 포함).

### 5.2 HTML 생성 전략 (MVP 권장 순서)

**Phase A (최소 동작)**  
- `react-dom/server`의 `renderToString`으로 템플릿 루트를 **현재 `formData`**로 렌더 → 래퍼 HTML 문자열 조립 (`<!DOCTYPE html>`, `meta viewport`, `title`, 인라인 `<style>` 또는 빌드된 CSS 링크).
- 한계: 클라이언트 전용 API, lazy, 일부 Radix 동작은 제한될 수 있음 → 템플릿은 **보내기 친화적**(순수 마크업 위주, 모션은 선택적으로 export 시 생략 또는 CSS만).

**현재 구현 (2026-05):** `src/templates/render-export-body.tsx` + `src/lib/export/build-html-document.ts`에서 Phase A를 적용. 스타일은 앱 `index.css`를 `?inline`으로 읽어 `<style>`에 삽입(오프라인 우선, 파일 용량 트레이드오프).

**Phase B (품질)**  
- 템플릿별 `exportMode: 'static'` 어댑터로보내기 전용 단순 마크업 분기.

### 5.3 ZIP

- 브라우저 **`JSZip`** (또는 동등 경량 라이브러리 하나만)으로 `index.html` 추가 후 `Blob` 생성 → `file-saver` 대신 **`URL.createObjectURL` + `<a download>`** 로 저장(의존성 최소화).

### 5.4 보안·품질

- 사용자 입력은 React 기본 이스케이프 유지; `dangerouslySetInnerHTML` 사용 금지(템플릿에서도).

---

## 6. 템플릿 데이터 구조

### 6.1 공통 타입 (개념)

```ts
// 개념 스케치 — 실제 구현 시 templates/types.ts 로 이동
type TemplateId = 'company' | 'product' | 'wedding';

interface TemplateDefinition<TData> {
  id: TemplateId;
  name: string;
  description: string;
  icon: string; // lucide 이름 또는 컴포넌트 참조
  schema: ZodSchema<TData>;
  defaultData: TData;
  Preview: React.FC<{ data: TData }>;
}
```

### 6.2 템플릿별 데이터 필드 (MVP 제안)

**Company**  
- `siteName`, `tagline`, `heroTitle`, `heroSubtitle`, `primaryCtaLabel`, `primaryCtaUrl`, `logoUrl`, `heroImageUrl`, `features[]` { title, description }, `contactEmail`, `footerNote`

**Product**  
- `productName`, `oneLiner`, `priceLabel`, `buyUrl`, `galleryImageUrls[]`, `specs[]` { label, value }, `faq[]` { q, a }

**Wedding**  
- `coupleNames`, `weddingDate`, `venueName`, `venueAddress`, `mapUrl`, `message`, `coverImageUrl`, `calendarNote`

모든 필드는 Zod로 검증; 폼 제출/보내기 전 **parse** 실패 시 필드 에러 표시.

### 6.3 Registry

- `templates/registry.ts`에서 `TemplateDefinition[]` export.
- 라우트와 폼은 `templateId`로 registry에서 조회; 존재하지 않으면 404 UI.

---

## 7. 구현 단계 (스텝별, 한 번에 전부 하지 않음)

| 단계 | 내용 | 상태 |
|------|------|------|
| **S1** | Vite + React + TS + Tailwind + path alias; ESLint 기본; 앱 셸만 동작 | 완료 |
| **S2** | shadcn/ui 초기화, ThemeProvider, 다크 모드 토글 | 완료 |
| **S3** | 라우팅(`/`, `/build/:templateId`), 레이아웃(모바일 퍼스트), 템플릿 목록·빌더 플레이스홀더 | 완료 |
| **S4** | Registry + Company 템플릿(폼 + 미리보기) | 완료 |
| **S5** | Product, Wedding 템플릿 추가 | 완료 |
| **S6** | Export: `renderToString` + 인라인 CSS + HTML 다운로드 | 완료 |
| **S7** | JSZip으로 `index.html` + README ZIP | 완료 |
| **S8** | Framer Motion(템플릿 그리드·빌더 전환) | 완료 |
| **S9** | 프로덕션 빌드·lint·README·진행 문서 | 완료 |

각 단계 완료 후: 수행 내용, 수정 파일, 다음 단계를 짧게 요약.

---

## 8. 품질·유지보수 기준

- TypeScript strict 권장; `any` 지양.
- 템플릿 추가 시: `schema` + `defaults` + `Preview` + registry 한 줄 등록.
- 디자인: 넉넉한 패딩, 카드 `rounded-2xl`, 은은한 `shadow-sm`, 전환은 `transition` + Framer Motion **핵심 구간만**.

---

## 9. 다음 액션

1. **품질**: `react-dom/server`·JSZip **동적 import**로 초기/메인 청크 분리 검토.
2. **보내기 Phase B**: 템플릿별 경량 HTML 전용 컴포넌트(선택)로 CSS 페이로드 축소.
3. **확장 로드맵 4절 이후**: [`docs/EXTENDED_ROADMAP.md`](./docs/EXTENDED_ROADMAP.md) 문서·품질 항목 지속 반영.

---

*본 문서는 구현 전 아키텍처·구조 합의용이며, 구현 중 발견되는 현실적 제약(예: SSR export 한계)은 Phase A/B 전략으로 조정한다.*
