import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { CartItem, CartStore } from './types'

const calculateTotal = (items: CartItem[]) =>
  items.reduce((acc, item) => acc + item.price * item.quantity, 0)

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      add: (product, qty = 1) => {
        const { items } = get()
        const existing = items.find((i) => i.id === product.id)

        let nextItems: CartItem[]
        if (existing) {
          nextItems = items.map((i) =>
            i.id === existing.id ? { ...i, quantity: i.quantity + qty } : i
          )
        } else {
          nextItems = [
            ...items,
            {
              id: product.id,
              name: product.name,
              image: product.image,
              price: Number(product.price),
              quantity: qty,
            },
          ]
        }

        set({
          items: nextItems,
          total: calculateTotal(nextItems),
        })
      },
      remove: (id) => {
        const nextItems = get().items.filter((i) => i.id !== id)
        set({
          items: nextItems,
          total: calculateTotal(nextItems),
        })
      },
      setQty: (id, quantity) => {
        const safeQty = Math.max(1, quantity)
        const nextItems = get().items.map((i) =>
          i.id === id ? { ...i, quantity: safeQty } : i
        )
        set({
          items: nextItems,
          total: calculateTotal(nextItems),
        })
      },
      clear: () => {
        set({ items: [], total: 0 })
      },
    }),
    {
      name: 'cart',
      partialize: (state) => ({
        items: state.items,
        total: state.total,
      }),
    }
  )
)

// Backwards compatibility for existing provider HOC
export const CartProvider: React.FC<React.PropsWithChildren> = ({ children }) =>
  children
