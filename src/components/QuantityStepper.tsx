import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuantityStepperProps {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  size?: "default" | "compact";
  className?: string;
}

export function QuantityStepper({
  value,
  onIncrement,
  onDecrement,
  size = "default",
  className,
}: QuantityStepperProps) {
  const compact = size === "compact";

  return (
    <div
      className={cn(
        "inline-flex items-center overflow-hidden rounded-md bg-white",
        compact ? "h-8" : "h-9",
        className,
      )}
    >
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={onDecrement}
        disabled={value <= 0}
        className={cn(
          "flex items-center justify-center p-0.5 bg-gray-light size-5 rounded-sm text-gray-500 transition-colors",
          "",
        )}
      >
        <div className="bg-gray-light hover:bg-white size-full flex items-center justify-center">
          <Minus className="size-2" />
        </div>
      </button>
      <span
        className={cn(
          "min-w-8 text-center font-medium text-gray-text",
          compact ? "px-2 text-sm" : "min-w-9 px-2.5 text-sm",
        )}
      >
        {value}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={onIncrement}
        className={cn(
          "flex items-center justify-center p-0.5 bg-[#F0F4F7] size-5 rounded-sm text-gray-500 transition-colors",
        )}
      >
        <div className="bg-[#F0F4F7] hover:bg-white size-full flex items-center justify-center">
          <Plus className="size-2" />
        </div>
      </button>
    </div>
  );
}
