import { useNavigate } from '@tanstack/react-router'
import { FilePlus } from 'lucide-react'
import { createDocument } from '@/api/document.ts'
import { getWorkspaceExplorerTree } from '@/api/workspace.ts'
import { openFileDialog } from '@/components/sidebar/tabs/explorer/open-file-dialog.tsx'
import { Tree } from '@/components/sidebar/tabs/explorer/tree.tsx'
import { TabSidebar, TabSidebarHeader, TabSidebarTitle } from '@/components/sidebar/tabs/tab-sidebar.tsx'
import { Button } from '@/components/ui/button.tsx'
import { SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu } from '@/components/ui/sidebar.tsx'
import type { Workspace } from '@/types/workspace.ts'

interface Props {
  workspace: Workspace
}

export function ExplorerSidebar({ workspace }: Props) {
  const navigate = useNavigate()

  const tree = getWorkspaceExplorerTree(workspace.id)

  async function openNewFileDialog() {
    await openFileDialog({
      title: 'New File',
      onSubmit(name) {
        return createDocument({
          workspaceId: workspace.id,
          name,
        })
      },
      onSuccess(documentId) {
        navigate({
          to: '/workspaces/$workspaceId/docs/$documentId',
          params: {
            workspaceId: workspace.id,
            documentId,
          },
        })
      },
    })
  }

  return (
    <TabSidebar>
      <TabSidebarHeader>
        <TabSidebarTitle
          title="Explorer"
          rightAddon={
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" onClick={openNewFileDialog} className="size-6">
                <FilePlus />
              </Button>
            </div>
          }
        />
      </TabSidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {tree.map((it) => (
                <Tree key={it.id} item={it} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </TabSidebar>
  )
}
