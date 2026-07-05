<script setup lang="ts">
import { computed } from 'vue'
import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobileNavbar from '../../../components/MobileNavbar.vue'
import MobileTabBar from '../../../components/MobileTabBar.vue'
import { confirmReflection, getMobileReflectionState, optimizeReflectionDraft, saveReflectionDraft } from '../../../domain/reflection'

const reflectionState = getMobileReflectionState()
const reflectionRecord = computed(() => reflectionState.records[0])
const selectedEvidence = computed(() => reflectionState.evidence.filter((item) => reflectionRecord.value.evidenceIds.includes(item.id)))
const selectedEvidenceTitles = computed(() => selectedEvidence.value.map((item) => item.title).join('、'))

const sections = [
  {
    title: '一、反思对象',
    body: '《智能制造基础》第 5 次课，智能制造 2301 班，2026-03-18。',
  },
  {
    title: '二、依据来源',
    body: '课堂分析报告、课堂录音，以及教师对话补充（课后与小组代表交流、个别学生答疑记录）。',
  },
  {
    title: '三、课堂整体情况',
    body: '本节课共 92 人到课 89 人，出勤率 96.7%。课堂采用“讲解+案例+小组讨论+随堂问答”的结构，节奏基本完整。学生整体专注，能积极回应问题，课堂氛围活跃，讨论时间把控较好。',
  },
  {
    title: '四、课堂表现观察',
    body: '教师讲解清晰，案例贴近产业实际；在“边缘层—平台层—应用层”的架构关系讲解时，部分学生出现迷惑，提问较集中；小组讨论中 3 个小组发言较活跃，另有部分学生参与度偏低，需要教师点名引导。',
  },
  {
    title: '五、主要发现',
    body: '• 大多数学生能理解各层功能及典型技术应用，并结合案例表达看法。\n• 学生能够将课程内容与已有知识连接，具备一定的迁移能力。\n• 课堂互动总体良好，学生敢于提问并尝试回答。',
  },
  {
    title: '六、原因分析',
    body: '部分学生对工业互联网整体架构的层次关系尚不稳固；抽象概念较多，缺少直观对比与可视化支撑；小组分工不够明确，导致参与度不均。',
  },
  {
    title: '七、改进建议',
    body: '• 增加架构层次对比图与典型数据流示例，帮助学生建立直观理解。\n• 优化小组任务设计，明确角色分工与汇报要求，提升讨论深度与覆盖面。\n• 设计分层式提问与即时反馈，强化关键概念的迁移与应用。',
  },
  {
    title: '八、后续观察点',
    body: '• 学生对架构层次关系的理解是否更加清晰，可通过测验与提问验证。\n• 小组讨论参与度与发言质量是否提升。\n• 改进措施对课堂互动与学习效果的具体影响。',
  },
]

function goBack() {
  uni.navigateBack()
}

function goSuccess() {
  confirmReflection()
  uni.navigateTo({ url: '/pages/activity/reflection-success/index' })
}

function editDraft() {
  saveReflectionDraft('教师已修改反思草稿内容')
  uni.showToast({ title: '草稿已进入编辑状态', icon: 'none' })
}

function addThought() {
  saveReflectionDraft('补充一句想法：下次增加开放式提问。')
  uni.showToast({ title: '已补充想法', icon: 'none' })
}

function optimizeDraft() {
  optimizeReflectionDraft()
  uni.showToast({ title: 'AI 已重新优化', icon: 'none' })
}

function saveDraft() {
  saveReflectionDraft()
  uni.showToast({ title: '草稿已保存', icon: 'none' })
}
</script>

