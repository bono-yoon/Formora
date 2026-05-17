export type CompanyDesignVariant = 'minimal' | 'editorial' | 'glass-b2b' | 'split-tech' | 'logo-trust'

export function companyVariantFromCatalogId(variantId: string): CompanyDesignVariant {
  if (variantId === 'editorial') return 'editorial'
  if (variantId === 'glass-b2b') return 'glass-b2b'
  if (variantId === 'split-tech') return 'split-tech'
  if (variantId === 'logo-trust') return 'logo-trust'
  return 'minimal'
}
