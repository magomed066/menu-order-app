import type { AxiosResponse } from 'axios'

import { apiService } from '../../base'

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

export class OrdersService {
  static createDineInOrder(
    data: CreateDineInOrderPayload,
  ): Promise<AxiosResponse<{ success: boolean }>> {
    return apiService.post('/orders/create/dine-in', data)
  }
}

