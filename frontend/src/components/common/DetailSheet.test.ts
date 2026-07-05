/* @vitest-environment jsdom */
import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'

import DetailSheet from './DetailSheet.vue'

const detailSheetSource = readFileSync('src/components/common/DetailSheet.vue', 'utf8')

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

    expect(detailSheetSource).toContain("form: '540px'")
    expect(detailSheetSource).toContain('<AdminDrawer')
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

    expect(detailSheetSource).toContain("history: '620px'")
    expect(document.body.querySelector('.detail-sheet-footer')).toBeNull()
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

    expect(detailSheetSource).toContain("source: '540px'")
    expect(detailSheetSource).toContain('detail-sheet-reader')
    expect(document.body.querySelector('.detail-sheet-footer')).toBeNull()
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

    expect(detailSheetSource).toContain("complex: '660px'")
  })
})
