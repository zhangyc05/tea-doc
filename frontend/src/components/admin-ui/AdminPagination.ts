import { ElPagination } from 'element-plus'
import { defineComponent, h } from 'vue'

export const AdminPagination = defineComponent({
  name: 'AdminPagination',
  inheritAttrs: false,
  props: {
    currentPage: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    total: {
      type: Number,
      required: true,
    },
  },
  emits: ['update:currentPage', 'update:pageSize', 'change'],
  setup(props, { attrs, emit }) {
    return () =>
      h(ElPagination, {
        background: true,
        layout: 'total, prev, pager, next',
        ...attrs,
        currentPage: props.currentPage,
        pageSize: props.pageSize,
        total: props.total,
        class: ['admin-ui-pagination', attrs.class],
        'onUpdate:currentPage': (value: number) => emit('update:currentPage', value),
        'onUpdate:pageSize': (value: number) => emit('update:pageSize', value),
        onChange: (page: number, size: number) => emit('change', page, size),
      })
  },
})

export default AdminPagination
