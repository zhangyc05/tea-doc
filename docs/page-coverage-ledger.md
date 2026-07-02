# 页面覆盖台账

更新时间：2026-07-02

本台账用于对齐“效果图是否已转为可运行页面”和“业务逻辑是否已闭环”。当前结论先按工程扫描建立，后续每个模块修正时逐图细化。

## 总览

```txt
效果图总数：178
管理端 PC 效果图：36
教师手机端效果图：142
管理端 Vue 页面：33
教师手机端 UniApp 页面：83
```

当前只能确认：

- 管理端和手机端均可通过类型检查和构建。
- 教师手机端 `teacher-mobile/src/pages.json` 注册页面与 `teacher-mobile/src/pages/**/index.vue` 文件一一对应。
- 不能仅凭页面数量证明所有效果图都完成了逐图、逐状态覆盖。

已验证命令：

```bash
cd frontend && npm run typecheck && npm run build
cd teacher-mobile && npm run typecheck && npm run build:h5 && npm run build:mp-weixin
```

## 管理端 PC

### 模块覆盖概览

| 模块 | 效果图数 | 当前源码/路由状态 | 结论 |
| --- | ---: | --- | --- |
| 能力清单 | 7 | 已有 `ability-list` 页面与路由 | 已完成逐图源码/路由映射，待视觉截图验收和业务闭环审计 |
| 成长档案 | 7 | 已有档案处理、导入、查阅、详情页面 | 已完成逐图源码/路由映射，待视觉截图验收和业务闭环审计 |
| 能力画像 | 4 | 已有群体画像、教师画像、教师详情页面 | 列表/卡片视图可能是同页多状态，需截图确认 |
| 发展活动 | 17 | 教学反思、培训、企业实践、虚拟教研均有页面 | 培训管理已完成逐图源码/路由映射，其余活动模块待细化 |
| 分析报告 | 1 | 已有报告卡片页 | 待确认按钮业务闭环 |

### 逐图台账：能力清单

| 效果图 | 源码 | 路由 | 页面状态 | 当前判定 |
| --- | --- | --- | --- | --- |
| `效果图/管理PC端/1能力清单/管理端PC｜能力清单｜基准模版查看页.png` | `frontend/src/pages/admin/ability-list/AbilityListBasePage.vue` | `/admin/ability-list/base` | 默认页，`active-key="ability-list-base"` | 已映射；存在“查看版本记录”“派生执行版”仅 `console.log` 的业务闭环风险 |
| `效果图/管理PC端/1能力清单/管理端PC｜能力清单｜基准模版优化建议.png` | `frontend/src/pages/admin/ability-list/AbilityListBaseOptimizationPage.vue` | `/admin/ability-list/base/optimization` | 从基准模板页 `goToOptimization()` 进入；支持建议筛选、采纳、暂缓、弃用的本地状态 | 已映射；待截图确认优化建议页密度和右侧详情 |
| `效果图/管理PC端/1能力清单/管理端PC｜能力清单｜执行版查看页.png` | `frontend/src/pages/admin/ability-list/AbilityListExecutionPage.vue` | `/admin/ability-list/execution` | 默认页，`active-key="ability-list-execution"` | 已映射；当前基准页 |
| `效果图/管理PC端/1能力清单/管理端PC｜能力清单｜执行版指标编辑抽屉.png` | `frontend/src/pages/admin/ability-list/AbilityListExecutionPage.vue` | `/admin/ability-list/execution` | 点击指标行编辑触发 `editingIndicator`，展示 `edit-drawer-overlay` | 已映射为同页抽屉状态；保存仅关闭抽屉并 `console.log`，待业务闭环 |
| `效果图/管理PC端/1能力清单/管理端PC｜能力清单｜执行版发布确认.png` | `frontend/src/pages/admin/ability-list/AbilityListPublishConfirmPage.vue` | `/admin/ability-list/execution/publish-confirm` | 发布确认页，`publishStatus` 从 `pending` 切为 `published` | 已映射；待确认入口是否从执行版页完整连通 |
| `效果图/管理PC端/1能力清单/管理端PC｜能力清单｜岗位与聘期要求映射.png` | `frontend/src/pages/admin/ability-list/AbilityListRequirementMappingPage.vue` | `/admin/ability-list/execution/requirement-mapping` | 默认页，左侧对象树、中间映射表、右侧详情 | 已映射；待业务审计“确认配置/删除/新增”的状态规则 |
| `效果图/管理PC端/1能力清单/管理端PC｜能力清单｜岗位与聘期要求映射编辑抽屉.png` | `frontend/src/pages/admin/ability-list/AbilityListRequirementMappingPage.vue` | `/admin/ability-list/execution/requirement-mapping` | 点击“编辑映射”或行内“编辑”触发 `editingMapping`，展示 `edit-drawer-overlay` | 已映射为同页抽屉状态；保存会更新本地 `mappings` |

