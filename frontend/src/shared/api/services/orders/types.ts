export type OrderStatus =
  | 'pending'
  | 'cooking'
  | 'ready'
  | 'completed'
  | 'cancelled'
export type OrderType = 'dine_in' | 'delivery'

export type OrderItem = {
  id: number
  productId: number
  productName: string
  quantity: number
  unitPrice: string
  specialInstructions: string
}

export type OrderDineInDetails = {
  tableId: number
  guestCount: number
  paymentMethod: 'online' | 'cash' | 'card_waiter'
}

export type OrderDeliveryDetails = {
  userId: number | null
  addressId: number
  customerName: string
  customerPhone: string
  deliveryTime: string | null
  deliveryAddress: string
  deliveryFee: string
  paymentMethod: 'online' | 'cash_on_delivery'
}

export type Order = {
  id: number
  orderType: OrderType
  status: OrderStatus
  totalAmount: string
  items: OrderItem[]
  dineIn?: OrderDineInDetails | null
  delivery?: OrderDeliveryDetails | null
  createdAt?: Date
}

export type CreateDineInOrderItem = {
  productId: number
  quantity: number
  specialInstructions?: string
}

export type CreateDineInOrderPayload = {
  tableId: number
  guestCount: number
  paymentMethod: 'online' | 'cash' | 'card_waiter'
  items: CreateDineInOrderItem[]
}
