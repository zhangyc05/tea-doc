<script setup lang="ts">
import { computed, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobileNavbar from '../../../components/MobileNavbar.vue'
import { createEnterprisePracticeArchiveRecord, findArchiveRecordById } from '../../../domain/archive'

type ArchiveResultQuery = {
  recordId?: string
}

const query = ref<ArchiveResultQuery>({})

onLoad((options) => {
  query.value = options as ArchiveResultQuery
  if (!query.value.recordId) {
    query.value.recordId = createEnterprisePracticeArchiveRecord().id
  }
})

const archiveRecord = computed(() => findArchiveRecordById(query.value.recordId) || createEnterprisePracticeArchiveRecord())

const steps = [
  { title: '记录实践日志', time: '05-10', state: 'done' },
  { title: '总结与材料确认', time: '05-12', state: 'done' },
  { title: '提交归档', time: '05-16 14:30', state: 'current' },
  { title: '审核通过', time: '待完成', state: 'pending' },
]

const overviewRows = [
  { label: '实践名称', value: '山东某智能装备有限公司企业实践', type: 'bag' },
  { label: '实践岗位', value: '软件开发工程师', type: 'position' },
  { label: '实践时间', value: '2026-05-10 至 2026-05-20', type: 'calendar' },
  { label: '实践日志', value: '9 条', type: 'log' },
  { label: '提交时间', value: '2026-05-16 14:30', type: 'clock' },
]

const submitItems = [
  { title: '实践总结', desc: 'AI 生成草稿', status: '已确认', tone: 'green', type: 'summary' },
  { title: '附件资料', desc: '3 份', status: '已上传', tone: 'blue', type: 'attach' },
  { title: '实践计划与日志', desc: '9 条日志', status: '已包含', tone: 'green', type: 'plan' },
]

function goBack() {
  uni.navigateBack()
}

function backToList() {
  uni.navigateTo({ url: '/pages/activity/enterprise-list/index' })
}

function viewArchiveRecord() {
  uni.navigateTo({ url: `/pages/archive/record-detail/index?recordId=${archiveRecord.value.id}` })
}

function goArchivePendingList() {
  uni.navigateTo({ url: '/pages/archive/draft-list/index' })
}
</script>

<template>
  <view class="archive-result-page">
    <MobileNavbar title="归档提交结果" size="regular" @back="goBack" />

    <view class="top-art">
      <view class="paper-stack">
        <view class="paper-main"></view>
        <view class="paper-check"></view>
        <view class="chat-dot"></view>
      </view>
    </view>

    <view class="content">
      <MobileCard class="result-card">
        <view class="result-head">
          <view class="waiting-icon"></view>
          <view class="result-copy">
            <text class="result-title">已提交归档，等待确认</text>
            <text class="result-desc">您的实践记录已提交至学院审核，审核通过后将进入成长档案，成为正式档案事实。</text>
          </view>
        </view>

        <view class="stepper">
          <view class="step-line"></view>
          <view v-for="item in steps" :key="item.title" class="step-item" :class="`step-item--${item.state}`">
            <view class="step-dot"></view>
            <text class="step-title">{{ item.title }}</text>
            <text class="step-time">{{ item.time }}</text>
          </view>
        </view>

        <view class="status-box">
          <view>
            <text class="status-label">当前状态</text>
            <text class="status-text">等待学院审核中</text>
          </view>
          <view class="estimate">
            <text>预计需要 1~3 个工作日</text>
            <view class="info-icon">i</view>
          </view>
        </view>
      </MobileCard>

      <MobileCard class="overview-card">
        <view class="card-head">
          <view class="head-icon head-icon--overview"></view>
          <text class="card-title">本次实践概览</text>
          <text class="detail-link" @tap="viewArchiveRecord">查看详情</text>
          <view class="link-arrow"></view>
        </view>

        <view class="overview-list">
          <view v-for="item in overviewRows" :key="item.label" class="overview-row">
            <view class="row-icon" :class="`row-icon--${item.type}`"></view>
            <text class="overview-label">{{ item.label }}</text>
            <text class="overview-value">{{ item.value }}</text>
          </view>
        </view>
      </MobileCard>

      <MobileCard class="submit-card">
        <view class="card-head">
          <view class="head-icon head-icon--doc"></view>
          <text class="card-title">提交内容</text>
        </view>

        <view class="submit-grid">
          <view v-for="item in submitItems" :key="item.title" class="submit-item">
            <view class="submit-icon" :class="[`submit-icon--${item.tone}`, `submit-icon--${item.type}`]"></view>
            <text class="submit-title">{{ item.title }}</text>
            <text class="submit-desc">{{ item.desc }}</text>
            <text class="submit-status">✓ {{ item.status }}</text>
          </view>
        </view>

        <view class="tip-box">
          <view class="bulb-icon"></view>
          <text>审核过程中如有需要补充或修改，系统将通过消息通知您。</text>
        </view>
      </MobileCard>
    </view>

    <view class="bottom-actions">
      <MobileActionButton class="action-button action-button--list" variant="outline" @tap="backToList">
        返回实践列表
      </MobileActionButton>
      <MobileActionButton class="action-button action-button--list" variant="outline" @tap="goArchivePendingList">
        查看档案待确认
      </MobileActionButton>
      <MobileActionButton class="action-button" variant="primary" @tap="viewArchiveRecord">
        查看提交内容
      </MobileActionButton>
    </view>
  </view>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.archive-result-page {
  position: relative;
  min-height: 100vh;
  padding-bottom: calc(170rpx + env(safe-area-inset-bottom));
  overflow-x: hidden;
  background:
    radial-gradient(circle at 86% 8%, rgba(202, 250, 225, 0.72), transparent 16%),
    linear-gradient(180deg, #fefffe 0%, #f9fcfb 54%, #f7faf8 100%);
  color: #111827;
}

.top-art {
  position: absolute;
  right: 48rpx;
  top: 112rpx;
  width: 174rpx;
  height: 148rpx;
  pointer-events: none;
}

.paper-stack {
  position: relative;
  width: 100%;
  height: 100%;
}

.paper-main {
  position: absolute;
  right: 22rpx;
  top: 8rpx;
  width: 112rpx;
  height: 128rpx;
  border: 9rpx solid #36cc82;
  border-radius: 16rpx;
  background: #ecfff5;
  box-shadow: -18rpx 8rpx 0 rgba(23, 185, 106, 0.18);
  transform: rotate(8deg);
}

.paper-main::before {
  position: absolute;
  left: 24rpx;
  right: 18rpx;
  top: 30rpx;
  height: 8rpx;
  border-radius: 999rpx;
  background: #94dfb8;
  box-shadow: 0 26rpx 0 #94dfb8, 0 52rpx 0 #94dfb8;
  content: '';
}

.paper-main::after {
  position: absolute;
  left: 28rpx;
  top: -18rpx;
  width: 62rpx;
  height: 26rpx;
  border-radius: 8rpx;
  background: linear-gradient(135deg, #7ce2ae, #29c979);
  content: '';
}

.paper-check {
  position: absolute;
  right: 0;
  bottom: 8rpx;
  width: 74rpx;
  height: 74rpx;
  border-radius: 50%;
  background: linear-gradient(135deg, #3bd585, #0aaa5f);
  box-shadow: 0 12rpx 24rpx rgba(9, 174, 96, 0.22);
}

.paper-check::before {
  position: absolute;
  left: 20rpx;
  top: 25rpx;
  width: 30rpx;
  height: 17rpx;
  border-bottom: 8rpx solid #fff;
  border-left: 8rpx solid #fff;
  content: '';
  transform: rotate(-45deg);
}

.chat-dot {
  position: absolute;
  left: 0;
  bottom: 34rpx;
  width: 56rpx;
  height: 56rpx;
  border-radius: 50%;
  background: rgba(109, 218, 160, 0.34);
}

.chat-dot::before {
  position: absolute;
  left: 14rpx;
  top: 25rpx;
  width: 7rpx;
  height: 7rpx;
  border-radius: 50%;
  background: #fff;
  box-shadow: 13rpx 0 0 #fff, 26rpx 0 0 #fff;
  content: '';
}

.content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 24rpx;
  padding: 86rpx 28rpx 0;
}

.result-card,
.overview-card,
.submit-card {
  padding: 38rpx 38rpx 34rpx;
  border-radius: 22rpx;
  box-shadow: 0 16rpx 42rpx rgba(45, 64, 93, 0.07);
}

.result-head,
.card-head,
.overview-row,
.status-box,
.estimate,
.bottom-actions {
  display: flex;
  align-items: center;
}

.result-head {
  gap: 28rpx;
}

.waiting-icon {
  position: relative;
  width: 96rpx;
  height: 96rpx;
  flex: 0 0 auto;
  border-radius: 50%;
  background: #fff2df;
}

.waiting-icon::before {
  position: absolute;
  inset: 22rpx;
  border: 8rpx solid #ff9600;
  border-radius: 50%;
  content: '';
}

.waiting-icon::after {
  position: absolute;
  left: 45rpx;
  top: 32rpx;
  width: 8rpx;
  height: 26rpx;
  border-radius: 999rpx;
  background: #ff9600;
  box-shadow: 13rpx 20rpx 0 -2rpx #ff9600;
  content: '';
}

.result-copy {
  min-width: 0;
  flex: 1;
}

.result-title,
.result-desc,
.step-title,
.step-time,
.status-label,
.status-text,
.card-title,
.overview-label,
.overview-value,
.submit-title,
.submit-desc {
  display: block;
}

.result-title {
  font-size: 39rpx;
  font-weight: 900;
  line-height: 1.2;
}

.result-desc {
  margin-top: 20rpx;
  color: #1f2937;
  font-size: 27rpx;
  line-height: 1.66;
}

.stepper {
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin-top: 44rpx;
}

.step-line {
  position: absolute;
  right: 12%;
  left: 8%;
  top: 16rpx;
  height: 4rpx;
  background: linear-gradient(90deg, #82e2b5 0 66%, #d8dbe0 66% 100%);
}

.step-item {
  position: relative;
  min-width: 0;
  text-align: center;
}

.step-dot {
  position: relative;
  z-index: 1;
  width: 34rpx;
  height: 34rpx;
  margin: 0 auto;
  border-radius: 50%;
  background: #d2d4d8;
}

.step-item--done .step-dot {
  background: #08a85c;
}

.step-item--done .step-dot::before,
.step-item--current .step-dot::before {
  position: absolute;
  content: '';
}

.step-item--done .step-dot::before {
  left: 10rpx;
  top: 11rpx;
  width: 14rpx;
  height: 8rpx;
  border-bottom: 5rpx solid #fff;
  border-left: 5rpx solid #fff;
  transform: rotate(-45deg);
}

.step-item--current .step-dot {
  width: 60rpx;
  height: 60rpx;
  margin-top: -13rpx;
  border: 12rpx solid #fff0d9;
  background: #ff9700;
}

.step-item--current .step-dot::before {
  inset: 11rpx;
  border: 5rpx solid #fff;
  border-radius: 50%;
}

.step-item--current .step-dot::after {
  position: absolute;
  left: 28rpx;
  top: 20rpx;
  width: 5rpx;
  height: 15rpx;
  border-radius: 999rpx;
  background: #fff;
  box-shadow: 7rpx 11rpx 0 -1rpx #fff;
  content: '';
}

.step-title {
  margin-top: 26rpx;
  font-size: 25rpx;
  font-weight: 900;
  line-height: 1.24;
}

.step-time {
  margin-top: 16rpx;
  color: #6b7280;
  font-size: 24rpx;
}

.status-box {
  justify-content: space-between;
  gap: 24rpx;
  margin-top: 34rpx;
  padding: 22rpx 26rpx;
  border-radius: 16rpx;
  background: linear-gradient(100deg, #fff8eb, #fffdf8);
}

.status-label {
  color: #3f4552;
  font-size: 25rpx;
}

.status-text {
  margin-top: 12rpx;
  color: #ff9600;
  font-size: 35rpx;
  font-weight: 900;
}

.estimate {
  gap: 10rpx;
  flex: 0 0 auto;
  color: #111827;
  font-size: 26rpx;
}

.info-icon {
  width: 24rpx;
  height: 24rpx;
  border: 3rpx solid #8a94a6;
  border-radius: 50%;
  color: #8a94a6;
  font-size: 17rpx;
  font-weight: 900;
  line-height: 19rpx;
  text-align: center;
}

.card-head {
  gap: 16rpx;
}

.head-icon {
  position: relative;
  width: 56rpx;
  height: 56rpx;
  flex: 0 0 auto;
  border-radius: 50%;
  background: #e6fbf1;
  color: #0baa60;
}

.head-icon::before {
  position: absolute;
  content: '';
}

.head-icon--overview::before {
  left: 15rpx;
  top: 17rpx;
  width: 26rpx;
  height: 22rpx;
  border: 4rpx solid currentColor;
  border-radius: 6rpx;
}

.head-icon--overview::after {
  position: absolute;
  left: 20rpx;
  top: 11rpx;
  width: 16rpx;
  height: 12rpx;
  border: 4rpx solid currentColor;
  border-bottom: 0;
  border-radius: 9rpx 9rpx 0 0;
  content: '';
}

.head-icon--doc::before {
  left: 18rpx;
  top: 12rpx;
  width: 22rpx;
  height: 30rpx;
  border: 4rpx solid currentColor;
  border-radius: 4rpx;
}

.head-icon--doc::after {
  position: absolute;
  left: 24rpx;
  top: 23rpx;
  width: 14rpx;
  height: 4rpx;
  border-radius: 999rpx;
  background: currentColor;
  box-shadow: 0 10rpx 0 currentColor;
  content: '';
}

.card-title {
  flex: 1;
  font-size: 31rpx;
  font-weight: 900;
}

.detail-link {
  color: #0aa75d;
  font-size: 27rpx;
  font-weight: 900;
}

.link-arrow {
  width: 17rpx;
  height: 17rpx;
  border-top: 4rpx solid #0aa75d;
  border-right: 4rpx solid #0aa75d;
  transform: rotate(45deg);
}

.overview-list {
  margin-top: 32rpx;
}

.overview-row {
  gap: 22rpx;
  min-height: 66rpx;
}

.row-icon {
  position: relative;
  width: 30rpx;
  height: 30rpx;
  flex: 0 0 auto;
  color: #6b7280;
}

.row-icon::before,
.row-icon::after {
  position: absolute;
  content: '';
}

.row-icon--bag::before {
  inset: 8rpx 2rpx 3rpx;
  border: 4rpx solid currentColor;
  border-radius: 4rpx;
}

.row-icon--position::before {
  left: 6rpx;
  top: 7rpx;
  width: 18rpx;
  height: 18rpx;
  border: 4rpx solid currentColor;
  border-radius: 50% 50% 6rpx 6rpx;
}

.row-icon--calendar::before,
.row-icon--log::before {
  inset: 3rpx;
  border: 4rpx solid currentColor;
  border-radius: 4rpx;
}

.row-icon--calendar::after {
  right: 3rpx;
  left: 3rpx;
  top: 12rpx;
  border-top: 4rpx solid currentColor;
}

.row-icon--log::after {
  left: 10rpx;
  top: 10rpx;
  width: 11rpx;
  height: 4rpx;
  border-radius: 999rpx;
  background: currentColor;
  box-shadow: 0 8rpx 0 currentColor;
}

.row-icon--clock::before {
  inset: 3rpx;
  border: 4rpx solid currentColor;
  border-radius: 50%;
}

.row-icon--clock::after {
  left: 14rpx;
  top: 8rpx;
  width: 4rpx;
  height: 12rpx;
  border-radius: 999rpx;
  background: currentColor;
  box-shadow: 6rpx 8rpx 0 -1rpx currentColor;
}

.overview-label {
  width: 156rpx;
  flex: 0 0 auto;
  color: #1f2937;
  font-size: 29rpx;
}

.overview-value {
  min-width: 0;
  flex: 1;
  color: #111827;
  font-size: 28rpx;
  line-height: 1.32;
  text-align: right;
}

.submit-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12rpx;
  margin-top: 34rpx;
}

.submit-item {
  min-width: 0;
  padding: 28rpx 20rpx 24rpx;
  border-radius: 14rpx;
  background: #fafafa;
  box-shadow: 0 14rpx 28rpx rgba(41, 55, 78, 0.04);
}

.submit-icon {
  position: relative;
  width: 56rpx;
  height: 56rpx;
  margin-bottom: 22rpx;
  border-radius: 12rpx;
}

.submit-icon--green {
  background: #e3fbef;
  color: #0baa60;
}

.submit-icon--blue {
  background: #eaf3ff;
  color: #267df4;
}

.submit-icon::before,
.submit-icon::after {
  position: absolute;
  content: '';
}

.submit-icon--summary::before {
  left: 15rpx;
  top: 12rpx;
  width: 27rpx;
  height: 32rpx;
  border: 5rpx solid currentColor;
  border-radius: 5rpx;
}

.submit-icon--summary::after {
  left: 22rpx;
  top: 25rpx;
  width: 15rpx;
  height: 5rpx;
  border-radius: 999rpx;
  background: currentColor;
  box-shadow: 0 11rpx 0 currentColor;
}

.submit-icon--attach::before {
  left: 19rpx;
  top: 12rpx;
  width: 18rpx;
  height: 34rpx;
  border: 6rpx solid currentColor;
  border-radius: 16rpx;
  transform: rotate(38deg);
}

.submit-icon--plan::before {
  inset: 12rpx;
  border: 5rpx solid currentColor;
  border-radius: 6rpx;
}

.submit-icon--plan::after {
  left: 22rpx;
  top: 23rpx;
  width: 13rpx;
  height: 8rpx;
  border-bottom: 5rpx solid currentColor;
  border-left: 5rpx solid currentColor;
  transform: rotate(-45deg);
}

.submit-title {
  font-size: 28rpx;
  font-weight: 900;
  line-height: 1.24;
}

.submit-desc {
  margin-top: 14rpx;
  color: #5d6675;
  font-size: 26rpx;
}

.submit-status {
  display: block;
  margin-top: 22rpx;
  color: #0baa60;
  font-size: 24rpx;
  font-weight: 900;
}

.tip-box {
  display: flex;
  align-items: center;
  gap: 22rpx;
  margin-top: 36rpx;
  padding: 25rpx 28rpx;
  border-radius: 14rpx;
  background: linear-gradient(100deg, #fff7e8, #fffdf6);
  color: #1f2937;
  font-size: 28rpx;
  line-height: 1.45;
}

.bulb-icon {
  position: relative;
  width: 42rpx;
  height: 42rpx;
  flex: 0 0 auto;
  border: 4rpx solid #ff9600;
  border-bottom: 0;
  border-radius: 50% 50% 45% 45%;
}

.bulb-icon::before {
  position: absolute;
  left: 10rpx;
  bottom: -13rpx;
  width: 16rpx;
  height: 16rpx;
  border-bottom: 4rpx solid #ff9600;
  border-left: 4rpx solid #ff9600;
  transform: rotate(-45deg);
  content: '';
}

.bulb-icon::after {
  position: absolute;
  left: 15rpx;
  bottom: -20rpx;
  width: 15rpx;
  height: 4rpx;
  border-radius: 999rpx;
  background: #ff9600;
  box-shadow: 0 8rpx 0 #ff9600;
  content: '';
}

.bottom-actions {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 6;
  gap: 24rpx;
  padding: 24rpx 40rpx calc(26rpx + env(safe-area-inset-bottom));
  background: rgba(255, 255, 255, 0.94);
  backdrop-filter: blur(16rpx);
}

.action-button {
  height: 84rpx;
  flex: 1;
  border-radius: 14rpx;
  font-size: 30rpx;
}

.action-button--list {
  background: #fff;
}

@media (max-width: 374px) {
  .top-art {
    right: 22rpx;
    transform: scale(0.82);
    transform-origin: right top;
  }

  .content {
    padding-right: 20rpx;
    padding-left: 20rpx;
  }

  .result-card,
  .overview-card,
  .submit-card {
    padding-right: 24rpx;
    padding-left: 24rpx;
  }

  .result-head {
    gap: 20rpx;
  }

  .waiting-icon {
    width: 78rpx;
    height: 78rpx;
  }

  .result-title {
    font-size: 34rpx;
  }

  .result-desc,
  .overview-value {
    font-size: 25rpx;
  }

  .step-title,
  .step-time {
    font-size: 21rpx;
  }

  .status-box {
    align-items: flex-start;
    flex-direction: column;
  }

  .overview-row {
    gap: 14rpx;
  }

  .overview-label {
    width: 126rpx;
    font-size: 26rpx;
  }

  .submit-grid {
    gap: 8rpx;
  }

  .submit-item {
    padding-right: 12rpx;
    padding-left: 12rpx;
  }

  .submit-title {
    font-size: 25rpx;
  }

  .submit-desc,
  .submit-status {
    font-size: 23rpx;
  }

  .bottom-actions {
    gap: 18rpx;
    padding-right: 24rpx;
    padding-left: 24rpx;
  }

  .action-button {
    font-size: 27rpx;
  }
}
</style>