### 逐图台账：成长档案

| 效果图 | 源码 | 路由 | 页面状态 | 当前判定 |
| --- | --- | --- | --- | --- |
| `效果图/管理PC端/2成长档案/管理端PC｜成长档案｜档案处理.png` | `frontend/src/pages/admin/archive/ArchiveProcessingPage.vue` | `/admin/archive/processing` | 默认页，左侧统计和筛选，中间处理记录列表，右侧记录详情 | 已映射；确认入档、退回、异常、补充说明当前为本地/日志式反馈 |
| `效果图/管理PC端/2成长档案/管理端PC｜成长档案｜导入部门资料｜上传资料页.png` | `frontend/src/pages/admin/archive/ArchiveImportUploadPage.vue` | `/admin/archive/import` | 上传资料页，点击“开始识别”进入批次详情 `?status=recognizing` | 已映射；上传文件仅前端本地列表状态 |
| `效果图/管理PC端/2成长档案/管理端PC｜成长档案｜导入批次详情｜识别中.png` | `frontend/src/pages/admin/archive/ArchiveImportBatchPage.vue` | `/admin/archive/import/:batchId?status=recognizing` | `isCompleted=false`；展示识别中、结果占位、刷新状态按钮 | 已映射；刷新跳转到 `?status=completed` |
| `效果图/管理PC端/2成长档案/管理端PC｜成长档案｜导入批次详情｜识别完成.png` | `frontend/src/pages/admin/archive/ArchiveImportBatchPage.vue` | `/admin/archive/import/:batchId?status=completed` | `isCompleted=true`；展示识别结果、查看上传文件、确认识别结果 | 已映射；确认后返回档案处理页 |
| `效果图/管理PC端/2成长档案/管理端PC｜成长档案｜教师档案查阅.png` | `frontend/src/pages/admin/archive/ArchiveQueryPage.vue` | `/admin/archive/query` | 默认查询页，`viewMode='card'`，教师卡片列表 | 已映射；列表/筛选为前端本地状态 |
| `效果图/管理PC端/2成长档案/管理端PC｜成长档案｜阅读档案详情.png` | `frontend/src/pages/admin/archive/ArchiveTeacherDetailPage.vue` | `/admin/archive/teacher/:teacherId` | 从档案查阅页 `viewTeacherDetail()` 进入；档案阅读详情 | 已映射；打印/导出为前端模拟动作 |
| `效果图/管理PC端/2成长档案/管理端PC｜成长档案｜来源详情.png` | `frontend/src/pages/admin/archive/ArchiveTeacherDetailPage.vue` | `/admin/archive/teacher/:teacherId` | 点击档案详情内来源入口触发 `drawerOpen`，展示“来源记录”抽屉 | 已映射为同页抽屉状态；来源详情不单独路由 |

### 逐图台账：培训管理

