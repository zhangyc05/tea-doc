<script setup lang="ts">
import { computed, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobileNavbar from '../../../components/MobileNavbar.vue'
import MobilePageShell from '../../../components/MobilePageShell.vue'
import MobileStatusTag from '../../../components/MobileStatusTag.vue'
import {
  findArchiveRecordById,
  getArchiveRecordStatusLabel,
  type MobileArchiveRecord,
} from '../../../domain/archive'

type BasicInfoQuery = {
  recordId?: string
}

const query = ref<BasicInfoQuery>({})
const defaultRecordId = 'basic-info-teacher-profile'

onLoad((options) => {
  query.value = options as BasicInfoQuery
})

const record = computed<MobileArchiveRecord>(() => {
  return findArchiveRecordById(query.value.recordId || defaultRecordId)
    || findArchiveRecordById(defaultRecordId) as MobileArchiveRecord
})

const profileFields = computed(() => record.value.fields.slice(0, 6))
const educationFields = computed(() => record.value.fields.filter((field) => ['最高学历', '毕业院校'].includes(field.label)))
const workFields = computed(() => record.value.fields.filter((field) => ['工作经历'].includes(field.label)))

function goBack() {
  uni.navigateBack()
}

function goSourceRecord() {
  uni.navigateTo({
    url: `/pages/archive/record-detail/index?recordId=${record.value.id}`,
  })
}

function requestCorrection() {
  uni.navigateTo({
    url: `/pages/archive/correction/apply/index?recordId=${record.value.id}`,
  })
}
</script>

<template>
  <MobilePageShell class="basic-info-detail-page" active="archive">
    <MobileNavbar title="基本信息详情" size="compact" @back="goBack" />

    <MobileCard class="hero-card">
      <view class="avatar-mark">林</view>
      <view class="hero-copy">
        <MobileStatusTag tone="green">{{ getArchiveRecordStatusLabel(record.status) }}</MobileStatusTag>
        <text class="hero-title">{{ record.title }}</text>
        <text class="hero-meta">{{ record.owner }} ｜ {{ record.updatedAt }}</text>
      </view>
    </MobileCard>

    <MobileCard class="section-card">
      <text class="section-title">档案摘要</text>
      <text class="summary-text">{{ record.summary }}</text>
      <view class="source-chip">
        <text class="source-label">管理端对象</text>
        <text class="source-value">{{ record.adminStoreRefs?.join('、') || 'teacherArchiveFacts' }}</text>
      </view>
    </MobileCard>

    <MobileCard class="section-card">
      <text class="section-title">任职信息</text>
      <view v-for="field in profileFields" :key="field.label" class="info-row">
        <text class="info-label">{{ field.label }}</text>
        <text class="info-value">{{ field.value }}</text>
      </view>
    </MobileCard>

    <MobileCard class="section-card">
      <text class="section-title">教育背景</text>
      <view v-for="field in educationFields" :key="field.label" class="info-row">
        <text class="info-label">{{ field.label }}</text>
        <text class="info-value">{{ field.value }}</text>
      </view>
    </MobileCard>

    <MobileCard class="section-card">
      <text class="section-title">工作经历</text>
      <view v-for="field in workFields" :key="field.label" class="experience-row">
        <text class="experience-title">{{ field.label }}</text>
        <text class="experience-desc">{{ field.value }}</text>
      </view>
    </MobileCard>

    <MobileCard class="section-card">
      <text class="section-title">来源追溯</text>
      <view v-for="(step, index) in record.sourceSteps" :key="step.title" class="source-step">
        <view class="source-index">{{ index + 1 }}</view>
        <view class="source-body">
          <view class="source-head">
            <text class="source-title">{{ step.title }}</text>
            <text class="source-time">{{ step.time }}</text>
          </view>
          <text class="source-desc">{{ step.desc }}</text>
        </view>
      </view>
    </MobileCard>

    <MobileCard class="section-card">
      <text class="section-title">核验材料</text>
      <view v-for="material in record.materials" :key="material.name" class="material-row">
        <view class="material-icon"></view>
        <view class="material-body">
          <text class="material-name">{{ material.name }}</text>
          <text class="material-meta">{{ material.meta }}</text>
        </view>
      </view>
    </MobileCard>

    <MobileCard class="section-card usage-card">
      <text class="section-title">引用范围</text>
      <text v-for="item in record.usages" :key="item" class="usage-item">{{ item }}</text>
    </MobileCard>

    <view class="footer-actions">
      <MobileActionButton class="footer-button" variant="outline" @tap="goSourceRecord">
        查看来源记录
      </MobileActionButton>
      <MobileActionButton class="footer-button" variant="primary" @tap="requestCorrection">
        申请更正
      </MobileActionButton>
    </view>
  </MobilePageShell>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.basic-info-detail-page {
  min-height: 100vh;
  padding: calc(var(--status-bar-height) + 4rpx) 30rpx calc(206rpx + env(safe-area-inset-bottom));
  overflow-x: hidden;
  background:
    radial-gradient(circle at 12% 2%, rgba(220, 251, 235, 0.82), transparent 31%),
    linear-gradient(180deg, #ffffff 0%, #f8fbff 48%, #f6fbf9 100%);
  color: #10172d;
}

.hero-card,
.section-card {
  border-radius: 30rpx;
  box-shadow: 0 22rpx 56rpx rgba(35, 51, 87, 0.07);
}

.hero-card {
  display: flex;
  align-items: center;
  gap: 28rpx;
  margin-top: 30rpx;
  padding: 32rpx;
  border: 2rpx solid rgba(184, 239, 211, 0.92);
  background: linear-gradient(112deg, #edfff5 0%, #f7fffb 100%);
}

.avatar-mark {
  display: flex;
  width: 128rpx;
  height: 128rpx;
  align-items: center;
  justify-content: center;
  flex: 0 0 128rpx;
  border-radius: 40rpx;
  background: #13a95b;
  color: #fff;
  font-size: 48rpx;
  font-weight: 900;
}

.hero-copy {
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
  gap: 12rpx;
}

.hero-title {
  color: #10172d;
  font-size: 38rpx;
  font-weight: 900;
  line-height: 1.26;
}

.hero-meta,
.summary-text,
.experience-desc,
.source-desc,
.material-meta {
  color: #5d6b82;
  font-size: 24rpx;
  line-height: 1.55;
}

.hero-meta,
.summary-text,
.experience-desc,
.source-desc {
  font-weight: 700;
}

.section-card {
  margin-top: 24rpx;
  padding: 30rpx;
  background: rgba(255, 255, 255, 0.94);
}

.section-title {
  display: block;
  color: #10172d;
  font-size: 32rpx;
  font-weight: 900;
  line-height: 1.2;
}

.summary-text {
  display: block;
  margin-top: 18rpx;
}

.source-chip {
  margin-top: 22rpx;
  padding: 20rpx 22rpx;
  border-radius: 24rpx;
  background: #f6fbff;
}

.source-label,
.info-label,
.source-time {
  color: #8a97aa;
  font-size: 22rpx;
  font-weight: 800;
}

.source-value {
  display: block;
  margin-top: 8rpx;
  color: #14213d;
  font-size: 24rpx;
  font-weight: 900;
  line-height: 1.35;
}

.info-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24rpx;
  padding: 24rpx 0;
  border-bottom: 2rpx solid #edf3fa;
}

.info-row:last-child {
  border-bottom: 0;
}

.info-value {
  flex: 1;
  color: #17233d;
  font-size: 26rpx;
  font-weight: 900;
  line-height: 1.45;
  text-align: right;
}

.experience-row {
  margin-top: 22rpx;
  padding: 24rpx;
  border-radius: 24rpx;
  background: #f7fbff;
}

.experience-title {
  display: block;
  color: #17233d;
  font-size: 27rpx;
  font-weight: 900;
}

.experience-desc {
  display: block;
  margin-top: 10rpx;
}

.source-step,
.source-head,
.material-row {
  display: flex;
  align-items: center;
}

.source-step {
  align-items: flex-start;
  gap: 18rpx;
  padding-top: 26rpx;
}

.source-index {
  display: flex;
  width: 44rpx;
  height: 44rpx;
  align-items: center;
  justify-content: center;
  flex: 0 0 44rpx;
  border-radius: 50%;
  background: #e8f8ef;
  color: #13a95b;
  font-size: 22rpx;
  font-weight: 900;
}

.source-body {
  flex: 1;
  padding-bottom: 24rpx;
  border-bottom: 2rpx solid #edf3fa;
}

.source-step:last-child .source-body {
  border-bottom: 0;
}

.source-head {
  justify-content: space-between;
  gap: 18rpx;
}

.source-title,
.material-name {
  color: #17233d;
  font-size: 27rpx;
  font-weight: 900;
}

.material-row {
  gap: 18rpx;
  margin-top: 24rpx;
  padding: 22rpx;
  border-radius: 24rpx;
  background: #f7fbff;
}

.material-icon {
  width: 72rpx;
  height: 72rpx;
  flex: 0 0 72rpx;
  border-radius: 22rpx;
  background:
    linear-gradient(135deg, transparent 56%, rgba(255, 255, 255, 0.72) 57%),
    #e8f1ff;
}

.material-body {
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
  gap: 8rpx;
}

.usage-card {
  margin-bottom: 24rpx;
}

.usage-item {
  display: block;
  margin-top: 16rpx;
  padding: 18rpx 20rpx;
  border-radius: 22rpx;
  background: #f7fbff;
  color: #506078;
  font-size: 24rpx;
  font-weight: 800;
  line-height: 1.45;
}

.footer-actions {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 4;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18rpx;
  padding: 24rpx 30rpx calc(28rpx + env(safe-area-inset-bottom));
  border-top: 2rpx solid rgba(220, 232, 244, 0.82);
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 -18rpx 42rpx rgba(35, 51, 87, 0.08);
}

.footer-button {
  min-width: 0;
}
</style>
