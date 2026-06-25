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

export const Card = renderDiv('Card', 'rounded-xl border border-card-border bg-card text-text-primary shadow-card')
export const CardHeader = renderDiv('CardHeader', 'flex flex-col gap-1.5 p-6')
export const CardTitle = defineComponent({
  name: 'CardTitle',
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () => h('h3', { ...attrs, class: cn('text-lg font-semibold leading-none', attrs.class as string) }, slots.default?.())
  },
})
export const CardDescription = defineComponent({
  name: 'CardDescription',
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () => h('p', { ...attrs, class: cn('text-sm text-text-secondary', attrs.class as string) }, slots.default?.())
  },
})
export const CardContent = renderDiv('CardContent', 'p-6 pt-0')
export const CardFooter = renderDiv('CardFooter', 'flex items-center p-6 pt-0')

export default Card
