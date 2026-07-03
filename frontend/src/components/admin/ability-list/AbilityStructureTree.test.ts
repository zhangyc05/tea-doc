/* @vitest-environment jsdom */
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import AbilityStructureTree from './AbilityStructureTree.vue'
import type { AbilityTreeNode } from './types'

const nodes: AbilityTreeNode[] = [
  {
    key: 'basic',
    label: '基本能力',
    icon: '/basic.svg',
    children: [
      { key: 'basic-ethics', label: '师德师风' },
      { key: 'basic-duty', label: '岗位履职' },
    ],
  },
  {
    key: 'teaching',
    label: '教学能力',
    icon: '/teaching.svg',
    children: [
      { key: 'teaching-implementation', label: '教学实施' },
    ],
  },
]

describe('AbilityStructureTree', () => {
  it('selects the first child when a parent ability group is clicked', async () => {
    const wrapper = mount(AbilityStructureTree, {
      props: {
        nodes,
        selectedKey: 'teaching-implementation',
        defaultExpandedKeys: ['teaching'],
      },
    })

    await wrapper.findAll('button.ability-parent')[0].trigger('click')

    expect(wrapper.emitted('select')?.[0]).toEqual(['basic-ethics'])
    expect(wrapper.text()).toContain('师德师风')
  })

  it('toggles an expanded parent group from the whole parent row', async () => {
    const wrapper = mount(AbilityStructureTree, {
      props: {
        nodes,
        selectedKey: 'basic-ethics',
        defaultExpandedKeys: ['basic'],
      },
    })

    await wrapper.findAll('button.ability-parent')[0].trigger('click')

    expect(wrapper.emitted('toggle')?.[0]).toEqual(['basic', false])
    expect(wrapper.text()).not.toContain('师德师风')
  })

  it('expands the clicked parent group and collapses the previously expanded group', async () => {
    const wrapper = mount(AbilityStructureTree, {
      props: {
        nodes,
        selectedKey: 'basic-ethics',
        defaultExpandedKeys: ['basic'],
      },
    })

    await wrapper.findAll('button.ability-parent')[1].trigger('click')

    expect(wrapper.emitted('toggle')?.[0]).toEqual(['basic', false])
    expect(wrapper.emitted('toggle')?.[1]).toEqual(['teaching', true])
    expect(wrapper.emitted('select')?.[0]).toEqual(['teaching-implementation'])
    expect(wrapper.text()).not.toContain('师德师风')
    expect(wrapper.text()).toContain('教学实施')
  })

  it('keeps the clicked parent expanded after the parent page updates the selected key', async () => {
    const wrapper = mount(AbilityStructureTree, {
      props: {
        nodes,
        selectedKey: 'basic-ethics',
        defaultExpandedKeys: ['basic'],
      },
    })

    await wrapper.findAll('button.ability-parent')[1].trigger('click')
    await wrapper.setProps({
      selectedKey: 'teaching-implementation',
      defaultExpandedKeys: ['basic'],
    })

    expect(wrapper.text()).not.toContain('师德师风')
    expect(wrapper.text()).toContain('教学实施')
  })
})
