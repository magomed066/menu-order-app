import { AuthService, type LoginUser, type User } from '@/shared/api/services'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import type { RequestError } from '@/shared/lib/types'

export const useLoginMutation = (
  onSuccess?: (data: User) => void,
  onError?: (err: RequestError['errors']) => void
) => {
  return useMutation({
    mutationFn: (data: LoginUser) => AuthService.login(data),
    onSuccess: async (res) => {
      onSuccess?.(res.data)
    },
    onError: (err: AxiosError<RequestError>) => {
      console.error(err.response)
      if (err.response?.data.errors) {
        onError?.(err.response.data.errors)
      }
    },
  })
}
