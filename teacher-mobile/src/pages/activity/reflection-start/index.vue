<script setup lang="ts">
import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobileNavbar from '../../../components/MobileNavbar.vue'
import MobileTabBar from '../../../components/MobileTabBar.vue'
import { startReflection, type ReflectionStartMethod } from '../../../domain/reflection'

const reportStarts = [
  {
    icon: 'video',
    title: '课堂分析报告',
    desc: '来自课堂视频或语音解析，可查看课堂互动、节奏与讲授情况',
    badge: '已找到 1 份可用报告',
    tone: 'purple',
  },
  {
    icon: 'chart',
    title: '成绩分析报告',
    desc: '来自学生成绩数据，可查看知识点掌握情况与班级差异',
    badge: '本学期已生成 1 份',
    tone: 'blue',
  },
  {
    icon: 'review',
    title: '评价分析报告',
    desc: '来自学生评教、同行评价或督导评价，可作为改进依据',
    badge: '已汇总最近评价结果',
    tone: 'orange',
  },
]

const manualStarts = [
  {
    icon: 'mic',
    title: '录制课堂音频',
    desc: '用手机录一段课堂语音，AI 先生成课堂分析，再引导您开始反思',
  },
  {
    icon: 'upload',
    title: '上传教学资料',
    desc: '支持教案、课件、课堂记录、学生作业等材料，AI 会先整理重点',
  },
  {
    icon: 'chat',
    title: '直接与 AI 对话',
    desc: '不上传材料，也可以先说说这节课的情况，再逐步整理反思',
  },
]

function goBack() {
  uni.navigateBack()
}

function goCourseSelect(method: ReflectionStartMethod) {
  startReflection(method)
  if (method === 'chat') {
    uni.navigateTo({ url: '/pages/activity/reflection-ai-chat/index' })
    return
  }
  uni.navigateTo({ url: '/pages/activity/reflection-course/index' })
}

function continueReflectionDraft() {
  uni.navigateTo({ url: '/pages/activity/reflection-draft/index' })
}

function getManualStartMethod(icon: string): ReflectionStartMethod {
  if (icon === 'mic') return 'audio'
  if (icon === 'upload') return 'material'
  return 'chat'
}
</script>

