import type { Optional } from 'sequelize'

export interface CategoryAttributes {
  id: number
  name: string
  description?: string | null
  isActive: boolean
  sortOrder: number
  createdAt?: Date
  updatedAt?: Date
}

export type CategoryDto = CategoryAttributes &
  Required<Pick<CategoryAttributes, 'createdAt' | 'updatedAt'>>

export type CategoryCreationAttributes = Optional<
  CategoryAttributes,
  'id' | 'description' | 'isActive' | 'sortOrder' | 'createdAt' | 'updatedAt'
>
