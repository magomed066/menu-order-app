import type { UserCreationAttributes } from '@dto/users/user.dto'

import User from './user.model'

export class UserRepository {
  async create(payload: UserCreationAttributes): Promise<User> {
    return await User.create(payload)
  }

  async findByEmail(email: string): Promise<User | null> {
    return await User.findOne({ where: { email } })
  }

  async findById(id: number): Promise<User | null> {
    return await User.findByPk(id)
  }
}

export default new UserRepository()
