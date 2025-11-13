import { type Request, type Response } from 'express'

import type {
  CreateOrderDeliveryDto,
  CreateOrderDineInDto,
} from '@dto/orders/create-order.dto'
import type { UpdateOrderDto } from '@dto/orders/update-order.dto'

import type { AuthRequest } from '@middleware/auth'
import type { OrderStatus, OrderType } from '@src/dto/orders/order.dto'

import service from './orders.service'

class OrdersController {
  createDineIn = async (req: Request, res: Response) => {
    try {
      const payload: CreateOrderDineInDto = req.body
      const order = await service.createDineInOrder(payload)
      res.status(201).json({ success: true, data: order })
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Bad request'
      res.status(400).json({ success: false, message })
    }
  }

  createDelivery = async (req: AuthRequest, res: Response) => {
    try {
      if (!req.userId) {
        res.status(401).json({ success: false, message: 'Unauthorized' })
        return
      }
      const payload: CreateOrderDeliveryDto = req.body
      const order = await service.createDeliveryOrder(req.userId, payload)
      res.status(201).json({ success: true, data: order })
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Bad request'
      res.status(400).json({ success: false, message })
    }
  }

  findAll = async (req: Request, res: Response) => {
    const page = req.query.page ? Number(req.query.page) : undefined
    const limit = req.query.limit ? Number(req.query.limit) : undefined
    const status = req.query.status
      ? (String(req.query.status) as OrderStatus)
      : undefined
    const orderType = req.query.orderType
      ? (String(req.query.orderType) as OrderType)
      : undefined
    const orders = await service.getOrders({ page, limit, status, orderType })
    res.json({ success: true, data: orders })
  }

  findOne = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id)
      const order = await service.getOrderById(id)
      res.json({ success: true, data: order })
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Not found'
      res.status(404).json({ success: false, message })
    }
  }

  update = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id)
      const payload: UpdateOrderDto = req.body
      const order = await service.updateOrder(id, payload)
      res.json({ success: true, data: order })
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Not found'
      res.status(404).json({ success: false, message })
    }
  }

  remove = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id)
      await service.deleteOrder(id)
      res.status(204).send()
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Not found'
      res.status(404).json({ success: false, message })
    }
  }
}

export default new OrdersController()
