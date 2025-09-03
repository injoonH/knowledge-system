interface BaseTreeItem {
  id: string
  name: string
}

interface FileItem extends BaseTreeItem {
  type: 'file'
}

interface DirectoryItem extends BaseTreeItem {
  type: 'directory'
  items: TreeItem[]
}

export type TreeItem = FileItem | DirectoryItem
