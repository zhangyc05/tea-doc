# 中文重命名分支收口说明

> 仓库：`zhangyc05/tea-doc`  
> 当前阶段：第 0 步图片内容校验与图片中文重命名收口  
> 目的：解释为什么出现多个中文重命名分支，明确后续应该使用哪个分支，避免继续在中间分支上开发。

## 1. 当前工作分为两类

### 1.1 图片内容校验文档

图片内容校验文档主要记录：

- 原始图片路径；
- 图片真实页面含义；
- 是否进入 HTML 交付；
- 哪些图片是候选版本；
- 哪些图片需要视觉复核；
- 页面业务边界和产品取舍。

建议继续以以下分支作为校验文档主分支：

```text
delivery-html-business-prototype
```

### 1.2 图片中文重命名执行

图片中文重命名是基于已完成校验后的实际文件改名 / 移动操作。

最终完整结果在以下分支：

```text
delivery-html-business-prototype-chinese-filenames-admin-report
```

后续如果继续做 HTML 原型，建议基于该最终分支继续，而不是基于中间分支。

## 2. 为什么出现多个分支

重命名是按模块逐批执行的。每完成一批，我都创建了一个独立分支作为安全快照，避免一次性改动太大、难以回退。

这个做法的好处是每批可追溯，坏处是分支数量变多，后续容易混乱。

## 3. 中文重命名分支链路

| 顺序 | 分支 | 对应批次 | 说明 | 后续是否继续使用 |
|---:|---|---|---|---|
| 1 | `delivery-html-business-prototype-chinese-filenames` | 教师端手机｜待办模块 | 待办首页、全部待办、全部动态、待确认记录、入档成功、编辑、已移出待确认页等 | 不建议继续使用 |
| 2 | `delivery-html-business-prototype-chinese-filenames-archive` | 教师端手机｜档案模块 | 档案首页、八维档案、教学工作、教研科研、成果荣誉、企业实践档案、职称聘用更正闭环等 | 不建议继续使用 |
| 3 | `delivery-html-business-prototype-chinese-filenames-activity` | 教师端手机｜活动模块 | 活动首页、教学反思、培训进修、企业实践活动、虚拟教研等 | 不建议继续使用 |
| 4 | `delivery-html-business-prototype-chinese-filenames-my-ai` | 教师端手机｜我的 / AI 助手模块 | 我的主页、能力画像、画像用到的记录、目标岗位对照、聘期要求对照、个人发展报告、AI 补充档案等 | 不建议继续使用 |
| 5 | `delivery-html-business-prototype-chinese-filenames-admin-ability-list` | 管理端 PC｜能力清单模块 | 执行版、指标编辑抽屉、基准模版、优化建议、发布确认、岗位与聘期要求映射等 | 不建议继续使用 |
| 6 | `delivery-html-business-prototype-chinese-filenames-admin-archive` | 管理端 PC｜成长档案模块 | 导入资料、识别中、识别完成、档案处理、来源详情、教师档案查阅、阅读档案详情等 | 不建议继续使用 |
| 7 | `delivery-html-business-prototype-chinese-filenames-admin-profile` | 管理端 PC｜能力画像模块 | 群体画像、教师画像查询卡片视图、列表视图、教师个人画像详情 | 不建议继续使用 |
| 8 | `delivery-html-business-prototype-chinese-filenames-admin-activity` | 管理端 PC｜发展活动模块 | 教学反思、培训管理、企业实践、虚拟教研相关页面 | 不建议继续使用 |
| 9 | `delivery-html-business-prototype-chinese-filenames-admin-report` | 管理端 PC｜分析报告模块 | 分析报告入口图，命名为卡片页 | **建议作为最终中文命名分支继续使用** |

## 4. 当前建议保留的核心分支

后续只需要关注两个核心分支：

```text
delivery-html-business-prototype
```

用于查看第 0 步图片内容校验文档。

```text
delivery-html-business-prototype-chinese-filenames-admin-report
```

用于继续后续 HTML 原型开发。

## 5. 中间分支处理建议

中间分支不需要继续开发。

建议处理方式：

1. 暂时不删除，避免刚重命名完后需要回溯；
2. 后续确认最终分支没有问题后，可以删除中间分支；
3. 后续 HTML 原型、页面映射、交付说明统一从最终分支继续。

不建议再在以下中间分支上继续提交：

```text
delivery-html-business-prototype-chinese-filenames
delivery-html-business-prototype-chinese-filenames-archive
delivery-html-business-prototype-chinese-filenames-activity
delivery-html-business-prototype-chinese-filenames-my-ai
delivery-html-business-prototype-chinese-filenames-admin-ability-list
delivery-html-business-prototype-chinese-filenames-admin-archive
delivery-html-business-prototype-chinese-filenames-admin-profile
delivery-html-business-prototype-chinese-filenames-admin-activity
```

## 6. 已完成中文重命名范围

当前最终分支已覆盖：

- 教师端手机｜待办；
- 教师端手机｜档案；
- 教师端手机｜活动；
- 教师端手机｜我的 / AI 助手；
- 管理端 PC｜能力清单；
- 管理端 PC｜成长档案；
- 管理端 PC｜能力画像；
- 管理端 PC｜发展活动；
- 管理端 PC｜分析报告。

## 7. 重要说明

### 7.1 中文重命名只覆盖已确认图片

本次中文重命名只覆盖已经完成内容校验、明确进入交付范围的图片。

以下类型没有强行重命名：

- 历史版本；
- 候选版本；
- 文件名疑似错误但尚未视觉复核的图片；
- 当前缺失、需要 HTML 阶段补齐的页面。

### 7.2 HTML 文件名后续仍建议用英文 / 拼音

图片文件名改成中文，便于人工查看和设计交付。

但 HTML / CSS / JS 文件名建议继续使用英文或拼音，例如：

```text
teacher-mobile-todo-confirm-flow.html
admin-pc-ability-list-execution.html
```

这样更利于开发、部署和跨系统兼容。

## 8. 下一步建议

建议从最终中文命名分支继续：

```text
delivery-html-business-prototype-chinese-filenames-admin-report
```

下一步做：

```text
1. 生成 page-map-final.md
2. 基于中文图片名建立页面映射
3. 开始第一批 HTML：教师端成长档案待确认记录闭环
```
