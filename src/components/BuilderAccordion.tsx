import { CamerasStep } from '@/components/steps/CamerasStep'
import { PlanStep } from '@/components/steps/PlanStep'
import { ProtectionStep } from '@/components/steps/ProtectionStep'
import { SensorsStep } from '@/components/steps/SensorsStep'
import { catalog } from '@/data/catalog'
import { cn } from '@/lib/utils'
import { useBundleStore } from '@/store/bundle-store'
import { getStepSelectedCount } from '@/store/selectors'

interface BuilderAccordionProps {
  className?: string
}

const stepComponents = [
  { id: 'cameras', Component: CamerasStep },
  { id: 'plan', Component: PlanStep },
  { id: 'sensors', Component: SensorsStep },
  { id: 'protection', Component: ProtectionStep },
] as const

export function BuilderAccordion({ className }: BuilderAccordionProps) {
  const openStepId = useBundleStore((state) => state.openStepId)
  const cart = useBundleStore((state) => state.cart)
  const setOpenStep = useBundleStore((state) => state.setOpenStep)
  const goToNextStep = useBundleStore((state) => state.goToNextStep)

  return (
    <div className={cn('space-y-3', className)}>
      {stepComponents.map(({ id, Component }) => {
        const step = catalog.steps.find((item) => item.id === id)!
        const nextStep = catalog.steps.find(
          (item) => item.stepNumber === step.stepNumber + 1,
        )

        return (
          <Component
            key={id}
            isOpen={openStepId === id}
            selectedCount={getStepSelectedCount(cart, id)}
            nextStepTitle={nextStep?.title}
            onToggle={() => setOpenStep(id)}
            onNext={goToNextStep}
          />
        )
      })}
    </div>
  )
}
