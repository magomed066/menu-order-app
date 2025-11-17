import { type ChangeEvent, useEffect, useState } from 'react'
import { useDebounceValue } from 'usehooks-ts'

import { useAppTranslation } from '@/shared/lib/hooks'
import { useQueryParams } from '@/shared/lib/utils'

import { Input } from '@/shared/ui'

function ShopProductsSearchFeature() {
  const { getQueryParam, setQueryParams, removeQueryParam } = useQueryParams()
  const { t } = useAppTranslation()
  const defaultQuery = getQueryParam('search') || ''
  const [query, setQuery] = useState(defaultQuery)
  const [debounced] = useDebounceValue(query, 500)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target

    setQuery(value)
  }

  useEffect(() => {
    if (debounced) {
      setQueryParams({ search: debounced })
    } else {
      removeQueryParam('search')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced])

  return (
    <Input
      placeholder={t('pages:searchMenuPlaceholder')}
      defaultValue={defaultQuery}
      value={query}
      onChange={handleChange}
    />
  )
}

export default ShopProductsSearchFeature
