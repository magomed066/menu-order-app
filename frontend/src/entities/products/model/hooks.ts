import {
  type CreateProduct,
  type Product,
  ProductsService,
} from '@/shared/api/services'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import type { RequestErrors } from '@/shared/lib/types'

export const useCreateProductMutation = (
  onSuccess?: (data: Product) => void,
  onError?: (err: RequestErrors['errors']) => void
) => {
  return useMutation({
    mutationFn: (data: CreateProduct) => ProductsService.createProduct(data),
    onSuccess: async (res) => {
      onSuccess?.(res.data)
    },
    onError: (err: AxiosError<RequestErrors>) => {
      if (err.response?.data.errors) {
        onError?.(err.response.data.errors)
      }
    },
  })
}
