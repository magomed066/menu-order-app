import { useGetCategories } from '@/entities/categories'

import ProductCategorySelectFeature from '@/features/product-category-select'

import { useAppTranslation } from '@/shared/lib/hooks'
import { useQueryParams } from '@/shared/lib/utils'

import { Button } from '@/shared/ui'

function ShopCategoriesListWidget() {
  const { t } = useAppTranslation()
  const { isFetching, categories } = useGetCategories()
  const { getQueryParam, removeQueryParams } = useQueryParams()

  const categoryId = getQueryParam('categoryId')

  const handleAllClick = () => {
    removeQueryParams(['categoryId', 'search'])
  }

  if (isFetching) return 'Loading...'

  if (!categories) return null

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-1">
        <Button
          variant={categoryId ? 'ghost' : 'default'}
          onClick={handleAllClick}
          className="whitespace-nowrap"
        >
          {t('pages:all')}
        </Button>
        {categories.map((category) => (
          <ProductCategorySelectFeature key={category.id} data={category} />
        ))}
      </div>
    </div>
  )
}

export default ShopCategoriesListWidget
