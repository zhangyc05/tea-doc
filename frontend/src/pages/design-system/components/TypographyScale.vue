<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface TypographyScale {
  size: string
  lineHeight: string
  label: string
  variable: string
}

const typographyScales = ref<TypographyScale[]>([])

// Extract typography scales from CSS variables
onMounted(() => {
  const computedStyle = getComputedStyle(document.documentElement)

  // Define the typography scale configuration
  // These correspond to --font-size-* and --line-height-* variables
  const scaleConfig = [
    { label: 'Body Small', sizeVar: '--font-size-xs', lineHeightVar: '--line-height-xs' },
    { label: 'Body Base', sizeVar: '--font-size-sm', lineHeightVar: '--line-height-sm' },
    { label: 'Body Large', sizeVar: '--font-size-base', lineHeightVar: '--line-height-base' },
    { label: 'H3', sizeVar: '--font-size-lg', lineHeightVar: '--line-height-lg' },
    { label: 'H2', sizeVar: '--font-size-xl', lineHeightVar: '--line-height-xl' },
    { label: 'H1', sizeVar: '--font-size-2xl', lineHeightVar: '--line-height-2xl' },
    { label: 'Display', sizeVar: '--font-size-3xl', lineHeightVar: '--line-height-3xl' }
  ]

  typographyScales.value = scaleConfig.map(config => {
    const size = computedStyle.getPropertyValue(config.sizeVar).trim()
    const lineHeight = computedStyle.getPropertyValue(config.lineHeightVar).trim()

    return {
      size: size || '14px',
      lineHeight: lineHeight || '1.5',
      label: config.label,
      variable: config.sizeVar
    }
  })
})
</script>

<template>
  <div class="typography-scale">
    <h2 class="text-xl font-semibold mb-4">Typography Scale</h2>

    <div class="space-y-4">
      <div
        v-for="(scale, index) in typographyScales"
        :key="index"
        class="border-b border-gray-200 pb-4 last:border-0"
      >
        <div class="flex items-baseline justify-between mb-2">
          <!-- Font preview -->
          <div
            class="font-medium"
            :style="{
              fontSize: scale.size,
              lineHeight: scale.lineHeight
            }"
          >
            {{ scale.label }}
          </div>

          <!-- Size and line height info -->
          <div class="text-sm text-gray-500">
            <span class="font-mono">{{ scale.size }}</span>
            <span class="mx-2">/</span>
            <span class="font-mono">{{ scale.lineHeight }}</span>
          </div>
        </div>

        <!-- Variable reference -->
        <div class="text-xs text-gray-400 font-mono">
          {{ scale.variable }}
        </div>
      </div>
    </div>

    <!-- Usage example -->
    <div class="mt-6 p-4 bg-gray-50 rounded-lg">
      <h3 class="text-sm font-semibold mb-2">Usage Example</h3>
      <pre class="text-xs text-gray-600 overflow-x-auto"><code>// Use typography tokens via CSS variables
.text-base {
  font-size: var(--font-size-base);
  line-height: var(--line-height-base);
}

.text-h1 {
  font-size: var(--font-size-2xl);
  line-height: var(--line-height-2xl);
}</code></pre>
    </div>
  </div>
</template>

<style scoped>
.typography-scale {
  /* Component styles handled by Tailwind utilities */
}
</style>
