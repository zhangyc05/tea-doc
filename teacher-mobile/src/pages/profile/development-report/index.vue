<script setup lang="ts">
import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobileNavbar from '../../../components/MobileNavbar.vue'
import MobilePageShell from '../../../components/MobilePageShell.vue'
import MobileStatusTag from '../../../components/MobileStatusTag.vue'

const evidenceRecords = [
  { id: 'certificate-digital-literacy', title: '数字素养培训证书', dimension: '教学设计' },
  { id: 'virtual-research-course-case-meeting', title: '课程案例共研活动记录', dimension: '教研协作' },
]

const actions = [
  '补充企业实践岗位评价材料',
  '参加数字化教学专题研修',
  '将虚拟教研成果沉淀为课程案例',
]

function goBack() {
  uni.navigateBack()
}

function navigateTo(url: string) {
  uni.navigateTo({ url })
}

function showExportNotice() {
  uni.showModal({
    title: '报告导出为本地模拟',
    content: '当前为本地模拟发展报告，暂不生成导出文件；报告依据和画像解读可在页面内查看。',
    showCancel: false,
  })
}

function goAiInterpretation() {
  navigateTo('/pages/profile/ability-profile/index?from=development-report')
}
</script>

<template>
  <MobilePageShell class="report-page" active="profile">
    <MobileNavbar title="个人发展报告" size="compact" @back="goBack" />

    <MobileCard class="hero-card">
      <view class="hero-head">
        <view>
          <text class="eyebrow">报告周期</text>
          <text class="hero-title">2026 年度发展报告</text>
        </view>
        <MobileStatusTag tone="orange">草稿已生成</MobileStatusTag>
      </view>
      <text class="hero-desc">报告基于能力画像和已入档记录生成，当前为前台模拟摘要。</text>
      <view class="report-actions">
        <MobileActionButton class="report-action" variant="outline" @tap="showExportNotice">导出报告</MobileActionButton>
        <MobileActionButton class="report-action" variant="outline" @tap="goAiInterpretation">AI 解读</MobileActionButton>
      </view>
    </MobileCard>

    <MobileCard class="section-card">
      <text class="section-title">能力摘要</text>
      <text class="summary-text">教学设计优势明显，数字化工具应用和课程资源建设有稳定证据。企业实践材料仍不足，影响目标岗位和聘期要求的完成判断。</text>
    </MobileCard>

    <MobileCard class="section-card">
      <text class="section-title">依据记录</text>
      <view v-for="record in evidenceRecords" :key="record.id" class="evidence-row" @tap="navigateTo(`/pages/archive/record-detail/index?recordId=${record.id}`)">
        <view>
          <text class="evidence-title">{{ record.title }}</text>
          <text class="evidence-meta">引用维度：{{ record.dimension }}</text>
        </view>
        <view class="row-arrow"></view>
      </view>
      <MobileActionButton class="wide-action" variant="outline" arrow @tap="navigateTo('/pages/profile/ability-profile/records/index?from=development-report')">
        查看全部依据
      </MobileActionButton>
    </MobileCard>

    <MobileCard class="section-card">
      <text class="section-title">建议行动</text>
      <text v-for="item in actions" :key="item" class="action-text">{{ item }}</text>
    </MobileCard>

    <MobileCard class="section-card action-card">
      <MobileActionButton class="wide-action" variant="outline" arrow @tap="navigateTo('/pages/profile/target-position/index?from=development-report')">
        目标岗位对照
      </MobileActionButton>
      <MobileActionButton class="wide-action" variant="outline" arrow @tap="navigateTo('/pages/profile/tenure-requirement/index?from=development-report')">
        聘期要求对照
      </MobileActionButton>
    </MobileCard>
  </MobilePageShell>
</template>

<style lang="scss" scoped>
.report-page {
  padding-bottom: calc(150rpx + env(safe-area-inset-bottom));
}

.hero-card,
.section-card {
  margin-top: 22rpx;
  padding: 32rpx;
  border-radius: 30rpx;
}

.hero-head,
.evidence-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18rpx;
}

.eyebrow,
.hero-desc,
.summary-text,
.evidence-meta,
.action-text {
  display: block;
  color: #66728a;
  font-size: 24rpx;
  line-height: 1.6;
}

.hero-title,
.section-title,
.evidence-title {
  display: block;
  color: #10172d;
  font-weight: 900;
}

.hero-title {
  margin-top: 8rpx;
  font-size: 44rpx;
}

.section-title {
  font-size: 34rpx;
}

.hero-desc,
.summary-text,
.action-text {
  margin-top: 16rpx;
}

.report-actions,
.action-card {
  display: grid;
  gap: 18rpx;
}

.report-actions {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin-top: 24rpx;
}

.report-action,
.wide-action {
  height: 82rpx;
  font-size: 26rpx;
}

.evidence-row {
  padding: 22rpx 0;
  border-bottom: 1rpx solid #edf1f6;
}

.evidence-title {
  font-size: 28rpx;
}

.row-arrow {
  width: 18rpx;
  height: 18rpx;
  border-top: 5rpx solid #9aa5b8;
  border-right: 5rpx solid #9aa5b8;
  transform: rotate(45deg);
}

.wide-action {
  width: 100%;
  margin-top: 22rpx;
}
</style>
