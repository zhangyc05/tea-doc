<script setup lang="ts">
import { computed } from 'vue'
import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobileIcon from '../../../components/MobileIcon.vue'
import MobileNavbar from '../../../components/MobileNavbar.vue'
import MobilePageShell from '../../../components/MobilePageShell.vue'
import {
  getFilteredTodoDynamics,
  getTodoState,
  resetTodoDynamicFilter,
  setTodoDynamicFilter,
  type MobileTodoDynamic,
  type MobileTodoDynamicTimeFilter,
  type MobileTodoDynamicType,
} from '../../../stores/todoStore'

const filters: Array<'全部' | MobileTodoDynamicType> = ['全部', '记录确认', '材料更新', '草稿保存', '其他']
const timeOptions: MobileTodoDynamicTimeFilter[] = ['全部', '今天', '昨天', '近 7 天', '近 30 天']
const typeOptions: Array<'全部' | MobileTodoDynamicType> = ['全部', '记录确认', '材料更新', '草稿保存', '其他']
const categoryOptions = ['全部', '培训与研修', '教学实践', '教学改革', '企业实践', '教学与研究']
const todoState = getTodoState()
const visibleItems = computed(() => getFilteredTodoDynamics())
const resultCount = computed(() => visibleItems.value.length)
const activeTypeIndex = computed({
  get: () => {
    const index = filters.indexOf(todoState.dynamicFilter.type)
    return index >= 0 ? index : 0
  },
  set: index => {
    selectType(filters[index] ?? '全部')
  },
})

function goBack() {
  uni.navigateBack()
}

function closeFilter() {
  uni.navigateBack()
}

function selectType(type: '全部' | MobileTodoDynamicType) {
  setTodoDynamicFilter({ type })
}

function selectTime(time: MobileTodoDynamicTimeFilter) {
  setTodoDynamicFilter({ time })
}

function selectCategory(category: string) {
  setTodoDynamicFilter({ category })
}

function resetFilter() {
  resetTodoDynamicFilter()
}

function applyFilter() {
  uni.redirectTo({ url: '/pages/todo/dynamics/index' })
}

function showDynamic(item: MobileTodoDynamic) {
  uni.showToast({ title: `动态详情为本地模拟：${item.title}`, icon: 'none' })
}
</script>

