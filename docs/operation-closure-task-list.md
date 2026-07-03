# 页面操作闭环任务列表

更新时间：2026-07-03

本文档用于承接“页面之间的操作逻辑是否闭环”的下一阶段推进。当前任务只基于本地 mock / 本地 store，不接真实后端；真实接口、真实附件上传、真实会议 SDK 和真实 AI 服务只作为后续替换项，不阻塞当前本地闭环。

## 1. 完成口径

每个任务完成时必须同时满足：

- 页面上看起来可点击的链接、按钮、卡片、文件行有明确行为。
- 行为必须属于以下三类之一：真实路由跳转、本地状态写入 / 读取、明确降级提示。
- 纯展示内容不能使用 `button` 或可点击卡片伪装。
- 提交类动作必须写入对应本地 domain/store，并能在结果页、列表页或详情页回显。
- 涉及页面覆盖、业务对象或状态口径变化时，同步更新 `docs/page-coverage-ledger.md` 和 `docs/business-logic-map.md`。

## 1.1 自动复扫命令

页面闭环不依赖人工记忆，新增统一复扫脚本：

```bash
node scripts/verify-page-action-closure.mjs
```

也可从任一子项目执行：

```bash
cd frontend && npm run test:page-actions
cd teacher-mobile && npm run test:page-actions
```

脚本会扫描 `frontend/src/pages/**/*.vue` 和 `teacher-mobile/src/pages/**/*.vue` 中的 `@click`、`@tap`、`href="#"` 等动作，并按导航、本地状态、明确降级、未知和高风险空操作分类。

- `critical`：必须修复，包含未定义 handler、空绑定、`href="#"`、纯 `console.log` 等高风险空动作。
- `warning`：进入人工复核或后续任务，通常是明确降级提示、复杂表达式或脚本暂无法静态判断的状态动作。
- `0 critical` 只代表没有发现高风险空操作；页面是否业务完整仍以本清单、业务地图和模块行为测试共同判断。

## 2. 当前扫描结论

- `teacher-mobile/src/pages.json` 注册页面数为 102，`teacher-mobile/src/pages/**/index.vue` 页面文件数为 102，注册关系当前一致。
- 管理端已完成 `console.log` 空动作、占位路由、无动作按钮和大部分降级提示治理；当前管理端剩余优先级低于手机端。
- 手机端剩余断点主要集中在 `showToast()` / `uni.showToast()` 承接的动作：部分只是合理反馈，部分仍应升级为状态写入、路由跳转或只读展示。
- 第一轮动作审计已完成，优先改造页集中在 AI 助手、待办、教学反思、企业实践、虚拟教研和我的模块；已把这些页面拆入 `OC-P0-02` 至 `OC-P1-06`。
- 台账中大量 G/M/D/F 编号已完成，后续清单只列仍需要推进的任务。

## 3. P0：手机端操作闭环主任务

