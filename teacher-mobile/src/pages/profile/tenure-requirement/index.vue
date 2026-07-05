<script setup lang="ts">
import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobileNavbar from '../../../components/MobileNavbar.vue'
import MobilePageShell from '../../../components/MobilePageShell.vue'
import MobileStatusTag from '../../../components/MobileStatusTag.vue'

const completed = [
  { title: '继续教育学时', recordId: 'certificate-digital-literacy' },
  { title: '教研活动参与', recordId: 'virtual-research-course-case-meeting' },
]

const missing = ['企业实践不少于 30 天证明', '课程改革成果归档记录']
const actions = [
  { title: '补充企业实践证明材料', url: '/pages/activity/enterprise-advanced-search/index?from=tenure-requirement' },
  { title: '提交课程案例成果', url: '/pages/activity/virtual-research-activity-list/index?from=tenure-requirement' },
  { title: '关注聘期风险提醒', url: '/pages/profile/target-position/index?from=tenure-requirement' },
]

function goBack() {
  uni.navigateBack()
}

function navigateTo(url: string) {
  uni.navigateTo({ url })
}

</script>

<template>
  <MobilePageShell class="tenure-page" active="profile">
    <MobileNavbar title="聘期要求对照" size="compact" @back="goBack" />

    <MobileCard class="hero-card">
      <view class="hero-head">
        <view>
          <text class="eyebrow">当前聘期</text>
          <text class="hero-title">2025-2027 ｜ 第 2 年</text>
        </view>
        <MobileStatusTag tone="orange">2 项风险</MobileStatusTag>
      </view>
      <view class="progress-row">
        <text>总体完成度</text>
        <text class="progress-number">68%</text>
      </view>
      <wd-progress class="tenure-progress" :percentage="68" color="#ff9f43" hide-text />
    </MobileCard>

    <MobileCard class="section-card">
      <text class="section-title">已完成证据</text>
      <view v-for="item in completed" :key="item.recordId" class="evidence-row" @tap="navigateTo(`/pages/archive/record-detail/index?recordId=${item.recordId}`)">
        <text>{{ item.title }}</text>
        <wd-icon class="row-arrow" name="chevron-right" size="28rpx" color="#9aa5b8" />
      </view>
      <MobileActionButton class="wide-action" variant="outline" arrow @tap="navigateTo('/pages/profile/ability-profile/records/index?from=tenure-requirement')">
        查看全部证据
      </MobileActionButton>
    </MobileCard>

    <MobileCard class="section-card">
      <text class="section-title">缺失证据</text>
      <text v-for="item in missing" :key="item" class="missing-item">{{ item }}</text>
    </MobileCard>

    <MobileCard class="section-card">
      <text class="section-title">建议行动</text>
      <view v-for="item in actions" :key="item.title" class="action-row">
        <text>{{ item.title }}</text>
        <MobileActionButton class="small-action" variant="outline" @tap="navigateTo(item.url)">去完成</MobileActionButton>
      </view>
    </MobileCard>
  </MobilePageShell>
</template>

<style lang="scss" scoped>
.tenure-page {
  padding-bottom: calc(150rpx + env(safe-area-inset-bottom));
}

.hero-card,
.section-card {
  margin-top: 22rpx;
  padding: 32rpx;
  border-radius: 30rpx;
}

.hero-head,
.progress-row,
.evidence-row,
.action-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18rpx;
}

.eyebrow,
.missing-item,
.action-row,
.evidence-row {
  color: #66728a;
  font-size: 25rpx;
  line-height: 1.6;
}

.hero-title,
.section-title,
.progress-number {
  color: #10172d;
  font-weight: 900;
}

.hero-title {
  display: block;
  margin-top: 8rpx;
  font-size: 42rpx;
}

.section-title {
  display: block;
  font-size: 34rpx;
}

.progress-row {
  margin-top: 26rpx;
  color: #66728a;
  font-size: 25rpx;
}

.progress-number {
  font-size: 34rpx;
}

.tenure-progress {
  margin-top: 14rpx;
}

.tenure-progress :deep(.wd-progress__outer) {
  height: 16rpx;
  background: #edf3f7;
}

.tenure-progress :deep(.wd-progress__inner) {
  border-radius: 999rpx;
}

.evidence-row,
.action-row {
  padding: 22rpx 0;
  border-bottom: 1rpx solid #edf1f6;
}

.missing-item {
  display: block;
  margin-top: 16rpx;
  color: #c77712;
}

.row-arrow {
  display: flex;
  width: 28rpx;
  height: 28rpx;
  align-items: center;
  justify-content: center;
}

.wide-action {
  width: 100%;
  height: 82rpx;
  margin-top: 22rpx;
  font-size: 26rpx;
}

.small-action {
  width: 140rpx;
  height: 60rpx;
  font-size: 24rpx;
}
</style>
