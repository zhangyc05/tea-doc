<script setup lang="ts">
import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobileNavbar from '../../../components/MobileNavbar.vue'
import MobileTabBar from '../../../components/MobileTabBar.vue'

const contributions = [
  {
    icon: 'folder',
    title: '设备调试案例整理',
    source: '来源：会议纪要、任务分工',
  },
  {
    icon: 'chat',
    title: '发言与案例补充',
    source: '来源：发言摘录、会议纪要',
  },
]

function goBack() {
  uni.navigateBack()
}

function showToast(title: string) {
  uni.showToast({ title, icon: 'none' })
}
</script>

<template>
  <view class="submitted-shell">
    <MobileNavbar title="贡献确认已提交" size="compact" @back="goBack" />
    <text class="page-subtitle">你确认的教研贡献已提交，等待教研活动归档</text>

    <view class="content">
      <MobileCard class="hero-card">
        <view class="hero-art">
          <view class="spark spark--one"></view>
          <view class="spark spark--two"></view>
          <view class="dot dot--left"></view>
          <view class="dot dot--right"></view>
          <view class="clipboard-icon"></view>
          <view class="shadow-oval"></view>
        </view>
        <view class="hero-copy">
          <view class="hero-title-row">
            <text class="hero-title">贡献确认已提交</text>
            <text class="state-chip">等待归档</text>
          </view>
          <text class="hero-desc">当前贡献已进入教研活动归档流程，归档后将沉淀为教研记录。</text>
        </view>
      </MobileCard>

      <MobileCard class="activity-card">
        <text class="section-title">本次教研活动</text>
        <view class="activity-body">
          <view class="activity-art">
            <view class="board-icon"></view>
            <view class="people-dot people-dot--one"></view>
            <view class="people-dot people-dot--two"></view>
            <view class="people-dot people-dot--three"></view>
          </view>
          <view class="activity-copy">
            <text class="activity-title">智能制造课程资源共建研讨</text>
            <view class="meta-row">
              <view class="tiny-icon tiny-icon--calendar"></view>
              <text>2026-05-22 14:00-16:30</text>
            </view>
            <view class="meta-row">
              <view class="tiny-icon tiny-icon--briefcase"></view>
              <text>腾讯会议 ｜ 智能制造课程虚拟教研室</text>
            </view>
          </view>
        </view>
      </MobileCard>

      <MobileCard class="contribution-card">
        <text class="section-title">已确认贡献</text>
        <button
          v-for="item in contributions"
          :key="item.title"
          class="contribution-row"
          @tap="showToast(item.title)"
        >
          <view class="contribution-icon" :class="`contribution-icon--${item.icon}`"></view>
          <view class="contribution-copy">
            <text class="contribution-title">{{ item.title }}</text>
            <text class="contribution-source">{{ item.source }}</text>
          </view>
          <view class="row-arrow"></view>
        </button>
      </MobileCard>

      <MobileCard class="status-card">
        <text class="section-title">当前状态</text>
        <view class="status-body">
          <view class="hourglass-icon"></view>
          <view class="status-copy">
            <text class="status-title">教研活动归档中</text>
            <text class="status-desc">归档完成后，可在教研记录中查看。</text>
          </view>
        </view>
      </MobileCard>
    </view>

    <view class="fixed-actions">
      <MobileActionButton class="action-button outline-action" variant="outline" @tap="showToast('返回教研室')">
        返回教研室
      </MobileActionButton>
      <MobileActionButton class="action-button primary-action" variant="primary" @tap="showToast('查看提交内容')">
        查看提交内容
      </MobileActionButton>
    </view>

    <MobileTabBar active="assistant" />
  </view>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.submitted-shell {
  min-height: 100vh;
  padding-bottom: calc(260rpx + env(safe-area-inset-bottom));
  overflow-x: hidden;
  background:
    radial-gradient(circle at 85% 3%, rgba(231, 246, 255, 0.84), transparent 30%),
    linear-gradient(180deg, #ffffff 0%, #fbfdff 42%, #f8fbfa 100%);
  color: #10172d;
}

.page-subtitle {
  display: block;
  margin: 0 48rpx 34rpx 142rpx;
  color: #294575;
  font-size: 31rpx;
  line-height: 1.28;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 32rpx;
  padding: 0 48rpx;
}

.hero-card,
.activity-card,
.contribution-card,
.status-card {
  border-radius: 24rpx;
}

.hero-card {
  display: flex;
  min-height: 246rpx;
  align-items: center;
  gap: 44rpx;
  padding: 34rpx 42rpx;
}

.hero-art,
.clipboard-icon,
.shadow-oval,
.spark,
.dot,
.activity-art,
.board-icon,
.people-dot,
.tiny-icon,
.contribution-icon,
.row-arrow,
.hourglass-icon {
  position: relative;
  flex: 0 0 auto;
}

.hero-art {
  width: 208rpx;
  height: 188rpx;
}

.clipboard-icon {
  position: absolute;
  left: 48rpx;
  top: 34rpx;
  z-index: 2;
  width: 120rpx;
  height: 126rpx;
  border-radius: 20rpx;
  background: linear-gradient(145deg, #37e59a, #02b95f);
  box-shadow: 0 20rpx 34rpx rgba(10, 182, 95, 0.2);
}

.clipboard-icon::before,
.clipboard-icon::after,
.spark::before,
.spark::after,
.board-icon::before,
.board-icon::after,
.tiny-icon::before,
.tiny-icon::after,
.contribution-icon::before,
.contribution-icon::after,
.row-arrow::before,
.hourglass-icon::before {
  position: absolute;
  content: '';
}

.clipboard-icon::before {
  left: 32rpx;
  top: -20rpx;
  width: 58rpx;
  height: 34rpx;
  border: 7rpx solid #fff;
  border-bottom: 0;
  border-radius: 18rpx 18rpx 8rpx 8rpx;
  background: #0ac66b;
}

.clipboard-icon::after {
  left: 35rpx;
  top: 54rpx;
  width: 48rpx;
  height: 28rpx;
  border-bottom: 12rpx solid #fff;
  border-left: 12rpx solid #fff;
  transform: rotate(-45deg);
}

.shadow-oval {
  position: absolute;
  left: 20rpx;
  bottom: 12rpx;
  width: 164rpx;
  height: 46rpx;
  border-radius: 50%;
  background: rgba(44, 202, 123, 0.18);
}

.spark {
  position: absolute;
  width: 28rpx;
  height: 28rpx;
  color: #61dca1;
}

.spark::before,
.spark::after {
  background: currentColor;
}

.spark::before {
  left: 12rpx;
  top: 0;
  width: 5rpx;
  height: 28rpx;
  border-radius: 5rpx;
}

.spark::after {
  left: 0;
  top: 12rpx;
  width: 28rpx;
  height: 5rpx;
  border-radius: 5rpx;
}

.spark--one {
  left: 18rpx;
  top: 8rpx;
  transform: rotate(45deg);
}

.spark--two {
  right: 0;
  top: 22rpx;
  width: 16rpx;
  height: 16rpx;
  color: #b9edd0;
  transform: rotate(45deg);
}

.dot {
  position: absolute;
  width: 15rpx;
  height: 15rpx;
  border-radius: 50%;
  background: #b7ebd0;
}

.dot--left {
  left: 26rpx;
  top: 93rpx;
}

.dot--right {
  right: 0;
  top: 110rpx;
}

.hero-copy {
  min-width: 0;
  flex: 1;
}

.hero-title-row {
  display: flex;
  align-items: center;
  gap: 22rpx;
}

.hero-title,
.hero-desc,
.section-title,
.activity-title,
.meta-row,
.contribution-title,
.contribution-source,
.status-title,
.status-desc {
  display: block;
}

.hero-title {
  color: #070d1d;
  font-size: 41rpx;
  font-weight: 900;
  line-height: 1.22;
}

.state-chip {
  flex: 0 0 auto;
  padding: 10rpx 24rpx;
  border-radius: 999rpx;
  background: #fff1e6;
  color: #ff7117;
  font-size: 29rpx;
  font-weight: 900;
}

.hero-desc {
  margin-top: 30rpx;
  color: #2d4774;
  font-size: 31rpx;
  line-height: 1.55;
}

.activity-card,
.contribution-card,
.status-card {
  padding: 28rpx 30rpx;
}

.section-title {
  color: #070d1d;
  font-size: 38rpx;
  font-weight: 900;
  line-height: 1.25;
}

.activity-body {
  display: flex;
  align-items: center;
  gap: 34rpx;
  margin-top: 24rpx;
}

.activity-art {
  width: 150rpx;
  height: 150rpx;
  overflow: hidden;
  border-radius: 18rpx;
  background: linear-gradient(145deg, #eefcf5, #f8fffb);
}

.board-icon {
  position: absolute;
  left: 44rpx;
  top: 40rpx;
  width: 68rpx;
  height: 54rpx;
  border-radius: 8rpx;
  background: linear-gradient(135deg, #37df92, #0fbe66);
}

.board-icon::before {
  left: 10rpx;
  top: 17rpx;
  width: 10rpx;
  height: 10rpx;
  border-radius: 50%;
  background: #fff;
  box-shadow: 22rpx -2rpx 0 0 #fff, 40rpx -2rpx 0 0 #fff, 22rpx 17rpx 0 0 #fff, 40rpx 17rpx 0 0 #fff;
}

.board-icon::after {
  left: 26rpx;
  bottom: -22rpx;
  width: 12rpx;
  height: 22rpx;
  background: #19c46e;
}

.people-dot {
  position: absolute;
  width: 30rpx;
  height: 30rpx;
  border-radius: 50%;
  background: #35d58a;
}

.people-dot::before {
  position: absolute;
  left: -13rpx;
  top: 30rpx;
  width: 58rpx;
  height: 26rpx;
  border-radius: 30rpx 30rpx 6rpx 6rpx;
  background: inherit;
  content: '';
}

.people-dot--one {
  left: 22rpx;
  bottom: 34rpx;
}

.people-dot--two {
  left: 52rpx;
  bottom: 48rpx;
  background: #63dda2;
}

.people-dot--three {
  right: 26rpx;
  bottom: 40rpx;
  background: #46ca84;
}

.activity-copy {
  min-width: 0;
  flex: 1;
}

.activity-title {
  color: #080d1d;
  font-size: 34rpx;
  font-weight: 900;
  line-height: 1.3;
}

.meta-row {
  display: flex;
  align-items: center;
  gap: 18rpx;
  margin-top: 20rpx;
  color: #344e7b;
  font-size: 29rpx;
  line-height: 1.28;
}

.tiny-icon {
  width: 30rpx;
  height: 30rpx;
  color: #42547a;
}

.tiny-icon::before {
  inset: 5rpx;
  border: 3rpx solid currentColor;
  border-radius: 5rpx;
}

.tiny-icon--calendar::after {
  left: 9rpx;
  right: 9rpx;
  top: 1rpx;
  height: 9rpx;
  border-right: 3rpx solid currentColor;
  border-left: 3rpx solid currentColor;
}

.tiny-icon--briefcase::after {
  left: 10rpx;
  top: 3rpx;
  width: 10rpx;
  height: 6rpx;
  border: 3rpx solid currentColor;
  border-bottom: 0;
  border-radius: 4rpx 4rpx 0 0;
}

.contribution-card {
  padding-bottom: 0;
}

.contribution-row {
  display: flex;
  min-height: 144rpx;
  align-items: center;
  gap: 28rpx;
  margin: 0;
  padding: 28rpx 0;
  border: 0;
  border-bottom: 1rpx solid #e6ebf2;
  border-radius: 0;
  background: transparent;
  text-align: left;
}

.contribution-row::after {
  display: none;
}

.contribution-row:last-child {
  border-bottom: 0;
}

.contribution-icon {
  width: 88rpx;
  height: 88rpx;
  border-radius: 22rpx;
  background: #e9fbf2;
  color: #0fbf68;
}

.contribution-icon--chat {
  background: #e9fbf2;
}

.contribution-icon::before {
  left: 23rpx;
  top: 24rpx;
  width: 42rpx;
  height: 34rpx;
  border-radius: 7rpx;
  background: currentColor;
}

.contribution-icon--folder::after {
  left: 35rpx;
  top: 35rpx;
  width: 19rpx;
  height: 10rpx;
  border-bottom: 5rpx solid #fff;
  border-left: 5rpx solid #fff;
  transform: rotate(-45deg);
}

.contribution-icon--chat::after {
  left: 35rpx;
  top: 39rpx;
  width: 7rpx;
  height: 7rpx;
  border-radius: 50%;
  background: #fff;
  box-shadow: 17rpx 0 0 #fff, -17rpx 0 0 #fff;
}

.contribution-copy {
  min-width: 0;
  flex: 1;
}

.contribution-title {
  color: #111827;
  font-size: 32rpx;
  font-weight: 900;
  line-height: 1.25;
}

.contribution-source {
  margin-top: 18rpx;
  color: #304b79;
  font-size: 29rpx;
  line-height: 1.3;
}

.row-arrow {
  width: 22rpx;
  height: 22rpx;
  color: #68778e;
}

.row-arrow::before {
  inset: 0;
  border-top: 5rpx solid currentColor;
  border-right: 5rpx solid currentColor;
  transform: rotate(45deg);
}

.status-body {
  display: flex;
  align-items: center;
  gap: 28rpx;
  margin-top: 30rpx;
}

.hourglass-icon {
  box-sizing: border-box;
  width: 88rpx;
  height: 88rpx;
  border: 20rpx solid #dcf7e9;
  border-radius: 50%;
  background: #fff;
  color: #0fbf68;
}

.hourglass-icon::before {
  left: 23rpx;
  top: 18rpx;
  width: 23rpx;
  height: 34rpx;
  border: 7rpx solid currentColor;
  border-top-width: 8rpx;
  border-bottom-width: 8rpx;
  clip-path: polygon(0 0, 100% 0, 62% 50%, 100% 100%, 0 100%, 38% 50%);
}

.status-title {
  color: #111827;
  font-size: 34rpx;
  font-weight: 900;
  line-height: 1.25;
}

.status-desc {
  margin-top: 18rpx;
  color: #304b79;
  font-size: 30rpx;
  line-height: 1.35;
}

.fixed-actions {
  position: fixed;
  right: 0;
  bottom: calc(128rpx + env(safe-area-inset-bottom));
  left: 0;
  z-index: 18;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 34rpx;
  padding: 22rpx 48rpx 20rpx;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(14rpx);
}

.action-button {
  height: 86rpx;
  border-radius: 14rpx;
  font-size: 34rpx;
}

.outline-action {
  border-color: #06b95e;
  color: #08a85c;
}

.primary-action {
  background: linear-gradient(135deg, #11c86e, #00ae55);
}

@media (max-width: 430px) {
  .submitted-shell {
    padding-bottom: calc(236rpx + env(safe-area-inset-bottom));
  }

  .page-subtitle {
    margin-right: 24rpx;
    margin-bottom: 24rpx;
    margin-left: 68rpx;
    font-size: 24rpx;
  }

  .content {
    gap: 22rpx;
    padding: 0 24rpx;
  }

  .hero-card {
    gap: 22rpx;
    min-height: 194rpx;
    padding: 24rpx 26rpx;
  }

  .hero-art {
    width: 168rpx;
    height: 146rpx;
  }

  .clipboard-icon {
    left: 40rpx;
    top: 28rpx;
    width: 96rpx;
    height: 100rpx;
  }

  .shadow-oval {
    width: 132rpx;
    height: 36rpx;
  }

  .hero-title-row {
    gap: 12rpx;
  }

  .hero-title {
    font-size: 28rpx;
  }

  .state-chip {
    padding: 7rpx 13rpx;
    font-size: 20rpx;
  }

  .hero-desc {
    margin-top: 20rpx;
    font-size: 23rpx;
  }

  .activity-card,
  .contribution-card,
  .status-card {
    padding: 22rpx;
  }

  .section-title {
    font-size: 29rpx;
  }

  .activity-body {
    gap: 18rpx;
    margin-top: 18rpx;
  }

  .activity-art {
    width: 112rpx;
    height: 112rpx;
  }

  .board-icon {
    left: 32rpx;
    top: 30rpx;
    width: 52rpx;
    height: 42rpx;
  }

  .people-dot {
    width: 23rpx;
    height: 23rpx;
  }

  .activity-title {
    font-size: 25rpx;
  }

  .meta-row {
    gap: 10rpx;
    margin-top: 14rpx;
    font-size: 21rpx;
  }

  .contribution-row {
    min-height: 112rpx;
    gap: 18rpx;
    padding: 20rpx 0;
  }

  .contribution-icon {
    width: 68rpx;
    height: 68rpx;
    border-radius: 16rpx;
  }

  .contribution-title {
    font-size: 24rpx;
  }

  .contribution-source {
    margin-top: 10rpx;
    font-size: 22rpx;
  }

  .status-body {
    gap: 20rpx;
    margin-top: 22rpx;
  }

  .hourglass-icon {
    width: 70rpx;
    height: 70rpx;
    border-width: 16rpx;
  }

  .status-title {
    font-size: 27rpx;
  }

  .status-desc {
    margin-top: 12rpx;
    font-size: 22rpx;
  }

  .fixed-actions {
    bottom: calc(146rpx + env(safe-area-inset-bottom));
    gap: 18rpx;
    padding: 18rpx 24rpx;
  }

  .action-button {
    height: 66rpx;
    font-size: 26rpx;
  }
}

@media (max-width: 374px) {
  .content {
    padding-right: 18rpx;
    padding-left: 18rpx;
  }

  .hero-card {
    align-items: flex-start;
  }

  .hero-art {
    display: none;
  }

  .fixed-actions {
    padding-right: 18rpx;
    padding-left: 18rpx;
  }
}
</style>
