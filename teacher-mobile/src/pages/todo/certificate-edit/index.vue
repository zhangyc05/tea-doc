<script setup lang="ts">
import { computed } from 'vue'
import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobileNavbar from '../../../components/MobileNavbar.vue'
import MobilePageShell from '../../../components/MobilePageShell.vue'
import MobileStatusTag from '../../../components/MobileStatusTag.vue'
import {
  getTodoState,
  replaceTodoCertificateMaterial,
  submitTodoCertificateCorrection,
  updateTodoCertificateField,
} from '../../../stores/todoStore'

const todoState = getTodoState()
const certificate = computed(() => todoState.certificate)
const editableInfo = computed(() => certificate.value.editableInfo)

function goBack() {
  uni.navigateBack()
}

function goSubmitResult() {
  submitTodoCertificateCorrection(certificate.value.id)
  uni.navigateTo({ url: '/pages/todo/certificate-submit/index' })
}

function replaceMaterial() {
  replaceTodoCertificateMaterial()
  uni.showToast({ title: '材料已更换，提交后核验', icon: 'none' })
}

function updateField(label: string, event: unknown) {
  const value = (event as { detail?: { value?: string } }).detail?.value || ''
  updateTodoCertificateField(label, value)
}
</script>

<template>
  <MobilePageShell class="edit-page" active="todo">
    <MobileNavbar title="修改记录信息" size="compact" @back="goBack" />

    <text class="page-hint">系统已帮您识别这条记录，请修改不准确的信息。</text>
    <view class="leaf-mark" aria-hidden="true">
      <view class="leaf leaf--left"></view>
      <view class="leaf leaf--right"></view>
      <view class="leaf leaf--small"></view>
    </view>

    <MobileCard class="summary-card">
      <MobileStatusTag tone="blue">待确认</MobileStatusTag>
      <view class="summary-main">
        <view class="certificate-icon">
          <view class="certificate-icon__paper"></view>
        </view>
        <view class="summary-body">
          <text class="summary-title">{{ certificate.title }}</text>
          <text class="summary-meta">{{ certificate.category }} ｜ {{ certificate.type }}</text>
          <text class="summary-source">来源：{{ certificate.source }}</text>
        </view>
      </view>
      <view class="summary-note">
        <text class="summary-note__icon">i</text>
        <text class="summary-note__text">这条记录基本属于您，如有信息不准确，可修改后提交。</text>
      </view>
    </MobileCard>

    <MobileCard class="form-card">
      <text class="section-title">可修改信息</text>
      <view v-for="item in editableInfo" :key="item.label" class="field-row">
        <text class="field-label">{{ item.label }}：</text>
        <input class="field-input" :value="item.value" @input="updateField(item.label, $event)" />
        <text class="edit-icon">✎</text>
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
        <MobileActionButton class="replace-button" variant="outline" @tap="replaceMaterial">更换材料</MobileActionButton>
      </view>
    </MobileCard>

    <MobileCard class="note-card">
      <view class="note-title">
        <text class="section-title">补充说明</text>
        <text class="optional-text">（选填）</text>
      </view>
      <view class="textarea-wrap">
        <textarea
          class="note-textarea"
          maxlength="200"
          placeholder="如需说明修改原因，可补充一句说明"
          placeholder-class="note-placeholder"
        />
        <text class="note-count">0/200</text>
      </view>
    </MobileCard>

    <view class="submit-tip">
      <view class="submit-tip__icon"></view>
      <text class="submit-tip__text">提交后将进入部门核验，核验通过后入档到“个人发展”。</text>
    </view>

    <view class="submit-actions">
      <MobileActionButton class="submit-button" variant="primary" @tap="goSubmitResult">提交修改</MobileActionButton>
      <MobileActionButton class="cancel-button" variant="outline" @tap="goBack">取消修改</MobileActionButton>
    </view>
  </MobilePageShell>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.edit-page {
  position: relative;
  overflow: hidden;
  padding-top: calc(var(--status-bar-height) + 8rpx);
  padding-bottom: calc(170rpx + env(safe-area-inset-bottom));
}