| 效果图 | 源码 | 路由 | 页面状态 | 当前判定 |
| --- | --- | --- | --- | --- |
| `效果图/管理PC端/4发展活动/2培训管理/管理端PC｜培训管理｜资源库.png` | `frontend/src/pages/admin/training/TrainingResourcePage.vue` | `/admin/training/resources` | 默认资源库页，资源列表、右侧资源摘要、筛选和新增本地状态 | 已映射；`ResourceLibraryPage.vue` 也存在但当前未挂路由，需后续确认清理或替换 |
| `效果图/管理PC端/4发展活动/2培训管理/管理端PC｜培训管理｜需求管理.png` | `frontend/src/pages/admin/training/TrainingDemandPage.vue` | `/admin/training/demands` | 默认需求管理页，需求表格、右侧需求摘要、待匹配筛选 | 已映射；新增需求只插入本地模拟数据 |
| `效果图/管理PC端/4发展活动/2培训管理/管理端PC｜培训管理｜申请处理.png` | `frontend/src/pages/admin/training/TrainingApplicationPage.vue` | `/admin/training/applications` | 默认申请处理页，申请表格、右侧申请摘要、同意处理本地状态 | 已映射；退回/同意流程需业务规则审计 |
| `效果图/管理PC端/4发展活动/2培训管理/管理端PC｜培训管理｜记录总览.png` | `frontend/src/pages/admin/training/TrainingRecordPage.vue` | `/admin/training/records` | 默认记录总览页，记录表格、材料状态筛选 | 已映射；“查看材料待完善记录”为本地筛选 |
| `效果图/管理PC端/4发展活动/2培训管理/管理端PC｜培训管理｜培训记录详情.png` | `frontend/src/pages/admin/training/TrainingRecordDetailPage.vue` | `/admin/training/records/:recordId` | 从记录总览 `viewDetail()` 进入；记录详情、总结和证书材料 | 已映射；上传材料是本地提示状态 |
| `效果图/管理PC端/4发展活动/2培训管理/管理端PC｜培训管理｜培训计划｜附属流程.png` | `frontend/src/pages/admin/training/TrainingPlanPage.vue` | `/admin/training/plans` | 默认计划管理页，计划表格、提醒、相关计划筛选 | 已映射；页面名为计划管理，效果图称“培训计划｜附属流程” |
| `效果图/管理PC端/4发展活动/2培训管理/管理端PC｜培训管理｜新建培训计划｜附属流程.png` | `frontend/src/pages/admin/training/TrainingPlanPage.vue` | `/admin/training/plans` | 点击“新建培训计划”触发 `showDrawer`，展示新建计划抽屉 | 已映射为同页抽屉状态；保存草稿/发布仅本地提示 |
| `效果图/管理PC端/4发展活动/2培训管理/管理端PC｜培训管理｜培训计划详情｜附属流程.png` | `frontend/src/pages/admin/training/TrainingPlanDetailPage.vue` | `/admin/training/plans/:planId` | 从计划管理 `viewDetail()` 进入；计划基本信息、关联需求、安排、参与教师 | 已映射；同意申请为本地状态，教师详情跳转到成长档案详情 |

### 已处理问题

| 日期 | 问题 | 位置 | 处理 |
| --- | --- | --- | --- |
| 2026-07-02 | `/admin/archive/import` 路由重复 | `frontend/src/router/admin.routes.ts` | 删除无菜单入口、无效果图对应的“教师档案总览”占位路由，保留导入上传页 |

### 待处理问题

| 优先级 | 问题 | 位置 | 建议 |
| --- | --- | --- | --- |
| P1 | 存在占位页路由 | `/admin/system` | 台账标记为非效果图页面或补真实页面 |
| P1 | 多个按钮仅写 `operationMessage` 或 `console.log` | 管理端多页面 | 模块审计时区分视觉态与业务闭环 |
| P2 | 培训资源存在未挂路由页面 | `frontend/src/pages/admin/training/ResourceLibraryPage.vue` | 确认是否替换当前 `TrainingResourcePage.vue`，否则清理未使用页面 |

### 业务逻辑审计起点

