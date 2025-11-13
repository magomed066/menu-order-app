import type { OrderGroup } from '../../model/types'

export type Props = {
  data: OrderGroup
  activeOrderId?: number
  onSelect?: (id: number) => void
}
