<script setup lang="ts">
import MobileActionButton from '../../components/MobileActionButton.vue'
import MobileCard from '../../components/MobileCard.vue'
import MobilePageShell from '../../components/MobilePageShell.vue'

type AssistantScene = {
  title: string
  desc: string
  meta: string
  tone: 'green' | 'blue' | 'orange'
  action: string
  url?: string
}

const assistantScenes: AssistantScene[] = [
  {
    title: '补充档案',
    desc: '补充缺失材料、说明来源，提交后进入待确认或待核验。',
    meta: '档案事实不会直接入档',
    tone: 'green',
    action: '开始补充',
    url: '/pages/assistant/archive-supplement/index',
  },
  {
    title: '解读能力画像',
    desc: '查看当前发展指数、能力短板和画像用到的记录。',
    meta: '只读解释，不修改画像结果',
    tone: 'blue',
    action: '查看画像',
  },
  {
    title: '查看待办建议',
    desc: '根据待确认记录、补充材料和活动进度整理下一步。',
    meta: '保持原待办状态流',
    tone: 'orange',
    action: '查看待办',
    url: '/pages/todo/index',
  },
]

const recentNotes = [
  '企业实践证明材料可补充来源说明',
  '培训证书记录已进入待确认',
  '个人发展报告有 2 条依据记录待查看',
]

function goScene(scene: AssistantScene) {
  if (!scene.url) {
    uni.showToast({ title: '页面待补齐', icon: 'none' })
    return
  }

  uni.navigateTo({ url: scene.url })
}
</script>

<template>
  <MobilePageShell class="assistant-page" active="assistant">
    <view class="system-status" aria-hidden="true">
      <text class="system-status__time">9:41</text>
      <view class="system-status__icons">
        <view class="status-signal"></view>
        <view class="status-wifi"></view>
        <view class="status-battery"></view>
      </view>
    </view>

    <view class="page-head">
      <view class="page-head__copy">
        <text class="page-head__eyebrow">AI 助手</text>
        <text class="page-head__title">把记录变成可追溯的成长材料</text>
      </view>
    </view>

    <MobileCard class="assistant-hero">
      <view class="assistant-hero__mark">
        <view class="assistant-hero__spark"></view>
      </view>
      <view class="assistant-hero__body">
        <text class="assistant-hero__title">档案补充优先处理</text>
        <text class="assistant-hero__desc">
          AI 会根据待确认记录、发展报告和能力画像提示需要补充的材料。
        </text>
      </view>
      <MobileActionButton class="assistant-hero__action" variant="primary" @tap="goScene(assistantScenes[0])">
        补充档案
      </MobileActionButton>
    </MobileCard>

    <view class="scene-list">
      <MobileCard
        v-for="scene in assistantScenes"
        :key="scene.title"
        class="scene-card"
        :class="`scene-card--${scene.tone}`"
      >
        <view class="scene-card__icon"></view>
        <view class="scene-card__body">
          <text class="scene-card__title">{{ scene.title }}</text>
          <text class="scene-card__desc">{{ scene.desc }}</text>
          <text class="scene-card__meta">{{ scene.meta }}</text>
        </view>
        <MobileActionButton class="scene-card__action" variant="link" arrow @tap="goScene(scene)">
          {{ scene.action }}
        </MobileActionButton>
      </MobileCard>
    </view>

    <MobileCard class="recent-card">
      <view class="section-head">
        <text class="section-title">最近建议</text>
        <text class="section-count">3 条</text>
      </view>
      <view v-for="note in recentNotes" :key="note" class="recent-row">
        <view class="recent-row__dot"></view>
        <text>{{ note }}</text>
      </view>
    </MobileCard>
  </MobilePageShell>
</template>

<style lang="scss" scoped>
@import '../../styles/tokens.scss';

.assistant-page {
  --assistant-ink: #122031;
  --assistant-line: rgba(18, 32, 49, 0.1);
}

.system-status,
.system-status__icons,
.page-head,
.assistant-hero,
.assistant-hero__mark,
.scene-card,
.section-head,
.recent-row {
  display: flex;
  align-items: center;
}

.system-status {
  height: 42rpx;
  justify-content: space-between;
  padding: 0 18rpx;
}

.system-status__time {
  color: #050812;
  font-size: 30rpx;
  font-weight: 900;
  line-height: 1;
}

.system-status__icons {
  gap: 14rpx;
}

.status-signal {
  width: 38rpx;
  height: 26rpx;
  background: #050812;
  clip-path: polygon(0 70%, 18% 70%, 18% 100%, 0 100%, 0 70%, 27% 52%, 45% 52%, 45% 100%, 27% 100%, 27% 52%, 54% 32%, 72% 32%, 72% 100%, 54% 100%, 54% 32%, 82% 10%, 100% 10%, 100% 100%, 82% 100%, 82% 10%);
}

.status-wifi {
  position: relative;
  width: 36rpx;
  height: 26rpx;
  border: 8rpx solid #050812;
  border-color: #050812 transparent transparent;
  border-radius: 50%;
}

