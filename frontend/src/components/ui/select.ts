import { defineComponent, h } from 'vue'

import { cn } from '@/lib/utils'

export const Select = defineComponent({
  name: 'Select',
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [String, Number],
      default: undefined,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { attrs, emit, slots }) {
    return () =>
      h(
        'select',
        {
          ...attrs,
          value: props.modelValue,
          class: cn(
            'flex h-10 w-full rounded-md border border-card-border bg-card px-3 py-2 text-sm text-text-primary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50',
            attrs.class as string,
          ),
          onInput: (event: Event) => emit('update:modelValue', (event.target as HTMLSelectElement).value),
          onChange: (event: Event) => emit('update:modelValue', (event.target as HTMLSelectElement).value),
        },
        slots.default?.(),
      )
  },
})

export const SelectItem = defineComponent({
  name: 'SelectItem',
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () => h('option', attrs, slots.default?.())
  },
})

export const SelectGroup = defineComponent({
  name: 'SelectGroup',
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () => h('optgroup', attrs, slots.default?.())
  },
})

export default Select
