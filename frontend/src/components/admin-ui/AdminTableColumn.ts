import { ElTableColumn } from 'element-plus'
import { defineComponent, h } from 'vue'

export const AdminTableColumn = defineComponent({
  name: 'AdminTableColumn',
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () =>
      h(
        ElTableColumn,
        {
          ...attrs,
        },
        slots,
      )
  },
})

export default AdminTableColumn