| 编号 | 任务 | 主要文件 | 完成标准 | 验证 |
| --- | --- | --- | --- | --- |
| OC-P0-01 | 建立手机端可点击动作审计清单 | `teacher-mobile/src/pages/**/*.vue`、`teacher-mobile/docs/mobile-design-system-guide.md` | 扫描所有 `@tap`、`@click`、`showToast()`、`uni.showToast()`；按真实跳转、本地状态、降级提示、应改只读四类标记；把第一批需要改造的页面写入本文档或台账 | 文档自检 |
| OC-P0-02 | 补 AI 助手“解读能力画像”入口闭环 | `teacher-mobile/src/pages/assistant/index.vue`、`teacher-mobile/src/pages/profile/ability-profile/index.vue`、`teacher-mobile/src/pages/profile/development-report/index.vue` | “解读能力画像”不能只提示页面待补齐；至少跳转到能力画像页或发展报告页，并用本地画像 / 档案数据展示解读结果入口 | `cd teacher-mobile && npm run typecheck && npm run build:h5 && npm run build:mp-weixin` |
| OC-P0-03 | 补 AI 助手补充档案与待核验记录回显 | `teacher-mobile/src/pages/assistant/archive-supplement/index.vue`、`teacher-mobile/src/pages/assistant/archive-supplement-submitted/index.vue`、`teacher-mobile/src/domain/archive.ts` | 提交后生成的 `pending-verify` 记录必须能从结果页进入统一档案记录详情和待确认列表；结果页展示同一条记录状态，不只显示静态成功文案 | `cd teacher-mobile && npm run test:assistant-archive && npm run typecheck` |
| OC-P0-04 | 补待办首页和全部待办的行动按钮 | `teacher-mobile/src/pages/todo/index.vue`、`teacher-mobile/src/pages/todo/all/index.vue`、`teacher-mobile/src/stores/todoStore.ts` | 待办卡片上的 `item.action` 不能只 toast；按待办类型进入证书详情、档案详情、企业实践补充、教学反思草稿或虚拟教研贡献确认 | `cd teacher-mobile && npm run test:todo-business && npm run typecheck` |
| OC-P0-05 | 补待办动态筛选抽屉真实筛选 | `teacher-mobile/src/pages/todo/dynamics-filter/index.vue`、`teacher-mobile/src/pages/todo/dynamics/index.vue`、`teacher-mobile/src/stores/todoStore.ts` | 筛选、重置、关闭、查看结果必须改变筛选状态或返回动态列表；动态列表读取筛选后的同源 `todoDynamics`，不只 toast | `cd teacher-mobile && npm run test:todo-business && npm run typecheck` |
| OC-P0-06 | 补教学反思材料选择动作回写 | `teacher-mobile/src/pages/activity/reflection-course/index.vue`、`reflection-evidence/index.vue`、`reflection-scope/index.vue`、`reflection-self/index.vue`、`reflection-ai-chat/index.vue`、`teacher-mobile/src/domain/reflection.ts` | 课程、课次、材料、录音、阶段材料、AI 对话添加依据等动作调用 `selectReflectionCourse()`、`selectReflectionLesson()`、`selectReflectionEvidence()` 或 `addReflectionMaterial()`，草稿页能读到同一记录和依据集合 | `cd teacher-mobile && npm run typecheck && npm run build:h5` |
| OC-P0-07 | 补企业实践补充材料和日志详情动作 | `teacher-mobile/src/pages/activity/enterprise-advanced-search/index.vue`、`enterprise-login-history/index.vue`、`enterprise-workflow-config/index.vue`、`enterprise-archive-edit/index.vue`、`teacher-mobile/src/domain/enterprise.ts` | 上传证明、稍后处理、提交补充、查看日志、修改草稿、重新整理、补充资料、返回实践日志等动作写入企业实践本地记录或真实跳转 | `cd teacher-mobile && npm run test:enterprise-archive && npm run typecheck` |
| OC-P0-08 | 补虚拟教研活动列表和贡献确认入口 | `teacher-mobile/src/pages/activity/virtual-research-activity-list/index.vue`、`virtual-research-invitation/index.vue`、`virtual-research-activity-detail-confirm/index.vue`、`virtual-research-confirm-contribution/index.vue`、`teacher-mobile/src/domain/virtualResearch.ts` | 活动筛选、了解规则、近期活动、贡献待确认、查看全部、材料项、语音 / 拍照 / 上传必须变为真实筛选、真实路由、本地材料写入或明确只读 / 降级 | `cd teacher-mobile && npm run typecheck && npm run build:h5` |

## 4. P1：手机端模块增强任务

