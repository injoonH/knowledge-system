import { TabSidebar, TabSidebarHeader, TabSidebarTitle } from '@/components/sidebar/tabs/tab-sidebar.tsx'
import { SidebarContent, SidebarInput } from '@/components/ui/sidebar.tsx'

export function ExtensionsSidebar() {
  return (
    <TabSidebar>
      <TabSidebarHeader>
        <TabSidebarTitle title="Extensions" />
        <SidebarInput placeholder="Search Extensions in Marketplace" />
      </TabSidebarHeader>
      <SidebarContent />
    </TabSidebar>
  )
}
