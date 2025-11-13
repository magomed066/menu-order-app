import { useState } from 'react'

import { useCart } from '@/entities/cart/model/store'

import { OrdersService } from '@/shared/api/services/orders'
import { priceFormatter } from '@/shared/lib/utils'
import { notify } from '@/shared/lib/toast'
import { Button, Card, CardContent, Input, SelectBox } from '@/shared/ui'

function CartPage() {
  const { items, setQty, remove, total, clear } = useCart()
  const [tableId, setTableId] = useState<number>(1)
  const [guestCount, setGuestCount] = useState<number>(1)
  const [paymentMethod, setPaymentMethod] = useState<'online' | 'cash' | 'card_waiter'>('cash')
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
      notify('success', 'Заказ оформлен')
      clear()
    } catch (e) {
      notify('error', 'Не удалось оформить заказ')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-4">
      <h1 className="text-xl font-semibold">Корзина</h1>
      <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
        <Card>
          <CardContent className="p-4">
            {!items.length ? (
              <div className="text-muted-foreground">Корзина пуста</div>
            ) : (
              <div className="flex flex-col gap-4">
                {items.map((i) => (
                  <div key={i.id} className="flex items-center gap-4">
                    <img src={i.image} className="h-16 w-16 rounded object-cover" />
                    <div className="flex-1">
                      <div className="font-medium">{i.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {priceFormatter.format(i.price)}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="icon" variant="outline" onClick={() => setQty(i.id, i.quantity - 1)}>
                        -
                      </Button>
                      <Input
                        type="number"
                        className="w-16 text-center"
                        min={1}
                        value={i.quantity}
                        onChange={(e) => setQty(i.id, Number(e.target.value))}
                      />
                      <Button size="icon" variant="outline" onClick={() => setQty(i.id, i.quantity + 1)}>
                        +
                      </Button>
                    </div>
                    <Button variant="destructive" onClick={() => remove(i.id)}>
                      Удалить
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col gap-4 p-4">
            <div>
              <div className="mb-2 text-sm text-muted-foreground">Столик</div>
              <Input
                type="number"
                min={1}
                value={tableId}
                onChange={(e) => setTableId(Number(e.target.value))}
              />
            </div>
            <div>
              <div className="mb-2 text-sm text-muted-foreground">Количество гостей</div>
              <Input
                type="number"
                min={1}
                value={guestCount}
                onChange={(e) => setGuestCount(Number(e.target.value))}
              />
            </div>
            <div>
              <div className="mb-2 text-sm text-muted-foreground">Оплата</div>
              <SelectBox
                options={[
                  { label: 'Онлайн', value: 'online' },
                  { label: 'Наличные', value: 'cash' },
                  { label: 'Картой официанту', value: 'card_waiter' },
                ]}
                value={paymentMethod}
                onValueChange={(v) => setPaymentMethod(v as any)}
              />
            </div>
            <div className="mt-2 text-lg font-semibold">
              Итого: {priceFormatter.format(total)}
            </div>
            <Button disabled={!items.length || loading} onClick={placeOrder}>
              Оформить заказ
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default CartPage
