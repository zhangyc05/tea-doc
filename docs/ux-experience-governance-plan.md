# 页面体验治理推进计划

## 当前假设

- 当前目标不是重做效果图，而是在已转换的 Vue 页面上补齐用户体验闭环。
- 只按页面数量逐页精修效率低，应先按流程链和页面类型治理。
- 当前没有真实服务接口，体验闭环优先使用本地 mock 状态、真实路由跳转或明确降级提示。

## 当前盘点

| 端 | 当前页面 | 效果图分布 | 本轮处理口径 |
| --- | ---: | --- | --- |
| 管理端 PC | 31 个 Vue 页面 | 管理 PC 端 36 张 PNG | 先保留现有按钮/路由守卫测试，后续按管理流程链抽样审计 |
| 教师手机端 | 102 个 index.vue 页面 | 教师手机端 142 张 PNG | 优先处理活动链，因为页面最多、状态最多、空操作风险最高 |

根目录 `docs/` 在本轮开始时为空；管理端和手机端设计规则分别位于：

- `frontend/docs/admin-design-system-guide.md`
- `teacher-mobile/docs/mobile-design-system-guide.md`

## 治理标准

页面体验按三类问题处理：

1. **业务断点**：入口、返回、提交、确认、状态流转无法闭环。优先修复。
2. **空操作**：看起来可点击，但没有跳转、状态变化或提示。必须改成真实行为或明确降级提示。
3. **视觉摩擦**：层级、密度、间距、响应式、信息阅读顺序影响使用。按流程链批量精修。

每批最多处理 3-5 个页面，验收时必须说明哪些是本地模拟闭环，哪些只是降级提示。

## 体验治理标准任务总表

| 序号 | 任务 | 完成标准 | 当前状态 |
| --- | --- | --- | --- |
| 1 | 建立页面规模和效果图盘点 | 明确 PC、手机端页面数量和效果图分布 | 已完成 |
| 2 | 建立可点击控件闭环标准 | 设计系统明确：真实路由、本地 mock 状态变化、明确降级提示三选一 | 已完成 |
| 3 | 建立手机端 UX 守卫脚本 | `teacher-mobile/scripts/verify-ux-action-closure.mjs` 可红绿验证 | 已完成 |
| 4 | 活动首页 / 培训需求样板治理 | 活动首页、培训需求、能力提升需求页无空操作 | 已完成 |
| 5 | 企业实践第二批治理 | 企业日志列表、证明上传、计划提交、日志记录、材料补充无空操作 | 已完成 |
| 6 | 企业实践第三批治理 | 历史实践补充、退回修改、进行中详情、重新补充无空操作 | 已完成 |
| 7 | 虚拟教研链治理 | 按 3-5 页批次处理邀请、贡献确认、活动详情、补充材料等页面空操作 | 已完成 |
| 8 | 待办链治理 | 待办首页、全部待办、动态筛选、证书确认链路入口和反馈闭环 | 已完成 |
| 9 | 档案链治理 | 档案首页、记录查询、记录列表、详情、更正申请链路入口和反馈闭环 | 已完成 |
| 10 | 我的 / 个人发展链治理 | 个人主页、能力画像、发展报告、目标岗位、聘期要求入口闭环 | 已完成 |
| 11 | 管理端 PC 操作闭环复核 | 基于 `adminVisualActions.test.ts` 扩展或补齐管理端流程级守卫 | 待执行 |
| 12 | 最终全量验证 | 手机端和管理端按 AGENTS.md 校验命令通过，遗留项明确列为后续增强 | 待执行 |

当前结构化扫描中已发现的 7 个无绑定控件已收口，分布在教学反思、培训结果、我的和待办链；企业实践链、虚拟教研链、待办链和档案链已纳入守卫并完成当前可机械闭环的空操作治理。

## 第一批样板

范围：教师手机端活动链的 3 个页面。

| 页面 | 问题 | 处理 |
| --- | --- | --- |
| `teacher-mobile/src/pages/activity/index.vue` | 虚拟教研入口没有路由，消息和最近活动“全部”无反馈 | 虚拟教研接到已有教研室页；消息和全部活动给出本地模拟提示 |
| `teacher-mobile/src/pages/activity/training-demand/index.vue` | AI 识别/说明编辑按钮和保存草稿无反馈 | 补充本地模拟提示和草稿保存提示 |
| `teacher-mobile/src/pages/activity/training-found/index.vue` | AI 说明编辑按钮和保存草稿无反馈 | 补充本地模拟提示和草稿保存提示 |

新增验证脚本：

```bash
node teacher-mobile/scripts/verify-ux-action-closure.mjs
```

该脚本先作为第一批样板页的红/绿守卫，后续每批页面完成后再逐步扩展覆盖范围。

## 后续批次

### 第二批样板

范围：教师手机端企业实践链的 5 个页面。

| 页面 | 问题 | 处理 |
| --- | --- | --- |
| `teacher-mobile/src/pages/activity/enterprise-log-list/index.vue` | 筛选、排序和返回详情无反馈 | 筛选/排序给出本地模拟提示，返回详情进入已有实践详情页 |
| `teacher-mobile/src/pages/activity/enterprise-proof-upload/index.vue` | 上传方式、材料预览、重新上传、确定使用无反馈 | 上传/预览给出本地模拟提示，确定使用进入补充提交结果页 |
| `teacher-mobile/src/pages/activity/enterprise-plan-submit/index.vue` | AI 草稿修改、重新整理、补充资料无反馈 | 补充本地模拟提示，提交计划仍沿用已有流程 |
| `teacher-mobile/src/pages/activity/enterprise-log-record/index.vue` | 补记日期、重新整理、修改草稿无反馈 | 补充本地模拟提示，保存草稿和保存日志仍沿用已有流程 |
| `teacher-mobile/src/pages/activity/enterprise-proof-supplement/index.vue` | 上传方式、材料预览、返回草稿、确定使用无反馈 | 上传/预览给出本地模拟提示，返回草稿和确定使用进入已有页面 |

`verify-ux-action-closure.mjs` 已扩展为覆盖 8 个活动链页面。

### 第三批样板

范围：教师手机端企业实践链剩余 4 个状态页。

| 页面 | 问题 | 处理 |
| --- | --- | --- |
| `teacher-mobile/src/pages/activity/enterprise-history-supplement/index.vue` | AI 修改/重新整理、补充资料无反馈 | 补充本地模拟提示，提交确认仍沿用已有流程 |
| `teacher-mobile/src/pages/activity/enterprise-plan-edit/index.vue` | AI 修改/重新整理、补充资料无反馈 | 补充本地模拟提示，保存草稿和重新提交仍沿用已有流程 |
| `teacher-mobile/src/pages/activity/enterprise-progress-detail/index.vue` | 查看详情、去记录、日志查看全部、附件查看全部、补充资料无反馈 | 日志和补充资料进入已有页面；详情/附件查看给出本地模拟提示 |
| `teacher-mobile/src/pages/activity/enterprise-resupplement/index.vue` | 上传新材料、稍后处理无反馈 | 上传给出本地模拟提示，稍后处理返回上一页 |

`verify-ux-action-closure.mjs` 已扩展为覆盖 12 个活动链页面。

### 第四批补点

范围：教师手机端结构化扫描剩余的 6 个页面。

| 页面 | 问题 | 处理 |
| --- | --- | --- |
| `teacher-mobile/src/pages/activity/reflection-guide-chat/index.vue` | 查看 / 添加依据无反馈 | 给出本地模拟提示，说明当前已展示已选依据 |
| `teacher-mobile/src/pages/activity/training-demand-result/index.vue` | 查看提交内容无反馈 | 给出本地模拟提示，说明当前页面已展示摘要 |
| `teacher-mobile/src/pages/activity/training-need-result/index.vue` | 查看提交内容无反馈 | 给出本地模拟提示，说明当前页面已展示摘要 |
| `teacher-mobile/src/pages/profile/index.vue` | 设置、个人资料、系统服务入口无反馈 | 给出本地模拟提示，保留已有画像和报告真实路由 |
| `teacher-mobile/src/pages/todo/all/index.vue` | 筛选标签只显示首项激活，无本地状态变化 | 增加本地筛选状态，按状态过滤待办列表 |
| `teacher-mobile/src/pages/todo/index.vue` | 消息通知无反馈 | 给出本地模拟提示，说明当前展示待办摘要 |

`verify-ux-action-closure.mjs` 已扩展为覆盖 18 个页面。

### 第五批样板

范围：教师手机端虚拟教研链第一批 5 个页面。

