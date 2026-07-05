import { ElDrawer } from 'element-plus'
import { defineComponent, h } from 'vue'

export const AdminDrawer = defineComponent({
  name: 'AdminDrawer',
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
    size: {
      type: String,
      default: '520px',
    },
  },
  emits: ['update:modelValue', 'close'],
  setup(props, { attrs, emit, slots }) {
    return () =>
      h(
        ElDrawer,
        {
          ...attrs,
          modelValue: props.modelValue,
          title: props.title,
          size: props.size,
          class: ['admin-ui-drawer', attrs.class],
          'onUpdate:modelValue': (value: boolean) => emit('update:modelValue', value),
          onClose: () => emit('close'),
        },
        slots,
      )
  },
})

export default AdminDrawer
