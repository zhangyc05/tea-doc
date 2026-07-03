<script setup lang="ts">
import { computed, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobileNavbar from '../../../components/MobileNavbar.vue'
import MobilePageShell from '../../../components/MobilePageShell.vue'
import MobileStatusTag from '../../../components/MobileStatusTag.vue'
import {
  findArchiveRecordById,
  findArchiveRecordByTitle,
  getArchiveRecordStatusLabel,
  previewArchiveMaterial,
} from '../../../domain/archive'

type DetailQuery = {
  recordId?: string
  recordTitle?: string
  category?: string
  recordType?: string
  source?: string
  status?: string
}

const query = ref<DetailQuery>({})

const defaultRecord = {
  id: 'certificate-digital-literacy',
  title: '职业院校教师数字素养提升培训证书',
  category: '个人发展',
  type: '培训进修',
  status: '已入档',
  updatedAt: '2026.06.14',
  source: '待办确认',
  owner: '林老师 ｜ 智能制造学院',
  summary: '系统识别培训证书后由教师确认，已沉淀到个人发展维度，可作为能力画像和个人发展报告依据。',
  fields: [
    { label: '培训项目', value: '教师数字素养提升专项培训' },
    { label: '发证单位', value: '全国职业院校教师培训中心' },
    { label: '获得时间', value: '2026.06.10' },
    { label: '培训学时', value: '32 学时' },
    { label: '证书编号', value: 'PX20260610027' },
  ],
  materials: [{ name: '培训证书.jpg', meta: 'JPG · 1.2MB · 来源于待办确认' }],
  usages: [
    '能力画像：支撑数字素养相关能力证据',
    '个人发展报告：计入培训进修记录',
    '岗位/聘期对照：作为继续教育学时依据',
  ],
  sourceSteps: [
    { title: '系统识别', desc: '部门导入培训名单后，系统按姓名、工号和学院匹配到当前账号。', time: '06.14 09:12' },
    { title: '教师确认', desc: '教师在待办中确认记录属于本人。', time: '06.14 09:21' },
    { title: '写入档案', desc: '记录进入成长档案个人发展维度。', time: '06.14 09:22' },
  ],
}

const categoryLabels: Record<string, string> = {
  'basic-info': '基本信息',
  teaching: '教学工作',
  'personal-development': '个人发展',
  'enterprise-practice': '企业实践',
  research: '教研科研',
  'social-service': '社会服务',
  honor: '成果荣誉',
  assessment: '考核评价',
}

const sourceLabels: Record<string, string> = {
  todo: '待办确认',
  training: '培训归档',
  enterprise: '企业实践归档',
  research: '虚拟教研归档',
}

const typeLabels: Record<string, string> = {
  training: '培训进修',
  enterprise: '行业实践',
  research: '教研活动',
}

onLoad((options) => {
  query.value = options as DetailQuery
})

const matchedArchiveRecord = computed(() => {
  const title = query.value.recordTitle ? decodeURIComponent(query.value.recordTitle) : undefined
  return findArchiveRecordById(query.value.recordId) || findArchiveRecordByTitle(title)
})

const record = computed(() => {
  const matched = matchedArchiveRecord.value
  const status = query.value.status === 'pending-verify' ? '归档确认中' : matched ? getArchiveRecordStatusLabel(matched.status) : defaultRecord.status

  return {
    ...defaultRecord,
    id: matched?.id || defaultRecord.id,
    title: matched?.title || (query.value.recordTitle ? decodeURIComponent(query.value.recordTitle) : defaultRecord.title),
    category: matched?.categoryName || (query.value.category ? categoryLabels[query.value.category] || defaultRecord.category : defaultRecord.category),
    type: matched?.type || (query.value.recordType ? typeLabels[query.value.recordType] || defaultRecord.type : defaultRecord.type),
    status,
    updatedAt: matched?.updatedAt || defaultRecord.updatedAt,
    source: matched?.source || (query.value.source ? sourceLabels[query.value.source] || defaultRecord.source : defaultRecord.source),
    owner: matched?.owner || defaultRecord.owner,
    summary:
      query.value.status === 'pending-verify'
        ? '材料已提交，正在等待部门或系统确认。确认通过后，这条记录将沉淀到对应成长档案维度。'
        : matched?.summary || defaultRecord.summary,
    fields: matched?.fields || defaultRecord.fields,
    materials: matched?.materials || defaultRecord.materials,
    usages: matched?.usages || defaultRecord.usages,
    sourceSteps: query.value.status === 'pending-verify' ? pendingSourceSteps : matched?.sourceSteps || defaultRecord.sourceSteps,
  }
})

const pendingSourceSteps = [
  { title: '材料提交', desc: '教师已提交总结、证明或贡献材料。', time: '已完成' },
  { title: '归档确认', desc: '等待部门或系统确认材料是否可作为正式档案事实。', time: '进行中' },
  { title: '写入档案', desc: '确认通过后进入对应成长档案维度。', time: '待完成' },
]

const sourceSteps = computed(() => {
  if (query.value.status === 'pending-verify') {
    return pendingSourceSteps
  }

  return record.value.sourceSteps
})

function goBack() {
  uni.navigateBack()
}

function requestCorrection() {
  uni.navigateTo({
    url: `/pages/archive/correction/apply/index?recordId=${record.value.id}`,
  })
}

function previewMaterial(material: { name: string; meta: string }) {
  const preview = previewArchiveMaterial(material)
  uni.showToast({ title: preview.message, icon: 'none' })
}
</script>

<template>
  <MobilePageShell class="record-detail-page" active="archive">
    <MobileNavbar title="档案详情" size="compact" @back="goBack" />

    <MobileCard class="hero-card">
      <view class="hero-mark">
        <view class="hero-mark__paper"></view>
        <view class="hero-mark__seal"></view>
      </view>
      <view class="hero-copy">
        <MobileStatusTag tone="green">{{ record.status }}</MobileStatusTag>
        <text class="hero-title">{{ record.title }}</text>
        <text class="hero-meta">{{ record.category }} ｜ {{ record.type }} ｜ {{ record.updatedAt }}</text>
      </view>
    </MobileCard>

    <MobileCard class="section-card">
      <text class="section-title">档案摘要</text>
      <text class="summary-text">{{ record.summary }}</text>
      <view class="summary-grid">
        <view class="summary-item">
          <text class="summary-label">来源</text>
          <text class="summary-value">{{ record.source }}</text>
        </view>
        <view class="summary-item">
          <text class="summary-label">归属</text>
          <text class="summary-value">{{ record.owner }}</text>
        </view>
      </view>
    </MobileCard>

    <MobileCard class="section-card">
      <text class="section-title">关键信息</text>
      <view v-for="field in record.fields" :key="field.label" class="info-row">
        <text class="info-label">{{ field.label }}</text>
        <text class="info-value">{{ field.value }}</text>
      </view>
    </MobileCard>

    <MobileCard class="section-card">
      <text class="section-title">来源追溯</text>
      <view v-for="(step, index) in sourceSteps" :key="step.title" class="source-step">
        <view class="source-index">{{ index + 1 }}</view>
        <view class="source-body">
          <view class="source-head">
            <text class="source-title">{{ step.title }}</text>
            <text class="source-time">{{ step.time }}</text>
          </view>
          <text class="source-desc">{{ step.desc }}</text>
        </view>
      </view>
    </MobileCard>

    <MobileCard class="section-card">
      <text class="section-title">关联材料</text>
      <view
        v-for="material in record.materials"
        :key="material.name"
        class="material-row"
        @tap="previewMaterial(material)"
      >
        <view class="material-icon"></view>
        <view class="material-body">
          <text class="material-name">{{ material.name }}</text>
          <text class="material-meta">{{ material.meta }}</text>
        </view>
        <text class="material-action">预览</text>
      </view>
    </MobileCard>

    <MobileCard class="section-card usage-card">
      <text class="section-title">被引用到</text>
      <text v-for="item in record.usages" :key="item" class="usage-item">{{ item }}</text>
    </MobileCard>

    <view class="footer-actions">
      <MobileActionButton class="footer-button" variant="outline" @tap="requestCorrection">
        申请更正
      </MobileActionButton>
      <MobileActionButton class="footer-button" variant="primary" @tap="goBack">
        返回档案
      </MobileActionButton>
    </view>
  </MobilePageShell>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.record-detail-page {
  min-height: 100vh;
  padding: calc(var(--status-bar-height) + 4rpx) 30rpx calc(206rpx + env(safe-area-inset-bottom));
  overflow-x: hidden;
  background:
    radial-gradient(circle at 13% 2%, rgba(220, 251, 235, 0.82), transparent 31%),
    linear-gradient(180deg, #ffffff 0%, #f8fbff 48%, #f6fbf9 100%);
  color: #10172d;
}

.hero-card,
.section-card {
  border-radius: 30rpx;
  box-shadow: 0 22rpx 56rpx rgba(35, 51, 87, 0.07);
}

.hero-card {
  display: flex;
  align-items: center;
  gap: 28rpx;
  margin-top: 30rpx;
  padding: 32rpx;
  border: 2rpx solid rgba(184, 239, 211, 0.92);
  background: linear-gradient(112deg, #edfff5 0%, #f7fffb 100%);
}

.hero-mark {
  position: relative;
  width: 144rpx;
  height: 144rpx;
  flex: 0 0 144rpx;
  border-radius: 40rpx;
  background: #dff9ec;
}

.hero-mark__paper {
  position: absolute;
  top: 28rpx;
  left: 36rpx;
  width: 74rpx;
  height: 88rpx;
  border-radius: 14rpx;
  background: #ffffff;
  box-shadow: inset 0 -14rpx 0 rgba(22, 119, 255, 0.1);
}

.hero-mark__seal {
  position: absolute;
  right: 26rpx;
  bottom: 26rpx;
  width: 42rpx;
  height: 42rpx;
  border-radius: 50%;
  background: #13a95b;
}

.hero-copy {
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
  gap: 12rpx;
}

.hero-title {
  color: #10172d;
  font-size: 36rpx;
  font-weight: 900;
  line-height: 1.28;
}

.hero-meta {
  color: #66758f;
  font-size: 24rpx;
  font-weight: 700;
  line-height: 1.5;
}

.section-card {
  margin-top: 24rpx;
  padding: 30rpx;
  background: rgba(255, 255, 255, 0.94);
}

.section-title {
  display: block;
  color: #10172d;
  font-size: 32rpx;
  font-weight: 900;
  line-height: 1.2;
}

.summary-text {
  display: block;
  margin-top: 18rpx;
  color: #4f5f78;
  font-size: 26rpx;
  font-weight: 700;
  line-height: 1.65;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18rpx;
  margin-top: 24rpx;
}

.summary-item {
  min-height: 116rpx;
  padding: 22rpx;
  border-radius: 24rpx;
  background: #f6fbff;
}

.summary-label,
.info-label,
.material-meta,
.source-time {
  color: #8a97aa;
  font-size: 22rpx;
  font-weight: 800;
}

.summary-value {
  display: block;
  margin-top: 10rpx;
  color: #14213d;
  font-size: 25rpx;
  font-weight: 900;
  line-height: 1.35;
}

.info-row,
.source-step,
.source-head,
.material-row {
  display: flex;
  align-items: center;
}

.info-row {
  justify-content: space-between;
  gap: 24rpx;
  padding: 24rpx 0;
  border-bottom: 2rpx solid #edf3fa;
}

.info-row:last-child {
  border-bottom: 0;
}

.info-value {
  flex: 1;
  color: #17233d;
  font-size: 26rpx;
  font-weight: 900;
  line-height: 1.45;
  text-align: right;
}

.source-step {
  align-items: flex-start;
  gap: 18rpx;
  padding-top: 26rpx;
}

.source-index {
  display: flex;
  width: 44rpx;
  height: 44rpx;
  align-items: center;
  justify-content: center;
  flex: 0 0 44rpx;
  border-radius: 50%;
  background: #e8f8ef;
  color: #13a95b;
  font-size: 22rpx;
  font-weight: 900;
}

.source-body {
  flex: 1;
  padding-bottom: 24rpx;
  border-bottom: 2rpx solid #edf3fa;
}

.source-step:last-child .source-body {
  border-bottom: 0;
}

.source-head {
  justify-content: space-between;
  gap: 18rpx;
}

.source-title {
  color: #17233d;
  font-size: 27rpx;
  font-weight: 900;
}

.source-desc {
  display: block;
  margin-top: 10rpx;
  color: #5d6b82;
  font-size: 24rpx;
  font-weight: 700;
  line-height: 1.55;
}

.material-row {
  gap: 18rpx;
  margin-top: 24rpx;
  padding: 22rpx;
  border-radius: 24rpx;
  background: #f7fbff;
}

.material-icon {
  width: 72rpx;
  height: 72rpx;
  flex: 0 0 72rpx;
  border-radius: 22rpx;
  background:
    linear-gradient(135deg, transparent 56%, rgba(255, 255, 255, 0.72) 57%),
    #e8f1ff;
}

.material-body {
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
  gap: 8rpx;
}

.material-name {
  color: #17233d;
  font-size: 27rpx;
  font-weight: 900;
}

.material-action {
  flex: 0 0 auto;
  color: #1677ff;
  font-size: 24rpx;
  font-weight: 900;
}

.usage-card {
  margin-bottom: 24rpx;
}

.usage-item {
  display: block;
  margin-top: 16rpx;
  padding: 18rpx 20rpx;
  border-radius: 22rpx;
  background: #f7fbff;
  color: #506078;
  font-size: 24rpx;
  font-weight: 800;
  line-height: 1.45;
}

.footer-actions {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 4;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18rpx;
  padding: 24rpx 30rpx calc(28rpx + env(safe-area-inset-bottom));
  border-top: 2rpx solid rgba(220, 232, 244, 0.82);
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 -18rpx 42rpx rgba(35, 51, 87, 0.08);
}

.footer-button {
  min-width: 0;
}
</style>
