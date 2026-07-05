<script setup lang="ts">
import { computed } from 'vue'
import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobileNavbar from '../../../components/MobileNavbar.vue'
import MobilePageShell from '../../../components/MobilePageShell.vue'
import { getTodoState } from '../../../stores/todoStore'

const todoState = getTodoState()
const certificate = computed(() => todoState.certificate)
const changes = computed(() => certificate.value.changes)
const submissionRecords = computed(() => certificate.value.submissionRecords)

const nextSteps = [
  '部门将核验你修改后的证书信息',
  '核验通过后入档到“个人发展”',
  '如需补充材料，会通过待办提醒你',
]

function goBack() {
  uni.navigateBack()
}

function goTodo() {
  uni.navigateTo({ url: '/pages/todo/index' })
}

function showSubmitRecord() {
  uni.showToast({
    title: `提交记录为本地模拟：${submissionRecords.value[0]?.title || '暂无提交记录'}`,
    icon: 'none',
  })
}
</script>

<template>
  <MobilePageShell class="submit-page" active="todo">
    <MobileNavbar title="修改已提交" size="compact" @back="goBack" />

    <text class="page-hint">你已提交培训证书信息修改，系统将把修改内容提交部门核验。</text>
    <view class="leaf-mark" aria-hidden="true">
      <view class="leaf leaf--left"></view>
      <view class="leaf leaf--right"></view>
      <view class="leaf leaf--small"></view>
    </view>

    <MobileCard class="result-card">
      <view class="result-head">
        <view class="result-icon">
          <view class="result-icon__paper"></view>
          <view class="result-icon__check"></view>
        </view>
        <view class="result-copy">
          <text class="result-title">待核验</text>
          <text class="result-desc">核验通过后，记录将入档到“个人发展”。</text>
        </view>
      </view>
      <view class="result-record">
        <view class="certificate-icon">
          <view class="certificate-icon__paper"></view>
        </view>
        <view class="record-body">
          <text class="record-title">{{ certificate.title }}</text>
          <text class="record-meta">{{ certificate.category }} ｜ {{ certificate.type }} ｜ <text class="record-state">待核验</text></text>
        </view>
      </view>
    </MobileCard>

    <MobileCard class="change-card">
      <text class="section-title">修改内容</text>
      <view v-for="item in changes" :key="item.label" class="change-row">
        <text class="change-label">{{ item.label }}：</text>
        <text class="change-value">由“{{ item.from }}”修改为“<text class="change-new">{{ item.to }}</text>”</text>
      </view>
    </MobileCard>

    <MobileCard class="material-card">
      <text class="section-title">相关材料</text>
      <view class="material-row">
        <view class="file-icon">
          <view class="file-icon__mountain"></view>
        </view>
        <view class="material-info">
          <text class="material-name">{{ certificate.material.name }}</text>
          <text class="material-meta">{{ certificate.material.meta }}</text>
        </view>
      </view>
    </MobileCard>

    <MobileCard class="progress-card">
      <text class="section-title">当前进度</text>
      <view v-for="record in submissionRecords" :key="record.id" class="submit-record">
        <text class="submit-record__title">{{ record.title }}</text>
        <text class="submit-record__meta">{{ record.submittedAt }} ｜ {{ record.status }} ｜ {{ record.adminStoreRefs.join(' / ') }}</text>
      </view>
      <view class="progress-line">
        <view class="progress-step progress-step--done">
          <view class="step-dot">✓</view>
          <text class="step-title">1. 已提交修改</text>
          <text class="step-desc">2026-05-15 09:21</text>
        </view>
        <view class="progress-connector progress-connector--active"></view>
        <view class="progress-step progress-step--active">
          <view class="step-dot">2</view>
          <text class="step-title">2. 部门核验</text>
          <text class="step-desc">进行中</text>
        </view>
        <view class="progress-connector"></view>
        <view class="progress-step">
          <view class="step-dot">3</view>
          <text class="step-title">3. 入档</text>
          <text class="step-desc">待完成</text>
        </view>
      </view>
    </MobileCard>

    <MobileCard class="next-card">
      <text class="section-title">接下来</text>
      <view class="next-body">
        <view class="next-icon"></view>
        <view class="next-list">
          <text v-for="(item, index) in nextSteps" :key="item" class="next-item">{{ index + 1 }}. {{ item }}</text>
        </view>
      </view>
    </MobileCard>

    <view class="footer-actions">
      <MobileActionButton class="footer-button" variant="primary" @tap="showSubmitRecord">查看提交记录</MobileActionButton>
      <MobileActionButton class="footer-button footer-button--outline" variant="outline" @tap="goTodo">返回待办</MobileActionButton>
    </view>
  </MobilePageShell>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.submit-page {
  position: relative;
  overflow: hidden;
  padding-top: calc(var(--status-bar-height) + 4rpx);
  padding-bottom: calc(220rpx + env(safe-area-inset-bottom));
}

