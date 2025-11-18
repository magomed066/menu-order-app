import type { AxiosResponse } from 'axios'

import { apiService } from '../../base'
import type { Category } from './types'

export class CategoriesService {
  static getCategories(): Promise<AxiosResponse<Category[]>> {
    return apiService.get<AxiosResponse<Category[]>>('/categories/all')
  }
}
