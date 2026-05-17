# Formora 보안 검토

검토 일자: 2026-05-16  
대상: `formora` (이전 작업명 static-page-builder)  
Node.js 런타임 기준, 저장소 루트에서 `npm audit` 실행

---

## 1. 요약

| 항목 | 결과 |
|------|------|
| `npm audit` (전체 의존성) | **취약점 0건** |
| `npm audit --omit=dev` (프로덕션만) | **취약점 0건** |
| `package.json` 버전 정책 | **고정(정확) 버전** + `.npmrc` `save-exact=true` |
| 클라이언트 XSS (코드 패턴) | `dangerouslySetInnerHTML` / `innerHTML` 직접 사용 **없음** |
| HTML보내기 | React `renderToString` + 제목/속성 이스케이프 적용 |

현재 알려진 **npm 권고 취약점(CVE)은 없습니다.** 다만 사용자 입력이 URL·HTML로 그대로 반영되는 구간은 **악성 URL 스킴** 등 논리적 위험이 남아 있으므로 아래 “잔여 리스크”를 참고하세요.

---

## 2. 의존성 고정 정책

### 2.1 변경 사항

- `package.json`의 `^`, `~` 범위 표기를 제거하고 **lockfile에 설치된 정확한 버전**으로 고정했습니다.
- `.npmrc`에 `save-exact=true`를 두어 이후 `npm install <pkg>` 시에도 범위 없이 저장되도록 했습니다.

### 2.2 직접 의존성 (고정 버전)

**dependencies**

| 패키지 | 버전 |
|--------|------|
| @radix-ui/react-label | 2.1.8 |
| @radix-ui/react-slot | 1.2.4 |
| class-variance-authority | 0.7.1 |
| clsx | 2.1.1 |
| framer-motion | 12.38.0 |
| jszip | 3.10.1 |
| lucide-react | 1.14.0 |
| next-themes | 0.4.6 |
| react | 19.2.6 |
| react-dom | 19.2.6 |
| react-router-dom | 7.15.0 |
| shadcn | 4.7.0 |
| tailwind-merge | 3.6.0 |
| tw-animate-css | 1.4.0 |
| zod | 4.4.3 |

**devDependencies**

| 패키지 | 버전 |
|--------|------|
| @eslint/js | 10.0.1 |
| @tailwindcss/vite | 4.3.0 |
| @types/jszip | 3.4.0 |
| @types/node | 24.12.4 |
| @types/react | 19.2.14 |
| @types/react-dom | 19.2.3 |
| @vitejs/plugin-react | 6.0.1 |
| eslint | 10.3.0 |
| eslint-plugin-react-hooks | 7.1.1 |
| eslint-plugin-react-refresh | 0.5.2 |
| globals | 17.6.0 |
| tailwindcss | 4.3.0 |
| typescript | 6.0.3 |
| typescript-eslint | 8.59.3 |
| vite | 8.0.12 |

### 2.3 운영 권장

- 의존성 업데이트 시: `npm audit` → 변경 사항 리뷰 → `package-lock.json` 커밋.
- CI에서 `npm ci` + `npm audit --audit-level=moderate` 실행 권장.
- **최신 버전 자동 추종은 하지 않습니다.** 보안 패치가 필요할 때만 의도적으로 버전을 올립니다.

---

## 3. npm audit 상세

```text
npm audit
found 0 vulnerabilities

npm audit --omit=dev
found 0 vulnerabilities
```

- lockfile 기준 **488개** 패키지 감사(검토 시점).
- 전이 의존성(transitive) 포함 결과입니다.

---

## 4. 애플리케이션 보안 (코드 검토)

### 4.1 HTML / ZIP보내기

| 구간 | 조치 |
|------|------|
| 문서 `<title>`, `data-export-target` | `escapeHtmlText()`로 `& < > "` 이스케이프 |
| 인라인 CSS | `</style>` 깨짐 방지용 `escapeForStyleElement()` |
| 본문 마크업 | `renderToString()`(React)로 텍스트 노드 이스케이프 |

**잔여 리스크 (중요)**

1. **사용자 입력 URL** (`href`, `src`, CTA, 이미지 URL 등)  
   - React는 문자열을 이스케이프하지만, `javascript:`, `data:` 등 **위험 스킴**을 URL 검증 없이 허용할 수 있습니다.  
   - **권장:**보내기 전 `http:` / `https:` / `mailto:` 화이트리스트 검증 또는 Zod `z.string().url()` + 스킴 검사.

2. **보낸 HTML을 타인에게 열 때**  
   - 빌더 사용자가 악의적 링크를 넣으면, 그 HTML을 연 **열람자**에게 피싱·리다이렉트 위험이 있습니다.  
   - 제품 관점에서 “신뢰할 수 있는 URL만” 안내하거나 서버 측 검증(향후)을 고려하세요.

3. **외부 이미지**  
   - 제3자 URL 로딩 시 **추적·콘텐츠 무결성** 이슈(일반적인 웹 위협). CSP는 정적 단일 HTML 특성상 별도 설계 필요.

### 4.2 입력 검증

- 빌더 데이터는 **Zod 스키마**로 길이·형식을 제한합니다.
- URL 필드에 대한 **스킴 화이트리스트**는 카테고리별로 아직 통일되어 있지 않습니다 → 개선 권장.

### 4.3 클라이언트 저장·비밀

- 현재 MVP는 **브라우저 로컬 상태** 중심이며, API 키·비밀번호를 코드에 두지 않습니다.
- `.env`, `.env.*`(`.env.example` 제외), `*.pem`, `credentials.json` 등은 **`.gitignore`에 등록**되어 있습니다. 템플릿은 `.env.example`만 커밋합니다.

### 4.4 `shadcn` 런타임 의존성

- `shadcn` CLI 성격의 패키지가 **dependencies**에 포함되어 있습니다.  
- 프로덕션 번들 크기·공격 면적 증가 가능 → 장기적으로 **devDependencies로 이동** 또는 제거 검토 권장.

### 4.5 ZIP 생성 (JSZip)

- 클라이언트에서만 ZIP 생성, 서버 업로드 없음 → **서버 측 ZIP slip** 위험은 해당 없음.
- ZIP 내 `README.txt`에 `baseName`이 들어가므로, 극단적으로 긴 파일명은 UX 이슈 수준.

---

## 5. 인프라·배포 (참고)

- 정적 호스팅 시: HTTPS, `Content-Security-Policy`, `X-Content-Type-Options: nosniff` 설정 권장.
- Formora 빌더 앱 자체와, **사용자가보낸 `index.html`** 은 threat model이 다릅니다. 후자는 호스팅 환경·입력 URL 품질에 더 의존합니다.

---

## 6. 권장 후속 작업 (우선순위)

1. **높음:** CTA·이미지·외부 링크 URL에 `http(s)` / `mailto` 스킴 검증 추가  
2. **중간:** CI에 `npm ci` + `npm audit` 고정  
3. **중간:** `shadcn` 패키지 위치 재검토(dev 전용 여부)  
4. **낮음:**보낸 HTML용 CSP 메타/헤더 가이드 문서화  

---

## 7. 재검토 방법

```bash
npm ci
npm audit
npm audit --omit=dev
npm run build
```

의존성을 변경한 PR마다 이 문서의 **검토 일자**와 audit 결과를 갱신하는 것을 권장합니다.