.system-status,
.system-status__icons,
.nav-head,
.result-head,
.result-record,
.change-row,
.material-row,
.progress-line,
.next-body {
  display: flex;
  align-items: center;
}

.system-status {
  height: 42rpx;
  justify-content: space-between;
  padding: 0 18rpx;
}

.system-status__time {
  color: #050812;
  font-size: 30rpx;
  font-weight: 900;
  line-height: 1;
}

.system-status__icons {
  gap: 14rpx;
}

.status-signal {
  width: 38rpx;
  height: 26rpx;
  background: #050812;
  clip-path: polygon(0 70%, 18% 70%, 18% 100%, 0 100%, 0 70%, 27% 52%, 45% 52%, 45% 100%, 27% 100%, 27% 52%, 54% 32%, 72% 32%, 72% 100%, 54% 100%, 54% 32%, 82% 10%, 100% 10%, 100% 100%, 82% 100%, 82% 10%);
}

.status-wifi {
  position: relative;
  width: 36rpx;
  height: 26rpx;
  border: 8rpx solid #050812;
  border-color: #050812 transparent transparent;
  border-radius: 50%;
}

.status-wifi::after {
  position: absolute;
  right: 7rpx;
  bottom: -9rpx;
  width: 9rpx;
  height: 9rpx;
  border-radius: 50%;
  background: #050812;
  content: '';
}

.status-battery {
  position: relative;
  width: 52rpx;
  height: 26rpx;
  border: 4rpx solid #050812;
  border-radius: 8rpx;
}

.status-battery::before {
  position: absolute;
  top: 4rpx;
  left: 4rpx;
  width: 38rpx;
  height: 10rpx;
  border-radius: 4rpx;
  background: #050812;
  content: '';
}

.status-battery::after {
  position: absolute;
  top: 6rpx;
  right: -9rpx;
  width: 5rpx;
  height: 12rpx;
  border-radius: 0 4rpx 4rpx 0;
  background: #050812;
  content: '';
}

.nav-head {
  position: relative;
  z-index: 1;
  height: 58rpx;
  justify-content: space-between;
}

.back-button {
  position: relative;
  width: 72rpx;
  height: 58rpx;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
}

.back-button::after {
  display: none;
  border: 0;
}

.back-button__icon {
  position: absolute;
  top: 14rpx;
  left: 22rpx;
  width: 28rpx;
  height: 28rpx;
  border-bottom: 6rpx solid #0b122a;
  border-left: 6rpx solid #0b122a;
  transform: rotate(45deg);
}

.nav-title {
  color: #10172d;
  font-size: 36rpx;
  font-weight: 900;
  letter-spacing: 0;
}

.nav-spacer {
  width: 72rpx;
}

.page-hint {
  position: relative;
  z-index: 1;
  display: block;
  margin: 2rpx 16rpx 12rpx;
  color: #455472;
  font-size: 25rpx;
  line-height: 1.5;
}

.leaf-mark {
  position: absolute;
  top: 104rpx;
  right: 28rpx;
  width: 184rpx;
  height: 134rpx;
  opacity: 0.32;
  pointer-events: none;
}

