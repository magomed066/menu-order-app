import { useAppTranslation } from '@/shared/lib/hooks'

import OrderCard from '../order-card'
import type { Props } from './types'

function OrdersList(props: Props) {
  const { t } = useAppTranslation()
  const { data, onSelect, activeOrderId } = props

  const handleSelect = (number: number) => {
    onSelect?.(number)
  }

  return (
    <div className="flex flex-col gap-2">
      <h3>{t(data.label as any)}</h3>
      <div className="flex flex-col gap-4">
        {data.list.map((el) => (
          <OrderCard
            key={el.id}
            data={el}
            onClick={(el) => handleSelect(el.id)}
            isActive={activeOrderId === el.id}
            totalPrice={el.totalAmount}
            badge
          />
        ))}
      </div>
    </div>
  )
}

export default OrdersList
