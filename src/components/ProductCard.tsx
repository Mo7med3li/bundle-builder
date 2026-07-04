import { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { QuantityStepper } from "@/components/QuantityStepper";
import { VariantSelector } from "@/components/VariantSelector";
import { formatCurrency, cn } from "@/lib/utils";
import { useBundleStore } from "@/store/bundle-store";
import { getActiveVariant, getQuantity } from "@/store/selectors";
import type { Product } from "@/types/bundle";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const cart = useBundleStore((state) => state.cart);
  const activeVariants = useBundleStore((state) => state.activeVariants);
  const setActiveVariant = useBundleStore((state) => state.setActiveVariant);
  const incrementQuantity = useBundleStore((state) => state.incrementQuantity);
  const decrementQuantity = useBundleStore((state) => state.decrementQuantity);

  const activeVariant = useMemo(
    () => getActiveVariant(activeVariants, product.id),
    [activeVariants, product.id],
  );
  const quantity = useMemo(
    () => getQuantity(cart, activeVariants, product.id, activeVariant),
    [cart, activeVariants, product.id, activeVariant],
  );

  const isSelected = quantity > 0;
  const hasVariants = Boolean(product.variants?.length);
  const hasDiscount = product.compareAtPrice > product.price;

  return (
    <article
      className={cn(
        "flex h-full rounded-[10px] bg-white p-4 transition-all sm:p-5",
        "flex-col lg:flex-row lg:items-stretch lg:gap-4",
        "2xl:flex-col 2xl:gap-0",
        isSelected
          ? "border-2 border-brand shadow-sm"
          : "border border-transparent",
      )}
    >
      {/* Image column */}
      <div
        className={cn(
          "relative flex shrink-0 items-center justify-center",
          "mb-3 min-h-[100px] w-full",
          "lg:mb-0 lg:w-[38%] lg:max-w-[148px]",
          "2xl:mb-4 2xl:w-full 2xl:max-w-none 2xl:min-h-[140px]",
        )}
      >
        {product.badge && (
          <Badge className="absolute left-0 top-0 z-10 rounded-full px-2 py-0.5 text-[10px] font-semibold">
            {product.badge}
          </Badge>
        )}
        <img
          src={product.image}
          alt={product.name}
          className={cn(
            "w-auto object-contain",
            "max-h-[88px] lg:max-h-[100px]",
            "2xl:max-h-[120px]",
          )}
        />
      </div>

      {/* Content column */}
      <div className="flex min-w-0 flex-1 flex-col gap-2.5 lg:gap-2 2xl:gap-3">
        <div>
          <h3 className="text-sm font-semibold text-gray-text sm:text-base">
            {product.name}
          </h3>
          <p className="mt-1 text-xs leading-snug text-gray-text/75 sm:text-sm sm:leading-relaxed">
            {product.description}
            {product.learnMoreUrl && (
              <>
                {" "}
                <a
                  href={product.learnMoreUrl}
                  className="font-medium text-brand underline underline-offset-2"
                  onClick={(event) => event.preventDefault()}
                >
                  Learn More
                </a>
              </>
            )}
          </p>
        </div>

        {hasVariants && activeVariant && (
          <VariantSelector
            variants={product.variants!}
            activeVariantId={activeVariant}
            onSelect={(variantId) => setActiveVariant(product.id, variantId)}
          />
        )}

        <div className="mt-auto flex items-end justify-between gap-2 pt-1 lg:pt-0 2xl:pt-2">
          <QuantityStepper
            value={quantity}
            onIncrement={() =>
              incrementQuantity(product.id, hasVariants ? activeVariant : null)
            }
            onDecrement={() =>
              decrementQuantity(product.id, hasVariants ? activeVariant : null)
            }
            className="h-9 rounded-md border-gray-lighter"
          />

          <div className="text-right flex gap-1 items-center">
            {hasDiscount && (
              <p className="text-xs text-price-strike line-through sm:text-sm">
                {formatCurrency(product.compareAtPrice)}
                {product.priceSuffix}
              </p>
            )}
            <p className="text-base font-normal text-gray-muted sm:text-lg">
              {product.price === 0
                ? "FREE"
                : `${formatCurrency(product.price)}${product.priceSuffix ?? ""}`}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
