export const ORDER_STATUSES = {
  PENDING: 'pending',
  COOKING: 'cooking',
  CANCElED: 'cancelled',
  COMPLETED: 'completed',
  READY: 'ready',
}

export const ORDER_STATUS_LABEL = {
  [ORDER_STATUSES.PENDING]: 'Новый',
  [ORDER_STATUSES.COOKING]: 'В процессе',
  [ORDER_STATUSES.COMPLETED]: 'Завершен',
  [ORDER_STATUSES.CANCElED]: 'Отменен',
  [ORDER_STATUSES.READY]: 'Готов',
}

export const ordersQueryKeys = {
  all: (filters?: Record<string, unknown>) => ['orders', filters ?? {}],
  byId: (id: number) => ['orders', 'byId', id],
}
