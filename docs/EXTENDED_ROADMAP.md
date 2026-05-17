# 확장 로드맵 (Extended roadmap)

> MVP(S1–S9) 완료 이후 적용할 기능과 아키텍처 방향입니다.  
> **1~3절은 2026-05-13 기준 구현 반영됨** — 아래는 설계 원문과 구현 대응 요약입니다.

---

## 1. 다중 디자인 템플릿 시스템

**구현 상태:** `TemplateCategoryId` + 변형 메타는 `src/templates/catalog/categories.ts`의 `TEMPLATE_CATALOG`에 집중. 라우트는 `/templates/:categoryId` → `/build/:categoryId/:variantId`. `/build/:단일id`는 `LegacyBuildRedirect`로 기본 변형 URL로 정규화.

### 목표

- 카테고리(예: `company`) 아래 **여러 디자인 변형**(A/B/C)을 등록하고, 사용자가 **카테고리 → 변형 → 데이터 입력 → 미리보기/보내기** 순으로 진행.

### 데이터 모델 (제안)

- `TemplateCategoryId` (기존 `company` | `product` | `wedding` 확장)
- `DesignVariantId` (예: `company--minimal`, `company--editorial`)
- 공통: 카테고리별 **단일 Zod 스키마**를 유지하고, 변형은 **프레젠테이션만 분기** (스키마 공유로 폼 재사용 극대화).
- 변형 전용 필드가 필요하면 `z.discriminatedUnion` 또는 `variant` 필드를 스키마에 추가.

### 렌더링

- `designRegistry: Record<DesignVariantId, { Preview: FC<{ data }>; ExportBody?: FC<{ data }> }>`  
- 보내기 시 `ExportBody`가 없으면 `Preview`와 동일 컴포넌트 사용.

### 라우팅 (제안)

- `/templates/:categoryId` — 변형 카드 그리드  
- `/build/:categoryId/:variantId` — 기존 빌더 패턴 확장  
- 기존 `/build/company` 등은 **리다이렉트** 또는 기본 변형으로 매핑해 하위 호환.

### 마이그레이션

- 현재 `templates/company/*`를 `templates/company/designs/default/` 등으로 이동하거나, 루트에 두고 registry만 확장해 점진 이행.

---

## 2. Web / Mobile 미리보기·보내기 모드

**구현 상태:** `PreviewTargetProvider` + `usePreviewTarget`(별도 모듈)로 타깃 공유. `PreviewFrame`이 폭·프레임을 분기. 웨딩은 `lockedMobile`로 웹 토글 대신 안내 배지. 보내기 HTML은 `build-html-document` 등에서 루트 `data-export-target` 등으로 반영.

### 목표

- 사용자가 **Web(데스크톱 폭)** vs **Mobile** 타깃을 선택.
- **미리보기 프레임**이 선택에 맞게 뷰포트 폭·프레임 스타일을 변경.
- **보내기 HTML**에 `meta`/최상위 클래스 또는 인라인 래퍼로 타깃을 반영(동일 DOM, 다른 래퍼 클래스로 시뮬레이션 가능).

### 예외

- **Wedding** 템플릿은 **Mobile 전용** (UI에서 Web 선택 비활성화 또는 무시).

### 아키텍처

- `PreviewTarget` = `'web' | 'mobile'` 전역 또는 빌더 로컬 state.
- `components/builder/PreviewFrame`을 **`PreviewShell`**로 일반화: `target`, `children`, `className`.
- 보내기 시 `buildStandaloneHtmlDocument`에 `target` 옵션 추가 → body 래퍼 `data-export-target="mobile"` 등.

### 중복 방지

- 실제 마크업은 **하나**; 래퍼만 타깃별로 바꿔 **렌더 로직 단일화**.

---

## 3. SI 스타일 추가 카테고리

**구현 상태:** 카페·포트폴리오·이벤트·세미나·스타트업·건설·앱 등이 카탈로그에 등록되고 `CategoryBuilderRouter` + `render-export-body.tsx`로 연결. 메타 단일 소스는 `TEMPLATE_CATALOG`(및 `registry`의 `TEMPLATE_LIST` 하위 호환).

### 목표

다음과 같은 **상업용 랜딩 카테고리**를 같은 패턴으로 추가:

- 카페/레스토랑, 포트폴리오, 이벤트 프로모션, 스타트업 소개, 건설/기업 소개, 앱 소개, 세미나/컨퍼런스 등.

### 구현 패턴 (기존과 동일)

각 카테고리마다:

1. `templates/<id>/schema.ts` + `defaults.ts`  
2. `*TemplatePreview.tsx`  
3. `*BuilderView.tsx` + `ExportToolbar`  
4. `render-export-body.tsx`에 분기 한 줄  
5. `templates/registry.ts` 메타데이터 한 줄

### 메타데이터 중앙화

- **현재:** `TEMPLATE_CATALOG`(`src/templates/catalog/categories.ts`)가 피커·라우트·404의 단일 소스. `registry.ts`는 카탈로그 re-export + `TEMPLATE_LIST` / `isTemplateId` 하위 호환.

---

## 4. 문서·품질

- 각 확장 단계마다 `PLAN.md` / `README.md` / 본 `PROGRESS.md` 갱신.
- 대형 청크 완화 시 `docs/PROGRESS.md` 기술 부채 섹션 업데이트.

---

*이 문서는 제품 요구사항에 따라 순서와 범위를 조정할 수 있습니다.*
