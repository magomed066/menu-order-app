import { Button } from '@/shared/ui'

function ShopCategoriesListWidget() {
  return (
    <div className="flex items-center gap-3">
      <Button variant="default">Все</Button>
      <Button variant="outline">Пиццы</Button>
      <Button variant="outline">Напитки</Button>
      <Button variant="outline">Бургеры</Button>
      <Button variant="outline">Салаты</Button>
    </div>
  )
}

export default ShopCategoriesListWidget
