import { Truck } from 'lucide-react'
import { catalog } from '@/data/catalog'
import { formatCurrency } from '@/lib/utils'

export function ReviewShippingRow() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center">
        <Truck className="h-6 w-6 text-savings" strokeWidth={2} />
      </div>

      <p className="min-w-0 flex-1 text-sm font-medium text-gray-900">
        {catalog.shipping.label}
      </p>

      <div className="flex shrink-0 items-center gap-2 text-sm">
        {catalog.shipping.compareAtPrice > 0 && (
          <span className="text-gray-400 line-through">
            {formatCurrency(catalog.shipping.compareAtPrice)}
          </span>
        )}
        <span className="font-semibold text-badge">FREE</span>
      </div>
    </div>
  )
}
