import { AccordionStep } from '@/components/accordion/AccordionStep'
import { catalog } from '@/data/catalog'

const step = catalog.steps.find((item) => item.id === 'protection')!

interface ProtectionStepProps {
  isOpen: boolean
  selectedCount: number
  onToggle: () => void
  onNext: () => void
}

export function ProtectionStep({
  isOpen,
  selectedCount,
  onToggle,
  onNext,
}: ProtectionStepProps) {
  return (
    <AccordionStep
      step={step}
      isOpen={isOpen}
      selectedCount={selectedCount}
      onToggle={onToggle}
      onNext={onNext}
      gridClassName="grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2"
    />
  )
}