| 页面 | 问题 | 处理 |
| --- | --- | --- |
| `teacher-mobile/src/pages/activity/virtual-research-activity-list/index.vue` | 顶部筛选按钮只重置状态，无明确反馈 | 重置到全部并给出本地筛选反馈 |
| `teacher-mobile/src/pages/activity/virtual-research-teacher-archive-detail/index.vue` | 筛选标签只固定首项激活，记录行只吐出标题 | 增加本地筛选激活状态；记录行给出本地模拟详情提示 |
| `teacher-mobile/src/pages/activity/virtual-research-archive-result-v1/index.vue` | 贡献和归档材料查看只吐出标题 | 分别给出贡献详情、材料预览的本地模拟提示 |
| `teacher-mobile/src/pages/activity/virtual-research-profile-intro-edit/index.vue` | 附件预览降级提示不够明确 | 统一为附件预览本地模拟提示 |
| `teacher-mobile/src/pages/activity/virtual-research-skill-management/index.vue` | 未激活依据也提示已关联 | 区分已关联依据和可选择依据，后者给出本地模拟提示 |

`verify-ux-action-closure.mjs` 已扩展为覆盖 23 个页面。

### 第六批样板

范围：教师手机端虚拟教研链第二批 5 个页面。

| 页面 | 问题 | 处理 |
| --- | --- | --- |
| `teacher-mobile/src/pages/activity/virtual-research-activity-detail-ongoing/index.vue` | 更多操作、过程材料预览提示不明确 | 给出本地模拟提示，材料预览保留 domain 结果兜底 |
| `teacher-mobile/src/pages/activity/virtual-research-confirm-contribution/index.vue` | 语音、拍照、上传补充材料缺少即时反馈 | 增加本地材料加入提示 |
| `teacher-mobile/src/pages/activity/virtual-research-contribution-detail/index.vue` | 贡献材料预览兜底不明确 | 统一为贡献材料本地模拟预览提示 |
| `teacher-mobile/src/pages/activity/virtual-research-archive-result/index.vue` | 更多操作、归档文件查看只显示标题 | 给出更多操作和归档材料预览提示 |
| `teacher-mobile/src/pages/activity/virtual-research-contribution-submitted/index.vue` | 关联材料查看只显示标题 | 给出关联材料本地模拟预览提示 |

`verify-ux-action-closure.mjs` 已扩展为覆盖 28 个页面。

### 第七批样板

范围：教师手机端虚拟教研链第三批 5 个页面。

| 页面 | 问题 | 处理 |
| --- | --- | --- |
| `teacher-mobile/src/pages/activity/virtual-research-advanced-settings/index.vue` | 导出、建议、引用、重生成、保存只显示标题 | 统一为发展报告本地模拟操作提示 |
| `teacher-mobile/src/pages/activity/virtual-research-basic-info-edit/index.vue` | 贡献行只显示标题，底部操作未进入已有页面 | 贡献行给出详情提示；底部进入教研室和贡献详情 |
| `teacher-mobile/src/pages/activity/virtual-research-stage-submitted/index.vue` | 阶段材料、详情、后续动作只显示标题 | 分别给出材料预览、摘要详情和后续动作提示 |
| `teacher-mobile/src/pages/activity/virtual-research-activity-detail-supplement-submitted/index.vue` | 更多操作只显示标题 | 给出本地模拟提示 |
| `teacher-mobile/src/pages/activity/virtual-research-archived-confirmed/index.vue` | 归档材料查看只显示标题 | 给出归档材料本地模拟预览提示 |

`verify-ux-action-closure.mjs` 已扩展为覆盖 33 个页面。

### 第八批样板

范围：教师手机端虚拟教研链第四批 5 个页面。

| 页面 | 问题 | 处理 |
| --- | --- | --- |
| `teacher-mobile/src/pages/activity/virtual-research-award-management/index.vue` | 任务详情、材料移除、AI 重整/生成提示不明确 | 给出任务详情、材料操作、AI 整理本地模拟提示 |
| `teacher-mobile/src/pages/activity/virtual-research-resubmitted/index.vue` | 更多操作、补充内容查看只显示标题 | 给出更多操作和补充内容详情提示 |
| `teacher-mobile/src/pages/activity/virtual-research-contribution-confirm/index.vue` | 关联材料查看只显示标题 | 给出关联材料本地模拟预览提示 |
| `teacher-mobile/src/pages/activity/virtual-research-profile-complete/index.vue` | 确认贡献和过程材料入口不闭环 | 确认贡献进入已有页面，材料给出预览提示 |
| `teacher-mobile/src/pages/activity/virtual-research-supplement-material/index.vue` | 补充要求和语音说明提示不明确 | 给出补充要求详情和语音说明本地模拟提示 |

`verify-ux-action-closure.mjs` 已扩展为覆盖 38 个页面。

### 第九批样板

范围：教师手机端虚拟教研链剩余 6 个页面。

| 页面 | 问题 | 处理 |
| --- | --- | --- |
| `teacher-mobile/src/pages/activity/virtual-research-activity-detail-confirm/index.vue` | 材料预览兜底不明确 | 统一为材料本地模拟预览提示 |
| `teacher-mobile/src/pages/activity/virtual-research-role-assignment/index.vue` | 兜底待办操作提示不明确 | 给出本地模拟提示，主要入口仍进入邀请和贡献确认 |
| `teacher-mobile/src/pages/activity/virtual-research-position-management/index.vue` | 未纳入守卫 | 验证成员资料入口进入已有页面 |
| `teacher-mobile/src/pages/activity/virtual-research-room/index.vue` | 未纳入守卫 | 验证待办、教研室、活动列表入口进入已有页面 |
| `teacher-mobile/src/pages/activity/virtual-research-work-experience-management/index.vue` | 材料预览兜底不明确 | 统一为贡献材料本地模拟预览提示 |
| `teacher-mobile/src/pages/activity/virtual-research-invitation/index.vue` | 未纳入守卫 | 验证确认加入、暂不加入、贡献提醒进入已有页面 |

`verify-ux-action-closure.mjs` 已扩展为覆盖 44 个页面，其中虚拟教研链 26 个页面已全部纳入守卫。

### 第十批样板

范围：教师手机端待办证书确认链 5 个页面。

| 页面 | 问题 | 处理 |
| --- | --- | --- |
| `teacher-mobile/src/pages/todo/certificate-detail/index.vue` | 材料查看缺少明确兜底 | 给出证书材料本地模拟预览提示，确认和移出进入已有结果页 |
| `teacher-mobile/src/pages/todo/certificate-edit/index.vue` | 材料替换和提交需纳入守卫 | 材料替换给出本地状态提示，提交进入已提交结果页 |
| `teacher-mobile/src/pages/todo/certificate-submit/index.vue` | 提交记录只展示缺少动作反馈 | 给出提交记录本地模拟提示，返回待办页 |
| `teacher-mobile/src/pages/todo/certificate-archive-success/index.vue` | 入档成功后需保证档案入口 | 查看档案进入档案详情，返回待办页 |
| `teacher-mobile/src/pages/todo/certificate-removed/index.vue` | 移出后需保证回到待办或列表 | 主操作返回待办，次操作进入待办列表 |

`verify-ux-action-closure.mjs` 已扩展为覆盖 49 个页面。

### 第十一批样板

范围：教师手机端动态筛选和档案列表入口 5 个页面。

| 页面 | 问题 | 处理 |
| --- | --- | --- |
| `teacher-mobile/src/pages/todo/dynamics/index.vue` | 动态卡片只吐标题 | 给出动态详情本地模拟提示，筛选抽屉保持本地状态闭环 |
| `teacher-mobile/src/pages/todo/dynamics-filter/index.vue` | 独立筛选页动态卡片无点击反馈 | 给出动态详情本地模拟提示，应用筛选返回动态列表 |
| `teacher-mobile/src/pages/archive/index.vue` | 档案首页入口需纳入守卫 | 搜索、分类、待确认、最近入档均进入已有页面 |
| `teacher-mobile/src/pages/archive/record-query/index.vue` | 查询筛选需纳入守卫 | 关键词清除、分类筛选和详情跳转均为本地闭环 |
| `teacher-mobile/src/pages/archive/record-list/index.vue` | 状态 chip 看起来可筛选但无状态变化 | 增加本地状态筛选，搜索和详情进入已有页面 |

`verify-ux-action-closure.mjs` 已扩展为覆盖 54 个页面。

### 第十二批样板

范围：教师手机端档案详情和草稿链 4 个页面。

