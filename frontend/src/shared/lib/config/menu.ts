// import i18next from 'i18next'
import {
  ChartNoAxesCombined,
  List,
  type LucideProps,
  ScrollText,
} from 'lucide-react'
import type { ForwardRefExoticComponent, RefAttributes } from 'react'

import type { Resources } from '../types'
import { ROUTES } from './routes'

type AllTranslationKeys = {
  [K in keyof Resources]: `${Extract<K, string>}:${Extract<keyof Resources[K], string>}`
}[keyof Resources]

export type MenuItem = {
  title: AllTranslationKeys // Can be any valid translation key
  url: string
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >
  disabled?: boolean
}

export type Menu = {
  user: {
    name: string
    email: string
    avatar: string
  }
  navMain: MenuItem[]
}

export const MENU_LIST: Menu = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    {
      title: 'menu:menu',
      url: ROUTES.MENU,
      icon: List,
    },
    {
      title: 'Заказы',
      url: ROUTES.ORDERS,
      icon: ScrollText,
    },
    {
      title: 'Аналитика',
      url: ROUTES.ANALITICS,
      icon: ChartNoAxesCombined,
      disabled: true,
    },
  ],
}
