import { describe, expect, it } from 'vitest'
import trainingPlanPage from '@/pages/admin/training/TrainingPlanPage.vue?raw'
import trainingPlanDetailPage from '@/pages/admin/training/TrainingPlanDetailPage.vue?raw'
import trainingRecordDetailPage from '@/pages/admin/training/TrainingRecordDetailPage.vue?raw'
import abilityListBasePage from '@/pages/admin/ability-list/AbilityListBasePage.vue?raw'
import abilityListRequirementMappingPage from '@/pages/admin/ability-list/AbilityListRequirementMappingPage.vue?raw'
import abilityProfileGroupPage from '@/pages/admin/ability-profile/AbilityProfileGroupPage.vue?raw'
import archiveTeacherDetailPage from '@/pages/admin/archive/ArchiveTeacherDetailPage.vue?raw'
import reportCenterPage from '@/pages/admin/reports/ReportCenterPage.vue?raw'
import virtualLabRoomPage from '@/pages/admin/virtual-lab/VirtualLabRoomPage.vue?raw'
import virtualLabRoomDetailPage from '@/pages/admin/virtual-lab/VirtualLabRoomDetailPage.vue?raw'
import { useOperationMessage } from './operationMessage'

describe('useOperationMessage', () => {
  it('sets and clears a local operation message', () => {
    const message = useOperationMessage()

    message.set('已筛选出 3 条记录。')
    expect(message.text.value).toBe('已筛选出 3 条记录。')

    message.clear()
    expect(message.text.value).toBe('')
  })

  it('copies a message from store state', () => {
    const message = useOperationMessage()

    message.fromStore({ operationMessage: '已保存要求项映射。' })

    expect(message.text.value).toBe('已保存要求项映射。')
  })

  it('ignores empty store messages by default', () => {
    const message = useOperationMessage('默认提示')

    message.fromStore({ operationMessage: '' })

    expect(message.text.value).toBe('默认提示')
  })

  it('is used by training plan pages instead of local notice refs', () => {
    expect(trainingPlanPage).toContain("import { useOperationMessage } from '@/lib/operationMessage'")
    expect(trainingPlanPage).not.toContain('planNotice')
    expect(trainingPlanDetailPage).toContain("import { useOperationMessage } from '@/lib/operationMessage'")
    expect(trainingPlanDetailPage).not.toContain('actionMessage')
    expect(trainingRecordDetailPage).toContain("import { useOperationMessage } from '@/lib/operationMessage'")
    expect(trainingRecordDetailPage).not.toContain('materialMessage')
  })

  it('is used by virtual lab room pages instead of local message refs', () => {
    expect(virtualLabRoomPage).toContain("import { useOperationMessage } from '@/lib/operationMessage'")
    expect(virtualLabRoomPage).not.toContain("const operationMessage = ref('')")
    expect(virtualLabRoomDetailPage).toContain("import { useOperationMessage } from '@/lib/operationMessage'")
    expect(virtualLabRoomDetailPage).not.toContain("const operationMessage = ref('')")
  })

  it('is used by ability list action pages instead of local message refs', () => {
    expect(abilityListBasePage).toContain("import { useOperationMessage } from '@/lib/operationMessage'")
    expect(abilityListBasePage).not.toContain("const operationMessage = ref('')")
    expect(abilityListRequirementMappingPage).toContain("import { useOperationMessage } from '@/lib/operationMessage'")
    expect(abilityListRequirementMappingPage).not.toContain("const operationMessage = ref('')")
  })

  it('is used by archive detail pages instead of local action message refs', () => {
    expect(archiveTeacherDetailPage).toContain("import { useOperationMessage } from '@/lib/operationMessage'")
    expect(archiveTeacherDetailPage).not.toContain("const actionMessage = ref('')")
  })

  it('is used by remaining admin message pages instead of local message refs', () => {
    expect(abilityProfileGroupPage).toContain("import { useOperationMessage } from '@/lib/operationMessage'")
    expect(abilityProfileGroupPage).not.toContain("const operationMessage = ref('')")
    expect(reportCenterPage).toContain("import { useOperationMessage } from '@/lib/operationMessage'")
    expect(reportCenterPage).not.toContain("const operationMessage = ref('')")
  })
})
