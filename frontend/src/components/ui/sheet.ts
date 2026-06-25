import { defineComponent, h, type PropType } from 'vue'

import { cn } from '@/lib/utils'

export const Sheet = defineComponent({
  name: 'Sheet',
  setup(_, { slots }) {
    return () => slots.default?.()
  },
})

export const SheetTrigger = defineComponent({
  name: 'SheetTrigger',
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () => h('button', { ...attrs, type: 'button' }, slots.default?.())
  },
})

export const SheetContent = defineComponent({
  name: 'SheetContent',
  inheritAttrs: false,
  props: {
    open: {
      type: Boolean,
      default: true,
    },
    side: {
      type: String as PropType<'right' | 'left' | 'top' | 'bottom'>,
      default: 'right',
    },
  },
  setup(props, { attrs, slots }) {
    const sideClass = () => {
      if (props.side === 'left') return 'left-0 top-0 h-full w-[420px] max-w-[92vw]'
      if (props.side === 'top') return 'left-0 top-0 w-full'
      if (props.side === 'bottom') return 'bottom-0 left-0 w-full'
      return 'right-0 top-0 h-full w-[420px] max-w-[92vw]'
    }

    return () =>
      props.open
        ? h('div', { class: 'fixed inset-0 z-50 bg-black/20' }, [
            h(
              'aside',
              {
                ...attrs,
                class: cn('fixed bg-card p-6 text-text-primary shadow-floating', sideClass(), attrs.class as string),
              },
              slots.default?.(),
            ),
          ])
        : null
  },
})

export const SheetHeader = defineComponent({
  name: 'SheetHeader',
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, class: cn('mb-4 flex flex-col gap-1.5', attrs.class as string) }, slots.default?.())
  },
})

export const SheetTitle = defineComponent({
  name: 'SheetTitle',
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () => h('h2', { ...attrs, class: cn('text-lg font-semibold', attrs.class as string) }, slots.default?.())
  },
})

export const SheetDescription = defineComponent({
  name: 'SheetDescription',
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () => h('p', { ...attrs, class: cn('text-sm text-text-secondary', attrs.class as string) }, slots.default?.())
  },
})

export const SheetFooter = defineComponent({
  name: 'SheetFooter',
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, class: cn('mt-6 flex justify-end gap-2', attrs.class as string) }, slots.default?.())
  },
})

export default Sheet
