# 页面路由台账

本文档记录所有已实现的路由及其对应的组件映射。

## 更新记录

- 2025-06-26: 初始创建

## 路由映射

### 管理端路由

| 路径 | 组件 | 标题 | 访问限制 |
|------|------|------|----------|
| `/admin` | AdminLayout | 管理端首页 | 需要管理员权限 |
| `/admin/training` | TrainingManagementPage | 培训管理 | 需要管理员权限 |
| `/admin/training/resources` | ResourceLibraryPage | 资源库 | 需要管理员权限 |
| `/admin/archive` | ArchiveManagementPage | 成长档案 | 需要管理员权限 |

### 教师端路由

| 路径 | 组件 | 标题 | 访问限制 |
|------|------|------|----------|
| `/teacher` | TeacherLayout | 教师端首页 | 需要教师权限 |
| `/teacher/training` | TeacherTrainingPage | 培训管理 | 需要教师权限 |
| `/teacher/archive` | TeacherArchivePage | 成长档案 | 需要教师权限 |

### 手机端路由

| 路径 | 组件 | 标题 | 访问限制 |
|------|------|------|----------|
| `/mobile` | MobileLayout | 手机端首页 | 需要教师权限 |
| `/mobile/training` | MobileTrainingPage | 培训管理 | 需要教师权限 |
| `/mobile/archive` | MobileArchivePage | 成长档案 | 需要教师权限 |

### 设计系统路由

| 路径 | 组件 | 标题 | 访问限制 |
|------|------|------|----------|
| `/design-system` | DesignSystemPage | 设计系统 | 仅开发环境 |

## 待开发页面

### 管理端待开发
- T5.2: 培训管理 - 课程管理
- T5.3: 培训管理 - 培训计划
- T5.4: 培训管理 - 培训记录
- T6.1: 成长档案 - 档案列表
- T6.2: 成长档案 - 档案详情

### 教师端待开发
- T7.1: 培训管理 - 我的课程
- T7.2: 培训管理 - 培训计划
- T8.1: 成长档案 - 我的档案

### 手机端待开发
- T9.1: 培训管理 - 课程学习
- T9.2: 成长档案 - 档案查看

## 注意事项

1. 所有管理端页面都需要管理员权限
2. 所有教师端页面都需要教师权限
3. 手机端页面同样需要教师权限
4. 设计系统页面仅在开发环境可访问
5. 路由 meta 信息必须包含完整的面包屑信息
