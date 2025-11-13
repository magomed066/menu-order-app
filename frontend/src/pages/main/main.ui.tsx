import ShopProductsListWidget from '@/widgets/shop-products-list'

import { ROUTES } from '@/shared/lib/config'

import { Button } from '@/shared/ui'

function MainPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Меню</h1>
        <a href={ROUTES.CART}>
          <Button>Корзина</Button>
        </a>
      </div>
      <ShopProductsListWidget />
    </div>
  )
}

export default MainPage
