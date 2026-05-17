/**
 * Vite가 번들한 앱 전역 CSS( Tailwind + shadcn 토큰 ).
 *보낸 HTML에 `<style>`으로 삽입해 오프라인에서도 레이아웃이 유지되도록 합니다.
 */
import appCss from '@/index.css?inline'

export const EXPORT_APP_CSS: string = appCss
