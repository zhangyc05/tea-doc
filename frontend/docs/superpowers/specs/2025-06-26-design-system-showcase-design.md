# 设计系统展示页面设计文档

**创建日期**: 2025-06-26
**项目**: 教师综合发展平台前端
**文档版本**: v1.0

## 1. 项目概述

### 1.1 目标
创建一个全面的设计系统展示页面，服务于开发团队、设计师和项目相关方，提供设计规范、组件展示和使用指南的完整文档系统。

### 1.2 目标用户
- **开发团队**: 快速查找设计 Token、了解组件用法、复制代码示例
- **设计师**: 查看视觉规范、交互模式、设计一致性检查
- **项目相关方**: 了解项目整体设计风格和品牌形象

### 1.3 访问权限
- **开发环境限定**: 仅在开发环境可见，生产环境隐藏
- **无需登录**: 开发环境内直接访问
- **路由保护**: 生产环境 404 或重定向

## 2. 功能需求

### 2.1 核心功能
1. **设计规范展示**
   - 颜色系统（主色、背景、文本、状态色等）
   - 字体系统（字号、行高、字重）
   - 尺寸系统（圆角、阴影、间距）
   - 布局规范（容器宽度、组件尺寸）

2. **组件展示**
   - shadcn-vue UI 组件库展示
   - 项目业务组件展示
   - 交互式组件预览

3. **使用指南**
   - 快速开始文档
   - 最佳实践说明
   - 常见问题解答
   - 更新日志

4. **交互功能**
   - 一键复制（颜色代码、Token 值、代码示例）
   - 实时预览（参数调整、主题切换）
   - 代码切换（Vue/TS/HTML）
   - 搜索过滤（快速定位）
   - 暗色模式切换

### 2.2 技术需求
- **环境检测**: 自动识别开发/生产环境
- **性能优化**: 按需加载组件和文档
- **响应式设计**: 支持桌面和移动端查看
- **搜索功能**: 全文搜索设计系统内容

## 3. 信息架构

### 3.1 整体布局
```
┌─────────────────────────────────────────────────────────┐
│  顶部工具栏：Logo | 搜索 | 主题切换 | 代码切换 | GitHub   │
├────────────┬────────────────────────────────────────────┤
│            │                                             │
│  左侧导航   │            右侧内容区                      │
│            │                                             │
│  🎨 设计    │  - 当前选中的内容展示                      │
│  🧩 组件    │  - 交互式预览                               │
│  📦 业务    │  - 代码示例                                │
│  📖 指南    │  - 使用说明                                │
│            │                                             │
└────────────┴────────────────────────────────────────────┘
```

### 3.2 导航结构

#### **一级分类: 设计规范**
- **颜色系统**
  - 品牌主色（primary、hover、light、soft）
  - 背景色（页面、卡片、输入框）
  - 文本色（主要、次要、第三级、禁用）
  - 状态色（成功、警告、危险、信息、紫色、中性）
  - 能力画像色（教学、科研、实践、服务）

- **字体系统**
  - 字号规范（xs/sm/md/lg/xl/2xl）
  - 行高规范（tight/normal/loose）
  - 字重使用指南

- **尺寸系统**
  - 圆角规范（xs/sm/md/lg/xl/full）
  - 阴影规范（卡片、悬停、浮动）
  - 间距系统（padding、margin）

- **布局规范**
  - 容器宽度（管理端、教师端、移动端）
  - 组件尺寸（按钮、输入框、卡片）

#### **一级分类: UI 组件库**
- **基础组件**
  - Button（按钮）
  - Input（输入框）
  - Select（选择器）
  - Checkbox（复选框）
  - Radio（单选框）

- **数据展示**
  - Card（卡片）
  - Table（表格）
  - Badge（徽章）
  - Progress（进度条）

- **反馈组件**
  - Alert（警告框）
  - Toast（提示框）
  - Modal（对话框）
  - Loading（加载中）

