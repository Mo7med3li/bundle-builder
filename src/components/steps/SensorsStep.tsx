import { AccordionStep } from '@/components/accordion/AccordionStep'
import { catalog } from '@/data/catalog'

const step = catalog.steps.find((item) => item.id === 'sensors')!

interface SensorsStepProps {
  isOpen: boolean
  selectedCount: number
  nextStepTitle?: string
  onToggle: () => void
  onNext: () => void
}

export function SensorsStep(props: SensorsStepProps) {
  return (
    <AccordionStep
      step={step}
      gridClassName="grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2"
      {...props}
    />
  )
}
