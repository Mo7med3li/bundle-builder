import { QuantityStepper } from '@/components/QuantityStepper'
import { formatCurrency } from '@/lib/utils'
import type { ReviewLineItem } from '@/types/bundle'

interface ReviewProductLineProps {
  item: ReviewLineItem
  onIncrement: () => void
  onDecrement: () => void
}

export function ReviewProductLine({
  item,
  onIncrement,
  onDecrement,
}: ReviewProductLineProps) {
  const displayName = item.variantLabel
    ? `${item.product.name} (${item.variantLabel})`
    : item.product.name
  const priceSuffix = item.product.priceSuffix ?? ''

  return (
    <li className="flex items-center gap-2.5 sm:gap-3">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white p-1">
        <img
          src={item.product.image}
          alt=""
          className="h-full w-full object-contain"
        />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-gray-900">
          {displayName}
        </p>
        <QuantityStepper
          size="compact"
          value={item.quantity}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
          className="mt-1"
        />
      </div>

      <div className="shrink-0 text-right text-sm">
        {item.linePrice === 0 ? (
          <>
            {item.lineCompareAt > 0 && (
              <p className="text-xs text-gray-400 line-through sm:text-sm">
                {formatCurrency(item.lineCompareAt)}
              </p>
            )}
            <p className="font-semibold text-brand">FREE</p>
          </>
        ) : (
          <>
            {item.lineCompareAt > item.linePrice && (
              <p className="text-xs text-gray-400 line-through sm:text-sm">
                {formatCurrency(item.lineCompareAt)}
                {priceSuffix}
              </p>
            )}
            <p className="font-semibold text-brand">
              {formatCurrency(item.linePrice)}
              {priceSuffix}
            </p>
          </>
        )}
      </div>
    </li>
  )
}
