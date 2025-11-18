import type { CreateCategory } from '@/shared/api/services'
import { useQueryClient } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { useState } from 'react'

import { useCreateCategoryMutation } from '@/entities/categories'

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
  DialogTrigger,
} from '@/shared/ui'

import CategoryFormFeature from '../category-form'

const CATEGORY_FORM_ID = 'create_category_form'

function CategoriesActionsFeature() {
  const { t } = useAppTranslation()
  const [open, setOpen] = useState(false)
  const queryClient = useQueryClient()

  const { mutate, isPending } = useCreateCategoryMutation(
    () => {
      showToast('success', t('pages:categorySaved' as AllTranslationKeys))
      setOpen(false)
      queryClient.invalidateQueries()
    },
    (errors) => {
      errors.forEach((err) => {
        showToast('error', err.msg, {})
      })
    },
  )

  const handleCreateCategorySubmit = (values: CreateCategory) => {
    mutate(values)
  }

  return (
    <div className="flex w-full items-center gap-3">
      <div className="flex-1" />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>
            <Plus /> {t('pages:addCategory')}
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t('pages:addCategoryDialogTitle')}</DialogTitle>
          </DialogHeader>

          <CategoryFormFeature
            id={CATEGORY_FORM_ID}
            onSubmit={handleCreateCategorySubmit}
          />

          <DialogFooter>
            <DialogClose asChild>
              <Button disabled={isPending} variant="outline">
                {t('common:cancel')}
              </Button>
            </DialogClose>

            <ButtonLoading
              loading={isPending}
              disabled={isPending}
              type="submit"
              form={CATEGORY_FORM_ID}
            >
              {t('common:save')}
            </ButtonLoading>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CategoriesActionsFeature

