import AuthPage from '@/pages/auth'
import DashboardPage from '@/pages/dashboard'
import MainPage from '@/pages/main'

import { routes } from '@/shared/lib/config'

export const publicRoutes = [
  {
    Component: AuthPage,
    path: routes.auth,
  },
  {
    Component: MainPage,
    path: routes.main,
  },
  {
    Component: DashboardPage,
    path: routes.dashboard,
  },
]

export const privateRoutes = []
