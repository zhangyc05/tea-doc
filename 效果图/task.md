# 教师手机端页面实现任务说明

> **说明**：这份文档可以直接交给另一个智能体作为项目接手说明。

## 📋 项目目标

在 `tea-doc` 项目中，将 `效果图/教师手机端/` 目录下的剩余手机端效果图逐页转换成 `teacher-mobile/` 工程页面。

**范围限定**：
- ✅ **当前任务**：教师手机端页面实现
- ❌ **不在范围内**：管理端 PC（管理端 PC 位于 `frontend/` 目录，**请勿修改**）

## 📂 工程位置

| 资源类型 | 路径 | 说明 |
|---------|------|------|
| 手机端工程 | `tea-doc/teacher-mobile` | 目标工程目录 |
| 实现规则文档 | `tea-doc/teacher-mobile/docs/mobile-implementation.md` | 详细实现规范 |
| 页面路由配置 | `tea-doc/teacher-mobile/src/pages.json` | 路由配置文件 |
| 目标效果图 | `tea-doc/效果图/教师手机端` | 待实现的效果图目录 |
## 🔍 当前工作状态

### Git 工作区
- ✅ 当前 git 工作区干净，无未提交改动

### 基准页面
已建立教师手机端基础工程和移动端视觉基准：

| 项目 | 路径 |
|------|------|
| **基准页面** | 活动首页 |
| **源码** | `tea-doc/teacher-mobile/src/pages/activity/index.vue` |
| **目标图** | `tea-doc/效果图/教师手机端/2活动/活动首页/教师端手机｜活动｜活动首页.png` |

### 已沉淀的基础组件

| 组件名 | 路径 |
|--------|------|
| MobileNavbar | `tea-doc/teacher-mobile/src/components/MobileNavbar.vue` |
| MobilePageShell | `tea-doc/teacher-mobile/src/components/MobilePageShell.vue` |
| MobileCard | `tea-doc/teacher-mobile/src/components/MobileCard.vue` |
| MobileStatusTag | `tea-doc/teacher-mobile/src/components/MobileStatusTag.vue` |
| MobileActionButton | `tea-doc/teacher-mobile/src/components/MobileActionButton.vue` |
| MobileTabBar | `tea-doc/teacher-mobile/src/components/MobileTabBar.vue` |
## ✅ 已完成页面

> 详见 `teacher-mobile/docs/mobile-implementation.md` 当前记录

### 按模块分类

**活动模块**
- 活动首页

**教学反思模块**
- 教学反思开始方式
- 教学反思选择学期课程
- 教学反思选择反思依据
- 教学反思反思范围
- 教学反思自主反思
- 教学反思 AI 引导对话
- 教学反思-AI 对话
- 教学反思报告草稿编辑
- 教学反思确认成功

**培训进修模块**
- 培训进修首页
- 培训进修
- 培训申请
- 培训总结
- 培训材料归档提交结果
- 提交培训需求
- 培训需求提交
- 培训需求已提交
- 我已找到想参加的培训

**企业实践模块**
- 企业实践年度概览
- 企业实践年度列表
- 企业实践提交实践计划
- 企业实践实践计划确认提交
- 企业实践实践计划已通过
- 企业实践实践计划退回修改
- 企业实践修改实践计划
- 企业实践进行中详情
- 企业实践记录实践日志
- 企业实践-实践日志
- 企业实践记录已入档
- 企业实践上传实践证明
- 企业实践补充实践证明
- 企业实践补充材料已提交

**待办模块**
- 待办首页
- 全部待办
- 全部动态
- 待确认记录详情
- 编辑待确认记录
- 修改已提交
## 🎯 当前建议的下一步

### 优先级顺序

继续完成 **活动｜企业实践** 模块的剩余页面：

1. 企业实践｜重新补充材料 ← **下一个**
2. 企业实践｜需要补充材料
3. 企业实践｜补充历史实践
4. 企业实践｜历史实践需补充材料
5. 企业实践｜历史实践已确认
6. 企业实践｜归档提交结果
7. 企业实践｜企业实践-修改档案信息
8. 企业实践｜导入导出页面
9. 企业实践｜工作流配置
10. 企业实践｜登录历史页面
11. 企业实践｜高级搜索页面

### 下一个具体任务

| 项目 | 内容 |
|------|------|
| **目标图** | `tea-doc/效果图/教师手机端/2活动/3企业实践/教师端手机｜活动｜企业实践｜重新补充材料.png` |
| **建议页面路径** | `tea-doc/teacher-mobile/src/pages/activity/enterprise-resupplement/index.vue` |
| **建议路由** | `pages/activity/enterprise-resupplement/index` |
## 📝 执行规则

### 单页面执行流程

**原则**：每次只做一个页面，逐页推进

1. 📸 **查看目标效果图**
   - 仔细分析目标图的布局、样式、交互

2. 📖 **参考相邻页面**
   - 只读取相邻已完成页面和必要组件
   - 保持视觉和代码的一致性

3. 💻 **编写/修改页面**
   - 新增或修改页面 Vue 文件

4. ⚙️ **更新配置**
   - 更新 `tea-doc/teacher-mobile/src/pages.json`
   - 更新 `tea-doc/teacher-mobile/docs/mobile-implementation.md`

5. ✅ **运行校验**
   ```bash
   cd tea-doc/teacher-mobile
   npm run typecheck
   npm run build:h5
   npm run build:mp-weixin
   ```

   > **注意**：H5 和小程序构建可能出现 Sass deprecation warnings，这是当前工程已有警告。只要命令退出码为 0，不作为失败处理。
## ⚠️ 关键约束

### 禁止事项

| 约束项 | 说明 |
|--------|------|
| ❌ 不修改 `tea-doc/frontend` | 管理端 PC 位于此处，不在任务范围内 |
| ❌ 不批量生成页面 | 每次只做一个页面，保证质量 |
| ❌ 不提前抽通用组件 | 不为了未来可能的需求提前抽象组件 |
| ❌ 不启用原生 tabBar | 继续使用项目级组件 |

### 必须遵守

| 要求 | 说明 |
|------|------|
| ✅ 页面壳层组件 | 必须使用项目级 `MobileNavbar`、`MobilePageShell`、`MobileTabBar` |
| ✅ UI 组件优先级 | 表单、上传、选择器、弹窗、Toast 优先使用 **Wot Design Uni** |
| ✅ 视觉标准 | 页面视觉以目标图为准，**不写死单一截图尺寸** |
| ✅ 视口验收 | 按文档基准验收：390×844、375×812、430×932、360×800 |

## 🗺️ 后续大阶段

企业实践模块完成后，建议按以下顺序继续：

1. **活动**｜虚拟教研
2. 活动首页补充状态
3. 待办剩余状态页
4. **档案**｜首页与查询
5. **档案**｜各分类模块
6. **我的**
7. **AI 助手**

---

**文档版本**：已优化
**最后更新**：2026-07-01