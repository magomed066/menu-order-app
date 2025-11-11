import { body, param } from 'express-validator'

import { validate } from '..'

export const getCategoryByIdValidator = [
  param('id')
    .isInt({ gt: 0 })
    .withMessage('id должен быть положительным числом'),
  validate,
]

export const createCategoryValidator = [
  body('name')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('Поле name - обязательное'),
  body('description').optional({ nullable: true }).isString(),
  body('isActive').optional().isBoolean(),
  validate,
]

export const updateCategoryValidator = [
  param('id').isInt({ gt: 0 }),
  body('name').optional().isString().trim().notEmpty(),
  body('description').optional({ nullable: true }).isString(),
  body('isActive').optional().isBoolean(),
  validate,
]

export const deleteCategoryValidator = [
  param('id')
    .isInt({ gt: 0 })
    .withMessage('id должен быть положительным числом'),
  validate,
]
