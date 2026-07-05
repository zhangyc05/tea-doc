<script setup lang="ts">
import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobileNavbar from '../../../components/MobileNavbar.vue'
import { previewVirtualResearchMaterial } from '../../../domain/virtualResearch'

const evidenceItems = [
  { label: '会议纪要', status: '已归档', icon: 'note' },
  { label: '任务分工', status: '已归档', icon: 'user' },
  { label: '阶段材料', status: '已归档 1 份', icon: 'folder' },
  { label: '发言摘录', status: '已归档', icon: 'message' },
]

const files = [
  { name: '设备调试案例素材.pdf', type: 'pdf' },
  { name: '会议纪要.pdf', type: 'pdf' },
  { name: '任务分工截图.png', type: 'image' },
]

function goBack() {
  uni.navigateBack()
}

function previewMaterial(fileName: string) {
  const preview = previewVirtualResearchMaterial(fileName)
  uni.showToast({ title: preview.message || `贡献材料预览为本地模拟：${fileName}`, icon: 'none' })
}

function goResearchRecord() {
  uni.navigateTo({ url: '/pages/archive/record-detail/index?recordId=virtual-research-course-case-meeting' })
}
</script>

<template>
  <view class="contribution-detail-page">
    <MobileNavbar title="贡献详情" size="compact" @back="goBack" />

    <view class="content">
      <MobileCard class="hero-card">
        <view class="hero-icon" aria-hidden="true">
          <view class="document-icon"></view>
          <view class="star-badge"></view>
        </view>
        <view class="hero-copy">
          <view class="hero-title-row">
            <text class="hero-title">设备调试案例整理</text>
            <text class="confirmed-chip">已确认</text>
          </view>
          <text class="hero-subtitle">查看已确认的个人教研贡献</text>
        </view>
      </MobileCard>

      <MobileCard class="section-card">
        <view class="section-head">
          <view class="section-icon section-icon--calendar"></view>
          <text class="section-title">所属教研活动</text>
        </view>
        <view class="info-table">
          <view class="info-row">
            <text class="info-label">活动名称：</text>
            <text class="info-value">课程案例共创碰头会</text>
          </view>
          <view class="info-row">
            <text class="info-label">时间：</text>
            <text class="info-value">2026-06-03 14:00-15:30</text>
          </view>
          <view class="info-row">
            <text class="info-label">来源：</text>
            <text class="info-value">腾讯会议 ｜ 智能制造课程虚拟教研室</text>
          </view>
        </view>
      </MobileCard>

      <MobileCard class="section-card">
        <view class="section-head">
          <view class="section-icon section-icon--message"></view>
          <text class="section-title">贡献说明</text>
        </view>
        <text class="paragraph">
          你在本次教研中提供了企业设备调试案例素材，并参与整理案例结构与可提炼的教学点，供课程案例共创讨论使用。
        </text>
      </MobileCard>

      <MobileCard class="section-card evidence-card">
        <view class="section-head">
          <view class="section-icon section-icon--shield"></view>
          <text class="section-title">系统依据</text>
        </view>
        <view class="evidence-grid">
          <view v-for="item in evidenceItems" :key="item.label" class="evidence-item">
            <view class="evidence-icon" :class="`evidence-icon--${item.icon}`"></view>
            <text class="evidence-label">{{ item.label }}</text>
            <text class="evidence-divider">|</text>
            <text class="evidence-status">{{ item.status }}</text>
          </view>
        </view>
      </MobileCard>

      <MobileCard class="section-card file-card">
        <view class="section-head">
          <view class="section-icon section-icon--link"></view>
          <text class="section-title">关联材料</text>
        </view>
        <view class="file-list">
          <view v-for="file in files" :key="file.name" class="file-row" @tap="previewMaterial(file.name)">
            <view class="file-icon" :class="`file-icon--${file.type}`">
              <text v-if="file.type === 'pdf'">PDF</text>
            </view>
            <text class="file-name">{{ file.name }}</text>
            <wd-icon name="chevron-right" size="24rpx" color="#7b8495" />
          </view>
        </view>
      </MobileCard>

      <MobileCard class="section-card">
        <view class="section-head">
          <view class="section-icon section-icon--user"></view>
          <text class="section-title">确认记录</text>
        </view>
        <view class="info-table">
          <view class="info-row">
            <text class="info-label">确认人：</text>
            <text class="info-value">林老师</text>
          </view>
          <view class="info-row">
            <text class="info-label">确认时间：</text>
            <text class="info-value">2026-06-03 18:40</text>
          </view>
          <view class="info-row">
            <text class="info-label">归档时间：</text>
            <text class="info-value">2026-06-04 10:20</text>
          </view>
        </view>
      </MobileCard>

      <MobileCard class="section-card destination-card">
        <view class="section-head">
          <view class="section-icon section-icon--info"></view>
          <text class="section-title">记录去向</text>
        </view>
        <text class="paragraph">
          已形成个人教研贡献记录，可在“我的教研室”和“成长档案 · 教研科研维度”中查看。
        </text>
      </MobileCard>

      <MobileActionButton class="return-button" variant="primary" @tap="goResearchRecord">
        返回教研记录
      </MobileActionButton>
    </view>
  </view>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.contribution-detail-page {
  min-height: 100vh;
  padding-bottom: calc(76rpx + env(safe-area-inset-bottom));
  overflow-x: hidden;
  background:
    radial-gradient(circle at 88% 2%, rgba(223, 250, 236, 0.92), transparent 26%),
    radial-gradient(circle at 10% 0%, rgba(235, 251, 243, 0.72), transparent 28%),
    linear-gradient(180deg, #fbfffd 0%, #f5faf8 100%);
  color: #10172d;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
  padding: 0 30rpx;
}

.hero-card,
.section-card {
  border-radius: 24rpx;
}

.hero-card {
  display: flex;
  align-items: center;
  gap: 30rpx;
  padding: 36rpx 34rpx;
}

.hero-icon {
  position: relative;
  flex: 0 0 auto;
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
  background: #e6fbef;
}

.document-icon,
.star-badge,
.section-icon,
.evidence-icon,
.file-icon,
.row-arrow {
  position: relative;
  flex: 0 0 auto;
}

.document-icon {
  position: absolute;
  left: 36rpx;
  top: 26rpx;
  width: 55rpx;
  height: 70rpx;
  border-radius: 8rpx;
  background: linear-gradient(180deg, #21d87f, #05af58);
}

.document-icon::before,
.document-icon::after,
.star-badge::before,
.section-icon::before,
.section-icon::after,
.evidence-icon::before,
.evidence-icon::after,
.file-icon::before,
.file-icon::after,
.row-arrow::before {
  position: absolute;
  content: '';
}

.document-icon::before {
  right: 0;
  top: 0;
  border-top: 16rpx solid #bef5d4;
  border-left: 16rpx solid transparent;
}

.document-icon::after {
  left: 14rpx;
  top: 25rpx;
  width: 28rpx;
  height: 5rpx;
  border-radius: 5rpx;
  background: #fff;
  box-shadow: 0 20rpx 0 #fff;
}

.star-badge {
  position: absolute;
  right: 18rpx;
  bottom: 18rpx;
  width: 38rpx;
  height: 38rpx;
  border: 6rpx solid #fff;
  border-radius: 50%;
  background: #12bb68;
}

.star-badge::before {
  inset: 8rpx;
  background: #fff;
  clip-path: polygon(50% 0, 61% 35%, 98% 35%, 68% 56%, 80% 92%, 50% 70%, 20% 92%, 32% 56%, 2% 35%, 39% 35%);
}

.hero-copy {
  min-width: 0;
  flex: 1;
}

.hero-title-row,
.section-head,
.info-row,
.evidence-grid,
.evidence-item,
.file-row {
  display: flex;
  align-items: center;
}

.hero-title,
.hero-subtitle,
.section-title,
.info-label,
.info-value,
.paragraph,
.evidence-label,
.evidence-status,
.file-name {
  display: block;
}

.hero-title-row {
  flex-wrap: wrap;
  gap: 18rpx;
}

.hero-title {
  min-width: 0;
  flex: 1 1 auto;
  color: #070d1d;
  font-size: 40rpx;
  font-weight: 900;
  line-height: 1.2;
}

.confirmed-chip {
  flex: 0 0 auto;
  padding: 9rpx 18rpx;
  border-radius: 10rpx;
  background: #e8fbf0;
  color: #06934f;
  font-size: 27rpx;
  font-weight: 900;
}

.hero-subtitle {
  margin-top: 20rpx;
  color: #30466e;
  font-size: 29rpx;
  line-height: 1.35;
}

.section-card {
  padding: 30rpx;
}

.section-head {
  gap: 20rpx;
}

.section-icon {
  width: 38rpx;
  height: 38rpx;
  color: #0fbf68;
}

.section-icon--calendar::before {
  inset: 6rpx 3rpx 3rpx;
  border: 4rpx solid currentColor;
  border-radius: 5rpx;
}

.section-icon--calendar::after {
  left: 11rpx;
  right: 11rpx;
  top: 1rpx;
  height: 12rpx;
  border-right: 4rpx solid currentColor;
  border-left: 4rpx solid currentColor;
}

.section-icon--message::before {
  left: 2rpx;
  top: 7rpx;
  width: 30rpx;
  height: 22rpx;
  border: 4rpx solid currentColor;
  border-radius: 6rpx;
}

.section-icon--message::after {
  left: 10rpx;
  top: 17rpx;
  width: 5rpx;
  height: 5rpx;
  border-radius: 50%;
  background: currentColor;
  box-shadow: 10rpx 0 0 currentColor, 20rpx 0 0 currentColor;
}

.section-icon--shield::before {
  left: 7rpx;
  top: 2rpx;
  width: 25rpx;
  height: 32rpx;
  border: 4rpx solid currentColor;
  border-radius: 6rpx 6rpx 15rpx 15rpx;
}

.section-icon--shield::after {
  left: 14rpx;
  top: 14rpx;
  width: 14rpx;
  height: 9rpx;
  border-bottom: 4rpx solid currentColor;
  border-left: 4rpx solid currentColor;
  transform: rotate(-45deg);
}

.section-icon--link::before {
  left: 3rpx;
  top: 14rpx;
  width: 22rpx;
  height: 13rpx;
  border: 5rpx solid currentColor;
  border-radius: 12rpx;
  transform: rotate(-45deg);
}

.section-icon--link::after {
  right: 3rpx;
  top: 10rpx;
  width: 22rpx;
  height: 13rpx;
  border: 5rpx solid currentColor;
  border-radius: 12rpx;
  transform: rotate(-45deg);
}

.section-icon--user::before {
  left: 12rpx;
  top: 3rpx;
  width: 14rpx;
  height: 14rpx;
  border: 4rpx solid currentColor;
  border-radius: 50%;
}

.section-icon--user::after {
  left: 5rpx;
  bottom: 3rpx;
  width: 28rpx;
  height: 15rpx;
  border: 4rpx solid currentColor;
  border-radius: 18rpx 18rpx 4rpx 4rpx;
}

.section-icon--info::before {
  inset: 3rpx;
  border: 4rpx solid currentColor;
  border-radius: 50%;
}

.section-icon--info::after {
  left: 17rpx;
  top: 12rpx;
  width: 5rpx;
  height: 16rpx;
  border-radius: 5rpx;
  background: currentColor;
  box-shadow: 0 -8rpx 0 -1rpx currentColor;
}

.section-title {
  color: #070d1d;
  font-size: 34rpx;
  font-weight: 900;
  line-height: 1.22;
}

.info-table {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
  margin-top: 30rpx;
  padding-left: 50rpx;
}

.info-row {
  gap: 26rpx;
  color: #111827;
  font-size: 29rpx;
  line-height: 1.28;
}

.info-label {
  flex: 0 0 124rpx;
  color: #203b6b;
}

.info-value {
  min-width: 0;
  flex: 1;
  white-space: normal;
  overflow-wrap: anywhere;
  word-break: break-word;
}

.paragraph {
  margin-top: 26rpx;
  padding-left: 50rpx;
  color: #111827;
  font-size: 30rpx;
  line-height: 1.55;
}

.evidence-grid {
  flex-wrap: wrap;
  gap: 16rpx;
  margin-top: 28rpx;
  padding-left: 50rpx;
}

.evidence-item {
  width: calc(50% - 8rpx);
  min-height: 66rpx;
  box-sizing: border-box;
  gap: 15rpx;
  padding: 0 22rpx;
  border: 1rpx solid #d9f2e5;
  border-radius: 10rpx;
  background: #fbfffd;
  color: #10172d;
  font-size: 27rpx;
}

.evidence-icon {
  width: 34rpx;
  height: 34rpx;
  color: #0fbf68;
}

.evidence-icon--note::before {
  inset: 5rpx 8rpx;
  border: 4rpx solid currentColor;
  border-radius: 5rpx;
}

.evidence-icon--note::after {
  left: 13rpx;
  top: 15rpx;
  width: 11rpx;
  height: 4rpx;
  background: currentColor;
  box-shadow: 0 9rpx 0 currentColor;
}

.evidence-icon--user::before {
  left: 11rpx;
  top: 4rpx;
  width: 12rpx;
  height: 12rpx;
  border: 4rpx solid currentColor;
  border-radius: 50%;
}

.evidence-icon--user::after {
  left: 5rpx;
  bottom: 4rpx;
  width: 24rpx;
  height: 13rpx;
  border: 4rpx solid currentColor;
  border-radius: 16rpx 16rpx 4rpx 4rpx;
}

.evidence-icon--folder::before {
  left: 3rpx;
  top: 13rpx;
  width: 28rpx;
  height: 18rpx;
  border: 4rpx solid currentColor;
  border-radius: 5rpx;
}

.evidence-icon--folder::after {
  left: 8rpx;
  top: 8rpx;
  width: 17rpx;
  height: 8rpx;
  border: 4rpx solid currentColor;
  border-bottom: 0;
  border-radius: 5rpx 5rpx 0 0;
}

.evidence-icon--message::before {
  inset: 6rpx 3rpx 8rpx;
  border: 4rpx solid currentColor;
  border-radius: 6rpx;
}

.evidence-icon--message::after {
  left: 10rpx;
  top: 16rpx;
  width: 5rpx;
  height: 5rpx;
  border-radius: 50%;
  background: currentColor;
  box-shadow: 9rpx 0 0 currentColor, 18rpx 0 0 currentColor;
}

.evidence-label {
  white-space: nowrap;
}

.evidence-divider {
  color: #7a879d;
}

.evidence-status {
  color: #08a85c;
  font-weight: 900;
  white-space: nowrap;
}

.file-list {
  margin-top: 28rpx;
  padding-left: 50rpx;
}

.file-row {
  gap: 24rpx;
  min-height: 72rpx;
  border-bottom: 1rpx solid #e7ecf2;
}

.file-row:last-child {
  border-bottom: 0;
}

.file-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36rpx;
  height: 44rpx;
  border-radius: 6rpx;
  background: #f04444;
  color: #fff;
  font-size: 14rpx;
  font-weight: 900;
  line-height: 1;
}

.file-icon--pdf::before {
  right: 0;
  top: 0;
  border-top: 12rpx solid #ffd7d7;
  border-left: 12rpx solid transparent;
}

.file-icon--image {
  background: #12b966;
}

.file-icon--image::before {
  left: 8rpx;
  bottom: 9rpx;
  width: 20rpx;
  height: 14rpx;
  background: #fff;
  clip-path: polygon(0 100%, 35% 45%, 52% 70%, 72% 25%, 100% 100%);
}

.file-icon--image::after {
  right: 8rpx;
  top: 9rpx;
  width: 7rpx;
  height: 7rpx;
  border-radius: 50%;
  background: #fff;
}

.file-name {
  min-width: 0;
  flex: 1;
  color: #111827;
  font-size: 29rpx;
}

.row-arrow {
  width: 18rpx;
  height: 18rpx;
  color: #64748b;
}

.row-arrow::before {
  inset: 0;
  border-top: 4rpx solid currentColor;
  border-right: 4rpx solid currentColor;
  transform: rotate(45deg);
}

.destination-card {
  margin-bottom: 8rpx;
}

.return-button {
  height: 88rpx;
  border-radius: 14rpx;
  background: linear-gradient(135deg, #13c86b, #02a950);
  color: #fff;
  font-size: 35rpx;
}

@media (max-width: 430px) {
  .content {
    gap: 16rpx;
    padding-right: 20rpx;
    padding-left: 20rpx;
  }

  .hero-card {
    gap: 20rpx;
    padding: 24rpx 22rpx;
  }

  .hero-title-row {
    gap: 10rpx;
  }

  .hero-icon {
    width: 90rpx;
    height: 90rpx;
  }

  .document-icon {
    left: 27rpx;
    top: 19rpx;
    width: 42rpx;
    height: 54rpx;
  }

  .document-icon::before {
    border-top-width: 12rpx;
    border-left-width: 12rpx;
  }

  .document-icon::after {
    left: 11rpx;
    top: 19rpx;
    width: 22rpx;
    height: 4rpx;
    box-shadow: 0 15rpx 0 #fff;
  }

  .star-badge {
    right: 12rpx;
    bottom: 12rpx;
    width: 30rpx;
    height: 30rpx;
    border-width: 4rpx;
  }

  .hero-title {
    font-size: 30rpx;
  }

  .confirmed-chip {
    padding: 7rpx 13rpx;
    font-size: 22rpx;
  }

  .hero-subtitle {
    margin-top: 12rpx;
    font-size: 23rpx;
  }

  .section-card {
    padding: 20rpx;
  }

  .section-head {
    gap: 14rpx;
  }

  .section-icon {
    width: 32rpx;
    height: 32rpx;
  }

  .section-title {
    font-size: 27rpx;
  }

  .info-table,
  .paragraph,
  .evidence-grid,
  .file-list {
    margin-top: 18rpx;
    padding-left: 34rpx;
  }

  .info-table {
    gap: 14rpx;
  }

  .info-row,
  .file-name {
    font-size: 23rpx;
  }

  .info-label {
    flex-basis: 96rpx;
  }

  .paragraph {
    font-size: 24rpx;
    line-height: 1.48;
  }

  .evidence-grid {
    gap: 10rpx;
  }

  .evidence-item {
    gap: 8rpx;
    min-height: 52rpx;
    padding-right: 8rpx;
    padding-left: 8rpx;
    font-size: 21rpx;
  }

  .evidence-icon {
    width: 28rpx;
    height: 28rpx;
  }

  .file-row {
    gap: 18rpx;
    min-height: 58rpx;
  }

  .return-button {
    height: 72rpx;
    font-size: 28rpx;
  }
}

@media (max-width: 374px) {
  .content {
    padding-right: 14rpx;
    padding-left: 14rpx;
  }

  .hero-title-row {
    align-items: flex-start;
    flex-direction: column;
    gap: 8rpx;
  }

  .info-table,
  .paragraph,
  .evidence-grid,
  .file-list {
    padding-left: 0;
  }

  .info-row {
    align-items: flex-start;
    gap: 12rpx;
  }

  .evidence-item {
    width: 100%;
  }
}
</style>
