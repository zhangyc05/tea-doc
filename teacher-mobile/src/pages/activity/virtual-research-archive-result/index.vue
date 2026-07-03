<script setup lang="ts">
import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobileNavbar from '../../../components/MobileNavbar.vue'
import { submitVirtualResearchArchive } from '../../../domain/virtualResearch'

submitVirtualResearchArchive()

const contributions = [
  {
    index: 1,
    title: '提供企业设备调试案例素材',
    source: '阶段材料、会议纪要',
    desc: '你提供的案例素材被用于课程案例共创讨论。',
  },
  {
    index: 2,
    title: '补充设备故障诊断教学建议',
    source: '发言摘录、会议纪要',
    desc: '你补充的教学建议被纳入课程应用讨论和方案完善。',
  },
]

const archiveFiles = [
  { name: '会议纪要.pdf', meta: 'PDF · 2.6MB', status: '已归档', type: 'pdf' },
  { name: '企业设备调试案例素材.pdf', meta: 'PDF · 3.2MB', status: '已归档', type: 'pdf' },
  { name: '阶段任务分工记录.docx', meta: 'DOCX · 560KB', status: '已归档', type: 'doc' },
  { name: '个人贡献记录', meta: '记录 · 系统生成', status: '已确认 2 项', type: 'record' },
]

const destinations = [
  { title: '我的教研室', desc: '查看活动与记录', type: 'room' },
  { title: '档案待确认', desc: '查看待确认教研记录', type: 'archive' },
]

function goBack() {
  uni.navigateBack()
}

function showToast(title: string) {
  uni.showToast({ title, icon: 'none' })
}

function goArchiveRecord() {
  uni.navigateTo({
    url: '/pages/archive/record-detail/index?recordId=virtual-research-course-case-meeting',
  })
}

function goResearchRoom() {
  uni.navigateTo({ url: '/pages/activity/virtual-research-room/index' })
}
</script>

