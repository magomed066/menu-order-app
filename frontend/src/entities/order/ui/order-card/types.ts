import type { Order } from '@/shared/api/services'

export type Props = {
  data: Order
  onClick?: (data: Order) => void
  isActive: boolean
  badge?: boolean
  totalPrice: string
}
