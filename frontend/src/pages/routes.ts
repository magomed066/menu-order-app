import AuthPage from '@/pages/auth'
import DashboardPage from '@/pages/dashboard'
import MainPage from '@/pages/main'
import MenuPage from '@/pages/menu'
import OrdersPage from '@/pages/orders'

import { ROUTES } from '@/shared/lib/config'

export const publicRoutes = [
  {
    Component: AuthPage,
    path: ROUTES.ADMIN,
  },
  {
    Component: MainPage,
    path: ROUTES.MAIN,
  },
]

export const privateRoutes = [
  {
    Component: DashboardPage,
    path: ROUTES.DASHBOARD,
  },
  {
    Component: MenuPage,
    path: ROUTES.MENU,
  },
  {
    Component: OrdersPage,
    path: ROUTES.ORDERS,
  },
]
