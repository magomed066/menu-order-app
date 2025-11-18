import { type ChangeEvent, useState } from 'react'

import { useCart, useCreateOrderMutation } from '@/entities/cart'

import { useAppTranslation } from '@/shared/lib/hooks'
import { notify } from '@/shared/lib/toast'
import { priceFormatter } from '@/shared/lib/utils'

import { ButtonLoading, Card, CardContent, Input, SelectBox } from '@/shared/ui'

function CheckoutOrderFeature() {
  const { t } = useAppTranslation()

  const [formData, setFormData] = useState({
    tableId: 1,
    guestCount: 1,
  })
  const [orderType, setOrderType] = useState<'dine_in' | 'delivery'>('dine_in')
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [deliveryAddress, setDeliveryAddress] = useState('')
  const [deliveryPaymentMethod, setDeliveryPaymentMethod] = useState<
    'online' | 'cash_on_delivery'
  >('cash_on_delivery')
  const { items, total, clear } = useCart()

  const { mutate, isPending } = useCreateOrderMutation(() => {
    notify('success', t('pages:orderPlaced'))
    clear()
  })

  const handleNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target

    if (/^\d*$/.test(value)) {
      const numericValue = value === '' ? 0 : Number(value)

      setFormData((prev) => ({
        ...prev,
        [name]: numericValue,
      }))
    }
  }

  const placeOrder = async () => {
    if (!items.length) return

    if (orderType === 'dine_in') {
      mutate({
        orderType: 'dine_in',
        paymentMethod: 'cash',
        tableId: formData.tableId,
        guestCount: formData.guestCount,
        items: items.map((i) => ({ productId: i.id, quantity: i.quantity })),
      })
      return
    }

    mutate({
      orderType: 'delivery',
      customerName,
      customerPhone,
      deliveryTime: undefined,
      deliveryAddress,
      deliveryFee: undefined,
      paymentMethod: deliveryPaymentMethod,
      items: items.map((i) => ({ productId: i.id, quantity: i.quantity })),
    })
  }

  return (
    <Card className="md:sticky md:top-4 h-fit">
      <CardContent className="flex flex-col gap-4 p-4">
        <div>
          <div className="mb-2 text-sm text-muted-foreground">
            {t('pages:orderType')}
          </div>
          <SelectBox
            options={[
              { label: t('pages:orderType_dine_in'), value: 'dine_in' },
              { label: t('pages:orderType_delivery'), value: 'delivery' },
            ]}
            value={orderType}
            onValueChange={(v) => setOrderType(v as 'dine_in' | 'delivery')}
          />
        </div>
        {orderType === 'dine_in' && (
          <>
            <div>
              <div className="mb-2 text-sm text-muted-foreground">
                {t('pages:table')}
              </div>
              <Input
                name="tableId"
                value={formData.tableId}
                onChange={handleNumberChange}
              />
            </div>
            <div>
              <div className="mb-2 text-sm text-muted-foreground">
                {t('pages:guestCount')}
              </div>
              <Input
                name="guestCount"
                value={formData.guestCount}
                onChange={handleNumberChange}
              />
            </div>
          </>
        )}
        {orderType === 'delivery' && (
          <>
            <div>
              <div className="mb-2 text-sm text-muted-foreground">
                {t('pages:customerName')}
              </div>
              <Input
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </div>
            <div>
              <div className="mb-2 text-sm text-muted-foreground">
                {t('pages:customerPhone')}
              </div>
              <Input
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
              />
            </div>
            <div>
              <div className="mb-2 text-sm text-muted-foreground">
                {t('pages:deliveryAddress')}
              </div>
              <Input
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
              />
            </div>
            <div>
              <div className="mb-2 text-sm text-muted-foreground">
                {t('pages:payment')}
              </div>
              <SelectBox
                options={[
                  { label: t('pages:payment_online'), value: 'online' },
                  {
                    label: t('pages:payment_cash'),
                    value: 'cash_on_delivery',
                  },
                ]}
                value={deliveryPaymentMethod}
                onValueChange={(v) =>
                  setDeliveryPaymentMethod(
                    v as 'online' | 'cash_on_delivery',
                  )
                }
              />
            </div>
          </>
        )}
        {/* <div>
          <div className="mb-2 text-sm text-muted-foreground">
            {t('pages:payment')}
          </div>
          <SelectBox
            disabled
            options={[
              { label: t('pages:payment_online'), value: 'online' },
              { label: t('pages:payment_cash'), value: 'cash' },
              {
                label: t('pages:payment_card_waiter'),
                value: 'card_waiter',
              },
            ]}
            value={paymentMethod}
            onValueChange={(v) => setPaymentMethod(v as any)}
          />
        </div> */}
        <div className="mt-2 flex items-center justify-between text-base font-semibold">
          <span>{t('pages:total')}</span>
          <span>{priceFormatter.format(total)}</span>
        </div>
        <ButtonLoading
          size="lg"
          loading={isPending}
          disabled={
            !items.length ||
            isPending ||
            (orderType === 'dine_in' &&
              (!formData.tableId || !formData.guestCount)) ||
            (orderType === 'delivery' &&
              (!customerName || !customerPhone || !deliveryAddress))
          }
          onClick={placeOrder}
        >
          {t('pages:placeOrder')}
        </ButtonLoading>
      </CardContent>
    </Card>
  )
}

export default CheckoutOrderFeature
