import { useMemo } from "react";
import { ReviewCheckoutSummary } from "@/components/review/ReviewCheckoutSummary";
import { ReviewPlanLine } from "@/components/review/ReviewPlanLine";
import { ReviewProductLine } from "@/components/review/ReviewProductLine";
import { ReviewShippingRow } from "@/components/review/ReviewShippingRow";
import { cn } from "@/lib/utils";
import { useBundleStore } from "@/store/bundle-store";
import { getReviewItemsByCategory, getTotals } from "@/store/selectors";
import type { StepCategory } from "@/types/bundle";

const productCategoryLabels: Record<Exclude<StepCategory, "plan">, string> = {
  cameras: "Cameras",
  sensors: "Sensors",
  accessories: "Accessories",
};

const productCategoryOrder: Exclude<StepCategory, "plan">[] = [
  "cameras",
  "sensors",
  "accessories",
];

interface ReviewPanelProps {
  className?: string;
}

export function ReviewPanel({ className }: ReviewPanelProps) {
  const cart = useBundleStore((state) => state.cart);
  const incrementQuantity = useBundleStore((state) => state.incrementQuantity);
  const decrementQuantity = useBundleStore((state) => state.decrementQuantity);
  const saveSystem = useBundleStore((state) => state.saveSystem);
  const checkout = useBundleStore((state) => state.checkout);
  const hasSaved = useBundleStore((state) => state.hasSaved);
  const checkoutMessage = useBundleStore((state) => state.checkoutMessage);
  const clearCheckoutMessage = useBundleStore(
    (state) => state.clearCheckoutMessage,
  );

  const itemsByCategory = useMemo(() => getReviewItemsByCategory(cart), [cart]);
  const totals = useMemo(() => getTotals(cart), [cart]);

  const planItems = itemsByCategory.plan;
  const hasProductItems = productCategoryOrder.some(
    (category) => itemsByCategory[category].length > 0,
  );
  const hasItems = hasProductItems || planItems.length > 0;

  return (
    <aside
      className={cn(
        "rounded-[10px] bg-review-bg px-4 py-4 sm:px-5 sm:py-5",
        "lg:sticky lg:top-6",
        className,
      )}
    >
      <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-brand lg:hidden">
        Review
      </p>

      <div className="flex flex-col gap-6 2xl:flex-row 2xl:items-start 2xl:gap-10 p-4">
        <div className="min-w-0 flex-1">
          <header className="mb-4">
            <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
              Your security system
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-gray-500">
              Review your personalized protection system designed to keep what
              matters most safe.
            </p>
          </header>

          {!hasItems ? (
            <p className="py-8 text-center text-sm text-gray-500">
              Add products from the builder to see your system summary.
            </p>
          ) : (
            <div className="space-y-4">
              {productCategoryOrder.map((category) => {
                const items = itemsByCategory[category];
                if (!items.length) return null;

                return (
                  <section
                    key={category}
                    className="border-b border-gray-lighter pb-4"
                  >
                    <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-400">
                      {productCategoryLabels[category]}
                    </h3>
                    <ul className="space-y-3">
                      {items.map((item) => (
                        <ReviewProductLine
                          key={`${item.productId}-${item.variantId ?? "default"}`}
                          item={item}
                          onIncrement={() =>
                            incrementQuantity(item.productId, item.variantId)
                          }
                          onDecrement={() =>
                            decrementQuantity(item.productId, item.variantId)
                          }
                        />
                      ))}
                    </ul>
                  </section>
                );
              })}

              {planItems.length > 0 && (
                <section className="border-b border-gray-lighter pb-4">
                  <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-400">
                    Plan
                  </h3>
                  <ul className="space-y-3">
                    {planItems.map((item) => (
                      <ReviewPlanLine
                        key={`${item.productId}-${item.variantId ?? "default"}`}
                        item={item}
                      />
                    ))}
                  </ul>
                </section>
              )}

              <section>
                <ReviewShippingRow />
              </section>
            </div>
          )}
        </div>

        <ReviewCheckoutSummary
          className="border-t border-gray-lighter pt-4 lg:max-w-none 2xl:w-[490px] 2xl:border-t-0 2xl:pt-0"
          subtotal={totals.subtotal}
          compareAtTotal={totals.compareAtTotal}
          savings={totals.savings}
          hasSaved={hasSaved}
          checkoutMessage={checkoutMessage}
          onCheckout={checkout}
          onSave={saveSystem}
          onDismissMessage={clearCheckoutMessage}
        />
      </div>
    </aside>
  );
}
