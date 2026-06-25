<script setup lang="ts">
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui'

withDefaults(
  defineProps<{
    items?: string[]
  }>(),
  {
    items: () => ['管理端'],
  },
)
</script>

<template>
  <Breadcrumb aria-label="面包屑导航">
    <BreadcrumbList>
      <template v-for="(item, index) in items" :key="`${item}-${index}`">
        <BreadcrumbItem>
          <BreadcrumbPage v-if="index === items.length - 1">{{ item }}</BreadcrumbPage>
          <span v-else class="text-text-secondary">{{ item }}</span>
        </BreadcrumbItem>
        <BreadcrumbSeparator v-if="index < items.length - 1" />
      </template>
    </BreadcrumbList>
  </Breadcrumb>
</template>
