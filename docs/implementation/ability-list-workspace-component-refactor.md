# 能力清单工作区组件抽取任务

## 1. 任务背景

管理端「能力清单 / 基准模板」页面和「能力清单 / 执行版」页面都包含同类工作区：

```txt
左侧：能力结构树
右侧：能力指标表
```

当前两页分别在页面内硬编码树结构、指标表、布局和样式，后续维护成本高。

本次任务要求将这两个红框区域抽成通用组件，并让基准模板页与执行版页共同使用同一套组件。

## 2. 重要原则

```txt
样式以「能力清单 / 基准模板」当前页面为准。
```

不是以执行版旧样式为准。

执行版页面迁移后，应使用基准模板页当前的能力结构树样式、图标样式、卡片样式、指标表样式。

不要把执行版旧的 `structure-card / indicator-card / tree-row / tree-child` 样式继续复制到新组件里。

## 3. 本次只抽下方工作区，不抽 Hero

本次抽取范围：

```txt
1. 左侧能力结构卡片
2. 右侧能力指标表卡片
3. 两列工作区布局
```

不抽取：

```txt
1. 顶部 Hero 条幅
2. 基准模板页按钮逻辑
3. 执行版页编辑抽屉
4. AdminLayout / AdminTopbar / AdminSidebar
```

Hero 还在精修，不要提前抽通用 Hero。

## 4. 新增目录

请新增目录：

```txt
frontend/src/components/admin/ability-list/
```

新增文件：

```txt
frontend/src/components/admin/ability-list/types.ts
frontend/src/components/admin/ability-list/AbilityStructureTree.vue
frontend/src/components/admin/ability-list/AbilityIndicatorTable.vue
frontend/src/components/admin/ability-list/AbilityListWorkspace.vue
```

## 5. types.ts

新增统一类型：

```ts
export type AbilityTreeChild = {
  key: string
  label: string
}

export type AbilityTreeNode = {
  key: string
  label: string
  icon?: string
  color?: 'blue' | 'orange' | 'green' | 'purple' | 'gray'
  children?: AbilityTreeChild[]
}

export type AbilityIndicatorStatus = 'enabled' | 'disabled' | 'draft'

export type AbilityIndicator = {
  key: string
  name: string
  novice: string
  competent: string
  backbone: string
  expert: string
  basisLabel: string
  status?: AbilityIndicatorStatus
}
```

注意：

```txt
基准模板页原来的 basis 统一映射为 basisLabel。
执行版页原来的 rule 统一映射为 basisLabel。
```

## 6. AbilityStructureTree.vue

### 6.1 组件职责

负责左侧能力结构树。

功能包括：

```txt
1. 展示卡片标题：能力结构
2. 展示一级能力：基本能力、教学能力、教研能力、实践能力、服务能力
3. 展示一级能力图标
4. 支持有 children 的一级能力展开 / 收起
5. 展示二级能力项
6. 支持二级能力项选中
7. 选中态使用基准模板页当前样式
```

### 6.2 Props

```ts
const props = withDefaults(
  defineProps<{
    title?: string
    nodes: AbilityTreeNode[]
    selectedKey: string
    defaultExpandedKeys?: string[]
  }>(),
  {
    title: '能力结构',
    defaultExpandedKeys: () => [],
  },
)
```

### 6.3 Emits

```ts
const emit = defineEmits<{
  (event: 'select', key: string): void
  (event: 'toggle', key: string, expanded: boolean): void
}>()
```

### 6.4 交互规则

```txt
1. 有 children 的一级能力点击后展开 / 收起。
2. 展开时右侧箭头旋转。
3. 点击二级能力项时 emit('select', child.key)。
4. 没有 children 的一级能力点击时 emit('select', node.key)。
5. 默认展开项由 defaultExpandedKeys 控制。
```

### 6.5 样式要求

样式必须来自当前基准模板页，而不是执行版旧样式。

需要迁移这些样式：

```txt
.ability-structure-panel
.ability-tree
.ability-tree-item
.ability-node
.ability-parent
.ability-children
.ability-child
.ability-icon
.ability-arrow
.ability-arrow-leaf
```

保留当前基准模板页效果：

```txt
1. 白底圆角卡片
2. 标题左侧使用图标
3. 一级能力左侧使用资源图标
4. 一级能力右侧有展开 / 收起箭头
5. 二级能力项左侧保留圆点和竖线
6. 当前选中项为浅蓝背景、蓝字、蓝点
```

注意：这里的竖线是能力结构树内部的竖线，不是左侧主导航二级菜单的竖线。不要混淆。

## 7. AbilityIndicatorTable.vue

### 7.1 组件职责

负责右侧能力指标表。

功能包括：

```txt
1. 展示标题图标
2. 展示当前能力标题
3. 可选展示说明文案
4. 展示指标表格
5. 支持自定义第六列标题：建议依据 / 计算规则
6. 支持编辑按钮
7. 支持行点击
```

### 7.2 Props

