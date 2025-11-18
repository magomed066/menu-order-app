export type OrderStatus =
  | 'pending'
  | 'cooking'
  | 'ready'
  | 'completed'
  | 'cancelled'
export type OrderType = 'dine_in' | 'delivery'

export type PaymentMethod = 'online' | 'cash' | 'card_waiter'

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
  paymentMethod: PaymentMethod
}

export type OrderDeliveryDetails = {
  userId: number | null
  addressId: number | null
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
  paymentMethod: PaymentMethod
  items: CreateDineInOrderItem[]
}

export type CreateDeliveryOrderItem = {
  productId: number
  quantity: number
  specialInstructions?: string
}

export type CreateDeliveryOrderPayload = {
  customerName: string
  customerPhone: string
  deliveryTime?: string
  deliveryAddress: string
  deliveryFee?: number
  paymentMethod: 'online' | 'cash_on_delivery'
  items: CreateDeliveryOrderItem[]
}
