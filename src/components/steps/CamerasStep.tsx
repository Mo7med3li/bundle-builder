import { AccordionStep } from '@/components/accordion/AccordionStep'
import { catalog } from '@/data/catalog'

const step = catalog.steps.find((item) => item.id === 'cameras')!

interface CamerasStepProps {
  isOpen: boolean
  selectedCount: number
  nextStepTitle?: string
  onToggle: () => void
  onNext: () => void
}

export function CamerasStep(props: CamerasStepProps) {
  return (
    <AccordionStep
      step={step}
      centerLastOddItem
      gridClassName="grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-5"
      {...props}
    />
  )
}
