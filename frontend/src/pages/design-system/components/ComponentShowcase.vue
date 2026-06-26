<template>
  <div class="component-showcase">
    <div v-if="filteredComponents.length === 0" class="showcase-empty">
      <h3>暂无组件样板</h3>
      <p>该分类下还没有可预览的组件效果。</p>
    </div>

    <div v-else class="showcase-list">
      <section class="showcase-intro">
        <div>
          <p class="eyebrow">组件效果</p>
          <h2>{{ category }}</h2>
          <p>优先查看组件在教师综合发展平台中的真实效果，代码和接口说明默认下沉。</p>
        </div>
        <span class="count-badge">{{ filteredComponents.length }} 个样板</span>
      </section>

      <article
        v-for="component in filteredComponents"
        :key="component.name"
        class="showcase-item"
      >
        <div class="showcase-header">
          <div>
            <h2 class="component-name">{{ component.name }}</h2>
            <p v-if="component.description" class="component-description">
              {{ component.description }}
            </p>
          </div>
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

        <PreviewPanel :component="component">
          <template #default="{ state }">
            <component :is="renderComponent(component, state)" />
          </template>
        </PreviewPanel>

        <div v-if="component.examples && component.examples.length > 0" class="showcase-examples">
          <div class="section-title-row">
            <h3>示例效果</h3>
            <span>用于判断组件在真实页面中的呈现方式</span>
          </div>
          <div class="example-grid">
            <article
              v-for="(example, index) in component.examples"
              :key="index"
              class="example-item"
            >
              <div class="example-header">
                <h4>{{ example.title }}</h4>
                <p v-if="example.description">{{ example.description }}</p>
              </div>
              <div class="example-visual">
                <component :is="renderExampleComponent(component, example)" />
              </div>
              <details class="code-details">
                <summary>查看代码</summary>
                <CodeViewer :code="example.code" language="vue" />
              </details>
            </article>
          </div>
        </div>

        <details v-if="hasApiInfo(component)" class="api-details">
          <summary>查看接口说明</summary>
          <div class="api-grid">
            <div v-if="component.props && component.props.length > 0" class="api-section">
              <h3>Props</h3>
              <table class="api-table">
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

            <div v-if="component.events && component.events.length > 0" class="api-section">
              <h3>Events</h3>
              <table class="api-table">
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

            <div v-if="component.slots && component.slots.length > 0" class="api-section">
              <h3>Slots</h3>
              <table class="api-table">
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
        </details>
      </article>
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
import type { ComponentExample, ComponentShowcase, PreviewState } from '@/lib/design-system/types'

interface Props {
  category: string
  components: ComponentShowcase[]
}

const props = defineProps<Props>()

const filteredComponents = computed(() => {
  if (!props.components || props.components.length === 0) {
    return []
  }

  const matched = props.components.filter(component => component.category === props.category)
  return matched.length > 0 ? matched : props.components
})

const hasApiInfo = (component: ComponentShowcase) => {
  return Boolean(
    component.props?.length ||
    component.events?.length ||
    component.slots?.length
  )
}

const renderExampleComponent = (component: ComponentShowcase, example: ComponentExample) => {
  return renderComponent(component, {
    ...(example.props || {}),
    variant: example.props?.variant || example.props?.scene || component.variants?.[0]
  })
}

