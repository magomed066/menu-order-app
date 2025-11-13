import { OrdersList } from '@/entities/order'

import { useQueryParams } from '@/shared/lib/utils'

import type { Props } from './types'

function OrdersListFeature(props: Props) {
  const { data } = props

  const { getQueryParam, setQueryParams } = useQueryParams()
  const orderId = getQueryParam('orderId') || 0

  const handleSelect = (id: number) => {
    setQueryParams({
      orderId: String(id),
    })
  }

  return (
    <OrdersList
      key={data.status}
      data={data}
      onSelect={handleSelect}
      activeOrderId={Number(orderId)}
    />
  )
}

export default OrdersListFeature
