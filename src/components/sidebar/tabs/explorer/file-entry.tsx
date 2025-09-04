import { useNavigate, useParams } from '@tanstack/react-router'
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import { overlay } from 'overlay-kit'
import { deleteDocument, updateDocumentName } from '@/api/document.ts'
import { openFileDialog } from '@/components/sidebar/tabs/explorer/open-file-dialog.tsx'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog.tsx'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx'
import { SidebarMenuAction, SidebarMenuItem, SidebarMenuLinkButton, useSidebar } from '@/components/ui/sidebar.tsx'
import type { FileItem } from '@/types/tree.ts'

interface Props {
  item: FileItem
}

export function FileEntry({ item }: Props) {
  const navigate = useNavigate()
  const { documentId } = useParams({ strict: false })
  const { isMobile } = useSidebar()

  async function openRenameDialog() {
    await openFileDialog({
      title: 'Rename',
      onSubmit(name) {
        updateDocumentName({ id: item.id, name })
      },
      onSuccess() {
        // TODO: Invalidate explorer tree query
      },
      defaultValue: item.name,
    })
  }

  async function openDeleteDialog() {
    const confirmed = await overlay.openAsync<boolean>(({ isOpen, close }) => (
      <AlertDialog open={isOpen} onOpenChange={() => close(false)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete file "{item.name}"?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => close(true)}>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    ))

    if (!confirmed) return

    deleteDocument(item.id)
    if (documentId === item.id) {
      await navigate({
        from: '/workspaces/$workspaceId',
        to: '/workspaces/$workspaceId',
        params: (it) => it,
      })
    }
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuLinkButton
        from="/workspaces/$workspaceId"
        to="/workspaces/$workspaceId/docs/$documentId"
        params={(it) => ({ workspaceId: it.workspaceId, documentId: item.id })}
        activeProps={{
          className: 'bg-sidebar-accent font-medium text-sidebar-accent-foreground',
        }}
      >
        <span>{item.name}</span>
      </SidebarMenuLinkButton>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuAction showOnHover>
            <MoreHorizontal />
            <span className="sr-only">More</span>
          </SidebarMenuAction>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-56 rounded-lg"
          side={isMobile ? 'bottom' : 'right'}
          align={isMobile ? 'end' : 'start'}
        >
          <DropdownMenuItem onClick={openRenameDialog}>
            <Pencil className="text-muted-foreground" />
            <span>Rename</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={openDeleteDialog}>
            <Trash2 className="text-muted-foreground" />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  )
}
