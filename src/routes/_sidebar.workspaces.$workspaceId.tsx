import { createFileRoute, notFound, Outlet } from '@tanstack/react-router'
import type { CSSProperties } from 'react'
import { findWorkspace } from '@/api/workspace.ts'
import { AppSidebar } from '@/components/sidebar/app-sidebar.tsx'
import { SidebarProvider } from '@/components/ui/sidebar.tsx'

export const Route = createFileRoute('/_sidebar/workspaces/$workspaceId')({
  component: WorkspaceLayout,
  beforeLoad({ params }) {
    const workspaceId = params.workspaceId

    const workspace = findWorkspace(workspaceId)
    if (workspace === null) throw notFound()

    return { workspace }
  },
})

function WorkspaceLayout() {
  const workspace = Route.useRouteContext({ select: (ctx) => ctx.workspace })

  return (
    <SidebarProvider style={{ '--sidebar-width': '350px' } as CSSProperties}>
      <AppSidebar workspace={workspace} />
      <Outlet />
    </SidebarProvider>
  )
}
