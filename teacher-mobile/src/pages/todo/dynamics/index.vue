<script setup lang="ts">
import { computed, ref } from 'vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobilePageShell from '../../../components/MobilePageShell.vue'
import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileIcon from '../../../components/MobileIcon.vue'
import MobileNavbar from '../../../components/MobileNavbar.vue'
import {
  getFilteredTodoDynamics,
  getTodoState,
  resetTodoDynamicFilter,
  setTodoDynamicFilter,
  type MobileTodoDynamic,
  type MobileTodoDynamicCategoryFilter,
  type MobileTodoDynamicTimeFilter,
  type MobileTodoDynamicType,
} from '../../../stores/todoStore'

const filters: Array<'全部' | MobileTodoDynamicType> = ['全部', '记录确认', '材料更新', '草稿保存', '其他']
const timeOptions: MobileTodoDynamicTimeFilter[] = ['全部', '今天', '昨天', '近 7 天', '近 30 天']
const typeOptions: Array<'全部' | MobileTodoDynamicType> = ['全部', '记录确认', '材料更新', '草稿保存', '其他']
const categoryOptions = ['全部', '培训与研修', '教学实践', '教学改革', '企业实践', '教学与研究']
const todoState = getTodoState()
const todoDynamics = computed(() => getFilteredTodoDynamics())
const resultCount = computed(() => todoDynamics.value.length)
const activeTypeIndex = computed({
  get: () => Math.max(0, filters.indexOf(todoState.dynamicFilter.type)),
  set: index => selectType(filters[Number(index)] || '全部'),
})
const groups = computed(() => {
  const groupLabels: Array<MobileTodoDynamic['group']> = ['今天', '昨天', '更早']
  return groupLabels
    .map(label => {
      const items = todoDynamics.value.filter(item => item.group === label)
      return {
        label,
        count: `${items.length} 条`,
        items,
      }
    })
    .filter(group => group.items.length > 0)
})

function goBack() {
  uni.navigateBack()
}

function showFilter() {
  isFilterOpen.value = true
}

function closeFilter() {
  isFilterOpen.value = false
}

function applyFilter() {
  isFilterOpen.value = false
}

const isFilterOpen = ref(false)

function selectType(type: '全部' | MobileTodoDynamicType) {
  setTodoDynamicFilter({ type })
}

function selectTime(time: MobileTodoDynamicTimeFilter) {
  setTodoDynamicFilter({ time })
}

function selectCategory(category: MobileTodoDynamicCategoryFilter) {
  setTodoDynamicFilter({ category })
}

function resetFilter() {
  resetTodoDynamicFilter()
  isFilterOpen.value = false
}

function showDynamic(item: MobileTodoDynamic) {
  uni.showToast({ title: `动态详情为本地模拟：${item.title}`, icon: 'none' })
}
</script>

