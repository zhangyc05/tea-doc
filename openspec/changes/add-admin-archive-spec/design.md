## Context

`admin-archive` 是第一期规格体系之后的第二个管理端模块规格。当前成长档案模块已经在 `frontend/src/router/admin.routes.ts` 中注册了档案处理、导入部门资料、导入批次详情、档案查阅和教师成长档案详情页面。

该模块当前依赖 `frontend/src/stores/admin/archiveStore.ts` 和 `frontend/src/stores/admin/archive/**` 维护前台本地状态，覆盖上传文件、创建导入批次、完成识别、取消识别、确认识别结果、生成待处理记录、确认入档、退回、标记异常、查询教师档案事实和创建导出记录等行为。规格应如实描述这些本地闭环，不把它们扩大为真实服务接口。

## Goals / Non-Goals

**Goals:**

- 新增 `admin-archive` 模块主规格。
- 覆盖当前管理端成长档案 5 个页面的路由、入口、状态流转和操作反馈。
- 与已有 `admin-page-contract` 保持一致：路由可追踪、详情可返回、状态操作有本地反馈。
- 继续使用中文规格内容和 OpenSpec 固定结构标题。

**Non-Goals:**

- 不修改 archive 页面代码、store 或 mock 数据。
- 不新增后端接口、上传服务、OCR 服务或真实 PDF 导出能力。
- 不重写已有 `admin-page-contract`。
- 不覆盖教师手机端档案页面；本 change 只处理管理端成长档案。

## Decisions

1. **单独新增 `admin-archive` capability**

   成长档案模块有独立页面、store、mock 数据和业务状态流转，适合独立成模块规格。通用页面规则继续由 `admin-page-contract` 承载。

2. **以本地状态闭环为规格边界**

   导入批次、识别结果、处理记录和导出记录都来自前端本地状态。规格用“本地状态”“前台模拟”“生成记录”等措辞，不承诺真实文件上传、真实识别或真实 PDF 生成。

3. **按页面工作流组织 requirement**

   规格按“路由结构、导入上传、批次识别、档案处理、档案查阅、教师详情、store 状态”组织，便于后续按页面或 store 测试回查。

## Risks / Trade-offs

- **风险：导入识别被误解为真实 OCR / 后端能力** → 规格明确该流程由前端本地 mock 状态支撑。
- **风险：教师档案详情中的导出行为被误解为正式 PDF 导出** → 规格描述为本地导出记录和文本文件示例。
- **风险：后续真实接口接入后规格失效** → 接入真实服务时应新增 change 修改 `admin-archive` requirement，而不是直接覆盖当前规格。
