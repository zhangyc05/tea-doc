<script setup lang="ts">
import { computed } from 'vue'
import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobileNavbar from '../../../components/MobileNavbar.vue'
import MobileTabBar from '../../../components/MobileTabBar.vue'
import { addReflectionMaterial, getMobileReflectionState, saveReflectionDraft, selectReflectionCourse, startReflectionAiSession } from '../../../domain/reflection'

startReflectionAiSession()
const reflectionState = getMobileReflectionState()
const materialCount = computed(() => reflectionState.evidence.filter((item) => item.status === 'uploaded' || item.status === 'recorded').length)

const firstOptions = ['课堂互动不够', '学生掌握不稳', '案例讲解效果一般', '我想随便说说']
const secondOptions = ['某一节课', '最近几次课', '整门课都存在', '我还不太确定']
const thirdOptions = ['提问方式', '案例设计', '课堂节奏', '学生基础']
const supplementItems = ['拍照上传', '上传文件', '录制课堂音频', '选择已有报告']

function goBack() {
  uni.navigateBack()
}

function goDraft() {
  saveReflectionDraft('自主 AI 对话已生成反思草稿')
  uni.navigateTo({ url: '/pages/activity/reflection-draft/index' })
}

function addSupplement(item: string) {
  addReflectionMaterial(item, item.includes('音频') ? 'audio' : item.includes('报告') ? 'report' : 'material')
}

function selectQuickOption(item: string) {
  saveReflectionDraft(`已记录对话选项：${item}`)
  uni.showToast({ title: `已记录对话选项：${item}`, icon: 'none' })
}

function showClueDetail() {
  uni.showToast({ title: '反思线索详情为本地模拟', icon: 'none' })
}

function continueChat() {
  uni.showToast({ title: '继续聊为本地模拟：可补充一句想法', icon: 'none' })
}

function showComposerFeedback() {
  uni.showToast({ title: '输入框为本地模拟：可直接生成反思草稿', icon: 'none' })
}

function changeCourse() {
  selectReflectionCourse('智能制造基础')
}
</script>

