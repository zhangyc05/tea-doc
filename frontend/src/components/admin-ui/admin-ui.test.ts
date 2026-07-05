/* @vitest-environment jsdom */
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import {
  AdminDatePicker,
  AdminCheckboxGroup,
  AdminDialog,
  AdminDrawer,
  AdminInput,
  AdminPagination,
  AdminSelect,
  AdminTable,
  AdminTableColumn,
  AdminUpload,
} from '.'

describe('admin-ui Element Plus adapters', () => {
  it('renders the input adapter with the admin control class', () => {
    const wrapper = mount(AdminInput, {
      props: {
        modelValue: '教师姓名',
      },
    })

    expect(wrapper.findComponent({ name: 'ElInput' }).exists()).toBe(true)
    expect(wrapper.classes()).toContain('admin-ui-control')
  })

  it('renders select options from stable option data', () => {
    const wrapper = mount(AdminSelect, {
      props: {
        modelValue: 'all',
        options: [
          { label: '全部', value: 'all' },
          { label: '待处理', value: 'pending' },
        ],
      },
    })

    expect(wrapper.findComponent({ name: 'ElSelect' }).exists()).toBe(true)
    expect(wrapper.findAllComponents({ name: 'ElOption' })).toHaveLength(2)
  })

  it('keeps the date picker on a string value format by default', () => {
    const wrapper = mount(AdminDatePicker, {
      props: {
        modelValue: '2026-07-05',
      },
    })

    const picker = wrapper.findComponent({ name: 'ElDatePicker' })

    expect(picker.exists()).toBe(true)
    expect(picker.props('valueFormat')).toBe('YYYY-MM-DD')
  })

  it('uses the standard admin pagination layout', () => {
    const wrapper = mount(AdminPagination, {
      props: {
        currentPage: 1,
        pageSize: 10,
        total: 42,
      },
    })

    const pagination = wrapper.findComponent({ name: 'ElPagination' })

    expect(pagination.exists()).toBe(true)
    expect(pagination.props('layout')).toBe('total, prev, pager, next')
  })

  it('renders table columns from column metadata', () => {
    const wrapper = mount(AdminTable, {
      props: {
        data: [{ name: '张老师', status: '待处理' }],
        columns: [
          { prop: 'name', label: '教师' },
          { prop: 'status', label: '状态', align: 'center' },
        ],
      },
    })

    expect(wrapper.findComponent({ name: 'ElTable' }).exists()).toBe(true)
    expect(wrapper.findAllComponents({ name: 'ElTableColumn' })).toHaveLength(2)
  })

  it('allows custom table columns through local adapters', () => {
    const wrapper = mount({
      components: { AdminTable, AdminTableColumn },
      template: `
        <AdminTable :data="rows">
          <AdminTableColumn prop="name" label="教师" />
          <AdminTableColumn label="操作">
            <template #default="{ row }">
              <button type="button">{{ row.name }}</button>
            </template>
          </AdminTableColumn>
        </AdminTable>
      `,
      data() {
        return {
          rows: [{ name: '张老师' }],
        }
      },
    })

    expect(wrapper.findComponent({ name: 'ElTable' }).exists()).toBe(true)
    expect(wrapper.findAllComponents({ name: 'ElTableColumn' })).toHaveLength(2)
  })

  it('keeps dialog and drawer behind local semantic adapters', () => {
    const dialog = mount(AdminDialog, {
      props: {
        modelValue: true,
        title: '确认提交',
      },
    })
    const drawer = mount(AdminDrawer, {
      props: {
        modelValue: true,
        title: '编辑记录',
      },
    })

    expect(dialog.findComponent({ name: 'ElDialog' }).exists()).toBe(true)
    expect(drawer.findComponent({ name: 'ElDrawer' }).exists()).toBe(true)
  })

  it('renders checkbox groups from option data', () => {
    const wrapper = mount(AdminCheckboxGroup, {
      props: {
        modelValue: ['培训总结'],
        options: ['培训总结', '培训证书'],
      },
    })

    expect(wrapper.findComponent({ name: 'ElCheckboxGroup' }).exists()).toBe(true)
    expect(wrapper.findAllComponents({ name: 'ElCheckbox' })).toHaveLength(2)
  })

  it('renders uploads through Element Plus without automatic submission', () => {
    const wrapper = mount(AdminUpload, {
      props: {
        accept: '.xlsx,.pdf',
      },
    })

    const upload = wrapper.findComponent({ name: 'ElUpload' })

    expect(upload.exists()).toBe(true)
    expect(upload.props('autoUpload')).toBe(false)
    expect(upload.props('showFileList')).toBe(false)
  })
})
