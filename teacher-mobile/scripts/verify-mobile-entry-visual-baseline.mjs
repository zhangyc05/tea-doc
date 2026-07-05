import { existsSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const repoRoot = resolve(root, '..')

function read(path) {
  return readFileSync(resolve(root, path), 'utf8')
}

const checks = [
  {
    file: 'src/pages/activity/index.vue',
    target: '效果图/教师手机端/2活动/活动首页/教师端手机｜活动｜活动首页.png',
    assertions: [
      {
        name: 'activity entry keeps unified shell and visual rhythm',
        test: source => source.includes('<MobilePageShell class="activity-page" active="activity">') && source.includes('padding: calc(var(--status-bar-height) + 16rpx) 28rpx calc(150rpx + env(safe-area-inset-bottom));'),
      },
      {
        name: 'activity entry first screen has teacher cycle start growth and recent sections',
        test: source => source.includes('class="teacher-card"') && source.includes('class="start-card__content"') && source.includes('class="activity-row"') && source.includes('class="recent-row"'),
      },
      {
        name: 'activity entry uses stable design-system density',
        test: source => /\.page-head__title\s*\{[\s\S]*font-size: 68rpx/.test(source) && /\.section-card\s*\{[\s\S]*border-radius: 32rpx/.test(source) && /\.section-title\s*\{[\s\S]*font-size: 40rpx/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/todo/index.vue',
    target: '效果图/教师手机端/0待办/教师端手机｜待办｜待办首页.png',
    assertions: [
      {
        name: 'todo entry keeps unified shell and safe area',
        test: source => source.includes('<MobilePageShell class="todo-page" active="todo">') && source.includes('padding: calc(var(--status-bar-height) + 16rpx) 28rpx calc(150rpx + env(safe-area-inset-bottom));'),
      },
      {
        name: 'todo entry first screen has greeting todo and dynamics sections',
        test: source => source.includes('class="hero-head"') && source.includes('class="todo-row"') && source.includes('class="dynamic-row"'),
      },
      {
        name: 'todo entry uses stable design-system density',
        test: source => /\.hero-title\s*\{[\s\S]*font-size: 44rpx/.test(source) && /\.section-card\s*\{[\s\S]*border-radius: 32rpx/.test(source) && /\.section-title\s*\{[\s\S]*font-size: 40rpx/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/archive/index.vue',
    target: '效果图/教师手机端/1档案/教师端手机｜档案｜档案首页.png',
    assertions: [
      {
        name: 'archive entry keeps unified shell and target search rhythm',
        test: source => source.includes('<MobilePageShell class="archive-page" active="archive">') && source.includes('class="search-card"') && source.includes('输入关键词'),
      },
      {
        name: 'archive entry first screen has overview categories and recent records',
        test: source => source.includes('档案概览') && source.includes('档案分类') && source.includes('最近入档'),
      },
      {
        name: 'archive entry uses stable design-system density',
        test: source => /\.page-head__title\s*\{[\s\S]*font-size: 68rpx/.test(source) && /\.section-card\s*\{[\s\S]*border-radius: 32rpx/.test(source) && /\.section-title\s*\{[\s\S]*font-size: 40rpx/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/profile/index.vue',
    target: '效果图/教师手机端/3我的/教师端手机｜我的｜我的主页.png',
    assertions: [
      {
        name: 'profile entry keeps unified shell and primary profile card',
        test: source => source.includes('<MobilePageShell class="profile-page" active="profile">') && source.includes('class="profile-card"') && source.includes('class="avatar"'),
      },
      {
        name: 'profile entry first screen has ability report archive and service sections',
        test: source => source.includes('我的能力画像') && source.includes('我的发展报告') && source.includes('档案记录') && source.includes('系统服务'),
      },
      {
        name: 'profile entry uses stable design-system density',
        test: source => /\.profile-page\s*\{[\s\S]*padding: calc\(var\(--status-bar-height\) \+ 16rpx\) 28rpx calc\(150rpx \+ env\(safe-area-inset-bottom\)\)/.test(source) && /\.page-head__title\s*\{[\s\S]*font-size: 68rpx/.test(source) && /\.section-title\s*\{[\s\S]*font-size: 40rpx/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/assistant/index.vue',
    target: '效果图/教师手机端/4AI助手/教师端手机｜AI助手｜补充档案.png',
    assertions: [
      {
        name: 'assistant entry keeps unified shell and assistant scene hierarchy',
        test: source => source.includes('<MobilePageShell class="assistant-page" active="assistant">') && source.includes('class="assistant-hero"') && source.includes('class="scene-card"'),
      },
      {
        name: 'assistant entry first screen has primary archive supplement scene',
        test: source => source.includes('档案补充优先处理') && source.includes('补充档案') && source.includes('/pages/assistant/archive-supplement/index'),
      },
      {
        name: 'assistant entry uses stable design-system density',
        test: source => /\.assistant-page\s*\{[\s\S]*padding: calc\(var\(--status-bar-height\) \+ 16rpx\) 28rpx calc\(150rpx \+ env\(safe-area-inset-bottom\)\)/.test(source) && /\.assistant-hero\s*\{[\s\S]*border-radius: 32rpx/.test(source) && /\.section-title\s*\{[\s\S]*font-size: 40rpx/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/training/index.vue',
    target: '效果图/教师手机端/2活动/2培训进修/教师端手机｜活动｜培训进修｜培训进修首页.png',
    assertions: [
      {
        name: 'training secondary entry keeps activity tab shell and target modules',
        test: source => source.includes('class="training-page"') && source.includes('<MobileTabBar active="activity" />') && source.includes('当前需要处理') && source.includes('适合你的培训') && source.includes('我的培训'),
      },
      {
        name: 'training secondary entry uses activity visual density',
        test: source => /\.training-page\s*\{[\s\S]*padding-bottom: calc\(168rpx \+ env\(safe-area-inset-bottom\)\)/.test(source) && /\.hero\s*\{[\s\S]*min-height: 220rpx/.test(source) && /\.section-title\s*\{[\s\S]*font-size: 38rpx/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/enterprise-overview/index.vue',
    target: '效果图/教师手机端/2活动/3企业实践/教师端手机｜活动｜企业实践｜年度概览.png',
    assertions: [
      {
        name: 'enterprise overview keeps activity tab shell and target modules',
        test: source => source.includes('class="enterprise-page"') && source.includes('<MobileTabBar active="activity" />') && source.includes('2026 年度企业实践') && source.includes('当前需要处理') && source.includes('实践记录'),
      },
      {
        name: 'enterprise overview uses activity visual density',
        test: source => /\.enterprise-page\s*\{[\s\S]*padding-bottom: calc\(190rpx \+ env\(safe-area-inset-bottom\)\)/.test(source) && /\.hero-title\s*\{[\s\S]*font-size: 62rpx/.test(source) && /\.year-card,\s*[\s\S]*\.history-card\s*\{[\s\S]*border-radius: 28rpx/.test(source) && /\.section-title\s*\{[\s\S]*font-size: 38rpx/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/virtual-research-room/index.vue',
    target: '效果图/教师手机端/2活动/4虚拟教研/教师端手机｜活动｜虚拟教研｜我的教研室.png',
    assertions: [
      {
        name: 'virtual research room keeps activity tab shell and target modules',
        test: source => source.includes('class="virtual-room-page"') && source.includes('<MobileTabBar active="activity" />') && source.includes('当前需要处理') && source.includes('我的教研室') && source.includes('最近教研活动'),
      },
      {
        name: 'virtual research room uses activity visual density',
        test: source => /\.virtual-room-page\s*\{[\s\S]*padding-bottom: calc\(190rpx \+ env\(safe-area-inset-bottom\)\)/.test(source) && /\.page-title\s*\{[\s\S]*font-size: 52rpx/.test(source) && /\.stats-card\s*\{[\s\S]*border-radius: 28rpx/.test(source) && /\.section-title\s*\{[\s\S]*font-size: 38rpx/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/reflection-start/index.vue',
    target: '效果图/教师手机端/2活动/1教学反思/教师端手机｜活动｜教学反思｜开始方式.png',
    assertions: [
      {
        name: 'reflection start keeps activity tab shell and target modules',
        test: source => source.includes('class="reflection-start-page"') && source.includes('<MobileTabBar active="activity" />') && source.includes('可基于已有报告开始') && source.includes('没有现成报告，也可以这样开始') && source.includes('最近草稿'),
      },
      {
        name: 'reflection start uses activity visual density',
        test: source => /\.reflection-start-page\s*\{[\s\S]*padding-bottom: calc\(190rpx \+ env\(safe-area-inset-bottom\)\)/.test(source) && /\.hero\s*\{[\s\S]*min-height: 210rpx/.test(source) && /\.section-card\s*\{[\s\S]*border-radius: 28rpx/.test(source) && /\.section-title\s*\{[\s\S]*font-size: 38rpx/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/training-demand/index.vue',
    target: '效果图/教师手机端/2活动/2培训进修/教师端手机｜活动｜培训进修｜提交培训需求.png',
    assertions: [
      {
        name: 'training demand keeps activity tab shell and target modules',
        test: source => source.includes('class="training-demand-page"') && source.includes('<MobileTabBar active="activity" />') && source.includes('你想怎么提出需求？') && source.includes('AI 已识别培训信息') && source.includes('AI 申请说明'),
      },
      {
        name: 'training demand uses form visual density',
        test: source => /\.training-demand-page\s*\{[\s\S]*padding-bottom: calc\(300rpx \+ env\(safe-area-inset-bottom\)\)/.test(source) && /\.hero\s*\{[\s\S]*min-height: 210rpx/.test(source) && /\.mode-card,\s*[\s\S]*\.after-card\s*\{[\s\S]*padding: 28rpx/.test(source) && /\.section-title\s*\{[\s\S]*font-size: 38rpx/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/training-found/index.vue',
    target: '效果图/教师手机端/2活动/2培训进修/教师端手机｜活动｜培训进修｜我已找到想参加的培训.png',
    assertions: [
      {
        name: 'training found keeps activity tab shell and target modules',
        test: source => source.includes('class="found-page"') && source.includes('<MobileTabBar active="activity" />') && source.includes('想提升的方向') && source.includes('培训需求说明') && source.includes('提交后'),
      },
      {
        name: 'training found uses form visual density',
        test: source => /\.found-page\s*\{[\s\S]*padding-bottom: calc\(310rpx \+ env\(safe-area-inset-bottom\)\)/.test(source) && /\.hero\s*\{[\s\S]*min-height: 210rpx/.test(source) && /\.mode-card,\s*[\s\S]*\.after-card\s*\{[\s\S]*padding: 28rpx/.test(source) && /\.section-title\s*\{[\s\S]*font-size: 38rpx/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/training-demand-result/index.vue',
    target: '效果图/教师手机端/2活动/2培训进修/教师端手机｜活动｜培训进修｜培训需求已提交.png',
    assertions: [
      {
        name: 'training demand result keeps activity tab shell and target modules',
        test: source => source.includes('class="demand-result-page"') && source.includes('<MobileTabBar active="activity" />') && source.includes('培训需求已提交') && source.includes('提交内容') && source.includes('当前进度'),
      },
      {
        name: 'training demand result uses success visual density',
        test: source => /\.demand-result-page\s*\{[\s\S]*padding-bottom: calc\(190rpx \+ env\(safe-area-inset-bottom\)\)/.test(source) && /\.success-card,\s*[\s\S]*\.progress-card\s*\{[\s\S]*padding: 30rpx/.test(source) && /\.success-card__title\s*\{[\s\S]*font-size: 48rpx/.test(source) && /\.section-title\s*\{[\s\S]*font-size: 38rpx/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/training-summary/index.vue',
    target: '效果图/教师手机端/2活动/2培训进修/教师端手机｜活动｜培训进修｜培训总结.png',
    assertions: [
      {
        name: 'training summary keeps summary modules and fixed submit actions',
        test: source => source.includes('class="summary-page"') && source.includes('AI 已根据学习记录整理总结') && source.includes('归档准备') && source.includes('AI 培训总结草稿') && source.includes('提交归档'),
      },
      {
        name: 'training summary uses archive form visual density',
        test: source => /\.summary-page\s*\{[\s\S]*padding-bottom: calc\(166rpx \+ env\(safe-area-inset-bottom\)\)/.test(source) && /\.course-card,\s*[\s\S]*\.upload-card\s*\{[\s\S]*padding: 30rpx/.test(source) && /\.course-title\s*\{[\s\S]*font-size: 38rpx/.test(source) && /\.section-title\s*\{[\s\S]*font-size: 38rpx/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/training-list/index.vue',
    target: '效果图/教师手机端/2活动/2培训进修/教师端手机｜活动｜培训进修｜培训进修.png',
    assertions: [
      {
        name: 'training list keeps activity tab shell and target modules',
        test: source => source.includes('class="training-list-page"') && source.includes('<MobileTabBar active="activity" />') && source.includes('适合你的培训') && source.includes('我的培训') && source.includes('提交培训需求'),
      },
      {
        name: 'training list uses course list visual density',
        test: source => /\.training-list-page\s*\{[\s\S]*padding-bottom: calc\(168rpx \+ env\(safe-area-inset-bottom\)\)/.test(source) && /\.recommend-card,\s*[\s\S]*\.empty-card\s*\{[\s\S]*padding: 30rpx/.test(source) && /\.recommend-item\s*\{[\s\S]*min-height: 240rpx/.test(source) && /\.section-title\s*\{[\s\S]*font-size: 38rpx/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/training-application/index.vue',
    target: '效果图/教师手机端/2活动/2培训进修/教师端手机｜活动｜培训进修｜培训申请.png',
    assertions: [
      {
        name: 'training application keeps activity tab shell and target modules',
        test: source => source.includes('class="application-page"') && source.includes('<MobileTabBar active="activity" />') && source.includes('培训申请已提交') && source.includes('申请摘要') && source.includes('当前进度'),
      },
      {
        name: 'training application uses result visual density',
        test: source => /\.application-page\s*\{[\s\S]*padding-bottom: calc\(344rpx \+ env\(safe-area-inset-bottom\)\)/.test(source) && /\.hero\s*\{[\s\S]*min-height: 220rpx/.test(source) && /\.success-card,\s*[\s\S]*\.progress-card\s*\{[\s\S]*padding: 30rpx/.test(source) && /\.success-title\s*\{[\s\S]*font-size: 44rpx/.test(source) && /\.section-title\s*\{[\s\S]*font-size: 38rpx/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/training-archive-result/index.vue',
    target: '效果图/教师手机端/2活动/2培训进修/教师端手机｜活动｜培训进修｜培训材料归档提交结果.png',
    assertions: [
      {
        name: 'training archive result keeps archive result modules and actions',
        test: source => source.includes('class="archive-result-page"') && source.includes('培训材料已提交') && source.includes('已提交内容') && source.includes('当前进度') && source.includes('查看档案待确认'),
      },
      {
        name: 'training archive result uses archive result visual density',
        test: source => /\.archive-result-page\s*\{[\s\S]*padding-bottom: calc\(76rpx \+ env\(safe-area-inset-bottom\)\)/.test(source) && /\.hero-card,\s*[\s\S]*\.progress-card\s*\{[\s\S]*padding: 30rpx/.test(source) && /\.hero-title\s*\{[\s\S]*font-size: 46rpx/.test(source) && /\.section-title\s*\{[\s\S]*font-size: 38rpx/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/training-need-result/index.vue',
    target: '效果图/教师手机端/2活动/2培训进修/教师端手机｜活动｜培训进修｜培训需求提交.png',
    assertions: [
      {
        name: 'training need result keeps activity tab shell and target modules',
        test: source => source.includes('class="need-result-page"') && source.includes('<MobileTabBar active="activity" />') && source.includes('培训需求已提交') && source.includes('提交内容') && source.includes('当前进度'),
      },
      {
        name: 'training need result uses need result visual density',
        test: source => /\.need-result-page\s*\{[\s\S]*padding-bottom: calc\(344rpx \+ env\(safe-area-inset-bottom\)\)/.test(source) && /\.hero\s*\{[\s\S]*min-height: 210rpx/.test(source) && /\.success-title\s*\{[\s\S]*font-size: 48rpx/.test(source) && /\.section-title\s*\{[\s\S]*font-size: 38rpx/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/reflection-course/index.vue',
    target: '效果图/教师手机端/2活动/1教学反思/教师端手机｜活动｜教学反思｜选择学期课程.png',
    assertions: [
      {
        name: 'reflection course keeps activity tab shell and target modules',
        test: source => source.includes('class="reflection-course-page"') && source.includes('<MobileTabBar active="activity" />') && source.includes('本学期课程') && source.includes('本学期可用依据') && source.includes('开始 AI 引导反思'),
      },
      {
        name: 'reflection course uses selection form visual density',
        test: source => /\.reflection-course-page\s*\{[\s\S]*padding-bottom: calc\(304rpx \+ env\(safe-area-inset-bottom\)\)/.test(source) && /\.scope-card,\s*[\s\S]*\.supplement-card\s*\{[\s\S]*padding: 30rpx/.test(source) && /\.section-title\s*\{[\s\S]*font-size: 38rpx/.test(source) && /\.scope-option\s*\{[\s\S]*height: 64rpx/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/reflection-evidence/index.vue',
    target: '效果图/教师手机端/2活动/1教学反思/教师端手机｜活动｜教学反思｜选择反思依据.png',
    assertions: [
      {
        name: 'reflection evidence keeps activity tab shell and target modules',
        test: source => source.includes('class="reflection-evidence-page"') && source.includes('<MobileTabBar active="activity" />') && source.includes('本次课') && source.includes('本次课可用依据') && source.includes('开始 AI 引导反思'),
      },
      {
        name: 'reflection evidence uses selection form visual density',
        test: source => /\.reflection-evidence-page\s*\{[\s\S]*padding-bottom: calc\(304rpx \+ env\(safe-area-inset-bottom\)\)/.test(source) && /\.scope-card,\s*[\s\S]*\.supplement-card\s*\{[\s\S]*padding: 30rpx/.test(source) && /\.section-title\s*\{[\s\S]*font-size: 38rpx/.test(source) && /\.evidence-row\s*\{[\s\S]*min-height: 126rpx/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/reflection-scope/index.vue',
    target: '效果图/教师手机端/2活动/1教学反思/教师端手机｜活动｜教学反思｜反思范围.png',
    assertions: [
      {
        name: 'reflection scope keeps activity tab shell and target modules',
        test: source => source.includes('class="reflection-scope-page"') && source.includes('<MobileTabBar active="activity" />') && source.includes('阶段范围') && source.includes('本阶段可用依据') && source.includes('开始 AI 引导反思'),
      },
      {
        name: 'reflection scope uses stage selection visual density',
        test: source => /\.reflection-scope-page\s*\{[\s\S]*padding-bottom: calc\(304rpx \+ env\(safe-area-inset-bottom\)\)/.test(source) && /\.scope-card,\s*[\s\S]*\.supplement-card\s*\{[\s\S]*padding: 30rpx/.test(source) && /\.section-title,\s*[\s\S]*\.period-title\s*\{[\s\S]*font-size: 38rpx/.test(source) && /\.evidence-row\s*\{[\s\S]*min-height: 126rpx/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/reflection-self/index.vue',
    target: '效果图/教师手机端/2活动/1教学反思/教师端手机｜活动｜教学反思｜自主反思.png',
    assertions: [
      {
        name: 'reflection self keeps activity tab shell and target modules',
        test: source => source.includes('class="reflection-self-page"') && source.includes('<MobileTabBar active="activity" />') && source.includes('你想怎么开始') && source.includes('关联课程') && source.includes('开始 AI 对话'),
      },
      {
        name: 'reflection self uses autonomous form visual density',
        test: source => /\.reflection-self-page\s*\{[\s\S]*padding-bottom: calc\(304rpx \+ env\(safe-area-inset-bottom\)\)/.test(source) && /\.range-card,\s*[\s\S]*\.supplement-card\s*\{[\s\S]*padding: 30rpx/.test(source) && /\.block-title\s*\{[\s\S]*font-size: 38rpx/.test(source) && /\.scope-card\s*\{[\s\S]*height: 152rpx/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/reflection-guide-chat/index.vue',
    target: '效果图/教师手机端/2活动/1教学反思/教师端手机｜活动｜教学反思｜AI引导对话.png',
    assertions: [
      {
        name: 'reflection guide chat keeps activity tab shell and chat modules',
        test: source => source.includes('class="reflection-guide-page"') && source.includes('<MobileTabBar active="activity" />') && source.includes('已选') && source.includes('已整理反思要点') && source.includes('生成反思草稿'),
      },
      {
        name: 'reflection guide chat uses conversation visual density',
        test: source => /\.reflection-guide-page\s*\{[\s\S]*padding-bottom: calc\(166rpx \+ env\(safe-area-inset-bottom\)\)/.test(source) && /\.evidence-card,\s*[\s\S]*\.summary-card\s*\{[\s\S]*padding: 30rpx/.test(source) && /\.summary-title\s*\{[\s\S]*font-size: 36rpx/.test(source) && /\.draft-button\s*\{[\s\S]*height: 76rpx/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/reflection-ai-chat/index.vue',
    target: '效果图/教师手机端/2活动/1教学反思/教学反思-AI对话.png',
    assertions: [
      {
        name: 'reflection ai chat keeps activity tab shell and autonomous modules',
        test: source => source.includes('class="reflection-ai-page"') && source.includes('<MobileTabBar active="activity" />') && source.includes('自主反思') && source.includes('AI 已整理的反思线索') && source.includes('生成反思草稿'),
      },
      {
        name: 'reflection ai chat uses conversation visual density',
        test: source => /\.reflection-ai-page\s*\{[\s\S]*padding-bottom: calc\(166rpx \+ env\(safe-area-inset-bottom\)\)/.test(source) && /\.mode-card,\s*[\s\S]*\.composer-card\s*\{[\s\S]*padding: 30rpx/.test(source) && /\.mode-title\s*\{[\s\S]*font-size: 34rpx/.test(source) && /\.clue-title\s*\{[\s\S]*font-size: 36rpx/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/reflection-draft/index.vue',
    target: '效果图/教师手机端/2活动/1教学反思/教师端手机｜活动｜教学反思｜报告草稿编辑.png',
    assertions: [
      {
        name: 'reflection draft keeps activity tab shell and report modules',
        test: source => source.includes('class="reflection-draft-page"') && source.includes('<MobileTabBar active="activity" />') && source.includes('草稿来源') && source.includes('AI 反思报告草稿') && source.includes('确认反思'),
      },
      {
        name: 'reflection draft uses report edit visual density',
        test: source => /\.reflection-draft-page\s*\{[\s\S]*padding-bottom: calc\(166rpx \+ env\(safe-area-inset-bottom\)\)/.test(source) && /\.source-card,\s*[\s\S]*\.draft-card\s*\{[\s\S]*padding: 30rpx/.test(source) && /\.card-title\s*\{[\s\S]*font-size: 38rpx/.test(source) && /\.bottom-actions\s*\{[\s\S]*gap: 30rpx/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/reflection-success/index.vue',
    target: '效果图/教师手机端/2活动/1教学反思/教师端手机｜活动｜教学反思｜确认成功.png',
    assertions: [
      {
        name: 'reflection success keeps activity tab shell and result modules',
        test: source => source.includes('class="reflection-success-page"') && source.includes('<MobileTabBar active="activity" />') && source.includes('教学反思已确认') && source.includes('反思摘要') && source.includes('你还可以'),
      },
      {
        name: 'reflection success uses result visual density',
        test: source => /\.reflection-success-page\s*\{[\s\S]*padding-bottom: calc\(166rpx \+ env\(safe-area-inset-bottom\)\)/.test(source) && /\.success-card,\s*[\s\S]*\.actions-card\s*\{[\s\S]*padding: 34rpx/.test(source) && /\.success-title\s*\{[\s\S]*font-size: 46rpx/.test(source) && /\.card-title\s*\{[\s\S]*font-size: 38rpx/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/enterprise-list/index.vue',
    target: '效果图/教师手机端/2活动/3企业实践/教师端手机｜活动｜企业实践｜年度列表.png',
    assertions: [
      {
        name: 'enterprise list keeps activity tab shell and yearly modules',
        test: source => source.includes('class="enterprise-list-page"') && source.includes('<MobileTabBar active="activity" />') && source.includes('2026 年度企业实践') && source.includes('当前需要处理') && source.includes('实践记录'),
      },
      {
        name: 'enterprise list uses yearly list visual density',
        test: source => /\.enterprise-list-page\s*\{[\s\S]*padding-bottom: calc\(190rpx \+ env\(safe-area-inset-bottom\)\)/.test(source) && /\.year-card,\s*[\s\S]*\.history-card\s*\{[\s\S]*padding: 32rpx/.test(source) && /\.hero-title\s*\{[\s\S]*font-size: 62rpx/.test(source) && /\.section-title\s*\{[\s\S]*font-size: 38rpx/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/enterprise-plan-submit/index.vue',
    target: '效果图/教师手机端/2活动/3企业实践/教师端手机｜活动｜企业实践｜提交实践计划.png',
    assertions: [
      {
        name: 'enterprise plan submit keeps activity tab shell and form modules',
        test: source => source.includes('class="plan-submit-page"') && source.includes('<MobileTabBar active="activity" />') && source.includes('本年度企业实践要求') && source.includes('AI 已识别并整理实践计划') && source.includes('提交计划'),
      },
      {
        name: 'enterprise plan submit uses plan form visual density',
        test: source => /\.plan-submit-page\s*\{[\s\S]*padding-bottom: calc\(304rpx \+ env\(safe-area-inset-bottom\)\)/.test(source) && /\.requirement-card,\s*[\s\S]*\.material-card\s*\{[\s\S]*padding: 32rpx/.test(source) && /\.card-title\s*\{[\s\S]*font-size: 38rpx/.test(source) && /\.bottom-actions\s*\{[\s\S]*gap: 30rpx/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/enterprise-plan-confirm/index.vue',
    target: '效果图/教师手机端/2活动/3企业实践/教师端手机｜活动｜企业实践｜实践计划确认提交.png',
    assertions: [
      {
        name: 'enterprise plan confirm keeps activity tab shell and confirmation modules',
        test: source => source.includes('class="plan-confirm-page"') && source.includes('<MobileTabBar active="activity" />') && source.includes('实践计划将提交部门审核') && source.includes('提交信息') && source.includes('提交后会发生什么'),
      },
      {
        name: 'enterprise plan confirm uses confirmation visual density',
        test: source => /\.plan-confirm-page\s*\{[\s\S]*padding-bottom: calc\(304rpx \+ env\(safe-area-inset-bottom\)\)/.test(source) && /\.summary-card,\s*[\s\S]*\.process-card\s*\{[\s\S]*padding: 36rpx/.test(source) && /\.summary-title\s*\{[\s\S]*font-size: 42rpx/.test(source) && /\.section-title\s*\{[\s\S]*font-size: 38rpx/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/enterprise-plan-approved/index.vue',
    target: '效果图/教师手机端/2活动/3企业实践/教师端手机｜活动｜企业实践｜实践计划已通过.png',
    assertions: [
      {
        name: 'enterprise plan approved keeps activity tab shell and result modules',
        test: source => source.includes('class="plan-approved-page"') && source.includes('<MobileTabBar active="activity" />') && source.includes('实践计划已确认通过') && source.includes('本次实践计划') && source.includes('下一步'),
      },
      {
        name: 'enterprise plan approved uses result visual density',
        test: source => /\.plan-approved-page\s*\{[\s\S]*padding-bottom: calc\(304rpx \+ env\(safe-area-inset-bottom\)\)/.test(source) && /\.success-card,\s*[\s\S]*\.next-card\s*\{[\s\S]*padding: 36rpx/.test(source) && /\.success-title\s*\{[\s\S]*font-size: 46rpx/.test(source) && /\.section-title\s*\{[\s\S]*font-size: 38rpx/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/enterprise-proof-upload/index.vue',
    target: '效果图/教师手机端/2活动/3企业实践/教师端手机｜活动｜企业实践｜上传实践证明.png',
    assertions: [
      {
        name: 'enterprise proof upload keeps upload modules and fixed actions',
        test: source => source.includes('class="proof-upload-page"') && source.includes('请上传企业实践证明材料') && source.includes('上传方式') && source.includes('已上传材料') && source.includes('确定使用'),
      },
      {
        name: 'enterprise proof upload uses material upload visual density',
        test: source => /\.proof-upload-page\s*\{[\s\S]*padding-bottom: calc\(178rpx \+ env\(safe-area-inset-bottom\)\)/.test(source) && /\.intro-card\s*\{[\s\S]*padding: 44rpx 34rpx/.test(source) && /\.method-card,\s*[\s\S]*\.uploaded-card\s*\{[\s\S]*padding: 36rpx/.test(source) && /\.section-title\s*\{[\s\S]*font-size: 38rpx/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/enterprise-proof-supplement/index.vue',
    target: '效果图/教师手机端/2活动/3企业实践/教师端手机｜活动｜企业实践｜补充实践证明.png',
    assertions: [
      {
        name: 'enterprise proof supplement keeps supplement modules and actions',
        test: source => source.includes('class="proof-supplement-page"') && source.includes('为这条档案补充证明材料') && source.includes('上传方式') && source.includes('已上传材料') && source.includes('确定使用'),
      },
      {
        name: 'enterprise proof supplement uses supplement upload visual density',
        test: source => /\.proof-supplement-page\s*\{[\s\S]*padding-bottom: calc\(320rpx \+ env\(safe-area-inset-bottom\)\)/.test(source) && /\.record-card\s*\{[\s\S]*padding: 36rpx 42rpx/.test(source) && /\.method-card,\s*[\s\S]*\.uploaded-card\s*\{[\s\S]*padding: 32rpx/.test(source) && /\.section-title\s*\{[\s\S]*font-size: 38rpx/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/enterprise-progress-detail/index.vue',
    target: '效果图/教师手机端/2活动/3企业实践/教师端手机｜活动｜企业实践｜进行中详情.png',
    assertions: [
      {
        name: 'enterprise progress detail keeps ongoing modules and actions',
        test: source => source.includes('class="progress-detail-page"') && source.includes('<MobileTabBar active="activity" />') && source.includes('实践计划') && source.includes('今天可以处理') && source.includes('附件资料'),
      },
      {
        name: 'enterprise progress detail uses ongoing detail visual density',
        test: source => /\.progress-detail-page\s*\{[\s\S]*padding-bottom: calc\(190rpx \+ env\(safe-area-inset-bottom\)\)/.test(source) && /\.hero\s*\{[\s\S]*min-height: 254rpx/.test(source) && /\.summary-card\s*\{[\s\S]*padding: 32rpx/.test(source) && /\.section-title\s*\{[\s\S]*font-size: 38rpx/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/enterprise-log-record/index.vue',
    target: '效果图/教师手机端/2活动/3企业实践/教师端手机｜活动｜企业实践｜记录实践日志.png',
    assertions: [
      {
        name: 'enterprise log record keeps log form modules and actions',
        test: source => source.includes('class="log-record-page"') && source.includes('<MobileTabBar active="activity" />') && source.includes('日志日期') && source.includes('今天记录什么？') && source.includes('保存日志'),
      },
      {
        name: 'enterprise log record uses log form visual density',
        test: source => /\.log-record-page\s*\{[\s\S]*padding-bottom: calc\(304rpx \+ env\(safe-area-inset-bottom\)\)/.test(source) && /\.hero\s*\{[\s\S]*min-height: 254rpx/.test(source) && /\.practice-card\s*\{[\s\S]*padding: 34rpx/.test(source) && /\.ai-title\s*\{[\s\S]*font-size: 36rpx/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/enterprise-plan-rejected/index.vue',
    target: '效果图/教师手机端/2活动/3企业实践/教师端手机｜活动｜企业实践｜实践计划退回修改.png',
    assertions: [
      {
        name: 'enterprise plan rejected keeps returned plan modules and fixed actions',
        test: source => source.includes('class="plan-rejected-page"') && source.includes('实践计划需要修改后重新提交') && source.includes('退回信息') && source.includes('需修改的内容') && source.includes('修改计划并重新提交'),
      },
      {
        name: 'enterprise plan rejected uses returned plan visual density',
        test: source => /\.content\s*\{[\s\S]*padding: 24rpx 30rpx calc\(166rpx \+ env\(safe-area-inset-bottom\)\)/.test(source) && /\.alert-card\s*\{[\s\S]*padding: 32rpx 30rpx/.test(source) && /\.reject-card,\s*[\s\S]*\.attachment-card\s*\{[\s\S]*padding: 28rpx/.test(source) && /\.section-title\s*\{[\s\S]*font-size: 38rpx/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/enterprise-supplement-needed/index.vue',
    target: '效果图/教师手机端/2活动/3企业实践/教师端手机｜活动｜企业实践｜需要补充材料.png',
    assertions: [
      {
        name: 'enterprise supplement needed keeps supplement modules and bottom actions',
        test: source => source.includes('class="supplement-needed-page"') && source.includes('<MobileTabBar active="assistant" />') && source.includes('补充档案还需要完善材料') && source.includes('核验反馈') && source.includes('重新提交'),
      },
      {
        name: 'enterprise supplement needed uses supplement state visual density',
        test: source => /\.supplement-needed-page\s*\{[\s\S]*padding-bottom: calc\(344rpx \+ env\(safe-area-inset-bottom\)\)/.test(source) && /\.alert-card\s*\{[\s\S]*padding: 30rpx 34rpx/.test(source) && /\.record-card,\s*[\s\S]*\.remark-card\s*\{[\s\S]*padding: 32rpx 34rpx/.test(source) && /\.record-title,\s*[\s\S]*\.section-title\s*\{[\s\S]*font-size: 38rpx/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/enterprise-resupplement/index.vue',
    target: '效果图/教师手机端/2活动/3企业实践/教师端手机｜活动｜企业实践｜重新补充材料.png',
    assertions: [
      {
        name: 'enterprise resupplement keeps reupload modules and fixed actions',
        test: source => source.includes('class="resupplement-page"') && source.includes('这条企业实践记录还需要补充材料') && source.includes('重新上传材料') && source.includes('补充说明') && source.includes('重新提交'),
      },
      {
        name: 'enterprise resupplement uses reupload visual density',
        test: source => /\.resupplement-page\s*\{[\s\S]*padding-bottom: calc\(178rpx \+ env\(safe-area-inset-bottom\)\)/.test(source) && /\.alert-card\s*\{[\s\S]*padding: 30rpx 36rpx/.test(source) && /\.record-card,\s*[\s\S]*\.remark-card\s*\{[\s\S]*padding: 32rpx 34rpx/.test(source) && /\.section-title\s*\{[\s\S]*font-size: 38rpx/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/enterprise-archive-result/index.vue',
    target: '效果图/教师手机端/2活动/3企业实践/教师端手机｜活动｜企业实践｜归档提交结果.png',
    assertions: [
      {
        name: 'enterprise archive result keeps archive result modules and actions',
        test: source => source.includes('class="archive-result-page"') && source.includes('已提交归档，等待确认') && source.includes('本次实践概览') && source.includes('提交内容') && source.includes('查看提交内容'),
      },
      {
        name: 'enterprise archive result uses archive result visual density',
        test: source => /\.archive-result-page\s*\{[\s\S]*padding-bottom: calc\(198rpx \+ env\(safe-area-inset-bottom\)\)/.test(source) && /\.content\s*\{[\s\S]*padding: 92rpx 30rpx 0/.test(source) && /\.result-card,\s*[\s\S]*\.submit-card\s*\{[\s\S]*padding: 40rpx 40rpx 36rpx/.test(source) && /\.result-title\s*\{[\s\S]*font-size: 42rpx/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/enterprise-history-supplement/index.vue',
    target: '效果图/教师手机端/2活动/3企业实践/教师端手机｜活动｜企业实践｜补充历史实践.png',
    assertions: [
      {
        name: 'enterprise history supplement keeps history form modules and fixed actions',
        test: source => source.includes('class="history-supplement-page"') && source.includes('本年度企业实践要求') && source.includes('AI 已整理历史实践记录') && source.includes('提交确认'),
      },
      {
        name: 'enterprise history supplement uses history form visual density',
        test: source => /\.history-supplement-page\s*\{[\s\S]*padding-bottom: calc\(344rpx \+ env\(safe-area-inset-bottom\)\)/.test(source) && /\.hero-title\s*\{[\s\S]*font-size: 62rpx/.test(source) && /\.requirement-card,\s*[\s\S]*\.material-card\s*\{[\s\S]*padding: 32rpx/.test(source) && /\.card-title\s*\{[\s\S]*font-size: 36rpx/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/enterprise-supplement-submitted/index.vue',
    target: '效果图/教师手机端/2活动/3企业实践/教师端手机｜活动｜企业实践｜补充材料已提交.png',
    assertions: [
      {
        name: 'enterprise supplement submitted keeps submitted modules and archive actions',
        test: source => source.includes('class="supplement-submitted-page"') && source.includes('补充材料已提交') && source.includes('已提交材料') && source.includes('核验说明') && source.includes('查看档案待确认'),
      },
      {
        name: 'enterprise supplement submitted uses submitted result visual density',
        test: source => /\.supplement-submitted-page\s*\{[\s\S]*padding-bottom: calc\(170rpx \+ env\(safe-area-inset-bottom\)\)/.test(source) && /\.success-card\s*\{[\s\S]*padding: 44rpx 60rpx/.test(source) && /\.success-title\s*\{[\s\S]*font-size: 42rpx/.test(source) && /\.record-card,\s*[\s\S]*\.verify-card\s*\{[\s\S]*padding: 34rpx/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/enterprise-history-confirmed/index.vue',
    target: '效果图/教师手机端/2活动/3企业实践/教师端手机｜活动｜企业实践｜历史实践已确认.png',
    assertions: [
      {
        name: 'enterprise history confirmed keeps confirmed modules and follow actions',
        test: source => source.includes('class="history-confirmed-page"') && source.includes('历史实践已确认') && source.includes('年度记录更新') && source.includes('后续可查看') && source.includes('企业实践列表'),
      },
      {
        name: 'enterprise history confirmed uses confirmed result visual density',
        test: source => /\.history-confirmed-page\s*\{[\s\S]*padding-bottom: calc\(190rpx \+ env\(safe-area-inset-bottom\)\)/.test(source) && /\.hero\s*\{[\s\S]*min-height: 238rpx/.test(source) && /\.hero-title\s*\{[\s\S]*font-size: 50rpx/.test(source) && /\.practice-card,\s*[\s\S]*\.follow-card\s*\{[\s\S]*padding: 32rpx/.test(source) && /\.card-title\s*\{[\s\S]*font-size: 36rpx/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/enterprise-archive-success/index.vue',
    target: '效果图/教师手机端/2活动/3企业实践/教师端手机｜活动｜企业实践｜记录已入档.png',
    assertions: [
      {
        name: 'enterprise archive success keeps archive waiting modules and actions',
        test: source => source.includes('class="archive-success-page"') && source.includes('企业实践记录已提交') && source.includes('入档材料') && source.includes('确认后可用于') && source.includes('查看档案待确认'),
      },
      {
        name: 'enterprise archive success uses archive success visual density',
        test: source => /\.archive-success-page\s*\{[\s\S]*padding-bottom: calc\(182rpx \+ env\(safe-area-inset-bottom\)\)/.test(source) && /\.success-card\s*\{[\s\S]*padding: 50rpx 58rpx/.test(source) && /\.success-title\s*\{[\s\S]*font-size: 42rpx/.test(source) && /\.record-card,\s*[\s\S]*\.usage-card\s*\{[\s\S]*padding: 36rpx 40rpx/.test(source) && /\.section-title\s*\{[\s\S]*font-size: 34rpx/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/enterprise-history-supplement-needed/index.vue',
    target: '效果图/教师手机端/2活动/3企业实践/教师端手机｜活动｜企业实践｜历史实践需补充材料.png',
    assertions: [
      {
        name: 'enterprise history supplement needed keeps returned history modules and actions',
        test: source => source.includes('class="history-needed-page"') && source.includes('历史实践需补充材料') && source.includes('退回信息') && source.includes('需补充的材料') && source.includes('补充后重新提交'),
      },
      {
        name: 'enterprise history supplement needed uses returned history visual density',
        test: source => /\.history-needed-page\s*\{[\s\S]*padding-bottom: calc\(190rpx \+ env\(safe-area-inset-bottom\)\)/.test(source) && /\.hero-title\s*\{[\s\S]*font-size: 50rpx/.test(source) && /\.return-card,\s*[\s\S]*\.material-card\s*\{[\s\S]*padding: 32rpx/.test(source) && /\.card-title\s*\{[\s\S]*font-size: 36rpx/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/enterprise-archive-edit/index.vue',
    target: '效果图/教师手机端/2活动/3企业实践/企业实践-修改档案信息.png',
    assertions: [
      {
        name: 'enterprise archive edit keeps draft edit modules and fixed actions',
        test: source => source.includes('class="archive-edit-page"') && source.includes('档案草稿信息') && source.includes('基本信息') && source.includes('实践内容') && source.includes('保存修改'),
      },
      {
        name: 'enterprise archive edit uses archive edit visual density',
        test: source => /\.archive-edit-page\s*\{[\s\S]*padding-bottom: calc\(374rpx \+ env\(safe-area-inset-bottom\)\)/.test(source) && /\.draft-card\s*\{[\s\S]*padding: 34rpx 36rpx/.test(source) && /\.section-card\s*\{[\s\S]*padding: 28rpx/.test(source) && /\.section-title\s*\{[\s\S]*font-size: 36rpx/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/enterprise-import-export/index.vue',
    target: '效果图/教师手机端/2活动/3企业实践/导入导出页面.png',
    assertions: [
      {
        name: 'enterprise import export keeps submitted plan waiting modules and actions',
        test: source => source.includes('class="import-export-page"') && source.includes('实践计划已提交') && source.includes('本次实践计划') && source.includes('AI 已整理内容') && source.includes('返回实践列表'),
      },
      {
        name: 'enterprise import export uses waiting result visual density',
        test: source => /\.import-export-page\s*\{[\s\S]*padding-bottom: calc\(374rpx \+ env\(safe-area-inset-bottom\)\)/.test(source) && /\.success-card\s*\{[\s\S]*min-height: 212rpx/.test(source) && /\.success-title\s*\{[\s\S]*font-size: 44rpx/.test(source) && /\.plan-card,\s*[\s\S]*\.status-card\s*\{[\s\S]*padding: 30rpx 34rpx/.test(source) && /\.section-title\s*\{[\s\S]*font-size: 36rpx/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/enterprise-log-list/index.vue',
    target: '效果图/教师手机端/2活动/3企业实践/企业实践-实践日志.png',
    assertions: [
      {
        name: 'enterprise log list keeps practice log modules and actions',
        test: source => source.includes('class="practice-log-page"') && source.includes('日志摘要') && source.includes('日志列表') && source.includes('返回实践记录详情'),
      },
      {
        name: 'enterprise log list uses timeline visual density',
        test: source => /\.practice-log-page\s*\{[\s\S]*padding-bottom: calc\(68rpx \+ env\(safe-area-inset-bottom\)\)/.test(source) && /\.content\s*\{[\s\S]*padding: 28rpx 36rpx 0/.test(source) && /\.practice-title\s*\{[\s\S]*font-size: 38rpx/.test(source) && /\.summary-card\s*\{[\s\S]*padding: 36rpx 32rpx/.test(source) && /\.log-card\s*\{[\s\S]*padding: 30rpx 64rpx 28rpx 32rpx/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/enterprise-workflow-config/index.vue',
    target: '效果图/教师手机端/2活动/3企业实践/工作流配置.png',
    assertions: [
      {
        name: 'enterprise workflow config keeps log detail modules and actions',
        test: source => source.includes('class="workflow-page"') && source.includes('日志内容') && source.includes('附件资料') && source.includes('AI 整理摘要') && source.includes('返回实践日志'),
      },
      {
        name: 'enterprise workflow config uses log detail visual density',
        test: source => /\.workflow-page\s*\{[\s\S]*padding-bottom: calc\(62rpx \+ env\(safe-area-inset-bottom\)\)/.test(source) && /\.hero-card\s*\{[\s\S]*min-height: 218rpx/.test(source) && /\.hero-title\s*\{[\s\S]*font-size: 34rpx/.test(source) && /\.practice-card,\s*[\s\S]*\.archive-card\s*\{[\s\S]*padding: 32rpx/.test(source) && /\.section-title\s*\{[\s\S]*font-size: 34rpx/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/enterprise-login-history/index.vue',
    target: '效果图/教师手机端/2活动/3企业实践/登录历史页面.png',
    assertions: [
      {
        name: 'enterprise login history keeps archive summary modules and fixed actions',
        test: source => source.includes('class="login-history-page"') && source.includes('归档准备') && source.includes('AI 已整理实践总结草稿') && source.includes('附件资料') && source.includes('提交归档'),
      },
      {
        name: 'enterprise login history uses archive summary visual density',
        test: source => /\.login-history-page\s*\{[\s\S]*padding-bottom: calc\(170rpx \+ env\(safe-area-inset-bottom\)\)/.test(source) && /\.practice-card\s*\{[\s\S]*padding: 32rpx/.test(source) && /\.ready-card\s*\{[\s\S]*min-height: 176rpx/.test(source) && /\.summary-card,\s*[\s\S]*\.attachment-card\s*\{[\s\S]*padding: 30rpx 32rpx/.test(source) && /\.section-title\s*\{[\s\S]*font-size: 36rpx/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/enterprise-advanced-search/index.vue',
    target: '效果图/教师手机端/2活动/3企业实践/高级搜索页面.png',
    assertions: [
      {
        name: 'enterprise advanced search keeps supplement material modules and fixed actions',
        test: source => source.includes('class="advanced-search-page"') && source.includes('还需要补充') && source.includes('上传材料') && source.includes('补充说明') && source.includes('提交补充'),
      },
      {
        name: 'enterprise advanced search uses supplement material visual density',
        test: source => /\.advanced-search-page\s*\{[\s\S]*padding-bottom: calc\(170rpx \+ env\(safe-area-inset-bottom\)\)/.test(source) && /\.alert-card\s*\{[\s\S]*padding: 30rpx 34rpx/.test(source) && /\.practice-card,\s*[\s\S]*\.note-card\s*\{[\s\S]*padding: 32rpx/.test(source) && /\.alert-title\s*\{[\s\S]*font-size: 34rpx/.test(source) && /\.section-title\s*\{[\s\S]*font-size: 34rpx/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/virtual-research-invitation/index.vue',
    target: '效果图/教师手机端/2活动/4虚拟教研/教师端手机｜活动｜虚拟教研｜教研室邀请.png',
    assertions: [
      {
        name: 'virtual research invitation keeps invitation modules and fixed actions',
        test: source => source.includes('class="invitation-page"') && source.includes('智能制造课程虚拟教研室') && source.includes('近期活动') && source.includes('加入后你可以参与') && source.includes('确认加入'),
      },
      {
        name: 'virtual research invitation uses invitation visual density',
        test: source => /\.invitation-page\s*\{[\s\S]*padding-bottom: calc\(348rpx \+ env\(safe-area-inset-bottom\)\)/.test(source) && /\.invite-card\s*\{[\s\S]*padding: 32rpx/.test(source) && /\.room-title\s*\{[\s\S]*font-size: 42rpx/.test(source) && /\.section-card\s*\{[\s\S]*padding: 32rpx/.test(source) && /\.section-title\s*\{[\s\S]*font-size: 38rpx/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/virtual-research-activity-list/index.vue',
    target: '效果图/教师手机端/2活动/4虚拟教研/教师端手机｜活动｜虚拟教研｜教研活动列表.png',
    assertions: [
      {
        name: 'virtual research activity list keeps list modules and actions',
        test: source => source.includes('class="activity-list-page"') && source.includes('本学期参与') && source.includes('当前需要处理') && source.includes('了解规则') && source.includes('确认贡献'),
      },
      {
        name: 'virtual research activity list uses activity list visual density',
        test: source => /\.activity-list-page\s*\{[\s\S]*padding-bottom: calc\(70rpx \+ env\(safe-area-inset-bottom\)\)/.test(source) && /\.summary-card\s*\{[\s\S]*padding: 36rpx 32rpx 32rpx/.test(source) && /\.summary-title\s*\{[\s\S]*font-size: 38rpx/.test(source) && /\.todo-card\s*\{[\s\S]*padding: 28rpx 32rpx/.test(source) && /\.activity-card\s*\{[\s\S]*padding: 36rpx 28rpx 28rpx 150rpx/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/virtual-research-activity-detail-ongoing/index.vue',
    target: '效果图/教师手机端/2活动/4虚拟教研/教师端手机｜活动｜虚拟教研｜教研活动详情｜进行中.png',
    assertions: [
      {
        name: 'virtual research ongoing detail keeps activity detail modules and actions',
        test: source => source.includes('class="detail-page"') && source.includes('活动说明') && source.includes('我的任务') && source.includes('过程材料') && source.includes('提交阶段材料'),
      },
      {
        name: 'virtual research ongoing detail uses ongoing detail visual density',
        test: source => /\.detail-page\s*\{[\s\S]*padding-bottom: calc\(166rpx \+ env\(safe-area-inset-bottom\)\)/.test(source) && /\.hero-card\s*\{[\s\S]*padding: 32rpx/.test(source) && /\.activity-title\s*\{[\s\S]*font-size: 42rpx/.test(source) && /\.section-card\s*\{[\s\S]*padding: 32rpx/.test(source) && /\.section-title\s*\{[\s\S]*font-size: 38rpx/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/virtual-research-activity-detail-confirm/index.vue',
    target: '效果图/教师手机端/2活动/4虚拟教研/教师端手机｜活动｜虚拟教研｜教研活动详情｜待确认贡献.png',
    assertions: [
      {
        name: 'virtual research confirm detail keeps contribution confirm modules and actions',
        test: source => source.includes('class="confirm-page"') && source.includes('完整贡献确认页') && source.includes('系统已整理') && source.includes('待确认贡献') && source.includes('确认贡献'),
      },
      {
        name: 'virtual research confirm detail uses contribution confirm visual density',
        test: source => /\.confirm-page\s*\{[\s\S]*padding-bottom: calc\(178rpx \+ env\(safe-area-inset-bottom\)\)/.test(source) && /\.hero-card\s*\{[\s\S]*padding: 32rpx/.test(source) && /\.activity-title\s*\{[\s\S]*font-size: 42rpx/.test(source) && /\.organize-card,\s*[\s\S]*\.file-card\s*\{[\s\S]*padding: 30rpx/.test(source) && /\.section-title,\s*[\s\S]*\.block-title\s*\{[\s\S]*font-size: 34rpx/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/virtual-research-confirm-contribution/index.vue',
    target: '效果图/教师手机端/2活动/4虚拟教研/教师端手机｜活动｜虚拟教研｜教研贡献确认.png',
    assertions: [
      {
        name: 'virtual research contribution confirmation keeps contribution evidence modules and actions',
        test: source => source.includes('class="confirm-contribution-page"') && source.includes('识别到的贡献') && source.includes('可补充说明') && source.includes('确认后去向') && source.includes('确认贡献'),
      },
      {
        name: 'virtual research contribution confirmation uses contribution form visual density',
        test: source => /\.confirm-contribution-page\s*\{[\s\S]*padding-bottom: calc\(170rpx \+ env\(safe-area-inset-bottom\)\)/.test(source) && /\.summary-card\s*\{[\s\S]*padding: 32rpx/.test(source) && /\.activity-title\s*\{[\s\S]*font-size: 42rpx/.test(source) && /\.ai-card,\s*[\s\S]*\.direction-card\s*\{[\s\S]*padding: 32rpx/.test(source) && /\.section-title\s*\{[\s\S]*font-size: 34rpx/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/virtual-research-contribution-detail/index.vue',
    target: '效果图/教师手机端/2活动/4虚拟教研/教师端手机｜活动｜虚拟教研｜教研贡献详情.png',
    assertions: [
      {
        name: 'virtual research contribution detail keeps confirmed evidence modules and return action',
        test: source => source.includes('class="contribution-detail-page"') && source.includes('所属教研活动') && source.includes('贡献说明') && source.includes('系统依据') && source.includes('返回教研记录'),
      },
      {
        name: 'virtual research contribution detail uses detail visual density',
        test: source => /\.contribution-detail-page\s*\{[\s\S]*padding-bottom: calc\(76rpx \+ env\(safe-area-inset-bottom\)\)/.test(source) && /\.hero-card\s*\{[\s\S]*padding: 36rpx 34rpx/.test(source) && /\.hero-title\s*\{[\s\S]*font-size: 40rpx/.test(source) && /\.section-card\s*\{[\s\S]*padding: 30rpx/.test(source) && /\.section-title\s*\{[\s\S]*font-size: 34rpx/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/virtual-research-contribution-confirm/index.vue',
    target: '效果图/教师手机端/2活动/4虚拟教研/教师端手机｜活动｜虚拟教研｜确认教研贡献.png',
    assertions: [
      {
        name: 'virtual research contribution confirm keeps activity info contribution and fixed actions',
        test: source => source.includes('class="contribution-confirm-page"') && source.includes('活动信息') && source.includes('待你确认的个人贡献') && source.includes('本次已关联材料') && source.includes('确认贡献'),
      },
      {
        name: 'virtual research contribution confirm uses confirm visual density',
        test: source => /\.contribution-confirm-page\s*\{[\s\S]*padding-bottom: calc\(300rpx \+ env\(safe-area-inset-bottom\)\)/.test(source) && /\.hero-card\s*\{[\s\S]*padding: 36rpx 34rpx/.test(source) && /\.hero-title\s*\{[\s\S]*font-size: 42rpx/.test(source) && /\.section-card\s*\{[\s\S]*padding: 32rpx/.test(source) && /\.section-title\s*\{[\s\S]*font-size: 34rpx/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/virtual-research-contribution-submitted/index.vue',
    target: '效果图/教师手机端/2活动/4虚拟教研/教师端手机｜活动｜虚拟教研｜贡献确认已提交.png',
    assertions: [
      {
        name: 'virtual research contribution submitted keeps submitted summary modules and actions',
        test: source => source.includes('class="submitted-page"') && source.includes('你确认的个人贡献已提交') && source.includes('已确认的个人贡献') && source.includes('当前状态') && source.includes('查看提交内容'),
      },
      {
        name: 'virtual research contribution submitted uses submitted visual density',
        test: source => /\.submitted-page\s*\{[\s\S]*padding-bottom: calc\(170rpx \+ env\(safe-area-inset-bottom\)\)/.test(source) && /\.success-hero\s*\{[\s\S]*min-height: 240rpx/.test(source) && /\.success-title\s*\{[\s\S]*font-size: 40rpx/.test(source) && /\.activity-card,\s*[\s\S]*\.destination-card\s*\{[\s\S]*border-radius: 24rpx/.test(source) && /\.section-title\s*\{[\s\S]*font-size: 34rpx/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/virtual-research-activity-detail-supplement-submitted/index.vue',
    target: '效果图/教师手机端/2活动/4虚拟教研/教师端手机｜活动｜虚拟教研｜教研活动详情｜补充已提交.png',
    assertions: [
      {
        name: 'virtual research supplement submitted keeps activity contribution and confirmation modules',
        test: source => source.includes('class="submitted-page"') && source.includes('补充已提交') && source.includes('本次补充贡献') && source.includes('已识别贡献') && source.includes('去确认贡献'),
      },
      {
        name: 'virtual research supplement submitted uses submitted visual density',
        test: source => /\.submitted-page\s*\{[\s\S]*padding-bottom: calc\(170rpx \+ env\(safe-area-inset-bottom\)\)/.test(source) && /\.success-hero\s*\{[\s\S]*min-height: 282rpx/.test(source) && /\.activity-card,\s*[\s\S]*\.status-card\s*\{[\s\S]*border-radius: 24rpx/.test(source) && /\.activity-card,\s*[\s\S]*\.status-card\s*\{[\s\S]*padding: 30rpx/.test(source) && /\.section-title\s*\{[\s\S]*font-size: 34rpx/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/virtual-research-supplement-material/index.vue',
    target: '效果图/教师手机端/2活动/4虚拟教研/教师端手机｜活动｜虚拟教研｜补充教研活动材料.png',
    assertions: [
      {
        name: 'virtual research supplement material keeps return reason material and fixed actions',
        test: source => source.includes('class="supplement-page"') && source.includes('退回说明') && source.includes('需要补充') && source.includes('补充材料') && source.includes('重新提交'),
      },
      {
        name: 'virtual research supplement material uses supplement form visual density',
        test: source => /\.supplement-page\s*\{[\s\S]*padding-bottom: calc\(300rpx \+ env\(safe-area-inset-bottom\)\)/.test(source) && /\.activity-card,\s*[\s\S]*\.section-card\s*\{[\s\S]*border-radius: 24rpx/.test(source) && /\.activity-card,\s*[\s\S]*\.return-card\s*\{[\s\S]*padding: 32rpx/.test(source) && /\.section-card\s*\{[\s\S]*padding: 30rpx/.test(source) && /\.section-title\s*\{[\s\S]*font-size: 34rpx/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/virtual-research-stage-submitted/index.vue',
    target: '效果图/教师手机端/2活动/4虚拟教研/教师端手机｜活动｜虚拟教研｜阶段材料已提交.png',
    assertions: [
      {
        name: 'virtual research stage submitted keeps submitted material status and actions',
        test: source => source.includes('class="stage-page"') && source.includes('你提交的阶段材料已保存') && source.includes('已提交材料') && source.includes('当前状态') && source.includes('查看活动详情'),
      },
      {
        name: 'virtual research stage submitted uses stage result visual density',
        test: source => /\.stage-page\s*\{[\s\S]*padding-bottom: calc\(170rpx \+ env\(safe-area-inset-bottom\)\)/.test(source) && /\.success-hero\s*\{[\s\S]*min-height: 266rpx/.test(source) && /\.activity-card,\s*[\s\S]*\.section-card\s*\{[\s\S]*border-radius: 24rpx/.test(source) && /\.section-card\s*\{[\s\S]*padding: 30rpx/.test(source) && /\.section-title\s*\{[\s\S]*font-size: 34rpx/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/virtual-research-archive-result/index.vue',
    target: '效果图/教师手机端/2活动/4虚拟教研/教师端手机｜活动｜虚拟教研｜教研活动归档结果.png',
    assertions: [
      {
        name: 'virtual research archive result keeps archive materials destinations and actions',
        test: source => source.includes('class="archive-page"') && source.includes('教研活动已归档') && source.includes('归档材料') && source.includes('归档去向') && source.includes('查看教研记录'),
      },
      {
        name: 'virtual research archive result uses archive result visual density',
        test: source => /\.archive-page\s*\{[\s\S]*padding-bottom: calc\(170rpx \+ env\(safe-area-inset-bottom\)\)/.test(source) && /\.success-hero\s*\{[\s\S]*min-height: 270rpx/.test(source) && /\.activity-card,\s*[\s\S]*\.section-card\s*\{[\s\S]*border-radius: 24rpx/.test(source) && /\.section-card\s*\{[\s\S]*padding: 30rpx/.test(source) && /\.section-title\s*\{[\s\S]*font-size: 34rpx/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/virtual-research-resubmitted/index.vue',
    target: '效果图/教师手机端/2活动/4虚拟教研/教师端手机｜活动｜虚拟教研｜补充材料已重新提交.png',
    assertions: [
      {
        name: 'virtual research resubmitted keeps supplement result status and actions',
        test: source => source.includes('class="resubmitted-page"') && source.includes('补充材料已重新提交') && source.includes('本次补充内容') && source.includes('当前状态') && source.includes('查看提交内容'),
      },
      {
        name: 'virtual research resubmitted uses resubmitted result visual density',
        test: source => /\.resubmitted-page\s*\{[\s\S]*padding-bottom: calc\(170rpx \+ env\(safe-area-inset-bottom\)\)/.test(source) && /\.result-hero\s*\{[\s\S]*padding: 38rpx 72rpx 46rpx/.test(source) && /\.activity-card,\s*[\s\S]*\.section-card\s*\{[\s\S]*border-radius: 24rpx/.test(source) && /\.section-card\s*\{[\s\S]*padding: 30rpx/.test(source) && /\.section-title\s*\{[\s\S]*font-size: 34rpx/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/virtual-research-archive-result-v1/index.vue',
    target: '效果图/教师手机端/2活动/4虚拟教研/教研活动归档结果-版本一.png',
    assertions: [
      {
        name: 'virtual research archive result v1 keeps archived contributions materials and actions',
        test: source => source.includes('class="archive-v1-page"') && source.includes('教研活动已归档') && source.includes('已确认贡献') && source.includes('归档材料') && source.includes('查看教研记录'),
      },
      {
        name: 'virtual research archive result v1 uses archive visual density',
        test: source => /\.archive-v1-page\s*\{[\s\S]*padding-bottom: calc\(286rpx \+ env\(safe-area-inset-bottom\)\)/.test(source) && /\.hero-card,\s*[\s\S]*\.section-card\s*\{[\s\S]*border-radius: 24rpx/.test(source) && /\.hero-title\s*\{[\s\S]*font-size: 40rpx/.test(source) && /\.section-card\s*\{[\s\S]*padding: 30rpx/.test(source) && /\.section-title\s*\{[\s\S]*font-size: 34rpx/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/virtual-research-archived-confirmed/index.vue',
    target: '效果图/教师手机端/2活动/4虚拟教研/教师端手机｜活动｜虚拟教研｜教研活动已归档｜贡献已确认.png',
    assertions: [
      {
        name: 'virtual research archived confirmed keeps contribution confirmed materials and actions',
        test: source => source.includes('class="archived-page"') && source.includes('本次教研活动已完成归档') && source.includes('已确认贡献') && source.includes('归档材料') && source.includes('查看教研记录'),
      },
      {
        name: 'virtual research archived confirmed uses confirmed archive visual density',
        test: source => /\.archived-page\s*\{[\s\S]*padding-bottom: calc\(170rpx \+ env\(safe-area-inset-bottom\)\)/.test(source) && /\.hero-card,\s*[\s\S]*\.section-card\s*\{[\s\S]*border-radius: 24rpx/.test(source) && /\.hero-title\s*\{[\s\S]*font-size: 40rpx/.test(source) && /\.section-card\s*\{[\s\S]*padding: 30rpx/.test(source) && /\.section-title\s*\{[\s\S]*font-size: 34rpx/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/virtual-research-profile-complete/index.vue',
    target: '效果图/教师手机端/2活动/4虚拟教研/个人资料完善.png',
    assertions: [
      {
        name: 'virtual research profile complete keeps room detail tasks materials and tab shell',
        test: source => source.includes('class="room-detail-page"') && source.includes('智能制造课程虚拟教研室') && source.includes('当前需要处理') && source.includes('过程材料') && source.includes('<MobileTabBar active="activity" />'),
      },
      {
        name: 'virtual research profile complete uses room detail visual density',
        test: source => /\.room-detail-page\s*\{[\s\S]*padding-bottom: calc\(170rpx \+ env\(safe-area-inset-bottom\)\)/.test(source) && /\.room-card,\s*[\s\S]*\.material-card\s*\{[\s\S]*border-radius: 24rpx/.test(source) && /\.room-card\s*\{[\s\S]*padding: 34rpx/.test(source) && /\.room-title\s*\{[\s\S]*font-size: 38rpx/.test(source) && /\.block-title\s*\{[\s\S]*font-size: 34rpx/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/virtual-research-basic-info-edit/index.vue',
    target: '效果图/教师手机端/2活动/4虚拟教研/基本信息编辑.png',
    assertions: [
      {
        name: 'virtual research basic info edit keeps submitted contribution modules and activity tab',
        test: source => source.includes('class="submitted-shell"') && source.includes('贡献确认已提交') && source.includes('已确认贡献') && source.includes('当前状态') && source.includes('<MobileTabBar active="activity" />'),
      },
      {
        name: 'virtual research basic info edit uses submitted profile visual density',
        test: source => /\.submitted-shell\s*\{[\s\S]*padding-bottom: calc\(270rpx \+ env\(safe-area-inset-bottom\)\)/.test(source) && /\.hero-card,\s*[\s\S]*\.status-card\s*\{[\s\S]*border-radius: 24rpx/.test(source) && /\.hero-title\s*\{[\s\S]*font-size: 40rpx/.test(source) && /\.activity-card,\s*[\s\S]*\.status-card\s*\{[\s\S]*padding: 32rpx/.test(source) && /\.section-title\s*\{[\s\S]*font-size: 34rpx/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/virtual-research-profile-intro-edit/index.vue',
    target: '效果图/教师手机端/2活动/4虚拟教研/个人简介编辑.png',
    assertions: [
      {
        name: 'virtual research profile intro edit keeps contribution profile modules and fixed actions',
        test: source => source.includes('class="intro-submitted-page"') && source.includes('虚拟教研成员资料') && source.includes('已确认的个人贡献') && source.includes('关联材料') && source.includes('查看提交内容'),
      },
      {
        name: 'virtual research profile intro edit uses member profile visual density',
        test: source => /\.intro-submitted-page\s*\{[\s\S]*padding-bottom: calc\(170rpx \+ env\(safe-area-inset-bottom\)\)/.test(source) && /\.hero-section\s*\{[\s\S]*padding: 40rpx 34rpx 32rpx/.test(source) && /\.section-card\s*\{[\s\S]*border-radius: 24rpx/.test(source) && /\.section-card\s*\{[\s\S]*padding: 30rpx/.test(source) && /\.section-title\s*\{[\s\S]*font-size: 34rpx/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/virtual-research-teacher-archive-detail/index.vue',
    target: '效果图/教师手机端/2活动/4虚拟教研/教师档案详情.png',
    assertions: [
      {
        name: 'virtual research teacher archive detail keeps recent update filters and records',
        test: source => source.includes('class="recent-page"') && source.includes('最近更新') && source.includes('filter-tabs') && source.includes('update-card') && source.includes('记录详情为本地模拟'),
      },
      {
        name: 'virtual research teacher archive detail uses recent update visual density',
        test: source => /\.recent-page\s*\{[\s\S]*padding-bottom: calc\(44rpx \+ env\(safe-area-inset-bottom\)\)/.test(source) && /\.filter-tabs\s*\{[\s\S]*border-radius: 999rpx/.test(source) && /\.update-card\s*\{[\s\S]*border-radius: 24rpx/.test(source) && /\.update-row\s*\{[\s\S]*padding: 28rpx/.test(source) && /\.record-title\s*\{[\s\S]*font-size: 32rpx/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/virtual-research-position-management/index.vue',
    target: '效果图/教师手机端/2活动/4虚拟教研/岗位管理页面.png',
    assertions: [
      {
        name: 'virtual research position management keeps joined room modules and activity tab',
        test: source => source.includes('class="joined-room-page"') && source.includes('你已加入智能制造课程虚拟教研室') && source.includes('接下来可处理') && source.includes('加入后可查看') && source.includes('<MobileTabBar active="activity" />'),
      },
      {
        name: 'virtual research position management uses joined room visual density',
        test: source => /\.joined-room-page\s*\{[\s\S]*padding-bottom: calc\(300rpx \+ env\(safe-area-inset-bottom\)\)/.test(source) && /\.room-card,\s*[\s\S]*\.view-card\s*\{[\s\S]*border-radius: 26rpx/.test(source) && /\.room-card\s*\{[\s\S]*padding: 32rpx/.test(source) && /\.room-title\s*\{[\s\S]*font-size: 36rpx/.test(source) && /\.section-title\s*\{[\s\S]*font-size: 34rpx/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/virtual-research-work-experience-management/index.vue',
    target: '效果图/教师手机端/2活动/4虚拟教研/工作经历管理.png',
    assertions: [
      {
        name: 'virtual research work experience management keeps contribution detail modules and activity tab',
        test: source => source.includes('class="work-contribution-page"') && source.includes('所属教研活动') && source.includes('系统确认依据') && source.includes('关联材料') && source.includes('返回教研记录') && source.includes('<MobileTabBar active="activity" />'),
      },
      {
        name: 'virtual research work experience management uses contribution detail visual density',
        test: source => /\.content\s*\{[\s\S]*padding: 0 30rpx calc\(174rpx \+ env\(safe-area-inset-bottom\)\)/.test(source) && /\.hero-card,\s*[\s\S]*\.summary-card\s*\{[\s\S]*border-radius: 26rpx/.test(source) && /\.hero-title\s*\{[\s\S]*font-size: 40rpx/.test(source) && /\.section-card\s*\{[\s\S]*padding: 30rpx/.test(source) && /\.section-title\s*\{[\s\S]*font-size: 34rpx/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/virtual-research-skill-management/index.vue',
    target: '效果图/教师手机端/2活动/4虚拟教研/技能特长管理.png',
    assertions: [
      {
        name: 'virtual research skill management keeps supplement contribution modules and fixed action',
        test: source => source.includes('class="supplement-page"') && source.includes('补充遗漏贡献') && source.includes('系统已识别贡献') && source.includes('我要补充的贡献') && source.includes('提交补充'),
      },
      {
        name: 'virtual research skill management uses supplement visual density',
        test: source => /\.supplement-page\s*\{[\s\S]*padding-bottom: calc\(170rpx \+ env\(safe-area-inset-bottom\)\)/.test(source) && /\.activity-card,\s*[\s\S]*\.notice-card\s*\{[\s\S]*border-radius: 26rpx/.test(source) && /\.activity-card,\s*[\s\S]*\.notice-card\s*\{[\s\S]*padding: 30rpx/.test(source) && /\.section-title\s*\{[\s\S]*font-size: 34rpx/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/virtual-research-award-management/index.vue',
    target: '效果图/教师手机端/2活动/4虚拟教研/获奖情况管理.png',
    assertions: [
      {
        name: 'virtual research award management keeps stage material modules and fixed action',
        test: source => source.includes('class="stage-material-page"') && source.includes('提交阶段材料') && source.includes('我的任务') && source.includes('上传材料') && source.includes('提交材料'),
      },
      {
        name: 'virtual research award management uses stage material visual density',
        test: source => /\.stage-material-page\s*\{[\s\S]*padding-bottom: calc\(170rpx \+ env\(safe-area-inset-bottom\)\)/.test(source) && /\.activity-card,\s*[\s\S]*\.notice-card\s*\{[\s\S]*border-radius: 24rpx/.test(source) && /\.activity-card,\s*[\s\S]*\.notice-card\s*\{[\s\S]*padding: 30rpx/.test(source) && /\.section-title\s*\{[\s\S]*font-size: 34rpx/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/virtual-research-role-assignment/index.vue',
    target: '效果图/教师手机端/2活动/4虚拟教研/角色分配页面.png',
    assertions: [
      {
        name: 'virtual research role assignment keeps room dashboard modules and activity tab',
        test: source => source.includes('class="room-dashboard-page"') && source.includes('我的教研室') && source.includes('当前需要处理') && source.includes('最近教研活动') && source.includes('<MobileTabBar active="activity" />'),
      },
      {
        name: 'virtual research role assignment uses room dashboard visual density',
        test: source => /\.room-dashboard-page\s*\{[\s\S]*padding-bottom: calc\(190rpx \+ env\(safe-area-inset-bottom\)\)/.test(source) && /\.stats-card\s*\{[\s\S]*padding: 28rpx/.test(source) && /\.stats-card\s*\{[\s\S]*border-radius: 24rpx/.test(source) && /\.todo-card,\s*[\s\S]*\.activity-card\s*\{[\s\S]*border-radius: 24rpx/.test(source) && /\.section-title\s*\{[\s\S]*font-size: 34rpx/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/activity/virtual-research-advanced-settings/index.vue',
    target: '效果图/教师手机端/2活动/4虚拟教研/高级设置页面.png',
    assertions: [
      {
        name: 'virtual research advanced settings keeps development report modules and fixed actions',
        test: source => source.includes('class="report-page"') && source.includes('成长概况') && source.includes('主要成果') && source.includes('能力发展雷达') && source.includes('下一步发展建议') && source.includes('确认保存报告'),
      },
      {
        name: 'virtual research advanced settings uses report visual density',
        test: source => /\.report-page\s*\{[\s\S]*padding-bottom: calc\(220rpx \+ env\(safe-area-inset-bottom\)\)/.test(source) && /\.section-card\s*\{[\s\S]*border-radius: 24rpx/.test(source) && /\.section-card\s*\{[\s\S]*padding: 30rpx/.test(source) && /\.section-index\s*\{[\s\S]*border-radius: 12rpx 12rpx 0 0/.test(source) && /\.section-title\s*\{[\s\S]*font-size: 36rpx/.test(source) && /\.fixed-actions\s*\{[\s\S]*padding: 20rpx 32rpx calc\(20rpx \+ env\(safe-area-inset-bottom\)\)/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/todo/all/index.vue',
    target: '效果图/教师手机端/0待办/教师端手机｜待办｜全部待办.png',
    assertions: [
      {
        name: 'todo all keeps todo tab filters and action list',
        test: source => source.includes('<MobilePageShell class="all-todo-page" active="todo">') && source.includes('全部待办') && source.includes('待确认') && source.includes('待补充') && source.includes('showTodoAction(item)'),
      },
      {
        name: 'todo all uses list visual density',
        test: source => /\.all-todo-page\s*\{[\s\S]*padding-bottom: calc\(150rpx \+ env\(safe-area-inset-bottom\)\)/.test(source) && /\.filter-pill\s*\{[\s\S]*border-radius: 16rpx/.test(source) && /\.todo-list-card\s*\{[\s\S]*padding: 32rpx/.test(source) && /\.todo-list-card\s*\{[\s\S]*border-radius: 32rpx/.test(source) && /\.todo-title\s*\{[\s\S]*font-size: 32rpx/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/todo/dynamics/index.vue',
    target: '效果图/教师手机端/0待办/教师端手机｜待办｜全部动态.png',
    assertions: [
      {
        name: 'todo dynamics keeps todo tab filter entry and grouped dynamics',
        test: source => source.includes('<MobilePageShell class="dynamics-page" active="todo">') && source.includes('全部动态') && source.includes('筛选') && source.includes('date-group') && source.includes('动态详情为本地模拟'),
      },
      {
        name: 'todo dynamics uses dynamic list visual density',
        test: source => /\.dynamics-page\s*\{[\s\S]*padding-bottom: calc\(150rpx \+ env\(safe-area-inset-bottom\)\)/.test(source) && /\.filter-tabs\s*\{[\s\S]*border-radius: 38rpx/.test(source) && /\.date-title\s*\{[\s\S]*font-size: 32rpx/.test(source) && /\.dynamic-card\s*\{[\s\S]*padding: 22rpx/.test(source) && /\.dynamic-card\s*\{[\s\S]*border-radius: 24rpx/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/todo/dynamics-filter/index.vue',
    target: '效果图/教师手机端/0待办/教师端手机｜待办｜全部动态筛选.png',
    assertions: [
      {
        name: 'todo dynamics filter keeps drawer options and result action',
        test: source => source.includes('<MobilePageShell class="dynamics-filter-page" active="todo">') && source.includes('时间范围') && source.includes('更新类型') && source.includes('相关分类') && source.includes('查看结果'),
      },
      {
        name: 'todo dynamics filter uses drawer visual density',
        test: source => /\.dynamics-filter-page\s*\{[\s\S]*padding-bottom: calc\(150rpx \+ env\(safe-area-inset-bottom\)\)/.test(source) && /\.dynamic-card\s*\{[\s\S]*border-radius: 24rpx/.test(source) && /\.filter-drawer\s*\{[\s\S]*border-radius: 48rpx 48rpx 0 0/.test(source) && /\.option-pill\s*\{[\s\S]*height: 76rpx/.test(source) && /\.drawer-action\s*\{[\s\S]*height: 80rpx/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/todo/certificate-detail/index.vue',
    target: '效果图/教师手机端/0待办/教师端手机｜待办｜待确认记录详情｜培训证书.png',
    assertions: [
      {
        name: 'todo certificate detail keeps confirm edit remove and material preview flow',
        test: source => source.includes('<MobilePageShell class="detail-page" active="todo">') && source.includes('关键信息') && source.includes('系统识别依据') && source.includes('确认是我的') && source.includes('信息有误，修改一下') && source.includes('不是我的'),
      },
      {
        name: 'todo certificate detail uses confirmation visual density',
        test: source => /\.detail-page\s*\{[\s\S]*padding-bottom: calc\(150rpx \+ env\(safe-area-inset-bottom\)\)/.test(source) && /\.summary-card,\s*[\s\S]*\.confirm-card\s*\{[\s\S]*border-radius: 24rpx/.test(source) && /\.summary-card,\s*[\s\S]*\.confirm-card\s*\{[\s\S]*padding: 28rpx 32rpx/.test(source) && /\.section-title\s*\{[\s\S]*font-size: 34rpx/.test(source) && /\.confirm-action\s*\{[\s\S]*height: 64rpx/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/todo/certificate-edit/index.vue',
    target: '效果图/教师手机端/0待办/教师端手机｜待办｜编辑待确认记录.png',
    assertions: [
      {
        name: 'todo certificate edit keeps editable info materials note and submit actions',
        test: source => source.includes('<MobilePageShell class="edit-page" active="todo">') && source.includes('可修改信息') && source.includes('相关材料') && source.includes('补充说明') && source.includes('提交修改') && source.includes('取消修改'),
      },
      {
        name: 'todo certificate edit uses edit form visual density',
        test: source => /\.edit-page\s*\{[\s\S]*padding-bottom: calc\(170rpx \+ env\(safe-area-inset-bottom\)\)/.test(source) && /\.summary-card,\s*[\s\S]*\.note-card\s*\{[\s\S]*padding: 28rpx/.test(source) && /\.summary-card\s*\{[\s\S]*border-radius: 30rpx/.test(source) && /\.section-title\s*\{[\s\S]*font-size: 34rpx/.test(source) && /\.submit-button,\s*[\s\S]*\.cancel-button\s*\{[\s\S]*height: 64rpx/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/todo/certificate-submit/index.vue',
    target: '效果图/教师手机端/0待办/教师端手机｜待办｜修改已提交｜培训证书.png',
    assertions: [
      {
        name: 'todo certificate submit keeps submitted verification modules and todo actions',
        test: source => source.includes('<MobilePageShell class="submit-page" active="todo">') && source.includes('修改已提交') && source.includes('修改内容') && source.includes('当前进度') && source.includes('查看提交记录') && source.includes('返回待办'),
      },
      {
        name: 'todo certificate submit uses submitted state visual density',
        test: source => /\.submit-page\s*\{[\s\S]*padding-bottom: calc\(220rpx \+ env\(safe-area-inset-bottom\)\)/.test(source) && /\.result-card,\s*[\s\S]*\.next-card\s*\{[\s\S]*padding: 30rpx/.test(source) && /\.result-card,\s*[\s\S]*\.next-card\s*\{[\s\S]*border-radius: 28rpx/.test(source) && /\.section-title\s*\{[\s\S]*font-size: 34rpx/.test(source) && /\.footer-actions\s*\{[\s\S]*padding: 20rpx 32rpx calc\(20rpx \+ env\(safe-area-inset-bottom\)\)/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/todo/certificate-archive-success/index.vue',
    target: '效果图/教师手机端/0待办/教师端手机｜待办｜入档成功｜培训证书.png',
    assertions: [
      {
        name: 'todo certificate archive success keeps confirmation record and next actions',
        test: source => source.includes('<MobilePageShell class="archive-success-page" active="todo">') && source.includes('已确认，等待入档') && source.includes('确认记录') && source.includes('接下来') && source.includes('查看待核验记录') && source.includes('返回待办'),
      },
      {
        name: 'todo certificate archive success uses archive state visual density',
        test: source => /\.archive-success-page\s*\{[\s\S]*padding: calc\(var\(--status-bar-height\) \+ 4rpx\) 34rpx calc\(220rpx \+ env\(safe-area-inset-bottom\)\)/.test(source) && /\.hero-card,\s*[\s\S]*\.next-card\s*\{[\s\S]*border-radius: 28rpx/.test(source) && /\.hero-title\s*\{[\s\S]*font-size: 50rpx/.test(source) && /\.section-title\s*\{[\s\S]*font-size: 39rpx/.test(source) && /\.footer-actions\s*\{[\s\S]*padding: 20rpx 32rpx calc\(20rpx \+ env\(safe-area-inset-bottom\)\)/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/todo/certificate-removed/index.vue',
    target: '效果图/教师手机端/0待办/教师端手机｜待办｜已移出待确认页.png',
    assertions: [
      {
        name: 'todo certificate removed keeps removed record explanation and todo actions',
        test: source => source.includes('<MobilePageShell class="removed-page" active="todo">') && source.includes('已移出待确认') && source.includes('后续说明') && source.includes('移出原因') && source.includes('返回待办') && source.includes('查看其他待确认记录'),
      },
      {
        name: 'todo certificate removed uses removed state visual density',
        test: source => /\.removed-page\s*\{[\s\S]*padding: calc\(var\(--status-bar-height\) \+ 4rpx\) 34rpx calc\(220rpx \+ env\(safe-area-inset-bottom\)\)/.test(source) && /\.hero-card,\s*[\s\S]*\.note-card\s*\{[\s\S]*border-radius: 28rpx/.test(source) && /\.hero-title\s*\{[\s\S]*font-size: 50rpx/.test(source) && /\.section-title\s*\{[\s\S]*font-size: 36rpx/.test(source) && /\.footer-actions\s*\{[\s\S]*padding: 20rpx 32rpx calc\(20rpx \+ env\(safe-area-inset-bottom\)\)/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/archive/record-query/index.vue',
    target: '效果图/教师手机端/1档案/教师端手机｜档案｜档案记录查询.png',
    assertions: [
      {
        name: 'archive record query keeps archive tab search filters and results',
        test: source => source.includes('<MobilePageShell class="record-query-page" active="archive">') && source.includes('找到 {{ filteredRecords.length }} 条相关记录') && source.includes('filter-tabs') && source.includes('record-list') && source.includes('暂无匹配档案'),
      },
      {
        name: 'archive record query uses search result visual density',
        test: source => /\.record-query-page\s*\{[\s\S]*padding: calc\(var\(--status-bar-height\) \+ 16rpx\) 28rpx calc\(170rpx \+ env\(safe-area-inset-bottom\)\)/.test(source) && /\.search-box\s*\{[\s\S]*border-radius: 24rpx/.test(source) && /\.filter-tab\s*\{[\s\S]*height: 62rpx/.test(source) && /\.record-card\s*\{[\s\S]*padding: 24rpx/.test(source) && /\.record-card\s*\{[\s\S]*border-radius: 26rpx/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/archive/category/index.vue',
    target: '效果图/教师手机端/1档案/分类管理页面.png',
    assertions: [
      {
        name: 'archive category keeps summary metrics focus records and footer action',
        test: source => source.includes('<MobilePageShell class="archive-category-page" active="archive">') && source.includes('重点内容') && source.includes('近期记录') && source.includes('查看全部记录') && source.includes('发展计划'),
      },
      {
        name: 'archive category uses category overview visual density',
        test: source => /\.archive-category-page\s*\{[\s\S]*padding: calc\(var\(--status-bar-height\) \+ 4rpx\) 30rpx calc\(220rpx \+ env\(safe-area-inset-bottom\)\)/.test(source) && /\.hero-card,\s*[\s\S]*\.metric-card\s*\{[\s\S]*border-radius: 30rpx/.test(source) && /\.section-card\s*\{[\s\S]*padding: 30rpx/.test(source) && /\.section-title\s*\{[\s\S]*font-size: 34rpx/.test(source) && /\.footer-button\s*\{[\s\S]*bottom: calc\(32rpx \+ env\(safe-area-inset-bottom\)\)/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/archive/basic-info-detail/index.vue',
    target: '效果图/教师手机端/1档案/基本信息/基本信息档案详情.png',
    assertions: [
      {
        name: 'archive basic info detail keeps profile source materials and correction actions',
        test: source => source.includes('<MobilePageShell class="basic-info-detail-page" active="archive">') && source.includes('档案摘要') && source.includes('任职信息') && source.includes('来源追溯') && source.includes('核验材料') && source.includes('申请更正'),
      },
      {
        name: 'archive basic info detail uses detail visual density',
        test: source => /\.basic-info-detail-page\s*\{[\s\S]*padding: calc\(var\(--status-bar-height\) \+ 4rpx\) 30rpx calc\(220rpx \+ env\(safe-area-inset-bottom\)\)/.test(source) && /\.hero-card,\s*[\s\S]*\.section-card\s*\{[\s\S]*border-radius: 30rpx/.test(source) && /\.section-card\s*\{[\s\S]*padding: 32rpx/.test(source) && /\.section-title\s*\{[\s\S]*font-size: 34rpx/.test(source) && /\.footer-actions\s*\{[\s\S]*padding: 20rpx 32rpx calc\(20rpx \+ env\(safe-area-inset-bottom\)\)/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/archive/record-list/index.vue',
    target: '效果图/教师手机端/1档案/记录列表页面.png',
    assertions: [
      {
        name: 'archive record list keeps category summary status filters records and search',
        test: source => source.includes('<MobilePageShell class="archive-record-list-page" active="archive">') && source.includes('全部状态') && source.includes('已入档') && source.includes('待确认') && source.includes('查看档案详情') && source.includes('去搜索档案'),
      },
      {
        name: 'archive record list uses record list visual density',
        test: source => /\.archive-record-list-page\s*\{[\s\S]*padding: calc\(var\(--status-bar-height\) \+ 4rpx\) 30rpx calc\(170rpx \+ env\(safe-area-inset-bottom\)\)/.test(source) && /\.summary-card,\s*[\s\S]*\.empty-card\s*\{[\s\S]*border-radius: 30rpx/.test(source) && /\.record-card\s*\{[\s\S]*padding: 30rpx/.test(source) && /\.record-title\s*\{[\s\S]*font-size: 32rpx/.test(source) && /\.toolbar-chip\s*\{[\s\S]*height: 58rpx/.test(source),
      },
    ],
  },
  {
    file: 'src/pages/archive/draft-list/index.vue',
    target: '效果图/教师手机端/1档案/成长档案-档案草稿.png',
    assertions: [
      {
        name: 'archive draft list keeps draft pending records and archive search fallback',
        test: source => source.includes('<MobilePageShell class="archive-draft-list-page" active="archive">') && source.includes('草稿 / 待确认') && source.includes('继续编辑草稿') && source.includes('查看确认进度') && source.includes('去搜索档案'),
      },
      {
        name: 'archive draft list uses draft list visual density',
        test: source => /\.archive-draft-list-page\s*\{[\s\S]*padding: calc\(var\(--status-bar-height\) \+ 4rpx\) 30rpx calc\(170rpx \+ env\(safe-area-inset-bottom\)\)/.test(source) && /\.summary-card,\s*[\s\S]*\.empty-card\s*\{[\s\S]*border-radius: 30rpx/.test(source) && /\.record-card\s*\{[\s\S]*padding: 30rpx/.test(source) && /\.record-title\s*\{[\s\S]*font-size: 32rpx/.test(source) && /\.record-summary\s*\{[\s\S]*font-size: 26rpx/.test(source),
      },
    ],
  },
]

const failures = []

for (const check of checks) {
  if (!existsSync(resolve(repoRoot, check.target))) {
    failures.push(`${check.file}: missing visual target ${check.target}`)
  }

  const source = read(check.file)
  for (const assertion of check.assertions) {
    if (!assertion.test(source)) {
      failures.push(`${check.file}: ${assertion.name}`)
    }
  }
}

if (failures.length > 0) {
  console.error('Mobile entry visual baseline check failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log(`Mobile entry visual baseline check passed: ${checks.length} pages`)
