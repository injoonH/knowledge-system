import { match } from 'ts-pattern'
import { DirectoryEntry } from '@/components/sidebar/tabs/explorer/directory-entry.tsx'
import { FileEntry } from '@/components/sidebar/tabs/explorer/file-entry.tsx'
import type { TreeItem } from '@/types/tree.ts'

type Props = {
  item: TreeItem
}

export function Tree({ item }: Props) {
  return match(item)
    .with({ type: 'file' }, (it) => <FileEntry item={it} />)
    .with({ type: 'directory' }, (it) => <DirectoryEntry item={it} />)
    .exhaustive()
}