const renderComponent = (component: ComponentShowcase, state: PreviewState) => {
  const { name } = component

  switch (name) {
    case 'Button':
      return {
        setup() {
          return () => h('div', { class: 'button-sample-row' }, [
            h(Button, {
              variant: (state.variant as any) || 'primary',
              size: (state.size as any) || 'md',
            }, () => state.label || buttonLabelByVariant(String(state.variant || 'primary'))),
            h('span', { class: 'sample-note' }, '按钮只承载明确动作，避免一页多个强主按钮。')
          ])
        }
      }

    case 'Input':
      return {
        setup() {
          return () => h('div', { class: 'input-sample' }, [
            h(Input, {
              placeholder: state.placeholder || '搜索教师、课程、成果或材料',
              disabled: state.disabled || false,
              modelValue: state.value || ''
            }),
            h('p', '搜索、筛选和少量补充使用输入框；已有系统数据不要求教师重复填写。')
          ])
        }
      }

    case 'Card':
      return {
        setup() {
          return () => h(Card, { class: 'sample-card' }, () => [
            h(CardHeader, {}, () => [
              h(CardTitle, {}, () => state.title || '确认一条培训证书'),
              h(CardDescription, {}, () => state.description || '系统已帮您识别，请确认是否属于本人。'),
            ]),
            h(CardContent, {}, () => h('div', { class: 'card-content-sample' }, [
              h('span', { class: 'status-pill warning' }, '待你确认'),
              h('span', '来源：部门导入培训名单'),
              h('span', '预计用时：约 1 分钟')
            ])),
          ])
        }
      }

    case 'Badge':
      return {
        setup() {
          return () => h('div', { class: 'badge-sample-row' }, [
            h(Badge, { variant: (state.variant as any) || 'warning' }, () => state.label || badgeLabelByVariant(String(state.variant || 'warning'))),
            h(Badge, { variant: 'success' as any }, () => '已正式入档'),
            h(Badge, { variant: 'danger' as any }, () => '异常'),
            h(Badge, { variant: 'info' as any }, () => '系统识别')
          ])
        }
      }

    case '待办事项卡':
      return {
        setup() {
          return () => renderTaskCard(String(state.scene || state.variant || 'teacher'))
        }
      }

    case '统计摘要卡':
      return {
        setup() {
          return () => renderStatSummaryCards()
        }
      }

    case '筛选工具条':
      return {
        setup() {
          return () => renderFilterToolbar()
        }
      }

    case '画像摘要卡':
      return {
        setup() {
          return () => renderProfileSummaryCard()
        }
      }

    case '档案事实卡':
      return {
        setup() {
          return () => renderArchiveFactCard()
        }
      }

    default:
      return {
        setup() {
          return () => h('div', { class: 'preview-placeholder' }, `${component.name} 预览`)
        }
      }
  }
}

const buttonLabelByVariant = (variant: string) => {
  const labels: Record<string, string> = {
    default: '默认按钮',
    primary: '确认入档',
    ghost: '查看详情',
    destructive: '移出记录',
    outline: '查看依据'
  }
  return labels[variant] || '点击按钮'
}

const badgeLabelByVariant = (variant: string) => {
  const labels: Record<string, string> = {
    default: '默认',
    primary: '重点',
    success: '已完成',
    warning: '待确认',
    danger: '异常',
    info: '系统识别'
  }
  return labels[variant] || '状态'
}

const renderTaskCard = (scene: string) => {
  const isAdmin = scene === 'admin'
  return h('div', { class: 'task-card-sample' }, [
    h('div', { class: 'task-card-main' }, [
      h('span', { class: 'status-pill warning' }, isAdmin ? '待部门处理' : '待你确认'),
      h('h3', isAdmin ? '3 条候选数据待核验' : '确认一条培训证书'),
      h('p', isAdmin ? '来源为部门导入材料，需核对教师归属和字段完整性。' : '系统已帮您识别，请确认是否属于本人。'),
      h('div', { class: 'task-meta' }, [
        h('span', isAdmin ? '对象：智能制造学院' : '来源：部门导入培训名单'),
        h('span', isAdmin ? '状态：待核验' : '预计用时：约 1 分钟')
      ])
    ]),
    h(Button, { variant: 'primary' as any }, () => isAdmin ? '去核验' : '去确认')
  ])
}

const renderStatSummaryCards = () => {
  const stats = [
    ['待确认记录', '26', '需要教师或部门确认'],
    ['正式入档', '1,284', '可用于画像和报告'],
    ['材料待完善', '18', '缺证书或来源说明']
  ]
  return h('div', { class: 'stat-card-grid' }, stats.map(([title, value, desc]) =>
    h('div', { class: 'stat-card-sample' }, [
      h('span', title),
      h('strong', value),
      h('p', desc)
    ])
  ))
}

const renderFilterToolbar = () => {
  return h('div', { class: 'filter-toolbar-sample' }, [
    h('div', { class: 'filter-search' }, [
      h(Input, { placeholder: '搜索教师、课程、成果或材料' })
    ]),
    h('button', { class: 'filter-chip active' }, '全部'),
    h('button', { class: 'filter-chip' }, '待确认'),
    h('button', { class: 'filter-chip' }, '正式'),
    h('button', { class: 'filter-chip' }, '异常'),
    h(Button, { variant: 'primary' as any }, () => '导入资料')
  ])
}

const renderProfileSummaryCard = () => {
  return h('div', { class: 'profile-card-sample' }, [
    h('div', { class: 'profile-card-header' }, [
      h('div', [
        h('span', { class: 'status-pill info' }, '发展支持参考'),
        h('h3', '教学实践型教师'),
        h('p', '基于 38 条正式档案事实生成，不作为评价排名。')
      ]),
      h('div', { class: 'profile-score' }, [h('strong', '79'), h('span', '发展指数')])
    ]),
    h('div', { class: 'profile-bars' }, [
      renderAbilityBar('教学', 88),
      renderAbilityBar('教研', 68),
      renderAbilityBar('实践', 79),
      renderAbilityBar('服务', 72)
    ]),
    h('div', { class: 'profile-actions' }, [
      h(Button, { variant: 'primary' as any }, () => '查看画像'),
      h(Button, { variant: 'outline' as any }, () => '查看依据')
    ])
  ])
}

