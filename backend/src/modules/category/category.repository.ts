import type {
  CategoryAttributes,
  CategoryCreationAttributes,
} from '@dto/categories/category.dto'

import Category from './category.model'

export class CategoryRepository {
  async create(payload: CategoryCreationAttributes): Promise<Category> {
    return await Category.create(payload)
  }

  async findAll(): Promise<Category[]> {
    return await Category.findAll({ order: [['id', 'ASC']] })
  }

  async findById(id: number): Promise<Category | null> {
    return await Category.findByPk(id)
  }

  async update(
    id: number,
    payload: Partial<CategoryAttributes>,
  ): Promise<Category | null> {
    const category = await Category.findByPk(id)
    if (!category) return null
    await category.update(payload)
    return category
  }

  async remove(id: number): Promise<boolean> {
    const deleted = await Category.destroy({ where: { id } })
    return deleted > 0
  }
}

export default new CategoryRepository()
