import { businessIntroSchema } from '@/templates/shared/business-intro-schema'

export const defaultAppPageData = businessIntroSchema.parse({
  orgName: '포커스 타이머',
  headline: '딥워크를 위한 최소 UI',
  subline: 'iOS · Android',
  body: '세션 단위로 집중 시간을 기록하고, 주간 리포트로 패턴을 확인하세요. 광고 없음.',
  ctaLabel: 'App Store에서 받기',
  ctaUrl: 'https://example.com/app',
  heroImageUrl: '',
  bullets: ['포모도로 · 커스텀 타이머', '위젯', 'iCloud 동기화'],
  metrics: [],
  trustedLogos: [],
  projects: [],
  certifications: [],
  galleryImageUrls: [],
  screenshots: [
    { url: '', caption: '홈 · 타이머' },
    { url: '', caption: '주간 리포트' },
    { url: '', caption: '설정' },
  ],
  featureCards: [
    { title: '포모도로 프리셋', description: '25/5, 50/10 등 바로 시작.' },
    { title: '위젯 & 라이브 액티비티', description: '잠금 화면에서 세션 확인.' },
    { title: 'iCloud 동기화', description: 'iPhone·iPad·Mac 간 기록 공유.' },
  ],
  appStoreUrl: 'https://example.com/ios',
  playStoreUrl: 'https://example.com/android',
})