| 页面 | 问题 | 处理 |
| --- | --- | --- |
| `teacher-mobile/src/pages/archive/category/index.vue` | 分类页入口需纳入守卫 | 列表、发展计划编辑和记录详情进入已有页面 |
| `teacher-mobile/src/pages/archive/basic-info-detail/index.vue` | 来源对象暴露实现名风险 | 材料预览给出兜底提示，来源文案改为用户可理解的数据来源 |
| `teacher-mobile/src/pages/archive/record-detail/index.vue` | “返回档案”依赖页面栈，来源不确定 | 主按钮明确回到档案首页，更正申请进入已有页面 |
| `teacher-mobile/src/pages/archive/draft-list/index.vue` | 草稿和待确认列表需纳入守卫 | 草稿进入编辑页，待确认进入详情页，空态进入搜索 |

`verify-ux-action-closure.mjs` 已扩展为覆盖 58 个页面。

### 第十三批样板

范围：教师手机端档案更正状态链 5 个页面。

| 页面 | 问题 | 处理 |
| --- | --- | --- |
| `teacher-mobile/src/pages/archive/correction/apply/index.vue` | 审核进度文案暴露工程状态 | 提交生成本地更正记录并进入提交结果，文案改为本地待核验队列 |
| `teacher-mobile/src/pages/archive/correction/submitted/index.vue` | 后续处理文案暴露接口状态 | 查看进度进入已有页面，文案改为本地模拟进度 |
| `teacher-mobile/src/pages/archive/correction/progress/index.vue` | 结果页文案暴露后续接入状态 | 查看处理结果进入已有页面，文案改为本地模拟结果 |
| `teacher-mobile/src/pages/archive/correction/result/index.vue` | 结果说明暴露真实接口状态 | 需补充进入补充材料页，非补充进入原档案，文案改为管理端核验口径 |
| `teacher-mobile/src/pages/archive/correction/supplement/index.vue` | 补充材料需纳入守卫 | 点选材料更新本地上传状态，提交后进入进度页 |

`verify-ux-action-closure.mjs` 已扩展为覆盖 63 个页面。

### 第十四批样板

范围：教师手机端发展计划编辑 1 个收尾页面。

| 页面 | 问题 | 处理 |
| --- | --- | --- |
| `teacher-mobile/src/pages/archive/development-plan-edit/index.vue` | 状态说明暴露实现 store 名称 | 保存草稿给出反馈，提交生成待核验档案记录，说明改为档案处理队列 |

`verify-ux-action-closure.mjs` 已扩展为覆盖 64 个页面；`todo/archive` 共 22 个页面已全部纳入守卫，未覆盖数为 0。

### 第十五批样板

范围：教师手机端我的 / 个人发展链 5 个页面。

| 页面 | 问题 | 处理 |
| --- | --- | --- |
| `teacher-mobile/src/pages/profile/ability-profile/index.vue` | 画像、报告、岗位和聘期入口需纳入守卫 | 验证画像记录、发展报告、目标岗位和聘期要求进入已有页面 |
| `teacher-mobile/src/pages/profile/ability-profile/records/index.vue` | 画像引用记录需纳入守卫 | 档案详情入口进入已有档案详情页，并明确不在本页修改档案事实 |
| `teacher-mobile/src/pages/profile/development-report/index.vue` | 导出报告文案暴露待接入口径 | 改为本地模拟导出提示，报告依据、AI 解读、岗位和聘期入口进入已有页面 |
| `teacher-mobile/src/pages/profile/target-position/index.vue` | 岗位对照证据入口需纳入守卫 | 画像证据和企业实践记录进入已有页面 |
| `teacher-mobile/src/pages/profile/tenure-requirement/index.vue` | 聘期要求行动入口需纳入守卫 | 已完成证据进入档案详情，缺失证据行动进入已有页面 |

`verify-ux-action-closure.mjs` 已扩展为覆盖 69 个页面；`profile` 共 6 个页面已全部纳入守卫，未覆盖数为 0。

### 第十六批样板

范围：教师手机端 AI 助手档案补充链 3 个页面。

| 页面 | 问题 | 处理 |
| --- | --- | --- |
| `teacher-mobile/src/pages/assistant/index.vue` | 助手场景入口需纳入守卫 | 补充档案、能力画像和待办建议进入已有页面 |
| `teacher-mobile/src/pages/assistant/archive-supplement/index.vue` | 补充提交需纳入守卫 | 提交生成本地待核验档案记录并进入提交结果页 |
| `teacher-mobile/src/pages/assistant/archive-supplement-submitted/index.vue` | 结果页处理队列暴露实现 store 名称 | 改为档案处理队列用户态文案，档案详情、AI 助手和待确认列表入口闭环 |

`verify-ux-action-closure.mjs` 已扩展为覆盖 72 个页面；`assistant` 共 3 个页面已全部纳入守卫，未覆盖数为 0。

### 第十七批样板

范围：教师手机端培训链剩余 5 个页面。

| 页面 | 问题 | 处理 |
| --- | --- | --- |
| `teacher-mobile/src/pages/activity/training/index.vue` | 培训首页资源、总结和需求入口需纳入守卫 | 记录心得、打开资源、查看全部和提交需求进入已有页面 |
| `teacher-mobile/src/pages/activity/training-list/index.vue` | 培训申请和学习入口需纳入守卫 | 申请生成本地申请记录，学习和我的培训进入总结页 |
| `teacher-mobile/src/pages/activity/training-application/index.vue` | 申请结果状态流转需纳入守卫 | 根据 query 同步本地申请结果，详情、培训列表和活动首页入口闭环 |
| `teacher-mobile/src/pages/activity/training-summary/index.vue` | 规则说明、证书选项和培训想法修改为静态视觉态 | 规则说明和培训想法给出本地模拟提示，证书选项支持本地选中，提交生成待确认档案记录 |
| `teacher-mobile/src/pages/activity/training-archive-result/index.vue` | 归档结果入口需纳入守卫 | 返回培训、查看提交内容、档案待确认和活动首页入口闭环 |

`verify-ux-action-closure.mjs` 已扩展为覆盖 77 个页面；全量 102 个手机端页面剩余 25 个 activity 页面未纳入守卫。

### 第十八批样板

范围：教师手机端教学反思链第一批 4 个页面。

| 页面 | 问题 | 处理 |
| --- | --- | --- |
| `teacher-mobile/src/pages/activity/reflection-start/index.vue` | 开始方式和草稿入口需纳入守卫 | 已有报告、手动开始和草稿入口进入已有页面，并写入本地反思状态 |
| `teacher-mobile/src/pages/activity/reflection-scope/index.vue` | 反思范围和周期标签为静态视觉态 | 增加本地选中状态，依据选择、补充材料和 AI 对话入口闭环 |
| `teacher-mobile/src/pages/activity/reflection-course/index.vue` | 课程范围、依据类型和依据行为静态视觉态 | 增加本地选中状态，补充材料和依据选择入口闭环 |
| `teacher-mobile/src/pages/activity/reflection-self/index.vue` | 自主反思范围卡和开始卡无交互反馈 | 增加本地范围选中状态，开始卡给出本地模拟提示，底部进入 AI 对话 |

`verify-ux-action-closure.mjs` 已扩展为覆盖 81 个页面。

### 第十九批样板

范围：教师手机端教学反思链第二批 4 个页面。

| 页面 | 问题 | 处理 |
| --- | --- | --- |
| `teacher-mobile/src/pages/activity/reflection-draft/index.vue` | 草稿编辑、补充、优化、保存和确认需纳入守卫 | 编辑类操作给出本地提示，确认进入成功页 |
| `teacher-mobile/src/pages/activity/reflection-ai-chat/index.vue` | 快捷选项、线索详情、继续聊和输入框为静态视觉态 | 快捷选项写入本地草稿提示，线索详情/继续聊/输入框给出本地模拟提示 |
| `teacher-mobile/src/pages/activity/reflection-evidence/index.vue` | 反思范围和依据行是静态选中态 | 增加本地范围和依据选中状态，补充材料和 AI 对话入口闭环 |
| `teacher-mobile/src/pages/activity/reflection-success/index.vue` | 成功页后续入口需纳入守卫 | 查看档案详情、再做一篇反思和返回活动首页入口闭环 |

`verify-ux-action-closure.mjs` 已扩展为覆盖 85 个页面；教学反思链剩余页面已全部纳入守卫。全量 102 个手机端页面剩余 17 个 activity 企业实践页面未纳入守卫。

### 第二十批样板

范围：教师手机端企业实践列表 / 检索 / 材料确认链 5 个页面。

