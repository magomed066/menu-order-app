import type { AxiosResponse } from 'axios'

import { apiService } from '../../base'
import type { Category, CreateCategory, UpdateCategory } from './types'

export class CategoriesService {
  static getCategories(): Promise<AxiosResponse<Category[]>> {
    return apiService.get<AxiosResponse<Category[]>>('/categories/all')
  }

  static createCategory(
    data: CreateCategory,
  ): Promise<AxiosResponse<Category>> {
    return apiService.post<AxiosResponse<Category>>('/categories', data)
  }

  static updateCategory(
    id: number,
    data: UpdateCategory,
  ): Promise<AxiosResponse<Category>> {
    return apiService.put<AxiosResponse<Category>>(`/categories/update/${id}`, data)
  }

  static deleteCategory(id: number): Promise<AxiosResponse<void>> {
    return apiService.delete<AxiosResponse<void>>(`/categories/delete/${id}`)
  }
}