.nav-head,
.summary-main,
.summary-note,
.field-row,
.material-row,
.note-title,
.submit-tip {
  display: flex;
  align-items: center;
}


.nav-head {
  position: relative;
  z-index: 1;
  height: 68rpx;
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

.back-button::after {
  display: none;
  border: 0;
}

.back-button__icon {
  position: absolute;
  top: 20rpx;
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
  margin: 6rpx 16rpx 18rpx;
  color: #455472;
  font-size: 26rpx;
  line-height: 1.5;
}

.leaf-mark {
  position: absolute;
  top: 104rpx;
  right: 38rpx;
  width: 170rpx;
  height: 128rpx;
  opacity: 0.32;
  pointer-events: none;
}

.leaf {
  position: absolute;
  border-radius: 100% 0 100% 0;
  background: linear-gradient(135deg, #b6efd0, #6fd599);
}

.leaf--left {
  right: 78rpx;
  bottom: 2rpx;
  width: 74rpx;
  height: 42rpx;
  transform: rotate(18deg);
}

.leaf--right {
  right: 20rpx;
  bottom: 28rpx;
  width: 90rpx;
  height: 48rpx;
  transform: rotate(-38deg);
}

.leaf--small {
  right: 0;
  bottom: 0;
  width: 64rpx;
  height: 36rpx;
  transform: rotate(-12deg);
}

.summary-card,
.form-card,
.material-card,
.note-card {
  position: relative;
  z-index: 1;
  padding: 28rpx;
}

.summary-card {
  margin-bottom: 14rpx;
  border-radius: 30rpx;
}

.summary-main {
  gap: 22rpx;
  margin-top: 18rpx;
}

.certificate-icon {
  position: relative;
  flex: 0 0 auto;
  width: 82rpx;
  height: 82rpx;
  border-radius: 20rpx;
  background: #e7f8ee;
}

.certificate-icon__paper {
  position: absolute;
  top: 18rpx;
  left: 23rpx;
  width: 42rpx;
  height: 50rpx;
  border-radius: 8rpx;
  background: linear-gradient(180deg, #16cf72, #08ab55);
}

.certificate-icon__paper::before,
.certificate-icon__paper::after {
  position: absolute;
  left: 12rpx;
  width: 19rpx;
  height: 5rpx;
  border-radius: 999rpx;
  background: #fff;
  content: '';
}

.certificate-icon__paper::before {
  top: 14rpx;
}

.certificate-icon__paper::after {
  top: 27rpx;
}

.summary-body {
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
}

.summary-title {
  color: #11182d;
  font-size: 30rpx;
  font-weight: 900;
  line-height: 1.34;
}

.summary-meta {
  margin-top: 10rpx;
  color: #3d4a67;
  font-size: 25rpx;
  line-height: 1.25;
}

.summary-source {
  margin-top: 10rpx;
  color: #455472;
  font-size: 23rpx;
  line-height: 1.25;
}

.summary-note {
  gap: 14rpx;
  margin-top: 16rpx;
  padding-top: 12rpx;
  border-top: 1rpx solid #edf1f6;
}

.summary-note__icon {
  display: flex;
  width: 26rpx;
  height: 26rpx;
  align-items: center;
  justify-content: center;
  border: 3rpx solid $teacher-mobile-primary;
  border-radius: 50%;
  color: $teacher-mobile-primary;
  font-size: 18rpx;
  font-weight: 900;
  line-height: 1;
}

.summary-note__text {
  flex: 1;
  color: #34435f;
  font-size: 23rpx;
  line-height: 1.45;
}

.form-card,
.material-card,
.note-card {
  margin-top: 14rpx;
}

.section-title {
  color: #10172d;
  font-size: 34rpx;
  font-weight: 900;
  line-height: 1.2;
}

.field-row {
  height: 52rpx;
  margin-top: 9rpx;
  padding: 0 16rpx 0 20rpx;
  border: 1rpx solid #dfe5ef;
  border-radius: 12rpx;
  background: rgba(255, 255, 255, 0.88);
}

.field-label {
  flex: 0 0 150rpx;
  color: #182238;
  font-size: 25rpx;
  font-weight: 800;
}

.field-input {
  min-width: 0;
  flex: 1;
  color: #20283a;
  font-size: 24rpx;
  line-height: 52rpx;
}

.edit-icon {
  margin-left: 12rpx;
  color: #6d7584;
  font-size: 29rpx;
  line-height: 1;
}

.material-row {
  min-height: 72rpx;
  margin-top: 14rpx;
  padding: 12rpx;
  border: 1rpx solid #dfe5ef;
  border-radius: 14rpx;
  background: rgba(255, 255, 255, 0.86);
}

.file-icon {
  position: relative;
  flex: 0 0 auto;
  width: 48rpx;
  height: 54rpx;
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
  min-width: 0;
  flex: 1;
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

.replace-button {
  flex: 0 0 auto;
  width: 128rpx;
  height: 48rpx;
  border-radius: 12rpx;
  font-size: 24rpx;
}

.optional-text {
  margin-left: 8rpx;
  color: #121a2e;
  font-size: 25rpx;
}

.textarea-wrap {
  position: relative;
  height: 76rpx;
  margin-top: 12rpx;
  padding: 16rpx 24rpx;
  border: 1rpx solid #dfe5ef;
  border-radius: 14rpx;
  background: rgba(255, 255, 255, 0.86);
}

.note-textarea {
  width: 100%;
  height: 100%;
  color: #20283a;
  font-size: 25rpx;
  line-height: 1.45;
}

:deep(.note-placeholder) {
  color: #a1aaba;
}

.note-count {
  position: absolute;
  right: 24rpx;
  bottom: 18rpx;
  color: #6e7889;
  font-size: 22rpx;
}

.submit-tip {
  gap: 16rpx;
  margin-top: 12rpx;
  padding: 15rpx 26rpx;
  border-radius: 18rpx;
  background: linear-gradient(90deg, rgba(225, 250, 235, 0.96), rgba(230, 248, 241, 0.88));
}

.submit-tip__icon {
  position: relative;
  flex: 0 0 auto;
  width: 28rpx;
  height: 34rpx;
  border: 4rpx solid $teacher-mobile-primary;
  border-radius: 50% 50% 42% 42%;
}

.submit-tip__icon::after {
  position: absolute;
  right: 7rpx;
  bottom: -9rpx;
  width: 8rpx;
  height: 10rpx;
  border-radius: 4rpx;
  background: $teacher-mobile-primary;
  content: '';
}

.submit-tip__text {
  color: #14975a;
  font-size: 23rpx;
  font-weight: 800;
  line-height: 1.42;
}

.submit-actions {
  margin-top: 12rpx;
}

.submit-button,
.cancel-button {
  width: 100%;
  height: 64rpx;
  border-radius: 14rpx;
  font-size: 26rpx;
}

.cancel-button {
  margin-top: 10rpx;
}

@media (max-width: 374px) {
  .page-hint {
    margin-bottom: 22rpx;
    font-size: 26rpx;
  }

  .summary-card,
  .form-card,
  .material-card,
  .note-card {
    padding: 24rpx;
  }

  .summary-main {
    gap: 22rpx;
  }

  .summary-title {
    font-size: 31rpx;
  }

  .field-label {
    flex-basis: 142rpx;
    font-size: 25rpx;
  }

  .field-input {
    font-size: 24rpx;
  }

  .replace-button {
    width: 118rpx;
    font-size: 22rpx;
  }
}
</style>
