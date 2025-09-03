import { createTypedLocalStorage } from '@toss/storage/typed'
import { randomId } from '@/lib/utils.ts'
import type { Document, DocumentJSON } from '@/types/document.ts'

const storage = createTypedLocalStorage<Record<string, Document>>('document')

function _getDocuments() {
  return storage.get() ?? {}
}

export function findDocument(id: string): Document | null {
  const documents = _getDocuments()
  return documents[id] ?? null
}

export function findAllDocumentsOfWorkspace(workspaceId: string): Document[] {
  const documents = _getDocuments()
  return Object.values(documents).filter((it) => it.workspaceId === workspaceId)
}

interface CreateDocumentCommand {
  workspaceId: string
  name: string
}

export function createDocument(command: CreateDocumentCommand) {
  const id = randomId()
  const document: Document = {
    id,
    workspaceId: command.workspaceId,
    name: command.name,
    json: {
      type: 'doc',
      content: [],
    },
  }

  const documents = _getDocuments()
  storage.set({ ...documents, [id]: document })

  return id
}

interface UpdateDocumentCommand {
  id: string
  json: DocumentJSON
}

export function updateDocument(command: UpdateDocumentCommand) {
  const documents = _getDocuments()

  const document = documents[command.id]
  if (document === undefined) throw new Error('Document not found')

  const updatedDocument = { ...document, json: command.json }
  storage.set({ ...documents, [command.id]: updatedDocument })
}

export function deleteDocument(id: string) {
  const documents = _getDocuments()

  if (documents[id] === undefined) throw new Error('Document not found')

  delete documents[id]
  storage.set(documents)
}
