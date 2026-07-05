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

function findTreeNode(wrapper: ReturnType<typeof mount>, label: string) {
  return wrapper.findAll('.el-tree-node__content').find(node => node.text().includes(label))
}

describe('AbilityStructureTree', () => {
  it('selects the first child when a parent ability group is clicked', async () => {
    const wrapper = mount(AbilityStructureTree, {
      props: {
        nodes,
        selectedKey: 'teaching-implementation',
        defaultExpandedKeys: ['teaching'],
      },
    })

    await findTreeNode(wrapper, '基本能力')?.trigger('click')

    expect(wrapper.emitted('select')?.[0]).toEqual(['basic-ethics'])
    expect(wrapper.text()).toContain('师德师风')
  })

  it('emits a parent toggle when the whole parent row is clicked', async () => {
    const wrapper = mount(AbilityStructureTree, {
      props: {
        nodes,
        selectedKey: 'basic-ethics',
        defaultExpandedKeys: ['basic'],
      },
    })

    await findTreeNode(wrapper, '基本能力')?.trigger('click')

    expect(wrapper.emitted('toggle')?.[0]).toEqual(['basic', true])
    expect(wrapper.emitted('select')?.[0]).toEqual(['basic-ethics'])
  })

  it('selects the clicked parent group first child after another group was expanded', async () => {
    const wrapper = mount(AbilityStructureTree, {
      props: {
        nodes,
        selectedKey: 'basic-ethics',
        defaultExpandedKeys: ['basic'],
      },
    })

    await findTreeNode(wrapper, '教学能力')?.trigger('click')

    expect(wrapper.emitted('toggle')?.[0]).toEqual(['teaching', true])
    expect(wrapper.emitted('select')?.[0]).toEqual(['teaching-implementation'])
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

    await findTreeNode(wrapper, '教学能力')?.trigger('click')
    await wrapper.setProps({
      selectedKey: 'teaching-implementation',
      defaultExpandedKeys: ['basic'],
    })

    expect(wrapper.emitted('select')?.[0]).toEqual(['teaching-implementation'])
    expect(wrapper.text()).toContain('教学实施')
  })
})
