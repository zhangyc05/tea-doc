<script setup lang="ts">
import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobileNavbar from '../../../components/MobileNavbar.vue'

const organizeItems = [
  { title: '会议纪要', status: '已生成', tone: 'blue', icon: 'doc' },
  { title: '任务分工', status: '已同步', tone: 'green', icon: 'task' },
  { title: '阶段材料', status: '已关联', tone: 'green', icon: 'stage' },
]

const contributions = [
  {
    index: '1',
    title: '提供企业设备调试案例素材',
    source: '阶段材料、会议纪要',
    desc: '你提交的案例素材被用于课程案例共创讨论。',
    tag: '',
  },
  {
    index: '2',
    title: '补充设备故障诊断教学建议',
    source: '发言摘录、会议纪要',
    desc: '你补充了设备故障诊断与调试环节的教学应用建议。',
    tag: '',
  },
  {
    index: '3',
    title: '参与课程案例结构讨论',
    source: '会议纪要、发言摘录、阶段材料、任务分工',
    desc: '你参与了课程案例结构讨论，并补充了案例在课堂导入、问题分析和实训任务中的使用建议。',
    tag: '新补充',
  },
]

const files = [
  { name: '会议纪要.pdf', size: '1.2MB', type: 'PDF', tone: 'red' },
  { name: '发言摘录.docx', size: '860KB', type: 'W', tone: 'blue' },
  { name: '阶段材料.pdf', size: '2.4MB', type: 'PDF', tone: 'green' },
  { name: '任务分工记录.xlsx', size: '540KB', type: '表', tone: 'green' },
]

function goBack() {
  uni.navigateBack()
}

function showToast(title: string) {
  uni.showToast({ title, icon: 'none' })
}
</script>

<template>
  <view class="confirm-page">
    <MobileNavbar title="教研活动详情" size="compact" @back="goBack">
      <template #right>
        <button class="more-button" @tap="showToast('更多')">
          <view class="more-dot"></view>
          <view class="more-dot"></view>
          <view class="more-dot"></view>
        </button>
      </template>
    </MobileNavbar>

    <view class="content">
      <view class="notice-bar">
        <view class="notice-bell"></view>
        <text>请确认本次活动的完整个人贡献，确认后将进入归档流程。</text>
      </view>

      <MobileCard class="hero-card">
        <view class="hero-copy">
          <view class="status-line">
            <view class="status-icon"></view>
            <text>状态：</text>
            <text class="status-text">待确认贡献</text>
          </view>
          <text class="activity-title">课程案例共创碰头会</text>
          <view class="info-line">
            <view class="line-icon line-icon--clock"></view>
            <text>2026-06-03（周二）14:00-15:30</text>
          </view>
          <view class="info-line">
            <view class="line-icon line-icon--video"></view>
            <text>腾讯会议</text>
            <text class="meeting-number">会议号：123 456 789</text>
          </view>
          <view class="info-line">
            <view class="line-icon line-icon--room"></view>
            <text>智能制造课程虚拟教研室</text>
          </view>
        </view>
        <view class="hero-illustration" aria-hidden="true">
          <view class="screen"></view>
          <view class="person person--one"></view>
          <view class="person person--two"></view>
          <view class="person person--front"></view>
          <view class="bubble"></view>
        </view>
      </MobileCard>

      <MobileCard class="organize-card">
        <view class="section-head">
          <view class="check-icon"></view>
          <text class="section-title">系统已整理</text>
        </view>
        <view class="organize-row">
          <view v-for="item in organizeItems" :key="item.title" class="organize-item">
            <view class="organize-icon" :class="[`organize-icon--${item.icon}`, `organize-icon--${item.tone}`]"></view>
            <view class="organize-copy">
              <text class="organize-title">{{ item.title }}</text>
              <text class="organize-status">{{ item.status }}</text>
            </view>
          </view>
          <view class="recognized">
            <text>已识别</text>
            <text class="recognized-count">3</text>
            <text>项个人贡献</text>
          </view>
        </view>
      </MobileCard>

      <MobileCard class="contribution-card">
        <text class="block-title">待确认贡献 <text class="block-subtitle">（请确认以下内容是否完整准确）</text></text>
        <view class="contribution-list">
          <view v-for="item in contributions" :key="item.index" class="contribution-item" @tap="showToast(item.title)">
            <view class="number-badge">{{ item.index }}</view>
            <view class="contribution-copy">
              <view class="contribution-head">
                <text class="contribution-title">{{ item.title }}</text>
                <text v-if="item.tag" class="new-tag">{{ item.tag }}</text>
              </view>
              <text class="source-line">来源：{{ item.source }}</text>
              <text class="contribution-desc">说明：{{ item.desc }}</text>
            </view>
            <text class="data-chip">已关联依据</text>
            <view class="row-arrow"></view>
          </view>
        </view>
      </MobileCard>

      <MobileCard class="file-card">
        <view class="file-head">
          <text class="block-title">已有材料 <text class="block-subtitle">（可用于归档）</text></text>
          <button class="view-all" @tap="showToast('查看全部')">
            <text>查看全部</text>
            <view class="link-arrow"></view>
          </button>
        </view>
        <scroll-view class="file-scroll" scroll-x>
          <view class="file-list">
            <view v-for="file in files" :key="file.name" class="file-item" @tap="showToast(file.name)">
              <view class="file-icon" :class="`file-icon--${file.tone}`">
                <text>{{ file.type }}</text>
              </view>
              <view class="file-copy">
                <text class="file-name">{{ file.name }}</text>
                <text class="file-size">{{ file.size }}</text>
              </view>
            </view>
          </view>
        </scroll-view>
      </MobileCard>

      <view class="tip-bar">
        <view class="tip-icon"></view>
        <text>如果还有遗漏的贡献，可继续补充；确认无误后，请点击“确认贡献”。</text>
      </view>
    </view>

    <view class="fixed-actions">
      <MobileActionButton class="bottom-button supplement-button" variant="outline" @tap="showToast('继续补充')">
        <view class="button-plus"></view>
        <text>继续补充</text>
      </MobileActionButton>
      <MobileActionButton class="bottom-button confirm-button" variant="primary" @tap="showToast('确认贡献')">
        <view class="button-check"></view>
        <text>确认贡献</text>
      </MobileActionButton>
    </view>
  </view>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.confirm-page {
  min-height: 100vh;
  padding-bottom: calc(154rpx + env(safe-area-inset-bottom));
  overflow-x: hidden;
  background:
    radial-gradient(circle at 86% 6%, rgba(230, 243, 255, 0.75), transparent 27%),
    linear-gradient(180deg, #fdfffe 0%, #fff 47%, #f8fbff 100%);
  color: #10172d;
}

.more-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9rpx;
  width: 88rpx;
  height: 58rpx;
  margin: 0 18rpx 0 0;
  padding: 0;
  border: 0;
  background: transparent;
}

