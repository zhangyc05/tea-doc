<script setup lang="ts">
import { computed, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobileNavbar from '../../../components/MobileNavbar.vue'
import { findArchiveRecordById } from '../../../domain/archive'

type ArchiveResultQuery = {
  recordId?: string
}

const query = ref<ArchiveResultQuery>({})

onLoad((options) => {
  query.value = options as ArchiveResultQuery
})

const archiveRecord = computed(() => findArchiveRecordById(query.value.recordId) || findArchiveRecordById('training-digital-teaching-archive'))

const submittedItems = [
  { icon: 'doc', label: '培训信息', value: '数字化教学能力提升 | 线上课程 | 12 学时' },
  { icon: 'chat', label: '学习心得', value: '已记录 2 条' },
  { icon: 'ai', label: 'AI 培训总结', value: '已确认' },
  { icon: 'card', label: '结业材料情况', value: '本次培训不发证书' },
  { icon: 'image', label: '补充材料（可选）', value: '学习截图 1 张' },
]

function goBack() {
  uni.navigateBack()
}

function goTraining() {
  uni.navigateTo({ url: '/pages/activity/training/index' })
}

function goHome() {
  uni.switchTab?.({ url: '/pages/activity/index' })
  uni.redirectTo({ url: '/pages/activity/index' })
}

function goArchiveRecord() {
  uni.navigateTo({
    url: `/pages/archive/record-detail/index?recordId=${archiveRecord.value?.id || query.value.recordId || 'training-digital-teaching-archive'}`,
  })
}

function goArchivePendingList() {
  uni.navigateTo({ url: '/pages/archive/draft-list/index' })
}
</script>

<template>
  <view class="archive-result-page">
    <view class="page-head">
      <MobileNavbar title="归档提交结果" size="compact" @back="goBack" />
    </view>

    <view class="content">
      <MobileCard class="hero-card">
        <view class="hero-main">
          <view class="success-mark"></view>
          <view class="hero-copy">
            <text class="hero-title">培训材料已提交</text>
            <text class="hero-state">正在等待归档确认</text>
          </view>
          <view class="hero-art">
            <view class="file-stack file-stack--back"></view>
            <view class="file-stack">
              <view class="file-stack__line file-stack__line--strong"></view>
              <view class="file-stack__line"></view>
              <view class="file-stack__line file-stack__line--short"></view>
            </view>
            <view class="upload-dot"></view>
          </view>
        </view>
        <view class="hero-desc">
          <text>你的“{{ archiveRecord?.title || '数字化教学能力提升' }}”培训总结和结业材料已提交。</text>
          <text>系统确认后，将沉淀到成长档案「{{ archiveRecord?.categoryName || '个人发展' }}」维度。</text>
        </view>
        <view class="info-tip">
          <view class="info-tip__icon">i</view>
          <text>本次培训已选择“不发证书”，系统将使用学习记录、培训总结和补充材料作为过程记录。</text>
        </view>
      </MobileCard>

      <MobileCard class="submitted-card">
        <text class="section-title">已提交内容</text>
        <view class="submitted-list">
          <view v-for="item in submittedItems" :key="item.label" class="submitted-row">
            <view class="item-icon" :class="`item-icon--${item.icon}`"></view>
            <text class="submitted-row__label">{{ item.label }}</text>
            <text class="submitted-row__value">{{ item.value }}</text>
            <view class="row-check"></view>
          </view>
        </view>
      </MobileCard>

      <MobileCard class="progress-card">
        <text class="section-title">当前进度</text>
        <view class="progress-steps">
          <view class="progress-line progress-line--done"></view>
          <view class="progress-line progress-line--pending"></view>
          <view class="progress-step progress-step--done">
            <view class="progress-dot"></view>
            <text class="progress-title">材料已提交</text>
            <text class="progress-desc">2026-05-21 09:41</text>
          </view>
          <view class="progress-step progress-step--active">
            <view class="progress-dot"></view>
            <text class="progress-title">归档确认中</text>
            <text class="progress-desc">等待部门或系统确认</text>
          </view>
          <view class="progress-step">
            <view class="progress-dot"></view>
            <text class="progress-title">进入成长档案</text>
            <text class="progress-desc">确认后自动入档</text>
          </view>
        </view>
        <view class="warning-tip">
          <view class="warning-tip__icon"></view>
          <view>
            <text>确认结果会通过系统消息提醒你。</text>
            <text>确认前，这条记录暂不作为正式依据引用。</text>
          </view>
        </view>
      </MobileCard>

      <view class="page-actions">
        <MobileActionButton class="primary-action" variant="primary" @tap="goTraining">返回培训进修</MobileActionButton>
        <MobileActionButton class="outline-action" variant="outline" @tap="goArchiveRecord">查看提交内容</MobileActionButton>
        <MobileActionButton class="outline-action" variant="outline" @tap="goArchivePendingList">查看档案待确认</MobileActionButton>
        <button class="home-link" @tap="goHome">返回活动首页</button>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.archive-result-page {
  min-height: 100vh;
  padding-bottom: calc(52rpx + env(safe-area-inset-bottom));
  background:
    radial-gradient(circle at 16% 4%, rgba(222, 252, 237, 0.58), transparent 32%),
    linear-gradient(180deg, #fbfffd 0%, #f8fbff 48%, #f6f9ff 100%);
  color: $teacher-mobile-text-primary;
}

.page-head {
  padding: calc(var(--status-bar-height) + 16rpx) 28rpx 26rpx;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 28rpx;
  padding: 0 28rpx;
}

.hero-card,
.submitted-card,
.progress-card {
  padding: 28rpx;
}

.hero-card {
  overflow: hidden;
  background:
    radial-gradient(circle at 82% 30%, rgba(19, 191, 103, 0.16), transparent 38%),
    linear-gradient(135deg, rgba(247, 255, 250, 0.98), rgba(255, 255, 255, 0.95));
}

.hero-main,
.submitted-row,
.progress-steps,
.page-actions,
.outline-action {
  display: flex;
  align-items: center;
}

.hero-main {
  position: relative;
  min-height: 190rpx;
  gap: 18rpx;
}

.success-mark {
  position: relative;
  width: 84rpx;
  height: 84rpx;
  flex: 0 0 auto;
  border-radius: 50%;
  background: linear-gradient(135deg, #20ce72, #0aa956);
  box-shadow: 0 18rpx 36rpx rgba(7, 178, 86, 0.24);
}

.success-mark::before {
  position: absolute;
  top: 31rpx;
  left: 24rpx;
  width: 32rpx;
  height: 18rpx;
  border-bottom: 9rpx solid #fff;
  border-left: 9rpx solid #fff;
  content: '';
  transform: rotate(-45deg);
}

.hero-copy {
  position: relative;
  z-index: 1;
  min-width: 0;
  flex: 1;
}

.hero-title,
.hero-state,
.section-title,
.submitted-row__label,
.submitted-row__value,
.progress-title,
.progress-desc,
.hero-desc text,
.info-tip text,
.warning-tip text {
  display: block;
}

.hero-title {
  color: #10172d;
  font-size: 42rpx;
  font-weight: 900;
  line-height: 1.18;
}

.hero-state {
  margin-top: 12rpx;
  color: $teacher-mobile-primary-dark;
  font-size: 38rpx;
  font-weight: 900;
  line-height: 1.2;
}

.hero-art {
  position: relative;
  width: 150rpx;
  height: 152rpx;
  flex: 0 0 auto;
}

.file-stack {
  position: absolute;
  right: 8rpx;
  bottom: 14rpx;
  width: 120rpx;
  height: 114rpx;
  border-radius: 12rpx;
  background: rgba(244, 255, 248, 0.94);
  box-shadow: 0 18rpx 34rpx rgba(31, 129, 84, 0.12);
}

.file-stack--back {
  top: 8rpx;
  right: 0;
  background: rgba(80, 214, 143, 0.42);
  transform: rotate(4deg);
}

.file-stack__line {
  width: 70rpx;
  height: 11rpx;
  margin: 18rpx 0 0 22rpx;
  border-radius: 8rpx;
  background: rgba(14, 193, 101, 0.28);
}

.file-stack__line--strong {
  width: 64rpx;
  background: $teacher-mobile-primary;
}

.file-stack__line--short {
  width: 56rpx;
}

.upload-dot {
  position: absolute;
  right: -2rpx;
  bottom: 0;
  width: 70rpx;
  height: 70rpx;
  border-radius: 50%;
  background: linear-gradient(135deg, #20ce72, #08a950);
  box-shadow: 0 14rpx 26rpx rgba(6, 175, 84, 0.24);
}

.upload-dot::before {
  position: absolute;
  top: 21rpx;
  left: 25rpx;
  width: 18rpx;
  height: 28rpx;
  border-top: 8rpx solid #fff;
  border-left: 8rpx solid #fff;
  content: '';
  transform: rotate(45deg);
}

.upload-dot::after {
  position: absolute;
  top: 31rpx;
  left: 31rpx;
  width: 8rpx;
  height: 24rpx;
  border-radius: 8rpx;
  background: #fff;
  content: '';
}

.hero-desc {
  margin-top: 18rpx;
  color: #1e2942;
  font-size: 28rpx;
  font-weight: 500;
  line-height: 1.62;
}

.info-tip {
  display: flex;
  gap: 18rpx;
  margin-top: 32rpx;
  padding: 22rpx;
  border: 1rpx solid rgba(14, 193, 101, 0.36);
  border-radius: 14rpx;
  background: rgba(255, 255, 255, 0.76);
  color: #18233b;
  font-size: 27rpx;
  line-height: 1.55;
}

.info-tip__icon {
  display: flex;
  width: 30rpx;
  height: 30rpx;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  border: 4rpx solid $teacher-mobile-primary;
  border-radius: 50%;
  color: $teacher-mobile-primary-dark;
  font-size: 20rpx;
  font-weight: 900;
  line-height: 1;
}

.section-title {
  color: #10172d;
  font-size: 34rpx;
  font-weight: 900;
  line-height: 1.2;
}

.submitted-list {
  margin-top: 28rpx;
}

.submitted-row {
  min-height: 74rpx;
  gap: 20rpx;
}

.submitted-row + .submitted-row {
  margin-top: 22rpx;
}

.item-icon {
  position: relative;
  width: 50rpx;
  height: 50rpx;
  flex: 0 0 auto;
  border-radius: 12rpx;
  background: #e9fbf1;
  color: $teacher-mobile-primary;
}

.item-icon::before {
  position: absolute;
  content: '';
}

.item-icon--doc::before {
  top: 12rpx;
  left: 15rpx;
  width: 22rpx;
  height: 26rpx;
  border-radius: 3rpx;
  background: currentColor;
  box-shadow: 8rpx -8rpx 0 -5rpx #e9fbf1;
}

.item-icon--chat::before {
  top: 14rpx;
  left: 12rpx;
  width: 27rpx;
  height: 20rpx;
  border-radius: 6rpx;
  background: currentColor;
}

.item-icon--ai::before {
  top: 10rpx;
  left: 10rpx;
  width: 30rpx;
  height: 30rpx;
  border-radius: 50%;
  background: currentColor;
}

.item-icon--ai::after {
  position: absolute;
  top: 17rpx;
  left: 15rpx;
  color: #fff;
  font-size: 14rpx;
  font-weight: 900;
  content: 'AI';
}

.item-icon--card::before {
  top: 15rpx;
  left: 10rpx;
  width: 30rpx;
  height: 22rpx;
  border: 4rpx solid currentColor;
  border-radius: 5rpx;
}

.item-icon--image::before {
  top: 13rpx;
  left: 12rpx;
  width: 26rpx;
  height: 24rpx;
  border-radius: 5rpx;
  background: currentColor;
}

.submitted-row__label {
  width: 210rpx;
  flex: 0 0 auto;
  color: #10172d;
  font-size: 28rpx;
  font-weight: 700;
  line-height: 1.35;
}

.submitted-row__value {
  min-width: 0;
  flex: 1;
  color: #17233c;
  font-size: 27rpx;
  line-height: 1.35;
  text-align: right;
}

.row-check {
  position: relative;
  width: 28rpx;
  height: 28rpx;
  flex: 0 0 auto;
  border-radius: 50%;
  background: $teacher-mobile-primary;
}

.row-check::before {
  position: absolute;
  top: 9rpx;
  left: 8rpx;
  width: 12rpx;
  height: 7rpx;
  border-bottom: 4rpx solid #fff;
  border-left: 4rpx solid #fff;
  content: '';
  transform: rotate(-45deg);
}

.progress-steps {
  position: relative;
  justify-content: space-between;
  margin-top: 34rpx;
  padding-top: 10rpx;
}

.progress-line {
  position: absolute;
  top: 35rpx;
  height: 4rpx;
  border-radius: 4rpx;
}

.progress-line--done {
  left: 16%;
  width: 35%;
  background: $teacher-mobile-primary;
}

.progress-line--pending {
  left: 51%;
  width: 34%;
  background: #d7dde8;
}

.progress-step {
  position: relative;
  z-index: 1;
  width: 31%;
  min-width: 0;
  text-align: center;
}

.progress-dot {
  position: relative;
  width: 44rpx;
  height: 44rpx;
  margin: 0 auto;
  border: 6rpx solid #d7dde8;
  border-radius: 50%;
  background: #fff;
}

.progress-step--done .progress-dot,
.progress-step--active .progress-dot {
  border-color: $teacher-mobile-primary;
}

.progress-step--done .progress-dot {
  background: $teacher-mobile-primary;
}

.progress-step--done .progress-dot::before {
  position: absolute;
  top: 12rpx;
  left: 10rpx;
  width: 16rpx;
  height: 9rpx;
  border-bottom: 5rpx solid #fff;
  border-left: 5rpx solid #fff;
  content: '';
  transform: rotate(-45deg);
}

.progress-step--active .progress-dot::before {
  position: absolute;
  inset: 7rpx;
  border-radius: 50%;
  background: $teacher-mobile-primary;
  content: '';
}

.progress-title {
  margin-top: 26rpx;
  color: #17233c;
  font-size: 28rpx;
  font-weight: 900;
  line-height: 1.35;
}

.progress-step--active .progress-title {
  color: $teacher-mobile-primary-dark;
}

.progress-desc {
  margin-top: 12rpx;
  color: #72809a;
  font-size: 25rpx;
  line-height: 1.35;
}

.warning-tip {
  display: flex;
  gap: 20rpx;
  margin-top: 34rpx;
  padding: 20rpx 22rpx;
  border: 1rpx solid rgba(246, 184, 64, 0.52);
  border-radius: 12rpx;
  background: #fffbf3;
  color: #17233c;
  font-size: 27rpx;
  font-weight: 700;
  line-height: 1.5;
}

.warning-tip__icon {
  position: relative;
  width: 32rpx;
  height: 32rpx;
  flex: 0 0 auto;
  border-radius: 8rpx;
  background: #f6b840;
}

.warning-tip__icon::before {
  position: absolute;
  top: 7rpx;
  left: 8rpx;
  width: 16rpx;
  height: 14rpx;
  border-radius: 3rpx;
  background: #fff;
  content: '';
}

.page-actions {
  flex-direction: column;
  gap: 18rpx;
  padding: 0 2rpx;
}

.primary-action,
.outline-action {
  width: 100%;
  height: 68rpx;
  font-size: 30rpx;
}

.outline-action {
  gap: 14rpx;
}

.outline-action::before {
  position: relative;
  width: 30rpx;
  height: 34rpx;
  border-radius: 4rpx;
  background: currentColor;
  box-shadow: inset 0 -7rpx 0 rgba(255, 255, 255, 0.28);
  color: $teacher-mobile-primary;
  content: '';
}

.home-link {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 8rpx 0 0;
  padding: 0;
  border: 0;
  background: transparent;
  color: #6d7891;
  font-size: 28rpx;
  font-weight: 700;
}

.home-link::after {
  display: none;
}

.home-link::before {
  order: 2;
  width: 14rpx;
  height: 14rpx;
  margin-left: 16rpx;
  border-top: 4rpx solid currentColor;
  border-right: 4rpx solid currentColor;
  content: '';
  transform: rotate(45deg);
}

@media (max-width: 374px) {
  .page-head,
  .content {
    padding-right: 22rpx;
    padding-left: 22rpx;
  }

  .hero-card,
  .submitted-card,
  .progress-card {
    padding: 24rpx;
  }

  .hero-main {
    gap: 18rpx;
  }

  .success-mark {
    width: 76rpx;
    height: 76rpx;
  }

  .success-mark::before {
    top: 28rpx;
    left: 21rpx;
    width: 31rpx;
    height: 17rpx;
  }

  .hero-title {
    font-size: 40rpx;
  }

  .hero-state {
    font-size: 34rpx;
  }

  .hero-art {
    width: 138rpx;
    height: 130rpx;
  }

  .submitted-row {
    gap: 14rpx;
  }

  .submitted-row__label {
    width: 190rpx;
    font-size: 26rpx;
  }

  .submitted-row__value {
    font-size: 25rpx;
  }

  .progress-title {
    font-size: 25rpx;
  }

  .progress-desc {
    font-size: 23rpx;
  }
}
</style>
