<script setup lang="ts">
import { computed, ref } from 'vue'
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
const selectedScopeIndex = ref(0)
const selectedEvidenceIds = ref(['class-analysis-report', 'class-audio'])

const scopeOptions = [
  { title: '单次课' },
  { title: '课程阶段' },
  { title: '学期课程' },
  { title: '自定义主题' },
]

const evidenceRows = [
  {
    id: 'class-analysis-report',
    icon: 'video',
    title: '课堂分析报告',
    desc: '第 5 次课课堂数据与语音已解析',
    sub: 'AI 已生成课堂节奏与互动分析',
  },
  {
    id: 'class-audio',
    icon: 'mic',
    title: '课堂录音',
    desc: '45 分钟录音已解析',
    sub: '可辅助分析讲授节奏和学生回应',
  },
  {
    id: 'lesson-material',
    icon: 'file',
    title: '教案与课件',
    desc: '已上传教案、课件各 1 份',
    sub: '可结合教学设计分析课堂实施',
  },
  {
    id: 'student-practice',
    icon: 'task',
    title: '学生练习记录',
    desc: '覆盖 42 人',
    sub: '可辅助分析学生掌握情况',
  },
]

function goBack() {
  uni.navigateBack()
}

function goScopeSelect() {
  selectReflectionLesson('第 5 次课')
  selectReflectionEvidence('class-analysis-report')
  selectReflectionEvidence('class-audio')
  uni.navigateTo({ url: '/pages/activity/reflection-scope/index' })
}

function switchLesson() {
  selectReflectionLesson('第 5 次课')
}

function selectScope(index: number) {
  selectedScopeIndex.value = index
}

function toggleEvidence(id: string) {
  if (selectedEvidenceIds.value.includes(id)) {
    selectedEvidenceIds.value = selectedEvidenceIds.value.filter((item) => item !== id)
    return
  }
  selectedEvidenceIds.value = [...selectedEvidenceIds.value, id]
  selectReflectionEvidence(id === 'student-practice' ? 'class-analysis-report' : id)
}

function addEvidence(rowTitle: string) {
  selectReflectionEvidence(rowTitle.includes('录音') ? 'class-audio' : 'class-analysis-report')
}

function uploadMaterial() {
  addReflectionMaterial('补充教学资料', 'material')
}

function recordAudio() {
  addReflectionMaterial('课堂录音', 'audio')
}

function goDirectChat() {
  uni.navigateTo({ url: '/pages/activity/reflection-ai-chat/index' })
}
</script>

<template>
  <view class="reflection-evidence-page">
    <view class="hero">
      <MobileNavbar title="教学反思" size="compact" @back="goBack" />
      <text class="hero__subtitle">先选择反思范围，AI 会帮您整理依据并引导反思</text>
    </view>

    <view class="content">
      <MobileCard class="scope-card">
        <text class="section-title">反思范围</text>
        <view class="scope-grid">
          <view v-for="(item, index) in scopeOptions" :key="item.title" class="scope-option" :class="{ 'scope-option--active': selectedScopeIndex === index }" @tap="selectScope(index)">
            <text>{{ item.title }}</text>
            <view class="scope-radio"></view>
          </view>
        </view>
        <view class="scope-tip">
          <view class="scope-tip__dot"></view>
          <text>围绕一节课进行深度反思</text>
        </view>
      </MobileCard>

      <MobileCard class="lesson-card">
        <view class="lesson-main">
          <view class="lesson-copy">
            <text class="section-title">本次课</text>
            <text class="lesson-title">《智能制造基础》第 5 次课</text>
            <text class="lesson-meta">2026-03-18　|　智能制造 2301 班</text>
            <text class="lesson-meta">10:00-11:45　|　课堂巡视与语音已完成解析</text>
          </view>
          <MobileActionButton class="switch-button" variant="outline" @tap="switchLesson">切换课次</MobileActionButton>
        </view>
      </MobileCard>

      <MobileCard class="evidence-card">
        <view class="section-head">
          <text class="section-title">本次课可用依据</text>
          <text class="multi-note">可多选</text>
        </view>

        <view class="evidence-list">
          <view v-for="row in evidenceRows" :key="row.title" class="evidence-row" :class="{ 'evidence-row--selected': selectedEvidenceIds.includes(row.id) }" @tap="toggleEvidence(row.id)">
            <view class="evidence-icon" :class="`evidence-icon--${row.icon}`"></view>
            <view class="evidence-row__body">
              <text class="row-title">{{ row.title }}</text>
              <text class="row-desc">{{ row.desc }}</text>
              <text class="row-desc">{{ row.sub }}</text>
            </view>
            <view class="select-dot" :class="{ 'select-dot--checked': selectedEvidenceIds.includes(row.id) }"></view>
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
      <MobileActionButton class="start-button" variant="primary" @tap="goScopeSelect">开始 AI 引导反思</MobileActionButton>
    </view>

    <MobileTabBar active="activity" />
  </view>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.reflection-evidence-page {
  min-height: 100vh;
  padding-bottom: calc(304rpx + env(safe-area-inset-bottom));
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
  gap: 22rpx;
  padding: 0 28rpx;
}

.scope-card,
.lesson-card,
.evidence-card,
.supplement-card {
  padding: 30rpx;
}

.section-title,
.lesson-title,
.lesson-meta,
.row-title,
.row-desc,
.selected-title,
.selected-desc {
  display: block;
}

