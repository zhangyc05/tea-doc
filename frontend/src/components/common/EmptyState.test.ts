/* @vitest-environment jsdom */
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import abilityListBaseOptimizationPageSource from '../../pages/admin/ability-list/AbilityListBaseOptimizationPage.vue?raw'
import abilityListRequirementMappingPageSource from '../../pages/admin/ability-list/AbilityListRequirementMappingPage.vue?raw'
import practiceRecordPageSource from '../../pages/admin/practice/PracticeRecordPage.vue?raw'
import practiceTrackingPageSource from '../../pages/admin/practice/PracticeTrackingPage.vue?raw'
import reflectionOverviewPageSource from '../../pages/admin/reflection/ReflectionOverviewPage.vue?raw'
import reportCenterPageSource from '../../pages/admin/reports/ReportCenterPage.vue?raw'
import trainingDemandPageSource from '../../pages/admin/training/TrainingDemandPage.vue?raw'
import trainingPlanPageSource from '../../pages/admin/training/TrainingPlanPage.vue?raw'
import trainingRecordPageSource from '../../pages/admin/training/TrainingRecordPage.vue?raw'
import trainingResourcePageSource from '../../pages/admin/training/TrainingResourcePage.vue?raw'
import virtualLabRoomPageSource from '../../pages/admin/virtual-lab/VirtualLabRoomPage.vue?raw'
import EmptyState from './EmptyState.vue'

describe('EmptyState', () => {
  it('renders a table cell empty state with the requested colspan', () => {
    const wrapper = mount(EmptyState, {
      props: {
        as: 'td',
        variant: 'cell',
        colspan: 7,
        title: '暂无符合条件的培训申请',
      },
    })

    expect(wrapper.element.tagName).toBe('TD')
    expect(wrapper.attributes('colspan')).toBe('7')
    expect(wrapper.text()).toContain('暂无符合条件的培训申请')
  })

  it('emits an action when the optional action button is clicked', async () => {
    const wrapper = mount(EmptyState, {
      props: {
        title: '暂无符合条件的数据',
        description: '调整筛选条件后再试。',
        actionLabel: '重置筛选',
      },
    })

    await wrapper.get('button').trigger('click')

    expect(wrapper.emitted('action')).toHaveLength(1)
  })

  it('is used by the next training table empty-state batch', () => {
    const pageSources = [
      trainingDemandPageSource,
      trainingRecordPageSource,
      trainingResourcePageSource,
    ]

    for (const pageSource of pageSources) {
      expect(pageSource).toContain('EmptyState')
      expect(pageSource).toContain('<EmptyState as="td" variant="cell"')
      expect(pageSource).not.toContain('class="empty-cell"')
    }
  })

  it('is used by the third table empty-state batch', () => {
    const pageSources = [
      trainingPlanPageSource,
      practiceRecordPageSource,
      practiceTrackingPageSource,
    ]

    for (const pageSource of pageSources) {
      expect(pageSource).toContain('EmptyState')
      expect(pageSource).toContain('<EmptyState as="td" variant="cell"')
      expect(pageSource).not.toContain('class="empty-cell"')
    }
  })

  it('is used by the remaining admin empty-state batch', () => {
    const pageSources = [
      abilityListBaseOptimizationPageSource,
      abilityListRequirementMappingPageSource,
      reflectionOverviewPageSource,
      reportCenterPageSource,
      virtualLabRoomPageSource,
    ]

    for (const pageSource of pageSources) {
      expect(pageSource).toContain('EmptyState')
      expect(pageSource).not.toContain('class="empty-cell"')
      expect(pageSource).not.toContain('class="empty-panel"')
      expect(pageSource).not.toContain('class="empty-state"')
    }
  })
})
