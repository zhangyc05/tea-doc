<script setup lang="ts">
import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobileNavbar from '../../../components/MobileNavbar.vue'
import MobileTabBar from '../../../components/MobileTabBar.vue'

const tags = ['课程资源共建', '企业案例整理', '数字化教学']

const activities = [
  {
    icon: 'chat',
    title: '课程资源共建研讨',
    meta: '2026-05-22 | 腾讯会议 | 待确认贡献',
    status: '待确认',
    statusType: 'warning',
    action: '查看详情',
  },
  {
    icon: 'doc',
    title: '数字化教学资源建设讨论',
    meta: '2026-05-10 | 会议纪要已归档',
    status: '已归档',
    statusType: 'success',
    action: '查看记录',
  },
  {
    icon: 'calendar',
    title: '课程案例共创碰头会',
    meta: '2026-06-03 14:00 | 进行中',
    status: '进行中',
    statusType: 'info',
    action: '查看详情',
  },
]

const materials = [
  { icon: 'note', title: '会议纪要', count: '2 份' },
  { icon: 'group', title: '任务分工', count: '1 份' },
  { icon: 'folder', title: '阶段材料', count: '3 份' },
  { icon: 'star', title: '个人贡献', count: '2 项' },
]

function goBack() {
  uni.navigateBack()
}

function showToast(title: string) {
  uni.showToast({ title, icon: 'none' })
}
</script>

