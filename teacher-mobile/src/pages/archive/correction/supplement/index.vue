<script setup lang="ts">
import { computed, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

import MobileActionButton from '../../../../components/MobileActionButton.vue'
import MobileCard from '../../../../components/MobileCard.vue'
import MobileNavbar from '../../../../components/MobileNavbar.vue'
import MobilePageShell from '../../../../components/MobilePageShell.vue'
import MobileStatusTag from '../../../../components/MobileStatusTag.vue'
import {
  archiveRecords,
  findArchiveCorrectionById,
  findArchiveRecordById,
  submitArchiveCorrectionSupplement,
  type ArchiveCorrectionMaterial,
} from '../../../../domain/archive'

type SupplementQuery = {
  recordId?: string
  correctionId?: string
  reason?: string
}

const query = ref<SupplementQuery>({})
const supplementDesc = ref('')

const supplementMaterials = ref<ArchiveCorrectionMaterial[]>([
  { name: '补充证明材料.pdf', meta: '用于核验更正事实', uploadStatus: 'pending-upload' },
  { name: '情况说明.docx', meta: '说明更正依据', uploadStatus: 'pending-upload' },
])

onLoad((options) => {
  query.value = options as SupplementQuery
})

const record = computed(() => findArchiveRecordById(query.value.recordId) || archiveRecords[0])
const correction = computed(() => findArchiveCorrectionById(query.value.correctionId))
const reason = computed(() => correction.value?.reason || (query.value.reason ? decodeURIComponent(query.value.reason) : '字段信息有误'))

function goBack() {
  uni.navigateBack()
}

function goRecordDetail() {
  uni.navigateTo({
    url: `/pages/archive/record-detail/index?recordId=${record.value.id}`,
  })
}

function getUploadStatusLabel(uploadStatus: ArchiveCorrectionMaterial['uploadStatus']) {
  if (uploadStatus === 'pending-upload') return '待上传'
  if (uploadStatus === 'uploaded') return '已上传'
  return '待核验'
}

function markMaterialUploaded(index: number) {
  supplementMaterials.value[index] = {
    ...supplementMaterials.value[index],
    uploadStatus: 'uploaded',
  }
}

function submitSupplement() {
  if (correction.value) submitArchiveCorrectionSupplement(correction.value.id, supplementMaterials.value)
  uni.redirectTo({
    url: `/pages/archive/correction/progress/index?recordId=${record.value.id}&correctionId=${correction.value?.id || query.value.correctionId}&status=supplemented`,
  })
}
</script>

<template>
  <MobilePageShell class="archive-correction-supplement-page" active="archive">
    <MobileNavbar title="补充材料" size="compact" @back="goBack" />

    <MobileCard class="summary-card">
      <view class="summary-head">
        <MobileStatusTag tone="orange">需补充</MobileStatusTag>
        <text class="summary-date">{{ record.updatedAt }}</text>
      </view>
      <text class="summary-title">{{ record.title }}</text>
      <text class="summary-desc">补充材料提交后进入再次核验，不直接改写正式档案事实。</text>
    </MobileCard>

    <MobileCard class="section-card">
      <text class="section-title">补充说明</text>
      <view class="info-row">
        <text class="info-label">更正原因</text>
        <text class="info-value">{{ reason }}</text>
      </view>
      <textarea
        v-model="supplementDesc"
        class="supplement-input"
        maxlength="200"
        placeholder="说明本次补充的材料内容、来源和可佐证的字段"
        placeholder-class="supplement-placeholder"
      />
      <text class="supplement-count">{{ supplementDesc.length }}/200</text>
    </MobileCard>

    <MobileCard class="section-card">
      <text class="section-title">补充材料</text>
      <view
        v-for="(material, index) in supplementMaterials"
        :key="material.name"
        class="material-row"
        @tap="markMaterialUploaded(index)"
      >
        <view class="material-icon"></view>
        <view class="material-body">
          <text class="material-name">{{ material.name }}</text>
          <text class="material-meta">{{ getUploadStatusLabel(material.uploadStatus) }} · {{ material.meta }}</text>
        </view>
      </view>
      <text class="material-note">点选材料后记录为已上传，提交补充后进入待核验。</text>
    </MobileCard>

    <view class="footer-actions">
      <MobileActionButton class="footer-button" variant="outline" @tap="goRecordDetail">
        查看原档案
      </MobileActionButton>
      <MobileActionButton class="footer-button" variant="primary" @tap="submitSupplement">
        提交补充
      </MobileActionButton>
    </view>
  </MobilePageShell>
</template>

<style lang="scss" scoped>
@import '../../../../styles/tokens.scss';

.archive-correction-supplement-page {
  min-height: 100vh;
  padding: calc(var(--status-bar-height) + 4rpx) 30rpx calc(206rpx + env(safe-area-inset-bottom));
  overflow-x: hidden;
  background:
    radial-gradient(circle at 14% 2%, rgba(255, 238, 214, 0.8), transparent 30%),
    linear-gradient(180deg, #ffffff 0%, #f8fbff 52%, #f7faf8 100%);
  color: #10172d;
}

.summary-card,
.section-card {
  border-radius: 30rpx;
  box-shadow: 0 22rpx 52rpx rgba(35, 51, 87, 0.07);
}

.summary-card {
  margin-top: 28rpx;
  padding: 32rpx;
  border: 2rpx solid rgba(255, 213, 176, 0.92);
  background: linear-gradient(112deg, #fff5ec 0%, #ffffff 100%);
}

.summary-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20rpx;
}

.summary-date,
.summary-desc,
.info-label,
.material-meta,
.material-note,
.supplement-count {
  color: #66728a;
  font-size: 24rpx;
  line-height: 1.42;
}

.summary-title {
  display: block;
  margin-top: 18rpx;
  color: #10172d;
  font-size: 32rpx;
  font-weight: 900;
  line-height: 1.3;
}

.summary-desc {
  display: block;
  margin-top: 10rpx;
}

.section-card {
  margin-top: 18rpx;
  padding: 30rpx;
}

.section-title {
  display: block;
  color: #10172d;
  font-size: 30rpx;
  font-weight: 900;
  line-height: 1.3;
}

.info-row {
  display: flex;
  justify-content: space-between;
  gap: 24rpx;
  margin-top: 20rpx;
}

.info-value {
  max-width: 430rpx;
  color: #10172d;
  font-size: 25rpx;
  font-weight: 900;
  line-height: 1.36;
  text-align: right;
}

.supplement-input {
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

.supplement-placeholder {
  color: #9aa5b8;
}

.supplement-count {
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
  background: #fff0e6;
}

.material-icon::after {
  position: absolute;
  top: 12rpx;
  left: 12rpx;
  width: 32rpx;
  height: 6rpx;
  border-radius: 999rpx;
  background: #ff8a2a;
  box-shadow: 0 14rpx 0 rgba(255, 138, 42, 0.56);
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

.material-note {
  display: block;
  margin-top: 18rpx;
}

.footer-actions {
  position: fixed;
  right: 30rpx;
  bottom: calc(26rpx + env(safe-area-inset-bottom));
  left: 30rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20rpx;
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
