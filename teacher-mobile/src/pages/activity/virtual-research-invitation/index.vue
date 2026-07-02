<script setup lang="ts">
import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobileNavbar from '../../../components/MobileNavbar.vue'
import MobileTabBar from '../../../components/MobileTabBar.vue'

const infoRows = [
  { label: '邀请人：', value: '王主任', icon: 'user' },
  { label: '所属组织：', value: '智能制造学院', icon: 'org' },
  { label: '邀请时间：', value: '2026-05-28 09:30', icon: 'time' },
]

const tags = ['课程资源共建', '企业案例整理', '数字化教学']

const activities = [
  { day: '01', title: '课程资源共建研讨', time: '2026-05-31 14:00' },
  { day: '05', title: '数字化教学资源建设讨论', time: '2026-06-04 15:30' },
  { day: '08', title: '课程案例共创碰头会', time: '2026-06-08 10:00' },
]

const benefits = [
  {
    title: '确认个人教研贡献',
    desc: '记录并展示你在教研过程中的贡献。',
    tone: 'green',
  },
  {
    title: '查看腾讯会议纪要',
    desc: '及时了解会议要点与结论。',
    tone: 'blue',
  },
  {
    title: '补充阶段材料',
    desc: '按阶段提交资料，完善教研过程记录。',
    tone: 'purple',
  },
  {
    title: '沉淀教研科研记录',
    desc: '自动整理过程资料，助力成果沉淀与研究。',
    tone: 'orange',
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
  <view class="invitation-page">
    <MobileNavbar title="教研室邀请" size="compact" @back="goBack" />

    <view class="intro">
      <text class="intro-text">确认是否加入教研室，后续可参与活动与贡献确认</text>
    </view>

    <view class="content">
      <MobileCard class="invite-card">
        <view class="invite-main">
          <view class="status-pill">待确认邀请</view>
          <text class="room-title">智能制造课程虚拟教研室</text>
          <text class="room-subtitle">邀请你加入课程资源共建方向</text>

          <view class="info-list">
            <view v-for="row in infoRows" :key="row.label" class="info-row">
              <view class="info-icon" :class="`info-icon--${row.icon}`"></view>
              <text class="info-label">{{ row.label }}</text>
              <text class="info-value">{{ row.value }}</text>
            </view>
          </view>
        </view>

        <view class="group-illustration" aria-hidden="true">
          <view class="spark spark--left"></view>
          <view class="spark spark--right"></view>
          <view class="person person--left"></view>
          <view class="person person--center"></view>
          <view class="person person--right"></view>
        </view>
      </MobileCard>

      <MobileCard class="section-card">
        <text class="section-title">教研室简介</text>
        <text class="section-desc">聚焦智能制造课程资源建设、企业案例共建和数字化教学资源整理。</text>
        <view class="tag-row">
          <view v-for="tag in tags" :key="tag" class="tag-chip">
            <view class="tag-icon"></view>
            <text>{{ tag }}</text>
          </view>
        </view>
      </MobileCard>

      <MobileCard class="section-card activity-card">
        <text class="section-title">近期活动</text>
        <view class="activity-list">
          <view v-for="item in activities" :key="item.title" class="activity-row" @tap="showToast(item.title)">
            <view class="date-badge">
              <view class="date-pin date-pin--left"></view>
              <view class="date-pin date-pin--right"></view>
              <text>{{ item.day }}</text>
            </view>
            <text class="activity-title">{{ item.title }}</text>
            <text class="activity-time">{{ item.time }}</text>
            <view class="row-arrow"></view>
          </view>
        </view>
      </MobileCard>

      <MobileCard class="section-card benefits-card">
        <text class="section-title">加入后你可以参与</text>
        <view class="benefit-list">
          <view v-for="item in benefits" :key="item.title" class="benefit-row">
            <view class="benefit-icon" :class="`benefit-icon--${item.tone}`"></view>
            <view class="benefit-copy">
              <text class="benefit-title">{{ item.title }}</text>
              <text class="benefit-desc">{{ item.desc }}</text>
            </view>
          </view>
        </view>
      </MobileCard>

      <MobileCard class="notice-card" @tap="showToast('贡献待确认')">
        <view class="notice-icon"></view>
        <view class="notice-copy">
          <text class="notice-title">加入后有 1 项贡献待确认</text>
          <text class="notice-desc">系统可根据会议纪要、任务分工和过程材料帮你整理教研记录。</text>
        </view>
        <view class="notice-arrow"></view>
      </MobileCard>

      <text class="footer-tip">确认加入后，可在“我的教研室”中查看活动与贡献记录。</text>
    </view>

    <view class="fixed-actions">
      <MobileActionButton class="action-button action-button--ghost" variant="outline" @tap="showToast('暂不加入')">
        暂不加入
      </MobileActionButton>
      <MobileActionButton class="action-button action-button--primary" variant="primary" @tap="showToast('确认加入')">
        确认加入
      </MobileActionButton>
    </view>

    <MobileTabBar active="activity" />
  </view>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.invitation-page {
  min-height: 100vh;
  padding-bottom: calc(332rpx + env(safe-area-inset-bottom));
  overflow-x: hidden;
  background:
    radial-gradient(circle at 82% 4%, rgba(218, 250, 231, 0.74), transparent 26%),
    linear-gradient(180deg, #fdfffe 0%, #ffffff 48%, #f7fbfa 100%);
  color: #10172d;
}

.intro {
  margin-top: -18rpx;
  padding: 0 34rpx 28rpx;
  text-align: center;
}

.intro-text,
.room-title,
.room-subtitle,
.section-title,
.section-desc,
.activity-title,
.activity-time,
.benefit-title,
.benefit-desc,
.notice-title,
.notice-desc,
.footer-tip {
  display: block;
}

.intro-text {
  color: #263b67;
  font-size: 29rpx;
  line-height: 1.36;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 28rpx;
  padding: 0 34rpx;
}

.invite-card {
  display: flex;
  align-items: center;
  gap: 28rpx;
  padding: 28rpx;
  border-color: #d9efe4;
  border-radius: 24rpx;
}

.invite-main {
  min-width: 0;
  flex: 1;
}

.status-pill {
  display: inline-flex;
  align-items: center;
  height: 48rpx;
  padding: 0 18rpx;
  border-radius: 12rpx;
  background: #e8fbf0;
  color: #08a85c;
  font-size: 27rpx;
  font-weight: 900;
}

.room-title {
  margin-top: 30rpx;
  color: #071026;
  font-size: 39rpx;
  font-weight: 900;
  line-height: 1.22;
}

.room-subtitle {
  margin-top: 22rpx;
  color: #264675;
  font-size: 29rpx;
  line-height: 1.36;
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  margin-top: 32rpx;
}

.info-row {
  display: flex;
  align-items: center;
  min-width: 0;
  color: #304465;
  font-size: 27rpx;
  line-height: 1.25;
}

.info-icon {
  position: relative;
  flex: 0 0 auto;
  width: 38rpx;
  height: 38rpx;
  margin-right: 20rpx;
  color: #53627f;
}

.info-icon::before,
.info-icon::after,
.tag-icon::before,
.tag-icon::after,
.benefit-icon::before,
.benefit-icon::after,
.notice-icon::before,
.notice-icon::after {
  position: absolute;
  content: '';
}

.info-icon--user::before {
  top: 4rpx;
  left: 11rpx;
  width: 16rpx;
  height: 16rpx;
  border: 4rpx solid currentColor;
  border-radius: 50%;
}

.info-icon--user::after {
  right: 4rpx;
  bottom: 2rpx;
  left: 4rpx;
  height: 16rpx;
  border: 4rpx solid currentColor;
  border-radius: 18rpx 18rpx 4rpx 4rpx;
}

.info-icon--org::before {
  inset: 3rpx 8rpx 2rpx;
  border: 4rpx solid currentColor;
  border-radius: 4rpx;
}

.info-icon--org::after {
  left: 15rpx;
  top: 12rpx;
  width: 7rpx;
  height: 7rpx;
  background: currentColor;
  box-shadow: 0 12rpx 0 currentColor, 10rpx 0 0 currentColor, 10rpx 12rpx 0 currentColor;
}

.info-icon--time::before {
  inset: 3rpx;
  border: 4rpx solid currentColor;
  border-radius: 50%;
}

.info-icon--time::after {
  left: 18rpx;
  top: 9rpx;
  width: 4rpx;
  height: 14rpx;
  border-radius: 4rpx;
  background: currentColor;
  box-shadow: 8rpx 12rpx 0 -1rpx currentColor;
}

.info-label {
  flex: 0 0 auto;
  color: #53627f;
}

.info-value {
  min-width: 0;
  color: #273a61;
}

.group-illustration {
  position: relative;
  flex: 0 0 auto;
  width: 178rpx;
  height: 178rpx;
  border-radius: 28rpx;
  background: linear-gradient(145deg, #f5fbf8, #eaf8f1);
}

.spark {
  position: absolute;
  width: 14rpx;
  height: 14rpx;
  background: #76d99f;
  clip-path: polygon(50% 0, 62% 38%, 100% 50%, 62% 62%, 50% 100%, 38% 62%, 0 50%, 38% 38%);
}

.spark--left {
  top: 46rpx;
  left: 52rpx;
}

.spark--right {
  top: 35rpx;
  right: 43rpx;
}

.person {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(180deg, #80dfa4, #16bf68);
}

.person--center {
  top: 53rpx;
  left: 66rpx;
  width: 58rpx;
  height: 58rpx;
}

.person--center::after {
  position: absolute;
  top: 68rpx;
  left: -17rpx;
  width: 92rpx;
  height: 58rpx;
  border-radius: 46rpx 46rpx 14rpx 14rpx;
  background: linear-gradient(180deg, #6bdc96, #10b966);
  content: '';
}

.person--left,
.person--right {
  top: 76rpx;
  width: 36rpx;
  height: 36rpx;
}

.person--left {
  left: 36rpx;
}

.person--right {
  right: 34rpx;
}

.person--left::after,
.person--right::after {
  position: absolute;
  top: 45rpx;
  width: 54rpx;
  height: 44rpx;
  border-radius: 27rpx 27rpx 10rpx 10rpx;
  background: linear-gradient(180deg, #57d889, #10b966);
  content: '';
}

.person--left::after {
  left: -17rpx;
}

.person--right::after {
  right: -17rpx;
}

.section-card {
  padding: 28rpx;
  border-radius: 24rpx;
}

.section-title {
  color: #071026;
  font-size: 34rpx;
  font-weight: 900;
  line-height: 1.25;
}

.section-desc {
  margin-top: 26rpx;
  color: #17243d;
  font-size: 29rpx;
  line-height: 1.55;
}

.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
  margin-top: 28rpx;
}

.tag-chip {
  display: flex;
  align-items: center;
  gap: 11rpx;
  height: 50rpx;
  padding: 0 18rpx;
  border-radius: 10rpx;
  background: #eaf8f0;
  color: #087d45;
  font-size: 25rpx;
  font-weight: 800;
}

.tag-icon {
  position: relative;
  width: 25rpx;
  height: 25rpx;
}

.tag-icon::before {
  inset: 3rpx 5rpx;
  border: 3rpx solid currentColor;
  border-radius: 3rpx;
}

.tag-icon::after {
  left: 10rpx;
  top: 8rpx;
  width: 6rpx;
  height: 12rpx;
  border-left: 3rpx solid currentColor;
  border-right: 3rpx solid currentColor;
}

.activity-card {
  overflow: hidden;
}

.activity-list {
  margin-top: 24rpx;
}

.activity-row {
  display: grid;
  grid-template-columns: 64rpx minmax(0, 1fr) auto 18rpx;
  align-items: center;
  gap: 24rpx;
  min-height: 84rpx;
  border-bottom: 1rpx solid #e8edf4;
}

.activity-row:last-child {
  border-bottom: 0;
}

.date-badge {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56rpx;
  height: 56rpx;
  border: 4rpx solid #10b966;
  border-radius: 9rpx;
  color: #08a85c;
  font-size: 25rpx;
  font-weight: 900;
}

.date-pin {
  position: absolute;
  top: -10rpx;
  width: 7rpx;
  height: 15rpx;
  border-radius: 4rpx;
  background: #10b966;
}

.date-pin--left {
  left: 11rpx;
}

.date-pin--right {
  right: 11rpx;
}

.activity-title {
  color: #111827;
  font-size: 28rpx;
  font-weight: 900;
  line-height: 1.22;
}

.activity-time {
  color: #263b67;
  font-size: 28rpx;
  white-space: nowrap;
}

.row-arrow,
.notice-arrow {
  width: 17rpx;
  height: 17rpx;
  border-top: 4rpx solid currentColor;
  border-right: 4rpx solid currentColor;
  color: #344560;
  transform: rotate(45deg);
}

.benefit-list {
  display: flex;
  flex-direction: column;
  gap: 28rpx;
  margin-top: 28rpx;
}

.benefit-row {
  display: flex;
  align-items: center;
  gap: 24rpx;
}

.benefit-icon {
  position: relative;
  flex: 0 0 auto;
  width: 76rpx;
  height: 76rpx;
  border-radius: 16rpx;
}

.benefit-icon--green {
  background: #e6fbf0;
  color: #10b966;
}

.benefit-icon--blue {
  background: #eaf3ff;
  color: #3387f4;
}

.benefit-icon--purple {
  background: #f0e9ff;
  color: #8b5cf6;
}

.benefit-icon--orange {
  background: #fff2dc;
  color: #f59e0b;
}

.benefit-icon--green::before {
  left: 18rpx;
  top: 18rpx;
  width: 28rpx;
  height: 28rpx;
  border-radius: 50%;
  background: currentColor;
}

.benefit-icon--green::after {
  left: 14rpx;
  bottom: 13rpx;
  width: 40rpx;
  height: 27rpx;
  border-radius: 24rpx 24rpx 8rpx 8rpx;
  background: currentColor;
  box-shadow: 26rpx 3rpx 0 -12rpx currentColor;
}

.benefit-icon--blue::before {
  inset: 14rpx 20rpx;
  border-radius: 6rpx;
  background: currentColor;
}

.benefit-icon--blue::after {
  left: 26rpx;
  top: 28rpx;
  width: 24rpx;
  height: 4rpx;
  background: #fff;
  box-shadow: 0 12rpx 0 #fff;
}

.benefit-icon--purple::before {
  left: 13rpx;
  top: 24rpx;
  width: 50rpx;
  height: 34rpx;
  border-radius: 7rpx;
  background: currentColor;
}

.benefit-icon--purple::after {
  left: 21rpx;
  top: 18rpx;
  width: 26rpx;
  height: 14rpx;
  border-radius: 6rpx 6rpx 0 0;
  background: currentColor;
}

.benefit-icon--orange::before {
  left: 16rpx;
  top: 16rpx;
  width: 20rpx;
  height: 42rpx;
  border: 4rpx solid currentColor;
  border-right: 0;
  border-radius: 8rpx 0 0 8rpx;
}

.benefit-icon--orange::after {
  right: 16rpx;
  top: 16rpx;
  width: 20rpx;
  height: 42rpx;
  border: 4rpx solid currentColor;
  border-left: 0;
  border-radius: 0 8rpx 8rpx 0;
}

.benefit-copy {
  min-width: 0;
}

.benefit-title {
  color: #111827;
  font-size: 29rpx;
  font-weight: 900;
  line-height: 1.24;
}

.benefit-desc {
  margin-top: 7rpx;
  color: #263b67;
  font-size: 25rpx;
  line-height: 1.35;
}

.notice-card {
  display: flex;
  align-items: center;
  gap: 22rpx;
  padding: 24rpx 28rpx;
  border-color: #cdeedd;
  border-radius: 24rpx;
  background: linear-gradient(105deg, #edfbf5, #f8fffb);
}

.notice-icon {
  position: relative;
  flex: 0 0 auto;
  width: 76rpx;
  height: 76rpx;
  border-radius: 16rpx;
  background: linear-gradient(180deg, #22cc72, #05aa52);
}

.notice-icon::before {
  left: 21rpx;
  top: 16rpx;
  width: 29rpx;
  height: 36rpx;
  border: 5rpx solid #fff;
  border-radius: 5rpx;
}

.notice-icon::after {
  right: 8rpx;
  bottom: 8rpx;
  width: 30rpx;
  height: 30rpx;
  border-radius: 50%;
  background: #fff;
  box-shadow: inset 0 0 0 6rpx #11b965;
}

.notice-copy {
  min-width: 0;
  flex: 1;
}

.notice-title {
  color: #111827;
  font-size: 31rpx;
  font-weight: 900;
  line-height: 1.25;
}

.notice-desc {
  margin-top: 10rpx;
  color: #263b67;
  font-size: 25rpx;
  line-height: 1.36;
}

.notice-arrow {
  flex: 0 0 auto;
  border-color: #10b966;
}

.footer-tip {
  padding: 8rpx 18rpx 0;
  color: #263b67;
  font-size: 28rpx;
  line-height: 1.45;
  text-align: center;
}

.fixed-actions {
  position: fixed;
  right: 0;
  bottom: calc(164rpx + env(safe-area-inset-bottom));
  left: 0;
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr 1.07fr;
  gap: 36rpx;
  padding: 22rpx 40rpx;
  background: rgba(255, 255, 255, 0.93);
  box-shadow: 0 -18rpx 38rpx rgba(31, 45, 78, 0.08);
  backdrop-filter: blur(12rpx);
}

.action-button {
  height: 76rpx;
  border-radius: 14rpx;
  font-size: 31rpx;
}

.action-button--ghost {
  border-color: #b9c1cf;
  color: #273a61;
}

@media (max-width: 430px) {
  .invitation-page {
    padding-bottom: calc(318rpx + env(safe-area-inset-bottom));
  }

  .intro {
    padding-bottom: 18rpx;
  }

  .intro-text {
    font-size: 25rpx;
  }

  .content {
    gap: 20rpx;
    padding-right: 20rpx;
    padding-left: 20rpx;
  }

  .invite-card,
  .section-card {
    padding: 22rpx;
  }

  .invite-card {
    gap: 18rpx;
  }

  .status-pill {
    height: 42rpx;
    font-size: 23rpx;
  }

  .room-title {
    margin-top: 22rpx;
    font-size: 33rpx;
  }

  .room-subtitle {
    margin-top: 14rpx;
    font-size: 25rpx;
  }

  .info-list {
    gap: 15rpx;
    margin-top: 24rpx;
  }

  .info-row {
    font-size: 24rpx;
  }

  .group-illustration {
    width: 152rpx;
    height: 152rpx;
    border-radius: 24rpx;
  }

  .section-title {
    font-size: 30rpx;
  }

  .section-desc {
    margin-top: 18rpx;
    font-size: 25rpx;
  }

  .tag-row {
    gap: 14rpx;
    margin-top: 22rpx;
  }

  .tag-chip {
    height: 44rpx;
    padding-right: 14rpx;
    padding-left: 14rpx;
    font-size: 22rpx;
  }

  .activity-list {
    margin-top: 18rpx;
  }

  .activity-row {
    grid-template-columns: 58rpx minmax(0, 1fr) auto 14rpx;
    gap: 16rpx;
    min-height: 74rpx;
  }

  .date-badge {
    width: 50rpx;
    height: 50rpx;
    font-size: 22rpx;
  }

  .activity-title,
  .activity-time {
    font-size: 24rpx;
  }

  .benefit-list {
    gap: 19rpx;
    margin-top: 20rpx;
  }

  .benefit-row {
    gap: 18rpx;
  }

  .benefit-icon {
    width: 64rpx;
    height: 64rpx;
  }

  .benefit-title {
    font-size: 25rpx;
  }

  .benefit-desc,
  .notice-desc {
    font-size: 22rpx;
  }

  .notice-card {
    gap: 18rpx;
    padding: 20rpx 22rpx;
  }

  .notice-icon {
    width: 64rpx;
    height: 64rpx;
  }

  .notice-title {
    font-size: 27rpx;
  }

  .footer-tip {
    padding-top: 2rpx;
    font-size: 24rpx;
  }

  .fixed-actions {
    bottom: calc(158rpx + env(safe-area-inset-bottom));
    gap: 26rpx;
    padding: 18rpx 20rpx;
  }

  .action-button {
    height: 66rpx;
    font-size: 27rpx;
  }
}

@media (max-width: 374px) {
  .content {
    padding-right: 14rpx;
    padding-left: 14rpx;
  }

  .intro {
    padding-right: 18rpx;
    padding-left: 18rpx;
  }

  .invite-card {
    align-items: flex-start;
  }

  .group-illustration {
    width: 118rpx;
    height: 118rpx;
  }

  .room-title {
    font-size: 29rpx;
  }

  .info-icon {
    margin-right: 12rpx;
  }

  .activity-row {
    grid-template-columns: 54rpx minmax(0, 1fr) 14rpx;
    gap: 12rpx;
    padding: 9rpx 0;
  }

  .activity-time {
    grid-column: 2 / 3;
    margin-top: -8rpx;
    font-size: 21rpx;
  }

  .row-arrow {
    grid-column: 3 / 4;
    grid-row: 1 / 3;
  }

  .fixed-actions {
    gap: 18rpx;
    padding-right: 14rpx;
    padding-left: 14rpx;
  }
}
</style>
