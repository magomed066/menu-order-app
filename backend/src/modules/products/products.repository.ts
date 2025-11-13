import type {
  ProductAttributes,
  ProductCreationAttributes,
} from '@dto/products/product.dto'

import Category from '@modules/category/category.model'

import Product from './products.model'

export class ProductRepository {
  async create(payload: ProductCreationAttributes): Promise<Product> {
    return await Product.create(payload)
  }

  async findAll(): Promise<Product[]> {
    return await Product.findAll({
      order: [['id', 'ASC']],
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name'],
        },
      ],
    })
  }

  async findById(id: number): Promise<Product | null> {
    return await Product.findByPk(id, {
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name'],
        },
      ],
    })
  }

  async update(
    id: number,
    payload: Partial<ProductAttributes>,
  ): Promise<Product | null> {
    const product = await Product.findByPk(id)
    if (!product) return null
    await product.update(payload)
    // Return with included category
    const refreshed = await Product.findByPk(product.id, {
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name'],
        },
      ],
    })
    return refreshed
  }

  async remove(id: number): Promise<boolean> {
    const deleted = await Product.destroy({ where: { id } })
    return deleted > 0
  }
}

export default new ProductRepository()
