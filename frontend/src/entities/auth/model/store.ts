import type { User } from '@/shared/api/services'
import { create } from 'zustand'

import { parseJSON } from '@/shared/lib/utils'

import { AUTH_ACCESS_TOKEN_KEY } from './consts'
import type { UserStore } from './types'

const token =
  JSON.parse(JSON.stringify(localStorage.getItem(AUTH_ACCESS_TOKEN_KEY))) ||
  null
const user = parseJSON(localStorage.getItem('user')) as User | null

export const useUserStore = create<UserStore>((set) => ({
  accessToken: token,
  user,
  isLoggingOut: false,
  setUser(data) {
    set((prev) => ({ ...prev, user: { ...prev.user, ...data } }))

    localStorage.setItem('user', JSON.stringify(data))
  },
  setTokens(accessToken) {
    set((prev) => ({ ...prev, accessToken: accessToken }))

    localStorage.setItem(AUTH_ACCESS_TOKEN_KEY, accessToken)
  },
  clearToken() {
    set((prev) => ({ ...prev, accessToken: null }))
  },

  logout() {
    set((prev) => ({ ...prev, isLoggingOut: true }))

    setTimeout(() => {
      localStorage.clear()
      set((prev) => ({
        ...prev,
        rememberMe: false,
        accessToken: null,
        isLoggingOut: false,
      }))
    }, 1000)
  },
}))

export const getAuthHeader = () => {
  if (useUserStore.getState().accessToken) {
    return {
      Authorization: `Bearer ${JSON.parse(
        JSON.stringify(useUserStore.getState().accessToken)
      )}`,
    }
  }

  return undefined
}
