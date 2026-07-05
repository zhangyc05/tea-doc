<script setup lang="ts">
import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobileIcon from '../../../components/MobileIcon.vue'
import MobileNavbar from '../../../components/MobileNavbar.vue'

const uploadMethods = [
  { title: '从手机上传', desc: '支持 PDF、图片、Word 文档', icon: 'upload' },
  { title: '拍照上传', desc: '适合纸质证明材料', icon: 'camera' },
] as const

function goBack() {
  uni.navigateBack()
}

function showUploadFeedback(action: string) {
  uni.showToast({ title: `${action}为本地模拟入口，当前沿用已上传材料`, icon: 'none' })
}

function previewMaterial() {
  uni.showToast({ title: '材料预览为本地模拟，已展示证明文件摘要', icon: 'none' })
}

function confirmMaterial() {
  uni.navigateTo({ url: '/pages/activity/enterprise-supplement-submitted/index' })
}
</script>

<template>
  <view class="proof-upload-page">
    <MobileNavbar title="上传材料" size="regular" @back="goBack" />

    <view class="content">
      <MobileCard class="intro-card">
        <view class="intro-icon">
          <view class="upload-dot"></view>
        </view>
        <view class="intro-copy">
          <text class="intro-title">请上传企业实践证明材料</text>
          <text class="intro-desc">支持企业实践证明、企业鉴定表、单位盖章证明等材料，建议上传带单位盖章或签字的文件。</text>
        </view>
      </MobileCard>

      <MobileCard class="type-card">
        <view class="tag-icon"></view>
        <text class="type-title">材料类型</text>
        <text class="type-badge">企业实践证明 / 企业鉴定材料</text>
      </MobileCard>

      <MobileCard class="method-card">
        <text class="section-title">上传方式</text>
        <view class="method-list">
          <view v-for="item in uploadMethods" :key="item.title" class="method-row" @tap="showUploadFeedback(item.title)">
            <MobileIcon class="method-icon" :name="item.icon" tone="green" size="plain" shape="none" />
            <view class="method-copy">
              <text class="method-title">{{ item.title }}</text>
              <text class="method-desc">{{ item.desc }}</text>
            </view>
            <wd-icon name="chevron-right" size="24rpx" color="#7b8495" />
          </view>
        </view>
      </MobileCard>

      <MobileCard class="uploaded-card">
        <text class="section-title">已上传材料</text>
        <view class="uploaded-row">
          <view class="pdf-icon"></view>
          <view class="uploaded-copy">
            <text class="file-name">企业实践证明.pdf</text>
            <text class="file-meta">PDF ｜ 2.4MB</text>
          </view>
          <text class="success-text">上传成功</text>
        </view>

        <view class="preview-title">材料预览</view>
        <view class="preview-row" @tap="previewMaterial">
          <view class="paper-thumb">
            <view class="paper-line paper-line--wide"></view>
            <view class="paper-line"></view>
            <view class="paper-line paper-line--short"></view>
            <view class="stamp"></view>
          </view>
          <view class="preview-copy">
            <text class="file-name">企业实践证明.pdf</text>
            <text class="preview-desc">点击可查看预览</text>
          </view>
          <wd-icon name="chevron-right" size="24rpx" color="#7b8495" />
        </view>
      </MobileCard>
    </view>

    <view class="bottom-actions">
      <MobileActionButton class="action-button action-button--ghost" variant="outline" @tap="showUploadFeedback('重新上传')">重新上传</MobileActionButton>
      <MobileActionButton class="action-button" variant="primary" @tap="confirmMaterial">确定使用</MobileActionButton>
    </view>
  </view>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.proof-upload-page {
  min-height: 100vh;
  padding-bottom: calc(178rpx + env(safe-area-inset-bottom));
  background:
    radial-gradient(circle at 14% 0%, rgba(224, 251, 238, 0.78), transparent 34%),
    linear-gradient(180deg, #fbfffd 0%, #ffffff 48%, #f4faf7 100%);
  color: #10172d;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 30rpx;
  padding: 24rpx 34rpx 0;
}

.intro-card,
.type-card,
.method-row,
.uploaded-row,
.preview-row,
.bottom-actions {
  display: flex;
  align-items: center;
}

.intro-card {
  gap: 30rpx;
  padding: 44rpx 34rpx;
  border-radius: 24rpx;
}

.intro-icon {
  position: relative;
  width: 92rpx;
  height: 92rpx;
  flex: 0 0 auto;
  border-radius: 20rpx;
  background: #e5f8ed;
}

.intro-icon::before {
  position: absolute;
  left: 28rpx;
  top: 20rpx;
  width: 38rpx;
  height: 48rpx;
  border-radius: 6rpx;
  background: #11ad62;
  clip-path: polygon(0 0, 70% 0, 100% 30%, 100% 100%, 0 100%);
  content: '';
}

.intro-icon::after {
  position: absolute;
  left: 38rpx;
  top: 42rpx;
  width: 22rpx;
  height: 5rpx;
  border-radius: 999rpx;
  background: #eafff3;
  box-shadow: 0 14rpx 0 #eafff3;
  content: '';
}

.upload-dot {
  position: absolute;
  right: 17rpx;
  bottom: 19rpx;
  width: 32rpx;
  height: 32rpx;
  border-radius: 50%;
  background: #10b965;
}

.upload-dot::before {
  position: absolute;
  left: 9rpx;
  top: 8rpx;
  width: 14rpx;
  height: 14rpx;
  border-left: 5rpx solid #fff;
  border-top: 5rpx solid #fff;
  content: '';
  transform: rotate(45deg);
}

.intro-copy {
  min-width: 0;
  flex: 1;
}

.intro-title,
.intro-desc,
.type-title,
.section-title,
.method-title,
.method-desc,
.file-name,
.file-meta,
.preview-desc {
  display: block;
}

.intro-title {
  font-size: 34rpx;
  font-weight: 900;
  line-height: 1.25;
}

.intro-desc {
  margin-top: 22rpx;
  color: #526079;
  font-size: 27rpx;
  line-height: 1.72;
}

.type-card {
  gap: 26rpx;
  padding: 34rpx 32rpx;
  border-radius: 22rpx;
}

.tag-icon {
  width: 38rpx;
  height: 38rpx;
  flex: 0 0 auto;
  border-radius: 10rpx 10rpx 10rpx 2rpx;
  background: #14b86a;
  transform: rotate(45deg);
}

.tag-icon::before {
  display: block;
  width: 8rpx;
  height: 8rpx;
  margin: 8rpx 0 0 8rpx;
  border-radius: 50%;
  background: #e9fff2;
  content: '';
}

.type-title {
  flex: 0 0 auto;
  font-size: 33rpx;
  font-weight: 900;
}

.type-badge {
  min-width: 0;
  padding: 10rpx 22rpx;
  border-radius: 10rpx;
  background: #e6f9ee;
  color: #07a95b;
  font-size: 28rpx;
  font-weight: 800;
  line-height: 1.2;
}

.method-card,
.uploaded-card {
  padding: 36rpx;
  border-radius: 24rpx;
}

.section-title {
  font-size: 38rpx;
  font-weight: 900;
}

.method-list {
  margin-top: 26rpx;
}

.method-row {
  position: relative;
  gap: 34rpx;
  padding: 28rpx 52rpx 30rpx 0;
}

.method-row + .method-row {
  border-top: 2rpx solid #edf1f4;
}

.method-icon {
  width: 96rpx;
  height: 96rpx;
  flex: 0 0 auto;
  border-radius: 18rpx;
  background: #e6f9ef;
}

.method-copy {
  min-width: 0;
  flex: 1;
}

.method-title {
  font-size: 31rpx;
  font-weight: 900;
}

.method-desc {
  margin-top: 16rpx;
  color: #526079;
  font-size: 27rpx;
}

.chevron {
  position: absolute;
  right: 16rpx;
  top: 50%;
  width: 22rpx;
  height: 22rpx;
  border-top: 5rpx solid #6f7b90;
  border-right: 5rpx solid #6f7b90;
  transform: translateY(-50%) rotate(45deg);
}

.uploaded-row {
  gap: 28rpx;
  margin-top: 30rpx;
  padding-bottom: 28rpx;
  border-bottom: 2rpx solid #edf1f4;
}

.pdf-icon {
  position: relative;
  width: 82rpx;
  height: 82rpx;
  flex: 0 0 auto;
  border-radius: 16rpx;
  background: linear-gradient(135deg, #ff615f, #f03c38);
}

.pdf-icon::before {
  position: absolute;
  left: 22rpx;
  top: 24rpx;
  width: 38rpx;
  height: 30rpx;
  border: 5rpx solid #fff;
  border-right: 0;
  border-left: 0;
  content: '';
  transform: rotate(-22deg);
}

.uploaded-copy {
  min-width: 0;
  flex: 1;
}

.file-name {
  font-size: 31rpx;
  font-weight: 900;
}

.file-meta {
  margin-top: 13rpx;
  color: #526079;
  font-size: 28rpx;
}

.success-text {
  flex: 0 0 auto;
  color: #09aa5b;
  font-size: 28rpx;
  font-weight: 800;
}

.preview-title {
  margin-top: 24rpx;
  color: #0da95c;
  font-size: 28rpx;
  font-weight: 900;
}

.preview-row {
  position: relative;
  gap: 26rpx;
  margin-top: 20rpx;
  padding: 20rpx 54rpx 20rpx 20rpx;
  border: 2rpx solid #e7ebf0;
  border-radius: 16rpx;
  background: #fafcff;
}

.paper-thumb {
  position: relative;
  width: 116rpx;
  height: 116rpx;
  flex: 0 0 auto;
  border-radius: 10rpx;
  background: #fff;
  box-shadow: inset 0 0 0 2rpx #eef2f5;
}

.paper-line {
  width: 58rpx;
  height: 4rpx;
  margin: 12rpx auto 0;
  border-radius: 999rpx;
  background: #a8b1be;
}

.paper-line--wide {
  width: 72rpx;
  margin-top: 20rpx;
}

.paper-line--short {
  width: 44rpx;
}

.stamp {
  position: absolute;
  right: 16rpx;
  bottom: 16rpx;
  width: 30rpx;
  height: 30rpx;
  border: 4rpx solid #ef4444;
  border-radius: 50%;
}

.preview-copy {
  min-width: 0;
  flex: 1;
}

.preview-desc {
  margin-top: 18rpx;
  color: #526079;
  font-size: 27rpx;
}

.bottom-actions {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 5;
  gap: 34rpx;
  padding: 24rpx 34rpx calc(26rpx + env(safe-area-inset-bottom));
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(16rpx);
}

.action-button {
  height: 84rpx;
  flex: 1;
  border-radius: 14rpx;
  font-size: 32rpx;
}

.action-button--ghost {
  background: #fff;
}

@media (max-width: 370px) {
  .content {
    padding-right: 24rpx;
    padding-left: 24rpx;
  }

  .intro-card {
    padding-right: 26rpx;
    padding-left: 26rpx;
  }

  .type-card {
    align-items: flex-start;
    flex-wrap: wrap;
  }

  .type-badge {
    width: 100%;
    margin-left: 64rpx;
  }

  .bottom-actions {
    gap: 22rpx;
    padding-right: 24rpx;
    padding-left: 24rpx;
  }
}
</style>
