export type Category = {
  id: number
  name: string
  description: string | null
  isActive: boolean
}

export type CreateCategory = {
  name: string
  description?: string
  isActive?: boolean
}

export type UpdateCategory = CreateCategory
