import { productPageSchema } from '@/templates/product/schema'

export const defaultProductPageData = productPageSchema.parse({
  productName: '에어프레임 프로',
  oneLiner: '하루 종일 편안한 무게 중심 설계.',
  description:
    '에어프레임 프로는 장시간 착용에도 부담이 적은 무게 밸런스와 통기성 소재를 적용했습니다. 일상·업무·야외 활동까지 하나의 프레임으로 연결되는 올라운드 라인업입니다.\n\n패키지에는 전용 케이스, 마이크로파이버 클리닝 천, 보증서가 포함됩니다.',
  priceLabel: '₩189,000부터',
  buyUrl: 'https://example.com/buy',
  galleryImageUrls: [],
  specs: [
    { label: '무게', value: '198g' },
    { label: '소재', value: '티타늄 그레이드' },
    { label: '배터리', value: '최대 24시간' },
  ],
  faq: [
    { q: '배송은 얼마나 걸리나요?', a: '영업일 기준 2~3일 내 출고됩니다.' },
    { q: '교환·환불이 가능한가요?', a: '수령 후 7일 이내 미개봉 상태에서 가능합니다.' },
  ],
  brandName: '에어프레임 코리아',
  brandLogoUrl: '',
  brandTagline: 'Better everyday carry',
  brandDescription: '가벼운 웨어러블과 액세서리를 설계하는 라이프스타일 브랜드입니다.',
  brandEmail: 'support@example.com',
  brandPhone: '1588-0000',
  brandAddress: '서울특별시 강남구 테헤란로 00',
})