<template>
  <view class="reflection-draft-page">
    <view class="hero">
      <MobileNavbar title="教学反思｜反思报告草稿编辑页" size="compact" @back="goBack" />
      <text class="hero__subtitle">AI 已根据依据和对话生成反思草稿</text>
    </view>

    <view class="content">
      <MobileCard class="source-card">
        <view class="card-head">
          <view class="head-icon head-icon--clipboard"></view>
          <text class="card-title">草稿来源</text>
        </view>
        <text class="course-title">《{{ reflectionRecord.course }}》{{ reflectionRecord.lesson }}</text>
        <text class="source-line">已使用 {{ selectedEvidence.length }} 份依据：{{ selectedEvidenceTitles || '暂无依据' }}</text>
        <view class="source-bottom">
          <text>{{ reflectionState.operationMessage || '已结合 2 个反思要点' }}</text>
          <view class="done-pill">
            <view class="spark-small"></view>
            <text>AI 已整理完成</text>
          </view>
        </view>
      </MobileCard>

      <MobileCard class="draft-card">
        <view class="card-head">
          <view class="head-icon head-icon--edit"></view>
          <text class="card-title">AI 反思报告草稿</text>
        </view>

        <view class="draft-box">
          <view class="summary-block">
            <text class="summary-label">摘要</text>
            <text class="summary-text">本次《{{ reflectionRecord.course }}》{{ reflectionRecord.lesson }}聚焦“工业互联网与智能工厂架构”主题，通过案例讲解、小组讨论与课堂问答开展教学。整体课堂参与度较高，学生能联系案例表达观点，但在架构层次理解、概念之间的关联迁移以及小组讨论的深度与均衡性方面仍有提升空间。</text>
          </view>

          <view v-for="section in sections" :key="section.title" class="draft-section">
            <text class="section-title">{{ section.title }}</text>
            <text class="section-body">{{ section.body }}</text>
          </view>

          <text class="word-count">1432/2000</text>
        </view>
      </MobileCard>

      <view class="tool-row">
        <MobileActionButton class="tool-button" variant="outline" @tap="editDraft">修改草稿</MobileActionButton>
        <MobileActionButton class="tool-button" variant="outline" @tap="addThought">补充一句想法</MobileActionButton>
        <MobileActionButton class="tool-button" variant="outline" @tap="optimizeDraft">重新让 AI 优化</MobileActionButton>
      </view>

      <view class="confirm-note">
        <view class="info-icon">i</view>
        <text>确认后的反思可继续沉淀到成长档案</text>
      </view>

      <view class="bottom-actions">
        <MobileActionButton class="save-button" variant="outline" @tap="saveDraft">保存草稿</MobileActionButton>
        <MobileActionButton class="confirm-button" variant="primary" @tap="goSuccess">确认反思</MobileActionButton>
      </view>
    </view>

    <MobileTabBar active="activity" />
  </view>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.reflection-draft-page {
  min-height: 100vh;
  padding-bottom: calc(166rpx + env(safe-area-inset-bottom));
  background: linear-gradient(180deg, #ffffff 0%, #f8fbff 46%, #f5f9ff 100%);
  color: $teacher-mobile-text-primary;
}

.hero {
  padding: calc(var(--status-bar-height) + 14rpx) 24rpx 20rpx;
}

.hero__subtitle {
  display: block;
  margin-top: 8rpx;
  color: #66738d;
  font-size: 26rpx;
  line-height: 1.45;
  text-align: center;
}

:deep(.mobile-navbar__wd .wd-navbar__title) {
  max-width: 78%;
  font-size: 34rpx;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 18rpx;
  padding: 0 28rpx;
}

.source-card,
.draft-card {
  padding: 30rpx;
}

.card-head,
.source-bottom,
.done-pill,
.tool-row,
.confirm-note,
.bottom-actions {
  display: flex;
  align-items: center;
}

.card-head {
  gap: 16rpx;
}

.head-icon {
  position: relative;
  width: 48rpx;
  height: 48rpx;
  flex: 0 0 auto;
  border: 2rpx solid rgba(14, 193, 101, 0.28);
  border-radius: 12rpx;
  background: #eafbf2;
  color: $teacher-mobile-primary-dark;
}

.head-icon--clipboard::before {
  position: absolute;
  inset: 12rpx 14rpx 10rpx;
  border: 4rpx solid currentColor;
  border-radius: 4rpx;
  content: '';
}

.head-icon--edit::before {
  position: absolute;
  left: 13rpx;
  top: 24rpx;
  width: 22rpx;
  height: 6rpx;
  border-radius: 999rpx;
  background: currentColor;
  content: '';
  transform: rotate(-45deg);
}

.card-title {
  color: #10172d;
  font-size: 38rpx;
  font-weight: 900;
}

.course-title {
  display: block;
  margin-top: 24rpx;
  color: #10172d;
  font-size: 30rpx;
  font-weight: 900;
}

.source-line,
.source-bottom {
  color: #263b67;
  font-size: 26rpx;
  line-height: 1.5;
}

.source-line {
  display: block;
  margin-top: 22rpx;
}

.source-bottom {
  justify-content: space-between;
  gap: 16rpx;
  margin-top: 12rpx;
}

.done-pill {
  gap: 10rpx;
  padding: 12rpx 18rpx;
  border: 1rpx solid rgba(14, 193, 101, 0.24);
  border-radius: 12rpx;
  background: #effcf5;
  color: $teacher-mobile-primary-dark;
  font-size: 24rpx;
  font-weight: 800;
}

.spark-small {
  width: 18rpx;
  height: 18rpx;
  border-radius: 50%;
  background: $teacher-mobile-primary;
}

.draft-box {
  position: relative;
  margin-top: 24rpx;
  padding: 24rpx 24rpx 42rpx;
  border: 2rpx solid rgba(14, 193, 101, 0.38);
  border-radius: 14rpx;
  background: linear-gradient(180deg, rgba(244, 255, 249, 0.82), rgba(255, 255, 255, 0.98));
}

.summary-block,
.draft-section {
  display: flex;
  flex-direction: column;
}

.summary-label {
  width: fit-content;
  padding: 4rpx 8rpx;
  border-radius: 6rpx;
  background: #dff8ea;
  color: #10172d;
  font-size: 26rpx;
  font-weight: 900;
}

.summary-text,
.section-body {
  margin-top: 8rpx;
  color: #17213b;
  font-size: 27rpx;
  line-height: 1.58;
  white-space: pre-line;
}

.draft-section {
  margin-top: 24rpx;
}

.section-title {
  position: relative;
  padding-left: 22rpx;
  color: #10172d;
  font-size: 29rpx;
  font-weight: 900;
  line-height: 1.4;
}

.section-title::before {
  position: absolute;
  top: 10rpx;
  left: 0;
  width: 6rpx;
  height: 28rpx;
  border-radius: 999rpx;
  background: $teacher-mobile-primary;
  content: '';
}

.word-count {
  position: absolute;
  right: 20rpx;
  bottom: 12rpx;
  color: #a4adbd;
  font-size: 24rpx;
}

.tool-row {
  gap: 14rpx;
}

.tool-button {
  min-width: 0;
  height: 64rpx;
  flex: 1;
  border-radius: 12rpx;
  background: #effcf5;
  font-size: 25rpx;
}

.confirm-note {
  justify-content: center;
  gap: 10rpx;
  color: #7c8798;
  font-size: 25rpx;
}

.info-icon {
  display: flex;
  width: 28rpx;
  height: 28rpx;
  align-items: center;
  justify-content: center;
  border: 2rpx solid #94a3b8;
  border-radius: 50%;
  color: #64748b;
  font-size: 20rpx;
  font-weight: 900;
}

.bottom-actions {
  gap: 30rpx;
  padding-bottom: 8rpx;
}

.save-button,
.confirm-button {
  height: 70rpx;
  flex: 1;
  border-radius: 14rpx;
  font-size: 30rpx;
}

@media (max-width: 374px) {
  .hero,
  .content {
    padding-right: 18rpx;
    padding-left: 18rpx;
  }

  .source-card,
  .draft-card {
    padding: 22rpx;
  }

  .source-bottom {
    align-items: flex-start;
    flex-direction: column;
  }

  .draft-box {
    padding-right: 18rpx;
    padding-left: 18rpx;
  }

  .summary-text,
  .section-body {
    font-size: 23rpx;
    line-height: 1.52;
  }

  .section-title {
    font-size: 25rpx;
  }

  .tool-row {
    flex-direction: column;
  }

  .tool-button {
    width: 100%;
    flex: none;
  }

  .bottom-actions {
    gap: 14rpx;
  }

  .save-button,
  .confirm-button {
    font-size: 26rpx;
  }
}
</style>
