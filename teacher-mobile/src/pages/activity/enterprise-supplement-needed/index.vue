<script setup lang="ts">
import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobileNavbar from '../../../components/MobileNavbar.vue'
import MobileTabBar from '../../../components/MobileTabBar.vue'

const infoRows = [
  { label: '实践单位：', value: '山东某软件科技有限公司' },
  { label: '实践岗位：', value: '软件开发工程师' },
  { label: '实践时间：', value: '2023.07 - 2023.12' },
  { label: '实践天数：', value: '180 天' },
]

function goBack() {
  uni.navigateBack()
}

function goSupplement() {
  uni.navigateTo({ url: '/pages/activity/enterprise-resupplement/index' })
}

function submitAgain() {
  uni.navigateTo({ url: '/pages/activity/enterprise-supplement-submitted/index' })
}
</script>

<template>
  <view class="supplement-needed-page">
    <MobileNavbar title="需要补充" size="regular" @back="goBack" />
    <text class="page-subtitle">这条补充档案还需要完善材料</text>

    <view class="content">
      <view class="alert-card">
        <view class="alert-icon">
          <view class="alert-doc"></view>
          <view class="alert-badge">!</view>
        </view>
        <view class="alert-copy">
          <view class="alert-title-row">
            <text class="alert-title">补充档案还需要完善材料</text>
            <text class="alert-tag">待补充</text>
          </view>
          <text class="alert-desc">核验时发现，当前材料还不能完整确认这段企业实践经历。补充后可重新提交校验。</text>
        </view>
      </view>

      <MobileCard class="record-card">
        <view class="card-title-row">
          <view class="accent-line"></view>
          <text class="record-title">山东某软件科技有限公司企业实践</text>
          <text class="status-tag">需补充</text>
        </view>
        <view class="tag-row">
          <text class="tag">企业实践</text>
          <text class="tag">行业实践</text>
        </view>
        <view class="info-list">
          <view v-for="item in infoRows" :key="item.label" class="info-row">
            <text class="info-label">{{ item.label }}</text>
            <text class="info-value">{{ item.value }}</text>
          </view>
        </view>
      </MobileCard>

      <MobileCard class="feedback-card">
        <view class="card-title-row">
          <view class="accent-line"></view>
          <text class="section-title">核验反馈</text>
        </view>
        <view class="feedback-message">
          <text>请补充带有单位盖章或签字的企业实践证明材料，也可补充单位鉴定表或实践总结材料。</text>
        </view>
        <view class="meta-row">
          <text class="meta-label">反馈部门：</text>
          <text class="meta-value">智能制造学院</text>
        </view>
        <view class="meta-row">
          <text class="meta-label">反馈时间：</text>
          <text class="meta-value">今天 10:28</text>
        </view>
      </MobileCard>

      <MobileCard class="material-card">
        <view class="card-title-row">
          <view class="accent-line"></view>
          <text class="section-title">已提交材料</text>
        </view>
        <view class="file-row">
          <view class="pdf-icon">PDF</view>
          <view class="file-copy">
            <text class="file-name">企业实践证明.pdf</text>
            <view class="file-meta-row">
              <text>PDF</text>
              <text class="divider">|</text>
              <text>2.4MB</text>
              <text class="divider">|</text>
              <text class="returned-text">已退回补充</text>
            </view>
          </view>
        </view>
        <text class="material-note">可重新上传更完整的材料，原文件会保留在草稿中。</text>
      </MobileCard>

      <MobileCard class="upload-card">
        <view class="card-title-row">
          <view class="accent-line"></view>
          <text class="section-title">重新补充材料</text>
        </view>
        <text class="upload-desc">请补充带单位盖章或签字的证明材料，提交后将再次进入部门核验。</text>
        <view class="upload-entry" @tap="goSupplement">
          <view class="upload-icon"></view>
          <text>去补充材料</text>
          <view class="chevron"></view>
        </view>
      </MobileCard>

      <MobileCard class="remark-card">
        <view class="card-title-row">
          <view class="accent-line"></view>
          <text class="section-title">补充说明（可选）</text>
        </view>
        <view class="textarea-box">
          <textarea
            class="remark-input"
            placeholder="例如：已补充加盖公章的证明材料。"
            :maxlength="200"
          />
          <text class="textarea-count">0/200</text>
        </view>
      </MobileCard>
    </view>

    <view class="bottom-actions">
      <MobileActionButton class="action-button action-button--later" variant="outline" @tap="goBack">稍后处理</MobileActionButton>
      <MobileActionButton class="action-button" variant="primary" @tap="submitAgain">重新提交</MobileActionButton>
    </view>

    <MobileTabBar active="assistant" />
  </view>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.supplement-needed-page {
  min-height: 100vh;
  padding-bottom: calc(330rpx + env(safe-area-inset-bottom));
  background:
    radial-gradient(circle at 92% 8%, rgba(212, 246, 225, 0.58), transparent 20%),
    linear-gradient(180deg, #fbfffd 0%, #ffffff 45%, #f5faf8 100%);
  color: #10172d;
}

.page-subtitle {
  display: block;
  margin-top: -12rpx;
  color: #687386;
  font-size: 25rpx;
  text-align: center;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 22rpx;
  padding: 28rpx 34rpx 0;
}

.alert-card,
.alert-title-row,
.card-title-row,
.tag-row,
.info-row,
.meta-row,
.file-row,
.file-meta-row,
.upload-entry,
.bottom-actions {
  display: flex;
  align-items: center;
}

.alert-card {
  gap: 28rpx;
  padding: 28rpx 32rpx;
  border: 2rpx solid rgba(230, 238, 232, 0.88);
  border-radius: 24rpx;
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 16rpx 38rpx rgba(23, 38, 72, 0.06);
}

.alert-icon {
  position: relative;
  width: 118rpx;
  height: 118rpx;
  flex: 0 0 auto;
  border-radius: 50%;
  background: #fff0e4;
}

.alert-doc {
  position: absolute;
  left: 36rpx;
  top: 30rpx;
  width: 48rpx;
  height: 60rpx;
  border-radius: 8rpx;
  background: #ff9b45;
}

.alert-doc::before,
.alert-doc::after {
  position: absolute;
  left: 12rpx;
  width: 24rpx;
  height: 5rpx;
  border-radius: 999rpx;
  background: #fff;
  content: '';
}

.alert-doc::before {
  top: 18rpx;
}

.alert-doc::after {
  top: 32rpx;
}

.alert-badge {
  position: absolute;
  right: 20rpx;
  bottom: 22rpx;
  width: 42rpx;
  height: 42rpx;
  border: 6rpx solid #fff;
  border-radius: 50%;
  background: #ff641e;
  color: #fff;
  font-size: 29rpx;
  font-weight: 900;
  line-height: 35rpx;
  text-align: center;
}

.alert-copy {
  min-width: 0;
  flex: 1;
}

.alert-title-row {
  gap: 16rpx;
}

.alert-title,
.alert-desc,
.record-title,
.section-title,
.info-label,
.info-value,
.feedback-message,
.meta-label,
.meta-value,
.file-name,
.material-note,
.upload-desc {
  display: block;
}

.alert-title {
  min-width: 0;
  flex: 1;
  color: #10172d;
  font-size: 34rpx;
  font-weight: 900;
  line-height: 1.25;
}

.alert-tag,
.status-tag {
  flex: 0 0 auto;
  padding: 8rpx 20rpx;
  border-radius: 999rpx;
  background: #fff0e4;
  color: #ff5a18;
  font-size: 26rpx;
  font-weight: 900;
}

.alert-desc {
  margin-top: 18rpx;
  color: #526079;
  font-size: 27rpx;
  line-height: 1.55;
}

.record-card,
.feedback-card,
.material-card,
.upload-card,
.remark-card {
  padding: 28rpx 32rpx;
  border-radius: 24rpx;
}

.card-title-row {
  gap: 18rpx;
}

.accent-line {
  width: 8rpx;
  height: 34rpx;
  flex: 0 0 auto;
  border-radius: 999rpx;
  background: #13b96a;
}

.record-title,
.section-title {
  min-width: 0;
  flex: 1;
  font-size: 34rpx;
  font-weight: 900;
  line-height: 1.25;
}

.status-tag {
  background: transparent;
  color: #ff5a18;
  font-size: 32rpx;
}

.tag-row {
  flex-wrap: wrap;
  gap: 14rpx;
  margin: 18rpx 0 16rpx 26rpx;
}

.tag {
  padding: 7rpx 18rpx;
  border-radius: 999rpx;
  background: #dcf7e8;
  color: #0aa85b;
  font-size: 25rpx;
  font-weight: 800;
}

.info-row,
.meta-row {
  justify-content: space-between;
  gap: 20rpx;
  padding: 14rpx 0 14rpx 26rpx;
  border-bottom: 2rpx solid #edf1f4;
}

.info-row:last-child,
.meta-row:last-child {
  border-bottom: 0;
}

.info-label,
.meta-label {
  flex: 0 0 180rpx;
  color: #526079;
  font-size: 28rpx;
}

.info-value,
.meta-value {
  min-width: 0;
  flex: 1;
  color: #1f2a44;
  font-size: 28rpx;
  line-height: 1.35;
}

.feedback-message {
  margin: 22rpx 0 16rpx;
  padding: 20rpx 26rpx;
  border-radius: 14rpx;
  background: #fff6ed;
  color: #ff5a18;
  font-size: 27rpx;
  font-weight: 800;
  line-height: 1.5;
}

.file-row {
  gap: 24rpx;
  margin-top: 20rpx;
  padding: 18rpx 22rpx;
  border: 2rpx solid #e2e7ee;
  border-radius: 16rpx;
  background: #fbfcfe;
}

.pdf-icon {
  width: 78rpx;
  height: 78rpx;
  flex: 0 0 auto;
  border-radius: 14rpx;
  background: #f4f6f8;
  color: #ef4444;
  font-size: 21rpx;
  font-weight: 900;
  line-height: 78rpx;
  text-align: center;
  box-shadow: inset 0 0 0 2rpx #e0e6ee;
}

.file-copy {
  min-width: 0;
  flex: 1;
}

.file-name {
  color: #1f2a44;
  font-size: 30rpx;
  font-weight: 900;
}

.file-meta-row {
  flex-wrap: wrap;
  gap: 14rpx;
  margin-top: 12rpx;
  color: #526079;
  font-size: 26rpx;
}

.divider {
  color: #b5bfcd;
}

.returned-text {
  color: #ff5a18;
}

.material-note {
  margin: 16rpx 0 0 26rpx;
  color: #687386;
  font-size: 26rpx;
  line-height: 1.45;
}

.upload-desc {
  margin: 18rpx 0 0 26rpx;
  color: #526079;
  font-size: 27rpx;
  line-height: 1.45;
}

.upload-entry {
  position: relative;
  gap: 20rpx;
  margin-top: 20rpx;
  min-height: 86rpx;
  padding: 0 62rpx 0 54rpx;
  border: 2rpx solid #13b96a;
  border-radius: 14rpx;
  background: #fbfffd;
  color: #08a85c;
  font-size: 31rpx;
  font-weight: 900;
}

.upload-icon {
  position: relative;
  width: 42rpx;
  height: 34rpx;
  flex: 0 0 auto;
}

.upload-icon::before {
  position: absolute;
  left: 2rpx;
  top: 12rpx;
  width: 38rpx;
  height: 24rpx;
  border-radius: 15rpx;
  background: currentColor;
  box-shadow: -8rpx 6rpx 0 -2rpx currentColor, 10rpx 7rpx 0 -2rpx currentColor;
  content: '';
}

.upload-icon::after {
  position: absolute;
  left: 18rpx;
  top: 3rpx;
  width: 7rpx;
  height: 29rpx;
  border-radius: 999rpx;
  background: #fff;
  box-shadow: -9rpx 10rpx 0 -2rpx #fff, 9rpx 10rpx 0 -2rpx #fff;
  content: '';
}

.chevron {
  position: absolute;
  right: 26rpx;
  top: 50%;
  width: 20rpx;
  height: 20rpx;
  border-top: 5rpx solid #526079;
  border-right: 5rpx solid #526079;
  transform: translateY(-50%) rotate(45deg);
}

.textarea-box {
  position: relative;
  margin-top: 22rpx;
  min-height: 110rpx;
  border: 2rpx solid #e1e6ed;
  border-radius: 14rpx;
  background: #fbfcfe;
}

.remark-input {
  width: 100%;
  height: 110rpx;
  padding: 22rpx 24rpx 34rpx;
  color: #344054;
  font-size: 26rpx;
  line-height: 1.45;
  box-sizing: border-box;
}

.textarea-count {
  position: absolute;
  right: 20rpx;
  bottom: 12rpx;
  color: #8a94a6;
  font-size: 24rpx;
}

.bottom-actions {
  position: fixed;
  right: 0;
  bottom: calc(164rpx + env(safe-area-inset-bottom));
  left: 0;
  z-index: 6;
  gap: 32rpx;
  padding: 22rpx 34rpx;
  background: rgba(255, 255, 255, 0.94);
  backdrop-filter: blur(16rpx);
}

.action-button {
  height: 84rpx;
  flex: 1;
  border-radius: 14rpx;
  font-size: 31rpx;
}

.action-button--later {
  background: #fff;
}

@media (max-width: 370px) {
  .content {
    padding-right: 24rpx;
    padding-left: 24rpx;
  }

  .alert-card {
    gap: 22rpx;
    padding-right: 24rpx;
    padding-left: 24rpx;
  }

  .alert-icon {
    width: 104rpx;
    height: 104rpx;
  }

  .alert-title-row {
    align-items: flex-start;
    flex-direction: column;
    gap: 12rpx;
  }

  .record-card,
  .feedback-card,
  .material-card,
  .upload-card,
  .remark-card {
    padding-right: 24rpx;
    padding-left: 24rpx;
  }

  .info-label,
  .meta-label {
    flex-basis: 150rpx;
  }

  .upload-entry {
    padding-left: 30rpx;
  }

  .bottom-actions {
    gap: 22rpx;
    padding-right: 24rpx;
    padding-left: 24rpx;
  }
}
</style>
