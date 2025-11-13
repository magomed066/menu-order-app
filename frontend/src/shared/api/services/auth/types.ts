export type UserRole = 'admin' | 'cashier'

export type User = {
  id: number
  firstName: string
  lastName: string
  email: string
  role: UserRole
}

export type LoginUserSuccess = {
  token: string
  user: User
}

export type LoginUser = Pick<User, 'email'> & {
  password: string
}
