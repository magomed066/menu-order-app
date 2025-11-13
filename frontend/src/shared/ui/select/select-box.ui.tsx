import * as React from 'react'
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
  type RegisterOptions,
} from 'react-hook-form'

import { cn } from '@/shared/lib/utils'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select.ui'

import { Field, FieldError, FieldLabel } from '@/shared/ui/field'

type SelectOption = {
  label: React.ReactNode
  value: string
  disabled?: boolean
  icon?: React.ReactNode
}

type BaseProps = {
  options: SelectOption[]
  placeholder?: React.ReactNode
  size?: 'sm' | 'default'
  disabled?: boolean
  id?: string
  className?: string
  triggerClassName?: string
  contentClassName?: string
  itemClassName?: string
  onBlur?: React.FocusEventHandler<HTMLButtonElement>
  onChange?: (value: string) => void // alias for react-hook-form compatibility
}

type SelectBoxProps = BaseProps &
  Omit<React.ComponentProps<typeof Select>, 'children' | 'onValueChange' | 'value' | 'defaultValue'> & {
    value?: string
    defaultValue?: string
    onValueChange?: (value: string) => void
  }

function SelectBox({
  options,
  placeholder,
  size = 'default',
  disabled,
  id,
  className,
  triggerClassName,
  contentClassName,
  itemClassName,
  value,
  defaultValue,
  onValueChange,
  onChange,
  onBlur,
  ...rootProps
}: SelectBoxProps) {
  const handleChange = React.useCallback(
    (val: string) => {
      if (onValueChange) onValueChange(val)
      if (onChange) onChange(val)
    },
    [onValueChange, onChange]
  )

  return (
    <Select value={value} defaultValue={defaultValue} onValueChange={handleChange} {...rootProps}>
      <SelectTrigger id={id} size={size} disabled={disabled} className={cn(className, triggerClassName)} onBlur={onBlur}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className={contentClassName} align={rootProps?.dir ? undefined : 'center'}>
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value} disabled={opt.disabled} className={itemClassName}>
            {opt.icon}
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

type RHFSelectBoxProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>
  control: Control<TFieldValues>
  rules?: RegisterOptions<TFieldValues, Path<TFieldValues>>
  label?: React.ReactNode
  placeholder?: React.ReactNode
  options: SelectOption[]
  size?: 'sm' | 'default'
  id?: string
  className?: string
  fieldClassName?: string
  parseValue?: (value: string) => any
  formatValue?: (value: unknown) => string | undefined
} & Omit<SelectBoxProps, 'options' | 'placeholder' | 'size' | 'id' | 'value' | 'defaultValue' | 'onValueChange' | 'onChange' | 'onBlur' | 'className'>

function RHFSelectBox<TFieldValues extends FieldValues>({
  name,
  control,
  rules,
  label,
  placeholder,
  options,
  size = 'default',
  id,
  className,
  fieldClassName,
  parseValue,
  formatValue,
  ...rest
}: RHFSelectBoxProps<TFieldValues>) {
  const triggerId = id ?? name

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className={fieldClassName}>
          {label && (
            <FieldLabel htmlFor={triggerId} className={className}>
              {label}
            </FieldLabel>
          )}

          <SelectBox
            id={triggerId}
            options={options}
            placeholder={placeholder}
            size={size}
            aria-invalid={fieldState.invalid}
            value={formatValue ? formatValue(field.value) : (field.value as unknown as string | undefined)}
            onValueChange={(v) => field.onChange(parseValue ? parseValue(v) : v)}
            onBlur={field.onBlur as React.FocusEventHandler<HTMLButtonElement>}
            {...rest}
          />

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  )
}

export { SelectBox, RHFSelectBox }
export type { SelectBoxProps, SelectOption, RHFSelectBoxProps }
