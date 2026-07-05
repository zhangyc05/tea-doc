<script setup lang="ts">
import { computed } from 'vue'
import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobileNavbar from '../../../components/MobileNavbar.vue'
import MobilePageShell from '../../../components/MobilePageShell.vue'
import { getTodoState } from '../../../stores/todoStore'

const todoState = getTodoState()
const certificate = computed(() => todoState.certificate)

const nextItems = [
  { icon: 'folder', text: '可在「档案待确认」中查看这条记录' },
  { icon: 'chart', text: '管理端确认后才会沉淀到成长档案' },
  { icon: 'shield', text: '如信息有误，可在档案详情中申请更正' },
]

function goBack() {
  uni.navigateBack()
}

function goTodo() {
  uni.navigateTo({ url: '/pages/todo/index' })
}

function goArchiveRecord() {
  uni.navigateTo({
    url: '/pages/archive/record-detail/index?recordId=certificate-digital-literacy&category=personal-development',
  })
}
</script>

<template>
  <MobilePageShell class="archive-success-page" active="todo">
    <MobileNavbar title="等待确认" size="compact" @back="goBack" />

    <MobileCard class="hero-card">
      <view class="hero-art">
        <view class="leaf leaf--left"></view>
        <view class="leaf leaf--right"></view>
        <view class="folder">
          <view class="paper"></view>
          <view class="check-circle"></view>
        </view>
        <view class="spark spark--one"></view>
        <view class="spark spark--two"></view>
      </view>
      <view class="hero-copy">
        <text class="hero-title">已确认，等待入档</text>
        <text class="hero-desc">你已确认这条培训证书属于本人，记录已进入管理端入档核验。</text>
      </view>
    </MobileCard>

    <MobileCard class="record-card">
      <text class="section-title">确认记录</text>
      <view class="record-row">
        <view class="document-icon">
          <view class="document-line"></view>
        </view>
        <view class="record-copy">
          <text class="record-title">{{ certificate.title }}</text>
          <text class="record-meta">{{ certificate.category }} ｜ 待核验 ｜ 06.14</text>
          <text class="record-desc">系统识别并由你确认后，先进入档案待确认队列。</text>
        </view>
      </view>
    </MobileCard>

    <MobileCard class="next-card">
      <text class="section-title">接下来</text>
      <button
        v-for="item in nextItems"
        :key="item.text"
        class="next-row"
        @tap="goArchiveRecord"
      >
        <view class="next-icon" :class="`next-icon--${item.icon}`"></view>
        <text class="next-text">{{ item.text }}</text>
        <view class="row-arrow"></view>
      </button>
    </MobileCard>

    <view class="footer-actions">
      <MobileActionButton class="footer-button" variant="primary" @tap="goArchiveRecord">
        查看待核验记录
      </MobileActionButton>
      <MobileActionButton class="footer-button" variant="outline" @tap="goTodo">
        返回待办
      </MobileActionButton>
    </view>
  </MobilePageShell>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.archive-success-page {
  min-height: 100vh;
  padding: calc(var(--status-bar-height) + 4rpx) 34rpx calc(220rpx + env(safe-area-inset-bottom));
  overflow-x: hidden;
  background:
    radial-gradient(circle at 13% 2%, rgba(224, 252, 239, 0.78), transparent 31%),
    linear-gradient(180deg, #ffffff 0%, #f8fbff 46%, #f6fbf9 100%);
  color: #10172d;
}

.hero-card,
.record-card,
.next-card {
  border-radius: 28rpx;
  box-shadow: 0 22rpx 56rpx rgba(35, 51, 87, 0.07);
}

.hero-card {
  display: flex;
  min-height: 324rpx;
  align-items: center;
  gap: 44rpx;
  margin-top: 34rpx;
  padding: 32rpx 40rpx;
  border: 2rpx solid rgba(188, 242, 211, 0.9);
  background: linear-gradient(105deg, #eafff3 0%, #f5fff9 100%);
}

.hero-art {
  position: relative;
  width: 270rpx;
  height: 214rpx;
  flex: 0 0 270rpx;
}

.folder,
.paper,
.check-circle,
.leaf,
.spark,
.document-icon,
.next-icon,
.row-arrow {
  position: relative;
  flex: 0 0 auto;
}

.folder {
  position: absolute;
  left: 64rpx;
  bottom: 20rpx;
  width: 152rpx;
  height: 126rpx;
  border-radius: 18rpx;
  background: linear-gradient(145deg, #5ee49b, #18c86f);
  box-shadow: 0 20rpx 42rpx rgba(11, 170, 84, 0.24);
}

.folder::before,
.folder::after,
.paper::before,
.paper::after,
.check-circle::before,
.leaf::before,
.spark::before,
.document-icon::before,
.document-icon::after,
.document-line::before,
.next-icon::before,
.next-icon::after,
.row-arrow::before {
  position: absolute;
  content: '';
}

.folder::before {
  left: 12rpx;
  top: -20rpx;
  width: 78rpx;
  height: 34rpx;
  border-radius: 14rpx 14rpx 0 0;
  background: #20ce76;
}

.paper {
  position: absolute;
  left: 40rpx;
  top: -50rpx;
  width: 118rpx;
  height: 92rpx;
  border-radius: 14rpx;
  background: rgba(255, 255, 255, 0.92);
  transform: rotate(5deg);
}

.paper::before,
.paper::after {
  left: 24rpx;
  width: 70rpx;
  height: 8rpx;
  border-radius: 8rpx;
  background: #7bd9bd;
}

.paper::before {
  top: 30rpx;
}

.paper::after {
  top: 56rpx;
}

.check-circle {
  position: absolute;
  left: 50rpx;
  bottom: 28rpx;
  width: 78rpx;
  height: 78rpx;
  border-radius: 50%;
  background: #f8fffb;
  box-shadow: 0 10rpx 28rpx rgba(10, 143, 75, 0.18);
}

.check-circle::before {
  left: 23rpx;
  top: 25rpx;
  width: 34rpx;
  height: 18rpx;
  border-bottom: 10rpx solid #18be67;
  border-left: 10rpx solid #18be67;
  transform: rotate(-45deg);
}

.leaf {
  position: absolute;
  border-radius: 100% 0 100% 0;
  background: linear-gradient(135deg, #a4e8be, #54d681);
}

.leaf--left {
  left: 4rpx;
  bottom: 44rpx;
  width: 70rpx;
  height: 38rpx;
  transform: rotate(48deg);
}

.leaf--right {
  right: 0;
  bottom: 28rpx;
  width: 76rpx;
  height: 42rpx;
  transform: rotate(-58deg);
}

.spark {
  position: absolute;
  width: 12rpx;
  height: 12rpx;
  background: #f7d65e;
  transform: rotate(45deg);
}

.spark--one {
  left: 40rpx;
  top: 56rpx;
}

.spark--two {
  right: 34rpx;
  top: 48rpx;
  background: #6bddaa;
}

.hero-copy {
  min-width: 0;
  flex: 1;
}

.hero-title {
  display: block;
  color: #078746;
  font-size: 50rpx;
  font-weight: 900;
  line-height: 1.1;
}

.hero-desc {
  display: block;
  margin-top: 28rpx;
  color: #1f2937;
  font-size: 31rpx;
  line-height: 1.55;
}

.record-card,
.next-card {
  margin-top: 40rpx;
  padding: 34rpx 34rpx;
}

.section-title {
  display: block;
  color: #10172d;
  font-size: 39rpx;
  font-weight: 900;
  line-height: 1.2;
}

.record-row {
  display: flex;
  align-items: center;
  gap: 36rpx;
  margin-top: 36rpx;
}

.document-icon {
  width: 132rpx;
  height: 132rpx;
  border-radius: 24rpx;
  background: #eaf4ff;
  color: #1677ff;
}

.document-icon::before {
  left: 43rpx;
  top: 31rpx;
  width: 50rpx;
  height: 66rpx;
  border: 9rpx solid currentColor;
  border-radius: 7rpx;
}

.document-icon::after {
  right: 35rpx;
  top: 32rpx;
  border-top: 24rpx solid currentColor;
  border-left: 24rpx solid transparent;
}

.document-line::before {
  left: 57rpx;
  top: 64rpx;
  width: 30rpx;
  height: 7rpx;
  border-radius: 7rpx;
  background: currentColor;
  box-shadow: 0 20rpx 0 currentColor;
}

.record-copy {
  min-width: 0;
  flex: 1;
}

.record-title,
.record-meta,
.record-desc,
.next-text {
  display: block;
}

.record-title {
  color: #10172d;
  font-size: 35rpx;
  font-weight: 900;
  line-height: 1.3;
}

.record-meta {
  margin-top: 22rpx;
  color: #4b5568;
  font-size: 30rpx;
  line-height: 1.2;
}

.record-desc {
  margin-top: 22rpx;
  color: #667089;
  font-size: 29rpx;
  line-height: 1.4;
}

.next-row {
  display: flex;
  width: 100%;
  min-height: 88rpx;
  align-items: center;
  gap: 24rpx;
  margin: 0;
  padding: 14rpx 0;
  border: 0;
  border-bottom: 1rpx solid #e7edf5;
  border-radius: 0;
  background: transparent;
  text-align: left;
}

.next-row::after {
  display: none;
}

.next-row:last-child {
  border-bottom: 0;
}

.next-icon {
  width: 62rpx;
  height: 62rpx;
  border-radius: 50%;
  background: #e6fbef;
  color: #10b960;
}

.next-icon--folder::before {
  left: 16rpx;
  top: 21rpx;
  width: 32rpx;
  height: 24rpx;
  border-radius: 5rpx;
  background: currentColor;
}

.next-icon--folder::after {
  left: 18rpx;
  top: 17rpx;
  width: 22rpx;
  height: 10rpx;
  border-radius: 6rpx 6rpx 0 0;
  background: currentColor;
}

.next-icon--chart::before {
  left: 16rpx;
  bottom: 15rpx;
  width: 7rpx;
  height: 15rpx;
  border-radius: 4rpx;
  background: currentColor;
  box-shadow: 12rpx -7rpx 0 currentColor, 24rpx -19rpx 0 currentColor;
}

.next-icon--chart::after {
  left: 17rpx;
  top: 15rpx;
  width: 26rpx;
  height: 18rpx;
  border-top: 5rpx solid currentColor;
  border-right: 5rpx solid currentColor;
  transform: rotate(-18deg);
}

.next-icon--shield::before {
  left: 18rpx;
  top: 13rpx;
  width: 26rpx;
  height: 34rpx;
  background: currentColor;
  clip-path: polygon(50% 0, 100% 17%, 90% 72%, 50% 100%, 10% 72%, 0 17%);
}

.next-icon--shield::after {
  left: 30rpx;
  top: 22rpx;
  width: 5rpx;
  height: 16rpx;
  border-radius: 4rpx;
  background: #fff;
  box-shadow: 0 21rpx 0 -1rpx #fff;
}

.next-text {
  min-width: 0;
  flex: 1;
  color: #10172d;
  font-size: 32rpx;
  line-height: 1.35;
}

.row-arrow {
  width: 22rpx;
  height: 22rpx;
  color: #8b94a7;
}

.row-arrow::before {
  inset: 0;
  border-top: 5rpx solid currentColor;
  border-right: 5rpx solid currentColor;
  transform: rotate(45deg);
}

.footer-actions {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 12;
  display: flex;
  flex-direction: column;
  gap: 24rpx;
  padding: 20rpx 32rpx calc(20rpx + env(safe-area-inset-bottom));
  border-top: 1rpx solid #edf1f6;
  background: rgba(255, 255, 255, 0.96);
}

.footer-button {
  width: 100%;
  height: 88rpx;
  border-radius: 18rpx;
  font-size: 34rpx;
}

@media (max-width: 430px) {
  .archive-success-page {
    padding-right: 24rpx;
    padding-left: 24rpx;
  }

  .footer-actions {
    right: 24rpx;
    left: 24rpx;
  }

  .hero-card {
    min-height: 268rpx;
    gap: 24rpx;
    padding: 24rpx 28rpx;
  }

  .hero-art {
    width: 170rpx;
    height: 176rpx;
    flex-basis: 170rpx;
  }

  .folder {
    left: 34rpx;
    width: 110rpx;
    height: 96rpx;
  }

  .paper {
    left: 28rpx;
    top: -40rpx;
    width: 90rpx;
    height: 74rpx;
  }

  .check-circle {
    left: 35rpx;
    width: 62rpx;
    height: 62rpx;
  }

  .check-circle::before {
    left: 18rpx;
    top: 20rpx;
    width: 28rpx;
    height: 15rpx;
    border-bottom-width: 8rpx;
    border-left-width: 8rpx;
  }

  .hero-title {
    font-size: 43rpx;
  }

  .hero-desc {
    margin-top: 20rpx;
    font-size: 29rpx;
  }

  .record-card,
  .next-card {
    margin-top: 30rpx;
    padding: 30rpx;
  }

  .record-row {
    gap: 26rpx;
  }

  .document-icon {
    width: 108rpx;
    height: 108rpx;
  }

  .record-title {
    font-size: 31rpx;
  }

  .record-meta,
  .record-desc {
    font-size: 27rpx;
  }

  .next-text {
    font-size: 29rpx;
  }
}

@media (max-width: 374px) {
  .archive-success-page {
    padding-right: 18rpx;
    padding-left: 18rpx;
  }

  .footer-actions {
    right: 18rpx;
    left: 18rpx;
    gap: 18rpx;
  }

  .hero-card {
    align-items: flex-start;
    gap: 16rpx;
    padding-right: 20rpx;
    padding-left: 20rpx;
  }

  .hero-art {
    width: 132rpx;
    flex-basis: 132rpx;
  }

  .hero-title {
    font-size: 38rpx;
  }

  .hero-desc {
    font-size: 26rpx;
  }

  .record-row {
    align-items: flex-start;
  }

  .document-icon {
    width: 86rpx;
    height: 86rpx;
  }

  .footer-button {
    height: 80rpx;
    font-size: 31rpx;
  }
}
</style>