#### **一级分类: 业务组件**
- **布局组件**
  - AdminLayout（管理端布局）
  - PageHeader（页面头部）
  - FilterBar（筛选栏）

- **通用业务**
  - StatCard（统计卡片）
  - StatusBadge（状态徽章）
  - DetailSheet（详情面板）

#### **一级分类: 使用指南**
- **快速开始**
- **最佳实践**
- **常见问题**
- **更新日志**

## 4. 交互设计

### 4.1 左侧导航
- **可折叠树形结构**: 支持多级展开/收起
- **搜索过滤**: 实时过滤导航项
- **当前状态高亮**: 显示当前浏览位置
- **键盘快捷键**: 支持方向键导航

### 4.2 右侧内容区
- **展示模式切换**: 预览/代码/分屏
- **交互控制面板**: 动态调整组件参数
- **一键复制**: 颜色值、代码示例
- **响应式预览**: 切换不同设备尺寸

### 4.3 顶部工具栏
- **搜索框**: 全文搜索，高亮匹配项
- **主题切换**: 浅色/深色模式切换
- **代码切换**: Vue/TS/HTML 格式切换
- **外部链接**: GitHub 文档、设计资源

## 5. 技术实现

### 5.1 技术栈
- **框架**: Vue 3 + TypeScript
- **路由**: Vue Router（新增独立路由）
- **组件库**: shadcn-vue + 自定义组件
- **搜索**: 简单的客户端搜索（关键词匹配）
- **环境检测**: `import.meta.env.DEV`

### 5.2 文件结构
```
frontend/src/
├── pages/
│   └── design-system/
│       ├── DesignSystemPage.vue           # 主页面
│       ├── components/
│       │   ├── DesignSidebar.vue         # 左侧导航
│       │   ├── DesignContent.vue         # 右侧内容区
│       │   ├── ColorPalette.vue          # 颜色展示
│       │   ├── TypographyScale.vue        # 字体展示
│       │   ├── ComponentShowcase.vue     # 组件展示
│       │   └── CodeViewer.vue            # 代码查看器
│       └── content/
│           ├── colors.ts                  # 颜色数据
│           ├── typography.ts              # 字体数据
│           ├── components.ts              # 组件配置
│           └── guides.ts                  # 指南内容
├── router/
│   └── design-system.routes.ts           # 设计系统路由
└── lib/
    └── design-system/
        ├── tokens.ts                      # Token 提取工具
        └── utils.ts                       # 工具函数
```

### 5.3 路由配置
```typescript
// 新增设计系统路由
{
  path: '/design-system',
  name: 'DesignSystem',
  component: DesignSystemPage,
  meta: {
    title: '设计系统',
    devOnly: true, // 开发环境专用
  }
}
```

### 5.4 环境检测
```typescript
// 路由守卫：生产环境隐藏
router.beforeEach((to, from, next) => {
  if (to.meta.devOnly && import.meta.env.PROD) {
    next({ name: 'AdminTrainingResources' }) // 重定向到首页
  } else {
    next()
  }
})
```

### 5.5 核心组件设计

#### DesignSystemPage.vue
- **布局**: Flexbox 左右分栏布局
- **状态管理**: 当前选中导航项、主题模式、搜索关键词
- **数据加载**: 按需加载内容模块

#### DesignSidebar.vue
- **渲染**: 递归渲染多级树形结构
- **交互**: 展开/收起、搜索过滤、键盘导航
- **状态**: 当前选中项、展开状态

#### DesignContent.vue
- **内容渲染**: 根据选中项动态加载对应组件
- **代码展示**: 语法高亮、一键复制
- **交互预览**: 参数控制面板

#### ColorPalette.vue
- **展示方式**: 网格布局，每个颜色卡片显示色值和名称
- **交互**: 点击复制颜色代码，显示复制成功提示
- **数据**: 从 `tokens.css` 自动提取颜色变量

#### CodeViewer.vue
- **功能**: 代码语法高亮、格式切换、一键复制
- **支持格式**: Vue SFC、TypeScript、HTML

