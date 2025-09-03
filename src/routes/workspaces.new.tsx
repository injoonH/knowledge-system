import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { createWorkspace } from '@/api/workspace.ts'
import { Button } from '@/components/ui/button.tsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.tsx'
import { Input } from '@/components/ui/input.tsx'

export const Route = createFileRoute('/workspaces/new')({
  component: WorkspaceCreationPage,
})

function WorkspaceCreationPage() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>What’s the name of your company or team?</CardTitle>
              <CardDescription>
                This will be the name of your workspace — choose something that your team will recognize.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                action={async (data) => {
                  const name = data.get('name') as string
                  const workspaceId = createWorkspace({ name })
                  await navigate({ to: '/workspaces/$workspaceId', params: { workspaceId } })
                }}
              >
                <div className="space-y-6">
                  <Input name="name" type="text" placeholder="E.g., Acme Marketing or Acme Co" required />
                  <Button type="submit" className="w-full">
                    Create
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
