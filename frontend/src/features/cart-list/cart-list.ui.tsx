import { Minus, PackageOpen, Plus, Trash } from 'lucide-react'

import { useCart } from '@/entities/cart'

import { useAppTranslation } from '@/shared/lib/hooks'
import { priceFormatter } from '@/shared/lib/utils'

import { Button, Card, CardContent, Input } from '@/shared/ui'

function CartListFeature() {
  const { t } = useAppTranslation()
  const { items, setQty, remove } = useCart()

  const handleDecrease = (id: number, quantity: number) => {
    if (quantity <= 1) {
      remove(id)
    } else {
      setQty(id, quantity - 1)
    }
  }

  const handleIncrease = (id: number, quantity: number) => {
    setQty(id, quantity + 1)
  }

  const handleQuantityChange = (id: number, value: string) => {
    const next = Number(value)
    if (!Number.isNaN(next) && next > 0) {
      setQty(id, next)
    }
  }

  const handleRemove = (id: number) => {
    remove(id)
  }

  return (
    <Card>
      <CardContent className="p-0">
        {!items.length ? (
          <div className="p-6 text-muted-foreground">
            <div className="w-full h-full flex items-center justify-center">
              <div className="flex flex-col gap-3 items-center">
                <PackageOpen />

                {t('pages:emptyCart')}
              </div>
            </div>
          </div>
        ) : (
          <div className="divide-y">
            {items.map((i) => (
              <div
                key={i.id}
                className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center"
              >
                <img
                  src={i.image}
                  className="h-16 w-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <div className="font-medium leading-tight">{i.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {priceFormatter.format(i.price)}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => handleDecrease(i.id, i.quantity)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    type="number"
                    className="w-16 text-center"
                    min={1}
                    value={i.quantity}
                    onChange={(e) =>
                      handleQuantityChange(i.id, e.target.value)
                    }
                  />
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => handleIncrease(i.id, i.quantity)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <Button
                  variant="destructive"
                  className="gap-2"
                  onClick={() => handleRemove(i.id)}
                >
                  <Trash className="h-4 w-4" /> {t('pages:delete')}
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default CartListFeature
