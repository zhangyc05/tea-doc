<script setup lang="ts">
import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobileNavbar from '../../../components/MobileNavbar.vue'
import MobileTabBar from '../../../components/MobileTabBar.vue'

const viewEntries = [
  { icon: 'calendar', title: '教研活动', desc: '查看活动安排与参与记录' },
  { icon: 'note', title: '会议纪要', desc: '查看腾讯会议整理内容' },
  { icon: 'folder', title: '阶段材料', desc: '补充过程材料与成果资料' },
  { icon: 'star', title: '个人贡献', desc: '查看个人教研贡献记录' },
]

function goBack() {
  uni.navigateBack()
}

function showToast(title: string) {
  uni.showToast({ title, icon: 'none' })
}
</script>

<template>
  <view class="joined-room-page">
    <MobileNavbar title="已加入教研室" size="compact" @back="goBack" />
    <text class="page-subtitle">你已加入智能制造课程虚拟教研室</text>

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
              <text class="info-label">所属组织：</text>
              <text class="info-value">智能制造学院</text>
            </view>
            <view class="info-row">
              <text class="info-label">加入时间：</text>
              <text class="info-value">2026-05-28 09:42</text>
            </view>
          </view>
          <text class="room-desc">你已成功加入该教研室，后续可参与活动与个人贡献确认。</text>
        </view>
        <view class="room-art" aria-hidden="true">
          <view class="art-board"></view>
          <view class="art-person art-person--left"></view>
          <view class="art-person art-person--right"></view>
        </view>
      </MobileCard>

      <view class="section-block">
        <text class="section-title">接下来可处理</text>
        <MobileCard class="next-card" @tap="showToast('待确认贡献')">
          <view class="task-icon"></view>
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
          <view class="row-arrow"></view>
        </MobileCard>
      </view>

      <view class="section-block">
        <text class="section-title">加入后可查看</text>
        <MobileCard class="view-card">
          <button
            v-for="entry in viewEntries"
            :key="entry.title"
            class="view-row"
            @tap="showToast(entry.title)"
          >
            <view class="view-icon" :class="`view-icon--${entry.icon}`"></view>
            <view class="view-copy">
              <text class="view-title">{{ entry.title }}</text>
              <text class="view-desc">{{ entry.desc }}</text>
            </view>
            <view class="row-arrow"></view>
          </button>
        </MobileCard>
      </view>

      <view class="reminder-card">
        <view class="reminder-icon"></view>
        <view class="reminder-copy">
          <text class="reminder-title">当前提醒</text>
          <text class="reminder-text">
            加入后有 1 项个人贡献待确认，确认后将进入教研活动归档流程。
          </text>
        </view>
      </view>
    </view>

    <view class="fixed-actions">
      <MobileActionButton class="outline-action" variant="outline" @tap="showToast('返回我的教研室')">
        返回我的教研室
      </MobileActionButton>
      <MobileActionButton class="primary-action" variant="primary" @tap="showToast('去确认贡献')">
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
  padding-bottom: calc(260rpx + env(safe-area-inset-bottom));
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
  color: #08a85c;
  font-size: 24rpx;
  font-weight: 900;
  line-height: 1.2;
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: 8rpx;
  margin-top: 18rpx;
}

.info-row {
  color: #34425c;
  font-size: 23rpx;
  line-height: 1.25;
}

.info-label {
  color: #74809a;
}

.info-value {
  color: #24324d;
  font-weight: 800;
}

.room-desc {
  max-width: 445rpx;
  margin-top: 18rpx;
  color: #52607a;
  font-size: 23rpx;
  line-height: 1.45;
}

