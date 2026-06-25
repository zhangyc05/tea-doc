<script setup lang="ts">
import { computed } from 'vue'

import { Button } from '@/components/ui'

type DetailSheetWidth = 'sm' | 'md' | 'lg' | 'xl'
type DetailSheetMode = 'view' | 'edit' | 'confirm'

const props = withDefaults(
  defineProps<{
    open: boolean
    title: string
    description?: string
    width?: DetailSheetWidth
    mode?: DetailSheetMode
  }>(),
  {
    description: '',
    width: 'md',
    mode: 'view',
  },
)

const emit = defineEmits<{
  (event: 'update:open', value: boolean): void
  (event: 'confirm'): void
  (event: 'cancel'): void
}>()

const widthClass = computed(() => {
  const classMap: Record<DetailSheetWidth, string> = {
    sm: 'w-[360px]',
    md: 'w-[480px]',
    lg: 'w-[640px]',
    xl: 'w-[760px]',
  }

  return classMap[props.width]
})

const confirmText = computed(() => {
  if (props.mode === 'edit') return '保存'
  if (props.mode === 'confirm') return '确认'
  return '完成'
})

function close() {
  emit('update:open', false)
}

function handleCancel() {
  emit('cancel')
  close()
}

function handleConfirm() {
  emit('confirm')
  close()
}
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="fixed inset-0 z-50">
      <button
        type="button"
        aria-label="关闭抽屉"
        class="absolute inset-0 bg-black/20"
        @click="handleCancel"
      />

      <aside
        class="absolute right-0 top-0 flex h-full max-w-[92vw] flex-col border-l border-card-border bg-card text-text-primary shadow-floating"
        :class="widthClass"
      >
        <header class="border-b border-card-border px-6 py-5">
          <div class="flex items-start justify-between gap-4">
            <div class="min-w-0">
              <h2 class="m-0 text-lg font-semibold leading-tight">{{ title }}</h2>
              <p v-if="description" class="mt-2 text-sm leading-relaxed text-text-secondary">
                {{ description }}
              </p>
            </div>
            <button
              type="button"
              class="rounded-md px-2 py-1 text-sm text-text-tertiary transition-colors hover:bg-page-soft hover:text-text-primary"
              @click="handleCancel"
            >
              关闭
            </button>
          </div>
        </header>

        <main class="min-h-0 flex-1 overflow-y-auto px-6 py-5">
          <slot />
        </main>

        <footer class="flex shrink-0 justify-end gap-2 border-t border-card-border bg-card px-6 py-4">
          <slot name="footer">
            <Button variant="outline" @click="handleCancel">取消</Button>
            <Button @click="handleConfirm">{{ confirmText }}</Button>
          </slot>
        </footer>
      </aside>
    </div>
  </Teleport>
</template>
