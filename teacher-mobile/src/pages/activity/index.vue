<script setup lang="ts">
import MobileTabBar from '../../components/MobileTabBar.vue'

const reflectionBasis = [
  { label: '课堂报告', icon: 'book' },
  { label: '成绩分析', icon: 'chart' },
  { label: '评价分析', icon: 'star' },
]

const activities = [
  {
    tag: '培训进修',
    title: '申请培训',
    desc: '系统根据能力画像推荐 2 个培训资源，可报名参加，也可直接学习',
    note: '不满足需求时，可提交培训需求',
    action: '查看培训',
    tone: 'blue',
  },
  {
    tag: '年度要求',
    title: '企业实践',
    desc: '本年度已记录 18 / 30 天，还差 12 天，可继续记录或申请新的实践',
    note: '已完成部分会自动沉淀到成长档案',
    action: '记录实践',
    tone: 'orange',
  },
  {
    tag: '虚拟教研',
    title: '参与虚拟教研',
    desc: '1 个教研室邀请，2 项个人贡献待确认，支持腾讯会议过程记录整理',
    note: '系统可自动整理纪要与成果资料',
    action: '查看教研室',
    tone: 'green',
  },
]

const recentActivities = [
  {
    title: '已保存一篇教学反思',
    desc: '《智能制造基础》第 5 次课后反思已保存草稿',
    time: '今天 09:20',
    tone: 'purple',
  },
  {
    title: '培训学习记录已更新',
    desc: '《数字化教学能力提升》学习记录已更新',
    time: '昨天 16:45',
    tone: 'blue',
  },
  {
    title: '企业实践日志已记录',
    desc: '智能制造企业实践新增 1 条过程记录',
    time: '03-18 10:30',
    tone: 'orange',
  },
]
</script>

<template>
  <view class="activity-page">
    <view class="system-status" aria-hidden="true">
      <text class="system-status__time">9:41</text>
      <view class="system-status__icons">
        <view class="status-signal"></view>
        <view class="status-wifi"></view>
        <view class="status-battery"></view>
      </view>
    </view>

    <view class="page-head">
      <view class="page-head__copy">
        <text class="page-head__title">活动</text>
        <text class="page-head__subtitle">选择一种成长活动，AI 会帮您整理过程记录</text>
      </view>
      <button class="notice-button" aria-label="消息通知">
        <view class="notice-button__bell">
          <view class="notice-button__badge">5</view>
        </view>
      </button>
    </view>

    <view class="teacher-card">
      <view class="seed-mark">
        <view class="seed-mark__stem"></view>
      </view>
      <view class="teacher-card__body">
        <view class="teacher-card__line">
          <text class="teacher-card__name">林老师</text>
          <text class="teacher-card__sep">|</text>
          <text>智能制造学院</text>
          <text class="teacher-card__sep">|</text>
          <text>讲师</text>
        </view>
        <view class="teacher-card__line teacher-card__line--sub">
          <text>2026 年度发展周期</text>
          <text class="teacher-card__sep">|</text>
          <text>聘期第 2 年</text>
        </view>
      </view>
      <view class="chevron"></view>
    </view>

    <view class="section-card start-card">
      <view class="section-card__head">
        <text class="section-title">今日可开始</text>
        <view class="ready-note">
          <text>系统已准备好开始依据</text>
          <text class="ready-note__icon">i</text>
        </view>
      </view>

      <view class="start-card__content">
        <view class="reflection-art">
          <view class="reflection-art__paper"></view>
          <view class="reflection-art__pen"></view>
          <view class="reflection-art__spark reflection-art__spark--one"></view>
          <view class="reflection-art__spark reflection-art__spark--two"></view>
        </view>
        <view class="start-card__main">
          <text class="tag tag--purple">教学反思</text>
          <text class="start-card__title">我要进行教学反思</text>
          <text class="start-card__desc">可基于课堂报告、成绩报告、评价报告开始，也可录制课堂音频、上传教学资料或直接与 AI 对话开始</text>
          <view class="basis-list">
            <view v-for="item in reflectionBasis" :key="item.label" class="basis-pill">
              <view class="basis-pill__icon" :class="`basis-pill__icon--${item.icon}`"></view>
              <text>{{ item.label }}</text>
            </view>
          </view>
        </view>
      </view>

      <button class="primary-action">开始反思</button>
    </view>

    <view class="section-card activity-card">
      <text class="section-title">成长活动</text>
      <view v-for="item in activities" :key="item.title" class="activity-row">
        <view class="activity-visual" :class="`activity-visual--${item.tone}`">
          <view class="activity-visual__shape"></view>
        </view>
        <view class="activity-row__body">
          <text class="tag" :class="`tag--${item.tone}`">{{ item.tag }}</text>
          <text class="activity-row__title">{{ item.title }}</text>
          <text class="activity-row__desc">{{ item.desc }}</text>
          <view class="activity-row__note">
            <view class="note-icon" :class="`note-icon--${item.tone}`"></view>
            <text>{{ item.note }}</text>
          </view>
        </view>
        <button class="outline-action">
          <text>{{ item.action }}</text>
          <view class="outline-action__arrow"></view>
        </button>
      </view>
    </view>

    <view class="section-card recent-card">
      <view class="section-card__head">
        <text class="section-title">最近活动</text>
        <button class="all-link">
          <text>全部</text>
          <view class="all-link__arrow"></view>
        </button>
      </view>
      <view v-for="item in recentActivities" :key="item.title" class="recent-row">
        <view class="recent-icon" :class="`recent-icon--${item.tone}`"></view>
        <view class="recent-row__body">
          <text class="recent-row__title">{{ item.title }}</text>
          <text class="recent-row__desc">{{ item.desc }}</text>
        </view>
        <text class="recent-row__time">{{ item.time }}</text>
      </view>
    </view>

    <MobileTabBar active="activity" />
  </view>
