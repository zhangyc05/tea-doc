<script setup lang="ts">
import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobileNavbar from '../../../components/MobileNavbar.vue'
import MobileTabBar from '../../../components/MobileTabBar.vue'
import { recordMemberProfileAction } from '../../../domain/virtualResearch'

const viewEntries = [
  { icon: 'calendar', title: '教研活动', desc: '查看活动安排与参与记录', url: '/pages/activity/virtual-research-activity-list/index?from=member-profile' },
  { icon: 'note', title: '会议纪要', desc: '查看腾讯会议整理内容', url: '/pages/activity/virtual-research-activity-detail-ongoing/index?from=member-profile' },
  { icon: 'folder', title: '阶段材料', desc: '补充过程材料与成果资料', url: '/pages/activity/virtual-research-skill-management/index?from=member-profile' },
  { icon: 'star', title: '个人贡献', desc: '查看个人教研贡献记录', url: '/pages/activity/virtual-research-contribution-detail/index?from=member-profile' },
]

function goBack() {
  uni.navigateBack()
}

function goResearchRoom() {
  uni.navigateTo({ url: '/pages/activity/virtual-research-room/index' })
}

function goContributionConfirm() {
  uni.navigateTo({ url: '/pages/activity/virtual-research-confirm-contribution/index' })
}

function goMemberEntry(entry: { title: string; url: string }) {
  recordMemberProfileAction(`查看${entry.title}`)
  uni.navigateTo({ url: entry.url })
}
</script>

<template>
  <view class="joined-room-page">
    <MobileNavbar title="已加入教研室" size="compact" @back="goBack" />
    <text class="page-subtitle">你已加入智能制造课程虚拟教研室</text>
    <text class="page-subtitle">虚拟教研成员资料</text>

    <view class="content">
      <MobileCard class="room-card">
        <view class="room-copy">
          <view class="room-heading">
            <text class="joined-chip">已加入</text>
            <text class="room-title">智能制造课程虚拟教研室</text>
          </view>
          <text class="room-direction">课程资源共建方向</text>
          <view class="info-list">
            <view class="info-row">
              <view class="info-icon info-icon--building" aria-hidden="true"></view>
              <text class="info-label">所属组织：</text>
              <text class="info-value">智能制造学院</text>
            </view>
            <view class="info-row">
              <view class="info-icon info-icon--clock" aria-hidden="true"></view>
              <text class="info-label">加入时间：</text>
              <text class="info-value">2026-05-28 09:42</text>
            </view>
          </view>
          <text class="room-desc">你已成功加入该教研室，后续可参与活动与个人贡献确认。</text>
        </view>
        <view class="room-art" aria-hidden="true">
          <view class="art-board"></view>
          <view class="art-person art-person--left"></view>
          <view class="art-person art-person--center"></view>
          <view class="art-person art-person--right"></view>
          <view class="spark spark--one"></view>
          <view class="spark spark--two"></view>
        </view>
      </MobileCard>

      <view class="section-block">
        <text class="section-title">接下来可处理</text>
        <MobileCard class="next-card" @tap="goContributionConfirm">
          <view class="task-icon" aria-hidden="true"></view>
          <view class="task-copy">
            <view class="task-title-row">
              <text class="task-title">设备调试案例整理</text>
              <text class="warning-chip">待确认</text>
            </view>
            <text class="task-desc">
              系统已根据会议纪要和任务分工识别出 1 项个人贡献，请确认是否准确。
            </text>
            <view class="tag-row">
              <text class="source-tag">会议纪要</text>
              <text class="source-tag">任务分工</text>
            </view>
          </view>
          <view class="row-arrow row-arrow--green" aria-hidden="true"></view>
        </MobileCard>
      </view>

      <view class="section-block">
        <text class="section-title">加入后可查看</text>
        <MobileCard class="view-card">
          <button
            v-for="entry in viewEntries"
            :key="entry.title"
            class="view-row"
            @tap="goMemberEntry(entry)"
          >
            <view class="view-icon" :class="`view-icon--${entry.icon}`" aria-hidden="true"></view>
            <view class="view-copy">
              <text class="view-title">{{ entry.title }}</text>
              <text class="view-desc">{{ entry.desc }}</text>
            </view>
            <view class="row-arrow" aria-hidden="true"></view>
          </button>
        </MobileCard>
      </view>

      <view class="reminder-card">
        <view class="reminder-icon" aria-hidden="true"></view>
        <view class="reminder-copy">
          <text class="reminder-title">当前提醒</text>
          <text class="reminder-text">
            加入后有 1 项个人贡献待确认，确认后将进入教研活动归档流程。
          </text>
        </view>
      </view>
    </view>

    <view class="fixed-actions">
      <MobileActionButton class="outline-action" variant="outline" @tap="goResearchRoom">
        返回我的教研室
      </MobileActionButton>
      <MobileActionButton class="primary-action" variant="primary" @tap="goContributionConfirm">
        去确认贡献
      </MobileActionButton>
    </view>

    <MobileTabBar active="assistant" />
  </view>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.joined-room-page {
  min-height: 100vh;
  padding-bottom: calc(282rpx + env(safe-area-inset-bottom));
  overflow-x: hidden;
  background:
    radial-gradient(circle at 84% 4%, rgba(225, 252, 238, 0.9), transparent 30%),
    linear-gradient(180deg, #ffffff 0%, #f8fcff 46%, #f6fbf7 100%);
  color: #10172d;
}

.page-subtitle {
  display: block;
  margin: -2rpx 34rpx 22rpx;
  color: #40506b;
  font-size: 27rpx;
  font-weight: 700;
  line-height: 1.25;
  text-align: center;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 22rpx;
  padding: 0 30rpx;
}

.room-card,
.next-card,
.view-card {
  border-radius: 26rpx;
  box-shadow: 0 18rpx 48rpx rgba(22, 42, 72, 0.06);
}

.room-card {
  position: relative;
  display: flex;
  min-height: 278rpx;
  gap: 18rpx;
  overflow: hidden;
  padding: 28rpx 28rpx 26rpx;
}

.room-card::after {
  position: absolute;
  right: -56rpx;
  bottom: -72rpx;
  width: 210rpx;
  height: 210rpx;
  border-radius: 50%;
  background: rgba(18, 196, 105, 0.08);
  content: '';
}

.room-copy {
  position: relative;
  z-index: 1;
  min-width: 0;
  flex: 1;
}

.room-heading,
.task-title-row,
.info-row,
.tag-row,
.next-card,
.view-row,
.reminder-card,
.fixed-actions {
  display: flex;
  align-items: center;
}

.room-heading {
  align-items: flex-start;
  flex-direction: column;
  gap: 12rpx;
}

.joined-chip,
.warning-chip,
.source-tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 10rpx;
  font-weight: 900;
  line-height: 1;
  white-space: nowrap;
}

