import { useNavigate } from '@tanstack/react-router'
import { FilePlus } from 'lucide-react'
import { overlay } from 'overlay-kit'
import { createDocument } from '@/api/document.ts'
import { getWorkspaceExplorerTree } from '@/api/workspace.ts'
import { Tree } from '@/components/sidebar/tabs/explorer/tree.tsx'
import { TabSidebar, TabSidebarHeader, TabSidebarTitle } from '@/components/sidebar/tabs/tab-sidebar.tsx'
import { Button } from '@/components/ui/button.tsx'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog.tsx'
import { Input } from '@/components/ui/input.tsx'
import { SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu } from '@/components/ui/sidebar.tsx'
import type { Workspace } from '@/types/workspace.ts'

interface Props {
  workspace: Workspace
}

export function ExplorerSidebar({ workspace }: Props) {
  const navigate = useNavigate()

  const tree = getWorkspaceExplorerTree(workspace.id)

  async function openNewFileDialog() {
    const documentId = await overlay.openAsync<string | null>(({ isOpen, close }) => (
      <Dialog open={isOpen} onOpenChange={() => close(null)}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>New File</DialogTitle>
          </DialogHeader>
          <form
            action={(data) => {
              const name = data.get('name') as string
              const documentId = createDocument({
                workspaceId: workspace.id,
                name,
              })
              close(documentId)
            }}
          >
            <Input name="name" type="text" placeholder="Name" required />
          </form>
        </DialogContent>
      </Dialog>
    ))
    if (documentId === null) return
    await navigate({
      to: '/workspaces/$workspaceId/docs/$documentId',
      params: {
        workspaceId: workspace.id,
        documentId,
      },
      search: (it) => it,
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