</template>

<style lang="scss" scoped>
@import '../../styles/tokens.scss';

.activity-page {
  min-height: 100vh;
  padding: calc(var(--status-bar-height) + 16rpx) 28rpx calc(150rpx + env(safe-area-inset-bottom));
  background:
    radial-gradient(circle at 16% 2%, rgba(216, 252, 234, 0.72), transparent 30%),
    linear-gradient(180deg, #fbfffd 0%, #f7fbff 48%, #f5f9ff 100%);
  color: $teacher-mobile-text-primary;
}

.system-status,
.system-status__icons,
.page-head,
.teacher-card,
.section-card__head,
.start-card__content,
.basis-list,
.basis-pill,
.activity-row,
.activity-row__note,
.outline-action,
.recent-row,
.all-link {
  display: flex;
  align-items: center;
}

.system-status {
  height: 42rpx;
  justify-content: space-between;
  padding: 0 18rpx;
}

.system-status__time {
  color: #050812;
  font-size: 30rpx;
  font-weight: 900;
  line-height: 1;
}

.system-status__icons {
  gap: 14rpx;
}

.status-signal {
  width: 38rpx;
  height: 26rpx;
  background: #050812;
  clip-path: polygon(0 70%, 18% 70%, 18% 100%, 0 100%, 0 70%, 27% 52%, 45% 52%, 45% 100%, 27% 100%, 27% 52%, 54% 32%, 72% 32%, 72% 100%, 54% 100%, 54% 32%, 82% 10%, 100% 10%, 100% 100%, 82% 100%, 82% 10%);
}

.status-wifi {
  position: relative;
  width: 36rpx;
  height: 26rpx;
  border: 8rpx solid #050812;
  border-color: #050812 transparent transparent;
  border-radius: 50%;
}

.status-wifi::after {
  position: absolute;
  right: 7rpx;
  bottom: -9rpx;
  width: 9rpx;
  height: 9rpx;
  border-radius: 50%;
  background: #050812;
  content: '';
}

.status-battery {
  position: relative;
  width: 52rpx;
  height: 26rpx;
  border: 4rpx solid #050812;
  border-radius: 8rpx;
}

.status-battery::before {
  position: absolute;
  top: 4rpx;
  left: 4rpx;
  width: 38rpx;
  height: 10rpx;
  border-radius: 4rpx;
  background: #050812;
  content: '';
}

.status-battery::after {
  position: absolute;
  top: 6rpx;
  right: -9rpx;
  width: 5rpx;
  height: 12rpx;
  border-radius: 0 4rpx 4rpx 0;
  background: #050812;
  content: '';
}

.page-head {
  justify-content: space-between;
  gap: 30rpx;
  padding: 22rpx 12rpx 18rpx;
}

.page-head__copy {
  min-width: 0;
  flex: 1;
}

.page-head__title {
  display: block;
  color: #080d1f;
  font-size: 62rpx;
  font-weight: 900;
  letter-spacing: 0;
  line-height: 1.04;
}

.page-head__subtitle {
  display: block;
  margin-top: 8rpx;
  color: #24314d;
  font-size: 27rpx;
  line-height: 1.35;
}

.notice-button {
  position: relative;
  width: 88rpx;
  height: 88rpx;
  border: 0;
  background: transparent;
}

.notice-button__bell {
  position: absolute;
  right: 8rpx;
  bottom: 8rpx;
  width: 58rpx;
  height: 58rpx;
  border: 6rpx solid #0d1430;
  border-top-color: transparent;
  border-radius: 50% 50% 20rpx 20rpx;
}

.notice-button__bell::before {
  position: absolute;
  top: -13rpx;
  left: 17rpx;
  width: 18rpx;
  height: 12rpx;
  border: 5rpx solid #0d1430;
  border-bottom: 0;
  border-radius: 18rpx 18rpx 0 0;
  content: '';
}

.notice-button__bell::after {
  position: absolute;
  right: 14rpx;
  bottom: -13rpx;
  width: 20rpx;
  height: 5rpx;
  border-radius: 5rpx;
  background: #0d1430;
  content: '';
}

.notice-button__badge {
  position: absolute;
  top: -28rpx;
  right: -23rpx;
  display: flex;
  width: 50rpx;
  height: 50rpx;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #ff1f39;
  color: #fff;
  font-size: 28rpx;
  font-weight: 900;
}

.teacher-card {
  min-height: 82rpx;
  gap: 20rpx;
  margin: 0 4rpx 18rpx;
  padding: 14rpx 30rpx 14rpx 22rpx;
  border: 1rpx solid rgba(198, 243, 219, 0.92);
  border-radius: 40rpx;
  background: linear-gradient(100deg, rgba(235, 255, 246, 0.96), rgba(231, 251, 241, 0.78));
  box-shadow: 0 20rpx 48rpx rgba(25, 103, 69, 0.06);
}

.seed-mark {
  position: relative;
  display: flex;
  width: 58rpx;
  height: 58rpx;
  align-items: center;
  justify-content: center;
  flex: 0 0 58rpx;
  border-radius: 50%;
  background: #fff;
}

.seed-mark::before,
.seed-mark::after {
  position: absolute;
  top: 20rpx;
  width: 22rpx;
  height: 14rpx;
  border-radius: 28rpx 28rpx 4rpx 28rpx;
  background: $teacher-mobile-primary;
  content: '';
}

.seed-mark::before {
  left: 12rpx;
  transform: rotate(28deg);
}

.seed-mark::after {
  right: 11rpx;
  transform: rotate(-38deg);
}

.seed-mark__stem {
  width: 4rpx;
  height: 34rpx;
  border-radius: 6rpx;
  background: $teacher-mobile-primary;
  transform: translateY(9rpx);
}

.teacher-card__body {
  min-width: 0;
  flex: 1;
}

.teacher-card__line {
  display: flex;
  overflow: hidden;
  align-items: center;
  color: #242d46;
  font-size: 25rpx;
  line-height: 1.36;
  white-space: nowrap;
}

.teacher-card__name {
  color: #10172d;
  font-weight: 900;
}

.teacher-card__line--sub {
  margin-top: 2rpx;
  font-size: 26rpx;
  letter-spacing: 1rpx;
}

.teacher-card__sep {
  margin: 0 14rpx;
  color: #1d2742;
}

.chevron,
.outline-action__arrow,
.all-link__arrow {
  width: 22rpx;
  height: 22rpx;
  border-top: 5rpx solid currentColor;
  border-right: 5rpx solid currentColor;
  transform: rotate(45deg);
}

.chevron {
  color: $teacher-mobile-primary;
}

.section-card {
  margin-top: 16rpx;
  padding: 24rpx 28rpx;
  border: 1rpx solid rgba(231, 236, 246, 0.95);
  border-radius: 32rpx;
  background: rgba(255, 255, 255, 0.94);
  box-shadow: 0 22rpx 52rpx rgba(35, 51, 87, 0.07);
}

.section-card__head {
  justify-content: space-between;
  gap: 20rpx;
}

.section-title {
  color: $teacher-mobile-text-primary;
  font-size: 36rpx;
  font-weight: 900;
  line-height: 1.2;
}

.ready-note {
  display: flex;
  align-items: center;
  gap: 10rpx;
  color: #273451;
  font-size: 24rpx;
  white-space: nowrap;
}

.ready-note__icon {
  display: flex;
  width: 30rpx;
  height: 30rpx;
  align-items: center;
  justify-content: center;
  border: 4rpx solid $teacher-mobile-primary;
  border-radius: 50%;
  color: $teacher-mobile-primary;
  font-size: 20rpx;
  font-weight: 900;
  line-height: 1;
}

.start-card {
  position: relative;
  min-height: 204rpx;
  padding-bottom: 22rpx;
}

.start-card__content {
  align-items: flex-start;
  gap: 30rpx;
  margin-top: 22rpx;
}

.reflection-art {
  position: relative;
  width: 108rpx;
  height: 108rpx;
  flex: 0 0 108rpx;
  border-radius: 26rpx;
  background: linear-gradient(145deg, #f2ecff, #fbf8ff);
}

.reflection-art__paper {
  position: absolute;
  top: 34rpx;
  left: 34rpx;
  width: 52rpx;
  height: 56rpx;
  border-radius: 12rpx;
  background: linear-gradient(135deg, #b992ff, #8f62f4);
}

.reflection-art__paper::before,
.reflection-art__paper::after {
  position: absolute;
  left: 22rpx;
  width: 34rpx;
  height: 6rpx;
  border-radius: 999rpx;
  background: #fff;
  content: '';
  opacity: 0.86;
}

.reflection-art__paper::before {
  top: 24rpx;
}

.reflection-art__paper::after {
  top: 45rpx;
}

.reflection-art__pen {
  position: absolute;
  right: 26rpx;
  bottom: 29rpx;
  width: 20rpx;
  height: 54rpx;
  border-radius: 10rpx;
  background: #8f62f4;
  transform: rotate(44deg);
}

.reflection-art__spark {
  position: absolute;
  width: 22rpx;
  height: 22rpx;
  background: #9a6cff;
  clip-path: polygon(50% 0, 62% 38%, 100% 50%, 62% 62%, 50% 100%, 38% 62%, 0 50%, 38% 38%);
}

.reflection-art__spark--one {
  top: 34rpx;
  right: 34rpx;
}

.reflection-art__spark--two {
  bottom: 54rpx;
  left: 28rpx;
  width: 16rpx;
  height: 16rpx;
}

.start-card__main {
  min-width: 0;
  flex: 1;
}

.tag {
  display: inline-flex;
  width: fit-content;
  height: 30rpx;
  align-items: center;
  padding: 0 14rpx;
  border-radius: 10rpx;
  font-size: 22rpx;
  font-weight: 900;
  line-height: 30rpx;
}

.tag--purple {
  background: #efe7ff;
  color: #7a49f5;
}

.tag--blue {
  background: #e8f1ff;
  color: #1f75ff;
}

.tag--orange {
  background: #fff0e6;
  color: #ff6c1a;
}

.tag--green {
  background: #e7faef;
  color: #13a95b;
}

.start-card__title {
  display: block;
  margin-top: 12rpx;
  color: #12182a;
  font-size: 32rpx;
  font-weight: 900;
  line-height: 1.15;
}

.start-card__desc {
  display: block;
  margin-top: 10rpx;
  color: #35425e;
  font-size: 21rpx;
  line-height: 1.28;
}

.basis-list {
  flex-wrap: wrap;
  gap: 8rpx;
  margin-top: 12rpx;
  padding-right: 132rpx;
}

.basis-pill {
  gap: 8rpx;
  height: 34rpx;
  padding: 0 12rpx;
  border-radius: 12rpx;
  background: #f3efff;
  color: #4d43aa;
  font-size: 20rpx;
  font-weight: 800;
}

.basis-pill__icon {
  width: 22rpx;
  height: 22rpx;
  border: 4rpx solid currentColor;
  border-radius: 6rpx;
}

.basis-pill__icon--chart {
  border: 0;
  border-bottom: 4rpx solid currentColor;
  background: linear-gradient(90deg, currentColor 0 22%, transparent 22% 38%, currentColor 38% 60%, transparent 60% 76%, currentColor 76% 100%);
}

.basis-pill__icon--star {
  border: 0;
  background: currentColor;
  clip-path: polygon(50% 0, 61% 36%, 100% 36%, 69% 58%, 81% 95%, 50% 72%, 19% 95%, 31% 58%, 0 36%, 39% 36%);
}

.primary-action {
  position: absolute;
  right: 28rpx;
  bottom: 24rpx;
  min-width: 132rpx;
  height: 48rpx;
  border: 0;
  border-radius: 14rpx;
  background: linear-gradient(135deg, #16c96c, #02ad53);
  box-shadow: 0 18rpx 32rpx rgba(3, 177, 84, 0.22);
  color: #fff;
  font-size: 26rpx;
  font-weight: 900;
  line-height: 48rpx;
}

.activity-card {
  padding-top: 38rpx;
}

.activity-row {
  gap: 28rpx;
  min-height: 104rpx;
  padding: 12rpx 0;
  border-bottom: 1rpx solid $teacher-mobile-card-border;
}

.activity-row:last-child {
  padding-bottom: 0;
  border-bottom: 0;
}

.activity-visual {
  display: flex;
  width: 78rpx;
  height: 78rpx;
  align-items: center;
  justify-content: center;
  flex: 0 0 78rpx;
  border: 1rpx solid rgba(226, 235, 249, 0.92);
  border-radius: 22rpx;
}

.activity-visual--blue {
  background: linear-gradient(145deg, #eef6ff, #f8fbff);
  color: $teacher-mobile-info;
}

.activity-visual--orange {
  background: linear-gradient(145deg, #fff1e8, #fff9f5);
  color: $teacher-mobile-warning;
}

.activity-visual--green {
  background: linear-gradient(145deg, #ecfff5, #f8fffb);
  color: $teacher-mobile-primary;
}

.activity-visual__shape {
  width: 50rpx;
  height: 40rpx;
  border-radius: 12rpx;
  background: currentColor;
}

.activity-visual--blue .activity-visual__shape {
  clip-path: polygon(50% 0, 100% 34%, 84% 45%, 84% 78%, 50% 100%, 16% 78%, 16% 45%, 0 34%);
}

.activity-visual--orange .activity-visual__shape {
  position: relative;
  height: 68rpx;
  border-radius: 10rpx;
}

.activity-visual--orange .activity-visual__shape::before {
  position: absolute;
  top: -20rpx;
  left: 18rpx;
  width: 34rpx;
  height: 22rpx;
  border: 8rpx solid currentColor;
  border-bottom: 0;
  border-radius: 12rpx 12rpx 0 0;
  content: '';
}

.activity-visual--green .activity-visual__shape {
  position: relative;
  width: 72rpx;
  height: 72rpx;
  border-radius: 50%;
}

.activity-visual--green .activity-visual__shape::before,
.activity-visual--green .activity-visual__shape::after {
  position: absolute;
  top: 15rpx;
  width: 26rpx;
  height: 26rpx;
  border-radius: 50%;
  background: rgba(14, 193, 101, 0.55);
  content: '';
}

.activity-visual--green .activity-visual__shape::before {
  left: -20rpx;
}

.activity-visual--green .activity-visual__shape::after {
  right: -20rpx;
}

.activity-row__body {
  min-width: 0;
  flex: 1;
}

.activity-row__title {
  display: block;
  margin-top: 8rpx;
  color: #12182a;
  font-size: 25rpx;
  font-weight: 900;
  line-height: 1.2;
}

.activity-row__desc {
  display: block;
  margin-top: 6rpx;
  color: #35425e;
  font-size: 20rpx;
  line-height: 1.22;
}

.activity-row__note {
  gap: 10rpx;
  margin-top: 6rpx;
  color: #7c879d;
  overflow: hidden;
  font-size: 18rpx;
  line-height: 1.3;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.note-icon {
  width: 22rpx;
  height: 22rpx;
  flex: 0 0 22rpx;
  border: 4rpx solid currentColor;
  border-radius: 50%;
  color: #93a0b6;
}

.note-icon--orange {
  border-radius: 8rpx;
}

.note-icon--green {
  border-radius: 4rpx;
}

.outline-action {
  gap: 8rpx;
  min-width: 124rpx;
  height: 44rpx;
  justify-content: center;
  flex: 0 0 auto;
  border: 2rpx solid $teacher-mobile-primary;
  border-radius: 14rpx;
  background: #fff;
  color: $teacher-mobile-primary-dark;
  font-size: 22rpx;
  font-weight: 900;
  line-height: 44rpx;
  white-space: nowrap;
}

.outline-action__arrow {
  width: 16rpx;
  height: 16rpx;
  border-width: 4rpx;
}

.recent-card {
  margin-bottom: 0;
}

.all-link {
  gap: 8rpx;
  border: 0;
  background: transparent;
  color: $teacher-mobile-primary-dark;
  font-size: 31rpx;
  font-weight: 900;
  line-height: 1;
}

.all-link__arrow {
  width: 18rpx;
  height: 18rpx;
  border-width: 5rpx;
}

.recent-row {
  gap: 26rpx;
  padding: 24rpx 0;
  border-bottom: 1rpx solid $teacher-mobile-card-border;
}

.recent-row:last-child {
  padding-bottom: 0;
  border-bottom: 0;
}

.recent-icon {
  width: 58rpx;
  height: 58rpx;
  flex: 0 0 58rpx;
  border-radius: 14rpx;
}

.recent-icon--purple {
  background: linear-gradient(145deg, #f1ecff, #fbf8ff);
}

.recent-icon--blue {
  background: linear-gradient(145deg, #eef6ff, #f8fbff);
}

.recent-icon--orange {
  background: linear-gradient(145deg, #fff1e8, #fff9f5);
}

.recent-icon::before {
  display: block;
  width: 34rpx;
  height: 34rpx;
  margin: 12rpx;
  border-radius: 8rpx;
  background: currentColor;
  content: '';
}

.recent-icon--purple::before {
  color: #9265f5;
}

.recent-icon--blue::before {
  color: $teacher-mobile-info;
  clip-path: polygon(50% 0, 100% 34%, 84% 45%, 84% 78%, 50% 100%, 16% 78%, 16% 45%, 0 34%);
}

.recent-icon--orange::before {
  color: $teacher-mobile-warning;
}

.recent-row__body {
  min-width: 0;
  flex: 1;
}

.recent-row__title {
  display: block;
  overflow: hidden;
  color: #12182a;
  font-size: 32rpx;
  font-weight: 900;
  line-height: 1.2;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.recent-row__desc {
  display: block;
  overflow: hidden;
  margin-top: 8rpx;
  color: #35425e;
  font-size: 27rpx;
  line-height: 1.2;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.recent-row__time {
  color: #2d3853;
  font-size: 29rpx;
  line-height: 1.2;
  white-space: nowrap;
}

@media (max-width: 374px) {
  .activity-page {
    padding-right: 22rpx;
    padding-left: 22rpx;
  }

  .page-head__title {
    font-size: 62rpx;
  }

  .start-card__content {
    gap: 24rpx;
  }

  .reflection-art {
    width: 128rpx;
    height: 128rpx;
    flex-basis: 128rpx;
  }

  .basis-list {
    padding-right: 0;
  }

  .primary-action {
    position: static;
    width: 100%;
    margin-top: 24rpx;
  }

  .activity-row {
    gap: 20rpx;
  }

  .outline-action {
    min-width: 132rpx;
    font-size: 24rpx;
  }
}
</style>
