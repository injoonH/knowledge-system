import { TabSidebar, TabSidebarHeader, TabSidebarTitle } from '@/components/sidebar/tabs/tab-sidebar.tsx'
import { SidebarContent, SidebarInput } from '@/components/ui/sidebar.tsx'

export function SearchSidebar() {
  return (
    <TabSidebar>
      <TabSidebarHeader>
        <TabSidebarTitle title="Search" />
        <SidebarInput placeholder="Search" />
      </TabSidebarHeader>
      <SidebarContent />
    </TabSidebar>
  )
}
