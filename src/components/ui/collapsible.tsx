import * as CollapsiblePrimitive from '@radix-ui/react-collapsible'
import type { ComponentPropsWithRef } from 'react'

function Collapsible(props: ComponentPropsWithRef<typeof CollapsiblePrimitive.Root>) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />
}

function CollapsibleTrigger(props: ComponentPropsWithRef<typeof CollapsiblePrimitive.CollapsibleTrigger>) {
  return <CollapsiblePrimitive.CollapsibleTrigger data-slot="collapsible-trigger" {...props} />
}

function CollapsibleContent(props: ComponentPropsWithRef<typeof CollapsiblePrimitive.CollapsibleContent>) {
  return <CollapsiblePrimitive.CollapsibleContent data-slot="collapsible-content" {...props} />
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