| 页面 | 问题 | 处理 |
| --- | --- | --- |
| `teacher-mobile/src/pages/activity/enterprise-list/index.vue` | 年度筛选看起来可点但无反馈 | 保留 2026 年度本地模拟视图，点击给出明确提示；筛选、记录操作和历史补充入口纳入守卫 |
| `teacher-mobile/src/pages/activity/enterprise-advanced-search/index.vue` | 补充说明为静态视觉态 | 点击说明区给出本地模拟提示，上传、稍后处理和提交补充链路纳入守卫 |
| `teacher-mobile/src/pages/activity/enterprise-overview/index.vue` | 企业实践总览入口需纳入守卫 | 筛选、继续记录、补充材料、查看档案和历史补充入口纳入守卫 |
| `teacher-mobile/src/pages/activity/enterprise-login-history/index.vue` | 附件标题带展开符号但无反馈 | 点击附件标题给出本地模拟提示，草稿、补充资料和提交归档链路纳入守卫 |
| `teacher-mobile/src/pages/activity/enterprise-workflow-config/index.vue` | 所属实践行带箭头但无反馈 | 点击所属实践行给出本地模拟提示，分享、下载、查看附件和返回日志入口纳入守卫 |

`verify-ux-action-closure.mjs` 已扩展为覆盖 90 个页面；全量 102 个手机端页面剩余 12 个 activity 企业实践状态页未纳入守卫。

### 第二十一批样板

范围：教师手机端企业实践计划 / 补充状态链 5 个页面。

| 页面 | 问题 | 处理 |
| --- | --- | --- |
| `teacher-mobile/src/pages/activity/enterprise-plan-confirm/index.vue` | 计划确认提交结果需纳入守卫 | 提交创建本地待审核计划并进入等待确认结果页，返回修改保持返回闭环 |
| `teacher-mobile/src/pages/activity/enterprise-plan-approved/index.vue` | 计划通过后的下一步需纳入守卫 | 返回实践列表和开始记录日志都会同步本地计划通过状态并进入对应页面 |
| `teacher-mobile/src/pages/activity/enterprise-plan-rejected/index.vue` | 已提交附件查看为静态视觉态 | 点击附件查看给出本地模拟提示，返回列表和修改计划入口纳入守卫 |
| `teacher-mobile/src/pages/activity/enterprise-supplement-needed/index.vue` | 已提交材料行看起来可查看但无反馈 | 点击材料行给出本地模拟提示，补充材料和重新提交入口纳入守卫 |
| `teacher-mobile/src/pages/activity/enterprise-supplement-submitted/index.vue` | 补充提交结果需纳入守卫 | 根据 query 读取本地档案记录，档案待确认、提交内容和活动首页入口闭环 |

`verify-ux-action-closure.mjs` 已扩展为覆盖 95 个页面。

### 第二十二批样板

范围：教师手机端企业实践历史补充 / 归档结果 / 活动入口状态链 7 个页面。

| 页面 | 问题 | 处理 |
| --- | --- | --- |
| `teacher-mobile/src/pages/activity/enterprise-history-supplement-needed/index.vue` | 历史补充退回页需纳入守卫 | 帮助、查看详情、材料上传、保存草稿和重新提交均给出明确本地反馈 |
| `teacher-mobile/src/pages/activity/enterprise-history-confirmed/index.vue` | 后续可查看行带箭头但无入口 | 企业实践列表和成长档案行分别进入列表与档案详情 |
| `teacher-mobile/src/pages/activity/enterprise-import-export/index.vue` | 计划提交等待页需纳入守卫 | 查看提交内容和返回实践列表入口闭环，并避免实现 store 文案外露 |
| `teacher-mobile/src/pages/activity/enterprise-archive-success/index.vue` | 入档材料行带箭头但无反馈 | 点击材料行给出本地模拟提示，首页、档案待确认和提交内容入口闭环 |
| `teacher-mobile/src/pages/activity/enterprise-archive-edit/index.vue` | 文本区为静态视觉态 | 点击实践内容和补充说明会保存本地草稿并给出提示，材料补充和保存提交入口纳入守卫 |
| `teacher-mobile/src/pages/activity/enterprise-archive-result/index.vue` | 归档结果入口需纳入守卫 | 根据 query 读取本地档案记录，实践列表、档案待确认和提交内容入口闭环 |
| `teacher-mobile/src/pages/activity/room-entry-state/index.vue` | 活动入口状态页需纳入守卫 | 培训、企业实践、虚拟教研和教学反思入口进入真实路由，通知 / 周期 / 全部活动给出本地反馈 |

`verify-ux-action-closure.mjs` 已扩展为覆盖 102 个页面；教师手机端当前 102 个页面已全部纳入体验治理守卫。

### 下一批建议

1. **守卫维护**：后续新增或重做手机端页面时，必须同步扩展 `verify-ux-action-closure.mjs`，避免新页面出现空点击或实现文案外露。
2. **视觉精修**：如继续做效果图对齐，应按每批 3-5 页基于目标图做结构、比例、密度和状态流转复核。
3. **最终全量验证**：体验治理守卫变更后按 AGENTS.md 执行完整构建校验。

## 效果图还原质量治理

### 第一批视觉基准

范围：教师手机端 5 个一级入口页。

| 页面 | 目标图 / 基准 | 处理 |
| --- | --- | --- |
| `teacher-mobile/src/pages/activity/index.vue` | `效果图/已实现/教师手机端/2活动/活动首页/教师端手机｜活动｜活动首页.png` | 统一入口页大标题、卡片标题和内容卡密度 |
| `teacher-mobile/src/pages/todo/index.vue` | `效果图/已实现/教师手机端/0待办/教师端手机｜待办｜待办首页.png` | 收敛问候标题，避免挤压首屏待办内容，统一卡片标题 |
| `teacher-mobile/src/pages/archive/index.vue` | `效果图/已实现/教师手机端/1档案/教师端手机｜档案｜档案首页.png` | 统一档案入口大标题和分区标题，保留搜索与分类首屏节奏 |
| `teacher-mobile/src/pages/profile/index.vue` | `效果图/已实现/教师手机端/3我的/教师端手机｜我的｜我的主页.png` | 补齐显式入口页 Shell 背景、安全区和标题层级 |
| `teacher-mobile/src/pages/assistant/index.vue` | AI 助手无独立首页目标图，按全局入口页基准和补充档案目标图体系处理 | 补齐显式入口页 Shell、安全区、主卡圆角和分区标题 |

新增 `verify-mobile-entry-visual-baseline.mjs` 覆盖 5 个一级入口页，检查目标图存在、统一 Shell、首屏关键模块、标题层级、内容卡圆角和底部安全区。

### 第二批视觉基准

范围：教师手机端活动模块 4 个二级入口页。

| 页面 | 目标图 | 处理 |
| --- | --- | --- |
| `teacher-mobile/src/pages/activity/training/index.vue` | `效果图/已实现/教师手机端/2活动/2培训进修/教师端手机｜活动｜培训进修｜培训进修首页.png` | 提高顶部首屏高度，统一分区标题到活动二级入口密度 |
| `teacher-mobile/src/pages/activity/enterprise-overview/index.vue` | `效果图/教师手机端/2活动/3企业实践/教师端手机｜活动｜企业实践｜年度概览.png` | 提升主标题与分区标题层级，统一年度概览、待处理和记录卡片圆角 |
| `teacher-mobile/src/pages/activity/virtual-research-room/index.vue` | `效果图/已实现/教师手机端/2活动/4虚拟教研/教师端手机｜活动｜虚拟教研｜我的教研室.png` | 修正底部 Tab 当前态，统一页面底部安全区、主标题、统计卡和待处理卡密度 |
| `teacher-mobile/src/pages/activity/reflection-start/index.vue` | `效果图/已实现/教师手机端/2活动/1教学反思/教师端手机｜活动｜教学反思｜开始方式.png` | 提高顶部首屏高度，统一开始方式卡片圆角和标题层级 |

`verify-mobile-entry-visual-baseline.mjs` 已扩展为覆盖 9 个入口页。

### 第三批视觉基准

范围：教师手机端培训进修链 4 个关键流程页。

| 页面 | 目标图 | 处理 |
| --- | --- | --- |
| `teacher-mobile/src/pages/activity/training-demand/index.vue` | `效果图/已实现/教师手机端/2活动/2培训进修/教师端手机｜活动｜培训进修｜提交培训需求.png` | 提高头部高度、底部操作预留和表单卡片密度，统一分区标题层级 |
| `teacher-mobile/src/pages/activity/training-found/index.vue` | `效果图/已实现/教师手机端/2活动/2培训进修/教师端手机｜活动｜培训进修｜我已找到想参加的培训.png` | 提高头部高度、底部操作预留和需求说明卡片密度，统一分区标题层级 |
| `teacher-mobile/src/pages/activity/training-demand-result/index.vue` | `效果图/已实现/教师手机端/2活动/2培训进修/教师端手机｜活动｜培训进修｜培训需求已提交.png` | 增加 Tab 页底部安全区，强化成功卡标题和进度卡片密度 |
| `teacher-mobile/src/pages/activity/training-summary/index.vue` | `效果图/已实现/教师手机端/2活动/2培训进修/教师端手机｜活动｜培训进修｜培训总结.png` | 增加固定提交区底部预留，统一课程卡、归档准备和总结草稿标题层级 |

