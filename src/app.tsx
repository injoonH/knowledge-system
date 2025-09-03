import '@/styles/index.css'

import { createRouter, RouterProvider } from '@tanstack/react-router'
import { OverlayProvider } from 'overlay-kit'
import { Toaster } from '@/components/ui/sonner.tsx'
import { routeTree } from '@/routeTree.gen'

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export function App() {
  return (
    <OverlayProvider>
      <RouterProvider router={router} />
      <Toaster />
    </OverlayProvider>
  )
}
