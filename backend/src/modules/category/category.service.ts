import type {
  CategoryAttributes,
  CategoryCreationAttributes,
} from '@dto/categories/category.dto'
import { CategoryDto } from '@dto/categories/category.dto'
import { CreateCategoryDto } from '@dto/categories/create-category.dto'
import { UpdateCategoryDto } from '@dto/categories/update-category.dto'

import repo from './category.repository'

export class CategoryService {
  async createCategory(payload: CreateCategoryDto): Promise<CategoryDto> {
    const existing = await repo.findAll()
    if (
      existing.some((c) => c.name.toLowerCase() === payload.name.toLowerCase())
    ) {
      throw new Error('Category with this name already exists')
    }
    const maxSort = await repo.getMaxSortOrder()
    const created = await repo.create({
      ...(payload as CategoryCreationAttributes),
      // If sortOrder explicitly provided, respect it; otherwise increment last
      sortOrder: payload.sortOrder ?? maxSort + 1,
    })
    return {
      id: created.id,
      name: created.name,
      description: created.description,
      isActive: created.isActive,
      sortOrder: created.sortOrder,
      createdAt: created.createdAt,
      updatedAt: created.updatedAt,
    }
  }

  async getCategories(params?: {
    onlyActive?: boolean
  }): Promise<CategoryDto[]> {
    const items = await repo.findAll({ onlyActive: params?.onlyActive })
    return items.map((c) => ({
      id: c.id,
      name: c.name,
      description: c.description,
      isActive: c.isActive,
      sortOrder: c.sortOrder,
      createdAt: c.createdAt,
      updatedAt: c.updatedAt,
    }))
  }

  async getCategoryById(id: number): Promise<CategoryDto> {
    const category = await repo.findById(id)
    if (!category) throw new Error('Category not found')
    return {
      id: category.id,
      name: category.name,
      description: category.description,
      isActive: category.isActive,
      sortOrder: category.sortOrder,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    }
  }

  async updateCategory(
    id: number,
    payload: UpdateCategoryDto,
  ): Promise<CategoryDto> {
    const updated = await repo.update(
      id,
      payload as Partial<CategoryAttributes>,
    )
    if (!updated) throw new Error('Category not found')
    return {
      id: updated.id,
      name: updated.name,
      description: updated.description,
      isActive: updated.isActive,
      sortOrder: updated.sortOrder,
      createdAt: updated.createdAt,
      updatedAt: updated.updatedAt,
    }
  }

  async deleteCategory(id: number) {
    const ok = await repo.remove(id)
    if (!ok) throw new Error('Category not found')
    return ok
  }
}

export default new CategoryService()
