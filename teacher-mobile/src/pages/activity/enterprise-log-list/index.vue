<script setup lang="ts">
import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobileNavbar from '../../../components/MobileNavbar.vue'

const logs = [
  {
    date: '05-20',
    count: '第 9 条',
    title: '整理实践总结，梳理教学转化方向',
    tags: ['总结整理', '教学转化'],
    material: '附件 1 份',
    type: 'file',
  },
  {
    date: '05-18',
    count: '第 8 条',
    title: '与现场工程师交流课程案例转化思路',
    tags: ['教学转化', '案例整理'],
    material: '附件 1 份',
    type: 'file',
  },
  {
    date: '05-15',
    count: '第 7 条',
    title: '学习开发联调流程，整理接口测试注意事项',
    tags: ['开发联调', '技术记录'],
    material: '附件 1 份',
    type: 'file',
  },
  {
    date: '05-12',
    count: '第 4 条',
    title: '参与需求分析讨论，记录项目功能拆分方式',
    tags: ['需求分析', '任务拆分'],
    material: '附件 1 份',
    type: 'file',
  },
  {
    date: '05-10',
    count: '第 1 条',
    title: '熟悉企业项目背景和现场工作流程',
    tags: ['项目了解', '流程观察'],
    material: '现场照片 2 张',
    type: 'image',
  },
]

function goBack() {
  uni.navigateBack()
}
</script>

<template>
  <view class="practice-log-page">
    <MobileNavbar title="实践日志" size="regular" @back="goBack">
      <template #right>
        <view class="filter-action">
          <view class="filter-icon"></view>
          <text>筛选</text>
        </view>
      </template>
    </MobileNavbar>

    <view class="content">
      <view class="practice-head">
        <view class="company-art">
          <view class="building-icon"></view>
        </view>
        <view class="practice-copy">
          <text class="practice-title">山东某智能装备有限公司企业实践</text>
          <text class="practice-role">软件开发工程师</text>
          <view class="practice-meta">
            <view class="calendar-icon"></view>
            <text>2026-05-10 至 2026-05-20</text>
            <text class="divider">|</text>
            <text>共 9 条日志</text>
            <text class="archived-tag">已归档</text>
          </view>
        </view>
      </view>

      <MobileCard class="summary-card">
        <view class="summary-icon"></view>
        <text class="summary-label">日志摘要</text>
        <text class="summary-text">
          系统已整理本次实践过程记录，覆盖需求分析、项目文档、开发联调和现场交流等内容。
        </text>
        <text class="quote-mark">”</text>
      </MobileCard>

      <view class="list-head">
        <view class="list-title-wrap">
          <view class="accent-line"></view>
          <text class="list-title">日志列表</text>
          <text class="list-count">（共 9 条）</text>
        </view>
        <view class="sort-action">
          <text>按时间倒序</text>
          <view class="down-arrow"></view>
        </view>
      </view>

      <view class="timeline">
        <view v-for="item in logs" :key="item.date" class="timeline-row">
          <view class="time-col">
            <view class="time-dot"></view>
            <text class="time-date">{{ item.date }}</text>
            <text class="time-count">{{ item.count }}</text>
          </view>
          <MobileCard class="log-card">
            <text class="log-title">{{ item.title }}</text>
            <view class="tag-row">
              <text v-for="tag in item.tags" :key="tag" class="log-tag">{{ tag }}</text>
            </view>
            <view class="material-line">
              <view class="material-icon" :class="`material-icon--${item.type}`"></view>
              <text>{{ item.material }}</text>
            </view>
            <view class="chevron"></view>
          </MobileCard>
        </view>
      </view>

      <view class="archive-tip">
        <view class="shield-icon"></view>
        <text>日志内容已归档，可作为能力证据长期保存与引用。</text>
      </view>

      <MobileActionButton class="return-button" variant="primary">返回实践记录详情</MobileActionButton>
    </view>
  </view>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.practice-log-page {
  min-height: 100vh;
  padding-bottom: calc(44rpx + env(safe-area-inset-bottom));
  background:
    radial-gradient(circle at 16% 14%, rgba(220, 248, 235, 0.72), transparent 25%),
    linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);
  color: #10172d;
}

.content {
  padding: 26rpx 40rpx 0;
}

.filter-action,
.practice-head,
.practice-meta,
.summary-card,
.list-head,
.list-title-wrap,
.sort-action,
.timeline-row,
.material-line,
.archive-tip {
  display: flex;
  align-items: center;
}

.filter-action {
  gap: 14rpx;
  color: #111827;
  font-size: 30rpx;
  font-weight: 700;
}

