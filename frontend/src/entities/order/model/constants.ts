import type { PaymentMethod } from '@/shared/api/services'

export const ORDER_STATUSES = {
  PENDING: 'pending',
  COOKING: 'cooking',
  CANCElED: 'cancelled',
  COMPLETED: 'completed',
  READY: 'ready',
}

export const ORDER_STATUS_LABEL = {
  [ORDER_STATUSES.PENDING]: 'pages:status_pending',
  [ORDER_STATUSES.COOKING]: 'pages:status_cooking',
  [ORDER_STATUSES.COMPLETED]: 'pages:status_completed',
  [ORDER_STATUSES.CANCElED]: 'pages:status_cancelled',
  [ORDER_STATUSES.READY]: 'pages:status_ready',
}

export const ordersQueryKeys = {
  all: (filters?: Record<string, unknown>) => ['orders', filters ?? {}],
  byId: (id: number) => ['orders', 'byId', id],
}

export const ORDER_PAYMENT_TYPE = {
  CASH: 'cash',
  ONLINE: 'online',
  CARD_WAITER: 'card_waiter',
}

export const ORDER_TYPE = {
  DINE_IN: 'dine_in',
  DELIVERY: 'delivery',
}
