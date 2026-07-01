<script setup lang="ts">
import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobileNavbar from '../../../components/MobileNavbar.vue'
import MobileTabBar from '../../../components/MobileTabBar.vue'

function goBack() {
  uni.navigateBack()
}

function goActivityHome() {
  uni.reLaunch({ url: '/pages/activity/index' })
}
</script>

<template>
  <view class="reflection-success-page">
    <view class="hero">
      <MobileNavbar title="教学反思" size="compact" @back="goBack" />
      <text class="hero__subtitle">本次教学反思已确认并保存</text>
    </view>

    <view class="content">
      <MobileCard class="success-card">
        <view class="check-orb">
          <view class="check-mark"></view>
        </view>
        <view class="success-copy">
          <text class="success-title">教学反思已确认</text>
          <text class="success-desc">这篇反思已保存为你的教学反思记录</text>
          <view class="success-pill">
            <view class="small-check"></view>
            <text>已完成本次整理</text>
          </view>
        </view>
      </MobileCard>

      <MobileCard class="summary-card">
        <view class="card-head">
          <view class="head-icon head-icon--clipboard"></view>
          <text class="card-title">反思摘要</text>
        </view>
        <text class="summary-title">《智能制造基础》第 5 次课</text>
        <text class="summary-line">智能制造 2301 班｜2026-03-18</text>
        <text class="summary-line">已使用 2 份依据：课堂分析报告、课堂录音</text>
        <text class="summary-line">已生成反思报告草稿：课堂整体情况、主要发现、原因分析、改进建议、后续观察点</text>
      </MobileCard>

      <MobileCard class="next-card">
        <view class="card-head">
          <view class="head-icon head-icon--sprout"></view>
          <text class="card-title">后续去向</text>
        </view>
        <text class="next-desc">该反思已保存为活动记录，可继续沉淀到成长档案「教学工作」维度，用于记录你的教学改进过程。</text>
        <view class="tip-box">
          <view class="info-icon">i</view>
          <text>后续如需补充内容，你仍可继续完善这篇反思。</text>
        </view>
      </MobileCard>

      <MobileCard class="actions-card">
        <view class="card-head">
          <view class="head-icon head-icon--spark"></view>
          <text class="card-title">你还可以</text>
        </view>
        <view class="action-list">
          <MobileActionButton class="action-button" variant="outline">查看反思详情</MobileActionButton>
          <MobileActionButton class="action-button action-button--muted" variant="outline">再做一篇反思</MobileActionButton>
          <MobileActionButton class="action-button action-button--primary" variant="primary" @tap="goActivityHome">返回活动首页</MobileActionButton>
        </view>
      </MobileCard>
    </view>

    <MobileTabBar active="activity" />
  </view>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.reflection-success-page {
  min-height: 100vh;
  padding-bottom: calc(150rpx + env(safe-area-inset-bottom));
  background: linear-gradient(180deg, #ffffff 0%, #f8fbff 46%, #f5f9ff 100%);
  color: $teacher-mobile-text-primary;
}

.hero {
  padding: calc(var(--status-bar-height) + 14rpx) 28rpx 28rpx;
}

.hero__subtitle {
  display: block;
  margin-top: 8rpx;
  color: #53617b;
  font-size: 27rpx;
  line-height: 1.45;
  text-align: center;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  padding: 0 28rpx;
}

.success-card,
.summary-card,
.next-card,
.actions-card {
  padding: 32rpx;
}

.success-card,
.card-head,
.success-pill,
.tip-box {
  display: flex;
  align-items: center;
}

.success-card {
  gap: 42rpx;
  min-height: 250rpx;
  border-color: rgba(14, 193, 101, 0.18);
  background: linear-gradient(135deg, #f4fff9 0%, #ffffff 100%);
}

.check-orb {
  position: relative;
  width: 142rpx;
  height: 142rpx;
  flex: 0 0 auto;
  border-radius: 50%;
  background: radial-gradient(circle at 32% 24%, #5cf289, #00b95f 72%);
  box-shadow: 0 26rpx 38rpx rgba(0, 185, 95, 0.22);
}

.check-mark {
  position: absolute;
  left: 38rpx;
  top: 45rpx;
  width: 62rpx;
  height: 36rpx;
  border-left: 14rpx solid #fff;
  border-bottom: 14rpx solid #fff;
  border-radius: 4rpx;
  transform: rotate(-45deg);
}

.success-copy {
  min-width: 0;
  flex: 1;
}

.success-title,
.success-desc,
.summary-title,
.summary-line,
.next-desc {
  display: block;
}

.success-title {
  color: #10172d;
  font-size: 42rpx;
  font-weight: 900;
  line-height: 1.25;
}

.success-desc {
  margin-top: 20rpx;
  color: #263b67;
  font-size: 29rpx;
  line-height: 1.45;
}

.success-pill {
  width: fit-content;
  gap: 12rpx;
  margin-top: 24rpx;
  padding: 12rpx 20rpx;
  border: 1rpx solid rgba(14, 193, 101, 0.24);
  border-radius: 12rpx;
  background: #eafbf2;
  color: $teacher-mobile-primary-dark;
  font-size: 26rpx;
  font-weight: 800;
}

.small-check {
  position: relative;
  width: 28rpx;
  height: 28rpx;
  border: 3rpx solid currentColor;
  border-radius: 50%;
}

.small-check::before {
  position: absolute;
  top: 8rpx;
  left: 7rpx;
  width: 11rpx;
  height: 6rpx;
  border-left: 3rpx solid currentColor;
  border-bottom: 3rpx solid currentColor;
  content: '';
  transform: rotate(-45deg);
}

.card-head {
  gap: 18rpx;
}

.head-icon {
  position: relative;
  width: 48rpx;
  height: 48rpx;
  flex: 0 0 auto;
  border: 2rpx solid rgba(14, 193, 101, 0.22);
  border-radius: 12rpx;
  background: #eafbf2;
  color: $teacher-mobile-primary-dark;
}

.head-icon--clipboard::before,
.head-icon--sprout::before,
.head-icon--spark::before {
  position: absolute;
  content: '';
}

.head-icon--clipboard::before {
  inset: 12rpx 14rpx 10rpx;
  border: 4rpx solid currentColor;
  border-radius: 4rpx;
}

.head-icon--sprout::before {
  left: 21rpx;
  top: 12rpx;
  width: 8rpx;
  height: 26rpx;
  border-radius: 999rpx;
  background: currentColor;
  box-shadow: -9rpx 4rpx 0 3rpx #eafbf2, 9rpx 4rpx 0 3rpx #eafbf2;
}

.head-icon--spark::before {
  inset: 13rpx;
  border-radius: 50%;
  background: currentColor;
}

.card-title {
  color: #10172d;
  font-size: 36rpx;
  font-weight: 900;
}

.summary-title {
  margin-top: 28rpx;
  color: #10172d;
  font-size: 31rpx;
  font-weight: 900;
}

.summary-line,
.next-desc {
  margin-top: 22rpx;
  color: #263b67;
  font-size: 28rpx;
  line-height: 1.58;
}

.tip-box {
  gap: 14rpx;
  margin-top: 28rpx;
  padding: 16rpx 22rpx;
  border: 1rpx solid rgba(14, 193, 101, 0.18);
  border-radius: 12rpx;
  background: #f4fff9;
  color: #6b7280;
  font-size: 26rpx;
  line-height: 1.4;
}

.info-icon {
  display: flex;
  width: 28rpx;
  height: 28rpx;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  border: 2rpx solid #94a3b8;
  border-radius: 50%;
  color: #64748b;
  font-size: 20rpx;
  font-weight: 900;
}

.action-list {
  display: flex;
  flex-direction: column;
  gap: 18rpx;
  margin-top: 26rpx;
}

.action-button {
  width: 100%;
  height: 72rpx;
  border-radius: 12rpx;
  font-size: 30rpx;
}

.action-button--muted {
  color: #263247;
}

.action-button--primary {
  font-size: 31rpx;
}

@media (max-width: 374px) {
  .hero,
  .content {
    padding-right: 18rpx;
    padding-left: 18rpx;
  }

  .success-card,
  .summary-card,
  .next-card,
  .actions-card {
    padding: 24rpx;
  }

  .success-card {
    gap: 22rpx;
  }

  .check-orb {
    width: 104rpx;
    height: 104rpx;
  }

  .check-mark {
    left: 28rpx;
    top: 33rpx;
    width: 46rpx;
    height: 26rpx;
    border-width: 10rpx;
  }

  .success-title {
    font-size: 32rpx;
  }

  .success-desc,
  .summary-line,
  .next-desc {
    font-size: 25rpx;
  }

  .card-title {
    font-size: 31rpx;
  }
}
</style>
