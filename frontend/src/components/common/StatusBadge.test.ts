/* @vitest-environment jsdom */
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import StatusBadge from './StatusBadge.vue'
import { adminStatusRegistry, getStatusBadgeMeta } from './status-badge'

describe('StatusBadge', () => {
  it('keeps new admin workflow statuses in a shared registry', () => {
    for (const status of ['导出中', '处理中', '失败', '同步失败', '重新同步中', '归档', '停用', '待沉淀', '已生成待确认档案']) {
      expect(adminStatusRegistry[status]).toBeTruthy()
    }

    expect(getStatusBadgeMeta('导出中')).toMatchObject({ label: '导出中', tone: 'info' })
    expect(getStatusBadgeMeta('同步失败')).toMatchObject({ label: '同步失败', tone: 'danger' })
  })

  it('renders registered status label and tone through the badge component', () => {
    const wrapper = mount(StatusBadge, {
      props: {
        status: '重新同步中',
      },
    })

    expect(wrapper.text()).toContain('重新同步中')
    expect(wrapper.html()).toContain('bg-info-bg')
  })
})
