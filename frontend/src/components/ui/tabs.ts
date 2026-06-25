import { defineComponent, h } from 'vue'

import { cn } from '@/lib/utils'

function renderDiv(name: string, baseClass: string) {
  return defineComponent({
    name,
    inheritAttrs: false,
    setup(_, { attrs, slots }) {
      return () => h('div', { ...attrs, class: cn(baseClass, attrs.class as string) }, slots.default?.())
    },
  })
}

export const Tabs = renderDiv('Tabs', 'w-full')
export const TabsList = renderDiv('TabsList', 'inline-flex h-10 items-center justify-center rounded-lg bg-page-soft p-1 text-text-secondary')
export const TabsTrigger = defineComponent({
  name: 'TabsTrigger',
  inheritAttrs: false,
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        'button',
        {
          ...attrs,
          type: 'button',
          class: cn(
            'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
            props.active ? 'bg-card text-text-primary shadow-card' : 'text-text-secondary hover:text-text-primary',
            attrs.class as string,
          ),
        },
        slots.default?.(),
      )
  },
})
export const TabsContent = renderDiv('TabsContent', 'mt-4')

export default Tabs
