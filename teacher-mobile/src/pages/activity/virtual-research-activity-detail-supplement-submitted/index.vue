<script setup lang="ts">
import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobileNavbar from '../../../components/MobileNavbar.vue'

const contributions = [
  { index: '1', title: '提供企业设备调试案例素材', source: '阶段材料、会议纪要', tag: '' },
  { index: '2', title: '补充设备故障诊断教学建议', source: '发言摘录、会议纪要', tag: '' },
  { index: '3', title: '参与课程案例结构讨论', source: '会议纪要、发言摘录、阶段材料、任务分工', tag: '新补充' },
]

const files = [
  { name: '会议纪要.pdf', type: 'PDF', tone: 'red' },
  { name: '发言摘录.docx', type: 'DOC', tone: 'blue' },
  { name: '阶段材料.pdf', type: 'PDF', tone: 'green' },
  { name: '任务分工记录.xlsx', type: 'XLS', tone: 'orange' },
]

function goBack() {
  uni.navigateBack()
}

function showToast(title: string) {
  uni.showToast({ title, icon: 'none' })
}

function goSupplementContribution() {
  uni.navigateTo({ url: '/pages/activity/virtual-research-skill-management/index' })
}

function goContributionConfirm() {
  uni.navigateTo({ url: '/pages/activity/virtual-research-activity-detail-confirm/index' })
}
</script>

