<script setup lang="ts">
import { reactive, ref } from 'vue'

import { Button, Input, Select, SelectItem } from '@/components/ui'

interface FilterOptionItem {
  label: string
  value: string
}

interface FilterOption {
  key: string
  label: string
  type: 'select' | 'date' | 'search'
  placeholder?: string
  options?: FilterOptionItem[]
}

const props = withDefaults(
  defineProps<{
    searchPlaceholder?: string
    filters?: FilterOption[]
  }>(),
  {
    searchPlaceholder: '搜索关键词',
    filters: () => [],
  },
)

const emit = defineEmits<{
  (event: 'search', keyword: string): void
  (event: 'change', values: Record<string, string>): void
  (event: 'reset'): void
}>()

const keyword = ref('')
const values = reactive<Record<string, string>>({})

function emitChange() {
  emit('change', { ...values })
}

function handleSearch() {
  emit('search', keyword.value.trim())
}

function handleReset() {
  keyword.value = ''
  props.filters.forEach((filter) => {
    values[filter.key] = ''
  })
  emit('reset')
  emitChange()
}
</script>

<template>
  <section class="rounded-xl border border-card-border bg-card p-4 shadow-card">
    <div class="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <div class="flex min-w-0 flex-1 flex-col gap-3 md:flex-row md:flex-wrap md:items-center">
        <div class="flex w-full min-w-[240px] max-w-sm items-center gap-2">
          <Input
            v-model="keyword"
            type="search"
            :placeholder="searchPlaceholder"
            @keyup.enter="handleSearch"
          />
          <Button variant="secondary" @click="handleSearch">搜索</Button>
        </div>

        <label
          v-for="filter in filters.slice(0, 5)"
          :key="filter.key"
          class="flex min-w-[180px] flex-col gap-1 text-sm text-text-secondary"
        >
          <span>{{ filter.label }}</span>

          <Select
            v-if="filter.type === 'select'"
            v-model="values[filter.key]"
            :aria-label="filter.label"
            @update:modelValue="emitChange"
          >
            <SelectItem value="">{{ filter.placeholder || '全部' }}</SelectItem>
            <SelectItem v-for="option in filter.options || []" :key="option.value" :value="option.value">
              {{ option.label }}
            </SelectItem>
          </Select>

          <Input
            v-else-if="filter.type === 'date'"
            v-model="values[filter.key]"
            type="date"
            :aria-label="filter.label"
            @update:modelValue="emitChange"
          />

          <Input
            v-else
            v-model="values[filter.key]"
            type="search"
            :placeholder="filter.placeholder || filter.label"
            :aria-label="filter.label"
            @keyup.enter="emitChange"
          />
        </label>
      </div>

      <div class="flex shrink-0 items-center justify-end gap-2">
        <Button variant="ghost" @click="handleReset">重置</Button>
        <slot name="actions" />
      </div>
    </div>
  </section>
</template>
