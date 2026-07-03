<script setup lang="ts">
import { computed, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

import MobileActionButton from '../../../../components/MobileActionButton.vue'
import MobileCard from '../../../../components/MobileCard.vue'
import MobileNavbar from '../../../../components/MobileNavbar.vue'
import MobilePageShell from '../../../../components/MobilePageShell.vue'
import MobileStatusTag from '../../../../components/MobileStatusTag.vue'
import { archiveRecords, findArchiveRecordById, getArchiveRecordStatusLabel, submitArchiveCorrection } from '../../../../domain/archive'

type ApplyQuery = {
  recordId?: string
}

const query = ref<ApplyQuery>({})
const selectedReason = ref('字段信息有误')
const description = ref('')

const reasonOptions = ['字段信息有误', '材料附件有误', '来源记录有误', '归档分类有误']

onLoad((options) => {
  query.value = options as ApplyQuery
})

const record = computed(() => findArchiveRecordById(query.value.recordId) || archiveRecords[0])

function goBack() {
  uni.navigateBack()
}

function goRecordDetail() {
  uni.navigateTo({
    url: `/pages/archive/record-detail/index?recordId=${record.value.id}`,
  })
}

function selectReason(reason: string) {
  selectedReason.value = reason
}

function submitCorrection() {
  const correction = submitArchiveCorrection(record.value.id, selectedReason.value, description.value)
  uni.redirectTo({
    url: `/pages/archive/correction/submitted/index?recordId=${record.value.id}&correctionId=${correction.id}`,
  })
}
</script>

<template>
  <MobilePageShell class="archive-correction-apply-page" active="archive">
    <MobileNavbar title="申请更正" size="compact" @back="goBack" />

    <MobileCard class="record-card">
      <view class="record-head">
        <MobileStatusTag :tone="record.status === 'archived' ? 'green' : 'orange'">
          {{ getArchiveRecordStatusLabel(record.status) }}
        </MobileStatusTag>
        <text class="record-date">{{ record.updatedAt }}</text>
      </view>
      <text class="record-title">{{ record.title }}</text>
      <view class="record-meta-grid">
        <view class="record-meta">
          <text class="record-meta-label">档案分类</text>
          <text class="record-meta-value">{{ record.categoryName }}</text>
        </view>
        <view class="record-meta">
          <text class="record-meta-label">来源</text>
          <text class="record-meta-value">{{ record.source }}</text>
        </view>
      </view>
      <MobileActionButton class="record-link" variant="link" arrow @tap="goRecordDetail">
        查看原档案
      </MobileActionButton>
    </MobileCard>

    <MobileCard class="section-card">
      <text class="section-title">更正原因</text>
      <view class="reason-grid">
        <button
          v-for="reason in reasonOptions"
          :key="reason"
          class="reason-chip"
          :class="{ 'reason-chip--active': selectedReason === reason }"
          @tap="selectReason(reason)"
        >
          {{ reason }}
        </button>
      </view>
    </MobileCard>

    <MobileCard class="section-card">
      <text class="section-title">补充说明</text>
      <textarea
        v-model="description"
        class="description-input"
        maxlength="200"
        placeholder="说明需要更正的字段、原内容和建议调整内容"
        placeholder-class="description-placeholder"
      />
      <text class="description-count">{{ description.length }}/200</text>
    </MobileCard>

    <MobileCard class="section-card">
      <view class="section-head">
        <text class="section-title">关联材料</text>
        <text class="section-hint">沿用原档案材料</text>
      </view>
      <view v-for="material in record.materials" :key="material.name" class="material-row">
        <view class="material-icon"></view>
        <view class="material-body">
          <text class="material-name">{{ material.name }}</text>
          <text class="material-meta">{{ material.meta }}</text>
        </view>
      </view>
    </MobileCard>

    <MobileCard class="notice-card">
      <text class="notice-title">提交口径</text>
      <text class="notice-desc">更正申请提交后进入待核验，不直接改写正式档案事实。审核进度和结果页后续接入。</text>
    </MobileCard>

    <view class="footer-actions">
      <MobileActionButton class="footer-button" variant="outline" @tap="goRecordDetail">
        返回详情
      </MobileActionButton>
      <MobileActionButton class="footer-button" variant="primary" @tap="submitCorrection">
        提交申请
      </MobileActionButton>
    </view>
  </MobilePageShell>
</template>

<style lang="scss" scoped>
@import '../../../../styles/tokens.scss';

.archive-correction-apply-page {
  min-height: 100vh;
  padding: calc(var(--status-bar-height) + 4rpx) 30rpx calc(206rpx + env(safe-area-inset-bottom));
  overflow-x: hidden;
  background:
    radial-gradient(circle at 14% 2%, rgba(232, 241, 255, 0.86), transparent 30%),
    linear-gradient(180deg, #ffffff 0%, #f8fbff 50%, #f7faf8 100%);
  color: #10172d;
}

.record-card,
.section-card,
.notice-card {
  border-radius: 30rpx;
  box-shadow: 0 22rpx 52rpx rgba(35, 51, 87, 0.07);
}

.record-card {
  margin-top: 28rpx;
  padding: 30rpx;
  border: 2rpx solid rgba(199, 222, 255, 0.96);
  background: linear-gradient(112deg, #eff6ff 0%, #ffffff 100%);
}

.record-head,
.section-head,
.footer-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20rpx;
}

.record-date,
.record-meta-label,
.section-hint,
.material-meta,
.notice-desc,
.description-count {
  color: #66728a;
  font-size: 24rpx;
  line-height: 1.38;
}

.record-title {
  display: block;
  margin-top: 18rpx;
  color: #10172d;
  font-size: 32rpx;
  font-weight: 900;
  line-height: 1.32;
}

.record-meta-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16rpx;
  margin-top: 22rpx;
}

.record-meta {
  min-width: 0;
  padding: 18rpx;
  border-radius: 18rpx;
  background: rgba(255, 255, 255, 0.72);
}

.record-meta-label,
.record-meta-value {
  display: block;
}

.record-meta-value {
  margin-top: 8rpx;
  overflow: hidden;
  color: #10172d;
  font-size: 26rpx;
  font-weight: 900;
  line-height: 1.26;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.record-link {
  height: 56rpx;
  margin-top: 20rpx;
  justify-content: flex-start;
  gap: 10rpx;
  font-size: 26rpx;
}

.section-card,
.notice-card {
  margin-top: 18rpx;
  padding: 30rpx;
}

.section-title,
.notice-title {
  display: block;
  color: #10172d;
  font-size: 30rpx;
  font-weight: 900;
  line-height: 1.3;
}

.reason-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16rpx;
  margin-top: 22rpx;
}

.reason-chip {
  display: flex;
  height: 72rpx;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0 18rpx;
  border: 2rpx solid $teacher-mobile-card-border;
  border-radius: 18rpx;
  background: #fff;
  color: #526079;
  font-size: 25rpx;
  font-weight: 900;
  line-height: 1.2;
}

.reason-chip::after {
  display: none;
  border: 0;
}

.reason-chip--active {
  border-color: #1677ff;
  background: #e8f1ff;
  color: #1663d6;
}

.description-input {
  box-sizing: border-box;
  width: 100%;
  min-height: 190rpx;
  margin-top: 20rpx;
  padding: 22rpx;
  border: 2rpx solid $teacher-mobile-card-border;
  border-radius: 20rpx;
  background: #f8fbff;
  color: #10172d;
  font-size: 26rpx;
  line-height: 1.45;
}

.description-placeholder {
  color: #9aa5b8;
}

.description-count {
  display: block;
  margin-top: 12rpx;
  text-align: right;
}

.material-row {
  display: flex;
  align-items: center;
  gap: 18rpx;
  margin-top: 22rpx;
  padding: 20rpx;
  border-radius: 18rpx;
  background: #f8fbff;
}

.material-icon {
  position: relative;
  width: 56rpx;
  height: 64rpx;
  flex: 0 0 56rpx;
  border-radius: 12rpx;
  background: #dfefff;
}

.material-icon::after {
  position: absolute;
  top: 12rpx;
  left: 12rpx;
  width: 32rpx;
  height: 6rpx;
  border-radius: 999rpx;
  background: #1677ff;
  box-shadow: 0 14rpx 0 rgba(22, 119, 255, 0.56);
  content: '';
}

.material-body {
  min-width: 0;
  flex: 1;
}

.material-name,
.material-meta {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.material-name {
  color: #10172d;
  font-size: 26rpx;
  font-weight: 900;
  line-height: 1.32;
}

.notice-card {
  border: 2rpx solid rgba(255, 213, 176, 0.88);
  background: #fff8f0;
}

.notice-desc {
  display: block;
  margin-top: 10rpx;
}

.footer-actions {
  position: fixed;
  right: 30rpx;
  bottom: calc(26rpx + env(safe-area-inset-bottom));
  left: 30rpx;
  padding: 18rpx;
  border: 1rpx solid rgba(226, 232, 240, 0.9);
  border-radius: 28rpx;
  background: rgba(255, 255, 255, 0.94);
  box-shadow: 0 20rpx 50rpx rgba(15, 23, 42, 0.12);
  backdrop-filter: blur(16rpx);
}

.footer-button {
  height: 82rpx;
  flex: 1;
  font-size: 28rpx;
}
</style>
