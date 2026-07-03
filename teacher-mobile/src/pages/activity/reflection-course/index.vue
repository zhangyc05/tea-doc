<script setup lang="ts">
import { computed } from 'vue'
import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobileNavbar from '../../../components/MobileNavbar.vue'
import MobileTabBar from '../../../components/MobileTabBar.vue'
import { addReflectionMaterial, getMobileReflectionState, selectReflectionCourse } from '../../../domain/reflection'

const reflectionState = getMobileReflectionState()
const reflectionRecord = computed(() => reflectionState.records[0])
const selectedEvidence = computed(() => reflectionState.evidence.filter((item) => reflectionRecord.value.evidenceIds.includes(item.id)))
const selectedEvidenceCount = computed(() => selectedEvidence.value.length)

const scopeOptions = [
  { title: '单次课', active: false },
  { title: '课程阶段', active: false },
  { title: '学期课程', active: true, tip: '围绕本学期整门课程进行综合反思' },
  { title: '自定义主题', active: false },
]

const evidenceTypes = [
  { title: '课堂过程', desc: '已找到 16 堂课堂分析，可按月份选择', icon: 'calendar', active: true },
  { title: '成绩与学习表现', desc: '基于成绩与学习数据综合分析表现', icon: 'chart' },
  { title: '评价与反馈', desc: '综合收集评价与反馈了解课堂成效', icon: 'star' },
  { title: '教学资料与资源', desc: '整理课程资料与资源辅助分析教学实施', icon: 'file' },
]

const monthReports = [
  { title: '第 5 次课堂分析报告', date: '2026-03-18', course: '工业互联网架构导入', desc: '课堂视频与语音已解析', selected: true },
  { title: '第 6 次课堂分析报告', date: '2026-03-25', course: '平台层与应用层关系', desc: '已识别互动与提问情况', selected: true },
  { title: '第 7 次课堂分析报告', date: '2026-03-29', course: '智能工厂数据流转', desc: '已生成课堂节奏分析', selected: false },
]

const analysisRows = [
  { title: '期中成绩分析', desc: '已导入期中成绩结果 | 可辅助分析知识掌握与薄弱点', icon: 'score', selected: true },
  { title: '阶段测验分析', desc: '覆盖 3 次单元测验 | 可辅助分析阶段学习表现', icon: 'test', selected: true },
  { title: '作业完成情况', desc: '已汇总 12 次课堂作业 | 可辅助分析学习投入情况', icon: 'doc', selected: false },
  { title: '本学期学生评教', desc: '已汇总学生评教结果 | 可辅助分析课堂体验与反馈', icon: 'star', selected: true },
  { title: '同行听课反馈', desc: '已同步 1 条听课记录 | 可作为课堂观察参考', icon: 'doc', selected: false },
  { title: '课程教案与课件', desc: '已整理 16 次课资料 | 可结合课程设计分析实施情况', icon: 'doc', selected: false },
  { title: '案例与项目材料', desc: '已上传 4 份案例材料 | 可辅助分析案例教学效果', icon: 'doc', selected: false },
]

function goBack() {
  uni.navigateBack()
}

function goEvidenceSelect() {
  selectReflectionCourse('智能制造基础')
  uni.navigateTo({ url: '/pages/activity/reflection-evidence/index' })
}

