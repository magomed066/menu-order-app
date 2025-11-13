import { CreateProductDto } from '@dto/products/create-product.dto'
import type {
  ProductAttributes,
  ProductCreationAttributes,
  ProductDto,
} from '@dto/products/product.dto'
import { UpdateProductDto } from '@dto/products/update-product.dto'

import categoryRepo from '@modules/category/category.repository'

import type Product from './products.model'
import repo from './products.repository'

export class ProductService {
  private toDto = (
    p: Product & { category?: { id: number; name: string } | null },
  ): ProductDto => ({
    id: p.id,
    name: p.name,
    price: String(p.price),
    image: p.image ?? '',
    category: p.category?.name ?? '',
    categoryId: p.categoryId,
    description: p.description ?? '',
  })

  async createProduct(payload: CreateProductDto): Promise<ProductDto> {
    const cat = await categoryRepo.findById(payload.categoryId)
    if (!cat) throw new Error('Category not found')
    const created = await repo.create(payload as ProductCreationAttributes)
    // Fetch with included category for response
    const withCategory = await repo.findById(created.id)
    return this.toDto(withCategory ?? created)
  }

  async getProducts(params?: {
    page?: number
    limit?: number
    name?: string
    description?: string
    categoryId?: number
  }): Promise<ProductDto[]> {
    const page = params?.page && params.page > 0 ? params.page : 1
    const limit = params?.limit && params.limit > 0 ? params.limit : undefined
    const offset = limit !== undefined ? (page - 1) * limit : undefined

    const items = await repo.findAll({
      name: params?.name,
      description: params?.description,
      categoryId: params?.categoryId,
      limit,
      offset,
    })
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
