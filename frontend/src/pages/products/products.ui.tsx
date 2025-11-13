import ProductsActionsFeature from '@/features/products-actions'

import ProductsListWidget from '@/widgets/products-list'

function ProductsPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <ProductsActionsFeature />
      <ProductsListWidget />
    </div>
  )
}

export default ProductsPage
