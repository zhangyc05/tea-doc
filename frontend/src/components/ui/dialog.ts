import { defineComponent, h } from 'vue'

import { cn } from '@/lib/utils'

export const Dialog = defineComponent({
  name: 'Dialog',
  setup(_, { slots }) {
    return () => slots.default?.()
  },
})

export const DialogTrigger = defineComponent({
  name: 'DialogTrigger',
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () => h('button', { ...attrs, type: 'button' }, slots.default?.())
  },
})

export const DialogContent = defineComponent({
  name: 'DialogContent',
  inheritAttrs: false,
  props: {
    open: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { attrs, slots }) {
    return () =>
      props.open
        ? h('div', { class: 'fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4' }, [
            h(
              'div',
              {
                ...attrs,
                class: cn('w-full max-w-lg rounded-xl border border-card-border bg-card p-6 text-text-primary shadow-floating', attrs.class as string),
              },
              slots.default?.(),
            ),
          ])
        : null
  },
})

export const DialogHeader = defineComponent({
  name: 'DialogHeader',
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, class: cn('mb-4 flex flex-col gap-1.5', attrs.class as string) }, slots.default?.())
  },
})

export const DialogTitle = defineComponent({
  name: 'DialogTitle',
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () => h('h2', { ...attrs, class: cn('text-lg font-semibold', attrs.class as string) }, slots.default?.())
  },
})

export const DialogDescription = defineComponent({
  name: 'DialogDescription',
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () => h('p', { ...attrs, class: cn('text-sm text-text-secondary', attrs.class as string) }, slots.default?.())
  },
})

export const DialogFooter = defineComponent({
  name: 'DialogFooter',
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, class: cn('mt-6 flex justify-end gap-2', attrs.class as string) }, slots.default?.())
  },
})

export default Dialog