<template>
  <view class="reflection-start-page">
    <view class="hero">
      <MobileNavbar title="教学反思" size="compact" @back="goBack" />
      <text class="hero__subtitle">选择一个开始方式，AI 会帮您生成反思提纲</text>
    </view>

    <view class="content">
      <MobileCard class="section-card report-card">
        <view class="section-head">
          <text class="section-title">可基于已有报告开始</text>
          <view class="ready-note">
            <text>系统已整理可用依据</text>
            <view class="ready-note__icon">i</view>
          </view>
        </view>

        <view v-for="item in reportStarts" :key="item.title" class="start-row">
          <view class="start-icon" :class="[`start-icon--${item.icon}`, `start-icon--${item.tone}`]"></view>
          <view class="start-row__body">
            <text class="start-row__title">{{ item.title }}</text>
            <text class="start-row__desc">{{ item.desc }}</text>
            <view class="info-badge" :class="`info-badge--${item.tone}`">
              <view class="info-badge__dot"></view>
              <text>{{ item.badge }}</text>
            </view>
          </view>
          <MobileActionButton class="row-action" variant="outline" @tap="goCourseSelect('report')">选择</MobileActionButton>
        </view>
      </MobileCard>

      <MobileCard class="section-card manual-card">
        <text class="section-title">没有现成报告，也可以这样开始</text>
        <view v-for="item in manualStarts" :key="item.title" class="start-row start-row--manual">
          <view class="start-icon" :class="`start-icon--${item.icon}`"></view>
          <view class="start-row__body">
            <text class="start-row__title">{{ item.title }}</text>
            <text class="start-row__desc">{{ item.desc }}</text>
          </view>
          <MobileActionButton class="row-action" variant="outline" @tap="goCourseSelect(getManualStartMethod(item.icon))">开始</MobileActionButton>
        </view>
      </MobileCard>

      <MobileCard class="draft-card">
        <text class="section-title">最近草稿</text>
        <view class="draft-row">
          <view class="draft-icon"></view>
          <view class="draft-row__body">
            <text class="draft-title">《智能制造基础》第 5 次课后反思</text>
            <view class="draft-meta">
              <text class="draft-state">已保存草稿</text>
              <text>今天 09:20</text>
            </view>
            <text class="draft-desc">已整理课堂问题与改进思路，可继续完善</text>
          </view>
          <MobileActionButton class="draft-action" variant="outline" @tap="continueReflectionDraft">继续完善</MobileActionButton>
        </view>
      </MobileCard>
    </view>

    <MobileTabBar active="activity" />
  </view>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.reflection-start-page {
  min-height: 100vh;
  padding-bottom: calc(190rpx + env(safe-area-inset-bottom));
  background:
    radial-gradient(circle at 18% 0%, rgba(234, 224, 255, 0.52), transparent 32%),
    linear-gradient(180deg, #fbfffd 0%, #f8fbff 48%, #f5f9ff 100%);
  color: $teacher-mobile-text-primary;
}

.hero {
  min-height: 210rpx;
  padding: calc(var(--status-bar-height) + 14rpx) 28rpx 28rpx;
}

.hero__subtitle {
  display: block;
  margin-top: 8rpx;
  color: #53617b;
  font-size: 27rpx;
  font-weight: 600;
  line-height: 1.45;
  text-align: center;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
  padding: 0 24rpx;
}

.section-card {
  padding: 28rpx;
  border-radius: 28rpx;
}

.section-head,
.ready-note,
.start-row,
.info-badge,
.draft-row,
.draft-meta {
  display: flex;
  align-items: center;
}

.section-head {
  justify-content: space-between;
  gap: 16rpx;
  margin-bottom: 20rpx;
}

.section-title {
  display: block;
  color: #10172d;
  font-size: 38rpx;
  font-weight: 900;
  line-height: 1.25;
}

.ready-note {
  gap: 10rpx;
  color: #34415d;
  font-size: 24rpx;
  font-weight: 700;
  white-space: nowrap;
}

.ready-note__icon {
  display: flex;
  width: 28rpx;
  height: 28rpx;
  align-items: center;
  justify-content: center;
  border: 4rpx solid $teacher-mobile-primary;
  border-radius: 50%;
  color: $teacher-mobile-primary-dark;
  font-size: 18rpx;
  font-weight: 900;
  line-height: 1;
}

.start-row {
  gap: 28rpx;
  padding: 26rpx 0;
  border-bottom: 1rpx solid #e1e7f0;
}

.start-row:first-of-type {
  padding-top: 0;
}

.manual-card .start-row:first-of-type {
  margin-top: 18rpx;
}

.start-row:last-child {
  border-bottom: 0;
  padding-bottom: 0;
}

.start-icon {
  position: relative;
  width: 136rpx;
  height: 136rpx;
  flex: 0 0 auto;
  border-radius: 24rpx;
  background: #f0f5ff;
}

.start-icon::before,
.start-icon::after {
  position: absolute;
  content: '';
}

.start-icon--purple {
  background: linear-gradient(135deg, #f4ecff, #f9f6ff);
  color: #8d59f4;
}

.start-icon--blue,
.start-icon--chart,
.start-icon--upload {
  background: linear-gradient(135deg, #eef6ff, #f8fbff);
  color: #4a92ee;
}

.start-icon--orange {
  background: linear-gradient(135deg, #fff2e5, #fffaf3);
  color: #ff7a18;
}

.start-icon--mic {
  background: linear-gradient(135deg, #eafbf2, #f8fffb);
  color: $teacher-mobile-primary;
}

.start-icon--chat {
  background: linear-gradient(135deg, #f1e9ff, #fbf7ff);
  color: #8d59f4;
}

.start-icon--video::before {
  top: 48rpx;
  left: 40rpx;
  width: 68rpx;
  height: 44rpx;
  border-radius: 10rpx;
  background: currentColor;
}

.start-icon--video::after {
  top: 52rpx;
  right: 24rpx;
  width: 26rpx;
  height: 36rpx;
  background: currentColor;
  clip-path: polygon(0 20%, 100% 0, 100% 100%, 0 80%);
}

.start-icon--chart::before {
  bottom: 38rpx;
  left: 44rpx;
  width: 16rpx;
  height: 46rpx;
  border-radius: 8rpx 8rpx 2rpx 2rpx;
  background: currentColor;
  box-shadow: 26rpx -28rpx 0 currentColor, 52rpx -8rpx 0 currentColor;
}

.start-icon--chart::after {
  bottom: 32rpx;
  left: 40rpx;
  width: 70rpx;
  height: 6rpx;
  border-radius: 6rpx;
  background: currentColor;
}

.start-icon--review::before {
  top: 46rpx;
  left: 36rpx;
  width: 66rpx;
  height: 48rpx;
  border-radius: 10rpx;
  background: currentColor;
}

.start-icon--review::after {
  right: 22rpx;
  bottom: 34rpx;
  width: 36rpx;
  height: 36rpx;
  background: currentColor;
  clip-path: polygon(50% 0, 62% 34%, 100% 36%, 70% 58%, 80% 96%, 50% 74%, 20% 96%, 30% 58%, 0 36%, 38% 34%);
}

.start-icon--mic::before {
  top: 34rpx;
  left: 50rpx;
  width: 36rpx;
  height: 62rpx;
  border-radius: 20rpx;
  background: currentColor;
}

.start-icon--mic::after {
  bottom: 28rpx;
  left: 38rpx;
  width: 60rpx;
  height: 44rpx;
  border: 8rpx solid currentColor;
  border-top: 0;
  border-radius: 0 0 36rpx 36rpx;
}

.start-icon--upload::before {
  top: 45rpx;
  left: 34rpx;
  width: 70rpx;
  height: 50rpx;
  border-radius: 8rpx;
  background: currentColor;
}

.start-icon--upload::after {
  top: 58rpx;
  left: 60rpx;
  width: 18rpx;
  height: 28rpx;
  background: #fff;
  clip-path: polygon(50% 0, 100% 44%, 68% 44%, 68% 100%, 32% 100%, 32% 44%, 0 44%);
}

.start-icon--chat::before {
  top: 38rpx;
  left: 37rpx;
  width: 66rpx;
  height: 60rpx;
  border-radius: 50%;
  background: currentColor;
}

.start-icon--chat::after {
  top: 60rpx;
  left: 56rpx;
  width: 9rpx;
  height: 9rpx;
  border-radius: 50%;
  background: #fff;
  box-shadow: 20rpx 0 0 #fff;
}

.start-row__body {
  min-width: 0;
  flex: 1;
}

.start-row__title {
  display: block;
  color: #10172d;
  font-size: 31rpx;
  font-weight: 900;
  line-height: 1.28;
}

.start-row__desc {
  display: block;
  margin-top: 12rpx;
  color: #4c5a75;
  font-size: 26rpx;
  line-height: 1.48;
}

.info-badge {
  width: fit-content;
  gap: 12rpx;
  margin-top: 14rpx;
  padding: 8rpx 16rpx;
  border-radius: 14rpx;
  background: #f0f4fb;
  color: #34415d;
  font-size: 24rpx;
  font-weight: 700;
}

.info-badge__dot {
  width: 11rpx;
  height: 11rpx;
  border-radius: 50%;
  background: currentColor;
}

.info-badge--purple {
  color: $teacher-mobile-primary-dark;
}

.info-badge--blue {
  color: #2379d8;
}

.info-badge--orange {
  color: #e56d0b;
}

.row-action {
  width: 142rpx;
  height: 58rpx;
  flex: 0 0 auto;
  font-size: 29rpx;
}

.draft-card {
  margin-bottom: 10rpx;
}

.draft-row {
  gap: 26rpx;
  margin-top: 24rpx;
}

.draft-icon {
  position: relative;
  width: 94rpx;
  height: 94rpx;
  flex: 0 0 auto;
  border-radius: 18rpx;
  background: linear-gradient(135deg, #f1e9ff, #fbf7ff);
  color: #8d59f4;
}

.draft-icon::before {
  position: absolute;
  top: 24rpx;
  left: 28rpx;
  width: 36rpx;
  height: 46rpx;
  border-radius: 6rpx;
  background: currentColor;
  content: '';
}

.draft-icon::after {
  position: absolute;
  right: 20rpx;
  bottom: 18rpx;
  width: 24rpx;
  height: 24rpx;
  border: 5rpx solid currentColor;
  border-left-color: transparent;
  border-radius: 50%;
  content: '';
}

.draft-row__body {
  min-width: 0;
  flex: 1;
}

.draft-title {
  display: block;
  color: #10172d;
  font-size: 28rpx;
  font-weight: 900;
  line-height: 1.35;
}

.draft-meta {
  gap: 20rpx;
  margin-top: 10rpx;
  color: #5f6c86;
  font-size: 25rpx;
  line-height: 1.35;
}

.draft-state {
  padding: 4rpx 14rpx;
  border-radius: 12rpx;
  background: #e9fbf1;
  color: $teacher-mobile-primary-dark;
  font-weight: 800;
}

.draft-desc {
  display: block;
  margin-top: 10rpx;
  color: #4d5a74;
  font-size: 25rpx;
  line-height: 1.42;
}

.draft-action {
  width: 160rpx;
  height: 58rpx;
  flex: 0 0 auto;
  font-size: 27rpx;
}

@media (max-width: 374px) {
  .hero,
  .content {
    padding-right: 18rpx;
    padding-left: 18rpx;
  }

  .section-card {
    padding: 24rpx;
  }

  .section-head {
    align-items: flex-start;
    flex-direction: column;
  }

  .start-row {
    gap: 18rpx;
  }

  .start-icon {
    width: 104rpx;
    height: 104rpx;
  }

  .start-icon--video::before {
    top: 37rpx;
    left: 29rpx;
  }

  .start-icon--chart::before {
    bottom: 30rpx;
    left: 28rpx;
  }

  .start-icon--review::before,
  .start-icon--upload::before {
    left: 24rpx;
  }

  .start-icon--mic::before {
    left: 36rpx;
  }

  .start-icon--chat::before {
    top: 28rpx;
    left: 26rpx;
  }

  .row-action {
    width: 112rpx;
    font-size: 26rpx;
  }

  .start-row__title {
    font-size: 29rpx;
  }

  .start-row__desc,
  .draft-desc {
    font-size: 24rpx;
  }

  .draft-row {
    gap: 18rpx;
  }

  .draft-icon {
    width: 78rpx;
    height: 78rpx;
  }

  .draft-action {
    width: 132rpx;
    font-size: 25rpx;
  }
}
</style>
