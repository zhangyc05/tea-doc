/* @vitest-environment jsdom */
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import CompactFilterBar from './CompactFilterBar.vue'

describe('CompactFilterBar', () => {
  it('renders filter fields, search, actions and message slots', () => {
    const wrapper = mount(CompactFilterBar, {
      slots: {
        fields: '<select class="test-field"><option>全部</option></select>',
        search: '<input class="test-search" placeholder="搜索教师、需求关键词" />',
        actions: '<button class="test-action">查询</button>',
        message: '<span class="test-message">已筛选出 3 条需求。</span>',
      },
    })

    expect(wrapper.find('.test-field').exists()).toBe(true)
    expect(wrapper.find('.test-search').attributes('placeholder')).toBe('搜索教师、需求关键词')
    expect(wrapper.find('.test-action').text()).toBe('查询')
    expect(wrapper.find('.test-message').text()).toBe('已筛选出 3 条需求。')
  })
})
