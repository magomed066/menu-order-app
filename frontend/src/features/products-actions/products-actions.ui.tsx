import type { CreateProduct } from '@/shared/api/services'
import { useQueryClient } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { type ChangeEvent, useEffect, useState } from 'react'
import { useDebounceValue } from 'usehooks-ts'

import { PRODUCT_FORMS, useCreateProductMutation } from '@/entities/products'
import { productsQueryKeys } from '@/entities/products/model/consts'

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
  DialogTrigger,
  Input,
} from '@/shared/ui'

import ProductFormFeature from '../product-form'

function ProductsActionsFeature() {
  const [open, setOpen] = useState(false)
  const { setQueryParams, removeQueryParam, getQueryParam } = useQueryParams()
  const defaultQuery = getQueryParam('search') || ''
  const productsPageQuery = getQueryParam('page')
  const [query, setQuery] = useState(defaultQuery)

  const [debouncedValue] = useDebounceValue(query, 1000)

  const client = useQueryClient()

  const { mutate, isPending } = useCreateProductMutation(
    () => {
      showToast('success', 'Продукт успешно сохранен')
      setOpen(false)

      client.invalidateQueries({
        queryKey: productsQueryKeys.all('', Number(productsPageQuery)),
      })
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target

    setQuery(value)
  }

  useEffect(() => {
    if (debouncedValue) {
      setQueryParams({
        search: debouncedValue,
      })
    } else {
      removeQueryParam('search')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue])

  return (
    <div className="flex w-full items-center gap-3">
      <Input
        placeholder="Поиск по меню"
        className="w-full md:max-w-[420px]"
        defaultValue={defaultQuery}
        value={query}
        onChange={handleChange}
      />
      <div className="flex-1" />

      <Dialog open={open} onOpenChange={setOpen}>
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