<template>
  <view class="archive-page">
    <MobileNavbar title="教研活动详情" size="compact" @back="goBack">
      <template #right>
        <button class="more-button" @tap="showToast('更多')">•••</button>
      </template>
    </MobileNavbar>

    <view class="content">
      <view class="success-hero">
        <view class="confetti confetti--one"></view>
        <view class="confetti confetti--two"></view>
        <view class="confetti confetti--three"></view>
        <view class="success-mark"></view>
        <view class="success-title-row">
          <text class="success-title">教研活动已归档</text>
          <text class="success-chip">已归档</text>
        </view>
        <text class="success-desc">本次教研活动已完成归档，你的个人贡献已确认，并形成教研活动记录。</text>
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
              <view class="tiny-icon tiny-icon--calendar"></view>
              <text>2026-06-03（周二）14:00-15:30</text>
            </view>
            <view class="meta-row">
              <view class="tiny-icon tiny-icon--video"></view>
              <text>腾讯会议　会议号：123 456 789</text>
            </view>
            <view class="meta-row">
              <view class="tiny-icon tiny-icon--room"></view>
              <text>智能制造课程虚拟教研室</text>
            </view>
          </view>
          <view class="activity-art">
            <view class="screen-art"></view>
            <view class="person-art"></view>
            <view class="chat-art"></view>
            <view class="small-check"></view>
          </view>
        </view>
      </MobileCard>

      <MobileCard class="section-card confirmed-card">
        <view class="section-head section-head--between">
          <view class="section-head-left">
            <view class="head-icon head-icon--person"></view>
            <text class="section-title">已确认的个人贡献</text>
          </view>
          <text class="confirmed-chip">已确认 2 项</text>
        </view>
        <view class="contribution-list">
          <view v-for="item in contributions" :key="item.index" class="contribution-item">
            <text class="index-badge">{{ item.index }}</text>
            <view class="contribution-copy">
              <text class="contribution-title">{{ item.title }}</text>
              <text class="source-pill">来源：{{ item.source }}</text>
              <text class="contribution-desc">{{ item.desc }}</text>
            </view>
            <view class="check-outline"></view>
          </view>
        </view>
      </MobileCard>

      <MobileCard class="section-card">
        <view class="section-head section-head--between">
          <view class="section-head-left">
            <view class="head-icon head-icon--folder"></view>
            <text class="section-title">归档材料</text>
          </view>
          <text class="archived-chip">全部已归档</text>
        </view>
        <view class="file-list">
          <button v-for="file in archiveFiles" :key="file.name" class="file-row" @tap="showToast(file.name)">
            <view class="file-type" :class="`file-type--${file.type}`">
              <text>{{ file.type === 'pdf' ? 'PDF' : file.type === 'doc' ? 'DOC' : '记' }}</text>
            </view>
            <view class="file-copy">
              <text class="file-name">{{ file.name }}</text>
              <text class="file-meta">{{ file.meta }}</text>
            </view>
            <text class="file-status">{{ file.status }}</text>
            <view class="row-arrow"></view>
          </button>
        </view>
      </MobileCard>

      <MobileCard class="section-card destination-card">
        <view class="section-head">
          <view class="head-icon head-icon--star"></view>
          <text class="section-title">归档去向</text>
        </view>
        <view class="formed-row">
          <view class="formed-check"></view>
          <view class="formed-copy">
            <text class="formed-title">已形成教研活动记录</text>
            <text class="formed-desc">记录已进入档案待确认队列，对齐 archiveStore.processingRecords，管理端确认后才写入成长档案事实。</text>
          </view>
        </view>
        <view class="destination-grid">
          <view v-for="item in destinations" :key="item.title" class="destination-item" @tap="item.type === 'archive' ? goArchiveRecord() : goResearchRoom()">
            <view class="destination-icon" :class="`destination-icon--${item.type}`"></view>
            <view class="destination-copy">
              <text class="destination-title">{{ item.title }}</text>
              <text class="destination-desc">{{ item.desc }}</text>
            </view>
          </view>
        </view>
      </MobileCard>

      <view class="info-tip">
        <view class="info-icon"></view>
        <text>当前是教研活动归档结果，不等同正式档案事实；管理端确认后才用于岗位竞聘、聘期考核等场景。</text>
      </view>
    </view>

    <view class="fixed-actions">
      <MobileActionButton class="action-button outline-button" variant="outline" @tap="goResearchRoom">
        返回教研室
      </MobileActionButton>
      <MobileActionButton class="action-button primary-button" variant="primary" @tap="goArchiveRecord">
        查看教研记录
      </MobileActionButton>
    </view>
  </view>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.archive-page {
  min-height: 100vh;
  padding-bottom: calc(136rpx + env(safe-area-inset-bottom));
  overflow-x: hidden;
  background: linear-gradient(180deg, #ffffff 0%, #fbfdff 44%, #f8fbfa 100%);
  color: #10172d;
}

.more-button {
  margin: 0 24rpx 0 0;
  padding: 0;
  border: 0;
  background: transparent;
  color: #050812;
  font-size: 38rpx;
  font-weight: 900;
  line-height: 1;
}

.more-button::after,
.file-row::after {
  display: none;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 22rpx;
  padding: 0 28rpx 24rpx;
}

.success-hero {
  position: relative;
  display: flex;
  min-height: 270rpx;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: 8rpx 32rpx 2rpx;
  text-align: center;
}

.success-mark,
.confetti,
.section-head,
.section-head-left,
.head-icon,
.tiny-icon,
.activity-art,
.screen-art,
.person-art,
.chat-art,
.small-check,
.index-badge,
.check-outline,
.file-type,
.row-arrow,
.formed-check,
.destination-icon,
.info-icon {
  position: relative;
  flex: 0 0 auto;
}

.success-mark {
  width: 86rpx;
  height: 86rpx;
  border-radius: 50%;
  background: linear-gradient(135deg, #19c879, #08a95d);
  box-shadow: 0 16rpx 36rpx rgba(9, 168, 91, 0.24);
}

.success-mark::before,
.confetti::before,
.confetti::after,
.head-icon::before,
.head-icon::after,
.tiny-icon::before,
.tiny-icon::after,
.screen-art::before,
.screen-art::after,
.person-art::before,
.person-art::after,
.chat-art::before,
.small-check::before,
.index-badge::before,
.check-outline::before,
.file-type::before,
.row-arrow::before,
.formed-check::before,
.destination-icon::before,
.destination-icon::after,
.info-icon::before {
  position: absolute;
  content: '';
}

.success-mark::before {
  left: 27rpx;
  top: 25rpx;
  width: 34rpx;
  height: 19rpx;
  border-bottom: 9rpx solid #fff;
  border-left: 9rpx solid #fff;
  transform: rotate(-45deg);
}

.confetti {
  position: absolute;
  width: 10rpx;
  height: 10rpx;
  background: #7f5af5;
  transform: rotate(45deg);
}

.confetti::before,
.confetti::after {
  width: 8rpx;
  height: 8rpx;
}

.confetti--one {
  left: 38%;
  top: 46rpx;
  background: #ff7d8c;
}

.confetti--one::before {
  left: -70rpx;
  top: 66rpx;
  background: #92c7c9;
}

.confetti--one::after {
  right: -184rpx;
  top: 72rpx;
  background: #f8a63d;
}

.confetti--two {
  right: 36%;
  top: 52rpx;
  background: #7f5af5;
}

.confetti--two::before {
  right: -76rpx;
  top: 70rpx;
  background: #7f5af5;
}

.confetti--two::after {
  left: -148rpx;
  top: 72rpx;
  background: #aacbb8;
}

.confetti--three {
  left: 50%;
  top: 108rpx;
  width: 6rpx;
  height: 6rpx;
  background: #dce7ff;
}

.success-title-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18rpx;
  margin-top: 30rpx;
}

.success-title {
  color: #050812;
  font-size: 40rpx;
  font-weight: 900;
  line-height: 1.2;
}

.success-chip,
.confirmed-chip,
.archived-chip {
  border-radius: 999rpx;
  background: #e7f9dd;
  color: #15a85b;
  font-weight: 900;
  white-space: nowrap;
}

.success-chip {
  padding: 8rpx 18rpx;
  font-size: 25rpx;
}

.success-desc {
  display: block;
  margin-top: 18rpx;
  color: #53627c;
  font-size: 28rpx;
  line-height: 1.45;
}

.activity-card,
.section-card {
  border-radius: 22rpx;
  box-shadow: 0 10rpx 28rpx rgba(23, 35, 61, 0.05);
}

.activity-card {
  padding: 30rpx 34rpx;
  background: #fff;
}

.section-card {
  padding: 28rpx 30rpx;
  background: #fff;
}

.confirmed-card {
  background: linear-gradient(180deg, #f3fbf6 0%, #ffffff 100%);
}

.destination-card {
  background: linear-gradient(180deg, #fffaf0 0%, #fffdf8 100%);
}

.section-head,
.section-head-left {
  display: flex;
  align-items: center;
  gap: 18rpx;
}

.section-head--between {
  justify-content: space-between;
}

.section-title,
.activity-title,
.meta-row,
.contribution-title,
.source-pill,
.contribution-desc,
.file-name,
.file-meta,
.file-status,
.formed-title,
.formed-desc,
.destination-title,
.destination-desc,
.info-tip {
  display: block;
}

.section-title {
  color: #070d1d;
  font-size: 31rpx;
  font-weight: 900;
  line-height: 1.25;
}

.confirmed-chip,
.archived-chip {
  padding: 8rpx 16rpx;
  font-size: 24rpx;
}

.head-icon {
  width: 42rpx;
  height: 42rpx;
  border-radius: 10rpx;
  background: #e9f1ff;
  color: #3277f4;
}

.head-icon--person,
.head-icon--star {
  background: #e8fbf0;
  color: #0fb463;
}

.head-icon--folder {
  background: #eaf2ff;
  color: #2d7cf7;
}

.head-icon--star {
  background: #fff2d6;
  color: #f59b14;
}

.head-icon::before {
  inset: 11rpx;
  border: 4rpx solid currentColor;
  border-radius: 6rpx;
}

.head-icon--group::before {
  top: 8rpx;
  left: 17rpx;
  width: 8rpx;
  height: 8rpx;
  border: 0;
  border-radius: 50%;
  background: currentColor;
  box-shadow: -12rpx 9rpx 0 currentColor, 12rpx 9rpx 0 currentColor;
}

.head-icon--group::after {
  left: 8rpx;
  bottom: 8rpx;
  width: 26rpx;
  height: 12rpx;
  border-radius: 14rpx 14rpx 6rpx 6rpx;
  background: currentColor;
}

.head-icon--person::before {
  top: 8rpx;
  left: 16rpx;
  width: 12rpx;
  height: 12rpx;
  border: 0;
  border-radius: 50%;
  background: currentColor;
}

.head-icon--person::after {
  left: 10rpx;
  bottom: 8rpx;
  width: 24rpx;
  height: 14rpx;
  border-radius: 15rpx 15rpx 5rpx 5rpx;
  background: currentColor;
}

.head-icon--folder::before {
  inset: 14rpx 8rpx 9rpx;
  border: 0;
  border-radius: 4rpx;
  background: currentColor;
}

.head-icon--folder::after {
  left: 10rpx;
  top: 10rpx;
  width: 18rpx;
  height: 10rpx;
  border-radius: 6rpx 6rpx 0 0;
  background: currentColor;
}

.head-icon--star::before {
  inset: 8rpx;
  border: 0;
  background: currentColor;
  clip-path: polygon(50% 0, 62% 34%, 98% 36%, 70% 58%, 80% 94%, 50% 72%, 20% 94%, 30% 58%, 2% 36%, 38% 34%);
}

.activity-body {
  display: flex;
  align-items: center;
  gap: 20rpx;
  margin-top: 26rpx;
}

.activity-copy {
  min-width: 0;
  flex: 1;
}

.activity-title {
  color: #070d1d;
  font-size: 38rpx;
  font-weight: 900;
  line-height: 1.22;
}

.meta-row {
  display: flex;
  align-items: center;
  gap: 18rpx;
  margin-top: 24rpx;
  color: #111827;
  font-size: 29rpx;
  line-height: 1.28;
}

.tiny-icon {
  width: 30rpx;
  height: 30rpx;
  color: #667089;
}

.tiny-icon::before {
  inset: 5rpx;
  border: 3rpx solid currentColor;
  border-radius: 4rpx;
}

.tiny-icon--calendar::after {
  left: 9rpx;
  right: 9rpx;
  top: 1rpx;
  height: 9rpx;
  border-right: 3rpx solid currentColor;
  border-left: 3rpx solid currentColor;
}

.tiny-icon--video::after {
  right: 1rpx;
  top: 10rpx;
  border-top: 5rpx solid transparent;
  border-bottom: 5rpx solid transparent;
  border-left: 8rpx solid currentColor;
}

.tiny-icon--room::after {
  left: 10rpx;
  top: 9rpx;
  width: 8rpx;
  height: 8rpx;
  border-radius: 50%;
  background: currentColor;
}

.activity-art {
  width: 180rpx;
  height: 132rpx;
}

.screen-art {
  position: absolute;
  right: 18rpx;
  top: 7rpx;
  width: 94rpx;
  height: 76rpx;
  border: 10rpx solid #9dbcf4;
  border-radius: 12rpx;
}

.screen-art::before {
  left: 21rpx;
  top: 31rpx;
  width: 17rpx;
  height: 22rpx;
  border-radius: 4rpx 4rpx 0 0;
  background: #78a6f5;
  box-shadow: 26rpx -16rpx 0 #78a6f5, 52rpx -33rpx 0 #78a6f5;
}

.screen-art::after {
  left: 16rpx;
  right: 16rpx;
  bottom: -26rpx;
  height: 8rpx;
  border-radius: 8rpx;
  background: #cbdaf5;
}

.person-art {
  position: absolute;
  left: 20rpx;
  bottom: 10rpx;
  width: 38rpx;
  height: 38rpx;
  border-radius: 50%;
  background: #2f78f5;
}

.person-art::after {
  left: -16rpx;
  top: 42rpx;
  width: 70rpx;
  height: 30rpx;
  border-radius: 34rpx 34rpx 6rpx 6rpx;
  background: #2f78f5;
}

.chat-art {
  position: absolute;
  left: 34rpx;
  top: 26rpx;
  width: 48rpx;
  height: 34rpx;
  border-radius: 10rpx;
  background: #dbe8ff;
}

.chat-art::before {
  left: 11rpx;
  top: 15rpx;
  width: 7rpx;
  height: 7rpx;
  border-radius: 50%;
  background: #2d7cf7;
  box-shadow: 13rpx 0 0 #2d7cf7, 26rpx 0 0 #2d7cf7;
}

.small-check {
  position: absolute;
  right: 0;
  bottom: 18rpx;
  width: 54rpx;
  height: 54rpx;
  border-radius: 50%;
  background: linear-gradient(135deg, #24c576, #10a964);
}

.small-check::before {
  left: 17rpx;
  top: 16rpx;
  width: 22rpx;
  height: 13rpx;
  border-bottom: 5rpx solid #fff;
  border-left: 5rpx solid #fff;
  transform: rotate(-45deg);
}

.contribution-list {
  display: flex;
  flex-direction: column;
  gap: 14rpx;
  margin-top: 22rpx;
}

.contribution-item {
  display: flex;
  align-items: center;
  gap: 18rpx;
  padding: 20rpx;
  border-radius: 16rpx;
  background: #fff;
}

.index-badge {
  display: flex;
  width: 42rpx;
  height: 42rpx;
  align-items: center;
  justify-content: center;
  border-radius: 10rpx;
  background: #e8fbf0;
  color: #13ad63;
  font-size: 26rpx;
  font-weight: 900;
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

.source-pill {
  width: fit-content;
  margin-top: 10rpx;
  padding: 5rpx 12rpx;
  border-radius: 8rpx;
  background: #eef4fb;
  color: #51617a;
  font-size: 24rpx;
  line-height: 1.2;
}

.contribution-desc {
  margin-top: 12rpx;
  color: #30466e;
  font-size: 26rpx;
  line-height: 1.35;
}

.check-outline {
  width: 40rpx;
  height: 40rpx;
  border: 4rpx solid #13ad63;
  border-radius: 50%;
}

.check-outline::before {
  left: 10rpx;
  top: 9rpx;
  width: 16rpx;
  height: 9rpx;
  border-bottom: 4rpx solid #13ad63;
  border-left: 4rpx solid #13ad63;
  transform: rotate(-45deg);
}

.file-list {
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-top: 22rpx;
  border: 1rpx solid #e4e9f2;
  border-radius: 14rpx;
  overflow: hidden;
}

.file-row {
  display: flex;
  min-height: 82rpx;
  align-items: center;
  gap: 18rpx;
  margin: 0;
  padding: 14rpx 18rpx;
  border: 0;
  border-bottom: 1rpx solid #e4e9f2;
  border-radius: 0;
  background: #fcfdff;
  text-align: left;
}

.file-row:last-child {
  border-bottom: 0;
}

.file-type {
  display: flex;
  width: 44rpx;
  height: 52rpx;
  align-items: center;
  justify-content: center;
  border-radius: 7rpx;
  background: #f03f3f;
  color: #fff;
  font-size: 14rpx;
  font-weight: 900;
  line-height: 1;
}

.file-type--doc {
  background: #2d7cf7;
}

.file-type--record {
  background: #22b86a;
}

.file-type::before {
  right: 0;
  top: 0;
  border-top: 13rpx solid rgba(255, 255, 255, 0.52);
  border-left: 13rpx solid transparent;
}

.file-copy {
  min-width: 0;
  flex: 1;
}

.file-name {
  color: #111827;
  font-size: 27rpx;
  font-weight: 900;
  line-height: 1.2;
}

.file-meta,
.file-status {
  color: #4a5875;
  font-size: 24rpx;
  line-height: 1.2;
}

.file-meta {
  margin-top: 8rpx;
}

.file-status {
  white-space: nowrap;
}

.row-arrow {
  width: 16rpx;
  height: 16rpx;
  color: #64748b;
}

.row-arrow::before {
  inset: 0;
  border-top: 4rpx solid currentColor;
  border-right: 4rpx solid currentColor;
  transform: rotate(45deg);
}

.formed-row {
  display: flex;
  align-items: flex-start;
  gap: 18rpx;
  margin-top: 24rpx;
  padding: 0 28rpx;
}

.formed-check {
  width: 34rpx;
  height: 34rpx;
  margin-top: 5rpx;
  border: 4rpx solid #18b96b;
  border-radius: 50%;
}

.formed-check::before {
  left: 8rpx;
  top: 7rpx;
  width: 14rpx;
  height: 8rpx;
  border-bottom: 4rpx solid #18b96b;
  border-left: 4rpx solid #18b96b;
  transform: rotate(-45deg);
}

.formed-copy {
  min-width: 0;
  flex: 1;
}

.formed-title {
  color: #111827;
  font-size: 28rpx;
  font-weight: 900;
  line-height: 1.25;
}

.formed-desc {
  margin-top: 8rpx;
  color: #53627c;
  font-size: 25rpx;
  line-height: 1.35;
}

.destination-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20rpx;
  margin-top: 22rpx;
}

.destination-item {
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 18rpx;
  padding: 20rpx;
  border: 1rpx solid #e8edf4;
  border-radius: 14rpx;
  background: rgba(255, 255, 255, 0.72);
}

.destination-icon {
  width: 58rpx;
  height: 58rpx;
  border-radius: 12rpx;
  background: #eaf2ff;
  color: #2d7cf7;
}

.destination-icon--archive {
  background: #e8fbf0;
  color: #0fb463;
}

.destination-icon::before {
  left: 10rpx;
  right: 9rpx;
  bottom: 12rpx;
  height: 28rpx;
  border-radius: 6rpx;
  background: currentColor;
}

.destination-icon::after {
  left: 14rpx;
  top: 13rpx;
  width: 25rpx;
  height: 12rpx;
  border-radius: 7rpx 7rpx 0 0;
  background: currentColor;
}

.destination-copy {
  min-width: 0;
}

.destination-title {
  color: #111827;
  font-size: 26rpx;
  font-weight: 900;
  line-height: 1.25;
}

.destination-desc {
  margin-top: 8rpx;
  color: #53627c;
  font-size: 22rpx;
  line-height: 1.25;
}

.info-tip {
  display: flex;
  align-items: center;
  gap: 16rpx;
  padding: 20rpx 26rpx;
  border-radius: 14rpx;
  background: #f4f6f8;
  color: #53627c;
  font-size: 25rpx;
  line-height: 1.35;
}

.info-icon {
  width: 28rpx;
  height: 28rpx;
  border: 3rpx solid #64748b;
  border-radius: 50%;
}

.info-icon::before {
  left: 11rpx;
  top: 10rpx;
  width: 4rpx;
  height: 10rpx;
  border-radius: 4rpx;
  background: #64748b;
  box-shadow: 0 -7rpx 0 #64748b;
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
  border-color: #2d7cf7;
  color: #1f6df2;
}

.primary-button {
  background: linear-gradient(135deg, #2d7cf7, #1763df);
}

@media (max-width: 430px) {
  .archive-page {
    padding-bottom: calc(116rpx + env(safe-area-inset-bottom));
  }

  .more-button {
    margin-right: 12rpx;
    font-size: 30rpx;
  }

  .content {
    gap: 14rpx;
    padding-right: 20rpx;
    padding-left: 20rpx;
  }

  .success-hero {
    min-height: 218rpx;
    padding: 8rpx 16rpx 0;
  }

  .success-mark {
    width: 66rpx;
    height: 66rpx;
  }

  .success-mark::before {
    left: 20rpx;
    top: 19rpx;
    width: 27rpx;
    height: 15rpx;
    border-bottom-width: 7rpx;
    border-left-width: 7rpx;
  }

  .success-title-row {
    gap: 10rpx;
    margin-top: 22rpx;
  }

  .success-title {
    font-size: 30rpx;
  }

  .success-chip {
    padding: 6rpx 12rpx;
    font-size: 20rpx;
  }

  .success-desc {
    margin-top: 12rpx;
    font-size: 22rpx;
  }

  .activity-card,
  .section-card {
    padding: 18rpx;
  }

  .section-title {
    font-size: 25rpx;
  }

  .confirmed-chip,
  .archived-chip {
    padding: 6rpx 10rpx;
    font-size: 20rpx;
  }

  .activity-body {
    gap: 12rpx;
    margin-top: 16rpx;
  }

  .activity-title {
    font-size: 29rpx;
  }

  .meta-row {
    gap: 10rpx;
    margin-top: 14rpx;
    font-size: 22rpx;
  }

  .activity-art {
    width: 118rpx;
    height: 94rpx;
  }

  .screen-art {
    width: 62rpx;
    height: 50rpx;
    border-width: 7rpx;
  }

  .person-art {
    width: 28rpx;
    height: 28rpx;
  }

  .person-art::after {
    width: 52rpx;
    height: 22rpx;
  }

  .chat-art {
    width: 40rpx;
    height: 30rpx;
  }

  .small-check {
    width: 38rpx;
    height: 38rpx;
  }

  .contribution-list,
  .file-list,
  .destination-grid {
    margin-top: 14rpx;
  }

  .contribution-item {
    gap: 12rpx;
    padding: 14rpx;
  }

  .contribution-title,
  .formed-title {
    font-size: 23rpx;
  }

  .source-pill,
  .contribution-desc,
  .formed-desc,
  .info-tip {
    font-size: 20rpx;
  }

  .file-row {
    min-height: 66rpx;
    gap: 12rpx;
    padding: 10rpx 12rpx;
  }

  .file-type {
    width: 38rpx;
    height: 46rpx;
    font-size: 12rpx;
  }

  .file-name,
  .file-meta,
  .file-status {
    font-size: 20rpx;
  }

  .formed-row {
    gap: 12rpx;
    margin-top: 16rpx;
    padding: 0 12rpx;
  }

  .destination-grid {
    gap: 12rpx;
  }

  .destination-item {
    gap: 10rpx;
    padding: 14rpx;
  }

  .destination-icon {
    width: 44rpx;
    height: 44rpx;
  }

  .destination-title {
    font-size: 21rpx;
  }

  .destination-desc {
    font-size: 18rpx;
  }

  .info-tip {
    padding: 14rpx 18rpx;
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

  .activity-body {
    align-items: flex-start;
  }

  .activity-art {
    display: none;
  }

  .section-head--between {
    align-items: flex-start;
  }

  .contribution-item {
    align-items: flex-start;
  }

  .check-outline {
    display: none;
  }

  .file-status {
    display: none;
  }

  .destination-grid {
    grid-template-columns: 1fr;
  }

  .fixed-actions {
    padding-right: 14rpx;
    padding-left: 14rpx;
  }
}
</style>
