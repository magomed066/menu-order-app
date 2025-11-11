// A wrapper for "JSON.parse()"" to support "undefined" value
export function parseJSON<T>(value: string | null): T | undefined {
  try {
    return JSON.parse(value ?? '')
  } catch {
    return undefined
  }
}
