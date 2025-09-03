import { range } from 'es-toolkit'
import { SidebarMenu, SidebarMenuItem, SidebarMenuSkeleton } from '@/components/ui/sidebar.tsx'

interface Props {
  count?: number
}

export function SidebarSkeletonMenu({ count = 3 }: Props) {
  return (
    <SidebarMenu>
      {range(count).map((it) => (
        <SidebarMenuItem key={it}>
          <SidebarMenuSkeleton />
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}
