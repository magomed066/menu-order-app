import { useRef } from 'react'
import { useHover } from 'usehooks-ts'

import { cn, formattedDate, priceFormatter } from '@/shared/lib/utils'

import { checkOrderTypeClasses } from '../../utils/checkCardType'
import OrderStatusBadge from '../order-status-badge/order-status-badge.ui'
import type { Props } from './types'

function OrderCard(props: Props) {
  const { data, onClick, isActive, badge, totalPrice } = props

  const ref = useRef(null)

  // const hovered = useHover(ref.current)

  return (
    <div
      ref={ref}
      className={cn(
        'rounded-lg py-3 px-4 cursor-pointer transition-all relative overflow-hidden bg-white border',
        data.status === 'pending' && 'border border-[#F79009]',
        data.status === 'pending' &&
          isActive &&
          'hover:bg-[#FFF1DE] bg-[#FFF1DE]',
        data.status === 'cooking' && isActive && 'shadow',
        data.status === 'ready' && isActive && 'opacity-100 shadow',
        data.status === 'ready' && !isActive && 'opacity-50 shadow',
        data.status === 'completed' && !isActive && 'opacity-50 bg-white'
      )}
      onClick={() => onClick?.(data)}
    >
      <div
        className={cn(
          'absolute left-0 top-0 bottom-0 w-1 bg-white',
          data.status === 'pending' ? 'bg-[#F79009]' : 'bg-[#0D4FDC]',
          !isActive && 'opacity-0'
        )}
      />

      {badge ? (
        <div className="absolute bottom-2 right-2 ">
          <OrderStatusBadge status={data.status} />
        </div>
      ) : null}

      <h4 className="font-bold">{priceFormatter.format(Number(totalPrice))}</h4>

      <div className="flex items-center mt-4 gap-1">
        <p className="text-sm">№{data.id}</p>
        <div className="text-dark">•</div>
        <p className="text-sm">{formattedDate(data.createdAt)}</p>
      </div>
    </div>
  )
}

export default OrderCard
