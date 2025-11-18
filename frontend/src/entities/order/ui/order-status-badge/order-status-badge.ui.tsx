import { type AllTranslationKeys, useAppTranslation } from '@/shared/lib/hooks'
import { getOrderStatusBadgeCn } from '@/shared/lib/utils'

import { Badge } from '@/shared/ui'

import { ORDER_STATUS_LABEL } from '../../model/constants'
import type { Props } from './types'

function OrderStatusBadge(props: Props) {
  const { t } = useAppTranslation()
  const { status } = props

  return (
    <Badge className={getOrderStatusBadgeCn(status)}>
      {t(ORDER_STATUS_LABEL[status] as AllTranslationKeys)}
    </Badge>
  )
}

export default OrderStatusBadge
