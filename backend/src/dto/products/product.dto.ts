import type { Optional } from 'sequelize'

export interface ProductAttributes {
  id: number
  name: string
  categoryId: number
  price: number
  image: string | null
  createdAt?: Date
  updatedAt?: Date
}

export type ProductCreationAttributes = Optional<
  ProductAttributes,
  'id' | 'image' | 'createdAt' | 'updatedAt'
>

// Response DTO including category name and stringified price
export type ProductDto = {
  id: number
  name: string
  price: string
  image: string
  category: string
  categoryId: number
}
