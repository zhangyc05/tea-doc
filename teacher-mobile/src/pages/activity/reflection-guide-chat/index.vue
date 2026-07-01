<script setup lang="ts">
import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobileNavbar from '../../../components/MobileNavbar.vue'
import MobileTabBar from '../../../components/MobileTabBar.vue'

const firstOptions = ['知识点偏难', '提问设计少', '学生还不熟悉', '我来说说']
const secondOptions = ['增加开放式问题', '先让学生讨论', '结合企业案例', '语音回答']

function goBack() {
  uni.navigateBack()
}
</script>

<template>
  <view class="reflection-guide-page">
    <view class="hero">
      <MobileNavbar title="教学反思" size="compact" @back="goBack" />
      <text class="hero__subtitle">AI 正在根据已选依据引导您整理反思</text>
    </view>

    <view class="content">
      <MobileCard class="evidence-card">
        <view class="evidence-title">
          <text>已选</text>
          <text class="count">2</text>
          <text>份依据</text>
        </view>
        <view class="tags">
          <text class="tag">课堂分析报告</text>
          <text class="tag">课堂录音</text>
        </view>
        <view class="lesson-line">
          <text>《智能制造基础》第 5 次课</text>
        </view>
        <view class="evidence-bottom">
          <text>2026-03-18　|　智能制造 2301 班</text>
          <MobileActionButton class="add-button" variant="outline" arrow>查看 / 添加依据</MobileActionButton>
        </view>
      </MobileCard>

      <MobileCard class="chat-card">
        <view class="message-row message-row--ai">
          <view class="bot-avatar"></view>
          <view class="bubble bubble--ai">
            <text>我已查看课堂分析报告和课堂录音。本次课前 20 分钟以讲授为主，课堂录音中学生主动回应较少。</text>
          </view>
        </view>

        <view class="message-row message-row--ai">
          <view class="bot-avatar"></view>
          <view class="bubble bubble--ai">
            <text>我们先从这里开始：你觉得学生互动偏少，主要原因是什么？</text>
          </view>
        </view>

        <view class="quick-row">
          <text v-for="item in firstOptions" :key="item" class="quick-chip">{{ item }}</text>
        </view>

        <view class="message-row message-row--user">
          <view class="bubble bubble--user">
            <text>提问设计少，问题比较封闭。</text>
          </view>
          <view class="user-avatar"></view>
        </view>

        <view class="message-row message-row--ai">
          <view class="bot-avatar"></view>
          <view class="bubble bubble--ai bubble--short">
            <text>明白了。那下次这部分内容，你准备怎么调整提问方式？</text>
          </view>
        </view>

        <view class="quick-row">
          <text v-for="item in secondOptions" :key="item" class="quick-chip">{{ item }}</text>
        </view>
      </MobileCard>

      <MobileCard class="summary-card">
        <view class="summary-head">
          <view class="summary-icon"></view>
          <text class="summary-title">已整理反思要点</text>
          <view class="expand-button">
            <text>展开全部</text>
            <view class="down-icon"></view>
          </view>
        </view>
        <view class="point-row">
          <text class="point-index">1</text>
          <text>本次课讲授较充分，但学生互动不足</text>
        </view>
        <view class="point-row">
          <text class="point-index">2</text>
          <text>下次可增加开放式提问和案例讨论</text>
        </view>
        <text class="summary-note">AI 会继续根据您的补充完善草稿</text>
      </MobileCard>
    </view>

    <view class="input-panel">
      <text class="input-tip">可以点选，也可以语音说一说</text>
      <view class="input-row">
        <view class="voice-button">
          <view class="mic-icon"></view>
          <text>按住说话</text>
        </view>
        <view class="text-input">输入一句想法...</view>
        <view class="plus-button"></view>
      </view>
      <text class="input-note">可添加：选择更多报告 / 上传教学资料 / 录制课堂音频</text>
    </view>

    <view class="draft-actions">
      <view class="draft-copy">
        <text>已整理</text>
        <text class="draft-count">2</text>
        <text>个要点</text>
      </view>
      <MobileActionButton class="draft-button" variant="primary">生成反思草稿 ✨</MobileActionButton>
    </view>

    <MobileTabBar active="activity" />
  </view>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.reflection-guide-page {
  min-height: 100vh;
  padding-bottom: calc(420rpx + env(safe-area-inset-bottom));
  background: linear-gradient(180deg, #ffffff 0%, #f8fbff 46%, #f5f9ff 100%);
  color: $teacher-mobile-text-primary;
}

.hero {
  padding: calc(var(--status-bar-height) + 14rpx) 28rpx 20rpx;
}

.hero__subtitle {
  display: block;
  margin-top: 8rpx;
  color: #53617b;
  font-size: 27rpx;
  line-height: 1.45;
  text-align: center;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 18rpx;
  padding: 0 28rpx;
}

.evidence-card,
.chat-card,
.summary-card {
  padding: 28rpx;
}

.evidence-title,
.tags,
.evidence-bottom,
.message-row,
.quick-row,
.summary-head,
.expand-button,
.point-row,
.input-row,
.draft-actions,
.draft-copy,
.voice-button {
  display: flex;
  align-items: center;
}

.evidence-title {
  gap: 10rpx;
  color: #10172d;
  font-size: 30rpx;
  font-weight: 900;
}

.count,
.draft-count {
  color: $teacher-mobile-primary-dark;
  font-size: 46rpx;
  line-height: 1;
}

.tags {
  gap: 12rpx;
  margin-top: 18rpx;
}

.tag {
  padding: 9rpx 16rpx;
  border: 1rpx solid rgba(14, 193, 101, 0.28);
  border-radius: 10rpx;
  background: #effcf5;
  color: $teacher-mobile-primary-dark;
  font-size: 24rpx;
  font-weight: 700;
}

.lesson-line {
  margin-top: 20rpx;
  color: #10172d;
  font-size: 30rpx;
  font-weight: 900;
}

.evidence-bottom {
  justify-content: space-between;
  gap: 14rpx;
  margin-top: 16rpx;
  color: #53617b;
  font-size: 25rpx;
}

.add-button {
  width: 190rpx;
  height: 56rpx;
  flex: 0 0 auto;
  font-size: 24rpx;
}

.chat-card {
  padding-bottom: 24rpx;
}

.message-row {
  gap: 18rpx;
  margin-bottom: 22rpx;
}

.message-row--ai {
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
  max-width: 606rpx;
  padding: 20rpx 26rpx;
  border-radius: 12rpx;
  font-size: 28rpx;
  line-height: 1.55;
}

.bubble--ai {
  background: linear-gradient(135deg, #f0fff6, #f8fffb);
  color: #263247;
}

.bubble--short {
  max-width: 520rpx;
}

.bubble--user {
  max-width: 420rpx;
  background: linear-gradient(135deg, #ecfff4, #f7fffb);
  color: #263247;
}

.quick-row {
  flex-wrap: wrap;
  gap: 14rpx 18rpx;
  margin: -8rpx 0 24rpx 74rpx;
}

.quick-chip {
  padding: 9rpx 22rpx;
  border: 1rpx solid rgba(14, 193, 101, 0.26);
  border-radius: 10rpx;
  background: #fff;
  color: $teacher-mobile-primary-dark;
  font-size: 25rpx;
  font-weight: 800;
}

.summary-head {
  gap: 18rpx;
}

.summary-icon {
  position: relative;
  width: 48rpx;
  height: 48rpx;
  flex: 0 0 auto;
  border-radius: 12rpx;
  background: #e9fbf1;
  color: $teacher-mobile-primary;
}

.summary-icon::before {
  position: absolute;
  inset: 10rpx 13rpx;
  border: 4rpx solid currentColor;
  border-radius: 5rpx;
  content: '';
}

.summary-title {
  flex: 1;
  color: #10172d;
  font-size: 32rpx;
  font-weight: 900;
}

.expand-button {
  gap: 8rpx;
  padding: 12rpx 16rpx;
  border-radius: 12rpx;
  background: #eafaf2;
  color: $teacher-mobile-primary-dark;
  font-size: 24rpx;
  font-weight: 800;
}

.down-icon {
  width: 14rpx;
  height: 14rpx;
  border-right: 4rpx solid currentColor;
  border-bottom: 4rpx solid currentColor;
  transform: rotate(45deg);
}

.point-row {
  gap: 16rpx;
  margin-top: 20rpx;
  color: #263247;
  font-size: 26rpx;
  line-height: 1.35;
}

.point-index {
  display: flex;
  width: 28rpx;
  height: 28rpx;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: $teacher-mobile-primary;
  color: #fff;
  font-size: 20rpx;
  font-weight: 900;
}

.summary-note {
  display: block;
  margin-top: 24rpx;
  color: #9aa5b6;
  font-size: 24rpx;
}

.input-panel {
  position: fixed;
  right: 0;
  bottom: calc(246rpx + env(safe-area-inset-bottom));
  left: 0;
  z-index: 46;
  padding: 14rpx 28rpx 18rpx;
  background: rgba(248, 252, 255, 0.92);
  backdrop-filter: blur(12rpx);
}

.input-tip,
.input-note {
  display: block;
  color: #657189;
  font-size: 24rpx;
  line-height: 1.35;
}

.input-row {
  gap: 14rpx;
  margin-top: 12rpx;
}

.voice-button {
  width: 126rpx;
  height: 78rpx;
  flex: 0 0 auto;
  flex-direction: column;
  justify-content: center;
  gap: 4rpx;
  border-radius: 999rpx;
  background: #e8fbf1;
  color: $teacher-mobile-primary-dark;
  font-size: 21rpx;
  font-weight: 800;
}

.mic-icon {
  position: relative;
  width: 26rpx;
  height: 30rpx;
}

.mic-icon::before {
  position: absolute;
  top: 0;
  left: 8rpx;
  width: 12rpx;
  height: 20rpx;
  border-radius: 999rpx;
  background: $teacher-mobile-primary;
  content: '';
}

.text-input {
  height: 76rpx;
  min-width: 0;
  flex: 1;
  display: flex;
  align-items: center;
  padding: 0 28rpx;
  border: 2rpx solid #cfd8e6;
  border-radius: 999rpx;
  background: #fff;
  color: #a3adbd;
  font-size: 27rpx;
}

.plus-button {
  position: relative;
  width: 76rpx;
  height: 76rpx;
  flex: 0 0 auto;
  border: 2rpx solid #cfd8e6;
  border-radius: 50%;
  background: #fff;
  color: $teacher-mobile-primary;
}

.plus-button::before,
.plus-button::after {
  position: absolute;
  top: 35rpx;
  left: 22rpx;
  width: 32rpx;
  height: 6rpx;
  border-radius: 999rpx;
  background: currentColor;
  content: '';
}

.plus-button::after {
  transform: rotate(90deg);
}

.input-note {
  margin-top: 10rpx;
  padding-left: 160rpx;
  color: #9aa5b6;
}

.draft-actions {
  position: fixed;
  right: 24rpx;
  bottom: calc(142rpx + env(safe-area-inset-bottom));
  left: 24rpx;
  z-index: 47;
  justify-content: space-between;
  gap: 18rpx;
  padding: 22rpx 24rpx;
  border-radius: 22rpx;
  background: rgba(255, 255, 255, 0.94);
  box-shadow: 0 14rpx 36rpx rgba(35, 51, 87, 0.1);
  backdrop-filter: blur(12rpx);
}

.draft-copy {
  gap: 8rpx;
  color: #10172d;
  font-size: 30rpx;
  font-weight: 800;
}

.draft-button {
  width: 300rpx;
  height: 70rpx;
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

  .evidence-card,
  .chat-card,
  .summary-card {
    padding: 22rpx;
  }

  .evidence-bottom {
    align-items: flex-start;
    flex-direction: column;
  }

  .add-button {
    width: 174rpx;
  }

  .bubble {
    max-width: 254rpx;
    padding: 16rpx 20rpx;
    font-size: 23rpx;
  }

  .quick-row {
    gap: 10rpx;
    margin-left: 66rpx;
  }

  .quick-chip {
    padding: 8rpx 14rpx;
    font-size: 21rpx;
  }

  .input-panel {
    padding-right: 18rpx;
    padding-left: 18rpx;
  }

  .voice-button {
    width: 94rpx;
    height: 68rpx;
    font-size: 18rpx;
  }

  .text-input,
  .plus-button {
    height: 68rpx;
  }

  .plus-button {
    width: 68rpx;
  }

  .input-note {
    padding-left: 112rpx;
    font-size: 20rpx;
  }

  .draft-actions {
    right: 10rpx;
    left: 10rpx;
    gap: 10rpx;
    padding: 18rpx 14rpx;
  }

  .draft-copy {
    font-size: 24rpx;
  }

  .draft-button {
    width: 204rpx;
    font-size: 24rpx;
  }
}
</style>
