import type { AxiosResponse } from 'axios'

import { apiService } from '../../base'
import type {
  CreateDineInOrderPayload,
  Order,
  OrderStatus,
  OrderType,
} from './types'

export class OrdersService {
  static createDineInOrder(
    data: CreateDineInOrderPayload
  ): Promise<AxiosResponse<{ success: boolean }>> {
    return apiService.post('/orders/create/dine-in', data)
  }

  static getOrders(params: {
    status?: OrderStatus
    orderType?: OrderType
    page?: number
    limit?: number
  }): Promise<AxiosResponse<Order[]>> {
    return apiService.get('/orders/all', { params })
  }

  static getOrderById(id: number): Promise<AxiosResponse<Order>> {
    return apiService.get(`/orders/${id}`)
  }

  static updateOrderStatus(
    id: number,
    status: OrderStatus
  ): Promise<AxiosResponse<Order>> {
    return apiService.put(`/orders/update/${id}`, { status })
  }
}