.joined-chip {
  height: 38rpx;
  padding: 0 16rpx;
  background: #e6f8eb;
  color: #08a85c;
  font-size: 22rpx;
}

.room-title,
.room-direction,
.room-desc,
.section-title,
.task-title,
.task-desc,
.view-title,
.view-desc,
.reminder-title,
.reminder-text {
  display: block;
}

.room-title {
  color: #111827;
  font-size: 32rpx;
  font-weight: 900;
  line-height: 1.2;
}

.room-direction {
  margin-top: 12rpx;
  color: #304c7a;
  font-size: 24rpx;
  font-weight: 700;
}

.info-list {
  margin-top: 24rpx;
}

.info-row + .info-row {
  margin-top: 16rpx;
}

.info-icon {
  position: relative;
  width: 30rpx;
  height: 30rpx;
  flex: 0 0 auto;
  margin-right: 16rpx;
  color: #43567a;
}

.info-icon::before,
.info-icon::after,
.task-icon::before,
.task-icon::after,
.row-arrow::before,
.view-icon::before,
.view-icon::after,
.reminder-icon::before,
.reminder-icon::after,
.art-board::before,
.art-board::after,
.spark::before {
  position: absolute;
  content: '';
}

.info-icon--building::before {
  inset: 3rpx 6rpx 2rpx;
  border: 4rpx solid currentColor;
  border-radius: 3rpx;
}

.info-icon--building::after {
  top: 13rpx;
  left: 13rpx;
  width: 4rpx;
  height: 14rpx;
  background: currentColor;
  box-shadow: -6rpx 0 0 currentColor, 6rpx 0 0 currentColor;
}

.info-icon--clock::before {
  inset: 3rpx;
  border: 4rpx solid currentColor;
  border-radius: 50%;
}

.info-icon--clock::after {
  top: 9rpx;
  left: 14rpx;
  width: 11rpx;
  height: 11rpx;
  border-bottom: 4rpx solid currentColor;
  border-left: 4rpx solid currentColor;
}

.info-label,
.info-value {
  color: #314a77;
  font-size: 24rpx;
  font-weight: 700;
  line-height: 1.2;
}

.room-desc {
  margin-top: 26rpx;
  color: #304c7a;
  font-size: 24rpx;
  line-height: 1.5;
}

.room-art {
  position: relative;
  z-index: 1;
  width: 210rpx;
  flex: 0 0 auto;
}

.art-board {
  position: absolute;
  top: 44rpx;
  right: 10rpx;
  width: 132rpx;
  height: 126rpx;
  border: 12rpx solid #d7f7e7;
  border-radius: 18rpx;
}

