# 진행 기록 (Progress)

> 최종 갱신: 2026-05-13

## MVP 로드맵 (S1–S9)

| 단계 | 내용 | 상태 |
|------|------|------|
| S1 | Vite·React·TS·Tailwind·경로 별칭 | 완료 |
| S2 | shadcn/ui·테마·다크 모드 | 완료 |
| S3 | 라우팅·템플릿 선택·빌더 셸 | 완료 |
| S4 | Company 스키마·폼·미리보기 | 완료 |
| S5 | Product·Wedding 동일 패턴 | 완료 |
| S6 | `renderToString` + 단일 `index.html` 보내기 | 완료 |
| S7 | JSZip 기반 ZIP 보내기 | 완료 |
| S8 | Framer Motion(템플릿 그리드·빌더 전환) | 완료 |
| S9 | 빌드·lint·문서 | 완료 |

## S6–S7 아키텍처 결정

- **HTML**: `react-dom/server`의 `renderToString`으로 미리보기와 동일한 React 트리를 문자열화하고, `buildStandaloneHtmlDocument`가 `<!DOCTYPE html>` 래퍼와 메타·제목을 붙입니다.
- **스타일**: 앱 번들에 포함된 `@/index.css?inline` 문자열을 `<style>`에 삽입해 **CDN 없이** 열어도 Tailwind·shadcn 토큰이 유지되도록 했습니다. 대가로 **파일 용량이 큼** (프로덕션 JS 청크 ~800KB+ 경고) — 향후 `renderToString`·JSZip **동적 import**로 분리 검토.
- **스타일 이스케이프**: CSS 본문의 `</` 시퀀스가 `</style>`를 끊지 않도록 `build-html-document.ts`에서 이스케이프합니다.
- **ZIP**: `jszip`으로 `index.html` + `README.txt` 생성 후 Blob 다운로드.

## 변경 파일 요약 (S6–S9)

- `src/lib/export/*` — CSS 로드, HTML 래퍼, 다운로드, ZIP, 파일명 정리
- `src/templates/render-export-body.tsx` — 템플릿별 정적 마크업 렌더
- `src/components/builder/ExportToolbar.tsx` — HTML/ZIP UI
- 각 `*BuilderView.tsx` — `ExportToolbar` 연동
- `src/features/template-picker/TemplatePickerPage.tsx`, `BuilderPage.tsx` — Framer Motion
- `src/vite-env.d.ts` — `*?inline` 모듈 선언
- `package.json` — `jszip`, `framer-motion`, `@types/jszip`

## 알려진 기술 부채

1. **번들 크기**: 클라이언트에 `react-dom/server` + 전역 CSS 인라인 + JSZip이 함께 묶여 청크가 큼 → 동적 import·보내기 전용 경량 CSS(Phase B) 권장.
2. **보내기 HTML**: 런타임 테마(`dark`) 변수는 포함되나,보낸 랜딩 본문은 대부분 자체 배경색을 사용.
3. **외부 이미지**: URL만 저장 시 보낸 HTML은 오프라인에서 이미지가 보이지 않을 수 있음(의도된 MVP 한계).

## 확장 E1–E3 (2026-05-13)

| 항목 | 내용 |
|------|------|
| **E1 다중 디자인** | `src/templates/catalog/*` 단일 카탈로그, `VariantPickerPage`, `/build/:categoryId/:variantId`, `LegacyBuildRedirect` |
| **E2 Web/Mobile** | `preview-target-state.ts` + `PreviewTargetProvider`, `use-preview-target`, `PreviewModeToggle`, `PreviewFrame` 폭 분기, `build-html-document`·정적 export에 타깃 메타 |
| **E3 SI 카테고리** | 카페·포트폴리오·이벤트·세미나·스타트업·건설·앱 등 템플릿·빌더 + `CategoryBuilderRouter`, `render-export-body` 분기 |

### 변경·추가 파일 요약 (E1–E3)

- `src/app/routes.tsx`, `src/features/template-picker/*`, `src/features/builder/BuilderPage.tsx`, `CategoryBuilderRouter.tsx`, `LegacyBuildRedirect.tsx`
- `src/templates/catalog/*`, `src/templates/registry.ts`, 변형 지원 `company` / `product` / `wedding` 프리뷰·빌더
- `src/features/builder/preview-target-state.ts`, `preview-target-context.tsx`, `use-preview-target.ts`, `PreviewModeToggle.tsx`
- `src/components/builder/PreviewFrame.tsx`, `ExportToolbar.tsx`, `src/lib/export/build-html-document.ts`, `build-static-export.ts`
- 신규 템플릿·빌더: `templates/cafe`, `portfolio`, `event`, `seminar`, `startup`, `construction`, `app`, `templates/shared/*` 등

`npm run build` · `npm run lint` 통과 확인.

## 다음 작업

- 번들 분리(동적 import), 보내기 Phase B는 기존 기술 부채 항목 유지.
- 추가 요구 시 [`EXTENDED_ROADMAP.md`](./EXTENDED_ROADMAP.md) 4절 이후를 따릅니다.
