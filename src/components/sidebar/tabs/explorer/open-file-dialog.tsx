import { overlay } from 'overlay-kit'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog.tsx'
import { Input } from '@/components/ui/input.tsx'
import type { Result } from '@/types/result.ts'

interface OpenFileDialogOptions<T> {
  title: string
  onSubmit(name: string): T
  onSuccess(result: T): void
  defaultValue?: string
}

export async function openFileDialog<T>({ title, onSubmit, onSuccess, defaultValue }: OpenFileDialogOptions<T>) {
  const result = await overlay.openAsync<Result<T>>(({ isOpen, close }) => (
    <Dialog open={isOpen} onOpenChange={() => close({ ok: false })}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <form
          action={(data) => {
            const name = data.get('name') as string
            const result = onSubmit(name)
            close({ ok: true, data: result })
          }}
        >
          <Input name="name" type="text" placeholder="Name" defaultValue={defaultValue} required />
        </form>
      </DialogContent>
    </Dialog>
  ))

  if (!result.ok) return

  onSuccess(result.data)
}
