import { OrdersService } from '@/shared/api/services/orders'
import { useState } from 'react'

import { useCart } from '@/entities/cart/model/store'

import { useAppTranslation } from '@/shared/lib/hooks'
import { notify } from '@/shared/lib/toast'
import { priceFormatter } from '@/shared/lib/utils'

import { Button, Card, CardContent, Input, SelectBox } from '@/shared/ui'
import { ShoppingCart, Minus, Plus, Trash } from 'lucide-react'

function CartPage() {
  const { t } = useAppTranslation()
  const { items, setQty, remove, total, clear } = useCart()
  const [tableId, setTableId] = useState<number>(1)
  const [guestCount, setGuestCount] = useState<number>(1)
  const [paymentMethod, setPaymentMethod] = useState<
    'online' | 'cash' | 'card_waiter'
  >('cash')
  const [loading, setLoading] = useState(false)

  const placeOrder = async () => {
    if (!items.length) return
    try {
      setLoading(true)
      await OrdersService.createDineInOrder({
        tableId,
        guestCount,
        paymentMethod,
        items: items.map((i) => ({ productId: i.id, quantity: i.quantity })),
      })
      notify('success', t('pages:orderPlaced'))
      clear()
    } catch (e) {
      notify('error', t('pages:orderPlaceError'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex-1">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-4">
        <div className="mb-2 flex items-center gap-2 text-2xl font-semibold">
          <ShoppingCart className="h-6 w-6" /> {t('pages:cartTitle')}
        </div>
        <div className="grid gap-6 md:grid-cols-[1.6fr_1fr]">
          <Card>
            <CardContent className="p-0">
              {!items.length ? (
                <div className="p-6 text-muted-foreground">{t('pages:emptyCart')}</div>
              ) : (
                <div className="divide-y">
                  {items.map((i) => (
                    <div key={i.id} className="flex items-center gap-4 p-4">
                      <img src={i.image} className="h-16 w-16 rounded-lg object-cover" />
                      <div className="flex-1">
                        <div className="font-medium leading-tight">{i.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {priceFormatter.format(i.price)}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="icon" variant="outline" onClick={() => setQty(i.id, i.quantity - 1)}>
                          <Minus className="h-4 w-4" />
                        </Button>
                        <Input
                          type="number"
                          className="w-16 text-center"
                          min={1}
                          value={i.quantity}
                          onChange={(e) => setQty(i.id, Number(e.target.value))}
                        />
                        <Button size="icon" variant="outline" onClick={() => setQty(i.id, i.quantity + 1)}>
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button variant="destructive" className="gap-2" onClick={() => remove(i.id)}>
                        <Trash className="h-4 w-4" /> {t('pages:delete')}
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
          <Card className="md:sticky md:top-4 h-fit">
            <CardContent className="flex flex-col gap-4 p-4">
              <div>
                <div className="mb-2 text-sm text-muted-foreground">{t('pages:table')}</div>
                <Input
                  type="number"
                  min={1}
                  value={tableId}
                  onChange={(e) => setTableId(Number(e.target.value))}
                />
              </div>
              <div>
                <div className="mb-2 text-sm text-muted-foreground">{t('pages:guestCount')}</div>
                <Input
                  type="number"
                  min={1}
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                />
              </div>
              <div>
                <div className="mb-2 text-sm text-muted-foreground">{t('pages:payment')}</div>
                <SelectBox
                  options={[
                    { label: t('pages:payment_online'), value: 'online' },
                    { label: t('pages:payment_cash'), value: 'cash' },
                    { label: t('pages:payment_card_waiter'), value: 'card_waiter' },
                  ]}
                  value={paymentMethod}
                  onValueChange={(v) => setPaymentMethod(v as any)}
                />
              </div>
              <div className="mt-2 flex items-center justify-between text-base font-semibold">
                <span>{t('pages:total')}</span>
                <span>{priceFormatter.format(total)}</span>
              </div>
              <Button size="lg" disabled={!items.length || loading} onClick={placeOrder}>
                {t('pages:placeOrder')}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default CartPage
