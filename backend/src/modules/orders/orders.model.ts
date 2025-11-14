import { DataTypes, Model } from 'sequelize'

import sequelize from '@config/db'

import type {
  OrderAttributes,
  OrderCreationAttributes,
  OrderItemAttributes,
  OrderItemCreationAttributes,
} from '@dto/orders/order.dto'

import Address from '@modules/addresses/addresses.model'
import Product from '@modules/products/products.model'
import Table from '@modules/tables/tables.model'
import User from '@modules/user/user.model'

export class Order
  extends Model<OrderAttributes, OrderCreationAttributes>
  implements OrderAttributes
{
  public id!: number
  public orderType!: 'dine_in' | 'delivery'
  public status!: 'pending' | 'cooking' | 'ready' | 'completed' | 'cancelled'
  public totalAmount!: number
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    orderType: {
      type: DataTypes.STRING(16),
      allowNull: false,
      validate: { isIn: [['dine_in', 'delivery']] },
    },
    status: {
      type: DataTypes.STRING(16),
      allowNull: false,
      defaultValue: 'pending',
      validate: {
        isIn: [['pending', 'cooking', 'ready', 'completed', 'cancelled']],
      },
    },
    totalAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
      validate: { min: 0 },
    },
  },
  {
    sequelize,
    tableName: 'orders',
    modelName: 'Order',
    timestamps: true,
  },
)

export class OrderItem
  extends Model<OrderItemAttributes, OrderItemCreationAttributes>
  implements OrderItemAttributes
{
  public id!: number
  public orderId!: number
  public productId!: number
  public quantity!: number
  public unitPrice!: number
  public specialInstructions!: string | null
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

OrderItem.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    orderId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'orders',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    productId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    },
    quantity: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      validate: { min: 1 },
    },
    unitPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: { min: 0 },
    },
    specialInstructions: {
      type: DataTypes.STRING(1024),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'order_items',
    modelName: 'OrderItem',
    timestamps: true,
  },
)

export class OrderDineIn extends Model {
  declare id: number
  declare orderId: number
  declare tableId: number
  declare guestCount: number
  declare paymentMethod: 'online' | 'cash' | 'card_waiter'
}

OrderDineIn.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    orderId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: { model: 'orders', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    tableId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: { model: 'tables', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    },
    guestCount: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 1,
    },
    paymentMethod: {
      type: DataTypes.STRING(16),
      allowNull: false,
      validate: { isIn: [['online', 'cash', 'card_waiter']] },
    },
  },
  {
    sequelize,
    tableName: 'order_dine_in',
    modelName: 'OrderDineIn',
    timestamps: false,
  },
)

export class OrderDelivery extends Model {
  declare id: number
  declare orderId: number
  declare userId: number | null
  declare addressId: number
  declare customerName: string
  declare customerPhone: string
  declare deliveryTime: Date | null
  declare deliveryAddress: string
  declare deliveryFee: number
  declare paymentMethod: 'online' | 'cash_on_delivery'
}

OrderDelivery.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    orderId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: { model: 'orders', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: { model: 'users', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    addressId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: { model: 'addresses', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    },
    customerName: { type: DataTypes.STRING(128), allowNull: false },
    customerPhone: { type: DataTypes.STRING(32), allowNull: false },
    deliveryTime: { type: DataTypes.DATE, allowNull: true },
    deliveryAddress: { type: DataTypes.STRING(512), allowNull: false },
    deliveryFee: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0 },
    paymentMethod: {
      type: DataTypes.STRING(32),
      allowNull: false,
      validate: { isIn: [['online', 'cash_on_delivery']] },
    },
  },
  {
    sequelize,
    tableName: 'order_delivery',
    modelName: 'OrderDelivery',
    timestamps: false,
  },
)

export class Payment extends Model {
  declare id: number
  declare orderId: number
  declare paymentMethod: string
  declare amount: number
  declare status: 'pending' | 'completed' | 'failed'
  declare paymentSystemId: string | null
  declare createdAt: Date
}

Payment.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    orderId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: { model: 'orders', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    paymentMethod: { type: DataTypes.STRING(32), allowNull: false },
    amount: { type: DataTypes.FLOAT, allowNull: false, validate: { min: 0 } },
    status: {
      type: DataTypes.STRING(16),
      allowNull: false,
      defaultValue: 'pending',
      validate: { isIn: [['pending', 'completed', 'failed']] },
    },
    paymentSystemId: { type: DataTypes.STRING(128), allowNull: true },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  { sequelize, tableName: 'payments', modelName: 'Payment', updatedAt: false },
)

// Associations
Order.hasMany(OrderItem, { foreignKey: 'orderId', as: 'items' })
OrderItem.belongsTo(Order, { foreignKey: 'orderId', as: 'order' })
OrderItem.belongsTo(Product, { foreignKey: 'productId', as: 'product' })

Order.hasOne(OrderDineIn, { foreignKey: 'orderId', as: 'dineIn' })
OrderDineIn.belongsTo(Order, { foreignKey: 'orderId', as: 'order' })
OrderDineIn.belongsTo(Table, { foreignKey: 'tableId', as: 'table' })

Order.hasOne(OrderDelivery, { foreignKey: 'orderId', as: 'delivery' })
OrderDelivery.belongsTo(Order, { foreignKey: 'orderId', as: 'order' })
OrderDelivery.belongsTo(User, { foreignKey: 'userId', as: 'user' })
OrderDelivery.belongsTo(Address, { foreignKey: 'addressId', as: 'address' })

Order.hasMany(Payment, { foreignKey: 'orderId', as: 'payments' })
Payment.belongsTo(Order, { foreignKey: 'orderId', as: 'order' })

export default Order
