import type { Order } from '@/shared/api/services'

import { ORDER_STATUSES } from '@/entities/order'

import { cn } from './classNames'

export const getOrderStatusBadgeCn = (order: Order) => {
  return cn(
    order.status === ORDER_STATUSES.PENDING &&
      'bg-blue-500 dark:bg-blue-800 dark:text-white',
    order.status === ORDER_STATUSES.COOKING &&
      'bg-violet-500 dark:bg-violet-800 dark:text-white',
    order.status === ORDER_STATUSES.READY &&
      'bg-green-500 dark:bg-green-800 dark:text-white'
  )
}
