import {
  ProductCard,
  ProductCardSkeleton,
  ProductsEmpty,
  useGetProducts,
} from '@/entities/products'

function ProductsListWidget() {
  const { isFetching, products } = useGetProducts()

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
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((item) => (
        <ProductCard data={item} key={item.id} />
      ))}
    </div>
  )
}

export default ProductsListWidget