<template>
  <view class="reflection-ai-page">
    <view class="hero">
      <view class="hero-leaf"></view>
      <MobileNavbar title="教学反思" size="compact" @back="goBack" />
      <text class="hero__subtitle">先和 AI 聊聊，系统会逐步帮您整理反思内容</text>
    </view>

    <view class="content">
      <MobileCard class="mode-card">
        <view class="mode-head">
          <text class="mode-pill">自主反思</text>
          <view class="mode-copy">
            <text class="mode-title">暂未添加材料，也可以直接开始</text>
            <text class="mode-desc">可随时补充课件、课堂音频、图片或文件</text>
          </view>
          <view class="folder-art">
            <view class="folder-paper"></view>
            <view class="folder-plus"></view>
          </view>
        </view>
        <view class="mode-foot">
          <text>当前未限定具体课次或范围</text>
          <view class="change-course" @tap="changeCourse">
            <text>更换关联课程</text>
            <view class="arrow-right"></view>
          </view>
        </view>
      </MobileCard>

      <MobileCard class="chat-card">
        <view class="message-row message-row--ai">
          <view class="bot-avatar"></view>
          <view class="bubble bubble--ai">
            <text>您好，林老师。我可以陪您一起整理这次教学反思。您可以先简单说说：这次最想回顾哪一部分？</text>
          </view>
        </view>

        <view class="quick-row">
          <text v-for="item in firstOptions" :key="item" class="quick-chip" @tap="selectQuickOption(item)">{{ item }}</text>
        </view>

        <view class="message-row message-row--user">
          <view class="bubble bubble--user">
            <text>最近几次课里，学生参与讨论不太积极，我想先聊聊课堂互动的问题。</text>
          </view>
          <view class="user-avatar"></view>
        </view>

        <view class="message-row message-row--ai">
          <view class="bot-avatar"></view>
          <view class="bubble bubble--ai">
            <text>明白了，您主要想围绕“课堂互动”来反思。我想先了解一下：这是某一节课的问题，还是最近一段时间都比较明显？</text>
          </view>
        </view>

        <view class="quick-row">
          <text v-for="item in secondOptions" :key="item" class="quick-chip" @tap="selectQuickOption(item)">{{ item }}</text>
        </view>

        <view class="message-row message-row--user">
          <view class="bubble bubble--user bubble--short">
            <text>最近几次课都比较明显。</text>
          </view>
          <view class="user-avatar"></view>
        </view>

        <view class="message-row message-row--ai">
          <view class="bot-avatar"></view>
          <view class="bubble bubble--ai bubble--mid">
            <text>好的。我先帮您记下一个反思线索：学生参与讨论积极性不足。还觉得更可能和哪方面有关？</text>
          </view>
        </view>

        <view class="quick-row quick-row--last">
          <text v-for="item in thirdOptions" :key="item" class="quick-chip" @tap="selectQuickOption(item)">{{ item }}</text>
        </view>
      </MobileCard>

      <MobileCard class="clue-card">
        <view class="clue-head">
          <view class="clue-icon"></view>
          <text class="clue-title">AI 已整理的反思线索</text>
          <view class="detail-link" @tap="showClueDetail">
            <text>查看详情</text>
            <view class="arrow-right"></view>
          </view>
        </view>
        <view class="clue-row">
          <view class="check-dot"></view>
          <text>学生参与讨论积极性不足</text>
        </view>
        <view class="clue-row">
          <view class="check-dot"></view>
          <text>需要继续判断是提问方式、案例设计还是课堂节奏导致</text>
        </view>
        <view class="continue-line" @tap="continueChat">
          <view class="chat-small"></view>
          <text>继续聊一会儿</text>
        </view>
      </MobileCard>

      <view class="supplement-panel">
        <text class="panel-title">可随时补充</text>
        <text class="panel-count">已添加 {{ materialCount }} 份材料</text>
        <view class="supplement-grid">
          <view v-for="item in supplementItems" :key="item" class="supplement-item" @tap="addSupplement(item)">
            <view class="supplement-icon"></view>
            <text>{{ item }}</text>
          </view>
        </view>
      </view>

      <MobileCard class="composer-card">
        <view class="composer-row">
          <view class="plus-button"></view>
          <view class="input-box" @tap="showComposerFeedback">
            <view class="mic-icon"></view>
            <text>输入一句想法，或按住说话...</text>
          </view>
          <MobileActionButton class="draft-button" variant="primary" @tap="goDraft">生成反思草稿</MobileActionButton>
        </view>
        <view class="clue-count">
          <text>已整理</text>
          <text class="count">2</text>
          <text>条反思线索</text>
          <view class="arrow-right"></view>
        </view>
      </MobileCard>
    </view>

    <MobileTabBar active="activity" />
  </view>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.reflection-ai-page {
  min-height: 100vh;
  padding-bottom: calc(166rpx + env(safe-area-inset-bottom));
  background: linear-gradient(180deg, #f1fff8 0%, #ffffff 16%, #f7fbff 100%);
  color: $teacher-mobile-text-primary;
}

.hero {
  position: relative;
  padding: calc(var(--status-bar-height) + 16rpx) 28rpx 22rpx;
  overflow: hidden;
}

.hero__subtitle {
  display: block;
  margin-top: 8rpx;
  color: #657189;
  font-size: 27rpx;
  line-height: 1.45;
  text-align: center;
}

.hero-leaf {
  position: absolute;
  right: 28rpx;
  top: 38rpx;
  width: 112rpx;
  height: 126rpx;
  opacity: 0.48;
}

.hero-leaf::before,
.hero-leaf::after {
  position: absolute;
  border-radius: 999rpx 999rpx 0 999rpx;
  background: #a5ecc6;
  content: '';
}

.hero-leaf::before {
  right: 12rpx;
  width: 44rpx;
  height: 78rpx;
  transform: rotate(32deg);
}

.hero-leaf::after {
  right: 54rpx;
  top: 42rpx;
  width: 36rpx;
  height: 66rpx;
  transform: rotate(-42deg);
}

.content {
  display: flex;
  flex-direction: column;
  gap: 18rpx;
  padding: 0 28rpx;
}

.mode-card,
.chat-card,
.clue-card,
.composer-card {
  padding: 30rpx;
}

.mode-head,
.mode-foot,
.change-course,
.message-row,
.quick-row,
.clue-head,
.detail-link,
.clue-row,
.continue-line,
.supplement-grid,
.supplement-item,
.composer-row,
.input-box,
.clue-count {
  display: flex;
  align-items: center;
}

.mode-head {
  align-items: flex-start;
  gap: 20rpx;
}

.mode-pill {
  flex: 0 0 auto;
  padding: 12rpx 24rpx;
  border-radius: 999rpx;
  background: #e4fbef;
  color: $teacher-mobile-primary-dark;
  font-size: 30rpx;
  font-weight: 900;
}

.mode-copy {
  min-width: 0;
  flex: 1;
}

.mode-title,
.mode-desc,
.panel-title {
  display: block;
}

.mode-title {
  color: #10172d;
  font-size: 34rpx;
  font-weight: 900;
  line-height: 1.35;
}

.mode-desc {
  margin-top: 12rpx;
  color: #53617b;
  font-size: 25rpx;
  line-height: 1.45;
}

.folder-art {
  position: relative;
  width: 104rpx;
  height: 96rpx;
  flex: 0 0 auto;
  border-radius: 14rpx;
  background: linear-gradient(180deg, #e9f2ff, #d8f9e6);
}

.folder-paper {
  position: absolute;
  top: 12rpx;
  right: 18rpx;
  width: 54rpx;
  height: 64rpx;
  border-radius: 8rpx;
  background: #f8fbff;
  transform: rotate(8deg);
}

.folder-plus {
  position: absolute;
  right: 0;
  bottom: 10rpx;
  width: 34rpx;
  height: 34rpx;
  border-radius: 50%;
  background: $teacher-mobile-primary;
}

.folder-plus::before,
.folder-plus::after,
.plus-button::before,
.plus-button::after {
  position: absolute;
  background: currentColor;
  content: '';
}

.folder-plus::before,
.folder-plus::after {
  top: 15rpx;
  left: 9rpx;
  width: 16rpx;
  height: 4rpx;
  color: #fff;
}

.folder-plus::after,
.plus-button::after {
  transform: rotate(90deg);
}

.mode-foot {
  justify-content: space-between;
  gap: 18rpx;
  margin-top: 30rpx;
  color: #7b8798;
  font-size: 25rpx;
}

.change-course,
.detail-link {
  gap: 8rpx;
  color: $teacher-mobile-primary-dark;
  font-weight: 800;
}

.arrow-right {
  width: 14rpx;
  height: 14rpx;
  border-top: 4rpx solid currentColor;
  border-right: 4rpx solid currentColor;
  transform: rotate(45deg);
}

.chat-card {
  padding-bottom: 24rpx;
}

.message-row {
  gap: 18rpx;
  margin-bottom: 24rpx;
  align-items: flex-start;
}

.message-row--user {
  justify-content: flex-end;
}

.bot-avatar,
.user-avatar {
  position: relative;
  width: 56rpx;
  height: 56rpx;
  flex: 0 0 auto;
  border-radius: 50%;
}

.bot-avatar {
  background: $teacher-mobile-primary;
}

.bot-avatar::before {
  position: absolute;
  inset: 17rpx 13rpx;
  border-radius: 999rpx;
  background: #fff;
  box-shadow: 15rpx 0 0 #fff;
  content: '';
}

.user-avatar {
  background: #dff8ea;
}

.user-avatar::before {
  position: absolute;
  top: 13rpx;
  left: 19rpx;
  width: 18rpx;
  height: 18rpx;
  border-radius: 50%;
  background: $teacher-mobile-primary;
  box-shadow: 0 17rpx 0 8rpx $teacher-mobile-primary;
  content: '';
}

.bubble {
  max-width: 586rpx;
  padding: 20rpx 26rpx;
  border-radius: 12rpx;
  color: #263247;
  font-size: 28rpx;
  line-height: 1.55;
}

.bubble--ai {
  background: linear-gradient(135deg, #f7f8fb, #f1fff6);
}

.bubble--user {
  max-width: 500rpx;
  background: linear-gradient(135deg, #effff6, #e8fbf1);
}

.bubble--short {
  max-width: 360rpx;
}

.bubble--mid {
  max-width: 500rpx;
}

.quick-row {
  flex-wrap: wrap;
  gap: 14rpx 18rpx;
  margin: -10rpx 0 26rpx 78rpx;
}

.quick-row--last {
  margin-bottom: 0;
}

.quick-chip {
  padding: 9rpx 22rpx;
  border: 1rpx solid rgba(14, 193, 101, 0.28);
  border-radius: 10rpx;
  background: #fff;
  color: $teacher-mobile-primary-dark;
  font-size: 25rpx;
  font-weight: 800;
}

.clue-card {
  padding-bottom: 22rpx;
}

.clue-head {
  gap: 16rpx;
}

.clue-icon {
  width: 48rpx;
  height: 48rpx;
  flex: 0 0 auto;
  border-radius: 14rpx;
  background: #e7fbf0;
}

.clue-title {
  flex: 1;
  color: #10172d;
  font-size: 36rpx;
  font-weight: 900;
}

.clue-row {
  gap: 16rpx;
  margin-top: 20rpx;
  color: #263247;
  font-size: 27rpx;
  line-height: 1.35;
}

.check-dot {
  position: relative;
  width: 30rpx;
  height: 30rpx;
  flex: 0 0 auto;
  border-radius: 50%;
  background: #dff8ea;
  color: $teacher-mobile-primary;
}

.check-dot::before {
  position: absolute;
  top: 8rpx;
  left: 8rpx;
  width: 12rpx;
  height: 7rpx;
  border-left: 3rpx solid currentColor;
  border-bottom: 3rpx solid currentColor;
  content: '';
  transform: rotate(-45deg);
}

.continue-line {
  justify-content: center;
  gap: 10rpx;
  margin-top: 26rpx;
  padding-top: 22rpx;
  border-top: 1rpx solid rgba(207, 216, 230, 0.65);
  color: $teacher-mobile-primary-dark;
  font-size: 28rpx;
  font-weight: 900;
}

.chat-small {
  width: 24rpx;
  height: 18rpx;
  border: 3rpx solid currentColor;
  border-radius: 8rpx;
}

.supplement-panel {
  padding: 0 2rpx;
}

.panel-title {
  margin-bottom: 12rpx;
  color: #657189;
  font-size: 26rpx;
}

.supplement-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14rpx;
}

.supplement-item {
  justify-content: center;
  gap: 10rpx;
  min-height: 68rpx;
  border: 1rpx solid #e3e9f2;
  border-radius: 16rpx;
  background: #fff;
  color: #263247;
  font-size: 24rpx;
  font-weight: 800;
}

.supplement-icon {
  width: 26rpx;
  height: 26rpx;
  border-radius: 6rpx;
  background: $teacher-mobile-primary;
}

.composer-card {
  padding: 22rpx;
}

.composer-row {
  gap: 14rpx;
}

.plus-button {
  position: relative;
  width: 70rpx;
  height: 70rpx;
  flex: 0 0 auto;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 10rpx 26rpx rgba(35, 51, 87, 0.08);
  color: $teacher-mobile-primary;
}

.plus-button::before,
.plus-button::after {
  top: 32rpx;
  left: 20rpx;
  width: 30rpx;
  height: 6rpx;
  border-radius: 999rpx;
}

.input-box {
  min-width: 0;
  height: 70rpx;
  flex: 1;
  gap: 12rpx;
  padding: 0 22rpx;
  border: 2rpx solid #d5deeb;
  border-radius: 999rpx;
  background: #fff;
  color: #9aa5b6;
  font-size: 26rpx;
}

.mic-icon {
  width: 20rpx;
  height: 30rpx;
  flex: 0 0 auto;
  border-radius: 999rpx;
  background: #1f2a44;
}

.draft-button {
  width: 220rpx;
  height: 70rpx;
  flex: 0 0 auto;
  border-radius: 16rpx;
  font-size: 28rpx;
}

.clue-count {
  gap: 8rpx;
  margin: 20rpx 0 0 132rpx;
  color: #657189;
  font-size: 25rpx;
}

.count {
  color: $teacher-mobile-primary-dark;
  font-size: 34rpx;
  font-weight: 900;
}

@media (max-width: 374px) {
  .hero,
  .content {
    padding-right: 18rpx;
    padding-left: 18rpx;
  }

  .mode-card,
  .chat-card,
  .clue-card,
  .composer-card {
    padding: 22rpx;
  }

  .mode-head {
    gap: 14rpx;
  }

  .mode-pill {
    padding: 10rpx 18rpx;
    font-size: 25rpx;
  }

  .folder-art {
    width: 74rpx;
    height: 72rpx;
  }

  .mode-foot {
    align-items: flex-start;
    flex-direction: column;
  }

  .bubble {
    max-width: 252rpx;
    padding: 16rpx 20rpx;
    font-size: 23rpx;
  }

  .bubble--user {
    max-width: 230rpx;
  }

  .quick-row {
    gap: 10rpx;
    margin-left: 66rpx;
  }

  .quick-chip {
    padding: 8rpx 14rpx;
    font-size: 21rpx;
  }

  .supplement-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .composer-row {
    flex-wrap: wrap;
  }

  .plus-button {
    width: 62rpx;
    height: 62rpx;
  }

  .input-box {
    height: 62rpx;
    flex-basis: calc(100% - 82rpx);
    font-size: 23rpx;
  }

  .draft-button {
    width: calc(100% - 82rpx);
    height: 64rpx;
    margin-left: 82rpx;
    font-size: 25rpx;
  }

  .clue-count {
    margin-left: 82rpx;
  }
}
</style>
