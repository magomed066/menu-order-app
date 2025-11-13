import type {
  ProductAttributes,
  ProductCreationAttributes,
} from '@dto/products/product.dto'

import Product from './products.model'

export class ProductRepository {
  async create(payload: ProductCreationAttributes): Promise<Product> {
    return await Product.create(payload)
  }

  async findAll(): Promise<Product[]> {
    return await Product.findAll({ order: [['id', 'ASC']] })
  }

  async findById(id: number): Promise<Product | null> {
    return await Product.findByPk(id)
  }

  async update(
    id: number,
    payload: Partial<ProductAttributes>,
  ): Promise<Product | null> {
    const product = await Product.findByPk(id)
    if (!product) return null
    await product.update(payload)
    return product
  }

  async remove(id: number): Promise<boolean> {
    const deleted = await Product.destroy({ where: { id } })
    return deleted > 0
  }
}

export default new ProductRepository()
