<script setup lang="ts">
import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobileNavbar from '../../../components/MobileNavbar.vue'
import {
  addEnterpriseSupplementMaterial,
  getMobileEnterpriseState,
  saveEnterpriseArchiveDraft,
  submitEnterpriseSupplement,
} from '../../../domain/enterprise'

const enterpriseState = getMobileEnterpriseState()

const infoRows = [
  { label: '实践单位', value: '山东某软件科技有限公司', type: 'company' },
  { label: '实践岗位', value: '软件开发工程师', type: 'role' },
  { label: '实践时间', value: '2023.07 - 2023.12', type: 'calendar' },
  { label: '实践天数', value: '180 天', type: 'clock' },
]

function goBack() {
  uni.navigateBack()
}

function uploadProof() {
  addEnterpriseSupplementMaterial()
}

function showNoteFeedback() {
  uni.showToast({ title: '补充说明为本地模拟，可直接提交补充材料', icon: 'none' })
}

function handleLater() {
  saveEnterpriseArchiveDraft('enterprise-jinan-training-base')
  uni.navigateBack()
}

function submitSupplement() {
  const archiveRecord = submitEnterpriseSupplement()
  uni.navigateTo({ url: `/pages/activity/enterprise-supplement-submitted/index?recordId=${archiveRecord.id}` })
}
</script>

