import { Router } from 'express'

import { authMiddleware } from '@middleware/auth'
import { loginValidator, registerValidator } from '@src/utils'

import controller from './user.controller'

const router = Router()

router.post('/register', registerValidator, controller.register)
router.post('/login', loginValidator, controller.login)
router.get('/me', authMiddleware, controller.me)

export default router
