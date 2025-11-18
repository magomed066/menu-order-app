import { CategoriesService } from '@/shared/api/services'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import type { RequestErrors } from '@/shared/lib/types'

import { categoriesQueryKeys } from './consts'

export function useGetCategories() {
  const { data, isFetching, isError } = useQuery({
    queryKey: categoriesQueryKeys.all(),
    queryFn: () => CategoriesService.getCategories(),
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 0,
  })
  return { categories: data?.data ?? [], isFetching, isError }
}

// Public (client) categories – only active ones
export function useGetPublicCategories() {
  const { data, isFetching, isError } = useQuery({
    queryKey: ['publicCategories'],
    queryFn: () => CategoriesService.getPublicCategories(),
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 0,
  })
  return { categories: data?.data ?? [], isFetching, isError }
}

export function useCreateCategoryMutation(
  onSuccess?: () => void,
  onError?: (err: RequestErrors['errors']) => void,
) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: CategoriesService.createCategory,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: categoriesQueryKeys.all(),
      })
      onSuccess?.()
    },
    onError: (err: AxiosError<RequestErrors>) => {
      if (err.response?.data.errors) {
        onError?.(err.response.data.errors)
      }
    },
  })
}

export function useUpdateCategoryMutation(
  onSuccess?: () => void,
  onError?: (err: RequestErrors['errors']) => void,
) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: { id: number; data: Parameters<typeof CategoriesService.updateCategory>[1] }) =>
      CategoriesService.updateCategory(payload.id, payload.data),
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: categoriesQueryKeys.all(),
      })
      await queryClient.invalidateQueries({
        queryKey: categoriesQueryKeys.byId(variables.id),
      })
      onSuccess?.()
    },
    onError: (err: AxiosError<RequestErrors>) => {
      if (err.response?.data.errors) {
        onError?.(err.response.data.errors)
      }
    },
  })
}

export function useDeleteCategoryMutation(
  onSuccess?: () => void,
  onError?: (err: RequestErrors['errors']) => void,
) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => CategoriesService.deleteCategory(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: categoriesQueryKeys.all(),
      })
      onSuccess?.()
    },
    onError: (err: AxiosError<RequestErrors>) => {
      if (err.response?.data.errors) {
        onError?.(err.response.data.errors)
      }
    },
  })
}
