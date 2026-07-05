import { ElDialog } from 'element-plus'
import { defineComponent, h } from 'vue'

export const AdminDialog = defineComponent({
  name: 'AdminDialog',
  inheritAttrs: false,
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      required: true,
    },
    width: {
      type: String,
      default: '520px',
    },
  },
  emits: ['update:modelValue', 'close'],
  setup(props, { attrs, emit, slots }) {
    return () =>
      h(
        ElDialog,
        {
          ...attrs,
          modelValue: props.modelValue,
          title: props.title,
          width: props.width,
          class: ['admin-ui-dialog', attrs.class],
          'onUpdate:modelValue': (value: boolean) => emit('update:modelValue', value),
          onClose: () => emit('close'),
        },
        slots,
      )
  },
})

export default AdminDialog
