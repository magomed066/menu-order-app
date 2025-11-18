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
  cn,
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
      <div className="flex flex-col gap-2">
        <CardTitle className="flex items-center justify-between text-[20px]">
          №{order.id}
          <Badge className={getOrderStatusBadgeCn(order.status)}>
            {t(ORDER_STATUS_LABEL[order.status] as AllTranslationKeys)}
          </Badge>
        </CardTitle>

        <p className="text-[16px]">
          <span className="text-slate-500 dark:text-white">
            {t('pages:orderTime')}
          </span>{' '}
          <span className=" text-slate-500">
            {formattedDate(order.createdAt)}
          </span>
        </p>
      </div>
      <Separator />

      <CardContent>
        <div className="flex flex-col gap-4">
          {order.dineIn ? (
            <p className="text-md font-bold">
              {t('pages:tableShort')}
              {order.dineIn.tableId}
            </p>
          ) : order.delivery ? (
            <div className="flex items-center gap-8">
              <div className="text-sm flex flex-col gap-4">
                <p className="text-slate-500 text-[16px]">
                  {t('pages:delivery')}:
                </p>
                <p className="text-slate-500 text-[16px]">
                  {t('pages:customerName')}:
                </p>
                <p className="text-slate-500 text-[16px]">
                  {t('pages:customerPhone')}:
                </p>
                <p className="text-slate-500 text-[16px]">
                  {t('pages:payment')}:
                </p>
              </div>

              <div className="text-sm flex flex-col gap-4">
                <p className="text-slate-900 text-[16px]">
                  {order.delivery.deliveryAddress}
                </p>
                <p className="text-slate-900 text-[16px]">
                  {order.delivery.customerName}
                </p>
                <p className="text-slate-900 text-[16px]">
                  {order.delivery.customerPhone}
                </p>
                <p className="text-slate-900 text-[16px]">
                  {order.delivery.paymentMethod === 'online'
                    ? t('pages:payment_online')
                    : t('pages:payment_cash')}
                </p>
              </div>
            </div>
          ) : null}
        </div>
        <div className="mt-5">
          <div className="flex flex-col gap-2 p-3">
            {order.items.map((it, i) => (
              <div
                key={it.id}
                className={cn(
                  'flex items-center justify-between border-t border-gray-200 py-4',
                  i + 1 === order.items.length && 'border-b border-gray-200 '
                )}
              >
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
