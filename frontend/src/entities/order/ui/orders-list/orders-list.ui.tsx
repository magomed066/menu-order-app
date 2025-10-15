import { cn } from '@/shared/lib/utils'

import { Badge, Item, ItemContent, ItemTitle } from '@/shared/ui'

import { ORDER_STATUS } from '../../model/constants'
import type { Props } from './types'

function OrdersList(props: Props) {
  const { data } = props

  return (
    <div className="flex flex-col gap-2">
      <h3>{data.label}</h3>
      <div className="flex flex-col gap-4">
        {data.orders.map((el, index) => (
          <Item
            key={el.number}
            variant="outline"
            size="sm"
            asChild
            className={cn(
              index === 0 &&
                el.status === ORDER_STATUS.NEW &&
                'bg-slate-100 dark:bg-slate-900'
            )}
          >
            <a href="#">
              <ItemContent>
                <ItemTitle>Заказ №{el.number}</ItemTitle>
              </ItemContent>
              <ItemContent>
                <Badge
                  className={cn(
                    'dark:text-white',
                    data.status === ORDER_STATUS.NEW &&
                      'bg-blue-500 dark:bg-blue-800',
                    data.status === ORDER_STATUS.COMPLETED &&
                      'bg-green-500 dark:bg-green-800'
                  )}
                >
                  {data.label}
                </Badge>
              </ItemContent>
            </a>
          </Item>
        ))}
      </div>
    </div>
  )
}

export default OrdersList