function switchCourse() {
  selectReflectionCourse('智能制造基础')
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
  <view class="reflection-course-page">
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
          <text>围绕本学期整门课程进行综合反思</text>
        </view>
      </MobileCard>

      <MobileCard class="course-card">
        <view class="course-main">
          <view class="course-copy">
            <text class="section-title">本学期课程</text>
            <text class="course-title">《智能制造基础》 | 2025-2026 学年第 2 学期</text>
            <text class="course-meta">智能制造 2301 班 | 共 16 周 | 32 学时</text>
            <text class="course-desc">已整理课堂过程、成绩与评价数据</text>
          </view>
          <MobileActionButton class="switch-button" variant="outline" @tap="switchCourse">切换课程</MobileActionButton>
        </view>
      </MobileCard>

      <MobileCard class="evidence-card">
        <view class="section-head">
          <text class="section-title">本学期可用依据</text>
          <text class="multi-note">可多选</text>
        </view>

        <view class="evidence-layout">
          <view class="type-list">
            <view v-for="item in evidenceTypes" :key="item.title" class="type-card" :class="{ 'type-card--active': item.active }">
              <view class="type-icon" :class="`type-icon--${item.icon}`"></view>
              <text class="type-title">{{ item.title }}</text>
              <text class="type-desc">{{ item.desc }}</text>
            </view>
          </view>

          <view class="detail-list">
            <view class="month-panel">
              <view class="month-head">
                <text>3 月课堂分析 | 3 堂 | 已选 2 堂</text>
                <view class="up-icon"></view>
              </view>
              <view v-for="item in monthReports" :key="item.title" class="report-row" :class="{ 'report-row--selected': item.selected }">
                <view class="report-icon"></view>
                <view class="report-row__body">
                  <text class="row-title">{{ item.title }}</text>
                  <text class="row-desc">{{ item.date }} | {{ item.course }}</text>
                  <text class="row-desc">{{ item.desc }}</text>
                </view>
                <view class="select-dot" :class="{ 'select-dot--checked': item.selected }"></view>
              </view>
            </view>

            <view class="month-fold">
              <text>4 月课堂分析 | 4 堂 | 未展开</text>
              <view class="down-icon"></view>
            </view>
            <view class="month-fold">
              <text>5 月课堂分析 | 4 堂 | 未展开</text>
              <view class="down-icon"></view>
            </view>

            <view v-for="row in analysisRows" :key="row.title" class="analysis-row">
              <view class="small-icon" :class="`small-icon--${row.icon}`"></view>
              <view class="analysis-row__body">
                <text class="row-title">{{ row.title }}</text>
                <text class="row-desc">{{ row.desc }}</text>
              </view>
              <view class="select-dot" :class="{ 'select-dot--checked': row.selected }"></view>
            </view>
          </view>
        </view>
      </MobileCard>

      <MobileCard class="supplement-card">
        <text class="section-title">还可以补充</text>
        <view class="supplement-actions">
          <MobileActionButton class="supplement-button" variant="outline" @tap="uploadMaterial">上传教学资料</MobileActionButton>
          <MobileActionButton class="supplement-button" variant="outline" @tap="recordAudio">录制课堂音频</MobileActionButton>
          <MobileActionButton class="supplement-button" variant="outline" @tap="goDirectChat">直接与 AI 对话</MobileActionButton>
        </view>
      </MobileCard>
    </view>

    <view class="bottom-actions">
      <view class="selected-copy">
        <text class="selected-title">已选 <text>{{ selectedEvidenceCount }}</text> 份依据</text>
        <text class="selected-desc">{{ reflectionState.operationMessage || '课堂过程 2 | 成绩分析 2 | 评价反馈 1' }}</text>
      </view>
      <MobileActionButton class="start-button" variant="primary" @tap="goEvidenceSelect">开始 AI 引导反思</MobileActionButton>
    </view>

    <MobileTabBar active="activity" />
  </view>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.reflection-course-page {
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
  gap: 22rpx;
  padding: 0 28rpx;
}

.scope-card,
.course-card,
.evidence-card,
.supplement-card {
  padding: 26rpx;
}

.section-title,
.course-title,
.course-meta,
.course-desc,
.type-title,
.type-desc,
.row-title,
.row-desc,
.selected-title,
.selected-desc {
  display: block;
}

.section-title {
  color: #10172d;
  font-size: 32rpx;
  font-weight: 900;
  line-height: 1.25;
}

.scope-grid,
.scope-option,
.scope-tip,
.course-main,
.section-head,
.evidence-layout,
.month-head,
.report-row,
.month-fold,
.analysis-row,
.supplement-actions,
.bottom-actions {
  display: flex;
  align-items: center;
}

.scope-grid {
  flex-wrap: wrap;
  gap: 16rpx 24rpx;
  margin-top: 18rpx;
}

.scope-option {
  width: calc((100% - 24rpx) / 2);
  height: 58rpx;
  justify-content: space-between;
  padding: 0 20rpx;
  border: 2rpx solid #d8e0ec;
  border-radius: 10rpx;
  color: #10172d;
  font-size: 27rpx;
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
  width: 28rpx;
  height: 28rpx;
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
  top: 8rpx;
  left: 7rpx;
  width: 12rpx;
  height: 7rpx;
  border-bottom: 4rpx solid #fff;
  border-left: 4rpx solid #fff;
  content: '';
  transform: rotate(-45deg);
}

.scope-tip {
  gap: 12rpx;
  margin-top: 14rpx;
  color: $teacher-mobile-primary-dark;
  font-size: 23rpx;
  font-weight: 700;
}

.scope-tip__dot {
  width: 10rpx;
  height: 10rpx;
  border-radius: 50%;
  background: $teacher-mobile-primary;
}

.course-main {
  justify-content: space-between;
  gap: 20rpx;
}

.course-copy {
  min-width: 0;
  flex: 1;
}

.course-title {
  margin-top: 18rpx;
  color: #10172d;
  font-size: 30rpx;
  font-weight: 900;
  line-height: 1.35;
}

.course-meta,
.course-desc {
  margin-top: 8rpx;
  color: #53617b;
  font-size: 25rpx;
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
  font-size: 24rpx;
  font-weight: 700;
}

.evidence-layout {
  align-items: stretch;
  gap: 18rpx;
}

.type-list {
  display: flex;
  width: 196rpx;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 12rpx;
}

.type-card {
  min-height: 150rpx;
  padding: 18rpx;
  border: 1rpx solid #dfe6f0;
  border-radius: 12rpx;
  background: #fff;
}

.type-card--active {
  border-color: rgba(14, 193, 101, 0.3);
  background: linear-gradient(135deg, #f3fff8, #fbfffd);
}

.type-icon {
  position: relative;
  width: 42rpx;
  height: 42rpx;
  color: $teacher-mobile-primary;
}

.type-icon::before,
.type-icon::after,
.small-icon::before,
.small-icon::after,
.report-icon::before {
  position: absolute;
  content: '';
}

.type-icon--calendar::before {
  inset: 7rpx;
  border-radius: 6rpx;
  background: currentColor;
}

.type-icon--chart::before {
  bottom: 7rpx;
  left: 8rpx;
  width: 8rpx;
  height: 22rpx;
  border-radius: 5rpx;
  background: #2282ef;
  box-shadow: 13rpx -10rpx 0 #2282ef, 26rpx 3rpx 0 #2282ef;
}

.type-icon--star::before {
  inset: 7rpx;
  background: #ff7a18;
  clip-path: polygon(50% 0, 62% 35%, 100% 36%, 70% 58%, 80% 96%, 50% 74%, 20% 96%, 30% 58%, 0 36%, 38% 35%);
}

.type-icon--file::before {
  inset: 6rpx 10rpx;
  border-radius: 4rpx;
  background: #8d59f4;
}

.type-title {
  margin-top: 14rpx;
  color: #10172d;
  font-size: 25rpx;
  font-weight: 900;
  line-height: 1.3;
}

.type-desc {
  margin-top: 8rpx;
  color: #52607a;
  font-size: 22rpx;
  line-height: 1.38;
}

.detail-list {
  min-width: 0;
  flex: 1;
}

.month-panel,
.month-fold,
.analysis-row {
  border: 1rpx solid #dfe6f0;
  border-radius: 10rpx;
  background: #fff;
}

.month-head,
.month-fold {
  justify-content: space-between;
  min-height: 52rpx;
  padding: 0 18rpx;
  color: #10172d;
  font-size: 25rpx;
  font-weight: 900;
}

.up-icon,
.down-icon {
  width: 16rpx;
  height: 16rpx;
  border-top: 4rpx solid currentColor;
  border-right: 4rpx solid currentColor;
  color: $teacher-mobile-primary-dark;
  transform: rotate(-45deg);
}

.down-icon {
  color: #63708a;
  transform: rotate(135deg);
}

.report-row,
.analysis-row {
  gap: 14rpx;
  padding: 12rpx 14rpx;
}

.report-row {
  margin: 8rpx;
}

.report-row--selected {
  border-radius: 10rpx;
  background: #f5fff9;
}

.report-icon,
.small-icon {
  position: relative;
  width: 42rpx;
  height: 42rpx;
  flex: 0 0 auto;
  border-radius: 8rpx;
  background: #e9fbf1;
  color: $teacher-mobile-primary;
}

.report-icon::before {
  top: 11rpx;
  left: 13rpx;
  width: 17rpx;
  height: 20rpx;
  background: currentColor;
  clip-path: polygon(0 0, 100% 50%, 0 100%);
}

.report-row__body,
.analysis-row__body {
  min-width: 0;
  flex: 1;
}

.row-title {
  color: #10172d;
  font-size: 24rpx;
  font-weight: 900;
  line-height: 1.25;
}

.row-desc {
  margin-top: 4rpx;
  color: #56647d;
  font-size: 21rpx;
  line-height: 1.25;
}

.month-fold {
  margin-top: 8rpx;
}

.analysis-row {
  margin-top: 10rpx;
  min-height: 62rpx;
}

.small-icon--score::before,
.small-icon--test::before,
.small-icon--star::before {
  inset: 10rpx;
  border-radius: 5rpx;
  background: currentColor;
}

.small-icon--doc {
  background: #f1f4f9;
  color: #a4afc0;
}

.small-icon--doc::before {
  inset: 9rpx 13rpx;
  border-radius: 3rpx;
  background: currentColor;
}

.supplement-actions {
  gap: 20rpx;
  margin-top: 18rpx;
}

.supplement-button {
  height: 54rpx;
  flex: 1;
  font-size: 25rpx;
}

.bottom-actions {
  position: fixed;
  right: 0;
  bottom: calc(142rpx + env(safe-area-inset-bottom));
  left: 0;
  z-index: 48;
  gap: 26rpx;
  padding: 18rpx 28rpx 20rpx;
  background: rgba(248, 252, 255, 0.92);
  backdrop-filter: blur(12rpx);
}

.selected-copy {
  min-width: 0;
  flex: 1;
}

.selected-title {
  color: #10172d;
  font-size: 30rpx;
  font-weight: 900;
  line-height: 1.25;
}

.selected-title text {
  color: $teacher-mobile-primary-dark;
  font-size: 42rpx;
}

.selected-desc {
  margin-top: 4rpx;
  color: #52607a;
  font-size: 23rpx;
  line-height: 1.3;
}

.start-button {
  width: 278rpx;
  height: 64rpx;
  flex: 0 0 auto;
  border-radius: 16rpx;
  font-size: 29rpx;
}

@media (max-width: 374px) {
  .hero,
  .content {
    padding-right: 18rpx;
    padding-left: 18rpx;
  }

  .scope-card,
  .course-card,
  .evidence-card,
  .supplement-card {
    padding: 22rpx;
  }

  .scope-grid,
  .evidence-layout,
  .supplement-actions {
    gap: 12rpx;
  }

  .scope-option {
    width: calc((100% - 12rpx) / 2);
    padding: 0 14rpx;
    font-size: 25rpx;
  }

  .course-main,
  .bottom-actions {
    gap: 16rpx;
  }

  .switch-button {
    width: 118rpx;
    font-size: 25rpx;
  }

  .type-list {
    width: 116rpx;
  }

  .type-card {
    min-height: 116rpx;
    padding: 12rpx;
  }

  .type-desc {
    display: none;
  }

  .type-title,
  .month-head,
  .month-fold {
    font-size: 22rpx;
  }

  .row-title {
    font-size: 22rpx;
  }

  .row-desc {
    font-size: 19rpx;
  }

  .supplement-button {
    font-size: 22rpx;
  }

  .bottom-actions {
    padding-right: 20rpx;
    padding-left: 20rpx;
  }

  .selected-title {
    font-size: 27rpx;
  }

  .selected-desc {
    font-size: 21rpx;
  }

  .start-button {
    width: 220rpx;
    font-size: 25rpx;
  }
}
</style>
