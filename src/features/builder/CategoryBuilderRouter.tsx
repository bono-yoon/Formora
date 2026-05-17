import type { TemplateCategoryId } from '@/templates/catalog/types'

import { BusinessIntroBuilderView } from '@/features/builder/business/BusinessIntroBuilderView'
import { CafeBuilderView } from '@/features/builder/cafe/CafeBuilderView'
import { CompanyBuilderView } from '@/features/builder/CompanyBuilderView'
import { EventLikeBuilderView } from '@/features/builder/event/EventLikeBuilderView'
import { PortfolioBuilderView } from '@/features/builder/portfolio/PortfolioBuilderView'
import { ProductBuilderView } from '@/features/builder/ProductBuilderView'
import { WeddingBuilderView } from '@/features/builder/WeddingBuilderView'

type CategoryBuilderRouterProps = {
  categoryId: TemplateCategoryId
  variantId: string
}

export function CategoryBuilderRouter({ categoryId, variantId }: CategoryBuilderRouterProps) {
  switch (categoryId) {
    case 'company':
      return <CompanyBuilderView variantId={variantId} />
    case 'product':
      return <ProductBuilderView variantId={variantId} />
    case 'wedding':
      return <WeddingBuilderView variantId={variantId} />
    case 'cafe':
      return <CafeBuilderView variantId={variantId} />
    case 'portfolio':
      return <PortfolioBuilderView variantId={variantId} />
    case 'event':
      return <EventLikeBuilderView categoryId="event" variantId={variantId} />
    case 'seminar':
      return <EventLikeBuilderView categoryId="seminar" variantId={variantId} />
    case 'startup':
      return <BusinessIntroBuilderView categoryId="startup" variantId={variantId} />
    case 'construction':
      return <BusinessIntroBuilderView categoryId="construction" variantId={variantId} />
    case 'app':
      return <BusinessIntroBuilderView categoryId="app" variantId={variantId} />
    default: {
      const _x: never = categoryId
      return _x
    }
  }
}
