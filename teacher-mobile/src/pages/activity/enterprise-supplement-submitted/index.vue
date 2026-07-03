<script setup lang="ts">
import { computed, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobileNavbar from '../../../components/MobileNavbar.vue'
import { createEnterprisePracticeArchiveRecord, findArchiveRecordById } from '../../../domain/archive'

type SupplementSubmittedQuery = {
  recordId?: string
}

const query = ref<SupplementSubmittedQuery>({})

onLoad((options) => {
  query.value = options as SupplementSubmittedQuery
  if (!query.value.recordId) {
    query.value.recordId = createEnterprisePracticeArchiveRecord().id
  }
})

const archiveRecord = computed(() => findArchiveRecordById(query.value.recordId) || createEnterprisePracticeArchiveRecord())

const infoRows = [
  { label: '实践单位：', value: '山东某软件科技有限公司', type: 'building' },
  { label: '实践岗位：', value: '软件开发工程师', type: 'person' },
  { label: '实践时间：', value: '2023.07 - 2023.12', type: 'calendar' },
  { label: '实践天数：', value: '180 天', type: 'clock' },
]

const verifyRows = [
  { label: '当前状态：', value: '待部门核验', type: 'tag' },
  { label: '由谁核验：', value: '所在学院或人事相关部门', type: 'people' },
  { label: '确认通过后：', value: '管理端确认后写入「企业实践」档案事实', type: 'doc' },
  { label: '如需补充：', value: '系统会通过待办提醒你', type: 'bell' },
]

function goBack() {
  uni.navigateBack()
}

function goArchiveRecord() {
  uni.navigateTo({ url: `/pages/archive/record-detail/index?recordId=${archiveRecord.value.id}` })
}

function goArchivePendingList() {
  uni.navigateTo({ url: '/pages/archive/draft-list/index' })
}

function goActivityHome() {
  uni.navigateTo({ url: '/pages/activity/index' })
}
</script>

<template>
  <view class="supplement-submitted-page">
    <MobileNavbar title="补充已提交" size="regular" @back="goBack" />

    <view class="content">
      <MobileCard class="success-card">
        <view class="success-mark"></view>
        <view class="success-copy">
          <text class="success-title">补充材料已提交</text>
          <text class="success-desc">你已提交企业实践证明材料，系统将提交部门核验。</text>
        </view>
        <view class="leaf leaf--one"></view>
        <view class="leaf leaf--two"></view>
      </MobileCard>

      <MobileCard class="record-card">
        <view class="record-head">
          <view class="bag-icon"></view>
          <view class="record-copy">
            <text class="record-title">山东某软件科技有限公司企业实践</text>
            <view class="record-meta">
              <text>企业实践</text>
              <text class="divider">|</text>
              <text>行业实践</text>
              <text class="divider">|</text>
              <text class="blue-text">待核验</text>
            </view>
          </view>
        </view>

        <view class="info-box">
          <text class="green-section-title">系统已整理</text>
          <view v-for="item in infoRows" :key="item.label" class="info-row">
            <view class="line-icon" :class="`line-icon--${item.type}`"></view>
            <text class="info-label">{{ item.label }}</text>
            <text class="info-value">{{ item.value }}</text>
          </view>
        </view>
      </MobileCard>

      <MobileCard class="material-card">
        <text class="section-title">已提交材料</text>
        <view class="material-row">
          <view class="pdf-icon"></view>
          <view class="material-copy">
            <text class="file-name">企业实践证明.pdf</text>
            <text class="file-meta">PDF ｜ 2.4MB</text>
          </view>
          <text class="submitted-text">已提交</text>
        </view>
        <text class="submit-time">提交时间：今天 09:41</text>
      </MobileCard>

      <MobileCard class="verify-card">
        <text class="section-title">核验说明</text>
        <view class="verify-list">
          <view v-for="item in verifyRows" :key="item.label" class="verify-row">
            <view class="verify-icon" :class="`verify-icon--${item.type}`"></view>
            <text class="verify-label">{{ item.label }}</text>
            <text class="verify-value">{{ item.value }}</text>
          </view>
        </view>
      </MobileCard>
    </view>

    <view class="bottom-actions">
      <MobileActionButton class="action-button action-button--archive" variant="outline" @tap="goArchivePendingList">查看档案待确认</MobileActionButton>
      <MobileActionButton class="action-button action-button--archive" variant="outline" @tap="goArchiveRecord">查看提交内容</MobileActionButton>
      <MobileActionButton class="action-button" variant="primary" @tap="goActivityHome">返回首页</MobileActionButton>
    </view>
  </view>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.supplement-submitted-page {
  min-height: 100vh;
  padding-bottom: calc(142rpx + env(safe-area-inset-bottom));
  background:
    radial-gradient(circle at 12% 0%, rgba(224, 251, 238, 0.78), transparent 34%),
    linear-gradient(180deg, #fbfffd 0%, #ffffff 48%, #f5faf8 100%);
  color: #10172d;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 26rpx;
  padding: 24rpx 34rpx 0;
}

.success-card,
.record-head,
.record-meta,
.info-row,
.material-row,
.verify-row,
.bottom-actions {
  display: flex;
  align-items: center;
}

.success-card {
  position: relative;
  gap: 54rpx;
  padding: 42rpx 58rpx;
  overflow: hidden;
  border: 2rpx solid rgba(19, 185, 106, 0.18);
  border-radius: 22rpx;
  background: linear-gradient(105deg, rgba(237, 255, 246, 0.98), rgba(250, 255, 253, 0.96));
}

.success-mark {
  position: relative;
  width: 104rpx;
  height: 104rpx;
  flex: 0 0 auto;
  border: 18rpx solid #e8f8ef;
  border-radius: 50%;
  background: linear-gradient(135deg, #24cf72, #08a95a);
  box-shadow: 0 12rpx 26rpx rgba(7, 178, 86, 0.18);
}

.success-mark::before {
  position: absolute;
  left: 22rpx;
  top: 27rpx;
  width: 40rpx;
  height: 22rpx;
  border-bottom: 11rpx solid #fff;
  border-left: 11rpx solid #fff;
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
.green-section-title,
.section-title,
.info-label,
.info-value,
.file-name,
.file-meta,
.submit-time,
.verify-label,
.verify-value {
  display: block;
}

.success-title {
  color: #08a85c;
  font-size: 38rpx;
  font-weight: 900;
  line-height: 1.2;
}

.success-desc {
  margin-top: 18rpx;
  color: #344054;
  font-size: 28rpx;
  line-height: 1.55;
}

.leaf {
  position: absolute;
  width: 24rpx;
  height: 38rpx;
  border-radius: 50% 50% 50% 0;
  background: #8addb0;
  opacity: 0.62;
}

.leaf--one {
  left: 74rpx;
  bottom: 52rpx;
  transform: rotate(-42deg);
}

.leaf--two {
  left: 118rpx;
  bottom: 40rpx;
  transform: rotate(42deg) scale(0.76);
}

.record-card,
.material-card,
.verify-card {
  padding: 32rpx;
  border-radius: 24rpx;
}

.record-head {
  gap: 24rpx;
}

.bag-icon {
  position: relative;
  width: 64rpx;
  height: 64rpx;
  flex: 0 0 auto;
  border-radius: 14rpx;
  background: #e6f9ef;
}

.bag-icon::before {
  position: absolute;
  left: 18rpx;
  top: 20rpx;
  width: 30rpx;
  height: 28rpx;
  border-radius: 5rpx;
  background: #12b86a;
  content: '';
}

.bag-icon::after {
  position: absolute;
  left: 27rpx;
  top: 15rpx;
  width: 12rpx;
  height: 10rpx;
  border: 4rpx solid #12b86a;
  border-bottom: 0;
  border-radius: 8rpx 8rpx 0 0;
  content: '';
}

.record-copy {
  min-width: 0;
  flex: 1;
}

.record-title {
  font-size: 34rpx;
  font-weight: 900;
  line-height: 1.3;
}

.record-meta {
  flex-wrap: wrap;
  gap: 18rpx;
  margin-top: 18rpx;
  color: #536079;
  font-size: 27rpx;
}

.divider {
  color: #b7c0cd;
}

.blue-text {
  color: #276cef;
  font-weight: 900;
}

.info-box {
  margin-top: 28rpx;
  padding: 28rpx 30rpx;
  border: 2rpx solid #e4e9ef;
  border-radius: 16rpx;
  background: #fff;
}

.green-section-title {
  color: #09a75b;
  font-size: 30rpx;
  font-weight: 900;
}

.info-row {
  gap: 20rpx;
  padding: 23rpx 0;
  border-bottom: 2rpx dashed #edf1f4;
}

.info-row:last-child {
  border-bottom: 0;
}

.line-icon,
.verify-icon {
  position: relative;
  width: 36rpx;
  height: 36rpx;
  flex: 0 0 auto;
  color: #344054;
}

.line-icon--building::before {
  position: absolute;
  inset: 6rpx 8rpx 2rpx;
  border-radius: 3rpx;
  background: currentColor;
  box-shadow: 10rpx 8rpx 0 -2rpx currentColor;
  content: '';
}

.line-icon--person::before {
  position: absolute;
  left: 11rpx;
  top: 5rpx;
  width: 14rpx;
  height: 14rpx;
  border: 4rpx solid currentColor;
  border-radius: 50%;
  content: '';
}

.line-icon--person::after {
  position: absolute;
  left: 7rpx;
  bottom: 3rpx;
  width: 22rpx;
  height: 14rpx;
  border: 4rpx solid currentColor;
  border-radius: 14rpx 14rpx 4rpx 4rpx;
  content: '';
}

.line-icon--calendar::before {
  position: absolute;
  inset: 6rpx 4rpx 4rpx;
  border: 4rpx solid currentColor;
  border-radius: 5rpx;
  content: '';
}

.line-icon--calendar::after {
  position: absolute;
  left: 9rpx;
  right: 9rpx;
  top: 16rpx;
  height: 4rpx;
  background: currentColor;
  content: '';
}

.line-icon--clock::before {
  position: absolute;
  inset: 4rpx;
  border: 4rpx solid currentColor;
  border-radius: 50%;
  content: '';
}

.line-icon--clock::after {
  position: absolute;
  left: 17rpx;
  top: 10rpx;
  width: 4rpx;
  height: 13rpx;
  border-radius: 999rpx;
  background: currentColor;
  box-shadow: 7rpx 10rpx 0 -1rpx currentColor;
  content: '';
}

.info-label {
  flex: 0 0 160rpx;
  color: #344054;
  font-size: 27rpx;
}

.info-value {
  min-width: 0;
  flex: 1;
  color: #344054;
  font-size: 27rpx;
  text-align: right;
}

.section-title {
  font-size: 34rpx;
  font-weight: 900;
}

.material-row {
  gap: 26rpx;
  margin-top: 28rpx;
  padding-bottom: 26rpx;
  border-bottom: 2rpx solid #edf1f4;
}

.pdf-icon {
  position: relative;
  width: 82rpx;
  height: 82rpx;
  flex: 0 0 auto;
  border-radius: 14rpx;
  background: linear-gradient(135deg, #ff615f, #f03c38);
}

.pdf-icon::before {
  position: absolute;
  left: 21rpx;
  top: 26rpx;
  width: 40rpx;
  height: 28rpx;
  border: 5rpx solid #fff;
  border-right: 0;
  border-left: 0;
  content: '';
  transform: rotate(-22deg);
}

.material-copy {
  min-width: 0;
  flex: 1;
}

.file-name {
  font-size: 31rpx;
  font-weight: 900;
}

.file-meta {
  margin-top: 12rpx;
  color: #526079;
  font-size: 27rpx;
}

.submitted-text {
  flex: 0 0 auto;
  color: #08a85c;
  font-size: 28rpx;
  font-weight: 900;
}

.submit-time {
  margin-top: 20rpx;
  color: #687386;
  font-size: 27rpx;
}

.verify-list {
  margin-top: 24rpx;
}

.verify-row {
  gap: 22rpx;
  padding: 14rpx 0;
}

.verify-icon {
  border-radius: 10rpx;
  background: #e6f9ef;
  color: #12b86a;
}

.verify-icon::before {
  position: absolute;
  content: '';
}

.verify-icon--tag::before {
  inset: 10rpx;
  border-radius: 6rpx 6rpx 6rpx 0;
  background: currentColor;
  transform: rotate(45deg);
}

.verify-icon--people::before {
  left: 10rpx;
  top: 9rpx;
  width: 14rpx;
  height: 14rpx;
  border: 4rpx solid currentColor;
  border-radius: 50%;
  box-shadow: 11rpx 8rpx 0 -5rpx currentColor;
}

.verify-icon--doc::before {
  left: 12rpx;
  top: 8rpx;
  width: 16rpx;
  height: 22rpx;
  border: 4rpx solid currentColor;
  border-radius: 4rpx;
}

.verify-icon--bell::before {
  left: 10rpx;
  top: 9rpx;
  width: 18rpx;
  height: 20rpx;
  border: 4rpx solid currentColor;
  border-radius: 14rpx 14rpx 8rpx 8rpx;
}

.verify-label {
  flex: 0 0 170rpx;
  color: #10172d;
  font-size: 27rpx;
}

.verify-value {
  min-width: 0;
  flex: 1;
  color: #344054;
  font-size: 27rpx;
  line-height: 1.45;
  text-align: right;
}

.bottom-actions {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 5;
  gap: 38rpx;
  padding: 24rpx 34rpx calc(26rpx + env(safe-area-inset-bottom));
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(16rpx);
}

.action-button {
  height: 84rpx;
  flex: 1;
  border-radius: 14rpx;
  font-size: 31rpx;
}

.action-button--archive {
  background: #fff;
}

@media (max-width: 370px) {
  .content {
    padding-right: 24rpx;
    padding-left: 24rpx;
  }

  .success-card {
    gap: 34rpx;
    padding-right: 34rpx;
    padding-left: 34rpx;
  }

  .bottom-actions {
    gap: 22rpx;
    padding-right: 24rpx;
    padding-left: 24rpx;
  }
}
</style>
