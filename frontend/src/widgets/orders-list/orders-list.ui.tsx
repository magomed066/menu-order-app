import type { OrderStatus } from '@/shared/api/services/orders/types'

import {
  ORDER_STATUSES,
  ORDER_STATUS_LABEL,
  type OrderGroup,
} from '@/entities/order'
import { useGetOrders } from '@/entities/order/model/hooks'

import OrdersListFeature from '@/features/orders-list'

import { ScrollArea } from '@/shared/ui'

function OrdersListWidget() {
  const { orders: newOrders } = useGetOrders({
    status: 'pending' as OrderStatus,
  })
  const { orders: cookingOrders } = useGetOrders({
    status: 'cooking' as OrderStatus,
  })
  const { orders: readyOrders } = useGetOrders({
    status: 'ready' as OrderStatus,
  })

  const groups = [
    {
      status: ORDER_STATUSES.PENDING,
      label: ORDER_STATUS_LABEL[ORDER_STATUSES.PENDING],
      list: newOrders || [],
    },
    {
      status: ORDER_STATUSES.COOKING,
      label: ORDER_STATUS_LABEL[ORDER_STATUSES.COOKING],
      list: cookingOrders || [],
    },
    {
      status: ORDER_STATUSES.READY,
      label: ORDER_STATUS_LABEL[ORDER_STATUSES.READY],
      list: readyOrders || [],
    },
  ] as OrderGroup[]

  return (
    <ScrollArea className="h-[300px] md:h-[83vh] relative w-full md:w-[300px]">
      <div className="flex flex-col gap-5 w-full md:w-[300px] pb-10 dark:pb-0 pr-3">
        {groups.map((group) => (
          <OrdersListFeature key={group.status} data={group} />
        ))}
      </div>
    </ScrollArea>
  )
}

export default OrdersListWidget
