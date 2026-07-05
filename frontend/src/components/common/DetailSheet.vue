<script setup lang="ts">
import { computed } from 'vue'

import { AdminDrawer } from '@/components/admin-ui'
import { Button } from '@/components/ui'

type DetailSheetWidth = 'sm' | 'md' | 'form' | 'source' | 'history' | 'lg' | 'complex' | 'xl'
type DetailSheetMode = 'view' | 'edit' | 'confirm'
type DetailSheetPlacement = 'full' | 'reader'

const props = withDefaults(
  defineProps<{
    open: boolean
    title: string
    description?: string
    width?: DetailSheetWidth
    mode?: DetailSheetMode
    placement?: DetailSheetPlacement
    showFooter?: boolean
  }>(),
  {
    description: '',
    width: 'md',
    mode: 'view',
    placement: 'full',
    showFooter: true,
  },
)

const emit = defineEmits<{
  (event: 'update:open', value: boolean): void
  (event: 'confirm'): void
  (event: 'cancel'): void
}>()

const drawerSize = computed(() => {
  const sizeMap: Record<DetailSheetWidth, string> = {
    sm: '360px',
    md: '480px',
    form: '540px',
    source: '540px',
    history: '620px',
    lg: '640px',
    complex: '660px',
    xl: '760px',
  }

  return sizeMap[props.width]
})

const drawerClass = computed(() => {
  return props.placement === 'reader' ? 'detail-sheet detail-sheet-reader' : 'detail-sheet'
})

const confirmText = computed(() => {
  if (props.mode === 'edit') return '保存'
  if (props.mode === 'confirm') return '确认'
  return '完成'
})

function close() {
  emit('update:open', false)
}

function handleModelUpdate(value: boolean) {
  if (value) {
    emit('update:open', true)
    return
  }
  handleCancel()
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
  <AdminDrawer
    :model-value="open"
    :title="title"
    :size="drawerSize"
    :class="drawerClass"
    append-to-body
    @update:model-value="handleModelUpdate"
  >
    <p v-if="description" class="detail-sheet-description">
      {{ description }}
    </p>
    <div class="detail-sheet-body">
      <slot />
    </div>

    <template v-if="showFooter" #footer>
      <div class="detail-sheet-footer">
        <slot name="footer">
          <Button variant="outline" @click="handleCancel">取消</Button>
          <Button @click="handleConfirm">{{ confirmText }}</Button>
        </slot>
      </div>
    </template>
  </AdminDrawer>
</template>

<style scoped>
.detail-sheet-description {
  margin: 0 0 16px;
  color: var(--color-admin-text-muted);
  font-size: 14px;
  line-height: 1.6;
}

.detail-sheet-body {
  min-height: 0;
}

.detail-sheet-footer {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-admin-sm);
  padding: 14px 20px;
  border-top: 1px solid var(--color-admin-border);
  background: var(--color-admin-surface);
}
</style>
