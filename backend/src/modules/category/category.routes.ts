import { Router } from 'express'

import { adminOnly, authMiddleware } from '@middleware/auth'
import {
  createCategoryValidator,
  deleteCategoryValidator,
  getCategoryByIdValidator,
  updateCategoryValidator,
} from '@src/utils'

import controller from './category.controller'

const router = Router()

router.get('/', controller.findAll)
router.get('/:id', getCategoryByIdValidator, controller.findOne)
router.post(
  '/',
  authMiddleware,
  adminOnly,
  createCategoryValidator,
  controller.create,
)
router.put(
  '/:id',
  authMiddleware,
  adminOnly,
  updateCategoryValidator,
  controller.update,
)
router.delete(
  '/:id',
  authMiddleware,
  adminOnly,
  deleteCategoryValidator,
  controller.remove,
)

export default router
