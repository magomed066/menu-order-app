import { Router } from 'express'

import { adminOnly, authMiddleware, requireAnyRole } from '@middleware/auth'
import {
  createProductValidator,
  deleteProductValidator,
  getProductByIdValidator,
  updateProductValidator,
} from '@src/utils'

import controller from './products.controller'

const router = Router()

router.get(
  '/',
  authMiddleware,
  requireAnyRole(['admin', 'cashier']),
  controller.findAll,
)
router.get(
  '/:id',
  authMiddleware,
  requireAnyRole(['admin', 'cashier']),
  getProductByIdValidator,
  controller.findOne,
)
router.post(
  '/',
  authMiddleware,
  adminOnly,
  createProductValidator,
  controller.create,
)
router.put(
  '/:id',
  authMiddleware,
  adminOnly,
  updateProductValidator,
  controller.update,
)
router.delete(
  '/:id',
  authMiddleware,
  adminOnly,
  deleteProductValidator,
  controller.remove,
)

export default router
