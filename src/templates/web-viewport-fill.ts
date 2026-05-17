/**
 * 웹 미리보기/보내기에서만: 루트 세로 공간을 채워 ‘빈 페이지’ 느낌을 줄입니다.
 */
export function webViewportFill(isWeb: boolean): string {
  return isWeb ? 'min-h-[min(92vh,960px)]' : ''
}
