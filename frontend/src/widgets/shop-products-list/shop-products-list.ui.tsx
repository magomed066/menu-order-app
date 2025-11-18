import { useCart } from '@/entities/cart/model/store'
import {
  ProductCard,
  ProductCardSkeleton,
  useGetPublicProducts,
} from '@/entities/products'

import AddToCartFeature from '@/features/add-to-cart'

import { useAppTranslation } from '@/shared/lib/hooks'
import { useQueryParams } from '@/shared/lib/utils'

function ShopProductsListWidget() {
  const { t } = useAppTranslation()
  const { getQueryParam } = useQueryParams()
  const searchQuery = getQueryParam('search')
  const categoryId = getQueryParam('categoryId')
  const { items } = useCart()

  const { isFetching, products } = useGetPublicProducts({
    search: searchQuery,
    categoryId,
  })

  if (isFetching) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
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
      {products.map((item) => {
        const inCart = items.some((cartItem) => cartItem.id === item.id)

        return (
          <div key={item.id} className="flex flex-col gap-2">
            <ProductCard
              data={{ ...item, description: item.description ?? '' }}
            />
            <AddToCartFeature data={item} inCart={inCart} />
          </div>
        )
      })}
    </div>
  )
}

export default ShopProductsListWidget
