import { DataTypes, Model } from 'sequelize'

import sequelize from '@config/db'

import type {
  UserAttributes,
  UserCreationAttributes,
  UserRole,
} from '@dto/users/user.dto'

export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number
  public firstName!: string
  public lastName!: string
  public email!: string
  public passwordHash!: string
  public role!: UserRole
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING(64),
      allowNull: false,
      validate: { notEmpty: true, len: [1, 64] },
    },
    lastName: {
      type: DataTypes.STRING(64),
      allowNull: false,
      validate: { notEmpty: true, len: [1, 64] },
    },
    email: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    passwordHash: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING(16),
      allowNull: false,
      defaultValue: 'cashier',
      validate: { isIn: [['admin', 'cashier']] },
    },
  },
  {
    sequelize,
    tableName: 'users',
    modelName: 'User',
    timestamps: true,
  },
)

export default User
