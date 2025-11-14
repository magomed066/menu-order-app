import { type FindOptions, Op, type WhereOptions } from 'sequelize'

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

  async findAll(params?: {
    name?: string
    description?: string
    categoryId?: number
    limit?: number
    offset?: number
  }): Promise<Product[]> {
    const where: WhereOptions = {}
    if (params?.name) {
      where.name = { [Op.like]: `%${params.name}%` }
    }
    if (params?.description) {
      ;(where as any).description = { [Op.like]: `%${params.description}%` }
    }
    if (params?.categoryId) {
      where.categoryId = params.categoryId
    }

    const options: FindOptions = {
      where,
      order: [['id', 'ASC']],
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name'],
        },
      ],
    }
    if (params?.limit !== undefined) options.limit = params.limit
    if (params?.offset !== undefined) options.offset = params.offset

    return await Product.findAll(options)
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