| 编号 | 任务 | 主要文件 | 完成标准 | 验证 |
| --- | --- | --- | --- | --- |
| OC-P1-01 | 补培训总结页编辑 / AI 优化 / 材料动作状态回写 | `teacher-mobile/src/pages/activity/training-summary/index.vue`、`teacher-mobile/src/domain/training.ts` | 修改总结、AI 优化、材料更新、保存草稿必须写入同一培训记录；提交归档结果页读取同一记录 | `cd teacher-mobile && npm run typecheck && npm run build:h5` |
| OC-P1-02 | 补我的发展报告动作边界 | `teacher-mobile/src/pages/profile/development-report/index.vue`、`teacher-mobile/src/pages/profile/ability-profile/records/index.vue` | 导出、AI 解读、查看证据要么进入已有能力画像 / 画像记录 / 档案详情，要么明确保持降级且台账标记不算业务闭环 | `cd teacher-mobile && npm run test:profile-business && npm run typecheck` |
| OC-P1-03 | 补聘期要求对照的“补充材料 / 去完成”入口 | `teacher-mobile/src/pages/profile/tenure-requirement/index.vue`、`teacher-mobile/src/pages/archive/*`、`teacher-mobile/src/pages/activity/*` | 按要求项跳转到档案补充、培训、企业实践或虚拟教研入口；不能只提示“暂未接入” | `cd teacher-mobile && npm run test:profile-business && npm run typecheck` |
| OC-P1-04 | 补档案附件预览统一降级模型 | `teacher-mobile/src/domain/archive.ts`、`teacher-mobile/src/pages/archive/basic-info-detail/index.vue`、`teacher-mobile/src/pages/archive/record-detail/index.vue` | 所有档案材料预览用统一函数返回标题、状态、来源和降级说明；页面不散落各自 toast 文案 | `cd teacher-mobile && npm run test:archive-detail && npm run typecheck` |
| OC-P1-05 | 补虚拟教研成员资料页动作归属 | `teacher-mobile/src/pages/activity/virtual-research-profile-intro-edit/index.vue`、`virtual-research-position-management/index.vue`、`virtual-research-work-experience-management/index.vue`、`virtual-research-skill-management/index.vue`、`virtual-research-role-assignment/index.vue` | 成员资料页动作只写虚拟教研成员资料状态；不直接写正式成长档案。返回教研室、查看提交内容、进度跟踪等入口要真实跳转或只读 | `cd teacher-mobile && npm run typecheck && npm run build:h5` |
| OC-P1-06 | 补虚拟教研材料来源模型 | `teacher-mobile/src/domain/virtualResearch.ts`、`teacher-mobile/src/pages/activity/virtual-research-*` | 阶段材料、会议纪要、任务分工、发言摘录和个人贡献之间有统一材料来源字段，归档结果能追溯来源材料 | `cd teacher-mobile && npm run typecheck && npm run build:h5 && npm run build:mp-weixin` |

## 5. P2：管理端剩余闭环任务

| 编号 | 任务 | 主要文件 | 完成标准 | 验证 |
| --- | --- | --- | --- | --- |
| OC-P2-01 | 管理端成长档案真实导出闭环 | `frontend/src/pages/admin/archive/ArchiveTeacherDetailPage.vue`、`frontend/src/stores/admin/archiveStore.ts` | 当前导出是前端示例；如要标记业务闭环，需要生成可追溯导出任务或本地导出记录，否则继续保留降级提示并在台账中说明 | `cd frontend && npm run test && npm run typecheck && npm run build` |
| OC-P2-02 | 管理端实践导出任务状态化 | `frontend/src/pages/admin/practice/PracticeTrackingPage.vue`、`frontend/src/pages/admin/practice/PracticeRecordPage.vue`、`frontend/src/stores/admin/practiceStore.ts` | 导出名单 / 导出记录从纯提示升级为本地导出任务，展示导出中、完成、失败状态；若不做真实文件，明确为模拟任务 | `cd frontend && npm run test:stores && npm run typecheck && npm run build` |
| OC-P2-03 | 管理端能力画像群体聚合深化 | `frontend/src/services/mock/ability-profile.ts`、`frontend/src/pages/admin/ability-profile/*` | 群体画像不只依赖静态 mock，能基于教师画像、档案事实和执行版指标聚合；院系 / 专业定位仍可保持页内筛选态 | `cd frontend && npm run test && npm run typecheck && npm run build` |
| OC-P2-04 | 管理端新增页面按钮防回归复扫 | `frontend/src/pages/admin/adminVisualActions.test.ts`、`frontend/src/pages/admin/**/*.vue` | 每轮新增或改造页面后，复扫原生 `button`、公共 `Button`、`operationMessage`，确保无空动作按钮回归 | `cd frontend && npm run test && npm run typecheck && npm run build` |

