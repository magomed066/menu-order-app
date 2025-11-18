import { Buffer } from 'buffer'
import crypto from 'crypto'

import { ENCRYPTION_KEY } from '@config/env'

const ALGORITHM = 'aes-256-gcm'

// Derive a 32-byte key from the provided secret
const KEY = crypto.createHash('sha256').update(ENCRYPTION_KEY).digest()

/**
 * Encrypt sensitive text using AES-256-GCM.
 * Returns base64 string containing iv + authTag + ciphertext.
 */
export function encryptSensitive(value: string | null | undefined): string {
  if (!value) return ''

  const iv = crypto.randomBytes(12)
  const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv)
  const encrypted = Buffer.concat([
    cipher.update(value, 'utf8'),
    cipher.final(),
  ])
  const authTag = cipher.getAuthTag()

  return Buffer.concat([iv, authTag, encrypted]).toString('base64')
}

/**
 * Decrypt value previously encrypted with encryptSensitive.
 * If decryption fails (e.g. legacy plain text), returns the original input.
 */
export function decryptSensitive(payload: string | null | undefined): string {
  if (!payload) return ''

  try {
    const buf = Buffer.from(payload, 'base64')
    // 12 bytes IV, 16 bytes auth tag, rest is ciphertext
    const iv = buf.subarray(0, 12)
    const authTag = buf.subarray(12, 28)
    const data = buf.subarray(28)

    const decipher = crypto.createDecipheriv(ALGORITHM, KEY, iv)
    decipher.setAuthTag(authTag)
    const decrypted = Buffer.concat([decipher.update(data), decipher.final()])
    return decrypted.toString('utf8')
  } catch {
    // If payload is not valid base64/encrypted data, return as-is
    return payload
  }
}
