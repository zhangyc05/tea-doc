import { defineComponent, h } from 'vue'

import { cn } from '@/lib/utils'

export const Popover = defineComponent({
  name: 'Popover',
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, class: cn('relative inline-block', attrs.class as string) }, slots.default?.())
  },
})

export const PopoverTrigger = defineComponent({
  name: 'PopoverTrigger',
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () => h('button', { ...attrs, type: 'button' }, slots.default?.())
  },
})

export const PopoverContent = defineComponent({
  name: 'PopoverContent',
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () =>
      h(
        'div',
        {
          ...attrs,
          class: cn('mt-2 w-72 rounded-xl border border-card-border bg-card p-4 text-text-primary shadow-floating', attrs.class as string),
        },
        slots.default?.(),
      )
  },
})

export default Popover
