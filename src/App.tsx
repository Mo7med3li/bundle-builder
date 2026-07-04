import { BuilderAccordion } from '@/components/BuilderAccordion'
import { ReviewPanel } from '@/components/ReviewPanel'

export default function App() {
  return (
    <div className="min-h-svh bg-white">
      <main className="mx-auto max-w-[1280px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8 2xl:max-w-[1400px]">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-900 lg:hidden">
          Let&apos;s get started!
        </h1>

        {/*
          Mobile (<lg):     stacked — builder then review
          Medium (lg–2xl): side-by-side — builder | review sidebar
          Large (2xl+):    stacked — builder full width, review full width below
        */}
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(340px,400px)] 2xl:grid-cols-1">
          <BuilderAccordion />
          <ReviewPanel />
        </div>
      </main>
    </div>
  )
}
