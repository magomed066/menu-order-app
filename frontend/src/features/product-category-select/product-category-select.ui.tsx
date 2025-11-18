import { useQueryParams } from '@/shared/lib/utils'

import { Button } from '@/shared/ui'

import type { Props } from './types'

function ProductCategorySelectFeature(props: Props) {
  const { data } = props

  const { setQueryParams, getQueryParam } = useQueryParams()

  const categoryId = getQueryParam('categoryId')

  const handleClick = (id: number) => {
    setQueryParams({
      categoryId: String(id),
    })
  }

  return (
    <Button
      variant={Number(categoryId) === data.id ? 'default' : 'ghost'}
      onClick={() => handleClick(data.id)}
    >
      {data.name}
    </Button>
  )
}

export default ProductCategorySelectFeature
