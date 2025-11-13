import { Router } from 'express'

import { adminOnly, authMiddleware, requireAnyRole } from '@middleware/auth'
import {
  createDeliveryOrderValidator,
  createDineInOrderValidator,
  deleteOrderValidator,
  getOrderByIdValidator,
  getOrdersQueryValidator,
  updateOrderValidator,
} from '@src/utils'

import controller from './orders.controller'

const router = Router()

router.get(
  '/all',
  authMiddleware,
  requireAnyRole(['admin', 'cashier']),
  getOrdersQueryValidator,
  controller.findAll,
)

router.get(
  '/:id',
  authMiddleware,
  requireAnyRole(['admin', 'cashier']),
  getOrderByIdValidator,
  controller.findOne,
)

// Public endpoint: dine-in order (no auth)
router.post(
  '/create/dine-in',
  createDineInOrderValidator,
  controller.createDineIn,
)

// Auth required: delivery order
router.post(
  '/create/delivery',
  authMiddleware,
  createDeliveryOrderValidator,
  controller.createDelivery,
)

router.put(
  '/update/:id',
  authMiddleware,
  requireAnyRole(['admin', 'cashier']),
  updateOrderValidator,
  controller.update,
)

router.delete(
  '/delete/:id',
  authMiddleware,
  adminOnly,
  deleteOrderValidator,
  controller.remove,
)

export default router
