<template>
  <div class="code-viewer">
    <div class="code-header">
      <div class="language-badge">
        {{ displayLanguage }}
      </div>
      <button
        class="copy-button"
        :class="{ copied: copied }"
        @click="handleCopy"
        :disabled="copied"
      >
        <span class="copy-icon">{{ copied ? '✓' : '📋' }}</span>
        <span class="copy-text">{{ copied ? '已复制!' : '复制代码' }}</span>
      </button>
    </div>
    <div class="code-content">
      <pre class="code-block"><code v-html="highlightedCode"></code></pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'
import { formatCodeForDisplay } from '@/lib/design-system/code-formatter'
import { copyToClipboard } from '@/lib/design-system/utils'
import type { CodeLanguage } from '@/lib/design-system/code-formatter'

interface Props {
  code: string
  language?: CodeLanguage
}

const props = defineProps<Props>()

const copied = ref(false)
let copyTimeout: ReturnType<typeof setTimeout> | null = null

// Format code for display with syntax highlighting
const highlightedCode = computed(() => {
  const { formatted } = formatCodeForDisplay(props.code, props.language)
  return formatted
})

// Detect language - converted to computed property for reactivity
const detectedLanguage = computed(() => {
  const { detectedLanguage: lang } = formatCodeForDisplay(props.code, props.language)
  return lang
})

// Display language name in Chinese
const displayLanguage = computed(() => {
  const languageMap: Record<CodeLanguage, string> = {
    vue: 'Vue',
    typescript: 'TypeScript',
    html: 'HTML',
    json: 'JSON'
  }
  return languageMap[detectedLanguage.value] || detectedLanguage.value
})

// Handle copy to clipboard
const handleCopy = async () => {
  const success = await copyToClipboard(props.code)
  if (success) {
    copied.value = true
    copyTimeout = setTimeout(() => {
      copied.value = false
    }, 2000)
  } else {
    console.error('Failed to copy code')
  }
}

// Clear timeout on unmount to prevent memory leaks
onUnmounted(() => {
  if (copyTimeout) {
    clearTimeout(copyTimeout)
  }
})
</script>

<style scoped>
.code-viewer {
  @apply border border-card-border rounded-lg overflow-hidden;
  background: var(--color-card-bg);
  transition: all 0.2s ease;
}

.code-viewer:hover {
  @apply shadow-md;
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: var(--color-page-bg);
  border-bottom: 1px solid var(--color-card-border);
}

.language-badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 4px;
  background: var(--color-primary);
  color: white;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.copy-button {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border: 1px solid var(--color-card-border);
  border-radius: 6px;
  background: var(--color-card-bg);
  color: var(--color-text-primary);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.copy-button:hover:not(:disabled) {
  background: var(--color-page-bg);
  border-color: var(--color-primary);
}

.copy-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.copy-button.copied {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: white;
}

.copy-icon {
  font-size: 14px;
}

.copy-text {
  font-size: 12px;
}

.code-content {
  padding: 16px;
  background: #1e1e1e;
  overflow-x: auto;
}

.code-block {
  margin: 0;
  padding: 0;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 13px;
  line-height: 1.6;
  color: #d4d4d4;
  white-space: pre;
  overflow-x: auto;
}

/* Syntax highlighting styles */
.code-block :deep(.code-comment) {
  color: #6a9955;
  font-style: italic;
}

.code-block :deep(.code-keyword) {
  color: #569cd6;
  font-weight: 600;
}

.code-block :deep(.code-string) {
  color: #ce9178;
}

.code-block :deep(.code-tag) {
  color: #4ec9b0;
}
</style>
