import { NextFunction, Request, Response } from 'express'

import { verifyJwt } from '@src/utils/auth/jwt'

export interface AuthRequest extends Request {
  userId?: number
}

export function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ success: false, message: 'Unauthorized' })
    return
  }
  const token = authHeader.substring('Bearer '.length)
  try {
    const payload = verifyJwt(token)
    req.userId = payload.sub
    next()
  } catch {
    res.status(401).json({ success: false, message: 'Invalid token' })
  }
}
