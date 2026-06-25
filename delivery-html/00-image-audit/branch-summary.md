# 第一阶段成果收口说明｜图片中文命名整理

> 仓库：`zhangyc05/tea-doc`  
> 当前阶段：第一阶段成果已合并到主分支  
> 主分支：`main`  
> 目的：说明本阶段完成了图片内容校验与图片中文命名整理，并明确后续统一从主分支继续。

## 1. 第一阶段成果已经合并到 main

本阶段最终成果已经从：

```text
delivery-html-business-prototype-chinese-filenames-admin-report
```

合并到主分支：

```text
main
```

后续页面映射、HTML 原型和交付说明，都应从 `main` 分支继续。

## 2. 第一阶段实际完成内容

第一阶段核心成果是：**把已确认进入交付范围的效果图图片进行了内容校验、中文命名和目录整理**。

已覆盖范围：

- 教师端手机｜待办；
- 教师端手机｜档案；
- 教师端手机｜活动；
- 教师端手机｜我的 / AI 助手；
- 管理端 PC｜能力清单；
- 管理端 PC｜成长档案；
- 管理端 PC｜能力画像；
- 管理端 PC｜发展活动；
- 管理端 PC｜分析报告。

## 3. 保留在主分支中的交付物

### 3.1 图片内容校验文档

目录：

```text
delivery-html/00-image-audit/
```

主要包括：

- 教师端手机待办模块校验；
- 教师端手机档案模块校验；
- 教师端手机档案模块决策；
- 教师端手机活动模块校验；
- 教师端手机我的 / AI 助手模块校验；
- 管理端 PC 能力清单模块校验；
- 管理端 PC 成长档案模块校验；
- 管理端 PC 能力画像模块校验；
- 管理端 PC 发展活动模块校验；
- 管理端 PC 分析报告模块校验；
- 图片中文重命名清单；
- 本收口说明。

### 3.2 已中文命名的图片文件

效果图目录中，已确认进入交付范围的图片已经按中文业务名重命名。

命名规则：

```text
端类型｜模块｜页面名称｜页面状态.png
```

示例：

```text
教师端手机｜待办｜待确认记录详情｜培训证书.png
教师端手机｜档案｜教学工作档案概览.png
教师端手机｜活动｜教学反思｜报告草稿编辑.png
管理端PC｜能力清单｜执行版查看页.png
管理端PC｜成长档案｜导入批次详情｜识别中.png
管理端PC｜能力画像｜教师画像查询｜卡片视图.png
管理端PC｜培训管理｜资源库.png
管理端PC｜分析报告｜卡片页.png
```

## 4. 本阶段没有强行处理的内容

以下类型未强行重命名：

- 历史版本；
- 候选版本；
- 文件名疑似错误但尚未视觉复核的图片；
- 当前缺失、需要 HTML 阶段补齐的页面。

这样做是为了避免把未确认页面错误固化为正式中文名。

## 5. 关于过程分支

本阶段按模块分批执行时创建过多个过程分支，用来保存每一批的安全快照。

这些过程分支现在都不应再作为后续开发分支使用。

过程分支包括：

```text
delivery-html-business-prototype
delivery-html-business-prototype-chinese-filenames
delivery-html-business-prototype-chinese-filenames-archive
delivery-html-business-prototype-chinese-filenames-activity
delivery-html-business-prototype-chinese-filenames-my-ai
delivery-html-business-prototype-chinese-filenames-admin-ability-list
delivery-html-business-prototype-chinese-filenames-admin-archive
delivery-html-business-prototype-chinese-filenames-admin-profile
delivery-html-business-prototype-chinese-filenames-admin-activity
delivery-html-business-prototype-chinese-filenames-admin-report
```

后续统一以 `main` 为准。

## 6. 分支清理建议

这些过程分支已经不需要继续开发。

建议在确认主分支内容无误后删除过程分支，避免后续误用。

当前我已完成合并到 `main`。但当前可用工具只支持删除文件，不支持删除远程分支引用，所以过程分支需要在 GitHub 页面或本地 Git 中清理。

本地清理命令示例：

```bash
git push origin --delete delivery-html-business-prototype
git push origin --delete delivery-html-business-prototype-chinese-filenames
git push origin --delete delivery-html-business-prototype-chinese-filenames-archive
git push origin --delete delivery-html-business-prototype-chinese-filenames-activity
git push origin --delete delivery-html-business-prototype-chinese-filenames-my-ai
git push origin --delete delivery-html-business-prototype-chinese-filenames-admin-ability-list
git push origin --delete delivery-html-business-prototype-chinese-filenames-admin-archive
git push origin --delete delivery-html-business-prototype-chinese-filenames-admin-profile
git push origin --delete delivery-html-business-prototype-chinese-filenames-admin-activity
git push origin --delete delivery-html-business-prototype-chinese-filenames-admin-report
```

GitHub 页面也可以在 `Branches` 页面中逐个删除这些分支。

## 7. 下一步建议

从 `main` 分支继续下一阶段：

```text
1. 生成 page-map-final.md
2. 基于中文图片名建立最终页面映射
3. 开始第一批 HTML：教师端成长档案待确认记录闭环
```
