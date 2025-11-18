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
      await queryClient.invalidateQueries({ queryKey: ['allProducts'] })
      onSuccess?.(res.data)
    },
    onError: (err: AxiosError<RequestErrors>) => {
      if (err.response?.data.errors) {
        onError?.(err.response.data.errors)
      }
    },
  })
}

export const useUpdateProductMutation = (
  onSuccess?: (data: Product) => void,
  onError?: (err: RequestErrors['errors']) => void
) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: { id: number; data: CreateProduct }) =>
      ProductsService.updateProduct(payload.id, payload.data),
    onSuccess: async (res, variables) => {
      await queryClient.invalidateQueries({ queryKey: ['allProducts'] })
      await queryClient.invalidateQueries({
        queryKey: productsQueryKeys.byId(variables.id),
      })
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

export const useGetPublicProducts = (params: QueryParams) => {
  const { page = 1, search = '', ...restParams } = params
  const { data, isFetching, isError } = useQuery({
    queryKey: productsQueryKeys.all(search, Number(page), {
      ...restParams,
      scope: 'public',
    }),
    queryFn: () =>
      ProductsService.getPublicProducts(search, Number(page), restParams),
    refetchOnWindowFocus: true,
    staleTime: 0,
  })

  return {
    products: data?.data,
    isError,
    isFetching,
  }
}

export const useGetProduct = (id?: number) => {
  const enabled = typeof id === 'number' && id > 0
  const { data, isFetching, isError } = useQuery({
    queryKey: productsQueryKeys.byId(id ?? 0),
    queryFn: () => ProductsService.getProductById(id as number),
    enabled,
  })

  return {
    product: data?.data,
    isError,
    isFetching,
  }
}
