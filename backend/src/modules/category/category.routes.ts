import { Router } from 'express'

import { adminOnly, authMiddleware, requireAnyRole } from '@middleware/auth'
import {
  createCategoryValidator,
  deleteCategoryValidator,
  getCategoryByIdValidator,
  updateCategoryValidator,
} from '@src/utils'

import controller from './category.controller'

const router = Router()

// Admin: all categories (active and inactive)
router.get(
  '/all',
  authMiddleware,
  requireAnyRole(['admin', 'cashier']),
  controller.findAll,
)

// Public: only active categories
router.get('/public', controller.findPublic)
router.get('/:id', getCategoryByIdValidator, controller.findOne)
router.post(
  '/',
  authMiddleware,
  adminOnly,
  createCategoryValidator,
  controller.create,
)
router.put(
  '/update/:id',
  authMiddleware,
  adminOnly,
  updateCategoryValidator,
  controller.update,
)
router.delete(
  '/delete/:id',
  authMiddleware,
  adminOnly,
  deleteCategoryValidator,
  controller.remove,
)

export default router
