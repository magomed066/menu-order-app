import { Slot } from '@radix-ui/react-slot'
import type { VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/shared/lib/utils'

import { Spinner } from '../spinner'
import { buttonVariants } from './config'

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    loading?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

function ButtonLoading(
  props: React.ComponentProps<'button'> &
    VariantProps<typeof buttonVariants> & {
      asChild?: boolean
      loading?: boolean
    }
) {
  const { loading = false, children } = props
  return (
    <Button {...props} disabled={loading}>
      {loading && <Spinner />}
      {children}
    </Button>
  )
}

export { Button, ButtonLoading }
