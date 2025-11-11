import { body } from 'express-validator'

import { validate } from '..'

export const registerValidator = [
  body('firstName').isString().trim().notEmpty(),
  body('lastName').isString().trim().notEmpty(),
  body('email').isEmail().normalizeEmail(),
  body('password').isString().isLength({ min: 6 }),
  body('role').optional().isIn(['admin', 'cashier']),
  validate,
]

export const loginValidator = [
  body('email').isEmail().normalizeEmail(),
  body('password').isString().notEmpty(),
  validate,
]
