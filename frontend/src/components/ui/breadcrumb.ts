import { defineComponent, h } from 'vue'

import { cn } from '@/lib/utils'

function renderElement(name: string, tag: string, baseClass: string) {
  return defineComponent({
    name,
    inheritAttrs: false,
    setup(_, { attrs, slots }) {
      return () => h(tag, { ...attrs, class: cn(baseClass, attrs.class as string) }, slots.default?.())
    },
  })
}

export const Breadcrumb = renderElement('Breadcrumb', 'nav', '')
export const BreadcrumbList = renderElement('BreadcrumbList', 'ol', 'flex flex-wrap items-center gap-1.5 text-sm text-text-secondary')
export const BreadcrumbItem = renderElement('BreadcrumbItem', 'li', 'inline-flex items-center gap-1.5')
export const BreadcrumbLink = renderElement('BreadcrumbLink', 'a', 'transition-colors hover:text-primary')
export const BreadcrumbPage = renderElement('BreadcrumbPage', 'span', 'font-medium text-text-primary')
export const BreadcrumbSeparator = defineComponent({
  name: 'BreadcrumbSeparator',
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () => h('li', { ...attrs, class: cn('text-text-tertiary', attrs.class as string) }, slots.default?.() ?? '/')
  },
})

export default Breadcrumb
