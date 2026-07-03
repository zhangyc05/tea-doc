<script setup lang="ts">
import { computed, ref } from 'vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobilePageShell from '../../../components/MobilePageShell.vue'
import MobileActionButton from '../../../components/MobileActionButton.vue'
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

function showDynamic(title: string) {
  uni.showToast({ title, icon: 'none' })
}
</script>

<template>
  <MobilePageShell class="dynamics-page" active="todo">
    <MobileNavbar title="全部动态" @back="goBack">
      <template #right>
      <button class="filter-button" @tap="showFilter">
        <view class="filter-button__icon"></view>
        <text>筛选</text>
      </button>
      </template>
    </MobileNavbar>

    <view class="filter-tabs">
      <button
        v-for="(filter, index) in filters"
        :key="filter"
        class="filter-tab"
        :class="{ 'filter-tab--active': todoState.dynamicFilter.type === filter }"
        @tap="selectType(filter)"
      >
        {{ filter }}
      </button>
    </view>

    <view v-for="group in groups" :key="group.label" class="date-group">
      <view class="date-head">
        <view class="date-title">
          <view class="date-dot"></view>
          <text>{{ group.label }}</text>
        </view>
        <text class="date-count">{{ group.count }}</text>
      </view>

      <MobileCard v-for="item in group.items" :key="item.title" class="dynamic-card" @tap="showDynamic(item.title)">
        <view class="dynamic-icon" :class="[`dynamic-icon--${item.tone}`, `dynamic-icon--${item.icon}`]">
          <view class="dynamic-icon__glyph"></view>
        </view>
        <view class="dynamic-body">
          <text class="dynamic-title">{{ item.title }}</text>
          <text class="dynamic-desc">{{ item.desc }}</text>
          <text class="dynamic-category" :class="`dynamic-category--${item.tone}`">{{ item.category }}</text>
        </view>
        <text class="dynamic-time">{{ item.time }}</text>
        <view class="dynamic-arrow"></view>
      </MobileCard>
    </view>

    <view v-if="isFilterOpen" class="filter-overlay" @tap="closeFilter"></view>
    <view v-if="isFilterOpen" class="filter-drawer">
      <view class="drawer-handle"></view>
      <view class="drawer-head">
        <text class="drawer-title">筛选</text>
        <button class="drawer-close" aria-label="关闭筛选" @tap="closeFilter"></button>
      </view>

      <view class="filter-section">
        <text class="filter-section__title">时间范围</text>
        <view class="option-row option-row--time">
          <button
            v-for="option in timeOptions"
            :key="option"
            class="option-pill"
            :class="{ 'option-pill--active': todoState.dynamicFilter.time === option }"
            @tap="selectTime(option)"
          >
            {{ option }}
          </button>
        </view>
      </view>

      <view class="filter-section">
        <text class="filter-section__title">更新类型</text>
        <view class="option-row">
          <button
            v-for="option in typeOptions"
            :key="option"
            class="option-pill option-pill--compact"
            :class="{ 'option-pill--active': todoState.dynamicFilter.type === option }"
            @tap="selectType(option)"
          >
            {{ option }}
          </button>
        </view>
      </view>

      <view class="filter-section">
        <text class="filter-section__title">相关分类</text>
        <view class="option-grid">
          <button
            v-for="option in categoryOptions"
            :key="option"
            class="option-pill option-pill--grid"
            :class="{ 'option-pill--active': todoState.dynamicFilter.category === option }"
            @tap="selectCategory(option)"
          >
            {{ option }}
          </button>
        </view>
      </view>

      <view class="drawer-actions">
        <MobileActionButton class="drawer-action drawer-action--reset" variant="outline" @tap="resetFilter">重置</MobileActionButton>
        <MobileActionButton class="drawer-action drawer-action--apply" variant="primary" @tap="applyFilter">查看结果（{{ resultCount }}）</MobileActionButton>
      </view>
    </view>
  </MobilePageShell>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.dynamics-page {
  padding-top: calc(var(--status-bar-height) + 8rpx);
  background: linear-gradient(180deg, #fefffe 0%, #f7fbff 100%);
}

.system-status,
.system-status__icons,
.nav-head,
.filter-button,
.filter-tabs,
.date-head,
.date-title,
.dynamic-card {
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

.nav-head {
  height: 88rpx;
  justify-content: space-between;
}

.back-button,
.filter-button,
.filter-tab {
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
}

.back-button {
  position: relative;
  width: 72rpx;
  height: 72rpx;
}

.back-button::after,
.filter-button::after,
.filter-tab::after {
  display: none;
  border: 0;
}

.back-button__icon {
  position: absolute;
  top: 20rpx;
  left: 22rpx;
  width: 28rpx;
  height: 28rpx;
  border-bottom: 6rpx solid #0b122a;
  border-left: 6rpx solid #0b122a;
  transform: rotate(45deg);
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
  position: relative;
  width: 28rpx;
  height: 30rpx;
}

.filter-button__icon::before {
  position: absolute;
  top: 0;
  left: 2rpx;
  width: 24rpx;
  height: 18rpx;
  border: 4rpx solid #111827;
  border-bottom: 0;
  border-radius: 4rpx 4rpx 0 0;
  clip-path: polygon(0 0, 100% 0, 66% 100%, 34% 100%);
  content: '';
}

.filter-button__icon::after {
  position: absolute;
  left: 11rpx;
  bottom: 0;
  width: 6rpx;
  height: 14rpx;
  border-radius: 999rpx;
  background: #111827;
  content: '';
}

.filter-tabs {
  height: 74rpx;
  justify-content: space-between;
  margin: 10rpx -6rpx 24rpx;
  padding: 8rpx 10rpx;
  border: 1rpx solid #edf1f6;
  border-radius: 38rpx;
  background: rgba(255, 255, 255, 0.92);
  box-shadow: 0 14rpx 38rpx rgba(34, 48, 80, 0.06);
}

.filter-tab {
  display: flex;
  height: 58rpx;
  min-width: 118rpx;
  align-items: center;
  justify-content: center;
  border-radius: 30rpx;
  color: #111827;
  font-size: 27rpx;
  font-weight: 900;
  line-height: 1;
  white-space: nowrap;
}

.filter-tab--active {
  background: linear-gradient(135deg, #16c96c, #02ad53);
  color: #fff;
  box-shadow: 0 12rpx 28rpx rgba(5, 181, 85, 0.22);
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
  min-height: 96rpx;
  margin-top: 10rpx;
  padding: 18rpx;
  border-radius: 18rpx;
}

.dynamic-icon {
  position: relative;
  flex: 0 0 auto;
  width: 66rpx;
  height: 66rpx;
  border-radius: 50%;
}

.dynamic-icon--green {
  background: #e7faef;
  color: #0fb35b;
}

.dynamic-icon--blue {
  background: #e9f3ff;
  color: #1478f2;
}

.dynamic-icon--orange {
  background: #fff1e6;
  color: #ff7a13;
}

.dynamic-icon--purple {
  background: #f0e8ff;
  color: #7b45ec;
}

.dynamic-icon__glyph {
  position: absolute;
  inset: 19rpx;
  border-radius: 8rpx;
  background: currentColor;
}

.dynamic-icon--check .dynamic-icon__glyph::after {
  position: absolute;
  top: 12rpx;
  left: 10rpx;
  width: 19rpx;
  height: 10rpx;
  border-bottom: 6rpx solid #fff;
  border-left: 6rpx solid #fff;
  content: '';
  transform: rotate(-45deg);
}

.dynamic-icon--book .dynamic-icon__glyph,
.dynamic-icon--building .dynamic-icon__glyph {
  border-radius: 50% 8rpx 8rpx 50%;
}

.dynamic-icon--star .dynamic-icon__glyph {
  clip-path: polygon(50% 0, 62% 34%, 98% 36%, 69% 56%, 79% 91%, 50% 70%, 21% 91%, 31% 56%, 2% 36%, 38% 34%);
}

.dynamic-icon--edit .dynamic-icon__glyph {
  transform: skew(-12deg);
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
  flex: 0 0 auto;
  width: 18rpx;
  height: 18rpx;
  margin-left: 16rpx;
  border-top: 6rpx solid #050812;
  border-right: 6rpx solid #050812;
  transform: rotate(45deg);
}

.filter-overlay {
  position: fixed;
  z-index: 80;
  inset: 0;
  background: rgba(0, 0, 0, 0.58);
}

.filter-drawer {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 81;
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
  width: 58rpx;
  height: 58rpx;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
}

.drawer-close::before,
.drawer-close::after {
  position: absolute;
  top: 27rpx;
  left: 11rpx;
  width: 38rpx;
  height: 4rpx;
  border-radius: 999rpx;
  background: #5b6472;
  content: '';
}

.drawer-close::before {
  transform: rotate(45deg);
}

.drawer-close::after {
  transform: rotate(-45deg);
}

.drawer-close::after {
  border: 0;
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

.option-pill {
  display: flex;
  box-sizing: border-box;
  height: 74rpx;
  min-width: 120rpx;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0 18rpx;
  border: 1rpx solid #e0e5ed;
  border-radius: 16rpx;
  background: #fff;
  color: #2b3240;
  font-size: 28rpx;
  font-weight: 700;
  line-height: 1;
  white-space: nowrap;
}

.option-pill::after {
  display: none;
  border: 0;
}

.option-pill--compact {
  min-width: 116rpx;
  padding: 0 14rpx;
}

.option-pill--grid {
  width: 100%;
  min-width: 0;
}

.option-pill--active {
  border: 2rpx solid $teacher-mobile-primary;
  background: #effff5;
  color: $teacher-mobile-primary-dark;
  font-weight: 900;
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

  .filter-tab {
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

  .option-pill {
    height: 66rpx;
    min-width: 116rpx;
    padding: 0 14rpx;
    font-size: 24rpx;
  }

  .option-grid {
    gap: 18rpx;
  }

  .drawer-actions {
    gap: 24rpx;
  }
}
</style>
