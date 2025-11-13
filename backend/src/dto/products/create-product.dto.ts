export interface CreateProductDto {
  name: string
  categoryId: number
  price: number
  image?: string | null
}

