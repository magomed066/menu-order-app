import { body, param, query } from 'express-validator'

import { validate } from '..'

export const getProductByIdValidator = [
  param('id')
    .isInt({ gt: 0 })
    .withMessage('id должен быть положительным числом'),
  validate,
]

export const createProductValidator = [
  body('name')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('Поле name - обязательное'),
  body('categoryId')
    .isInt({ gt: 0 })
    .withMessage('categoryId должен быть положительным числом'),
  body('price').isFloat({ gt: 0 }).withMessage('price должен быть больше 0'),
  body('image').optional({ nullable: true }).isString(),
  validate,
]

export const updateProductValidator = [
  param('id').isInt({ gt: 0 }),
  body('name').optional().isString().trim().notEmpty(),
  body('categoryId').optional().isInt({ gt: 0 }),
  body('price').optional().isFloat({ gt: 0 }),
  body('image').optional({ nullable: true }).isString(),
  validate,
]

export const deleteProductValidator = [
  param('id')
    .isInt({ gt: 0 })
    .withMessage('id должен быть положительным числом'),
  validate,
]

export const getProductsQueryValidator = [
  query('page').optional().isInt({ gt: 0 }),
  query('limit').optional().isInt({ gt: 0 }),
  query('name').optional().isString().trim(),
  query('categoryId').optional().isInt({ gt: 0 }),
  validate,
]
