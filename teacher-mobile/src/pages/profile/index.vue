<script setup lang="ts">
import MobileActionButton from '../../components/MobileActionButton.vue'
import MobileCard from '../../components/MobileCard.vue'
import MobileIcon from '../../components/MobileIcon.vue'
import MobilePageShell from '../../components/MobilePageShell.vue'

const abilityItems = [
  { label: '教学', value: 88, tone: 'green', icon: 'book' },
  { label: '教研', value: 68, tone: 'blue', icon: 'cap' },
  { label: '实践', value: 79, tone: 'teal', icon: 'case' },
  { label: '服务', value: 72, tone: 'orange', icon: 'heart' },
] as const

const archiveMenus = [
  { title: '已入档记录', desc: '查看已确认并入档的个人记录', tone: 'green', icon: 'file', route: '/pages/archive/index' },
  {
    title: '信息更正进度',
    desc: '查看已提交更正的处理进度',
    tone: 'blue',
    icon: 'clock',
    route: '/pages/archive/correction/progress/index?recordId=certificate-digital-literacy&status=pending-verify',
  },
  { title: '这些记录会怎么用', desc: '了解画像、聘期要求和报告会如何使用记录', tone: 'orange', icon: 'help', route: '/pages/archive/record-query/index' },
] as const

const serviceMenus = [
  { title: '账号与安全', tone: 'green', icon: 'shield' },
  { title: 'AI 辅助说明', tone: 'purple', icon: 'bot' },
  { title: '帮助与反馈', tone: 'blue', icon: 'service' },
  { title: '关于平台', tone: 'gray', icon: 'info' },
] as const

const abilityProgressColors = {
  green: '#0ec165',
  blue: '#1776ee',
  teal: '#12b8a6',
  orange: '#ff7b18',
} as const

const menuIconNameMap = {
  shield: 'secured',
  bot: 'bot',
  service: 'service',
  info: 'info',
} as const

function goArchiveMenu(route: string) {
  uni.navigateTo({ url: route })
}

function goAbilityProfile() {
  uni.navigateTo({ url: '/pages/profile/ability-profile/index' })
}

function goDevelopmentReport() {
  uni.navigateTo({ url: '/pages/profile/development-report/index' })
}

function showServiceFeedback(target: string) {
  uni.showToast({
    title: `${target}为本地模拟入口，暂未接入独立页面`,
    icon: 'none',
  })
}
</script>

<template>
  <MobilePageShell class="profile-page" active="profile">
    <view class="page-head">
      <text class="page-head__title">我的</text>
      <button class="setting-button" aria-label="设置" @tap="showServiceFeedback('设置')">
        <MobileIcon class="setting-button__icon" name="setting" tone="dark" size="md" shape="none" />
      </button>
    </view>

    <MobileCard class="profile-card">
      <view class="avatar">
        <view class="avatar__hair"></view>
        <view class="avatar__face">
          <view class="avatar__glasses"></view>
        </view>
        <view class="avatar__shirt"></view>
        <view class="avatar__seed"></view>
      </view>
      <view class="profile-card__body">
        <text class="teacher-name">林老师</text>
        <text class="teacher-meta">智能制造学院 ｜ 讲师</text>
        <text class="teacher-meta teacher-meta--period">2026 年度发展周期 ｜ 聘期第 2 年</text>
      </view>
      <MobileActionButton class="profile-link" variant="link" arrow @tap="showServiceFeedback('个人资料')">查看个人资料</MobileActionButton>
    </MobileCard>

    <MobileCard class="ability-card">
      <text class="section-title">我的能力画像</text>
      <view class="ability-index">
        <text>发展指数</text>
        <text class="ability-index__number">72</text>
        <text class="ability-index__sep">|</text>
        <text class="ability-index__level">胜任级</text>
      </view>
      <text class="ability-desc">教学方向依据较充分，企业实践方向还有记录待补充</text>
      <view class="ability-grid">
        <view v-for="item in abilityItems" :key="item.label" class="ability-item">
          <view class="ability-item__head">
            <MobileIcon class="ability-icon" :name="item.icon" :tone="item.tone" size="plain" shape="none" />
            <text>{{ item.label }} {{ item.value }}</text>
          </view>
          <wd-progress class="ability-progress" :percentage="item.value" :color="abilityProgressColors[item.tone]" hide-text />
        </view>
      </view>
      <MobileActionButton class="card-link" variant="link" arrow @tap="goAbilityProfile">查看画像</MobileActionButton>
    </MobileCard>

    <MobileCard class="report-card">
      <text class="section-title">我的发展报告</text>
      <view class="report-card__content">
        <MobileIcon class="report-visual" name="chart" tone="green" size="md" />
        <view class="report-card__body">
          <text class="report-title">2026 年度发展报告草稿已生成</text>
          <text class="report-desc">基于已入档记录整理，可查看后确认</text>
        </view>
      </view>
      <MobileActionButton class="card-link" variant="link" arrow @tap="goDevelopmentReport">查看报告</MobileActionButton>
    </MobileCard>

    <MobileCard class="menu-card">
      <text class="section-title">档案记录</text>
      <view v-for="item in archiveMenus" :key="item.title" class="menu-row" @tap="goArchiveMenu(item.route)">
        <MobileIcon class="menu-icon" :name="item.icon" :tone="item.tone" size="plain" />
        <view class="menu-row__body">
          <text class="menu-row__title">{{ item.title }}</text>
          <text class="menu-row__desc">{{ item.desc }}</text>
        </view>
        <wd-icon class="menu-row__arrow" name="chevron-right" size="28rpx" color="#8b94a5" />
      </view>
    </MobileCard>

    <MobileCard class="service-card">
      <text class="section-title">系统服务</text>
      <view v-for="item in serviceMenus" :key="item.title" class="service-row" @tap="showServiceFeedback(item.title)">
        <MobileIcon class="service-icon" :name="menuIconNameMap[item.icon]" :tone="item.tone" size="plain" shape="none" />
        <text class="service-row__title">{{ item.title }}</text>
        <wd-icon class="menu-row__arrow" name="chevron-right" size="28rpx" color="#8b94a5" />
      </view>
    </MobileCard>
  </MobilePageShell>
