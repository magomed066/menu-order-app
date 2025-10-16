'use client'

import { Link } from 'react-router-dom'

import { useAppTranslation } from '@/shared/lib/hooks'
import { cn } from '@/shared/lib/utils'

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/shared/ui'

import type { Props } from './types'

function NavMain(props: Props) {
  const { items } = props
  const { t } = useAppTranslation()

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => (
            <Link
              key={item.title}
              to={item.url}
              className={cn(
                item?.disabled &&
                  'pointer-events-none opacity-50 cursor-not-allowed'
              )}
            >
              <SidebarMenuItem>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{t(item.title)}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </Link>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

export default NavMain
