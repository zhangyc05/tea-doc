/* @vitest-environment jsdom */
import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'

import DetailSheet from './DetailSheet.vue'

afterEach(() => {
  document.body.innerHTML = ''
})

describe('DetailSheet', () => {
  it('supports the standard admin form drawer width', () => {
    mount(DetailSheet, {
      props: {
        open: true,
        title: '编辑基准模板指标',
        width: 'form',
      },
      attachTo: document.body,
    })

    expect(document.body.querySelector('aside')?.classList.contains('w-[540px]')).toBe(true)
  })

  it('supports the version history drawer width without a footer', () => {
    mount(DetailSheet, {
      props: {
        open: true,
        title: '能力清单版本记录',
        width: 'history',
        showFooter: false,
      },
      attachTo: document.body,
    })

    expect(document.body.querySelector('aside')?.classList.contains('w-[620px]')).toBe(true)
    expect(document.body.querySelector('footer')).toBeNull()
  })

  it('supports the source reader drawer placement without a footer', () => {
    mount(DetailSheet, {
      props: {
        open: true,
        title: '教学工作 | 来源记录',
        width: 'source',
        placement: 'reader',
        showFooter: false,
      },
      attachTo: document.body,
    })

    const panel = document.body.querySelector('aside')
    expect(panel?.classList.contains('w-[540px]')).toBe(true)
    expect(panel?.classList.contains('top-[54px]')).toBe(true)
    expect(panel?.classList.contains('right-3.5')).toBe(true)
    expect(panel?.classList.contains('bottom-0')).toBe(true)
    expect(panel?.classList.contains('rounded-t-xl')).toBe(true)
    expect(document.body.querySelector('footer')).toBeNull()
  })

  it('supports the complex admin edit drawer width', () => {
    mount(DetailSheet, {
      props: {
        open: true,
        title: '编辑要求项映射',
        width: 'complex',
      },
      attachTo: document.body,
    })

    expect(document.body.querySelector('aside')?.classList.contains('w-[660px]')).toBe(true)
  })
})
