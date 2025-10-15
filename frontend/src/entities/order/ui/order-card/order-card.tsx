import { cn } from '@/shared/lib/utils'

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardFooter,
  CardTitle,
  Separator,
} from '@/shared/ui'

function OrderCard() {
  return (
    <Card className="flex-1 px-4">
      <CardTitle className="flex items-center justify-between">
        Заказ №1
        <Badge
          className={cn('dark:text-white', 'bg-blue-500 dark:bg-blue-800')}
        >
          Новый
        </Badge>
      </CardTitle>

      <Separator />

      <CardContent>
        <div className="flex flex-col gap-4">
          <p className="text-md">Стол №5</p>
        </div>
        <Separator className="my-4" />
        <div>
          <h2 className="text-lg mb-4">Заказанные товары:</h2>

          <div className="flex flex-col gap-2">
            <div>
              <p>
                Пицца мексикано - <strong>540 ₽</strong>
              </p>
            </div>
            <div>
              <p>
                Лимонад - <strong>340 ₽</strong>
              </p>
            </div>
            <div>
              <p>
                Бургер - <strong>240 ₽</strong>
              </p>
            </div>
          </div>
        </div>
      </CardContent>

      {/* <Separator className="mt-auto" /> */}

      <CardFooter className="mt-auto border-t flex items-center justify-between">
        <p className="text-lg font-bold">Итого: 1 120 ₽</p>
        <Button className="bg-green-500 dark:bg-green-800 dark:text-white">
          Готово
        </Button>
      </CardFooter>
    </Card>
  )
}

export default OrderCard
