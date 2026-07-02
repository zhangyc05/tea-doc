import { describe, expect, it } from 'vitest'
import trainingPlanPage from '@/pages/admin/training/TrainingPlanPage.vue?raw'
import trainingPlanDetailPage from '@/pages/admin/training/TrainingPlanDetailPage.vue?raw'
import trainingRecordDetailPage from '@/pages/admin/training/TrainingRecordDetailPage.vue?raw'
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
})
