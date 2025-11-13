import type { Optional } from 'sequelize'

export type OrderType = 'dine_in' | 'delivery'
export type OrderStatus =
  | 'pending'
  | 'cooking'
  | 'ready'
  | 'completed'
  | 'cancelled'

export interface OrderAttributes {
  id: number
  orderType: OrderType
  status: OrderStatus
  totalAmount: number
  createdAt?: Date
  updatedAt?: Date
}

export type OrderCreationAttributes = Optional<
  OrderAttributes,
  'id' | 'status' | 'totalAmount' | 'createdAt' | 'updatedAt'
>

export interface OrderItemAttributes {
  id: number
  orderId: number
  productId: number
  quantity: number
  unitPrice: number
  specialInstructions: string | null
  createdAt?: Date
  updatedAt?: Date
}

export type OrderItemCreationAttributes = Optional<
  OrderItemAttributes,
  'id' | 'specialInstructions' | 'createdAt' | 'updatedAt'
>

export type OrderItemDto = {
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
  deliveryTime: Date | null
  deliveryAddress: string
  deliveryFee: string
  paymentMethod: 'online' | 'cash_on_delivery'
}

export type OrderDto = {
  id: number
  orderType: OrderType
  status: OrderStatus
  totalAmount: string
  items: OrderItemDto[]
  dineIn?: OrderDineInDetails | null
  delivery?: OrderDeliveryDetails | null
}
