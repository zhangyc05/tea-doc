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

export const Table = defineComponent({
  name: 'Table',
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () =>
      h('div', { class: 'relative w-full overflow-auto' }, [
        h('table', { ...attrs, class: cn('w-full caption-bottom border-separate border-spacing-0 text-sm', attrs.class as string) }, slots.default?.()),
      ])
  },
})

export const TableHeader = renderElement('TableHeader', 'thead', 'bg-page-soft [&_tr]:border-b')
export const TableBody = renderElement('TableBody', 'tbody', '[&_tr:last-child]:border-0')
export const TableFooter = renderElement('TableFooter', 'tfoot', 'border-t bg-page-soft font-medium')
export const TableRow = renderElement('TableRow', 'tr', 'border-b border-card-border transition-colors hover:bg-page-soft/80')
export const TableHead = renderElement(
  'TableHead',
  'th',
  'h-11 px-4 text-left align-middle text-xs font-semibold text-text-secondary first:rounded-l-lg last:rounded-r-lg',
)
export const TableCell = renderElement('TableCell', 'td', 'border-b border-card-border px-4 py-3.5 align-middle text-text-primary')
export const TableCaption = renderElement('TableCaption', 'caption', 'mt-4 text-sm text-text-tertiary')

export default Table
