<script setup lang="ts">
import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobileNavbar from '../../../components/MobileNavbar.vue'

const practiceTags = ['开发联调', '接口测试', '问题定位', '技术记录']

const attachments = [
  { name: '项目文档.pdf', size: '800KB', type: 'pdf' },
  { name: '接口测试记录.jpg', size: '1.2MB', type: 'image' },
]

function goBack() {
  uni.navigateBack()
}

function showToast(title: string) {
  uni.showToast({ title, icon: 'none' })
}

function showPracticeFeedback() {
  uni.showToast({ title: '所属实践为本地模拟，可返回实践日志查看上下文', icon: 'none' })
}

function goEnterpriseLogList() {
  uni.navigateBack()
}
</script>

<template>
  <view class="workflow-page">
    <MobileNavbar title="日志详情" size="regular" @back="goBack">
      <template #right>
        <button class="share-action" @tap="showToast('分享日志')">
          <view class="share-icon"></view>
          <text>分享</text>
        </button>
      </template>
    </MobileNavbar>

    <view class="content">
      <MobileCard class="hero-card">
        <view class="hero-meta">
          <view class="calendar-icon"></view>
          <text>2026-05-15</text>
          <text class="divider">|</text>
          <text>第 3 条日志</text>
        </view>
        <text class="hero-title">学习开发联调流程，整理接口测试注意事项</text>
        <text class="archive-tag">已归档</text>
        <text class="archive-time">归档时间：2026-05-29 14:20</text>
        <view class="hero-art">
          <view class="paper"></view>
          <view class="check-dot"></view>
        </view>
      </MobileCard>

      <MobileCard class="practice-card">
        <view class="section-head">
          <view class="section-icon section-icon--building"></view>
          <text class="section-title">所属实践</text>
        </view>
        <view class="practice-row" @tap="showPracticeFeedback">
          <view class="mini-icon mini-icon--building"></view>
          <text class="practice-title">山东某智能装备有限公司企业实践</text>
          <wd-icon name="chevron-right" size="24rpx" color="#7b8495" />
        </view>
        <view class="practice-meta">
          <view class="mini-icon mini-icon--bag"></view>
          <text>软件开发工程师</text>
          <text class="divider">|</text>
          <text>2026-05-10 至 2026-05-20</text>
          <text class="divider">|</text>
          <text>10 天</text>
        </view>
      </MobileCard>

      <MobileCard class="content-card">
        <view class="section-head">
          <view class="section-icon section-icon--doc"></view>
          <text class="section-title">日志内容</text>
        </view>
        <text class="body-text">
          今天主要跟随企业工程师了解项目开发联调流程，重点学习接口测试、问题定位和联调记录方式。过程中整理了接口测试注意事项，并记录了现场常见问题的处理方式。
        </text>
      </MobileCard>

      <MobileCard class="tags-card">
        <view class="section-head">
          <view class="section-icon section-icon--star"></view>
          <text class="section-title">实践要点</text>
        </view>
        <view class="tag-row">
          <text v-for="tag in practiceTags" :key="tag" class="tag">{{ tag }}</text>
        </view>
      </MobileCard>

      <MobileCard class="attachment-card">
        <view class="section-head attachment-head">
          <view class="section-icon section-icon--clip"></view>
          <text class="section-title">附件资料</text>
          <text class="attachment-count">（2）</text>
          <button class="download-all" @tap="showToast('全部下载')">
            <text>全部下载</text>
            <view class="download-icon"></view>
          </button>
        </view>

        <view class="attachment-list">
          <view v-for="item in attachments" :key="item.name" class="attachment-row">
            <view class="file-icon" :class="`file-icon--${item.type}`"></view>
            <view class="file-copy">
              <text class="file-name">{{ item.name }}</text>
              <text class="file-size">{{ item.size }}</text>
            </view>
            <MobileActionButton class="view-button" variant="outline" @tap="showToast(`查看${item.name}`)">查看</MobileActionButton>
          </view>
        </view>
      </MobileCard>

      <MobileCard class="ai-card">
        <view class="section-head">
          <view class="section-icon section-icon--bot"></view>
          <text class="section-title">AI 整理摘要</text>
        </view>
        <view class="ai-summary">
          <text>本条日志可支撑“开发联调流程学习”和“企业项目案例整理”相关实践总结内容。</text>
        </view>
        <view class="bot-art"></view>
      </MobileCard>

      <MobileCard class="archive-card">
        <view class="section-head">
          <view class="section-icon section-icon--shield"></view>
          <text class="section-title">归档说明</text>
        </view>
        <text class="body-text archive-text">
          该日志已随本次企业实践归档，作为实践过程记录保存，可作为能力证据被引用。
        </text>
      </MobileCard>

      <MobileActionButton class="return-button" variant="primary" @tap="goEnterpriseLogList">
        返回实践日志
      </MobileActionButton>
    </view>
  </view>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.workflow-page {
  min-height: 100vh;
  padding-bottom: calc(62rpx + env(safe-area-inset-bottom));
  overflow-x: hidden;
  background: linear-gradient(180deg, #ffffff 0%, #f9fbfd 45%, #f8fbf9 100%);
  color: #10172d;
}

.share-action {
  display: flex;
  align-items: center;
  gap: 14rpx;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  color: #111827;
  font-size: 29rpx;
  font-weight: 800;
  line-height: 1;
}

.share-action::after {
  display: none;
}

.share-icon {
  position: relative;
  width: 32rpx;
  height: 32rpx;
}

.share-icon::before,
.share-icon::after {
  position: absolute;
  content: '';
}

.share-icon::before {
  left: 3rpx;
  top: 12rpx;
  width: 24rpx;
  height: 10rpx;
  border-top: 4rpx solid currentColor;
  border-bottom: 4rpx solid currentColor;
  transform: rotate(-28deg);
}

.share-icon::after {
  left: 0;
  top: 4rpx;
  width: 9rpx;
  height: 9rpx;
  border-radius: 50%;
  background: currentColor;
  box-shadow: 24rpx -7rpx 0 currentColor, 24rpx 22rpx 0 currentColor;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 18rpx;
  padding: 24rpx 32rpx 0;
}

.hero-card,
.practice-card,
.content-card,
.tags-card,
.attachment-card,
.ai-card,
.archive-card {
  position: relative;
  overflow: hidden;
  border-radius: 18rpx;
  box-shadow: 0 14rpx 38rpx rgba(33, 50, 78, 0.06);
}

.hero-card {
  min-height: 218rpx;
  padding: 34rpx 240rpx 34rpx 28rpx;
}

.hero-meta,
.section-head,
.practice-row,
.practice-meta,
.attachment-row,
.download-all,
.return-button {
  display: flex;
  align-items: center;
}

.hero-meta {
  gap: 18rpx;
  color: #667089;
  font-size: 28rpx;
  line-height: 1;
}

.calendar-icon {
  position: relative;
  width: 28rpx;
  height: 28rpx;
  border: 3rpx solid currentColor;
  border-radius: 5rpx;
}

.calendar-icon::before {
  position: absolute;
  right: 4rpx;
  left: 4rpx;
  top: 8rpx;
  height: 3rpx;
  border-radius: 999rpx;
  background: currentColor;
  content: '';
}

.divider {
  color: #9ca6b8;
}

.hero-title,
.archive-tag,
.archive-time,
.section-title,
.practice-title,
.body-text,
.file-name,
.file-size,
.archive-text {
  display: block;
}

.hero-title {
  margin-top: 28rpx;
  color: #10172d;
  font-size: 34rpx;
  font-weight: 900;
  line-height: 1.35;
}

.archive-tag {
  width: fit-content;
  margin-top: 22rpx;
  padding: 9rpx 18rpx;
  border-radius: 8rpx;
  background: #0aa75d;
  color: #fff;
  font-size: 27rpx;
  font-weight: 900;
}

.archive-time {
  margin-top: 24rpx;
  color: #667089;
  font-size: 27rpx;
  line-height: 1.35;
}

.hero-art {
  position: absolute;
  right: 34rpx;
  top: 58rpx;
  width: 178rpx;
  height: 138rpx;
}

.paper {
  position: absolute;
  right: 30rpx;
  top: 0;
  width: 88rpx;
  height: 110rpx;
  border-radius: 12rpx;
  background: linear-gradient(180deg, #dff7ec, #effbf5);
  box-shadow: -22rpx 22rpx 0 rgba(31, 192, 113, 0.11);
  transform: rotate(6deg);
}

.paper::before {
  position: absolute;
  right: 20rpx;
  left: 20rpx;
  top: -14rpx;
  height: 24rpx;
  border-radius: 12rpx;
  background: #28bf73;
  content: '';
}

.paper::after {
  position: absolute;
  left: 24rpx;
  top: 36rpx;
  width: 42rpx;
  height: 8rpx;
  border-radius: 999rpx;
  background: #93dfb7;
  box-shadow: 0 25rpx 0 #b8ebcf, 0 50rpx 0 #b8ebcf;
  content: '';
}

.check-dot {
  position: absolute;
  right: 8rpx;
  bottom: 2rpx;
  width: 64rpx;
  height: 64rpx;
  border-radius: 50%;
  background: linear-gradient(135deg, #45d98c, #08ab5b);
  box-shadow: 0 12rpx 24rpx rgba(7, 178, 86, 0.18);
}

.check-dot::before {
  position: absolute;
  left: 18rpx;
  top: 22rpx;
  width: 26rpx;
  height: 14rpx;
  border-bottom: 8rpx solid #fff;
  border-left: 8rpx solid #fff;
  content: '';
  transform: rotate(-45deg);
}

.practice-card,
.content-card,
.tags-card,
.attachment-card,
.ai-card,
.archive-card {
  padding: 32rpx;
}

.section-head {
  gap: 18rpx;
}

.section-icon,
.mini-icon {
  position: relative;
  flex: 0 0 auto;
  color: #0ab562;
}

.section-icon {
  width: 34rpx;
  height: 34rpx;
}

.section-icon::before,
.section-icon::after,
.mini-icon::before,
.mini-icon::after {
  position: absolute;
  content: '';
}

.section-title {
  flex: 1;
  color: #10172d;
  font-size: 34rpx;
  font-weight: 900;
}

.section-icon--building::before {
  inset: 3rpx 6rpx 0;
  border: 4rpx solid currentColor;
  border-bottom-width: 6rpx;
}

.section-icon--doc::before {
  inset: 2rpx 7rpx;
  border-radius: 4rpx;
  background: currentColor;
}

.section-icon--doc::after {
  left: 15rpx;
  top: 12rpx;
  width: 12rpx;
  height: 4rpx;
  border-radius: 999rpx;
  background: #fff;
  box-shadow: 0 9rpx 0 #fff;
}

.section-icon--star::before {
  inset: 4rpx;
  border-radius: 4rpx;
  background: currentColor;
}

.section-icon--star::after {
  left: 12rpx;
  top: 8rpx;
  width: 10rpx;
  height: 10rpx;
  background: #fff;
  clip-path: polygon(50% 0, 62% 36%, 100% 36%, 68% 58%, 80% 100%, 50% 74%, 20% 100%, 32% 58%, 0 36%, 38% 36%);
}

.section-icon--clip::before {
  left: 8rpx;
  top: 1rpx;
  width: 15rpx;
  height: 31rpx;
  border: 5rpx solid currentColor;
  border-radius: 16rpx;
  transform: rotate(42deg);
}

.section-icon--bot::before {
  left: 4rpx;
  top: 10rpx;
  width: 26rpx;
  height: 21rpx;
  border-radius: 10rpx;
  background: currentColor;
}

.section-icon--bot::after {
  left: 14rpx;
  top: 2rpx;
  width: 6rpx;
  height: 11rpx;
  border-radius: 999rpx;
  background: currentColor;
  box-shadow: -9rpx 18rpx 0 -2rpx #fff, 9rpx 18rpx 0 -2rpx #fff;
}

.section-icon--shield::before {
  inset: 1rpx 5rpx;
  border-radius: 8rpx 8rpx 14rpx 14rpx;
  background: currentColor;
  clip-path: polygon(50% 0, 100% 18%, 100% 58%, 50% 100%, 0 58%, 0 18%);
}

.section-icon--shield::after {
  left: 12rpx;
  top: 12rpx;
  width: 11rpx;
  height: 7rpx;
  border-bottom: 4rpx solid #fff;
  border-left: 4rpx solid #fff;
  transform: rotate(-45deg);
}

.practice-row {
  gap: 14rpx;
  margin-top: 26rpx;
}

.mini-icon {
  width: 28rpx;
  height: 28rpx;
  color: #667089;
}

.mini-icon--building::before {
  inset: 5rpx 6rpx 0;
  border: 3rpx solid currentColor;
}

.mini-icon--bag::before {
  inset: 9rpx 2rpx 3rpx;
  border: 3rpx solid currentColor;
  border-radius: 4rpx;
}

.practice-title {
  min-width: 0;
  flex: 1;
  color: #10172d;
  font-size: 28rpx;
  font-weight: 900;
  line-height: 1.35;
}

.chevron {
  width: 18rpx;
  height: 18rpx;
  flex: 0 0 auto;
  border-top: 4rpx solid #7c8798;
  border-right: 4rpx solid #7c8798;
  transform: rotate(45deg);
}

.practice-meta {
  flex-wrap: wrap;
  gap: 14rpx;
  margin-top: 18rpx;
  color: #667089;
  font-size: 26rpx;
}

.body-text {
  margin-top: 22rpx;
  color: #121a2b;
  font-size: 28rpx;
  line-height: 1.72;
}

.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 18rpx;
  margin-top: 26rpx;
}

.tag {
  padding: 13rpx 24rpx;
  border-radius: 999rpx;
  background: #e6f8ef;
  color: #087a42;
  font-size: 26rpx;
  font-weight: 800;
  line-height: 1.1;
}

.attachment-head {
  gap: 12rpx;
}

.attachment-count {
  color: #667089;
  font-size: 30rpx;
  font-weight: 900;
}

.download-all {
  gap: 14rpx;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  color: #667089;
  font-size: 26rpx;
  font-weight: 800;
}

.download-all::after {
  display: none;
}

.download-icon {
  position: relative;
  width: 26rpx;
  height: 28rpx;
  border-bottom: 4rpx solid currentColor;
}

.download-icon::before {
  position: absolute;
  left: 11rpx;
  top: 0;
  width: 4rpx;
  height: 19rpx;
  border-radius: 999rpx;
  background: currentColor;
  content: '';
}

.download-icon::after {
  position: absolute;
  left: 7rpx;
  top: 12rpx;
  width: 12rpx;
  height: 12rpx;
  border-right: 4rpx solid currentColor;
  border-bottom: 4rpx solid currentColor;
  content: '';
  transform: rotate(45deg);
}

.attachment-list {
  margin-top: 24rpx;
}

.attachment-row {
  gap: 20rpx;
  min-height: 94rpx;
  padding: 8rpx 0;
}

.attachment-row + .attachment-row {
  border-top: 1rpx solid #edf1f6;
}

.file-icon {
  position: relative;
  width: 44rpx;
  height: 54rpx;
  flex: 0 0 auto;
  border-radius: 7rpx;
}

.file-icon::before {
  position: absolute;
  right: 0;
  top: 0;
  border-width: 0 0 14rpx 14rpx;
  border-style: solid;
  border-color: transparent transparent rgba(255, 255, 255, 0.58) transparent;
  content: '';
}

.file-icon::after {
  position: absolute;
  left: 11rpx;
  top: 24rpx;
  color: #fff;
  font-size: 18rpx;
  font-weight: 900;
  line-height: 1;
}

.file-icon--pdf {
  background: linear-gradient(135deg, #ff6b55, #ef3f30);
}

.file-icon--pdf::after {
  content: 'PDF';
}

.file-icon--image {
  background: linear-gradient(135deg, #5b9cff, #1f70e8);
}

.file-icon--image::after {
  left: 9rpx;
  top: 28rpx;
  width: 24rpx;
  height: 12rpx;
  background: #fff;
  clip-path: polygon(0 100%, 28% 48%, 46% 72%, 68% 28%, 100% 100%);
  content: '';
}

.file-copy {
  min-width: 0;
  flex: 1;
}

.file-name {
  color: #10172d;
  font-size: 28rpx;
  font-weight: 900;
  line-height: 1.2;
}

.file-size {
  margin-top: 10rpx;
  color: #667089;
  font-size: 25rpx;
}

.view-button {
  width: 116rpx;
  height: 55rpx;
  flex: 0 0 auto;
  border-radius: 10rpx;
  font-size: 26rpx;
}

.ai-card {
  min-height: 176rpx;
  padding-right: 180rpx;
  background: linear-gradient(100deg, #effbf6 0%, #f7fffb 100%);
}

.ai-summary {
  margin-top: 24rpx;
  padding: 22rpx;
  border: 1rpx solid #bcebd4;
  border-radius: 9rpx;
  background: rgba(255, 255, 255, 0.58);
  color: #263349;
  font-size: 26rpx;
  line-height: 1.58;
}

.bot-art {
  position: absolute;
  right: 34rpx;
  bottom: 24rpx;
  width: 114rpx;
  height: 112rpx;
  border-radius: 24rpx;
  background: rgba(23, 185, 106, 0.12);
}

.bot-art::before {
  position: absolute;
  left: 18rpx;
  top: 24rpx;
  width: 78rpx;
  height: 60rpx;
  border-radius: 18rpx;
  background: #ccefdc;
  content: '';
}

.bot-art::after {
  position: absolute;
  left: 40rpx;
  top: 48rpx;
  width: 9rpx;
  height: 9rpx;
  border-radius: 50%;
  background: #fff;
  box-shadow: 28rpx 0 0 #fff;
  content: '';
}

.archive-card {
  padding-bottom: 34rpx;
}

.archive-text {
  padding-left: 42rpx;
  color: #5d687c;
}

.return-button {
  width: 100%;
  height: 82rpx;
  margin-top: 8rpx;
  border-radius: 12rpx;
  font-size: 31rpx;
}

@media (max-width: 430px) {
  .content {
    gap: 16rpx;
    padding-right: 18rpx;
    padding-left: 18rpx;
  }

  .hero-card {
    padding-right: 186rpx;
  }

  .hero-art {
    right: 14rpx;
    transform: scale(0.86);
    transform-origin: right top;
  }

  .hero-title,
  .section-title {
    font-size: 29rpx;
  }

  .hero-meta,
  .archive-time,
  .body-text,
  .practice-title,
  .ai-summary {
    font-size: 25rpx;
  }

  .practice-card,
  .content-card,
  .tags-card,
  .attachment-card,
  .ai-card,
  .archive-card {
    padding: 24rpx 24rpx;
  }

  .tag {
    padding: 11rpx 20rpx;
    font-size: 24rpx;
  }

  .ai-card {
    padding-right: 142rpx;
  }

  .bot-art {
    right: 18rpx;
    transform: scale(0.82);
    transform-origin: right bottom;
  }

  .return-button {
    height: 74rpx;
    font-size: 28rpx;
  }
}

@media (max-width: 374px) {
  .hero-card {
    padding-right: 150rpx;
  }

  .hero-art {
    transform: scale(0.7);
  }

  .practice-meta,
  .file-size,
  .download-all {
    font-size: 23rpx;
  }

  .view-button {
    width: 100rpx;
  }

  .ai-card {
    padding-right: 116rpx;
  }

  .bot-art {
    transform: scale(0.66);
  }
}
</style>
