import { ElOption, ElSelect } from 'element-plus'
import { defineComponent, h, type PropType } from 'vue'

import type { AdminSelectOption } from './types'

export const AdminSelect = defineComponent({
  name: 'AdminSelect',
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [String, Number, Array] as PropType<string | number | Array<string | number>>,
      default: undefined,
    },
    options: {
      type: Array as PropType<AdminSelectOption[]>,
      default: () => [],
    },
    placeholder: {
      type: String,
      default: '请选择',
    },
    clearable: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { attrs, emit, slots }) {
    return () =>
      h(
        ElSelect,
        {
          ...attrs,
          modelValue: props.modelValue,
          placeholder: props.placeholder,
          clearable: props.clearable,
          class: ['admin-ui-control', attrs.class],
          'onUpdate:modelValue': (value: string | number | Array<string | number>) => emit('update:modelValue', value),
          onChange: (value: string | number | Array<string | number>) => emit('change', value),
        },
        slots.default ??
          (() =>
            props.options.map((option) =>
              h(ElOption, {
                key: option.value,
                label: option.label,
                value: option.value,
                disabled: option.disabled,
              }),
            )),
      )
  },
})

export default AdminSelect