const renderAbilityBar = (label: string, value: number) => {
  return h('div', { class: 'ability-row' }, [
    h('span', label),
    h('div', { class: 'ability-track' }, [h('i', { style: { width: `${value}%` } })]),
    h('strong', String(value))
  ])
}

const renderArchiveFactCard = () => {
  return h('div', { class: 'archive-card-sample' }, [
    h('div', { class: 'archive-card-title' }, [
      h('span', { class: 'status-pill success' }, '已正式入档'),
      h('h3', '省级精品在线开放课程建设')
    ]),
    h('p', '来源：教务项目系统｜确认时间：2026-06-18｜维度：教研科研'),
    h('div', { class: 'archive-grid' }, [
      h('span', '课程级别：省级'),
      h('span', '本人角色：课程负责人'),
      h('span', '可用于：能力画像 / 岗位对照 / 个人报告')
    ]),
    h('div', { class: 'profile-actions' }, [
      h(Button, { variant: 'outline' as any }, () => '查看来源'),
      h(Button, { variant: 'outline' as any }, () => '查看引用')
    ])
  ])
}
</script>

<style scoped>
.component-showcase {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.showcase-empty,
.showcase-intro,
.showcase-item {
  background: var(--color-card-bg);
  border: 1px solid var(--color-card-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
}

.showcase-empty {
  padding: 60px 20px;
  text-align: center;
}

.showcase-empty h3 {
  margin: 0 0 8px;
  color: var(--color-text-primary);
  font-size: 18px;
}

.showcase-empty p {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: 14px;
}

.showcase-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.showcase-intro {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 24px;
}

.eyebrow {
  margin: 0 0 6px;
  color: var(--color-primary);
  font-size: 12px;
  font-weight: 700;
}

.showcase-intro h2 {
  margin: 0 0 8px;
  color: var(--color-text-primary);
  font-size: 24px;
}

.showcase-intro p {
  margin: 0;
  color: var(--color-text-secondary);
}

.count-badge,
.variant-badge,
.status-pill {
  display: inline-flex;
  align-items: center;
  width: fit-content;
  border-radius: var(--radius-full);
  font-size: 12px;
  font-weight: 700;
}

.count-badge {
  padding: 8px 12px;
  background: var(--color-primary-light);
  color: var(--color-primary);
}

.showcase-item {
  display: flex;
  flex-direction: column;
  gap: 22px;
  padding: 24px;
}

.showcase-header {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding-bottom: 18px;
  border-bottom: 1px solid var(--color-card-border);
}

.component-name {
  margin: 0 0 8px;
  font-size: 22px;
  font-weight: 800;
  color: var(--color-text-primary);
}

.component-description {
  max-width: 760px;
  margin: 0;
  font-size: 14px;
  color: var(--color-text-secondary);
  line-height: 1.7;
}

.component-variants {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: flex-end;
}

.variant-badge {
  padding: 5px 10px;
  background: var(--color-page-bg-soft);
  border: 1px solid var(--color-card-border);
  color: var(--color-text-secondary);
}

.section-title-row {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 14px;
}

.section-title-row h3 {
  margin: 0;
  font-size: 17px;
  color: var(--color-text-primary);
}

.section-title-row span {
  color: var(--color-text-tertiary);
  font-size: 13px;
}

.example-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.example-item {
  overflow: hidden;
  border: 1px solid var(--color-card-border);
  border-radius: var(--radius-lg);
  background: var(--color-card-bg);
}

.example-header {
  padding: 16px 18px;
  background: var(--color-page-bg-soft);
  border-bottom: 1px solid var(--color-card-border);
}

.example-header h4 {
  margin: 0 0 6px;
  color: var(--color-text-primary);
  font-size: 15px;
}

.example-header p {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: 13px;
}

.example-visual {
  padding: 20px;
  background: var(--color-card-bg);
}

.code-details,
.api-details {
  border-top: 1px solid var(--color-card-border);
}

.code-details summary,
.api-details summary {
  cursor: pointer;
  padding: 12px 18px;
  color: var(--color-primary);
  font-size: 13px;
  font-weight: 700;
}

.api-details {
  border: 1px solid var(--color-card-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.api-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 18px;
  background: var(--color-card-bg);
}

.api-section h3 {
  margin: 0 0 12px;
  color: var(--color-text-primary);
  font-size: 15px;
}

.api-table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid var(--color-card-border);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.api-table th,
.api-table td {
  padding: 10px 12px;
  border-bottom: 1px solid var(--color-card-border);
  color: var(--color-text-secondary);
  font-size: 13px;
  text-align: left;
}

.api-table th {
  background: var(--color-page-bg-soft);
  color: var(--color-text-primary);
  font-weight: 700;
}

.api-table code {
  padding: 2px 6px;
  border-radius: var(--radius-sm);
  background: var(--color-primary-soft);
  color: var(--color-primary);
  font-size: 12px;
}

.button-sample-row,
.badge-sample-row,
.input-sample,
.filter-toolbar-sample,
.profile-actions,
.task-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.sample-note,
.input-sample p {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: 13px;
}

.input-sample {
  align-items: stretch;
  flex-direction: column;
  max-width: 520px;
}

.sample-card {
  max-width: 520px;
}

.card-content-sample {
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: var(--color-text-secondary);
  font-size: 13px;
}

.status-pill {
  padding: 5px 10px;
}

.status-pill.warning {
  background: var(--color-warning-bg);
  color: var(--color-warning);
}

.status-pill.success {
  background: var(--color-success-bg);
  color: var(--color-success);
}

.status-pill.info {
  background: var(--color-info-bg);
  color: var(--color-info);
}

.task-card-sample,
.profile-card-sample,
.archive-card-sample {
  max-width: 720px;
  padding: 20px;
  background: var(--color-card-bg);
  border: 1px solid var(--color-card-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
}

.task-card-sample {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  align-items: center;
}

.task-card-main h3,
.profile-card-header h3,
.archive-card-title h3 {
  margin: 10px 0 8px;
  color: var(--color-text-primary);
  font-size: 18px;
}

.task-card-main p,
.archive-card-sample p {
  margin: 0 0 12px;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.task-meta {
  color: var(--color-text-tertiary);
  font-size: 12px;
}

.stat-card-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  max-width: 780px;
}

.stat-card-sample {
  padding: 18px;
  border: 1px solid var(--color-card-border);
  border-radius: var(--radius-lg);
  background: var(--color-card-bg);
  box-shadow: var(--shadow-card);
}

.stat-card-sample span {
  color: var(--color-text-secondary);
  font-size: 13px;
}

.stat-card-sample strong {
  display: block;
  margin: 8px 0 6px;
  color: var(--color-text-primary);
  font-size: 28px;
}

.stat-card-sample p {
  margin: 0;
  color: var(--color-text-tertiary);
  font-size: 12px;
}

.filter-toolbar-sample {
  max-width: 980px;
  padding: 16px;
  border: 1px solid var(--color-card-border);
  border-radius: var(--radius-lg);
  background: var(--color-card-bg);
}

.filter-search {
  min-width: 280px;
  flex: 1;
}

.filter-chip {
  height: 36px;
  padding: 0 12px;
  border: 1px solid var(--color-card-border);
  border-radius: var(--radius-full);
  background: var(--color-card-bg);
  color: var(--color-text-secondary);
  font-weight: 600;
  cursor: pointer;
}

.filter-chip.active {
  background: var(--color-primary-light);
  color: var(--color-primary);
  border-color: var(--color-primary-light);
}

.profile-card-header {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.profile-card-header p {
  margin: 0;
  color: var(--color-text-secondary);
}

.profile-score {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.profile-score strong {
  color: var(--color-primary);
  font-size: 34px;
}

.profile-score span {
  color: var(--color-text-tertiary);
  font-size: 12px;
}

.profile-bars {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 18px 0;
}

.ability-row {
  display: grid;
  grid-template-columns: 42px 1fr 36px;
  align-items: center;
  gap: 10px;
  color: var(--color-text-secondary);
  font-size: 13px;
}

.ability-track {
  height: 8px;
  border-radius: var(--radius-full);
  background: var(--color-primary-soft);
  overflow: hidden;
}

.ability-track i {
  display: block;
  height: 100%;
  border-radius: var(--radius-full);
  background: var(--color-primary);
}

.archive-card-title {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.archive-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  margin: 14px 0 16px;
}

.archive-grid span {
  padding: 10px;
  border-radius: var(--radius-md);
  background: var(--color-page-bg-soft);
  color: var(--color-text-secondary);
  font-size: 13px;
}

.preview-placeholder {
  color: var(--color-text-secondary);
}

@media (max-width: 1080px) {
  .example-grid,
  .stat-card-grid,
  .archive-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .showcase-intro,
  .showcase-header,
  .task-card-sample,
  .profile-card-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .component-variants {
    justify-content: flex-start;
  }
}
</style>
