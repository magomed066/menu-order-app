import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { useUserStore } from '@/entities/auth'

import { ROUTES } from '@/shared/lib/config'

type RequireAuthProps = {
  children: ReactNode
}

function RequireAuth({ children }: RequireAuthProps) {
  const location = useLocation()
  const accessToken = useUserStore((s) => s.accessToken)

  if (!accessToken) {
    return <Navigate to={ROUTES.ADMIN} state={{ from: location }} replace />
  }

  return <>{children}</>
}

export default RequireAuth
