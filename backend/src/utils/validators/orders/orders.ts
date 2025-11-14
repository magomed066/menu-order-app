import { body, param, query } from 'express-validator'

import { validate } from '..'

export const getOrderByIdValidator = [
  param('id').isInt({ gt: 0 }).withMessage('id должен быть положительным числом'),
  validate,
]

export const getOrdersQueryValidator = [
  query('page').optional().isInt({ gt: 0 }),
  query('limit').optional().isInt({ gt: 0 }),
  query('status')
    .optional()
    .isIn(['pending', 'cooking', 'ready', 'completed', 'cancelled'])
    .withMessage('Некорректный статус заказа'),
  query('orderType').optional().isIn(['dine_in', 'delivery']),
  validate,
]

export const createDineInOrderValidator = [
  body('tableId').isInt({ gt: 0 }),
  body('guestCount').isInt({ gt: 0 }),
  body('paymentMethod').isIn(['online', 'cash', 'card_waiter']),
  body('items').isArray({ min: 1 }),
  body('items.*.productId').isInt({ gt: 0 }),
  body('items.*.quantity').isInt({ gt: 0 }),
  body('items.*.specialInstructions').optional().isString(),
  validate,
]

export const createDeliveryOrderValidator = [
  body('addressId').isInt({ gt: 0 }),
  body('customerName').isString().trim().notEmpty(),
  body('customerPhone').isString().trim().notEmpty(),
  body('deliveryTime').optional().isString(),
  body('deliveryAddress').isString().trim().notEmpty(),
  body('deliveryFee').optional().isFloat({ min: 0 }),
  body('paymentMethod').isIn(['online', 'cash_on_delivery']),
  body('items').isArray({ min: 1 }),
  body('items.*.productId').isInt({ gt: 0 }),
  body('items.*.quantity').isInt({ gt: 0 }),
  body('items.*.specialInstructions').optional().isString(),
  validate,
]

export const updateOrderValidator = [
  param('id').isInt({ gt: 0 }),
  body('status')
    .isIn(['pending', 'cooking', 'ready', 'completed', 'cancelled'])
    .withMessage('Некорректный статус заказа'),
  validate,
]

export const deleteOrderValidator = [
  param('id').isInt({ gt: 0 }),
  validate,
]
