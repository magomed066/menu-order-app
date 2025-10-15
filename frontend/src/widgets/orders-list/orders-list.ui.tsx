import { ORDER_STATUS, ORDER_STATUS_LABEL, OrdersList } from '@/entities/order'

import { ScrollArea } from '@/shared/ui'

const orders = [
  { number: 1, status: 'new' },
  { number: 2, status: 'new' },
  { number: 3, status: 'new' },
  { number: 4, status: 'completed' },
  { number: 5, status: 'completed' },
  { number: 6, status: 'completed' },
  { number: 7, status: 'completed' },
  { number: 8, status: 'completed' },
  { number: 9, status: 'completed' },
  { number: 10, status: 'completed' },
  { number: 11, status: 'completed' },
  { number: 12, status: 'completed' },
  { number: 13, status: 'completed' },
]

const statusGroups = Object.values(ORDER_STATUS).map((status) => ({
  status,
  label: ORDER_STATUS_LABEL[status],
  orders: orders.filter((order) => order.status === status),
}))

function OrdersListWidget() {
  return (
    <ScrollArea className="h-[300px] md:h-[86vh] relative w-full md:w-[300px]">
      <div className="flex flex-col gap-5 w-full md:w-[300px] pb-10 dark:pb-0 pr-3">
        {statusGroups.map((group) => (
          <OrdersList key={group.label} data={group} />
        ))}
      </div>
    </ScrollArea>
  )
}

export default OrdersListWidget
