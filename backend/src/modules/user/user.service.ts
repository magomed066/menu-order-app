import { LoginDto } from '@dto/users/login.dto'
import { RegisterUserDto } from '@dto/users/register-user.dto'
import type { UserAttributes, UserDto, UserRole } from '@dto/users/user.dto'

import { signJwt } from '@src/utils/auth/jwt'
import { hashPassword, verifyPassword } from '@src/utils/auth/password'

import repo from './user.repository'

function toUserDto(
  user: Pick<
    UserAttributes,
    'id' | 'firstName' | 'lastName' | 'email' | 'role'
  > & { createdAt: Date; updatedAt: Date },
): UserDto {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  }
}

export class UserService {
  async register(
    payload: RegisterUserDto,
  ): Promise<{ user: UserDto; token: string }> {
    const exists = await repo.findByEmail(payload.email)
    if (exists) throw new Error('User with this email already exists')

    const passwordHash = await hashPassword(payload.password)
    const created = await repo.create({
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      passwordHash,
      role: (payload.role as UserRole) ?? 'cashier',
    })
    const token = signJwt(created.id)
    return { user: toUserDto(created), token }
  }

  async login(payload: LoginDto): Promise<{ user: UserDto; token: string }> {
    const user = await repo.findByEmail(payload.email)
    if (!user) throw new Error('Invalid credentials')
    const ok = await verifyPassword(payload.password, user.passwordHash)
    if (!ok) throw new Error('Invalid credentials')
    const token = signJwt(user.id)
    return { user: toUserDto(user), token }
  }

  async me(userId: number): Promise<UserDto> {
    const user = await repo.findById(userId)
    if (!user) throw new Error('User not found')
    return toUserDto(user)
  }
}

export default new UserService()
