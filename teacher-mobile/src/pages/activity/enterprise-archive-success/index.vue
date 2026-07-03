<script setup lang="ts">
import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobileNavbar from '../../../components/MobileNavbar.vue'

const infoRows = [
  { label: '实践单位', value: '山东某软件科技有限公司' },
  { label: '实践岗位', value: '软件开发工程师' },
  { label: '实践时间', value: '2023.07 - 2023.12' },
  { label: '实践天数', value: '180 天' },
]

const usageItems = [
  { title: '个人成长档案', type: 'folder' },
  { title: '岗位 / 聘期要求依据', type: 'award' },
  { title: '个人发展报告', type: 'chart' },
]

function goBack() {
  uni.navigateBack()
}

function goActivityHome() {
  uni.navigateTo({ url: '/pages/activity/index' })
}

function goArchiveRecord() {
  uni.navigateTo({
    url: '/pages/archive/record-detail/index?recordId=enterprise-practice-shandong-software',
  })
}
</script>

<template>
  <view class="archive-success-page">
    <MobileNavbar title="已入档" size="regular" @back="goBack" />

    <view class="content">
      <MobileCard class="success-card">
        <view class="success-mark"></view>
        <view class="success-copy">
          <text class="success-title">企业实践记录已入档</text>
          <text class="success-desc">你补充的企业实践证明材料已通过核验，这条记录已正式入档到「企业实践」。</text>
        </view>
        <view class="spark spark--one"></view>
        <view class="spark spark--two"></view>
      </MobileCard>

      <MobileCard class="record-card">
        <view class="record-head">
          <view class="company-icon"></view>
          <view class="record-copy">
            <text class="record-title">山东某软件科技有限公司企业实践</text>
            <view class="tag-row">
              <text class="tag tag--neutral">企业实践</text>
              <text class="tag tag--neutral">行业实践</text>
              <text class="tag tag--green">已入档</text>
            </view>
          </view>
        </view>

        <view class="section-title-row">
          <view class="accent-line"></view>
          <text class="section-title">系统已整理</text>
        </view>
        <view class="info-list">
          <view v-for="item in infoRows" :key="item.label" class="info-row">
            <text class="info-label">{{ item.label }}</text>
            <text class="info-value">{{ item.value }}</text>
          </view>
        </view>
      </MobileCard>

      <MobileCard class="material-card">
        <view class="section-title-row">
          <view class="accent-line"></view>
          <text class="section-title">入档材料</text>
        </view>

        <view class="file-row">
          <view class="pdf-icon">PDF</view>
          <view class="file-copy">
            <text class="file-name">企业实践证明.pdf</text>
            <text class="file-meta">PDF | 2.4MB</text>
          </view>
          <text class="file-state">已作为正式材料入档</text>
          <view class="chevron"></view>
        </view>

        <view class="audit-box">
          <view class="audit-row">
            <view class="audit-icon audit-icon--clock"></view>
            <text class="audit-label">入档时间</text>
            <text class="audit-value">今天 10:42</text>
          </view>
          <view class="audit-row">
            <view class="audit-icon audit-icon--org"></view>
            <text class="audit-label">核验部门</text>
            <text class="audit-value">智能制造学院</text>
          </view>
        </view>
      </MobileCard>

      <MobileCard class="usage-card">
        <view class="section-title-row">
          <view class="accent-line"></view>
          <text class="section-title">这条记录现在可用于</text>
        </view>

        <view class="usage-grid">
          <view v-for="item in usageItems" :key="item.title" class="usage-item">
            <view class="usage-icon" :class="`usage-icon--${item.type}`"></view>
            <text>{{ item.title }}</text>
          </view>
        </view>
        <text class="usage-desc">这条记录可作为个人成长档案、岗位 / 聘期要求和个人发展报告的正式依据。</text>
      </MobileCard>
    </view>

    <view class="bottom-actions">
      <MobileActionButton class="action-button action-button--home" variant="outline" @tap="goActivityHome">返回首页</MobileActionButton>
      <MobileActionButton class="action-button" variant="primary" @tap="goArchiveRecord">查看档案详情</MobileActionButton>
    </view>
  </view>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.archive-success-page {
  min-height: 100vh;
  padding-bottom: calc(154rpx + env(safe-area-inset-bottom));
  background:
    radial-gradient(circle at 18% 0%, rgba(224, 251, 238, 0.78), transparent 34%),
    linear-gradient(180deg, #fbfffd 0%, #ffffff 50%, #f2faf7 100%);
  color: #10172d;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 22rpx;
  padding: 24rpx 38rpx 0;
}

.success-card,
.record-head,
.tag-row,
.section-title-row,
.info-row,
.file-row,
.audit-row,
.usage-grid,
.bottom-actions {
  display: flex;
  align-items: center;
}

.success-card {
  position: relative;
  gap: 34rpx;
  padding: 48rpx 56rpx;
  overflow: hidden;
  border-radius: 18rpx;
  background: linear-gradient(105deg, rgba(225, 249, 237, 0.95), rgba(250, 255, 253, 0.96));
}

.success-mark {
  position: relative;
  width: 100rpx;
  height: 100rpx;
  flex: 0 0 auto;
  border-radius: 50%;
  background: linear-gradient(135deg, #35d27d, #0bae5b);
  box-shadow: inset 0 -8rpx 18rpx rgba(4, 128, 65, 0.18), 0 14rpx 26rpx rgba(6, 170, 88, 0.22);
}

.success-mark::before {
  position: absolute;
  left: 27rpx;
  top: 34rpx;
  width: 43rpx;
  height: 24rpx;
  border-bottom: 12rpx solid #fff;
  border-left: 12rpx solid #fff;
  content: '';
  transform: rotate(-45deg);
}

.success-copy {
  min-width: 0;
  flex: 1;
}

.success-title,
.success-desc,
.record-title,
.section-title,
.info-label,
.info-value,
.file-name,
.file-meta,
.audit-label,
.audit-value,
.usage-desc {
  display: block;
}

.success-title {
  color: #08a85c;
  font-size: 36rpx;
  font-weight: 900;
  line-height: 1.2;
}

.success-desc {
  margin-top: 20rpx;
  color: #10172d;
  font-size: 27rpx;
  line-height: 1.72;
}

.spark {
  position: absolute;
  width: 24rpx;
  height: 24rpx;
  background: #ffd97c;
  clip-path: polygon(50% 0, 62% 38%, 100% 50%, 62% 62%, 50% 100%, 38% 62%, 0 50%, 38% 38%);
}

.spark--one {
  left: 178rpx;
  top: 54rpx;
}

.spark--two {
  left: 56rpx;
  bottom: 56rpx;
  opacity: 0.56;
}

.record-card,
.material-card,
.usage-card {
  padding: 34rpx 38rpx;
  border-radius: 18rpx;
}

.record-head {
  gap: 24rpx;
  padding-bottom: 30rpx;
  border-bottom: 2rpx solid #edf0f4;
}

.company-icon {
  position: relative;
  width: 96rpx;
  height: 96rpx;
  flex: 0 0 auto;
  border-radius: 50%;
  background: #e6f9ef;
}

.company-icon::before {
  position: absolute;
  left: 34rpx;
  top: 28rpx;
  width: 36rpx;
  height: 44rpx;
  border-radius: 6rpx 6rpx 0 0;
  background: #18b66a;
  box-shadow: 30rpx 17rpx 0 #62d99c;
  content: '';
}

.company-icon::after {
  position: absolute;
  left: 43rpx;
  top: 39rpx;
  width: 8rpx;
  height: 8rpx;
  border-radius: 2rpx;
  background: #eafff2;
  box-shadow: 18rpx 0 0 #eafff2, 0 17rpx 0 #eafff2, 18rpx 17rpx 0 #eafff2;
  content: '';
}

.record-copy {
  min-width: 0;
  flex: 1;
}

.record-title {
  font-size: 34rpx;
  font-weight: 900;
  line-height: 1.32;
}

.tag-row {
  flex-wrap: wrap;
  gap: 14rpx;
  margin-top: 18rpx;
}

.tag {
  padding: 7rpx 16rpx;
  border-radius: 7rpx;
  font-size: 24rpx;
  font-weight: 800;
}

.tag--neutral {
  background: #f0f3f5;
  color: #1e2a3c;
}

.tag--green {
  background: #e1f8eb;
  color: #0ba75c;
}

.section-title-row {
  gap: 16rpx;
  margin-top: 28rpx;
}

.material-card .section-title-row,
.usage-card .section-title-row {
  margin-top: 0;
}

.accent-line {
  width: 8rpx;
  height: 34rpx;
  border-radius: 999rpx;
  background: #12b86a;
}

.section-title {
  font-size: 31rpx;
  font-weight: 900;
}

.info-list {
  margin-top: 26rpx;
}

.info-row {
  justify-content: space-between;
  gap: 24rpx;
  padding: 16rpx 0;
  border-bottom: 2rpx dashed #edf0f4;
}

.info-row:last-child {
  border-bottom: 0;
}

.info-label {
  flex: 0 0 150rpx;
  color: #1f2937;
  font-size: 28rpx;
}

.info-value {
  min-width: 0;
  flex: 1;
  color: #111827;
  font-size: 28rpx;
  text-align: right;
}

.file-row {
  position: relative;
  gap: 22rpx;
  margin-top: 26rpx;
  padding: 22rpx 48rpx 22rpx 24rpx;
  border-radius: 16rpx;
  background: #f7f9fb;
}

.pdf-icon {
  width: 56rpx;
  height: 70rpx;
  flex: 0 0 auto;
  border-radius: 8rpx;
  background: linear-gradient(135deg, #ff6b6b, #f04444);
  color: #fff;
  font-size: 21rpx;
  font-weight: 900;
  line-height: 74rpx;
  text-align: center;
}

.file-copy {
  min-width: 0;
  flex: 1;
}

.file-name {
  font-size: 29rpx;
  font-weight: 800;
}

.file-meta {
  margin-top: 10rpx;
  color: #6a7485;
  font-size: 27rpx;
}

.file-state {
  flex: 0 0 auto;
  color: #0aa65c;
  font-size: 26rpx;
  font-weight: 800;
}

.chevron {
  position: absolute;
  right: 26rpx;
  top: 50%;
  width: 18rpx;
  height: 18rpx;
  border-top: 4rpx solid #a4acb8;
  border-right: 4rpx solid #a4acb8;
  transform: translateY(-50%) rotate(45deg);
}

.audit-box {
  margin-top: 22rpx;
  overflow: hidden;
  border-radius: 16rpx;
  background: #f8fafb;
}

.audit-row {
  gap: 22rpx;
  padding: 22rpx 24rpx;
}

.audit-row + .audit-row {
  border-top: 2rpx solid #edf1f4;
}

.audit-icon {
  position: relative;
  width: 30rpx;
  height: 30rpx;
  flex: 0 0 auto;
  color: #10ad63;
}

.audit-icon--clock {
  border: 4rpx solid currentColor;
  border-radius: 50%;
}

.audit-icon--clock::before {
  position: absolute;
  left: 12rpx;
  top: 5rpx;
  width: 4rpx;
  height: 12rpx;
  border-radius: 999rpx;
  background: currentColor;
  box-shadow: 7rpx 10rpx 0 -1rpx currentColor;
  content: '';
}

.audit-icon--org::before {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 30rpx;
  height: 24rpx;
  background: currentColor;
  clip-path: polygon(50% 0, 100% 32%, 88% 32%, 88% 100%, 74% 100%, 74% 44%, 58% 44%, 58% 100%, 42% 100%, 42% 44%, 26% 44%, 26% 100%, 12% 100%, 12% 32%, 0 32%);
  content: '';
}

.audit-label {
  flex: 1;
  color: #243047;
  font-size: 28rpx;
}

.audit-value {
  color: #3f4857;
  font-size: 28rpx;
}

.usage-grid {
  justify-content: space-between;
  margin-top: 38rpx;
}

.usage-item {
  position: relative;
  width: 31%;
  color: #10172d;
  font-size: 26rpx;
  font-weight: 900;
  line-height: 1.3;
  text-align: center;
}

.usage-item + .usage-item::before {
  position: absolute;
  left: -12rpx;
  top: 0;
  width: 2rpx;
  height: 108rpx;
  background: #edf0f4;
  content: '';
}

.usage-icon {
  position: relative;
  width: 78rpx;
  height: 78rpx;
  margin: 0 auto 22rpx;
  border-radius: 22rpx;
  background: linear-gradient(135deg, #e9fbf1, #dff7eb);
}

.usage-icon::before {
  position: absolute;
  left: 22rpx;
  top: 24rpx;
  width: 34rpx;
  height: 30rpx;
  border-radius: 5rpx;
  background: #18b96d;
  content: '';
}

.usage-icon--folder::after {
  position: absolute;
  left: 22rpx;
  top: 17rpx;
  width: 24rpx;
  height: 12rpx;
  border-radius: 5rpx 5rpx 0 0;
  background: #18b96d;
  content: '';
}

.usage-icon--award::after {
  position: absolute;
  right: 20rpx;
  bottom: 17rpx;
  width: 20rpx;
  height: 26rpx;
  border: 5rpx solid #fff;
  border-radius: 50%;
  background: transparent;
  content: '';
}

.usage-icon--chart::before {
  left: 21rpx;
  top: 22rpx;
  width: 36rpx;
  height: 34rpx;
  clip-path: polygon(0 100%, 0 58%, 20% 58%, 20% 100%, 32% 100%, 32% 32%, 52% 32%, 52% 100%, 64% 100%, 64% 10%, 84% 10%, 84% 100%);
}

.usage-desc {
  margin-top: 30rpx;
  color: #6a7485;
  font-size: 28rpx;
  line-height: 1.58;
}

.bottom-actions {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 5;
  gap: 36rpx;
  padding: 24rpx 40rpx calc(26rpx + env(safe-area-inset-bottom));
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(16rpx);
}

.action-button {
  height: 78rpx;
  flex: 1;
  border-radius: 14rpx;
  font-size: 31rpx;
}

.action-button--home {
  background: #fff;
}

@media (max-width: 370px) {
  .content {
    padding-right: 28rpx;
    padding-left: 28rpx;
  }

  .success-card {
    padding-right: 34rpx;
    padding-left: 34rpx;
  }

  .file-row {
    flex-wrap: wrap;
    padding-right: 34rpx;
  }

  .file-state {
    width: 100%;
    padding-left: 78rpx;
  }

  .bottom-actions {
    gap: 22rpx;
    padding-right: 28rpx;
    padding-left: 28rpx;
  }
}
</style>
