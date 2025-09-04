import { ChevronRight, File, Folder } from 'lucide-react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible.tsx'
import { SidebarMenuButton, SidebarMenuItem, SidebarMenuLinkButton, SidebarMenuSub } from '@/components/ui/sidebar.tsx'
import type { TreeItem } from '@/types/tree.ts'

type Props = {
  item: TreeItem
}

export function Tree({ item }: Props) {
  if (item.type === 'file') {
    return (
      <SidebarMenuLinkButton
        from="/workspaces/$workspaceId"
        to="/workspaces/$workspaceId/docs/$documentId"
        params={(it) => ({ workspaceId: it.workspaceId, documentId: item.id })}
        activeProps={{
          className: 'bg-sidebar-accent font-medium text-sidebar-accent-foreground',
        }}
      >
        <File />
        {item.name}
      </SidebarMenuLinkButton>
    )
  }

  return (
    <SidebarMenuItem>
      <Collapsible className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90">
        <CollapsibleTrigger asChild>
          <SidebarMenuButton>
            <ChevronRight className="transition-transform" />
            <Folder />
            {item.name}
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.items.map((it) => (
              <Tree key={it.id} item={it} />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  )
}
