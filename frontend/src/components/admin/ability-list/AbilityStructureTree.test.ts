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
})
