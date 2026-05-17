import type { TemplateCategoryId, TemplateCategoryMeta } from '@/templates/catalog/types'

export const TEMPLATE_CATALOG: TemplateCategoryMeta[] = [
  {
    id: 'company',
    title: '회사 웹사이트',
    description: '브랜드·서비스 소개, CTA, 연락처 중심 랜딩.',
    icon: 'Building2',
    previewMobileOnly: false,
    variants: [
      { id: 'minimal', title: '미니멀', description: '좁은 SaaS 카드형 · 블루 포인트 · 중앙 정렬.' },
      { id: 'editorial', title: '에디토리얼', description: '다크 풀블리드 히어로 · 대형 세리프 · 번호 매긴 하이라이트.' },
      { id: 'glass-b2b', title: '글래스 B2B', description: '인디고·유리모피즘 카드 · 블러 헤더 · 부드러운 그라데이션.' },
      { id: 'split-tech', title: '스플릿 테크', description: '브랜드 컬러 반쪽 + 콘텐츠 반쪽 · 테크 B2B 스플릿 히어로.' },
      {
        id: 'logo-trust',
        title: '로고 트러스트',
        description: '협력사 로고 마크 중심 · 그레이스케일 로고 월 · 신뢰 배지형 파트너 섹션.',
      },
    ],
  },
  {
    id: 'product',
    title: '제품 소개',
    description: '가치 제안, 갤러리, 스펙·FAQ.',
    icon: 'Package',
    previewMobileOnly: false,
    variants: [
      { id: 'standard', title: '스탠다드', description: '밝은 단일열 · 클래식 제품 랜딩.' },
      { id: 'gallery-first', title: '갤러리 퍼스트', description: '다크 풀폭 그리드 · 유리 카드 헤드라인 · 카드형 스펙.' },
      { id: 'pricing-focus', title: '프라이싱 포커스', description: '가격·오퍼 카드 강조 · 테이블형 스펙 · 미니멀 FAQ.' },
      { id: 'story-band', title: '스토리 밴드', description: '컬러 밴드로 섹션 구분 · 론칭 스토리형 흐름.' },
    ],
  },
  {
    id: 'wedding',
    title: '모바일 청첩장',
    description: '일시·장소·인사말·지도 링크.',
    icon: 'Heart',
    previewMobileOnly: true,
    variants: [
      { id: 'classic', title: '클래식', description: '웜톤·세리프·이중 테두리·초대장 장식.' },
      { id: 'cover-focus', title: '커버 포커스', description: '시네마틱 풀스크린 커버 + 스위스형 그리드 본문.' },
      { id: 'pastel-garden', title: '파스텔 가든', description: '라벤더·핑크 그라데이션·유리 카드·부드러운 세리프.' },
      { id: 'mono-minimal', title: '모노 미니멀', description: '흑백 라인·산세리프·헤어라인 구분·그레이스케일 커버.' },
    ],
  },
  {
    id: 'cafe',
    title: '카페 / 레스토랑',
    description: '메뉴 강조, 위치·영업시간, 예약 CTA.',
    icon: 'Coffee',
    previewMobileOnly: false,
    variants: [
      { id: 'warm-heritage', title: '웜 헤리티지', description: '앰버·2열 히어로·3카드 매장 정보.' },
      { id: 'garden-terrace', title: '가든 테라스', description: '세이지·세로 정보 띠·테라스형 이미지 배치.' },
      { id: 'midnight-tapas', title: '미드나잇 타파스', description: '다크 럭스·골드 라인·중앙 단일열 코스 느낌.' },
      { id: 'espresso-stripe', title: '에스프레소 스트라이프', description: '스톤·굵은 스트라이프·브루탈 타이포 중심.' },
    ],
  },
  {
    id: 'portfolio',
    title: '포트폴리오',
    description: '소개, 대표 작업, 연락처.',
    icon: 'Briefcase',
    previewMobileOnly: false,
    variants: [
      { id: 'noir-studio', title: '누아 스튜디오', description: '다크 징크·좌비주얼 우카피 클래식 그리드.' },
      { id: 'daylight-editorial', title: '데이라이트 에디토리얼', description: '라이트 페이퍼·세리프·룰 라인 에디토리얼.' },
      { id: 'film-reel', title: '필름 릴', description: '필름 스트립형 가로 작업 띠 + 캡션 컬럼.' },
      { id: 'swiss-index', title: '스위스 인덱스', description: '대형 인덱스 번호·스위스 그리드 인포.' },
    ],
  },
  {
    id: 'event',
    title: '이벤트 프로모션',
    description: '행사명, 일정, 장소, 참가 안내.',
    icon: 'Calendar',
    previewMobileOnly: false,
    variants: [
      {
        id: 'campaign-poster',
        title: '캠페인 포스터',
        description: '세리프 다크 히어로·필 메타·중앙 스토리.',
      },
      {
        id: 'neon-stack',
        title: '네온 스택',
        description: '바이올렛 다크·글로우 패널·세로 스택 카드.',
      },
      {
        id: 'billboard-split',
        title: '빌보드 스플릿',
        description: '라임·블랙 반쪽 빌보드형 히어로·대비 CTA.',
      },
      {
        id: 'ribbon-row',
        title: '리본 로우',
        description: '컬러 밴드 가로 층·플랫 프로모 그래픽.',
      },
    ],
  },
  {
    id: 'seminar',
    title: '세미나 / 컨퍼런스',
    description: '일정·연사·등록 링크.',
    icon: 'Presentation',
    previewMobileOnly: false,
    variants: [
      {
        id: 'track-board',
        title: '트랙 보드',
        description: '인디고 헤더·3칸 메타 그리드·본문 + 등록 사이드 — 학회·트랙형.',
      },
      {
        id: 'promo-ribbon',
        title: '프로모 리본',
        description: '스카이 톤·리본 메타 + 사이드 티켓 — 프로모션형 프로그램 랜딩.',
      },
      {
        id: 'speaker-fan',
        title: '스피커 팬',
        description: '연사 카드 부채형·풀폭 등록 바 — 트랙·연사 강조.',
      },
      {
        id: 'digest-columns',
        title: '다이제스트 컬럼',
        description: '신문형 헤드라인·2단 본문 — 학술 다이제스트.',
      },
    ],
  },
  {
    id: 'startup',
    title: '스타트업 소개',
    description: '비전, 제품 한 줄, CTA.',
    icon: 'Rocket',
    previewMobileOnly: false,
    variants: [
      {
        id: 'mission-split',
        title: '미션 스플릿',
        description: '바이올렛 중앙 히어로·핵심 카드 3열·번호 매긴 불릿.',
      },
      {
        id: 'velocity-rail',
        title: '벨로시티 레일',
        description: '다크 캔버스·시안 액센트·좌측 타임라인 레일 + 본문.',
      },
      {
        id: 'horizon-proof',
        title: '호라이즌 프루프',
        description: '코럴 호라이즌·떠 있는 증거 카드·칩형 불릿.',
      },
      {
        id: 'ink-ledger',
        title: '잉크 레저',
        description: '네이비 페이퍼·크림 컬럼·타자기 라벨 톤.',
      },
    ],
  },
  {
    id: 'construction',
    title: '건설 / 기업 소개',
    description: '신뢰·실적 강조, 문의 CTA.',
    icon: 'HardHat',
    previewMobileOnly: false,
    variants: [
      { id: 'site-classic', title: '사이트 클래식', description: '슬레이트 히어로·앰버 CTA·사이드 요약.' },
      { id: 'blueprint-grid', title: '블루프린트 그리드', description: '도면 격자·테크니컬 박스·현장 스펙 느낌.' },
      { id: 'yard-beacon', title: '야드 비콘', description: '안전 스트라이프·비콘 옐로·야드 시그널.' },
      { id: 'tender-seal', title: '입찰 씰', description: '이보리 문서·이중 테두리·공문형 씰 영역.' },
    ],
  },
  {
    id: 'app',
    title: '앱 소개',
    description: '앱 스토어 링크, 기능 불릿, 스크린샷 URL.',
    icon: 'Smartphone',
    previewMobileOnly: false,
    variants: [
      {
        id: 'store-stage',
        title: '스토어 스테이지',
        description: '상단 스토어 바·폰 프레임·에메랄드 CTA.',
      },
      {
        id: 'orbit-cards',
        title: '오빗 카드',
        description: '다크 캔버스·오빗 링·기능 카드 궤도형 배치.',
      },
      {
        id: 'spec-slab',
        title: '스펙 슬랩',
        description: '모노스페이스·회색 슬랩·데이터시트형 블록.',
      },
      {
        id: 'chalk-play',
        title: '초크 플레이',
        description: '라벤더·초크보드 둥근 카드·캐주얼 론칭.',
      },
    ],
  },
]

