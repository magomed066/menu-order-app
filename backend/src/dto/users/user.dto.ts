import type { Optional } from 'sequelize'

export type UserRole = 'admin' | 'cashier'

export interface UserAttributes {
  id: number
  firstName: string
  lastName: string
  email: string
  passwordHash: string
  role: UserRole
  createdAt?: Date
  updatedAt?: Date
}

export type UserCreationAttributes = Optional<
  UserAttributes,
  'id' | 'createdAt' | 'updatedAt'
>

export type UserDto = Omit<UserAttributes, 'passwordHash'> &
  Required<Pick<UserAttributes, 'createdAt' | 'updatedAt'>>
