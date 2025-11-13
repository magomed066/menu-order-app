import AuthPage from '@/pages/auth'
import DashboardPage from '@/pages/dashboard'
import MainPage from '@/pages/main'
import CartPage from '@/pages/cart'
import OrdersPage from '@/pages/orders'
import ProductsPage from '@/pages/products'

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
  {
    Component: CartPage,
    path: ROUTES.CART,
  },
]

export const privateRoutes = [
  {
    Component: DashboardPage,
    path: ROUTES.DASHBOARD,
  },
  {
    Component: ProductsPage,
    path: ROUTES.PRODUCTS,
  },
  {
    Component: OrdersPage,
    path: ROUTES.ORDERS,
  },
]
