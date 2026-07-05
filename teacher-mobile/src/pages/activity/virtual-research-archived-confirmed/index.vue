<script setup lang="ts">
import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobileNavbar from '../../../components/MobileNavbar.vue'
import { formatVirtualResearchSourceLine } from '../../../domain/virtualResearch'

const activityItems = [
  { icon: 'doc', label: '活动名称：', value: '课程案例共创碰头会' },
  { icon: 'room', label: '所属教研室：', value: '智能制造课程虚拟教研室' },
  { icon: 'time', label: '活动时间：', value: '2026-06-03 14:00-15:30' },
  { icon: 'briefcase', label: '参与方式：', value: '腾讯会议' },
  { icon: 'calendar', label: '归档时间：', value: '2026-06-04 09:20' },
]

const contributions = [
  {
    icon: 'file',
    title: '提供企业设备调试案例素材',
    sourceKeys: ['stage-material', 'meeting-minutes'] as const,
    tags: ['已确认'],
  },
  {
    icon: 'chat',
    title: '补充设备故障诊断教学建议',
    sourceKeys: ['speech-excerpt', 'meeting-minutes'] as const,
    tags: ['已确认'],
  },
  {
    icon: 'group',
    title: '参与课程案例结构讨论',
    sourceKeys: ['meeting-minutes', 'speech-excerpt', 'stage-material', 'task-assignment'] as const,
    tags: ['新补充', '已确认'],
  },
]

const files = [
  { name: '会议纪要.pdf', status: '已归档', type: 'pdf' },
  { name: '发言摘录.docx', status: '已归档', type: 'word' },
  { name: '阶段材料.pdf', status: '已归档', type: 'pdf' },
  { name: '任务分工记录.xlsx', status: '已归档', type: 'excel' },
]

function goBack() {
  uni.navigateBack()
}

function showArchivedFileFeedback(name: string) {
  uni.showToast({
    title: `归档材料预览为本地模拟：${name}`,
    icon: 'none',
  })
}

function goResearchRoom() {
  uni.navigateTo({ url: '/pages/activity/virtual-research-room/index' })
}

function goResearchRecord() {
  uni.navigateTo({ url: '/pages/archive/record-detail/index?recordId=virtual-research-course-case-meeting' })
}
</script>

