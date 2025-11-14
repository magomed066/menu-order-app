import { useCart } from '@/entities/cart/model/store'
import {
  ProductCard,
  ProductCardSkeleton,
  useGetProducts,
} from '@/entities/products'

import { useAppTranslation } from '@/shared/lib/hooks'
import { useQueryParams } from '@/shared/lib/utils'

import { Button } from '@/shared/ui'

function ShopProductsListWidget() {
  const { t } = useAppTranslation()
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
    return (
      <div className="text-center text-muted-foreground">
        {t('pages:noProducts')}
      </div>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((item) => (
        <div key={item.id} className="flex flex-col gap-2">
          <ProductCard
            data={{ ...item, description: item.description ?? '' }}
          />
          <Button onClick={() => add(item)} variant="default">
            {t('pages:addToCart')}
          </Button>
        </div>
      ))}
    </div>
  )
}

export default ShopProductsListWidget
