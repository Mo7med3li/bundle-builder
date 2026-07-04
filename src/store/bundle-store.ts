import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
  catalog,
  defaultActiveVariants,
  defaultCart,
} from '@/data/catalog'
import { resolveVariantId, cartKey } from '@/store/selectors'
import type { BundlePersistedState, CartEntry } from '@/types/bundle'

const STORAGE_KEY = 'bundle-builder-system'

interface BundleState extends BundlePersistedState {
  hasSaved: boolean
  checkoutMessage: string | null
  setOpenStep: (stepId: string) => void
  goToNextStep: () => void
  setActiveVariant: (productId: string, variantId: string) => void
  setQuantity: (
    productId: string,
    quantity: number,
    variantId?: string | null,
  ) => void
  incrementQuantity: (productId: string, variantId?: string | null) => void
  decrementQuantity: (productId: string, variantId?: string | null) => void
  saveSystem: () => void
  checkout: () => void
  clearCheckoutMessage: () => void
  resetToDefaults: () => void
}

function upsertCartEntry(
  cart: CartEntry[],
  productId: string,
  variantId: string | null,
  quantity: number,
): CartEntry[] {
  const key = cartKey(productId, variantId)
  const without = cart.filter(
    (entry) => cartKey(entry.productId, entry.variantId) !== key,
  )

  if (quantity <= 0) {
    return without
  }

  return [...without, { productId, variantId, quantity }]
}

const initialState: BundlePersistedState & {
  hasSaved: boolean
  checkoutMessage: string | null
} = {
  cart: defaultCart,
  activeVariants: defaultActiveVariants,
  openStepId: 'cameras',
  hasSaved: false,
  checkoutMessage: null,
}

export const useBundleStore = create<BundleState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setOpenStep: (stepId) => set({ openStepId: stepId }),

      goToNextStep: () => {
        const { openStepId } = get()
        const currentIndex = catalog.steps.findIndex(
          (step) => step.id === openStepId,
        )
        const nextStep = catalog.steps[currentIndex + 1]
        if (nextStep) {
          set({ openStepId: nextStep.id })
        }
      },

      setActiveVariant: (productId, variantId) =>
        set((state) => ({
          activeVariants: { ...state.activeVariants, [productId]: variantId },
        })),

      setQuantity: (productId, quantity, variantId) => {
        const resolvedVariant = resolveVariantId(
          productId,
          variantId,
          get().activeVariants,
        )

        const planStep = catalog.steps.find((step) => step.id === 'plan')
        const isPlanProduct = planStep?.productIds.includes(productId)

        set((state) => {
          let nextCart = upsertCartEntry(
            state.cart,
            productId,
            resolvedVariant,
            Math.max(0, quantity),
          )

          if (isPlanProduct && quantity > 0) {
            nextCart = nextCart.map((entry) => {
              if (
                planStep!.productIds.includes(entry.productId) &&
                entry.productId !== productId
              ) {
                return { ...entry, quantity: 0 }
              }
              return entry
            })
            nextCart = nextCart.filter((entry) => entry.quantity > 0)
          }

          return { cart: nextCart }
        })
      },

      incrementQuantity: (productId, variantId) => {
        const { cart, activeVariants } = get()
        const resolvedVariant = resolveVariantId(
          productId,
          variantId,
          activeVariants,
        )
        const entry = cart.find(
          (item) =>
            item.productId === productId &&
            item.variantId === resolvedVariant,
        )
        const current = entry?.quantity ?? 0
        get().setQuantity(productId, current + 1, variantId)
      },

      decrementQuantity: (productId, variantId) => {
        const { cart, activeVariants } = get()
        const resolvedVariant = resolveVariantId(
          productId,
          variantId,
          activeVariants,
        )
        const entry = cart.find(
          (item) =>
            item.productId === productId &&
            item.variantId === resolvedVariant,
        )
        const current = entry?.quantity ?? 0
        get().setQuantity(productId, current - 1, variantId)
      },

      saveSystem: () => set({ hasSaved: true }),

      checkout: () =>
        set({
          checkoutMessage:
            'Thanks! Your security system is ready — checkout is a placeholder in this prototype.',
        }),

      clearCheckoutMessage: () => set({ checkoutMessage: null }),

      resetToDefaults: () =>
        set({
          cart: defaultCart,
          activeVariants: defaultActiveVariants,
          openStepId: 'cameras',
          hasSaved: false,
          checkoutMessage: null,
        }),
    }),
    {
      name: STORAGE_KEY,
      partialize: (state) => ({
        cart: state.cart,
        activeVariants: state.activeVariants,
        openStepId: state.openStepId,
      }),
      merge: (persisted, current) => {
        const saved = persisted as Partial<BundlePersistedState> | undefined
        if (!saved?.cart?.length) {
          return current
        }
        return {
          ...current,
          ...saved,
          hasSaved: true,
        }
      },
    },
  ),
)
