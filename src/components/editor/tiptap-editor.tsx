import type { Editor } from '@tiptap/core'
import { EditorContent } from '@tiptap/react'

interface Props {
  editor: Editor
}

export function TiptapEditor({ editor }: Props) {
  return <EditorContent editor={editor} className="text-secondary-foreground" />
}
