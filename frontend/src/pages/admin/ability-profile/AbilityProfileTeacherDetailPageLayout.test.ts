import { describe, expect, it } from 'vitest'
import { createMemoryHistory, createRouter } from 'vue-router'
import { adminRoutes } from '@/router/admin.routes'
import { getAbilityProfileTeacherDetailMock } from '@/services/mock/ability-profile'
import abilityProfileTeacherDetailPage from './AbilityProfileTeacherDetailPage.vue?raw'

describe('ability profile teacher detail page layout', () => {
  it('frames the detail page as a current-state portrait', () => {
    expect(abilityProfileTeacherDetailPage).toContain('current-profile-hero')
    expect(abilityProfileTeacherDetailPage).toContain('portrait-observatory')
    expect(abilityProfileTeacherDetailPage).toContain('radar-orbit-panel')
    expect(abilityProfileTeacherDetailPage).toContain('profile-metric-stack')
    expect(abilityProfileTeacherDetailPage).toContain('ability-track-list')
    expect(abilityProfileTeacherDetailPage).toContain('当前画像：')
    expect(abilityProfileTeacherDetailPage).toContain('本页展示当前发展状态，供培养与发展参考。')
    expect(abilityProfileTeacherDetailPage).toContain('当前状态')
    expect(abilityProfileTeacherDetailPage).toContain('能力阶段雷达')
    expect(abilityProfileTeacherDetailPage).toContain('读图摘要')
    expect(abilityProfileTeacherDetailPage).not.toContain('profile-overview-grid')
    expect(abilityProfileTeacherDetailPage).not.toContain('首年基线')
    expect(abilityProfileTeacherDetailPage).not.toContain('教师原型 达标')
    expect(abilityProfileTeacherDetailPage).not.toContain('当前教师：')
    expect(abilityProfileTeacherDetailPage).not.toContain('teacher-hero-card')
    expect(abilityProfileTeacherDetailPage).not.toContain('class="portrait"')
    expect(abilityProfileTeacherDetailPage).not.toContain('class="hair"')
    expect(abilityProfileTeacherDetailPage).not.toContain('class="face"')
    expect(abilityProfileTeacherDetailPage).not.toContain('class="body"')
  })

  it('uses basic ability as the radar center and four stages for outer dimensions', () => {
    expect(abilityProfileTeacherDetailPage).toContain('center-label="基本能力"')
    expect(abilityProfileTeacherDetailPage).toContain(':center-status="stageRadar.basicAbilityStatus"')
    expect(abilityProfileTeacherDetailPage).toContain('能力阶段雷达')
    expect(abilityProfileTeacherDetailPage).toContain('新手')
    expect(abilityProfileTeacherDetailPage).toContain('胜任')
    expect(abilityProfileTeacherDetailPage).toContain('骨干')
    expect(abilityProfileTeacherDetailPage).toContain('名师')
    expect(abilityProfileTeacherDetailPage).not.toContain('新手区')
    expect(abilityProfileTeacherDetailPage).not.toContain('胜任区')
    expect(abilityProfileTeacherDetailPage).not.toContain('骨干区')
    expect(abilityProfileTeacherDetailPage).not.toContain('名师区')
  })

  it('keeps lower sections compact and non-audit oriented', () => {
    expect(abilityProfileTeacherDetailPage).toContain('能力结构')
    expect(abilityProfileTeacherDetailPage).toContain('目标对照摘要')
    expect(abilityProfileTeacherDetailPage).toContain('适合发展方向')
    expect(abilityProfileTeacherDetailPage).toContain('形成依据')
    expect(abilityProfileTeacherDetailPage).not.toContain('发展状态解读')
    expect(abilityProfileTeacherDetailPage).not.toContain('证据链')
    expect(abilityProfileTeacherDetailPage).not.toContain('支持方向')
    expect(abilityProfileTeacherDetailPage).not.toContain('AdminTable')
  })

  it('keeps basis actions explicit and bounded', () => {
    expect(abilityProfileTeacherDetailPage).toContain('查看引用记录')
    expect(abilityProfileTeacherDetailPage).toContain('查看能力清单口径')
    expect(abilityProfileTeacherDetailPage).toContain('/admin/archive/teacher/')
    expect(abilityProfileTeacherDetailPage).toContain('/admin/ability-list/execution')
    expect(abilityProfileTeacherDetailPage).toContain('router.push(routePath)')
    expect(abilityProfileTeacherDetailPage).not.toContain('引用记录详情暂未拆分独立管理端页面')
  })

  it('resolves basis action routes against the real admin route table', () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes: adminRoutes,
    })
    const routes = getAbilityProfileTeacherDetailMock('lin').basis.links.map(link => link.route)

    expect(routes).toContain('/admin/archive/teacher/lin')
    expect(routes).toContain('/admin/ability-list/execution')

    for (const routePath of routes) {
      expect(router.resolve(routePath).matched.length).toBeGreaterThan(0)
    }
  })

  it('does not use judgmental wording in the visible page copy', () => {
    const forbiddenWords = [
      '能力不足',
      '短板',
      '弱项',
      '落后',
      '不达标',
      '重点帮扶',
      '评价结论',
      '最终评价结论',
      '证据链',
      '新手区',
      '胜任区',
      '骨干区',
      '名师区',
    ]

    for (const word of forbiddenWords) {
      expect(abilityProfileTeacherDetailPage).not.toContain(word)
    }
  })
})
