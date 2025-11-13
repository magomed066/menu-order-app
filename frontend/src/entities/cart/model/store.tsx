import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react'

import type { Product } from '@/shared/api/services'

type CartItem = {
  id: number
  name: string
  price: number
  image: string
  quantity: number
}

type CartState = {
  items: CartItem[]
}

type CartAction =
  | { type: 'ADD'; payload: Omit<CartItem, 'quantity'>; qty?: number }
  | { type: 'REMOVE'; payload: { id: number } }
  | { type: 'SET_QTY'; payload: { id: number; quantity: number } }
  | { type: 'CLEAR' }

const initialState: CartState = { items: [] }

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD': {
      const existing = state.items.find((i) => i.id === action.payload.id)
      if (existing) {
        const newQty = (action.qty ?? 1) + existing.quantity
        return {
          items: state.items.map((i) => (i.id === existing.id ? { ...i, quantity: newQty } : i)),
        }
      }
      return { items: [...state.items, { ...action.payload, quantity: action.qty ?? 1 }] }
    }
    case 'REMOVE':
      return { items: state.items.filter((i) => i.id !== action.payload.id) }
    case 'SET_QTY':
      return {
        items: state.items.map((i) =>
          i.id === action.payload.id ? { ...i, quantity: Math.max(1, action.payload.quantity) } : i,
        ),
      }
    case 'CLEAR':
      return { items: [] }
    default:
      return state
  }
}

type CartContextType = {
  items: CartItem[]
  total: number
  add: (product: Product, qty?: number) => void
  remove: (id: number) => void
  setQty: (id: number, quantity: number) => void
  clear: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState, (init) => {
    const saved = localStorage.getItem('cart')
    return saved ? (JSON.parse(saved) as CartState) : init
  })

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state))
  }, [state])

  const api = useMemo<CartContextType>(() => {
    return {
      items: state.items,
      total: state.items.reduce((acc, i) => acc + i.price * i.quantity, 0),
      add: (p, qty) =>
        dispatch({
          type: 'ADD',
          payload: { id: p.id, name: p.name, image: p.image, price: Number(p.price) },
          qty,
        }),
      remove: (id) => dispatch({ type: 'REMOVE', payload: { id } }),
      setQty: (id, quantity) => dispatch({ type: 'SET_QTY', payload: { id, quantity } }),
      clear: () => dispatch({ type: 'CLEAR' }),
    }
  }, [state])

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}

