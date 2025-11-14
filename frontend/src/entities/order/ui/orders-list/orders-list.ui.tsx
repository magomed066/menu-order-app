import { useAppTranslation } from '@/shared/lib/hooks'
import { cn, getOrderStatusBadgeCn } from '@/shared/lib/utils'

import { Badge, Item, ItemContent, ItemTitle } from '@/shared/ui'

import type { Props } from './types'

function OrdersList(props: Props) {
  const { t } = useAppTranslation()
  const { data, onSelect, activeOrderId } = props

  const handleSelect = (number: number) => {
    onSelect?.(number)
  }

  return (
    <div className="flex flex-col gap-2">
      <h3>{t(data.label as any)}</h3>
      <div className="flex flex-col gap-4">
        {data.list.map((el) => (
          <Item
            key={el.id}
            variant="outline"
            size="sm"
            asChild
            className={cn(
              'hover:bg-slate-100 dark:hover:bg-slate-900 cursor-pointer',
              activeOrderId === el.id && 'bg-slate-100 dark:bg-slate-900 '
            )}
            onClick={() => handleSelect(el.id)}
          >
            <div>
              <ItemContent>
                <ItemTitle>
                  {t('pages:order')} №{el.id}
                </ItemTitle>
              </ItemContent>
              <ItemContent>
                <Badge className={getOrderStatusBadgeCn(el)}>
                  {t(data.label as any)}
                </Badge>
              </ItemContent>
            </div>
          </Item>
        ))}
      </div>
    </div>
  )
}

export default OrdersList
