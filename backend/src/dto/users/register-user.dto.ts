import type { UserRole } from './user.dto'

export interface RegisterUserDto {
  firstName: string
  lastName: string
  email: string
  password: string
  role?: UserRole
}
