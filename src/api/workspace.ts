import { createTypedLocalStorage } from '@toss/storage/typed'
import { findAllDocumentsOfWorkspace } from '@/api/document.ts'
import { randomAvatarURL, randomId } from '@/lib/utils.ts'
import type { TreeItem } from '@/types/tree.ts'
import type { Workspace, WorkspaceListItem } from '@/types/workspace.ts'

const storage = createTypedLocalStorage<Record<string, Workspace>>('workspace')

function _getWorkspaces() {
  return storage.get() ?? {}
}

export function findAllWorkspaces(): WorkspaceListItem[] {
  const workspaces = _getWorkspaces()
  return Object.values(workspaces)
}

export function findWorkspace(id: string): Workspace | null {
  const workspaces = _getWorkspaces()
  return workspaces[id] ?? null
}

interface CreateWorkspaceCommand {
  name: string
}

export function createWorkspace(command: CreateWorkspaceCommand) {
  const id = randomId()
  const logo = randomAvatarURL()

  const workspace: Workspace = {
    id,
    name: command.name,
    logo,
  }

  const workspaces = _getWorkspaces()
  storage.set({ ...workspaces, [id]: workspace })

  return id
}

export function getWorkspaceExplorerTree(id: string): TreeItem[] {
  const documents = findAllDocumentsOfWorkspace(id)
  return documents.map((it) => ({
    id: it.id,
    name: it.name,
    type: 'file',
  }))
}
