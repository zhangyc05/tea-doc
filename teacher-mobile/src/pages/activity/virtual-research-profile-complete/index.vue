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
    meta: '2026-05-22　|　腾讯会议　|　待确认贡献',
    status: '待确认',
    statusType: 'warning',
    action: '查看详情',
  },
  {
    icon: 'doc',
    title: '数字化教学资源建设讨论',
    meta: '2026-05-10　|　会议纪要已归档',
    status: '已归档',
    statusType: 'success',
    action: '查看记录',
  },
  {
    icon: 'calendar',
    title: '课程案例共创碰头会',
    meta: '2026-06-03 14:00　|　进行中',
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
        <view class="room-visual">
          <view class="cap-art"></view>
          <view class="member member--left"></view>
          <view class="member member--center"></view>
          <view class="member member--right"></view>
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
          <view class="pending-icon"></view>
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
            <view class="activity-icon" :class="`activity-icon--${item.icon}`"></view>
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
            <view class="row-arrow"></view>
          </view>
        </MobileCard>
      </view>

      <view class="section-block">
        <text class="block-title">过程材料</text>
        <MobileCard class="material-card">
          <button v-for="item in materials" :key="item.title" class="material-item" @tap="showToast(item.title)">
            <view class="material-icon" :class="`material-icon--${item.icon}`"></view>
            <text class="material-title">{{ item.title }}</text>
            <text class="material-count">{{ item.count }}</text>
            <view class="row-arrow"></view>
          </button>
        </MobileCard>
      </view>

      <view class="ai-tip">
        <view class="bot-icon"></view>
        <text>系统可结合会议、纪要和任务分工整理教研记录。</text>
        <view class="info-icon"></view>
      </view>
    </view>

    <MobileTabBar active="assistant" />
  </view>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.room-detail-page {
  min-height: 100vh;
  padding-bottom: calc(154rpx + env(safe-area-inset-bottom));
  overflow-x: hidden;
  background:
    radial-gradient(circle at 82% 3%, rgba(230, 249, 255, 0.82), transparent 30%),
    linear-gradient(180deg, #ffffff 0%, #fbfdff 45%, #f8fbfa 100%);
  color: #10172d;
}

.page-subtitle {
  display: block;
  margin: -2rpx 0 26rpx 142rpx;
  color: #26416e;
  font-size: 29rpx;
  line-height: 1.2;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
  padding: 0 34rpx 22rpx;
}

.room-card,
.pending-card,
.activity-card,
.material-card {
  border-radius: 24rpx;
}

.room-card {
  display: flex;
  gap: 38rpx;
  padding: 32rpx;
}

.room-visual {
  position: relative;
  width: 190rpx;
  height: 190rpx;
  flex: 0 0 auto;
  overflow: hidden;
  border-radius: 18rpx;
  background: linear-gradient(145deg, #edfdf4, #f8fffb);
}

.cap-art,
.member,
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
  left: 46rpx;
  top: 42rpx;
  width: 96rpx;
  height: 56rpx;
  background: linear-gradient(135deg, #21d986, #08b85a);
  clip-path: polygon(50% 0, 100% 34%, 50% 68%, 0 34%);
}

.cap-art::before,
.cap-art::after,
.member::before,
.pending-icon::before,
.pending-icon::after,
.activity-icon::before,
.activity-icon::after,
.material-icon::before,
.material-icon::after,
.row-arrow::before,
.bot-icon::before,
.bot-icon::after,
.info-icon::before {
  position: absolute;
  content: '';
}

.cap-art::before {
  left: 22rpx;
  top: 38rpx;
  width: 54rpx;
  height: 34rpx;
  border-radius: 0 0 26rpx 26rpx;
  background: #10c96d;
}

.cap-art::after {
  right: 12rpx;
  top: 34rpx;
  width: 5rpx;
  height: 54rpx;
  border-radius: 4rpx;
  background: #10c96d;
}

.member {
  position: absolute;
  bottom: 22rpx;
  width: 42rpx;
  height: 42rpx;
  border-radius: 50%;
  background: #8ce0b2;
}

.member::before {
  left: -18rpx;
  top: 45rpx;
  width: 78rpx;
  height: 34rpx;
  border-radius: 36rpx 36rpx 0 0;
  background: inherit;
}

.member--left {
  left: 28rpx;
}

.member--center {
  left: 75rpx;
  background: #d2f5df;
}

.member--right {
  right: 22rpx;
}

.room-copy {
  min-width: 0;
  flex: 1;
}

.room-title-row,
.tag-row,
.pending-card,
.activity-row,
.activity-actions,
.material-item,
.ai-tip {
  display: flex;
  align-items: center;
}

.room-title-row {
  gap: 18rpx;
}

.room-title,
.room-meta,
.room-desc,
.tag,
.block-title,
.pending-title,
.pending-desc,
.activity-title,
.activity-meta,
.material-title,
.material-count {
  display: block;
}

.room-title {
  color: #090f22;
  font-size: 37rpx;
  font-weight: 900;
  line-height: 1.24;
}

.joined-chip,
.tag,
.state-chip,
.warning-chip {
  flex: 0 0 auto;
  border-radius: 10rpx;
  font-weight: 900;
}

.joined-chip {
  padding: 8rpx 18rpx;
  background: #e7f8e9;
  color: #08a85c;
  font-size: 25rpx;
}

.room-meta {
  margin-top: 22rpx;
  color: #173a78;
  font-size: 28rpx;
  line-height: 1.3;
}

.room-desc {
  margin-top: 22rpx;
  color: #173a78;
  font-size: 28rpx;
  line-height: 1.55;
}

.tag-row {
  flex-wrap: wrap;
  gap: 18rpx;
  margin-top: 24rpx;
}

.tag {
  padding: 10rpx 22rpx;
  background: #e9fbf2;
  color: #08a85c;
  font-size: 25rpx;
}

.section-block {
  display: flex;
  flex-direction: column;
  gap: 18rpx;
}

.block-title {
  color: #090f22;
  font-size: 37rpx;
  font-weight: 900;
  line-height: 1.25;
}

.pending-card {
  gap: 28rpx;
  min-height: 132rpx;
  padding: 24rpx 28rpx;
}

.pending-icon {
  width: 86rpx;
  height: 86rpx;
  border-radius: 16rpx;
  background: #e9fbf2;
  color: #0fc469;
}

.pending-icon::before {
  left: 25rpx;
  top: 18rpx;
  width: 34rpx;
  height: 48rpx;
  border-radius: 6rpx;
  background: currentColor;
}

.pending-icon::after {
  right: 8rpx;
  bottom: 8rpx;
  width: 36rpx;
  height: 36rpx;
  border: 6rpx solid #e9fbf2;
  border-radius: 50%;
  background: currentColor;
  box-shadow: inset 0 0 0 4rpx currentColor;
}

.pending-copy,
.activity-copy {
  min-width: 0;
  flex: 1;
}

.pending-title,
.activity-title {
  color: #111827;
  font-size: 31rpx;
  font-weight: 900;
  line-height: 1.25;
}

.pending-desc,
.activity-meta {
  margin-top: 16rpx;
  color: #173a78;
  font-size: 27rpx;
  line-height: 1.3;
}

.pending-actions {
  display: flex;
  width: 148rpx;
  flex: 0 0 auto;
  align-items: flex-end;
  flex-direction: column;
  gap: 18rpx;
}

.warning-chip,
.state-chip--warning {
  background: #fff3e6;
  color: #ff7b1a;
}

.warning-chip,
.state-chip {
  padding: 8rpx 17rpx;
  font-size: 25rpx;
}

.small-outline,
.row-button {
  border-color: #08b85a;
  color: #08a85c;
}

.small-outline {
  width: 132rpx;
  height: 54rpx;
  font-size: 25rpx;
}

.activity-card {
  padding: 0 30rpx;
}

.activity-row {
  gap: 24rpx;
  min-height: 130rpx;
  padding: 22rpx 0;
  border-bottom: 1rpx solid #e7edf5;
}

.activity-row:last-child {
  border-bottom: 0;
}

.activity-icon,
.material-icon {
  width: 68rpx;
  height: 68rpx;
  border-radius: 14rpx;
}

.activity-icon--chat {
  background: #e9fbf2;
  color: #10b867;
}

.activity-icon--doc {
  background: #eaf3ff;
  color: #2f78f5;
}

.activity-icon--calendar {
  background: #f0e8ff;
  color: #8a58f5;
}

.activity-icon::before {
  inset: 21rpx 14rpx 22rpx;
  border-radius: 8rpx;
  background: currentColor;
}

.activity-icon--doc::before,
.activity-icon--calendar::before {
  inset: 15rpx 18rpx;
  border-radius: 5rpx;
}

.activity-icon--chat::after {
  left: 25rpx;
  top: 33rpx;
  width: 6rpx;
  height: 6rpx;
  border-radius: 50%;
  background: #fff;
  box-shadow: 12rpx 0 0 #fff, 24rpx 0 0 #fff;
}

.activity-actions {
  flex: 0 0 auto;
  gap: 18rpx;
}

.state-chip--success {
  background: #e7f8e9;
  color: #08a85c;
}

.state-chip--info {
  background: #eaf3ff;
  color: #216df0;
}

.row-button {
  width: 122rpx;
  height: 54rpx;
  font-size: 25rpx;
}

.row-arrow {
  width: 18rpx;
  height: 18rpx;
  color: #68778e;
}

.row-arrow::before {
  inset: 0;
  border-top: 4rpx solid currentColor;
  border-right: 4rpx solid currentColor;
  transform: rotate(45deg);
}

.material-card {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  padding: 0 30rpx;
}

.material-item {
  gap: 22rpx;
  min-width: 0;
  min-height: 104rpx;
  margin: 0;
  padding: 18rpx 16rpx;
  border: 0;
  border-bottom: 1rpx solid #e7edf5;
  border-radius: 0;
  background: transparent;
  text-align: left;
}

.material-item:nth-child(odd) {
  border-right: 1rpx solid #e7edf5;
}

.material-item:nth-child(n + 3) {
  border-bottom: 0;
}

.material-item::after {
  display: none;
}

.material-icon--note {
  background: #e9fbf2;
  color: #0fc469;
}

.material-icon--group {
  background: #eaf3ff;
  color: #2f78f5;
}

.material-icon--folder {
  background: #f1e8ff;
  color: #8a58f5;
}

.material-icon--star {
  background: #fff2dc;
  color: #f39a18;
}

.material-icon::before {
  inset: 18rpx 20rpx;
  border-radius: 5rpx;
  background: currentColor;
}

.material-title {
  color: #111827;
  font-size: 28rpx;
  line-height: 1.25;
}

.material-count {
  color: #173a78;
  font-size: 26rpx;
  line-height: 1.25;
}

.material-item .row-arrow {
  margin-left: auto;
}

.ai-tip {
  gap: 20rpx;
  padding: 18rpx 28rpx;
  border-radius: 18rpx;
  background: linear-gradient(90deg, #e8fbf0, #f0fff8);
  color: #173a78;
  font-size: 27rpx;
  line-height: 1.35;
}

.bot-icon {
  width: 48rpx;
  height: 48rpx;
  color: #0fc469;
}

.bot-icon::before {
  left: 4rpx;
  top: 12rpx;
  width: 40rpx;
  height: 28rpx;
  border-radius: 10rpx;
  background: currentColor;
}

.bot-icon::after {
  left: 18rpx;
  top: 22rpx;
  width: 6rpx;
  height: 6rpx;
  border-radius: 50%;
  background: #fff;
  box-shadow: 14rpx 0 0 #fff;
}

.info-icon {
  width: 32rpx;
  height: 32rpx;
  margin-left: auto;
  border: 3rpx solid #0fc469;
  border-radius: 50%;
}

.info-icon::before {
  left: 13rpx;
  top: 11rpx;
  width: 4rpx;
  height: 12rpx;
  border-radius: 3rpx;
  background: #0fc469;
  box-shadow: 0 -8rpx 0 -1rpx #0fc469;
}

@media (max-width: 430px) {
  .room-detail-page {
    padding-bottom: calc(146rpx + env(safe-area-inset-bottom));
  }

  .page-subtitle {
    margin-left: 72rpx;
    margin-bottom: 18rpx;
    font-size: 22rpx;
  }

  .content {
    gap: 18rpx;
    padding-right: 20rpx;
    padding-left: 20rpx;
  }

  .room-card {
    gap: 22rpx;
    padding: 22rpx;
  }

  .room-visual {
    width: 132rpx;
    height: 132rpx;
  }

  .cap-art {
    left: 28rpx;
    top: 25rpx;
    width: 58rpx;
    height: 34rpx;
  }

  .member {
    bottom: 13rpx;
    width: 25rpx;
    height: 25rpx;
  }

  .room-title {
    font-size: 27rpx;
  }

  .joined-chip,
  .tag,
  .warning-chip,
  .state-chip {
    font-size: 18rpx;
  }

  .room-meta,
  .room-desc {
    margin-top: 10rpx;
    font-size: 20rpx;
  }

  .tag-row {
    gap: 8rpx;
    margin-top: 12rpx;
  }

  .tag {
    padding: 6rpx 11rpx;
  }

  .block-title {
    font-size: 27rpx;
  }

  .pending-card {
    gap: 16rpx;
    min-height: 108rpx;
    padding: 18rpx;
  }

  .pending-icon {
    width: 58rpx;
    height: 58rpx;
  }

  .pending-title,
  .activity-title {
    font-size: 22rpx;
  }

  .pending-desc,
  .activity-meta {
    margin-top: 8rpx;
    font-size: 19rpx;
  }

  .pending-actions {
    width: 96rpx;
    gap: 10rpx;
  }

  .small-outline,
  .row-button {
    width: 92rpx;
    height: 40rpx;
    font-size: 19rpx;
  }

  .activity-card {
    padding: 0 18rpx;
  }

  .activity-row {
    gap: 12rpx;
    min-height: 104rpx;
    padding: 16rpx 0;
  }

  .activity-icon,
  .material-icon {
    width: 48rpx;
    height: 48rpx;
    border-radius: 10rpx;
  }

  .activity-actions {
    gap: 8rpx;
  }

  .material-card {
    padding: 0 18rpx;
  }

  .material-item {
    gap: 10rpx;
    min-height: 88rpx;
    padding: 14rpx 8rpx;
  }

  .material-title,
  .material-count {
    font-size: 22rpx;
  }

  .ai-tip {
    gap: 12rpx;
    padding: 16rpx 18rpx;
    font-size: 21rpx;
  }
}

@media (max-width: 374px) {
  .content {
    padding-right: 14rpx;
    padding-left: 14rpx;
  }

  .room-visual {
    display: none;
  }

  .activity-actions {
    align-items: flex-end;
    flex-direction: column;
  }
}
</style>