```ts
const props = withDefaults(
  defineProps<{
    title: string
    icon?: string
    description?: string
    rows: AbilityIndicator[]
    basisColumnTitle?: string
    actionText?: string
    showAction?: boolean
  }>(),
  {
    basisColumnTitle: '建议依据',
    actionText: '编辑',
    showAction: true,
  },
)
```

### 7.3 Emits

```ts
const emit = defineEmits<{
  (event: 'row-click', row: AbilityIndicator): void
  (event: 'edit', row: AbilityIndicator): void
}>()
```

### 7.4 表格列

固定列结构：

```txt
指标名称
新手
胜任
骨干
名师
basisColumnTitle
状态
操作
```

其中：

```txt
基准模板页 basisColumnTitle = 建议依据
执行版页 basisColumnTitle = 计算规则
```

### 7.5 状态显示

先只处理 enabled：

```txt
enabled → 已启用 → badge-success
```

后续有 disabled / draft 再扩展。

### 7.6 样式要求

样式必须以基准模板页当前表格为准。

需要迁移：

```txt
.indicators-panel
.indicator-header
.title-with-icon
.title-icon
.name-cell
.admin-table 列宽相关样式
.admin-table-row active / hover
```

执行版迁移后也要使用同样表格视觉。

## 8. AbilityListWorkspace.vue

### 8.1 组件职责

负责组合左侧树和右侧表格，并提供统一两列布局。

### 8.2 Props

```ts
const props = withDefaults(
  defineProps<{
    nodes: AbilityTreeNode[]
    selectedKey: string
    selectedTitle: string
    selectedIcon?: string
    selectedDescription?: string
    indicators: AbilityIndicator[]
    basisColumnTitle?: string
    defaultExpandedKeys?: string[]
    actionText?: string
    showAction?: boolean
  }>(),
  {
    basisColumnTitle: '建议依据',
    defaultExpandedKeys: () => [],
    actionText: '编辑',
    showAction: true,
  },
)
```

### 8.3 Emits

```ts
const emit = defineEmits<{
  (event: 'select-ability', key: string): void
  (event: 'row-click', row: AbilityIndicator): void
  (event: 'edit-indicator', row: AbilityIndicator): void
}>()
```

### 8.4 内部使用

```vue
<div class="ability-list-workspace">
  <AbilityStructureTree
    :nodes="nodes"
    :selected-key="selectedKey"
    :default-expanded-keys="defaultExpandedKeys"
    @select="key => emit('select-ability', key)"
  />

  <AbilityIndicatorTable
    :title="selectedTitle"
    :icon="selectedIcon"
    :description="selectedDescription"
    :rows="indicators"
    :basis-column-title="basisColumnTitle"
    :action-text="actionText"
    :show-action="showAction"
    @row-click="row => emit('row-click', row)"
    @edit="row => emit('edit-indicator', row)"
  />
</div>
```

### 8.5 布局样式

从基准模板页迁移：

```css
.ability-list-workspace {
  display: grid;
  grid-template-columns: minmax(270px, 21.5%) minmax(0, 1fr);
  gap: clamp(18px, 1.25vw, 24px);
}
```

## 9. 改造 AbilityListBasePage.vue

目标文件：

```txt
frontend/src/pages/admin/ability-list/AbilityListBasePage.vue
```

### 9.1 保留

```txt
1. AdminLayout
2. Hero 区
3. 当前资源 import
4. selectedAbility 逻辑
5. indicators 数据
6. hero 相关样式
```

### 9.2 替换

把下方工作区：

```txt
main-workspace
ability-structure-panel
indicators-panel
```

替换成：

```vue
<AbilityListWorkspace
  :nodes="abilityTree"
  :selected-key="selectedAbility"
  :selected-title="getSelectedAbilityLabel()"
  :selected-icon="getSelectedAbilityIcon()"
  :indicators="normalizedIndicators"
  basis-column-title="建议依据"
  :default-expanded-keys="['teaching']"
  @select-ability="selectAbility"
  @row-click="selectIndicator"
  @edit-indicator="editIndicator"
/>
```

### 9.3 数据映射

如果当前 indicators 字段仍是 basis：

```ts
const normalizedIndicators = computed<AbilityIndicator[]>(() =>
  indicators.map(item => ({
    key: item.key,
    name: item.name,
    novice: item.novice,
    competent: item.competent,
    backbone: item.backbone,
    expert: item.expert,
    basisLabel: item.basis,
    status: item.status,
  })),
)
```

需要增加：

```ts
import { computed, ref } from 'vue'
```

### 9.4 清理页面内重复 CSS

迁移到组件后，从页面中删除这些样式：

```txt
.main-workspace
.ability-structure-panel
.indicators-panel
.ability-tree
.ability-tree-item
.ability-node
.ability-parent
.ability-children
.ability-child
.ability-icon
.ability-arrow
.indicator-header
.title-with-icon
.title-icon
.name-cell
.admin-table 列宽相关样式
.admin-table-row active / hover
```

保留 Hero 样式。

## 10. 改造 AbilityListExecutionPage.vue

目标文件：

```txt
frontend/src/pages/admin/ability-list/AbilityListExecutionPage.vue
```

### 10.1 保留

