import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from '@/app.tsx'

const elem = document.getElementById('root')
if (!elem) {
  throw new Error('Root element not found')
}
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

if (import.meta.hot) {
  // With hot module reloading, `import.meta.hot.data` is persisted.
  import.meta.hot.data.root ??= createRoot(elem)
  import.meta.hot.data.root.render(app)
} else {
  // The hot module reloading API is not available in production.
  createRoot(elem).render(app)
}
