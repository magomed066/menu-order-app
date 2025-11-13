export type RequestError = {
  message: string
  success: boolean
}

export type RequestErrors = {
  errors: Array<{ msg: string }>
  success: boolean
}
