export interface UpdateCategoryDto {
  name?: string
  description?: string | null
  isActive?: boolean
  sortOrder?: number
}
