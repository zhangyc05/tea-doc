import { defineComponent, h } from 'vue'

import { cn } from '@/lib/utils'

export const Tooltip = defineComponent({
  name: 'Tooltip',
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () => h('span', { ...attrs, class: cn('inline-flex flex-col gap-1', attrs.class as string) }, slots.default?.())
  },
})

export const TooltipTrigger = defineComponent({
  name: 'TooltipTrigger',
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () => h('span', attrs, slots.default?.())
  },
})

export const TooltipContent = defineComponent({
  name: 'TooltipContent',
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () =>
      h(
        'span',
        {
          ...attrs,
          class: cn('w-max rounded-md bg-text-primary px-2 py-1 text-xs text-white shadow-card', attrs.class as string),
        },
        slots.default?.(),
      )
  },
})

export default Tooltip
