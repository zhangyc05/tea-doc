# 教师手机端

教师手机端使用独立 UniApp 工程承载，目标是一套代码交付 H5、微信小程序和 App。

## 技术栈

- UniApp
- Vue 3
- TypeScript
- Vite
- Wot Design Uni
- Pinia

## 命令

```bash
npm install
npm run dev:h5
npm run build:h5
npm run build:mp-weixin
```

## 页面基准

首个手机端基准页仍以活动首页为准：

```txt
../效果图/教师手机端/2活动/活动首页/教师端手机｜活动｜活动首页.png
```

验收视口：

```txt
390x844
375x812
430x932
360x800
```

## 工程边界

- `frontend/` 继续承载管理端 PC。
- `teacher-mobile/` 承载教师手机端多端页面。
- 手机端页面不复用管理端 PC 布局和页面源码。

## 文档入口

```txt
teacher-mobile/docs/mobile-design-system-guide.md
../docs/page-coverage-ledger.md
```
