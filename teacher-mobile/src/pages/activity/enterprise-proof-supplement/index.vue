<script setup lang="ts">
import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobileNavbar from '../../../components/MobileNavbar.vue'
import MobileTabBar from '../../../components/MobileTabBar.vue'

const uploadMethods = [
  { title: '从手机上传', desc: '支持 PDF、图片、Word 文档', type: 'file' },
  { title: '拍照上传', desc: '适合纸质证明材料', type: 'camera' },
]

function goBack() {
  uni.navigateBack()
}

function showUploadFeedback(action: string) {
  uni.showToast({ title: `${action}为本地模拟入口，当前沿用已上传材料`, icon: 'none' })
}

function previewMaterial() {
  uni.showToast({ title: '材料预览为本地模拟，已展示证明文件摘要', icon: 'none' })
}

function returnToDraft() {
  uni.navigateTo({ url: '/pages/activity/enterprise-archive-edit/index' })
}

function confirmMaterial() {
  uni.navigateTo({ url: '/pages/activity/enterprise-supplement-submitted/index' })
}
</script>

<template>
  <view class="proof-supplement-page">
    <MobileNavbar title="补充材料" size="regular" @back="goBack" />
    <text class="page-subtitle">为这条档案补充证明材料</text>

    <view class="content">
      <MobileCard class="record-card">
        <view class="record-icon">
          <view class="plus-dot">+</view>
        </view>
        <view class="record-copy">
          <text class="record-title">山东某软件科技有限公司企业实践</text>
          <view class="tag-row">
            <text class="tag tag--green">企业实践</text>
            <text class="tag tag--green">行业实践</text>
            <text class="tag tag--gray">草稿</text>
          </view>
          <text class="record-desc">补充企业实践证明、企业鉴定表或单位盖章证明材料，便于后续核验。</text>
        </view>
      </MobileCard>

      <MobileCard class="method-card">
        <view class="section-title-row">
          <view class="accent-line"></view>
          <text class="section-title">上传方式</text>
        </view>
        <view class="method-box">
          <view v-for="item in uploadMethods" :key="item.title" class="method-row" @tap="showUploadFeedback(item.title)">
            <view class="method-icon" :class="`method-icon--${item.type}`"></view>
            <view class="method-copy">
              <text class="method-title">{{ item.title }}</text>
              <text class="method-desc">{{ item.desc }}</text>
            </view>
            <view class="chevron"></view>
          </view>
        </view>
      </MobileCard>

      <MobileCard class="uploaded-card">
        <view class="section-title-row">
          <view class="accent-line"></view>
          <text class="section-title">已上传材料</text>
        </view>
        <view class="uploaded-box">
          <view class="uploaded-row">
            <view class="pdf-icon"></view>
            <view class="uploaded-copy">
              <text class="file-name">企业实践证明.pdf</text>
              <text class="file-meta">PDF ｜ 2.4MB ｜ 上传成功</text>
            </view>
            <view class="check-dot"></view>
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
              <text class="preview-desc">点击查看预览</text>
            </view>
            <view class="chevron"></view>
          </view>
        </view>
      </MobileCard>

      <view class="warm-tip">
        <view class="shield-icon"></view>
        <view class="tip-copy">
          <text class="tip-title">温馨提示</text>
          <text class="tip-desc">上传的证明材料将随档案草稿一起提交核验，你也可以稍后继续补充更多材料。</text>
        </view>
        <view class="leaf-art"></view>
      </view>

      <view class="bottom-actions">
        <MobileActionButton class="action-button action-button--draft" variant="outline" @tap="returnToDraft">返回草稿</MobileActionButton>
        <MobileActionButton class="action-button" variant="primary" @tap="confirmMaterial">确定使用</MobileActionButton>
      </view>
    </view>

    <MobileTabBar active="assistant" />
  </view>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.proof-supplement-page {
  min-height: 100vh;
  padding-bottom: calc(320rpx + env(safe-area-inset-bottom));
  background:
    radial-gradient(circle at 10% 0%, rgba(224, 251, 238, 0.76), transparent 34%),
    linear-gradient(180deg, #fbfffd 0%, #ffffff 48%, #f4faf7 100%);
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
  padding: 28rpx 32rpx 0;
}

.record-card,
.tag-row,
.section-title-row,
.method-row,
.uploaded-row,
.preview-row,
.warm-tip,
.bottom-actions {
  display: flex;
  align-items: center;
}

.record-card {
  gap: 30rpx;
  padding: 36rpx 42rpx;
  border-radius: 24rpx;
}

.record-icon {
  position: relative;
  width: 104rpx;
  height: 104rpx;
  flex: 0 0 auto;
  border-radius: 16rpx;
  background: #e8f8ef;
}

.record-icon::before {
  position: absolute;
  left: 27rpx;
  top: 22rpx;
  width: 52rpx;
  height: 62rpx;
  border-radius: 7rpx;
  background: #18b96d;
  clip-path: polygon(0 0, 72% 0, 100% 28%, 100% 100%, 0 100%);
  content: '';
}

.record-icon::after {
  position: absolute;
  left: 38rpx;
  top: 45rpx;
  width: 26rpx;
  height: 6rpx;
  border-radius: 999rpx;
  background: #eafff2;
  box-shadow: 0 17rpx 0 #eafff2;
  content: '';
}

.plus-dot {
  position: absolute;
  right: -5rpx;
  bottom: 5rpx;
  z-index: 1;
  width: 44rpx;
  height: 44rpx;
  border-radius: 50%;
  background: #0cb95e;
  color: #fff;
  font-size: 38rpx;
  font-weight: 900;
  line-height: 42rpx;
  text-align: center;
}

.record-copy {
  min-width: 0;
  flex: 1;
}

.record-title,
.record-desc,
.section-title,
.method-title,
.method-desc,
.file-name,
.file-meta,
.preview-desc,
.tip-title,
.tip-desc {
  display: block;
}

.record-title {
  font-size: 34rpx;
  font-weight: 900;
  line-height: 1.28;
}

.tag-row {
  flex-wrap: wrap;
  gap: 14rpx;
  margin-top: 18rpx;
}

.tag {
  padding: 7rpx 18rpx;
  border-radius: 999rpx;
  font-size: 24rpx;
  font-weight: 800;
}

.tag--green {
  background: #e3f8eb;
  color: #0aa85b;
}

.tag--gray {
  background: #edf1f5;
  color: #4f5c72;
}

.record-desc {
  margin-top: 22rpx;
  color: #526079;
  font-size: 26rpx;
  line-height: 1.55;
}

.method-card,
.uploaded-card {
  padding: 32rpx;
  border-radius: 24rpx;
}

.section-title-row {
  gap: 18rpx;
}

.accent-line {
  width: 8rpx;
  height: 34rpx;
  border-radius: 999rpx;
  background: #13b96a;
}

.section-title {
  font-size: 38rpx;
  font-weight: 900;
}

.method-box,
.uploaded-box {
  margin-top: 20rpx;
  border: 2rpx solid #e0e5eb;
  border-radius: 16rpx;
  background: #fff;
}

.method-row {
  position: relative;
  gap: 34rpx;
  padding: 24rpx 54rpx 26rpx 28rpx;
}

.method-row + .method-row {
  border-top: 2rpx solid #edf1f4;
}

.method-icon {
  position: relative;
  width: 92rpx;
  height: 92rpx;
  flex: 0 0 auto;
  border-radius: 18rpx;
  background: #e7f8ef;
}

.method-icon--file::before {
  position: absolute;
  left: 30rpx;
  top: 22rpx;
  width: 36rpx;
  height: 48rpx;
  border: 6rpx solid #13b96a;
  border-radius: 5rpx;
  clip-path: polygon(0 0, 76% 0, 100% 25%, 100% 100%, 0 100%);
  content: '';
}

.method-icon--file::after {
  position: absolute;
  left: 44rpx;
  top: 45rpx;
  width: 14rpx;
  height: 14rpx;
  border-left: 5rpx solid #13b96a;
  border-top: 5rpx solid #13b96a;
  content: '';
  transform: rotate(45deg);
}

.method-icon--camera::before {
  position: absolute;
  left: 24rpx;
  top: 34rpx;
  width: 46rpx;
  height: 34rpx;
  border-radius: 7rpx;
  background: #13b96a;
  content: '';
}

.method-icon--camera::after {
  position: absolute;
  left: 38rpx;
  top: 41rpx;
  width: 16rpx;
  height: 16rpx;
  border: 5rpx solid #eafff2;
  border-radius: 50%;
  content: '';
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
  margin-top: 14rpx;
  color: #526079;
  font-size: 26rpx;
}

.chevron {
  position: absolute;
  right: 24rpx;
  top: 50%;
  width: 22rpx;
  height: 22rpx;
  border-top: 5rpx solid #6f7b90;
  border-right: 5rpx solid #6f7b90;
  transform: translateY(-50%) rotate(45deg);
}

.uploaded-box {
  padding: 20rpx 28rpx 24rpx;
}

.uploaded-row {
  gap: 28rpx;
  padding-bottom: 22rpx;
  border-bottom: 2rpx solid #edf1f4;
}

.pdf-icon {
  position: relative;
  width: 86rpx;
  height: 86rpx;
  flex: 0 0 auto;
  border-radius: 14rpx;
  background: #f5f7fb;
  box-shadow: inset 0 0 0 2rpx #e3e8ef;
}

.pdf-icon::before {
  position: absolute;
  left: 23rpx;
  top: 27rpx;
  width: 40rpx;
  height: 28rpx;
  border: 5rpx solid #ee2f34;
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
  font-size: 26rpx;
}

.check-dot {
  position: relative;
  width: 34rpx;
  height: 34rpx;
  flex: 0 0 auto;
  border-radius: 50%;
  background: #14b96a;
}

.check-dot::before {
  position: absolute;
  left: 9rpx;
  top: 10rpx;
  width: 14rpx;
  height: 8rpx;
  border-bottom: 5rpx solid #fff;
  border-left: 5rpx solid #fff;
  content: '';
  transform: rotate(-45deg);
}

.preview-title {
  margin-top: 22rpx;
  color: #0da95c;
  font-size: 28rpx;
  font-weight: 900;
}

.preview-row {
  position: relative;
  gap: 26rpx;
  margin-top: 18rpx;
  padding: 18rpx 54rpx 18rpx 18rpx;
  border: 2rpx solid #e7ebf0;
  border-radius: 16rpx;
  background: #fafcff;
}

.paper-thumb {
  position: relative;
  width: 112rpx;
  height: 112rpx;
  flex: 0 0 auto;
  border-radius: 10rpx;
  background: #fff;
  box-shadow: inset 0 0 0 2rpx #eef2f5;
}

.paper-line {
  width: 56rpx;
  height: 4rpx;
  margin: 12rpx auto 0;
  border-radius: 999rpx;
  background: #a8b1be;
}

.paper-line--wide {
  width: 70rpx;
  margin-top: 20rpx;
}

.paper-line--short {
  width: 42rpx;
}

.stamp {
  position: absolute;
  right: 15rpx;
  bottom: 15rpx;
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

.warm-tip {
  position: relative;
  gap: 24rpx;
  padding: 28rpx 30rpx;
  overflow: hidden;
  border: 2rpx solid rgba(19, 185, 106, 0.22);
  border-radius: 18rpx;
  background: linear-gradient(100deg, #f7fffb, #ffffff);
}

.shield-icon {
  position: relative;
  width: 66rpx;
  height: 72rpx;
  flex: 0 0 auto;
  background: #13b96a;
  clip-path: polygon(50% 0, 100% 18%, 100% 58%, 50% 100%, 0 58%, 0 18%);
}

.shield-icon::before {
  position: absolute;
  left: 25rpx;
  top: 28rpx;
  width: 14rpx;
  height: 14rpx;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 22rpx 0 -4rpx #fff;
  content: '';
}

.tip-copy {
  position: relative;
  z-index: 1;
  min-width: 0;
  flex: 1;
}

.tip-title {
  font-size: 31rpx;
  font-weight: 900;
}

.tip-desc {
  margin-top: 16rpx;
  color: #526079;
  font-size: 26rpx;
  line-height: 1.65;
}

.leaf-art {
  position: absolute;
  right: 28rpx;
  bottom: 10rpx;
  width: 92rpx;
  height: 78rpx;
  opacity: 0.28;
}

.leaf-art::before,
.leaf-art::after {
  position: absolute;
  border-radius: 50% 50% 50% 0;
  background: #13b96a;
  content: '';
}

.leaf-art::before {
  right: 20rpx;
  bottom: 18rpx;
  width: 32rpx;
  height: 52rpx;
  transform: rotate(34deg);
}

.leaf-art::after {
  right: 54rpx;
  bottom: 8rpx;
  width: 28rpx;
  height: 44rpx;
  transform: rotate(-44deg);
}

.bottom-actions {
  gap: 34rpx;
  margin-top: 6rpx;
}

.action-button {
  height: 76rpx;
  flex: 1;
  border-radius: 14rpx;
  font-size: 31rpx;
}

.action-button--draft {
  background: #fff;
}

@media (max-width: 370px) {
  .content {
    padding-right: 24rpx;
    padding-left: 24rpx;
  }

  .record-card {
    padding-right: 28rpx;
    padding-left: 28rpx;
  }

  .bottom-actions {
    gap: 22rpx;
  }
}
</style>