<template>
  <view class="archived-page">
    <MobileNavbar title="教研活动已归档" size="compact" @back="goBack" />

    <view class="content">
      <MobileCard class="hero-card">
        <view class="hero-illustration" aria-hidden="true">
          <view class="spark spark--one"></view>
          <view class="spark spark--two"></view>
          <view class="spark spark--three"></view>
          <view class="clipboard">
            <view class="clip"></view>
            <view class="hero-check"></view>
          </view>
          <view class="shadow"></view>
        </view>
        <view class="hero-copy">
          <text class="hero-title">本次教研活动已完成归档</text>
          <text class="hero-desc">你确认的 3 项个人贡献已形成教研活动记录，可在教研记录中查看。</text>
          <view class="hero-tags">
            <text class="tag tag--strong">贡献已确认</text>
            <text class="tag">已归档</text>
          </view>
        </view>
      </MobileCard>

      <MobileCard class="section-card activity-card">
        <text class="section-title">本次教研活动</text>
        <view class="activity-list">
          <view v-for="item in activityItems" :key="item.label" class="activity-row">
            <view class="line-icon" :class="`line-icon--${item.icon}`"></view>
            <text class="activity-label">{{ item.label }}</text>
            <text class="activity-value">{{ item.value }}</text>
          </view>
        </view>
      </MobileCard>

      <MobileCard class="section-card contribution-card">
        <text class="section-title">已确认贡献（3）</text>
        <view class="contribution-list">
          <view v-for="item in contributions" :key="item.title" class="contribution-row">
            <view class="contribution-icon" :class="`contribution-icon--${item.icon}`"></view>
            <view class="contribution-copy">
              <text class="contribution-title">{{ item.title }}</text>
              <text class="contribution-source">来源：{{ formatVirtualResearchSourceLine([...item.sourceKeys]) }}</text>
            </view>
            <view class="contribution-tags">
              <text
                v-for="tag in item.tags"
                :key="tag"
                class="contribution-tag"
                :class="{ 'contribution-tag--orange': tag === '新补充' }"
              >
                {{ tag }}
              </text>
            </view>
          </view>
        </view>
      </MobileCard>

      <MobileCard class="section-card material-card">
        <text class="section-title">归档材料</text>
        <view class="file-list">
          <button v-for="file in files" :key="file.name" class="file-row" @tap="showArchivedFileFeedback(file.name)">
            <view class="file-type" :class="`file-type--${file.type}`">
              <text>{{ file.type === 'word' ? 'W' : file.type === 'excel' ? 'X' : '' }}</text>
            </view>
            <text class="file-name">{{ file.name }}</text>
            <text class="file-status">{{ file.status }}</text>
            <wd-icon name="chevron-right" size="24rpx" color="#7b8495" />
          </button>
        </view>
      </MobileCard>

      <MobileCard class="section-card destination-card">
        <text class="section-title">归档去向</text>
        <view class="destination-body">
          <view class="cloud-icon"></view>
          <text class="destination-text">
            本次活动记录已形成虚拟教研记录，并进入档案待确认队列，对齐 archiveStore.processingRecords。
          </text>
        </view>
      </MobileCard>
    </view>

    <view class="fixed-actions">
      <MobileActionButton class="action-button outline-button" variant="outline" @tap="goResearchRoom">
        返回教研室
      </MobileActionButton>
      <MobileActionButton class="action-button primary-button" variant="primary" @tap="goResearchRecord">
        查看教研记录
      </MobileActionButton>
    </view>
  </view>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.archived-page {
  min-height: 100vh;
  padding-bottom: calc(170rpx + env(safe-area-inset-bottom));
  overflow-x: hidden;
  background: linear-gradient(180deg, #ffffff 0%, #fbfdff 54%, #f8fbfb 100%);
  color: #0b122a;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 22rpx;
  padding: 22rpx 34rpx 28rpx;
}

.hero-card,
.section-card {
  border-radius: 24rpx;
  box-shadow: 0 12rpx 30rpx rgba(19, 30, 54, 0.05);
}

.hero-card {
  display: flex;
  min-height: 176rpx;
  align-items: center;
  gap: 32rpx;
  padding: 30rpx 38rpx;
}

.hero-illustration,
.clipboard,
.clip,
.hero-check,
.shadow,
.spark,
.line-icon,
.contribution-icon,
.file-type,
.row-arrow,
.cloud-icon {
  position: relative;
  flex: 0 0 auto;
}

.hero-illustration {
  width: 210rpx;
  height: 150rpx;
}

.clipboard {
  position: absolute;
  left: 54rpx;
  top: 22rpx;
  width: 108rpx;
  height: 114rpx;
  border-radius: 14rpx;
  background: linear-gradient(180deg, #24d274, #08b55d);
  box-shadow: 0 16rpx 28rpx rgba(10, 181, 93, 0.2);
}

.clip {
  position: absolute;
  left: 28rpx;
  top: -20rpx;
  width: 52rpx;
  height: 34rpx;
  border: 10rpx solid #23c96d;
  border-bottom: 0;
  border-radius: 12rpx 12rpx 6rpx 6rpx;
  background: #11bd63;
}

.hero-check {
  position: absolute;
  left: 31rpx;
  top: 53rpx;
  width: 48rpx;
  height: 28rpx;
  border-bottom: 12rpx solid #fff;
  border-left: 12rpx solid #fff;
  transform: rotate(-45deg);
}

.shadow {
  position: absolute;
  left: 10rpx;
  right: 8rpx;
  bottom: 4rpx;
  height: 34rpx;
  border-radius: 50%;
  background: rgba(20, 188, 103, 0.14);
}

.spark {
  position: absolute;
  width: 14rpx;
  height: 14rpx;
  background: #86ddb3;
  transform: rotate(45deg);
}

.spark::before,
.line-icon::before,
.line-icon::after,
.contribution-icon::before,
.contribution-icon::after,
.file-type::before,
.row-arrow::before,
.cloud-icon::before,
.cloud-icon::after {
  position: absolute;
  content: '';
}

.spark--one {
  left: 18rpx;
  top: 28rpx;
}

.spark--two {
  right: 6rpx;
  top: 14rpx;
}

.spark--three {
  left: 28rpx;
  bottom: 44rpx;
  width: 10rpx;
  height: 10rpx;
}

.spark::before {
  inset: -8rpx 4rpx;
  background: inherit;
}

.hero-copy {
  min-width: 0;
  flex: 1;
}

.hero-title,
.hero-desc,
.section-title,
.activity-label,
.activity-value,
.contribution-title,
.contribution-source,
.file-name,
.file-status,
.destination-text {
  display: block;
}

.hero-title {
  color: #080d20;
  font-size: 40rpx;
  font-weight: 900;
  line-height: 1.25;
}

.hero-desc {
  margin-top: 16rpx;
  color: #1d3d78;
  font-size: 27rpx;
  line-height: 1.48;
}

.hero-tags {
  display: flex;
  gap: 18rpx;
  margin-top: 18rpx;
}

.tag,
.contribution-tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999rpx;
  background: #e9f9e8;
  color: #10a957;
  font-weight: 900;
  white-space: nowrap;
}

.tag {
  padding: 10rpx 24rpx;
  font-size: 26rpx;
}

.tag--strong {
  background: linear-gradient(135deg, #15c76c, #08af5c);
  color: #fff;
}

.section-card {
  padding: 30rpx;
  background: #fff;
}

.section-title {
  color: #081024;
  font-size: 34rpx;
  font-weight: 900;
  line-height: 1.25;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 28rpx;
  margin-top: 30rpx;
  padding-left: 130rpx;
}

.activity-row {
  display: grid;
  grid-template-columns: 36rpx auto 1fr;
  align-items: center;
  gap: 18rpx;
  min-width: 0;
}

.line-icon {
  width: 30rpx;
  height: 30rpx;
  color: #24437b;
}

.line-icon::before {
  inset: 5rpx;
  border: 3rpx solid currentColor;
  border-radius: 4rpx;
}

.line-icon--room::before {
  inset: 7rpx 4rpx 4rpx;
  transform: rotate(45deg);
}

.line-icon--time::before {
  border-radius: 50%;
}

.line-icon--time::after {
  left: 14rpx;
  top: 8rpx;
  width: 8rpx;
  height: 10rpx;
  border-bottom: 3rpx solid currentColor;
  border-left: 3rpx solid currentColor;
}

.line-icon--briefcase::after {
  left: 10rpx;
  top: 4rpx;
  width: 10rpx;
  height: 7rpx;
  border: 3rpx solid currentColor;
  border-bottom: 0;
  border-radius: 3rpx 3rpx 0 0;
}

.line-icon--calendar::after {
  left: 9rpx;
  right: 9rpx;
  top: 1rpx;
  height: 9rpx;
  border-right: 3rpx solid currentColor;
  border-left: 3rpx solid currentColor;
}

.activity-label,
.activity-value {
  color: #0f172a;
  font-size: 27rpx;
  line-height: 1.3;
}

.activity-value {
  color: #1d3d78;
}

.contribution-list {
  display: flex;
  flex-direction: column;
  gap: 14rpx;
  margin-top: 22rpx;
}

.contribution-row {
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 22rpx;
  padding: 18rpx 20rpx;
  border-radius: 16rpx;
  background: #fbfffc;
}

.contribution-icon {
  width: 58rpx;
  height: 58rpx;
  border-radius: 12rpx;
  background: #ddf8e9;
  color: #0db35e;
}

.contribution-icon--file::before {
  inset: 12rpx 15rpx;
  border-radius: 4rpx;
  background: currentColor;
}

.contribution-icon--file::after {
  left: 23rpx;
  top: 26rpx;
  width: 15rpx;
  height: 9rpx;
  border-bottom: 4rpx solid #fff;
  border-left: 4rpx solid #fff;
  transform: rotate(-45deg);
}

.contribution-icon--chat::before {
  left: 11rpx;
  top: 14rpx;
  width: 36rpx;
  height: 28rpx;
  border-radius: 8rpx;
  background: currentColor;
}

.contribution-icon--chat::after {
  left: 20rpx;
  top: 27rpx;
  width: 5rpx;
  height: 5rpx;
  border-radius: 50%;
  background: #fff;
  box-shadow: 9rpx 0 0 #fff, 18rpx 0 0 #fff;
}

.contribution-icon--group::before {
  top: 12rpx;
  left: 23rpx;
  width: 12rpx;
  height: 12rpx;
  border-radius: 50%;
  background: currentColor;
  box-shadow: -14rpx 12rpx 0 currentColor, 14rpx 12rpx 0 currentColor;
}

.contribution-icon--group::after {
  left: 10rpx;
  bottom: 10rpx;
  width: 38rpx;
  height: 17rpx;
  border-radius: 18rpx 18rpx 6rpx 6rpx;
  background: currentColor;
}

.contribution-copy {
  min-width: 0;
  flex: 1;
}

.contribution-title {
  color: #111827;
  font-size: 29rpx;
  font-weight: 900;
  line-height: 1.25;
}

.contribution-source {
  margin-top: 9rpx;
  color: #1d3d78;
  font-size: 25rpx;
  line-height: 1.35;
}

.contribution-tags {
  display: flex;
  flex: 0 0 auto;
  gap: 10rpx;
}

.contribution-tag {
  padding: 8rpx 18rpx;
  font-size: 24rpx;
}

.contribution-tag--orange {
  border: 1rpx solid #ffb76a;
  background: #fff4e7;
  color: #ff7a1a;
}

.file-list {
  margin-top: 22rpx;
  border: 1rpx solid #e5ebf3;
  border-radius: 16rpx;
  overflow: hidden;
}

.file-row {
  display: grid;
  grid-template-columns: 48rpx minmax(0, 1fr) auto 20rpx;
  align-items: center;
  gap: 18rpx;
  min-height: 76rpx;
  margin: 0;
  padding: 14rpx 18rpx;
  border: 0;
  border-bottom: 1rpx solid #e5ebf3;
  border-radius: 0;
  background: #fff;
  text-align: left;
}

.file-row:last-child {
  border-bottom: 0;
}

.file-row::after {
  display: none;
}

.file-type {
  display: flex;
  width: 38rpx;
  height: 44rpx;
  align-items: center;
  justify-content: center;
  border-radius: 6rpx;
  background: #f04444;
  color: #fff;
  font-size: 20rpx;
  font-weight: 900;
  line-height: 1;
}

.file-type--word {
  background: #3b82f6;
}

.file-type--excel {
  background: #12a85f;
}

.file-type::before {
  right: 0;
  top: 0;
  border-top: 12rpx solid rgba(255, 255, 255, 0.5);
  border-left: 12rpx solid transparent;
}

.file-name {
  color: #111827;
  font-size: 27rpx;
  line-height: 1.2;
}

.file-status {
  color: #08a95d;
  font-size: 27rpx;
  font-weight: 900;
  white-space: nowrap;
}

.row-arrow {
  width: 16rpx;
  height: 16rpx;
  color: #60708e;
}

.row-arrow::before {
  inset: 0;
  border-top: 4rpx solid currentColor;
  border-right: 4rpx solid currentColor;
  transform: rotate(45deg);
}

.destination-body {
  display: flex;
  align-items: center;
  gap: 28rpx;
  margin-top: 22rpx;
}

.cloud-icon {
  width: 84rpx;
  height: 84rpx;
  border-radius: 50%;
  background: #e3fbec;
  color: #0db35e;
}

.cloud-icon::before {
  left: 19rpx;
  top: 32rpx;
  width: 46rpx;
  height: 28rpx;
  border-radius: 22rpx;
  background: currentColor;
}

.cloud-icon::after {
  left: 35rpx;
  top: 24rpx;
  width: 15rpx;
  height: 28rpx;
  border-left: 7rpx solid #fff;
  border-top: 7rpx solid #fff;
  transform: rotate(45deg);
}

.destination-text {
  min-width: 0;
  flex: 1;
  color: #1d3d78;
  font-size: 27rpx;
  line-height: 1.55;
}

.fixed-actions {
  position: fixed;
  right: 0;
  bottom: env(safe-area-inset-bottom);
  left: 0;
  z-index: 20;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28rpx;
  padding: 20rpx 42rpx 30rpx;
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(12rpx);
}

.action-button {
  height: 78rpx;
  border-radius: 12rpx;
  font-size: 31rpx;
}

.outline-button {
  border-color: #08b75f;
  color: #08a95d;
}

.primary-button {
  background: linear-gradient(135deg, #12c66d, #08aa58);
}

@media (max-width: 430px) {
  .archived-page {
    padding-bottom: calc(112rpx + env(safe-area-inset-bottom));
  }

  .content {
    gap: 14rpx;
    padding: 14rpx 18rpx 22rpx;
  }

  .hero-card {
    gap: 18rpx;
    min-height: 138rpx;
    padding: 22rpx 24rpx;
  }

  .hero-illustration {
    width: 128rpx;
    height: 112rpx;
  }

  .clipboard {
    left: 34rpx;
    top: 20rpx;
    width: 70rpx;
    height: 76rpx;
    border-radius: 10rpx;
  }

  .clip {
    left: 18rpx;
    top: -14rpx;
    width: 34rpx;
    height: 24rpx;
    border-width: 7rpx;
    border-bottom: 0;
  }

  .hero-check {
    left: 21rpx;
    top: 36rpx;
    width: 31rpx;
    height: 18rpx;
    border-bottom-width: 8rpx;
    border-left-width: 8rpx;
  }

  .hero-title {
    font-size: 28rpx;
  }

  .hero-desc {
    margin-top: 10rpx;
    font-size: 22rpx;
  }

  .hero-tags {
    gap: 10rpx;
    margin-top: 12rpx;
  }

  .tag {
    padding: 7rpx 14rpx;
    font-size: 20rpx;
  }

  .section-card {
    padding: 20rpx;
  }

  .section-title {
    font-size: 28rpx;
  }

  .activity-list {
    gap: 18rpx;
    margin-top: 22rpx;
    padding-left: 58rpx;
  }

  .activity-row {
    grid-template-columns: 30rpx auto 1fr;
    gap: 12rpx;
  }

  .activity-label,
  .activity-value,
  .destination-text {
    font-size: 22rpx;
  }

  .contribution-row {
    gap: 12rpx;
    padding: 12rpx;
  }

  .contribution-icon {
    width: 48rpx;
    height: 48rpx;
  }

  .contribution-title,
  .file-name,
  .file-status {
    font-size: 22rpx;
  }

  .contribution-source {
    font-size: 20rpx;
  }

  .contribution-tag {
    padding: 6rpx 12rpx;
    font-size: 19rpx;
  }

  .file-row {
    grid-template-columns: 40rpx minmax(0, 1fr) auto 16rpx;
    min-height: 60rpx;
    gap: 12rpx;
    padding: 10rpx 12rpx;
  }

  .file-type {
    width: 30rpx;
    height: 36rpx;
    font-size: 15rpx;
  }

  .cloud-icon {
    width: 60rpx;
    height: 60rpx;
  }

  .fixed-actions {
    gap: 14rpx;
    padding: 16rpx 20rpx 22rpx;
  }

  .action-button {
    height: 66rpx;
    font-size: 25rpx;
  }
}

@media (max-width: 374px) {
  .content {
    padding-right: 14rpx;
    padding-left: 14rpx;
  }

  .hero-card {
    align-items: flex-start;
    flex-direction: column;
  }

  .hero-illustration {
    align-self: center;
  }

  .activity-list {
    padding-left: 0;
  }

  .activity-row {
    grid-template-columns: 30rpx 1fr;
  }

  .activity-value {
    grid-column: 2;
  }

  .contribution-row {
    align-items: flex-start;
  }

  .contribution-tags {
    flex-direction: column;
  }

  .file-status {
    display: none;
  }

  .destination-body {
    align-items: flex-start;
  }

  .fixed-actions {
    padding-right: 14rpx;
    padding-left: 14rpx;
  }
}
</style>
