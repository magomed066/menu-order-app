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

export type ProductDto = Required<
  Omit<ProductAttributes, 'image' | 'createdAt' | 'updatedAt'> & {
    image: string | null
    createdAt: Date
    updatedAt: Date
  }
>