.art-board::before {
  top: 32rpx;
  right: 20rpx;
  width: 22rpx;
  height: 22rpx;
  border-radius: 50%;
  background: #7edda9;
}

.art-person {
  position: absolute;
  bottom: 38rpx;
  width: 56rpx;
  height: 54rpx;
  border-radius: 32rpx 32rpx 8rpx 8rpx;
  background: linear-gradient(180deg, #59dc91, #0fbe64);
}

.art-person::before {
  position: absolute;
  top: -38rpx;
  left: 10rpx;
  width: 36rpx;
  height: 36rpx;
  border-radius: 50%;
  background: #58dc91;
  content: '';
}

.art-person--left {
  right: 128rpx;
  transform: scale(0.78);
}

.art-person--center {
  right: 70rpx;
  width: 72rpx;
  height: 68rpx;
  z-index: 2;
}

.art-person--center::before {
  left: 15rpx;
  width: 44rpx;
  height: 44rpx;
}

.art-person--right {
  right: 20rpx;
  transform: scale(0.78);
}

.spark {
  position: absolute;
  width: 26rpx;
  height: 26rpx;
  color: #9aeec2;
}

.spark--one {
  top: 76rpx;
  left: 12rpx;
}

.spark--two {
  top: 94rpx;
  right: -8rpx;
  transform: scale(0.7);
}

.spark::before {
  inset: 0;
  background: currentColor;
  clip-path: polygon(50% 0, 62% 38%, 100% 50%, 62% 62%, 50% 100%, 38% 62%, 0 50%, 38% 38%);
}

.section-block {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.section-title {
  color: #10172d;
  font-size: 31rpx;
  font-weight: 900;
  line-height: 1.2;
}

.next-card {
  gap: 26rpx;
  padding: 24rpx 26rpx;
}

.task-icon {
  position: relative;
  width: 98rpx;
  height: 98rpx;
  flex: 0 0 auto;
  border-radius: 18rpx;
  background: linear-gradient(145deg, #e9fbf2, #f7fffb);
}

.task-icon::before {
  top: 25rpx;
  left: 30rpx;
  width: 42rpx;
  height: 50rpx;
  border-radius: 8rpx;
  background: linear-gradient(180deg, #20cf7a, #08b75a);
  clip-path: polygon(0 0, 74% 0, 100% 26%, 100% 100%, 0 100%);
}

.task-icon::after {
  right: 16rpx;
  bottom: 14rpx;
  width: 30rpx;
  height: 30rpx;
  border: 5rpx solid #fff;
  border-radius: 50%;
  background: #17c76d;
  box-shadow: 0 4rpx 10rpx rgba(11, 157, 82, 0.22);
}

.task-copy {
  min-width: 0;
  flex: 1;
}

.task-title-row {
  gap: 16rpx;
}

.task-title {
  overflow: hidden;
  color: #10172d;
  font-size: 29rpx;
  font-weight: 900;
  line-height: 1.25;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.warning-chip {
  height: 38rpx;
  padding: 0 15rpx;
  background: #fff1e6;
  color: #ff7b1a;
  font-size: 21rpx;
}

.task-desc {
  margin-top: 12rpx;
  color: #304c7a;
  font-size: 24rpx;
  line-height: 1.45;
}

.tag-row {
  gap: 18rpx;
  margin-top: 14rpx;
}

.source-tag {
  height: 36rpx;
  padding: 0 16rpx;
  background: #eaf9ef;
  color: #08a85c;
  font-size: 21rpx;
}

.row-arrow {
  position: relative;
  width: 22rpx;
  height: 22rpx;
  flex: 0 0 auto;
  color: #8b96aa;
}

.row-arrow--green {
  color: #08b75a;
}

.row-arrow::before {
  inset: 0;
  border-top: 5rpx solid currentColor;
  border-right: 5rpx solid currentColor;
  transform: rotate(45deg);
}

.view-card {
  padding: 0 28rpx;
}

.view-row {
  gap: 28rpx;
  min-height: 92rpx;
  margin: 0;
  padding: 18rpx 0;
  border: 0;
  background: transparent;
  color: inherit;
  line-height: 1;
  text-align: left;
}

.view-row::after {
  display: none;
}

.view-row + .view-row {
  border-top: 1rpx solid #eef2f6;
}

.view-icon {
  position: relative;
  width: 58rpx;
  height: 58rpx;
  flex: 0 0 auto;
  border-radius: 12rpx;
}

.view-icon--calendar {
  background: #eafbf1;
  color: #11bd68;
}

.view-icon--note {
  background: #ecf5ff;
  color: #2f7eef;
}

.view-icon--folder {
  background: #f3edff;
  color: #8656ef;
}

.view-icon--star {
  background: #fff2e3;
  color: #ff9a12;
}

.view-icon::before {
  inset: 15rpx 14rpx;
  background: currentColor;
}

.view-icon--calendar::before {
  border-radius: 5rpx;
}

.view-icon--calendar::after {
  top: 24rpx;
  left: 20rpx;
  width: 18rpx;
  height: 4rpx;
  background: #fff;
  box-shadow: 0 10rpx 0 #fff;
}

.view-icon--note::before {
  border-radius: 5rpx;
  clip-path: polygon(0 0, 72% 0, 100% 28%, 100% 100%, 0 100%);
}

.view-icon--folder::before {
  border-radius: 6rpx;
  clip-path: polygon(0 20%, 36% 20%, 46% 0, 100% 0, 100% 100%, 0 100%);
}

.view-icon--star::before {
  clip-path: polygon(50% 0, 62% 35%, 100% 35%, 69% 56%, 82% 92%, 50% 70%, 18% 92%, 31% 56%, 0 35%, 38% 35%);
}

.view-copy {
  min-width: 0;
  flex: 1;
}

.view-title {
  color: #10172d;
  font-size: 26rpx;
  font-weight: 900;
  line-height: 1.2;
}

.view-desc {
  margin-top: 10rpx;
  color: #304c7a;
  font-size: 22rpx;
  line-height: 1.25;
}

.reminder-card {
  gap: 24rpx;
  padding: 20rpx 24rpx;
  border: 1rpx solid rgba(14, 193, 104, 0.16);
  border-radius: 18rpx;
  background: linear-gradient(90deg, #edfcf4, #f6fff9);
}

.reminder-icon {
  position: relative;
  width: 60rpx;
  height: 60rpx;
  flex: 0 0 auto;
  border-radius: 12rpx;
  background: #dcfae9;
  color: #10bd67;
}

.reminder-icon::before {
  top: 13rpx;
  left: 18rpx;
  width: 24rpx;
  height: 27rpx;
  border: 5rpx solid currentColor;
  border-radius: 16rpx 16rpx 10rpx 10rpx;
}

.reminder-icon::after {
  bottom: 11rpx;
  left: 27rpx;
  width: 7rpx;
  height: 7rpx;
  border-radius: 50%;
  background: currentColor;
}

.reminder-copy {
  min-width: 0;
  flex: 1;
}

.reminder-title {
  color: #10172d;
  font-size: 26rpx;
  font-weight: 900;
  line-height: 1.2;
}

.reminder-text {
  margin-top: 8rpx;
  color: #304c7a;
  font-size: 23rpx;
  line-height: 1.4;
}

.fixed-actions {
  position: fixed;
  right: 0;
  bottom: calc(146rpx + env(safe-area-inset-bottom));
  left: 0;
  z-index: 20;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 34rpx;
  padding: 22rpx 40rpx 20rpx;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(14rpx);
}

.outline-action,
.primary-action {
  height: 72rpx;
  border-radius: 12rpx;
  font-size: 29rpx;
}

.outline-action {
  border-color: #06b95e;
  color: #08a85c;
}

.primary-action {
  background: linear-gradient(135deg, #10c66d, #00ae55);
}

@media (max-width: 390px) {
  .content {
    padding-right: 24rpx;
    padding-left: 24rpx;
  }

  .room-card {
    padding: 24rpx;
  }

  .room-title {
    font-size: 29rpx;
  }

  .room-art {
    width: 170rpx;
  }

  .art-board {
    right: 0;
    width: 110rpx;
    height: 112rpx;
  }

  .art-person--left {
    right: 102rpx;
  }

  .art-person--center {
    right: 52rpx;
  }

  .next-card {
    gap: 20rpx;
    padding: 22rpx;
  }

  .task-icon {
    width: 82rpx;
    height: 82rpx;
  }

  .task-title {
    font-size: 26rpx;
  }

  .task-desc,
  .room-desc,
  .info-label,
  .info-value {
    font-size: 22rpx;
  }

  .view-card {
    padding-right: 22rpx;
    padding-left: 22rpx;
  }

  .fixed-actions {
    gap: 18rpx;
    padding-right: 24rpx;
    padding-left: 24rpx;
  }

  .outline-action,
  .primary-action {
    height: 66rpx;
    font-size: 25rpx;
  }
}

@media (max-width: 374px) {
  .room-art {
    display: none;
  }

  .room-card {
    min-height: auto;
  }

  .next-card {
    align-items: flex-start;
  }

  .task-title-row {
    align-items: flex-start;
    flex-direction: column;
    gap: 10rpx;
  }
}
</style>
