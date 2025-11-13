export type CreateOrderItemInput = {
  productId: number
  quantity: number
  specialInstructions?: string
}

export type CreateOrderDineInDto = {
  tableId: number
  guestCount: number
  paymentMethod: 'online' | 'cash' | 'card_waiter'
  items: CreateOrderItemInput[]
}

export type CreateOrderDeliveryDto = {
  addressId: number
  customerName: string
  customerPhone: string
  deliveryTime?: string
  deliveryAddress: string
  deliveryFee?: number
  paymentMethod: 'online' | 'cash_on_delivery'
  items: CreateOrderItemInput[]
}
