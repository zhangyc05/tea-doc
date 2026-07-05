<script setup lang="ts">
import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobilePageShell from '../../../components/MobilePageShell.vue'
import MobileStatusTag from '../../../components/MobileStatusTag.vue'

type Tone = 'purple' | 'blue' | 'orange' | 'green'

const basis = [
  { label: '课堂报告', icon: 'book' },
  { label: '成绩分析', icon: 'chart' },
  { label: '评价分析', icon: 'star' },
]

const growthActivities: Array<{
  tag: string
  title: string
  desc: string
  note: string
  action: string
  tone: Tone
  type: 'training' | 'enterprise' | 'research'
  url?: string
}> = [
  {
    tag: '培训进修',
    title: '申请培训',
    desc: '系统根据能力画像推荐 2 个培训资源，可报名参加，也可直接学习',
    note: '不满足需求时，可提交培训需求',
    action: '查看培训',
    tone: 'blue',
    type: 'training',
    url: '/pages/activity/training/index',
  },
  {
    tag: '年度要求',
    title: '企业实践',
    desc: '本年度已记录 18 / 30 天，还差 12 天，可继续记录或申请新的实践',
    note: '已完成部分会自动沉淀到成长档案',
    action: '记录实践',
    tone: 'orange',
    type: 'enterprise',
    url: '/pages/activity/enterprise-overview/index',
  },
  {
    tag: '虚拟教研',
    title: '我的教研室',
    desc: '已加入 1 个教研室，2 项个人贡献待确认',
    note: '系统可从腾讯会议、纪要和任务分工中整理教研记录',
    action: '进入教研室',
    tone: 'green',
    type: 'research',
    url: '/pages/activity/virtual-research-room/index',
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

function goReflectionStart() {
  uni.navigateTo({ url: '/pages/activity/reflection-start/index' })
}

function goActivity(url?: string) {
  if (!url) {
    uni.showToast({ title: '暂未配置入口', icon: 'none' })
    return
  }
  uni.navigateTo({ url })
}

function showToast(title: string) {
  uni.showToast({ title, icon: 'none' })
}
</script>

<template>
  <MobilePageShell class="activity-room-state-page" active="activity">
    <view class="system-status" aria-hidden="true">
      <text class="system-status__time">9:41</text>
      <view class="system-status__icons">
        <view class="status-signal"></view>
        <view class="status-wifi"></view>
        <view class="status-battery"></view>
      </view>
    </view>

    <view class="page-head">
      <view class="page-copy">
        <text class="page-title">活动</text>
        <text class="page-subtitle">选择一种成长活动，AI 会帮您整理过程记录</text>
      </view>
      <button class="notice-button" aria-label="消息通知" @tap="showToast('5 条通知')">
        <view class="bell">
          <text class="badge">5</text>
        </view>
      </button>
    </view>

    <button class="teacher-card" @tap="showToast('发展周期')">
      <view class="seed-mark">
        <view class="seed-stem"></view>
      </view>
      <view class="teacher-body">
        <view class="teacher-line">
          <text class="teacher-name">林老师</text>
          <text class="sep">|</text>
          <text>智能制造学院</text>
          <text class="sep">|</text>
          <text>讲师</text>
        </view>
        <view class="teacher-line teacher-line--sub">
          <text>2026 年度发展周期</text>
          <text class="sep">|</text>
          <text>聘期第 2 年</text>
        </view>
      </view>
      <view class="chevron"></view>
    </button>

    <MobileCard class="section-card start-card">
      <view class="section-head">
        <text class="section-title">今日可开始</text>
        <view class="ready-note">
          <text>系统已准备好开始依据</text>
          <text class="ready-icon">i</text>
        </view>
      </view>

      <view class="start-main">
        <view class="reflection-art">
          <view class="paper"></view>
          <view class="pen"></view>
          <view class="spark spark--one"></view>
          <view class="spark spark--two"></view>
        </view>
        <view class="start-copy">
          <MobileStatusTag tone="purple">教学反思</MobileStatusTag>
          <text class="start-title">我要进行教学反思</text>
          <text class="start-desc">可基于课堂报告、成绩报告、评价报告开始，也可录制课堂音频、上传教学资料或直接与 AI 对话开始</text>
          <view class="basis-list">
            <view v-for="item in basis" :key="item.label" class="basis-pill">
              <view class="basis-icon" :class="`basis-icon--${item.icon}`"></view>
              <text>{{ item.label }}</text>
            </view>
          </view>
        </view>
      </view>

      <MobileActionButton class="start-action" variant="primary" @tap="goReflectionStart">
        开始反思
      </MobileActionButton>
    </MobileCard>

    <MobileCard class="section-card growth-card">
      <text class="section-title">成长活动</text>
      <view v-for="item in growthActivities" :key="item.title" class="growth-row">
        <view class="growth-visual" :class="`growth-visual--${item.type}`">
          <view class="growth-shape"></view>
        </view>
        <view class="growth-copy">
          <MobileStatusTag :tone="item.tone">{{ item.tag }}</MobileStatusTag>
          <text class="growth-title">{{ item.title }}</text>
          <text class="growth-desc">{{ item.desc }}</text>
          <view class="growth-note">
            <view class="note-icon" :class="`note-icon--${item.type}`"></view>
            <text>{{ item.note }}</text>
          </view>
        </view>
        <MobileActionButton class="row-action" variant="outline" arrow @tap="goActivity(item.url)">
          {{ item.action }}
        </MobileActionButton>
      </view>
    </MobileCard>

    <MobileCard class="section-card recent-card">
      <view class="section-head">
        <text class="section-title">最近活动</text>
        <MobileActionButton class="all-link" variant="link" arrow @tap="showToast('全部活动')">
          全部
        </MobileActionButton>
      </view>
      <view v-for="item in recentActivities" :key="item.title" class="recent-row">
        <view class="recent-icon" :class="`recent-icon--${item.tone}`"></view>
        <view class="recent-copy">
          <text class="recent-title">{{ item.title }}</text>
          <text class="recent-desc">{{ item.desc }}</text>
        </view>
        <text class="recent-time">{{ item.time }}</text>
      </view>
    </MobileCard>
  </MobilePageShell>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.activity-room-state-page {
  min-height: 100vh;
  padding: calc(var(--status-bar-height) + 16rpx) 34rpx calc(150rpx + env(safe-area-inset-bottom));
  background:
    radial-gradient(circle at 16% 0%, rgba(224, 252, 239, 0.82), transparent 30%),
    linear-gradient(180deg, #ffffff 0%, #f8fbff 49%, #f5f9ff 100%);
  color: #10172d;
}

.system-status,
.system-status__icons,
.page-head,
.teacher-card,
.teacher-line,
.section-head,
.ready-note,
.start-main,
.basis-list,
.basis-pill,
.growth-row,
.growth-note,
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
  gap: 26rpx;
  padding: 24rpx 16rpx 22rpx;
}

.page-copy {
  min-width: 0;
  flex: 1;
}

.page-title {
  display: block;
  color: #050812;
  font-size: 68rpx;
  font-weight: 900;
  letter-spacing: 0;
  line-height: 1.05;
}

.page-subtitle {
  display: block;
  margin-top: 8rpx;
  color: #263654;
  font-size: 27rpx;
  line-height: 1.35;
}

.notice-button,
.teacher-card,
.growth-row button,
.recent-card button {
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
}

.notice-button::after,
.teacher-card::after,
.start-action::after,
.row-action::after,
.all-link::after {
  display: none;
}

.notice-button {
  position: relative;
  width: 88rpx;
  height: 88rpx;
}

.bell {
  position: absolute;
  right: 7rpx;
  bottom: 9rpx;
  width: 58rpx;
  height: 58rpx;
  border: 6rpx solid #0b1128;
  border-top-color: transparent;
  border-radius: 50% 50% 20rpx 20rpx;
}

.bell::before,
.bell::after,
.seed-mark::before,
.seed-mark::after,
.reflection-art::before,
.paper::before,
.paper::after,
.pen::before,
.spark,
.basis-icon::before,
.growth-shape::before,
.growth-shape::after,
.note-icon::before,
.recent-icon::before,
.chevron::before {
  position: absolute;
  content: '';
}

.bell::before {
  top: -13rpx;
  left: 17rpx;
  width: 18rpx;
  height: 12rpx;
  border: 5rpx solid #0b1128;
  border-bottom: 0;
  border-radius: 18rpx 18rpx 0 0;
}

.bell::after {
  right: 14rpx;
  bottom: -13rpx;
  width: 20rpx;
  height: 5rpx;
  border-radius: 5rpx;
  background: #0b1128;
}

.badge {
  position: absolute;
  top: -29rpx;
  right: -24rpx;
  display: flex;
  width: 50rpx;
  height: 50rpx;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #ff1732;
  color: #fff;
  font-size: 28rpx;
  font-weight: 900;
}

.teacher-card {
  width: calc(100% - 16rpx);
  min-height: 92rpx;
  gap: 20rpx;
  margin: 0 8rpx 28rpx;
  padding: 18rpx 30rpx 18rpx 24rpx;
  border: 1rpx solid rgba(198, 243, 219, 0.92);
  border-radius: 30rpx;
  background: linear-gradient(100deg, rgba(237, 255, 247, 0.98), rgba(234, 252, 244, 0.78));
  box-shadow: 0 20rpx 48rpx rgba(25, 103, 69, 0.06);
  text-align: left;
}

.seed-mark {
  position: relative;
  display: flex;
  width: 64rpx;
  height: 64rpx;
  align-items: center;
  justify-content: center;
  flex: 0 0 64rpx;
  border-radius: 50%;
  background: #fff;
}

.seed-mark::before,
.seed-mark::after {
  top: 22rpx;
  width: 23rpx;
  height: 15rpx;
  border-radius: 28rpx 28rpx 4rpx 28rpx;
  background: #0ec165;
}

.seed-mark::before {
  left: 12rpx;
  transform: rotate(28deg);
}

.seed-mark::after {
  right: 12rpx;
  transform: rotate(-38deg);
}

.seed-stem {
  width: 4rpx;
  height: 36rpx;
  border-radius: 6rpx;
  background: #0ec165;
  transform: translateY(10rpx);
}

.teacher-body {
  min-width: 0;
  flex: 1;
}

.teacher-line {
  overflow: hidden;
  color: #252e47;
  font-size: 27rpx;
  line-height: 1.36;
  white-space: nowrap;
}

.teacher-name {
  color: #10172d;
  font-weight: 900;
}

.teacher-line--sub {
  margin-top: 4rpx;
  font-size: 27rpx;
  letter-spacing: 1rpx;
}

.sep {
  margin: 0 16rpx;
  color: #1d2742;
}

.chevron {
  position: relative;
  width: 24rpx;
  height: 24rpx;
  flex: 0 0 auto;
  color: #0bb85d;
}

.chevron::before {
  inset: 0;
  border-top: 5rpx solid currentColor;
  border-right: 5rpx solid currentColor;
  transform: rotate(45deg);
}

.section-card {
  margin-top: 18rpx;
  padding: 30rpx 32rpx;
  border: 1rpx solid rgba(231, 236, 246, 0.95);
  border-radius: 30rpx;
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 22rpx 52rpx rgba(35, 51, 87, 0.07);
}

.section-head {
  justify-content: space-between;
  gap: 18rpx;
}

.section-title {
  color: #10172d;
  font-size: 38rpx;
  font-weight: 900;
  line-height: 1.2;
}

.ready-note {
  gap: 10rpx;
  color: #263654;
  font-size: 25rpx;
  white-space: nowrap;
}

.ready-icon {
  display: flex;
  width: 30rpx;
  height: 30rpx;
  align-items: center;
  justify-content: center;
  border: 4rpx solid #0bb85d;
  border-radius: 50%;
  color: #0bb85d;
  font-size: 20rpx;
  font-weight: 900;
  line-height: 1;
}

.start-card {
  position: relative;
  min-height: 260rpx;
}

.start-main {
  align-items: flex-start;
  gap: 48rpx;
  margin-top: 30rpx;
}

.reflection-art {
  position: relative;
  width: 168rpx;
  height: 168rpx;
  flex: 0 0 168rpx;
  border-radius: 24rpx;
  background: linear-gradient(145deg, #f2ecff, #fbf8ff);
}

.paper {
  position: absolute;
  top: 60rpx;
  left: 58rpx;
  width: 62rpx;
  height: 66rpx;
  border-radius: 12rpx;
  background: linear-gradient(135deg, #b993ff, #8f62f4);
}

.paper::before,
.paper::after {
  left: 18rpx;
  width: 36rpx;
  height: 7rpx;
  border-radius: 999rpx;
  background: #fff;
  opacity: 0.86;
}

.paper::before {
  top: 26rpx;
}

.paper::after {
  top: 47rpx;
}

.pen {
  position: absolute;
  right: 42rpx;
  bottom: 48rpx;
  width: 20rpx;
  height: 66rpx;
  border-radius: 10rpx;
  background: #8f62f4;
  transform: rotate(44deg);
}

.spark {
  width: 26rpx;
  height: 26rpx;
  background: #9a6cff;
  clip-path: polygon(50% 0, 62% 38%, 100% 50%, 62% 62%, 50% 100%, 38% 62%, 0 50%, 38% 38%);
}

.spark--one {
  top: 48rpx;
  right: 42rpx;
}

.spark--two {
  bottom: 58rpx;
  left: 28rpx;
  width: 17rpx;
  height: 17rpx;
}

.start-copy {
  min-width: 0;
  flex: 1;
}

.start-title,
.start-desc,
.growth-title,
.growth-desc,
.recent-title,
.recent-desc {
  display: block;
}

.start-title {
  margin-top: 18rpx;
  color: #111827;
  font-size: 35rpx;
  font-weight: 900;
  line-height: 1.18;
}

.start-desc {
  margin-top: 12rpx;
  color: #31415f;
  font-size: 26rpx;
  line-height: 1.48;
}

.basis-list {
  flex-wrap: wrap;
  gap: 10rpx;
  margin-top: 18rpx;
  padding-right: 180rpx;
}

.basis-pill {
  gap: 8rpx;
  height: 42rpx;
  padding: 0 13rpx;
  border-radius: 12rpx;
  background: #f3efff;
  color: #4d43aa;
  font-size: 22rpx;
  font-weight: 800;
}

.basis-icon {
  position: relative;
  width: 22rpx;
  height: 22rpx;
  flex: 0 0 auto;
  border: 4rpx solid currentColor;
  border-radius: 6rpx;
}

.basis-icon--chart {
  border: 0;
  border-bottom: 4rpx solid currentColor;
  background: linear-gradient(90deg, currentColor 0 22%, transparent 22% 38%, currentColor 38% 60%, transparent 60% 76%, currentColor 76% 100%);
}

.basis-icon--star {
  border: 0;
  background: currentColor;
  clip-path: polygon(50% 0, 61% 36%, 100% 36%, 69% 58%, 81% 95%, 50% 72%, 19% 95%, 31% 58%, 0 36%, 39% 36%);
}

.start-action {
  position: absolute;
  right: 34rpx;
  bottom: 30rpx;
  min-width: 160rpx;
  height: 62rpx;
  padding: 0 30rpx;
  border-radius: 14rpx;
  font-size: 31rpx;
}

.growth-card {
  padding-top: 36rpx;
}

.growth-row {
  gap: 34rpx;
  min-height: 166rpx;
  padding: 28rpx 0;
  border-bottom: 1rpx solid #e8edf5;
}

.growth-row:last-child {
  padding-bottom: 0;
  border-bottom: 0;
}

.growth-visual {
  position: relative;
  display: flex;
  width: 142rpx;
  height: 142rpx;
  align-items: center;
  justify-content: center;
  flex: 0 0 142rpx;
  border-radius: 24rpx;
}

.growth-visual--training {
  background: linear-gradient(145deg, #eef6ff, #f8fbff);
  color: #1677ff;
}

.growth-visual--enterprise {
  background: linear-gradient(145deg, #fff1e8, #fff9f5);
  color: #ff7a1a;
}

.growth-visual--research {
  background: linear-gradient(145deg, #ecfff5, #f8fffb);
  color: #14bf68;
}

.growth-shape {
  position: relative;
  width: 78rpx;
  height: 68rpx;
  background: currentColor;
}

.growth-visual--training .growth-shape {
  clip-path: polygon(50% 0, 100% 34%, 84% 45%, 84% 78%, 50% 100%, 16% 78%, 16% 45%, 0 34%);
}

.growth-visual--enterprise .growth-shape {
  height: 72rpx;
  border-radius: 10rpx;
}

.growth-visual--enterprise .growth-shape::before {
  top: -22rpx;
  left: 22rpx;
  width: 34rpx;
  height: 22rpx;
  border: 9rpx solid currentColor;
  border-bottom: 0;
  border-radius: 12rpx 12rpx 0 0;
}

.growth-visual--enterprise .growth-shape::after {
  left: 30rpx;
  top: 30rpx;
  width: 18rpx;
  height: 18rpx;
  border-radius: 50%;
  background: #fff;
}

.growth-visual--research .growth-shape {
  width: 72rpx;
  height: 72rpx;
  border-radius: 50%;
}

.growth-visual--research .growth-shape::before,
.growth-visual--research .growth-shape::after {
  top: 18rpx;
  width: 34rpx;
  height: 34rpx;
  border-radius: 50%;
  background: rgba(20, 191, 104, 0.58);
}

.growth-visual--research .growth-shape::before {
  left: -34rpx;
}

.growth-visual--research .growth-shape::after {
  right: -34rpx;
}

.growth-copy {
  min-width: 0;
  flex: 1;
}

.growth-title {
  margin-top: 10rpx;
  color: #111827;
  font-size: 30rpx;
  font-weight: 900;
  line-height: 1.2;
}

.growth-desc {
  margin-top: 8rpx;
  color: #31415f;
  font-size: 25rpx;
  line-height: 1.34;
}

.growth-note {
  gap: 10rpx;
  margin-top: 12rpx;
  color: #7d8799;
  font-size: 24rpx;
  line-height: 1.25;
}

.note-icon {
  position: relative;
  width: 24rpx;
  height: 24rpx;
  flex: 0 0 24rpx;
  border: 4rpx solid currentColor;
  border-radius: 50%;
  color: #8b97ad;
}

.note-icon--enterprise {
  border-radius: 8rpx;
}

.note-icon--research {
  border-radius: 4rpx;
}

.row-action {
  min-width: 158rpx;
  height: 58rpx;
  gap: 8rpx;
  flex: 0 0 auto;
  padding: 0 20rpx;
  border-radius: 14rpx;
  font-size: 28rpx;
}

.recent-card {
  margin-bottom: 0;
}

.all-link {
  gap: 8rpx;
  color: #0aa957;
  font-size: 28rpx;
}

.recent-row {
  gap: 24rpx;
  min-height: 78rpx;
  padding: 14rpx 0;
  border-bottom: 1rpx solid #e8edf5;
}

.recent-row:last-child {
  padding-bottom: 0;
  border-bottom: 0;
}

.recent-icon {
  position: relative;
  width: 52rpx;
  height: 52rpx;
  flex: 0 0 52rpx;
  border-radius: 12rpx;
}

.recent-icon--purple {
  background: #f2ecff;
  color: #9164f4;
}

.recent-icon--blue {
  background: #eef6ff;
  color: #1677ff;
}

.recent-icon--orange {
  background: #fff1e8;
  color: #ff7a1a;
}

.recent-icon::before {
  inset: 12rpx;
  border-radius: 6rpx;
  background: currentColor;
}

.recent-icon--blue::before {
  clip-path: polygon(50% 0, 100% 34%, 84% 45%, 84% 78%, 50% 100%, 16% 78%, 16% 45%, 0 34%);
}

.recent-copy {
  min-width: 0;
  flex: 1;
}

.recent-title {
  overflow: hidden;
  color: #111827;
  font-size: 28rpx;
  font-weight: 900;
  line-height: 1.2;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.recent-desc {
  overflow: hidden;
  margin-top: 4rpx;
  color: #31415f;
  font-size: 24rpx;
  line-height: 1.2;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.recent-time {
  color: #31415f;
  font-size: 26rpx;
  line-height: 1.2;
  white-space: nowrap;
}

@media (max-width: 430px) {
  .activity-room-state-page {
    padding-right: 20rpx;
    padding-left: 20rpx;
  }

  .page-head {
    padding-right: 10rpx;
    padding-left: 10rpx;
  }

  .section-card {
    padding: 22rpx 24rpx;
  }

  .start-main {
    gap: 26rpx;
  }

  .reflection-art {
    width: 128rpx;
    height: 128rpx;
    flex-basis: 128rpx;
  }

  .paper {
    top: 44rpx;
    left: 42rpx;
    width: 52rpx;
    height: 56rpx;
  }

  .pen {
    right: 30rpx;
    bottom: 34rpx;
    height: 54rpx;
  }

  .start-title {
    font-size: 31rpx;
  }

  .start-desc {
    font-size: 23rpx;
  }

  .basis-list {
    padding-right: 150rpx;
  }

  .start-action {
    min-width: 142rpx;
    height: 56rpx;
    font-size: 28rpx;
  }

  .growth-row {
    gap: 22rpx;
  }

  .growth-visual {
    width: 116rpx;
    height: 116rpx;
    flex-basis: 116rpx;
  }

  .growth-title {
    font-size: 27rpx;
  }

  .growth-desc {
    font-size: 22rpx;
  }

  .growth-note {
    font-size: 21rpx;
  }

  .row-action {
    min-width: 142rpx;
    height: 54rpx;
    font-size: 25rpx;
  }
}

@media (max-width: 374px) {
  .activity-room-state-page {
    padding-right: 16rpx;
    padding-left: 16rpx;
  }

  .teacher-card {
    width: 100%;
    margin-right: 0;
    margin-left: 0;
  }

  .start-main {
    gap: 18rpx;
  }

  .reflection-art {
    width: 106rpx;
    height: 106rpx;
    flex-basis: 106rpx;
  }

  .basis-list {
    padding-right: 0;
  }

  .start-action {
    position: static;
    width: 100%;
    margin-top: 22rpx;
  }

  .growth-row {
    align-items: flex-start;
    gap: 16rpx;
  }

  .growth-visual {
    width: 92rpx;
    height: 92rpx;
    flex-basis: 92rpx;
  }

  .row-action {
    min-width: 126rpx;
    padding: 0 14rpx;
    font-size: 23rpx;
  }
}
</style>