`verify-mobile-entry-visual-baseline.mjs` 已扩展为覆盖 13 个页面。

### 第四批视觉基准

范围：教师手机端培训进修链剩余 4 个关键流程页。

| 页面 | 目标图 | 处理 |
| --- | --- | --- |
| `teacher-mobile/src/pages/activity/training-list/index.vue` | `效果图/已实现/教师手机端/2活动/2培训进修/教师端手机｜活动｜培训进修｜培训进修.png` | 增加 Tab 页底部安全区，统一推荐培训、我的培训和空态入口卡片密度 |
| `teacher-mobile/src/pages/activity/training-application/index.vue` | `效果图/已实现/教师手机端/2活动/2培训进修/教师端手机｜活动｜培训进修｜培训申请.png` | 增加结果页底部操作预留，提高成功卡、摘要卡和进度卡标题层级 |
| `teacher-mobile/src/pages/activity/training-archive-result/index.vue` | `效果图/已实现/教师手机端/2活动/2培训进修/教师端手机｜活动｜培训进修｜培训材料归档提交结果.png` | 增加页面底部安全区，强化归档结果主标题和提交 / 进度卡片密度 |
| `teacher-mobile/src/pages/activity/training-need-result/index.vue` | `效果图/已实现/教师手机端/2活动/2培训进修/教师端手机｜活动｜培训进修｜培训需求提交.png` | 提高头部占位、底部操作预留、成功标题和进度标题层级 |

`verify-mobile-entry-visual-baseline.mjs` 已扩展为覆盖 17 个页面；培训进修链 9 个页面已全部纳入视觉基准守卫。

### 第五批视觉基准

范围：教师手机端教学反思链 4 个选择 / 表单页。

| 页面 | 目标图 | 处理 |
| --- | --- | --- |
| `teacher-mobile/src/pages/activity/reflection-course/index.vue` | `效果图/已实现/教师手机端/2活动/1教学反思/教师端手机｜活动｜教学反思｜选择学期课程.png` | 增加固定操作区底部预留，统一范围、课程、依据和补充卡片密度 |
| `teacher-mobile/src/pages/activity/reflection-evidence/index.vue` | `效果图/已实现/教师手机端/2活动/1教学反思/教师端手机｜活动｜教学反思｜选择反思依据.png` | 增加固定操作区底部预留，提高本次课、依据列表和补充区标题层级 |
| `teacher-mobile/src/pages/activity/reflection-scope/index.vue` | `效果图/已实现/教师手机端/2活动/1教学反思/教师端手机｜活动｜教学反思｜反思范围.png` | 增加固定操作区底部预留，统一阶段范围、阶段依据和补充卡片密度 |
| `teacher-mobile/src/pages/activity/reflection-self/index.vue` | `效果图/已实现/教师手机端/2活动/1教学反思/教师端手机｜活动｜教学反思｜自主反思.png` | 增加底部操作预留，统一自主反思卡片内距、标题层级和范围卡高度 |

`verify-mobile-entry-visual-baseline.mjs` 已扩展为覆盖 21 个页面。

### 第六批视觉基准

范围：教师手机端教学反思链 4 个对话 / 结果页。

| 页面 | 目标图 | 处理 |
| --- | --- | --- |
| `teacher-mobile/src/pages/activity/reflection-guide-chat/index.vue` | `效果图/已实现/教师手机端/2活动/1教学反思/教师端手机｜活动｜教学反思｜AI引导对话.png` | 增加底部安全区，统一依据卡、聊天卡、要点卡和生成草稿按钮密度 |
| `teacher-mobile/src/pages/activity/reflection-ai-chat/index.vue` | `效果图/已实现/教师手机端/2活动/1教学反思/教学反思-AI对话.png` | 增加底部安全区，统一自主反思模式卡、线索卡和输入卡标题层级 |
| `teacher-mobile/src/pages/activity/reflection-draft/index.vue` | `效果图/已实现/教师手机端/2活动/1教学反思/教师端手机｜活动｜教学反思｜报告草稿编辑.png` | 增加底部安全区，统一草稿来源、报告编辑卡和底部确认区密度 |
| `teacher-mobile/src/pages/activity/reflection-success/index.vue` | `效果图/已实现/教师手机端/2活动/1教学反思/教师端手机｜活动｜教学反思｜确认成功.png` | 增加底部安全区，强化成功卡主标题和后续动作卡片密度 |

`verify-mobile-entry-visual-baseline.mjs` 已扩展为覆盖 25 个页面；教学反思链 9 个页面已全部纳入视觉基准守卫。

### 第七批视觉基准

范围：教师手机端企业实践链 4 个主路径页。

| 页面 | 目标图 | 处理 |
| --- | --- | --- |
| `teacher-mobile/src/pages/activity/enterprise-list/index.vue` | `效果图/教师手机端/2活动/3企业实践/教师端手机｜活动｜企业实践｜年度列表.png` | 强化年度列表主标题、当前待处理、实践记录和历史补充卡片密度 |
| `teacher-mobile/src/pages/activity/enterprise-plan-submit/index.vue` | `效果图/已实现/教师手机端/2活动/3企业实践/教师端手机｜活动｜企业实践｜提交实践计划.png` | 增加固定操作区底部预留，统一要求卡、输入卡、AI 整理卡和补充资料卡标题层级 |
| `teacher-mobile/src/pages/activity/enterprise-plan-confirm/index.vue` | `效果图/已实现/教师手机端/2活动/3企业实践/教师端手机｜活动｜企业实践｜实践计划确认提交.png` | 增加底部操作预留，统一确认摘要、提交信息和审核流程卡片密度 |
| `teacher-mobile/src/pages/activity/enterprise-plan-approved/index.vue` | `效果图/已实现/教师手机端/2活动/3企业实践/教师端手机｜活动｜企业实践｜实践计划已通过.png` | 增加底部操作预留，强化通过结果、实践计划、确认内容和下一步卡片密度 |

`verify-mobile-entry-visual-baseline.mjs` 已扩展为覆盖 29 个页面。

### 第八批视觉基准

范围：教师手机端企业实践链 4 个证明 / 过程记录页。

| 页面 | 目标图 | 处理 |
| --- | --- | --- |
| `teacher-mobile/src/pages/activity/enterprise-proof-upload/index.vue` | `效果图/已实现/教师手机端/2活动/3企业实践/教师端手机｜活动｜企业实践｜上传实践证明.png` | 增加固定操作区底部预留，统一上传说明、材料类型、上传方式和预览卡片密度 |
| `teacher-mobile/src/pages/activity/enterprise-proof-supplement/index.vue` | `效果图/已实现/教师手机端/2活动/3企业实践/教师端手机｜活动｜企业实践｜补充实践证明.png` | 增加底部安全区，统一档案摘要、上传方式、已上传材料和提示区标题层级 |
| `teacher-mobile/src/pages/activity/enterprise-progress-detail/index.vue` | `效果图/已实现/教师手机端/2活动/3企业实践/教师端手机｜活动｜企业实践｜进行中详情.png` | 增加页面底部安全区和头部高度，统一实践摘要、计划、今日处理、日志和附件卡片密度 |
| `teacher-mobile/src/pages/activity/enterprise-log-record/index.vue` | `效果图/已实现/教师手机端/2活动/3企业实践/教师端手机｜活动｜企业实践｜记录实践日志.png` | 增加固定操作区底部预留和头部高度，强化实践摘要、日志日期、输入区和 AI 草稿标题层级 |

`verify-mobile-entry-visual-baseline.mjs` 已扩展为覆盖 33 个页面。

### 第九批视觉基准

范围：教师手机端企业实践链 4 个退回 / 补充 / 归档状态页。

