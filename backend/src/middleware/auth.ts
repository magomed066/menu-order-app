import { NextFunction, Request, Response } from 'express'

import type { UserRole } from '@dto/users/user.dto'

import userRepo from '@modules/user/user.repository'

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

export function requireRole(role: UserRole) {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.userId) {
      res.status(401).json({ success: false, message: 'Unauthorized' })
      return
    }
    const user = await userRepo.findById(req.userId)
    if (!user || user.role !== role) {
      res.status(403).json({ success: false, message: 'Forbidden' })
      return
    }
    next()
  }
}

export const adminOnly = requireRole('admin')

export function requireAnyRole(roles: UserRole[]) {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.userId) {
      res.status(401).json({ success: false, message: 'Unauthorized' })
      return
    }
    const user = await userRepo.findById(req.userId)
    if (!user || !roles.includes(user.role)) {
      res.status(403).json({ success: false, message: 'Forbidden' })
      return
    }
    next()
  }
}

export const cashierOrAdmin = requireAnyRole(['cashier', 'admin'])
