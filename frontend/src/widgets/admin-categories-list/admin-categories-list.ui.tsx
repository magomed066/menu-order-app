import type { Category } from '@/shared/api/services'
import { GripVertical } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import {
  useGetCategories,
  useUpdateCategorySortOrderMutation,
} from '@/entities/categories'

import EditCategoryDialogFeature from '@/features/edit-category-dialog'

import { type AllTranslationKeys, useAppTranslation } from '@/shared/lib/hooks'
import { showToast } from '@/shared/lib/toast'

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Skeleton,
} from '@/shared/ui'

const DND_TYPE = 'CATEGORY_ROW'

type CategoryRowProps = {
  category: Category
  index: number
  onClick: (category: Category) => void
  moveCategory: (from: number, to: number) => void
  onDropComplete: () => void
}

function CategoryRow({
  category,
  index,
  onClick,
  moveCategory,
  onDropComplete,
}: CategoryRowProps) {
  const { t } = useAppTranslation()
  const ref = useRef<HTMLButtonElement | null>(null)

  const [, drop] = useDrop({
    accept: DND_TYPE,
    hover(item: { index: number }) {
      if (!ref.current) return
      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) return
      moveCategory(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
    drop: () => {
      onDropComplete()
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: DND_TYPE,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  drag(drop(ref))

  return (
    <button
      type="button"
      ref={ref}
      onClick={() => onClick(category)}
      className="flex w-full items-center justify-between gap-2 py-3 text-left hover:bg-muted/50"
      style={{
        opacity: isDragging ? 0.6 : 1,
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
    >
      <div className="flex items-center gap-2">
        <GripVertical className="h-4 w-4 text-muted-foreground" />
        <div className="flex flex-col">
          <span className="font-medium">{category.name}</span>
          {category.description && (
            <span className="text-xs text-muted-foreground">
              {category.description}
            </span>
          )}
        </div>
      </div>
      <Badge
        variant={category.isActive ? 'default' : 'outline'}
        className={category.isActive ? '' : 'opacity-60'}
      >
        {category.isActive
          ? (t('categories:enabled' as any) ?? 'Активна')
          : (t('categories:disabled' as any) ?? 'Скрыта')}
      </Badge>
    </button>
  )
}

function AdminCategoriesListWidget() {
  const { t } = useAppTranslation()
  const { categories, isFetching } = useGetCategories()
  const [orderedCategories, setOrderedCategories] = useState<Category[]>([])
  const [selected, setSelected] = useState<Category | null>(null)
  const [open, setOpen] = useState(false)
  const [statusFilter, setStatusFilter] = useState<'active' | 'inactive'>(
    'active',
  )

  const { mutate: updateSortOrder } = useUpdateCategorySortOrderMutation()

  useEffect(() => {
    setOrderedCategories(categories)
  }, [categories])

  const handleRowClick = (category: Category) => {
    setSelected(category)
    setOpen(true)
  }

  const moveCategory = (from: number, to: number) => {
    setOrderedCategories((prev) => {
      const updated = [...prev]
      const [moved] = updated.splice(from, 1)
      updated.splice(to, 0, moved)
      return updated
    })
  }

  const handleDropComplete = () => {
    const updated = orderedCategories
    updated.forEach((category, index) => {
      updateSortOrder({ id: category.id, sortOrder: index + 1 })
    })
    showToast(
      'success',
      t('pages:categoriesOrderUpdated' as AllTranslationKeys)
    )
  }

  if (isFetching) {
    return (
      <div className="grid gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full rounded-md" />
        ))}
      </div>
    )
  }

  const filteredCategories = orderedCategories.filter((c) =>
    statusFilter === 'active' ? c.isActive : !c.isActive,
  )

  return (
    <div className="mt-4">
      <DndProvider backend={HTML5Backend}>
        <Card>
          <CardHeader>
            <CardTitle>{t('categories:categories')}</CardTitle>
            <div className="mt-2 flex gap-2">
              <Button
                size="sm"
                variant={statusFilter === 'active' ? 'default' : 'outline'}
                onClick={() => setStatusFilter('active')}
              >
                {t('categories:enabledFilter')}
              </Button>
              <Button
                size="sm"
                variant={statusFilter === 'inactive' ? 'default' : 'outline'}
                onClick={() => setStatusFilter('inactive')}
              >
                {t('categories:disabledFilter')}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {filteredCategories.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                {t('categories:noCategories')}
              </p>
            ) : (
              <div className="divide-y">
                {filteredCategories.map((category) => {
                  const index = orderedCategories.findIndex(
                    (c) => c.id === category.id,
                  )
                  return (
                    <CategoryRow
                      key={category.id}
                      category={category}
                      index={index}
                      onClick={handleRowClick}
                      moveCategory={moveCategory}
                      onDropComplete={handleDropComplete}
                    />
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </DndProvider>

      <EditCategoryDialogFeature
        category={selected}
        open={open}
        onOpenChange={setOpen}
      />
    </div>
  )
}

export default AdminCategoriesListWidget
