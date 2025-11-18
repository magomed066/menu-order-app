import type { CreateProduct } from '@/shared/api/services'
import { useQueryClient } from '@tanstack/react-query'

import { PRODUCT_FORMS, useUpdateProductMutation } from '@/entities/products'
import { productsQueryKeys } from '@/entities/products/model/consts'

import { type AllTranslationKeys, useAppTranslation } from '@/shared/lib/hooks'
import { showToast } from '@/shared/lib/toast'
import { useQueryParams } from '@/shared/lib/utils'

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

import EditProductFeature from '../edit-product/edit-product.ui'

function EditProductDialogFeature() {
  const { t } = useAppTranslation()
  const { getQueryParam, removeQueryParam } = useQueryParams()
  const queryClient = useQueryClient()

  const productIdParam = getQueryParam('productId')
  const productId = productIdParam ? Number(productIdParam) : undefined

  const { mutate, isPending } = useUpdateProductMutation(
    () => {
      showToast('success', t('pages:productSaved' as AllTranslationKeys))
      if (productId) {
        queryClient.invalidateQueries({
          queryKey: productsQueryKeys.byId(productId),
        })
      }
      removeQueryParam('productId')
    },
    (errors) => {
      errors.forEach((err) => {
        showToast('error', err.msg, {})
      })
    },
  )

  const handleEditSubmit = (values: CreateProduct) => {
    if (!productId) return
    mutate({ id: productId, data: values })
  }

  return (
    <Dialog
      open={Boolean(productId)}
      onOpenChange={(open) => !open && removeQueryParam('productId')}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('pages:editProductDialogTitle')}</DialogTitle>
        </DialogHeader>

        <EditProductFeature
          id={PRODUCT_FORMS.EDIT}
          onSubmit={handleEditSubmit}
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
            form={PRODUCT_FORMS.EDIT}
          >
            {t('common:save')}
          </ButtonLoading>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default EditProductDialogFeature
