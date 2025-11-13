export type Product = {
  id: number
  name: string
  price: string
  image: string
  category: string
  categoryId: number
  description: string
}

export type CreateProduct = Pick<Product, 'name' | 'price'> & {
  categoryId: number
  image?: string
  description?: string
}
