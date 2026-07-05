import { ElTable, ElTableColumn } from 'element-plus'
import { defineComponent, h, type PropType } from 'vue'

import type { AdminTableColumnConfig } from './types'

export const AdminTable = defineComponent({
  name: 'AdminTable',
  inheritAttrs: false,
  props: {
    data: {
      type: Array as PropType<Record<string, unknown>[]>,
      default: () => [],
    },
    columns: {
      type: Array as PropType<AdminTableColumnConfig[]>,
      default: () => [],
    },
    emptyText: {
      type: String,
      default: '暂无数据',
    },
  },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        ElTable,
        {
          border: false,
          stripe: false,
          ...attrs,
          data: props.data,
          emptyText: props.emptyText,
          class: ['admin-ui-table', attrs.class],
        },
        slots.default ??
          (() =>
            props.columns.map((column) =>
              h(ElTableColumn, {
                key: column.prop,
                prop: column.prop,
                label: column.label,
                width: column.width,
                minWidth: column.minWidth,
                align: column.align,
                fixed: column.fixed,
              }),
            )),
      )
  },
})

export default AdminTable
