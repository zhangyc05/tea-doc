# 管理端PC｜能力清单｜执行版查看页｜还原验收说明

## 一、还原目标

将仓库中的目标效果图：

```text
效果图/管理PC端/1能力清单/管理端PC｜能力清单｜执行版查看页.png
```

还原到 Vue 页面：

```text
/admin/ability-list/execution
```

当前还原策略：

- 页面结构、布局、颜色、卡片、阴影、表格密度参考目标图；
- 文字和字段以 `docs/design/管理端PC_能力清单_执行版查看页_内容校准基准.md` 为准；
- 右侧插画使用 Vue 内嵌 SVG 近似还原，后续如需更接近目标图，可将目标图插画区域裁切为前端图片资产。

---

## 二、当前实现涉及文件

```text
frontend/src/styles/tokens.css
frontend/src/components/layout/AdminTopbar.vue
frontend/src/components/layout/AdminSidebar.vue
frontend/src/pages/admin/ability-list/AbilityListExecutionPage.vue
```

---

## 三、1920 画布口径

- 目标视口：1920 × 1080
- 左侧导航宽度：330px
- 顶部栏高度：90px
- 管理端内容最大宽度：1518px
- 页面背景：浅蓝白教育 SaaS 风格

---

## 四、本地验收步骤

```bash
cd frontend
npm install
npm run dev
```

打开：

```text
/admin/ability-list/execution
```

浏览器建议设置：

```text
1920 × 1080
100% 缩放
```

---

## 五、第一轮人工验收重点

1. 左侧导航宽度是否接近目标图；
2. 顶部栏高度、筛选框、消息和头像是否接近目标图；
3. 执行版横幅高度和右侧插画是否接近目标图；
4. 能力结构卡与指标矩阵卡比例是否接近目标图；
5. 表格列宽、行高、状态标签、编辑入口是否清晰；
6. 页面文字是否与内容校准基准一致。

---

## 六、后续像素级增强建议

如需进一步逼近目标图，可增加 Playwright 截图对比流程：

1. 安装 Playwright；
2. 固定 viewport 为 1920 × 1080；
3. 截取 `/admin/ability-list/execution`；
4. 与目标图进行像素差异比对；
5. 按差异调整 CSS。

当前仓库未引入 Playwright，避免本次提交额外增加依赖和锁文件变更。