<template>
  <MobilePageShell class="dynamics-filter-page" active="todo">
    <view class="page-content">
      <MobileNavbar title="全部动态" @back="goBack">
        <template #right>
          <button class="filter-button" @tap="closeFilter">
            <MobileIcon class="filter-button__icon" name="filter" tone="dark" size="plain" shape="none" />
            <text>筛选</text>
          </button>
        </template>
      </MobileNavbar>

      <wd-tabs v-model="activeTypeIndex" class="filter-tabs" color="#04a851" inactive-color="#111827" :line-width="0">
        <wd-tab v-for="(filter, index) in filters" :key="filter" :name="index" :title="filter" />
      </wd-tabs>

      <view class="date-head">
        <view class="date-title">
          <view class="date-dot"></view>
          <text>今天</text>
        </view>
        <text class="date-count">{{ resultCount }} 条</text>
      </view>

      <MobileCard v-for="item in visibleItems" :key="item.id" class="dynamic-card" @tap="showDynamic(item)">
        <MobileIcon class="dynamic-icon" :name="item.icon" :tone="item.tone" size="sm" shape="circle" />
        <view class="dynamic-body">
          <text class="dynamic-title">{{ item.title }}</text>
          <text class="dynamic-desc">{{ item.desc }}</text>
          <text class="dynamic-category" :class="`dynamic-category--${item.tone}`">{{ item.category }}</text>
        </view>
        <text class="dynamic-time">{{ item.time.replace('今天 ', '') }}</text>
        <wd-icon class="dynamic-arrow" name="chevron-right" size="26rpx" color="#050812" />
      </MobileCard>
    </view>

    <wd-popup :model-value="true" position="bottom" safe-area-inset-bottom :z-index="80" custom-class="filter-popup" @close="closeFilter">
      <view class="filter-drawer">
        <view class="drawer-handle"></view>
        <view class="drawer-head">
          <text class="drawer-title">筛选</text>
          <button class="drawer-close" aria-label="关闭筛选" @tap="closeFilter">
            <wd-icon name="close" size="36rpx" color="#5b6472" />
          </button>
        </view>

        <view class="filter-section">
          <text class="filter-section__title">时间范围</text>
          <wd-radio-group
            class="option-row option-radio-group"
            :model-value="todoState.dynamicFilter.time"
            shape="button"
            checked-color="#04a851"
            @change="selectTime"
          >
            <wd-radio
              v-for="option in timeOptions"
              :key="option"
              class="option-radio option-radio--time"
              :value="option"
            >
              {{ option }}
            </wd-radio>
          </wd-radio-group>
        </view>

        <view class="filter-section">
          <text class="filter-section__title">更新类型</text>
          <wd-radio-group
            class="option-row option-radio-group"
            :model-value="todoState.dynamicFilter.type"
            shape="button"
            checked-color="#04a851"
            @change="selectType"
          >
            <wd-radio
              v-for="option in typeOptions"
              :key="option"
              class="option-radio option-radio--type"
              :value="option"
            >
              {{ option }}
            </wd-radio>
          </wd-radio-group>
        </view>

        <view class="filter-section">
          <text class="filter-section__title">相关分类</text>
          <wd-radio-group
            class="option-grid option-radio-group"
            :model-value="todoState.dynamicFilter.category"
            shape="button"
            checked-color="#04a851"
            @change="selectCategory"
          >
            <wd-radio
              v-for="option in categoryOptions"
              :key="option"
              class="option-radio option-radio--grid"
              :value="option"
            >
              {{ option }}
            </wd-radio>
          </wd-radio-group>
        </view>

        <view class="drawer-actions">
          <MobileActionButton class="drawer-action" variant="outline" @tap="resetFilter">重置</MobileActionButton>
          <MobileActionButton class="drawer-action drawer-action--primary" variant="primary" @tap="applyFilter">
            查看结果（{{ resultCount }}）
          </MobileActionButton>
        </view>
      </view>
    </wd-popup>
  </MobilePageShell>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.dynamics-filter-page {
  position: relative;
  overflow: hidden;
  padding-top: calc(var(--status-bar-height) + 8rpx);
  padding-bottom: calc(150rpx + env(safe-area-inset-bottom));
  background: linear-gradient(180deg, #fcfffd 0%, #f6fbff 100%);
}

.page-content {
  position: relative;
  z-index: 1;
}

.filter-button,
.date-head,
.date-title,
.dynamic-card,
.drawer-head,
.option-row,
.drawer-actions {
  display: flex;
  align-items: center;
}

.filter-button,
.drawer-close {
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
}

.filter-button::after {
  display: none;
  border: 0;
}

.filter-button {
  height: 72rpx;
  justify-content: flex-end;
  gap: 12rpx;
  color: #111827;
  font-size: 27rpx;
  font-weight: 800;
  line-height: 1;
}

.filter-button__icon {
  width: 30rpx;
  height: 32rpx;
}

.filter-tabs {
  height: 74rpx;
  margin: 10rpx -6rpx 38rpx;
  padding: 8rpx 10rpx;
  border: 1rpx solid #edf1f6;
  border-radius: 38rpx;
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 14rpx 38rpx rgba(34, 48, 80, 0.05);
}

.filter-tabs :deep(.wd-tabs__nav) {
  height: 58rpx;
  gap: 8rpx;
}

.filter-tabs :deep(.wd-tabs__nav-container) {
  background: transparent;
}

.filter-tabs :deep(.wd-tabs__nav-item) {
  min-width: 112rpx;
  height: 58rpx;
  margin: 0;
  padding: 0 18rpx;
  border-radius: 30rpx;
  color: #111827;
  font-size: 27rpx;
  font-weight: 900;
  line-height: 1;
  white-space: nowrap;
}

.filter-tabs :deep(.wd-tabs__nav-item.is-active) {
  background: linear-gradient(135deg, #16c96c, #02ad53);
  color: #fff;
  box-shadow: 0 12rpx 28rpx rgba(5, 181, 85, 0.22);
}

.filter-tabs :deep(.wd-tabs__container),
.filter-tabs :deep(.wd-tabs__line) {
  display: none;
}

.date-head {
  justify-content: space-between;
  padding: 0 2rpx 18rpx;
}

.date-title {
  gap: 15rpx;
  color: #111827;
  font-size: 31rpx;
  font-weight: 900;
}

.date-dot {
  width: 11rpx;
  height: 11rpx;
  border-radius: 50%;
  background: $teacher-mobile-primary;
}

.date-count {
  color: #111827;
  font-size: 25rpx;
  line-height: 1;
}

.dynamic-card {
  min-height: 104rpx;
  margin-top: 12rpx;
  padding: 20rpx 18rpx;
  border-radius: 24rpx;
}

.dynamic-icon {
  flex: 0 0 auto;
  width: 72rpx;
  height: 72rpx;
}

.dynamic-body {
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
  margin-left: 22rpx;
}

.dynamic-title {
  color: #111827;
  font-size: 29rpx;
  font-weight: 900;
  line-height: 1.25;
}

.dynamic-desc {
  margin-top: 9rpx;
  color: #2b3240;
  font-size: 24rpx;
  line-height: 1.3;
}

.dynamic-category {
  margin-top: 10rpx;
  font-size: 24rpx;
  font-weight: 900;
  line-height: 1;
}

.dynamic-category--green {
  color: #0fa958;
}

.dynamic-category--blue {
  color: #1478f2;
}

.dynamic-category--orange {
  color: #ff7614;
}

.dynamic-time {
  flex: 0 0 auto;
  margin-left: 14rpx;
  color: #242833;
  font-size: 25rpx;
  line-height: 1;
  white-space: nowrap;
}

.dynamic-arrow {
  display: flex;
  flex: 0 0 auto;
  width: 26rpx;
  height: 26rpx;
  align-items: center;
  justify-content: center;
  margin-left: 18rpx;
}

.filter-drawer {
  box-sizing: border-box;
  max-height: 70vh;
  padding: 26rpx 34rpx calc(34rpx + env(safe-area-inset-bottom));
  border-radius: 48rpx 48rpx 0 0;
  background: #fff;
  box-shadow: 0 -24rpx 60rpx rgba(15, 23, 42, 0.16);
}

.drawer-handle {
  width: 90rpx;
  height: 9rpx;
  margin: 0 auto 30rpx;
  border-radius: 999rpx;
  background: #d1d5db;
}

.drawer-head {
  position: relative;
  height: 58rpx;
  justify-content: center;
}

.drawer-title {
  color: #111827;
  font-size: 38rpx;
  font-weight: 900;
  line-height: 1;
}

.drawer-close {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  width: 58rpx;
  height: 58rpx;
  align-items: center;
  justify-content: center;
}

.filter-section {
  margin-top: 46rpx;
}

.filter-section__title {
  display: block;
  color: #111827;
  font-size: 32rpx;
  font-weight: 900;
  line-height: 1.2;
}

.option-row {
  justify-content: space-between;
  gap: 16rpx;
  margin-top: 30rpx;
}

.option-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24rpx 24rpx;
  margin-top: 30rpx;
}

.option-radio-group :deep(.wd-radio) {
  margin: 0;
}

.option-radio--time,
.option-radio--type {
  flex: 1 1 0;
}

.option-radio :deep(.wd-radio__label) {
  box-sizing: border-box;
  height: 76rpx;
  min-width: 0;
  margin: 0;
  padding: 0 18rpx;
  border: 1rpx solid #e0e5ed;
  border-radius: 16rpx;
  background: #fff;
  color: #2b3240;
  font-size: 28rpx;
  font-weight: 700;
  line-height: 76rpx;
  text-align: center;
  white-space: nowrap;
}

.option-radio--grid :deep(.wd-radio__label) {
  width: 100%;
}

.option-radio :deep(.wd-radio.is-checked .wd-radio__label) {
  border: 2rpx solid $teacher-mobile-primary;
  background: #effff5;
  color: $teacher-mobile-primary-dark;
  font-weight: 900;
}

.option-radio :deep(.wd-radio__shape) {
  display: none;
}

.drawer-actions {
  gap: 34rpx;
  margin: 68rpx -2rpx 0;
  padding-top: 32rpx;
  border-top: 1rpx solid #edf1f6;
}

.drawer-action {
  flex: 1;
  height: 80rpx;
  border-radius: 18rpx;
  font-size: 31rpx;
}

.drawer-action--primary {
  box-shadow: 0 16rpx 34rpx rgba(5, 181, 85, 0.22);
}

@media (max-width: 374px) {
  .filter-tabs {
    margin-right: -10rpx;
    margin-left: -10rpx;
  }

  .filter-tabs :deep(.wd-tabs__nav-item) {
    min-width: 100rpx;
    font-size: 24rpx;
  }

  .dynamic-card {
    padding: 18rpx 16rpx;
  }

  .dynamic-icon {
    width: 62rpx;
    height: 62rpx;
  }

  .dynamic-body {
    margin-left: 18rpx;
  }

  .dynamic-title {
    font-size: 26rpx;
  }

  .dynamic-desc,
  .dynamic-category {
    font-size: 22rpx;
  }

  .dynamic-time {
    font-size: 22rpx;
  }

  .filter-drawer {
    padding-right: 26rpx;
    padding-left: 26rpx;
  }

  .option-row {
    gap: 12rpx;
  }

  .option-radio :deep(.wd-radio__label) {
    height: 66rpx;
    padding: 0 12rpx;
    font-size: 24rpx;
    line-height: 66rpx;
  }

  .option-grid {
    gap: 18rpx;
  }

  .drawer-actions {
    gap: 24rpx;
  }
}
</style>