const byId = Object.fromEntries(TEMPLATE_CATALOG.map((c) => [c.id, c])) as Record<
  TemplateCategoryId,
  TemplateCategoryMeta
>

export function getCategory(id: string): TemplateCategoryMeta | undefined {
  return byId[id as TemplateCategoryId]
}

export function getVariant(categoryId: string, variantId: string) {
  const c = getCategory(categoryId)
  return c?.variants.find((v) => v.id === variantId)
}

export function isTemplateCategoryId(value: string): value is TemplateCategoryId {
  return value in byId
}

/** 예전 `/build/:cat/default` 등 구 변형 id → 현재 카탈로그 id */
export const LEGACY_BUILD_VARIANT_ALIASES: Partial<Record<TemplateCategoryId, Record<string, string>>> = {
  cafe: { default: 'warm-heritage' },
  portfolio: { default: 'noir-studio' },
  event: { default: 'campaign-poster' },
  seminar: { default: 'track-board' },
  startup: { default: 'mission-split' },
  construction: { default: 'site-classic' },
  app: { default: 'store-stage' },
}

/** 예: `/build/company` → 첫 변형 */
export const LEGACY_DEFAULT_VARIANT: Record<'company' | 'product' | 'wedding', string> = {
  company: 'minimal',
  product: 'standard',
  wedding: 'classic',
}
