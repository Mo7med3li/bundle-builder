import { Button } from '@/components/ui/button'
import { catalog } from '@/data/catalog'
import satisfactionBadge from '@/assets/Satisfaction.png'
import { formatCurrency, cn } from '@/lib/utils'

interface ReviewCheckoutSummaryProps {
  subtotal: number
  compareAtTotal: number
  savings: number
  hasSaved: boolean
  checkoutMessage: string | null
  onCheckout: () => void
  onSave: () => void
  onDismissMessage: () => void
  className?: string
}

export function ReviewCheckoutSummary({
  subtotal,
  compareAtTotal,
  savings,
  hasSaved,
  checkoutMessage,
  onCheckout,
  onSave,
  onDismissMessage,
  className,
}: ReviewCheckoutSummaryProps) {
  const showCompareAt = compareAtTotal > subtotal

  return (
    <div className={cn('flex w-full shrink-0 flex-col gap-4', className)}>
      <div className="flex items-start justify-between gap-3 sm:items-center sm:gap-4">
        <img
          src={satisfactionBadge}
          alt="100% Wyze satisfaction guarantee"
          className="h-[72px] w-[72px] shrink-0 object-contain sm:h-20 sm:w-20 lg:h-24 lg:w-24 2xl:h-[113px] 2xl:w-[113px]"
        />

        <div className="flex min-w-0 flex-col items-end gap-1.5 sm:gap-2">
          <span className="inline-flex items-center rounded-sm bg-badge px-2 py-1 text-[10px] font-normal text-white whitespace-nowrap sm:text-xs lg:text-sm">
            {catalog.financing.label}{' '}
            {formatCurrency(catalog.financing.amount)}/mo
          </span>

          <div className="flex flex-wrap items-baseline justify-end gap-1 sm:gap-1.5">
            {showCompareAt && (
              <p className="text-base text-gray-400 line-through sm:text-lg lg:text-[22px]">
                {formatCurrency(compareAtTotal)}
              </p>
            )}
            <p className="text-xl font-bold tracking-tight text-brand sm:text-2xl lg:text-[28px] 2xl:text-4xl">
              {formatCurrency(subtotal)}
            </p>
          </div>
        </div>
      </div>

      <p className="hidden text-sm leading-relaxed text-gray-text md:block lg:hidden 2xl:block">
        <span className="font-semibold">30-day hassle-free returns.</span>{' '}
        <span className="text-gray-text/60">
          If you&apos;re not totally in love with the product, we will refund you
          100%.
        </span>
      </p>

      {savings > 0 && (
        <p className="text-center text-sm font-semibold text-savings">
          Congrats! You&apos;re saving {formatCurrency(savings)} on your security
          bundle!
        </p>
      )}

      <div className="space-y-2">
        <Button
          className="h-11 w-full rounded-lg bg-badge py-4 px-3 text-base font-semibold hover:bg-badge-hover"
          onClick={onCheckout}
        >
          Checkout
        </Button>
        <button
          type="button"
          onClick={onSave}
          className="w-full text-center text-sm font-semibold text-gray-dark underline"
        >
          Save my system for later
        </button>
        {hasSaved && (
          <p className="text-center text-xs text-savings">
            System saved! Your configuration will persist across visits.
          </p>
        )}
      </div>

      {checkoutMessage && (
        <div
          role="status"
          className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-800"
        >
          <p>{checkoutMessage}</p>
          <button
            type="button"
            onClick={onDismissMessage}
            className="mt-2 text-xs font-medium text-green-700 underline"
          >
            Dismiss
          </button>
        </div>
      )}
    </div>
  )
}
