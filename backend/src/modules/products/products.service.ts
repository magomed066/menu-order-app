import { CreateProductDto } from '@dto/products/create-product.dto'
import type {
  ProductAttributes,
  ProductCreationAttributes,
  ProductDto,
} from '@dto/products/product.dto'
import { UpdateProductDto } from '@dto/products/update-product.dto'

import categoryRepo from '@modules/category/category.repository'

import repo from './products.repository'

export class ProductService {
  private toDto = (p: {
    id: number
    name: string
    categoryId: number
    price: number
    image: string | null
    createdAt: Date
    updatedAt: Date
  }): ProductDto => ({
    id: p.id,
    name: p.name,
    categoryId: p.categoryId,
    price: p.price,
    image: p.image,
    createdAt: p.createdAt,
    updatedAt: p.updatedAt,
  })

  async createProduct(payload: CreateProductDto): Promise<ProductDto> {
    const cat = await categoryRepo.findById(payload.categoryId)
    if (!cat) throw new Error('Category not found')
    const created = await repo.create(payload as ProductCreationAttributes)
    return this.toDto(created)
  }

  async getProducts(): Promise<ProductDto[]> {
    const items = await repo.findAll()
    return items.map((p) => this.toDto(p))
  }

  async getProductById(id: number): Promise<ProductDto> {
    const product = await repo.findById(id)
    if (!product) throw new Error('Product not found')
    return this.toDto(product)
  }

  async updateProduct(
    id: number,
    payload: UpdateProductDto,
  ): Promise<ProductDto> {
    if (payload.categoryId !== undefined) {
      const cat = await categoryRepo.findById(payload.categoryId)
      if (!cat) throw new Error('Category not found')
    }
    const updated = await repo.update(id, payload as Partial<ProductAttributes>)
    if (!updated) throw new Error('Product not found')
    return this.toDto(updated)
  }

  async deleteProduct(id: number): Promise<boolean> {
    const ok = await repo.remove(id)
    if (!ok) throw new Error('Product not found')
    return ok
  }
}

export default new ProductService()
