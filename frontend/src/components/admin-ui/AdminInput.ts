import { ElInput } from 'element-plus'
import { defineComponent, h } from 'vue'

export const AdminInput = defineComponent({
  name: 'AdminInput',
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () =>
      h(
        ElInput,
        {
          clearable: true,
          ...attrs,
          class: ['admin-ui-control', attrs.class],
        },
        slots,
      )
  },
})

export default AdminInput
