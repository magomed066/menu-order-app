import { Router } from 'express'

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
router.post('/', createCategoryValidator, controller.create)
router.put('/:id', updateCategoryValidator, controller.update)
router.delete('/:id', deleteCategoryValidator, controller.remove)

export default router