## 6. 已推进记录

| 编号 | 当前状态 | 证据 |
| --- | --- | --- |
| OC-P0-01 | 已完成第一轮审计 | 已扫描 `teacher-mobile/src/pages/**/*.vue` 中的 `@tap`、`@click`、`showToast()`、`uni.showToast()` 命中；第一批改造页已拆到 `OC-P0-02` 至 `OC-P1-06` |
| OC-P0-02 | 已补代码并通过验证 | `teacher-mobile/src/pages/assistant/index.vue` 的“解读能力画像”已跳转 `/pages/profile/ability-profile/index?from=assistant`；`teacher-mobile/scripts/verify-profile-business.mjs` 已加入防回归断言；`test:profile-business`、`typecheck`、`build:h5`、`build:mp-weixin` 已通过 |
| OC-P0-03 | 已由既有实现满足并通过验证 | `archive-supplement` 提交调用 `createArchiveSupplementRecord()`，结果页按 `recordId` 读取同一 `pending-verify` 记录并展示 `processingQueueTrace`；`test:assistant-archive` 已通过 |
| OC-P0-04 | 已补代码并通过目标验证 | 待办首页和全部待办的行动按钮只按 `getTodoActionUrl()` 进入对应业务页面，不再回退到 action 文案 toast；`test:todo-business` 已加入防回归断言并通过 |
| OC-P0-05 | 已补代码并通过目标验证 | `todoStore` 新增 `dynamicFilter`、`setTodoDynamicFilter()`、`resetTodoDynamicFilter()`、`getFilteredTodoDynamics()`；动态页和独立筛选页共享筛选状态，不再用 toast 承接筛选动作；`test:todo-business` 和 `typecheck` 已通过 |
| OC-P0-06 | 已补代码并通过目标验证 | 教学反思课程、课次、阶段、自主反思和 AI 对话页的材料动作写入 `reflection` 本地状态并回显材料 / 依据数量；草稿页从 `getMobileReflectionState()` 读取同一记录和依据集合；`test:reflection-business` 和 `typecheck` 已通过 |
| OC-P0-07 | 已补代码并通过目标验证 | 企业实践补充页上传证明写入 `addEnterpriseSupplementMaterial()`，提交补充进入待核验结果；总结页查看日志真实跳转，修改 / 重新整理 / 保存写归档草稿，补充资料写材料；日志详情返回实践日志真实返回；档案编辑页补充材料进入补充页；`test:enterprise-business`、`test:enterprise-archive` 和 `typecheck` 已通过 |
| OC-P0-08 | 已补代码并通过目标验证 | 虚拟教研活动列表筛选 / 规则说明、邀请页近期活动 / 贡献待确认、待确认贡献页语音 / 拍照 / 上传、完整贡献确认页贡献项 / 查看全部 / 材料项已改为本地筛选、真实路由、本地材料写入或明确降级预览；`test:virtual-research-business` 和 `typecheck` 已通过 |
| OC-P1-01 | 已补代码并通过目标验证 | 培训总结页修改总结调用 `updateTrainingSummaryDraft()` 写回同一培训记录，AI 优化、材料更新和保存草稿继续更新同一记录并通过 `trainingState.operationMessage` 回显；`test:training-business` 和 `typecheck` 已通过 |
| OC-P1-02 | 已补代码并通过目标验证 | 个人发展报告“导出报告”改为明确 `showModal` 降级说明，不标记为正式导出闭环；“AI 解读”进入 `/pages/profile/ability-profile/index?from=development-report`；依据记录继续进入画像记录或统一档案详情；`test:profile-business` 和 `typecheck` 已通过 |
| OC-P1-03 | 已补代码并通过目标验证 | 聘期要求对照“补充企业实践证明材料 / 提交课程案例成果 / 关注聘期风险提醒”分别进入企业实践材料、虚拟教研活动和目标岗位对照入口，不再以暂未接入 toast 承接；`test:profile-business` 已通过 |
| OC-P1-04 | 已补代码并通过目标验证 | `previewArchiveMaterial()` 统一返回材料标题、状态、来源和降级说明；基本信息详情和统一档案详情均使用同一模型展示材料预览降级提示；`test:archive-detail` 已通过 |
| OC-P1-05 | 已补代码并通过目标验证 | 虚拟教研成员资料页动作新增 `recordMemberProfileAction()` 本地状态记录；贡献提交结果页进度 / 返回 / 提交内容进入真实虚拟教研页面，贡献和材料项进入详情或预览；已加入教研室页四个查看入口进入对应活动、纪要、阶段材料、贡献详情；补充遗漏贡献页语音写入补充材料集合，依据项记录成员资料动作；`test:virtual-research-business` 已通过 |
| OC-P1-06 | 已补代码并通过目标验证 | 虚拟教研材料来源模型已补：会议纪要、任务分工、发言摘录、阶段材料和个人贡献统一为 `VirtualResearchEvidenceSourceKey` / `VirtualResearchSourceTrace`，贡献确认和归档结果页用 `sourceKeys` 展示同一来源口径，归档待确认记录写入来源材料和附件追溯；`test:virtual-research-business` 已通过 |
| OC-P2-01 | 已补代码并通过目标验证 | 管理端教师成长档案导出新增 `archiveStore.exportRecords` 本地导出记录，记录教师、周期、事实数量、文件名、状态和操作人；教师档案详情页导出 PDF 调用 `createTeacherArchiveExportRecord()` 并显示最近导出记录，同时保留 mock 文本文件下载；`test:stores -- archiveStore.test.ts` 和 `typecheck` 已通过 |
| OC-P2-02 | 已补代码并通过目标验证 | 管理端实践导出新增 `practiceStore.exportTasks` 本地模拟导出任务，年度实践跟踪“导出名单”和实践记录“导出记录”按当前筛选结果写入导出中、已完成或失败状态，并展示最近任务文件名、条数和失败原因；`test:stores -- practiceStore.test.ts` 已通过 |
| OC-P2-03 | 已补代码并通过目标验证 | 管理端群体画像新增 `calculateAbilityProfileGroup()`，基于教师画像、正式档案事实和执行版指标聚合综合指数、雷达分、维度分布、发展支持方向和关注对象；群体画像页读取 `archiveStore.teacherArchiveFacts` 与 `abilityListStore.executionIndicators`，不再只依赖固定静态 mock；`test -- ability-profile.test.ts` 已通过 |
| OC-P2-04 | 已完成复扫并通过目标验证 | 已复扫本轮改造相关管理端页面的原生 `button`、公共 `Button`、`operationMessage`、`console.log`、旧导出纯提示和无效锚点；`adminVisualActions.test.ts` 65 个用例通过，未发现空动作按钮回归 |
| OC-P2-05 | 已补统一页面动作复扫脚本 | 新增 `scripts/verify-page-action-closure.mjs` 和 `scripts/verify-page-action-closure.test.mjs`，可统一扫描管理端和手机端页面点击动作；`frontend`、`teacher-mobile` 均已接入 `npm run test:page-actions`；当前扫描结果为 524 个动作、0 个 critical、146 个 warning |

## 7. 建议执行顺序

1. 当前清单中的 `OC-P0-01` 至 `OC-P2-04` 已完成。
2. 后续如新增页面或按钮，继续按本文档完成标准复扫并同步业务地图 / 页面台账。

## 8. 暂不纳入当前闭环的事项

- 真实后端接口。
- 真实文件上传进度和附件在线预览服务。
- 真实会议 SDK。
- 真实 AI 大模型会话。
- 大规模视觉重构和组件重构。
