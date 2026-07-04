export type StepCategory = 'cameras' | 'plan' | 'sensors' | 'accessories'

export interface ProductVariant {
  id: string
  label: string
  swatch: string
}

export interface Product {
  id: string
  name: string
  description: string
  image: string
  price: number
  compareAtPrice: number
  badge?: string
  variants?: ProductVariant[]
  priceSuffix?: string
  learnMoreUrl?: string
}

export interface BuilderStep {
  id: string
  stepNumber: number
  title: string
  icon: 'camera' | 'shield' | 'radio' | 'plus-circle'
  category: StepCategory
  productIds: string[]
}

export interface BundleCatalog {
  steps: BuilderStep[]
  products: Product[]
  shipping: {
    label: string
    price: number
    compareAtPrice: number
  }
  financing: {
    label: string
    amount: number
  }
}

export interface CartEntry {
  productId: string
  variantId: string | null
  quantity: number
}

export interface BundlePersistedState {
  cart: CartEntry[]
  activeVariants: Record<string, string>
  openStepId: string
}

export interface ReviewLineItem extends CartEntry {
  product: Product
  variantLabel?: string
  linePrice: number
  lineCompareAt: number
}