.leaf {
  position: absolute;
  border-radius: 100% 0 100% 0;
  background: linear-gradient(135deg, #b6efd0, #6fd599);
}

.leaf--left {
  right: 86rpx;
  bottom: 2rpx;
  width: 78rpx;
  height: 44rpx;
  transform: rotate(18deg);
}

.leaf--right {
  right: 24rpx;
  bottom: 32rpx;
  width: 94rpx;
  height: 50rpx;
  transform: rotate(-38deg);
}

.leaf--small {
  right: 0;
  bottom: 0;
  width: 68rpx;
  height: 38rpx;
  transform: rotate(-12deg);
}

.result-card,
.change-card,
.material-card,
.progress-card,
.next-card {
  position: relative;
  z-index: 1;
  padding: 30rpx;
  border-radius: 28rpx;
}

.result-card {
  margin-bottom: 10rpx;
}

.result-head {
  gap: 18rpx;
  padding: 0 2rpx 12rpx;
  border-bottom: 1rpx solid #edf1f6;
}

.result-icon,
.certificate-icon {
  position: relative;
  flex: 0 0 auto;
  background: #e7f8ee;
}

.result-icon {
  width: 62rpx;
  height: 62rpx;
  border-radius: 31rpx;
}

.result-icon__paper,
.certificate-icon__paper {
  position: absolute;
  border-radius: 9rpx;
  background: linear-gradient(180deg, #16cf72, #08ab55);
}

.result-icon__paper {
  top: 18rpx;
  left: 20rpx;
  width: 27rpx;
  height: 32rpx;
}

.result-icon__check {
  position: absolute;
  right: 10rpx;
  bottom: 12rpx;
  width: 20rpx;
  height: 20rpx;
  border-radius: 50%;
  background: $teacher-mobile-primary;
}

.result-icon__check::after {
  position: absolute;
  top: 6rpx;
  left: 7rpx;
  width: 9rpx;
  height: 5rpx;
  border-bottom: 3rpx solid #fff;
  border-left: 3rpx solid #fff;
  content: '';
  transform: rotate(-45deg);
}

.result-copy {
  display: flex;
  min-width: 0;
  flex-direction: column;
}

.result-title {
  color: $teacher-mobile-primary-dark;
  font-size: 30rpx;
  font-weight: 900;
  line-height: 1.2;
}

.result-desc {
  margin-top: 6rpx;
  color: #3d4a67;
  font-size: 25rpx;
  line-height: 1.45;
}

.result-record {
  gap: 18rpx;
  padding-top: 12rpx;
}

.certificate-icon {
  width: 62rpx;
  height: 62rpx;
  border-radius: 15rpx;
}

.certificate-icon__paper {
  top: 14rpx;
  left: 19rpx;
  width: 29rpx;
  height: 36rpx;
}

.record-body {
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
}

.record-title {
  color: #11182d;
  font-size: 27rpx;
  font-weight: 900;
  line-height: 1.35;
}

.record-meta {
  margin-top: 6rpx;
  color: #3d4a67;
  font-size: 24rpx;
  line-height: 1.25;
}

.record-state,
.change-new,
.progress-step--active .step-title,
.progress-step--active .step-desc {
  color: $teacher-mobile-primary-dark;
}

.change-card,
.material-card,
.progress-card,
.next-card {
  margin-top: 10rpx;
}

.section-title {
  color: #10172d;
  font-size: 34rpx;
  font-weight: 900;
  line-height: 1.2;
}

.change-row {
  min-height: 44rpx;
  margin-top: 7rpx;
  padding: 0 18rpx;
  border: 1rpx solid #dfe5ef;
  border-radius: 12rpx;
  background: rgba(255, 255, 255, 0.88);
}

.change-label {
  flex: 0 0 130rpx;
  color: #182238;
  font-size: 24rpx;
  font-weight: 800;
}

.change-value {
  min-width: 0;
  flex: 1;
  color: #2c3851;
  font-size: 22rpx;
  line-height: 1.35;
}

.material-row {
  min-height: 58rpx;
  margin-top: 10rpx;
  padding: 9rpx;
  border: 1rpx solid #dfe5ef;
  border-radius: 14rpx;
  background: rgba(255, 255, 255, 0.86);
}

.file-icon {
  position: relative;
  flex: 0 0 auto;
  width: 46rpx;
  height: 52rpx;
  border-radius: 10rpx;
  background: linear-gradient(180deg, #1fc774, #12ae57);
}

.file-icon::after {
  position: absolute;
  top: 0;
  right: 0;
  border-top: 18rpx solid rgba(255, 255, 255, 0.55);
  border-left: 18rpx solid transparent;
  content: '';
}

.file-icon__mountain {
  position: absolute;
  right: 12rpx;
  bottom: 15rpx;
  width: 30rpx;
  height: 20rpx;
  background: #fff;
  clip-path: polygon(0 100%, 32% 44%, 48% 68%, 66% 30%, 100% 100%);
}

.material-info {
  display: flex;
  flex-direction: column;
  margin-left: 18rpx;
}

.material-name {
  color: #172033;
  font-size: 25rpx;
  font-weight: 800;
  line-height: 1.3;
}

.material-meta {
  margin-top: 5rpx;
  color: #60708f;
  font-size: 21rpx;
  line-height: 1.2;
}

.progress-line {
  margin-top: 12rpx;
  padding: 0 8rpx;
}

.progress-step {
  display: flex;
  width: 140rpx;
  align-items: center;
  flex-direction: column;
  text-align: center;
}

.step-dot {
  display: flex;
  width: 36rpx;
  height: 36rpx;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #e8edf4;
  color: #718096;
  font-size: 23rpx;
  font-weight: 900;
}

.progress-step--done .step-dot,
.progress-step--active .step-dot {
  background: linear-gradient(180deg, #17c96d, #08ad55);
  color: #fff;
}

.step-title {
  margin-top: 6rpx;
  color: #2c3851;
  font-size: 21rpx;
  font-weight: 800;
  line-height: 1.25;
}

.step-desc {
  margin-top: 3rpx;
  color: #73819c;
  font-size: 19rpx;
  line-height: 1.2;
}

.progress-connector {
  width: 78rpx;
  height: 0;
  align-self: flex-start;
  margin-top: 18rpx;
  border-top: 3rpx dashed #aab7cc;
}

.progress-connector--active {
  border-top-style: solid;
  border-top-color: $teacher-mobile-primary;
}

.next-body {
  align-items: flex-start;
  gap: 20rpx;
  margin-top: 10rpx;
}

.next-icon {
  position: relative;
  flex: 0 0 auto;
  width: 30rpx;
  height: 36rpx;
  margin-top: 4rpx;
  border: 4rpx solid $teacher-mobile-primary;
  border-radius: 50% 50% 42% 42%;
}

.next-icon::after {
  position: absolute;
  right: 7rpx;
  bottom: -9rpx;
  width: 8rpx;
  height: 10rpx;
  border-radius: 4rpx;
  background: $teacher-mobile-primary;
  content: '';
}

.next-list {
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
  gap: 6rpx;
}

.next-item {
  color: #172033;
  font-size: 24rpx;
  line-height: 1.25;
}

.footer-actions {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 20;
  display: flex;
  flex-direction: column;
  gap: 12rpx;
  padding: 20rpx 32rpx calc(20rpx + env(safe-area-inset-bottom));
  border-top: 1rpx solid #edf1f6;
  background: rgba(255, 255, 255, 0.96);
}

.footer-button {
  width: 100%;
  height: 64rpx;
  border-radius: 14rpx;
  font-size: 26rpx;
}

.footer-button--outline {
  margin-top: 0;
}

@media (max-width: 374px) {
  .result-card,
  .change-card,
  .material-card,
  .progress-card,
  .next-card {
    padding: 24rpx;
  }

  .page-hint {
    font-size: 25rpx;
  }

  .change-label {
    flex-basis: 128rpx;
    font-size: 25rpx;
  }

  .change-value {
    font-size: 23rpx;
  }

  .progress-step {
    width: 138rpx;
  }

  .progress-connector {
    width: 58rpx;
  }
}
</style>
