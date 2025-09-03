import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_sidebar/workspaces/')({
  loader({ context }) {
    const [workspace] = context.workspaces
    if (workspace === undefined) {
      throw redirect({ to: '/workspaces/new' })
    }
    throw redirect({ to: '/workspaces/$workspaceId', params: { workspaceId: workspace.id } })
  },
})
