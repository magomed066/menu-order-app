import type { CreateProduct } from '@/shared/api/services'
import { Plus } from 'lucide-react'

import { PRODUCT_FORMS, useCreateProductMutation } from '@/entities/products'

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
  Input,
} from '@/shared/ui'

import ProductFormFeature from '../product-form'

function ProductsActionsFeature() {
  const { mutate, isPending } = useCreateProductMutation(
    () => {
      showToast('success', 'Продукт успешно сохранен')
    },
    (errors) => {
      errors.forEach((err) => {
        showToast('error', err.msg, {})
      })
    }
  )

  const handleCreateProductSubmit = (values: CreateProduct) => {
    mutate(values)
  }

  return (
    <div className="flex w-full items-center gap-3">
      <Input placeholder="Поиск по меню" className="w-full md:max-w-[420px] " />
      <div className="flex-1" />

      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <Plus /> Добавить продукт
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Добавить продукт</DialogTitle>
          </DialogHeader>

          <ProductFormFeature
            id={PRODUCT_FORMS.CREATE}
            onSubmit={handleCreateProductSubmit}
          />

          <DialogFooter>
            <DialogClose asChild>
              <Button disabled={isPending} variant="outline">
                Отменить
              </Button>
            </DialogClose>

            <ButtonLoading
              loading={isPending}
              disabled={isPending}
              type="submit"
              form={PRODUCT_FORMS.CREATE}
            >
              Сохранить
            </ButtonLoading>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ProductsActionsFeature