.more-button::after,
.view-all::after {
  display: none;
}

.more-dot {
  width: 9rpx;
  height: 9rpx;
  border-radius: 50%;
  background: #111827;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 22rpx;
  padding: 0 34rpx;
}

.notice-bar {
  display: flex;
  align-items: center;
  gap: 18rpx;
  min-height: 72rpx;
  padding: 0 26rpx;
  border-radius: 12rpx;
  background: linear-gradient(105deg, #fff4dc, #fff9ee);
  color: #1f2d46;
  font-size: 27rpx;
  line-height: 1.35;
}

.notice-bell {
  position: relative;
  flex: 0 0 auto;
  width: 28rpx;
  height: 28rpx;
  border-radius: 14rpx 14rpx 8rpx 8rpx;
  background: #c3b786;
}

.notice-bell::after {
  position: absolute;
  left: 9rpx;
  bottom: -6rpx;
  width: 10rpx;
  height: 6rpx;
  border-radius: 50%;
  background: #c3b786;
  content: '';
}

.hero-card,
.organize-card,
.contribution-card,
.file-card {
  border-radius: 18rpx;
}

.hero-card {
  display: flex;
  align-items: center;
  gap: 22rpx;
  padding: 30rpx;
  background: linear-gradient(105deg, #f6fbff, #fbfdff);
}

.hero-copy {
  min-width: 0;
  flex: 1;
}

.activity-title,
.section-title,
.organize-title,
.organize-status,
.block-title,
.contribution-title,
.source-line,
.contribution-desc,
.file-name,
.file-size {
  display: block;
}

.status-line {
  display: flex;
  align-items: center;
  gap: 10rpx;
  color: #111827;
  font-size: 28rpx;
  font-weight: 700;
}

.status-icon {
  position: relative;
  width: 46rpx;
  height: 46rpx;
  border-radius: 10rpx;
  background: #eaf3ff;
}

.status-icon::before,
.status-icon::after,
.line-icon::before,
.line-icon::after,
.check-icon::before,
.check-icon::after,
.organize-icon::before,
.organize-icon::after,
.screen::before,
.screen::after,
.person::before,
.person::after,
.bubble::before,
.row-arrow,
.link-arrow,
.tip-icon::before,
.tip-icon::after,
.button-plus::before,
.button-plus::after,
.button-check::after {
  position: absolute;
  content: '';
}

.status-icon::before {
  inset: 12rpx;
  border: 4rpx solid #3478ef;
  border-radius: 4rpx;
}

.status-icon::after {
  left: 17rpx;
  right: 17rpx;
  top: 18rpx;
  height: 4rpx;
  background: #3478ef;
}

.status-text {
  color: #f17800;
  font-weight: 900;
}

.activity-title {
  margin-top: 24rpx;
  color: #080f24;
  font-size: 39rpx;
  font-weight: 900;
  line-height: 1.22;
}

.info-line {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 14rpx;
  margin-top: 20rpx;
  color: #111827;
  font-size: 28rpx;
  line-height: 1.3;
}

.meeting-number {
  margin-left: 10rpx;
}

.line-icon {
  position: relative;
  flex: 0 0 auto;
  width: 30rpx;
  height: 30rpx;
  color: #30476f;
}

.line-icon--clock::before,
.line-icon--room::before {
  inset: 3rpx;
  border: 3rpx solid currentColor;
  border-radius: 50%;
}

.line-icon--clock::after {
  left: 14rpx;
  top: 7rpx;
  width: 4rpx;
  height: 12rpx;
  border-radius: 4rpx;
  background: currentColor;
  box-shadow: 7rpx 10rpx 0 -1rpx currentColor;
}

.line-icon--video::before {
  left: 2rpx;
  top: 8rpx;
  width: 17rpx;
  height: 13rpx;
  border: 3rpx solid currentColor;
  border-radius: 3rpx;
}

.line-icon--video::after {
  right: 1rpx;
  top: 10rpx;
  border-top: 7rpx solid transparent;
  border-bottom: 7rpx solid transparent;
  border-left: 8rpx solid currentColor;
}

.line-icon--room::before {
  border-radius: 4rpx;
}

.hero-illustration {
  position: relative;
  flex: 0 0 auto;
  width: 190rpx;
  height: 160rpx;
}

.screen {
  position: absolute;
  right: 16rpx;
  top: 22rpx;
  width: 104rpx;
  height: 88rpx;
  border: 8rpx solid #8fb2fb;
  border-radius: 12rpx;
  background: #f4f8ff;
}

.screen::before {
  left: 28rpx;
  bottom: -31rpx;
  width: 10rpx;
  height: 28rpx;
  background: #3478ef;
}

.screen::after {
  left: 8rpx;
  bottom: -36rpx;
  width: 72rpx;
  height: 8rpx;
  border-radius: 8rpx;
  background: #3478ef;
}

.person {
  position: absolute;
  border-radius: 50%;
  background: #86aefa;
}

.person--one {
  left: 86rpx;
  top: 54rpx;
  width: 32rpx;
  height: 32rpx;
}

.person--two {
  left: 122rpx;
  top: 54rpx;
  width: 32rpx;
  height: 32rpx;
}

.person--front {
  right: 0;
  bottom: 10rpx;
  width: 46rpx;
  height: 46rpx;
  background: #3478ef;
}

.person--front::after {
  left: -18rpx;
  top: 54rpx;
  width: 82rpx;
  height: 42rpx;
  border-radius: 42rpx 42rpx 8rpx 8rpx;
  background: #3478ef;
}

.bubble {
  position: absolute;
  left: 28rpx;
  top: 60rpx;
  width: 52rpx;
  height: 34rpx;
  border-radius: 8rpx;
  background: #d9e7ff;
}

.bubble::before {
  left: 16rpx;
  top: 13rpx;
  width: 7rpx;
  height: 7rpx;
  border-radius: 50%;
  background: #8fb2fb;
  box-shadow: 14rpx 0 0 #8fb2fb;
}

.organize-card,
.contribution-card,
.file-card {
  padding: 26rpx;
}

.section-head {
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.check-icon {
  position: relative;
  width: 44rpx;
  height: 44rpx;
  border-radius: 10rpx;
  background: #eaf8f0;
}

.check-icon::after {
  left: 14rpx;
  top: 8rpx;
  width: 14rpx;
  height: 24rpx;
  border-right: 6rpx solid #10b966;
  border-bottom: 6rpx solid #10b966;
  transform: rotate(45deg);
}

.section-title,
.block-title {
  color: #111827;
  font-size: 31rpx;
  font-weight: 900;
  line-height: 1.3;
}

.organize-row {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr)) auto;
  gap: 2rpx;
  margin-top: 22rpx;
  overflow: hidden;
  border-radius: 14rpx;
}

.organize-item {
  display: flex;
  align-items: center;
  gap: 14rpx;
  min-width: 0;
  padding: 18rpx 14rpx;
  background: rgba(255, 255, 255, 0.72);
}

.organize-icon {
  position: relative;
  flex: 0 0 auto;
  width: 48rpx;
  height: 48rpx;
  border-radius: 10rpx;
}

.organize-icon--blue {
  background: #eaf3ff;
  color: #3478ef;
}

.organize-icon--green {
  background: #eaf8f0;
  color: #10b966;
}

.organize-icon::before {
  inset: 12rpx 14rpx;
  border: 4rpx solid currentColor;
  border-radius: 3rpx;
}

.organize-title {
  color: #111827;
  font-size: 24rpx;
  font-weight: 900;
  line-height: 1.15;
}

.organize-status {
  margin-top: 6rpx;
  color: #079653;
  font-size: 22rpx;
  font-weight: 800;
}

.recognized {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8rpx;
  min-width: 168rpx;
  padding: 0 14rpx;
  color: #111827;
  font-size: 25rpx;
  font-weight: 800;
  white-space: nowrap;
}

.recognized-count {
  color: #079653;
  font-size: 38rpx;
  font-weight: 900;
}

.block-subtitle {
  color: #111827;
  font-size: 25rpx;
  font-weight: 700;
}

.contribution-list {
  display: flex;
  flex-direction: column;
  gap: 18rpx;
  margin-top: 22rpx;
}

.contribution-item {
  position: relative;
  display: grid;
  grid-template-columns: 50rpx minmax(0, 1fr) auto 18rpx;
  align-items: flex-start;
  gap: 18rpx;
  padding: 24rpx;
  border-radius: 14rpx;
  background: rgba(255, 255, 255, 0.82);
}

.number-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42rpx;
  height: 42rpx;
  border-radius: 8rpx;
  background: #eaf8f0;
  color: #079653;
  font-size: 29rpx;
  font-weight: 900;
}

