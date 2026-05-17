# Formora

클라이언트용 정적 페이지(회사 사이트, 제품 소개, 모바일 청첩장 등)를 **템플릿 + 입력값**으로 빠르게 만들고, **단일 HTML 또는 ZIP**으로 내려받는 **MVP 웹 앱**입니다.

- **보안 검토:** [`docs/SECURITY.md`](./docs/SECURITY.md)
- **Git / GitHub:** [`docs/GIT.md`](./docs/GIT.md)

- **아키텍처·원 로드맵:** [`PLAN.md`](./PLAN.md)  
- **진행 기록·기술 부채:** [`docs/PROGRESS.md`](./docs/PROGRESS.md)  
- **MVP 이후 확장 계획:** [`docs/EXTENDED_ROADMAP.md`](./docs/EXTENDED_ROADMAP.md)

## 요구 사항

- **Node.js** 20 이상(권장: LTS)
- **npm** 10 이상

## 로컬에서 실행하기

저장소 루트에서:

```bash
npm install
npm run dev
```

터미널에 표시되는 주소(기본값: **http://localhost:5173**)를 브라우저에서 열면 됩니다.

### 지금 확인할 수 있는 것

- **카테고리 선택** (`/`) — 카드 그리드(Framer Motion 스태거) → **`/templates/:categoryId`** 에서 변형 선택
- **빌더** (`/build/:categoryId/:variantId`) — Zod 검증, 폼, **실시간 미리보기**, **모바일은 폰 베젤·웹은 브라우저 창 크롬**으로 구분, 웹에서 **전체화면 미리보기**(Esc·배경 클릭·닫기), 웨딩은 모바일 전용, 짧은 전환 모션
- **구 URL** (`/build/company` 등 한 세그먼트) — 카탈로그의 기본 변형 URL로 **리다이렉트**
- **보내기** — 입력이 유효할 때 **HTML 받기** / **ZIP 받기** (`index.html` + `README.txt`), HTML 루트에 선택 타깃(`data-export-target`) 반영
- **다크 모드** — 헤더 오른쪽 토글(시스템 테마 연동)

### 정적 보내기 동작

- 미리보기와 동일한 React 트리를 `react-dom/server`의 `renderToString`으로 HTML 문자열화합니다.
- 앱에 포함된 **전역 CSS**(`index.css` 번들)를 `<style>`에 넣어, 별도 CDN 없이도 레이아웃이 유지되도록 했습니다.
- 외부 **이미지 URL**은 네트워크가 있어야 표시됩니다(로컬 에셋 임베드는 확장 과제).

### 스크립트

| 명령 | 설명 |
|------|------|
| `npm run dev` | 개발 서버(HMR) |
| `npm run build` | 타입체크 + 프로덕션 번들 |
| `npm run preview` | `build` 결과 로컬 미리보기 |
| `npm run lint` | ESLint |

## 기술 스택

- React 19 · Vite 8 · TypeScript 6  
- Tailwind CSS v4 (`@tailwindcss/vite`)  
- [shadcn/ui](https://ui.shadcn.com/) (radix-nova, `button` / `card` / `input` / `label` / `textarea`)  
- `next-themes` — 클래스 기반 라이트/다크  
- `react-router-dom`  
- **Framer Motion** — 템플릿 피커·빌더 전환  
- **Zod** — 템플릿별 데이터 검증  
- **JSZip** — ZIP 패키지 생성  
- **Lucide React** — 아이콘  

### 빌드 용량 참고

보내기 파이프라인(`react-dom/server` + 인라인 CSS + JSZip)이 메인 번들에 포함되어 **프로덕션 JS 청크가 큽니다**. 완화 방안은 [`docs/PROGRESS.md`](./docs/PROGRESS.md) 기술 부채 항목을 참고하세요.

## shadcn/ui 컴포넌트 추가 시

`components.json`의 `aliases`는 **`src/...` 경로**로 맞춰 두었습니다. `@/` 문자열을 그대로 쓰면 Windows에서 `@` 폴더가 잘못 생성될 수 있습니다.

```bash
npx shadcn@latest add select -y
```

## 라이선스

비공개 프로젝트로 두었습니다. 필요 시 저장소에 맞게 수정하세요.
