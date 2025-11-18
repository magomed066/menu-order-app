import { zodResolver } from '@hookform/resolvers/zod'
import { Trash } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as z from 'zod'

import { useUserStore } from '@/entities/auth'
import { useGetCategories } from '@/entities/categories'
import { useGetProduct } from '@/entities/products'

import { getBase64, useQueryParams } from '@/shared/lib/utils'

import {
  Checkbox,
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  Input,
  RHFSelectBox,
} from '@/shared/ui'
import { Spinner } from '@/shared/ui/spinner'

import { formSchema } from './validation'

type ProductFormFeatureProps = {
  id?: string
  onSubmit?: (data: z.infer<typeof formSchema>) => void
}

function EditProductFeature({ id, onSubmit }: ProductFormFeatureProps) {
  const { t } = useTranslation(['products'])

  const { user } = useUserStore()
  const role = user?.role
  const isCashier = role === 'cashier'

  const { categories, isFetching: isFetchingCategories } = useGetCategories()

  const { getQueryParam } = useQueryParams()
  const productIdParam = getQueryParam('productId')
  const productId = productIdParam ? Number(productIdParam) : undefined

  const { product, isFetching } = useGetProduct(productId)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: product?.name,
      price: product?.price,
      categoryId: product?.categoryId,
      image: product?.image,
      description: product?.description,
      isActive: product?.isActive ?? true,
    },
  })

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    if (!onSubmit) return

    if (!product) {
      onSubmit(data)
      return
    }

    if (isCashier) {
      const restrictedData = {
        name: product.name,
        price: product.price,
        categoryId: product.categoryId,
        image: product.image,
        description: product.description,
        isActive: data.isActive ?? product.isActive,
      }

      onSubmit(restrictedData)
      return
    }

    onSubmit(data)
  }

  useEffect(() => {
    if (product) {
      const formValues = {
        name: product.name,
        price: product.price,
        categoryId: product.categoryId,
        image: product.image ?? '',
        description: product.description ?? '',
        isActive: product.isActive,
      }

      form.reset(formValues)

      // Дополнительно устанавливаем значение категории
      if (product.categoryId) {
        form.setValue('categoryId', product.categoryId)
      }
    }
  }, [product, categories, form])

  const [files, setFiles] = useState<File[]>([])

  const handleDrop = (files: File[]) => {
    setFiles(files)
    getBase64(files[0]).then((value) => {
      form.setValue('image', value)
    })
  }

  const handleRemoveImage = () => {
    setFiles([])
    form.setValue('image', '')
  }

  if (!productId) {
    return null
  }

  if (isFetching || isFetchingCategories) {
    return (
      <div className="flex flex-col items-center justify-center flex-1">
        <Spinner scale={10} />
      </div>
    )
  }

  return (
    <div className="grid gap-4">
      <form id={id} onSubmit={form.handleSubmit(handleSubmit)}>
        <FieldGroup className="grid gap-3">
          <Controller
            name="name"
            control={form.control}
            render={({ fieldState, field }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="name">{t('name')}</FieldLabel>
                <Input
                  {...field}
                  id="name"
                  disabled={isCashier}
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="description"
            control={form.control}
            render={({ fieldState, field }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="description">
                  {t('description')}
                </FieldLabel>
                <Input
                  {...field}
                  id="description"
                  disabled={isCashier}
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="price"
            control={form.control}
            render={({ fieldState, field }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="price">{t('price')}</FieldLabel>
                <Input
                  {...field}
                  id="price"
                  type="number"
                  disabled={isCashier}
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <RHFSelectBox
            name="categoryId"
            control={form.control}
            label={t('category')}
            placeholder={t('category')}
            options={categories.map((c) => ({
              value: String(c.id), // значение как строка
              label: c.name,
            }))}
            disabled={isCashier}
            parseValue={(v) => Number(v)} // преобразуем строку в число
            formatValue={(v) => String(v ?? '')} // преобразуем число в строку
          />
          {/* <RHFSelectBox
            name="categoryId"
            control={form.control}
            label={t('category')}
            placeholder={t('category')}
            options={categories.map((c) => ({
              value: String(c.id),
              label: c.name,
            }))}
            disabled={isCashier}
            parseValue={(v) => Number(v)}
            formatValue={(v) =>
              v === undefined || v === null ? undefined : String(v as number)
            }
          /> */}
          <Controller
            name="isActive"
            control={form.control}
            render={({ field }) => (
              <Field>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="isActive"
                    checked={field.value}
                    onCheckedChange={(checked) =>
                      field.onChange(Boolean(checked))
                    }
                  />
                  <FieldLabel htmlFor="isActive">{t('isActive')}</FieldLabel>
                </div>
              </Field>
            )}
          />

          {!form.watch('image') && !isCashier && (
            <Dropzone onDrop={handleDrop} multiple={false} src={files}>
              <DropzoneEmptyState />
              <DropzoneContent />
            </Dropzone>
          )}

          {form.watch('image') && (
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between">
                <FieldLabel>{t('image')}</FieldLabel>
                {!isCashier && (
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-50"
                    onClick={handleRemoveImage}
                  >
                    <Trash className="h-3 w-3" />
                    Удалить
                  </button>
                )}
              </div>
              <div className="overflow-hidden rounded-md border">
                <img
                  src={form.watch('image')}
                  alt={form.watch('name')}
                  className="h-48 w-full object-cover"
                />
              </div>
            </div>
          )}
        </FieldGroup>
      </form>
    </div>
  )
}

export default EditProductFeature
