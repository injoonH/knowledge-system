import { createFileRoute } from '@tanstack/react-router'
import logo from '@/assets/images/logo.svg'

export const Route = createFileRoute('/_sidebar/workspaces/$workspaceId/')({
  component: WorkspaceIndexPage,
})

function WorkspaceIndexPage() {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <img alt="Logo" src={logo} className="mb-4 opacity-25 grayscale-100" />
      <p className="text-neutral-500">Select a document from the explorer.</p>
    </div>
  )
}
