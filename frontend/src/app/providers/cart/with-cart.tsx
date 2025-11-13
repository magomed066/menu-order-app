import type { ComponentType } from 'react'

import { CartProvider } from '@/entities/cart/model/store'

export const withCart = (Component: ComponentType) => () => {
  return (
    <CartProvider>
      <Component />
    </CartProvider>
  )
}

