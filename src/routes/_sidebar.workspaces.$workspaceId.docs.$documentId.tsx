import { createFileRoute, notFound } from '@tanstack/react-router'
import { Placeholder } from '@tiptap/extensions'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useCallback, useEffect } from 'react'
import { toast } from 'sonner'
import { findDocument, updateDocumentJSON } from '@/api/document.ts'
import { TiptapEditor } from '@/components/editor/tiptap-editor.tsx'

export const Route = createFileRoute('/_sidebar/workspaces/$workspaceId/docs/$documentId')({
  component: DocumentPage,
  loader({ params }) {
    const documentId = params.documentId

    const document = findDocument(documentId)
    if (document === null) throw notFound()

    return { document }
  },
})

function DocumentPage() {
  const document = Route.useLoaderData({ select: (data) => data.document })

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Start typing...',
      }),
    ],
    content: document.json,
  })

  const saveDocument = useCallback(() => {
    updateDocumentJSON({
      id: document.id,
      json: editor.getJSON(),
    })
    toast.success('Document saved successfully.', {
      position: 'bottom-center',
      richColors: true,
    })
  }, [document.id, editor.getJSON])

  useEffect(() => {
    editor.commands.setContent(document.json)
  }, [editor.commands.setContent, document.json])

  useEffect(() => {
    function handleSave(event: KeyboardEvent) {
      if (event.key === 's' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        saveDocument()
      }
    }
    window.addEventListener('keydown', handleSave)
    return () => {
      window.removeEventListener('keydown', handleSave)
    }
  }, [saveDocument])

  return (
    <div className="w-full">
      <TiptapEditor editor={editor} />
    </div>
  )
}
