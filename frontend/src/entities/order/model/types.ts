import type { Order } from '@/shared/api/services'

import { ORDER_STATUSES, ORDER_STATUS_LABEL } from './constants'

export type OrderGroup = {
  status: keyof typeof ORDER_STATUSES
  label: keyof typeof ORDER_STATUS_LABEL
  list: Order[]
}
