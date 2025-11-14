import { useAppTranslation } from '@/shared/lib/hooks'

import { Button, ScrollArea, ScrollBar } from '@/shared/ui'

type Props = {
  categories: string[]
  selected?: string | null
  onSelect?: (category: string | null) => void
  includeAll?: boolean
}

function CategoriesListWidget({
  categories,
  selected = null,
  onSelect,
  includeAll = true,
}: Props) {
  const { t } = useAppTranslation()
  const handleClick = (category: string | null) => () => {
    onSelect?.(category)
  }

  const items = includeAll ? (['Все', ...categories] as const) : categories

  const isSelected = (label: string) => {
    if (label === 'Все') return selected == null
    return selected === label
  }

  const toValue = (label: string): string | null =>
    label === 'Все' ? null : label

  return (
    <ScrollArea className="w-full pb-2">
      <div className="flex items-center gap-2">
        {items.map((label) => (
          <Button
            key={label}
            variant={isSelected(label) ? 'default' : 'outline'}
            size="sm"
            onClick={handleClick(toValue(label))}
          >
            {label === 'Все' ? t('pages:all') : label}
          </Button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}

export default CategoriesListWidget
