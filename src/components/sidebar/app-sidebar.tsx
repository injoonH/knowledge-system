import { match } from 'ts-pattern'
import { NavigationRail, type SidebarTab } from '@/components/sidebar/navigation-rail.tsx'
import { ExplorerSidebar } from '@/components/sidebar/tabs/explorer/explorer-sidebar.tsx'
import { ExtensionsSidebar } from '@/components/sidebar/tabs/extensions/extensions-sidebar.tsx'
import { SearchSidebar } from '@/components/sidebar/tabs/search/search-sidebar.tsx'
import { Sidebar } from '@/components/ui/sidebar.tsx'
import type { Workspace } from '@/types/workspace.ts'

interface Props {
  workspace: Workspace
  tab: SidebarTab | undefined
}

export function AppSidebar({ workspace, tab }: Props) {
  return (
    <Sidebar collapsible="icon" className="overflow-hidden *:data-[sidebar=sidebar]:flex-row">
      <NavigationRail tab={tab} />
      {match(tab)
        .with('explorer', () => <ExplorerSidebar workspace={workspace} />)
        .with('search', () => <SearchSidebar />)
        .with('extensions', () => <ExtensionsSidebar />)
        .with(undefined, () => null)
        .exhaustive()}
    </Sidebar>
  )
}
