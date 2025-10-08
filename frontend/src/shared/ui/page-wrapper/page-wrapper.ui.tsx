import type { ReactNode } from 'react'

import { cn } from '@/shared/lib/utils'

type Props = {
  children: ReactNode
  className?: string
}

function PageCenterWrapper({ children, className }: Props) {
  return (
    <div
      className={cn(
        'bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10 relative',
        className
      )}
    >
      {children}
    </div>
  )
}

export { PageCenterWrapper }
