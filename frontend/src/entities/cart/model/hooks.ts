import {
  type CreateDeliveryOrderPayload,
  type CreateDineInOrderPayload,
  OrdersService,
} from '@/shared/api/services'
import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import type { RequestErrors } from '@/shared/lib/types'

export type CreateOrderPayload =
  | ({ orderType: 'dine_in' } & CreateDineInOrderPayload)
  | ({ orderType: 'delivery' } & CreateDeliveryOrderPayload)

export const useCreateOrderMutation = (
  onSuccess?: () => void,
  onError?: (err: RequestErrors['errors']) => void
) => {
  return useMutation({
    mutationFn: (data: CreateOrderPayload) => {
      if (data.orderType === 'dine_in') {
        const { orderType: _orderType, ...payload } = data
        return OrdersService.createDineInOrder(payload)
      }
      const { orderType: _orderType, ...payload } = data
      return OrdersService.createDeliveryOrder(payload)
    },
    onSuccess,
    onError: (err: AxiosError<RequestErrors>) => {
      if (err.response?.data.errors) {
        onError?.(err.response.data.errors)
      }
    },
  })
}
