import { catalog, productMap, cartKey } from '@/data/catalog'
import type {
  CartEntry,
  ReviewLineItem,
  StepCategory,
} from '@/types/bundle'

export function resolveVariantId(
  productId: string,
  variantId: string | null | undefined,
  activeVariants: Record<string, string>,
): string | null {
  const product = productMap.get(productId)
  if (!product?.variants?.length) return null
  return variantId ?? activeVariants[productId] ?? product.variants[0].id
}

export function getActiveVariant(
  activeVariants: Record<string, string>,
  productId: string,
): string | null {
  const product = productMap.get(productId)
  if (!product?.variants?.length) return null
  return activeVariants[productId] ?? product.variants[0].id
}

export function getQuantity(
  cart: CartEntry[],
  activeVariants: Record<string, string>,
  productId: string,
  variantId?: string | null,
): number {
  const resolvedVariant = resolveVariantId(
    productId,
    variantId,
    activeVariants,
  )
  const entry = cart.find(
    (item) =>
      item.productId === productId && item.variantId === resolvedVariant,
  )
  return entry?.quantity ?? 0
}

export function getStepSelectedCount(cart: CartEntry[], stepId: string): number {
  const step = catalog.steps.find((item) => item.id === stepId)
  if (!step) return 0

  const selectedProductIds = new Set<string>()
  for (const entry of cart) {
    if (entry.quantity > 0 && step.productIds.includes(entry.productId)) {
      selectedProductIds.add(entry.productId)
    }
  }
  return selectedProductIds.size
}

export function getCartSelectedCount(cart: CartEntry[]): number {
  const selectedProductIds = new Set<string>()
  for (const entry of cart) {
    if (entry.quantity > 0) {
      selectedProductIds.add(entry.productId)
    }
  }
  return selectedProductIds.size
}

function buildReviewLine(entry: CartEntry): ReviewLineItem | null {
  const product = productMap.get(entry.productId)
  if (!product || entry.quantity <= 0) return null

  const variant = product.variants?.find((item) => item.id === entry.variantId)

  return {
    ...entry,
    product,
    variantLabel: variant?.label,
    linePrice: product.price * entry.quantity,
    lineCompareAt: product.compareAtPrice * entry.quantity,
  }
}

export function getReviewItemsByCategory(
  cart: CartEntry[],
): Record<StepCategory, ReviewLineItem[]> {
  const grouped: Record<StepCategory, ReviewLineItem[]> = {
    cameras: [],
    plan: [],
    sensors: [],
    accessories: [],
  }

  for (const entry of cart) {
    const line = buildReviewLine(entry)
    if (!line) continue

    const step = catalog.steps.find((item) =>
      item.productIds.includes(entry.productId),
    )
    if (!step) continue

    grouped[step.category].push(line)
  }

  return grouped
}

export function getTotals(cart: CartEntry[]) {
  const items = cart
    .map(buildReviewLine)
    .filter((line): line is ReviewLineItem => line !== null)

  const subtotal = items.reduce((sum, line) => sum + line.linePrice, 0)
  const compareAtTotal =
    items.reduce((sum, line) => sum + line.lineCompareAt, 0) +
    catalog.shipping.compareAtPrice
  const savings = compareAtTotal - subtotal

  return {
    subtotal,
    compareAtTotal,
    savings,
    shippingCompareAt: catalog.shipping.compareAtPrice,
  }
}

export { cartKey }
