<script setup lang="ts">
import { computed, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobileNavbar from '../../../components/MobileNavbar.vue'
import {
  getMobileTrainingState,
  getTrainingSummaryDraft,
  optimizeTrainingSummary,
  saveTrainingSummaryDraft,
  submitTrainingArchive,
  updateTrainingSummaryDraft,
  uploadTrainingMaterial,
} from '../../../domain/training'

type TrainingSummaryQuery = {
  recordId?: string
}

const query = ref<TrainingSummaryQuery>({})
const selectedCertificateIndex = ref(0)

onLoad((options) => {
  query.value = options as TrainingSummaryQuery
})

const trainingRecord = computed(() => getTrainingSummaryDraft(query.value.recordId))
const trainingState = getMobileTrainingState()

const readyItems = [
  { text: '培训信息已带出', done: true },
  { text: '学习心得已记录 2 条', done: true },
  { text: 'AI 总结草稿已生成', done: true },
  { text: '结业材料情况待确认', done: false },
]

const certificateChoices = [
  { title: '有证书 / 结业证明', desc: '上传证书或证明材料', active: true },
  { title: '暂未拿到，稍后补充', desc: '先保存，后续再上传', active: false },
  { title: '本次培训不发证书', desc: '用过程材料作为依据', active: false },
]

function goBack() {
  uni.navigateBack()
}

function showRuleFeedback() {
  uni.showToast({ title: '归档规则为本地模拟：材料提交后进入档案待确认', icon: 'none' })
}

function goArchiveResult() {
  const record = submitTrainingArchive(trainingRecord.value.id)
  uni.navigateTo({ url: `/pages/activity/training-archive-result/index?recordId=${record.id}` })
}

function goLearningRecord() {
  uni.showToast({ title: '原学习记录已用于当前总结', icon: 'none' })
}

function selectCertificateChoice(index: number) {
  selectedCertificateIndex.value = index
}

function showThoughtFeedback() {
  uni.showToast({ title: '后续培训想法为本地模拟，可随草稿保存', icon: 'none' })
}

function editSummary() {
  updateTrainingSummaryDraft(trainingRecord.value.id)
}

function optimizeSummary() {
  optimizeTrainingSummary(trainingRecord.value.id)
}

function replaceMaterial() {
  uploadTrainingMaterial(trainingRecord.value.id)
}

function saveDraft() {
  saveTrainingSummaryDraft(trainingRecord.value.id)
}
</script>

<template>
  <view class="summary-page">
    <view class="hero">
      <MobileNavbar title="培训总结" size="compact" @back="goBack">
        <template #right>
          <view class="rule-link" @tap="showRuleFeedback">
            <view class="rule-link__icon">i</view>
            <text>规则说明</text>
          </view>
        </template>
      </MobileNavbar>
      <view class="ai-banner">
        <view class="ai-banner__icon"></view>
        <text>AI 已根据学习记录整理总结，补齐材料后可提交归档</text>
      </view>
    </view>

    <view class="content">
      <MobileCard class="course-card">
        <view class="course-cover">
          <view class="cover-screen"><view class="cover-check"></view></view>
          <view class="cover-book"></view>
        </view>
        <view class="course-info">
          <text class="course-title">{{ trainingRecord.title }}</text>
          <view class="course-tags">
            <text>线上课程</text>
            <text>第三方学习资源</text>
            <text class="course-tags__hours">12 学时</text>
          </view>
          <view class="meta-row">
            <view class="meta-icon meta-icon--source"></view>
            <text>学习资源来自：智慧职教平台</text>
          </view>
          <view class="meta-row">
            <view class="meta-icon meta-icon--state"></view>
            <text>培训状态：<text class="green-text">{{ trainingRecord.status }}</text></text>
          </view>
        </view>
        <view class="course-tip">
          <view class="tip-icon">i</view>
          <text>学习进度以第三方平台记录为准，本平台根据你的学习心得和上传资料整理总结。</text>
        </view>
      </MobileCard>

      <MobileCard class="ready-card">
        <text class="section-title">归档准备</text>
        <text class="operation-message">{{ trainingState.operationMessage || '培训总结、学习心得和材料状态将写入同一培训记录。' }}</text>
        <view class="ready-list">
          <view v-for="item in readyItems" :key="item.text" class="ready-row">
            <view class="ready-dot" :class="{ 'ready-dot--pending': !item.done }"></view>
            <text>{{ item.text }}</text>
          </view>
        </view>
        <view class="ready-art">
          <view class="clipboard"></view>
        </view>
      </MobileCard>

      <MobileCard class="draft-card">
        <view class="section-head section-head--between">
          <view class="section-head__left">
            <text class="section-title">AI 培训总结草稿</text>
            <view class="spark"></view>
          </view>
          <view class="plain-link" @tap="goLearningRecord">
            <text>查看原学习记录</text>
            <view class="plain-link__arrow"></view>
          </view>
        </view>
        <text class="draft-text">{{ trainingRecord.summaryDraft }}</text>
        <text class="draft-text">结合《智能制造基础》课程，后续可尝试将在线测验、学习任务单和课堂即时反馈结合起来，用于了解学生掌握情况，并辅助课堂分层指导。</text>
        <view class="panel-actions">
          <MobileActionButton class="panel-action" variant="outline" @tap="editSummary">修改总结</MobileActionButton>
          <MobileActionButton class="panel-action" variant="outline" @tap="optimizeSummary">让 AI 再优化</MobileActionButton>
        </view>
      </MobileCard>

      <MobileCard class="certificate-card">
        <view class="section-head">
          <text class="section-title">本次培训是否有证书？</text>
          <view class="info-dot">i</view>
        </view>
        <view class="choice-grid">
          <view
            v-for="(item, index) in certificateChoices"
            :key="item.title"
            class="choice-item"
            :class="{ 'choice-item--active': selectedCertificateIndex === index }"
            @tap="selectCertificateChoice(index)"
          >
            <view class="choice-radio"></view>
            <view>
              <text class="choice-title">{{ item.title }}</text>
              <text class="choice-desc">{{ item.desc }}</text>
            </view>
          </view>
        </view>
        <view class="file-card">
          <view class="file-thumb">
            <view class="file-thumb__paper"></view>
            <view class="file-thumb__close">×</view>
          </view>
          <view class="file-info">
            <text class="file-name">培训证书.jpg</text>
            <text class="file-tag">AI 已识别</text>
            <text class="file-desc">数字化教学能力提升 | 12 学时 | 2026-04-20</text>
          </view>
          <text class="replace-link" @tap="replaceMaterial">更换材料</text>
        </view>
      </MobileCard>

      <MobileCard class="thought-card">
        <view class="section-head section-head--compact">
          <view class="bulb-icon"></view>
          <text class="section-title section-title--small">后续培训想法</text>
          <text class="optional">（可选）</text>
        </view>
        <view class="thought-box">
          <text>可尝试将在在线测验结果用于课堂分层指导，并将互动工具用于课中即时反馈，提升学生参与度。</text>
          <text class="modify-link" @tap="showThoughtFeedback">修改</text>
          <text class="word-count">48/300</text>
        </view>
      </MobileCard>

      <MobileCard class="upload-card">
        <view class="upload-left">
          <view class="clip-icon"></view>
          <text class="section-title section-title--small">补充材料</text>
          <text class="optional">（可选）</text>
          <text class="upload-tip">支持上传学习截图、课程通知、报名记录等</text>
        </view>
        <text class="upload-link" @tap="replaceMaterial">上传材料</text>
      </MobileCard>
    </view>

    <view class="bottom-actions">
      <view class="ready-state">
        <view class="ready-state__dot"></view>
        <text>材料已齐，可提交归档</text>
      </view>
      <MobileActionButton class="bottom-actions__button" variant="outline" @tap="saveDraft">保存草稿</MobileActionButton>
      <MobileActionButton class="bottom-actions__button" variant="primary" @tap="goArchiveResult">提交归档</MobileActionButton>
    </view>
  </view>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.summary-page {
  min-height: 100vh;
  padding-bottom: calc(166rpx + env(safe-area-inset-bottom));
  background: linear-gradient(180deg, #fbfffd 0%, #f7fbff 48%, #f5f9ff 100%);
  color: $teacher-mobile-text-primary;
}

.hero {
  padding: calc(var(--status-bar-height) + 14rpx) 28rpx 18rpx;
}

.rule-link,
.ai-banner,
.course-card,
.course-tags,
.meta-row,
.section-head,
.section-head__left,
.ready-row,
.panel-actions,
.file-card,
.upload-card,
.bottom-actions,
.ready-state {
  display: flex;
  align-items: center;
}

.rule-link {
  gap: 8rpx;
  color: #17233c;
  font-size: 25rpx;
  font-weight: 800;
}

.rule-link__icon,
.info-dot,
.tip-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3rpx solid currentColor;
  border-radius: 50%;
  font-weight: 900;
}

.rule-link__icon {
  width: 28rpx;
  height: 28rpx;
  font-size: 20rpx;
}

.ai-banner {
  width: fit-content;
  max-width: 100%;
  gap: 10rpx;
  margin: 16rpx auto 0;
  padding: 10rpx 22rpx;
  border: 1rpx solid rgba(246, 184, 64, 0.45);
  border-radius: 14rpx;
  background: #fffaf0;
  color: #b46902;
  font-size: 25rpx;
  font-weight: 700;
}

.ai-banner__icon {
  position: relative;
  width: 28rpx;
  height: 28rpx;
  border-radius: 7rpx;
  background: #f6b840;
}

.ai-banner__icon::before {
  position: absolute;
  top: 7rpx;
  left: 10rpx;
  width: 8rpx;
  height: 14rpx;
  border-radius: 4rpx;
  background: #fff;
  content: '';
}

.content {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
  padding: 0 28rpx;
}

.course-card,
.ready-card,
.draft-card,
.certificate-card,
.thought-card,
.upload-card {
  padding: 30rpx;
}

.course-card {
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 24rpx;
}

.course-cover {
  position: relative;
  width: 178rpx;
  height: 128rpx;
  flex: 0 0 auto;
  overflow: hidden;
  border-radius: 16rpx;
  background: linear-gradient(135deg, #d9ecff, #f7fbff 52%, #cfeee0);
}

.cover-screen {
  position: absolute;
  top: 32rpx;
  left: 40rpx;
  width: 92rpx;
  height: 58rpx;
  border: 7rpx solid #244060;
  border-radius: 8rpx;
  background: #e9f6ff;
}

.cover-check {
  position: absolute;
  right: 16rpx;
  bottom: 12rpx;
  width: 28rpx;
  height: 28rpx;
  border-radius: 50%;
  background: $teacher-mobile-primary;
}

.cover-check::before {
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

.cover-book {
  position: absolute;
  right: 18rpx;
  bottom: 14rpx;
  width: 62rpx;
  height: 22rpx;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.8);
}

.course-info {
  min-width: 0;
  flex: 1;
}

.course-title {
  display: block;
  color: #10172d;
  font-size: 38rpx;
  font-weight: 900;
  line-height: 1.25;
}

.course-tags {
  flex-wrap: wrap;
  gap: 12rpx;
  margin-top: 16rpx;
}

.course-tags text {
  padding: 8rpx 18rpx;
  border: 1rpx solid #dce5f0;
  border-radius: 10rpx;
  background: #fff;
  color: #344461;
  font-size: 25rpx;
  font-weight: 700;
}

.course-tags .course-tags__hours {
  border-color: transparent;
  background: transparent;
  color: $teacher-mobile-primary-dark;
}

.meta-row {
  gap: 12rpx;
  margin-top: 14rpx;
  color: #263552;
  font-size: 25rpx;
  line-height: 1.35;
}

.green-text {
  color: $teacher-mobile-primary-dark;
  font-weight: 900;
}

.meta-icon {
  position: relative;
  width: 24rpx;
  height: 24rpx;
  flex: 0 0 auto;
  color: $teacher-mobile-primary;
}

.meta-icon--source {
  border: 4rpx solid currentColor;
  border-radius: 50%;
}

.meta-icon--source::before {
  position: absolute;
  top: 7rpx;
  left: 7rpx;
  width: 9rpx;
  height: 5rpx;
  border-bottom: 3rpx solid currentColor;
  border-left: 3rpx solid currentColor;
  content: '';
  transform: rotate(-45deg);
}

.meta-icon--state {
  border: 3rpx solid #263552;
  border-radius: 50%;
}

.meta-icon--state::before {
  position: absolute;
  top: 4rpx;
  left: 9rpx;
  width: 4rpx;
  height: 10rpx;
  border-radius: 4rpx;
  background: #263552;
  content: '';
}

.course-tip {
  display: flex;
  width: 100%;
  gap: 16rpx;
  padding: 22rpx;
  border: 1rpx solid rgba(14, 193, 101, 0.24);
  border-radius: 16rpx;
  background: #f5fffa;
  color: #263552;
  font-size: 26rpx;
  line-height: 1.55;
}

.tip-icon {
  width: 30rpx;
  height: 30rpx;
  flex: 0 0 auto;
  color: $teacher-mobile-primary;
  font-size: 20rpx;
}

.ready-card {
  position: relative;
  overflow: hidden;
}

.section-title {
  color: #10172d;
  font-size: 38rpx;
  font-weight: 900;
  line-height: 1.2;
}

.section-title--small {
  font-size: 30rpx;
}

.ready-list {
  position: relative;
  z-index: 1;
  margin-top: 28rpx;
}

.ready-row {
  gap: 18rpx;
  color: #1f2c46;
  font-size: 28rpx;
  line-height: 1.4;
}

.ready-row + .ready-row {
  margin-top: 18rpx;
}

.ready-dot,
.ready-state__dot {
  position: relative;
  width: 32rpx;
  height: 32rpx;
  flex: 0 0 auto;
  border-radius: 50%;
  background: $teacher-mobile-primary;
}

.ready-dot::before,
.ready-state__dot::before {
  position: absolute;
  top: 9rpx;
  left: 8rpx;
  width: 14rpx;
  height: 8rpx;
  border-bottom: 4rpx solid #fff;
  border-left: 4rpx solid #fff;
  content: '';
  transform: rotate(-45deg);
}

.ready-dot--pending {
  background: #ffc45a;
}

.ready-dot--pending::before {
  display: none;
}

.ready-art {
  position: absolute;
  right: 34rpx;
  bottom: 26rpx;
  width: 170rpx;
  height: 146rpx;
  opacity: 0.24;
}

.clipboard {
  position: absolute;
  right: 16rpx;
  bottom: 0;
  width: 104rpx;
  height: 118rpx;
  border: 12rpx solid $teacher-mobile-primary;
  border-radius: 12rpx;
}

.clipboard::before {
  position: absolute;
  top: -22rpx;
  left: 28rpx;
  width: 42rpx;
  height: 24rpx;
  border-radius: 14rpx 14rpx 0 0;
  background: $teacher-mobile-primary;
  content: '';
}

.section-head {
  gap: 12rpx;
  margin-bottom: 24rpx;
}

.section-head--between {
  justify-content: space-between;
}

.section-head--compact {
  margin-bottom: 16rpx;
}

.spark {
  width: 28rpx;
  height: 28rpx;
  background: $teacher-mobile-primary;
  clip-path: polygon(50% 0, 62% 36%, 100% 50%, 62% 64%, 50% 100%, 38% 64%, 0 50%, 38% 36%);
}

.plain-link {
  display: flex;
  align-items: center;
  gap: 8rpx;
  color: #5d6a82;
  font-size: 25rpx;
}

.plain-link__arrow {
  width: 14rpx;
  height: 14rpx;
  border-top: 4rpx solid currentColor;
  border-right: 4rpx solid currentColor;
  transform: rotate(45deg);
}

.draft-text {
  display: block;
  color: #1e2b43;
  font-size: 27rpx;
  line-height: 1.75;
}

.draft-text + .draft-text {
  margin-top: 22rpx;
}

.panel-actions {
  gap: 24rpx;
  margin-top: 26rpx;
}

.panel-action {
  height: 58rpx;
  flex: 1;
  font-size: 26rpx;
}

.info-dot {
  width: 26rpx;
  height: 26rpx;
  color: #6c768a;
  font-size: 18rpx;
}

.choice-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18rpx;
}

.choice-item {
  display: flex;
  gap: 14rpx;
  min-height: 88rpx;
  padding: 16rpx 14rpx;
  border: 1rpx solid #dfe6f1;
  border-radius: 12rpx;
  background: #fff;
}

.choice-item--active {
  border-color: rgba(14, 193, 101, 0.45);
  background: #f2fff8;
}

.choice-radio {
  width: 28rpx;
  height: 28rpx;
  flex: 0 0 auto;
  border: 3rpx solid #9aa6ba;
  border-radius: 50%;
}

.choice-item--active .choice-radio {
  border: 8rpx solid $teacher-mobile-primary;
}

.choice-title {
  display: block;
  color: #17233c;
  font-size: 25rpx;
  font-weight: 900;
  line-height: 1.25;
}

.choice-desc {
  display: block;
  margin-top: 8rpx;
  color: #66728a;
  font-size: 22rpx;
  line-height: 1.25;
}

.file-card {
  gap: 22rpx;
  margin-top: 18rpx;
  padding: 16rpx;
  border: 1rpx solid #dfe6f1;
  border-radius: 12rpx;
}

.file-thumb {
  position: relative;
  width: 110rpx;
  height: 82rpx;
  flex: 0 0 auto;
  overflow: hidden;
  border-radius: 8rpx;
  background: #fff5dc;
}

.file-thumb__paper {
  position: absolute;
  inset: 14rpx 18rpx;
  border: 2rpx solid #d7a44a;
  background: #fff9e8;
}

.file-thumb__close {
  position: absolute;
  top: -2rpx;
  right: -2rpx;
  display: flex;
  width: 32rpx;
  height: 32rpx;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(55, 61, 73, 0.72);
  color: #fff;
  font-size: 24rpx;
}

.file-info {
  min-width: 0;
  flex: 1;
}

.file-name {
  display: block;
  color: #17233c;
  font-size: 26rpx;
  font-weight: 900;
}

.file-tag {
  display: block;
  width: fit-content;
  margin-top: 6rpx;
  padding: 4rpx 10rpx;
  border-radius: 8rpx;
  background: #e9fff2;
  color: $teacher-mobile-primary-dark;
  font-size: 22rpx;
}

.file-desc {
  display: block;
  margin-top: 6rpx;
  color: #3c4a66;
  font-size: 23rpx;
}

.replace-link,
.modify-link,
.upload-link {
  color: $teacher-mobile-primary-dark;
  font-size: 25rpx;
  font-weight: 900;
  white-space: nowrap;
}

.bulb-icon,
.clip-icon {
  position: relative;
  width: 30rpx;
  height: 30rpx;
  flex: 0 0 auto;
  color: #273a61;
}

.bulb-icon::before {
  position: absolute;
  top: 2rpx;
  left: 7rpx;
  width: 16rpx;
  height: 18rpx;
  border: 3rpx solid currentColor;
  border-radius: 50% 50% 42% 42%;
  content: '';
}

.bulb-icon::after {
  position: absolute;
  right: 9rpx;
  bottom: 2rpx;
  left: 9rpx;
  height: 5rpx;
  border-radius: 5rpx;
  background: currentColor;
  content: '';
}

.optional {
  color: #6e7a91;
  font-size: 25rpx;
}

.thought-box {
  position: relative;
  min-height: 118rpx;
  padding: 18rpx 92rpx 34rpx 18rpx;
  border: 1rpx solid #dfe6f1;
  border-radius: 12rpx;
  color: #1f2c46;
  font-size: 26rpx;
  line-height: 1.55;
}

.modify-link {
  position: absolute;
  top: 18rpx;
  right: 20rpx;
}

.word-count {
  position: absolute;
  right: 20rpx;
  bottom: 14rpx;
  color: #7b8599;
  font-size: 24rpx;
}

.upload-card {
  justify-content: space-between;
  gap: 18rpx;
}

.upload-left {
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 10rpx;
  flex: 1;
}

.clip-icon::before {
  position: absolute;
  inset: 6rpx 8rpx;
  border: 4rpx solid currentColor;
  border-top: 0;
  border-radius: 0 0 12rpx 12rpx;
  content: '';
  transform: rotate(-42deg);
}

.upload-tip {
  min-width: 0;
  color: #6e7a91;
  font-size: 23rpx;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.bottom-actions {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 45;
  flex-wrap: wrap;
  gap: 22rpx;
  padding: 20rpx 28rpx calc(20rpx + env(safe-area-inset-bottom));
  border-top: 1rpx solid #dfeee7;
  background: rgba(251, 255, 253, 0.98);
}

.ready-state {
  gap: 12rpx;
  flex: 1;
  color: #4b5873;
  font-size: 27rpx;
  font-weight: 800;
}

.bottom-actions__button {
  width: 184rpx;
  height: 66rpx;
  flex: 0 0 auto;
  font-size: 28rpx;
}

@media (max-width: 374px) {
  .hero,
  .content {
    padding-right: 22rpx;
    padding-left: 22rpx;
  }

  .course-card,
  .ready-card,
  .draft-card,
  .certificate-card,
  .thought-card,
  .upload-card {
    padding: 22rpx;
  }

  .course-cover {
    width: 132rpx;
    height: 102rpx;
  }

  .course-title {
    font-size: 31rpx;
  }

  .course-tags text {
    font-size: 22rpx;
    padding: 7rpx 12rpx;
  }

  .choice-grid {
    grid-template-columns: 1fr;
  }

  .panel-actions {
    gap: 16rpx;
  }

  .bottom-actions {
    gap: 12rpx;
    padding-right: 16rpx;
    padding-left: 16rpx;
  }

  .ready-state {
    flex: 1 0 100%;
    font-size: 24rpx;
  }

  .bottom-actions__button {
    flex: 1;
    width: auto;
    font-size: 26rpx;
  }
}
</style>