.contribution-copy {
  min-width: 0;
}

.contribution-head {
  display: flex;
  align-items: center;
  gap: 14rpx;
  min-width: 0;
}

.contribution-title {
  min-width: 0;
  color: #111827;
  font-size: 29rpx;
  font-weight: 900;
  line-height: 1.25;
}

.new-tag {
  flex: 0 0 auto;
  padding: 6rpx 12rpx;
  border-radius: 10rpx;
  background: #fff2df;
  color: #f17800;
  font-size: 22rpx;
  font-weight: 900;
}

.source-line,
.contribution-desc {
  margin-top: 14rpx;
  color: #344560;
  font-size: 25rpx;
  line-height: 1.45;
}

.data-chip {
  align-self: start;
  padding: 8rpx 16rpx;
  border-radius: 999rpx;
  background: #e8f8ef;
  color: #079653;
  font-size: 22rpx;
  font-weight: 900;
  white-space: nowrap;
}

.row-arrow,
.link-arrow {
  position: relative;
  flex: 0 0 auto;
  width: 18rpx;
  height: 18rpx;
  margin-top: 34rpx;
  border-top: 4rpx solid currentColor;
  border-right: 4rpx solid currentColor;
  color: #52617c;
  transform: rotate(45deg);
}

.file-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16rpx;
}

