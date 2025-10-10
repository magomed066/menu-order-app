import { CircleDashed } from 'lucide-react'
import { Link } from 'react-router-dom'

import { MENU_LIST, ROUTES } from '@/shared/lib/config'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/shared/ui'

import NavMain from './components/nav-main'
import NavUser from './components/nav-user'

function SidebarWidget() {
  return (
    <Sidebar collapsible="offcanvas" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link to={ROUTES.DASHBOARD}>
                <CircleDashed className="size-5" />
                <span className="text-base font-semibold">Admin Panel.</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={MENU_LIST.navMain} />
        {/* <NavDocuments items={data.documents} /> */}
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={MENU_LIST.user} />
      </SidebarFooter>
    </Sidebar>
  )
}

export default SidebarWidget