.section-title {
  color: #10172d;
  font-size: 38rpx;
  font-weight: 900;
  line-height: 1.25;
}

.scope-grid,
.scope-option,
.scope-tip,
.lesson-main,
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
  gap: 20rpx 34rpx;
  margin-top: 22rpx;
}

.scope-option {
  width: calc((100% - 34rpx) / 2);
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

.lesson-main {
  justify-content: space-between;
  gap: 20rpx;
}

.lesson-copy {
  min-width: 0;
  flex: 1;
}

.lesson-title {
  margin-top: 22rpx;
  color: #10172d;
  font-size: 32rpx;
  font-weight: 900;
  line-height: 1.35;
}

.lesson-meta {
  margin-top: 10rpx;
  color: #53617b;
  font-size: 26rpx;
  line-height: 1.35;
}

.switch-button {
  width: 142rpx;
  height: 58rpx;
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
  gap: 16rpx;
}

.evidence-row {
  gap: 24rpx;
  min-height: 126rpx;
  padding: 22rpx 22rpx 22rpx 20rpx;
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
  width: 74rpx;
  height: 74rpx;
  flex: 0 0 auto;
  border-radius: 18rpx;
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

.evidence-icon--video::before {
  top: 18rpx;
  left: 24rpx;
  width: 28rpx;
  height: 32rpx;
  background: currentColor;
  clip-path: polygon(0 0, 100% 50%, 0 100%);
}

.evidence-icon--video::after {
  right: 16rpx;
  bottom: 12rpx;
  left: 16rpx;
  height: 5rpx;
  border-radius: 999rpx;
  background: currentColor;
}

.evidence-icon--mic::before {
  top: 13rpx;
  left: 24rpx;
  width: 26rpx;
  height: 38rpx;
  border-radius: 18rpx;
  background: currentColor;
}

.evidence-icon--mic::after {
  right: 18rpx;
  bottom: 13rpx;
  left: 18rpx;
  height: 18rpx;
  border-bottom: 6rpx solid currentColor;
  border-left: 6rpx solid currentColor;
  border-right: 6rpx solid currentColor;
  border-radius: 0 0 22rpx 22rpx;
}

.evidence-icon--file {
  background: #eef6ff;
  color: #2177e8;
}

.evidence-icon--file::before {
  inset: 14rpx 20rpx;
  border-radius: 6rpx;
  background: currentColor;
}

.evidence-icon--file::after {
  top: 28rpx;
  right: 26rpx;
  left: 26rpx;
  height: 5rpx;
  border-radius: 999rpx;
  background: #fff;
  box-shadow: 0 13rpx 0 #fff;
}

.evidence-icon--task {
  background: #fff3eb;
  color: #ff7a18;
}

.evidence-icon--task::before {
  inset: 14rpx 18rpx;
  border-radius: 8rpx;
  background: currentColor;
}

.evidence-icon--task::after {
  top: 27rpx;
  left: 29rpx;
  width: 24rpx;
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
  font-size: 30rpx;
  font-weight: 900;
  line-height: 1.28;
}

.row-desc {
  margin-top: 7rpx;
  color: #52607a;
  font-size: 25rpx;
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
  border: 2rpx solid $teacher-mobile-primary;
  border-radius: 14rpx;
  background: #fff;
  color: $teacher-mobile-primary-dark;
  font-size: 22rpx;
  font-weight: 900;
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
  inset: 5rpx;
  border-radius: 50%;
  background: currentColor;
}

.supplement-icon--upload::after {
  top: 14rpx;
  left: 13rpx;
  width: 8rpx;
  height: 12rpx;
  border-radius: 999rpx;
  background: #fff;
  box-shadow: 0 -5rpx 0 -1rpx #fff;
}

.supplement-icon--mic {
  color: #8a35f2;
}

.supplement-icon--mic::before {
  top: 2rpx;
  left: 10rpx;
  width: 14rpx;
  height: 22rpx;
  border-radius: 999rpx;
  background: currentColor;
}

.supplement-icon--mic::after {
  right: 6rpx;
  bottom: 3rpx;
  left: 6rpx;
  height: 13rpx;
  border-bottom: 5rpx solid currentColor;
  border-left: 5rpx solid currentColor;
  border-right: 5rpx solid currentColor;
  border-radius: 0 0 20rpx 20rpx;
}

.supplement-icon--chat {
  color: #207eea;
}

.supplement-icon--chat::before {
  inset: 5rpx 3rpx 6rpx;
  border-radius: 50%;
  background: currentColor;
}

.supplement-icon--chat::after {
  right: 6rpx;
  bottom: 3rpx;
  width: 10rpx;
  height: 10rpx;
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
  .lesson-card,
  .evidence-card,
  .supplement-card {
    padding: 22rpx;
  }

  .scope-grid,
  .supplement-actions {
    gap: 12rpx;
  }

  .scope-option {
    width: calc((100% - 12rpx) / 2);
    padding: 0 14rpx;
    font-size: 25rpx;
  }

  .lesson-main,
  .bottom-actions {
    gap: 16rpx;
  }

  .switch-button {
    width: 118rpx;
    font-size: 25rpx;
  }

  .evidence-row {
    gap: 16rpx;
    padding: 18rpx 16rpx;
  }

  .evidence-icon {
    width: 60rpx;
    height: 60rpx;
    border-radius: 16rpx;
  }

  .row-title {
    font-size: 27rpx;
  }

  .row-desc {
    font-size: 22rpx;
  }

  .supplement-button {
    gap: 6rpx;
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
