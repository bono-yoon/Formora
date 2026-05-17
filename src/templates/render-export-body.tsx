import { renderToString } from 'react-dom/server'

import { CafeTemplatePreview } from '@/templates/cafe/CafeTemplatePreview'
import { cafeVariantFromCatalogId } from '@/templates/cafe/cafe-variant'
import type { CafePageData } from '@/templates/cafe/schema'
import { CompanyTemplatePreview } from '@/templates/company/CompanyTemplatePreview'
import { companyVariantFromCatalogId } from '@/templates/company/company-variant'
import type { CompanyPageData } from '@/templates/company/schema'
import type { PreviewTargetMode, TemplateCategoryId } from '@/templates/catalog/types'
import { PortfolioTemplatePreview } from '@/templates/portfolio/PortfolioTemplatePreview'
import { portfolioVariantFromCatalogId } from '@/templates/portfolio/portfolio-variant'
import type { PortfolioPageData } from '@/templates/portfolio/schema'
import { ProductTemplatePreview } from '@/templates/product/ProductTemplatePreview'
import { productVariantFromCatalogId } from '@/templates/product/product-variant'
import type { ProductPageData } from '@/templates/product/schema'
import { BusinessIntroTemplatePreview } from '@/templates/shared/BusinessIntroTemplatePreview'
import {
  appDesignFromCatalogId,
  constructionDesignFromCatalogId,
  startupDesignFromCatalogId,
} from '@/templates/shared/business-intro-design'
import type { BusinessIntroData } from '@/templates/shared/business-intro-schema'
import { EventLikeTemplatePreview } from '@/templates/shared/EventLikeTemplatePreview'
import { eventDesignFromCatalogId, seminarDesignFromCatalogId } from '@/templates/shared/event-like-design'
import type { EventLikeData } from '@/templates/shared/event-like-schema'
import { WeddingTemplatePreview } from '@/templates/wedding/WeddingTemplatePreview'
import { weddingVariantFromCatalogId } from '@/templates/wedding/wedding-variant'
import type { WeddingPageData } from '@/templates/wedding/schema'

export type ExportRenderParams = {
  categoryId: TemplateCategoryId
  variantId: string
  data: unknown
  exportTarget: PreviewTargetMode
}

export function renderExportBody({ categoryId, variantId, data, exportTarget }: ExportRenderParams): string {
  switch (categoryId) {
    case 'company': {
      const v = companyVariantFromCatalogId(variantId)
      return renderToString(
        <CompanyTemplatePreview data={data as CompanyPageData} variant={v} layout={exportTarget} />,
      )
    }
    case 'product': {
      const v = productVariantFromCatalogId(variantId)
      return renderToString(
        <ProductTemplatePreview data={data as ProductPageData} variant={v} layout={exportTarget} />,
      )
    }
    case 'wedding': {
      const v = weddingVariantFromCatalogId(variantId)
      return renderToString(
        <WeddingTemplatePreview data={data as WeddingPageData} variant={v} />,
      )
    }
    case 'cafe': {
      const v = cafeVariantFromCatalogId(variantId)
      return renderToString(<CafeTemplatePreview data={data as CafePageData} variant={v} layout={exportTarget} />)
    }
    case 'portfolio': {
      const v = portfolioVariantFromCatalogId(variantId)
      return renderToString(
        <PortfolioTemplatePreview data={data as PortfolioPageData} variant={v} layout={exportTarget} />,
      )
    }
    case 'event':
      return renderToString(
        <EventLikeTemplatePreview
          data={data as EventLikeData}
          categoryId="event"
          design={eventDesignFromCatalogId(variantId)}
          layout={exportTarget}
        />,
      )
    case 'seminar':
      return renderToString(
        <EventLikeTemplatePreview
          data={data as EventLikeData}
          categoryId="seminar"
          design={seminarDesignFromCatalogId(variantId)}
          layout={exportTarget}
        />,
      )
    case 'startup':
      return renderToString(
        <BusinessIntroTemplatePreview
          data={data as BusinessIntroData}
          categoryId="startup"
          design={startupDesignFromCatalogId(variantId)}
          layout={exportTarget}
        />,
      )
    case 'construction':
      return renderToString(
        <BusinessIntroTemplatePreview
          data={data as BusinessIntroData}
          categoryId="construction"
          design={constructionDesignFromCatalogId(variantId)}
          layout={exportTarget}
        />,
      )
    case 'app':
      return renderToString(
        <BusinessIntroTemplatePreview
          data={data as BusinessIntroData}
          categoryId="app"
          design={appDesignFromCatalogId(variantId)}
          layout={exportTarget}
        />,
      )
    default: {
      const _e: never = categoryId
      return _e
    }
  }
}
