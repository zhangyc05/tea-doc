<script setup lang="ts">
import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobileNavbar from '../../../components/MobileNavbar.vue'
import MobileTabBar from '../../../components/MobileTabBar.vue'

const logs = [
  { date: '05-15', text: '学习软件开发规范，了解代码评审流程' },
  { date: '05-12', text: '参与需求分析讨论，梳理主要功能模块' },
  { date: '05-10', text: '了解企业项目流程，熟悉团队分工' },
]

const files = [
  { type: 'pdf', title: '实践证明', date: '2026-05-12' },
  { type: 'image', title: '项目截图', date: '2026-05-11' },
]

function goBack() {
  uni.navigateBack()
}
</script>

<template>
  <view class="progress-detail-page">
    <view class="hero">
      <view class="city-art">
        <view class="cloud cloud--one"></view>
        <view class="cloud cloud--two"></view>
        <view class="building building--one"></view>
        <view class="building building--two"></view>
        <view class="trees"></view>
      </view>
      <MobileNavbar title="" size="compact" @back="goBack" />
      <text class="hero-title">企业实践</text>
      <text class="hero-subtitle">查看实践计划，记录实践过程并完成归档</text>
    </view>

    <view class="content">
      <MobileCard class="summary-card">
        <view class="company-art">
          <view class="company-building"></view>
        </view>
        <view class="summary-main">
          <view class="title-row">
            <text class="company-title">山东某智能装备有限公司实践</text>
            <text class="state-tag">进行中</text>
          </view>
          <view class="meta-row">
            <view class="meta-item"><view class="small-icon small-icon--bag"></view><text>软件开发工程师</text></view>
            <view class="meta-item"><view class="small-icon small-icon--calendar"></view><text>2026-05-10 至 2026-05-20</text></view>
          </view>
          <view class="days-row">
            <text>年度计入：</text>
            <text>已记录</text>
            <text class="green-text">8 天</text>
            <text>/ 需满 30 天</text>
          </view>
        </view>
        <view class="summary-tip">
          <view class="speaker-icon"></view>
          <text>当前实践正在进行中，请先继续记录实践过程。</text>
        </view>
      </MobileCard>

      <MobileCard class="plan-card">
        <view class="section-head">
          <view class="section-icon section-icon--calendar"></view>
          <text class="section-title">实践计划</text>
          <text class="section-link">查看详情</text>
          <view class="chevron"></view>
        </view>
        <text class="plan-line"><text class="strong">实践目标：</text>了解企业软件开发流程，提升项目分析与编码能力。</text>
        <text class="plan-line"><text class="strong">重点内容：</text>需求分析、编码实现、单元测试、项目文档编写等。</text>
      </MobileCard>

      <MobileCard class="today-card">
        <view class="today-copy">
          <view class="section-head section-head--plain">
            <view class="section-icon section-icon--check"></view>
            <text class="section-title">今天可以处理</text>
          </view>
          <text class="today-desc">补充一条实践日志，记录今天参与的工作、观察到的流程或新的收获。</text>
        </view>
        <MobileActionButton class="record-button" variant="primary">去记录</MobileActionButton>
      </MobileCard>

      <MobileCard class="logs-card">
        <view class="section-head">
          <view class="section-icon section-icon--list"></view>
          <text class="section-title">实践日志</text>
          <text class="log-count">（已记录 8 天）</text>
          <text class="section-link">查看全部</text>
          <view class="chevron"></view>
        </view>
        <view class="log-list">
          <view v-for="item in logs" :key="item.date" class="log-row">
            <view class="timeline-dot"></view>
            <text class="log-date">{{ item.date }}</text>
            <text class="log-text">{{ item.text }}</text>
            <view class="chevron"></view>
          </view>
        </view>
      </MobileCard>

      <MobileCard class="files-card">
        <view class="section-head">
          <view class="section-icon section-icon--folder"></view>
          <text class="section-title">附件资料</text>
          <text class="section-link">查看全部</text>
          <view class="chevron"></view>
        </view>
        <view class="file-strip">
          <view v-for="item in files" :key="item.title" class="file-item">
            <view class="file-thumb" :class="`file-thumb--${item.type}`"></view>
            <view>
              <text class="file-title">{{ item.title }}</text>
              <text class="file-date">{{ item.date }}</text>
            </view>
          </view>
          <view class="add-file">+</view>
        </view>
        <view class="file-footer">
          <text>已上传 2 份</text>
          <text>可补充：实践证明、过程照片、成果材料等</text>
          <text class="green-link">补充资料</text>
        </view>
      </MobileCard>

      <view class="ai-tip">
        <view class="bot-face"></view>
        <text>后续 AI 将根据你的日志和附件，生成实践总结草稿，帮助你更高效完成归档。</text>
      </view>
    </view>

    <MobileTabBar active="activity" />
  </view>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.progress-detail-page {
  min-height: 100vh;
  padding-bottom: calc(178rpx + env(safe-area-inset-bottom));
  background: linear-gradient(180deg, #f3fffa 0%, #ffffff 22%, #f7fbff 100%);
  color: #10172d;
}

.hero {
  position: relative;
  min-height: 238rpx;
  padding: calc(var(--status-bar-height) + 12rpx) 28rpx 24rpx;
  overflow: hidden;
}

.hero-title,
.hero-subtitle,
.company-title,
.plan-line,
.today-desc,
.file-title,
.file-date {
  display: block;
}

.hero-title {
  color: #10172d;
  font-size: 50rpx;
  font-weight: 900;
  line-height: 1.12;
  text-align: center;
}

.hero-subtitle {
  margin-top: 32rpx;
  color: #53617b;
  font-size: 30rpx;
  line-height: 1.42;
}

.city-art {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 350rpx;
  height: 160rpx;
  opacity: 0.72;
}

.building {
  position: absolute;
  bottom: 0;
  border-radius: 10rpx 10rpx 0 0;
  background: #a4ecd3;
}

.building--one {
  right: 40rpx;
  width: 86rpx;
  height: 130rpx;
}

.building--two {
  right: 142rpx;
  width: 74rpx;
  height: 92rpx;
  background: #c5f4e5;
}

.cloud {
  position: absolute;
  width: 82rpx;
  height: 22rpx;
  border-radius: 999rpx;
  background: #fff;
}

.cloud--one {
  right: 156rpx;
  top: 24rpx;
}

.cloud--two {
  right: 254rpx;
  top: 84rpx;
  transform: scale(0.82);
}

.trees {
  position: absolute;
  right: 2rpx;
  bottom: 0;
  width: 50rpx;
  height: 70rpx;
  border-radius: 999rpx 999rpx 0 0;
  background: #9ee6c5;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  padding: 0 28rpx;
}

.summary-card,
.section-head,
.title-row,
.meta-row,
.meta-item,
.days-row,
.summary-tip,
.today-card,
.log-row,
.file-strip,
.file-item,
.file-footer,
.ai-tip {
  display: flex;
  align-items: center;
}

.summary-card {
  position: relative;
  flex-wrap: wrap;
  gap: 24rpx;
  padding: 30rpx;
  border-radius: 28rpx;
}

.company-art {
  width: 132rpx;
  height: 132rpx;
  flex: 0 0 auto;
  border-radius: 50%;
  background: linear-gradient(180deg, #dff3ff, #dffff0);
  overflow: hidden;
}

.company-building {
  width: 58rpx;
  height: 86rpx;
  margin: 30rpx auto 0;
  border-radius: 8rpx 8rpx 0 0;
  background: #3595ff;
  box-shadow: -30rpx 32rpx 0 #37c979, 38rpx 42rpx 0 #37c979;
}

.summary-main {
  min-width: 0;
  flex: 1;
}

.title-row {
  gap: 14rpx;
  align-items: flex-start;
}

.company-title {
  min-width: 0;
  flex: 1;
  font-size: 36rpx;
  font-weight: 900;
  line-height: 1.24;
}

.state-tag {
  flex: 0 0 auto;
  padding: 8rpx 18rpx;
  border-radius: 999rpx;
  background: #e5fbf0;
  color: $teacher-mobile-primary-dark;
  font-size: 27rpx;
  font-weight: 900;
}

.meta-row {
  flex-wrap: wrap;
  gap: 16rpx 26rpx;
  margin-top: 18rpx;
  color: #343b4b;
  font-size: 27rpx;
}

.meta-item {
  gap: 10rpx;
}

.small-icon {
  width: 30rpx;
  height: 30rpx;
  border: 4rpx solid #667089;
  border-radius: 6rpx;
}

.days-row {
  gap: 10rpx;
  margin-top: 18rpx;
  color: #10172d;
  font-size: 29rpx;
}

.green-text {
  color: $teacher-mobile-primary;
  font-weight: 900;
}

.summary-tip {
  width: 100%;
  gap: 18rpx;
  padding: 18rpx 22rpx;
  border-radius: 16rpx;
  background: linear-gradient(90deg, #eafff3, #effdf8);
  color: #53617b;
  font-size: 28rpx;
}

.speaker-icon {
  width: 38rpx;
  height: 38rpx;
  border-radius: 8rpx;
  background: $teacher-mobile-primary;
}

.plan-card,
.logs-card,
.files-card {
  padding: 30rpx;
}

.section-head {
  gap: 16rpx;
  margin-bottom: 22rpx;
}

.section-icon {
  width: 42rpx;
  height: 42rpx;
  flex: 0 0 auto;
  border-radius: 9rpx;
  background: $teacher-mobile-primary;
}

.section-title {
  flex: 1;
  font-size: 36rpx;
  font-weight: 900;
}

.section-link,
.log-count {
  color: #687386;
  font-size: 27rpx;
}

.log-count {
  flex: 1;
}

.chevron {
  width: 18rpx;
  height: 18rpx;
  border-top: 4rpx solid #8a93a5;
  border-right: 4rpx solid #8a93a5;
  transform: rotate(45deg);
}

.plan-line {
  margin-top: 16rpx;
  color: #10172d;
  font-size: 30rpx;
  line-height: 1.45;
}

.strong {
  font-weight: 900;
}

.today-card {
  justify-content: space-between;
  gap: 26rpx;
  padding: 32rpx;
  background: linear-gradient(135deg, #f1fff8, #f7fffd);
}

.section-head--plain {
  margin-bottom: 16rpx;
}

.today-desc {
  color: #10172d;
  font-size: 30rpx;
  line-height: 1.55;
}

.record-button {
  width: 186rpx;
  height: 78rpx;
  border-radius: 999rpx;
  font-size: 32rpx;
}

.log-list {
  position: relative;
}

.log-row {
  min-height: 58rpx;
  gap: 24rpx;
  color: #10172d;
}

.timeline-dot {
  width: 20rpx;
  height: 20rpx;
  flex: 0 0 auto;
  border-radius: 50%;
  background: $teacher-mobile-primary;
  box-shadow: 0 44rpx 0 rgba(23, 200, 112, 0.6), 0 88rpx 0 $teacher-mobile-primary;
}

.log-date {
  width: 72rpx;
  flex: 0 0 auto;
  font-size: 28rpx;
}

.log-text {
  min-width: 0;
  flex: 1;
  font-size: 28rpx;
  line-height: 1.36;
}

.file-strip {
  gap: 18rpx;
  padding: 20rpx;
  border-radius: 16rpx;
  background: #f8fafc;
}

.file-item {
  min-width: 0;
  flex: 1;
  gap: 14rpx;
}

.file-thumb {
  width: 72rpx;
  height: 72rpx;
  flex: 0 0 auto;
  border-radius: 10rpx;
  background: #fff;
  box-shadow: 0 8rpx 20rpx rgba(31, 50, 82, 0.1);
}

.file-thumb--pdf {
  background: linear-gradient(135deg, #fff, #fff 48%, #e94242 49%);
}

.file-thumb--image {
  background: linear-gradient(135deg, #d7e8f4, #7f8b74);
}

.add-file {
  width: 112rpx;
  height: 72rpx;
  flex: 0 0 auto;
  border: 2rpx dashed #95dfbb;
  border-radius: 14rpx;
  color: #687386;
  font-size: 56rpx;
  line-height: 64rpx;
  text-align: center;
}

.file-title {
  font-size: 27rpx;
  font-weight: 800;
}

.file-date {
  margin-top: 4rpx;
  color: #687386;
  font-size: 25rpx;
}

.file-footer {
  justify-content: space-between;
  gap: 18rpx;
  margin-top: 22rpx;
  color: #53617b;
  font-size: 27rpx;
}

.green-link {
  color: $teacher-mobile-primary-dark;
  font-weight: 900;
}

.ai-tip {
  gap: 22rpx;
  padding: 24rpx 28rpx;
  border-radius: 22rpx;
  background: linear-gradient(90deg, #eafff3, #f4fffb);
  color: #10172d;
  font-size: 28rpx;
  font-weight: 800;
  line-height: 1.45;
}

.bot-face {
  width: 76rpx;
  height: 76rpx;
  flex: 0 0 auto;
  border-radius: 50%;
  background: linear-gradient(135deg, #dcecff, #e8fff1);
}

@media (max-width: 374px) {
  .hero,
  .content {
    padding-right: 18rpx;
    padding-left: 18rpx;
  }

  .company-title {
    font-size: 30rpx;
  }

  .company-art {
    width: 104rpx;
    height: 104rpx;
  }

  .summary-card,
  .plan-card,
  .today-card,
  .logs-card,
  .files-card {
    padding: 24rpx;
  }

  .today-card {
    align-items: flex-start;
    flex-direction: column;
  }

  .record-button {
    width: 180rpx;
  }

  .file-strip {
    align-items: flex-start;
    flex-direction: column;
  }

  .add-file {
    width: 100%;
  }

  .file-footer {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
