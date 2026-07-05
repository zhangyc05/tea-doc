import { describe, expect, it } from 'vitest'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import abilityListBasePage from '@/pages/admin/ability-list/AbilityListBasePage.vue?raw'
import abilityListExecutionPage from '@/pages/admin/ability-list/AbilityListExecutionPage.vue?raw'
import abilityListBaseOptimizationPage from '@/pages/admin/ability-list/AbilityListBaseOptimizationPage.vue?raw'
import abilityListPublishConfirmPage from '@/pages/admin/ability-list/AbilityListPublishConfirmPage.vue?raw'
import abilityListRequirementMappingPage from '@/pages/admin/ability-list/AbilityListRequirementMappingPage.vue?raw'
import abilityProfileGroupPage from '@/pages/admin/ability-profile/AbilityProfileGroupPage.vue?raw'
import abilityProfileTeacherDetailPage from '@/pages/admin/ability-profile/AbilityProfileTeacherDetailPage.vue?raw'
import abilityProfileTeacherPage from '@/pages/admin/ability-profile/AbilityProfileTeacherPage.vue?raw'
import archiveImportBatchPage from '@/pages/admin/archive/ArchiveImportBatchPage.vue?raw'
import archiveImportUploadPage from '@/pages/admin/archive/ArchiveImportUploadPage.vue?raw'
import archiveProcessingPage from '@/pages/admin/archive/ArchiveProcessingPage.vue?raw'
import archiveQueryPage from '@/pages/admin/archive/ArchiveQueryPage.vue?raw'
import archiveTeacherDetailPage from '@/pages/admin/archive/ArchiveTeacherDetailPage.vue?raw'
import practiceApplicationPage from '@/pages/admin/practice/PracticeApplicationPage.vue?raw'
import practiceRecordPage from '@/pages/admin/practice/PracticeRecordPage.vue?raw'
import practiceTrackingPage from '@/pages/admin/practice/PracticeTrackingPage.vue?raw'
import reflectionDetailPage from '@/pages/admin/reflection/ReflectionDetailPage.vue?raw'
import reflectionOverviewPage from '@/pages/admin/reflection/ReflectionOverviewPage.vue?raw'
import reportCenterPage from '@/pages/admin/reports/ReportCenterPage.vue?raw'
import trainingApplicationPage from '@/pages/admin/training/TrainingApplicationPage.vue?raw'
import trainingDemandPage from '@/pages/admin/training/TrainingDemandPage.vue?raw'
import trainingPlanDetailPage from '@/pages/admin/training/TrainingPlanDetailPage.vue?raw'
import trainingPlanPage from '@/pages/admin/training/TrainingPlanPage.vue?raw'
import trainingRecordDetailPage from '@/pages/admin/training/TrainingRecordDetailPage.vue?raw'
import trainingRecordPage from '@/pages/admin/training/TrainingRecordPage.vue?raw'
import trainingResourcePage from '@/pages/admin/training/TrainingResourcePage.vue?raw'
import virtualLabActivityDetailPage from '@/pages/admin/virtual-lab/VirtualLabActivityDetailPage.vue?raw'
import virtualLabRecordDetailPage from '@/pages/admin/virtual-lab/VirtualLabRecordDetailPage.vue?raw'
import virtualLabRoomDetailPage from '@/pages/admin/virtual-lab/VirtualLabRoomDetailPage.vue?raw'
import virtualLabRoomPage from '@/pages/admin/virtual-lab/VirtualLabRoomPage.vue?raw'
import abilityIndicatorTable from '@/components/admin/ability-list/AbilityIndicatorTable.vue?raw'
import abilityStructureTree from '@/components/admin/ability-list/AbilityStructureTree.vue?raw'
import detailSheet from '@/components/common/DetailSheet.vue?raw'
import pageHeader from '@/components/common/PageHeader.vue?raw'
import adminSidebar from '@/components/layout/AdminSidebar.vue?raw'
import adminTopbar from '@/components/layout/AdminTopbar.vue?raw'

const adminDesignGuide = fs.readFileSync(
  fileURLToPath(new URL('../../../docs/admin-design-system-guide.md', import.meta.url)),
  'utf8',
)
const groupPortraitHeroArt = fs.readFileSync(
  fileURLToPath(new URL('../../assets/admin/ability-group-portrait-assets/ability-group-portrait-hero-art.png', import.meta.url)),
  'binary',
)
const adminIconPath = fileURLToPath(new URL('../../components/admin-ui/AdminIcon.vue', import.meta.url))
let adminIcon = ''
try {
  adminIcon = fs.readFileSync(adminIconPath, 'utf8')
} catch {
  adminIcon = ''
}

const adminVisualSources = [
  ['AbilityListBasePage.vue', abilityListBasePage],
  ['AbilityListExecutionPage.vue', abilityListExecutionPage],
  ['AbilityListBaseOptimizationPage.vue', abilityListBaseOptimizationPage],
  ['AbilityListPublishConfirmPage.vue', abilityListPublishConfirmPage],
  ['AbilityListRequirementMappingPage.vue', abilityListRequirementMappingPage],
  ['AbilityProfileGroupPage.vue', abilityProfileGroupPage],
  ['AbilityProfileTeacherDetailPage.vue', abilityProfileTeacherDetailPage],
  ['AbilityProfileTeacherPage.vue', abilityProfileTeacherPage],
  ['ArchiveImportBatchPage.vue', archiveImportBatchPage],
  ['ArchiveImportUploadPage.vue', archiveImportUploadPage],
  ['ArchiveProcessingPage.vue', archiveProcessingPage],
  ['ArchiveQueryPage.vue', archiveQueryPage],
  ['ArchiveTeacherDetailPage.vue', archiveTeacherDetailPage],
  ['PracticeApplicationPage.vue', practiceApplicationPage],
  ['PracticeRecordPage.vue', practiceRecordPage],
  ['PracticeTrackingPage.vue', practiceTrackingPage],
  ['ReflectionDetailPage.vue', reflectionDetailPage],
  ['ReflectionOverviewPage.vue', reflectionOverviewPage],
  ['ReportCenterPage.vue', reportCenterPage],
  ['TrainingApplicationPage.vue', trainingApplicationPage],
  ['TrainingDemandPage.vue', trainingDemandPage],
  ['TrainingPlanDetailPage.vue', trainingPlanDetailPage],
  ['TrainingPlanPage.vue', trainingPlanPage],
  ['TrainingRecordDetailPage.vue', trainingRecordDetailPage],
  ['TrainingRecordPage.vue', trainingRecordPage],
  ['TrainingResourcePage.vue', trainingResourcePage],
  ['VirtualLabActivityDetailPage.vue', virtualLabActivityDetailPage],
  ['VirtualLabRecordDetailPage.vue', virtualLabRecordDetailPage],
  ['VirtualLabRoomDetailPage.vue', virtualLabRoomDetailPage],
  ['VirtualLabRoomPage.vue', virtualLabRoomPage],
  ['AbilityIndicatorTable.vue', abilityIndicatorTable],
  ['AbilityStructureTree.vue', abilityStructureTree],
  ['DetailSheet.vue', detailSheet],
  ['PageHeader.vue', pageHeader],
  ['AdminSidebar.vue', adminSidebar],
  ['AdminTopbar.vue', adminTopbar],
] as const

function findUnboundNativeButtons(source: string) {
  return [...source.matchAll(/<button\b[\s\S]*?<\/button>/g)]
    .map(match => match[0])
    .filter(button => !button.includes('@click')
      && !button.includes('disabled')
      && !button.includes(':disabled')
      && !button.includes('type="submit"')
      && !button.includes('type=\'submit\''))
    .map(button => button.replace(/\s+/g, ' ').trim())
}

