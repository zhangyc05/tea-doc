<script setup lang="ts">
import { computed } from 'vue'
import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobileNavbar from '../../../components/MobileNavbar.vue'
import MobilePageShell from '../../../components/MobilePageShell.vue'
import MobileStatusTag from '../../../components/MobileStatusTag.vue'
import {
  confirmTodoCertificate,
  getTodoById,
  getTodoState,
  previewTodoCertificateMaterial,
  removeTodoCertificate,
} from '../../../stores/todoStore'

const todoState = getTodoState()
const certificate = computed(() => todoState.certificate)
const certificateTodo = computed(() => getTodoById(certificate.value.id))
const keyInfo = computed(() => certificate.value.keyInfo)
const evidenceInfo = computed(() => certificate.value.evidenceInfo)

function goBack() {
  uni.navigateBack()
}

function goEdit() {
  uni.navigateTo({ url: '/pages/todo/certificate-edit/index' })
}

function goArchiveSuccess() {
  confirmTodoCertificate(certificate.value.id)
  uni.navigateTo({ url: '/pages/todo/certificate-archive-success/index' })
}

function goRemoved() {
  removeTodoCertificate(certificate.value.id, '证书项目与本人参加培训记录不一致')
  uni.navigateTo({ url: '/pages/todo/certificate-removed/index' })
}

function previewMaterial() {
  const material = previewTodoCertificateMaterial()
  if (!material.previewUrl) {
    uni.showToast({
      title: `证书材料预览为本地模拟：${certificate.value.material.name}`,
      icon: 'none',
    })
    return
  }
  uni.navigateTo({ url: material.previewUrl })
}
</script>

<template>
  <MobilePageShell class="detail-page" active="todo">
    <MobileNavbar title="待确认记录" size="compact" @back="goBack" />

    <text class="page-hint">系统已帮你识别，请确认是否属于本人</text>

    <MobileCard class="summary-card">
      <view class="certificate-icon">
        <view class="certificate-icon__paper"></view>
      </view>
      <view class="summary-card__body">
        <MobileStatusTag :tone="certificateTodo?.tone || 'blue'">{{ certificateTodo?.tag || '待确认' }}</MobileStatusTag>
        <text class="summary-title">{{ certificateTodo?.title || certificate.title }}</text>
        <text class="summary-desc">确认后将进入后续核验，通过后入档</text>
      </view>
      <text class="summary-state">{{ certificateTodo?.state || '待你确认' }}</text>
    </MobileCard>

    <MobileCard class="info-card">
      <text class="section-title">关键信息</text>
      <view v-for="item in keyInfo" :key="item.label" class="info-row">
        <text class="info-label">{{ item.label }}：</text>
        <text class="info-value">{{ item.value }}</text>
      </view>
    </MobileCard>

    <MobileCard class="info-card">
      <text class="section-title">系统识别依据</text>
      <view v-for="item in evidenceInfo" :key="item.label" class="info-row">
        <text class="info-label">{{ item.label }}：</text>
        <text class="info-value">{{ item.value }}</text>
      </view>
    </MobileCard>

    <MobileCard class="material-card">
      <text class="section-title">相关材料</text>
      <view class="material-row">
        <view class="material-icon"></view>
        <text class="material-name">{{ certificate.material.name }}</text>
        <MobileActionButton class="material-link" variant="link" arrow @tap="previewMaterial">查看</MobileActionButton>
      </view>
    </MobileCard>

    <MobileCard class="confirm-card">
      <text class="section-title">请你确认</text>
      <text class="confirm-desc">如记录属于本人且信息无误，请直接确认；如信息有误，可先修改后再提交确认。</text>
      <MobileActionButton class="confirm-action confirm-action--primary" variant="primary" @tap="goArchiveSuccess">确认是我的</MobileActionButton>
      <MobileActionButton class="confirm-action confirm-action--outline" variant="outline" @tap="goEdit">信息有误，修改一下</MobileActionButton>
      <button class="reject-button" @tap="goRemoved">不是我的</button>
    </MobileCard>
  </MobilePageShell>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.detail-page {
  --detail-danger: #ff1f39;
  padding-bottom: calc(150rpx + env(safe-area-inset-bottom));
}

.nav-head,
.summary-card,
.info-row,
.material-row {
  display: flex;
  align-items: center;
}


.nav-head {
  height: 72rpx;
  justify-content: space-between;
}

.back-button {
  position: relative;
  width: 72rpx;
  height: 72rpx;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
}

.back-button::after,
.reject-button::after {
  display: none;
  border: 0;
}

.back-button__icon {
  position: absolute;
  top: 20rpx;
  left: 22rpx;
  width: 26rpx;
  height: 26rpx;
  border-bottom: 5rpx solid #0d1430;
  border-left: 5rpx solid #0d1430;
  transform: rotate(45deg);
}

