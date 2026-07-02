<script setup lang="ts">
import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobileNavbar from '../../../components/MobileNavbar.vue'
import MobileTabBar from '../../../components/MobileTabBar.vue'

const infoRows = [
  { label: '档案分类：', value: '企业实践  |  行业实践' },
  { label: '记录名称：', value: '山东某软件科技有限公司企业实践' },
  { label: '实践单位：', value: '山东某软件科技有限公司' },
  { label: '实践岗位：', value: '软件开发工程师' },
  { label: '实践时间：', value: '2023.07 - 2023.12' },
  { label: '实践天数：', value: '180 天' },
]

function goBack() {
  uni.navigateBack()
}

function editField(label: string) {
  uni.showToast({ title: `修改${label.replace('：', '')}`, icon: 'none' })
}

function supplementMaterial() {
  uni.showToast({ title: '去补充材料', icon: 'none' })
}

function backDraft() {
  uni.showToast({ title: '返回草稿', icon: 'none' })
}

function saveEdit() {
  uni.showToast({ title: '保存修改', icon: 'none' })
}
</script>

<template>
  <view class="archive-edit-page">
    <MobileNavbar title="修改档案信息" size="regular" @back="goBack" />

    <view class="subtitle">系统已帮你整理出以下信息，请修改不准确的部分</view>

    <view class="content">
      <MobileCard class="draft-card">
        <view class="draft-art">
          <view class="paper-icon"></view>
          <view class="edit-badge"></view>
        </view>
        <view class="draft-copy">
          <text class="draft-title">档案草稿信息</text>
          <view class="tag-row">
            <text class="tag">企业实践</text>
            <text class="tag">行业实践</text>
          </view>
          <text class="draft-desc">你可以在提交前修改这条档案草稿中的关键信息，系统会保留已识别的内容。</text>
        </view>
      </MobileCard>

      <MobileCard class="section-card">
        <view class="section-head">
          <view class="accent"></view>
          <text class="section-title">基本信息</text>
        </view>
        <view class="info-panel">
          <view v-for="item in infoRows" :key="item.label" class="info-row" @tap="editField(item.label)">
            <text class="info-label">{{ item.label }}</text>
            <text class="info-value">{{ item.value }}</text>
            <view class="chevron"></view>
          </view>
        </view>
      </MobileCard>

      <MobileCard class="section-card">
        <view class="section-head">
          <view class="accent"></view>
          <text class="section-title">实践内容</text>
        </view>
        <view class="textarea-box">
          <text class="textarea-content">参与企业项目开发，学习最新技术，完成系统功能模块设计与实现。</text>
          <text class="counter">30/500</text>
        </view>
      </MobileCard>

      <MobileCard class="section-card">
        <view class="section-head">
          <view class="accent"></view>
          <text class="section-title">补充说明</text>
          <text class="optional">（可选）</text>
        </view>
        <view class="textarea-box textarea-box--empty">
          <text class="placeholder">可补充说明材料来源、实践背景或其他需要说明的情况</text>
          <text class="counter">0/300</text>
        </view>
      </MobileCard>

      <MobileCard class="section-card material-card">
        <view class="section-head">
          <view class="accent"></view>
          <text class="section-title">相关材料</text>
        </view>
        <view class="material-box">
          <view class="material-icon"></view>
          <view class="material-copy">
            <text class="material-title">当前未上传证明材料</text>
            <text class="material-desc">可稍后补充企业实践证明、企业鉴定表或单位盖章证明</text>
          </view>
          <MobileActionButton class="material-button" variant="outline" @tap="supplementMaterial">
            去补充材料
          </MobileActionButton>
        </view>
      </MobileCard>

      <view class="tip-box">
        <view class="shield-icon"></view>
        <view class="tip-copy">
          <text class="tip-title">温馨提示</text>
          <text class="tip-desc">修改后的内容将作为提交校验前的最终草稿，你仍可在提交前继续补充材料。</text>
        </view>
        <view class="leaf-art"></view>
      </view>
    </view>

    <view class="bottom-actions">
      <MobileActionButton class="action-button action-button--back" variant="outline" @tap="backDraft">
        返回草稿
      </MobileActionButton>
      <MobileActionButton class="action-button" variant="primary" @tap="saveEdit">
        保存修改
      </MobileActionButton>
    </view>

    <MobileTabBar active="assistant" />
  </view>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.archive-edit-page {
  min-height: 100vh;
  padding-bottom: calc(360rpx + env(safe-area-inset-bottom));
  background:
    radial-gradient(circle at 12% 0%, rgba(235, 252, 243, 0.86), transparent 22%),
    radial-gradient(circle at 96% 6%, rgba(224, 247, 235, 0.72), transparent 18%),
    linear-gradient(180deg, #ffffff 0%, #f8fbff 54%, #f7fbf9 100%);
  color: #111827;
}

.subtitle {
  margin-top: -8rpx;
  padding: 0 48rpx 20rpx;
  color: #67728a;
  font-size: 28rpx;
  line-height: 1.35;
  text-align: center;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  padding: 0 28rpx;
}

.draft-card,
.section-head,
.info-row,
.material-box,
.tip-box,
.bottom-actions {
  display: flex;
  align-items: center;
}

.draft-card {
  gap: 28rpx;
  padding: 32rpx 34rpx;
  border-radius: 22rpx;
  box-shadow: 0 16rpx 42rpx rgba(45, 64, 93, 0.07);
}

.draft-art {
  position: relative;
  width: 112rpx;
  height: 120rpx;
  flex: 0 0 auto;
}

.paper-icon {
  position: absolute;
  left: 8rpx;
  top: 0;
  width: 78rpx;
  height: 100rpx;
  border-radius: 10rpx;
  background: linear-gradient(135deg, #d8f7e5, #a4e8c1);
}

.paper-icon::before {
  position: absolute;
  right: 0;
  top: 0;
  width: 30rpx;
  height: 30rpx;
  border-radius: 0 10rpx 0 8rpx;
  background: #f4fff8;
  content: '';
}

.paper-icon::after {
  position: absolute;
  left: 18rpx;
  top: 34rpx;
  width: 46rpx;
  height: 8rpx;
  border-radius: 999rpx;
  background: #10ad63;
  box-shadow: 0 24rpx 0 #10ad63, 0 48rpx 0 #10ad63;
  content: '';
}

.edit-badge {
  position: absolute;
  right: 0;
  bottom: 6rpx;
  width: 58rpx;
  height: 58rpx;
  border-radius: 50%;
  background: linear-gradient(135deg, #32c779, #0aa75d);
}

.edit-badge::before {
  position: absolute;
  left: 20rpx;
  top: 15rpx;
  width: 13rpx;
  height: 32rpx;
  border-radius: 999rpx;
  background: #fff;
  content: '';
  transform: rotate(45deg);
}

.draft-copy {
  min-width: 0;
  flex: 1;
}

.draft-title,
.draft-desc,
.section-title,
.info-label,
.info-value,
.textarea-content,
.placeholder,
.material-title,
.material-desc,
.tip-title,
.tip-desc {
  display: block;
}

.draft-title {
  font-size: 38rpx;
  font-weight: 900;
  line-height: 1.22;
}

.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 18rpx;
  margin-top: 16rpx;
}

.tag {
  padding: 8rpx 24rpx;
  border-radius: 999rpx;
  background: #e2f7eb;
  color: #08a85c;
  font-size: 26rpx;
  font-weight: 900;
}

.draft-desc {
  margin-top: 14rpx;
  color: #53617b;
  font-size: 27rpx;
  line-height: 1.45;
}

.section-card {
  padding: 24rpx;
  border-radius: 22rpx;
  box-shadow: 0 16rpx 42rpx rgba(45, 64, 93, 0.06);
}

.section-head {
  gap: 16rpx;
  margin-bottom: 18rpx;
}

.accent {
  width: 8rpx;
  height: 38rpx;
  border-radius: 999rpx;
  background: #10b86b;
}

.section-title {
  font-size: 33rpx;
  font-weight: 900;
}

.optional {
  color: #5f6b80;
  font-size: 28rpx;
  font-weight: 700;
}

.info-panel {
  overflow: hidden;
  border: 1rpx solid #d9e1ec;
  border-radius: 14rpx;
}

.info-row {
  min-height: 66rpx;
  padding: 0 12rpx 0 20rpx;
  border-bottom: 1rpx solid #e4e9f0;
}

.info-row:last-child {
  border-bottom: 0;
}

.info-label {
  width: 226rpx;
  flex: 0 0 auto;
  color: #53617b;
  font-size: 27rpx;
}

.info-value {
  min-width: 0;
  flex: 1;
  color: #15213b;
  font-size: 28rpx;
  line-height: 1.32;
}

.chevron {
  width: 17rpx;
  height: 17rpx;
  margin-left: 12rpx;
  border-top: 4rpx solid #667085;
  border-right: 4rpx solid #667085;
  transform: rotate(45deg);
}

.textarea-box {
  position: relative;
  min-height: 106rpx;
  padding: 22rpx 24rpx 44rpx;
  border: 1rpx solid #d9e1ec;
  border-radius: 14rpx;
  background: #fff;
}

.textarea-content,
.placeholder {
  color: #15213b;
  font-size: 28rpx;
  line-height: 1.5;
}

.textarea-box--empty {
  min-height: 104rpx;
}

.placeholder {
  color: #8a94a6;
}

.counter {
  position: absolute;
  right: 22rpx;
  bottom: 16rpx;
  color: #8a94a6;
  font-size: 25rpx;
}

.material-card {
  padding-bottom: 26rpx;
}

.material-box {
  gap: 24rpx;
  padding: 24rpx 26rpx;
  border-radius: 14rpx;
  background: linear-gradient(135deg, #fbfffd, #f4fbf8);
}

.material-icon {
  position: relative;
  width: 108rpx;
  height: 84rpx;
  flex: 0 0 auto;
  border-radius: 16rpx 16rpx 12rpx 12rpx;
  background: linear-gradient(135deg, #d7f6e6, #a8e8c3);
}

.material-icon::before {
  position: absolute;
  left: 21rpx;
  top: -10rpx;
  width: 52rpx;
  height: 28rpx;
  border-radius: 10rpx 10rpx 0 0;
  background: #c4f0d8;
  content: '';
}

.material-icon::after {
  position: absolute;
  left: 38rpx;
  top: 26rpx;
  width: 32rpx;
  height: 24rpx;
  border: 5rpx solid #fff;
  border-radius: 6rpx;
  content: '';
}

.material-copy {
  min-width: 0;
  flex: 1;
}

.material-title {
  font-size: 30rpx;
  font-weight: 900;
}

.material-desc {
  margin-top: 12rpx;
  color: #6b7280;
  font-size: 25rpx;
  line-height: 1.38;
}

.material-button {
  width: 142rpx;
  height: 58rpx;
  flex: 0 0 auto;
  border-radius: 10rpx;
  font-size: 26rpx;
}

.tip-box {
  position: relative;
  gap: 24rpx;
  min-height: 92rpx;
  padding: 20rpx 28rpx;
  overflow: hidden;
  border: 1rpx solid rgba(12, 178, 101, 0.36);
  border-radius: 18rpx;
  background: linear-gradient(135deg, #f2fff8, #ffffff);
}

.shield-icon {
  position: relative;
  width: 58rpx;
  height: 66rpx;
  flex: 0 0 auto;
  border-radius: 28rpx 28rpx 20rpx 20rpx;
  background: linear-gradient(135deg, #21c777, #0aa75d);
  clip-path: polygon(50% 0, 92% 18%, 84% 78%, 50% 100%, 16% 78%, 8% 18%);
}

.shield-icon::before {
  position: absolute;
  left: 22rpx;
  top: 22rpx;
  width: 16rpx;
  height: 16rpx;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 18rpx 0 -5rpx #fff;
  content: '';
}

.tip-copy {
  position: relative;
  z-index: 1;
  min-width: 0;
  flex: 1;
}

.tip-title {
  font-size: 28rpx;
  font-weight: 900;
}

.tip-desc {
  margin-top: 6rpx;
  color: #53617b;
  font-size: 24rpx;
  line-height: 1.4;
}

.leaf-art {
  position: absolute;
  right: 8rpx;
  bottom: -8rpx;
  width: 118rpx;
  height: 94rpx;
  opacity: 0.28;
}

.leaf-art::before,
.leaf-art::after {
  position: absolute;
  border-radius: 999rpx 999rpx 0 999rpx;
  background: #8fe2b5;
  content: '';
}

.leaf-art::before {
  right: 20rpx;
  bottom: 0;
  width: 42rpx;
  height: 82rpx;
  transform: rotate(28deg);
}

.leaf-art::after {
  right: 68rpx;
  bottom: 8rpx;
  width: 36rpx;
  height: 58rpx;
  transform: rotate(-52deg);
}

.bottom-actions {
  position: fixed;
  right: 0;
  bottom: calc(138rpx + env(safe-area-inset-bottom));
  left: 0;
  z-index: 6;
  gap: 28rpx;
  padding: 16rpx 28rpx 14rpx;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(16rpx);
}

.action-button {
  height: 76rpx;
  flex: 1;
  border-radius: 14rpx;
  font-size: 31rpx;
}

.action-button--back {
  background: #fff;
}

@media (max-width: 374px) {
  .subtitle {
    padding-right: 28rpx;
    padding-left: 28rpx;
    font-size: 25rpx;
  }

  .content {
    padding-right: 20rpx;
    padding-left: 20rpx;
  }

  .draft-card {
    gap: 20rpx;
    padding-right: 24rpx;
    padding-left: 24rpx;
  }

  .draft-art {
    width: 92rpx;
    transform: scale(0.86);
    transform-origin: left center;
  }

  .draft-title {
    font-size: 33rpx;
  }

  .draft-desc,
  .textarea-content,
  .placeholder {
    font-size: 25rpx;
  }

  .section-card {
    padding-right: 20rpx;
    padding-left: 20rpx;
  }

  .info-label {
    width: 150rpx;
    font-size: 24rpx;
  }

  .info-value {
    font-size: 24rpx;
  }

  .material-box {
    align-items: flex-start;
    flex-direction: column;
  }

  .material-button {
    width: 100%;
  }

  .bottom-actions {
    gap: 18rpx;
    padding-right: 20rpx;
    padding-left: 20rpx;
  }

  .action-button {
    font-size: 27rpx;
  }
}
</style>
