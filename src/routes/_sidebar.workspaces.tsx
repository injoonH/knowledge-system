import { createFileRoute, redirect } from '@tanstack/react-router'
import { findAllWorkspaces } from '@/api/workspace.ts'

export const Route = createFileRoute('/_sidebar/workspaces')({
  beforeLoad() {
    const workspaces = findAllWorkspaces()
    if (workspaces.length === 0) {
      throw redirect({ to: '/workspaces/new' })
    }
    return { workspaces }
  },
})