.view-all {
  display: flex;
  align-items: center;
  gap: 10rpx;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  color: #1e6ef5;
  font-size: 25rpx;
  font-weight: 900;
  white-space: nowrap;
}

.link-arrow {
  width: 14rpx;
  height: 14rpx;
  margin-top: 0;
  color: #1e6ef5;
}

.file-scroll {
  margin-top: 22rpx;
  white-space: nowrap;
}

.file-list {
  display: inline-flex;
  gap: 12rpx;
}

.file-item {
  display: flex;
  align-items: center;
  gap: 14rpx;
  width: 178rpx;
  min-height: 84rpx;
  padding: 16rpx 14rpx;
  border-radius: 12rpx;
  background: #fff;
  box-shadow: 0 8rpx 20rpx rgba(31, 45, 78, 0.05);
}

.file-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  width: 40rpx;
  height: 52rpx;
  border: 3rpx solid currentColor;
  border-radius: 6rpx;
  font-size: 18rpx;
  font-weight: 900;
}

.file-icon--red {
  color: #ef4444;
}

.file-icon--blue {
  color: #1e6ef5;
}

.file-icon--green {
  color: #10a85b;
}

.file-copy {
  min-width: 0;
}

.file-name {
  max-width: 104rpx;
  overflow: hidden;
  color: #111827;
  font-size: 23rpx;
  font-weight: 900;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.file-size {
  margin-top: 8rpx;
  color: #52617c;
  font-size: 22rpx;
}

.tip-bar {
  display: flex;
  align-items: center;
  gap: 18rpx;
  padding: 22rpx 26rpx;
  border-radius: 12rpx;
  background: linear-gradient(105deg, #f2f7ff, #fbfdff);
  color: #29405f;
  font-size: 27rpx;
  line-height: 1.45;
}

.tip-icon {
  position: relative;
  flex: 0 0 auto;
  width: 34rpx;
  height: 34rpx;
  border-radius: 50%;
  border: 4rpx solid #8bb8ff;
}

.tip-icon::after {
  left: 13rpx;
  top: 8rpx;
  width: 4rpx;
  height: 12rpx;
  border-radius: 4rpx;
  background: #8bb8ff;
  box-shadow: 0 18rpx 0 -1rpx #8bb8ff;
}

.fixed-actions {
  position: fixed;
  right: 0;
  bottom: env(safe-area-inset-bottom);
  left: 0;
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20rpx;
  padding: 22rpx 34rpx 26rpx;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 -16rpx 34rpx rgba(31, 45, 78, 0.08);
  backdrop-filter: blur(12rpx);
}

.bottom-button {
  height: 78rpx;
  border-radius: 12rpx;
  font-size: 31rpx;
}

.supplement-button {
  border-color: #1e6ef5;
  color: #1e6ef5;
}

.button-plus,
.button-check {
  position: relative;
  display: inline-block;
  width: 30rpx;
  height: 30rpx;
  margin-right: 12rpx;
  border: 4rpx solid currentColor;
  border-radius: 50%;
  vertical-align: -4rpx;
}

.button-plus::before {
  left: 7rpx;
  top: 11rpx;
  width: 10rpx;
  height: 4rpx;
  background: currentColor;
}

.button-plus::after {
  left: 10rpx;
  top: 8rpx;
  width: 4rpx;
  height: 10rpx;
  background: currentColor;
}

.button-check::after {
  left: 8rpx;
  top: 4rpx;
  width: 9rpx;
  height: 17rpx;
  border-right: 4rpx solid currentColor;
  border-bottom: 4rpx solid currentColor;
  transform: rotate(45deg);
}

@media (max-width: 430px) {
  .confirm-page {
    padding-bottom: calc(144rpx + env(safe-area-inset-bottom));
  }

  .content {
    gap: 18rpx;
    padding-right: 20rpx;
    padding-left: 20rpx;
  }

  .notice-bar,
  .tip-bar {
    padding: 18rpx 20rpx;
    font-size: 24rpx;
  }

  .hero-card {
    gap: 12rpx;
    padding: 26rpx 22rpx;
  }

  .activity-title {
    font-size: 34rpx;
  }

  .info-line {
    gap: 10rpx;
    font-size: 24rpx;
  }

  .hero-illustration {
    width: 150rpx;
    height: 132rpx;
  }

  .organize-card,
  .contribution-card,
  .file-card {
    padding: 22rpx 18rpx;
  }

  .organize-row {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .recognized {
    grid-column: 1 / -1;
    justify-content: flex-start;
    min-height: 52rpx;
  }

  .block-title,
  .section-title {
    font-size: 28rpx;
  }

  .block-subtitle {
    font-size: 22rpx;
  }

  .contribution-item {
    grid-template-columns: 42rpx minmax(0, 1fr) 16rpx;
    padding: 20rpx;
  }

  .data-chip {
    grid-column: 2 / 3;
    justify-self: start;
    margin-top: 4rpx;
  }

  .row-arrow {
    grid-column: 3 / 4;
    grid-row: 1 / 3;
  }

  .contribution-title {
    font-size: 25rpx;
  }

  .source-line,
  .contribution-desc {
    font-size: 22rpx;
  }

  .fixed-actions {
    gap: 18rpx;
    padding: 18rpx 20rpx 22rpx;
  }

  .bottom-button {
    height: 70rpx;
    font-size: 27rpx;
  }
}

@media (max-width: 374px) {
  .content {
    padding-right: 14rpx;
    padding-left: 14rpx;
  }

  .hero-card {
    align-items: flex-start;
  }

  .hero-illustration {
    width: 112rpx;
    height: 110rpx;
  }

  .screen,
  .person,
  .bubble {
    transform: scale(0.78);
    transform-origin: left top;
  }

  .activity-title {
    font-size: 30rpx;
  }

  .organize-row {
    grid-template-columns: 1fr;
  }

  .organize-item {
    min-height: 70rpx;
  }

  .file-item {
    width: 164rpx;
  }

  .fixed-actions {
    gap: 14rpx;
    padding-right: 14rpx;
    padding-left: 14rpx;
  }
}
</style>
