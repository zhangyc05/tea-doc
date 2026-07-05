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

function showContributionFeedback(title: string) {
  uni.showToast({
    title: `贡献详情为本地模拟：${title}`,
    icon: 'none',
  })
}

function goResearchRoom() {
  uni.navigateTo({ url: '/pages/activity/virtual-research-room/index' })
}

function goContributionDetail() {
  uni.navigateTo({ url: '/pages/activity/virtual-research-contribution-detail/index' })
}
</script>

<template>
  <view class="submitted-shell">
    <MobileNavbar title="贡献确认已提交" size="compact" @back="goBack" />
    <text class="page-subtitle">你确认的教研贡献已提交，等待教研活动归档</text>

    <view class="content">
      <MobileCard class="hero-card">
        <view class="hero-art" aria-hidden="true">
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
          <view class="activity-art" aria-hidden="true">
            <view class="board-icon"></view>
            <view class="people-dot people-dot--one"></view>
            <view class="people-dot people-dot--two"></view>
            <view class="people-dot people-dot--three"></view>
          </view>
          <view class="activity-copy">
            <text class="activity-title">智能制造课程资源共建研讨</text>
            <view class="meta-row">
              <view class="tiny-icon tiny-icon--calendar" aria-hidden="true"></view>
              <text>2026-05-22 14:00-16:30</text>
            </view>
            <view class="meta-row">
              <view class="tiny-icon tiny-icon--briefcase" aria-hidden="true"></view>
              <text>腾讯会议　|　智能制造课程虚拟教研室</text>
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
          @tap="showContributionFeedback(item.title)"
        >
          <view class="contribution-icon" :class="`contribution-icon--${item.icon}`" aria-hidden="true"></view>
          <view class="contribution-copy">
            <text class="contribution-title">{{ item.title }}</text>
            <text class="contribution-source">{{ item.source }}</text>
          </view>
          <wd-icon name="chevron-right" size="24rpx" color="#7b8495" />
        </button>
      </MobileCard>

      <MobileCard class="status-card">
        <text class="section-title">当前状态</text>
        <view class="status-body">
          <view class="hourglass-icon" aria-hidden="true"></view>
          <view class="status-copy">
            <text class="status-title">教研活动归档中</text>
            <text class="status-desc">归档完成后，可在教研记录中查看。</text>
          </view>
        </view>
      </MobileCard>
    </view>

    <view class="fixed-actions">
      <MobileActionButton class="action-button outline-action" variant="outline" @tap="goResearchRoom">
        返回教研室
      </MobileActionButton>
      <MobileActionButton class="action-button primary-action" variant="primary" @tap="goContributionDetail">
        查看提交内容
      </MobileActionButton>
    </view>

    <MobileTabBar active="activity" />
  </view>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.submitted-shell {
  min-height: 100vh;
  padding-bottom: calc(270rpx + env(safe-area-inset-bottom));
  overflow-x: hidden;
  background:
    radial-gradient(circle at 84% 4%, rgba(224, 248, 255, 0.78), transparent 30%),
    linear-gradient(180deg, #ffffff 0%, #fbfdff 42%, #f8fbfa 100%);
  color: #10172d;
}

.page-subtitle {
  display: block;
  margin: -2rpx 48rpx 34rpx 142rpx;
  color: #294575;
  font-size: 31rpx;
  font-weight: 500;
  line-height: 1.3;
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
  box-shadow: 0 18rpx 46rpx rgba(23, 41, 72, 0.06);
}

.hero-card {
  display: flex;
  min-height: 246rpx;
  align-items: center;
  gap: 42rpx;
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
  top: 34rpx;
  left: 48rpx;
  z-index: 2;
  width: 120rpx;
  height: 126rpx;
  border-radius: 20rpx;
  background: linear-gradient(145deg, #36e59a, #02b95f);
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
  top: -20rpx;
  left: 32rpx;
  width: 58rpx;
  height: 34rpx;
  border: 7rpx solid #fff;
  border-bottom: 0;
  border-radius: 18rpx 18rpx 8rpx 8rpx;
  background: #0ac66b;
}

.clipboard-icon::after {
  top: 48rpx;
  left: 34rpx;
  width: 52rpx;
  height: 28rpx;
  border-bottom: 14rpx solid #fff;
  border-left: 14rpx solid #fff;
  transform: rotate(-45deg);
}

.shadow-oval {
  position: absolute;
  bottom: 8rpx;
  left: 14rpx;
  width: 174rpx;
  height: 44rpx;
  border-radius: 50%;
  background: rgba(17, 189, 104, 0.13);
}

.spark {
  position: absolute;
  width: 30rpx;
  height: 30rpx;
  color: #78dfaa;
}

.spark--one {
  top: 24rpx;
  left: 6rpx;
}

.spark--two {
  top: 38rpx;
  right: 8rpx;
  transform: scale(0.72);
}

.spark::before {
  inset: 0;
  background: currentColor;
  clip-path: polygon(50% 0, 62% 38%, 100% 50%, 62% 62%, 50% 100%, 38% 62%, 0 50%, 38% 38%);
}

.dot {
  position: absolute;
  width: 14rpx;
  height: 14rpx;
  border-radius: 50%;
  background: #a6efc9;
}

.dot--left {
  top: 82rpx;
  left: 28rpx;
}

.dot--right {
  right: 2rpx;
  bottom: 76rpx;
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

.hero-title {
  color: #10172d;
  font-size: 40rpx;
  font-weight: 900;
  line-height: 1.25;
}

.state-chip {
  padding: 9rpx 20rpx;
  border-radius: 999rpx;
  background: #fff1e8;
  color: #ff7417;
  font-size: 25rpx;
  font-weight: 900;
  white-space: nowrap;
}

.hero-desc {
  display: block;
  margin-top: 28rpx;
  color: #2f4b7b;
  font-size: 31rpx;
  line-height: 1.55;
}

.activity-card,
.contribution-card,
.status-card {
  padding: 32rpx;
}

.section-title {
  display: block;
  color: #10172d;
  font-size: 34rpx;
  font-weight: 900;
  line-height: 1.2;
}

.activity-body {
  display: flex;
  align-items: center;
  gap: 38rpx;
  margin-top: 28rpx;
}

.activity-art {
  width: 152rpx;
  height: 152rpx;
  overflow: hidden;
  border-radius: 18rpx;
  background: linear-gradient(145deg, #e9fbf2, #f7fffb);
}

.board-icon {
  position: absolute;
  top: 38rpx;
  left: 42rpx;
  width: 70rpx;
  height: 56rpx;
  border-radius: 8rpx;
  background: linear-gradient(145deg, #33df92, #14bd68);
}

.board-icon::before {
  top: 16rpx;
  left: 20rpx;
  width: 8rpx;
  height: 8rpx;
  border-radius: 50%;
  background: #fff;
  box-shadow: 20rpx 0 0 #fff;
}

.board-icon::after {
  right: 12rpx;
  bottom: 12rpx;
  width: 28rpx;
  height: 6rpx;
  border-radius: 6rpx;
  background: #dffff0;
}

.people-dot {
  position: absolute;
  border-radius: 50%;
  background: #52d88c;
}

.people-dot::after {
  position: absolute;
  top: 22rpx;
  left: -8rpx;
  width: 42rpx;
  height: 24rpx;
  border-radius: 28rpx 28rpx 4rpx 4rpx;
  background: #52d88c;
  content: '';
}

.people-dot--one {
  bottom: 24rpx;
  left: 34rpx;
  width: 28rpx;
  height: 28rpx;
}

.people-dot--two {
  bottom: 46rpx;
  left: 64rpx;
  width: 22rpx;
  height: 22rpx;
}

.people-dot--three {
  right: 30rpx;
  bottom: 42rpx;
  width: 26rpx;
  height: 26rpx;
}

.activity-copy {
  min-width: 0;
  flex: 1;
}

.activity-title {
  display: block;
  color: #10172d;
  font-size: 32rpx;
  font-weight: 900;
  line-height: 1.3;
}

.meta-row {
  display: flex;
  align-items: center;
  gap: 16rpx;
  margin-top: 22rpx;
  color: #304c7d;
  font-size: 27rpx;
  font-weight: 500;
  line-height: 1.25;
}

.tiny-icon {
  width: 24rpx;
  height: 24rpx;
  color: #536a96;
}

.tiny-icon--calendar::before {
  inset: 2rpx;
  border: 3rpx solid currentColor;
  border-radius: 4rpx;
}

.tiny-icon--calendar::after {
  top: 8rpx;
  left: 5rpx;
  width: 14rpx;
  height: 3rpx;
  background: currentColor;
}

.tiny-icon--briefcase::before {
  inset: 6rpx 2rpx 3rpx;
  border: 3rpx solid currentColor;
  border-radius: 4rpx;
}

.tiny-icon--briefcase::after {
  top: 2rpx;
  left: 8rpx;
  width: 8rpx;
  height: 7rpx;
  border: 3rpx solid currentColor;
  border-bottom: 0;
  border-radius: 4rpx 4rpx 0 0;
}

.contribution-card {
  padding-bottom: 8rpx;
}

.contribution-row {
  display: flex;
  min-height: 126rpx;
  align-items: center;
  gap: 30rpx;
  margin: 0;
  padding: 26rpx 0;
  border: 0;
  background: transparent;
  color: inherit;
  line-height: 1;
  text-align: left;
}

.contribution-row::after {
  display: none;
}

.contribution-row + .contribution-row {
  border-top: 1rpx solid #edf1f5;
}

.contribution-icon {
  width: 78rpx;
  height: 78rpx;
  border-radius: 18rpx;
}

.contribution-icon--folder {
  background: #eafbf1;
}

.contribution-icon--chat {
  background: #eafbf1;
}

.contribution-icon--folder::before {
  inset: 22rpx 18rpx;
  border-radius: 8rpx;
  background: #12bd68;
  clip-path: polygon(0 0, 72% 0, 100% 28%, 100% 100%, 0 100%);
}

.contribution-icon--folder::after {
  top: 42rpx;
  left: 32rpx;
  width: 28rpx;
  height: 15rpx;
  border-bottom: 7rpx solid #fff;
  border-left: 7rpx solid #fff;
  transform: rotate(-45deg);
}

.contribution-icon--chat::before {
  inset: 20rpx 17rpx;
  border-radius: 10rpx;
  background: #11bd68;
  clip-path: polygon(0 0, 100% 0, 100% 72%, 58% 72%, 38% 100%, 38% 72%, 0 72%);
}

.contribution-icon--chat::after {
  top: 34rpx;
  left: 26rpx;
  width: 7rpx;
  height: 7rpx;
  border-radius: 50%;
  background: #fff;
  box-shadow: 14rpx 0 0 #fff, 28rpx 0 0 #fff;
}

.contribution-copy {
  min-width: 0;
  flex: 1;
}

.contribution-title {
  display: block;
  color: #10172d;
  font-size: 30rpx;
  font-weight: 900;
  line-height: 1.25;
}

.contribution-source {
  display: block;
  margin-top: 18rpx;
  color: #304c7d;
  font-size: 27rpx;
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
  top: 18rpx;
  left: 23rpx;
  width: 23rpx;
  height: 34rpx;
  border: 7rpx solid currentColor;
  border-top-width: 8rpx;
  border-bottom-width: 8rpx;
  clip-path: polygon(0 0, 100% 0, 62% 50%, 100% 100%, 0 100%, 38% 50%);
}

.status-title {
  display: block;
  color: #111827;
  font-size: 34rpx;
  font-weight: 900;
  line-height: 1.25;
}

.status-desc {
  display: block;
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
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
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
    padding-bottom: calc(238rpx + env(safe-area-inset-bottom));
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
    top: 28rpx;
    left: 40rpx;
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
    top: 30rpx;
    left: 32rpx;
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