```txt
1. AdminLayout
2. Hero 区
3. 编辑抽屉状态与逻辑
4. openEditDrawer / closeEditDrawer / saveEdit
5. Hero 样式
6. 编辑抽屉样式
```

### 10.2 替换工作区

把执行版页面当前的：

```txt
work-area
structure-card
indicator-card
```

替换成：

```vue
<AbilityListWorkspace
  :nodes="normalizedAbilityTree"
  selected-key="teaching-design"
  selected-title="教学能力 / 教学设计与实施"
  :indicators="normalizedIndicators"
  basis-column-title="计算规则"
  :default-expanded-keys="['teaching']"
  @edit-indicator="openEditDrawer"
/>
```

### 10.3 执行版数据映射

当前执行版 abilityTree 是：

```ts
{
  id: 'teaching',
  label: '教学能力',
  color: 'teaching-blue',
  children: ['教学设计与实施', ...]
}
```

需要改成新组件结构：

```ts
const normalizedAbilityTree: AbilityTreeNode[] = [
  {
    key: 'basic',
    label: '基本能力',
    color: 'blue',
  },
  {
    key: 'teaching',
    label: '教学能力',
    color: 'blue',
    children: [
      { key: 'teaching-design', label: '教学设计与实施' },
      { key: 'teaching-resource', label: '教学资源开发' },
      { key: 'teaching-evaluation', label: '教学评价与反馈' },
      { key: 'teaching-innovation', label: '教学创新与改进' },
    ],
  },
  ...
]
```

如果暂时不接图标，可以先使用 color；但为了和基准模板样式一致，建议复用基准模板图标资源：

```ts
import iconAbilityBasic from '@/assets/admin/ability-list-base-assets/icons/icon-ability-basic.svg'
import iconAbilityTeaching from '@/assets/admin/ability-list-base-assets/icons/icon-ability-teaching.svg'
import iconAbilityResearch from '@/assets/admin/ability-list-base-assets/icons/icon-ability-research.svg'
import iconAbilityPractice from '@/assets/admin/ability-list-base-assets/icons/icon-ability-practice.svg'
import iconAbilityService from '@/assets/admin/ability-list-base-assets/icons/icon-ability-service.svg'
```

### 10.4 指标数据映射

执行版当前字段：

```txt
rule
master
```

新组件字段：

```txt
basisLabel
expert
```

需要映射：

```ts
const normalizedIndicators = computed<AbilityIndicator[]>(() =>
  indicators.map((item, index) => ({
    key: `execution-indicator-${index}`,
    name: item.name,
    novice: item.novice,
    competent: item.competent,
    backbone: item.backbone,
    expert: item.master,
    basisLabel: item.rule,
    status: 'enabled',
  })),
)
```

### 10.5 编辑抽屉兼容

`openEditDrawer` 当前接收旧 row。

组件 emit 出来的 row 是 AbilityIndicator。

请将编辑抽屉读取字段同步改成：

```txt
expert 替代 master
basisLabel 替代 rule
```

如果想最小改动，可以在 openEditDrawer 里转回旧结构，但不推荐。

## 11. 删除重复 CSS

执行版页面迁移后，删除执行版中工作区相关样式：

```txt
.work-area
.structure-card
.indicator-card
.indicator-header
.indicator-title-wrap
.indicator-title-wrap h2
表格列宽定义
```

保留：

```txt
.execution-page
.execution-hero 相关样式
.hero 相关样式
.edit-drawer 相关样式
```

## 12. 不要做

```txt
不要抽 Hero。
不要改路由。
不要改 AdminLayout。
不要改 AdminSidebar。
不要改顶部导航。
不要改基准模板 Hero 当前资源路径。
不要把执行版旧样式迁入组件。
不要新增第三方 UI 库。
不要接后端接口。
```

## 13. 验收标准

### 13.1 基准模板页

访问：

```txt
/admin/ability-list/base
```

要求：

```txt
1. 页面正常显示。
2. Hero 不被影响。
3. 下方能力结构树视觉与当前基准模板一致。
4. 能力结构树支持展开 / 收起。
5. 教学设计与实施选中态正确。
6. 右侧指标表数据完整。
7. 编辑按钮仍可点击，不报错。
```

### 13.2 执行版页

访问：

```txt
/admin/ability-list/execution
```

要求：

```txt
1. 页面正常显示。
2. Hero 不被影响。
3. 下方能力结构树改为基准模板同款样式。
4. 指标表改为基准模板同款样式。
5. 第六列表头显示“计算规则”。
6. 点击编辑仍打开执行版编辑抽屉。
7. 编辑抽屉字段正常展示。
```

### 13.3 工程检查

必须通过：

```bash
cd frontend
npm run typecheck
npm run build
```

## 14. 完成后反馈

请反馈：

```txt
1. 新增组件清单。
2. 修改页面清单。
3. 删除了哪些重复样式。
4. 基准模板页是否正常。
5. 执行版页是否正常。
6. 编辑抽屉是否正常。
7. typecheck 结果。
8. build 结果。
9. /admin/ability-list/base 截图。
10. /admin/ability-list/execution 截图。
```
