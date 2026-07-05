<script setup lang="ts">
import { computed, ref } from 'vue'
import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobileIcon from '../../../components/MobileIcon.vue'
import MobileNavbar from '../../../components/MobileNavbar.vue'
import MobilePageShell from '../../../components/MobilePageShell.vue'
import MobileStatusTag from '../../../components/MobileStatusTag.vue'
import { getTodoActionUrl, getVisibleTodoItems, type MobileTodoItem } from '../../../stores/todoStore'

const visibleTodos = computed(() => getVisibleTodoItems())
const activeFilterIndex = ref(0)
const filters = computed(() => {
  const pendingConfirmCount = visibleTodos.value.filter(item => item.status === 'pending-confirm').length
  const pendingSupplementCount = visibleTodos.value.filter(item => item.status === 'pending-supplement').length
  const improvableCount = visibleTodos.value.filter(item => item.status === 'improvable').length

  return [
    `全部(${visibleTodos.value.length})`,
    `待确认(${pendingConfirmCount})`,
    `待补充(${pendingSupplementCount})`,
    `可完善(${improvableCount})`,
  ]
})
const filteredTodos = computed(() => {
  const statusFilters = [undefined, 'pending-confirm', 'pending-supplement', 'improvable'] as const
  const status = statusFilters[activeFilterIndex.value]
  return status ? visibleTodos.value.filter(item => item.status === status) : visibleTodos.value
})

function goBack() {
  uni.navigateBack()
}

function showTodoAction(item: MobileTodoItem) {
  const actionUrl = getTodoActionUrl(item.id)
  if (actionUrl) {
    uni.navigateTo({ url: actionUrl })
  }
}

</script>

<template>
  <MobilePageShell class="all-todo-page" active="todo">
    <MobileNavbar title="全部待办" @back="goBack" />

    <wd-tabs v-model="activeFilterIndex" class="filter-row" color="#04a851" inactive-color="#4d5871" :line-width="0">
      <wd-tab
        v-for="(filter, index) in filters"
        :key="filter"
        :name="index"
        :title="filter"
      />
    </wd-tabs>

    <MobileCard class="todo-list-card">
      <view v-for="item in filteredTodos" :key="item.id" class="todo-list-row">
        <MobileIcon class="todo-icon" :name="item.icon" :tone="item.tone" size="md" />
        <view class="todo-main">
          <MobileStatusTag :tone="item.tone">{{ item.tag }}</MobileStatusTag>
          <text class="todo-title">{{ item.title }}</text>
          <text class="todo-desc">{{ item.desc }}</text>
        </view>
        <view class="todo-side">
          <text class="todo-state" :class="`todo-state--${item.tone}`">{{ item.state }}</text>
          <MobileActionButton
            class="todo-action"
            variant="outline"
            @tap="showTodoAction(item)"
          >
            {{ item.action }}
          </MobileActionButton>
        </view>
      </view>
    </MobileCard>
  </MobilePageShell>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.all-todo-page {
  padding-top: calc(var(--status-bar-height) + 8rpx);
  padding-bottom: calc(150rpx + env(safe-area-inset-bottom));
}

.nav-head,
.filter-row,
.todo-list-row,
.todo-side,
.todo-action {
  display: flex;
  align-items: center;
}


.nav-head {
  height: 96rpx;
  justify-content: space-between;
}

.back-button,
.back-button {
  position: relative;
  width: 72rpx;
  height: 72rpx;
}

.back-button::after {
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

.nav-spacer {
  width: 72rpx;
}

.filter-row {
  margin: 20rpx 6rpx 24rpx;
}

.filter-row :deep(.wd-tabs__nav) {
  justify-content: space-between;
  gap: 18rpx;
}

.filter-row :deep(.wd-tabs__nav-container) {
  background: transparent;
}

.filter-row :deep(.wd-tabs__nav-item) {
  box-sizing: border-box;
  height: 58rpx;
  min-width: 128rpx;
  margin: 0;
  padding: 0 22rpx;
  border-radius: 16rpx;
  background: rgba(247, 249, 253, 0.92);
  color: #4d5871;
  font-size: 27rpx;
  font-weight: 800;
  line-height: 1;
  white-space: nowrap;
}

.filter-row :deep(.wd-tabs__nav-item.is-active) {
  border: 2rpx solid $teacher-mobile-primary;
  background: #ebfff3;
  color: $teacher-mobile-primary-dark;
}

.filter-row :deep(.wd-tabs__container),
.filter-row :deep(.wd-tabs__line) {
  display: none;
}

.todo-list-card {
  padding: 32rpx;
  border-radius: 32rpx;
}

.todo-list-row {
  gap: 28rpx;
  min-height: 120rpx;
  padding: 12rpx 0 20rpx;
  border-bottom: 1rpx solid #edf1f6;
}

.todo-list-row:last-child {
  border-bottom: 0;
}

.todo-icon {
  flex: 0 0 auto;
  width: 82rpx;
  height: 82rpx;
}

.todo-main {
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
}

.todo-title {
  margin-top: 13rpx;
  color: #080d1e;
  font-size: 32rpx;
  font-weight: 900;
  line-height: 1.2;
}

.todo-desc {
  margin-top: 13rpx;
  color: #52617b;
  font-size: 23rpx;
  line-height: 1.25;
}

.todo-side {
  width: 154rpx;
  flex: 0 0 auto;
  flex-direction: column;
  align-items: flex-end;
}

.todo-state {
  color: #ff1f39;
  font-size: 27rpx;
  font-weight: 900;
  line-height: 1.2;
  white-space: nowrap;
}

.todo-state--orange {
  color: #ff6815;
}

.todo-state--purple {
  color: #ff6815;
}

.todo-action {
  width: 138rpx;
  height: 62rpx;
  margin-top: 24rpx;
  border-radius: 14rpx;
  font-size: 26rpx;
}

@media (max-width: 374px) {
  .filter-row {
    margin-right: 0;
    margin-left: 0;
  }

  .filter-row :deep(.wd-tabs__nav) {
    gap: 10rpx;
  }

  .filter-row :deep(.wd-tabs__nav-item) {
    min-width: 118rpx;
    padding: 0 14rpx;
    font-size: 25rpx;
  }

  .todo-list-card {
    padding: 30rpx 26rpx 16rpx;
  }

  .todo-list-row {
    gap: 20rpx;
  }

  .todo-icon {
    width: 82rpx;
    height: 82rpx;
    border-radius: 22rpx;
  }

  .todo-title {
    font-size: 29rpx;
  }

  .todo-desc {
    font-size: 23rpx;
  }

  .todo-side {
    width: 132rpx;
  }

  .todo-state {
    font-size: 24rpx;
  }

  .todo-action {
    width: 122rpx;
    height: 62rpx;
    font-size: 25rpx;
  }
}
</style>
