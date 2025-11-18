import { CategoriesService } from '@/shared/api/services'
import { useQuery } from '@tanstack/react-query'

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
