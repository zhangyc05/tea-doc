<script setup lang="ts">
import { computed, ref } from 'vue'

import MobilePageShell from '../../../components/MobilePageShell.vue'
import {
  getArchiveRecordStatusLabel,
  searchArchiveRecords,
  type ConcreteArchiveCategoryKey,
  type MobileArchiveRecord,
} from '../../../domain/archive'

type Tone = 'green' | 'teal' | 'orange' | 'purple' | 'blue'
type IconType = 'calendar' | 'file' | 'chart' | 'book' | 'lab' | 'cup' | 'person' | 'briefcase'

const filters = ['全部', '教学工作', '教研科研', '企业实践', '成果荣誉', '个人发展']

const categoryVisuals: Record<ConcreteArchiveCategoryKey, {
  tone: Tone
  icon: IconType
}> = {
  'basic-info': { tone: 'green', icon: 'person' },
  teaching: { tone: 'green', icon: 'calendar' },
  research: { tone: 'teal', icon: 'lab' },
  'enterprise-practice': { tone: 'blue', icon: 'briefcase' },
  'social-service': { tone: 'green', icon: 'file' },
  honor: { tone: 'orange', icon: 'cup' },
  'personal-development': { tone: 'purple', icon: 'person' },
  assessment: { tone: 'green', icon: 'chart' },
}

const selectedFilter = ref(filters[0])
const queryText = ref('成长记录')

const filteredRecords = computed(() => {
  return searchArchiveRecords(queryText.value, selectedFilter.value)
})

function goBack() {
  uni.navigateBack()
}

function clearQuery() {
  queryText.value = ''
  selectedFilter.value = filters[0]
}

function selectFilter(filter: string) {
  selectedFilter.value = filter
}

function getRecordMeta(record: MobileArchiveRecord) {
  return `${record.type} ｜ ${record.updatedAt} ｜ ${getArchiveRecordStatusLabel(record.status)}`
}

function showRecord(recordId: string) {
  uni.navigateTo({
    url: `/pages/archive/record-detail/index?recordId=${recordId}`,
  })
}
</script>