.room-art {
  position: relative;
  z-index: 1;
  width: 160rpx;
  height: 166rpx;
  flex: 0 0 auto;
  align-self: center;
  border-radius: 28rpx;
  background: linear-gradient(145deg, #e7fff1, #f7fffb);
}

.art-board,
.art-person,
.task-icon,
.view-icon,
.row-arrow,
.reminder-icon {
  position: relative;
  flex: 0 0 auto;
}

.art-board {
  position: absolute;
  top: 28rpx;
  left: 36rpx;
  width: 86rpx;
  height: 56rpx;
  border-radius: 14rpx;
  background: #12c46b;
  box-shadow: inset 0 -10rpx 0 rgba(0, 0, 0, 0.06);
}

.art-board::before,
.art-board::after,
.art-person::before,
.task-icon::before,
.task-icon::after,
.view-icon::before,
.view-icon::after,
.row-arrow::before,
.reminder-icon::before,
.reminder-icon::after {
  position: absolute;
  content: '';
}

.art-board::before {
  top: 18rpx;
  left: 18rpx;
  width: 50rpx;
  height: 7rpx;
  border-radius: 4rpx;
  background: #eafff4;
  box-shadow: 0 15rpx 0 #eafff4;
}

.art-board::after {
  right: -18rpx;
  bottom: -26rpx;
  width: 7rpx;
  height: 34rpx;
  border-radius: 5rpx;
  background: #12c46b;
  transform: rotate(24deg);
}

.art-person {
  position: absolute;
  bottom: 26rpx;
  width: 34rpx;
  height: 34rpx;
  border-radius: 50%;
  background: #8be0b2;
}

.art-person::before {
  top: 38rpx;
  left: -16rpx;
  width: 66rpx;
  height: 28rpx;
  border-radius: 30rpx 30rpx 0 0;
  background: inherit;
}

.art-person--left {
  left: 34rpx;
}

.art-person--right {
  right: 34rpx;
  background: #c6f2d7;
}

.section-block {
  display: flex;
  flex-direction: column;
  gap: 14rpx;
}

.section-title {
  color: #111827;
  font-size: 32rpx;
  font-weight: 900;
  line-height: 1.2;
}

.next-card {
  gap: 20rpx;
  padding: 24rpx;
}

.task-icon {
  width: 76rpx;
  height: 76rpx;
  border-radius: 18rpx;
  background: #eafbf2;
  color: #11b968;
}

.task-icon::before {
  top: 15rpx;
  left: 22rpx;
  width: 34rpx;
  height: 46rpx;
  border-radius: 7rpx;
  background: currentColor;
}

.task-icon::after {
  top: 27rpx;
  left: 30rpx;
  width: 18rpx;
  height: 5rpx;
  border-radius: 4rpx;
  background: #eafbf2;
  box-shadow: 0 12rpx 0 #eafbf2;
}

.task-copy {
  min-width: 0;
  flex: 1;
}

.task-title-row {
  justify-content: space-between;
  gap: 12rpx;
}

.task-title {
  color: #111827;
  font-size: 29rpx;
  font-weight: 900;
  line-height: 1.2;
}

.warning-chip {
  height: 36rpx;
  padding: 0 14rpx;
  background: #fff2e3;
  color: #ff7a1a;
  font-size: 21rpx;
}

.task-desc {
  margin-top: 12rpx;
  color: #536078;
  font-size: 23rpx;
  line-height: 1.42;
}

.tag-row {
  flex-wrap: wrap;
  gap: 12rpx;
  margin-top: 14rpx;
}

.source-tag {
  height: 34rpx;
  padding: 0 14rpx;
  background: #eef8f2;
  color: #08a85c;
  font-size: 20rpx;
}

.view-card {
  overflow: hidden;
  padding: 0 24rpx;
}

.view-row {
  gap: 20rpx;
  width: 100%;
  min-height: 112rpx;
  margin: 0;
  padding: 20rpx 0;
  border: 0;
  border-bottom: 1rpx solid #e8edf5;
  border-radius: 0;
  background: transparent;
  text-align: left;
}

.view-row:last-child {
  border-bottom: 0;
}

.view-row::after {
  display: none;
}

.view-icon {
  width: 66rpx;
  height: 66rpx;
  border-radius: 16rpx;
}

.view-icon--calendar {
  background: #eafbf2;
  color: #11b968;
}

.view-icon--note {
  background: #eaf3ff;
  color: #2f78f5;
}

.view-icon--folder {
  background: #f2eaff;
  color: #8b5cf6;
}

.view-icon--star {
  background: #fff3df;
  color: #f39a18;
}

.view-icon::before {
  inset: 17rpx 18rpx;
  border-radius: 6rpx;
  background: currentColor;
}

.view-icon--calendar::after {
  top: 16rpx;
  left: 18rpx;
  width: 30rpx;
  height: 8rpx;
  border-radius: 4rpx 4rpx 0 0;
  background: rgba(255, 255, 255, 0.85);
}

.view-icon--star::before {
  inset: 15rpx;
  clip-path: polygon(50% 0, 62% 35%, 100% 35%, 69% 57%, 80% 96%, 50% 72%, 20% 96%, 31% 57%, 0 35%, 38% 35%);
}

.view-copy {
  min-width: 0;
  flex: 1;
}

.view-title {
  color: #111827;
  font-size: 28rpx;
  font-weight: 900;
  line-height: 1.2;
}

.view-desc {
  margin-top: 8rpx;
  color: #64718a;
  font-size: 23rpx;
  line-height: 1.3;
}

.row-arrow {
  width: 18rpx;
  height: 18rpx;
  color: #8a94a7;
}

.row-arrow::before {
  inset: 0;
  border-top: 4rpx solid currentColor;
  border-right: 4rpx solid currentColor;
  transform: rotate(45deg);
}

.reminder-card {
  gap: 18rpx;
  padding: 22rpx 24rpx;
  border-radius: 24rpx;
  background: linear-gradient(135deg, #e8fbf0, #f2fff8);
  box-shadow: 0 16rpx 34rpx rgba(3, 177, 84, 0.08);
}

.reminder-icon {
  width: 48rpx;
  height: 48rpx;
  border-radius: 50%;
  background: #12c46b;
}

.reminder-icon::before {
  top: 12rpx;
  left: 22rpx;
  width: 5rpx;
  height: 18rpx;
  border-radius: 4rpx;
  background: #fff;
}

.reminder-icon::after {
  top: 34rpx;
  left: 22rpx;
  width: 5rpx;
  height: 5rpx;
  border-radius: 50%;
  background: #fff;
}

.reminder-copy {
  min-width: 0;
  flex: 1;
}

.reminder-title {
  color: #08a85c;
  font-size: 25rpx;
  font-weight: 900;
  line-height: 1.2;
}

.reminder-text {
  margin-top: 8rpx;
  color: #2f5a42;
  font-size: 23rpx;
  line-height: 1.42;
}

.fixed-actions {
  position: fixed;
  right: 0;
  bottom: calc(138rpx + env(safe-area-inset-bottom));
  left: 0;
  z-index: 45;
  gap: 18rpx;
  padding: 18rpx 30rpx 20rpx;
  border-top: 1rpx solid rgba(232, 238, 246, 0.96);
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 -12rpx 36rpx rgba(21, 40, 74, 0.06);
}

.outline-action,
.primary-action {
  height: 78rpx;
  flex: 1;
  border-radius: 18rpx;
  font-size: 28rpx;
}

@media (max-width: 430px) {
  .joined-room-page {
    padding-bottom: calc(258rpx + env(safe-area-inset-bottom));
  }

  .page-subtitle {
    margin-bottom: 14rpx;
    font-size: 21rpx;
  }

  .content {
    gap: 14rpx;
    padding: 0 20rpx;
  }

  .room-card {
    min-height: 222rpx;
    padding: 20rpx;
  }

  .room-heading {
    gap: 8rpx;
  }

  .joined-chip {
    height: 30rpx;
    padding: 0 12rpx;
    font-size: 17rpx;
  }

  .room-title,
  .section-title {
    font-size: 24rpx;
  }

  .room-direction {
    margin-top: 8rpx;
    font-size: 19rpx;
  }

  .info-list {
    gap: 5rpx;
    margin-top: 10rpx;
  }

  .info-row,
  .room-desc,
  .task-desc,
  .view-desc,
  .reminder-text {
    font-size: 18rpx;
  }

  .room-desc {
    max-width: 400rpx;
    margin-top: 10rpx;
  }

  .room-art {
    width: 112rpx;
    height: 118rpx;
    border-radius: 20rpx;
  }

  .art-board {
    top: 22rpx;
    left: 25rpx;
    width: 62rpx;
    height: 40rpx;
    border-radius: 10rpx;
  }

  .art-person {
    bottom: 18rpx;
    width: 24rpx;
    height: 24rpx;
  }

  .section-block {
    gap: 10rpx;
  }

  .next-card {
    gap: 14rpx;
    padding: 18rpx;
  }

  .task-icon {
    width: 56rpx;
    height: 56rpx;
    border-radius: 14rpx;
  }

  .task-title {
    font-size: 22rpx;
  }

  .warning-chip,
  .source-tag {
    height: 28rpx;
    padding: 0 10rpx;
    font-size: 16rpx;
  }

  .task-desc,
  .tag-row {
    margin-top: 8rpx;
  }

  .view-card {
    padding: 0 18rpx;
  }

  .view-row {
    gap: 14rpx;
    min-height: 86rpx;
    padding: 14rpx 0;
  }

  .view-icon {
    width: 50rpx;
    height: 50rpx;
    border-radius: 12rpx;
  }

  .view-title {
    font-size: 22rpx;
  }

  .view-desc {
    margin-top: 5rpx;
  }

  .reminder-card {
    gap: 12rpx;
    padding: 16rpx 18rpx;
  }

  .reminder-icon {
    width: 38rpx;
    height: 38rpx;
  }

  .reminder-title {
    font-size: 20rpx;
  }

  .fixed-actions {
    bottom: calc(138rpx + env(safe-area-inset-bottom));
    gap: 12rpx;
    padding: 14rpx 20rpx 16rpx;
  }

  .outline-action,
  .primary-action {
    height: 60rpx;
    border-radius: 14rpx;
    font-size: 22rpx;
  }
}

@media (max-width: 374px) {
  .content {
    padding-right: 16rpx;
    padding-left: 16rpx;
  }

  .room-art {
    display: none;
  }

  .task-title-row {
    align-items: flex-start;
    flex-direction: column;
    gap: 7rpx;
  }
}
</style>
