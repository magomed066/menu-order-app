import { ProductCard, ProductCardSkeleton, useGetProducts } from '@/entities/products'
import { useCart } from '@/entities/cart/model/store'

import { Button } from '@/shared/ui'
import { useQueryParams } from '@/shared/lib/utils'

function ShopProductsListWidget() {
  const { getQueryParam } = useQueryParams()
  const searchQuery = getQueryParam('search')
  const { add } = useCart()

  const { isFetching, products } = useGetProducts({
    search: searchQuery,
  })

  if (isFetching) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (!products?.length) {
    return <div className="text-center text-muted-foreground">Нет продуктов</div>
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((item) => (
        <div key={item.id} className="flex flex-col gap-2">
          <ProductCard data={{ ...item, description: item.description ?? '' }} />
          <Button onClick={() => add(item)} variant="default">
            В корзину
          </Button>
        </div>
      ))}
    </div>
  )
}

export default ShopProductsListWidget

