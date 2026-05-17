# 다중 페이지·메뉴 설계안

> **상태:** 설계 확정 (2026-05-17). **코드 구현은 Git 반영 후 P1부터 착수.**  
> **목표:** 정적 랜딩이라도 “단일 스크롤” 외에 **메뉴 → 하위 페이지** 흐름을 지원.

---

## 1. 문제 정의

- 현재 Formora는 카테고리·변형당 **단일 페이지 데이터** + **단일 HTML 보내기**를 전제로 합니다.
- 실무에서는 **소개 / 서비스 / 팀 / 문의** 등 2~5개 화면을 같은 브랜드 톤으로 묶는 경우가 많습니다.
- 미리보기·보내기 모두 **페이지 단위 라우팅(또는 앵커)** 이 필요합니다.

---

## 2. 제안 데이터 모델

```ts
type SitePage = {
  id: string           // slug: "about", "contact"
  title: string        // 네비·브라우저 탭
  showInNav: boolean
  order: number
  /** 카테고리 공통 스키마의 부분집합 또는 페이지 타입별 블록 */
  blocks: PageBlock[]
}

type SiteDocument = {
  categoryId: TemplateCategoryId
  variantId: string
  themeColors: ThemeColorOverrides
  /** 사이트 전역 — 모든 페이지 상단에 동일하게 표시 */
  brandHeader: BrandHeaderData
  pages: SitePage[]
  defaultPageId: string
}
```

- **1단계(MVP):** 모든 페이지가 **동일 Zod 스키마**를 공유하고, `pageId`별로 “어느 섹션을 켤지”만 다르게 (예: 문의 페이지는 FAQ·연락처만).
- **2단계:** 페이지 타입(`landing` | `list` | `legal`)별 블록 조합.
- **히어로:** 페이지마다 별도 풀블리드 히어로를 두지 않고, **사이트 공통 브랜드 헤더만** 사용한다. (로고·사이트명·글로벌 네비·선택적 한 줄 태그라인)

---

## 3. 네비게이션·미리보기

| 모드 | 동작 |
|------|------|
| 빌더 | 좌측 **페이지 목록** + “페이지 추가” / “메뉴에 표시” 토글 |
| 웹 미리보기 | 상단 **글로벌 네비** 클릭 시 같은 축소판 안에서 페이지 전환 (전체 리로드 없음) |
| 모바일 미리보기 | 햄버거 또는 하단 탭 (변형당 1안) |
| 보내기 | **옵션 A:** `index.html` + `about.html` … 다중 파일 ZIP |
| | **옵션 B:** 단일 HTML + 앵커/간단 JS (MVP 친화) |

**권장:** ZIP 다중 HTML(옵션 A)을 목표로, 미리보기는 React state로 `currentPageId`만 전환.

---

## 4. UI 흐름 (빌더)

1. 변형 선택 → 기존과 동일  
2. **사이트** 탭: 페이지 목록·순서·메뉴 표시  
3. **콘텐츠** 탭: 선택된 페이지의 폼 필드 (현재 빌더 폼)  
4. 미리보기: **공통 브랜드 헤더** + 현재 페이지 본문 + 네비  

“페이지 추가” 시:

- 빈 템플릿(제목만) 또는 “소개/문의” 프리셋 복제  
- 최대 페이지 수: **5** (정적 사이트 범위)

---

## 5. 보내기·호환

- `render-export-body`를 `renderPage(category, variant, pageId, data)`로 확장  
- 공통 `styles.css` + 페이지별 HTML  
- 내부 링크: 상대 경로 `./about.html`  
- 테마 컬러: 각 HTML `<html style="--formora-primary: ...">` 인라인

---

## 6. 구현 단계 (예정)

| 단계 | 내용 |
|------|------|
| P1 | `SiteDocument` 타입·localStorage 초안·페이지 CRUD UI |
| P2 | 프리뷰 `currentPageId` + 글로벌 네비 컴포넌트 |
| P3 | 다중 HTML ZIP 보내기 |
| P4 | 변형별 “페이지 프리셋” |

---

## 7. 확정 사항 (2026-05-17)

| 항목 | 결정 |
|------|------|
| **히어로** | 페이지별 히어로 없음 → **사이트 공통 브랜드 헤더만** (`brandHeader` 단일 소스) |
| **웨딩** | `previewMobileOnly` 카테고리 → **다중 페이지·메뉴 기능 제외** (단일 청첩장 유지) |
| **앱 `store-stage`** | 메인 랜딩뿐 아니라 **서브페이지에서도 동일 레이아웃 컴포넌트 재사용** (`AppStoreStage` + 페이지별 본문 블록) |

### 앱 `store-stage` 서브페이지

- **홈:** 기존과 동일 — 스토어 바 + 폰 프레임 + CTA.
- **서브:** 동일 `AppStoreStage` 셸(상단 바·폰 프레임·스토어 링크) + `pageId`에 따라 아래 영역만 교체(기능 카드, 스크린샷, FAQ 등).
- 별도 “서브 전용” 변형을 만들지 않고, **레이아웃 컴포넌트 분리·재조합**으로 처리.

### 웨딩 제외 구현 메모

- 카탈로그 `wedding` 빌더에 페이지 탭·「페이지 추가」 UI 비표시.
- `SiteDocument` 타입·export 파이프라인에서 `categoryId === 'wedding'` 분기 시 단일 페이지만 허용.

---

## 8. 구현 착수 조건

- [x] 설계 확정 (본 절)
- [x] 선행 작업 Git 반영 (웹 축소판 미리보기, 대표 컬러, 미리보기 간격 수정)
- [ ] P1: `SiteDocument` + 페이지 CRUD (`docs/PROGRESS.md` S12-P1)
