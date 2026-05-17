import JSZip from 'jszip'

const README = `Formora — 보낸 패키지
--------------------------------
- index.html : 브라우저에서 바로 열 수 있는 단일 페이지입니다.
- 외부 이미지 URL은 인터넷 연결이 있어야 표시됩니다.

호스팅: index.html만 업로드해도 동작합니다(별도 JS 없음).
`

export async function zipSinglePageSite(html: string, baseName: string): Promise<Blob> {
  const zip = new JSZip()
  zip.file('index.html', html)
  zip.file(
    'README.txt',
    `${README}\n파일 베이스 이름: ${baseName}\n`,
  )
  return zip.generateAsync({ type: 'blob' })
}