</template>

<style lang="scss" scoped>
@import '../../styles/tokens.scss';

.profile-page {
  --profile-green: #0ec165;

  min-height: 100vh;
  padding: calc(var(--status-bar-height) + 16rpx) 28rpx calc(150rpx + env(safe-area-inset-bottom));
  background:
    radial-gradient(circle at 14% 2%, rgba(226, 252, 239, 0.8), transparent 30%),
    linear-gradient(180deg, #fbfffd 0%, #f7fbff 50%, #f5f9ff 100%);
  color: $teacher-mobile-text-primary;
}

.page-head,
.profile-card,
.ability-index,
.ability-grid,
.ability-item__head,
.report-card__content,
.menu-row,
.service-row {
  display: flex;
  align-items: center;
}

.page-head {
  justify-content: space-between;
  padding: 28rpx 10rpx 22rpx;
}

.page-head__title {
  color: #080d1f;
  font-size: 68rpx;
  font-weight: 900;
  line-height: 1.04;
}

.setting-button {
  position: relative;
  width: 72rpx;
  height: 72rpx;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
}

.setting-button::after {
  display: none;
  border: 0;
}

.setting-button__icon {
  width: 72rpx;
  height: 72rpx;
}

.profile-card,
.ability-card,
.report-card,
.menu-card,
.service-card {
  margin-top: 16rpx;
  padding: 24rpx 32rpx;
}

.profile-card {
  position: relative;
  min-height: 162rpx;
  gap: 28rpx;
}

.avatar {
  position: relative;
  width: 112rpx;
  height: 112rpx;
  flex: 0 0 112rpx;
  overflow: visible;
  border-radius: 50%;
  background: linear-gradient(145deg, #bce1ff, #e9f6ff);
}

.avatar__face {
  position: absolute;
  top: 34rpx;
  left: 36rpx;
  width: 54rpx;
  height: 60rpx;
  border-radius: 22rpx 22rpx 28rpx 28rpx;
  background: #ffd0b4;
}

.avatar__hair {
  position: absolute;
  top: 21rpx;
  left: 28rpx;
  z-index: 1;
  width: 68rpx;
  height: 40rpx;
  border-radius: 40rpx 34rpx 18rpx 12rpx;
  background: #111827;
  transform: rotate(-8deg);
}

.avatar__glasses {
  position: absolute;
  top: 20rpx;
  left: 6rpx;
  width: 17rpx;
  height: 15rpx;
  border: 4rpx solid #1f2937;
  border-radius: 50%;
  box-shadow: 24rpx 0 0 -1rpx transparent, 28rpx 0 0 0 #1f2937;
}

.avatar__glasses::after {
  position: absolute;
  top: 3rpx;
  left: 18rpx;
  width: 14rpx;
  height: 4rpx;
  border-radius: 4rpx;
  background: #1f2937;
  content: '';
}

.avatar__shirt {
  position: absolute;
  right: 24rpx;
  bottom: 9rpx;
  left: 24rpx;
  height: 44rpx;
  border-radius: 38rpx 38rpx 0 0;
  background: #dceeff;
}

.avatar__seed {
  position: absolute;
  right: 0;
  bottom: 14rpx;
  width: 42rpx;
  height: 42rpx;
  border: 7rpx solid #fff;
  border-radius: 50%;
  background: $teacher-mobile-primary;
}

.avatar__seed::before,
.avatar__seed::after {
  position: absolute;
  top: 15rpx;
  width: 15rpx;
  height: 10rpx;
  border-radius: 14rpx 14rpx 2rpx 14rpx;
  background: #fff;
  content: '';
}

.avatar__seed::before {
  left: 8rpx;
  transform: rotate(28deg);
}

.avatar__seed::after {
  right: 7rpx;
  transform: rotate(-38deg);
}

.profile-card__body {
  min-width: 0;
  flex: 1;
  padding-bottom: 42rpx;
}

.teacher-name {
  display: block;
  color: #080d1f;
  font-size: 34rpx;
  font-weight: 900;
  line-height: 1.2;
}

.teacher-meta {
  display: block;
  margin-top: 14rpx;
  color: #2f3d5b;
  font-size: 25rpx;
  line-height: 1.2;
}

.teacher-meta--period {
  margin-top: 14rpx;
}

.profile-link,
.card-link {
  position: absolute;
  right: 32rpx;
  bottom: 22rpx;
  gap: 12rpx;
  color: $teacher-mobile-primary-dark;
  font-size: 26rpx;
  line-height: 1;
}

.section-title {
  display: block;
  color: #10172d;
  font-size: 40rpx;
  font-weight: 900;
  line-height: 1.2;
}

.ability-card,
.report-card {
  position: relative;
}

.ability-card .card-link {
  position: static;
  width: fit-content;
  margin-top: 18rpx;
  margin-left: auto;
}

.ability-index {
  gap: 16rpx;
  margin-top: 18rpx;
  color: #11182f;
  font-size: 27rpx;
  line-height: 1.2;
}

.ability-index__number,
.ability-index__level {
  color: $teacher-mobile-primary-dark;
  font-size: 32rpx;
  font-weight: 900;
}

.ability-index__sep {
  color: #9aa3b3;
}

.ability-desc {
  display: block;
  overflow: hidden;
  margin-top: 14rpx;
  color: #35425e;
  font-size: 24rpx;
  line-height: 1.28;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ability-grid {
  gap: 14rpx;
  margin-top: 18rpx;
  padding-right: 0;
}

.ability-item {
  min-width: 0;
  flex: 1;
  padding: 12rpx 10rpx;
  border-radius: 12rpx;
  background: rgba(246, 248, 252, 0.92);
}

.ability-item__head {
  gap: 9rpx;
  color: #11182f;
  font-size: 22rpx;
  font-weight: 800;
  line-height: 1.2;
  white-space: nowrap;
}

.ability-icon {
  width: 32rpx;
  height: 32rpx;
  flex: 0 0 32rpx;
}

.ability-progress {
  margin-top: 11rpx;
}

.ability-progress :deep(.wd-progress__outer) {
  height: 8rpx;
  background: #dfe5ee;
}

.ability-progress :deep(.wd-progress__inner) {
  border-radius: 999rpx;
}

.report-card {
  min-height: 134rpx;
}

.report-card__content {
  gap: 28rpx;
  margin-top: 20rpx;
  padding-right: 140rpx;
}

.report-visual {
  width: 82rpx;
  height: 82rpx;
  flex: 0 0 82rpx;
}

.report-card__body {
  min-width: 0;
  flex: 1;
}

.report-title {
  display: block;
  overflow: hidden;
  color: #10172d;
  font-size: 28rpx;
  font-weight: 900;
  line-height: 1.25;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.report-desc {
  display: block;
  overflow: hidden;
  margin-top: 12rpx;
  color: #35425e;
  font-size: 25rpx;
  line-height: 1.25;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.menu-card,
.service-card {
  padding-bottom: 10rpx;
}

.menu-row {
  gap: 22rpx;
  min-height: 58rpx;
  padding: 10rpx 0;
  border-bottom: 1rpx solid $teacher-mobile-card-border;
}

.menu-row:last-child,
.service-row:last-child {
  border-bottom: 0;
}

.menu-icon {
  width: 44rpx;
  height: 44rpx;
  flex: 0 0 44rpx;
}

.menu-row__body {
  min-width: 0;
  flex: 1;
}

.menu-row__title,
.service-row__title {
  display: block;
  color: #10172d;
  font-size: 25rpx;
  font-weight: 800;
  line-height: 1.2;
}

.menu-row__desc {
  display: block;
  overflow: hidden;
  margin-top: 8rpx;
  color: #526079;
  font-size: 21rpx;
  line-height: 1.2;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.menu-row__arrow {
  display: flex;
  width: 28rpx;
  height: 28rpx;
  align-items: center;
  justify-content: center;
  flex: 0 0 18rpx;
}

.service-row {
  gap: 22rpx;
  min-height: 50rpx;
  padding: 8rpx 0;
  border-bottom: 1rpx solid $teacher-mobile-card-border;
}

.service-icon {
  width: 30rpx;
  height: 30rpx;
  flex: 0 0 30rpx;
}

.service-row__title {
  flex: 1;
}

@media (max-width: 374px) {
  .profile-card,
  .ability-card,
  .report-card,
  .menu-card,
  .service-card {
    padding-right: 26rpx;
    padding-left: 26rpx;
  }

  .ability-grid {
    gap: 10rpx;
  }

  .ability-item {
    padding-right: 8rpx;
    padding-left: 8rpx;
  }

  .ability-item__head {
    font-size: 20rpx;
  }
}
</style>
