import {
  type CreateProduct,
  type Product,
  ProductsService,
} from '@/shared/api/services'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import type { RequestErrors } from '@/shared/lib/types'
import type { QueryParams } from '@/shared/lib/utils'

import { productsQueryKeys } from './consts'

export const useCreateProductMutation = (
  onSuccess?: (data: Product) => void,
  onError?: (err: RequestErrors['errors']) => void
) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateProduct) => ProductsService.createProduct(data),
    onSuccess: async (res) => {
      await queryClient.invalidateQueries({ queryKey: productsQueryKeys.all() })
      onSuccess?.(res.data)
    },
    onError: (err: AxiosError<RequestErrors>) => {
      if (err.response?.data.errors) {
        onError?.(err.response.data.errors)
      }
    },
  })
}
export const useGetProducts = (params: QueryParams) => {
  const { page = 1, search = '', ...restParams } = params
  const { data, isFetching, isError } = useQuery({
    queryKey: productsQueryKeys.all(search, Number(page), restParams),
    queryFn: () =>
      ProductsService.getProducts(search, Number(page), restParams),
    refetchOnWindowFocus: true,
    staleTime: 0,
  })

  return {
    products: data?.data,
    isError,
    isFetching,
  }
}
