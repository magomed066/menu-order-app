import jwt, {
  type JwtPayload as LibJwtPayload,
  type SignOptions,
} from 'jsonwebtoken'

import { JWT_EXPIRES_IN, JWT_SECRET } from '@config/env'

export interface TokenPayload {
  sub: number
}

export function signJwt(userId: number): string {
  const payload: TokenPayload = { sub: userId }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const options: SignOptions = { expiresIn: JWT_EXPIRES_IN as any }
  return jwt.sign(payload, JWT_SECRET, options)
}

export function verifyJwt(token: string): TokenPayload {
  const decoded = jwt.verify(token, JWT_SECRET) as LibJwtPayload
  const sub =
    typeof decoded.sub === 'string' ? Number(decoded.sub) : decoded.sub
  return { sub: Number(sub) }
}
