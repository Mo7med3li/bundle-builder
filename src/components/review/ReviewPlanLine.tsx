import { formatCurrency } from "@/lib/utils";
import type { ReviewLineItem } from "@/types/bundle";

interface ReviewPlanLineProps {
  item: ReviewLineItem;
}

function splitPlanName(name: string) {
  if (name.startsWith("Cam ")) {
    return { prefix: "Cam", suffix: name.slice(4) };
  }
  return { prefix: name, suffix: null };
}

export function ReviewPlanLine({ item }: ReviewPlanLineProps) {
  const suffix = item.product.priceSuffix ?? "";
  const { prefix, suffix: nameSuffix } = splitPlanName(item.product.name);

  return (
    <li className="flex items-center gap-3">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center">
        <img
          src={item.product.image}
          alt=""
          className="h-full w-full object-contain"
        />
      </div>

      <p className="min-w-0 flex-1 text-sm font-medium">
        <span className="text-gray-900">{prefix}</span>
        {nameSuffix && (
          <>
            {" "}
            <span className="font-semibold text-badge">{nameSuffix}</span>
          </>
        )}
      </p>

      <div className="flex shrink-0 items-center gap-2 text-sm">
        {item.product.compareAtPrice > item.product.price && (
          <span className="text-gray-400 line-through">
            {formatCurrency(item.product.compareAtPrice)}
            {suffix}
          </span>
        )}
        <span className="font-semibold text-badge">
          {formatCurrency(item.product.price)}
          {suffix}
        </span>
      </div>
    </li>
  );
}
