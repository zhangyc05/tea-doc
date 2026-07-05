<script setup lang="ts">
import { computed } from 'vue'
import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobileNavbar from '../../../components/MobileNavbar.vue'
import MobileTabBar from '../../../components/MobileTabBar.vue'
import { getMobileTrainingState } from '../../../domain/training'

const trainingState = getMobileTrainingState()

const recommendList = computed(() => trainingState.resources.map((item, index) => ({
  title: item.title,
  meta: item.meta,
  reason: item.reason,
  tone: index === 0 ? 'green' : 'blue',
  icon: index === 0 ? 'screen' : 'school',
  action: item.action === '直接学习' ? '打开资源' : '查看详情',
  id: item.id,
})))

const myTrainings = computed(() => trainingState.records.map((item, index) => ({
  title: item.title,
  status: item.status,
  desc: item.desc,
  icon: index === 0 ? 'book' : 'note',
  action: item.status === '归档确认中' ? '查看进度' : '记录心得',
  tone: item.status === '学习中' ? 'green' : 'purple',
  id: item.id,
})))

function goBack() {
  uni.navigateBack()
}

function goDemand() {
  uni.navigateTo({ url: '/pages/activity/training-demand/index' })
}

function goTrainingList() {
  uni.navigateTo({ url: '/pages/activity/training-list/index' })
}

function goSummary(recordId = 'digital-teaching-record') {
  uni.navigateTo({ url: `/pages/activity/training-summary/index?recordId=${recordId}` })
}

function openLearningResource(recordId = 'digital-teaching-record') {
  uni.navigateTo({ url: `/pages/activity/training-summary/index?recordId=${recordId}` })
}
</script>

