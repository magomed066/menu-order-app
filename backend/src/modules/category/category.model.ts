import { DataTypes, Model } from 'sequelize'
import sequelize from '../../config/db'
import type {
  CategoryAttributes,
  CategoryCreationAttributes,
} from '../../dto/categories/category.dto'

export class Category
  extends Model<CategoryAttributes, CategoryCreationAttributes>
  implements CategoryAttributes
{
  public id!: number
  public name!: string
  public description!: string | null
  public isActive!: boolean
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        len: [1, 128],
      },
    },
    description: {
      type: DataTypes.STRING(1024),
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: 'categories',
    modelName: 'Category',
    timestamps: true,
    underscored: false,
  },
)

export default Category
