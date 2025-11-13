import { DataTypes, Model } from 'sequelize'

import sequelize from '@config/db'

import User from '@modules/user/user.model'

export class Address extends Model {
  declare id: number
  declare userId: number
  declare addressText: string
  declare apartment: string | null
  declare entrance: string | null
  declare floor: string | null
}

Address.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: { model: 'users', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    addressText: { type: DataTypes.STRING(512), allowNull: false },
    apartment: { type: DataTypes.STRING(32), allowNull: true },
    entrance: { type: DataTypes.STRING(32), allowNull: true },
    floor: { type: DataTypes.STRING(32), allowNull: true },
  },
  {
    sequelize,
    tableName: 'addresses',
    modelName: 'Address',
    timestamps: false,
  },
)

Address.belongsTo(User, { foreignKey: 'userId', as: 'user' })

export default Address