| 页面 | 目标图 | 处理 |
| --- | --- | --- |
| `teacher-mobile/src/pages/activity/enterprise-plan-rejected/index.vue` | `效果图/已实现/教师手机端/2活动/3企业实践/教师端手机｜活动｜企业实践｜实践计划退回修改.png` | 增加固定操作区底部预留，统一退回提示、退回信息、计划详情、需修改内容和附件卡片密度 |
| `teacher-mobile/src/pages/activity/enterprise-supplement-needed/index.vue` | `效果图/已实现/教师手机端/2活动/3企业实践/教师端手机｜活动｜企业实践｜需要补充材料.png` | 增加底部操作预留，强化补充状态、核验反馈、已提交材料、重新补充材料和说明区标题层级 |
| `teacher-mobile/src/pages/activity/enterprise-resupplement/index.vue` | `效果图/已实现/教师手机端/2活动/3企业实践/教师端手机｜活动｜企业实践｜重新补充材料.png` | 增加固定操作区底部预留，统一需补充提示、记录摘要、反馈、材料和重新上传区卡片密度 |
| `teacher-mobile/src/pages/activity/enterprise-archive-result/index.vue` | `效果图/已实现/教师手机端/2活动/3企业实践/教师端手机｜活动｜企业实践｜归档提交结果.png` | 增加底部操作预留和内容顶部间距，强化归档结果、实践概览和提交内容卡片密度 |

`verify-mobile-entry-visual-baseline.mjs` 已扩展为覆盖 37 个页面。

### 第十批视觉基准

范围：教师手机端企业实践链 4 个历史补充 / 入档状态页。

| 页面 | 目标图 | 处理 |
| --- | --- | --- |
| `teacher-mobile/src/pages/activity/enterprise-history-supplement/index.vue` | `效果图/已实现/教师手机端/2活动/3企业实践/教师端手机｜活动｜企业实践｜补充历史实践.png` | 增加固定操作区底部预留，强化企业实践主标题、年度要求、输入信息、AI 整理记录和证明材料卡片密度 |
| `teacher-mobile/src/pages/activity/enterprise-supplement-submitted/index.vue` | `效果图/已实现/教师手机端/2活动/3企业实践/教师端手机｜活动｜企业实践｜补充材料已提交.png` | 增加底部操作预留，强化提交成功卡、已提交材料和核验说明标题层级 |
| `teacher-mobile/src/pages/activity/enterprise-history-confirmed/index.vue` | `效果图/已实现/教师手机端/2活动/3企业实践/教师端手机｜活动｜企业实践｜历史实践已确认.png` | 增加底部操作预留和成功头部高度，统一本次历史实践、已确认内容、年度记录更新和后续可查看卡片密度 |
| `teacher-mobile/src/pages/activity/enterprise-archive-success/index.vue` | `效果图/已实现/教师手机端/2活动/3企业实践/教师端手机｜活动｜企业实践｜记录已入档.png` | 增加底部操作预留，强化记录已提交结果、已提交材料、入档材料和确认后可用于卡片密度 |

`verify-mobile-entry-visual-baseline.mjs` 已扩展为覆盖 41 个页面。

### 第十一批视觉基准

范围：教师手机端企业实践链 3 个历史补充 / 档案编辑 / 等待状态页。

| 页面 | 目标图 | 处理 |
| --- | --- | --- |
| `teacher-mobile/src/pages/activity/enterprise-history-supplement-needed/index.vue` | `效果图/已实现/教师手机端/2活动/3企业实践/教师端手机｜活动｜企业实践｜历史实践需补充材料.png` | 增加底部操作预留，强化历史补充退回标题、退回信息、本次历史实践和需补充材料卡片密度 |
| `teacher-mobile/src/pages/activity/enterprise-archive-edit/index.vue` | `效果图/已实现/教师手机端/2活动/3企业实践/企业实践-修改档案信息.png` | 增加固定操作区与底部 Tab 预留，统一档案草稿、基本信息、实践内容、补充说明和相关材料卡片密度 |
| `teacher-mobile/src/pages/activity/enterprise-import-export/index.vue` | `效果图/已实现/教师手机端/2活动/3企业实践/导入导出页面.png` | 增加固定操作区与底部 Tab 预留，强化实践计划已提交结果卡和计划 / AI 整理 / 当前状态卡片标题层级 |

`verify-mobile-entry-visual-baseline.mjs` 已扩展为覆盖 44 个页面。

### 第十二批视觉基准

范围：教师手机端企业实践链 4 个日志 / 材料尾页。

| 页面 | 目标图 | 处理 |
| --- | --- | --- |
| `teacher-mobile/src/pages/activity/enterprise-log-list/index.vue` | `效果图/已实现/教师手机端/2活动/3企业实践/企业实践-实践日志.png` | 增加底部安全区，强化实践日志头部、日志摘要、时间线日志卡和返回详情按钮密度 |
| `teacher-mobile/src/pages/activity/enterprise-workflow-config/index.vue` | `效果图/已实现/教师手机端/2活动/3企业实践/工作流配置.png` | 增加底部安全区，统一日志详情结果卡、所属实践、日志内容、附件资料和 AI 摘要卡片密度 |
| `teacher-mobile/src/pages/activity/enterprise-login-history/index.vue` | `效果图/已实现/教师手机端/2活动/3企业实践/登录历史页面.png` | 增加固定操作区底部预留，强化实践总结、归档准备、AI 总结草稿和附件资料卡片标题层级 |
| `teacher-mobile/src/pages/activity/enterprise-advanced-search/index.vue` | `效果图/已实现/教师手机端/2活动/3企业实践/高级搜索页面.png` | 增加固定操作区底部预留，统一缺材料提示、实践信息、还需要补充、上传材料和补充说明卡片密度 |

`verify-mobile-entry-visual-baseline.mjs` 已扩展为覆盖 48 个页面。

### 第十三批视觉基准

范围：教师手机端虚拟教研链 4 个邀请 / 活动主路径页。

| 页面 | 目标图 | 处理 |
| --- | --- | --- |
| `teacher-mobile/src/pages/activity/virtual-research-invitation/index.vue` | `效果图/已实现/教师手机端/2活动/4虚拟教研/教师端手机｜活动｜虚拟教研｜教研室邀请.png` | 增加固定操作区底部预留，强化教研室邀请主卡、简介、近期活动和加入后参与卡片密度 |
| `teacher-mobile/src/pages/activity/virtual-research-activity-list/index.vue` | `效果图/已实现/教师手机端/2活动/4虚拟教研/教师端手机｜活动｜虚拟教研｜教研活动列表.png` | 增加底部安全区，强化学期统计、当前处理、筛选标签、活动卡和规则提示密度 |
| `teacher-mobile/src/pages/activity/virtual-research-activity-detail-ongoing/index.vue` | `效果图/已实现/教师手机端/2活动/4虚拟教研/教师端手机｜活动｜虚拟教研｜教研活动详情｜进行中.png` | 增加固定操作区底部预留，统一活动头部、活动说明、我的任务、会议安排和过程材料卡片密度 |
| `teacher-mobile/src/pages/activity/virtual-research-activity-detail-confirm/index.vue` | `效果图/已实现/教师手机端/2活动/4虚拟教研/教师端手机｜活动｜虚拟教研｜教研活动详情｜待确认贡献.png` | 增加固定操作区底部预留，强化贡献确认头部、系统整理、待确认贡献和已有材料卡片标题层级 |

`verify-mobile-entry-visual-baseline.mjs` 已扩展为覆盖 52 个页面。

### 第十四批视觉基准

范围：教师手机端虚拟教研链 4 个贡献确认 / 提交后查看页。

| 页面 | 目标图 | 处理 |
| --- | --- | --- |
| `teacher-mobile/src/pages/activity/virtual-research-confirm-contribution/index.vue` | `效果图/已实现/教师手机端/2活动/4虚拟教研/教师端手机｜活动｜虚拟教研｜教研贡献确认.png` | 增加固定操作区底部预留，强化 AI 识别贡献、补充说明、确认后去向和底部确认按钮密度 |
| `teacher-mobile/src/pages/activity/virtual-research-contribution-detail/index.vue` | `效果图/已实现/教师手机端/2活动/4虚拟教研/教师端手机｜活动｜虚拟教研｜教研贡献详情.png` | 增加底部安全区，统一已确认贡献头部、所属活动、贡献说明、系统依据和关联材料卡片密度 |
| `teacher-mobile/src/pages/activity/virtual-research-contribution-confirm/index.vue` | `效果图/已实现/教师手机端/2活动/4虚拟教研/教师端手机｜活动｜虚拟教研｜确认教研贡献.png` | 增加固定操作区和底部 Tab 预留，强化活动信息、系统整理、待确认贡献和关联材料卡片标题层级 |
| `teacher-mobile/src/pages/activity/virtual-research-contribution-submitted/index.vue` | `效果图/已实现/教师手机端/2活动/4虚拟教研/教师端手机｜活动｜虚拟教研｜贡献确认已提交.png` | 增加固定操作区底部预留，统一提交成功、活动摘要、已确认贡献、当前状态和归档后查看卡片密度 |

`verify-mobile-entry-visual-baseline.mjs` 已扩展为覆盖 56 个页面。

