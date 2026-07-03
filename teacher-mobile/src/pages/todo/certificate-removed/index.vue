<script setup lang="ts">
import { computed } from 'vue'
import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobileNavbar from '../../../components/MobileNavbar.vue'
import MobilePageShell from '../../../components/MobilePageShell.vue'
import { getTodoState } from '../../../stores/todoStore'

const todoState = getTodoState()
const certificate = computed(() => todoState.certificate)

function goBack() {
  uni.navigateBack()
}

function goTodo() {
  uni.navigateTo({ url: '/pages/todo/index' })
}

function goPendingList() {
  uni.navigateTo({ url: '/pages/todo/all/index' })
}
</script>

<template>
  <MobilePageShell class="removed-page" active="todo">
    <MobileNavbar title="已移出待确认" size="compact" @back="goBack" />

    <MobileCard class="hero-card">
      <view class="hero-art">
        <view class="halo"></view>
        <view class="doc-art">
          <view class="doc-line doc-line--one"></view>
          <view class="doc-line doc-line--two"></view>
        </view>
        <view class="minus-badge"></view>
        <view class="leaf leaf--one"></view>
        <view class="leaf leaf--two"></view>
      </view>
      <view class="hero-copy">
        <text class="hero-title">已移出待确认</text>
        <text class="hero-desc">这条记录已从你的待确认记录中移出，不会进入你的成长档案。</text>
      </view>
    </MobileCard>

    <MobileCard class="record-card">
      <view class="record-icon">
        <view class="record-paper"></view>
        <view class="record-ribbon"></view>
      </view>
      <view class="record-copy">
        <text class="record-title">{{ certificate.title }}</text>
        <view class="tag-row">
          <text class="tag tag--green">{{ certificate.category }}</text>
          <text class="tag tag--green">{{ certificate.type }}</text>
          <text class="tag tag--orange">原待确认</text>
        </view>
        <text class="record-source">来源：{{ certificate.source }}</text>
      </view>
    </MobileCard>

    <MobileCard class="note-card">
      <view class="section-head">
        <view class="info-icon"></view>
        <text class="section-title">后续说明</text>
      </view>
      <view class="note-list">
        <view class="note-row">
          <view class="dot"></view>
          <text>系统将不再把这条记录放入你的待确认记录中</text>
        </view>
        <view class="note-row">
          <view class="dot"></view>
          <text>如后续发现处理有误，可联系部门重新核验</text>
        </view>
      </view>
    </MobileCard>

    <view class="footer-actions">
      <MobileActionButton class="footer-button" variant="primary" @tap="goTodo">
        返回待办
      </MobileActionButton>
      <MobileActionButton class="footer-button" variant="outline" @tap="goPendingList">
        查看其他待确认记录
      </MobileActionButton>
    </view>
  </MobilePageShell>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.removed-page {
  min-height: 100vh;
  padding: calc(var(--status-bar-height) + 4rpx) 34rpx calc(180rpx + env(safe-area-inset-bottom));
  overflow-x: hidden;
  background:
    radial-gradient(circle at 14% 2%, rgba(227, 252, 240, 0.72), transparent 31%),
    radial-gradient(circle at 88% 3%, rgba(232, 250, 242, 0.68), transparent 28%),
    linear-gradient(180deg, #ffffff 0%, #fbfefd 46%, #f6fbf8 100%);
  color: #10172d;
}

.hero-card,
.record-card,
.note-card {
  border-radius: 28rpx;
  box-shadow: 0 22rpx 56rpx rgba(35, 51, 87, 0.07);
}

.hero-card {
  position: relative;
  display: flex;
  min-height: 340rpx;
  align-items: center;
  gap: 42rpx;
  margin-top: 34rpx;
  padding: 38rpx 48rpx;
  overflow: hidden;
  background: linear-gradient(105deg, #f0fff7 0%, #ffffff 100%);
}

.hero-art,
.halo,
.doc-art,
.minus-badge,
.leaf,
.record-icon,
.record-paper,
.record-ribbon,
.info-icon,
.dot {
  position: relative;
  flex: 0 0 auto;
}

.hero-art {
  width: 230rpx;
  height: 210rpx;
}

.halo {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(186, 248, 218, 0.86), rgba(230, 255, 241, 0.2) 70%);
}

.doc-art {
  position: absolute;
  left: 72rpx;
  top: 42rpx;
  width: 94rpx;
  height: 116rpx;
  border: 16rpx solid #41d58d;
  border-radius: 16rpx;
  background: rgba(255, 255, 255, 0.72);
  box-shadow: 0 16rpx 34rpx rgba(14, 183, 94, 0.18);
}

.doc-art::before,
.doc-line,
.minus-badge::before,
.record-paper::before,
.record-paper::after,
.record-ribbon::before,
.info-icon::before,
.info-icon::after,
.dot::before,
.leaf::before {
  position: absolute;
  content: '';
}

.doc-art::before {
  right: -16rpx;
  top: -16rpx;
  border-top: 38rpx solid #41d58d;
  border-left: 38rpx solid transparent;
}

.doc-line {
  left: 18rpx;
  width: 44rpx;
  height: 10rpx;
  border-radius: 10rpx;
  background: #73ddb0;
}

.doc-line--one {
  top: 38rpx;
}

.doc-line--two {
  top: 72rpx;
  width: 34rpx;
}

.minus-badge {
  position: absolute;
  right: 34rpx;
  bottom: 28rpx;
  width: 76rpx;
  height: 76rpx;
  border-radius: 50%;
  background: linear-gradient(135deg, #20cf7b, #06a853);
  box-shadow: 0 12rpx 30rpx rgba(10, 169, 83, 0.26);
}

.minus-badge::before {
  top: 35rpx;
  left: 20rpx;
  width: 36rpx;
  height: 8rpx;
  border-radius: 8rpx;
  background: #fff;
}

.leaf {
  position: absolute;
  right: -10rpx;
  bottom: -10rpx;
  width: 68rpx;
  height: 40rpx;
  border-radius: 100% 0 100% 0;
  background: rgba(33, 197, 114, 0.12);
}

.leaf--two {
  right: 54rpx;
  bottom: 4rpx;
  width: 42rpx;
  height: 30rpx;
  transform: rotate(18deg);
}

.hero-copy {
  min-width: 0;
  flex: 1;
}

.hero-title {
  display: block;
  color: #10172d;
  font-size: 50rpx;
  font-weight: 900;
  line-height: 1.1;
}

.hero-desc {
  display: block;
  margin-top: 34rpx;
  color: #40516f;
  font-size: 32rpx;
  line-height: 1.62;
}

.record-card {
  display: flex;
  align-items: center;
  gap: 34rpx;
  margin-top: 34rpx;
  padding: 38rpx 38rpx;
  background: #fff;
}

.record-icon {
  width: 112rpx;
  height: 112rpx;
  border-radius: 26rpx;
  background: #eafbf1;
}

.record-paper {
  position: absolute;
  left: 26rpx;
  top: 30rpx;
  width: 54rpx;
  height: 46rpx;
  border: 9rpx solid #10b960;
  border-radius: 7rpx;
}

.record-paper::before,
.record-paper::after {
  left: 12rpx;
  width: 28rpx;
  height: 7rpx;
  border-radius: 7rpx;
  background: #10b960;
}

.record-paper::before {
  top: 12rpx;
}

.record-paper::after {
  top: 30rpx;
  width: 22rpx;
}

.record-ribbon {
  position: absolute;
  right: 20rpx;
  bottom: 22rpx;
  width: 34rpx;
  height: 34rpx;
  border: 7rpx solid #31cf83;
  border-radius: 50%;
}

.record-ribbon::before {
  left: 6rpx;
  bottom: -16rpx;
  width: 24rpx;
  height: 24rpx;
  background: #31cf83;
  clip-path: polygon(0 0, 50% 42%, 100% 0, 78% 100%, 50% 70%, 22% 100%);
}

.record-copy {
  min-width: 0;
  flex: 1;
}

.record-title {
  display: block;
  color: #10172d;
  font-size: 35rpx;
  font-weight: 900;
  line-height: 1.35;
}

.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 18rpx;
  margin-top: 28rpx;
}

.tag {
  padding: 10rpx 18rpx;
  border-radius: 12rpx;
  font-size: 27rpx;
  font-weight: 800;
  line-height: 1;
}

.tag--green {
  background: #e7fbef;
  color: #11ad62;
}

.tag--orange {
  background: #fff1df;
  color: #ff8a00;
}

.record-source {
  display: block;
  margin-top: 34rpx;
  color: #435270;
  font-size: 30rpx;
  line-height: 1.35;
}

.note-card {
  margin-top: 34rpx;
  padding: 40rpx 38rpx;
  background: #fff;
}

.section-head {
  display: flex;
  align-items: center;
  gap: 18rpx;
}

.section-title {
  color: #10172d;
  font-size: 40rpx;
  font-weight: 900;
  line-height: 1.2;
}

.info-icon {
  width: 50rpx;
  height: 50rpx;
  border-radius: 50%;
  background: #10b960;
}

.info-icon::before {
  left: 22rpx;
  top: 20rpx;
  width: 7rpx;
  height: 20rpx;
  border-radius: 7rpx;
  background: #fff;
}

.info-icon::after {
  left: 22rpx;
  top: 11rpx;
  width: 7rpx;
  height: 7rpx;
  border-radius: 50%;
  background: #fff;
}

.note-list {
  display: flex;
  flex-direction: column;
  gap: 30rpx;
  margin-top: 44rpx;
}

.note-row {
  display: flex;
  align-items: flex-start;
  gap: 24rpx;
  color: #40516f;
  font-size: 31rpx;
  line-height: 1.45;
}

.dot {
  width: 16rpx;
  height: 16rpx;
  margin-top: 16rpx;
  border-radius: 50%;
  background: #10b960;
}

.footer-actions {
  display: flex;
  flex-direction: column;
  gap: 28rpx;
  margin-top: 72rpx;
}

.footer-button {
  width: 100%;
  height: 88rpx;
  border-radius: 18rpx;
  font-size: 34rpx;
}

@media (max-width: 430px) {
  .removed-page {
    padding-right: 24rpx;
    padding-left: 24rpx;
  }

  .hero-card {
    gap: 28rpx;
    min-height: 290rpx;
    padding: 30rpx 34rpx;
  }

  .hero-art {
    width: 190rpx;
    height: 184rpx;
  }

  .doc-art {
    left: 56rpx;
    top: 38rpx;
    width: 76rpx;
    height: 94rpx;
    border-width: 13rpx;
  }

  .minus-badge {
    right: 26rpx;
    bottom: 24rpx;
    width: 62rpx;
    height: 62rpx;
  }

  .minus-badge::before {
    top: 28rpx;
    left: 16rpx;
    width: 30rpx;
  }

  .hero-title {
    font-size: 43rpx;
  }

  .hero-desc {
    margin-top: 24rpx;
    font-size: 29rpx;
  }

  .record-card {
    gap: 26rpx;
    padding: 32rpx;
  }

  .record-title {
    font-size: 31rpx;
  }

  .record-source {
    font-size: 28rpx;
  }

  .section-title {
    font-size: 36rpx;
  }

  .note-row {
    font-size: 29rpx;
  }

  .footer-actions {
    margin-top: 60rpx;
  }
}

@media (max-width: 374px) {
  .removed-page {
    padding-right: 18rpx;
    padding-left: 18rpx;
  }

  .hero-card {
    gap: 18rpx;
    padding-right: 24rpx;
    padding-left: 24rpx;
  }

  .hero-art {
    width: 148rpx;
    height: 160rpx;
  }

  .doc-art {
    left: 42rpx;
    width: 62rpx;
    height: 78rpx;
  }

  .hero-title {
    font-size: 38rpx;
  }

  .hero-desc {
    font-size: 26rpx;
  }

  .record-icon {
    width: 92rpx;
    height: 92rpx;
  }

  .tag {
    font-size: 24rpx;
  }

  .footer-button {
    height: 80rpx;
    font-size: 31rpx;
  }
}
</style>
