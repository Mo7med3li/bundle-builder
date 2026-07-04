import type { LucideIcon } from "lucide-react";
import {
  Camera,
  ChevronDown,
  ChevronUp,
  PlusCircle,
  Radio,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { productMap } from "@/data/catalog";
import { cn } from "@/lib/utils";
import type { BuilderStep } from "@/types/bundle";

export const stepIcons = {
  camera: Camera,
  shield: Shield,
  radio: Radio,
  "plus-circle": PlusCircle,
} as const;

interface AccordionStepProps {
  step: BuilderStep;
  isOpen: boolean;
  selectedCount: number;
  nextStepTitle?: string;
  onToggle: () => void;
  onNext: () => void;
  gridClassName?: string;
  /** On 2-col grids, center the last item when it sits alone on the final row */
  centerLastOddItem?: boolean;
}

export function AccordionStep({
  step,
  isOpen,
  selectedCount,
  nextStepTitle,
  onToggle,
  onNext,
  gridClassName = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4",
  centerLastOddItem = false,
}: AccordionStepProps) {
  const Icon: LucideIcon = stepIcons[step.icon];
  const products = step.productIds
    .map((id) => productMap.get(id))
    .filter((product): product is NonNullable<typeof product> =>
      Boolean(product),
    );

  return (
    <section className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <button
        type="button"
        onClick={onToggle}
        className={cn(
          "flex w-full items-center gap-4 px-4 py-4 text-left transition-colors sm:px-5",
          isOpen ? "bg-brand-light" : "bg-white hover:bg-gray-50",
        )}
      >
        <div className="flex min-w-0 flex-1 gap-3 flex-col items-start">
          <div className="hidden text-[11px] font-semibold uppercase tracking-wider text-gray-400 sm:block">
            Step {step.stepNumber} of 4
          </div>
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex shrink-0 items-center justify-center text-gray-400 size-10">
              <Icon className="size-10" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 sm:hidden">
                Step {step.stepNumber} of 4
              </p>
              <h2 className="truncate text-lg font-semibold text-gray-obsidian sm:text-2xl">
                {step.title}
              </h2>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 text-sm">
          {selectedCount > 0 && (
            <span className="font-medium text-brand">
              {selectedCount} selected
            </span>
          )}
          {isOpen ? (
            <ChevronUp
              className={cn(selectedCount > 0 ? "text-brand" : "text-gray-500")}
            />
          ) : (
            <ChevronDown
              className={cn(selectedCount > 0 ? "text-brand" : "text-gray-500")}
            />
          )}
        </div>
      </button>

      {isOpen && (
        <div
          className={cn(
            "border-t border-gray-100 px-4 py-5 sm:px-5",
            isOpen ? "bg-brand-light" : "bg-white",
          )}
        >
          <div
            className={cn(
              "grid gap-4",
              gridClassName,
              centerLastOddItem && [
                "lg:[&>*:last-child:nth-child(odd)]:col-span-2",
                "lg:[&>*:last-child:nth-child(odd)]:w-[calc(50%-0.5rem)]",
                "lg:[&>*:last-child:nth-child(odd)]:justify-self-center",
                "2xl:[&>*:last-child:nth-child(odd)]:col-span-1",
                "2xl:[&>*:last-child:nth-child(odd)]:w-auto",
                "2xl:[&>*:last-child:nth-child(odd)]:justify-self-stretch",
              ],
            )}
          >
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {nextStepTitle && (
            <div className="mt-6 flex justify-center">
              <Button
                variant="outline"
                onClick={onNext}
                className="w-full md:w-fit py-1 px-6 rounded-[7px] bg-transparent border-brand text-brand hover:bg-brand-light"
              >
                Next: {nextStepTitle}
              </Button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
