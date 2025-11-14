import { DataTypes, Model } from 'sequelize'

import sequelize from '@config/db'

import type {
  ProductAttributes,
  ProductCreationAttributes,
} from '@dto/products/product.dto'

import Category from '@modules/category/category.model'

export class Product
  extends Model<ProductAttributes, ProductCreationAttributes>
  implements ProductAttributes
{
  public id!: number
  public name!: string
  public categoryId!: number
  public price!: number
  public image!: string | null
  public description!: string | null
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(256),
      allowNull: false,
      validate: { notEmpty: true, len: [1, 256] },
    },
    categoryId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'categories',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    },
    price: {
      // Using FLOAT for simplicity; DECIMAL returns strings
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: { min: 0 },
    },
    image: {
      type: DataTypes.TEXT('long'),
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING(1024),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'products',
    modelName: 'Product',
    timestamps: true,
    underscored: false,
  },
)

// Associations
Product.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' })

export default Product
