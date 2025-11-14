import { DataTypes, Model } from 'sequelize'

import sequelize from '@config/db'

export class Table extends Model {
  declare id: number
  declare tableNumber: string
  declare qrCodeHash: string
  declare isActive: boolean
  declare capacity: number
}

Table.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    tableNumber: { type: DataTypes.STRING(32), allowNull: false },
    qrCodeHash: { type: DataTypes.STRING(128), allowNull: false, unique: true },
    isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    capacity: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 2,
    },
  },
  { sequelize, tableName: 'tables', modelName: 'Table', timestamps: false },
)

export default Table
