import { Op } from 'sequelize'

import type {
  CreateOrderDeliveryDto,
  CreateOrderDineInDto,
} from '@dto/orders/create-order.dto'
import type {
  OrderDto,
  OrderItemCreationAttributes,
  OrderStatus,
} from '@dto/orders/order.dto'
import type { UpdateOrderDto } from '@dto/orders/update-order.dto'

import Product from '@modules/products/products.model'
import Table from '@modules/tables/tables.model'

import Order, { OrderDelivery, OrderDineIn, OrderItem } from './orders.model'
import repo from './orders.repository'

export class OrdersService {
  private toDto = (
    o: Order & {
      items?: Array<
        OrderItem & {
          product?: { id: number; name: string } | null
        }
      >
      dineIn?: OrderDineIn | null
      delivery?: OrderDelivery | null
    },
  ): OrderDto => ({
    id: o.id,
    orderType: o.orderType,
    status: o.status,
    totalAmount: String(o.totalAmount),
    items: (o.items ?? []).map((it) => ({
      id: it.id,
      productId: it.productId,
      productName: it.product?.name ?? '',
      quantity: it.quantity,
      unitPrice: String(it.unitPrice),
      specialInstructions: it.specialInstructions ?? '',
    })),
    dineIn: o.dineIn
      ? {
          tableId: o.dineIn.tableId,
          guestCount: o.dineIn.guestCount,
          paymentMethod: o.dineIn.paymentMethod,
        }
      : null,
    delivery: o.delivery
      ? {
          userId: o.delivery.userId ?? null,
          addressId: o.delivery.addressId,
          customerName: o.delivery.customerName,
          customerPhone: o.delivery.customerPhone,
          deliveryTime: o.delivery.deliveryTime ?? null,
          deliveryAddress: o.delivery.deliveryAddress,
          deliveryFee: String(o.delivery.deliveryFee),
          paymentMethod: o.delivery.paymentMethod,
        }
      : null,
  })

  private async materializeItems(
    items: {
      productId: number
      quantity: number
      specialInstructions?: string
    }[],
  ): Promise<Omit<OrderItemCreationAttributes, 'orderId'>[]> {
    const products = await Product.findAll({
      where: { id: { [Op.in]: items.map((i) => i.productId) } },
    })
    const productMap = new Map(products.map((p) => [p.id, p]))
    return items.map((i) => {
      const p = productMap.get(i.productId)
      if (!p) throw new Error(`Product not found: ${i.productId}`)
      return {
        productId: i.productId,
        quantity: i.quantity,
        unitPrice: p.price,
        specialInstructions: i.specialInstructions ?? null,
      }
    })
  }

  async createDineInOrder(payload: CreateOrderDineInDto): Promise<OrderDto> {
    // Validate table exists and is active to avoid FK errors
    const table = await Table.findByPk(payload.tableId)
    if (!table || (table as any).isActive === false) {
      throw new Error('Table not found or inactive')
    }
    const items = await this.materializeItems(payload.items)
    const created = await repo.create(
      { orderType: 'dine_in', status: 'pending' },
      items,
      {
        type: 'dine_in',
        data: {
          tableId: payload.tableId,
          guestCount: payload.guestCount,
          paymentMethod: payload.paymentMethod,
        },
      },
    )
    return this.toDto(created)
  }

  async createDeliveryOrder(
    userId: number,
    payload: CreateOrderDeliveryDto,
  ): Promise<OrderDto> {
    const items = await this.materializeItems(payload.items)
    const created = await repo.create(
      { orderType: 'delivery', status: 'pending' },
      items,
      {
        type: 'delivery',
        data: {
          userId: userId ?? null,
          addressId: payload.addressId,
          customerName: payload.customerName,
          customerPhone: payload.customerPhone,
          deliveryTime: payload.deliveryTime
            ? new Date(payload.deliveryTime)
            : null,
          deliveryAddress: payload.deliveryAddress,
          deliveryFee: payload.deliveryFee ?? 0,
          paymentMethod: payload.paymentMethod,
        },
      },
    )
    return this.toDto(created)
  }

  async getOrders(params?: {
    page?: number
    limit?: number
    status?: OrderStatus
    orderType?: 'dine_in' | 'delivery'
  }): Promise<OrderDto[]> {
    const page = params?.page && params.page > 0 ? params.page : 1
    const limit = params?.limit && params.limit > 0 ? params.limit : undefined
    const offset = limit !== undefined ? (page - 1) * limit : undefined
    const items = await repo.findAll({
      status: params?.status,
      orderType: params?.orderType,
      limit,
      offset,
    })
    return items.map((o) => this.toDto(o))
  }

  async getOrderById(id: number): Promise<OrderDto> {
    const order = await repo.findById(id)
    if (!order) throw new Error('Order not found')
    return this.toDto(order)
  }

  async updateOrder(id: number, payload: UpdateOrderDto): Promise<OrderDto> {
    const updated = await repo.update(id, { status: payload.status })
    if (!updated) throw new Error('Order not found')
    return this.toDto(updated)
  }

  async deleteOrder(id: number): Promise<boolean> {
    const ok = await repo.remove(id)
    if (!ok) throw new Error('Order not found')
    return ok
  }
}

export default new OrdersService()
