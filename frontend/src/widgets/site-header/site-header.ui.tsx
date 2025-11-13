import { useLocation } from 'react-router-dom'

import LocaleToggleFeature from '@/features/locale-toggle'
import ThemeToggleFeature from '@/features/theme-toggle'

import { ROUTES } from '@/shared/lib/config'
import { useAppTranslation } from '@/shared/lib/hooks'
import type { AllTranslationKeys } from '@/shared/lib/hooks'

import { Separator, SidebarTrigger } from '@/shared/ui'

function SiteHeader() {
  const { t } = useAppTranslation(['menu', 'pages'])
  const { pathname } = useLocation()

  const titleKeyByPath: Record<string, AllTranslationKeys> = {
    [ROUTES.MAIN]: 'menu:menu',
    [ROUTES.CART]: 'pages:cart',
    [ROUTES.ADMIN]: 'pages:admin',
    [ROUTES.DASHBOARD]: 'pages:dashboard',
    [ROUTES.PRODUCTS]: 'pages:products',
    [ROUTES.ORDERS]: 'pages:orders',
    [ROUTES.ANALITICS]: 'pages:analytics',
  }

  const title: AllTranslationKeys = titleKeyByPath[pathname] || 'menu:menu'

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{t(title)}</h1>
        <div className="ml-auto flex items-center gap-2">
          <div className="flex items-center gap-3">
            <LocaleToggleFeature />
            <ThemeToggleFeature />
          </div>
        </div>
      </div>
    </header>
  )
}

export default SiteHeader
