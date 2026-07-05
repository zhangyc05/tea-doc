import { ElDatePicker } from 'element-plus'
import { defineComponent, h, type PropType } from 'vue'

type AdminDateValue = string | string[] | Date | Date[] | undefined

export const AdminDatePicker = defineComponent({
  name: 'AdminDatePicker',
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [String, Array, Date] as PropType<AdminDateValue>,
      default: undefined,
    },
    type: {
      type: String,
      default: 'date',
    },
    valueFormat: {
      type: String,
      default: 'YYYY-MM-DD',
    },
    placeholder: {
      type: String,
      default: '请选择日期',
    },
    rangeSeparator: {
      type: String,
      default: '至',
    },
    startPlaceholder: {
      type: String,
      default: '开始日期',
    },
    endPlaceholder: {
      type: String,
      default: '结束日期',
    },
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { attrs, emit, slots }) {
    return () =>
      h(
        ElDatePicker as never,
        {
          ...attrs,
          modelValue: props.modelValue,
          type: props.type,
          valueFormat: props.valueFormat,
          placeholder: props.placeholder,
          rangeSeparator: props.rangeSeparator,
          startPlaceholder: props.startPlaceholder,
          endPlaceholder: props.endPlaceholder,
          class: ['admin-ui-control', attrs.class],
          'onUpdate:modelValue': (value: AdminDateValue) => emit('update:modelValue', value),
          onChange: (value: AdminDateValue) => emit('change', value),
        },
        slots,
      )
  },
})

export default AdminDatePicker
