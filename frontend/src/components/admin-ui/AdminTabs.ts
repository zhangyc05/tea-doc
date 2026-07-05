import { ElTabPane, ElTabs } from 'element-plus'
import { defineComponent, h, type PropType } from 'vue'

type AdminTabValue = string | number

export const AdminTabs = defineComponent({
  name: 'AdminTabs',
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [String, Number] as PropType<AdminTabValue>,
      default: undefined,
    },
    type: {
      type: String as PropType<'' | 'card' | 'border-card'>,
      default: '',
    },
  },
  emits: ['update:modelValue', 'tab-change'],
  setup(props, { attrs, emit, slots }) {
    return () =>
      h(
        ElTabs,
        {
          ...attrs,
          modelValue: props.modelValue,
          type: props.type,
          class: ['admin-ui-tabs', attrs.class],
          'onUpdate:modelValue': (value: AdminTabValue) => emit('update:modelValue', value),
          onTabChange: (value: AdminTabValue) => emit('tab-change', value),
        },
        slots,
      )
  },
})

export const AdminTabPane = defineComponent({
  name: 'AdminTabPane',
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      required: true,
    },
    name: {
      type: [String, Number] as PropType<AdminTabValue>,
      required: true,
    },
  },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        ElTabPane,
        {
          ...attrs,
          label: props.label,
          name: props.name,
          class: ['admin-ui-tab-pane', attrs.class],
        },
        slots,
      )
  },
})

export default AdminTabs
