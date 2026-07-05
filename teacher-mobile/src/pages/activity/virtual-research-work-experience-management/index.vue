<script setup lang="ts">
import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobileNavbar from '../../../components/MobileNavbar.vue'
import MobileTabBar from '../../../components/MobileTabBar.vue'
import { previewVirtualResearchMaterial } from '../../../domain/virtualResearch'

const evidenceItems = [
  { icon: 'note', title: '会议纪要', status: '已归档' },
  { icon: 'group', title: '任务分工', status: '已归档' },
  { icon: 'folder', title: '阶段材料', status: '已归档 1 份' },
  { icon: 'chat', title: '发言摘录', status: '已归档' },
]

const files = [
  { type: 'word', name: '设备调试案例材料.docx' },
  { type: 'pdf', name: '会议纪要.pdf' },
  { type: 'image', name: '任务分工截图.png' },
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
  <view class="work-contribution-page">
    <MobileNavbar title="贡献详情" size="compact" @back="goBack" />
    <text class="scope-note">虚拟教研成员资料</text>

    <scroll-view class="page-scroll" scroll-y>
      <view class="content">
        <MobileCard class="hero-card">
          <view class="hero-icon">
            <view class="doc-art"></view>
            <view class="check-badge"></view>
          </view>
          <view class="hero-copy">
            <view class="hero-title-row">
              <text class="hero-title">设备调试案例整理</text>
              <text class="success-chip">已确认</text>
            </view>
            <text class="hero-desc">本次教研中的个人贡献已确认，可作为教研过程记录查看。</text>
          </view>
        </MobileCard>

        <MobileCard class="section-card">
          <text class="section-title">所属教研活动</text>
          <view class="activity-body">
            <view class="activity-icon"></view>
            <view class="activity-copy">
              <text class="activity-title">智能制造课程资源共建研讨</text>
              <view class="meta-row">
                <view class="meta-icon meta-icon--time"></view>
                <text>时间：2026-05-22 14:00-16:30</text>
              </view>
              <view class="meta-row">
                <view class="meta-icon meta-icon--org"></view>
                <text>组织：智能制造课程虚拟教研室</text>
              </view>
              <view class="meta-row">
                <view class="meta-icon meta-icon--way"></view>
                <text>方式：腾讯会议</text>
              </view>
            </view>
          </view>
        </MobileCard>

        <MobileCard class="section-card">
          <text class="section-title">贡献说明</text>
          <text class="paragraph">你在本次教研中负责整理企业设备调试案例，并同步给课程资源组，用于后续课程案例资源建设与共享。</text>
          <view class="tag-row">
            <text class="tag">案例整理</text>
            <text class="tag">资源共建</text>
          </view>
        </MobileCard>

        <MobileCard class="section-card">
          <text class="section-title">系统确认依据</text>
          <view class="table-list evidence-list">
            <view v-for="item in evidenceItems" :key="item.title" class="table-row evidence-row">
              <view class="evidence-icon" :class="`evidence-icon--${item.icon}`"></view>
              <text class="row-title">{{ item.title }}</text>
              <text class="status-chip">{{ item.status }}</text>
            </view>
          </view>
        </MobileCard>

        <MobileCard class="section-card">
          <text class="section-title">关联材料</text>
          <view class="table-list">
            <button v-for="file in files" :key="file.name" class="table-row file-row" @tap="previewMaterial(file.name)">
              <view class="file-icon" :class="`file-icon--${file.type}`">{{ file.type === 'word' ? 'W' : '' }}</view>
              <text class="row-title">{{ file.name }}</text>
              <text class="view-link">查看</text>
              <view class="row-arrow"></view>
            </button>
          </view>
        </MobileCard>

        <view class="summary-grid">
          <MobileCard class="summary-card">
            <view class="summary-head">
              <text class="section-title">确认记录</text>
              <view class="summary-icon summary-icon--user"></view>
            </view>
            <text class="summary-line">确认人：林老师</text>
            <text class="summary-line">确认时间：2026-05-22 18:40</text>
            <text class="summary-line">归档状态：<text class="green-text">已确认</text></text>
          </MobileCard>

          <MobileCard class="summary-card">
            <view class="summary-head">
              <text class="section-title">记录去向</text>
              <view class="summary-icon summary-icon--pin"></view>
            </view>
            <text class="summary-line">已形成个人教研贡献记录，可在“我的教研室”和“成长档案 · 教研科研”中查看。</text>
            <text class="summary-tip">可随时查看，助力成长沉淀与复盘</text>
          </MobileCard>
        </view>

        <MobileActionButton class="return-button" variant="outline" @tap="goResearchRecord">
          返回教研记录
        </MobileActionButton>
      </view>
    </scroll-view>

    <MobileTabBar active="activity" />
  </view>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.work-contribution-page {
  min-height: 100vh;
  overflow-x: hidden;
  background:
    radial-gradient(circle at 82% 2%, rgba(224, 250, 236, 0.85), transparent 30%),
    linear-gradient(180deg, #fbfffd 0%, #f7fbf9 100%);
  color: #10172d;
}

.page-scroll {
  height: calc(100vh - 92rpx);
}

.content {
  display: flex;
  flex-direction: column;
  gap: 22rpx;
  padding: 0 30rpx calc(174rpx + env(safe-area-inset-bottom));
}

.hero-card,
.section-card,
.summary-card {
  border-radius: 26rpx;
  box-shadow: 0 16rpx 42rpx rgba(19, 40, 74, 0.05);
}

.hero-card {
  display: flex;
  align-items: center;
  gap: 30rpx;
  padding: 34rpx;
}

.hero-icon,
.activity-icon {
  position: relative;
  flex: 0 0 auto;
  border-radius: 18rpx;
  background: #ecfbf3;
}

.hero-icon {
  width: 120rpx;
  height: 120rpx;
}

.doc-art {
  position: absolute;
  top: 24rpx;
  left: 34rpx;
  width: 60rpx;
  height: 70rpx;
  border-radius: 11rpx;
  background: linear-gradient(180deg, #2fd786, #12bd68);
}

.doc-art::before,
.doc-art::after,
.check-badge::before,
.activity-icon::before,
.activity-icon::after,
.meta-icon::before,
.meta-icon::after,
.evidence-icon::before,
.evidence-icon::after,
.file-icon::before,
.file-icon::after,
.row-arrow::before,
.summary-icon::before,
.summary-icon::after {
  position: absolute;
  content: '';
}

.doc-art::before {
  left: 16rpx;
  top: 20rpx;
  width: 28rpx;
  height: 5rpx;
  border-radius: 5rpx;
  background: #ffffff;
  box-shadow: 0 21rpx 0 #ffffff;
}

.check-badge {
  position: absolute;
  right: 14rpx;
  bottom: 18rpx;
  width: 46rpx;
  height: 46rpx;
  border: 6rpx solid #fff;
  border-radius: 999rpx;
  background: #29c872;
}

.check-badge::before {
  left: 12rpx;
  top: 12rpx;
  width: 17rpx;
  height: 10rpx;
  border-bottom: 5rpx solid #fff;
  border-left: 5rpx solid #fff;
  transform: rotate(-45deg);
}

.hero-copy {
  min-width: 0;
  flex: 1;
}

.hero-title-row,
.activity-body,
.meta-row,
.tag-row,
.table-row,
.summary-head {
  display: flex;
  align-items: center;
}

.hero-title-row {
  flex-wrap: wrap;
  gap: 16rpx;
}

.hero-title,
.hero-desc,
.section-title,
.activity-title,
.paragraph,
.row-title,
.summary-line,
.summary-tip {
  display: block;
}

.hero-title {
  color: #090f1f;
  font-size: 40rpx;
  font-weight: 900;
  line-height: 1.2;
}

.success-chip,
.status-chip,
.tag,
.summary-tip {
  border-radius: 10rpx;
  background: #e7f9ee;
  color: #08a85c;
  font-weight: 900;
}

.success-chip {
  padding: 7rpx 16rpx;
  font-size: 24rpx;
}

.hero-desc,
.paragraph,
.meta-row,
.summary-line {
  color: #30466e;
}

.hero-desc {
  margin-top: 16rpx;
  font-size: 26rpx;
  line-height: 1.42;
}

.section-card {
  padding: 30rpx;
}

.section-title {
  color: #0b1224;
  font-size: 34rpx;
  font-weight: 900;
  line-height: 1.2;
}

.activity-body {
  gap: 30rpx;
  margin-top: 26rpx;
}

.activity-icon {
  width: 120rpx;
  height: 120rpx;
  color: #28c874;
}

.activity-icon::before {
  left: 38rpx;
  top: 42rpx;
  width: 44rpx;
  height: 44rpx;
  border-radius: 50%;
  background: currentColor;
  box-shadow: -33rpx -10rpx 0 -8rpx #8be2b2, 33rpx -10rpx 0 -8rpx #8be2b2;
}

.activity-icon::after {
  left: 28rpx;
  bottom: 22rpx;
  width: 64rpx;
  height: 30rpx;
  border-radius: 34rpx 34rpx 0 0;
  background: currentColor;
  box-shadow: -35rpx 2rpx 0 -9rpx #8be2b2, 35rpx 2rpx 0 -9rpx #8be2b2;
}

.activity-copy {
  min-width: 0;
  flex: 1;
}

.activity-title {
  color: #111827;
  font-size: 29rpx;
  font-weight: 900;
  line-height: 1.25;
}

.meta-row {
  gap: 16rpx;
  margin-top: 15rpx;
  font-size: 24rpx;
  line-height: 1.25;
}

.meta-icon {
  position: relative;
  width: 28rpx;
  height: 28rpx;
  flex: 0 0 auto;
  color: #59709b;
}

.meta-icon--time::before {
  inset: 3rpx;
  border: 3rpx solid currentColor;
  border-radius: 5rpx;
}

.meta-icon--time::after {
  left: 8rpx;
  right: 8rpx;
  top: 1rpx;
  height: 8rpx;
  border-right: 3rpx solid currentColor;
  border-left: 3rpx solid currentColor;
}

.meta-icon--org::before {
  left: 5rpx;
  top: 4rpx;
  width: 18rpx;
  height: 22rpx;
  border: 3rpx solid currentColor;
  border-radius: 4rpx;
}

.meta-icon--org::after {
  left: 10rpx;
  top: 10rpx;
  width: 8rpx;
  height: 3rpx;
  background: currentColor;
  box-shadow: 0 7rpx 0 currentColor;
}

.meta-icon--way::before {
  left: 4rpx;
  top: 8rpx;
  width: 18rpx;
  height: 14rpx;
  border: 3rpx solid currentColor;
  border-radius: 4rpx;
}

.meta-icon--way::after {
  right: 2rpx;
  top: 10rpx;
  border-top: 5rpx solid transparent;
  border-bottom: 5rpx solid transparent;
  border-left: 8rpx solid currentColor;
}

.paragraph {
  margin-top: 18rpx;
  font-size: 26rpx;
  line-height: 1.6;
}

.tag-row {
  gap: 16rpx;
  margin-top: 18rpx;
}

.tag {
  padding: 9rpx 17rpx;
  font-size: 22rpx;
}

.table-list {
  margin-top: 18rpx;
  overflow: hidden;
  border: 1rpx solid #dfe7f2;
  border-radius: 14rpx;
  background: rgba(255, 255, 255, 0.84);
}

.table-row {
  min-height: 62rpx;
  gap: 20rpx;
  margin: 0;
  padding: 0 22rpx;
  border: 0;
  border-bottom: 1rpx solid #e6ecf3;
  border-radius: 0;
  background: transparent;
  text-align: left;
}

.table-row::after {
  display: none;
}

.table-row:last-child {
  border-bottom: 0;
}

.evidence-icon {
  position: relative;
  width: 30rpx;
  height: 30rpx;
  flex: 0 0 auto;
  color: #19bf6c;
}

.evidence-icon--note::before {
  inset: 3rpx 6rpx;
  border-radius: 4rpx;
  background: currentColor;
}

.evidence-icon--note::after {
  right: 2rpx;
  bottom: 2rpx;
  width: 12rpx;
  height: 12rpx;
  border: 3rpx solid #fff;
  border-radius: 50%;
  background: currentColor;
}

.evidence-icon--group::before {
  left: 10rpx;
  top: 5rpx;
  width: 10rpx;
  height: 10rpx;
  border-radius: 50%;
  background: currentColor;
  box-shadow: -10rpx 5rpx 0 -1rpx currentColor, 10rpx 5rpx 0 -1rpx currentColor;
}

.evidence-icon--group::after {
  left: 5rpx;
  bottom: 4rpx;
  width: 20rpx;
  height: 10rpx;
  border-radius: 12rpx 12rpx 0 0;
  background: currentColor;
}

.evidence-icon--folder::before {
  left: 3rpx;
  top: 10rpx;
  width: 24rpx;
  height: 17rpx;
  border-radius: 4rpx;
  background: currentColor;
}

.evidence-icon--folder::after {
  left: 5rpx;
  top: 6rpx;
  width: 14rpx;
  height: 7rpx;
  border-radius: 4rpx 4rpx 0 0;
  background: currentColor;
}

.evidence-icon--chat::before {
  inset: 5rpx 2rpx 7rpx;
  border: 3rpx solid currentColor;
  border-radius: 7rpx;
}

.evidence-icon--chat::after {
  left: 9rpx;
  top: 14rpx;
  width: 4rpx;
  height: 4rpx;
  border-radius: 50%;
  background: currentColor;
  box-shadow: 8rpx 0 0 currentColor, 16rpx 0 0 currentColor;
}

.row-title {
  min-width: 0;
  flex: 1;
  color: #111827;
  font-size: 25rpx;
  line-height: 1.25;
}

.status-chip {
  padding: 8rpx 14rpx;
  font-size: 21rpx;
  white-space: nowrap;
}

.file-icon {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32rpx;
  height: 38rpx;
  flex: 0 0 auto;
  border-radius: 5rpx;
  background: #2f7df6;
  color: #fff;
  font-size: 18rpx;
  font-weight: 900;
}

.file-icon::before {
  right: 0;
  top: 0;
  border-top: 10rpx solid rgba(255, 255, 255, 0.55);
  border-left: 10rpx solid transparent;
}

.file-icon--pdf {
  background: #f5222d;
}

.file-icon--pdf::after {
  left: 8rpx;
  top: 12rpx;
  width: 16rpx;
  height: 14rpx;
  border-bottom: 3rpx solid #fff;
  border-left: 3rpx solid #fff;
  transform: rotate(-8deg);
}

.file-icon--image {
  background: #18c46e;
}

.file-icon--image::after {
  left: 7rpx;
  bottom: 8rpx;
  width: 18rpx;
  height: 13rpx;
  background: #fff;
  clip-path: polygon(0 100%, 34% 50%, 52% 72%, 74% 26%, 100% 100%);
}

.view-link {
  color: #08a85c;
  font-size: 25rpx;
  font-weight: 900;
  white-space: nowrap;
}

.row-arrow {
  position: relative;
  width: 16rpx;
  height: 16rpx;
  flex: 0 0 auto;
  color: #08a85c;
}

.row-arrow::before {
  inset: 0;
  border-top: 4rpx solid currentColor;
  border-right: 4rpx solid currentColor;
  transform: rotate(45deg);
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 22rpx;
}

.summary-card {
  padding: 24rpx;
}

.summary-head {
  justify-content: space-between;
  gap: 12rpx;
}

.summary-icon {
  position: relative;
  width: 50rpx;
  height: 50rpx;
  flex: 0 0 auto;
  border-radius: 14rpx;
  background: #e7f9ee;
  color: #14bd67;
}

.summary-icon--user::before {
  left: 19rpx;
  top: 11rpx;
  width: 14rpx;
  height: 14rpx;
  border-radius: 50%;
  background: currentColor;
}

.summary-icon--user::after {
  left: 12rpx;
  bottom: 10rpx;
  width: 26rpx;
  height: 15rpx;
  border-radius: 16rpx 16rpx 4rpx 4rpx;
  background: currentColor;
}

.summary-icon--pin::before {
  left: 16rpx;
  top: 8rpx;
  width: 18rpx;
  height: 24rpx;
  border-radius: 14rpx 14rpx 14rpx 2rpx;
  background: currentColor;
  transform: rotate(-45deg);
}

.summary-icon--pin::after {
  left: 22rpx;
  top: 14rpx;
  width: 7rpx;
  height: 7rpx;
  border-radius: 50%;
  background: #e7f9ee;
}

.summary-line {
  margin-top: 18rpx;
  font-size: 25rpx;
  line-height: 1.45;
}

.green-text {
  color: #08a85c;
  font-weight: 900;
}

.summary-tip {
  display: inline-block;
  margin-top: 16rpx;
  padding: 8rpx 12rpx;
  font-size: 22rpx;
}

.return-button {
  width: 100%;
  height: 76rpx;
  border-radius: 14rpx;
  font-size: 31rpx;
}

@media (max-width: 430px) {
  .page-scroll {
    height: calc(100vh - 82rpx);
  }

  .content {
    gap: 14rpx;
    padding-right: 20rpx;
    padding-bottom: calc(156rpx + env(safe-area-inset-bottom));
    padding-left: 20rpx;
  }

  .hero-card {
    gap: 18rpx;
    padding: 22rpx;
  }

  .hero-icon {
    width: 86rpx;
    height: 86rpx;
  }

  .doc-art {
    top: 17rpx;
    left: 24rpx;
    width: 44rpx;
    height: 52rpx;
  }

  .doc-art::before {
    left: 11rpx;
    top: 15rpx;
    width: 22rpx;
    height: 4rpx;
    box-shadow: 0 15rpx 0 #ffffff;
  }

  .check-badge {
    right: 9rpx;
    bottom: 11rpx;
    width: 32rpx;
    height: 32rpx;
    border-width: 4rpx;
  }

  .check-badge::before {
    left: 8rpx;
    top: 8rpx;
    width: 12rpx;
    height: 7rpx;
    border-bottom-width: 4rpx;
    border-left-width: 4rpx;
  }

  .hero-title {
    font-size: 27rpx;
  }

  .success-chip {
    padding: 6rpx 11rpx;
    font-size: 18rpx;
  }

  .hero-desc,
  .paragraph {
    font-size: 20rpx;
  }

  .hero-desc {
    margin-top: 8rpx;
  }

  .section-card {
    padding: 20rpx;
  }

  .section-title {
    font-size: 25rpx;
  }

  .activity-body {
    gap: 18rpx;
    margin-top: 18rpx;
  }

  .activity-icon {
    width: 82rpx;
    height: 82rpx;
  }

  .activity-title {
    font-size: 22rpx;
  }

  .meta-row {
    gap: 10rpx;
    margin-top: 8rpx;
    font-size: 18rpx;
  }

  .paragraph {
    margin-top: 12rpx;
    line-height: 1.5;
  }

  .tag-row {
    gap: 10rpx;
    margin-top: 12rpx;
  }

  .tag {
    padding: 6rpx 12rpx;
    font-size: 18rpx;
  }

  .table-list {
    margin-top: 12rpx;
  }

  .table-row {
    min-height: 46rpx;
    gap: 12rpx;
    padding: 0 14rpx;
  }

  .evidence-icon {
    width: 24rpx;
    height: 24rpx;
  }

  .row-title,
  .view-link {
    font-size: 19rpx;
  }

  .status-chip {
    padding: 5rpx 9rpx;
    font-size: 16rpx;
  }

  .file-icon {
    width: 26rpx;
    height: 32rpx;
    font-size: 15rpx;
  }

  .summary-grid {
    gap: 14rpx;
  }

  .summary-card {
    padding: 18rpx;
  }

  .summary-icon {
    width: 42rpx;
    height: 42rpx;
  }

  .summary-line {
    margin-top: 10rpx;
    font-size: 19rpx;
  }

  .summary-tip {
    margin-top: 10rpx;
    padding: 5rpx 8rpx;
    font-size: 17rpx;
  }

  .return-button {
    height: 58rpx;
    font-size: 23rpx;
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
    gap: 6rpx;
  }

  .summary-grid {
    grid-template-columns: 1fr;
  }
}
</style>
