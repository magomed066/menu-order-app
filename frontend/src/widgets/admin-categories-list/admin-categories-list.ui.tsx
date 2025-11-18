import type { Category } from '@/shared/api/services'
import { useState } from 'react'

import { useGetCategories } from '@/entities/categories'

import EditCategoryDialogFeature from '@/features/edit-category-dialog'

import { useAppTranslation } from '@/shared/lib/hooks'

import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Skeleton,
} from '@/shared/ui'

function AdminCategoriesListWidget() {
  const { t } = useAppTranslation()
  const { categories, isFetching } = useGetCategories()
  const [selected, setSelected] = useState<Category | null>(null)
  const [open, setOpen] = useState(false)

  const handleRowClick = (category: Category) => {
    setSelected(category)
    setOpen(true)
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

  if (!categories.length) {
    return (
      <p className="text-sm text-muted-foreground">
        {t('categories:noCategories')}
      </p>
    )
  }

  return (
    <div className="mt-4">
      <Card>
        <CardHeader>
          <CardTitle>{t('categories:categories')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => handleRowClick(category)}
                className="flex w-full items-center justify-between gap-2 py-3 text-left hover:bg-muted/50"
              >
                <div className="flex flex-col">
                  <span className="font-medium">{category.name}</span>
                  {category.description && (
                    <span className="text-xs text-muted-foreground">
                      {category.description}
                    </span>
                  )}
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
            ))}
          </div>
        </CardContent>
      </Card>

      <EditCategoryDialogFeature
        category={selected}
        open={open}
        onOpenChange={setOpen}
      />
    </div>
  )
}

export default AdminCategoriesListWidget
