interface BaseTreeItem {
  id: string
  name: string
}

export interface FileItem extends BaseTreeItem {
  type: 'file'
}

export interface DirectoryItem extends BaseTreeItem {
  type: 'directory'
  items: TreeItem[]
}

export type TreeItem = FileItem | DirectoryItem