### 第十五批视觉基准

范围：教师手机端虚拟教研链 4 个补充材料 / 阶段材料 / 归档结果页。

| 页面 | 目标图 | 处理 |
| --- | --- | --- |
| `teacher-mobile/src/pages/activity/virtual-research-activity-detail-supplement-submitted/index.vue` | `效果图/已实现/教师手机端/2活动/4虚拟教研/教师端手机｜活动｜虚拟教研｜教研活动详情｜补充已提交.png` | 增加固定操作区底部预留，统一补充已提交、活动摘要、补充贡献、已识别贡献和当前状态卡片密度 |
| `teacher-mobile/src/pages/activity/virtual-research-supplement-material/index.vue` | `效果图/已实现/教师手机端/2活动/4虚拟教研/教师端手机｜活动｜虚拟教研｜补充教研活动材料.png` | 增加固定操作区和底部 Tab 预留，强化活动信息、退回说明、需要补充、已有依据和补充材料标题层级 |
| `teacher-mobile/src/pages/activity/virtual-research-stage-submitted/index.vue` | `效果图/已实现/教师手机端/2活动/4虚拟教研/教师端手机｜活动｜虚拟教研｜阶段材料已提交.png` | 增加固定操作区底部预留，统一阶段材料结果、活动摘要、已提交材料、AI 说明、当前状态和后续处理卡片密度 |
| `teacher-mobile/src/pages/activity/virtual-research-archive-result/index.vue` | `效果图/已实现/教师手机端/2活动/4虚拟教研/教师端手机｜活动｜虚拟教研｜教研活动归档结果.png` | 增加固定操作区底部预留，统一归档结果、已确认贡献、归档材料、归档去向和底部操作卡片密度 |

`verify-mobile-entry-visual-baseline.mjs` 已扩展为覆盖 60 个页面。

### 第十六批视觉基准

范围：教师手机端虚拟教研链 4 个重新提交 / 归档确认 / 资料完善状态页。

| 页面 | 目标图 | 处理 |
| --- | --- | --- |
| `teacher-mobile/src/pages/activity/virtual-research-resubmitted/index.vue` | `效果图/已实现/教师手机端/2活动/4虚拟教研/教师端手机｜活动｜虚拟教研｜补充材料已重新提交.png` | 增加固定操作区底部预留，统一重新提交结果、活动摘要、补充内容、已有依据和当前状态卡片密度 |
| `teacher-mobile/src/pages/activity/virtual-research-archive-result-v1/index.vue` | `效果图/已实现/教师手机端/2活动/4虚拟教研/教研活动归档结果-版本一.png` | 强化归档结果头部、活动信息、已确认贡献、归档材料和归档去向卡片圆角与标题层级 |
| `teacher-mobile/src/pages/activity/virtual-research-archived-confirmed/index.vue` | `效果图/已实现/教师手机端/2活动/4虚拟教研/教师端手机｜活动｜虚拟教研｜教研活动已归档｜贡献已确认.png` | 增加固定操作区底部预留，统一贡献已确认头部、活动信息、贡献列表、归档材料和归档去向卡片密度 |
| `teacher-mobile/src/pages/activity/virtual-research-profile-complete/index.vue` | `效果图/已实现/教师手机端/2活动/4虚拟教研/个人资料完善.png` | 修正底部 Tab 当前态为活动链，强化教研室详情主卡、当前处理、教研活动和过程材料密度 |

`verify-mobile-entry-visual-baseline.mjs` 已扩展为覆盖 64 个页面。

### 第十七批视觉基准

范围：教师手机端虚拟教研链 4 个资料维护 / 成员资料页。

| 页面 | 目标图 | 处理 |
| --- | --- | --- |
| `teacher-mobile/src/pages/activity/virtual-research-basic-info-edit/index.vue` | `效果图/已实现/教师手机端/2活动/4虚拟教研/基本信息编辑.png` | 修正底部 Tab 当前态为活动链，增加底部操作预留，强化贡献提交结果、教研活动、已确认贡献和当前状态卡片密度 |
| `teacher-mobile/src/pages/activity/virtual-research-profile-intro-edit/index.vue` | `效果图/已实现/教师手机端/2活动/4虚拟教研/个人简介编辑.png` | 增加固定操作区底部预留，统一成员资料头部、教研活动、个人贡献、关联材料和归档状态卡片密度 |
| `teacher-mobile/src/pages/activity/virtual-research-teacher-archive-detail/index.vue` | `效果图/教师手机端/2活动/4虚拟教研/教师档案详情.png` | 增加页面底部安全区，强化最近更新筛选、日期分组、更新记录卡片圆角和记录标题层级 |
| `teacher-mobile/src/pages/activity/virtual-research-position-management/index.vue` | `效果图/已实现/教师手机端/2活动/4虚拟教研/岗位管理页面.png` | 修正底部 Tab 当前态为活动链，强化已加入教研室主卡、待处理任务、可查看入口和固定操作区密度 |

`verify-mobile-entry-visual-baseline.mjs` 已扩展为覆盖 68 个页面。

### 第十八批视觉基准

范围：教师手机端虚拟教研链 4 个资料维护尾页 / 教研室仪表盘页。

| 页面 | 目标图 | 处理 |
| --- | --- | --- |
| `teacher-mobile/src/pages/activity/virtual-research-work-experience-management/index.vue` | `效果图/已实现/教师手机端/2活动/4虚拟教研/工作经历管理.png` | 强化贡献详情主卡、所属教研活动、系统确认依据、关联材料和确认记录卡片层级 |
| `teacher-mobile/src/pages/activity/virtual-research-skill-management/index.vue` | `效果图/已实现/教师手机端/2活动/4虚拟教研/技能特长管理.png` | 增加固定操作区底部预留，统一补充遗漏贡献、已识别贡献、补充表单、依据和材料卡片密度 |
| `teacher-mobile/src/pages/activity/virtual-research-award-management/index.vue` | `效果图/已实现/教师手机端/2活动/4虚拟教研/获奖情况管理.png` | 增加固定操作区底部预留，统一阶段材料活动信息、任务、上传、说明和提交后说明卡片密度 |
| `teacher-mobile/src/pages/activity/virtual-research-role-assignment/index.vue` | `效果图/已实现/教师手机端/2活动/4虚拟教研/角色分配页面.png` | 修正底部 Tab 当前态为活动链，强化教研室仪表盘统计、待处理、教研室和最近活动卡片密度 |

`verify-mobile-entry-visual-baseline.mjs` 已扩展为覆盖 72 个页面。

### 第十九批视觉基准

范围：教师手机端虚拟教研链 1 个发展报告状态页。

| 页面 | 目标图 | 处理 |
| --- | --- | --- |
| `teacher-mobile/src/pages/activity/virtual-research-advanced-settings/index.vue` | `效果图/已实现/教师手机端/2活动/4虚拟教研/高级设置页面.png` | 按当前源码业务语义作为个人发展报告本地模拟操作页验收，强化成长概况、主要成果、能力雷达、发展建议和固定操作区密度 |

`verify-mobile-entry-visual-baseline.mjs` 已扩展为覆盖 73 个页面；虚拟教研链 26 个页面已全部纳入视觉基线。

### 第二十批视觉基准

范围：教师手机端待办链 5 个列表 / 动态 / 证书确认页。

| 页面 | 目标图 | 处理 |
| --- | --- | --- |
| `teacher-mobile/src/pages/todo/all/index.vue` | `效果图/教师手机端/0待办/教师端手机｜待办｜全部待办.png` | 补充底部 Tab 安全区，统一筛选胶囊、待办列表卡片、标题和操作按钮密度 |
| `teacher-mobile/src/pages/todo/dynamics/index.vue` | `效果图/已实现/教师手机端/0待办/教师端手机｜待办｜全部动态.png` | 补充底部 Tab 安全区，强化动态分组标题、动态卡片圆角和列表内距 |
| `teacher-mobile/src/pages/todo/dynamics-filter/index.vue` | `效果图/已实现/教师手机端/0待办/教师端手机｜待办｜全部动态筛选.png` | 补充底部安全区，统一动态卡片、筛选抽屉选项和抽屉操作按钮密度 |
| `teacher-mobile/src/pages/todo/certificate-detail/index.vue` | `效果图/已实现/教师手机端/0待办/教师端手机｜待办｜待确认记录详情｜培训证书.png` | 补充底部安全区，统一证书摘要、信息、材料、确认卡片和确认按钮层级 |
| `teacher-mobile/src/pages/todo/certificate-edit/index.vue` | `效果图/已实现/教师手机端/0待办/教师端手机｜待办｜编辑待确认记录.png` | 补充底部安全区，统一摘要、表单、材料、说明卡片和提交 / 取消按钮密度 |

