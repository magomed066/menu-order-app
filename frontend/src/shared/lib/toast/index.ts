import { type ExternalToast, toast } from 'sonner'

export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'default'

export function showToast(
  type: ToastType,
  message: string,
  options?: ExternalToast
) {
  switch (type) {
    case 'success':
      return toast.success(message, options)
    case 'error':
      return toast.error(message, options)
    case 'warning':
      return (toast.warning ?? toast)(message, options)
    case 'info':
      return (toast.info ?? toast)(message, options)
    case 'default':
    default:
      return toast(message, options)
  }
}

export const notify = showToast
