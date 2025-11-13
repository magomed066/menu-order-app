import qs from 'qs'
import { useLocation, useSearchParams } from 'react-router-dom'

export type QueryParams = {
  page?: string
  search?: string
  categoryId?: string
}

export const useQueryParams = () => {
  const location = useLocation()

  const [, setSearchParams] = useSearchParams()

  const getQueryParams = (): QueryParams => {
    return qs.parse(location.search, {
      ignoreQueryPrefix: true,
    }) as QueryParams
  }

  // Get a single query parameter
  const getQueryParam = <T extends keyof QueryParams>(key: T) => {
    const params = getQueryParams()
    return params[key]
  }

  const setQueryParams = (params: QueryParams) => {
    const currentParams = getQueryParams()
    const newParams: Record<string, string> = { ...currentParams, ...params }

    // Remove keys with undefined values
    Object.keys(newParams).forEach((key) => {
      if (newParams[key] === undefined) {
        delete newParams[key]
      }
    })

    const searchString = qs.stringify(newParams, { addQueryPrefix: true })

    setSearchParams(searchString)
  }

  const removeQueryParam = <K extends keyof QueryParams>(key: K) => {
    const currentParams = getQueryParams()
    delete currentParams[key]
    const searchString = qs.stringify(currentParams, { addQueryPrefix: true })

    setSearchParams(searchString)
  }

  const removeQueryParams = <K extends keyof QueryParams>(keys: K[]) => {
    const currentParams = getQueryParams()

    keys.forEach((key) => {
      delete currentParams[key]
    })

    const searchString = qs.stringify(currentParams, { addQueryPrefix: true })
    setSearchParams(searchString)
  }

  const setCommaSeparatedParams = <K extends keyof QueryParams>(
    params: Record<K, string[]>
  ) => {
    const currentParams = getQueryParams()
    const newParams: Record<string, string> = { ...currentParams }

    Object.keys(params).forEach((key) => {
      newParams[key] = params[key as K].join(',')
    })

    const searchString = qs.stringify(newParams, { addQueryPrefix: true })
    setSearchParams(searchString)
  }

  return {
    getQueryParams,
    setQueryParams,
    getQueryParam,
    removeQueryParam,
    removeQueryParams,
    setCommaSeparatedParams,
  }
}