<template>
  <MobilePageShell class="record-query-page" active="archive">
    <view class="system-status" aria-hidden="true">
      <text class="system-status__time">9:41</text>
      <view class="system-status__icons">
        <view class="status-signal"></view>
        <view class="status-wifi"></view>
        <view class="status-battery"></view>
      </view>
    </view>

    <view class="search-head">
      <button class="back-button" aria-label="返回" @tap="goBack">
        <view class="back-button__icon"></view>
      </button>
      <view class="search-box">
        <view class="search-icon"></view>
        <text class="query-text">{{ queryText || '输入关键词' }}</text>
        <button class="clear-button" aria-label="清除关键词" @tap="clearQuery">×</button>
        <view class="mic-icon"></view>
      </view>
    </view>

    <text class="result-count">找到 {{ filteredRecords.length }} 条相关记录</text>

    <view class="filter-tabs">
      <button
        v-for="(filter, index) in filters"
        :key="filter"
        class="filter-tab"
        :class="{ 'filter-tab--active': selectedFilter === filter }"
        @tap="selectFilter(filter)"
      >
        {{ filter }}
      </button>
    </view>

    <view class="record-list">
      <view v-for="record in filteredRecords" :key="record.id" class="record-card" @tap="showRecord(record.id)">
        <view class="record-icon" :class="[`record-icon--${categoryVisuals[record.category].tone}`, `record-icon--${categoryVisuals[record.category].icon}`]">
          <view class="record-icon__glyph"></view>
        </view>
        <view class="record-body">
          <text class="record-tag" :class="`record-tag--${categoryVisuals[record.category].tone}`">{{ record.categoryName }}</text>
          <text class="record-title">{{ record.title }}</text>
          <text class="record-meta">{{ getRecordMeta(record) }}</text>
        </view>
        <view class="record-arrow"></view>
      </view>
      <view v-if="filteredRecords.length === 0" class="empty-card">
        <text class="empty-title">暂无匹配档案</text>
        <text class="empty-desc">可调整关键词或切换分类后重新查询。</text>
      </view>
    </view>
  </MobilePageShell>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.record-query-page {
  min-height: 100vh;
  padding: calc(var(--status-bar-height) + 16rpx) 28rpx calc(150rpx + env(safe-area-inset-bottom));
  background:
    radial-gradient(circle at 14% 4%, rgba(223, 252, 239, 0.82), transparent 32%),
    linear-gradient(180deg, #fbfffd 0%, #f7fbff 52%, #f5f9ff 100%);
  color: $teacher-mobile-text-primary;
}

.system-status,
.system-status__icons,
.search-head,
.search-box,
.filter-tabs,
.record-card {
  display: flex;
  align-items: center;
}

.system-status {
  height: 42rpx;
  justify-content: space-between;
  padding: 0 18rpx;
}

.system-status__time {
  color: #050812;
  font-size: 30rpx;
  font-weight: 900;
  line-height: 1;
}

.system-status__icons {
  gap: 14rpx;
}

.status-signal {
  width: 38rpx;
  height: 26rpx;
  background: #050812;
  clip-path: polygon(0 70%, 18% 70%, 18% 100%, 0 100%, 0 70%, 27% 52%, 45% 52%, 45% 100%, 27% 100%, 27% 52%, 54% 32%, 72% 32%, 72% 100%, 54% 100%, 54% 32%, 82% 10%, 100% 10%, 100% 100%, 82% 100%, 82% 10%);
}

.status-wifi {
  position: relative;
  width: 36rpx;
  height: 26rpx;
  border: 8rpx solid #050812;
  border-color: #050812 transparent transparent;
  border-radius: 50%;
}

.status-wifi::after {
  position: absolute;
  right: 7rpx;
  bottom: -9rpx;
  width: 9rpx;
  height: 9rpx;
  border-radius: 50%;
  background: #050812;
  content: '';
}

.status-battery {
  position: relative;
  width: 52rpx;
  height: 26rpx;
  border: 4rpx solid #050812;
  border-radius: 8rpx;
}

.status-battery::before {
  position: absolute;
  top: 4rpx;
  left: 4rpx;
  width: 38rpx;
  height: 10rpx;
  border-radius: 4rpx;
  background: #050812;
  content: '';
}

.status-battery::after {
  position: absolute;
  top: 6rpx;
  right: -9rpx;
  width: 5rpx;
  height: 12rpx;
  border-radius: 0 4rpx 4rpx 0;
  background: #050812;
  content: '';
}

.search-head {
  gap: 22rpx;
  margin-top: 30rpx;
}

.back-button,
.filter-tab,
.clear-button {
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
}

.back-button::after,
.filter-tab::after,
.clear-button::after {
  display: none;
  border: 0;
}

.back-button {
  position: relative;
  width: 44rpx;
  height: 76rpx;
  flex: 0 0 44rpx;
}

.back-button__icon {
  position: absolute;
  top: 22rpx;
  left: 9rpx;
  width: 30rpx;
  height: 30rpx;
  border-bottom: 6rpx solid #0b122a;
  border-left: 6rpx solid #0b122a;
  transform: rotate(45deg);
}

.search-box {
  min-width: 0;
  flex: 1;
  height: 72rpx;
  gap: 20rpx;
  padding: 0 22rpx;
  border: 2rpx solid $teacher-mobile-primary;
  border-radius: 22rpx;
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 16rpx 36rpx rgba(35, 51, 87, 0.05);
}

.search-icon {
  position: relative;
  width: 36rpx;
  height: 36rpx;
  flex: 0 0 36rpx;
  border: 5rpx solid #9aa3b5;
  border-radius: 50%;
}

.search-icon::after {
  position: absolute;
  right: -10rpx;
  bottom: -7rpx;
  width: 17rpx;
  height: 5rpx;
  border-radius: 6rpx;
  background: #9aa3b5;
  content: '';
  transform: rotate(45deg);
}

.query-text {
  min-width: 0;
  flex: 1;
  overflow: hidden;
  color: #111827;
  font-size: 31rpx;
  font-weight: 500;
  line-height: 1.2;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.clear-button {
  display: flex;
  width: 36rpx;
  height: 36rpx;
  align-items: center;
  justify-content: center;
  flex: 0 0 36rpx;
  border-radius: 50%;
  background: #9299a8;
  color: #fff;
  font-size: 36rpx;
  font-weight: 700;
  line-height: 30rpx;
}

.mic-icon {
  position: relative;
  width: 26rpx;
  height: 38rpx;
  flex: 0 0 26rpx;
  border: 5rpx solid #111827;
  border-top-width: 7rpx;
  border-radius: 18rpx;
}

.mic-icon::before {
  position: absolute;
  right: -11rpx;
  bottom: -8rpx;
  left: -11rpx;
  height: 24rpx;
  border: 5rpx solid #111827;
  border-top: 0;
  border-radius: 0 0 18rpx 18rpx;
  content: '';
}

.mic-icon::after {
  position: absolute;
  bottom: -17rpx;
  left: 7rpx;
  width: 13rpx;
  height: 5rpx;
  border-radius: 5rpx;
  background: #111827;
  content: '';
}

.result-count {
  display: block;
  margin: 32rpx 0 26rpx 4rpx;
  color: #111827;
  font-size: 27rpx;
  line-height: 1.2;
}

.filter-tabs {
  gap: 22rpx;
  margin-bottom: 28rpx;
}

.filter-tab {
  display: flex;
  min-width: 128rpx;
  height: 58rpx;
  align-items: center;
  justify-content: center;
  padding: 0 26rpx;
  border: 1rpx solid #e0e6ef;
  border-radius: 999rpx;
  background: rgba(255, 255, 255, 0.92);
  color: #111827;
  font-size: 26rpx;
  font-weight: 700;
  line-height: 1;
  white-space: nowrap;
  box-shadow: 0 10rpx 28rpx rgba(35, 51, 87, 0.04);
}

.filter-tab--active {
  min-width: 98rpx;
  border-color: transparent;
  background: linear-gradient(135deg, #16c96c, #02ad53);
  color: #fff;
  font-weight: 900;
  box-shadow: 0 14rpx 30rpx rgba(5, 181, 85, 0.24);
}

.record-list {
  display: flex;
  flex-direction: column;
  gap: 10rpx;
}

.empty-card {
  padding: 36rpx 28rpx;
  border: 2rpx dashed rgba(150, 164, 190, 0.34);
  border-radius: 24rpx;
  background: rgba(255, 255, 255, 0.72);
  text-align: center;
}

.empty-title {
  display: block;
  color: #10172d;
  font-size: 30rpx;
  font-weight: 900;
  line-height: 1.3;
}

.empty-desc {
  display: block;
  margin-top: 12rpx;
  color: #66728a;
  font-size: 25rpx;
  line-height: 1.4;
}

.record-card {
  min-height: 112rpx;
  gap: 24rpx;
  padding: 18rpx 26rpx 18rpx 18rpx;
  border: 1rpx solid rgba(232, 238, 247, 0.9);
  border-radius: 24rpx;
  background: rgba(255, 255, 255, 0.94);
  box-shadow: 0 18rpx 46rpx rgba(35, 51, 87, 0.06);
}

.record-icon {
  position: relative;
  width: 76rpx;
  height: 76rpx;
  flex: 0 0 76rpx;
  border-radius: 20rpx;
  background: #e7faef;
  color: $teacher-mobile-primary;
}

.record-icon--teal {
  background: #e4fbf6;
  color: #0aa995;
}

.record-icon--orange {
  background: #fff6de;
  color: #eab308;
}

.record-icon--purple {
  background: #f2e8ff;
  color: #9b5de5;
}

.record-icon--blue {
  background: #eaf3ff;
  color: #1d70d6;
}

.record-icon__glyph {
  position: absolute;
  inset: 21rpx;
  border-radius: 6rpx;
  background: currentColor;
}

.record-icon--calendar .record-icon__glyph::before,
.record-icon--file .record-icon__glyph::before,
.record-icon--chart .record-icon__glyph::before {
  position: absolute;
  background: #fff;
  content: '';
}

.record-icon--calendar .record-icon__glyph::before {
  right: 5rpx;
  bottom: 5rpx;
  width: 12rpx;
  height: 12rpx;
  border-radius: 50%;
}

.record-icon--file .record-icon__glyph {
  border-radius: 5rpx;
}

.record-icon--file .record-icon__glyph::before {
  top: 8rpx;
  left: 8rpx;
  width: 18rpx;
  height: 4rpx;
  box-shadow: 0 10rpx 0 #fff;
}

.record-icon--chart .record-icon__glyph {
  background:
    linear-gradient(currentColor 0 0) 0 20rpx / 7rpx 15rpx no-repeat,
    linear-gradient(currentColor 0 0) 14rpx 12rpx / 7rpx 23rpx no-repeat,
    linear-gradient(currentColor 0 0) 28rpx 4rpx / 7rpx 31rpx no-repeat;
}

.record-icon--book .record-icon__glyph {
  border-radius: 50% 8rpx 8rpx 50%;
}

.record-icon--lab .record-icon__glyph {
  clip-path: polygon(35% 0, 65% 0, 65% 40%, 100% 100%, 0 100%, 35% 40%);
}

.record-icon--cup .record-icon__glyph {
  border-radius: 7rpx 7rpx 15rpx 15rpx;
}

.record-icon--person .record-icon__glyph {
  border-radius: 50% 50% 8rpx 8rpx;
}

.record-icon--briefcase .record-icon__glyph {
  border-radius: 6rpx;
}

.record-body {
  min-width: 0;
  flex: 1;
}

.record-tag {
  display: inline-flex;
  align-items: center;
  height: 30rpx;
  padding: 0 10rpx;
  border-radius: 8rpx;
  background: #dcfce7;
  color: #0aa84f;
  font-size: 20rpx;
  font-weight: 900;
  line-height: 1;
}

.record-tag--teal {
  background: #d9fbf4;
  color: #079786;
}

.record-tag--orange {
  background: #fff0c7;
  color: #d97706;
}

.record-tag--purple {
  background: #f0e4ff;
  color: #8b35dc;
}

.record-tag--blue {
  background: #e1efff;
  color: #1d70d6;
}

.record-title {
  display: block;
  overflow: hidden;
  margin-top: 14rpx;
  color: #111827;
  font-size: 28rpx;
  font-weight: 900;
  line-height: 1.22;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.record-meta {
  display: block;
  overflow: hidden;
  margin-top: 12rpx;
  color: #526079;
  font-size: 23rpx;
  line-height: 1.2;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.record-arrow {
  width: 20rpx;
  height: 20rpx;
  flex: 0 0 20rpx;
  border-top: 5rpx solid #7b8495;
  border-right: 5rpx solid #7b8495;
  transform: rotate(45deg);
}

@media (max-width: 374px) {
  .record-query-page {
    padding-right: 22rpx;
    padding-left: 22rpx;
  }

  .search-head {
    gap: 16rpx;
  }

  .filter-tabs {
    gap: 12rpx;
  }

  .filter-tab {
    min-width: 108rpx;
    padding: 0 18rpx;
    font-size: 23rpx;
  }

  .filter-tab--active {
    min-width: 84rpx;
  }

  .record-card {
    gap: 18rpx;
    padding-right: 20rpx;
  }

  .record-icon {
    width: 68rpx;
    height: 68rpx;
    flex-basis: 68rpx;
  }

  .record-title {
    font-size: 26rpx;
  }

  .record-meta {
    font-size: 21rpx;
  }
}
</style>
