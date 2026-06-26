<template>
  <div class="component-showcase">
    <div v-if="filteredComponents.length === 0" class="showcase-empty">
      <div class="empty-icon">📦</div>
      <h3>暂无组件</h3>
      <p>该分类下暂无组件文档</p>
    </div>

    <div v-else class="showcase-list">
      <div
        v-for="component in filteredComponents"
        :key="component.name"
        class="showcase-item"
      >
        <!-- Component Header -->
        <div class="showcase-header">
          <h2 class="component-name">{{ component.name }}</h2>
          <p v-if="component.description" class="component-description">
            {{ component.description }}
          </p>
          <div v-if="component.variants && component.variants.length > 0" class="component-variants">
            <span
              v-for="variant in component.variants"
              :key="variant"
              class="variant-badge"
            >
              {{ variant }}
            </span>
          </div>
        </div>

        <!-- Preview Panel -->
        <PreviewPanel :component="component">
          <template #default="{ state }">
            <component :is="renderComponent(component, state)" />
          </template>
        </PreviewPanel>

        <!-- Examples Section -->
        <div v-if="component.examples && component.examples.length > 0" class="showcase-examples">
          <h3>示例</h3>
          <div
            v-for="(example, index) in component.examples"
            :key="index"
            class="example-item"
          >
            <div class="example-header">
              <h4>{{ example.title }}</h4>
              <p v-if="example.description">{{ example.description }}</p>
            </div>
            <CodeViewer :code="example.code" language="vue" />
          </div>
        </div>

        <!-- Props Section -->
        <div v-if="component.props && component.props.length > 0" class="showcase-props">
          <h3>Props</h3>
          <table class="props-table">
            <thead>
              <tr>
                <th>名称</th>
                <th>类型</th>
                <th>默认值</th>
                <th>说明</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="prop in component.props" :key="prop.name">
                <td><code>{{ prop.name }}</code></td>
                <td><code>{{ prop.type }}</code></td>
                <td><code>{{ prop.default || '-' }}</code></td>
                <td>{{ prop.description }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Events Section -->
        <div v-if="component.events && component.events.length > 0" class="showcase-events">
          <h3>Events</h3>
          <table class="events-table">
            <thead>
              <tr>
                <th>名称</th>
                <th>说明</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="event in component.events" :key="event.name">
                <td><code>{{ event.name }}</code></td>
                <td>{{ event.description }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Slots Section -->
        <div v-if="component.slots && component.slots.length > 0" class="showcase-slots">
          <h3>Slots</h3>
          <table class="slots-table">
            <thead>
              <tr>
                <th>名称</th>
                <th>说明</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="slot in component.slots" :key="slot.name">
                <td><code>{{ slot.name }}</code></td>
                <td>{{ slot.description }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, h } from 'vue'
import CodeViewer from './CodeViewer.vue'
import PreviewPanel from './PreviewPanel.vue'
import {
  Button,
  Input,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Badge,
} from '@/components/ui'
import type { ComponentShowcase, PreviewState } from '@/lib/design-system/types'

interface Props {
  category: string
  components: ComponentShowcase[]
}

const props = defineProps<Props>()

// Filter components by category
const filteredComponents = computed(() => {
  // Add error handling for empty components array
  if (!props.components || props.components.length === 0) {
    return []
  }
  return props.components.filter(component => component.category === props.category)
})

// Render component for preview based on component name and state
const renderComponent = (component: ComponentShowcase, state: PreviewState) => {
  const { name } = component

  switch (name) {
    case 'Button': {
      return {
        setup() {
          return () => h(Button, {
            variant: (state.variant as any) || 'default',
            size: (state.size as any) || 'md',
          }, () => '点击按钮')
        }
      }
    }

    case 'Input': {
      return {
        setup() {
          return () => h(Input, {
            placeholder: '请输入内容...',
            disabled: state.disabled || false,
          })
        }
      }
    }

    case 'Card': {
      return {
        setup() {
          return () => h(Card, {}, () => [
            h(CardHeader, {}, () => [
              h(CardTitle, {}, () => '卡片标题'),
              h(CardDescription, {}, () => '这是卡片的描述文本，用于说明卡片内容的主要信息。'),
            ]),
            h(CardContent, {}, () => '这是卡片的主要内容区域，可以放置任何信息。'),
          ])
        }
      }
    }

    case 'Badge': {
      return {
        setup() {
          return () => h(Badge, {
            variant: (state.variant as any) || 'default',
          }, () => {
            const variantLabels: Record<string, string> = {
              default: '默认',
              success: '成功',
              warning: '警告',
              danger: '危险',
              info: '信息',
              purple: '紫色',
              neutral: '中性',
              outline: '轮廓',
            }
            return variantLabels[state.variant as string] || '徽章'
          })
        }
      }
    }

    default: {
      return {
        setup() {
          return () => h('div', { class: 'preview-placeholder' }, `${component.name} 预览`)
        }
      }
    }
  }
}
</script>

<style scoped>
.component-showcase {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* Empty State */
.showcase-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
  background: var(--color-card-bg);
  border: 1px solid var(--color-card-border);
  border-radius: 12px;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.showcase-empty h3 {
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.showcase-empty p {
  margin: 0;
  font-size: 14px;
  color: var(--color-text-primary);
  opacity: 0.7;
}

/* Showcase List */
.showcase-list {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.showcase-item {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
  background: var(--color-card-bg);
  border: 1px solid var(--color-card-border);
  border-radius: 12px;
  transition: all 0.2s ease;
}

.showcase-item:hover {
  @apply shadow-md;
}

/* Component Header */
.showcase-header {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--color-card-border);
}

.component-name {
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  color: var(--color-text-primary);
}

.component-description {
  margin: 0;
  font-size: 14px;
  color: var(--color-text-primary);
  opacity: 0.8;
  line-height: 1.5;
}

.component-variants {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.variant-badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  background: var(--color-page-bg);
  border: 1px solid var(--color-card-border);
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  color: var(--color-text-primary);
}

/* Examples Section */
.showcase-examples {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.showcase-examples > h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.example-item {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  background: var(--color-page-bg);
  border: 1px solid var(--color-card-border);
  border-radius: 8px;
}

.example-header {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.example-header h4 {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.example-header p {
  margin: 0;
  font-size: 13px;
  color: var(--color-text-primary);
  opacity: 0.7;
}

/* Props, Events, Slots Tables */
.showcase-props,
.showcase-events,
.showcase-slots {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.showcase-props > h3,
.showcase-events > h3,
.showcase-slots > h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.props-table,
.events-table,
.slots-table {
  width: 100%;
  border-collapse: collapse;
  background: var(--color-page-bg);
  border: 1px solid var(--color-card-border);
  border-radius: 8px;
  overflow: hidden;
}

.props-table th,
.props-table td,
.events-table th,
.events-table td,
.slots-table th,
.slots-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid var(--color-card-border);
}

.props-table th,
.events-table th,
.slots-table th {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-primary);
  background: var(--color-page-bg);
  border-bottom: 2px solid var(--color-card-border);
}

.props-table td,
.events-table td,
.slots-table td {
  font-size: 13px;
  color: var(--color-text-primary);
}

.props-table td code,
.events-table td code,
.slots-table td code {
  padding: 2px 6px;
  background: var(--color-primary);
  color: white;
  border-radius: 4px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 12px;
}

.props-table tr:last-child td,
.events-table tr:last-child td,
.slots-table tr:last-child td {
  border-bottom: none;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .showcase-item {
    padding: 16px;
    gap: 20px;
  }

  .component-name {
    font-size: 20px;
  }

  .component-description {
    font-size: 13px;
  }

  .showcase-examples > h3,
  .showcase-props > h3,
  .showcase-events > h3,
  .showcase-slots > h3 {
    font-size: 16px;
  }

  .props-table th,
  .props-table td,
  .events-table th,
  .events-table td,
  .slots-table th,
  .slots-table td {
    padding: 10px 12px;
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .component-showcase {
    gap: 16px;
  }

  .showcase-list {
    gap: 24px;
  }

  .showcase-item {
    padding: 12px;
    gap: 16px;
  }

  .component-name {
    font-size: 18px;
  }

  .showcase-empty {
    padding: 40px 16px;
  }

  .empty-icon {
    font-size: 36px;
  }

  .showcase-empty h3 {
    font-size: 16px;
  }

  .showcase-empty p {
    font-size: 13px;
  }

  .props-table th,
  .props-table td,
  .events-table th,
  .events-table td,
  .slots-table th,
  .slots-table td {
    padding: 8px 10px;
    font-size: 11px;
  }
}
</style>
