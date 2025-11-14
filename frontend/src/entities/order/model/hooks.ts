import { OrdersService } from '@/shared/api/services/orders'
import type { Order, OrderStatus } from '@/shared/api/services/orders/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { ordersQueryKeys } from './constants'

export function useGetOrders(filters?: {
  status?: OrderStatus
  orderType?: 'dine_in' | 'delivery'
}) {
  const { data, isFetching, isError } = useQuery({
    queryKey: ordersQueryKeys.all(filters),
    queryFn: () => OrdersService.getOrders({ ...filters, limit: 100, page: 1 }),
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 0,
  })
  return { orders: data?.data ?? [], isFetching, isError }
}

export function useGetOrder(id?: number) {
  const enabled = typeof id === 'number' && id > 0
  const { data, isFetching } = useQuery({
    queryKey: ordersQueryKeys.byId(id ?? 0),
    queryFn: () => OrdersService.getOrderById(id as number),
    enabled,
  })
  return { order: data?.data as Order | undefined, isFetching }
}

export function useUpdateOrderStatus(onSuccess?: () => void) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: OrderStatus }) =>
      OrdersService.updateOrderStatus(id, status),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ordersQueryKeys.all() })
      onSuccess?.()
    },
  })
}
