import type { BundleCatalog, CartEntry } from '@/types/bundle'
import catalogData from '@/data/catalog.json'
import camV4Img from '@/assets/camv4.png'
import camPanV3Img from '@/assets/campanv3.png'
import floodlightImg from '@/assets/floodlight.png'
import doorbellImg from '@/assets/doorbell.png'
import batteryCamImg from '@/assets/batterycam.png'
import motionSensorImg from '@/assets/Wyze Sense Motion Sensor.png'
import senseHubImg from '@/assets/Wyze Sense Hub.png'
import microsdImg from '@/assets/Black256GBmicroSD ..png'

const productImages: Record<string, string> = {
  'wyze-cam-v4': camV4Img,
  'wyze-cam-pan-v3': camPanV3Img,
  'wyze-cam-floodlight-v2': floodlightImg,
  'wyze-duo-cam-doorbell': doorbellImg,
  'wyze-battery-cam-pro': batteryCamImg,
  'wyze-sense-motion': motionSensorImg,
  'wyze-sense-hub': senseHubImg,
  'wyze-microsd-256': microsdImg,
}

const catalogWithImages: BundleCatalog = {
  ...(catalogData as BundleCatalog),
  products: (catalogData as BundleCatalog).products.map((product) => ({
    ...product,
    image: productImages[product.id] ?? product.image,
  })),
}

export const catalog = catalogWithImages

export const productMap = new Map(
  catalog.products.map((product) => [product.id, product]),
)

export const defaultActiveVariants = Object.fromEntries(
  catalog.products
    .filter((product) => product.variants?.length)
    .map((product) => [product.id, product.variants![0].id]),
)

export const defaultCart: CartEntry[] = [
  { productId: 'wyze-cam-v4', variantId: 'white', quantity: 1 },
  { productId: 'wyze-cam-pan-v3', variantId: 'white', quantity: 2 },
  { productId: 'wyze-sense-motion', variantId: null, quantity: 2 },
  { productId: 'wyze-sense-hub', variantId: null, quantity: 1 },
  { productId: 'wyze-microsd-256', variantId: null, quantity: 2 },
  { productId: 'cam-unlimited', variantId: null, quantity: 1 },
]

export function cartKey(productId: string, variantId: string | null): string {
  return variantId ? `${productId}:${variantId}` : productId
}