<template>
  <view class="room-detail-page">
    <MobileNavbar title="教研室详情" size="compact" @back="goBack" />
    <text class="page-subtitle">查看活动、材料和个人贡献</text>

    <view class="content">
      <MobileCard class="room-card">
        <view class="room-visual" aria-hidden="true">
          <view class="cap-art"></view>
          <view class="people people--left"></view>
          <view class="people people--center"></view>
          <view class="people people--right"></view>
        </view>
        <view class="room-copy">
          <view class="room-title-row">
            <text class="room-title">智能制造课程虚拟教研室</text>
            <text class="joined-chip">已加入</text>
          </view>
          <text class="room-meta">8 位成员　|　本月 2 次活动　|　1 项进行中任务</text>
          <text class="room-desc">聚焦智能制造课程资源建设、企业案例共建与数字化教学资源整理。</text>
          <view class="tag-row">
            <text v-for="tag in tags" :key="tag" class="tag">{{ tag }}</text>
          </view>
        </view>
      </MobileCard>

      <view class="section-block">
        <text class="block-title">当前需要处理</text>
        <MobileCard class="pending-card">
          <view class="pending-icon" aria-hidden="true"></view>
          <view class="pending-copy">
            <text class="pending-title">智能制造课程资源共建研讨</text>
            <text class="pending-desc">系统已识别 2 项个人贡献，请确认是否准确</text>
          </view>
          <view class="pending-actions">
            <text class="warning-chip">待确认</text>
            <MobileActionButton class="small-outline" variant="outline" @tap="showToast('确认贡献')">
              确认贡献
            </MobileActionButton>
          </view>
        </MobileCard>
      </view>

      <view class="section-block">
        <text class="block-title">教研活动</text>
        <MobileCard class="activity-card">
          <view v-for="item in activities" :key="item.title" class="activity-row">
            <view class="activity-icon" :class="`activity-icon--${item.icon}`" aria-hidden="true"></view>
            <view class="activity-copy">
              <text class="activity-title">{{ item.title }}</text>
              <text class="activity-meta">{{ item.meta }}</text>
            </view>
            <view class="activity-actions">
              <text class="state-chip" :class="`state-chip--${item.statusType}`">{{ item.status }}</text>
              <MobileActionButton class="row-button" variant="outline" @tap="showToast(item.action)">
                {{ item.action }}
              </MobileActionButton>
            </view>
            <view class="row-arrow" aria-hidden="true"></view>
          </view>
        </MobileCard>
      </view>

      <view class="section-block">
        <text class="block-title">过程材料</text>
        <MobileCard class="material-card">
          <button v-for="item in materials" :key="item.title" class="material-item" @tap="showToast(item.title)">
            <view class="material-icon" :class="`material-icon--${item.icon}`" aria-hidden="true"></view>
            <text class="material-title">{{ item.title }}</text>
            <text class="material-count">{{ item.count }}</text>
            <view class="row-arrow" aria-hidden="true"></view>
          </button>
        </MobileCard>
      </view>

      <view class="ai-tip">
        <view class="bot-icon" aria-hidden="true"></view>
        <text>系统可结合会议、纪要和任务分工整理教研记录。</text>
        <view class="info-icon" aria-hidden="true"></view>
      </view>
    </view>

    <MobileTabBar active="assistant" />
  </view>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.room-detail-page {
  min-height: 100vh;
  padding-bottom: calc(150rpx + env(safe-area-inset-bottom));
  overflow-x: hidden;
  background:
    radial-gradient(circle at 86% 6%, rgba(218, 249, 235, 0.7), transparent 29%),
    linear-gradient(180deg, #ffffff 0%, #fbfefd 46%, #f8fbfa 100%);
  color: #10172d;
}

.page-subtitle {
  display: block;
  margin: -2rpx 0 28rpx 142rpx;
  color: #28416e;
  font-size: 30rpx;
  font-weight: 500;
  line-height: 1.2;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 28rpx;
  padding: 0 34rpx 22rpx;
}

.room-card,
.pending-card,
.activity-card,
.material-card {
  border-radius: 24rpx;
  box-shadow: 0 16rpx 42rpx rgba(25, 45, 74, 0.06);
}

.room-card {
  display: flex;
  gap: 34rpx;
  padding: 32rpx;
}

.room-visual {
  position: relative;
  width: 190rpx;
  height: 190rpx;
  flex: 0 0 auto;
  overflow: hidden;
  border-radius: 18rpx;
  background: linear-gradient(145deg, #e9fbf2, #f7fffb);
}

.cap-art,
.people,
.pending-icon,
.activity-icon,
.material-icon,
.row-arrow,
.bot-icon,
.info-icon {
  position: relative;
  flex: 0 0 auto;
}

.cap-art {
  position: absolute;
  top: 40rpx;
  left: 48rpx;
  width: 102rpx;
  height: 64rpx;
  background: linear-gradient(135deg, #22db8a, #08b85a);
  clip-path: polygon(50% 0, 100% 34%, 50% 68%, 0 34%);
}

.cap-art::before {
  position: absolute;
  top: 42rpx;
  left: 24rpx;
  width: 58rpx;
  height: 42rpx;
  border-radius: 0 0 34rpx 34rpx;
  background: #19ca72;
  content: '';
}

.cap-art::after {
  position: absolute;
  top: 36rpx;
  right: 8rpx;
  width: 5rpx;
  height: 54rpx;
  border-radius: 8rpx;
  background: #12bd64;
  box-shadow: 0 48rpx 0 4rpx #12bd64;
  content: '';
}

.people {
  position: absolute;
  bottom: 0;
  width: 58rpx;
  height: 48rpx;
  border-radius: 32rpx 32rpx 0 0;
  background: linear-gradient(180deg, #80e6ab, #55d58a);
}

.people::before {
  position: absolute;
  top: -34rpx;
  left: 12rpx;
  width: 36rpx;
  height: 36rpx;
  border-radius: 50%;
  background: #a7f0c7;
  content: '';
}

.people--left {
  left: 0;
}

.people--center {
  right: 56rpx;
  width: 76rpx;
  opacity: 0.28;
}

.people--right {
  right: 2rpx;
}

.room-copy {
  min-width: 0;
  flex: 1;
}

.room-title-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16rpx;
}

.room-title {
  flex: 1;
  color: #11182d;
  font-size: 34rpx;
  font-weight: 900;
  line-height: 1.28;
}

.joined-chip {
  padding: 8rpx 16rpx;
  border-radius: 14rpx;
  background: #ecfbf1;
  color: #08a957;
  font-size: 24rpx;
  font-weight: 800;
  white-space: nowrap;
}

.room-meta,
.room-desc {
  display: block;
  color: #2f4773;
  font-size: 27rpx;
  line-height: 1.65;
}

.room-meta {
  margin-top: 12rpx;
}

.room-desc {
  margin-top: 8rpx;
}

.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 14rpx;
  margin-top: 16rpx;
}

.tag {
  padding: 8rpx 18rpx;
  border-radius: 10rpx;
  background: #ecfbf1;
  color: #08a957;
  font-size: 24rpx;
  font-weight: 800;
}

.section-block {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.block-title {
  color: #10172d;
  font-size: 34rpx;
  font-weight: 900;
  line-height: 1.2;
}

.pending-card {
  display: flex;
  align-items: center;
  gap: 28rpx;
  padding: 26rpx 28rpx;
}

.pending-icon {
  width: 92rpx;
  height: 92rpx;
  border-radius: 14rpx;
  background: linear-gradient(145deg, #e9fbf2, #f4fff9);
}

.pending-icon::before {
  position: absolute;
  top: 22rpx;
  left: 28rpx;
  width: 40rpx;
  height: 50rpx;
  border-radius: 8rpx;
  background: linear-gradient(180deg, #20cf7a, #08b75a);
  box-shadow: inset 0 -20rpx 0 rgba(255, 255, 255, 0.12);
  content: '';
}

.pending-icon::after {
  position: absolute;
  right: 12rpx;
  bottom: 12rpx;
  width: 32rpx;
  height: 32rpx;
  border: 5rpx solid #fff;
  border-radius: 50%;
  background: #18c76f;
  box-shadow: 0 4rpx 10rpx rgba(11, 157, 82, 0.22);
  content: '';
}

.pending-copy {
  min-width: 0;
  flex: 1;
}

.pending-title,
.activity-title {
  display: block;
  color: #10172d;
  font-size: 30rpx;
  font-weight: 900;
  line-height: 1.35;
}

.pending-desc,
.activity-meta {
  display: block;
  margin-top: 10rpx;
  color: #2f4773;
  font-size: 25rpx;
  line-height: 1.35;
}

.pending-actions,
.activity-actions {
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.pending-actions {
  flex-direction: column;
}

.warning-chip,
.state-chip {
  min-width: 88rpx;
  padding: 8rpx 14rpx;
  border-radius: 9rpx;
  text-align: center;
  font-size: 24rpx;
  font-weight: 900;
  white-space: nowrap;
}

.warning-chip,
.state-chip--warning {
  background: #fff3e8;
  color: #ff7a1a;
}

.state-chip--success {
  background: #ebfbf2;
  color: #09a957;
}

.state-chip--info {
  background: #edf5ff;
  color: #2178f2;
}

.small-outline {
  width: 136rpx;
  height: 54rpx;
  border-radius: 10rpx;
  font-size: 25rpx;
}

.activity-card {
  padding: 0 26rpx;
}

.activity-row {
  display: flex;
  min-height: 112rpx;
  align-items: center;
  gap: 22rpx;
  padding: 22rpx 0;
}

.activity-row + .activity-row {
  border-top: 1rpx solid #eef2f6;
}

.activity-icon,
.material-icon {
  width: 66rpx;
  height: 66rpx;
  border-radius: 12rpx;
}

.activity-icon--chat {
  background: #eafbf1;
}

.activity-icon--doc {
  background: #ecf5ff;
}

.activity-icon--calendar {
  background: #f2edff;
}

.activity-icon::before {
  position: absolute;
  inset: 16rpx 14rpx;
  border-radius: 8rpx;
  background: currentColor;
  content: '';
}

.activity-icon--chat::before {
  color: #11bd68;
  clip-path: polygon(0 0, 100% 0, 100% 72%, 56% 72%, 38% 100%, 38% 72%, 0 72%);
}

.activity-icon--doc::before {
  color: #2f7eef;
  clip-path: polygon(0 0, 72% 0, 100% 28%, 100% 100%, 0 100%);
}

.activity-icon--calendar::before {
  color: #8758ee;
  clip-path: polygon(0 16%, 100% 16%, 100% 100%, 0 100%);
}

.activity-icon--chat::after {
  position: absolute;
  top: 29rpx;
  left: 20rpx;
  width: 6rpx;
  height: 6rpx;
  border-radius: 50%;
  background: #fff;
  box-shadow: 13rpx 0 0 #fff, 26rpx 0 0 #fff;
  content: '';
}

.activity-copy {
  min-width: 0;
  flex: 1;
}

.row-button {
  width: 116rpx;
  height: 52rpx;
  border-radius: 10rpx;
  font-size: 24rpx;
}

.row-arrow {
  width: 18rpx;
  height: 18rpx;
  border-top: 4rpx solid #5a6c8f;
  border-right: 4rpx solid #5a6c8f;
  transform: rotate(45deg);
}

.material-card {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  padding: 0 26rpx;
}

.material-item {
  display: grid;
  min-width: 0;
  height: 106rpx;
  grid-template-columns: 66rpx minmax(0, 1fr) auto 24rpx;
  align-items: center;
  gap: 18rpx;
  margin: 0;
  padding: 20rpx 6rpx;
  border: 0;
  background: transparent;
  color: inherit;
  line-height: 1;
  text-align: left;
}

.material-item::after {
  display: none;
}

.material-item:nth-child(2n) {
  padding-left: 26rpx;
  border-left: 1rpx solid #edf1f5;
}

.material-item:nth-child(n + 3) {
  border-top: 1rpx solid #edf1f5;
}

.material-icon--note {
  background: #eafbf1;
}

.material-icon--group {
  background: #edf6ff;
}

.material-icon--folder {
  background: #f3edff;
}

.material-icon--star {
  background: #fff1e0;
}

.material-icon::before {
  position: absolute;
  inset: 18rpx 17rpx;
  border-radius: 7rpx;
  background: currentColor;
  content: '';
}

.material-icon--note::before {
  color: #12bd68;
  clip-path: polygon(0 0, 76% 0, 100% 24%, 100% 100%, 0 100%);
}

.material-icon--group::before {
  color: #3388f2;
  clip-path: polygon(42% 0, 58% 0, 58% 38%, 100% 38%, 100% 100%, 0 100%, 0 38%, 42% 38%);
}

.material-icon--folder::before {
  color: #854fee;
  clip-path: polygon(0 18%, 34% 18%, 44% 0, 100% 0, 100% 100%, 0 100%);
}

.material-icon--star::before {
  color: #ff980d;
  clip-path: polygon(50% 0, 62% 35%, 100% 35%, 69% 56%, 82% 92%, 50% 70%, 18% 92%, 31% 56%, 0 35%, 38% 35%);
}

.material-title {
  overflow: hidden;
  color: #10172d;
  font-size: 28rpx;
  font-weight: 800;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.material-count {
  color: #284477;
  font-size: 24rpx;
  font-weight: 700;
  white-space: nowrap;
}

.ai-tip {
  display: flex;
  min-height: 70rpx;
  align-items: center;
  gap: 18rpx;
  padding: 16rpx 26rpx;
  border-radius: 16rpx;
  background: linear-gradient(90deg, #e9fbf1, #f1fff7);
  color: #244170;
  font-size: 26rpx;
  font-weight: 600;
  line-height: 1.35;
}

.ai-tip text {
  flex: 1;
}

.bot-icon {
  width: 44rpx;
  height: 38rpx;
  border-radius: 12rpx;
  background: #18c970;
}

.bot-icon::before {
  position: absolute;
  top: -10rpx;
  left: 19rpx;
  width: 6rpx;
  height: 12rpx;
  border-radius: 8rpx;
  background: #18c970;
  box-shadow: 0 -6rpx 0 2rpx #18c970;
  content: '';
}

.bot-icon::after {
  position: absolute;
  top: 16rpx;
  left: 12rpx;
  width: 6rpx;
  height: 6rpx;
  border-radius: 50%;
  background: #fff;
  box-shadow: 15rpx 0 0 #fff;
  content: '';
}

.info-icon {
  width: 24rpx;
  height: 24rpx;
  border: 4rpx solid #13bd66;
  border-radius: 50%;
}

.info-icon::before {
  position: absolute;
  top: 6rpx;
  left: 9rpx;
  width: 4rpx;
  height: 10rpx;
  border-radius: 4rpx;
  background: #13bd66;
  content: '';
}

.info-icon::after {
  position: absolute;
  top: 3rpx;
  left: 9rpx;
  width: 4rpx;
  height: 4rpx;
  border-radius: 50%;
  background: #13bd66;
  content: '';
}

@media (max-width: 390px) {
  .room-card {
    gap: 24rpx;
    padding: 28rpx 24rpx;
  }

  .room-visual {
    width: 168rpx;
    height: 168rpx;
  }

  .room-title {
    font-size: 31rpx;
  }

  .pending-card {
    gap: 20rpx;
    padding: 24rpx 22rpx;
  }

  .pending-actions,
  .activity-actions {
    gap: 12rpx;
  }

  .activity-row {
    gap: 16rpx;
  }

  .activity-icon,
  .material-icon {
    width: 60rpx;
    height: 60rpx;
  }

  .row-button {
    width: 104rpx;
    font-size: 23rpx;
  }

  .material-item {
    grid-template-columns: 60rpx minmax(0, 1fr) auto 20rpx;
    gap: 12rpx;
  }
}
</style>
