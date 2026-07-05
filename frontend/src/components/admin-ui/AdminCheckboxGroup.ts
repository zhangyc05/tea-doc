import { ElCheckbox, ElCheckboxGroup } from 'element-plus'
import { defineComponent, h, type PropType } from 'vue'

export const AdminCheckboxGroup = defineComponent({
  name: 'AdminCheckboxGroup',
  inheritAttrs: false,
  props: {
    modelValue: {
      type: Array as PropType<Array<string | number>>,
      default: () => [],
    },
    options: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { attrs, emit, slots }) {
    return () =>
      h(
        ElCheckboxGroup,
        {
          ...attrs,
          modelValue: props.modelValue,
          class: ['admin-ui-checkbox-group', attrs.class],
          'onUpdate:modelValue': (value: unknown[]) => emit('update:modelValue', value),
          onChange: (value: unknown[]) => emit('change', value),
        },
        slots.default ??
          (() =>
            props.options.map((option) =>
              h(
                ElCheckbox,
                {
                  key: option,
                  value: option,
                  label: option,
                },
                () => option,
              ),
            )),
      )
  },
})

export default AdminCheckboxGroup