`verify-mobile-entry-visual-baseline.mjs` 已扩展为覆盖 78 个页面。

### 第二十一批视觉基准

范围：教师手机端待办链 3 个培训证书状态页。

| 页面 | 目标图 | 处理 |
| --- | --- | --- |
| `teacher-mobile/src/pages/todo/certificate-submit/index.vue` | `效果图/已实现/教师手机端/0待办/教师端手机｜待办｜修改已提交｜培训证书.png` | 补充固定操作区底部预留，统一提交结果、修改内容、材料、进度、接下来卡片密度 |
| `teacher-mobile/src/pages/todo/certificate-archive-success/index.vue` | `效果图/已实现/教师手机端/0待办/教师端手机｜待办｜入档成功｜培训证书.png` | 将底部操作固定到安全区，统一等待入档头部、确认记录和后续动作区密度 |
| `teacher-mobile/src/pages/todo/certificate-removed/index.vue` | `效果图/已实现/教师手机端/0待办/教师端手机｜待办｜已移出待确认页.png` | 补充底部操作安全区，统一移出结果头部、记录卡、后续说明和返回入口密度 |

`verify-mobile-entry-visual-baseline.mjs` 已扩展为覆盖 81 个页面；待办链 9 个页面已全部纳入视觉基线。

### 第二十二批视觉基准

范围：教师手机端档案链 5 个基础查询 / 分类 / 列表页。

| 页面 | 目标图 | 处理 |
| --- | --- | --- |
| `teacher-mobile/src/pages/archive/record-query/index.vue` | `效果图/教师手机端/1档案/教师端手机｜档案｜档案记录查询.png` | 补充底部安全区，统一搜索框、分类筛选和结果记录卡片密度 |
| `teacher-mobile/src/pages/archive/category/index.vue` | `效果图/已实现/教师手机端/1档案/分类管理页面.png` | 增加底部固定按钮预留，统一分类概览、指标、重点内容和近期记录密度 |
| `teacher-mobile/src/pages/archive/basic-info-detail/index.vue` | `效果图/已实现/教师手机端/1档案/基本信息/基本信息档案详情.png` | 补充详情页底部操作预留，统一摘要、任职信息、来源追溯、材料和引用范围卡片密度 |
| `teacher-mobile/src/pages/archive/record-list/index.vue` | `效果图/教师手机端/1档案/记录列表页面.png` | 补充列表底部安全区，统一状态筛选、汇总卡、记录卡片和空状态密度 |
| `teacher-mobile/src/pages/archive/draft-list/index.vue` | `效果图/已实现/教师手机端/1档案/成长档案-档案草稿.png` | 补充草稿列表底部安全区，统一草稿 / 待确认汇总、记录卡和空状态密度 |

`verify-mobile-entry-visual-baseline.mjs` 已扩展为覆盖 86 个页面。

### 第二十三批视觉基准

范围：教师手机端档案链 5 个职称聘用更正流程页。

| 页面 | 目标图 | 处理 |
| --- | --- | --- |
| `teacher-mobile/src/pages/archive/correction/apply/index.vue` | `效果图/教师手机端/1档案/职称聘用/教师端手机｜档案｜职称聘用更正申请.png` | 补充底部固定操作区预留，统一原档案、更正原因、说明、关联材料和提交口径卡片密度 |
| `teacher-mobile/src/pages/archive/correction/submitted/index.vue` | `效果图/已实现/教师手机端/1档案/职称聘用/教师端手机｜档案｜更正申请已提交.png` | 补充底部固定操作区预留，统一提交结果、申请记录和后续处理进度密度 |
| `teacher-mobile/src/pages/archive/correction/progress/index.vue` | `效果图/已实现/教师手机端/1档案/职称聘用/教师端手机｜档案｜更正进度｜待核验.png` | 补充底部固定操作区预留，统一摘要、申请信息和时间线密度 |
| `teacher-mobile/src/pages/archive/correction/result/index.vue` | `效果图/已实现/教师手机端/1档案/职称聘用/教师端手机｜档案｜职称聘用更正结果.png` | 补充底部固定操作区预留，统一结果状态、关联档案和结果说明密度 |
| `teacher-mobile/src/pages/archive/correction/supplement/index.vue` | `效果图/已实现/教师手机端/1档案/职称聘用/教师端手机｜档案｜补充材料填写.png` | 补充底部固定操作区预留，统一需补充摘要、补充说明和材料列表密度 |

`verify-mobile-entry-visual-baseline.mjs` 已扩展为覆盖 91 个页面。

### 第二十四批视觉基准

范围：教师手机端档案 / AI 助手 / 我的 5 个详情与补充页。

| 页面 | 目标图 | 处理 |
| --- | --- | --- |
| `teacher-mobile/src/pages/archive/record-detail/index.vue` | `效果图/已实现/教师手机端/1档案/个人成长记录.png` | 补充详情页固定操作区底部预留，统一档案摘要、关键信息、来源追溯、材料和引用卡片密度 |
| `teacher-mobile/src/pages/archive/development-plan-edit/index.vue` | `效果图/已实现/教师手机端/1档案/发展计划编辑.png` | 补充编辑页固定操作区底部预留，统一发展目标、行动安排、佐证材料和提交状态卡片密度 |
| `teacher-mobile/src/pages/assistant/archive-supplement/index.vue` | `效果图/已实现/教师手机端/4AI助手/教师端手机｜AI助手｜补充档案.png` | 补充底部安全区，统一建议材料、补充说明、材料信息和提交按钮密度 |
| `teacher-mobile/src/pages/assistant/archive-supplement-submitted/index.vue` | `效果图/已实现/教师手机端/4AI助手/教师端手机｜AI助手｜补充档案已提交.png` | 补充底部安全区，统一提交结果、当前状态和后续操作按钮密度 |
| `teacher-mobile/src/pages/profile/ability-profile/index.vue` | `效果图/已实现/教师手机端/3我的/教师端手机｜我的｜我的能力画像.png` | 补充底部安全区，统一能力画像主卡、维度分布、短板提示、推荐方向和对照入口密度 |

`verify-mobile-entry-visual-baseline.mjs` 已扩展为覆盖 96 个页面。

### 第二十五批视觉基准

范围：教师手机端活动 / 我的 6 个入口状态与个人发展页。

| 页面 | 目标图 | 处理 |
| --- | --- | --- |
| `teacher-mobile/src/pages/activity/room-entry-state/index.vue` | `效果图/已实现/教师手机端/2活动/活动首页/教师端手机｜活动｜活动首页｜教研室入口状态.png` | 统一教研室入口状态页标题层级、开始卡、成长活动和最近活动卡片密度 |
| `teacher-mobile/src/pages/activity/enterprise-plan-edit/index.vue` | `效果图/已实现/教师手机端/2活动/3企业实践/教师端手机｜活动｜企业实践｜实践计划退回修改.png` | 补充底部安全区，统一退回信息、计划表单、AI 整理结果、补充资料和提交按钮密度 |
| `teacher-mobile/src/pages/profile/ability-profile/records/index.vue` | `效果图/已实现/教师手机端/3我的/教师端手机｜我的｜画像用到的记录.png` | 补充底部安全区，统一画像引用记录说明、记录卡片和档案详情入口密度 |
| `teacher-mobile/src/pages/profile/development-report/index.vue` | `效果图/已实现/教师手机端/3我的/教师端手机｜我的｜个人发展报告.png` | 补充底部安全区，统一报告主卡、能力摘要、依据记录、建议行动和对照入口密度 |
| `teacher-mobile/src/pages/profile/target-position/index.vue` | `效果图/已实现/教师手机端/3我的/教师端手机｜我的｜目标岗位对照.png` | 补充底部安全区，统一目标岗位、已满足要求、缺口要求、证据入口和建议行动密度 |
| `teacher-mobile/src/pages/profile/tenure-requirement/index.vue` | `效果图/已实现/教师手机端/3我的/教师端手机｜我的｜聘期要求对照.png` | 补充底部安全区，统一聘期完成度、已完成证据、缺失证据和建议行动密度 |

`verify-mobile-entry-visual-baseline.mjs` 已扩展为覆盖 102 个页面；教师手机端当前 102 个页面已全部纳入视觉基准守卫。

## 验收命令

手机端代码修改后执行：

```bash
cd teacher-mobile
node scripts/verify-ux-action-closure.mjs
npm run typecheck
npm run build:h5
npm run build:mp-weixin
```

管理端代码修改后执行：

```bash
cd frontend
npm run test
npm run typecheck
npm run build
```
