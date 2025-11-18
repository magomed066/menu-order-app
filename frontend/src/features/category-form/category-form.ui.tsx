import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as z from 'zod'

import {
  Checkbox,
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  Input,
} from '@/shared/ui'

import { formSchema } from './validation'

type CategoryFormFeatureProps = {
  id?: string
  defaultValues?: z.infer<typeof formSchema>
  onSubmit?: (data: z.infer<typeof formSchema>) => void
}

function CategoryFormFeature({
  id,
  defaultValues,
  onSubmit,
}: CategoryFormFeatureProps) {
  const { t } = useTranslation(['products', 'categories'])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      isActive: true,
      ...defaultValues,
    },
  })

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    onSubmit?.(data)
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
                  <FieldLabel htmlFor="isActive">
                    {t('categories:showCategory')}
                  </FieldLabel>
                </div>
              </Field>
            )}
          />
        </FieldGroup>
      </form>
    </div>
  )
}

export default CategoryFormFeature