.status-wifi::after {
  position: absolute;
  right: 7rpx;
  bottom: -9rpx;
  width: 9rpx;
  height: 9rpx;
  border-radius: 50%;
  background: #050812;
  content: '';
}

.status-battery {
  position: relative;
  width: 52rpx;
  height: 26rpx;
  border: 4rpx solid #050812;
  border-radius: 8rpx;
}

.status-battery::before {
  position: absolute;
  top: 4rpx;
  left: 4rpx;
  width: 38rpx;
  height: 10rpx;
  border-radius: 4rpx;
  background: #050812;
  content: '';
}

.status-battery::after {
  position: absolute;
  top: 6rpx;
  right: -9rpx;
  width: 5rpx;
  height: 12rpx;
  border-radius: 0 4rpx 4rpx 0;
  background: #050812;
  content: '';
}

.page-head {
  justify-content: space-between;
  margin-top: 22rpx;
  margin-bottom: 24rpx;
}

.page-head__copy {
  display: grid;
  gap: 10rpx;
}

.page-head__eyebrow {
  color: $teacher-mobile-primary-dark;
  font-size: 24rpx;
  font-weight: 900;
}

.page-head__title {
  max-width: 560rpx;
  color: var(--assistant-ink);
  font-size: 42rpx;
  font-weight: 900;
  line-height: 1.16;
}

.assistant-hero {
  gap: 24rpx;
  padding: 28rpx;
  border-color: rgba(14, 193, 101, 0.24);
  background:
    linear-gradient(135deg, rgba(235, 255, 245, 0.96), rgba(255, 255, 255, 0.96)),
    #fff;
}

.assistant-hero__mark {
  position: relative;
  width: 112rpx;
  height: 112rpx;
  flex: 0 0 auto;
  justify-content: center;
  border-radius: 30rpx;
  background: #13251c;
  box-shadow: 0 18rpx 34rpx rgba(6, 69, 38, 0.2);
}

.assistant-hero__spark {
  width: 48rpx;
  height: 48rpx;
  border-radius: 50%;
  background:
    linear-gradient(90deg, transparent 44%, #9effc5 44% 56%, transparent 56%),
    linear-gradient(0deg, transparent 44%, #9effc5 44% 56%, transparent 56%);
}

.assistant-hero__body {
  display: grid;
  min-width: 0;
  flex: 1;
  gap: 8rpx;
}

.assistant-hero__title {
  color: var(--assistant-ink);
  font-size: 32rpx;
  font-weight: 900;
}

.assistant-hero__desc {
  color: $teacher-mobile-text-secondary;
  font-size: 24rpx;
  line-height: 1.45;
}

.assistant-hero__action {
  width: 150rpx;
  height: 60rpx;
  flex: 0 0 auto;
  font-size: 24rpx;
}

.scene-list {
  display: grid;
  gap: 18rpx;
  margin-top: 22rpx;
}

.scene-card {
  gap: 20rpx;
  padding: 24rpx;
}

.scene-card__icon {
  width: 22rpx;
  height: 86rpx;
  flex: 0 0 auto;
  border-radius: 999rpx;
  background: $teacher-mobile-primary;
}

.scene-card--blue .scene-card__icon {
  background: $teacher-mobile-info;
}

.scene-card--orange .scene-card__icon {
  background: $teacher-mobile-warning;
}

.scene-card__body {
  display: grid;
  min-width: 0;
  flex: 1;
  gap: 8rpx;
}

.scene-card__title {
  color: var(--assistant-ink);
  font-size: 30rpx;
  font-weight: 900;
}

.scene-card__desc,
.scene-card__meta {
  font-size: 23rpx;
  line-height: 1.45;
}

.scene-card__desc {
  color: $teacher-mobile-text-secondary;
}

.scene-card__meta {
  color: $teacher-mobile-text-tertiary;
}

.scene-card__action {
  gap: 8rpx;
  flex: 0 0 auto;
  font-size: 24rpx;
}

.recent-card {
  margin-top: 22rpx;
  padding: 26rpx;
}

.section-head {
  justify-content: space-between;
  margin-bottom: 18rpx;
}

.section-title {
  color: var(--assistant-ink);
  font-size: 30rpx;
  font-weight: 900;
}

.section-count {
  color: $teacher-mobile-text-tertiary;
  font-size: 22rpx;
  font-weight: 800;
}

.recent-row {
  gap: 14rpx;
  min-height: 54rpx;
  color: $teacher-mobile-text-secondary;
  font-size: 24rpx;
  line-height: 1.4;
}

.recent-row + .recent-row {
  border-top: 1rpx solid var(--assistant-line);
}

.recent-row__dot {
  width: 12rpx;
  height: 12rpx;
  flex: 0 0 auto;
  border-radius: 50%;
  background: $teacher-mobile-primary;
}

@media (max-width: 374px) {
  .assistant-hero {
    align-items: flex-start;
  }

  .assistant-hero__mark {
    width: 92rpx;
    height: 92rpx;
  }

  .assistant-hero__action {
    width: 132rpx;
  }
}
</style>
