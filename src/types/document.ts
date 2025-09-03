export interface DocumentJSON {
  type: 'doc'
  content: Record<string, unknown>[]
}

export interface Document {
  id: string
  workspaceId: string
  name: string
  json: DocumentJSON
}
