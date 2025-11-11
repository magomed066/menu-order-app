import type { AxiosResponse } from 'axios'

import { apiService } from '../../base'
import { type LoginUser, type User } from './types'

export class AuthService {
  static login(data: LoginUser): Promise<AxiosResponse<User>> {
    return apiService.post<AxiosResponse<User>>('/auth/login', data, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
  }
}
