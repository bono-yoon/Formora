# 대표 컬러 (Theme Colors)

## 개요

- 변형(디자인)마다 **3~5개** 슬롯: `primary`, `secondary`, `accent`, (선택) `surface`, `text`
- 기본값: `src/templates/theme/variant-themes.ts`
- 빌더에서 hex 입력·컬러 피커·프리셋 팔레트로 변경
- 미리보기 루트에 CSS 변수 `--formora-{slotId}` 주입 (`PreviewThemeRoot`)

## 빌더 UI

- `ThemeColorPanel` — `BuilderPage` 상단 (웨딩 등 `previewMobileOnly` 제외)
- `ThemeColorsProvider` — 변형 변경 시 override 초기화

## 템플릿 연동

미리보기 마크업에서 Tailwind 고정색 대신 유틸 클래스 사용:

| 클래스 | 용도 |
|--------|------|
| `theme-fill-primary` | CTA·강조 배경 |
| `theme-gradient-hero` | 헤더 그라데이션 |
| `theme-gradient-hero-soft` | 히어로 이미지 대체 그라데이션 |
| `theme-bg-surface` | 페이지 배경 |
| `theme-text-primary` | 라벨·링크 톤 |

정의: `src/index.css` `@layer components`

## 연동 현황

- **적용됨:** 이벤트/세미나(`EventLikeTemplatePreview` 일부), 회사 `minimal` CTA
- **예정:** 나머지 변형에 동일 패턴으로 `theme-*` 클래스 점진 적용
- **보내기 HTML:** 아직 인라인 변수 미반영 → Phase B

## 확장하지 않는 것 (의도)

- 타이포·간격·컴포넌트 단위 토큰
- 슬롯 5개 초과
- 다크/라이트 모드 자동 생성
