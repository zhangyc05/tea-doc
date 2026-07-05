import { ElUpload } from 'element-plus'
import { defineComponent, h } from 'vue'

export const AdminUpload = defineComponent({
  name: 'AdminUpload',
  inheritAttrs: false,
  props: {
    accept: {
      type: String,
      default: '',
    },
    drag: {
      type: Boolean,
      default: true,
    },
    multiple: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['select'],
  setup(props, { attrs, emit, slots }) {
    return () =>
      h(
        ElUpload,
        {
          ...attrs,
          accept: props.accept,
          autoUpload: false,
          class: ['admin-ui-upload', attrs.class],
          drag: props.drag,
          multiple: props.multiple,
          showFileList: false,
          onChange: (uploadFile: { raw?: File }) => {
            if (uploadFile.raw) emit('select', [uploadFile.raw])
          },
        },
        slots,
      )
  },
})

export default AdminUpload