视觉还原已在转化阶段验收过，下一阶段不重复做大规模截图验收，优先审计业务闭环。以下是三组模块的第一批业务风险点：

| 模块 | 风险点 | 位置 | 建议处理 |
| --- | --- | --- | --- |
| 能力清单 | 基准模板页“编辑指标”“查看版本记录”“派生执行版”仅 `console.log`，但页面上是明确操作按钮 | `frontend/src/pages/admin/ability-list/AbilityListBasePage.vue` | 明确这些按钮是否保留；保留则补抽屉/页面/状态反馈，否则降级为不可点击说明 |
| 能力清单 | 执行版指标编辑抽屉保存仅 `console.log` 并关闭，未更新列表数据 | `frontend/src/pages/admin/ability-list/AbilityListExecutionPage.vue` | 先做本地状态更新，后续再接接口 |
| 能力清单 | 发布确认页可切换已发布状态，但执行版列表/入口不感知发布结果 | `frontend/src/pages/admin/ability-list/AbilityListPublishConfirmPage.vue` | 明确发布后的返回页提示和执行版状态口径 |
| 成长档案 | 档案处理页“确认入档/再次退回/标记异常/查看补充说明”均为 `console.log` | `frontend/src/pages/admin/archive/ArchiveProcessingPage.vue` | 至少补本地状态变更和右侧处理记录更新 |
| 成长档案 | 导入批次“确认识别结果”直接返回档案处理页，但不生成可见待处理记录 | `frontend/src/pages/admin/archive/ArchiveImportBatchPage.vue` | 返回后应能看到对应批次生成的待处理记录或提示 |
| 成长档案 | 档案详情“来源记录”抽屉只展示统一来源列表，未按打开的档案栏目过滤 | `frontend/src/pages/admin/archive/ArchiveTeacherDetailPage.vue` | 按 `drawerType` 过滤来源记录或明确为全量来源记录 |
| 培训管理 | 资源、需求、申请页面大量操作只更新右侧摘要或提示，不形成跨页面数据 | `frontend/src/pages/admin/training/TrainingResourcePage.vue`、`TrainingDemandPage.vue`、`TrainingApplicationPage.vue` | 先定义资源-需求-计划-申请-记录的数据流口径 |
| 培训管理 | 新建培训计划保存/发布只显示提示，未把新计划加入列表 | `frontend/src/pages/admin/training/TrainingPlanPage.vue` | 保存草稿/发布后应插入计划列表并体现状态 |
| 培训管理 | 计划详情“同意申请”只更新当前详情页参与教师状态，申请处理页不感知 | `frontend/src/pages/admin/training/TrainingPlanDetailPage.vue` | 明确申请处理和计划详情是否共享同一申请状态 |
| 培训管理 | 培训记录详情“上传证书”只改当前页材料状态，记录总览不感知 | `frontend/src/pages/admin/training/TrainingRecordDetailPage.vue` | 上传后记录总览材料状态应同步变为完整 |

### 当前管理端源码页面

