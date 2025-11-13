import type { AxiosResponse } from 'axios'

import { apiService } from '../../base'
import type { CreateProduct, Product } from './types'

export class ProductsService {
  static getProducts(): Promise<AxiosResponse<Product[]>> {
    return apiService.get<AxiosResponse<Product[]>>('/products/all')
  }

  static createProduct(data: CreateProduct): Promise<AxiosResponse<Product>> {
    return apiService.post<AxiosResponse<Product>>('/products/create', data)
  }
}
