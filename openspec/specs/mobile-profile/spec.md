## Purpose

定义教师手机端我的 / 个人发展模块当前页面、入口跳转、mock-only 反馈和本地模拟闭环，作为移动端模块级规格样板。

## Requirements

### Requirement: 我的模块页面注册
教师手机端我的 / 个人发展模块 SHALL 在 `teacher-mobile/src/pages.json` 中注册全部当前页面。

#### Scenario: 我的首页注册
- **WHEN** 用户访问我的一级入口
- **THEN** 系统 SHALL 提供 `pages/profile/index` 页面，并使用 custom navigation style

#### Scenario: 个人发展二级页注册
- **WHEN** 用户从我的首页或个人发展详情进入二级页面
- **THEN** 系统 SHALL 提供 `pages/profile/ability-profile/index`、`pages/profile/ability-profile/records/index`、`pages/profile/development-report/index`、`pages/profile/target-position/index` 和 `pages/profile/tenure-requirement/index`

### Requirement: 我的首页
我的首页 SHALL 展示教师身份、能力画像摘要、发展报告入口、档案记录入口和系统服务入口。

#### Scenario: 展示教师周期信息
- **WHEN** 用户进入我的首页
- **THEN** 页面 SHALL 展示教师姓名、院系、职称、年度发展周期和聘期阶段

#### Scenario: 进入能力画像
- **WHEN** 用户点击查看画像
- **THEN** 页面 SHALL 跳转到 `/pages/profile/ability-profile/index`

#### Scenario: 进入发展报告
- **WHEN** 用户点击查看报告
- **THEN** 页面 SHALL 跳转到 `/pages/profile/development-report/index`

#### Scenario: 进入档案记录
- **WHEN** 用户点击已入档记录、信息更正进度或记录用途说明
- **THEN** 页面 SHALL 跳转到对应档案相关页面

#### Scenario: 系统服务降级提示
- **WHEN** 用户点击设置、个人资料或系统服务入口
- **THEN** 页面 SHALL 使用 toast 明确提示该入口为本地模拟且暂未接入独立页面

### Requirement: 能力画像详情
能力画像详情页 SHALL 展示发展指数、能力维度、短板提示、推荐方向和相关页面入口。

#### Scenario: 展示能力画像摘要
- **WHEN** 用户进入能力画像详情页
- **THEN** 页面 SHALL 展示年度发展周期、发展指数、等级、维度分布、短板提示和推荐方向

#### Scenario: 查看画像引用记录
- **WHEN** 用户点击画像记录
- **THEN** 页面 SHALL 跳转到 `/pages/profile/ability-profile/records/index?from=ability-profile`

#### Scenario: 查看发展报告
- **WHEN** 用户点击发展报告
- **THEN** 页面 SHALL 跳转到 `/pages/profile/development-report/index?from=ability-profile`

#### Scenario: 进入对照页面
- **WHEN** 用户点击目标岗位对照或聘期要求对照
- **THEN** 页面 SHALL 分别跳转到目标岗位或聘期要求页面

### Requirement: 画像引用记录
画像引用记录页 SHALL 展示当前前台模拟中用于能力画像、岗位对照和发展报告的档案记录。

#### Scenario: 展示引用记录
- **WHEN** 用户进入画像引用记录页
- **THEN** 页面 SHALL 展示记录标题、档案分类、引用维度、引用原因和证据强度

#### Scenario: 查看档案详情
- **WHEN** 用户点击某条引用记录的档案详情
- **THEN** 页面 SHALL 跳转到 `/pages/archive/record-detail/index?recordId=<recordId>`

### Requirement: 个人发展报告
个人发展报告页 SHALL 展示本地模拟发展报告、依据记录、建议行动和相关对照入口。

#### Scenario: 展示报告摘要
- **WHEN** 用户进入个人发展报告页
- **THEN** 页面 SHALL 展示报告周期、草稿状态、能力摘要、依据记录和建议行动

#### Scenario: 导出报告降级提示
- **WHEN** 用户点击导出报告
- **THEN** 页面 SHALL 使用 modal 明确说明当前为本地模拟发展报告，暂不生成导出文件

#### Scenario: AI 解读入口
- **WHEN** 用户点击 AI 解读
- **THEN** 页面 SHALL 跳转到能力画像详情，并携带来自发展报告的来源参数

#### Scenario: 查看报告依据
- **WHEN** 用户点击依据记录或查看全部依据
- **THEN** 页面 SHALL 跳转到对应档案详情或画像引用记录页面

### Requirement: 目标岗位对照
目标岗位对照页 SHALL 展示目标岗位匹配度、已满足要求、缺口要求和建议行动。

#### Scenario: 展示岗位匹配结果
- **WHEN** 用户进入目标岗位对照页
- **THEN** 页面 SHALL 展示目标岗位、匹配度、已满足要求、缺口要求和建议行动

#### Scenario: 查看缺口证据
- **WHEN** 用户点击查看画像证据或查看实践记录
- **THEN** 页面 SHALL 跳转到画像引用记录或档案详情页面

### Requirement: 聘期要求对照
聘期要求对照页 SHALL 展示当前聘期、总体完成度、已完成证据、缺失证据和建议行动。

#### Scenario: 展示聘期完成情况
- **WHEN** 用户进入聘期要求对照页
- **THEN** 页面 SHALL 展示当前聘期、风险数量、总体完成度、已完成证据和缺失证据

#### Scenario: 查看聘期证据
- **WHEN** 用户点击已完成证据或查看全部证据
- **THEN** 页面 SHALL 跳转到档案详情或画像引用记录页面

#### Scenario: 执行建议行动
- **WHEN** 用户点击建议行动的去完成按钮
- **THEN** 页面 SHALL 跳转到当前已注册或已实现的企业实践、虚拟教研或目标岗位相关页面
