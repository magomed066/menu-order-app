import type { OrderStatus } from '@/shared/api/services/orders/types'
import { useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

import {
  ORDER_STATUS_LABEL,
  SelectOrder,
  ordersQueryKeys,
} from '@/entities/order'
import { useGetOrder, useUpdateOrderStatus } from '@/entities/order/model/hooks'

import { useAppTranslation } from '@/shared/lib/hooks'
import type { AllTranslationKeys } from '@/shared/lib/hooks'
import { showToast } from '@/shared/lib/toast'
import {
  formattedDate,
  getOrderStatusBadgeCn,
  priceFormatter,
  useQueryParams,
} from '@/shared/lib/utils'

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardFooter,
  CardTitle,
  Separator,
} from '@/shared/ui'
import { Spinner } from '@/shared/ui/spinner'

function OrderCardWidget() {
  const { t } = useAppTranslation()
  const queryClient = useQueryClient()

  const { getQueryParam } = useQueryParams()
  const orderId = getQueryParam('orderId') || 0

  const { order, isFetching } = useGetOrder(Number(orderId))

  const { mutateAsync: updateStatus } = useUpdateOrderStatus(() => {
    queryClient.refetchQueries({
      queryKey: ordersQueryKeys.byId(Number(orderId)),
    })
    showToast('success', t('pages:statusUpdated'))
  })

  const nextStatus: OrderStatus | null = useMemo(() => {
    switch (order?.status) {
      case 'pending':
        return 'cooking'
      case 'cooking':
        return 'ready'
      case 'ready':
        return 'completed'
      default:
        return null
    }
  }, [order?.status])

  const handleStatus = () => {
    if (!order || !nextStatus) return
    updateStatus({ id: order.id, status: nextStatus })
  }

  if (!orderId) {
    return <SelectOrder />
  }

  if (!order || isFetching) {
    return (
      <div className="flex flex-col items-center justify-center flex-1">
        <Spinner scale={10} />
      </div>
    )
  }

  return (
    <Card className="flex-1 px-4">
      <CardTitle className="flex items-center justify-between">
        {t('pages:order')} №{order.id}
        <Badge className={getOrderStatusBadgeCn(order)}>
          {t(ORDER_STATUS_LABEL[order.status] as AllTranslationKeys)}
        </Badge>
      </CardTitle>

      <Separator />

      <CardContent>
        <div className="flex flex-col gap-4">
          {order.dineIn ? (
            <p className="text-md font-bold">
              {t('pages:tableShort')}
              {order.dineIn.tableId}
            </p>
          ) : order.delivery ? (
            <div className="text-sm">
              <div>
                {t('pages:delivery')} {order.delivery.deliveryAddress}
              </div>
            </div>
          ) : null}

          <Separator className="my-1" />

          <p className="text-md">
            <span className="text-slate-700 dark:text-white">
              {t('pages:orderTime')}
            </span>{' '}
            <span className="font-bold">{formattedDate(order.createdAt)}</span>
          </p>
        </div>
        <Separator className="my-4" />
        <div>
          <h2 className="mb-4 text-lg">{t('pages:orderedItems')}</h2>
          <div className="flex flex-col gap-2 border-y border-gray-200 p-3">
            {order.items.map((it) => (
              <div key={it.id} className="flex items-center justify-between">
                <p className="font-bold">
                  {it.productName} x {it.quantity}
                </p>
                <strong>
                  {priceFormatter.format(Number(it.unitPrice) * it.quantity)}
                </strong>
              </div>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="mt-auto flex items-center justify-between border-t">
        <p className="text-lg font-bold">
          {t('pages:total')} {priceFormatter.format(Number(order.totalAmount))}
        </p>
        {nextStatus && (
          <Button
            onClick={handleStatus}
            className="bg-green-500 dark:bg-green-800 dark:text-white"
          >
            {nextStatus === 'cooking' && t('pages:toCooking')}
            {nextStatus === 'ready' && t('pages:toReady')}
            {nextStatus === 'completed' && t('pages:toCompleted')}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

export default OrderCardWidget
