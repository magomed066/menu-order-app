import type { Product } from '@/shared/api/services'

export type CartItem = {
  id: number
  name: string
  price: number
  image: string
  quantity: number
}

export type CartStore = {
  items: CartItem[]
  total: number
  add: (product: Product, qty?: number) => void
  remove: (id: number) => void
  setQty: (id: number, quantity: number) => void
  clear: () => void
}
