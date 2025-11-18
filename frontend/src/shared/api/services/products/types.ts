export type Product = {
  id: number
  name: string
  price: string
  image: string
  category: string
  categoryId: number
  description: string
  isActive: boolean
}

export type CreateProduct = Pick<Product, 'name' | 'price'> & {
  categoryId: number
  image?: string
  description?: string
  isActive?: boolean
}