<template>
  <MobilePageShell class="dynamics-page" active="todo">
    <MobileNavbar title="全部动态" @back="goBack">
      <template #right>
      <button class="filter-button" @tap="showFilter">
        <MobileIcon class="filter-button__icon" name="filter" tone="dark" size="plain" shape="none" />
        <text>筛选</text>
      </button>
      </template>
    </MobileNavbar>

    <wd-tabs v-model="activeTypeIndex" class="filter-tabs" color="#04a851" inactive-color="#111827" :line-width="0">
      <wd-tab v-for="(filter, index) in filters" :key="filter" :name="index" :title="filter" />
    </wd-tabs>

    <view v-for="group in groups" :key="group.label" class="date-group">
      <view class="date-head">
        <view class="date-title">
          <view class="date-dot"></view>
          <text>{{ group.label }}</text>
        </view>
        <text class="date-count">{{ group.count }}</text>
      </view>

      <MobileCard v-for="item in group.items" :key="item.title" class="dynamic-card" @tap="showDynamic(item)">
        <MobileIcon class="dynamic-icon" :name="item.icon" :tone="item.tone" size="sm" shape="circle" />
        <view class="dynamic-body">
          <text class="dynamic-title">{{ item.title }}</text>
          <text class="dynamic-desc">{{ item.desc }}</text>
          <text class="dynamic-category" :class="`dynamic-category--${item.tone}`">{{ item.category }}</text>
        </view>
        <text class="dynamic-time">{{ item.time }}</text>
        <wd-icon class="dynamic-arrow" name="chevron-right" size="26rpx" color="#050812" />
      </MobileCard>
    </view>

    <wd-popup v-model="isFilterOpen" position="bottom" safe-area-inset-bottom :z-index="80" custom-class="filter-popup">
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
          class="option-row option-row--time option-radio-group"
          :model-value="todoState.dynamicFilter.time"
          shape="button"
          checked-color="#04a851"
          @change="selectTime"
        >
          <wd-radio
            v-for="option in timeOptions"
            :key="option"
            class="option-radio"
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
            class="option-radio option-radio--compact"
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
        <MobileActionButton class="drawer-action drawer-action--reset" variant="outline" @tap="resetFilter">重置</MobileActionButton>
        <MobileActionButton class="drawer-action drawer-action--apply" variant="primary" @tap="applyFilter">查看结果（{{ resultCount }}）</MobileActionButton>
      </view>
    </view>
    </wd-popup>
  </MobilePageShell>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.dynamics-page {
  padding-top: calc(var(--status-bar-height) + 8rpx);
  padding-bottom: calc(150rpx + env(safe-area-inset-bottom));
  background: linear-gradient(180deg, #fefffe 0%, #f7fbff 100%);
}

.nav-head,
.filter-button,
.date-head,
.date-title,
.dynamic-card {
  display: flex;
  align-items: center;
}


.nav-head {
  height: 88rpx;
  justify-content: space-between;
}

.filter-button {
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
}

.filter-button::after {
  display: none;
  border: 0;
}

.nav-title {
  color: #10172d;
  font-size: 42rpx;
  font-weight: 900;
  letter-spacing: 0;
}

.filter-button {
  width: 96rpx;
  height: 72rpx;
  justify-content: flex-end;
  gap: 10rpx;
  color: #111827;
  font-size: 27rpx;
  font-weight: 800;
  line-height: 1;
}

.filter-button__icon {
  width: 28rpx;
  height: 30rpx;
}

.filter-tabs {
  height: 74rpx;
  margin: 10rpx -6rpx 24rpx;
  padding: 8rpx 10rpx;
  border: 1rpx solid #edf1f6;
  border-radius: 38rpx;
  background: rgba(255, 255, 255, 0.92);
  box-shadow: 0 14rpx 38rpx rgba(34, 48, 80, 0.06);
}

.filter-tabs :deep(.wd-tabs__nav) {
  background: transparent;
}

.filter-tabs :deep(.wd-tabs__nav-container) {
  display: flex;
  justify-content: space-between;
}

.filter-tabs :deep(.wd-tabs__nav-item) {
  height: 58rpx;
  min-width: 118rpx;
  border-radius: 30rpx;
  font-size: 27rpx;
  font-weight: 900;
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

.date-group {
  margin-top: 22rpx;
}

.date-head {
  justify-content: space-between;
  padding: 0 2rpx 12rpx;
}

.date-title {
  gap: 15rpx;
  color: #111827;
  font-size: 32rpx;
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
  min-height: 96rpx;
  margin-top: 10rpx;
  padding: 22rpx;
  border-radius: 24rpx;
}

.dynamic-icon {
  flex: 0 0 auto;
  width: 66rpx;
  height: 66rpx;
}

.dynamic-body {
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
  margin-left: 20rpx;
}

.dynamic-title {
  color: #111827;
  font-size: 28rpx;
  font-weight: 900;
  line-height: 1.25;
}

.dynamic-desc {
  margin-top: 7rpx;
  color: #2b3240;
  font-size: 24rpx;
  line-height: 1.3;
}

.dynamic-category {
  margin-top: 8rpx;
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

.dynamic-category--purple {
  color: #7047e8;
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
  margin-left: 16rpx;
}

.filter-drawer {
  padding: 26rpx 34rpx calc(28rpx + env(safe-area-inset-bottom));
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
  display: flex;
  height: 58rpx;
  align-items: center;
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
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
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

.option-row,
.option-grid {
  display: flex;
  gap: 16rpx;
  margin-top: 30rpx;
}

.option-row {
  justify-content: space-between;
}

.option-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  row-gap: 24rpx;
}

.option-radio-group :deep(.wd-radio) {
  margin: 0;
}

.option-radio :deep(.wd-radio__label) {
  box-sizing: border-box;
  height: 74rpx;
  min-width: 120rpx;
  margin: 0;
  padding: 0 18rpx;
  border: 1rpx solid #e0e5ed;
  border-radius: 16rpx;
  background: #fff;
  color: #2b3240;
  font-size: 28rpx;
  font-weight: 700;
  line-height: 74rpx;
  text-align: center;
  white-space: nowrap;
}

.option-radio--compact :deep(.wd-radio__label) {
  min-width: 116rpx;
  padding: 0 14rpx;
}

.option-radio--grid :deep(.wd-radio__label) {
  width: 100%;
  min-width: 0;
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
  display: flex;
  gap: 34rpx;
  margin: 68rpx -2rpx 0;
  padding-top: 32rpx;
  border-top: 1rpx solid #edf1f6;
}

.drawer-action {
  flex: 1;
  height: 76rpx;
  border-radius: 18rpx;
  font-size: 31rpx;
}

.drawer-action--apply {
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
    padding: 17rpx;
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
    min-width: 116rpx;
    padding: 0 14rpx;
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
