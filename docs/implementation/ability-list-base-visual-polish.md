# 能力清单基准模板页｜资源接入与视觉精修任务

## 1. 当前检查结论

本任务用于把已经生成并提交到仓库的能力清单基准模板页视觉资源接入页面。

资源实际路径为：

```txt
frontend/src/assets/admin/ability-list-base-assets/
```

已经确认该目录下存在：

```txt
frontend/src/assets/admin/ability-list-base-assets/ability-list-base-hero-art.png
frontend/src/assets/admin/ability-list-base-assets/ability-list-base-hero-emblem.svg
frontend/src/assets/admin/ability-list-base-assets/icons/icon-ability-structure.svg
frontend/src/assets/admin/ability-list-base-assets/icons/icon-ability-basic.svg
frontend/src/assets/admin/ability-list-base-assets/icons/icon-ability-teaching.svg
frontend/src/assets/admin/ability-list-base-assets/icons/icon-ability-research.svg
frontend/src/assets/admin/ability-list-base-assets/icons/icon-ability-practice.svg
frontend/src/assets/admin/ability-list-base-assets/icons/icon-ability-service.svg
```

注意：不要再去 `frontend/src/assets/admin/ability-list/` 查找。本次直接使用 `ability-list-base-assets` 目录。

## 2. 目标页面

文件：

```txt
frontend/src/pages/admin/ability-list/AbilityListBasePage.vue
```

路由：

```txt
/admin/ability-list/base
```

## 3. 精修目标

参考当前能力清单执行版的 Hero 风格，优化基准模板页：

```txt
1. 接入右侧 hero-art 条幅图。
2. 替换 Hero 左侧主图标。
3. 替换能力结构树中的核心能力图标。
4. 替换右侧内容区标题前的能力图标。
5. 保持业务内容、路由、按钮交互不变。
```

## 4. 需要接入的资源

请在 `AbilityListBasePage.vue` 中按实际路径引入：

```ts
import baseHeroArt from '@/assets/admin/ability-list-base-assets/ability-list-base-hero-art.png'
import baseHeroEmblem from '@/assets/admin/ability-list-base-assets/ability-list-base-hero-emblem.svg'
import iconAbilityStructure from '@/assets/admin/ability-list-base-assets/icons/icon-ability-structure.svg'
import iconAbilityBasic from '@/assets/admin/ability-list-base-assets/icons/icon-ability-basic.svg'
import iconAbilityTeaching from '@/assets/admin/ability-list-base-assets/icons/icon-ability-teaching.svg'
import iconAbilityResearch from '@/assets/admin/ability-list-base-assets/icons/icon-ability-research.svg'
import iconAbilityPractice from '@/assets/admin/ability-list-base-assets/icons/icon-ability-practice.svg'
import iconAbilityService from '@/assets/admin/ability-list-base-assets/icons/icon-ability-service.svg'
```

如果项目当前对静态资源引用方式不同，请按 Vite/Vue 当前规范处理。

## 5. Hero 区改造

Hero 区保留当前业务信息：

```txt
教师能力清单基准模板 V1.0
已启用
最近更新：2026-06-08 20:30
能力结构：基本能力 + 教学能力 + 教研能力 + 实践能力 + 服务能力
当前指标：69 项
优化基准模板
查看版本记录
派生执行版
可基于制度文件和运行反馈形成优化建议，确认后再应用到基准模板。
```

需要调整为：

```txt
左侧：主图标 + 标题 + 状态 + 元信息 + 按钮 + 说明
右侧：ability-list-base-hero-art.png
```

建议结构：

```vue
<section class="admin-hero base-hero">
  <div class="hero-content">
    <div class="hero-heading">
      <div class="hero-emblem">
        <img :src="baseHeroEmblem" alt="" />
      </div>
      <div>
        <h1>教师能力清单基准模板 V1.0</h1>
        <span class="badge-status badge-success">已启用</span>
      </div>
    </div>
    ...
  </div>

  <div class="hero-art" aria-hidden="true">
    <img :src="baseHeroArt" alt="" />
  </div>
</section>
```

不要再使用简单圆形占位插画。

## 6. 能力结构图标替换

左侧「能力结构」区域需要用新图标替换现有图标。

映射关系：

```txt
能力结构 → iconAbilityStructure
基本能力 → iconAbilityBasic
教学能力 → iconAbilityTeaching
教研能力 → iconAbilityResearch
实践能力 → iconAbilityPractice
服务能力 → iconAbilityService
```

如果当前 abilityTree 数据只有 key 和 label，可以扩展为：

```ts
{
  key: 'teaching',
  label: '教学能力',
  icon: iconAbilityTeaching,
  children: [...]
}
```

模板中统一使用：

```vue
<img class="ability-icon" :src="item.icon" alt="" />
```

## 7. 右侧标题图标替换

右侧指标表卡片标题为：

```txt
教学能力 / 教学设计与实施
```

标题前图标使用：

```txt
iconAbilityTeaching
```

要求：

```txt
尺寸约 22-24px
可放在浅蓝色圆角底中
与左侧能力结构图标风格一致
```

## 8. 左侧二级能力项样式

能力结构树中的子级能力项继续保持竖线 + 圆点风格。

当前选中：

```txt
教学设计与实施
```

表现要求：

```txt
蓝色圆点
蓝色文字
浅蓝背景
```

未选中：

```txt
灰色圆点
灰色文字
```

## 9. 不要修改

```txt
不要修改路由。
不要修改 AdminLayout。
不要修改 AdminTopbar。
不要修改左侧主导航结构。
不要修改执行版页面。
不要重做全站图标。
不要引入新图标库。
不要接后端接口。
```

## 10. 验收标准

```txt
1. /admin/ability-list/base 正常访问。
2. Hero 右侧显示 ability-list-base-hero-art.png。
3. Hero 左侧主图标显示 ability-list-base-hero-emblem.svg。
4. 能力结构树图标全部替换为新资源。
5. 右侧内容标题图标替换为新教学能力图标。
6. 页面业务数据、按钮、表格不丢失。
7. typecheck 通过。
8. build 通过。
```

## 11. 完成后反馈

```txt
1. 资源文件是否存在。
2. 修改文件清单。
3. Hero 图接入说明。
4. 图标替换说明。
5. typecheck 结果。
6. build 结果。
7. /admin/ability-list/base 截图。
```
