<script setup lang="ts">
import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobilePageShell from '../../../components/MobilePageShell.vue'
import { createArchiveSupplementRecord } from '../../../domain/archive'

const archiveTypes = ['培训证书', '企业实践证明', '教研活动记录']
const materialItems = [
  { title: '材料来源', value: '教师本人补充' },
  { title: '入档状态', value: '提交后待核验' },
  { title: '关联分类', value: '个人发展 / 企业实践' },
]

function submitSupplement() {
  const record = createArchiveSupplementRecord()
  uni.redirectTo({ url: `/pages/assistant/archive-supplement-submitted/index?recordId=${record.id}` })
}
</script>

<template>
  <MobilePageShell class="supplement-page" active="assistant">
    <view class="page-head">
      <text class="page-head__eyebrow">AI 助手</text>
      <text class="page-head__title">补充档案</text>
      <text class="page-head__desc">补充材料会先进入待核验，不会直接写入正式成长档案。</text>
    </view>

    <MobileCard class="guide-card">
      <text class="guide-card__title">建议补充的材料</text>
      <view class="type-list">
        <view v-for="item in archiveTypes" :key="item" class="type-chip">
          <text>{{ item }}</text>
        </view>
      </view>
    </MobileCard>

    <MobileCard class="form-card">
      <view class="field-group">
        <text class="field-label">补充说明</text>
        <view class="field-box">
          <text>用于说明材料来源、对应活动和需要更正或补充的档案事实。</text>
        </view>
      </view>

      <view class="field-group">
        <text class="field-label">材料信息</text>
        <view v-for="item in materialItems" :key="item.title" class="info-row">
          <text>{{ item.title }}</text>
          <text>{{ item.value }}</text>
        </view>
      </view>
    </MobileCard>

    <MobileCard class="notice-card">
      <text class="notice-card__title">提交后的状态</text>
      <text class="notice-card__desc">系统会生成一条待核验记录，后续可从待办或档案记录中查看处理进度。</text>
    </MobileCard>

    <MobileActionButton class="submit-button" variant="primary" @tap="submitSupplement">
      提交补充
    </MobileActionButton>
  </MobilePageShell>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.supplement-page {
  --supplement-ink: #121f31;
  padding-bottom: calc(170rpx + env(safe-area-inset-bottom));
}

.page-head {
  display: grid;
  gap: 12rpx;
  margin-bottom: 24rpx;
}

.page-head__eyebrow {
  color: $teacher-mobile-primary-dark;
  font-size: 24rpx;
  font-weight: 900;
}

.page-head__title {
  color: var(--supplement-ink);
  font-size: 44rpx;
  font-weight: 900;
  line-height: 1.1;
}

.page-head__desc {
  color: $teacher-mobile-text-secondary;
  font-size: 26rpx;
  line-height: 1.5;
}

.guide-card,
.form-card,
.notice-card {
  padding: 30rpx;
}

.form-card,
.notice-card {
  margin-top: 20rpx;
}

.guide-card__title,
.notice-card__title,
.field-label {
  color: var(--supplement-ink);
  font-size: 34rpx;
  font-weight: 900;
}

.type-list {
  display: flex;
  flex-wrap: wrap;
  gap: 14rpx;
  margin-top: 20rpx;
}

.type-chip {
  padding: 14rpx 18rpx;
  border: 1rpx solid rgba(14, 193, 101, 0.24);
  border-radius: 999rpx;
  background: rgba(235, 255, 245, 0.9);
  color: $teacher-mobile-primary-dark;
  font-size: 24rpx;
  font-weight: 900;
}

.field-group + .field-group {
  margin-top: 28rpx;
}

.field-box {
  margin-top: 14rpx;
  padding: 22rpx;
  border: 1rpx solid $teacher-mobile-card-border;
  border-radius: 22rpx;
  background: #f8fbff;
  color: $teacher-mobile-text-secondary;
  font-size: 25rpx;
  line-height: 1.5;
}

.info-row {
  display: flex;
  min-height: 58rpx;
  align-items: center;
  justify-content: space-between;
  gap: 20rpx;
  border-bottom: 1rpx solid rgba(226, 234, 245, 0.8);
  color: $teacher-mobile-text-secondary;
  font-size: 25rpx;
}

.info-row text:last-child {
  color: var(--supplement-ink);
  font-weight: 900;
  text-align: right;
}

.notice-card {
  background: linear-gradient(135deg, rgba(255, 248, 238, 0.96), #fff);
}

.notice-card__desc {
  display: block;
  margin-top: 12rpx;
  color: $teacher-mobile-text-secondary;
  font-size: 25rpx;
  line-height: 1.5;
}

.submit-button {
  width: 100%;
  height: 88rpx;
  margin-top: 28rpx;
  font-size: 28rpx;
}
</style>
