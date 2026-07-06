import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')

function read(path) {
  return readFileSync(resolve(root, path), 'utf8')
}

const checks = [
  {
    file: 'src/pages/activity/index.vue',
    assertions: [
      {
        name: 'activity virtual research entry navigates to the room page',
        test: source => source.includes("actionUrl: '/pages/activity/virtual-research-room/index'"),
      },
      {
        name: 'activity cards do not silently return on missing URLs',
        test: source => !source.includes('if (!url) return'),
      },
      {
        name: 'activity notice button gives explicit feedback',
        test: source => /<button class="notice-button" aria-label="消息通知" @tap="showNoticeFeedback">/.test(source),
      },
      {
        name: 'activity recent-all action gives explicit feedback',
        test: source => /<MobileActionButton class="all-link" variant="link" arrow @tap="showRecentFeedback">全部<\/MobileActionButton>/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/training-demand/index.vue',
    assertions: [
      {
        name: 'training-demand edit recognized info has feedback',
        test: source => /<MobileActionButton class="panel-action" variant="outline" @tap="showDraftFeedback\('修改信息'\)">修改信息<\/MobileActionButton>/.test(source),
      },
      {
        name: 'training-demand rerun recognition has feedback',
        test: source => /<MobileActionButton class="panel-action" variant="outline" @tap="showDraftFeedback\('重新识别'\)">重新识别<\/MobileActionButton>/.test(source),
      },
      {
        name: 'training-demand edit statement has feedback',
        test: source => /<MobileActionButton class="panel-action" variant="outline" @tap="showDraftFeedback\('修改说明'\)">修改说明<\/MobileActionButton>/.test(source),
      },
      {
        name: 'training-demand optimize statement has feedback',
        test: source => /<MobileActionButton class="panel-action" variant="outline" @tap="showDraftFeedback\('让 AI 再优化'\)">让 AI 再优化<\/MobileActionButton>/.test(source),
      },
      {
        name: 'training-demand save draft has feedback',
        test: source => /<MobileActionButton class="bottom-actions__button" variant="outline" @tap="saveDraft">保存草稿<\/MobileActionButton>/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/training-found/index.vue',
    assertions: [
      {
        name: 'training-found edit statement has feedback',
        test: source => /<MobileActionButton class="panel-action" variant="outline" @tap="showDraftFeedback\('修改说明'\)">修改说明<\/MobileActionButton>/.test(source),
      },
      {
        name: 'training-found optimize statement has feedback',
        test: source => /<MobileActionButton class="panel-action" variant="outline" @tap="showDraftFeedback\('让 AI 再优化'\)">让 AI 再优化<\/MobileActionButton>/.test(source),
      },
      {
        name: 'training-found save draft has feedback',
        test: source => /<MobileActionButton class="bottom-actions__button" variant="outline" @tap="saveDraft">保存草稿<\/MobileActionButton>/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/enterprise-log-list/index.vue',
    assertions: [
      {
        name: 'enterprise-log-list filter has feedback',
        test: source => /<view class="filter-action" @tap="showFilterFeedback">/.test(source),
      },
      {
        name: 'enterprise-log-list sort has feedback',
        test: source => /<view class="sort-action" @tap="showSortFeedback">/.test(source),
      },
      {
        name: 'enterprise-log-list return action navigates back to detail',
        test: source => /<MobileActionButton class="return-button" variant="primary" @tap="returnToDetail">返回实践记录详情<\/MobileActionButton>/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/enterprise-proof-upload/index.vue',
    assertions: [
      {
        name: 'enterprise-proof-upload methods have feedback',
        test: source => /class="method-row"[\s\S]*@tap="showUploadFeedback\(item.title\)"/.test(source),
      },
      {
        name: 'enterprise-proof-upload preview has feedback',
        test: source => /<view class="preview-row" @tap="previewMaterial">/.test(source),
      },
      {
        name: 'enterprise-proof-upload reupload has feedback',
        test: source => /<MobileActionButton class="action-button action-button--ghost" variant="outline" @tap="showUploadFeedback\('重新上传'\)">重新上传<\/MobileActionButton>/.test(source),
      },
      {
        name: 'enterprise-proof-upload confirm navigates to submitted result',
        test: source => /<MobileActionButton class="action-button" variant="primary" @tap="confirmMaterial">确定使用<\/MobileActionButton>/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/enterprise-plan-submit/index.vue',
    assertions: [
      {
        name: 'enterprise-plan-submit edit draft has feedback',
        test: source => /<MobileActionButton class="ai-action-button" variant="outline" @tap="showDraftFeedback\('修改草稿'\)">修改草稿<\/MobileActionButton>/.test(source),
      },
      {
        name: 'enterprise-plan-submit rerun has feedback',
        test: source => /<MobileActionButton class="ai-action-button" variant="outline" @tap="showDraftFeedback\('重新整理'\)">重新整理<\/MobileActionButton>/.test(source),
      },
      {
        name: 'enterprise-plan-submit material action has feedback',
        test: source => /<MobileActionButton class="material-button" variant="outline" @tap="showDraftFeedback\('补充资料'\)">补充资料<\/MobileActionButton>/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/enterprise-log-record/index.vue',
    assertions: [
      {
        name: 'enterprise-log-record other date has feedback',
        test: source => /<view class="other-date" @tap="showDraftFeedback\('补记其他日期'\)">/.test(source),
      },
      {
        name: 'enterprise-log-record refresh has feedback',
        test: source => /<view class="refresh-action" @tap="showDraftFeedback\('重新整理'\)">/.test(source),
      },
      {
        name: 'enterprise-log-record edit draft has feedback',
        test: source => /<MobileActionButton class="draft-button" variant="outline" @tap="showDraftFeedback\('修改草稿'\)">修改草稿<\/MobileActionButton>/.test(source),
      },
      {
        name: 'enterprise-log-record rerun draft has feedback',
        test: source => /<MobileActionButton class="draft-button draft-button--muted" variant="outline" @tap="showDraftFeedback\('重新整理'\)">重新整理<\/MobileActionButton>/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/enterprise-proof-supplement/index.vue',
    assertions: [
      {
        name: 'enterprise-proof-supplement methods have feedback',
        test: source => /class="method-row"[\s\S]*@tap="showUploadFeedback\(item.title\)"/.test(source),
      },
      {
        name: 'enterprise-proof-supplement preview has feedback',
        test: source => /<view class="preview-row" @tap="previewMaterial">/.test(source),
      },
      {
        name: 'enterprise-proof-supplement return draft navigates',
        test: source => /<MobileActionButton class="action-button action-button--draft" variant="outline" @tap="returnToDraft">返回草稿<\/MobileActionButton>/.test(source),
      },
      {
        name: 'enterprise-proof-supplement confirm navigates',
        test: source => /<MobileActionButton class="action-button" variant="primary" @tap="confirmMaterial">确定使用<\/MobileActionButton>/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/enterprise-history-supplement/index.vue',
    assertions: [
      {
        name: 'enterprise-history-supplement edit content has feedback',
        test: source => /<MobileActionButton class="ai-action-button" variant="outline" @tap="showDraftFeedback\('修改内容'\)">修改内容<\/MobileActionButton>/.test(source),
      },
      {
        name: 'enterprise-history-supplement rerun has feedback',
        test: source => /<MobileActionButton class="ai-action-button" variant="outline" @tap="showDraftFeedback\('重新整理'\)">重新整理<\/MobileActionButton>/.test(source),
      },
      {
        name: 'enterprise-history-supplement material action has feedback',
        test: source => /<MobileActionButton class="material-button" variant="outline" @tap="showDraftFeedback\('补充资料'\)">补充资料<\/MobileActionButton>/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/enterprise-plan-edit/index.vue',
    assertions: [
      {
        name: 'enterprise-plan-edit edit content has feedback',
        test: source => /<MobileActionButton class="ai-button" variant="outline" @tap="showDraftFeedback\('修改内容'\)">修改内容<\/MobileActionButton>/.test(source),
      },
      {
        name: 'enterprise-plan-edit rerun has feedback',
        test: source => /<MobileActionButton class="ai-button" variant="outline" @tap="showDraftFeedback\('重新整理'\)">重新整理<\/MobileActionButton>/.test(source),
      },
      {
        name: 'enterprise-plan-edit material action has feedback',
        test: source => /<MobileActionButton class="material-button" variant="outline" @tap="showDraftFeedback\('补充资料'\)">补充资料<\/MobileActionButton>/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/enterprise-progress-detail/index.vue',
    assertions: [
      {
        name: 'enterprise-progress-detail plan detail has feedback',
        test: source => /<text class="section-link" @tap="showDetailFeedback\('实践计划详情'\)">查看详情<\/text>/.test(source),
      },
      {
        name: 'enterprise-progress-detail record action navigates',
        test: source => /<MobileActionButton class="record-button" variant="primary" @tap="goLogRecord">去记录<\/MobileActionButton>/.test(source),
      },
      {
        name: 'enterprise-progress-detail log all navigates',
        test: source => /<text class="section-link" @tap="goLogList">查看全部<\/text>/.test(source),
      },
      {
        name: 'enterprise-progress-detail file all has feedback',
        test: source => /<text class="section-link" @tap="showDetailFeedback\('附件资料'\)">查看全部<\/text>/.test(source),
      },
      {
        name: 'enterprise-progress-detail supplement material navigates',
        test: source => /<text class="green-link" @tap="goProofUpload">补充资料<\/text>/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/enterprise-resupplement/index.vue',
    assertions: [
      {
        name: 'enterprise-resupplement upload has feedback',
        test: source => /<view class="upload-drop" @tap="showUploadFeedback">/.test(source),
      },
      {
        name: 'enterprise-resupplement later action goes back',
        test: source => /<MobileActionButton class="action-button action-button--later" variant="outline" @tap="goBack">稍后处理<\/MobileActionButton>/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/reflection-guide-chat/index.vue',
    assertions: [
      {
        name: 'reflection-guide-chat evidence action has explicit feedback',
        test: source => /<MobileActionButton class="add-button" variant="outline" arrow @tap="showEvidenceFeedback">查看 \/ 添加依据<\/MobileActionButton>/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/training-demand-result/index.vue',
    assertions: [
      {
        name: 'training-demand-result submitted content action has feedback',
        test: source => /<MobileActionButton class="page-actions__button" variant="outline" @tap="showSubmitContentFeedback">查看提交内容<\/MobileActionButton>/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/training-need-result/index.vue',
    assertions: [
      {
        name: 'training-need-result submitted content action has feedback',
        test: source => /<MobileActionButton class="page-action" variant="outline" @tap="showSubmitContentFeedback">查看提交内容<\/MobileActionButton>/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/profile/index.vue',
    assertions: [
      {
        name: 'profile settings action has explicit feedback',
        test: source => /<button class="setting-button" aria-label="设置" @tap="showServiceFeedback\('设置'\)">/.test(source),
      },
      {
        name: 'profile personal detail action has explicit feedback',
        test: source => /<MobileActionButton class="profile-link" variant="link" arrow @tap="showServiceFeedback\('个人资料'\)">查看个人资料<\/MobileActionButton>/.test(source),
      },
      {
        name: 'profile service rows have explicit feedback',
        test: source => /<view v-for="item in serviceMenus" :key="item.title" class="service-row" @tap="showServiceFeedback\(item.title\)">/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/todo/all/index.vue',
    assertions: [
      {
        name: 'todo all filters update local active filter',
        test: source => source.includes('const activeFilterIndex = ref(0)')
          && /<wd-tabs v-model="activeFilterIndex"/.test(source),
      },
      {
        name: 'todo all filter active class follows local state',
        test: source => /<wd-tab\s+[\s\S]*v-for="\(\s*filter,\s*index\s*\) in filters"[\s\S]*:name="index"/.test(source)
          && source.includes('.filter-row :deep(.wd-tabs__nav-item.is-active)'),
      },
    ],
  },
  {
    file: 'src/pages/todo/index.vue',
    assertions: [
      {
        name: 'todo notice button gives explicit feedback',
        test: source => /<button class="notice-button" aria-label="消息通知" @tap="showNoticeFeedback">/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/virtual-research-activity-list/index.vue',
    assertions: [
      {
        name: 'virtual-research activity list filter button gives feedback',
        test: source => /<button class="filter-button" @tap="showFilterFeedback">/.test(source),
      },
      {
        name: 'virtual-research activity list filter feedback resets local state',
        test: source => source.includes("setVirtualResearchFilter('全部')") && source.includes('活动筛选已重置为全部'),
      },
    ],
  },
  {
    file: 'src/pages/activity/virtual-research-teacher-archive-detail/index.vue',
    assertions: [
      {
        name: 'virtual-research teacher archive filters use local active state',
        test: source => source.includes('const activeFilterIndex = ref(0)')
          && /<wd-tabs v-model="activeFilterIndex"/.test(source),
      },
      {
        name: 'virtual-research teacher archive filter button gives feedback',
        test: source => /<button class="filter-button" @tap="showArchiveFilterFeedback">/.test(source) && source.includes('更新筛选已重置为全部'),
      },
      {
        name: 'virtual-research teacher archive record rows have explicit preview feedback',
        test: source => /@tap="showRecordFeedback\(item.title\)"/.test(source) && source.includes('记录详情为本地模拟'),
      },
    ],
  },
  {
    file: 'src/pages/activity/virtual-research-archive-result-v1/index.vue',
    assertions: [
      {
        name: 'virtual-research archive result contribution rows have explicit feedback',
        test: source => /@tap="showContributionFeedback\(item.title\)"/.test(source) && source.includes('贡献详情为本地模拟'),
      },
      {
        name: 'virtual-research archive result material rows have explicit feedback',
        test: source => /@tap="showMaterialFeedback\(item.name\)"/.test(source) && source.includes('归档材料预览为本地模拟'),
      },
    ],
  },
  {
    file: 'src/pages/activity/virtual-research-profile-intro-edit/index.vue',
    assertions: [
      {
        name: 'virtual-research profile intro material preview is explicit mock feedback',
        test: source => source.includes('附件预览为本地模拟') && /@tap="previewMaterial\(file.name\)"/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/virtual-research-skill-management/index.vue',
    assertions: [
      {
        name: 'virtual-research skill evidence action handles inactive evidence explicitly',
        test: source => /@tap="handleEvidenceAction\(item.title, item.active\)"/.test(source) && source.includes('依据选择为本地模拟'),
      },
    ],
  },
  {
    file: 'src/pages/activity/virtual-research-activity-detail-ongoing/index.vue',
    assertions: [
      {
        name: 'virtual-research ongoing detail more action has explicit feedback',
        test: source => /<button class="more-button" @tap="showMoreFeedback">/.test(source) && source.includes('更多操作为本地模拟'),
      },
      {
        name: 'virtual-research ongoing detail material preview has explicit fallback',
        test: source => source.includes('过程材料预览为本地模拟') && /@tap="previewMaterial\(item.title\)"/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/virtual-research-confirm-contribution/index.vue',
    assertions: [
      {
        name: 'virtual-research confirm contribution voice upload gives feedback',
        test: source => source.includes("showSupplementFeedback('语音说明'"),
      },
      {
        name: 'virtual-research confirm contribution photo upload gives feedback',
        test: source => source.includes("showSupplementFeedback('拍照材料'"),
      },
      {
        name: 'virtual-research confirm contribution file upload gives feedback',
        test: source => source.includes("showSupplementFeedback('上传材料'"),
      },
    ],
  },
  {
    file: 'src/pages/activity/virtual-research-contribution-detail/index.vue',
    assertions: [
      {
        name: 'virtual-research contribution detail material preview has explicit fallback',
        test: source => source.includes('贡献材料预览为本地模拟') && /@tap="previewMaterial\(file.name\)"/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/virtual-research-archive-result/index.vue',
    assertions: [
      {
        name: 'virtual-research archive result more action has explicit feedback',
        test: source => /<button class="more-button" @tap="showMoreFeedback">/.test(source) && source.includes('更多操作为本地模拟'),
      },
      {
        name: 'virtual-research archive result files have explicit feedback',
        test: source => /@tap="showArchiveFileFeedback\(file.name\)"/.test(source) && source.includes('归档材料预览为本地模拟'),
      },
    ],
  },
  {
    file: 'src/pages/activity/virtual-research-contribution-submitted/index.vue',
    assertions: [
      {
        name: 'virtual-research contribution submitted files have explicit feedback',
        test: source => /@tap="showSubmittedFileFeedback\(file.name\)"/.test(source) && source.includes('关联材料预览为本地模拟'),
      },
    ],
  },
  {
    file: 'src/pages/activity/virtual-research-advanced-settings/index.vue',
    assertions: [
      {
        name: 'virtual-research report export has explicit feedback',
        test: source => /@tap="showReportFeedback\('导出报告'\)"/.test(source) && source.includes('发展报告操作为本地模拟'),
      },
      {
        name: 'virtual-research report save has explicit feedback',
        test: source => /@tap="showReportFeedback\('确认保存报告'\)"/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/virtual-research-basic-info-edit/index.vue',
    assertions: [
      {
        name: 'virtual-research basic info contribution rows have feedback',
        test: source => /@tap="showContributionFeedback\(item.title\)"/.test(source) && source.includes('贡献详情为本地模拟'),
      },
      {
        name: 'virtual-research basic info footer actions route or feedback explicitly',
        test: source => /@tap="goResearchRoom"/.test(source) && /@tap="goContributionDetail"/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/virtual-research-stage-submitted/index.vue',
    assertions: [
      {
        name: 'virtual-research stage submitted file preview has explicit feedback',
        test: source => /@tap="showStageFileFeedback\('设备调试案例素材.pdf'\)"/.test(source) && source.includes('阶段材料预览为本地模拟'),
      },
      {
        name: 'virtual-research stage submitted next actions have explicit feedback',
        test: source => /@tap="showNextActionFeedback\(item.title\)"/.test(source) && source.includes('后续动作提醒为本地模拟'),
      },
    ],
  },
  {
    file: 'src/pages/activity/virtual-research-activity-detail-supplement-submitted/index.vue',
    assertions: [
      {
        name: 'virtual-research supplement submitted more action has explicit feedback',
        test: source => /<button class="more-button" @tap="showMoreFeedback">/.test(source) && source.includes('更多操作为本地模拟'),
      },
    ],
  },
  {
    file: 'src/pages/activity/virtual-research-archived-confirmed/index.vue',
    assertions: [
      {
        name: 'virtual-research archived confirmed file preview has explicit feedback',
        test: source => /@tap="showArchivedFileFeedback\(file.name\)"/.test(source) && source.includes('归档材料预览为本地模拟'),
      },
    ],
  },
  {
    file: 'src/pages/activity/virtual-research-award-management/index.vue',
    assertions: [
      {
        name: 'virtual-research award task detail has explicit feedback',
        test: source => /@tap="showTaskDetailFeedback"/.test(source) && source.includes('任务详情为本地模拟'),
      },
      {
        name: 'virtual-research award ai actions have explicit feedback',
        test: source => /@tap="showAiFeedback\('不准确，重新整理'\)"/.test(source) && /@tap="showAiFeedback\('重新生成'\)"/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/virtual-research-resubmitted/index.vue',
    assertions: [
      {
        name: 'virtual-research resubmitted more action has explicit feedback',
        test: source => /<button class="more-button" @tap="showMoreFeedback">/.test(source) && source.includes('更多操作为本地模拟'),
      },
      {
        name: 'virtual-research resubmitted supplement rows have explicit feedback',
        test: source => /@tap="showSupplementFeedback\(item.title\)"/.test(source) && source.includes('补充内容详情为本地模拟'),
      },
    ],
  },
  {
    file: 'src/pages/activity/virtual-research-contribution-confirm/index.vue',
    assertions: [
      {
        name: 'virtual-research contribution confirm files have explicit feedback',
        test: source => /@tap="showFileFeedback\(file\)"/.test(source) && source.includes('关联材料预览为本地模拟'),
      },
    ],
  },
  {
    file: 'src/pages/activity/virtual-research-profile-complete/index.vue',
    assertions: [
      {
        name: 'virtual-research profile complete confirm action navigates',
        test: source => /@tap="goContributionConfirm"/.test(source),
      },
      {
        name: 'virtual-research profile complete materials have explicit feedback',
        test: source => /@tap="showMaterialFeedback\(item.title\)"/.test(source) && source.includes('过程材料预览为本地模拟'),
      },
    ],
  },
  {
    file: 'src/pages/activity/virtual-research-supplement-material/index.vue',
    assertions: [
      {
        name: 'virtual-research supplement material requirements have explicit feedback',
        test: source => /@tap="showRequirementFeedback\(item.title\)"/.test(source) && source.includes('补充要求详情为本地模拟'),
      },
      {
        name: 'virtual-research supplement material voice action has explicit feedback',
        test: source => /@tap="showVoiceFeedback"/.test(source) && source.includes('语音说明为本地模拟入口'),
      },
    ],
  },
  {
    file: 'src/pages/activity/virtual-research-activity-detail-confirm/index.vue',
    assertions: [
      {
        name: 'virtual-research activity confirm material preview has explicit feedback',
        test: source => source.includes('材料预览为本地模拟') && /@tap="previewMaterial\(file.name\)"/.test(source),
      },
      {
        name: 'virtual-research activity confirm submit navigates to submitted page',
        test: source => /@tap="submitContribution"/.test(source) && source.includes("'/pages/activity/virtual-research-contribution-submitted/index'"),
      },
    ],
  },
  {
    file: 'src/pages/activity/virtual-research-role-assignment/index.vue',
    assertions: [
      {
        name: 'virtual-research role assignment handles unknown todo explicitly',
        test: source => source.includes('showTodoFallback') && source.includes('待办操作为本地模拟'),
      },
      {
        name: 'virtual-research role assignment primary entries navigate',
        test: source => source.includes("'/pages/activity/virtual-research-invitation/index'") && source.includes("'/pages/activity/virtual-research-confirm-contribution/index'"),
      },
    ],
  },
  {
    file: 'src/pages/activity/virtual-research-position-management/index.vue',
    assertions: [
      {
        name: 'virtual-research position management member entries navigate',
        test: source => source.includes("'/pages/activity/virtual-research-activity-list/index?from=member-profile'") && source.includes("'/pages/activity/virtual-research-contribution-detail/index?from=member-profile'"),
      },
    ],
  },
  {
    file: 'src/pages/activity/virtual-research-room/index.vue',
    assertions: [
      {
        name: 'virtual-research room todo actions navigate by type',
        test: source => /@tap="handleTodoAction\(item.type\)"/.test(source) && source.includes('goResearchInvitation()') && source.includes('goContributionConfirm()'),
      },
      {
        name: 'virtual-research room all activity entry navigates',
        test: source => /<button class="all-link" @tap="goResearchActivityList">/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/virtual-research-work-experience-management/index.vue',
    assertions: [
      {
        name: 'virtual-research work experience material preview has explicit fallback',
        test: source => source.includes('贡献材料预览为本地模拟') && /@tap="previewMaterial\(file.name\)"/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/virtual-research-invitation/index.vue',
    assertions: [
      {
        name: 'virtual-research invitation confirm navigates to member setup',
        test: source => /@tap="confirmInvitation"/.test(source) && source.includes("'/pages/activity/virtual-research-position-management/index'"),
      },
      {
        name: 'virtual-research invitation decline returns to research room',
        test: source => /@tap="declineInvitation"/.test(source) && source.includes("'/pages/activity/virtual-research-room/index'"),
      },
      {
        name: 'virtual-research invitation contribution notice navigates',
        test: source => /<MobileCard class="notice-card" @tap="goContributionConfirm">/.test(source) && source.includes("'/pages/activity/virtual-research-confirm-contribution/index'"),
      },
    ],
  },
  {
    file: 'src/pages/todo/certificate-detail/index.vue',
    assertions: [
      {
        name: 'todo certificate detail material preview has explicit fallback',
        test: source => source.includes('证书材料预览为本地模拟') && /@tap="previewMaterial"/.test(source),
      },
      {
        name: 'todo certificate detail confirm and reject navigate to result pages',
        test: source => source.includes("'/pages/todo/certificate-archive-success/index'") && source.includes("'/pages/todo/certificate-removed/index'"),
      },
    ],
  },
  {
    file: 'src/pages/todo/certificate-edit/index.vue',
    assertions: [
      {
        name: 'todo certificate edit material replacement gives explicit feedback',
        test: source => source.includes('材料已更换，提交后核验') && /@tap="replaceMaterial"/.test(source),
      },
      {
        name: 'todo certificate edit submit navigates to submitted result',
        test: source => /@tap="goSubmitResult"/.test(source) && source.includes("'/pages/todo/certificate-submit/index'"),
      },
    ],
  },
  {
    file: 'src/pages/todo/certificate-submit/index.vue',
    assertions: [
      {
        name: 'todo certificate submit record action has explicit feedback',
        test: source => /@tap="showSubmitRecord"/.test(source) && source.includes('提交记录为本地模拟'),
      },
      {
        name: 'todo certificate submit return action navigates to todo',
        test: source => /@tap="goTodo"/.test(source) && source.includes("'/pages/todo/index'"),
      },
    ],
  },
  {
    file: 'src/pages/todo/certificate-archive-success/index.vue',
    assertions: [
      {
        name: 'todo certificate archive success record actions navigate',
        test: source => /@tap="goArchiveRecord"/.test(source) && source.includes("'/pages/archive/record-detail/index?recordId=certificate-digital-literacy&category=personal-development'"),
      },
      {
        name: 'todo certificate archive success return action navigates to todo',
        test: source => /@tap="goTodo"/.test(source) && source.includes("'/pages/todo/index'"),
      },
    ],
  },
  {
    file: 'src/pages/todo/certificate-removed/index.vue',
    assertions: [
      {
        name: 'todo certificate removed primary action returns to todo',
        test: source => /@tap="goTodo"/.test(source) && source.includes("'/pages/todo/index'"),
      },
      {
        name: 'todo certificate removed secondary action opens pending list',
        test: source => /@tap="goPendingList"/.test(source) && source.includes("'/pages/todo/all/index'"),
      },
    ],
  },
  {
    file: 'src/pages/todo/dynamics/index.vue',
    assertions: [
      {
        name: 'todo dynamics filter drawer opens and closes locally',
        test: source => /@tap="showFilter"/.test(source) && /@tap="closeFilter"/.test(source) && /const isFilterOpen = ref\(false\)/.test(source),
      },
      {
        name: 'todo dynamics cards give explicit local preview feedback',
        test: source => /@tap="showDynamic\(item\)"/.test(source) && source.includes('动态详情为本地模拟'),
      },
      {
        name: 'todo dynamics reset and apply actions update local filter state',
        test: source => /@tap="resetFilter"/.test(source) && /@tap="applyFilter"/.test(source) && source.includes('resetTodoDynamicFilter()'),
      },
    ],
  },
  {
    file: 'src/pages/todo/dynamics-filter/index.vue',
    assertions: [
      {
        name: 'todo dynamics-filter apply returns to dynamics list',
        test: source => /@tap="applyFilter"/.test(source) && source.includes("'/pages/todo/dynamics/index'"),
      },
      {
        name: 'todo dynamics-filter cards give explicit local preview feedback',
        test: source => /@tap="showDynamic\(item\)"/.test(source) && source.includes('动态详情为本地模拟'),
      },
      {
        name: 'todo dynamics-filter reset keeps local filter state usable',
        test: source => /@tap="resetFilter"/.test(source) && source.includes('resetTodoDynamicFilter()'),
      },
    ],
  },
  {
    file: 'src/pages/archive/index.vue',
    assertions: [
      {
        name: 'archive home search and notice enter record query',
        test: source => /@tap="goArchiveQuery"/.test(source) && source.includes("'/pages/archive/record-query/index'"),
      },
      {
        name: 'archive home category cards navigate to category page',
        test: source => /@tap="goArchiveCategory\(item.key\)"/.test(source) && source.includes('/pages/archive/category/index?category='),
      },
      {
        name: 'archive home recent records and all link navigate',
        test: source => /@tap="goArchiveRecord\(record\)"/.test(source) && /@tap="goArchiveList"/.test(source) && source.includes("'/pages/archive/record-list/index?category=all'"),
      },
      {
        name: 'archive home pending count enters draft list',
        test: source => /@tap="goArchiveDraftList"/.test(source) && source.includes("'/pages/archive/draft-list/index'"),
      },
    ],
  },
  {
    file: 'src/pages/archive/record-query/index.vue',
    assertions: [
      {
        name: 'archive record query filters are local state controls',
        test: source => /const selectedFilterIndex = ref\(0\)/.test(source)
          && /const selectedFilter = computed/.test(source)
          && /<wd-tabs v-model="selectedFilterIndex"/.test(source),
      },
      {
        name: 'archive record query clear resets keyword and filter',
        test: source => /@tap="clearQuery"/.test(source)
          && source.includes("queryText.value = ''")
          && source.includes('selectedFilterIndex.value = 0'),
      },
      {
        name: 'archive record query records navigate to detail',
        test: source => /@tap="showRecord\(record.id\)"/.test(source) && source.includes('/pages/archive/record-detail/index?recordId='),
      },
    ],
  },
  {
    file: 'src/pages/archive/record-list/index.vue',
    assertions: [
      {
        name: 'archive record list search enters query page',
        test: source => /@tap="goArchiveQuery"/.test(source) && source.includes("'/pages/archive/record-query/index'"),
      },
      {
        name: 'archive record list status chips update local filter state',
        test: source => /const selectedStatus = ref/.test(source)
          && /<wd-tabs v-model="selectedStatus"/.test(source),
      },
      {
        name: 'archive record list records navigate to detail',
        test: source => /@tap="goRecord\(record\)"/.test(source) && source.includes('/pages/archive/record-detail/index?recordId='),
      },
    ],
  },
  {
    file: 'src/pages/archive/category/index.vue',
    assertions: [
      {
        name: 'archive category list and footer enter category record list',
        test: source => /@tap="goRecordList"/.test(source) && source.includes('/pages/archive/record-list/index?category='),
      },
      {
        name: 'archive category personal-development edit enters draft editor',
        test: source => /@tap="goDevelopmentPlanEdit"/.test(source) && source.includes("'/pages/archive/development-plan-edit/index?draftId=development-plan-2026'"),
      },
      {
        name: 'archive category records choose basic-info detail or generic detail',
        test: source => /@tap="goRecord\(record.id\)"/.test(source) && source.includes('/pages/archive/basic-info-detail/index?recordId=') && source.includes('/pages/archive/record-detail/index?recordId='),
      },
    ],
  },
  {
    file: 'src/pages/archive/basic-info-detail/index.vue',
    assertions: [
      {
        name: 'archive basic-info source record navigates to generic detail',
        test: source => /@tap="goSourceRecord"/.test(source) && source.includes('/pages/archive/record-detail/index?recordId='),
      },
      {
        name: 'archive basic-info correction enters correction apply',
        test: source => /@tap="requestCorrection"/.test(source) && source.includes('/pages/archive/correction/apply/index?recordId='),
      },
      {
        name: 'archive basic-info material preview has explicit fallback',
        test: source => /@tap="previewMaterial\(material\)"/.test(source) && source.includes('previewArchiveMaterial') && source.includes('preview.fallback'),
      },
      {
        name: 'archive basic-info avoids raw implementation store names',
        test: source => !/teacherArchiveFacts|archiveStore/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/archive/record-detail/index.vue',
    assertions: [
      {
        name: 'archive record detail correction enters correction apply',
        test: source => /@tap="requestCorrection"/.test(source) && source.includes('/pages/archive/correction/apply/index?recordId='),
      },
      {
        name: 'archive record detail material preview has explicit fallback',
        test: source => /@tap="previewMaterial\(material\)"/.test(source) && source.includes('previewArchiveMaterial') && source.includes('preview.fallback'),
      },
      {
        name: 'archive record detail primary action returns to archive home',
        test: source => /@tap="goArchiveHome"/.test(source) && source.includes("'/pages/archive/index'"),
      },
    ],
  },
  {
    file: 'src/pages/archive/draft-list/index.vue',
    assertions: [
      {
        name: 'archive draft list drafts navigate to editor',
        test: source => /@tap="goDraft\(draft\)"/.test(source) && source.includes('/pages/archive/development-plan-edit/index?draftId='),
      },
      {
        name: 'archive draft list pending records navigate to detail',
        test: source => /@tap="goRecord\(record\)"/.test(source) && source.includes('/pages/archive/record-detail/index?recordId='),
      },
      {
        name: 'archive draft list empty action enters search',
        test: source => /@tap="goArchiveQuery"/.test(source) && source.includes("'/pages/archive/record-query/index'"),
      },
    ],
  },
  {
    file: 'src/pages/archive/correction/apply/index.vue',
    assertions: [
      {
        name: 'archive correction apply reason chips update local state',
        test: source => /const selectedReason = ref/.test(source)
          && /<wd-radio-group v-model="selectedReason"/.test(source),
      },
      {
        name: 'archive correction apply submit creates local correction and opens submitted page',
        test: source => source.includes('submitArchiveCorrection(') && source.includes('/pages/archive/correction/submitted/index?recordId='),
      },
      {
        name: 'archive correction apply avoids raw implementation status copy',
        test: source => !/后续接入|后续补齐|真实接口/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/archive/correction/submitted/index.vue',
    assertions: [
      {
        name: 'archive correction submitted primary action opens progress',
        test: source => /@tap="goCorrectionProgress"/.test(source) && source.includes('/pages/archive/correction/progress/index?recordId='),
      },
      {
        name: 'archive correction submitted secondary action opens original record',
        test: source => /@tap="goRecordDetail"/.test(source) && source.includes('/pages/archive/record-detail/index?recordId='),
      },
      {
        name: 'archive correction submitted avoids raw implementation status copy',
        test: source => !/后续接入|后续补齐|真实接口/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/archive/correction/progress/index.vue',
    assertions: [
      {
        name: 'archive correction progress result action opens result page',
        test: source => /@tap="goCorrectionResult"/.test(source) && source.includes('/pages/archive/correction/result/index?recordId='),
      },
      {
        name: 'archive correction progress updates local correction status before result',
        test: source => source.includes('updateArchiveCorrectionStatus('),
      },
      {
        name: 'archive correction progress avoids raw implementation status copy',
        test: source => !/后续接入|后续补齐|真实接口/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/archive/correction/result/index.vue',
    assertions: [
      {
        name: 'archive correction result need-supplement primary opens supplement page',
        test: source => /function goPrimaryAction\(\)/.test(source) && source.includes('goCorrectionSupplement()') && source.includes('/pages/archive/correction/supplement/index?recordId='),
      },
      {
        name: 'archive correction result non-supplement action opens original record',
        test: source => source.includes('goRecordDetail()') && source.includes('/pages/archive/record-detail/index?recordId='),
      },
      {
        name: 'archive correction result avoids raw implementation status copy',
        test: source => !/后续接入|后续补齐|真实接口/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/archive/correction/supplement/index.vue',
    assertions: [
      {
        name: 'archive correction supplement material tap updates local upload state',
        test: source => /@tap="markMaterialUploaded\(index\)"/.test(source) && source.includes("uploadStatus: 'uploaded'"),
      },
      {
        name: 'archive correction supplement submit stores local supplement and opens progress',
        test: source => source.includes('submitArchiveCorrectionSupplement(') && source.includes('/pages/archive/correction/progress/index?recordId='),
      },
      {
        name: 'archive correction supplement secondary action opens original record',
        test: source => /@tap="goRecordDetail"/.test(source) && source.includes('/pages/archive/record-detail/index?recordId='),
      },
    ],
  },
  {
    file: 'src/pages/archive/development-plan-edit/index.vue',
    assertions: [
      {
        name: 'archive development plan save persists local draft and gives feedback',
        test: source => source.includes('saveArchiveDevelopmentPlanDraft(') && source.includes('草稿已保存'),
      },
      {
        name: 'archive development plan submit creates pending archive record and opens detail',
        test: source => source.includes('submitArchiveDevelopmentPlanDraft(') && source.includes('/pages/archive/record-detail/index?recordId='),
      },
      {
        name: 'archive development plan return opens draft list',
        test: source => /@tap="goDraftList"/.test(source) && source.includes("'/pages/archive/draft-list/index'"),
      },
      {
        name: 'archive development plan avoids raw implementation store names',
        test: source => !/archiveStore|teacherArchiveFacts/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/profile/ability-profile/index.vue',
    assertions: [
      {
        name: 'profile ability profile opens records and development report',
        test: source => source.includes("'/pages/profile/ability-profile/records/index?from=ability-profile'") && source.includes("'/pages/profile/development-report/index?from=ability-profile'"),
      },
      {
        name: 'profile ability profile opens target and tenure comparison',
        test: source => source.includes("'/pages/profile/target-position/index?from=ability-profile'") && source.includes("'/pages/profile/tenure-requirement/index?from=ability-profile'"),
      },
    ],
  },
  {
    file: 'src/pages/profile/ability-profile/records/index.vue',
    assertions: [
      {
        name: 'profile ability records open archive detail',
        test: source => /@tap="goRecord\(record.id\)"/.test(source) && source.includes('/pages/archive/record-detail/index?recordId='),
      },
      {
        name: 'profile ability records states are explicit mock references',
        test: source => source.includes('前台模拟的能力画像') && source.includes('不在本页修改档案事实'),
      },
    ],
  },
  {
    file: 'src/pages/profile/development-report/index.vue',
    assertions: [
      {
        name: 'profile development report export gives explicit local mock feedback',
        test: source => /@tap="showExportNotice"/.test(source) && source.includes('本地模拟发展报告') && !/待接入|真实接口/.test(source),
      },
      {
        name: 'profile development report opens interpretation and evidence records',
        test: source => /@tap="goAiInterpretation"/.test(source) && source.includes("'/pages/profile/ability-profile/index?from=development-report'") && source.includes("'/pages/profile/ability-profile/records/index?from=development-report'"),
      },
      {
        name: 'profile development report opens target and tenure comparison',
        test: source => source.includes("'/pages/profile/target-position/index?from=development-report'") && source.includes("'/pages/profile/tenure-requirement/index?from=development-report'"),
      },
    ],
  },
  {
    file: 'src/pages/profile/target-position/index.vue',
    assertions: [
      {
        name: 'profile target position opens evidence and practice record',
        test: source => source.includes("'/pages/profile/ability-profile/records/index?dimension=enterprise&from=target-position'") && source.includes("'/pages/archive/record-detail/index?recordId=enterprise-practice-shandong-software'"),
      },
    ],
  },
  {
    file: 'src/pages/profile/tenure-requirement/index.vue',
    assertions: [
      {
        name: 'profile tenure requirement evidence opens archive details and records list',
        test: source => source.includes('/pages/archive/record-detail/index?recordId=') && source.includes("'/pages/profile/ability-profile/records/index?from=tenure-requirement'"),
      },
      {
        name: 'profile tenure requirement actions enter existing completion pages',
        test: source => source.includes("'/pages/activity/enterprise-advanced-search/index?from=tenure-requirement'") && source.includes("'/pages/activity/virtual-research-activity-list/index?from=tenure-requirement'") && source.includes("'/pages/profile/target-position/index?from=tenure-requirement'"),
      },
    ],
  },
  {
    file: 'src/pages/assistant/index.vue',
    assertions: [
      {
        name: 'assistant home primary action opens archive supplement',
        test: source => /@tap="goScene\(assistantScenes\[0\]\)"/.test(source) && source.includes("url: '/pages/assistant/archive-supplement/index'"),
      },
      {
        name: 'assistant home scenes open existing routes',
        test: source => source.includes("url: '/pages/profile/ability-profile/index?from=assistant'") && source.includes("url: '/pages/todo/index'") && /@tap="goScene\(scene\)"/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/assistant/archive-supplement/index.vue',
    assertions: [
      {
        name: 'assistant archive supplement submit creates pending archive record',
        test: source => source.includes('createArchiveSupplementRecord()'),
      },
      {
        name: 'assistant archive supplement submit opens submitted result',
        test: source => /@tap="submitSupplement"/.test(source) && source.includes('/pages/assistant/archive-supplement-submitted/index?recordId='),
      },
    ],
  },
  {
    file: 'src/pages/assistant/archive-supplement-submitted/index.vue',
    assertions: [
      {
        name: 'assistant archive supplement submitted opens archive detail',
        test: source => /@tap="goArchive"/.test(source) && source.includes('/pages/archive/record-detail/index?recordId='),
      },
      {
        name: 'assistant archive supplement submitted returns to assistant and pending list',
        test: source => /@tap="backAssistant"/.test(source) && source.includes("'/pages/assistant/index'") && /@tap="goPendingList"/.test(source) && source.includes("'/pages/archive/draft-list/index'"),
      },
      {
        name: 'assistant archive supplement submitted avoids raw implementation store names',
        test: source => !/archiveStore|teacherArchiveFacts/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/training/index.vue',
    assertions: [
      {
        name: 'training home demand and list actions navigate',
        test: source => source.includes("'/pages/activity/training-demand/index'") && source.includes("'/pages/activity/training-list/index'"),
      },
      {
        name: 'training home resource and summary actions open summary',
        test: source => /@tap="openLearningResource\(\)"/.test(source) && /@tap="goSummary\(\)"/.test(source) && source.includes('/pages/activity/training-summary/index?recordId='),
      },
    ],
  },
  {
    file: 'src/pages/activity/training-list/index.vue',
    assertions: [
      {
        name: 'training list application creates local application and opens result',
        test: source => source.includes('submitTrainingApplication(planId)') && source.includes('/pages/activity/training-application/index?applicationId='),
      },
      {
        name: 'training list learning and my-training actions open summary',
        test: source => /@tap="item.primary \? startLearning\(\) : goApplication\(item.id\)"/.test(source) && /@tap="goSummary\(item.id\)"/.test(source),
      },
      {
        name: 'training list empty action opens training demand',
        test: source => /@tap="goDemand"/.test(source) && source.includes("'/pages/activity/training-demand/index'"),
      },
    ],
  },
  {
    file: 'src/pages/activity/training-application/index.vue',
    assertions: [
      {
        name: 'training application syncs local result state from query',
        test: source => source.includes('syncMobileTrainingApplicationResult('),
      },
      {
        name: 'training application detail and return actions navigate',
        test: source => /@tap="goApplicationDetail"/.test(source) && source.includes('mode=detail') && /@tap="goTraining"/.test(source) && source.includes("'/pages/activity/training-list/index'"),
      },
      {
        name: 'training application activity home action returns to activity',
        test: source => /@tap="goActivityHome"/.test(source) && source.includes("'/pages/activity/index'"),
      },
    ],
  },
  {
    file: 'src/pages/activity/training-summary/index.vue',
    assertions: [
      {
        name: 'training summary rule explanation has explicit feedback',
        test: source => /@tap="showRuleFeedback"/.test(source) && source.includes('归档规则为本地模拟'),
      },
      {
        name: 'training summary certificate choices update local state',
        test: source => /const selectedCertificateIndex = ref/.test(source) && /@tap="selectCertificateChoice\(index\)"/.test(source),
      },
      {
        name: 'training summary draft actions update local operation state',
        test: source => /@tap="editSummary"/.test(source) && /@tap="optimizeSummary"/.test(source) && /@tap="saveDraft"/.test(source),
      },
      {
        name: 'training summary optional thought edit has explicit feedback',
        test: source => /@tap="showThoughtFeedback"/.test(source) && source.includes('后续培训想法为本地模拟'),
      },
      {
        name: 'training summary submit creates archive result',
        test: source => source.includes('submitTrainingArchive(') && source.includes('/pages/activity/training-archive-result/index?recordId='),
      },
    ],
  },
  {
    file: 'src/pages/activity/training-archive-result/index.vue',
    assertions: [
      {
        name: 'training archive result opens training home and archive record',
        test: source => /@tap="goTraining"/.test(source) && source.includes("'/pages/activity/training/index'") && /@tap="goArchiveRecord"/.test(source) && source.includes('/pages/archive/record-detail/index?recordId='),
      },
      {
        name: 'training archive result opens pending list and activity home',
        test: source => /@tap="goArchivePendingList"/.test(source) && source.includes("'/pages/archive/draft-list/index'") && /@tap="goHome"/.test(source) && source.includes("'/pages/activity/index'"),
      },
    ],
  },
  {
    file: 'src/pages/activity/reflection-start/index.vue',
    assertions: [
      {
        name: 'reflection start report and manual methods enter expected routes',
        test: source => source.includes("'/pages/activity/reflection-course/index'") && source.includes("'/pages/activity/reflection-ai-chat/index'"),
      },
      {
        name: 'reflection start draft action enters draft page',
        test: source => /@tap="continueReflectionDraft"/.test(source) && source.includes("'/pages/activity/reflection-draft/index'"),
      },
      {
        name: 'reflection start method selection updates local reflection state',
        test: source => source.includes('startReflection(method)'),
      },
    ],
  },
  {
    file: 'src/pages/activity/reflection-scope/index.vue',
    assertions: [
      {
        name: 'reflection scope range options update local state',
        test: source => /const selectedScopeIndex = ref/.test(source) && /@tap="selectScope\(index\)"/.test(source),
      },
      {
        name: 'reflection scope period tabs update local state',
        test: source => /const selectedPeriodIndex = ref/.test(source) && /@tap="selectPeriod\(index\)"/.test(source),
      },
      {
        name: 'reflection scope evidence and supplements update state or navigate',
        test: source => /@tap="selectEvidence/.test(source) && /@tap="uploadMaterial"/.test(source) && /@tap="recordAudio"/.test(source) && source.includes("'/pages/activity/reflection-ai-chat/index'"),
      },
      {
        name: 'reflection scope starts guided reflection',
        test: source => /@tap="goSelfReflection"/.test(source) && source.includes("'/pages/activity/reflection-self/index'"),
      },
    ],
  },
  {
    file: 'src/pages/activity/reflection-course/index.vue',
    assertions: [
      {
        name: 'reflection course scope options update local state',
        test: source => /const selectedScopeIndex = ref/.test(source) && /@tap="selectScope\(index\)"/.test(source),
      },
      {
        name: 'reflection course evidence type and rows update local state',
        test: source => /const selectedEvidenceTypeIndex = ref/.test(source) && /@tap="selectEvidenceType\(index\)"/.test(source) && /@tap="selectCourseEvidence/.test(source),
      },
      {
        name: 'reflection course supplements update state or navigate',
        test: source => /@tap="uploadMaterial"/.test(source) && /@tap="recordAudio"/.test(source) && source.includes("'/pages/activity/reflection-ai-chat/index'"),
      },
      {
        name: 'reflection course starts evidence selection flow',
        test: source => /@tap="goEvidenceSelect"/.test(source) && source.includes("'/pages/activity/reflection-evidence/index'"),
      },
    ],
  },
  {
    file: 'src/pages/activity/reflection-self/index.vue',
    assertions: [
      {
        name: 'reflection self scope cards update local state',
        test: source => /const selectedScopeIndex = ref/.test(source) && /@tap="selectScope\(index\)"/.test(source),
      },
      {
        name: 'reflection self start option cards have explicit feedback or action',
        test: source => /@tap="showStartOptionFeedback\('直接和 AI 聊聊'\)"/.test(source) && /@tap="showStartOptionFeedback\('上传教学资料'\)"/.test(source),
      },
      {
        name: 'reflection self supplement cards update material state',
        test: source => /@tap="addMaterial\(item.title\)"/.test(source),
      },
      {
        name: 'reflection self starts ai chat',
        test: source => /@tap="goAiChat"/.test(source) && source.includes("'/pages/activity/reflection-ai-chat/index'"),
      },
    ],
  },
  {
    file: 'src/pages/activity/reflection-draft/index.vue',
    assertions: [
      {
        name: 'reflection draft edit actions give explicit feedback',
        test: source => /@tap="editDraft"/.test(source) && /@tap="addThought"/.test(source) && /@tap="optimizeDraft"/.test(source) && source.includes('uni.showToast'),
      },
      {
        name: 'reflection draft save and confirm have stateful actions',
        test: source => /@tap="saveDraft"/.test(source) && source.includes('saveReflectionDraft()') && /@tap="goSuccess"/.test(source) && source.includes("'/pages/activity/reflection-success/index'"),
      },
    ],
  },
  {
    file: 'src/pages/activity/reflection-ai-chat/index.vue',
    assertions: [
      {
        name: 'reflection ai chat quick chips give explicit feedback',
        test: source => /@tap="selectQuickOption\(item\)"/.test(source) && source.includes('已记录对话选项'),
      },
      {
        name: 'reflection ai chat clue detail and continue actions give feedback',
        test: source => /@tap="showClueDetail"/.test(source) && /@tap="continueChat"/.test(source) && source.includes('反思线索详情为本地模拟'),
      },
      {
        name: 'reflection ai chat composer input gives feedback',
        test: source => /@tap="showComposerFeedback"/.test(source) && source.includes('输入框为本地模拟'),
      },
      {
        name: 'reflection ai chat supplement and draft actions update state or navigate',
        test: source => /@tap="addSupplement\(item\)"/.test(source) && /@tap="goDraft"/.test(source) && source.includes("'/pages/activity/reflection-draft/index'"),
      },
    ],
  },
  {
    file: 'src/pages/activity/reflection-evidence/index.vue',
    assertions: [
      {
        name: 'reflection evidence scope options update local state',
        test: source => /const selectedScopeIndex = ref/.test(source) && /@tap="selectScope\(index\)"/.test(source),
      },
      {
        name: 'reflection evidence rows update local selection state',
        test: source => /const selectedEvidenceIds = ref/.test(source) && /@tap="toggleEvidence\(row.id\)"/.test(source),
      },
      {
        name: 'reflection evidence supplements update state or navigate',
        test: source => /@tap="uploadMaterial"/.test(source) && /@tap="recordAudio"/.test(source) && source.includes("'/pages/activity/reflection-ai-chat/index'"),
      },
      {
        name: 'reflection evidence starts scope flow',
        test: source => /@tap="goScopeSelect"/.test(source) && source.includes("'/pages/activity/reflection-scope/index'"),
      },
    ],
  },
  {
    file: 'src/pages/activity/reflection-success/index.vue',
    assertions: [
      {
        name: 'reflection success opens archive detail and new reflection',
        test: source => /@tap="goReflectionDetail"/.test(source) && source.includes('/pages/archive/record-detail/index?recordId=') && /@tap="goNewReflection"/.test(source) && source.includes("'/pages/activity/reflection-start/index'"),
      },
      {
        name: 'reflection success returns to activity home',
        test: source => /@tap="goActivityHome"/.test(source) && source.includes("'/pages/activity/index'"),
      },
    ],
  },
  {
    file: 'src/pages/activity/enterprise-list/index.vue',
    assertions: [
      {
        name: 'enterprise list filters update local enterprise state',
        test: source => /<wd-tabs v-model="selectedFilter"/.test(source)
          && /set:\s*\(value: EnterpriseFilter\) => selectFilter\(value\)/.test(source)
          && source.includes('setEnterpriseFilter(filter)'),
      },
      {
        name: 'enterprise list record actions enter log supplement or archive detail',
        test: source => source.includes('/pages/activity/enterprise-log-record/index?recordId=') && source.includes('/pages/activity/enterprise-supplement-needed/index?recordId=') && source.includes('/pages/archive/record-detail/index?recordId=enterprise-practice-shandong-software'),
      },
      {
        name: 'enterprise list year selector gives explicit local feedback',
        test: source => /@tap="showYearFeedback"/.test(source) && source.includes('年度筛选为本地模拟'),
      },
      {
        name: 'enterprise list history action opens supplement page',
        test: source => /@tap="goHistorySupplement"/.test(source) && source.includes("'/pages/activity/enterprise-history-supplement/index'"),
      },
    ],
  },
  {
    file: 'src/pages/activity/enterprise-advanced-search/index.vue',
    assertions: [
      {
        name: 'enterprise advanced search upload updates local supplement material',
        test: source => /@tap="uploadProof"/.test(source) && source.includes('addEnterpriseSupplementMaterial()'),
      },
      {
        name: 'enterprise advanced search later action saves local draft',
        test: source => /@tap="handleLater"/.test(source) && source.includes("saveEnterpriseArchiveDraft('enterprise-jinan-training-base')"),
      },
      {
        name: 'enterprise advanced search submit opens supplement submitted result',
        test: source => /@tap="submitSupplement"/.test(source) && source.includes('/pages/activity/enterprise-supplement-submitted/index?recordId='),
      },
      {
        name: 'enterprise advanced search note field gives explicit local feedback',
        test: source => /@tap="showNoteFeedback"/.test(source) && source.includes('补充说明为本地模拟'),
      },
    ],
  },
  {
    file: 'src/pages/activity/enterprise-overview/index.vue',
    assertions: [
      {
        name: 'enterprise overview filters update local enterprise state',
        test: source => /<wd-tabs v-model="selectedFilter"/.test(source)
          && /set:\s*\(value: EnterpriseFilter\) => selectFilter\(value\)/.test(source)
          && source.includes('setEnterpriseFilter(filter)'),
      },
      {
        name: 'enterprise overview record actions enter log supplement or archive detail',
        test: source => source.includes('/pages/activity/enterprise-log-record/index?recordId=') && source.includes('/pages/activity/enterprise-supplement-needed/index?recordId=') && source.includes('/pages/archive/record-detail/index?recordId=enterprise-practice-shandong-software'),
      },
      {
        name: 'enterprise overview history action opens supplement page',
        test: source => /@tap="goHistorySupplement"/.test(source) && source.includes("'/pages/activity/enterprise-history-supplement/index'"),
      },
    ],
  },
  {
    file: 'src/pages/activity/enterprise-login-history/index.vue',
    assertions: [
      {
        name: 'enterprise login history draft actions save local archive draft',
        test: source => /@tap="updateArchiveDraft"/.test(source) && /@tap="saveArchiveDraft"/.test(source) && source.includes('saveEnterpriseArchiveDraft()'),
      },
      {
        name: 'enterprise login history submit opens archive result',
        test: source => /@tap="submitArchive"/.test(source) && source.includes('/pages/activity/enterprise-archive-result/index?recordId='),
      },
      {
        name: 'enterprise login history material supplement updates local state',
        test: source => /@tap="supplementMaterial"/.test(source) && source.includes('addEnterpriseSupplementMaterial()'),
      },
      {
        name: 'enterprise login history attachment head gives explicit feedback',
        test: source => /@tap="showAttachmentFeedback"/.test(source) && source.includes('附件清单为本地模拟'),
      },
    ],
  },
  {
    file: 'src/pages/activity/enterprise-workflow-config/index.vue',
    assertions: [
      {
        name: 'enterprise workflow config share and download actions give feedback',
        test: source => /@tap="showToast\('分享日志'\)"/.test(source) && /@tap="showToast\('全部下载'\)"/.test(source),
      },
      {
        name: 'enterprise workflow config attachment view gives feedback',
        test: source => /@tap="showToast\(`查看\$\{item.name\}`\)"/.test(source),
      },
      {
        name: 'enterprise workflow config practice row gives explicit feedback',
        test: source => /@tap="showPracticeFeedback"/.test(source) && source.includes('所属实践为本地模拟'),
      },
      {
        name: 'enterprise workflow config return action navigates back',
        test: source => /@tap="goEnterpriseLogList"/.test(source) && source.includes('uni.navigateBack()'),
      },
    ],
  },
  {
    file: 'src/pages/activity/enterprise-plan-confirm/index.vue',
    assertions: [
      {
        name: 'enterprise plan confirm submit creates local pending plan',
        test: source => /@tap="submitPlan"/.test(source) && source.includes('submitEnterprisePlan()'),
      },
      {
        name: 'enterprise plan confirm submit opens pending result',
        test: source => source.includes("'/pages/activity/enterprise-import-export/index'"),
      },
      {
        name: 'enterprise plan confirm secondary action returns for editing',
        test: source => /@tap="goBack"/.test(source) && source.includes('uni.navigateBack()'),
      },
    ],
  },
  {
    file: 'src/pages/activity/enterprise-plan-approved/index.vue',
    assertions: [
      {
        name: 'enterprise plan approved list and log actions approve local plan',
        test: source => /@tap="goEnterpriseList"/.test(source) && /@tap="goLogRecord"/.test(source) && source.includes('approveEnterprisePlan()'),
      },
      {
        name: 'enterprise plan approved opens list and log record pages',
        test: source => source.includes("'/pages/activity/enterprise-list/index'") && source.includes('/pages/activity/enterprise-log-record/index?recordId='),
      },
    ],
  },
  {
    file: 'src/pages/activity/enterprise-plan-rejected/index.vue',
    assertions: [
      {
        name: 'enterprise plan rejected actions update local rejected state',
        test: source => /@tap="goEnterpriseList"/.test(source) && /@tap="goPlanEdit"/.test(source) && source.includes('rejectEnterprisePlan()'),
      },
      {
        name: 'enterprise plan rejected opens list and edit routes',
        test: source => source.includes("'/pages/activity/enterprise-list/index'") && source.includes("'/pages/activity/enterprise-plan-edit/index'"),
      },
      {
        name: 'enterprise plan rejected attachment view gives explicit feedback',
        test: source => /@tap="showAttachmentFeedback"/.test(source) && source.includes('已提交附件为本地模拟'),
      },
    ],
  },
  {
    file: 'src/pages/activity/enterprise-supplement-needed/index.vue',
    assertions: [
      {
        name: 'enterprise supplement needed opens resupplement page',
        test: source => /@tap="goSupplement"/.test(source) && source.includes("'/pages/activity/enterprise-resupplement/index'"),
      },
      {
        name: 'enterprise supplement needed submit creates local supplement and result',
        test: source => /@tap="submitAgain"/.test(source) && source.includes('submitEnterpriseSupplement()') && source.includes("'/pages/activity/enterprise-supplement-submitted/index'"),
      },
      {
        name: 'enterprise supplement needed material row gives explicit feedback',
        test: source => /@tap="showMaterialFeedback"/.test(source) && source.includes('已提交材料为本地模拟'),
      },
    ],
  },
  {
    file: 'src/pages/activity/enterprise-supplement-submitted/index.vue',
    assertions: [
      {
        name: 'enterprise supplement submitted syncs archive record from query',
        test: source => source.includes('findArchiveRecordById(query.value.recordId)') && source.includes('createEnterprisePracticeArchiveRecord()'),
      },
      {
        name: 'enterprise supplement submitted opens archive pending detail and activity home',
        test: source => /@tap="goArchivePendingList"/.test(source) && /@tap="goArchiveRecord"/.test(source) && /@tap="goActivityHome"/.test(source),
      },
      {
        name: 'enterprise supplement submitted avoids raw implementation store names',
        test: source => !/archiveStore|teacherArchiveFacts/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/enterprise-history-supplement-needed/index.vue',
    assertions: [
      {
        name: 'enterprise history supplement needed help and upload actions give feedback',
        test: source => /@tap="showHelp"/.test(source) && /@tap="showUploadTip"/.test(source),
      },
      {
        name: 'enterprise history supplement needed draft and submit actions give feedback',
        test: source => /@tap="saveDraft"/.test(source) && /@tap="submitAgain"/.test(source) && source.includes('草稿已保存') && source.includes('补充后可重新提交'),
      },
    ],
  },
  {
    file: 'src/pages/activity/enterprise-history-confirmed/index.vue',
    assertions: [
      {
        name: 'enterprise history confirmed bottom actions open list and archive',
        test: source => /@tap="goEnterpriseList"/.test(source) && /@tap="goEnterpriseArchive"/.test(source) && source.includes("'/pages/activity/enterprise-list/index'") && source.includes('/pages/archive/record-detail/index?recordId='),
      },
      {
        name: 'enterprise history confirmed follow rows open matching routes',
        test: source => /@tap="goFollowItem\(item.title\)"/.test(source) && source.includes('goEnterpriseList()') && source.includes('goEnterpriseArchive()'),
      },
    ],
  },
  {
    file: 'src/pages/activity/enterprise-import-export/index.vue',
    assertions: [
      {
        name: 'enterprise import export opens submitted content and list',
        test: source => /@tap="viewSubmit"/.test(source) && /@tap="goEnterpriseList"/.test(source) && source.includes("'/pages/activity/enterprise-plan-confirm/index'") && source.includes("'/pages/activity/enterprise-list/index'"),
      },
      {
        name: 'enterprise import export avoids raw implementation store names',
        test: source => !/archiveStore|teacherArchiveFacts/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/enterprise-archive-success/index.vue',
    assertions: [
      {
        name: 'enterprise archive success creates local archive record and opens outputs',
        test: source => source.includes('createEnterprisePracticeArchiveRecord()') && /@tap="goActivityHome"/.test(source) && /@tap="goArchivePendingList"/.test(source) && /@tap="goArchiveRecord"/.test(source),
      },
      {
        name: 'enterprise archive success material row gives explicit feedback',
        test: source => /@tap="showMaterialFeedback"/.test(source) && source.includes('入档材料为本地模拟'),
      },
      {
        name: 'enterprise archive success avoids raw implementation store names',
        test: source => !/archiveStore|teacherArchiveFacts/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/enterprise-archive-edit/index.vue',
    assertions: [
      {
        name: 'enterprise archive edit field rows save local draft',
        test: source => /@tap="editField\(item.label\)"/.test(source) && source.includes('saveEnterpriseArchiveDraft()'),
      },
      {
        name: 'enterprise archive edit material and submit actions navigate',
        test: source => /@tap="goSupplementMaterial"/.test(source) && /@tap="saveEdit"/.test(source) && source.includes("'/pages/activity/enterprise-advanced-search/index'") && source.includes('/pages/activity/enterprise-archive-result/index?recordId='),
      },
      {
        name: 'enterprise archive edit textarea visual states give feedback',
        test: source => /@tap="showTextFeedback\('实践内容'\)"/.test(source) && /@tap="showTextFeedback\('补充说明'\)"/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/enterprise-archive-result/index.vue',
    assertions: [
      {
        name: 'enterprise archive result syncs archive record from query',
        test: source => source.includes('findArchiveRecordById(query.value.recordId)') && source.includes('createEnterprisePracticeArchiveRecord()'),
      },
      {
        name: 'enterprise archive result opens list pending list and archive detail',
        test: source => /@tap="backToList"/.test(source) && /@tap="goArchivePendingList"/.test(source) && /@tap="viewArchiveRecord"/.test(source),
      },
      {
        name: 'enterprise archive result avoids raw implementation store names',
        test: source => !/archiveStore|teacherArchiveFacts/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/room-entry-state/index.vue',
    assertions: [
      {
        name: 'room entry state activity cards open real growth routes',
        test: source => source.includes("url: '/pages/activity/training/index'") && source.includes("url: '/pages/activity/enterprise-overview/index'") && source.includes("url: '/pages/activity/virtual-research-room/index'"),
      },
      {
        name: 'room entry state visual actions give feedback',
        test: source => /@tap="showToast\('5 条通知'\)"/.test(source) && /@tap="showToast\('发展周期'\)"/.test(source) && /@tap="showToast\('全部活动'\)"/.test(source),
      },
      {
        name: 'room entry state reflection action opens start page',
        test: source => /@tap="goReflectionStart"/.test(source) && source.includes("'/pages/activity/reflection-start/index'"),
      },
    ],
  },
]

const failures = []

for (const check of checks) {
  const source = read(check.file)
  for (const assertion of check.assertions) {
    if (!assertion.test(source)) {
      failures.push(`${check.file}: ${assertion.name}`)
    }
  }
}

if (failures.length > 0) {
  console.error('UX action closure check failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log(`UX action closure check passed: ${checks.length} pages`)
