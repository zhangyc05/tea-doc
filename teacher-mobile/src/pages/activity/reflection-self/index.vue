<script setup lang="ts">
import { computed } from 'vue'
import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobileNavbar from '../../../components/MobileNavbar.vue'
import MobileTabBar from '../../../components/MobileTabBar.vue'
import { addReflectionMaterial, getMobileReflectionState, selectReflectionCourse, startReflectionAiSession } from '../../../domain/reflection'

const reflectionState = getMobileReflectionState()
const materialCount = computed(() => reflectionState.evidence.filter((item) => item.status === 'uploaded' || item.status === 'recorded').length)

const scopeCards = [
  { title: '单次课', icon: 'video', active: false },
  { title: '课程阶段', icon: 'calendar', active: false },
  { title: '学期课程', icon: 'cap', active: false },
  { title: '自主反思', icon: 'pen', active: true },
]

const supplementItems = [
  { title: '拍照上传', desc: '拍课堂板书、作业等', icon: 'camera' },
  { title: '录制课堂音频', desc: '课堂过程音频记录', icon: 'mic' },
  { title: '上传文件', desc: '文档、课件等文件', icon: 'cloud' },
]

function goBack() {
  uni.navigateBack()
}

function goAiChat() {
  startReflectionAiSession()
  uni.navigateTo({ url: '/pages/activity/reflection-ai-chat/index' })
}

function addMaterial(title: string) {
  addReflectionMaterial(title, title.includes('音频') ? 'audio' : 'material')
}

function changeCourse() {
  selectReflectionCourse('智能制造基础')
}
</script>