### 5.6 数据管理

#### Token 提取
```typescript
// lib/design-system/tokens.ts
export const extractColorTokens = () => {
  // 从 tokens.css 提取颜色变量
  const styles = getComputedStyle(document.documentElement)
  const colors = {
    primary: styles.getPropertyValue('--color-primary').trim(),
    // ... 其他颜色
  }
  return colors
}
```

#### 组件配置
```typescript
// content/components.ts
export const componentShowcases = [
  {
    name: 'Button',
    category: '基础组件',
    variants: ['default', 'primary', 'ghost', 'destructive'],
    examples: [
      {
        title: '主要按钮',
        code: `<Button variant="primary">点击我</Button>`,
      }
    ]
  }
]
```

## 6. 数据结构

### 6.1 导航数据结构
```typescript
interface NavItem {
  id: string
  title: string
  icon?: string
  children?: NavItem[]
  content?: ContentModule
}
```

### 6.2 内容模块结构
```typescript
interface ContentModule {
  type: 'colors' | 'typography' | 'spacing' | 'components' | 'guide'
  title: string
  description?: string
  data: any
}
```

### 6.3 颜色数据结构
```typescript
interface ColorToken {
  name: string
  value: string
  description?: string
  usage?: string[]
}
```

### 6.4 组件展示结构
```typescript
interface ComponentShowcase {
  name: string
  category: string
  description?: string
  variants: string[]
  examples: ComponentExample[]
  props?: PropDefinition[]
}

interface ComponentExample {
  title: string
  description?: string
  code: string
  props?: Record<string, any>
}
```

## 7. 实现优先级

### 7.1 Phase 1 - 基础框架 (MVP)
1. 页面布局和导航结构
2. 设计规范展示（颜色、字体、尺寸）
3. 基础交互功能（复制、搜索）
4. 环境检测和路由保护

### 7.2 Phase 2 - 组件展示
1. UI 组件库展示
2. 业务组件展示
3. 交互式预览
4. 代码查看器

### 7.3 Phase 3 - 高级功能
1. 暗色模式
2. 响应式预览
3. 使用指南文档
4. 更新日志

## 8. 成功标准

### 8.1 功能完整性
- ✅ 所有设计 Token 可视化展示
- ✅ 所有组件可预览和复制代码
- ✅ 搜索功能正常工作
- ✅ 环境保护机制生效

### 8.2 用户体验
- ✅ 导航清晰，易于查找
- ✅ 交互流畅，响应及时
- ✅ 复制功能准确可靠
- ✅ 响应式布局适配良好

### 8.3 开发体验
- ✅ 代码示例准确可用
- ✅ 文档说明清晰详细
- ✅ 维护和扩展容易

## 9. 风险和挑战

### 9.1 技术风险
- **Token 提取准确性**: 确保 CSS 变量正确提取
- **组件预览稳定性**: 避免组件在预览环境中出错
- **搜索性能**: 大量内容的搜索响应速度

### 9.2 维护风险
- **内容同步**: 设计系统变更需要及时更新展示
- **版本管理**: 设计系统版本演进的历史记录
- **多环境一致性**: 确保开发/生产环境的行为一致

### 9.3 缓解措施
- 自动化 Token 提取工具
- 组件预览错误边界处理
- 客户端搜索优化（索引、缓存）
- 定期内容同步检查

## 10. 后续扩展

### 10.1 可能的功能扩展
- **设计变更历史**: 记录和展示设计系统演变
- **A/B 测试集成**: 展示不同设计版本的效果
- **国际化支持**: 多语言设计文档
- **团队协作**: 收集反馈和使用统计

### 10.2 长期愿景
- 成为项目设计决策的权威参考
- 支持新成员快速了解设计规范
- 促进设计和开发的协作效率
- 建立设计系统演进的最佳实践

---

**文档状态**: 待用户审核
**下一步**: 编写实现计划
