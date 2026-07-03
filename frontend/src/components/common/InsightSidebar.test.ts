/* @vitest-environment jsdom */
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import InsightSidebar from './InsightSidebar.vue'

describe('InsightSidebar', () => {
  it('renders the title and named sidebar regions', () => {
    const wrapper = mount(InsightSidebar, {
      props: {
        title: '资源匹配建议',
      },
      slots: {
        items: '<div class="test-item">画像观察需求集中</div>',
        selected: '<div class="test-selected">当前查看需求</div>',
        action: '<button class="test-action">查看待匹配需求</button>',
      },
    })

    expect(wrapper.find('h3').text()).toBe('资源匹配建议')
    expect(wrapper.find('.test-item').text()).toBe('画像观察需求集中')
    expect(wrapper.find('.test-selected').text()).toBe('当前查看需求')
    expect(wrapper.find('.test-action').text()).toBe('查看待匹配需求')
  })
})
