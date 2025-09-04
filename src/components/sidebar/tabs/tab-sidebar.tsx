import type { ReactNode } from 'react'
import { Sidebar, SidebarHeader } from '@/components/ui/sidebar.tsx'

interface TabSidebarProps {
  children: ReactNode
}

function TabSidebar({ children }: TabSidebarProps) {
  return (
    <Sidebar
      collapsible="none"
      className="hidden w-[calc(var(--sidebar-width)-var(--sidebar-width-icon)-2px)] flex-1 md:flex"
    >
      {children}
    </Sidebar>
  )
}

interface TabSidebarHeaderProps {
  children: ReactNode
}

function TabSidebarHeader({ children }: TabSidebarHeaderProps) {
  return <SidebarHeader className="gap-3.5 p-4">{children}</SidebarHeader>
}

interface TabSidebarTitleProps {
  title: string
  rightAddon?: ReactNode
}

function TabSidebarTitle({ title, rightAddon }: TabSidebarTitleProps) {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="font-medium text-base text-foreground capitalize">{title}</div>
      {rightAddon}
    </div>
  )
}

export { TabSidebar, TabSidebarHeader, TabSidebarTitle }
