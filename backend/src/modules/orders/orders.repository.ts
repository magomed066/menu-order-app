import { type FindOptions, Op, Transaction, type WhereOptions } from 'sequelize'

import sequelize from '@config/db'

import type {
  OrderAttributes,
  OrderCreationAttributes,
  OrderItemCreationAttributes,
} from '@dto/orders/order.dto'

import Address from '@modules/addresses/addresses.model'
import Product from '@modules/products/products.model'
import Table from '@modules/tables/tables.model'
import User from '@modules/user/user.model'

import Order, {
  OrderDelivery,
  OrderDineIn,
  OrderItem,
  Payment,
} from './orders.model'

export class OrdersRepository {
  async create(
    order: OrderCreationAttributes,
    items: Omit<OrderItemCreationAttributes, 'orderId'>[],
    extra?:
      | {
          type: 'dine_in'
          data: {
            tableId: number
            guestCount: number
            paymentMethod: 'online' | 'cash' | 'card_waiter'
          }
        }
      | {
          type: 'delivery'
          data: {
            userId: number | null
            addressId: number
            customerName: string
            customerPhone: string
            deliveryTime: Date | null
            deliveryAddress: string
            deliveryFee: number
            paymentMethod: 'online' | 'cash_on_delivery'
          }
        },
  ): Promise<Order> {
    return await sequelize.transaction(async (t: Transaction) => {
      const created = await Order.create(order, { transaction: t })
      const itemsWithOrderId = items.map((i) => ({ ...i, orderId: created.id }))
      await OrderItem.bulkCreate(itemsWithOrderId, { transaction: t })
      const total = itemsWithOrderId.reduce(
        (acc, it) => acc + it.quantity * it.unitPrice,
        0,
      )
      await created.update({ totalAmount: total }, { transaction: t })

      if (extra?.type === 'dine_in') {
        await OrderDineIn.create(
          { orderId: created.id, ...extra.data },
          { transaction: t },
        )
      } else if (extra?.type === 'delivery') {
        await OrderDelivery.create(
          { orderId: created.id, ...extra.data },
          { transaction: t },
        )
      }

      const withItems = await Order.findByPk(created.id, {
        transaction: t,
        include: [
          {
            model: OrderItem,
            as: 'items',
            include: [
              { model: Product, as: 'product', attributes: ['id', 'name'] },
            ],
          },
          {
            model: OrderDineIn,
            as: 'dineIn',
            include: [{ model: Table, as: 'table' }],
          },
          {
            model: OrderDelivery,
            as: 'delivery',
            include: [
              {
                model: User,
                as: 'user',
                attributes: ['id', 'firstName', 'lastName'],
              },
              { model: Address, as: 'address' },
            ],
          },
          { model: Payment, as: 'payments' },
        ],
      })
      return withItems ?? created
    })
  }

  async findAll(params?: {
    status?: string
    orderType?: 'dine_in' | 'delivery'
    limit?: number
    offset?: number
  }): Promise<Order[]> {
    const where: WhereOptions = {}
    if (params?.status) where.status = { [Op.eq]: params.status }
    if (params?.orderType) where.orderType = { [Op.eq]: params.orderType }

    const options: FindOptions = {
      where,
      order: [['id', 'DESC']],
      include: [
        {
          model: OrderItem,
          as: 'items',
          include: [
            { model: Product, as: 'product', attributes: ['id', 'name'] },
          ],
        },
        {
          model: OrderDineIn,
          as: 'dineIn',
          include: [{ model: Table, as: 'table' }],
        },
        {
          model: OrderDelivery,
          as: 'delivery',
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['id', 'firstName', 'lastName'],
            },
            { model: Address, as: 'address' },
          ],
        },
        { model: Payment, as: 'payments' },
      ],
    }
    if (params?.limit !== undefined) options.limit = params.limit
    if (params?.offset !== undefined) options.offset = params.offset
    return await Order.findAll(options)
  }

  async findById(id: number): Promise<Order | null> {
    return await Order.findByPk(id, {
      include: [
        {
          model: OrderItem,
          as: 'items',
          include: [
            { model: Product, as: 'product', attributes: ['id', 'name'] },
          ],
        },
        {
          model: OrderDineIn,
          as: 'dineIn',
          include: [{ model: Table, as: 'table' }],
        },
        {
          model: OrderDelivery,
          as: 'delivery',
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['id', 'firstName', 'lastName'],
            },
            { model: Address, as: 'address' },
          ],
        },
        { model: Payment, as: 'payments' },
      ],
    })
  }

  async update(
    id: number,
    payload: Partial<OrderAttributes>,
    items?: Omit<OrderItemCreationAttributes, 'orderId'>[],
  ): Promise<Order | null> {
    const existing = await Order.findByPk(id, {
      include: [{ model: OrderItem, as: 'items' }],
    })
    if (!existing) return null

    return await sequelize.transaction(async (t: Transaction) => {
      if (Object.keys(payload).length)
        await existing.update(payload, { transaction: t })
      if (items) {
        await OrderItem.destroy({ where: { orderId: id }, transaction: t })
        const withOrderId = items.map((i) => ({ ...i, orderId: id }))
        if (withOrderId.length)
          await OrderItem.bulkCreate(withOrderId, { transaction: t })
        const total = withOrderId.reduce(
          (acc, it) => acc + it.quantity * it.unitPrice,
          0,
        )
        await existing.update({ totalAmount: total }, { transaction: t })
      }
      const refreshed = await Order.findByPk(id, {
        transaction: t,
        include: [
          {
            model: OrderItem,
            as: 'items',
            include: [
              { model: Product, as: 'product', attributes: ['id', 'name'] },
            ],
          },
          {
            model: OrderDineIn,
            as: 'dineIn',
            include: [{ model: Table, as: 'table' }],
          },
          {
            model: OrderDelivery,
            as: 'delivery',
            include: [
              {
                model: User,
                as: 'user',
                attributes: ['id', 'firstName', 'lastName'],
              },
              { model: Address, as: 'address' },
            ],
          },
          { model: Payment, as: 'payments' },
        ],
      })
      return refreshed
    })
  }

  async remove(id: number): Promise<boolean> {
    const deleted = await Order.destroy({ where: { id } })
    return deleted > 0
  }
}

export default new OrdersRepository()