```txt
frontend/src/pages/admin/ability-list/AbilityListBaseOptimizationPage.vue
frontend/src/pages/admin/ability-list/AbilityListBasePage.vue
frontend/src/pages/admin/ability-list/AbilityListExecutionPage.vue
frontend/src/pages/admin/ability-list/AbilityListPublishConfirmPage.vue
frontend/src/pages/admin/ability-list/AbilityListRequirementMappingPage.vue
frontend/src/pages/admin/ability-profile/AbilityProfileGroupPage.vue
frontend/src/pages/admin/ability-profile/AbilityProfileTeacherDetailPage.vue
frontend/src/pages/admin/ability-profile/AbilityProfileTeacherPage.vue
frontend/src/pages/admin/archive/ArchiveImportBatchPage.vue
frontend/src/pages/admin/archive/ArchiveImportUploadPage.vue
frontend/src/pages/admin/archive/ArchiveProcessingPage.vue
frontend/src/pages/admin/archive/ArchiveQueryPage.vue
frontend/src/pages/admin/archive/ArchiveTeacherDetailPage.vue
frontend/src/pages/admin/practice/PracticeApplicationPage.vue
frontend/src/pages/admin/practice/PracticeRecordPage.vue
frontend/src/pages/admin/practice/PracticeTrackingPage.vue
frontend/src/pages/admin/reflection/ReflectionDetailPage.vue
frontend/src/pages/admin/reflection/ReflectionOverviewPage.vue
frontend/src/pages/admin/reports/ReportCenterPage.vue
frontend/src/pages/admin/training/TrainingApplicationPage.vue
frontend/src/pages/admin/training/TrainingDemandPage.vue
frontend/src/pages/admin/training/TrainingPlanDetailPage.vue
frontend/src/pages/admin/training/TrainingPlanPage.vue
frontend/src/pages/admin/training/TrainingRecordDetailPage.vue
frontend/src/pages/admin/training/TrainingRecordPage.vue
frontend/src/pages/admin/training/TrainingResourcePage.vue
frontend/src/pages/admin/virtual-lab/VirtualLabActivityDetailPage.vue
frontend/src/pages/admin/virtual-lab/VirtualLabRecordDetailPage.vue
frontend/src/pages/admin/virtual-lab/VirtualLabRoomDetailPage.vue
frontend/src/pages/admin/virtual-lab/VirtualLabRoomPage.vue
```

说明：`AdminPlaceholderPage.vue` 和 `ability-profile/components/SimpleRadarChart.vue` 不计入效果图页面。

## 教师手机端

### 模块覆盖概览

| 模块 | 效果图数 | 当前页面状态 | 结论 |
| --- | ---: | --- | --- |
| 待办 | 9 | 已有待办首页、全部待办、动态、证书详情/编辑/提交结果等页面 | 基本可注册，需补动态筛选等逐图确认 |
| 档案 | 54 | 当前只有档案首页、记录查询、我的主页等少量入口类页面 | 高风险，需优先逐图核对缺口 |
| 活动 | 71 | 教学反思、培训、企业实践、虚拟教研大量页面已注册 | 已转化最多，但仍需业务流审计 |
| 我的 | 6 | 当前有 `profile/index.vue` | 多个效果图可能未逐图覆盖 |
| AI 助手 | 2 | 目前未发现独立 AI 助手页面 | 高风险，需确认是否暂挂活动页或未实现 |

### 已确认注册状态

`teacher-mobile/src/pages.json` 中 `83` 个页面均存在对应 `index.vue` 文件，无未注册页面、无注册缺失文件。

### 已发现问题

| 优先级 | 问题 | 位置 | 建议 |
| --- | --- | --- | --- |
| P0 | 手机端效果图 142 张，但注册页面 83 个 | `teacher-mobile/src/pages` | 逐图判断“一页多状态”还是未覆盖 |
| P0 | 档案模块效果图 54 张，当前页面数量明显不足 | `效果图/教师手机端/1档案` | 下一轮优先建立档案模块逐图台账 |
| P1 | AI 助手效果图存在，但当前未见独立页面 | `效果图/教师手机端/4AI助手` | 明确是否新建 AI 助手入口页 |
| P2 | 构建有大量 Sass deprecation warning | `teacher-mobile/src/**/*.vue`、`wot-design-uni` | 暂不阻塞，后续统一处理 |

## 下一步推进计划

1. 先定义管理端三组模块的数据流口径：能力清单发布流、档案导入/处理流、培训资源-需求-计划-申请-记录流。
2. 按上方“业务逻辑审计起点”逐项收敛：能闭环的先做本地状态闭环，暂不实现的按钮降级或标注。
3. 建立手机端逐图台账，优先档案、AI 助手、我的。
4. 继续细化管理端剩余模块：能力画像、教学反思、企业实践、虚拟教研、分析报告。
5. 对所有“视觉态按钮”标记业务闭环状态，避免误报完成。
