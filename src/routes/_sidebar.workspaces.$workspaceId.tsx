import { createFileRoute, notFound, Outlet } from '@tanstack/react-router'
import { zodValidator } from '@tanstack/zod-adapter'
import type { CSSProperties } from 'react'
import { z } from 'zod/v4'
import { findWorkspace } from '@/api/workspace.ts'
import { AppSidebar } from '@/components/sidebar/app-sidebar.tsx'
import { sidebarTabs } from '@/components/sidebar/navigation-rail.tsx'
import { SidebarProvider } from '@/components/ui/sidebar.tsx'

const workspaceSearchSchema = z.object({
  tab: z.enum(sidebarTabs).optional(),
})

export const Route = createFileRoute('/_sidebar/workspaces/$workspaceId')({
  component: WorkspaceLayout,
  beforeLoad({ params }) {
    const workspaceId = params.workspaceId

    const workspace = findWorkspace(workspaceId)
    if (workspace === null) throw notFound()

    return { workspace }
  },
  validateSearch: zodValidator(workspaceSearchSchema),
})

function WorkspaceLayout() {
  const workspace = Route.useRouteContext({ select: (ctx) => ctx.workspace })
  const tab = Route.useSearch({ select: (state) => state.tab })

  return (
    <SidebarProvider open={tab !== undefined} style={{ '--sidebar-width': '350px' } as CSSProperties}>
      <AppSidebar workspace={workspace} tab={tab} />
      <Outlet />
    </SidebarProvider>
  )
}
