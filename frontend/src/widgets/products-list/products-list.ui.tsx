import {
  ProductCard,
  ProductCardSkeleton,
  ProductsEmpty,
  useGetProducts,
} from '@/entities/products'

import EditProductDialogFeature from '@/features/edit-product-dialog'

import { useQueryParams } from '@/shared/lib/utils'

function ProductsListWidget() {
  const { getQueryParam, setQueryParams } = useQueryParams()
  const searchQuery = getQueryParam('search')

  const { isFetching, products } = useGetProducts({
    search: searchQuery,
  })

  const handleClick = (id: number) => {
    setQueryParams({
      productId: String(id),
    })
  }

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
    return <ProductsEmpty />
  }

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((item) => (
          <ProductCard data={item} key={item.id} onClick={handleClick} />
        ))}
      </div>
      <EditProductDialogFeature />
    </>
  )
}

export default ProductsListWidget
