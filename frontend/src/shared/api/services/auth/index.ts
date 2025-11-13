import type { AxiosResponse } from 'axios'

import { apiService } from '../../base'
import { type LoginUser, type LoginUserSuccess } from './types'

export class AuthService {
  static login(data: LoginUser): Promise<AxiosResponse<LoginUserSuccess>> {
    return apiService.post<AxiosResponse<LoginUserSuccess>>(
      '/auth/login',
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    )
  }
}
