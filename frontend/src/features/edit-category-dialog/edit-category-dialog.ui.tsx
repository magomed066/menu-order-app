import type { Category } from '@/shared/api/services'

import {
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} from '@/entities/categories'

import { type AllTranslationKeys, useAppTranslation } from '@/shared/lib/hooks'
import { showToast } from '@/shared/lib/toast'

import {
  Button,
  ButtonLoading,
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui'

import CategoryFormFeature from '../category-form'

type Props = {
  category: Category | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

const CATEGORY_EDIT_FORM_ID = 'edit_category_form'

function EditCategoryDialogFeature({ category, open, onOpenChange }: Props) {
  const { t } = useAppTranslation()

  const { mutate: updateCategory, isPending: isUpdating } =
    useUpdateCategoryMutation(
      () => {
        showToast('success', t('pages:categorySaved' as AllTranslationKeys))
        onOpenChange(false)
      },
      (errors) => {
        errors.forEach((err) => {
          showToast('error', err.msg, {})
        })
      },
    )

  const { mutate: deleteCategory, isPending: isDeleting } =
    useDeleteCategoryMutation(
      () => {
        showToast('success', t('pages:categoryDeleted' as AllTranslationKeys))
        onOpenChange(false)
      },
      (errors) => {
        errors.forEach((err) => {
          showToast('error', err.msg, {})
        })
      },
    )

  if (!category) return null

  const handleSubmit = (values: {
    name: string
    description?: string
    isActive?: boolean
  }) => {
    updateCategory({ id: category.id, data: values })
  }

  const handleDelete = () => {
    deleteCategory(category.id)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('pages:editCategoryDialogTitle')}</DialogTitle>
        </DialogHeader>

        <CategoryFormFeature
          id={CATEGORY_EDIT_FORM_ID}
          defaultValues={{
            name: category.name,
            description: category.description ?? '',
            isActive: category.isActive,
          }}
          onSubmit={handleSubmit}
        />

        <DialogFooter className="flex justify-between">
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {t('pages:delete')}
          </Button>
          <div className="flex gap-2">
            <DialogClose asChild>
              <Button disabled={isUpdating || isDeleting} variant="outline">
                {t('common:cancel')}
              </Button>
            </DialogClose>

            <ButtonLoading
              loading={isUpdating}
              disabled={isUpdating || isDeleting}
              type="submit"
              form={CATEGORY_EDIT_FORM_ID}
            >
              {t('common:save')}
            </ButtonLoading>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default EditCategoryDialogFeature