.filter-icon {
  position: relative;
  width: 32rpx;
  height: 30rpx;
  border: 5rpx solid currentColor;
  border-top: 0;
  clip-path: polygon(0 0, 100% 0, 62% 45%, 62% 100%, 38% 100%, 38% 45%);
}

.practice-head {
  gap: 22rpx;
  margin-top: 18rpx;
}

.company-art {
  position: relative;
  width: 136rpx;
  height: 136rpx;
  flex: 0 0 auto;
  overflow: hidden;
  border-radius: 16rpx;
  background: linear-gradient(135deg, #eef8f2, #f7fbf8);
}

.company-art::before,
.company-art::after {
  position: absolute;
  border-radius: 50%;
  background: #91dfb5;
  content: '';
}

.company-art::before {
  left: 24rpx;
  top: 22rpx;
  width: 8rpx;
  height: 8rpx;
}

.company-art::after {
  right: 22rpx;
  bottom: 22rpx;
  width: 10rpx;
  height: 10rpx;
}

.building-icon {
  position: absolute;
  left: 46rpx;
  bottom: 36rpx;
  width: 42rpx;
  height: 58rpx;
  border-radius: 6rpx 6rpx 0 0;
  background: linear-gradient(180deg, #36c984, #16a767);
  box-shadow: 38rpx 18rpx 0 #61d79d;
}

.building-icon::before {
  position: absolute;
  left: -18rpx;
  bottom: -8rpx;
  width: 96rpx;
  height: 8rpx;
  border-radius: 999rpx;
  background: #16a767;
  content: '';
}

.building-icon::after {
  position: absolute;
  left: 14rpx;
  top: 12rpx;
  width: 9rpx;
  height: 9rpx;
  border-radius: 2rpx;
  background: #e6fff2;
  box-shadow: 0 18rpx 0 #e6fff2, 0 36rpx 0 #e6fff2;
  content: '';
}

.practice-copy {
  min-width: 0;
  flex: 1;
}

.practice-title,
.practice-role,
.log-title {
  display: block;
}

.practice-title {
  color: #10172d;
  font-size: 35rpx;
  font-weight: 900;
  line-height: 1.32;
}

.practice-role {
  margin-top: 20rpx;
  color: #687386;
  font-size: 27rpx;
}

.practice-meta {
  flex-wrap: wrap;
  gap: 14rpx;
  margin-top: 22rpx;
  color: #687386;
  font-size: 27rpx;
}

.calendar-icon {
  position: relative;
  width: 24rpx;
  height: 24rpx;
  border: 3rpx solid #6f7b90;
  border-radius: 4rpx;
}

.calendar-icon::before {
  position: absolute;
  left: 3rpx;
  right: 3rpx;
  top: 6rpx;
  height: 3rpx;
  border-radius: 999rpx;
  background: #6f7b90;
  content: '';
}

.divider {
  color: #c0c8d3;
}

.archived-tag {
  padding: 7rpx 20rpx;
  border-radius: 10rpx;
  background: linear-gradient(135deg, #16b96c, #03964e);
  color: #fff;
  font-size: 25rpx;
  font-weight: 900;
}

.summary-card {
  position: relative;
  gap: 22rpx;
  margin-top: 44rpx;
  padding: 34rpx 30rpx;
  overflow: hidden;
  border-radius: 18rpx;
  background: linear-gradient(90deg, rgba(232, 247, 239, 0.94), rgba(247, 252, 249, 0.94));
}

.summary-icon {
  position: relative;
  width: 46rpx;
  height: 54rpx;
  flex: 0 0 auto;
  border-radius: 9rpx;
  background: linear-gradient(180deg, #24c778, #0aa85a);
}

.summary-icon::before {
  position: absolute;
  left: 12rpx;
  top: 18rpx;
  width: 20rpx;
  height: 4rpx;
  border-radius: 999rpx;
  background: #e8fff2;
  box-shadow: 0 12rpx 0 #e8fff2;
  content: '';
}

.summary-label {
  flex: 0 0 auto;
  color: #10172d;
  font-size: 31rpx;
  font-weight: 900;
}

.summary-text {
  flex: 1;
  color: #243047;
  font-size: 27rpx;
  line-height: 1.6;
}

.quote-mark {
  position: absolute;
  right: 28rpx;
  bottom: -38rpx;
  color: rgba(22, 190, 107, 0.13);
  font-size: 122rpx;
  font-weight: 900;
  line-height: 1;
}

.list-head {
  justify-content: space-between;
  margin-top: 42rpx;
}

.list-title-wrap {
  gap: 18rpx;
}

.accent-line {
  width: 8rpx;
  height: 34rpx;
  border-radius: 999rpx;
  background: #16b96c;
}

.list-title {
  color: #10172d;
  font-size: 34rpx;
  font-weight: 900;
}

.list-count,
.sort-action {
  color: #586379;
  font-size: 27rpx;
  font-weight: 700;
}

.sort-action {
  gap: 10rpx;
}

.down-arrow {
  width: 12rpx;
  height: 12rpx;
  border-right: 4rpx solid currentColor;
  border-bottom: 4rpx solid currentColor;
  transform: rotate(45deg) translateY(-4rpx);
}

.timeline {
  margin-top: 30rpx;
}

.timeline-row {
  align-items: stretch;
  position: relative;
}

.timeline-row:not(:last-child)::before {
  position: absolute;
  left: 25rpx;
  top: 32rpx;
  bottom: -20rpx;
  width: 2rpx;
  background: #dfe5ec;
  content: '';
}

.time-col {
  position: relative;
  width: 166rpx;
  flex: 0 0 auto;
  padding: 0 0 38rpx 44rpx;
}

.time-dot {
  position: absolute;
  left: 15rpx;
  top: 14rpx;
  width: 18rpx;
  height: 18rpx;
  border-radius: 50%;
  background: #12af62;
}

.time-date {
  display: block;
  color: #162033;
  font-size: 30rpx;
  line-height: 1.2;
}

.time-count {
  display: block;
  margin-top: 20rpx;
  color: #0aae60;
  font-size: 27rpx;
  font-weight: 900;
}

.log-card {
  position: relative;
  min-width: 0;
  flex: 1;
  margin-bottom: 18rpx;
  padding: 28rpx 62rpx 26rpx 30rpx;
  border-radius: 18rpx;
}

.log-title {
  color: #10172d;
  font-size: 29rpx;
  font-weight: 900;
  line-height: 1.38;
}

.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
  margin-top: 20rpx;
}

.log-tag {
  padding: 6rpx 18rpx;
  border-radius: 999rpx;
  background: #edf2fa;
  color: #52607b;
  font-size: 24rpx;
  line-height: 1.15;
}

.material-line {
  gap: 12rpx;
  margin-top: 20rpx;
  color: #243047;
  font-size: 27rpx;
}

.material-icon {
  position: relative;
  width: 25rpx;
  height: 25rpx;
  border: 3rpx solid #6e788a;
  border-radius: 4rpx;
}

.material-icon::before {
  position: absolute;
  left: 5rpx;
  top: 7rpx;
  width: 9rpx;
  height: 7rpx;
  border-left: 3rpx solid #6e788a;
  border-bottom: 3rpx solid #6e788a;
  transform: rotate(-45deg);
  content: '';
}

.material-icon--image::before {
  left: 4rpx;
  top: 10rpx;
  width: 14rpx;
  height: 8rpx;
  border: 0;
  background: linear-gradient(135deg, transparent 50%, #6e788a 0);
  transform: none;
}

.chevron {
  position: absolute;
  right: 32rpx;
  top: 50%;
  width: 19rpx;
  height: 19rpx;
  border-top: 4rpx solid #8a93a5;
  border-right: 4rpx solid #8a93a5;
  transform: translateY(-50%) rotate(45deg);
}

.archive-tip {
  gap: 22rpx;
  margin-top: 26rpx;
  padding: 26rpx 34rpx;
  border-radius: 16rpx;
  background: linear-gradient(90deg, #eef9f4, #f8fcfa);
  color: #243047;
  font-size: 29rpx;
  line-height: 1.4;
}

.shield-icon {
  position: relative;
  width: 42rpx;
  height: 44rpx;
  flex: 0 0 auto;
  border: 4rpx solid #13aa62;
  border-radius: 12rpx 12rpx 18rpx 18rpx;
  clip-path: polygon(50% 0, 100% 18%, 100% 58%, 50% 100%, 0 58%, 0 18%);
}

.shield-icon::before {
  position: absolute;
  left: 11rpx;
  top: 13rpx;
  width: 14rpx;
  height: 9rpx;
  border-left: 4rpx solid #13aa62;
  border-bottom: 4rpx solid #13aa62;
  transform: rotate(-45deg);
  content: '';
}

.return-button {
  width: 100%;
  height: 88rpx;
  margin-top: 34rpx;
  border-radius: 14rpx;
  font-size: 33rpx;
}

@media (max-width: 370px) {
  .content {
    padding-right: 28rpx;
    padding-left: 28rpx;
  }

  .practice-title {
    font-size: 32rpx;
  }

  .summary-card {
    align-items: flex-start;
  }

  .time-col {
    width: 146rpx;
  }

  .log-card {
    padding-right: 52rpx;
  }
}
</style>
