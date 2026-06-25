import { defineComponent, h } from 'vue'

import { cn } from '@/lib/utils'

export const Input = defineComponent({
  name: 'Input',
  inheritAttrs: false,
  setup(_, { attrs }) {
    return () =>
      h('input', {
        ...attrs,
        class: cn(
          'flex h-10 w-full rounded-md border border-card-border bg-card px-3 py-2 text-sm text-text-primary transition-colors placeholder:text-text-tertiary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50',
          attrs.class as string,
        ),
      })
  },
})

export default Input