<template>
  <view class="submitted-page">
    <MobileNavbar title="教研活动详情" size="compact" @back="goBack">
      <template #right>
        <button class="more-button" @tap="showToast('更多')">
          <view></view>
          <view></view>
          <view></view>
        </button>
      </template>
    </MobileNavbar>

    <view class="content">
      <view class="success-hero">
        <view class="confetti confetti--one"></view>
        <view class="confetti confetti--two"></view>
        <view class="confetti confetti--three"></view>
        <view class="confetti confetti--four"></view>
        <view class="success-mark"></view>
        <view class="title-row">
          <text class="hero-title">补充已提交</text>
          <text class="orange-chip">待再次确认</text>
        </view>
        <text class="hero-desc">
          你补充的个人教研贡献已加入本次活动，请返回“贡献确认页”，确认本次活动的完整个人贡献。
        </text>
      </view>

      <MobileCard class="activity-card">
        <view class="section-head">
          <view class="head-icon head-icon--group"></view>
          <text class="section-title">本次教研活动</text>
        </view>
        <view class="activity-body">
          <view class="activity-copy">
            <text class="activity-title">课程案例共创碰头会</text>
            <view class="meta-row">
              <view class="meta-icon meta-icon--calendar"></view>
              <text>2026-06-03（周二）14:00-15:30</text>
            </view>
            <view class="meta-row">
              <view class="meta-icon meta-icon--video"></view>
              <text>腾讯会议　会议号：123 456 789</text>
            </view>
            <view class="meta-row">
              <view class="meta-icon meta-icon--room"></view>
              <text>智能制造课程虚拟教研室</text>
            </view>
          </view>
          <view class="meeting-art">
            <view class="screen-art"></view>
            <view class="person-art"></view>
            <view class="bubble-art"></view>
          </view>
        </view>
      </MobileCard>

      <MobileCard class="supplement-card">
        <view class="section-head">
          <view class="head-icon head-icon--plus"></view>
          <text class="section-title">本次补充贡献</text>
        </view>
        <view class="supplement-item">
          <text class="new-badge">新</text>
          <view class="supplement-copy">
            <text class="supplement-title">参与课程案例结构讨论</text>
            <text class="ai-chip">AI　已整理为贡献说明</text>
            <text class="supplement-desc">
              你参与了课程案例结构讨论，并补充了案例在课堂导入、问题分析和实训任务中的使用建议。
            </text>
          </view>
          <view class="clipboard-art"></view>
        </view>
      </MobileCard>

      <MobileCard class="identified-card">
        <view class="section-head">
          <view class="head-icon head-icon--check"></view>
          <text class="section-title">已识别贡献（共 3 项）</text>
        </view>
        <view class="contribution-list">
          <view v-for="item in contributions" :key="item.index" class="contribution-row">
            <text class="number-badge">{{ item.index }}</text>
            <view class="contribution-copy">
              <view class="contribution-title-row">
                <text class="contribution-title">{{ item.title }}</text>
                <text v-if="item.tag" class="mini-chip">{{ item.tag }}</text>
              </view>
              <text class="source-line">来源：{{ item.source }}</text>
            </view>
            <view class="round-check"></view>
          </view>
        </view>
      </MobileCard>

      <MobileCard class="file-card">
        <view class="section-head">
          <view class="head-icon head-icon--link"></view>
          <text class="section-title">关联依据</text>
        </view>
        <scroll-view class="file-scroll" scroll-x>
          <view class="file-list">
            <view v-for="file in files" :key="file.name" class="file-item">
              <view class="file-icon" :class="`file-icon--${file.tone}`">
                <text>{{ file.type }}</text>
              </view>
              <view class="file-copy">
                <text class="file-name">{{ file.name }}</text>
                <text class="file-status">已关联</text>
              </view>
            </view>
          </view>
        </scroll-view>
      </MobileCard>

      <MobileCard class="status-card">
        <view class="section-head">
          <view class="head-icon head-icon--bell"></view>
          <text class="section-title">当前状态</text>
        </view>
        <button class="status-row" @tap="goContributionConfirm">
          <view class="status-copy">
            <text class="status-title">已加入待确认贡献</text>
            <text class="status-desc">
              你已补充新的贡献内容，请返回贡献确认页，确认本次活动的完整个人贡献。
            </text>
          </view>
          <view class="arrow"></view>
        </button>
      </MobileCard>
    </view>

    <view class="fixed-actions">
      <MobileActionButton class="bottom-button" variant="outline" @tap="goSupplementContribution">
        继续补充
      </MobileActionButton>
      <MobileActionButton class="bottom-button" variant="primary" @tap="goContributionConfirm">
        去确认贡献
      </MobileActionButton>
    </view>
  </view>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.submitted-page {
  min-height: 100vh;
  padding-bottom: calc(24rpx + env(safe-area-inset-bottom));
  overflow-x: hidden;
  background:
    radial-gradient(circle at 84% 8%, rgba(230, 244, 255, 0.76), transparent 28%),
    linear-gradient(180deg, #ffffff 0%, #fbfdff 50%, #f8fbff 100%);
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

.more-button::after {
  display: none;
}

.more-button view {
  width: 9rpx;
  height: 9rpx;
  border-radius: 50%;
  background: #111827;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 22rpx;
  padding: 0 30rpx 30rpx;
}

.success-hero {
  position: relative;
  display: flex;
  min-height: 282rpx;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: 8rpx 36rpx 0;
  text-align: center;
}

.success-mark,
.confetti,
.section-head,
.head-icon,
.meta-icon,
.meeting-art,
.screen-art,
.person-art,
.bubble-art,
.clipboard-art,
.file-icon,
.round-check,
.arrow {
  position: relative;
  flex: 0 0 auto;
}

.success-mark {
  width: 98rpx;
  height: 98rpx;
  border-radius: 50%;
  background: linear-gradient(135deg, #18c879, #08a95d);
  box-shadow: 0 18rpx 34rpx rgba(8, 169, 93, 0.26);
}

.success-mark::before,
.confetti::before,
.head-icon::before,
.head-icon::after,
.meta-icon::before,
.meta-icon::after,
.screen-art::before,
.screen-art::after,
.person-art::before,
.person-art::after,
.bubble-art::before,
.clipboard-art::before,
.clipboard-art::after,
.round-check::before,
.arrow::before {
  position: absolute;
  content: '';
}

.success-mark::before {
  left: 30rpx;
  top: 29rpx;
  width: 40rpx;
  height: 22rpx;
  border-bottom: 10rpx solid #fff;
  border-left: 10rpx solid #fff;
  transform: rotate(-45deg);
}

.confetti {
  position: absolute;
  width: 12rpx;
  height: 12rpx;
  transform: rotate(45deg);
}

.confetti--one {
  left: 166rpx;
  top: 60rpx;
  background: #ffc879;
}

.confetti--two {
  left: 238rpx;
  top: 28rpx;
  background: #b383f6;
}

.confetti--three {
  right: 186rpx;
  top: 30rpx;
  background: #ef6c8b;
}

.confetti--four {
  right: 112rpx;
  top: 68rpx;
  background: #83b5e8;
}

.title-row {
  display: flex;
  align-items: center;
  gap: 18rpx;
  margin-top: 32rpx;
}

.hero-title {
  color: #080b18;
  font-size: 42rpx;
  font-weight: 900;
  line-height: 1.15;
}

.orange-chip {
  padding: 8rpx 18rpx;
  border-radius: 12rpx;
  background: #fff0d7;
  color: #ff8a00;
  font-size: 28rpx;
  font-weight: 900;
}

.hero-desc {
  max-width: 640rpx;
  margin-top: 20rpx;
  color: #405681;
  font-size: 29rpx;
  font-weight: 700;
  line-height: 1.62;
}

.activity-card,
.supplement-card,
.identified-card,
.file-card,
.status-card {
  border-radius: 14rpx;
  padding: 28rpx 28rpx;
}

.activity-card {
  background: linear-gradient(135deg, #f7fbff, #ffffff);
}

.section-head,
.meta-row,
.activity-body,
.contribution-row,
.contribution-title-row,
.file-list,
.file-item,
.status-row,
.fixed-actions {
  display: flex;
  align-items: center;
}

.section-head {
  gap: 18rpx;
}

.section-title {
  color: #12192f;
  font-size: 30rpx;
  font-weight: 900;
}

.head-icon {
  width: 52rpx;
  height: 52rpx;
  border-radius: 12rpx;
  background: #edf5ff;
  color: #2f78f5;
}

.head-icon--group::before,
.head-icon--group::after {
  background: currentColor;
}

.head-icon--group::before {
  left: 18rpx;
  top: 13rpx;
  width: 15rpx;
  height: 15rpx;
  border-radius: 50%;
  box-shadow: -13rpx 5rpx 0 -3rpx currentColor, 13rpx 5rpx 0 -3rpx currentColor;
}

.head-icon--group::after {
  left: 11rpx;
  bottom: 11rpx;
  width: 31rpx;
  height: 15rpx;
  border-radius: 16rpx 16rpx 4rpx 4rpx;
}

.head-icon--plus,
.head-icon--check,
.head-icon--link {
  background: #e9fbf2;
  color: #13b968;
}

.head-icon--plus::before,
.head-icon--plus::after {
  left: 16rpx;
  top: 24rpx;
  width: 20rpx;
  height: 5rpx;
  border-radius: 5rpx;
  background: currentColor;
}

.head-icon--plus::after {
  transform: rotate(90deg);
}

.head-icon--check::before,
.round-check::before {
  left: 16rpx;
  top: 16rpx;
  width: 18rpx;
  height: 10rpx;
  border-bottom: 4rpx solid currentColor;
  border-left: 4rpx solid currentColor;
  transform: rotate(-45deg);
}

.head-icon--link::before {
  left: 15rpx;
  top: 16rpx;
  width: 22rpx;
  height: 14rpx;
  border: 5rpx solid currentColor;
  border-radius: 12rpx;
  transform: rotate(-35deg);
}

.head-icon--bell {
  background: #fff8eb;
  color: #d6b46b;
}

.head-icon--bell::before {
  left: 17rpx;
  top: 13rpx;
  width: 18rpx;
  height: 23rpx;
  border-radius: 18rpx 18rpx 8rpx 8rpx;
  background: currentColor;
}

.head-icon--bell::after {
  left: 22rpx;
  bottom: 11rpx;
  width: 8rpx;
  height: 8rpx;
  border-radius: 50%;
  background: currentColor;
}

.activity-body {
  justify-content: space-between;
  gap: 18rpx;
  margin-top: 26rpx;
}

.activity-copy {
  min-width: 0;
  flex: 1;
}

.activity-title {
  display: block;
  color: #050812;
  font-size: 36rpx;
  font-weight: 900;
  line-height: 1.25;
}

.meta-row {
  gap: 16rpx;
  margin-top: 20rpx;
  color: #1e293b;
  font-size: 26rpx;
  line-height: 1.25;
}

.meta-icon {
  width: 26rpx;
  height: 26rpx;
  color: #4f6389;
}

.meta-icon--calendar::before,
.meta-icon--video::before,
.meta-icon--room::before {
  inset: 3rpx;
  border: 3rpx solid currentColor;
  border-radius: 4rpx;
}

.meta-icon--calendar::after {
  left: 6rpx;
  top: 8rpx;
  width: 14rpx;
  height: 3rpx;
  background: currentColor;
}

.meta-icon--video::after {
  right: 0;
  top: 8rpx;
  border-top: 5rpx solid transparent;
  border-bottom: 5rpx solid transparent;
  border-left: 8rpx solid currentColor;
}

.meta-icon--room::after {
  left: 8rpx;
  top: 0;
  width: 10rpx;
  height: 26rpx;
  border: 3rpx solid currentColor;
  border-radius: 3rpx;
}

.meeting-art {
  width: 170rpx;
  height: 148rpx;
}

.screen-art {
  position: absolute;
  right: 30rpx;
  top: 20rpx;
  width: 102rpx;
  height: 74rpx;
  border: 8rpx solid #98b9fb;
  border-radius: 10rpx;
}

.screen-art::before {
  left: 20rpx;
  top: 33rpx;
  width: 56rpx;
  height: 22rpx;
  border-top: 8rpx solid #98b9fb;
  border-right: 8rpx solid #98b9fb;
  transform: skew(-25deg);
}

.screen-art::after {
  left: 37rpx;
  bottom: -34rpx;
  width: 28rpx;
  height: 30rpx;
  background: #2f78f5;
}

.person-art {
  position: absolute;
  right: 4rpx;
  bottom: 8rpx;
  width: 74rpx;
  height: 42rpx;
  border-radius: 42rpx 42rpx 8rpx 8rpx;
  background: #2f78f5;
}

.person-art::before {
  right: 12rpx;
  top: -48rpx;
  width: 46rpx;
  height: 46rpx;
  border-radius: 50%;
  background: #2f78f5;
}

.bubble-art {
  position: absolute;
  left: 4rpx;
  top: 58rpx;
  width: 48rpx;
  height: 32rpx;
  border-radius: 8rpx;
  background: #dce9ff;
}

.bubble-art::before {
  left: 16rpx;
  top: 13rpx;
  width: 6rpx;
  height: 6rpx;
  border-radius: 50%;
  background: #80a8f8;
  box-shadow: 12rpx 0 0 #80a8f8;
}

.supplement-card,
.identified-card,
.file-card {
  background: linear-gradient(135deg, #f5fdf8, #ffffff);
}

.supplement-item {
  position: relative;
  display: flex;
  gap: 20rpx;
  margin-top: 22rpx;
  padding: 26rpx 150rpx 28rpx 24rpx;
  border-radius: 12rpx;
  background: rgba(255, 255, 255, 0.92);
  box-shadow: 0 10rpx 24rpx rgba(38, 78, 118, 0.05);
}

.new-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40rpx;
  height: 40rpx;
  flex: 0 0 auto;
  border-radius: 8rpx;
  background: #21b86b;
  color: #fff;
  font-size: 24rpx;
  font-weight: 900;
}

.supplement-copy {
  min-width: 0;
  flex: 1;
}

.supplement-title,
.contribution-title,
.status-title {
  color: #10172d;
  font-size: 29rpx;
  font-weight: 900;
  line-height: 1.28;
}

.ai-chip {
  display: block;
  width: fit-content;
  margin-top: 14rpx;
  padding: 8rpx 18rpx;
  border-radius: 8rpx;
  background: #e9fbf1;
  color: #15a764;
  font-size: 24rpx;
  font-weight: 900;
}

.supplement-desc,
.source-line,
.status-desc {
  display: block;
  margin-top: 14rpx;
  color: #405681;
  font-size: 25rpx;
  line-height: 1.5;
}

.clipboard-art {
  position: absolute;
  right: 40rpx;
  top: 58rpx;
  width: 72rpx;
  height: 88rpx;
  border: 7rpx solid #a8c1fa;
  border-radius: 10rpx;
}

.clipboard-art::before {
  left: 18rpx;
  top: -15rpx;
  width: 28rpx;
  height: 18rpx;
  border-radius: 8rpx 8rpx 0 0;
  background: #a8c1fa;
}

.clipboard-art::after {
  right: -28rpx;
  bottom: -16rpx;
  width: 34rpx;
  height: 34rpx;
  border-radius: 50%;
  background: #21b86b;
  box-shadow: inset 0 0 0 8rpx #21b86b;
}

.contribution-list {
  display: flex;
  flex-direction: column;
  gap: 14rpx;
  margin-top: 22rpx;
}

.contribution-row {
  gap: 22rpx;
  padding: 22rpx 20rpx;
  border-radius: 12rpx;
  background: rgba(255, 255, 255, 0.94);
}

.number-badge {
  display: inline-flex;
  width: 42rpx;
  height: 42rpx;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  border-radius: 9rpx;
  background: #e5f8ee;
  color: #14a861;
  font-size: 28rpx;
  font-weight: 900;
}

.contribution-copy {
  min-width: 0;
  flex: 1;
}

.contribution-title-row {
  gap: 16rpx;
}

.mini-chip {
  flex: 0 0 auto;
  padding: 6rpx 12rpx;
  border-radius: 8rpx;
  background: #e9fbf1;
  color: #13a964;
  font-size: 22rpx;
  font-weight: 900;
}

.round-check {
  width: 38rpx;
  height: 38rpx;
  border: 4rpx solid #19b869;
  border-radius: 50%;
  color: #19b869;
}

.round-check::before {
  left: 10rpx;
  top: 10rpx;
  width: 14rpx;
  height: 8rpx;
  border-width: 3rpx;
}

.file-scroll {
  width: 100%;
  margin-top: 22rpx;
  white-space: nowrap;
}

.file-list {
  gap: 16rpx;
  width: max-content;
}

.file-item {
  width: 172rpx;
  min-height: 84rpx;
  gap: 12rpx;
  padding: 16rpx 14rpx;
  border: 1rpx solid #e8eef6;
  border-radius: 10rpx;
  background: rgba(255, 255, 255, 0.92);
}

.file-icon {
  display: flex;
  width: 38rpx;
  height: 48rpx;
  align-items: center;
  justify-content: center;
  border-radius: 5rpx;
  color: #fff;
  font-size: 16rpx;
  font-weight: 900;
}

.file-icon--red {
  background: #f04444;
}

.file-icon--blue {
  background: #2f78f5;
}

.file-icon--green {
  background: #1aad65;
}

.file-icon--orange {
  background: #ff9b31;
}

.file-copy {
  min-width: 0;
}

.file-name {
  display: block;
  max-width: 108rpx;
  overflow: hidden;
  color: #12192f;
  font-size: 23rpx;
  font-weight: 900;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.file-status {
  display: block;
  margin-top: 4rpx;
  color: #12a761;
  font-size: 22rpx;
  font-weight: 800;
}

.status-card {
  background: linear-gradient(135deg, #fffaf0, #ffffff);
}

.status-row {
  width: 100%;
  gap: 20rpx;
  margin: 24rpx 0 0;
  padding: 0;
  border: 0;
  background: transparent;
  text-align: left;
}

.status-row::after {
  display: none;
}

.status-copy {
  min-width: 0;
  flex: 1;
}

.status-title {
  display: block;
  font-size: 31rpx;
}

.status-desc {
  font-size: 28rpx;
  line-height: 1.48;
}

.arrow {
  width: 20rpx;
  height: 28rpx;
  margin-right: 12rpx;
}

.arrow::before {
  inset: 4rpx 5rpx;
  border-top: 4rpx solid #6c7f9f;
  border-right: 4rpx solid #6c7f9f;
  transform: rotate(45deg);
}

.fixed-actions {
  gap: 18rpx;
  margin: 18rpx 28rpx 0;
  padding-bottom: env(safe-area-inset-bottom);
}

.bottom-button {
  min-width: 0;
  flex: 1;
}

@media (max-width: 370px) {
  .content {
    padding-right: 24rpx;
    padding-left: 24rpx;
  }

  .hero-title {
    font-size: 38rpx;
  }

  .orange-chip {
    font-size: 25rpx;
  }

  .activity-card,
  .supplement-card,
  .identified-card,
  .file-card,
  .status-card {
    padding-right: 24rpx;
    padding-left: 24rpx;
  }

  .meeting-art {
    width: 142rpx;
    transform: scale(0.88);
    transform-origin: right center;
  }

  .supplement-item {
    padding-right: 110rpx;
  }

  .clipboard-art {
    right: 24rpx;
    transform: scale(0.85);
    transform-origin: right center;
  }
}
</style>
