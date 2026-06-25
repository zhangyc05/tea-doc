import { defineComponent, h, type PropType } from 'vue'

import { cn } from '@/lib/utils'

export const Separator = defineComponent({
  name: 'Separator',
  inheritAttrs: false,
  props: {
    orientation: {
      type: String as PropType<'horizontal' | 'vertical'>,
      default: 'horizontal',
    },
  },
  setup(props, { attrs }) {
    return () =>
      h('div', {
        ...attrs,
        role: 'separator',
        'aria-orientation': props.orientation,
        class: cn(
          props.orientation === 'vertical' ? 'h-full w-px bg-divider' : 'h-px w-full bg-divider',
          attrs.class as string,
        ),
      })
  },
})

export default Separator
