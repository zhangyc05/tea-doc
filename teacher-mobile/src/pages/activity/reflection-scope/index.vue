<script setup lang="ts">
import { computed } from 'vue'
import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobileNavbar from '../../../components/MobileNavbar.vue'
import MobileTabBar from '../../../components/MobileTabBar.vue'
import { addReflectionMaterial, getMobileReflectionState, selectReflectionEvidence, selectReflectionLesson } from '../../../domain/reflection'

const reflectionState = getMobileReflectionState()
const reflectionRecord = computed(() => reflectionState.records[0])
const selectedEvidence = computed(() => reflectionState.evidence.filter((item) => reflectionRecord.value.evidenceIds.includes(item.id)))
const selectedEvidenceCount = computed(() => selectedEvidence.value.length)
const selectedEvidenceTitles = computed(() => selectedEvidence.value.map((item) => item.title).join('、'))

const scopeOptions = [
  { title: '单次课', active: false },
  { title: '课程阶段', active: true },
  { title: '学期课程', active: false },
  { title: '自定义主题', active: false },
]

const periodTabs = [
  { title: '按周', active: false },
  { title: '按月', active: true },
  { title: '按季度', active: false },
  { title: '自定义', active: false },
]

const evidenceRows = [
  {
    icon: 'video',
    title: '第 5 次课课堂分析报告',
    desc: '2026-03-18 | 工业互联网架构导入',
    sub: '课堂视频与语音已解析',
    selected: true,
  },
  {
    icon: 'video',
    title: '第 6 次课课堂分析报告',
    desc: '2026-03-25 | 平台层与应用层关系',
    sub: '已识别互动与提问情况',
    selected: true,
  },
  {
    icon: 'video-blue',
    title: '第 7 次课课堂分析报告',
    desc: '2026-03-29 | 智能工厂数据流转',
    sub: '已生成课堂节奏分析',
    selected: false,
  },
  {
    icon: 'chart',
    title: '阶段测验分析',
    desc: '已导入 3 月单元测验结果',
    sub: '可辅助分析知识掌握与薄弱点',
    selected: true,
  },
  {
    icon: 'file-orange',
    title: '单元教案与课件',
    desc: '已上传教案、课件各 3 份',
    sub: '可结合教学设计分析阶段实施',
    selected: false,
  },
]

function goBack() {
  uni.navigateBack()
}

function goSelfReflection() {
  selectReflectionEvidence('class-analysis-report')
  uni.navigateTo({ url: '/pages/activity/reflection-self/index' })
}

function selectEvidence() {
  selectReflectionEvidence('class-analysis-report')
}

function switchMonth() {
  selectReflectionLesson('2026 年 3 月教学阶段')
}

function uploadMaterial() {
  addReflectionMaterial('阶段教学资料', 'material')
}

function recordAudio() {
  addReflectionMaterial('阶段课堂音频', 'audio')
}

function goDirectChat() {
  uni.navigateTo({ url: '/pages/activity/reflection-ai-chat/index' })
}
</script>