describe('admin visual action guardrails', () => {
  it('wires archive and group portrait pages to their dedicated asset packs', () => {
    expect(archiveProcessingPage).toContain('archive-processing-assets/archive-processing-hero-art.png')
    expect(archiveProcessingPage).toContain('archive-processing-assets/archive-processing-hero-emblem.svg')
    expect(archiveProcessingPage).toContain('archiveStatusIconMap')
    expect(archiveProcessingPage).toContain('sourceIconMap')
    expect(archiveProcessingPage).not.toContain('@/images/hero-art.png')
    expect(archiveProcessingPage).not.toContain("icon: 'clock'")

    expect(archiveImportUploadPage).toContain('archive-processing-assets/icons/icon-file-excel.svg')
    expect(archiveImportUploadPage).toContain('fileTypeIconMap')
    expect(archiveImportUploadPage).toContain('<img class="file-type-icon" :src="fileTypeIconMap[file.type]" alt="" />')
    expect(archiveImportBatchPage).toContain('archive-processing-assets/icons/icon-file-excel.svg')
    expect(archiveImportBatchPage).toContain('fileTypeIconMap')
    expect(archiveImportBatchPage).toContain('<img class="file-type-icon" :src="fileTypeIconMap[file.type]" alt="" />')

    expect(archiveQueryPage).toContain('archive-query-assets/archive-query-hero-art.png')
    expect(archiveQueryPage).toContain('archive-query-assets/archive-query-hero-emblem.svg')
    expect(archiveQueryPage).toContain('archive-query-assets/archive-query-empty.svg')
    expect(archiveQueryPage).toContain('heroStatCards')
    expect(archiveQueryPage).toContain('teacherAvatarMap')
    expect(archiveQueryPage).not.toContain('@/images/hero-art.png')
    expect(archiveQueryPage).not.toContain('avatar-circle')

    expect(abilityProfileGroupPage).toContain('ability-group-portrait-assets/ability-group-portrait-hero-art.png')
    expect(abilityProfileGroupPage).toContain('ability-group-portrait-assets/ability-group-portrait-empty.svg')
    expect(abilityProfileGroupPage).toContain('iconSrc')
    expect(abilityProfileGroupPage).toContain('supportDirectionIcons')
    expect(abilityProfileGroupPage).toContain('focusTabIconMap')
    expect(abilityProfileGroupPage).not.toMatch(/▤|♙|▣|▰|▥/)
  })

  it('keeps the group portrait hero artwork transparent', () => {
    const pngColorType = groupPortraitHeroArt.charCodeAt(25)

    expect(pngColorType).toBe(6)
  })

  it('keeps button design guidance aligned with the completed btn-class migration', () => {
    expect(adminDesignGuide).not.toContain('管理端业务页面仍以局部 `.btn-*` 为主')
    expect(adminDesignGuide).not.toContain('或现有 `.btn-view/.btn-link` 逐步迁移')
  })

  it('uses Element Plus icons for generic admin chrome and text-symbol icons', () => {
    expect(adminIcon).toContain('@element-plus/icons-vue')
    expect(adminIcon).toContain('type AdminIconName')
    expect(adminSidebar).toContain('import { AdminIcon } from \'@/components/admin-ui\'')
    expect(adminSidebar).toContain('<AdminIcon name="medal" />')
    expect(adminSidebar).toContain('<AdminIcon :name="item.icon" />')
    expect(adminSidebar).not.toContain('<svg viewBox="0 0')
    expect(adminSidebar).not.toContain('<path v-if="item.icon')

    const genericIconSources = [
      ['PracticeApplicationPage.vue', practiceApplicationPage],
      ['TrainingApplicationPage.vue', trainingApplicationPage],
      ['TrainingDemandPage.vue', trainingDemandPage],
    ] as const

    for (const [filename, source] of genericIconSources) {
      expect(source, filename).toContain('AdminIcon')
      expect(source, filename).toContain('from \'@/components/admin-ui\'')
      expect(source, filename).not.toMatch(/[▤▥▦▣▰▱●◷＋×↻]/)
    }

    for (const [filename, source] of adminVisualSources) {
      expect(source, filename).not.toMatch(/[▤▥▦▣▰▱●◷＋×↻👥◔↗◎▲⇩⇧]/)
    }

    expect(trainingDemandPage).toContain('box-shadow: inset 0 0 0 10px')
    expect(trainingDemandPage).toContain('.stat-icon :deep(svg)')
    expect(trainingDemandPage).toContain('.suggestion-icon :deep(svg)')

    const adminIconBadgeSources = [
      ['AbilityListPublishConfirmPage.vue', abilityListPublishConfirmPage, '.hero-icon :deep(svg)'],
      ['AbilityListPublishConfirmPage.vue', abilityListPublishConfirmPage, '.impact-icon :deep(svg)'],
      ['AbilityListPublishConfirmPage.vue', abilityListPublishConfirmPage, '.notice-icon :deep(svg)'],
      ['PracticeApplicationPage.vue', practiceApplicationPage, '.stat-icon :deep(svg)'],
      ['PracticeRecordPage.vue', practiceRecordPage, '.stat-icon :deep(svg)'],
      ['PracticeTrackingPage.vue', practiceTrackingPage, '.stat-icon :deep(svg)'],
      ['TrainingApplicationPage.vue', trainingApplicationPage, '.stat-icon :deep(svg)'],
      ['TrainingApplicationPage.vue', trainingApplicationPage, '.reminder-icon :deep(svg)'],
      ['TrainingResourcePage.vue', trainingResourcePage, '.stat-icon :deep(svg)'],
      ['VirtualLabActivityDetailPage.vue', virtualLabActivityDetailPage, '.status-icon :deep(svg)'],
      ['VirtualLabActivityDetailPage.vue', virtualLabActivityDetailPage, '.file-icon :deep(svg)'],
      ['VirtualLabActivityDetailPage.vue', virtualLabActivityDetailPage, '.record-icon :deep(svg)'],
      ['VirtualLabRecordDetailPage.vue', virtualLabRecordDetailPage, '.file-icon :deep(svg)'],
      ['VirtualLabRoomDetailPage.vue', virtualLabRoomDetailPage, '.room-avatar :deep(svg)'],
      ['VirtualLabRoomDetailPage.vue', virtualLabRoomDetailPage, '.stat-icon :deep(svg)'],
      ['VirtualLabRoomDetailPage.vue', virtualLabRoomDetailPage, '.record-icon :deep(svg)'],
      ['VirtualLabRoomPage.vue', virtualLabRoomPage, '.stat-icon :deep(svg)'],
    ] as const

    for (const [filename, source, selector] of adminIconBadgeSources) {
      expect(source, filename).toContain(selector)
    }

    expect(adminDesignGuide).toContain('@element-plus/icons-vue')
    expect(adminDesignGuide).toContain('能用图标库表达的通用图标，优先使用 `AdminIcon`')
  })

  it('keeps native admin buttons bound to actions or explicit disabled/form semantics', () => {
    const offenders = adminVisualSources.flatMap(([filename, source]) => {
      return findUnboundNativeButtons(source).map(button => `${filename}: ${button}`)
    })

    expect(offenders).toEqual([])
  })

  it('does not render read-only values as clickable buttons', () => {
    expect(abilityListExecutionPage).toContain('<span class="admin-summary-link template-link">')
    expect(abilityListExecutionPage).not.toContain('<button class="admin-summary-link template-link">')

    expect(archiveProcessingPage).toContain('<span class="filter-link">{{ statusFilter }}</span>')
    expect(archiveProcessingPage).toContain('<span class="filter-link">{{ sourceFilter }}</span>')
    expect(archiveProcessingPage).not.toContain('<button class="filter-link">{{ statusFilter }}</button>')
    expect(archiveProcessingPage).not.toContain('<button class="filter-link">{{ sourceFilter }}</button>')

    expect(adminTopbar).toContain('<span class="scope-button">')
    expect(adminTopbar).toContain('<span class="scope-button year-button">')
    expect(adminTopbar).toContain('<span class="message-button" role="status" aria-label="消息 12 条">')
    expect(adminTopbar).not.toContain('<button type="button" class="scope-button">')
    expect(adminTopbar).not.toContain('<button type="button" class="scope-button year-button">')
    expect(adminTopbar).not.toContain('<button type="button" class="message-button" aria-label="消息">')
  })

  it('binds visible action buttons to explicit behavior or degradation feedback', () => {
    expect(archiveQueryPage).toContain('function applySearch()')

    expect(abilityProfileGroupPage).toContain('function viewMoreObjects()')
    expect(abilityProfileGroupPage).toContain('<button class="more-btn" @click="viewMoreObjects">查看更多对象 ↓</button>')
  })

  it('does not render static pagination indicators as clickable buttons', () => {
    expect(trainingResourcePage).toContain('AdminPagination')
    expect(trainingResourcePage).not.toContain('page-button')
    expect(trainingResourcePage).not.toContain('<button class="page-button" type="button"')
    expect(trainingResourcePage).not.toContain('<button class="page-button active" type="button">1</button>')

    expect(trainingApplicationPage).toContain('AdminPagination')
    expect(trainingApplicationPage).not.toContain('page-button')
    expect(trainingApplicationPage).not.toContain('<button class="page-button" type="button"')

    expect(trainingRecordPage).toContain('AdminPagination')
    expect(trainingRecordPage).not.toContain('page-button')
    expect(trainingRecordPage).not.toContain('<button type="button">1</button>')

    expect(practiceApplicationPage).toContain('AdminPagination')
    expect(practiceApplicationPage).not.toContain('page-button')
    expect(practiceApplicationPage).not.toContain('<button class="page-button" type="button"')

    expect(virtualLabRoomDetailPage).toContain('AdminPagination')
    expect(virtualLabRoomDetailPage).not.toContain('pager-button')
    expect(virtualLabRoomDetailPage).not.toContain('pager-current')
    expect(virtualLabRoomDetailPage).not.toContain('<button disabled>‹</button>')
    expect(virtualLabRoomDetailPage).not.toContain('<button disabled>›</button>')
  })

  it('uses the shared Button component for archive query search and detail actions', () => {
    expect(archiveQueryPage).toContain('import { Button } from \'@/components/ui\'')
    expect(archiveQueryPage).toContain('<Button class="search-action" @click="applySearch">')
    expect(archiveQueryPage).toContain('iconActionSearch')
    expect(archiveQueryPage).toContain('<Button variant="outline" @click="resetFilters">')
    expect(archiveQueryPage).toContain('iconActionReset')
    expect(archiveQueryPage).toContain('<Button class="archive-detail-action" size="sm" @click="viewTeacherDetail(teacher.id)">')
    expect(archiveQueryPage).not.toContain('<button class="search-btn" @click="applySearch">搜索</button>')
    expect(archiveQueryPage).not.toContain('<button class="reset-btn" @click="resetFilters">重置</button>')
    expect(archiveQueryPage).not.toContain('<button class="btn-primary" @click="viewTeacherDetail(teacher.id)">')
  })

  it('uses the shared Button component for archive processing detail actions', () => {
    expect(archiveProcessingPage).toContain('import { Button } from \'@/components/ui\'')
    expect(archiveProcessingPage).toContain('<Button class="detail-action-button" @click="confirmArchive">确认入档</Button>')
    expect(archiveProcessingPage).toContain('<Button class="detail-action-button" variant="secondary" @click="returnRecord">再次退回</Button>')
    expect(archiveProcessingPage).toContain('<Button class="detail-action-button" variant="danger" @click="markException">标记异常</Button>')
    expect(archiveProcessingPage).toContain('<Button class="detail-action-button" variant="outline" @click="viewSupplement">查看补充说明</Button>')
    expect(archiveProcessingPage).not.toContain('<button class="btn-primary" @click="confirmArchive">确认入档</button>')
    expect(archiveProcessingPage).not.toContain('<button class="btn-secondary" @click="returnRecord">再次退回</button>')
    expect(archiveProcessingPage).not.toContain('<button class="btn-outline" @click="markException">标记异常</button>')
    expect(archiveProcessingPage).not.toContain('<button class="btn-link" @click="viewSupplement">查看补充说明</button>')
  })

  it('uses the shared Button component for archive import batch footer actions', () => {
    expect(archiveImportBatchPage).toContain('import { Button } from \'@/components/ui\'')
    expect(archiveImportBatchPage).toContain('<Button class="batch-action" variant="secondary" @click="returnToProcessing">返回档案处理</Button>')
    expect(archiveImportBatchPage).toContain('<Button v-if="!isCompleted && !isCancelled" class="batch-action" variant="outline" @click="cancelTask">取消本次任务</Button>')
    expect(archiveImportBatchPage).toContain('<Button v-if="!isCompleted && !isCancelled" class="batch-action batch-action-primary" @click="refreshStatus">刷新状态</Button>')
    expect(archiveImportBatchPage).toContain('<Button v-if="isCompleted && !isCancelled" class="batch-action" variant="outline" @click="viewUploadedFiles">查看上传文件</Button>')
    expect(archiveImportBatchPage).toContain('<Button v-if="isCompleted && !isCancelled" class="batch-action batch-action-primary" @click="confirmResult">确认识别结果</Button>')
    expect(archiveImportBatchPage).not.toContain('<button class="btn-secondary" @click="returnToProcessing">返回档案处理</button>')
    expect(archiveImportBatchPage).not.toContain('<button v-if="!isCompleted && !isCancelled" class="btn-outline" @click="cancelTask">取消本次任务</button>')
    expect(archiveImportBatchPage).not.toContain('<button v-if="!isCompleted && !isCancelled" class="btn-primary" @click="refreshStatus">刷新状态</button>')
    expect(archiveImportBatchPage).not.toContain('<button v-if="isCompleted && !isCancelled" class="btn-outline" @click="viewUploadedFiles">查看上传文件</button>')
    expect(archiveImportBatchPage).not.toContain('<button v-if="isCompleted && !isCancelled" class="btn-primary" @click="confirmResult">确认识别结果</button>')
  })

  it('uses the shared Button component for archive import upload actions', () => {
    expect(archiveImportUploadPage).toContain('import { Button } from \'@/components/ui\'')
    expect(archiveImportUploadPage).toContain('AdminUpload')
    expect(archiveImportUploadPage).toContain('from \'@/components/admin-ui\'')
    expect(archiveImportUploadPage).toContain('<Button class="upload-action-button" type="button" variant="outline" size="lg">')
    expect(archiveImportUploadPage).toContain('<Button class="file-remove-action" type="button" variant="ghost" size="sm" @click="removeFile(file.id)">删除</Button>')
    expect(archiveImportUploadPage).toContain('<Button class="bottom-cancel-action" type="button" variant="outline" size="lg" @click="cancelUpload">取消</Button>')
    expect(archiveImportUploadPage).toContain('<Button class="bottom-primary-action" type="button" size="lg" :disabled="uploadedFiles.length === 0" @click="startRecognition">')
    expect(archiveImportUploadPage).not.toContain('function selectFiles()')
    expect(archiveImportUploadPage).not.toContain('function importFromFolder()')
    expect(archiveImportUploadPage).not.toContain('<button type="button" class="ghost-button" @click="selectFiles">▣ 选择文件</button>')
    expect(archiveImportUploadPage).not.toContain('<button type="button" class="ghost-button" @click="importFromFolder">▣ 从本地文件夹导入</button>')
    expect(archiveImportUploadPage).not.toContain('<button type="button" @click="removeFile(file.id)">删除</button>')
    expect(archiveImportUploadPage).not.toContain('<button type="button" class="cancel-button" @click="cancelUpload">取消</button>')
    expect(archiveImportUploadPage).not.toContain('<button type="button" class="primary-button" :disabled="uploadedFiles.length === 0" @click="startRecognition">')
  })

  it('uses the shared Button component for ability list drawer footer actions', () => {
    expect(abilityListBasePage).toContain('import { Button } from \'@/components/ui\'')
    expect(abilityListBasePage).toContain('<Button variant="outline" @click="closeEditDrawer">取消</Button>')
    expect(abilityListBasePage).toContain('<Button @click="saveIndicatorEdit">保存调整</Button>')
    expect(abilityListBasePage).toContain('indicatorStatusOptions')
    expect(abilityListBasePage).toContain('v-model="editingIndicator.status"')
    expect(abilityListBasePage).toContain('status: editingIndicator.value.status')
    expect(abilityListBasePage).toContain('.form-input :deep(.el-input__wrapper)')
    expect(abilityListBasePage).not.toContain('description="保存后会形成待确认调整，后续可派生到执行版。"')
    expect(abilityListBasePage).not.toContain('.form-input {\n  min-height: 38px;')
    expect(abilityListBasePage).not.toContain('<button class="btn-secondary" @click="closeEditDrawer">取消</button>')
    expect(abilityListBasePage).not.toContain('<button class="btn-primary" @click="saveIndicatorEdit">保存调整</button>')

    expect(abilityListExecutionPage).toContain('import { Button } from \'@/components/ui\'')
    expect(abilityListExecutionPage).toContain('mode="edit"')
    expect(abilityListExecutionPage).toContain('@confirm="saveEdit"')
    expect(abilityListExecutionPage).not.toContain('<button class="btn-secondary" @click="closeEditDrawer">取消</button>')
    expect(abilityListExecutionPage).not.toContain('<button class="btn-primary" @click="saveEdit">保存</button>')

    expect(abilityListRequirementMappingPage).toContain('import { Button } from \'@/components/ui\'')
    expect(abilityListRequirementMappingPage).toContain('<Button variant="danger" @click="deleteMapping">删除要求项</Button>')
    expect(abilityListRequirementMappingPage).toContain('<Button variant="outline" @click="closeEditDrawer">取消</Button>')
    expect(abilityListRequirementMappingPage).toContain('<Button @click="saveMapping">保存映射</Button>')
    expect(abilityListRequirementMappingPage).not.toContain('<button class="btn-danger" @click="deleteMapping">删除要求项</button>')
    expect(abilityListRequirementMappingPage).not.toContain('<button class="btn-secondary" @click="closeEditDrawer">取消</button>')
    expect(abilityListRequirementMappingPage).not.toContain('<button class="btn-primary" @click="saveMapping">保存映射</button>')
  })

  it('uses the shared Button component for ability list base hero actions', () => {
    expect(abilityListBasePage).toContain('<Button class="primary-action" @click="scrollToOptimization">')
    expect(abilityListBasePage).toContain('优化建议（{{ optimizationPendingCount }}）')
    expect(abilityListBasePage).toContain('<button class="title-link" type="button" @click="goToVersionHistory">')
    expect(abilityListBasePage).toContain('查看版本记录')
    expect(abilityListBasePage).not.toContain('deriveExecutionVersion')
    expect(abilityListBasePage).not.toContain('派生执行版')
    expect(abilityListBasePage).not.toContain('<button class="primary-action btn-primary" @click="goToOptimization">')
    expect(abilityListBasePage).not.toContain('@click="goToOptimization"')
    expect(abilityListBasePage).not.toContain('<Button class="secondary-action" variant="outline" @click="goToVersionHistory">')
    expect(abilityListBasePage).not.toContain('<button class="secondary-action btn-secondary" @click="goToVersionHistory">')
  })

  it('uses the shared Button component for ability list execution hero actions', () => {
    expect(abilityListExecutionPage).toContain('<Button class="primary-action" @click="deriveNextVersion">')
    expect(abilityListExecutionPage).toContain('<Button class="secondary-action" variant="outline" @click="openVersionDrawer">历史版本</Button>')
    expect(abilityListExecutionPage).not.toContain('<button class="primary-action btn-primary" @click="deriveNextVersion">')
    expect(abilityListExecutionPage).not.toContain('<button class="secondary-action btn-secondary" @click="openVersionDrawer">历史版本</button>')
  })

  it('uses DetailSheet for the ability list execution edit and history drawer shells', () => {
    expect(abilityListExecutionPage).toContain('DetailSheet')
    expect(abilityListExecutionPage).toContain('title="编辑指标"')
    expect(abilityListExecutionPage).toContain('width="form"')
    expect(abilityListExecutionPage).toContain('mode="edit"')
    expect(abilityListExecutionPage).toContain('title="执行版历史版本"')
    expect(abilityListExecutionPage).toContain('width="history"')
    expect(abilityListExecutionPage).toContain(':show-footer="false"')
    expect(abilityListExecutionPage).toContain('version.versionNo')
    expect(abilityListExecutionPage).toContain('getExecutionVersionStatusLabel(version.status)')
    expect(abilityListExecutionPage).toContain('version.publishedAt')
    expect(abilityListExecutionPage).toContain('version.source')
    expect(abilityListExecutionPage).toContain('version.operator')
    expect(abilityListExecutionPage).not.toContain('<div v-if="editingIndicator" class="edit-drawer-overlay"')
    expect(abilityListExecutionPage).not.toContain('<div v-if="showVersionDrawer" class="edit-drawer-overlay"')
    expect(abilityListExecutionPage).not.toContain('class="edit-drawer version-drawer"')
  })

  it('uses the shared Button component for ability list publish confirmation actions', () => {
    expect(abilityListPublishConfirmPage).toContain('import { Button } from \'@/components/ui\'')
    expect(abilityListPublishConfirmPage).toContain('<Button variant="outline" @click="goBack">返回修改</Button>')
    expect(abilityListPublishConfirmPage).toContain('<Button')
    expect(abilityListPublishConfirmPage).toContain(':disabled="publishStatus === \'published\'"')
    expect(abilityListPublishConfirmPage).toContain('@click="handlePublish"')
    expect(abilityListPublishConfirmPage).not.toContain('<button class="btn-secondary" @click="goBack">返回修改</button>')
    expect(abilityListPublishConfirmPage).not.toContain('class="btn-primary"')
  })

  it('uses the shared Button component for ability list requirement mapping actions', () => {
    expect(abilityListRequirementMappingPage).toContain('<Button @click="addNewMapping">新增要求项</Button>')
    expect(abilityListRequirementMappingPage).toContain('<Button variant="ghost" size="sm" @click.stop="openEditDrawer(row)">编辑</Button>')
    expect(abilityListRequirementMappingPage).toContain('<Button variant="danger" size="sm" @click.stop="selectMapping(row); deleteMapping()">删除</Button>')
    expect(abilityListRequirementMappingPage).toContain('<Button @click="openEditDrawer(selectedMapping)">编辑映射</Button>')
    expect(abilityListRequirementMappingPage).toContain('<Button variant="danger" @click="deleteMapping">删除</Button>')
    expect(abilityListRequirementMappingPage).toContain('<Button variant="secondary" @click="confirmMapping">确认配置</Button>')
    expect(abilityListRequirementMappingPage).not.toContain('<button class="btn-primary" @click="addNewMapping">新增要求项</button>')
    expect(abilityListRequirementMappingPage).not.toContain('<button class="btn-link" @click.stop="openEditDrawer(mapping)">编辑</button>')
    expect(abilityListRequirementMappingPage).not.toContain('<button class="btn-link danger" @click.stop="selectMapping(mapping); deleteMapping()">删除</button>')
    expect(abilityListRequirementMappingPage).not.toContain('<button class="btn-primary" @click="openEditDrawer(selectedMapping)">编辑映射</button>')
    expect(abilityListRequirementMappingPage).not.toContain('<button class="btn-outline danger-outline" @click="deleteMapping">删除</button>')
    expect(abilityListRequirementMappingPage).not.toContain('<button class="btn-secondary" @click="confirmMapping">确认配置</button>')
  })

  it('uses DetailSheet for the ability list requirement mapping complex edit drawer', () => {
    expect(abilityListRequirementMappingPage).toContain('DetailSheet')
    expect(abilityListRequirementMappingPage).toContain('title="编辑要求项映射"')
    expect(abilityListRequirementMappingPage).toContain('width="complex"')
    expect(abilityListRequirementMappingPage).toContain('<template #footer>')
    expect(abilityListRequirementMappingPage).toContain('<h4 class="form-section-title"><span>1</span>基本信息</h4>')
    expect(abilityListRequirementMappingPage).toContain('<h4 class="form-section-title"><span>2</span>映射配置</h4>')
    expect(abilityListRequirementMappingPage).toContain('<h4 class="form-section-title"><span>3</span>对照依据</h4>')
    expect(abilityListRequirementMappingPage).toContain('<Button variant="danger" @click="deleteMapping">删除要求项</Button>')
    expect(abilityListRequirementMappingPage).toContain('<Button variant="outline" @click="closeEditDrawer">取消</Button>')
    expect(abilityListRequirementMappingPage).toContain('<Button @click="saveMapping">保存映射</Button>')
    expect(abilityListRequirementMappingPage).not.toContain('<div v-if="editingMapping" class="edit-drawer-overlay"')
  })

  it('uses the shared Button component for ability list base optimization actions', () => {
    expect(abilityListBaseOptimizationPage).toContain('import { Button } from \'@/components/ui\'')
    expect(abilityListBaseOptimizationPage).toContain("query: { optimization: '1' }")
    expect(abilityListBaseOptimizationPage).toContain('优化建议已合并到基准模板页')
    expect(abilityListBasePage).toContain('<Button @click="uploadPolicy">上传制度文件</Button>')
    expect(abilityListBasePage).toContain('<Button variant="secondary" @click="rerunAnalysis">重新分析运行反馈</Button>')
    expect(abilityListBasePage).toContain(':disabled="pendingApplicationCount === 0"')
    expect(abilityListBasePage).toContain('@click="applyToBaseTemplate"')
    expect(abilityListBasePage).toContain('<Button variant="ghost" size="sm" @click.stop="handleSuggestionAction(\'view\', row)">查看详情</Button>')
    expect(abilityListBasePage).toContain('<Button v-if="row.status === \'pending\'" size="sm" @click.stop="handleSuggestionAction(\'adopt\', row)">采纳</Button>')
    expect(abilityListBasePage).toContain('<Button v-if="row.status === \'pending\'" variant="secondary" size="sm" @click.stop="handleSuggestionAction(\'defer\', row)">暂缓</Button>')
    expect(abilityListBasePage).toContain('<Button v-if="row.status === \'pending\'" variant="danger" size="sm" @click.stop="handleSuggestionAction(\'reject\', row)">弃用</Button>')
    expect(abilityListBasePage).toContain('<Button v-if="row.status === \'adopted\'" size="sm" @click.stop="applyToBaseTemplate">应用</Button>')
    expect(abilityListBasePage).toContain('@click="handleSuggestionAction(\'adopt\', selectedSuggestion)"')
    expect(abilityListBasePage).toContain('@click="handleSuggestionAction(\'defer\', selectedSuggestion)"')
    expect(abilityListBaseOptimizationPage).not.toContain('<button class="btn-primary" @click="uploadPolicy">⇧ 上传制度文件</button>')
    expect(abilityListBaseOptimizationPage).not.toContain('<button class="btn-secondary" @click="rerunAnalysis">⟳ 重新分析运行反馈</button>')
    expect(abilityListBaseOptimizationPage).not.toContain('class="btn-link-large"')
    expect(abilityListBaseOptimizationPage).not.toContain('class="btn-link"')
    expect(abilityListBaseOptimizationPage).not.toContain('class="btn-primary"')
    expect(abilityListBaseOptimizationPage).not.toContain('class="btn-secondary"')
  })

  it('keeps the ability list base optimization page aligned to the target admin shell', () => {
    expect(abilityListBasePage).toContain('optimization-workspace')
    expect(abilityListBasePage).toContain('优化建议')
    expect(abilityListBasePage).toContain('建议来源')
    expect(abilityListBasePage).toContain('建议详情')
    expect(abilityListBasePage).toContain('scrollToOptimization')
    expect(abilityListBaseOptimizationPage).not.toContain('class="page-breadcrumb"')
    expect(abilityListBaseOptimizationPage).not.toContain('class="page-description"')
    expect(abilityListBaseOptimizationPage).not.toMatch(/<div class="hero-art" aria-hidden="true">\s*<span><\/span>/)
  })

  it('keeps admin topbar breadcrumbs navigable except for the current page', () => {
    expect(adminTopbar).toContain('import { RouterLink, useRoute } from \'vue-router\'')
    expect(adminTopbar).toContain('breadcrumbLinkMap')
    expect(adminTopbar).toContain('<RouterLink')
    expect(adminTopbar).toContain(':to="item.to"')
    expect(adminTopbar).toContain('class="breadcrumb-link"')
    expect(adminTopbar).toContain('class="current"')
  })

  it('keeps ability list base hero actions as a guided optimization entry', () => {
    expect(abilityListBasePage).toContain('optimizationPendingCount')
    expect(abilityListBasePage).toContain('scrollToOptimization')
    expect(abilityListBasePage).toContain('优化建议（{{ optimizationPendingCount }}）')
    expect(abilityListBasePage).not.toContain('>\\n                优化基准板\\n              </Button>')
  })

  it('clips the ability list base hero art edge outside the card', () => {
    expect(abilityListBasePage).toContain('<img :src="baseHeroArt" alt="" />')
    expect(abilityListBasePage).toContain('width: min(46%, 680px)')
    expect(abilityListBasePage).toContain('right: -72px')
    expect(abilityListBasePage).toContain('object-fit: contain')
    expect(abilityListBasePage).toContain('opacity: 0.82')
  })

  it('uses the shared Button component for ability profile group actions', () => {
    expect(abilityProfileGroupPage).toContain('import { Button } from \'@/components/ui\'')
    expect(abilityProfileGroupPage).toContain('<Button variant="outline" @click="viewFullAdvice">')
    expect(abilityProfileGroupPage).toContain('<Button variant="ghost" size="sm" @click="viewProfile(row.name)">查看画像</Button>')
    expect(abilityProfileGroupPage).toContain('const focusedGroupObject = ref(focusData[focusObjects.value][0]?.name ?? \'\')')
    expect(abilityProfileGroupPage).toContain('focusObjects.value = targetTab')
    expect(abilityProfileGroupPage).toContain('focusedGroupObject.value = name')
    expect(abilityProfileGroupPage).not.toContain('暂无独立画像页面')
    expect(abilityProfileGroupPage).not.toContain('<button class="btn-primary" @click="viewFullAdvice">')
    expect(abilityProfileGroupPage).not.toContain('<button class="btn-link" @click="viewProfile(item.name)">查看画像</button>')
  })

  it('keeps ability profile teacher pagination bound to filtered local data', () => {
    expect(abilityProfileTeacherPage).toContain('const total = computed(() => filteredTeachers.value.length)')
    expect(abilityProfileTeacherPage).toContain('const paginatedTeachers = computed(() =>')
    expect(abilityProfileTeacherPage).toContain('v-for="(teacher, index) in paginatedTeachers"')
    expect(abilityProfileTeacherPage).toContain('function goToPage(page: number)')
    expect(abilityProfileTeacherPage).not.toContain('const total = 142')
    expect(abilityProfileTeacherPage).not.toContain('<button type="button">2</button>')
    expect(abilityProfileTeacherPage).not.toContain('<button type="button">3</button>')
  })

  it('uses DetailSheet for the ability list base edit drawer shell', () => {
    expect(abilityListBasePage).toContain('DetailSheet')
    expect(abilityListBasePage).toContain('<DetailSheet')
    expect(abilityListBasePage).toContain('title="编辑基准模板指标"')
    expect(abilityListBasePage).toContain('width="form"')
    expect(abilityListBasePage).not.toContain('<div v-if="editingIndicator" class="edit-drawer-overlay"')
  })

  it('uses DetailSheet for the ability list base version history drawer shell', () => {
    expect(abilityListBasePage).toContain('title="基准模板版本记录"')
    expect(abilityListBasePage).toContain('width="history"')
    expect(abilityListBasePage).toContain(':show-footer="false"')
    expect(abilityListBasePage).toContain('pendingChangeRows')
    expect(abilityListBasePage).toContain('发布新版本（{{ pendingChangeRows.length }}）')
    expect(abilityListBasePage).toContain('@click="publishNewBaseTemplateVersion"')
    expect(abilityListBasePage).toContain('version.versionNo')
    expect(abilityListBasePage).toContain('version.updatedAt')
    expect(abilityListBasePage).toContain('version.changeSummary')
    expect(abilityListBasePage).toContain('version.operator')
    expect(abilityListBasePage).not.toContain('<div v-if="showVersionDrawer" class="edit-drawer-overlay"')
  })
  it('guards ability list base indicator filtering and required edit validation', () => {
    expect(abilityListBasePage).toContain('filteredIndicators')
    expect(abilityListBasePage).toContain('indicator.abilityKey === selectedAbility.value')
    expect(abilityListBasePage).toContain('validateIndicatorEdit')
    expect(abilityListBasePage).toContain('editErrors')
    expect(abilityListBasePage).toContain('aria-invalid')
    expect(abilityListBasePage).toContain('required-mark')
    expect(abilityListBasePage).toContain('请输入指标名称')
    expect(abilityListBasePage).toContain('请输入建议依据')
  })

  it('guards ability list execution indicator filtering', () => {
    expect(abilityListExecutionPage).toContain('filteredIndicators')
    expect(abilityListExecutionPage).toContain('indicator.abilityKey === selectedAbility.value')
    expect(abilityListExecutionPage).toContain('pendingExecutionChangeRows')
    expect(abilityListExecutionPage).toContain('confirmExecutionAdjustments')
    expect(abilityListExecutionPage).toContain('discardExecutionAdjustments')
    expect(abilityListExecutionPage).toContain('确认调整（{{ pendingExecutionChangeRows.length }}）')
    expect(abilityListExecutionPage).toContain('撤回调整')
    expect(abilityListExecutionPage).toContain('@select-ability="selectAbility"')
    expect(abilityListExecutionPage).toContain(':indicators="filteredIndicators"')
    expect(abilityListExecutionPage).toContain('const defaultAbilityKey = normalizedAbilityTree[0]?.children?.[0]?.key ?? defaultAbilityGroupKey')
    expect(abilityListExecutionPage).toContain('const selectedAbility = ref(defaultAbilityKey)')
    expect(abilityListExecutionPage).toContain(':default-expanded-keys="[defaultAbilityGroupKey]"')
    expect(abilityListExecutionPage).not.toContain("const selectedAbility = ref('teaching-implementation')")
    expect(abilityListExecutionPage).not.toContain(':default-expanded-keys="[\'teaching\']"')
  })

  it('keeps ability list publish confirmation free of automatic version derivation', () => {
    expect(abilityListPublishConfirmPage).not.toContain('deriveNextExecutionVersion')
    expect(abilityListPublishConfirmPage).toContain('发布准备来自执行版页面的“派生下一周期执行版”操作')
  })

  it('keeps requirement mapping data scoped to the selected requirement object', () => {
    expect(abilityListRequirementMappingPage).toContain('filteredMappings')
    expect(abilityListRequirementMappingPage).toContain('getRequirementMappingsForGroup(selectedGroup.value)')
    expect(abilityListRequirementMappingPage).toContain(':data="filteredMappings"')
    expect(abilityListRequirementMappingPage).toContain('requirementGroupKey: selectedGroup.value')
    expect(abilityListRequirementMappingPage).not.toContain('+ 17')
    expect(abilityListRequirementMappingPage).not.toContain('+ 3')
  })

  it('shows current execution version evidence on ability profile pages', () => {
    expect(abilityProfileGroupPage).toContain('currentExecutionVersionTitle')
    expect(abilityProfileGroupPage).toContain('当前执行版：{{ currentExecutionVersionTitle }}')
    expect(abilityProfileTeacherDetailPage).toContain('currentExecutionVersionTitle')
    expect(abilityProfileTeacherDetailPage).toContain('当前执行版：{{ currentExecutionVersionTitle }}')
  })

  it('defaults the base ability list to the first ability element', () => {
    expect(abilityListBasePage).toContain('const defaultAbilityKey = abilityTree[0]?.children?.[0]?.key ?? defaultAbilityGroupKey')
    expect(abilityListBasePage).toContain('const selectedAbility = ref(defaultAbilityKey)')
    expect(abilityListBasePage).toContain(':default-expanded-keys="[defaultAbilityGroupKey]"')
    expect(abilityListBasePage).not.toContain("const selectedAbility = ref('teaching-implementation')")
    expect(abilityListBasePage).not.toContain(':default-expanded-keys="[\'teaching\']"')
  })

  it('uses DetailSheet for archive source records while preserving source filters', () => {
    expect(archiveTeacherDetailPage).toContain('DetailSheet')
    expect(archiveTeacherDetailPage).toContain('<DetailSheet')
    expect(archiveTeacherDetailPage).toContain(':title="drawerTitle"')
    expect(archiveTeacherDetailPage).toContain('width="source"')
    expect(archiveTeacherDetailPage).toContain('placement="reader"')
    expect(archiveTeacherDetailPage).toContain(':show-footer="false"')
    expect(archiveTeacherDetailPage).toContain('v-for="tab in tabs"')
    expect(archiveTeacherDetailPage).toContain('{{ tab.label }} {{ tab.count }}')
    expect(archiveTeacherDetailPage).toContain('filteredRecords()')
    expect(archiveTeacherDetailPage).toContain('record.source')
    expect(archiveTeacherDetailPage).toContain('record.status')
    expect(archiveTeacherDetailPage).toContain('record.archiveTime')
    expect(archiveTeacherDetailPage).toContain('viewRecordDetail(record)')
    expect(archiveTeacherDetailPage).not.toContain('<div v-if="drawerOpen" class="drawer-overlay"')
  })

  it('opens archive source records from a selected archive fact', () => {
    expect(archiveTeacherDetailPage).toContain('function openDrawerForFact')
    expect(archiveTeacherDetailPage).toContain('@click="openDrawerForFact(fact)"')
    expect(archiveTeacherDetailPage).toContain('selectedFactId')
    expect(archiveTeacherDetailPage).toContain('fact.id === selectedFactId.value')
    expect(archiveTeacherDetailPage).toContain('getArchiveSourceRecordsForFact(fact.id)')
  })

  it('uses the shared Button component for archive teacher detail actions', () => {
    expect(archiveTeacherDetailPage).toContain('import { Button } from \'@/components/ui\'')
    expect(archiveTeacherDetailPage).toContain('<Button class="archive-back-action" variant="ghost" @click="goBack">')
    expect(archiveTeacherDetailPage).toContain('<Button class="archive-toolbar-action" variant="outline" @click="printArchive">打印</Button>')
    expect(archiveTeacherDetailPage).toContain('<Button class="archive-toolbar-action" variant="outline" @click="exportPdf">导出 PDF</Button>')
    expect(archiveTeacherDetailPage).toContain('<Button class="archive-toolbar-action" variant="outline" @click="goBack">关闭</Button>')
    expect(archiveTeacherDetailPage).toContain('<Button class="source-record-action" variant="ghost" @click="openDrawer(\'基本信息\')">')
    expect(archiveTeacherDetailPage).toContain('<Button class="source-record-action" variant="ghost" @click="openDrawer(\'教学工作\')">')
    expect(archiveTeacherDetailPage).toContain('<Button class="source-record-detail-action" variant="outline" size="sm" @click="viewRecordDetail(record)">')
    expect(archiveTeacherDetailPage).not.toContain('class="btn-back"')
    expect(archiveTeacherDetailPage).not.toContain('class="btn-action"')
    expect(archiveTeacherDetailPage).not.toContain('class="btn-source"')
    expect(archiveTeacherDetailPage).not.toContain('class="btn-detail"')
    expect(archiveTeacherDetailPage).not.toContain('<button class="btn-back" @click="goBack">')
    expect(archiveTeacherDetailPage).not.toContain('<button class="btn-action" @click="printArchive">打印</button>')
    expect(archiveTeacherDetailPage).not.toContain('<button class="btn-action" @click="exportPdf">导出 PDF</button>')
    expect(archiveTeacherDetailPage).not.toContain('<button class="btn-action" @click="goBack">关闭</button>')
    expect(archiveTeacherDetailPage).not.toContain('<button class="btn-source" @click="openDrawer')
    expect(archiveTeacherDetailPage).not.toContain('<button class="btn-detail" @click="viewRecordDetail(record)">')
  })

  it('does not keep legacy btn-prefixed structural classes in archive processing styles', () => {
    expect(archiveProcessingPage).not.toContain('.btn-icon')
  })

  it('uses DetailSheet for the training plan create drawer shell', () => {
    expect(trainingPlanPage).toContain('DetailSheet')
    expect(trainingPlanPage).toContain('<DetailSheet')
    expect(trainingPlanPage).toContain('title="新建培训计划"')
    expect(trainingPlanPage).toContain('width="md"')
    expect(trainingPlanPage).toContain('<template #footer>')
    expect(trainingPlanPage).toContain('saveDraft')
    expect(trainingPlanPage).toContain('saveAndPublish')
    expect(trainingPlanPage).not.toContain('<div v-if="showDrawer" class="drawer-overlay"')
  })

  it('uses the shared Button component for training plan drawer footer actions', () => {
    expect(trainingPlanPage).toContain('import { Button } from \'@/components/ui\'')
    expect(trainingPlanPage).toContain('<Button class="flex-1" variant="outline" @click="closeDrawer">取消</Button>')
    expect(trainingPlanPage).toContain('<Button class="flex-1" variant="secondary" @click="saveDraft">保存草稿</Button>')
    expect(trainingPlanPage).toContain('<Button class="flex-1" @click="saveAndPublish">保存并发布</Button>')
    expect(trainingPlanPage).not.toContain('<button class="btn-secondary" @click="closeDrawer">取消</button>')
    expect(trainingPlanPage).not.toContain('<button class="btn-secondary" @click="saveDraft">保存草稿</button>')
    expect(trainingPlanPage).not.toContain('<button class="btn-primary" @click="saveAndPublish">保存并发布</button>')
  })

  it('uses the shared Button component for training filter and create actions', () => {
    expect(trainingPlanPage).toContain('import { Button } from \'@/components/ui\'')
    expect(trainingPlanPage).toContain('<Button class="create-plan-action" @click="openDrawer">')
    expect(trainingPlanPage).toContain('<AdminIcon name="plus" />')
    expect(trainingPlanPage).toContain('新建培训计划')
    expect(trainingPlanPage).toContain('<Button variant="outline" @click="resetFilters">重置</Button>')
    expect(trainingPlanPage).not.toContain('<button class="btn-reset" @click="resetFilters">重置</button>')
    expect(trainingPlanPage).not.toContain('<button class="btn-primary btn-create" @click="openDrawer">新建培训计划 ＋</button>')

    expect(trainingRecordPage).toContain('import { Button } from \'@/components/ui\'')
    expect(trainingRecordPage).toContain('<Button variant="outline" @click="resetFilters">重置</Button>')
    expect(trainingRecordPage).not.toContain('<button class="btn-reset" @click="resetFilters">重置</button>')

    expect(trainingResourcePage).toContain('import { Button } from \'@/components/ui\'')
    expect(trainingResourcePage).toContain('<Button variant="outline" @click="resetFilters">重置</Button>')
    expect(trainingResourcePage).toContain('<Button variant="secondary" @click="applyFilters">查询</Button>')
    expect(trainingResourcePage).toContain('<Button class="resource-create-action" @click="addResource">')
    expect(trainingResourcePage).toContain('<AdminIcon name="plus" />')
    expect(trainingResourcePage).toContain('新增资源')
    expect(trainingResourcePage).not.toContain('<button class="btn-reset" @click="resetFilters">重置</button>')
    expect(trainingResourcePage).not.toContain('<button class="btn-secondary" @click="applyFilters">查询</button>')
    expect(trainingResourcePage).not.toContain('<button class="btn-primary" @click="addResource">＋ 新增资源</button>')

    expect(trainingDemandPage).toContain('import { Button } from \'@/components/ui\'')
    expect(trainingDemandPage).toContain('<Button type="button" @click="addDemand">')
    expect(trainingDemandPage).toContain('<AdminIcon name="plus" />')
    expect(trainingDemandPage).toContain('新增需求')
    expect(trainingDemandPage).toContain('<Button variant="outline" @click="resetFilters">重置</Button>')
    expect(trainingDemandPage).toContain('<Button variant="secondary" @click="applyFilters">查询</Button>')
    expect(trainingDemandPage).not.toContain('<button class="btn-reset" @click="resetFilters">重置</button>')
    expect(trainingDemandPage).not.toContain('<button class="btn-primary" type="button" @click="addDemand">＋ 新增需求</button>')
    expect(trainingDemandPage).not.toContain('<button class="btn-secondary" @click="applyFilters">查询</button>')

    expect(trainingApplicationPage).toContain('import { Button } from \'@/components/ui\'')
    expect(trainingApplicationPage).toContain('<Button variant="outline" type="button" @click="resetFilters">重置</Button>')
    expect(trainingApplicationPage).toContain('<Button variant="secondary" type="button" @click="applyFilters">查询</Button>')
    expect(trainingApplicationPage).not.toContain('<button class="btn-reset" type="button" @click="resetFilters">重置</button>')
    expect(trainingApplicationPage).not.toContain('<button class="btn-primary" type="button" @click="applyFilters">查询</button>')
  })

  it('uses the shared Button component for practice filter actions', () => {
    expect(practiceApplicationPage).toContain('import { Button } from \'@/components/ui\'')
    expect(practiceApplicationPage).toContain('<Button variant="outline" @click="resetFilters">重置</Button>')
    expect(practiceApplicationPage).toContain('<Button @click="applyFilters">查询</Button>')
    expect(practiceApplicationPage).not.toContain('<button class="btn-reset" @click="resetFilters">重置</button>')
    expect(practiceApplicationPage).not.toContain('<button class="btn-primary" @click="applyFilters">查询</button>')

    expect(practiceRecordPage).toContain('import { Button } from \'@/components/ui\'')
    expect(practiceRecordPage).toContain('<Button variant="outline" @click="resetFilters">重置</Button>')
    expect(practiceRecordPage).toContain('<Button variant="secondary" @click="applyFilters">查询</Button>')
    expect(practiceRecordPage).not.toContain('<button class="btn-reset" @click="resetFilters">重置</button>')
    expect(practiceRecordPage).not.toContain('<button class="btn-secondary" @click="applyFilters">查询</button>')

    expect(practiceTrackingPage).toContain('import { Button } from \'@/components/ui\'')
    expect(practiceTrackingPage).toContain('<Button variant="outline" @click="resetFilters">重置</Button>')
    expect(practiceTrackingPage).toContain('<Button variant="secondary" @click="applyFilters">查询</Button>')
    expect(practiceTrackingPage).not.toContain('<button class="btn-reset" @click="resetFilters">重置</button>')
    expect(practiceTrackingPage).not.toContain('<button class="btn-secondary" @click="applyFilters">查询</button>')
  })

  it('uses the shared Button component for practice view-only row actions', () => {
    expect(practiceApplicationPage).toContain('<Button variant="ghost" size="sm" @click="viewApplication(row.id)">')
    expect(practiceApplicationPage).toContain('router.push(`/admin/practice/records?recordId=${record.id}`)')
    expect(practiceApplicationPage).not.toContain('<button class="btn-view" @click="viewApplication(app.id)">')
    expect(practiceApplicationPage).not.toContain('class="btn-view"\n                          @click="viewApplication(app.id)"')

    expect(practiceRecordPage).toContain('const route = useRoute()')
    expect(practiceRecordPage).toContain('const activeRecordId = ref(String(route.query.recordId || \'1\'))')
    expect(practiceRecordPage).toContain('<Button variant="ghost" size="sm" @click="viewDetail(row.id)">')
    expect(practiceRecordPage).toContain('v-if="row.currentStatus === \'已归档\'"')
    expect(practiceRecordPage).toContain('@click="viewArchive(row.id)"')
    expect(practiceRecordPage).toContain('router.push(`/admin/archive/processing?recordId=practice-${id}`)')
    expect(archiveProcessingPage).toContain('const route = useRoute()')
    expect(archiveProcessingPage).toContain('const selectedRecordId = ref(String(route.query.recordId || \'2\'))')
    expect(practiceRecordPage).not.toContain('<button class="btn-view" @click="viewDetail(record.id)">')
    expect(practiceRecordPage).not.toContain('class="btn-archive"\n                          @click="viewArchive(record.id)"')

    expect(practiceTrackingPage).toContain('variant="ghost"')
    expect(practiceTrackingPage).toContain('size="sm"')
    expect(practiceTrackingPage).toContain('@click="viewRecord(row.id)"')
    expect(practiceTrackingPage).toContain('router.push(`/admin/practice/records?recordId=${record.id}`)')
    expect(practiceTrackingPage).not.toContain('class="btn-view"\n                        @click="viewRecord(tracking.id)"')
  })

  it('uses the shared Button component for practice export actions', () => {
    expect(practiceRecordPage).toContain('<Button @click="exportRecords">')
    expect(practiceRecordPage).toContain('<AdminIcon name="upload" />')
    expect(practiceRecordPage).toContain('导出记录')
    expect(practiceRecordPage).not.toContain('<button class="btn-primary" @click="exportRecords">⇩ 导出记录</button>')

    expect(practiceTrackingPage).toContain('<Button @click="exportList">')
    expect(practiceTrackingPage).toContain('<AdminIcon name="upload" />')
    expect(practiceTrackingPage).toContain('导出名单')
    expect(practiceTrackingPage).not.toContain('<button class="btn-primary" @click="exportList">⇧ 导出名单</button>')
  })

  it('uses the shared Button component for practice state-changing row actions', () => {
    expect(practiceApplicationPage).toContain('class="row-action-group"')
    expect(practiceApplicationPage).toContain('<Button size="sm" @click="approveApplication(row.id)">同意</Button>')
    expect(practiceApplicationPage).toContain('<Button variant="danger" size="sm" @click="returnApplication(row.id)">')
    expect(practiceApplicationPage).not.toContain('class="btn-action-group"')
    expect(practiceApplicationPage).not.toContain('class="btn-approve"')
    expect(practiceApplicationPage).not.toContain('class="btn-return"')

    expect(practiceRecordPage).toContain('class="row-action-group"')
    expect(practiceRecordPage).toContain('variant="secondary"')
    expect(practiceRecordPage).toContain('size="sm"')
    expect(practiceRecordPage).toContain('@click="remindMaterial(row.id)"')
    expect(practiceRecordPage).toContain('<Button')
    expect(practiceRecordPage).toContain('@click="confirmArchive(row.id)"')
    expect(practiceRecordPage).not.toContain('class="btn-action-group"')
    expect(practiceRecordPage).not.toContain('class="btn-remind"')
    expect(practiceRecordPage).not.toContain('class="btn-confirm"')

    expect(practiceTrackingPage).toContain('v-if="row.currentProgress === \'未启动申请\'"')
    expect(practiceTrackingPage).toContain('variant="secondary"')
    expect(practiceTrackingPage).toContain('@click="remindApply(row.id)"')
    expect(practiceTrackingPage).not.toContain('class="btn-remind"')
  })

  it('uses the shared Button component for virtual lab room detail actions', () => {
    expect(virtualLabRoomPage).toContain('<Button @click="viewDetail(room.id)">查看详情</Button>')
    expect(virtualLabRoomPage).toContain('<Button variant="ghost" size="sm" @click="viewDetail(row.id)">查看详情</Button>')
    expect(virtualLabRoomPage).not.toContain('<button class="btn-detail" @click="viewDetail(room.id)">查看详情</button>')
    expect(virtualLabRoomPage).not.toContain('<button class="btn-view" @click="viewDetail(room.id)">查看详情</button>')
  })

  it('uses the shared Button component for virtual lab room detail page actions', () => {
    expect(virtualLabRoomDetailPage).toContain('import { Button } from \'@/components/ui\'')
    expect(virtualLabRoomDetailPage).toContain('<Button variant="outline" @click="editInfo">编辑信息</Button>')
    expect(virtualLabRoomDetailPage).toContain('<Button @click="inviteTeacher">邀请教师</Button>')
    expect(virtualLabRoomDetailPage).toContain('<Button variant="secondary" @click="createActivity">新建教研活动</Button>')
    expect(virtualLabRoomDetailPage).toContain('<Button size="sm" @click="inviteTeacher">邀请教师</Button>')
    expect(virtualLabRoomDetailPage).toContain('<Button variant="ghost" size="sm" @click="viewTeacher(row.id)">查看教师</Button>')
    expect(virtualLabRoomDetailPage).toContain('v-if="row.role !== \'负责人\'"')
    expect(virtualLabRoomDetailPage).toContain('variant="danger"')
    expect(virtualLabRoomDetailPage).toContain('@click="removeMember(row.id)"')
    expect(virtualLabRoomDetailPage).toContain('<Button variant="ghost" size="sm" @click="viewActivity(row.id)">查看活动</Button>')
    expect(virtualLabRoomDetailPage).toContain('<Button variant="outline" @click="viewRecord(record.id)">查看记录</Button>')
    expect(virtualLabRoomDetailPage).not.toContain('<button class="btn-secondary" @click="editInfo">编辑信息</button>')
    expect(virtualLabRoomDetailPage).not.toContain('<button class="btn-primary" @click="inviteTeacher">邀请教师</button>')
    expect(virtualLabRoomDetailPage).not.toContain('<button class="btn-small" @click="inviteTeacher">邀请教师</button>')
    expect(virtualLabRoomDetailPage).not.toContain('<button class="btn-link" @click="viewTeacher(member.id)">查看教师</button>')
    expect(virtualLabRoomDetailPage).not.toContain('<button class="btn-link" @click="viewActivity(activity.id)">查看活动</button>')
    expect(virtualLabRoomDetailPage).not.toContain('<button class="btn-secondary" @click="viewRecord(record.id)">查看记录</button>')
  })

  it('uses the shared Button component for virtual lab activity detail page actions', () => {
    expect(virtualLabActivityDetailPage).toContain('import { computed, ref } from \'vue\'')
    expect(virtualLabActivityDetailPage).toContain('import { Button } from \'@/components/ui\'')
    expect(virtualLabActivityDetailPage).toContain('const selectedMaterialId = ref')
    expect(virtualLabActivityDetailPage).toContain('const selectedMaterial = computed')
    expect(virtualLabActivityDetailPage).toContain('const showAllParticipants = ref(false)')
    expect(virtualLabActivityDetailPage).toContain('const displayedParticipants = computed')
    expect(virtualLabActivityDetailPage).toContain('function showAllActivityParticipants()')
    expect(virtualLabActivityDetailPage).toContain('showAllParticipants.value = true')
    expect(virtualLabActivityDetailPage).toContain('selectedMaterialId.value = id')
    expect(virtualLabActivityDetailPage).toContain(':row-class-name="materialRowClassName"')
    expect(virtualLabActivityDetailPage).toContain('v-if="selectedMaterial" class="material-detail-panel"')
    expect(virtualLabActivityDetailPage).toContain('资料详情：{{ selectedMaterial.name }}')
    expect(virtualLabActivityDetailPage).toContain('async function copyMeetingNo()')
    expect(virtualLabActivityDetailPage).toContain('await navigator.clipboard.writeText(activityInfo.value.meetingNo)')
    expect(virtualLabActivityDetailPage).toContain('<button class="copy-button" @click="copyMeetingNo">⧉</button>')
    expect(virtualLabActivityDetailPage).toContain('<Button variant="outline" @click="editActivity">编辑活动</Button>')
    expect(virtualLabActivityDetailPage).toContain('<Button @click="viewMeetingRecord">查看会议记录</Button>')
    expect(virtualLabActivityDetailPage).toContain('<Button v-if="!showAllParticipants" variant="ghost" @click="showAllActivityParticipants">查看全部({{ participants.length }}) ›</Button>')
    expect(virtualLabActivityDetailPage).toContain(':data="displayedParticipants"')
    expect(virtualLabActivityDetailPage).toContain('<Button variant="ghost" size="sm" @click="viewMaterial(row.id)">查看</Button>')
    expect(virtualLabActivityDetailPage).toContain('<Button @click="viewRecord">查看记录 →</Button>')
    expect(virtualLabActivityDetailPage).toContain('<Button @click="viewRecord">形成并查看记录 →</Button>')
    expect(virtualLabActivityDetailPage).not.toContain('<button class="btn-secondary" @click="editActivity">编辑活动</button>')
    expect(virtualLabActivityDetailPage).not.toContain('<button class="btn-primary" @click="viewMeetingRecord">查看会议记录</button>')
    expect(virtualLabActivityDetailPage).not.toContain('@click="operationMessage.set(\'会议号已复制。\')"')
    expect(virtualLabActivityDetailPage).not.toContain('@click="operationMessage.set(\'已展示全部 18 位参与教师。\')"')
    expect(virtualLabActivityDetailPage).not.toContain('<button class="btn-link" @click="operationMessage.set(\'已展示全部 18 位参与教师。\')">查看全部(18) ›</button>')
    expect(virtualLabActivityDetailPage).not.toContain('<button class="btn-link" @click="viewMaterial(material.id)">查看</button>')
    expect(virtualLabActivityDetailPage).not.toContain('<button class="btn-primary" @click="viewRecord">查看记录 →</button>')
    expect(virtualLabActivityDetailPage).not.toContain('<button class="btn-primary" @click="viewRecord">形成并查看记录 →</button>')
  })

  it('uses the shared Button component for virtual lab record detail page actions', () => {
    expect(virtualLabRecordDetailPage).toContain('import { computed, ref } from \'vue\'')
    expect(virtualLabRecordDetailPage).toContain('import { Button } from \'@/components/ui\'')
    expect(virtualLabRecordDetailPage).toContain('const selectedMaterialId = ref')
    expect(virtualLabRecordDetailPage).toContain('const selectedMaterial = computed')
    expect(virtualLabRecordDetailPage).toContain('const showAllParticipants = ref(false)')
    expect(virtualLabRecordDetailPage).toContain('const displayedParticipationRecords = computed')
    expect(virtualLabRecordDetailPage).toContain('function showAllRecordParticipants()')
    expect(virtualLabRecordDetailPage).toContain('showAllParticipants.value = true')
    expect(virtualLabRecordDetailPage).toContain('selectedMaterialId.value = id')
    expect(virtualLabRecordDetailPage).toContain(':row-class-name="materialRowClassName"')
    expect(virtualLabRecordDetailPage).toContain('v-if="selectedMaterial" class="material-detail-panel"')
    expect(virtualLabRecordDetailPage).toContain('来源资料详情：{{ selectedMaterial.name }}')
    expect(virtualLabRecordDetailPage).toContain('<Button variant="outline" @click="viewSourceActivity">查看来源活动</Button>')
    expect(virtualLabRecordDetailPage).toContain('<Button @click="viewSourceMaterials">查看来源资料</Button>')
    expect(virtualLabRecordDetailPage).toContain('<Button @click="sendToArchive">生成档案待确认</Button>')
    expect(virtualLabRecordDetailPage).toContain('router.push(`/admin/archive/processing?recordId=virtual-lab-${recordId.value}`)')
    expect(virtualLabRecordDetailPage).toContain('<Button v-if="!showAllParticipants" variant="ghost" @click="showAllRecordParticipants">查看全部 ›</Button>')
    expect(virtualLabRecordDetailPage).toContain(':data="displayedParticipationRecords"')
    expect(virtualLabRecordDetailPage).toContain('<Button variant="ghost" size="sm" @click="viewMaterial(row.id)">查看</Button>')
    expect(virtualLabRecordDetailPage).not.toContain('<button class="btn-secondary" @click="viewSourceActivity">查看来源活动</button>')
    expect(virtualLabRecordDetailPage).not.toContain('<button class="btn-primary" @click="viewSourceMaterials">查看来源资料</button>')
    expect(virtualLabRecordDetailPage).not.toContain('<button class="btn-primary" @click="sendToArchive">生成档案待确认</button>')
    expect(virtualLabRecordDetailPage).not.toContain('@click="operationMessage.set(\'已展示全部参与教师入口。\')"')
    expect(virtualLabRecordDetailPage).not.toContain('<button class="btn-link" @click="operationMessage.set(\'已展示全部参与教师入口。\')">查看全部 ›</button>')
    expect(virtualLabRecordDetailPage).not.toContain('<button class="btn-link" @click="viewMaterial(material.id)">查看</button>')
  })

  it('uses the shared Button component for reflection and report filter actions', () => {
    expect(reflectionOverviewPage).toContain('import { Button } from \'@/components/ui\'')
    expect(reflectionOverviewPage).toContain('<Button class="reflection-reset-action" variant="outline" @click="resetFilters">重置</Button>')
    expect(reflectionOverviewPage).not.toContain('<button class="btn-reset" @click="resetFilters">重置</button>')

    expect(reportCenterPage).toContain('import { Button } from \'@/components/ui\'')
    expect(reportCenterPage).toContain('<Button variant="outline" size="icon" title="查询" @click="applyFilters">⌕</Button>')
    expect(reportCenterPage).toContain('<Button variant="outline" @click="resetFilters">重置</Button>')
    expect(reportCenterPage).not.toContain('<button class="icon-button" title="查询" @click="applyFilters">⌕</button>')
    expect(reportCenterPage).not.toContain('<button class="btn-reset" @click="resetFilters">重置</button>')
  })

  it('uses the shared Button component for reflection row and related-record actions', () => {
    expect(reflectionOverviewPage).toContain('<Button variant="ghost" size="sm" @click="viewDetail(row.id)">')
    expect(reflectionOverviewPage).toContain('<Button class="related-records-action" variant="outline" size="lg" @click="viewRelatedRecords">')
    expect(reflectionOverviewPage).not.toContain('<button class="btn-view" @click="viewDetail(reflection.id)">')
    expect(reflectionOverviewPage).not.toContain('<button class="btn-view-related" @click="viewRelatedRecords">')

    expect(reflectionDetailPage).toContain('import { Button } from \'@/components/ui\'')
    expect(reflectionDetailPage).toContain('<Button class="detail-back-action" variant="ghost" @click="goBack">‹ 返回列表</Button>')
    expect(reflectionDetailPage).toContain('<Button variant="ghost" size="sm" @click="viewRelatedDetail(row.id)">')
    expect(reflectionDetailPage).toContain('<Button variant="ghost" @click="viewMoreRelated">')
    expect(reflectionDetailPage).toContain('<Button class="source-data-action" variant="outline" size="lg" @click="viewSourceData">')
    expect(reflectionDetailPage).toContain('sendReflectionToArchive(reflectionId)')
    expect(reflectionDetailPage).toContain('<Button class="archive-send-action" variant="outline" size="lg" @click="sendToArchive">')
    expect(reflectionDetailPage).not.toContain('<button class="btn-back" @click="goBack">‹ 返回列表</button>')
    expect(reflectionDetailPage).not.toContain('<button class="btn-view" @click="viewRelatedDetail(related.id)">')
    expect(reflectionDetailPage).not.toContain('<button class="btn-link" @click="viewMoreRelated">')
    expect(reflectionDetailPage).not.toContain('<button class="btn-source" @click="viewSourceData">')
    expect(reflectionDetailPage).not.toContain('已进入{{ reflectionDetail.destination }}')
  })

  it('uses the shared Button component for training plan table row actions', () => {
    expect(trainingPlanPage).toContain('<Button variant="ghost" size="sm" @click="viewDetail(row.id)">')
    expect(trainingPlanPage).not.toContain('<button class="btn-view" @click="viewDetail(plan.id)">')
  })

  it('does not keep remaining btn-prefixed report and training plan action classes', () => {
    expect(reportCenterPage).toContain('<Button')
    expect(reportCenterPage).toContain('class="report-card-action"')
    expect(reportCenterPage).toContain('@click="handleCardAction(report.id, button)"')
    expect(reportCenterPage).toContain('const matchesPeriod = selectedPeriod.value === \'全部\' || report.period === selectedPeriod.value')
    expect(reportCenterPage).toContain('const selectedPeriod = ref(\'全部\')')
    expect(reportCenterPage).toContain('<span><b>周期：</b>{{ report.period }}</span>')
    expect(reportCenterPage).not.toContain('class="btn-action"')
    expect(reportCenterPage).not.toContain('.btn-action')

    expect(trainingPlanPage).toContain('<Button class="create-plan-action" @click="openDrawer">')
    expect(trainingPlanPage).toContain('<AdminIcon name="plus" />')
    expect(trainingPlanPage).not.toContain('class="btn-create"')
    expect(trainingPlanPage).not.toContain('.btn-create')
  })

  it('uses the shared Button component for training plan detail participant actions', () => {
    expect(trainingPlanDetailPage).toContain('import { Button } from \'@/components/ui\'')
    expect(trainingPlanDetailPage).toContain('<Button class="detail-back-action" variant="ghost" @click="goBack">‹ 返回列表</Button>')
    expect(trainingPlanDetailPage).toContain('variant="ghost"')
    expect(trainingPlanDetailPage).toContain('@click="viewTeacherDetail(row.id)"')
    expect(trainingPlanDetailPage).toContain('<Button')
    expect(trainingPlanDetailPage).toContain('v-if="row.applicationStatus === \'待处理\'"')
    expect(trainingPlanDetailPage).toContain('variant="secondary"')
    expect(trainingPlanDetailPage).toContain('size="sm"')
    expect(trainingPlanDetailPage).toContain('@click="handleApplication(row.id)"')
    expect(trainingPlanDetailPage).not.toContain('<button class="btn-back" @click="goBack">‹ 返回列表</button>')
    expect(trainingPlanDetailPage).not.toContain('class="btn-view"\n                          @click="viewTeacherDetail(participant.id)"')
    expect(trainingPlanDetailPage).not.toContain('class="btn-handle"\n                          @click="handleApplication(participant.id)"')
  })

  it('uses the shared Button component for training record table row actions', () => {
    expect(trainingRecordPage).toContain('<Button variant="ghost" size="sm" @click="viewDetail(row.id)">')
    expect(trainingRecordPage).not.toContain('<button class="btn-view" @click="viewDetail(record.id)">')
  })

  it('uses the shared Button component for training record detail material actions', () => {
    expect(trainingRecordDetailPage).toContain('import { Button } from \'@/components/ui\'')
    expect(trainingRecordDetailPage).toContain('<Button size="sm" @click="uploadMaterial">')
    expect(trainingRecordDetailPage).toContain('operationMessage.fromStore(trainingState)')
    expect(trainingRecordDetailPage).toContain('<Button variant="ghost" size="sm" @click="viewRelatedRecord(row.id)">')
    expect(trainingRecordDetailPage).not.toContain('.btn-back')
    expect(trainingRecordDetailPage).not.toContain('<button class="btn-upload" @click="uploadMaterial">')
    expect(trainingRecordDetailPage).not.toContain('class="btn-view"\n                          @click="viewRelatedRecord(related.id)"')
  })

  it('uses the shared Button component for training resource table row actions', () => {
    expect(trainingResourcePage).toContain('<Button variant="ghost" size="sm" @click="viewDetail(row.id)">')
    expect(trainingResourcePage).not.toContain('<button class="btn-view" @click="viewDetail(resource.id)">')
  })

  it('uses the shared Button component for training demand table row actions', () => {
    expect(trainingDemandPage).toContain('<Button variant="ghost" size="sm" @click="viewDetail(row.id)">')
    expect(trainingDemandPage).toContain('<Button')
    expect(trainingDemandPage).toContain('variant="secondary"')
    expect(trainingDemandPage).toContain('size="sm"')
    expect(trainingDemandPage).toContain('@click="matchDemand(row.id)"')
    expect(trainingDemandPage).not.toContain('<button class="btn-view" @click="viewDetail(demand.id)">')
    expect(trainingDemandPage).not.toContain('class="btn-view"\n                          @click="matchDemand(demand.id)"')
  })

  it('uses the shared Button component for training application table row actions', () => {
    expect(trainingApplicationPage).toContain(`                      <Button
                        v-if="row.status === '待处理'"
                        variant="secondary"
                        size="sm"
                        @click="handleApplication(row.id)"
                      >`)
    expect(trainingApplicationPage).toContain(`                      <Button
                        v-else
                        variant="ghost"
                        size="sm"
                        @click="viewDetail(row.id)"
                      >`)
    expect(trainingApplicationPage).not.toContain('class="btn-handle"\n                          @click="handleApplication(app.id)"')
    expect(trainingApplicationPage).not.toContain('class="btn-view"\n                          @click="viewDetail(app.id)"')
  })

  it('uses the shared Button component for training application sidebar actions', () => {
    expect(trainingApplicationPage).toContain(`                <Button
                  v-if="activeApplication.status === '待处理'"
                  class="full-width"
                  variant="danger"
                  @click="rejectCurrentApplication"
                >`)
    expect(trainingApplicationPage).toContain('<Button class="full-width" variant="outline" @click="showPendingApplications">')
    expect(trainingApplicationPage).not.toContain('class="outline-action"\n                  type="button"\n                  @click="rejectCurrentApplication"')
    expect(trainingApplicationPage).not.toContain('<button class="outline-action" type="button" @click="showPendingApplications">')
  })

  it('uses the shared Button component for training demand and resource sidebar actions', () => {
    expect(trainingDemandPage).toContain('<Button class="full-width" variant="outline" @click="showPendingDemands">')
    expect(trainingDemandPage).not.toContain('<button class="outline-action" type="button" @click="showPendingDemands">')

    expect(trainingResourcePage).toContain('<Button class="full-width" variant="outline" @click="showIncompleteResources">')
    expect(trainingResourcePage).not.toContain('<button class="outline-action" type="button" @click="showIncompleteResources">')
  })

  it('uses InsightSidebar for the training demand right summary panel', () => {
    expect(trainingDemandPage).toContain('InsightSidebar')
    expect(trainingDemandPage).toContain('<InsightSidebar title="资源匹配建议">')
    expect(trainingDemandPage).toContain('<template #items>')
    expect(trainingDemandPage).toContain('<template #selected>')
    expect(trainingDemandPage).toContain('<template #action>')
    expect(trainingDemandPage).toContain('画像观察需求集中')
    expect(trainingDemandPage).toContain('当前查看需求')
    expect(trainingDemandPage).toContain('showPendingDemands')
    expect(trainingDemandPage).not.toContain('<div class="sidebar-card">')
  })

  it('uses InsightSidebar for the training plan right summary panel', () => {
    expect(trainingPlanPage).toContain('InsightSidebar')
    expect(trainingPlanPage).toContain('<InsightSidebar title="执行提醒">')
    expect(trainingPlanPage).toContain('<template #items>')
    expect(trainingPlanPage).toContain('<template #action>')
    expect(trainingPlanPage).toContain('v-for="(reminder, index) in reminders"')
    expect(trainingPlanPage).toContain('查看相关计划')
    expect(trainingPlanPage).not.toContain('<div class="sidebar-card">')
  })

  it('uses InsightSidebar for the training application right summary panel', () => {
    expect(trainingApplicationPage).toContain('InsightSidebar')
    expect(trainingApplicationPage).toContain('<InsightSidebar title="处理提醒">')
    expect(trainingApplicationPage).toContain('<template #items>')
    expect(trainingApplicationPage).toContain('<template #selected>')
    expect(trainingApplicationPage).toContain('<template #action>')
    expect(trainingApplicationPage).toContain('待处理申请')
    expect(trainingApplicationPage).toContain('当前查看申请')
    expect(trainingApplicationPage).toContain('showPendingApplications')
    expect(trainingApplicationPage).toContain('rejectCurrentApplication')
    expect(trainingApplicationPage).not.toContain('<div class="sidebar-card">')
  })

  it('uses InsightSidebar for the training resource right summary panel', () => {
    expect(trainingResourcePage).toContain('InsightSidebar')
    expect(trainingResourcePage).toContain('<InsightSidebar title="资源概览">')
    expect(trainingResourcePage).toContain('<template #items>')
    expect(trainingResourcePage).toContain('<template #selected>')
    expect(trainingResourcePage).toContain('<template #action>')
    expect(trainingResourcePage).toContain('资源来源分布')
    expect(trainingResourcePage).toContain('当前查看资源')
    expect(trainingResourcePage).toContain('showIncompleteResources')
    expect(trainingResourcePage).not.toContain('<div class="sidebar-card">')
  })

  it('uses CompactFilterBar for the training demand filter area', () => {
    expect(trainingDemandPage).toContain('CompactFilterBar')
    expect(trainingDemandPage).toContain('<CompactFilterBar>')
    expect(trainingDemandPage).toContain('<template #fields>')
    expect(trainingDemandPage).toContain('<template #search>')
    expect(trainingDemandPage).toContain('<template #actions>')
    expect(trainingDemandPage).toContain('<template #message>')
    expect(trainingDemandPage).toContain('selectedOrganization')
    expect(trainingDemandPage).toContain('selectedSource')
    expect(trainingDemandPage).toContain('selectedDirection')
    expect(trainingDemandPage).toContain('selectedMatchStatus')
    expect(trainingDemandPage).toContain('placeholder="搜索教师、需求关键词"')
    expect(trainingDemandPage).toContain('resetFilters')
    expect(trainingDemandPage).toContain('applyFilters')
    expect(trainingDemandPage).not.toContain('<div class="filter-section">')
  })

  it('uses CompactFilterBar for the training resource filter area', () => {
    expect(trainingResourcePage).toContain('CompactFilterBar')
    expect(trainingResourcePage).toContain('<CompactFilterBar>')
    expect(trainingResourcePage).toContain('<template #fields>')
    expect(trainingResourcePage).toContain('<template #search>')
    expect(trainingResourcePage).toContain('<template #actions>')
    expect(trainingResourcePage).toContain('<template #message>')
    expect(trainingResourcePage).toContain('selectedStatus')
    expect(trainingResourcePage).toContain('selectedDirection')
    expect(trainingResourcePage).toContain('selectedLevel')
    expect(trainingResourcePage).toContain('selectedSource')
    expect(trainingResourcePage).toContain('placeholder="搜索资源名称/培训机构/关键词"')
    expect(trainingResourcePage).toContain('resetFilters')
    expect(trainingResourcePage).toContain('applyFilters')
    expect(trainingResourcePage).toContain('addResource')
    expect(trainingResourcePage).not.toContain('<div class="filter-section">')
  })

  it('uses CompactFilterBar for the training application filter area', () => {
    expect(trainingApplicationPage).toContain('CompactFilterBar')
    expect(trainingApplicationPage).toContain('<CompactFilterBar>')
    expect(trainingApplicationPage).toContain('<template #fields>')
    expect(trainingApplicationPage).toContain('<template #search>')
    expect(trainingApplicationPage).toContain('<template #actions>')
    expect(trainingApplicationPage).toContain('<template #message>')
    expect(trainingApplicationPage).toContain('selectedOrganization')
    expect(trainingApplicationPage).toContain('selectedStatus')
    expect(trainingApplicationPage).toContain('selectedTraining')
    expect(trainingApplicationPage).toContain('selectedYear')
    expect(trainingApplicationPage).toContain('placeholder="搜索教师、培训名称、院系"')
    expect(trainingApplicationPage).toContain('resetFilters')
    expect(trainingApplicationPage).toContain('applyFilters')
    expect(trainingApplicationPage).not.toContain('<div class="filter-section">')
  })

  it('uses CompactFilterBar for the training plan filter area', () => {
    expect(trainingPlanPage).toContain('CompactFilterBar')
    expect(trainingPlanPage).toContain('<CompactFilterBar>')
    expect(trainingPlanPage).toContain('<template #fields>')
    expect(trainingPlanPage).toContain('<template #search>')
    expect(trainingPlanPage).toContain('<template #actions>')
    expect(trainingPlanPage).toContain('<template #message>')
    expect(trainingPlanPage).toContain('selectedOrganization')
    expect(trainingPlanPage).toContain('selectedStatus')
    expect(trainingPlanPage).toContain('selectedYear')
    expect(trainingPlanPage).toContain('selectedParticipation')
    expect(trainingPlanPage).toContain('placeholder="搜索计划名称、培训方向、培训资源"')
    expect(trainingPlanPage).toContain('resetFilters')
    expect(trainingPlanPage).toContain('operationMessage.text.value')
    expect(trainingPlanPage).not.toContain('<div class="filter-section">')
  })

  it('uses CompactFilterBar for the reflection overview filter area', () => {
    expect(reflectionOverviewPage).toContain('CompactFilterBar')
    expect(reflectionOverviewPage).toContain('<CompactFilterBar>')
    expect(reflectionOverviewPage).toContain('<template #fields>')
    expect(reflectionOverviewPage).toContain('<template #search>')
    expect(reflectionOverviewPage).toContain('<template #actions>')
    expect(reflectionOverviewPage).toContain('<template #message>')
    expect(reflectionOverviewPage).toContain('selectedOrganization')
    expect(reflectionOverviewPage).toContain('selectedSemester')
    expect(reflectionOverviewPage).toContain('selectedTrigger')
    expect(reflectionOverviewPage).toContain('placeholder="搜索教师、课程、反思主题"')
    expect(reflectionOverviewPage).toContain('activeIssueKeyword')
    expect(reflectionOverviewPage).toContain('resetFilters')
    expect(reflectionOverviewPage).not.toContain('<div class="filter-section">')
  })

  it('uses CompactFilterBar for the training record filter area', () => {
    expect(trainingRecordPage).toContain('CompactFilterBar')
    expect(trainingRecordPage).toContain('<CompactFilterBar>')
    expect(trainingRecordPage).toContain('<template #fields>')
    expect(trainingRecordPage).toContain('<template #search>')
    expect(trainingRecordPage).toContain('<template #actions>')
    expect(trainingRecordPage).toContain('<template #message>')
    expect(trainingRecordPage).toContain('selectedOrganization')
    expect(trainingRecordPage).toContain('selectedYear')
    expect(trainingRecordPage).toContain('selectedDirection')
    expect(trainingRecordPage).toContain('selectedMaterialStatus')
    expect(trainingRecordPage).toContain('placeholder="搜索教师、培训名称"')
    expect(trainingRecordPage).toContain('resetFilters')
    expect(trainingRecordPage).toContain('reminderMessage')
    expect(trainingRecordPage).not.toContain('<div class="filter-section">')
  })

  it('uses CompactFilterBar for the virtual lab room filter area', () => {
    expect(virtualLabRoomPage).toContain('import { Button } from \'@/components/ui\'')
    expect(virtualLabRoomPage).toContain('CompactFilterBar')
    expect(virtualLabRoomPage).toContain('<CompactFilterBar>')
    expect(virtualLabRoomPage).toContain('<template #fields>')
    expect(virtualLabRoomPage).toContain('<template #search>')
    expect(virtualLabRoomPage).toContain('<template #actions>')
    expect(virtualLabRoomPage).toContain('<template #message>')
    expect(virtualLabRoomPage).toContain('selectedDepartment')
    expect(virtualLabRoomPage).toContain('selectedMajor')
    expect(virtualLabRoomPage).toContain('selectedActivity')
    expect(virtualLabRoomPage).toContain('placeholder="搜索教研室名称、负责人、教研方向"')
    expect(virtualLabRoomPage).toContain('resetFilters')
    expect(virtualLabRoomPage).toContain('applyFilters')
    expect(virtualLabRoomPage).toContain('<Button variant="outline" @click="resetFilters">重置</Button>')
    expect(virtualLabRoomPage).toContain('<Button variant="secondary" @click="applyFilters">查询</Button>')
    expect(virtualLabRoomPage).toContain('operationMessage.text.value')
    expect(virtualLabRoomPage).not.toContain('<button class="btn-reset" @click="resetFilters">重置</button>')
    expect(virtualLabRoomPage).not.toContain('<div class="filter-section">')
  })

  it('uses CompactFilterBar for the practice application filter area', () => {
    expect(practiceApplicationPage).toContain('CompactFilterBar')
    expect(practiceApplicationPage).toContain('<CompactFilterBar>')
    expect(practiceApplicationPage).toContain('<template #fields>')
    expect(practiceApplicationPage).toContain('<template #search>')
    expect(practiceApplicationPage).toContain('<template #actions>')
    expect(practiceApplicationPage).toContain('<template #message>')
    expect(practiceApplicationPage).toContain('selectedYear')
    expect(practiceApplicationPage).toContain('selectedDepartment')
    expect(practiceApplicationPage).toContain('selectedStatus')
    expect(practiceApplicationPage).toContain('selectedTime')
    expect(practiceApplicationPage).toContain('placeholder="搜索教师姓名 / 工号 / 实践单位"')
    expect(practiceApplicationPage).toContain('resetFilters')
    expect(practiceApplicationPage).toContain('applyFilters')
    expect(practiceApplicationPage).not.toContain('<div class="filter-section">')
  })

  it('uses CompactFilterBar for the practice tracking filter area', () => {
    expect(practiceTrackingPage).toContain('CompactFilterBar')
    expect(practiceTrackingPage).toContain('<CompactFilterBar>')
    expect(practiceTrackingPage).toContain('<template #fields>')
    expect(practiceTrackingPage).toContain('<template #search>')
    expect(practiceTrackingPage).toContain('<template #actions>')
    expect(practiceTrackingPage).toContain('<template #message>')
    expect(practiceTrackingPage).toContain('selectedYear')
    expect(practiceTrackingPage).toContain('selectedDepartment')
    expect(practiceTrackingPage).toContain('selectedMajor')
    expect(practiceTrackingPage).toContain('selectedCompletion')
    expect(practiceTrackingPage).toContain('selectedStatus')
    expect(practiceTrackingPage).toContain('placeholder="搜索教师姓名 / 工号"')
    expect(practiceTrackingPage).toContain('resetFilters')
    expect(practiceTrackingPage).toContain('applyFilters')
    expect(practiceTrackingPage).not.toContain('<div class="filter-section">')
  })

  it('uses CompactFilterBar for the practice record filter area', () => {
    expect(practiceRecordPage).toContain('CompactFilterBar')
    expect(practiceRecordPage).toContain('<CompactFilterBar>')
    expect(practiceRecordPage).toContain('<template #fields>')
    expect(practiceRecordPage).toContain('<template #search>')
    expect(practiceRecordPage).toContain('<template #actions>')
    expect(practiceRecordPage).toContain('<template #message>')
    expect(practiceRecordPage).toContain('selectedDepartment')
    expect(practiceRecordPage).toContain('selectedStatus')
    expect(practiceRecordPage).toContain('selectedDays')
    expect(practiceRecordPage).toContain('placeholder="搜索教师、实践单位"')
    expect(practiceRecordPage).toContain('resetFilters')
    expect(practiceRecordPage).toContain('applyFilters')
    expect(practiceRecordPage).not.toContain('<div class="filter-section">')
  })

  it('uses the shared Button component for the training record sidebar action', () => {
    expect(trainingRecordPage).toContain('import { Button } from \'@/components/ui\'')
    expect(trainingRecordPage).toContain('<Button class="full-width" @click="viewIncompleteMaterials">')
    expect(trainingRecordPage).not.toContain('<button class="btn-primary full-width" @click="viewIncompleteMaterials">')
  })
})
