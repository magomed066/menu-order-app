export type Product = {
  id: number
  name: string
  price: string
  image: string
  category: string
  categoryId: number
}

export type CreateProduct = Pick<Product, 'name' | 'price'> & {
  categoryId: number
  image?: string
}
