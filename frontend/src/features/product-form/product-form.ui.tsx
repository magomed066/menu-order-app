import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as z from 'zod'

import { getBase64 } from '@/shared/lib/utils'

import {
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

import { formSchema } from './validation'

type ProductFormFeatureProps = {
  id?: string
  onSubmit?: (data: z.infer<typeof formSchema>) => void
}

function ProductFormFeature({ id, onSubmit }: ProductFormFeatureProps) {
  const { t } = useTranslation(['products'])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      price: '',
      categoryId: 0,
      image: '',
    },
  })

  const categoryOptions = [
    { value: '1', label: 'Pizza' },
    { value: '2', label: 'Taco' },
    { value: '3', label: 'Sandwich' },
    { value: '4', label: 'Kebab' },
    { value: '5', label: 'Popcorn' },
    { value: '6', label: 'Burger' },
    { value: '7', label: 'Burrito' },
  ]

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    if (onSubmit) {
      onSubmit(data)
    }
  }

  const [files, setFiles] = useState<File[]>([])

  const handleDrop = (files: File[]) => {
    setFiles(files)
    getBase64(files[0]).then((value) => {
      form.setValue('image', value)
    })
  }

  return (
    <h1>
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
              options={categoryOptions}
              parseValue={(v) => Number(v)}
              formatValue={(v) =>
                v === undefined || v === null ? undefined : String(v as number)
              }
            />

            <Dropzone onDrop={handleDrop} multiple={false} src={files}>
              <DropzoneEmptyState />
              <DropzoneContent />
            </Dropzone>
          </FieldGroup>
        </form>
      </div>
    </h1>
  )
}

export default ProductFormFeature
