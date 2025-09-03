export interface Workspace {
  id: string
  name: string
  logo: string
}

export type WorkspaceListItem = Pick<Workspace, 'id' | 'name' | 'logo'>