<template>
  <view class="training-page">
    <view class="hero">
      <MobileNavbar title="培训进修" size="compact" @back="goBack" />
      <view class="hero__copy">
        <text class="hero__subtitle">申请培训、记录学习，培训结束后可整理总结</text>
      </view>
      <view class="hero-art" aria-hidden="true">
        <view class="hero-art__cap"></view>
        <view class="hero-art__book"></view>
        <view class="hero-art__leaf hero-art__leaf--one"></view>
        <view class="hero-art__leaf hero-art__leaf--two"></view>
      </view>
    </view>

    <view class="content">
      <MobileCard class="task-card">
        <view class="section-head">
          <view class="section-head__icon section-head__icon--bell"></view>
          <text class="section-title">当前需要处理</text>
        </view>

        <view class="task-main">
          <view class="training-icon training-icon--book">
            <view class="training-icon__shape"></view>
          </view>
          <view class="task-main__body">
            <text class="task-main__title">数字化教学能力提升</text>
            <view class="task-main__meta">
              <text class="state state--green">学习中</text>
              <text class="divider">|</text>
              <text>第三方学习资源</text>
            </view>
            <text class="task-main__desc">可以记录一条学习心得，后续用于整理培训总结</text>
          </view>
        </view>

        <view class="task-actions">
          <MobileActionButton class="task-actions__primary" variant="primary" @tap="goSummary()">记录心得</MobileActionButton>
          <MobileActionButton class="task-actions__outline" variant="outline" @tap="openLearningResource()">打开资源</MobileActionButton>
        </view>
      </MobileCard>

      <MobileCard class="section-card">
        <view class="section-head section-head--between">
          <view class="section-head__left">
            <view class="section-head__icon section-head__icon--leaf"></view>
            <text class="section-title">适合你的培训</text>
          </view>
          <MobileActionButton class="section-link" variant="link" arrow @tap="goTrainingList">查看全部</MobileActionButton>
        </view>

        <view v-for="item in recommendList" :key="item.title" class="recommend-row">
          <view class="training-icon" :class="[`training-icon--${item.icon}`, `training-icon--${item.tone}`]">
            <view class="training-icon__shape"></view>
          </view>
          <view class="recommend-row__body">
            <text class="recommend-row__title">{{ item.title }}</text>
            <text class="recommend-row__meta">{{ item.meta }}</text>
            <text class="recommend-row__reason" :class="`recommend-row__reason--${item.tone}`">{{ item.reason }}</text>
            <view class="recommend-row__actions">
              <MobileActionButton class="recommend-row__button" variant="outline" @tap="item.action === '打开资源' ? openLearningResource() : goTrainingList()">{{ item.action }}</MobileActionButton>
              <MobileActionButton v-if="item.action === '打开资源'" class="recommend-row__button recommend-row__button--muted" variant="outline" @tap="goSummary()">记录心得</MobileActionButton>
            </view>
          </view>
        </view>
      </MobileCard>

      <MobileCard class="section-card">
        <view class="section-head section-head--between">
          <view class="section-head__left">
            <view class="section-head__icon section-head__icon--user"></view>
            <text class="section-title">我的培训</text>
          </view>
          <MobileActionButton class="section-link" variant="link" arrow @tap="goTrainingList">查看全部</MobileActionButton>
        </view>

        <view v-for="item in myTrainings" :key="item.title" class="mine-row">
          <view class="training-icon" :class="[`training-icon--${item.icon}`, `training-icon--${item.tone}`]">
            <view class="training-icon__shape"></view>
          </view>
          <view class="mine-row__body">
            <text class="mine-row__title">{{ item.title }}</text>
            <view class="mine-row__meta">
              <text :class="item.tone === 'green' ? 'state state--green' : 'state state--orange'">{{ item.status }}</text>
              <text v-if="item.tone === 'green'" class="divider">|</text>
              <text>{{ item.desc }}</text>
            </view>
          </view>
          <MobileActionButton class="mine-row__button" variant="outline" @tap="goSummary(item.id)">{{ item.action }}</MobileActionButton>
          <wd-icon name="chevron-right" size="24rpx" color="#7b8495" />
        </view>
      </MobileCard>

      <MobileCard class="need-card">
        <view class="need-card__icon">
          <view class="need-card__plane"></view>
        </view>
        <view class="need-card__copy">
          <text class="need-card__title">没有找到合适培训？</text>
          <text class="need-card__desc">可以提交你的培训需求，或填写想参加的培训。</text>
        </view>
        <MobileActionButton class="need-card__button" variant="primary" @tap="goDemand">提交培训需求</MobileActionButton>
      </MobileCard>
    </view>

    <MobileTabBar active="activity" />
  </view>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.training-page {
  min-height: 100vh;
  padding-bottom: calc(168rpx + env(safe-area-inset-bottom));
  background:
    radial-gradient(circle at 14% 4%, rgba(220, 252, 236, 0.86), transparent 30%),
    linear-gradient(180deg, #fbfffd 0%, #f7fbff 50%, #f5f9ff 100%);
  color: $teacher-mobile-text-primary;
}

.hero {
  position: relative;
  min-height: 220rpx;
  padding: calc(var(--status-bar-height) + 12rpx) 28rpx 24rpx;
  overflow: hidden;
}

.hero__copy {
  position: relative;
  z-index: 1;
  padding-left: 102rpx;
}

.hero__subtitle {
  display: block;
  color: #4e5a74;
  font-size: 26rpx;
  font-weight: 500;
  line-height: 1.45;
}

.hero-art {
  position: absolute;
  top: 52rpx;
  right: 32rpx;
  z-index: 0;
  width: 192rpx;
  height: 138rpx;
  opacity: 0.9;
}

.hero-art__cap {
  position: absolute;
  top: 6rpx;
  right: 4rpx;
  width: 142rpx;
  height: 58rpx;
  background: linear-gradient(135deg, #89dcb0, #44bd78);
  clip-path: polygon(50% 0, 100% 35%, 50% 70%, 0 35%);
}

.hero-art__cap::after {
  position: absolute;
  right: 24rpx;
  bottom: -20rpx;
  width: 7rpx;
  height: 52rpx;
  border-radius: 8rpx;
  background: #43b977;
  content: '';
}

.hero-art__book {
  position: absolute;
  right: 20rpx;
  bottom: 5rpx;
  width: 120rpx;
  height: 58rpx;
  border-radius: 12rpx 12rpx 18rpx 18rpx;
  background: linear-gradient(135deg, rgba(179, 238, 207, 0.72), rgba(87, 196, 128, 0.36));
  box-shadow: inset 0 -8rpx 0 rgba(30, 156, 91, 0.14);
}

.hero-art__leaf {
  position: absolute;
  border-radius: 100% 0;
  background: rgba(105, 201, 147, 0.32);
}

.hero-art__leaf--one {
  bottom: 16rpx;
  left: 0;
  width: 62rpx;
  height: 38rpx;
  transform: rotate(30deg);
}

.hero-art__leaf--two {
  bottom: 42rpx;
  left: 28rpx;
  width: 48rpx;
  height: 30rpx;
  transform: rotate(52deg);
}

.content {
  display: flex;
  flex-direction: column;
  gap: 22rpx;
  padding: 0 28rpx;
}

.task-card,
.section-card,
.need-card {
  padding: 28rpx;
}

.section-head,
.section-head__left,
.task-main,
.task-main__meta,
.task-actions,
.recommend-row,
.recommend-row__actions,
.mine-row,
.mine-row__meta,
.need-card {
  display: flex;
  align-items: center;
}

.section-head {
  gap: 18rpx;
  margin-bottom: 28rpx;
}

.section-head--between {
  justify-content: space-between;
}

.section-head__left {
  gap: 18rpx;
}

.section-title {
  color: #10172d;
  font-size: 38rpx;
  font-weight: 900;
  line-height: 1.2;
}

.section-head__icon {
  position: relative;
  width: 34rpx;
  height: 34rpx;
  color: $teacher-mobile-primary;
}

.section-head__icon--bell {
  border: 4rpx solid currentColor;
  border-top-color: transparent;
  border-radius: 18rpx 18rpx 12rpx 12rpx;
}

.section-head__icon--bell::before {
  position: absolute;
  top: -12rpx;
  left: 9rpx;
  width: 10rpx;
  height: 12rpx;
  border-radius: 8rpx;
  background: currentColor;
  content: '';
}

.section-head__icon--leaf::before,
.section-head__icon--leaf::after {
  position: absolute;
  border-radius: 100% 0;
  background: currentColor;
  content: '';
}

.section-head__icon--leaf::before {
  top: 5rpx;
  left: 5rpx;
  width: 16rpx;
  height: 24rpx;
  transform: rotate(-20deg);
}

.section-head__icon--leaf::after {
  right: 2rpx;
  bottom: 2rpx;
  width: 22rpx;
  height: 14rpx;
  transform: rotate(-28deg);
}

.section-head__icon--user::before {
  position: absolute;
  top: 2rpx;
  left: 10rpx;
  width: 14rpx;
  height: 14rpx;
  border-radius: 50%;
  background: currentColor;
  content: '';
}

.section-head__icon--user::after {
  position: absolute;
  right: 4rpx;
  bottom: 2rpx;
  left: 4rpx;
  height: 18rpx;
  border-radius: 18rpx 18rpx 8rpx 8rpx;
  background: currentColor;
  content: '';
}

.section-link {
  gap: 8rpx;
  height: 42rpx;
  color: $teacher-mobile-primary-dark;
  font-size: 26rpx;
}

.task-main {
  align-items: flex-start;
  gap: 28rpx;
}

.task-main__body {
  min-width: 0;
  flex: 1;
}

.task-main__title,
.recommend-row__title,
.mine-row__title,
.need-card__title {
  display: block;
  color: #10172d;
  font-weight: 900;
  line-height: 1.25;
}

.task-main__title {
  font-size: 34rpx;
}

.task-main__meta,
.mine-row__meta {
  gap: 16rpx;
  margin-top: 18rpx;
  color: #52607b;
  font-size: 27rpx;
  line-height: 1.2;
}

.task-main__desc {
  display: block;
  margin-top: 18rpx;
  color: #53617c;
  font-size: 27rpx;
  line-height: 1.45;
}

.state {
  font-weight: 900;
}

.state--green {
  color: $teacher-mobile-primary-dark;
}

.state--orange {
  color: #ff5f15;
}

.divider {
  color: #a9b2c2;
}

.task-actions {
  justify-content: flex-end;
  gap: 24rpx;
  margin-top: 34rpx;
}

.task-actions__primary,
.task-actions__outline {
  width: 184rpx;
  height: 62rpx;
  font-size: 28rpx;
}

.recommend-row {
  align-items: flex-start;
  gap: 26rpx;
  padding: 30rpx 0;
  border-bottom: 1rpx solid #e7ecf4;
}

.recommend-row:last-child {
  padding-bottom: 0;
  border-bottom: 0;
}

.recommend-row__body {
  min-width: 0;
  flex: 1;
}

.recommend-row__title {
  font-size: 30rpx;
}

.recommend-row__meta {
  display: block;
  margin-top: 16rpx;
  color: #52607a;
  font-size: 25rpx;
  line-height: 1.45;
}

.recommend-row__reason {
  display: inline-flex;
  margin-top: 14rpx;
  padding: 6rpx 12rpx;
  border-radius: 8rpx;
  font-size: 24rpx;
  font-weight: 800;
  line-height: 1.25;
}

.recommend-row__reason--green {
  background: #eafff2;
  color: #0aa953;
}

.recommend-row__reason--blue {
  background: #edf4ff;
  color: #2879ed;
}

.recommend-row__actions {
  justify-content: flex-end;
  gap: 16rpx;
  margin-top: 22rpx;
}

.recommend-row__button {
  min-width: 138rpx;
  height: 54rpx;
  padding: 0 18rpx;
  font-size: 25rpx;
}

.recommend-row__button--muted {
  border-color: #d7dde8;
  color: #59657b;
}

.mine-row {
  gap: 20rpx;
  padding: 24rpx 0;
  border-bottom: 1rpx solid #e7ecf4;
}

.mine-row:last-child {
  padding-bottom: 0;
  border-bottom: 0;
}

.mine-row__body {
  min-width: 0;
  flex: 1;
}

.mine-row__title {
  font-size: 29rpx;
}

.mine-row__meta {
  margin-top: 14rpx;
  font-size: 24rpx;
}

.mine-row__button {
  width: 138rpx;
  height: 54rpx;
  font-size: 25rpx;
}

.row-arrow {
  width: 18rpx;
  height: 18rpx;
  border-top: 5rpx solid #9aa3b3;
  border-right: 5rpx solid #9aa3b3;
  transform: rotate(45deg);
}

.need-card {
  gap: 20rpx;
  margin-bottom: 10rpx;
}

.need-card__icon {
  position: relative;
  width: 76rpx;
  height: 76rpx;
  flex: 0 0 auto;
  border-radius: 50%;
  background: #e8fff0;
}

.need-card__plane {
  position: absolute;
  top: 21rpx;
  left: 18rpx;
  width: 42rpx;
  height: 34rpx;
  background: $teacher-mobile-primary;
  clip-path: polygon(0 42%, 100% 0, 72% 100%, 48% 66%, 24% 82%);
}

.need-card__copy {
  min-width: 0;
  flex: 1;
}

.need-card__title {
  font-size: 30rpx;
}

.need-card__desc {
  display: block;
  margin-top: 8rpx;
  color: #53617c;
  font-size: 24rpx;
  line-height: 1.45;
}

.need-card__button {
  width: 168rpx;
  height: 62rpx;
  flex: 0 0 auto;
  font-size: 26rpx;
}

.training-icon {
  position: relative;
  width: 108rpx;
  height: 108rpx;
  flex: 0 0 auto;
  border-radius: 22rpx;
  background: #eafff2;
  color: $teacher-mobile-primary;
}

.training-icon--blue,
.training-icon--school {
  background: #edf4ff;
  color: #377cff;
}

.training-icon--purple,
.training-icon--note {
  background: #f0e9ff;
  color: #8d59f5;
}

.training-icon__shape {
  position: absolute;
}

.training-icon--book .training-icon__shape {
  top: 28rpx;
  left: 25rpx;
  width: 58rpx;
  height: 48rpx;
  background: currentColor;
  clip-path: polygon(0 8%, 44% 0, 44% 92%, 0 100%, 0 8%, 56% 0, 100% 8%, 100% 100%, 56% 92%);
}

.training-icon--screen .training-icon__shape {
  top: 27rpx;
  left: 22rpx;
  width: 64rpx;
  height: 44rpx;
  border-radius: 8rpx;
  background: currentColor;
}

.training-icon--screen .training-icon__shape::after {
  position: absolute;
  bottom: -18rpx;
  left: 19rpx;
  width: 28rpx;
  height: 16rpx;
  border-bottom: 8rpx solid currentColor;
  border-left: 7rpx solid transparent;
  border-right: 7rpx solid transparent;
  content: '';
}

.training-icon--school .training-icon__shape {
  top: 22rpx;
  left: 22rpx;
  width: 64rpx;
  height: 58rpx;
  background: currentColor;
  clip-path: polygon(50% 0, 100% 32%, 88% 32%, 88% 100%, 12% 100%, 12% 32%, 0 32%);
}

.training-icon--note .training-icon__shape {
  top: 22rpx;
  left: 27rpx;
  width: 54rpx;
  height: 64rpx;
  border-radius: 8rpx;
  background: currentColor;
}

@media (max-width: 374px) {
  .hero,
  .content {
    padding-right: 22rpx;
    padding-left: 22rpx;
  }

  .hero__copy {
    padding-left: 86rpx;
  }

  .hero-art {
    right: 18rpx;
    transform: scale(0.86);
    transform-origin: top right;
  }

  .task-card,
  .section-card,
  .need-card {
    padding: 24rpx;
  }

  .task-actions {
    gap: 16rpx;
  }

  .recommend-row__actions {
    flex-wrap: wrap;
  }

  .mine-row__button,
  .need-card__button {
    width: 132rpx;
    font-size: 24rpx;
  }
}
</style>