.nav-title {
  color: #10172d;
  font-size: 34rpx;
  font-weight: 900;
  line-height: 1;
}

.nav-spacer {
  width: 72rpx;
}

.page-hint {
  display: block;
  margin: 0 18rpx 12rpx;
  color: #526079;
  font-size: 25rpx;
  line-height: 1.3;
}

.summary-card,
.info-card,
.material-card,
.confirm-card {
  margin-top: 12rpx;
  padding: 28rpx 32rpx;
  border-radius: 24rpx;
}

.summary-card {
  position: relative;
  gap: 28rpx;
  min-height: 112rpx;
}

.certificate-icon {
  position: relative;
  width: 78rpx;
  height: 78rpx;
  flex: 0 0 78rpx;
  border-radius: 24rpx;
  background: #eaf4ff;
  color: #1677ff;
}

.certificate-icon__paper {
  position: absolute;
  top: 18rpx;
  left: 24rpx;
  width: 32rpx;
  height: 42rpx;
  border: 7rpx solid currentColor;
  border-radius: 6rpx;
}

.certificate-icon__paper::before,
.certificate-icon__paper::after {
  position: absolute;
  left: 9rpx;
  width: 18rpx;
  height: 5rpx;
  border-radius: 5rpx;
  background: currentColor;
  content: '';
}

.certificate-icon__paper::before {
  top: 15rpx;
}

.certificate-icon__paper::after {
  top: 29rpx;
}

.summary-card__body {
  min-width: 0;
  flex: 1;
}

.summary-title {
  display: block;
  margin-top: 10rpx;
  color: #10172d;
  font-size: 30rpx;
  font-weight: 900;
  line-height: 1.2;
}

.summary-desc {
  display: block;
  margin-top: 10rpx;
  color: #35425e;
  font-size: 23rpx;
  line-height: 1.28;
}

.summary-state {
  position: absolute;
  top: 32rpx;
  right: 34rpx;
  color: var(--detail-danger);
  font-size: 27rpx;
  font-weight: 900;
  line-height: 1;
}

.section-title {
  display: block;
  color: #10172d;
  font-size: 34rpx;
  font-weight: 900;
  line-height: 1.2;
}

.info-row {
  min-height: 39rpx;
  border-bottom: 1rpx solid $teacher-mobile-card-border;
  color: #2f3d5b;
  font-size: 22rpx;
  line-height: 1.25;
}

.info-row:first-of-type {
  margin-top: 16rpx;
}

.info-row:last-child {
  border-bottom: 0;
}

.info-label {
  width: 176rpx;
  flex: 0 0 176rpx;
  color: #526079;
}

.info-value {
  min-width: 0;
  flex: 1;
}

.material-row {
  gap: 18rpx;
  min-height: 58rpx;
  margin-top: 14rpx;
}

.material-icon {
  position: relative;
  width: 46rpx;
  height: 46rpx;
  flex: 0 0 46rpx;
  border-radius: 12rpx;
  background: #eaf4ff;
}

.material-icon::before {
  position: absolute;
  inset: 12rpx;
  border: 5rpx solid #1677ff;
  border-radius: 6rpx;
  content: '';
}

.material-icon::after {
  position: absolute;
  right: 16rpx;
  bottom: 16rpx;
  width: 18rpx;
  height: 16rpx;
  background: #1677ff;
  clip-path: polygon(0 100%, 38% 48%, 58% 72%, 78% 38%, 100% 100%);
  content: '';
}

.material-name {
  flex: 1;
  color: #10172d;
  font-size: 25rpx;
  font-weight: 800;
}

.material-link {
  gap: 10rpx;
  color: #2f3d5b;
  font-size: 25rpx;
}

.confirm-desc {
  display: block;
  margin-top: 14rpx;
  color: #35425e;
  font-size: 23rpx;
  line-height: 1.35;
}

.confirm-action {
  width: 100%;
  height: 64rpx;
  margin-top: 16rpx;
  border-radius: 14rpx;
  font-size: 27rpx;
  line-height: 64rpx;
}

.confirm-action--outline {
  margin-top: 12rpx;
  background: #fff;
}

.reject-button {
  width: 100%;
  height: 56rpx;
  margin: 12rpx 0 0;
  padding: 0;
  border: 0;
  border-radius: 14rpx;
  background: #f2f5fa;
  color: #2f3d5b;
  font-size: 25rpx;
  font-weight: 900;
  line-height: 56rpx;
}

@media (max-width: 374px) {
  .summary-card,
  .info-card,
  .material-card,
  .confirm-card {
    padding-right: 26rpx;
    padding-left: 26rpx;
  }

  .info-label {
    width: 150rpx;
    flex-basis: 150rpx;
  }
}
</style>
