<script setup lang="ts">
import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobileNavbar from '../../../components/MobileNavbar.vue'

const supplementItems = [
  {
    icon: 'folder',
    title: '设备调试案例整理',
    file: '设备调试案例材料.docx',
    time: '2026-05-24 10:35',
    ai: false,
  },
  {
    icon: 'chat',
    title: '发言与案例补充',
    file: '一句说明',
    time: '2026-05-24 10:35',
    ai: true,
  },
]

const evidenceItems = ['会议纪要', '任务分工', '发言摘录']

function goBack() {
  uni.navigateBack()
}

function showToast(title: string) {
  uni.showToast({ title, icon: 'none' })
}

function goResearchRoom() {
  uni.navigateTo({ url: '/pages/activity/virtual-research-room/index' })
}

function goContributionDetail() {
  uni.navigateTo({ url: '/pages/activity/virtual-research-contribution-detail/index' })
}
</script>

<template>
  <view class="resubmitted-page">
    <MobileNavbar title="补充材料已提交" size="compact" @back="goBack">
      <template #right>
        <button class="more-button" @tap="showToast('更多')">•••</button>
      </template>
    </MobileNavbar>

    <view class="result-hero">
      <view class="success-ring">
        <view class="success-mark"></view>
      </view>
      <view class="hero-copy">
        <text class="hero-title">补充材料已重新提交</text>
        <text class="hero-desc">你补充的教研材料已重新提交，等待归档确认</text>
        <text class="status-pill">状态： 等待归档</text>
      </view>
    </view>

    <view class="content">
      <MobileCard class="activity-card">
        <view class="section-head">
          <view class="section-icon section-icon--group"></view>
          <text class="section-title">本次教研活动</text>
        </view>
        <view class="activity-info">
          <text class="activity-title">智能制造课程资源共建研讨</text>
          <view class="meta-row">
            <view class="tiny-icon tiny-icon--time"></view>
            <text>2026-05-22　14:00-16:30</text>
          </view>
          <view class="meta-row">
            <view class="tiny-icon tiny-icon--video"></view>
            <text>腾讯会议　会议号：123 456 789</text>
          </view>
          <view class="meta-row">
            <view class="tiny-icon tiny-icon--building"></view>
            <text>智能制造课程虚拟教研室</text>
          </view>
        </view>
      </MobileCard>

      <MobileCard class="section-card supplement-card">
        <view class="section-head">
          <view class="section-icon section-icon--doc"></view>
          <text class="section-title">本次补充内容</text>
        </view>
        <view class="supplement-list">
          <button
            v-for="item in supplementItems"
            :key="item.title"
            class="supplement-item"
            @tap="showToast(item.title)"
          >
            <view class="item-icon" :class="`item-icon--${item.icon}`"></view>
            <view class="item-copy">
              <view class="item-title-row">
                <text class="item-title">{{ item.title }}</text>
                <text class="completed-chip">已补充</text>
              </view>
              <text class="item-line">已补充： {{ item.file }}</text>
              <text class="item-line">提交时间： {{ item.time }}</text>
              <text v-if="item.ai" class="ai-line">✧ AI 已整理为归档说明</text>
            </view>
            <view class="row-arrow"></view>
          </button>
        </view>
      </MobileCard>

      <MobileCard class="section-card evidence-card">
        <view class="section-head">
          <view class="section-icon section-icon--folder"></view>
          <text class="section-title">已有依据</text>
          <text class="sub-title">（已同步）</text>
        </view>
        <view class="evidence-list">
          <view v-for="item in evidenceItems" :key="item" class="evidence-row">
            <view class="evidence-left">
              <view class="evidence-icon"></view>
              <text>{{ item }}</text>
            </view>
            <text class="sync-text">已同步</text>
          </view>
        </view>
      </MobileCard>

      <MobileCard class="section-card status-card">
        <view class="section-head">
          <view class="section-icon section-icon--clock"></view>
          <text class="section-title">当前状态</text>
        </view>
        <view class="timeline">
          <view class="timeline-item">
            <view class="timeline-dot"></view>
            <view class="timeline-copy">
              <text class="timeline-title">教研活动已收到你补充的材料</text>
              <text class="timeline-desc">教研秘书将重新核验材料并进入归档流程</text>
            </view>
          </view>
          <view class="timeline-item">
            <view class="timeline-dot"></view>
            <view class="timeline-copy">
              <text class="timeline-title">归档完成后，将形成教研活动记录</text>
              <text class="timeline-desc">你的个人贡献也会重新确认并沉淀到成长档案</text>
            </view>
          </view>
        </view>
        <view class="notice">
          <view class="notice-icon"></view>
          <text>你可以在“教研记录”或“成长档案 · 教研科研维度”中查看结果</text>
        </view>
      </MobileCard>
    </view>

    <view class="fixed-actions">
      <MobileActionButton class="action-button outline-button" variant="outline" @tap="goResearchRoom">
        返回教研室
      </MobileActionButton>
      <MobileActionButton class="action-button primary-button" variant="primary" @tap="goContributionDetail">
        查看提交内容
      </MobileActionButton>
    </view>
  </view>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.resubmitted-page {
  min-height: 100vh;
  padding-bottom: calc(126rpx + env(safe-area-inset-bottom));
  overflow-x: hidden;
  background: linear-gradient(180deg, #ffffff 0%, #fbfdff 48%, #f8fbfa 100%);
  color: #10172d;
}

.more-button {
  margin: 0 24rpx 0 0;
  padding: 0;
  border: 0;
  background: transparent;
  color: #050812;
  font-size: 38rpx;
  font-weight: 900;
  line-height: 1;
}

.more-button::after,
.supplement-item::after {
  display: none;
}

.result-hero {
  display: flex;
  align-items: center;
  gap: 34rpx;
  padding: 38rpx 72rpx 46rpx;
}

.success-ring,
.success-mark,
.section-icon,
.tiny-icon,
.item-icon,
.row-arrow,
.evidence-icon,
.timeline-dot,
.notice-icon {
  position: relative;
  flex: 0 0 auto;
}

.success-ring {
  display: flex;
  width: 82rpx;
  height: 82rpx;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #d9f6e7;
}

.success-mark {
  width: 62rpx;
  height: 62rpx;
  border-radius: 50%;
  background: linear-gradient(135deg, #1fc878, #08a95d);
}

.success-mark::before,
.section-icon::before,
.section-icon::after,
.tiny-icon::before,
.tiny-icon::after,
.item-icon::before,
.item-icon::after,
.row-arrow::before,
.evidence-icon::before,
.timeline-dot::before,
.notice-icon::before {
  position: absolute;
  content: '';
}

.success-mark::before {
  left: 19rpx;
  top: 18rpx;
  width: 25rpx;
  height: 14rpx;
  border-bottom: 7rpx solid #fff;
  border-left: 7rpx solid #fff;
  transform: rotate(-45deg);
}

.hero-copy {
  min-width: 0;
  flex: 1;
}

.hero-title,
.hero-desc,
.status-pill,
.section-title,
.activity-title,
.meta-row,
.item-title,
.item-line,
.ai-line,
.timeline-title,
.timeline-desc {
  display: block;
}

.hero-title {
  color: #050812;
  font-size: 40rpx;
  font-weight: 900;
  line-height: 1.22;
}

.hero-desc {
  margin-top: 14rpx;
  color: #526078;
  font-size: 28rpx;
  line-height: 1.42;
}

.status-pill {
  width: fit-content;
  margin-top: 20rpx;
  padding: 10rpx 22rpx;
  border-radius: 14rpx;
  background: #fff3e4;
  color: #e57912;
  font-size: 26rpx;
  font-weight: 900;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  padding: 0 30rpx 28rpx;
}

.activity-card,
.section-card {
  border-radius: 22rpx;
  box-shadow: 0 12rpx 28rpx rgba(20, 30, 52, 0.05);
}

.activity-card {
  padding: 30rpx 34rpx;
}

.section-card {
  padding: 28rpx 30rpx;
}

.section-head {
  display: flex;
  align-items: center;
  gap: 18rpx;
}

.section-title {
  color: #070d1d;
  font-size: 32rpx;
  font-weight: 900;
  line-height: 1.25;
}

.sub-title {
  color: #69758c;
  font-size: 26rpx;
}

.section-icon {
  width: 44rpx;
  height: 44rpx;
  border-radius: 11rpx;
  background: #e9fbf1;
  color: #0fb463;
}

.section-icon--folder {
  background: #eaf2ff;
  color: #2d7cf7;
}

.section-icon--clock {
  background: #fff3d9;
  color: #f5a11b;
}

.section-icon::before {
  inset: 12rpx;
  border: 4rpx solid currentColor;
  border-radius: 5rpx;
}

.section-icon--group::before {
  top: 9rpx;
  left: 18rpx;
  width: 9rpx;
  height: 9rpx;
  border: 0;
  border-radius: 50%;
  background: currentColor;
  box-shadow: -13rpx 10rpx 0 currentColor, 13rpx 10rpx 0 currentColor;
}

.section-icon--group::after {
  left: 8rpx;
  bottom: 8rpx;
  width: 28rpx;
  height: 13rpx;
  border-radius: 14rpx 14rpx 5rpx 5rpx;
  background: currentColor;
}

.section-icon--doc::before {
  inset: 9rpx 12rpx;
  border: 0;
  border-radius: 4rpx;
  background: currentColor;
  box-shadow: 0 10rpx 0 -6rpx #fff, 0 19rpx 0 -6rpx #fff;
}

.section-icon--folder::before {
  inset: 15rpx 8rpx 9rpx;
  border: 0;
  border-radius: 5rpx;
  background: currentColor;
}

.section-icon--folder::after {
  left: 10rpx;
  top: 11rpx;
  width: 19rpx;
  height: 10rpx;
  border-radius: 7rpx 7rpx 0 0;
  background: currentColor;
}

.section-icon--clock::before {
  inset: 9rpx;
  border-radius: 50%;
}

.activity-info {
  margin-top: 26rpx;
  padding-left: 58rpx;
}

.activity-title {
  color: #0b122a;
  font-size: 32rpx;
  font-weight: 900;
  line-height: 1.28;
}

.meta-row {
  display: flex;
  align-items: center;
  gap: 18rpx;
  margin-top: 24rpx;
  color: #111827;
  font-size: 27rpx;
  line-height: 1.25;
}

.tiny-icon {
  width: 30rpx;
  height: 30rpx;
  color: #64748b;
}

.tiny-icon::before {
  inset: 5rpx;
  border: 3rpx solid currentColor;
  border-radius: 50%;
}

.tiny-icon--time::after {
  left: 14rpx;
  top: 8rpx;
  width: 8rpx;
  height: 10rpx;
  border-bottom: 3rpx solid currentColor;
  border-left: 3rpx solid currentColor;
}

.tiny-icon--video::before,
.tiny-icon--building::before {
  border-radius: 4rpx;
}

.tiny-icon--video::after {
  right: 1rpx;
  top: 10rpx;
  border-top: 5rpx solid transparent;
  border-bottom: 5rpx solid transparent;
  border-left: 8rpx solid currentColor;
}

.tiny-icon--building::after {
  left: 10rpx;
  top: 9rpx;
  width: 8rpx;
  height: 14rpx;
  border-radius: 2rpx;
  background: currentColor;
}

.supplement-list {
  display: flex;
  flex-direction: column;
  gap: 18rpx;
  margin-top: 24rpx;
  padding-left: 62rpx;
}

.supplement-item {
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 20rpx;
  margin: 0;
  padding: 22rpx;
  border: 0;
  border-radius: 16rpx;
  background: linear-gradient(120deg, #f4fbfa, #f9fcfb);
  text-align: left;
}

.item-icon {
  width: 56rpx;
  height: 56rpx;
  border-radius: 13rpx;
  background: #e9fbf1;
  color: #0fb463;
}

.item-icon--folder::before {
  left: 10rpx;
  right: 9rpx;
  bottom: 12rpx;
  height: 27rpx;
  border-radius: 6rpx;
  background: currentColor;
}

.item-icon--folder::after {
  left: 13rpx;
  top: 14rpx;
  width: 24rpx;
  height: 11rpx;
  border-radius: 7rpx 7rpx 0 0;
  background: currentColor;
}

.item-icon--chat::before {
  left: 10rpx;
  top: 13rpx;
  width: 36rpx;
  height: 28rpx;
  border-radius: 9rpx;
  background: currentColor;
}

.item-icon--chat::after {
  left: 20rpx;
  top: 26rpx;
  width: 5rpx;
  height: 5rpx;
  border-radius: 50%;
  background: #fff;
  box-shadow: 9rpx 0 0 #fff, 18rpx 0 0 #fff;
}

.item-copy {
  min-width: 0;
  flex: 1;
}

.item-title-row {
  display: flex;
  align-items: center;
  gap: 14rpx;
}

.item-title {
  color: #0b122a;
  font-size: 29rpx;
  font-weight: 900;
}

.completed-chip {
  padding: 5rpx 12rpx;
  border-radius: 999rpx;
  background: #e9fbf1;
  color: #0da75d;
  font-size: 21rpx;
  font-weight: 900;
  white-space: nowrap;
}

.item-line {
  margin-top: 12rpx;
  color: #526078;
  font-size: 25rpx;
  line-height: 1.3;
}

.ai-line {
  margin-top: 12rpx;
  color: #2d7cf7;
  font-size: 25rpx;
  font-weight: 900;
}

.row-arrow {
  width: 18rpx;
  height: 18rpx;
  color: #64748b;
}

.row-arrow::before {
  inset: 0;
  border-top: 4rpx solid currentColor;
  border-right: 4rpx solid currentColor;
  transform: rotate(45deg);
}

.evidence-list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  margin-top: 24rpx;
  padding-left: 72rpx;
}

.evidence-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #111827;
  font-size: 27rpx;
}

.evidence-left {
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.evidence-icon {
  width: 30rpx;
  height: 34rpx;
  border-radius: 4rpx;
  background: #eef4fb;
  color: #64748b;
}

.evidence-icon::before {
  left: 9rpx;
  top: 9rpx;
  width: 12rpx;
  height: 3rpx;
  background: currentColor;
  box-shadow: 0 7rpx 0 currentColor, 0 14rpx 0 currentColor;
}

.sync-text {
  color: #64748b;
}

.timeline {
  margin-top: 28rpx;
  padding-left: 64rpx;
}

.timeline-item {
  position: relative;
  display: flex;
  gap: 20rpx;
  padding-bottom: 30rpx;
}

.timeline-item::before {
  position: absolute;
  left: 9rpx;
  top: 22rpx;
  bottom: -6rpx;
  width: 2rpx;
  background: #d7dde8;
  content: '';
}

.timeline-item:last-child::before {
  display: none;
}

.timeline-dot {
  width: 20rpx;
  height: 20rpx;
  margin-top: 5rpx;
  border-radius: 50%;
  background: #f59b14;
}

.timeline-title {
  color: #111827;
  font-size: 27rpx;
  line-height: 1.35;
}

.timeline-desc {
  margin-top: 10rpx;
  color: #526078;
  font-size: 25rpx;
  line-height: 1.42;
}

.notice {
  display: flex;
  align-items: center;
  gap: 14rpx;
  margin-top: 4rpx;
  padding: 18rpx 22rpx;
  border-radius: 12rpx;
  background: #fff5e9;
  color: #bf690b;
  font-size: 25rpx;
  line-height: 1.35;
}

.notice-icon {
  width: 28rpx;
  height: 28rpx;
  border: 3rpx solid #e68a1c;
  border-radius: 50%;
}

.notice-icon::before {
  left: 11rpx;
  top: 10rpx;
  width: 4rpx;
  height: 10rpx;
  border-radius: 4rpx;
  background: #e68a1c;
  box-shadow: 0 -7rpx 0 #e68a1c;
}

.fixed-actions {
  position: fixed;
  right: 0;
  bottom: env(safe-area-inset-bottom);
  left: 0;
  z-index: 20;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28rpx;
  padding: 20rpx 42rpx 30rpx;
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(12rpx);
}

.action-button {
  height: 78rpx;
  border-radius: 12rpx;
  font-size: 31rpx;
}

.outline-button {
  border-color: #2d7cf7;
  color: #1f6df2;
}

.primary-button {
  background: linear-gradient(135deg, #2d7cf7, #1763df);
}

@media (max-width: 430px) {
  .resubmitted-page {
    padding-bottom: calc(112rpx + env(safe-area-inset-bottom));
  }

  .more-button {
    margin-right: 12rpx;
    font-size: 30rpx;
  }

  .result-hero {
    gap: 20rpx;
    padding: 24rpx 52rpx 32rpx;
  }

  .success-ring {
    width: 64rpx;
    height: 64rpx;
  }

  .success-mark {
    width: 48rpx;
    height: 48rpx;
  }

  .success-mark::before {
    left: 15rpx;
    top: 14rpx;
    width: 20rpx;
    height: 11rpx;
    border-bottom-width: 6rpx;
    border-left-width: 6rpx;
  }

  .hero-title {
    font-size: 30rpx;
  }

  .hero-desc {
    font-size: 22rpx;
  }

  .status-pill {
    padding: 8rpx 14rpx;
    font-size: 21rpx;
  }

  .content {
    gap: 14rpx;
    padding-right: 18rpx;
    padding-left: 18rpx;
  }

  .activity-card,
  .section-card {
    padding: 20rpx;
  }

  .section-title {
    font-size: 27rpx;
  }

  .sub-title,
  .activity-title,
  .meta-row,
  .evidence-row,
  .timeline-title {
    font-size: 22rpx;
  }

  .activity-info,
  .supplement-list,
  .evidence-list,
  .timeline {
    padding-left: 0;
  }

  .meta-row {
    gap: 12rpx;
    margin-top: 16rpx;
  }

  .supplement-item {
    gap: 12rpx;
    padding: 16rpx;
  }

  .item-icon {
    width: 46rpx;
    height: 46rpx;
  }

  .item-title {
    font-size: 23rpx;
  }

  .completed-chip {
    font-size: 18rpx;
  }

  .item-line,
  .ai-line,
  .timeline-desc,
  .notice {
    font-size: 20rpx;
  }

  .fixed-actions {
    gap: 14rpx;
    padding: 16rpx 20rpx 22rpx;
  }

  .action-button {
    height: 66rpx;
    font-size: 25rpx;
  }
}

@media (max-width: 374px) {
  .result-hero {
    align-items: flex-start;
    padding-right: 22rpx;
    padding-left: 22rpx;
  }

  .content {
    padding-right: 14rpx;
    padding-left: 14rpx;
  }

  .item-title-row {
    align-items: flex-start;
    flex-direction: column;
    gap: 8rpx;
  }

  .supplement-item {
    align-items: flex-start;
  }

  .evidence-row {
    gap: 12rpx;
  }

  .fixed-actions {
    padding-right: 14rpx;
    padding-left: 14rpx;
  }
}
</style>
