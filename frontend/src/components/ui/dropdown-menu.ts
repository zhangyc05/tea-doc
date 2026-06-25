import { defineComponent, h } from 'vue'

import { cn } from '@/lib/utils'

export const DropdownMenu = defineComponent({
  name: 'DropdownMenu',
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, class: cn('relative inline-block', attrs.class as string) }, slots.default?.())
  },
})

export const DropdownMenuTrigger = defineComponent({
  name: 'DropdownMenuTrigger',
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () => h('button', { ...attrs, type: 'button' }, slots.default?.())
  },
})

export const DropdownMenuContent = defineComponent({
  name: 'DropdownMenuContent',
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () =>
      h(
        'div',
        {
          ...attrs,
          class: cn('absolute right-0 z-40 mt-2 min-w-40 rounded-lg border border-card-border bg-card p-1 text-sm text-text-primary shadow-floating', attrs.class as string),
        },
        slots.default?.(),
      )
  },
})

export const DropdownMenuItem = defineComponent({
  name: 'DropdownMenuItem',
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () =>
      h(
        'button',
        {
          ...attrs,
          type: 'button',
          class: cn('flex w-full items-center rounded-md px-3 py-2 text-left text-sm hover:bg-primary-soft', attrs.class as string),
        },
        slots.default?.(),
      )
  },
})

export const DropdownMenuLabel = defineComponent({
  name: 'DropdownMenuLabel',
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, class: cn('px-3 py-2 text-xs font-medium text-text-tertiary', attrs.class as string) }, slots.default?.())
  },
})

export const DropdownMenuSeparator = defineComponent({
  name: 'DropdownMenuSeparator',
  inheritAttrs: false,
  setup(_, { attrs }) {
    return () => h('div', { ...attrs, class: cn('my-1 h-px bg-divider', attrs.class as string) })
  },
})

export default DropdownMenu
