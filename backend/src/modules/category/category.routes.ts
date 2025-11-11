import { Router, Request, Response, NextFunction } from 'express'
import { body, param, validationResult } from 'express-validator'
import controller from './category.controller'

const validate = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400).json({ success: false, errors: errors.array() })
    return
  }
  next()
}

const router = Router()

router.get('/', controller.findAll)

router.get(
  '/:id',
  param('id')
    .isInt({ gt: 0 })
    .withMessage('id должен быть положительным числом'),
  validate,
  controller.findOne,
)

router.post(
  '/',
  body('name')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('Поле name - обязательное'),
  body('description').optional({ nullable: true }).isString(),
  body('isActive').optional().isBoolean(),
  validate,
  controller.create,
)

router.put(
  '/:id',
  param('id').isInt({ gt: 0 }),
  body('name').optional().isString().trim().notEmpty(),
  body('description').optional({ nullable: true }).isString(),
  body('isActive').optional().isBoolean(),
  validate,
  controller.update,
)

router.delete(
  '/:id',
  param('id')
    .isInt({ gt: 0 })
    .withMessage('id должен быть положительным числом'),
  validate,
  controller.remove,
)

export default router