<template>
  <view class="reflection-self-page">
    <view class="hero">
      <MobileNavbar title="教学反思" size="compact" @back="goBack" />
      <text class="hero__subtitle">先选择反思范围，AI 会帮您整理依据并引导反思</text>
    </view>

    <view class="content">
      <MobileCard class="range-card">
        <view class="block-title">
          <view class="block-title__bar"></view>
          <text>反思范围</text>
        </view>
        <view class="scope-cards">
          <view v-for="item in scopeCards" :key="item.title" class="scope-card" :class="{ 'scope-card--active': item.active }">
            <view class="scope-icon" :class="`scope-icon--${item.icon}`"></view>
            <text>{{ item.title }}</text>
            <view v-if="item.active" class="corner-check"></view>
          </view>
        </view>
        <view class="scope-tip">
          <view class="spark-icon"></view>
          <text>不限定课次或报告，可以上传资料，也可以直接和 AI 聊聊</text>
        </view>
      </MobileCard>

      <MobileCard class="start-card">
        <view class="block-title">
          <view class="block-title__bar"></view>
          <text>你想怎么开始</text>
        </view>
        <view class="start-options">
          <view class="start-option start-option--chat">
            <view class="start-icon start-icon--chat"></view>
            <text class="start-title">直接和 AI 聊聊</text>
            <text class="start-desc">不用准备材料，可以按住说话，也可以输入一句想法，AI 会继续追问并帮您整理反思。</text>
            <view class="start-foot">
              <view class="wave-icon"></view>
              <text>支持语音或文字输入</text>
            </view>
          </view>
          <view class="start-option start-option--upload">
            <view class="start-icon start-icon--folder"></view>
            <text class="start-title">上传教学资料</text>
            <text class="start-desc">支持教案、课件、课堂记录、学生作业、图片等材料，AI 会先帮您提取反思线索。</text>
            <view class="start-foot start-foot--blue">
              <view class="cloud-small"></view>
              <text>多种格式支持</text>
            </view>
          </view>
        </view>
      </MobileCard>

      <MobileCard class="course-card">
        <view class="course-head">
          <text class="course-head__title">关联课程</text>
          <text class="optional">(可选)</text>
          <view class="info-icon">i</view>
        </view>
        <view class="course-box">
          <view class="book-cover"></view>
          <view class="course-copy">
            <text class="course-title">《智能制造基础》</text>
            <text class="course-meta">智能制造 2301 班</text>
            <text class="course-meta">2025-2026 学年第 2 学期</text>
            <view class="course-line"></view>
            <text class="course-note">不确定也可以先跳过，AI 会根据内容帮您识别。</text>
          </view>
          <MobileActionButton class="change-button" variant="outline" @tap="changeCourse">更换</MobileActionButton>
        </view>
      </MobileCard>

      <MobileCard class="supplement-card">
        <view class="block-title">
          <view class="block-title__bar"></view>
          <text>还可以补充</text>
        </view>
        <view class="supplement-grid">
          <view v-for="item in supplementItems" :key="item.title" class="supplement-item" @tap="addMaterial(item.title)">
            <view class="supplement-icon" :class="`supplement-icon--${item.icon}`"></view>
            <view>
              <text class="supplement-title">{{ item.title }}</text>
              <text class="supplement-desc">{{ item.desc }}</text>
            </view>
          </view>
        </view>
        <text class="supplement-note">补充后，AI 会更好地帮助您反思。</text>
      </MobileCard>
    </view>

    <view class="bottom-actions">
      <view class="material-icon"></view>
      <view class="bottom-copy">
        <text class="bottom-title">已添加 <text>{{ materialCount }}</text> 份材料</text>
        <text class="bottom-desc">{{ reflectionState.operationMessage || '没有材料也可以直接开始' }}</text>
      </view>
      <MobileActionButton class="start-button" variant="primary" @tap="goAiChat">开始 AI 对话</MobileActionButton>
    </view>

    <MobileTabBar active="activity" />
  </view>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.reflection-self-page {
  min-height: 100vh;
  padding-bottom: calc(292rpx + env(safe-area-inset-bottom));
  background: linear-gradient(180deg, #ffffff 0%, #f8fbff 48%, #f5f9ff 100%);
  color: $teacher-mobile-text-primary;
}

.hero {
  padding: calc(var(--status-bar-height) + 14rpx) 28rpx 24rpx;
}

.hero__subtitle {
  display: block;
  margin-top: 8rpx;
  color: #6b7280;
  font-size: 27rpx;
  font-weight: 500;
  line-height: 1.45;
  text-align: center;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 18rpx;
  padding: 0 28rpx;
}

.range-card,
.start-card,
.course-card,
.supplement-card {
  padding: 28rpx;
}

.block-title,
.scope-cards,
.scope-card,
.scope-tip,
.start-options,
.start-foot,
.course-head,
.course-box,
.supplement-grid,
.supplement-item,
.bottom-actions {
  display: flex;
  align-items: center;
}

.block-title {
  gap: 14rpx;
  color: #10172d;
  font-size: 34rpx;
  font-weight: 900;
}

.block-title__bar {
  width: 7rpx;
  height: 32rpx;
  border-radius: 999rpx;
  background: $teacher-mobile-primary;
}

.scope-cards {
  gap: 18rpx;
  margin-top: 26rpx;
}

.scope-card {
  position: relative;
  height: 142rpx;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  gap: 12rpx;
  border: 1rpx solid #dfe6f0;
  border-radius: 14rpx;
  background: #fff;
  color: #10172d;
  font-size: 27rpx;
  font-weight: 900;
}

.scope-card--active {
  border: 2rpx solid $teacher-mobile-primary;
  background: #f5fff9;
}

.scope-icon,
.start-icon,
.supplement-icon,
.material-icon {
  position: relative;
  flex: 0 0 auto;
}

.scope-icon {
  width: 54rpx;
  height: 54rpx;
  border-radius: 14rpx;
}

.scope-icon::before,
.scope-icon::after,
.start-icon::before,
.start-icon::after,
.supplement-icon::before,
.supplement-icon::after,
.material-icon::before,
.material-icon::after,
.spark-icon::before,
.wave-icon::before,
.cloud-small::before,
.book-cover::before {
  position: absolute;
  content: '';
}

.scope-icon--video {
  background: #edf3ff;
}

.scope-icon--video::before {
  inset: 14rpx 18rpx;
  background: #6289f7;
  clip-path: polygon(0 0, 100% 50%, 0 100%);
}

.scope-icon--calendar {
  background: #f0eaff;
}

.scope-icon--calendar::before {
  inset: 12rpx;
  border-radius: 7rpx;
  background: #8c6df2;
}

.scope-icon--cap {
  background: #eef4ff;
}

.scope-icon--cap::before {
  inset: 13rpx 8rpx;
  background: #5f8df7;
  clip-path: polygon(50% 0, 100% 30%, 50% 60%, 0 30%);
}

.scope-icon--pen {
  background: $teacher-mobile-primary;
}

.scope-icon--pen::before {
  top: 16rpx;
  left: 17rpx;
  width: 24rpx;
  height: 8rpx;
  border-radius: 999rpx;
  background: #fff;
  transform: rotate(-42deg);
}

.corner-check {
  position: absolute;
  top: -2rpx;
  right: -2rpx;
  width: 38rpx;
  height: 38rpx;
  border-radius: 0 12rpx 0 18rpx;
  background: $teacher-mobile-primary;
}

.corner-check::before {
  position: absolute;
  top: 10rpx;
  left: 10rpx;
  width: 14rpx;
  height: 8rpx;
  border-bottom: 4rpx solid #fff;
  border-left: 4rpx solid #fff;
  content: '';
  transform: rotate(-45deg);
}

.scope-tip {
  gap: 14rpx;
  margin-top: 20rpx;
  padding: 18rpx;
  border-radius: 12rpx;
  background: #effcf4;
  color: #315d4a;
  font-size: 26rpx;
  line-height: 1.35;
}

.spark-icon {
  position: relative;
  width: 28rpx;
  height: 28rpx;
  flex: 0 0 auto;
  color: $teacher-mobile-primary;
}

.spark-icon::before {
  inset: 5rpx;
  background: currentColor;
  clip-path: polygon(50% 0, 62% 36%, 100% 50%, 62% 64%, 50% 100%, 38% 64%, 0 50%, 38% 36%);
}

.start-options {
  align-items: stretch;
  gap: 20rpx;
  margin-top: 24rpx;
}

.start-option {
  flex: 1;
  min-height: 334rpx;
  padding: 34rpx;
  border: 1rpx solid #dfe6f0;
  border-radius: 20rpx;
}

.start-option--chat {
  border-color: rgba(14, 193, 101, 0.24);
  background: linear-gradient(135deg, #f2fff7, #ffffff);
}

.start-option--upload {
  border-color: #cfe0ff;
  background: linear-gradient(135deg, #f6faff, #ffffff);
}

.start-icon {
  width: 72rpx;
  height: 72rpx;
  border-radius: 18rpx;
}

.start-icon--chat {
  background: $teacher-mobile-primary;
}

.start-icon--chat::before {
  inset: 21rpx 14rpx;
  border-radius: 999rpx;
  background: #fff;
  box-shadow: 18rpx 0 0 #fff, 36rpx 0 0 #fff;
}

.start-icon--folder {
  background: #6d93f7;
}

.start-icon--folder::before {
  inset: 22rpx 14rpx 16rpx;
  border-radius: 7rpx;
  background: #fff;
  clip-path: polygon(0 20%, 42% 20%, 48% 0, 100% 0, 100% 100%, 0 100%);
}

.start-title {
  display: block;
  margin-top: 34rpx;
  color: #10172d;
  font-size: 34rpx;
  font-weight: 900;
  line-height: 1.25;
}

.start-desc {
  display: block;
  margin-top: 22rpx;
  color: #4f5b6f;
  font-size: 27rpx;
  line-height: 1.65;
}

.start-foot {
  gap: 10rpx;
  margin-top: 34rpx;
  color: $teacher-mobile-primary-dark;
  font-size: 24rpx;
  font-weight: 800;
}

.start-foot--blue {
  color: #4b7fea;
}

.wave-icon,
.cloud-small {
  position: relative;
  width: 28rpx;
  height: 28rpx;
}

.wave-icon::before {
  bottom: 4rpx;
  left: 4rpx;
  width: 5rpx;
  height: 15rpx;
  border-radius: 999rpx;
  background: currentColor;
  box-shadow: 9rpx -7rpx 0 currentColor, 18rpx 3rpx 0 currentColor;
}

.cloud-small::before {
  inset: 8rpx 4rpx 6rpx;
  border-radius: 14rpx;
  background: currentColor;
}

.course-head {
  gap: 10rpx;
}

.course-head__title {
  color: #10172d;
  font-size: 32rpx;
  font-weight: 900;
}

.optional {
  color: #3f6fe7;
  font-size: 26rpx;
  font-weight: 800;
}

.info-icon {
  display: flex;
  width: 28rpx;
  height: 28rpx;
  align-items: center;
  justify-content: center;
  border: 3rpx solid #a7afbd;
  border-radius: 50%;
  color: #8c95a4;
  font-size: 18rpx;
  font-weight: 900;
}

.course-box {
  gap: 28rpx;
  margin-top: 22rpx;
  padding: 20rpx;
  border: 1rpx solid rgba(14, 193, 101, 0.28);
  border-radius: 18rpx;
  background: linear-gradient(135deg, #f3fff8, #ffffff);
}

.book-cover {
  position: relative;
  width: 96rpx;
  height: 128rpx;
  flex: 0 0 auto;
  border-radius: 8rpx;
  background: linear-gradient(155deg, #f2f9ff, #78b4d2 58%, #12625b);
  box-shadow: 0 12rpx 22rpx rgba(44, 83, 108, 0.18);
}

.book-cover::before {
  inset: 14rpx;
  border-radius: 4rpx;
  background: rgba(255, 255, 255, 0.8);
}

.course-copy {
  min-width: 0;
  flex: 1;
}

.course-title,
.course-meta,
.course-note,
.supplement-title,
.supplement-desc,
.bottom-title,
.bottom-desc {
  display: block;
}

.course-title {
  color: #10172d;
  font-size: 31rpx;
  font-weight: 900;
  line-height: 1.35;
}

.course-meta,
.course-note {
  margin-top: 10rpx;
  color: #52607a;
  font-size: 25rpx;
  line-height: 1.35;
}

.course-line {
  height: 1rpx;
  margin-top: 20rpx;
  background: #dbe3ec;
}

.change-button {
  width: 110rpx;
  height: 58rpx;
  flex: 0 0 auto;
  font-size: 27rpx;
}

.supplement-grid {
  gap: 14rpx;
  margin-top: 24rpx;
}

.supplement-item {
  min-width: 0;
  flex: 1;
  gap: 16rpx;
  padding: 18rpx 14rpx;
  border: 1rpx solid #dfe6f0;
  border-radius: 14rpx;
  background: #fff;
}

.supplement-icon {
  width: 54rpx;
  height: 54rpx;
  border-radius: 14rpx;
}

.supplement-icon--camera {
  background: #e9fbf1;
  color: $teacher-mobile-primary;
}

.supplement-icon--camera::before {
  inset: 16rpx 11rpx 12rpx;
  border-radius: 7rpx;
  background: currentColor;
}

.supplement-icon--camera::after {
  top: 23rpx;
  left: 23rpx;
  width: 10rpx;
  height: 10rpx;
  border-radius: 50%;
  background: #fff;
}

.supplement-icon--mic {
  background: #fff3e8;
  color: #ff7a18;
}

.supplement-icon--mic::before {
  top: 10rpx;
  left: 18rpx;
  width: 18rpx;
  height: 28rpx;
  border-radius: 999rpx;
  background: currentColor;
}

.supplement-icon--cloud {
  background: #f0ebff;
  color: #7a60ef;
}

.supplement-icon--cloud::before {
  inset: 18rpx 10rpx 14rpx;
  border-radius: 18rpx;
  background: currentColor;
}

.supplement-title {
  color: #10172d;
  font-size: 26rpx;
  font-weight: 900;
  line-height: 1.25;
}

.supplement-desc {
  margin-top: 5rpx;
  color: #667287;
  font-size: 21rpx;
  line-height: 1.3;
}

.supplement-note {
  display: block;
  margin-top: 24rpx;
  color: #52607a;
  font-size: 25rpx;
}

.bottom-actions {
  position: fixed;
  right: 24rpx;
  bottom: calc(142rpx + env(safe-area-inset-bottom));
  left: 24rpx;
  z-index: 48;
  gap: 18rpx;
  padding: 20rpx 22rpx;
  border-radius: 22rpx;
  background: rgba(255, 255, 255, 0.94);
  box-shadow: 0 14rpx 36rpx rgba(35, 51, 87, 0.1);
  backdrop-filter: blur(12rpx);
}

.material-icon {
  width: 72rpx;
  height: 72rpx;
  border: 3rpx solid #d5dde8;
  border-radius: 50%;
  color: $teacher-mobile-primary-dark;
}

.material-icon::before {
  inset: 24rpx 17rpx 16rpx;
  border-radius: 5rpx;
  background: currentColor;
}

.material-icon::after {
  top: 20rpx;
  left: 18rpx;
  width: 22rpx;
  height: 8rpx;
  border-radius: 5rpx 5rpx 0 0;
  background: currentColor;
}

.bottom-copy {
  min-width: 0;
  flex: 1;
}

.bottom-title {
  color: $teacher-mobile-primary-dark;
  font-size: 29rpx;
  font-weight: 900;
  line-height: 1.25;
}

.bottom-title text {
  color: $teacher-mobile-primary;
}

.bottom-desc {
  margin-top: 5rpx;
  color: #52607a;
  font-size: 23rpx;
}

.start-button {
  width: 278rpx;
  height: 72rpx;
  flex: 0 0 auto;
  border-radius: 18rpx;
  font-size: 31rpx;
}

@media (max-width: 374px) {
  .hero,
  .content {
    padding-right: 18rpx;
    padding-left: 18rpx;
  }

  .range-card,
  .start-card,
  .course-card,
  .supplement-card {
    padding: 22rpx;
  }

  .scope-cards,
  .start-options,
  .supplement-grid {
    gap: 10rpx;
  }

  .scope-card {
    height: 112rpx;
    font-size: 22rpx;
  }

  .scope-icon {
    width: 42rpx;
    height: 42rpx;
  }

  .start-option {
    min-height: 278rpx;
    padding: 24rpx;
  }

  .start-title {
    font-size: 28rpx;
  }

  .start-desc {
    font-size: 22rpx;
  }

  .course-box {
    gap: 16rpx;
    padding: 16rpx;
  }

  .book-cover {
    width: 72rpx;
    height: 100rpx;
  }

  .change-button {
    width: 86rpx;
    font-size: 24rpx;
  }

  .supplement-item {
    gap: 8rpx;
    padding: 14rpx 8rpx;
  }

  .supplement-icon {
    width: 42rpx;
    height: 42rpx;
  }

  .supplement-title {
    font-size: 22rpx;
  }

  .supplement-desc {
    font-size: 18rpx;
  }

  .bottom-actions {
    right: 10rpx;
    left: 10rpx;
    gap: 10rpx;
    padding: 16rpx 14rpx;
  }

  .material-icon {
    width: 58rpx;
    height: 58rpx;
  }

  .bottom-title {
    font-size: 25rpx;
  }

  .bottom-desc {
    font-size: 20rpx;
  }

  .start-button {
    width: 190rpx;
    height: 62rpx;
    font-size: 25rpx;
  }
}
</style>
