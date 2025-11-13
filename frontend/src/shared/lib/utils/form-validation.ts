export function isValid<T>(
  validations: Array<(value: T) => string | null>,
  value: T
) {
  for (let i = 0; i < validations.length; i += 1) {
    const error = validations[i](value)

    if (error) {
      return error
    }
  }

  return null
}

// Validators

export function requiredValidate(error: string) {
  return (value: string) => (value.length === 0 ? error : null)
}

export function minLength(minNum: number, error: string) {
  return (value: string) => (value.length < minNum ? error : null)
}

export function max(maxNum: number, error: string) {
  return (value: number) => (value > maxNum ? error : null)
}

export function min(minNum: number, error: string) {
  return (value: number) => (value < minNum ? error : null)
}

export function isValidEmail(error: string) {
  return (value: string) => (/^\S+@\S+$/.test(value) ? null : error)
}

export function isNumber(error: string) {
  return (value: string) => (/^\d+\.?\d*$/.test(value) ? null : error)
}

export function isValidPhoneNumber(error: string) {
  return (value: string) => (/^\+7\d{10}$/.test(value) ? null : error)
}

export function isValidArrayOfString(error: string) {
  return (value: string[]) => (value[0].length > 0 ? null : error)
}

export function isValidFilledArray(error: string) {
  return (value: unknown[]) => (value.length > 0 ? null : error)
}

export function isValidNumber(error: string) {
  return (value: string) =>
    Number(value) !== 0 && Number(value) > 0 ? null : error
}
