import { Outlet } from 'react-router-dom'

import SidebarWidget from '@/widgets/sidebar'
import SiteHeader from '@/widgets/site-header'

import { SidebarInset, SidebarProvider } from '@/shared/ui'

function BaseLayout() {
  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 72)',
          '--header-height': 'calc(var(--spacing) * 12)',
        } as React.CSSProperties
      }
    >
      <SidebarWidget />
      <SidebarInset>
        <SiteHeader />
        <main className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="p-4 md:p-6 lg:p-6">
              <Outlet />
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default BaseLayout
