import type { AxiosResponse } from 'axios'

import { apiService } from '../../base'
import type { CreateProduct, Product } from './types'

export class ProductsService {
  static getProducts(
    search: string,
    page: number,
    params: Record<string, string | number>
  ): Promise<AxiosResponse<Product[]>> {
    return apiService.get<AxiosResponse<Product[]>>('/products/all', {
      params: {
        ...(search && { search }),
        page,
        limit: 20,
        ...params,
      },
    })
  }

  static createProduct(data: CreateProduct): Promise<AxiosResponse<Product>> {
    return apiService.post<AxiosResponse<Product>>('/products/create', data)
  }
}
