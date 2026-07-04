import { cn } from '@/lib/utils'
import type { ProductVariant } from '@/types/bundle'

interface VariantSelectorProps {
  variants: ProductVariant[]
  activeVariantId: string
  onSelect: (variantId: string) => void
  className?: string
}

export function VariantSelector({
  variants,
  activeVariantId,
  onSelect,
  className,
}: VariantSelectorProps) {
  return (
    <div className={cn('flex flex-wrap gap-1.5', className)}>
      {variants.map((variant) => (
        <button
          key={variant.id}
          type="button"
          onClick={() => onSelect(variant.id)}
          className={cn(
            'flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs transition-colors',
            activeVariantId === variant.id
              ? 'border-savings bg-savings/10 text-gray-text'
              : 'border-gray-lighter bg-white text-gray-text hover:border-gray-300',
          )}
        >
          <span
            className="h-3.5 w-3.5 shrink-0 rounded-full border border-gray-200"
            style={{ backgroundColor: variant.swatch }}
          />
          {variant.label}
        </button>
      ))}
    </div>
  )
}
