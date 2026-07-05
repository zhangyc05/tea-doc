import { ElTree } from 'element-plus'
import { defineComponent, h, type PropType } from 'vue'

export const AdminTree = defineComponent({
  name: 'AdminTree',
  inheritAttrs: false,
  props: {
    data: {
      type: Array as PropType<Record<string, unknown>[]>,
      default: () => [],
    },
    nodeKey: {
      type: String,
      default: 'key',
    },
    defaultExpandedKeys: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    currentNodeKey: {
      type: String,
      default: '',
    },
  },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        ElTree,
        {
          highlightCurrent: true,
          expandOnClickNode: true,
          ...attrs,
          data: props.data,
          nodeKey: props.nodeKey,
          defaultExpandedKeys: props.defaultExpandedKeys,
          currentNodeKey: props.currentNodeKey,
          class: ['admin-ui-tree', attrs.class],
        },
        slots,
      )
  },
})

export default AdminTree
