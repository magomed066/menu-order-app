import type { OrderStatus } from '@/shared/api/services'

export const checkOrderTypeClasses = (
  status: OrderStatus,
  hovered: boolean,
  isActive?: boolean
) => {
  if (status === 'pending') {
    return hovered || isActive ? 'hover:bg-[#FDDDB2]' : 'bg-[#FFF1DE]'
  }

  if (status === 'cooking') {
    return 'bg-whte'
  }

  return ''
}
