import { Request, Response } from 'express'

import { LoginDto } from '@dto/users/login.dto'
import { RegisterUserDto } from '@dto/users/register-user.dto'

import { AuthRequest } from '@middleware/auth'

import service from './user.service'

class UserController {
  register = async (req: Request, res: Response) => {
    try {
      const payload: RegisterUserDto = req.body
      const { user, token } = await service.register(payload)
      res.status(201).json({ success: true, data: { user, token } })
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unexpected error'
      res.status(400).json({ success: false, message })
    }
  }

  login = async (req: Request, res: Response) => {
    try {
      const payload: LoginDto = req.body
      const { user, token } = await service.login(payload)
      res.json({ success: true, data: { user, token } })
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unauthorized'
      res.status(401).json({ success: false, message })
    }
  }

  me = async (req: AuthRequest, res: Response) => {
    try {
      const user = await service.me(req.userId!)
      res.json({ success: true, data: user })
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Not found'
      res.status(404).json({ success: false, message })
    }
  }
}

export default new UserController()
