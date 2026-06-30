<script setup lang="ts">
const activities = [
  { tag: '培训进修', title: '申请培训', action: '查看培训' },
  { tag: '年度要求', title: '企业实践', action: '记录实践' },
  { tag: '虚拟教研', title: '参与虚拟教研', action: '查看教研室' },
]
</script>

<template>
  <view class="activity-page mobile-page">
    <view class="activity-page__head">
      <view>
        <text class="activity-page__title">活动</text>
        <text class="activity-page__subtitle">选择一种成长活动，AI 会帮您整理过程记录</text>
      </view>
      <wd-badge :model-value="5">
        <wd-icon name="notification" size="54rpx" />
      </wd-badge>
    </view>

    <view class="teacher-card">
      <view class="teacher-card__avatar">芽</view>
      <view class="teacher-card__content">
        <text class="teacher-card__name">林老师 ｜ 智能制造学院 ｜ 讲师</text>
        <text class="teacher-card__meta">2026 年度发展周期 ｜ 聘期第 2 年</text>
      </view>
      <wd-icon name="arrow-right" size="40rpx" color="#0EC165" />
    </view>

    <view class="mobile-card start-card">
      <view class="start-card__top">
        <text class="mobile-section-title">今日可开始</text>
        <text class="start-card__hint">系统已准备好开始依据</text>
      </view>
      <view class="start-card__body">
        <view class="start-card__art">反思</view>
        <view class="start-card__copy">
          <wd-tag custom-class="tag-purple">教学反思</wd-tag>
          <text class="start-card__title">我要进行教学反思</text>
          <text class="start-card__desc">可基于课堂报告、成绩报告、评价报告开始，也可录制课堂音频、上传教学资料或直接与 AI 对话开始</text>
        </view>
      </view>
      <wd-button custom-class="start-card__button" type="success">开始反思</wd-button>
    </view>

    <view class="mobile-card activity-list">
      <text class="mobile-section-title">成长活动</text>
      <view v-for="item in activities" :key="item.title" class="activity-row">
        <view class="activity-row__icon"></view>
        <view class="activity-row__content">
          <wd-tag custom-class="tag-blue">{{ item.tag }}</wd-tag>
          <text class="activity-row__title">{{ item.title }}</text>
          <text class="activity-row__desc">系统根据成长档案和能力画像，推荐可开始的成长活动</text>
        </view>
        <wd-button custom-class="activity-row__button" plain type="success" size="small">{{ item.action }}</wd-button>
      </view>
    </view>

    <MobileTabBar active="activity" />
  </view>
</template>

<style lang="scss" scoped>
@import '../../styles/tokens.scss';
@import '../../styles/mobile.scss';

.activity-page__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 22rpx 16rpx 28rpx;
}

.activity-page__title {
  display: block;
  color: $teacher-mobile-text-primary;
  font-size: 58rpx;
  font-weight: 900;
  line-height: 1.08;
}

.activity-page__subtitle {
  display: block;
  margin-top: 12rpx;
  color: #24314d;
  font-size: 26rpx;
  line-height: 1.35;
}

.teacher-card {
  display: flex;
  min-height: 112rpx;
  align-items: center;
  gap: 22rpx;
  margin-bottom: 22rpx;
  padding: 20rpx 24rpx;
  border: 1rpx solid rgba(198, 243, 219, 0.92);
  border-radius: 40rpx;
  background: linear-gradient(100deg, rgba(235, 255, 246, 0.96), rgba(231, 251, 241, 0.8));
}

.teacher-card__avatar {
  display: flex;
  width: 76rpx;
  height: 76rpx;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #fff;
  color: $teacher-mobile-primary;
  font-size: 24rpx;
  font-weight: 900;
}

.teacher-card__content {
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
}

.teacher-card__name,
.teacher-card__meta {
  overflow: hidden;
  color: #26314e;
  font-size: 28rpx;
  line-height: 1.45;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.teacher-card__name {
  color: $teacher-mobile-text-primary;
  font-weight: 900;
}

.start-card,
.activity-list {
  padding: 32rpx 28rpx;
}

.start-card__top,
.start-card__body,
.activity-row {
  display: flex;
  align-items: center;
}

.start-card__top {
  justify-content: space-between;
  gap: 20rpx;
}

.start-card__hint {
  color: #273451;
  font-size: 24rpx;
}

.start-card__body {
  gap: 26rpx;
  margin-top: 30rpx;
}

.start-card__art,
.activity-row__icon {
  display: flex;
  width: 132rpx;
  height: 132rpx;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  border-radius: 28rpx;
  background: linear-gradient(145deg, #f2ecff, #faf7ff);
  color: #8d64f7;
  font-size: 26rpx;
  font-weight: 900;
}

.start-card__copy {
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
}

.start-card__title,
.activity-row__title {
  margin-top: 10rpx;
  color: $teacher-mobile-text-primary;
  font-size: 32rpx;
  font-weight: 900;
  line-height: 1.25;
}

.start-card__desc,
.activity-row__desc {
  margin-top: 10rpx;
  color: $teacher-mobile-text-secondary;
  font-size: 24rpx;
  line-height: 1.42;
}

:deep(.start-card__button) {
  float: right;
  min-width: 172rpx;
  height: 72rpx;
  margin-top: 22rpx;
  border-radius: 20rpx;
  font-size: 30rpx;
  font-weight: 900;
}

.activity-list {
  margin-top: 22rpx;
}

.activity-row {
  gap: 22rpx;
  padding: 28rpx 0;
  border-bottom: 1rpx solid $teacher-mobile-card-border;
}

.activity-row:last-child {
  padding-bottom: 0;
  border-bottom: 0;
}

.activity-row__icon {
  width: 108rpx;
  height: 108rpx;
  background: linear-gradient(145deg, #eef6ff, #f8fbff);
  color: $teacher-mobile-info;
}

.activity-row__content {
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
}

.activity-row__desc {
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

:deep(.activity-row__button) {
  min-width: 156rpx;
  height: 64rpx;
  border-radius: 18rpx;
  font-size: 24rpx;
  font-weight: 900;
}

:deep(.tag-purple) {
  background: #efe7ff;
  color: #7a49f5;
}

:deep(.tag-blue) {
  background: #edf4ff;
  color: #1f75ff;
}
</style>