<template>
  <view class="reflection-scope-page">
    <view class="hero">
      <MobileNavbar title="教学反思" size="compact" @back="goBack" />
      <text class="hero__subtitle">先选择反思范围，AI 会帮您整理依据并引导反思</text>
    </view>

    <view class="content">
      <MobileCard class="scope-card">
        <text class="section-title">反思范围</text>
        <view class="scope-grid">
          <view v-for="item in scopeOptions" :key="item.title" class="scope-option" :class="{ 'scope-option--active': item.active }">
            <text>{{ item.title }}</text>
            <view class="scope-radio"></view>
          </view>
        </view>
        <view class="scope-tip">
          <view class="scope-tip__dot"></view>
          <text>围绕一段连续教学内容进行阶段反思</text>
        </view>
      </MobileCard>

      <MobileCard class="period-card">
        <text class="period-title">阶段范围</text>
        <view class="period-tabs">
          <view v-for="item in periodTabs" :key="item.title" class="period-tab" :class="{ 'period-tab--active': item.active }">
            <text>{{ item.title }}</text>
          </view>
        </view>
      </MobileCard>

      <MobileCard class="stage-card">
        <view class="stage-main">
          <view class="stage-copy">
            <text class="section-title">本阶段</text>
            <text class="stage-title">《智能制造基础》 | 2026 年 3 月教学阶段</text>
            <text class="stage-meta">覆盖第 5-7 次课 | 智能制造 2301 班</text>
            <text class="stage-meta">2026-03-18 至 2026-03-29</text>
            <text class="stage-desc">已找到本月 3 堂课的课堂分析，可自由选择作为反思依据</text>
          </view>
          <MobileActionButton class="switch-button" variant="outline" @tap="switchMonth">切换月份</MobileActionButton>
        </view>
      </MobileCard>

      <MobileCard class="evidence-card">
        <view class="section-head">
          <text class="section-title">本阶段可用依据</text>
          <text class="multi-note">可多选</text>
        </view>

        <view class="evidence-list">
          <view v-for="row in evidenceRows" :key="row.title" class="evidence-row" :class="{ 'evidence-row--selected': row.selected }" @tap="selectEvidence">
            <view class="evidence-icon" :class="`evidence-icon--${row.icon}`"></view>
            <view class="evidence-row__body">
              <text class="row-title">{{ row.title }}</text>
              <text class="row-desc">{{ row.desc }}</text>
              <text class="row-desc">{{ row.sub }}</text>
            </view>
            <view class="select-dot" :class="{ 'select-dot--checked': row.selected }"></view>
          </view>
        </view>
      </MobileCard>

      <MobileCard class="supplement-card">
        <text class="section-title">还可以补充</text>
        <view class="supplement-actions">
          <view class="supplement-button" @tap="uploadMaterial">
            <view class="supplement-icon supplement-icon--upload"></view>
            <text>上传教学资料</text>
          </view>
          <view class="supplement-button" @tap="recordAudio">
            <view class="supplement-icon supplement-icon--mic"></view>
            <text>录制课堂音频</text>
          </view>
          <view class="supplement-button" @tap="goDirectChat">
            <view class="supplement-icon supplement-icon--chat"></view>
            <text>直接与 AI 对话</text>
          </view>
        </view>
      </MobileCard>
    </view>

    <view class="bottom-actions">
      <view class="selected-copy">
        <text class="selected-title">已选 <text>{{ selectedEvidenceCount }}</text> 份依据</text>
        <text class="selected-desc">{{ selectedEvidenceTitles || reflectionState.operationMessage }}</text>
      </view>
      <MobileActionButton class="start-button" variant="primary" @tap="goSelfReflection">开始 AI 引导反思</MobileActionButton>
    </view>

    <MobileTabBar active="activity" />
  </view>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.reflection-scope-page {
  min-height: 100vh;
  padding-bottom: calc(288rpx + env(safe-area-inset-bottom));
  background:
    radial-gradient(circle at 18% 0%, rgba(234, 224, 255, 0.44), transparent 32%),
    linear-gradient(180deg, #fbfffd 0%, #f8fbff 48%, #f5f9ff 100%);
  color: $teacher-mobile-text-primary;
}

.hero {
  padding: calc(var(--status-bar-height) + 14rpx) 28rpx 18rpx;
}

.hero__subtitle {
  display: block;
  margin-top: 8rpx;
  color: #53617b;
  font-size: 27rpx;
  font-weight: 600;
  line-height: 1.45;
  text-align: center;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 18rpx;
  padding: 0 28rpx;
}

.scope-card,
.period-card,
.stage-card,
.evidence-card,
.supplement-card {
  padding: 28rpx;
}

.section-title,
.period-title,
.stage-title,
.stage-meta,
.stage-desc,
.row-title,
.row-desc,
.selected-title,
.selected-desc {
  display: block;
}

.section-title,
.period-title {
  color: #10172d;
  font-size: 34rpx;
  font-weight: 900;
  line-height: 1.25;
}

.scope-grid,
.scope-option,
.scope-tip,
.period-card,
.period-tabs,
.period-tab,
.stage-main,
.section-head,
.evidence-row,
.supplement-actions,
.bottom-actions,
.supplement-button {
  display: flex;
  align-items: center;
}

.scope-grid {
  flex-wrap: wrap;
  gap: 20rpx 50rpx;
  margin-top: 22rpx;
}

.scope-option {
  width: calc((100% - 50rpx) / 2);
  height: 64rpx;
  justify-content: space-between;
  padding: 0 22rpx;
  border: 2rpx solid #d8e0ec;
  border-radius: 12rpx;
  color: #10172d;
  font-size: 29rpx;
  font-weight: 800;
}

.scope-option--active {
  border-color: $teacher-mobile-primary;
  background: #f4fff8;
  color: $teacher-mobile-primary-dark;
}

.scope-radio,
.select-dot {
  position: relative;
  width: 32rpx;
  height: 32rpx;
  flex: 0 0 auto;
  border: 3rpx solid #c4cedd;
  border-radius: 50%;
}

.scope-option--active .scope-radio,
.select-dot--checked {
  border-color: $teacher-mobile-primary;
  background: $teacher-mobile-primary;
}

.scope-option--active .scope-radio::before,
.select-dot--checked::before {
  position: absolute;
  top: 9rpx;
  left: 8rpx;
  width: 13rpx;
  height: 8rpx;
  border-bottom: 4rpx solid #fff;
  border-left: 4rpx solid #fff;
  content: '';
  transform: rotate(-45deg);
}

.scope-tip {
  gap: 12rpx;
  margin-top: 18rpx;
  color: $teacher-mobile-primary-dark;
  font-size: 25rpx;
  font-weight: 700;
}

.scope-tip__dot {
  width: 10rpx;
  height: 10rpx;
  border-radius: 50%;
  background: $teacher-mobile-primary;
}

.period-card {
  justify-content: space-between;
  gap: 22rpx;
}

.period-title {
  flex: 0 0 auto;
}

.period-tabs {
  min-width: 0;
  flex: 1;
  gap: 22rpx;
}

.period-tab {
  height: 58rpx;
  flex: 1;
  justify-content: center;
  border: 2rpx solid #d8e0ec;
  border-radius: 12rpx;
  color: #253251;
  font-size: 27rpx;
  font-weight: 800;
}

.period-tab--active {
  border-color: $teacher-mobile-primary;
  background: #f4fff8;
  color: $teacher-mobile-primary-dark;
}

.stage-main {
  justify-content: space-between;
  gap: 20rpx;
}

.stage-copy {
  min-width: 0;
  flex: 1;
}

.stage-title {
  margin-top: 22rpx;
  color: #10172d;
  font-size: 30rpx;
  font-weight: 900;
  line-height: 1.35;
}

.stage-meta,
.stage-desc {
  margin-top: 10rpx;
  color: #53617b;
  font-size: 26rpx;
  line-height: 1.35;
}

.switch-button {
  width: 142rpx;
  height: 64rpx;
  flex: 0 0 auto;
  font-size: 27rpx;
}

.section-head {
  justify-content: space-between;
  margin-bottom: 18rpx;
}

.multi-note {
  color: #63708a;
  font-size: 25rpx;
  font-weight: 700;
}

.evidence-list {
  display: flex;
  flex-direction: column;
  gap: 14rpx;
}

.evidence-row {
  gap: 24rpx;
  min-height: 112rpx;
  padding: 18rpx 22rpx 18rpx 18rpx;
  border: 1rpx solid #dfe6f0;
  border-radius: 14rpx;
  background: #fff;
}

.evidence-row--selected {
  border-color: rgba(14, 193, 101, 0.35);
  background: #f5fff9;
}

.evidence-icon {
  position: relative;
  width: 70rpx;
  height: 70rpx;
  flex: 0 0 auto;
  border-radius: 16rpx;
  background: #e9fbf1;
  color: $teacher-mobile-primary;
}

.evidence-icon::before,
.evidence-icon::after,
.supplement-icon::before,
.supplement-icon::after {
  position: absolute;
  content: '';
}

.evidence-icon--video::before,
.evidence-icon--video-blue::before {
  top: 18rpx;
  left: 23rpx;
  width: 27rpx;
  height: 31rpx;
  background: currentColor;
  clip-path: polygon(0 0, 100% 50%, 0 100%);
}

.evidence-icon--video::after,
.evidence-icon--video-blue::after {
  right: 15rpx;
  bottom: 11rpx;
  left: 15rpx;
  height: 5rpx;
  border-radius: 999rpx;
  background: currentColor;
}

.evidence-icon--video-blue {
  background: #eef6ff;
  color: #2177e8;
}

.evidence-icon--chart::before {
  bottom: 17rpx;
  left: 18rpx;
  width: 9rpx;
  height: 24rpx;
  border-radius: 5rpx;
  background: currentColor;
  box-shadow: 14rpx -14rpx 0 currentColor, 28rpx 6rpx 0 currentColor;
}

.evidence-icon--file-orange {
  background: #fff3eb;
  color: #ff7a18;
}

.evidence-icon--file-orange::before {
  inset: 14rpx 18rpx;
  border-radius: 8rpx;
  background: currentColor;
}

.evidence-icon--file-orange::after {
  top: 27rpx;
  left: 29rpx;
  width: 23rpx;
  height: 4rpx;
  border-radius: 999rpx;
  background: #fff;
  box-shadow: 0 13rpx 0 #fff;
}

.evidence-row__body {
  min-width: 0;
  flex: 1;
}

.row-title {
  color: #10172d;
  font-size: 29rpx;
  font-weight: 900;
  line-height: 1.28;
}

.row-desc {
  margin-top: 7rpx;
  color: #52607a;
  font-size: 24rpx;
  line-height: 1.3;
}

.supplement-actions {
  gap: 14rpx;
  margin-top: 24rpx;
}

.supplement-button {
  height: 62rpx;
  min-width: 0;
  flex: 1;
  justify-content: center;
  gap: 6rpx;
  border: 2rpx solid #dfe6f0;
  border-radius: 14rpx;
  background: #fff;
  color: #10172d;
  font-size: 24rpx;
  font-weight: 800;
  line-height: 1;
  white-space: nowrap;
}

.supplement-icon {
  position: relative;
  width: 28rpx;
  height: 28rpx;
  flex: 0 0 auto;
}

.supplement-icon--upload {
  color: $teacher-mobile-primary;
}

.supplement-icon--upload::before {
  inset: 4rpx;
  border-radius: 50%;
  background: currentColor;
}

.supplement-icon--upload::after {
  top: 12rpx;
  left: 11rpx;
  width: 6rpx;
  height: 11rpx;
  border-radius: 999rpx;
  background: #fff;
}

.supplement-icon--mic {
  color: #8a35f2;
}

.supplement-icon--mic::before {
  top: 2rpx;
  left: 9rpx;
  width: 12rpx;
  height: 20rpx;
  border-radius: 999rpx;
  background: currentColor;
}

.supplement-icon--mic::after {
  right: 5rpx;
  bottom: 3rpx;
  left: 5rpx;
  height: 11rpx;
  border-bottom: 4rpx solid currentColor;
  border-left: 4rpx solid currentColor;
  border-right: 4rpx solid currentColor;
  border-radius: 0 0 18rpx 18rpx;
}

.supplement-icon--chat {
  color: #207eea;
}

.supplement-icon--chat::before {
  inset: 4rpx 2rpx 5rpx;
  border-radius: 50%;
  background: currentColor;
}

.supplement-icon--chat::after {
  right: 5rpx;
  bottom: 2rpx;
  width: 9rpx;
  height: 9rpx;
  background: currentColor;
  transform: rotate(45deg);
}

.bottom-actions {
  position: fixed;
  right: 0;
  bottom: calc(142rpx + env(safe-area-inset-bottom));
  left: 0;
  z-index: 48;
  gap: 28rpx;
  padding: 20rpx 28rpx 22rpx;
  background: rgba(248, 252, 255, 0.92);
  backdrop-filter: blur(12rpx);
}

.selected-copy {
  min-width: 0;
  flex: 1;
}

.selected-title {
  color: #10172d;
  font-size: 32rpx;
  font-weight: 900;
  line-height: 1.25;
}

.selected-title text {
  color: $teacher-mobile-primary-dark;
  font-size: 44rpx;
}

.selected-desc {
  margin-top: 5rpx;
  color: #52607a;
  font-size: 24rpx;
  line-height: 1.3;
}

.start-button {
  width: 280rpx;
  height: 68rpx;
  flex: 0 0 auto;
  border-radius: 16rpx;
  font-size: 30rpx;
}

@media (max-width: 374px) {
  .hero,
  .content {
    padding-right: 18rpx;
    padding-left: 18rpx;
  }

  .scope-card,
  .period-card,
  .stage-card,
  .evidence-card,
  .supplement-card {
    padding: 22rpx;
  }

  .scope-grid,
  .period-tabs,
  .supplement-actions {
    gap: 12rpx;
  }

  .scope-option {
    width: calc((100% - 12rpx) / 2);
    padding: 0 14rpx;
    font-size: 25rpx;
  }

  .period-card {
    align-items: flex-start;
    flex-direction: column;
  }

  .period-tabs {
    width: 100%;
  }

  .period-tab {
    font-size: 23rpx;
  }

  .stage-main,
  .bottom-actions {
    gap: 16rpx;
  }

  .switch-button {
    width: 118rpx;
    font-size: 25rpx;
  }

  .evidence-row {
    gap: 16rpx;
    padding: 16rpx;
  }

  .evidence-icon {
    width: 58rpx;
    height: 58rpx;
    border-radius: 15rpx;
  }

  .row-title {
    font-size: 26rpx;
  }

  .row-desc {
    font-size: 21rpx;
  }

  .supplement-button {
    gap: 4rpx;
    font-size: 19rpx;
  }

  .bottom-actions {
    padding-right: 20rpx;
    padding-left: 20rpx;
  }

  .selected-title {
    font-size: 28rpx;
  }

  .selected-desc {
    font-size: 21rpx;
  }

  .start-button {
    width: 218rpx;
    font-size: 25rpx;
  }
}
</style>
