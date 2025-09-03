import { Link } from '@tanstack/react-router'
import { Blocks, Files, Search } from 'lucide-react'
import type { ReactNode } from 'react'
import { WorkspaceSwitcher } from '@/components/sidebar/workspace-switcher.tsx'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar.tsx'

export const sidebarTabs = ['explorer', 'search', 'extensions'] as const

export type SidebarTab = (typeof sidebarTabs)[number]

const SidebarTabIcon: Record<SidebarTab, ReactNode> = {
  explorer: <Files />,
  search: <Search />,
  extensions: <Blocks />,
}

interface Props {
  tab: SidebarTab | undefined
}

export function NavigationRail({ tab }: Props) {
  return (
    <Sidebar collapsible="none" className="w-[calc(var(--sidebar-width-icon)+1px)]! border-r">
      <SidebarHeader>
        <WorkspaceSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="px-1.5 md:px-0">
            <SidebarMenu>
              {sidebarTabs.map((it) => (
                <SidebarMenuItem key={it}>
                  <SidebarMenuButton
                    tooltip={{
                      children: it,
                      hidden: false,
                      className: 'capitalize',
                    }}
                    isActive={tab === it}
                    asChild
                  >
                    <Link to="." search={{ tab: tab === it ? undefined : it }} className="px-2.5 md:px-2">
                      {SidebarTabIcon[it]}
                      <span className="capitalize">{it}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