<template>
  <view class="advanced-search-page">
    <MobileNavbar title="补充材料" size="regular" @back="goBack" />

    <view class="content">
      <view class="alert-card">
        <view class="alert-icon"></view>
        <view class="alert-copy">
          <text class="alert-title">系统发现这条企业实践记录还缺一份证明材料</text>
          <text class="alert-desc">补充后将提交部门核验，通过后正式入档到「企业实践」。</text>
        </view>
      </view>

      <MobileCard class="practice-card">
        <view class="practice-head">
          <view class="briefcase-icon"></view>
          <view class="practice-copy">
            <text class="practice-title">山东某软件科技有限公司企业实践</text>
            <view class="practice-meta">
              <text>企业实践</text>
              <text class="divider">|</text>
              <text>行业实践</text>
              <text class="divider">|</text>
              <text class="orange">待补充</text>
            </view>
          </view>
        </view>

        <view class="system-box">
          <text class="system-title">系统已整理</text>
          <view v-for="item in infoRows" :key="item.label" class="info-row">
            <view class="row-icon" :class="`row-icon--${item.type}`"></view>
            <text class="info-label">{{ item.label }}</text>
            <text class="info-value">{{ item.value }}</text>
          </view>
        </view>
      </MobileCard>

      <MobileCard class="missing-card">
        <view class="section-head">
          <view class="section-icon section-icon--warn"></view>
          <view>
            <text class="section-title orange">还需要补充</text>
            <text class="missing-title">企业实践证明 / 企业鉴定材料</text>
          </view>
        </view>
        <view class="section-separator"></view>
        <text class="reason-title">为什么需要</text>
        <text class="reason-text">用于确认你的实践时间、实践岗位和企业评价情况。</text>
      </MobileCard>

      <MobileCard class="upload-card">
        <view class="section-head">
          <view class="section-icon section-icon--upload"></view>
          <view>
            <text class="section-title">上传材料</text>
            <text class="upload-desc">系统暂未找到可直接使用的证明材料，请上传企业实践证明或企业鉴定材料。</text>
          </view>
        </view>

        <button class="upload-box" @tap="uploadProof">
          <view class="plus-icon"></view>
          <text>上传企业实践证明</text>
        </button>
        <text class="upload-tip">{{ enterpriseState.operationMessage || '支持 PDF、图片、Word 文档，建议上传带单位盖章或签字的证明材料。' }}</text>
      </MobileCard>

      <MobileCard class="note-card">
        <view class="section-head">
          <view class="section-icon section-icon--edit"></view>
          <text class="section-title">补充说明</text>
          <text class="optional">可选</text>
        </view>
        <view class="textarea-box" @tap="showNoteFeedback">
          <text class="placeholder">请输入补充说明，例如：材料由实践单位统一出具</text>
          <text class="count">0/200</text>
        </view>
      </MobileCard>

      <view class="info-tip">
        <view class="tip-icon">i</view>
        <text>提交后由所在学院或人事相关部门核验，核验通过后入档到「企业实践」。如需补充，系统会通过待办提醒你。</text>
      </view>
    </view>

    <view class="bottom-actions">
      <MobileActionButton class="bottom-button" variant="outline" @tap="handleLater">
        稍后处理
      </MobileActionButton>
      <MobileActionButton class="bottom-button" variant="primary" @tap="submitSupplement">
        提交补充
      </MobileActionButton>
    </view>
  </view>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.advanced-search-page {
  min-height: 100vh;
  padding-bottom: calc(170rpx + env(safe-area-inset-bottom));
  overflow-x: hidden;
  background:
    radial-gradient(circle at 5% 2%, rgba(217, 247, 234, 0.82), transparent 28%),
    radial-gradient(circle at 95% 0%, rgba(219, 248, 236, 0.72), transparent 26%),
    linear-gradient(180deg, #fbfffd 0%, #fbfdfb 52%, #f6fbf9 100%);
  color: #111827;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  padding: 24rpx 30rpx 0;
}

.alert-card,
.practice-card,
.missing-card,
.upload-card,
.note-card {
  border-radius: 20rpx;
  box-shadow: 0 16rpx 42rpx rgba(36, 54, 82, 0.06);
}

.alert-card {
  display: flex;
  align-items: center;
  gap: 24rpx;
  padding: 30rpx 34rpx;
  border: 2rpx solid rgba(255, 148, 62, 0.3);
  background: linear-gradient(105deg, rgba(255, 250, 244, 0.95), rgba(255, 255, 255, 0.96));
}

.alert-icon {
  position: relative;
  width: 72rpx;
  height: 72rpx;
  flex: 0 0 auto;
  border-radius: 18rpx;
  background: #fff1e5;
}

.alert-icon::before {
  position: absolute;
  left: 22rpx;
  top: 16rpx;
  width: 30rpx;
  height: 40rpx;
  border-radius: 5rpx;
  background: #ff8135;
  content: '';
}

.alert-icon::after {
  position: absolute;
  right: 8rpx;
  bottom: 10rpx;
  width: 30rpx;
  height: 30rpx;
  border-radius: 50%;
  background: #f36c18;
  color: #fff;
  content: '!';
  font-size: 22rpx;
  font-weight: 900;
  line-height: 30rpx;
  text-align: center;
}

.alert-copy {
  min-width: 0;
  flex: 1;
}

.alert-title,
.alert-desc,
.practice-title,
.system-title,
.info-label,
.info-value,
.section-title,
.missing-title,
.reason-title,
.reason-text,
.upload-desc,
.upload-tip,
.placeholder,
.count {
  display: block;
}

.alert-title {
  color: #8d1f10;
  font-size: 34rpx;
  font-weight: 900;
  line-height: 1.3;
}

.alert-desc {
  margin-top: 16rpx;
  color: #374151;
  font-size: 26rpx;
  line-height: 1.45;
}

.practice-card,
.missing-card,
.upload-card,
.note-card {
  padding: 32rpx;
}

.practice-head,
.practice-meta,
.info-row,
.section-head,
.bottom-actions,
.info-tip {
  display: flex;
  align-items: center;
}

.practice-head {
  align-items: flex-start;
  gap: 24rpx;
}

.briefcase-icon,
.section-icon {
  position: relative;
  flex: 0 0 auto;
  border-radius: 16rpx;
  background: #e8fbf1;
  color: #08a85c;
}

.briefcase-icon {
  width: 60rpx;
  height: 60rpx;
}

.briefcase-icon::before {
  position: absolute;
  left: 15rpx;
  right: 15rpx;
  bottom: 14rpx;
  height: 29rpx;
  border-radius: 6rpx;
  background: currentColor;
  content: '';
}

.briefcase-icon::after {
  position: absolute;
  left: 23rpx;
  top: 12rpx;
  width: 14rpx;
  height: 12rpx;
  border: 4rpx solid currentColor;
  border-bottom: 0;
  border-radius: 8rpx 8rpx 0 0;
  content: '';
}

.practice-copy {
  min-width: 0;
  flex: 1;
}

.practice-title {
  color: #111827;
  font-size: 34rpx;
  font-weight: 900;
  line-height: 1.28;
}

.practice-meta {
  gap: 18rpx;
  margin-top: 18rpx;
  color: #374151;
  font-size: 26rpx;
}

.divider {
  color: #b4bac4;
}

.orange {
  color: #ff5b10;
  font-weight: 900;
}

.system-box {
  margin-top: 28rpx;
  padding: 24rpx 28rpx 18rpx;
  border: 1rpx solid #e5eaef;
  border-radius: 18rpx;
  background: rgba(255, 255, 255, 0.62);
}

.system-title {
  margin-bottom: 16rpx;
  color: #08a85c;
  font-size: 27rpx;
  font-weight: 900;
}

.info-row {
  gap: 22rpx;
  min-height: 60rpx;
  border-bottom: 1rpx dashed #e0e5eb;
}

.info-row:last-child {
  border-bottom: 0;
}

.row-icon {
  position: relative;
  width: 28rpx;
  height: 28rpx;
  flex: 0 0 auto;
  color: #4b5563;
}

.row-icon::before,
.row-icon::after {
  position: absolute;
  content: '';
}

.row-icon--company::before {
  inset: 3rpx 5rpx;
  border-radius: 3rpx;
  background: currentColor;
}

.row-icon--company::after {
  left: 10rpx;
  top: 9rpx;
  width: 4rpx;
  height: 4rpx;
  border-radius: 1rpx;
  background: #fff;
  box-shadow: 8rpx 0 0 #fff, 0 8rpx 0 #fff, 8rpx 8rpx 0 #fff;
}

.row-icon--role::before {
  left: 8rpx;
  top: 3rpx;
  width: 12rpx;
  height: 12rpx;
  border: 4rpx solid currentColor;
  border-radius: 50%;
}

.row-icon--role::after {
  left: 4rpx;
  bottom: 1rpx;
  width: 20rpx;
  height: 12rpx;
  border: 4rpx solid currentColor;
  border-radius: 12rpx 12rpx 4rpx 4rpx;
}

.row-icon--calendar::before {
  inset: 3rpx;
  border: 4rpx solid currentColor;
  border-radius: 4rpx;
}

.row-icon--calendar::after {
  top: 11rpx;
  right: 3rpx;
  left: 3rpx;
  border-top: 4rpx solid currentColor;
}

.row-icon--clock::before {
  inset: 2rpx;
  border: 4rpx solid currentColor;
  border-radius: 50%;
}

.row-icon--clock::after {
  left: 13rpx;
  top: 7rpx;
  width: 4rpx;
  height: 11rpx;
  border-radius: 999rpx;
  background: currentColor;
  box-shadow: 6rpx 7rpx 0 -1rpx currentColor;
}

.info-label {
  flex: 0 0 auto;
  color: #4b5563;
  font-size: 27rpx;
}

.info-value {
  min-width: 0;
  flex: 1;
  color: #1f2937;
  font-size: 27rpx;
  line-height: 1.25;
  text-align: right;
}

.section-head {
  align-items: flex-start;
  gap: 24rpx;
}

.section-icon {
  width: 58rpx;
  height: 58rpx;
}

.section-icon::before,
.section-icon::after {
  position: absolute;
  content: '';
}

.section-icon--warn {
  background: #fff0e4;
  color: #ff720f;
}

.section-icon--warn::before {
  inset: 14rpx;
  border-radius: 50%;
  background: currentColor;
}

.section-icon--warn::after {
  left: 28rpx;
  top: 20rpx;
  width: 5rpx;
  height: 15rpx;
  border-radius: 999rpx;
  background: #fff;
  box-shadow: 0 20rpx 0 -1rpx #fff;
}

.section-icon--upload::before {
  left: 18rpx;
  bottom: 15rpx;
  width: 23rpx;
  height: 18rpx;
  border-radius: 999rpx;
  background: currentColor;
  box-shadow: -10rpx 1rpx 0 -2rpx currentColor, 10rpx 1rpx 0 -2rpx currentColor;
}

.section-icon--upload::after {
  left: 25rpx;
  top: 15rpx;
  width: 8rpx;
  height: 28rpx;
  border-radius: 999rpx;
  background: currentColor;
  box-shadow: -8rpx 7rpx 0 -3rpx currentColor, 8rpx 7rpx 0 -3rpx currentColor;
}

.section-icon--edit::before {
  left: 15rpx;
  top: 29rpx;
  width: 28rpx;
  height: 8rpx;
  border-radius: 999rpx;
  background: currentColor;
  transform: rotate(-36deg);
}

.section-icon--edit::after {
  left: 36rpx;
  top: 17rpx;
  width: 10rpx;
  height: 14rpx;
  border-radius: 4rpx;
  background: currentColor;
  transform: rotate(-36deg);
}

.section-title {
  color: #111827;
  font-size: 34rpx;
  font-weight: 900;
  line-height: 1.25;
}

.missing-title {
  margin-top: 14rpx;
  color: #111827;
  font-size: 29rpx;
  font-weight: 900;
}

.section-separator {
  margin: 26rpx 0;
  border-top: 1rpx solid #e9edf2;
}

.reason-title {
  color: #ff5b10;
  font-size: 26rpx;
  font-weight: 900;
}

.reason-text {
  margin-top: 12rpx;
  color: #4b5563;
  font-size: 26rpx;
  line-height: 1.46;
}

.upload-desc {
  color: #4b5563;
  font-size: 25rpx;
  line-height: 1.42;
}

.upload-box {
  display: flex;
  height: 104rpx;
  align-items: center;
  justify-content: center;
  gap: 14rpx;
  margin: 24rpx 0 0 80rpx;
  padding: 0;
  border: 2rpx dashed #8ee0b4;
  border-radius: 14rpx;
  background: rgba(244, 255, 249, 0.72);
  color: #08a85c;
  font-size: 28rpx;
  font-weight: 900;
}

.upload-box::after {
  display: none;
}

.plus-icon {
  position: relative;
  width: 30rpx;
  height: 30rpx;
  border: 4rpx solid currentColor;
  border-radius: 50%;
}

.plus-icon::before,
.plus-icon::after {
  position: absolute;
  background: currentColor;
  content: '';
}

.plus-icon::before {
  left: 7rpx;
  top: 11rpx;
  width: 12rpx;
  height: 4rpx;
}

.plus-icon::after {
  left: 11rpx;
  top: 7rpx;
  width: 4rpx;
  height: 12rpx;
}

.upload-tip {
  margin: 16rpx 0 0 80rpx;
  color: #4b5563;
  font-size: 24rpx;
  line-height: 1.42;
}

.optional {
  margin-top: 4rpx;
  padding: 5rpx 14rpx;
  border-radius: 999rpx;
  background: #e7faef;
  color: #08a85c;
  font-size: 22rpx;
  font-weight: 900;
}

.textarea-box {
  position: relative;
  min-height: 86rpx;
  margin: 24rpx 0 0 80rpx;
  padding: 22rpx 24rpx 34rpx;
  border: 1rpx solid #d9dee5;
  border-radius: 14rpx;
  background: rgba(255, 255, 255, 0.78);
}

.placeholder {
  color: #9aa2af;
  font-size: 25rpx;
  line-height: 1.42;
}

.count {
  position: absolute;
  right: 24rpx;
  bottom: 14rpx;
  color: #6b7280;
  font-size: 24rpx;
}

.info-tip {
  gap: 20rpx;
  padding: 22rpx 28rpx;
  border-radius: 14rpx;
  background: linear-gradient(100deg, #eafbf2, #f4fff9);
  color: #1f2937;
  font-size: 26rpx;
  line-height: 1.45;
}

.tip-icon {
  width: 30rpx;
  height: 30rpx;
  flex: 0 0 auto;
  border: 3rpx solid #08a85c;
  border-radius: 50%;
  color: #08a85c;
  font-size: 22rpx;
  font-weight: 900;
  line-height: 25rpx;
  text-align: center;
}

.bottom-actions {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 6;
  gap: 28rpx;
  padding: 24rpx 30rpx calc(22rpx + env(safe-area-inset-bottom));
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 -12rpx 30rpx rgba(35, 51, 87, 0.06);
  backdrop-filter: blur(18rpx);
}

.bottom-button {
  height: 78rpx;
  flex: 1;
  border-radius: 14rpx;
  font-size: 31rpx;
}

@media (max-width: 430px) {
  .content {
    gap: 16rpx;
    padding: 20rpx 18rpx 0;
  }

  .alert-card {
    gap: 20rpx;
    padding: 22rpx 24rpx;
  }

  .alert-title {
    font-size: 27rpx;
  }

  .alert-desc,
  .practice-meta,
  .reason-text,
  .info-tip {
    font-size: 23rpx;
  }

  .practice-card,
  .missing-card,
  .upload-card,
  .note-card {
    padding: 26rpx 24rpx;
  }

  .practice-title {
    font-size: 30rpx;
  }

  .system-box {
    padding-right: 22rpx;
    padding-left: 22rpx;
  }

  .info-label,
  .info-value,
  .section-title,
  .missing-title,
  .upload-box {
    font-size: 25rpx;
  }

  .upload-box,
  .upload-tip,
  .textarea-box {
    margin-left: 72rpx;
  }

  .bottom-actions {
    gap: 18rpx;
    padding-right: 18rpx;
    padding-left: 18rpx;
  }

  .bottom-button {
    height: 70rpx;
    font-size: 27rpx;
  }
}

@media (max-width: 374px) {
  .content {
    padding-right: 14rpx;
    padding-left: 14rpx;
  }

  .alert-icon {
    width: 62rpx;
    height: 62rpx;
  }

  .practice-head,
  .section-head {
    gap: 18rpx;
  }

  .briefcase-icon,
  .section-icon {
    width: 50rpx;
    height: 50rpx;
    border-radius: 14rpx;
  }

  .practice-title {
    font-size: 27rpx;
  }

  .practice-meta {
    gap: 12rpx;
  }

  .info-row {
    gap: 14rpx;
  }

  .info-label,
  .info-value,
  .reason-title,
  .reason-text,
  .upload-desc,
  .upload-tip,
  .placeholder {
    font-size: 22rpx;
  }

  .upload-box,
  .upload-tip,
  .textarea-box {
    margin-left: 0;
  }
}
</style>
