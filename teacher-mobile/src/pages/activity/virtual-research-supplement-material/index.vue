<script setup lang="ts">
import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobileNavbar from '../../../components/MobileNavbar.vue'
import {
  addSupplementMaterial,
  getMobileVirtualResearchState,
  saveSupplementDraft,
  submitSupplementMaterial,
} from '../../../domain/virtualResearch'
import MobileTabBar from '../../../components/MobileTabBar.vue'

const supplementItems = [
  {
    title: '设备调试案例整理',
    desc: '请补充案例文档或过程截图',
    icon: 'doc',
  },
  {
    title: '发言与案例补充',
    desc: '请补充一句说明，说明你补充的案例内容',
    icon: 'message',
  },
]

const evidenceItems = [
  { title: '会议纪要', status: '已同步', icon: 'note' },
  { title: '任务分工', status: '已同步', icon: 'group' },
  { title: '发言摘录', status: '已同步', icon: 'message' },
]

const virtualResearchState = getMobileVirtualResearchState()

function goBack() {
  uni.navigateBack()
}

function showToast(title: string) {
  uni.showToast({ title, icon: 'none' })
}

function handleSupplementUpload(source: '上传' | '拍照') {
  const material = addSupplementMaterial(source)
  uni.showToast({ title: `${material.name} 已加入`, icon: 'none' })
}

function saveDraft() {
  saveSupplementDraft()
  uni.showToast({ title: '补充材料草稿已保存', icon: 'none' })
}

function submitAgain() {
  submitSupplementMaterial()
  uni.navigateTo({ url: '/pages/activity/virtual-research-resubmitted/index' })
}
</script>

<template>
  <view class="supplement-page">
    <MobileNavbar title="需要补充材料" size="compact" @back="goBack" />
    <text class="nav-subtitle">请补充教研过程材料后重新提交归档</text>

    <view class="content">
      <MobileCard class="activity-card">
        <view class="activity-illustration">
          <view class="board-art"></view>
          <view class="people-art people-art--left"></view>
          <view class="people-art people-art--right"></view>
        </view>
        <view class="activity-copy">
          <view class="activity-head">
            <text class="section-title">本次教研活动</text>
            <text class="status-chip">待补充</text>
          </view>
          <text class="activity-title">智能制造课程资源共建研讨</text>
          <view class="meta-row">
            <view class="meta-icon meta-icon--calendar"></view>
            <text>2026-05-22 14:00-16:30</text>
          </view>
          <view class="meta-row">
            <view class="meta-icon meta-icon--video"></view>
            <text>腾讯会议</text>
            <text class="divider">|</text>
            <text>智能制造课程虚拟教研室</text>
          </view>
        </view>
      </MobileCard>

      <MobileCard class="return-card">
        <view class="card-icon card-icon--return"></view>
        <view class="return-copy">
          <text class="section-title">退回说明</text>
          <view class="return-list">
            <text>退回人：智能制造学院教研秘书</text>
            <text>退回时间：2026-05-24 10:20</text>
            <text>退回原因：部分贡献缺少过程材料支撑</text>
          </view>
        </view>
      </MobileCard>

      <MobileCard class="section-card">
        <text class="section-title">需要补充</text>
        <view class="supplement-list">
          <button
            v-for="item in supplementItems"
            :key="item.title"
            class="supplement-row"
            @tap="showToast(item.title)"
          >
            <view class="row-icon" :class="`row-icon--${item.icon}`"></view>
            <view class="row-copy">
              <text class="row-title">{{ item.title }}</text>
              <text class="row-desc">{{ item.desc }}</text>
            </view>
            <view class="row-arrow"></view>
          </button>
        </view>
      </MobileCard>

      <MobileCard class="section-card">
        <text class="section-title">已有依据</text>
        <view class="evidence-list">
          <view v-for="item in evidenceItems" :key="item.title" class="evidence-row">
            <view class="evidence-left">
              <view class="evidence-icon" :class="`evidence-icon--${item.icon}`"></view>
              <text>{{ item.title }}</text>
            </view>
            <text class="sync-chip">{{ item.status }}</text>
          </view>
        </view>
      </MobileCard>

      <MobileCard class="section-card material-card">
        <text class="section-title">补充材料</text>
        <view class="tool-grid">
          <button class="tool-button" @tap="handleSupplementUpload('上传')">
            <view class="tool-icon tool-icon--upload"></view>
            <text>上传资料</text>
          </button>
          <button class="tool-button" @tap="handleSupplementUpload('拍照')">
            <view class="tool-icon tool-icon--camera"></view>
            <text>拍照</text>
          </button>
          <button class="tool-button" @tap="showToast('语音说明')">
            <view class="tool-icon tool-icon--mic"></view>
            <text>语音说明</text>
          </button>
        </view>
        <view v-for="file in virtualResearchState.supplementMaterials" :key="file.id" class="evidence-row">
          <view class="evidence-left">
            <view class="evidence-icon evidence-icon--note"></view>
            <text>{{ file.name }}</text>
          </view>
          <text class="sync-chip">{{ file.source }} · {{ file.status }}</text>
        </view>
        <view class="textarea-box">
          <text class="textarea-label">补充说明</text>
          <textarea
            class="supplement-textarea"
            placeholder="可以补充一句你的实际参与内容，AI 会帮你整理成归档说明"
            placeholder-class="textarea-placeholder"
            maxlength="300"
          />
          <text class="counter">0/300</text>
        </view>
        <view class="ai-card">
          <view class="ai-icon"></view>
          <view class="ai-copy">
            <text class="ai-title">AI 已整理补充说明</text>
            <text class="ai-desc">你在本次教研中补充了企业设备调试案例，并整理形成课程资源组可复用的案例材料。</text>
          </view>
        </view>
      </MobileCard>
    </view>

    <view class="fixed-actions">
      <MobileActionButton class="action-button draft-button" variant="outline" @tap="saveDraft">
        保存草稿
      </MobileActionButton>
      <MobileActionButton class="action-button submit-button" variant="primary" @tap="submitAgain">
        重新提交
      </MobileActionButton>
    </view>

    <MobileTabBar active="activity" />
  </view>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.supplement-page {
  min-height: 100vh;
  padding-bottom: calc(270rpx + env(safe-area-inset-bottom));
  overflow-x: hidden;
  background:
    radial-gradient(circle at 84% 5%, rgba(224, 250, 239, 0.8), transparent 29%),
    linear-gradient(180deg, #fbfffd 0%, #fff 40%, #f8fbfa 100%);
  color: #10172d;
}

.nav-subtitle {
  display: block;
  margin: -6rpx 0 28rpx;
  color: #30466e;
  font-size: 26rpx;
  line-height: 1;
  text-align: center;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  padding: 0 28rpx 170rpx;
}

.activity-card,
.return-card,
.section-card {
  border-radius: 22rpx;
}

.activity-card,
.return-card {
  display: flex;
  align-items: center;
  gap: 30rpx;
  padding: 30rpx;
}

.activity-illustration,
.board-art,
.people-art,
.card-icon,
.meta-icon,
.row-icon,
.row-arrow,
.evidence-icon,
.tool-icon,
.ai-icon {
  position: relative;
  flex: 0 0 auto;
}

.activity-illustration {
  width: 142rpx;
  height: 142rpx;
  border-radius: 16rpx;
  background: linear-gradient(145deg, #e9fbf2, #f3fff8);
  color: #15bf70;
}

.board-art,
.people-art {
  position: absolute;
}

.board-art::before,
.board-art::after,
.people-art::after,
.card-icon::before,
.card-icon::after,
.meta-icon::before,
.meta-icon::after,
.row-icon::before,
.row-icon::after,
.row-arrow::before,
.evidence-icon::before,
.tool-icon::before,
.tool-icon::after,
.ai-icon::before,
.ai-icon::after {
  position: absolute;
  content: '';
}

.board-art {
  right: 22rpx;
  top: 30rpx;
  width: 70rpx;
  height: 50rpx;
  border-radius: 8rpx;
  background: currentColor;
}

.board-art::before {
  left: 14rpx;
  top: 16rpx;
  width: 9rpx;
  height: 9rpx;
  border-radius: 50%;
  background: #e8fff2;
  box-shadow: 20rpx 0 0 #e8fff2, 38rpx 0 0 #e8fff2;
}

.board-art::after {
  left: 26rpx;
  bottom: -16rpx;
  width: 16rpx;
  height: 17rpx;
  background: currentColor;
}

.people-art {
  bottom: 28rpx;
  width: 34rpx;
  height: 34rpx;
  border-radius: 50%;
  background: currentColor;
}

.people-art--left {
  left: 31rpx;
}

.people-art--right {
  right: 31rpx;
}

.people-art::after {
  left: -13rpx;
  top: 39rpx;
  width: 60rpx;
  height: 28rpx;
  border-radius: 30rpx 30rpx 8rpx 8rpx;
  background: currentColor;
}

.activity-copy {
  min-width: 0;
  flex: 1;
}

.activity-head,
.meta-row,
.supplement-row,
.evidence-row,
.evidence-left,
.tool-grid,
.tool-button,
.ai-card,
.fixed-actions {
  display: flex;
  align-items: center;
}

.activity-head {
  justify-content: space-between;
  gap: 18rpx;
}

.section-title,
.activity-title,
.row-title,
.row-desc,
.textarea-label,
.ai-title,
.ai-desc {
  display: block;
}

.section-title {
  color: #070d1d;
  font-size: 31rpx;
  font-weight: 900;
  line-height: 1.24;
}

.status-chip {
  flex: 0 0 auto;
  padding: 10rpx 20rpx;
  border-radius: 10rpx;
  background: #fff0df;
  color: #f06a00;
  font-size: 25rpx;
  font-weight: 900;
}

.activity-title {
  margin-top: 24rpx;
  color: #070d1d;
  font-size: 34rpx;
  font-weight: 900;
  line-height: 1.25;
}

.meta-row {
  gap: 16rpx;
  margin-top: 20rpx;
  color: #30466e;
  font-size: 28rpx;
  line-height: 1.25;
}

.divider {
  color: #75829b;
}

.meta-icon {
  width: 30rpx;
  height: 30rpx;
  color: #1f3f73;
}

.meta-icon--calendar::before {
  inset: 5rpx 3rpx 2rpx;
  border: 4rpx solid currentColor;
  border-radius: 4rpx;
}

.meta-icon--calendar::after {
  left: 9rpx;
  right: 9rpx;
  top: 1rpx;
  height: 10rpx;
  border-right: 4rpx solid currentColor;
  border-left: 4rpx solid currentColor;
}

.meta-icon--video::before {
  left: 1rpx;
  top: 8rpx;
  width: 18rpx;
  height: 15rpx;
  border: 4rpx solid currentColor;
  border-radius: 4rpx;
}

.meta-icon--video::after {
  right: 0;
  top: 11rpx;
  border-top: 6rpx solid transparent;
  border-bottom: 6rpx solid transparent;
  border-left: 9rpx solid currentColor;
}

.return-card {
  align-items: flex-start;
}

.card-icon {
  width: 84rpx;
  height: 84rpx;
  border-radius: 14rpx;
  background: #e8fbf0;
  color: #12b966;
}

.card-icon--return::before {
  left: 26rpx;
  top: 18rpx;
  width: 34rpx;
  height: 45rpx;
  border-radius: 6rpx;
  background: currentColor;
}

.card-icon--return::after {
  right: 18rpx;
  bottom: 18rpx;
  width: 22rpx;
  height: 22rpx;
  border: 5rpx solid #e8fbf0;
  border-radius: 50%;
  background: currentColor;
}

.return-copy {
  min-width: 0;
  flex: 1;
}

.return-list {
  display: flex;
  flex-direction: column;
  gap: 18rpx;
  margin-top: 22rpx;
  color: #30466e;
  font-size: 28rpx;
  line-height: 1.3;
}

.section-card {
  padding: 28rpx;
}

.supplement-list,
.evidence-list {
  margin-top: 22rpx;
  border: 1rpx solid #e1e8f1;
  border-radius: 14rpx;
  overflow: hidden;
}

.supplement-row {
  width: 100%;
  min-height: 86rpx;
  gap: 20rpx;
  margin: 0;
  padding: 16rpx 18rpx;
  border: 0;
  border-bottom: 1rpx solid #e8edf4;
  background: #fff;
  text-align: left;
}

.supplement-row:last-child,
.evidence-row:last-child {
  border-bottom: 0;
}

.supplement-row::after,
.tool-button::after {
  display: none;
}

.row-icon {
  width: 58rpx;
  height: 58rpx;
  border-radius: 12rpx;
  background: #e8fbf0;
  color: #12b966;
}

.row-icon::before {
  inset: 14rpx 17rpx;
  border-radius: 5rpx;
  background: currentColor;
}

.row-icon--doc::after {
  right: 16rpx;
  top: 14rpx;
  border-top: 12rpx solid #e8fbf0;
  border-left: 12rpx solid transparent;
}

.row-icon--message::before {
  inset: 17rpx 12rpx 18rpx;
  border-radius: 7rpx;
}

.row-icon--message::after {
  left: 22rpx;
  top: 27rpx;
  width: 5rpx;
  height: 5rpx;
  border-radius: 50%;
  background: #fff;
  box-shadow: 9rpx 0 0 #fff, 18rpx 0 0 #fff;
}

.row-copy {
  min-width: 0;
  flex: 1;
}

.row-title {
  color: #111827;
  font-size: 29rpx;
  font-weight: 900;
  line-height: 1.22;
}

.row-desc {
  margin-top: 8rpx;
  color: #30466e;
  font-size: 25rpx;
  line-height: 1.25;
}

.row-arrow {
  width: 18rpx;
  height: 18rpx;
  color: #52617d;
}

.row-arrow::before {
  inset: 0;
  border-top: 4rpx solid currentColor;
  border-right: 4rpx solid currentColor;
  transform: rotate(45deg);
}

.evidence-row {
  display: flex;
  min-height: 58rpx;
  align-items: center;
  justify-content: space-between;
  gap: 18rpx;
  padding: 0 20rpx;
  border-bottom: 1rpx solid #e8edf4;
  background: #fff;
  color: #111827;
  font-size: 27rpx;
}

.evidence-left {
  min-width: 0;
  gap: 18rpx;
}

.evidence-icon {
  width: 35rpx;
  height: 35rpx;
  border-radius: 7rpx;
  background: #e8fbf0;
  color: #12b966;
}

.evidence-icon::before {
  inset: 9rpx 11rpx;
  border-radius: 3rpx;
  background: currentColor;
}

.sync-chip {
  flex: 0 0 auto;
  padding: 6rpx 14rpx;
  border-radius: 8rpx;
  background: #e8fbf0;
  color: #08a85c;
  font-size: 23rpx;
  font-weight: 900;
}

.tool-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14rpx;
  margin-top: 22rpx;
}

.tool-button {
  justify-content: center;
  gap: 12rpx;
  height: 58rpx;
  margin: 0;
  padding: 0;
  border: 1rpx solid #e1e8f1;
  border-radius: 12rpx;
  background: #fff;
  color: #1f3f73;
  font-size: 25rpx;
}

.tool-icon {
  width: 30rpx;
  height: 30rpx;
  color: currentColor;
}

.tool-icon--upload::before {
  inset: 12rpx 3rpx 3rpx;
  border: 4rpx solid currentColor;
  border-radius: 10rpx;
}

.tool-icon--upload::after {
  left: 10rpx;
  top: 2rpx;
  width: 10rpx;
  height: 19rpx;
  background: currentColor;
  clip-path: polygon(50% 0, 100% 38%, 70% 38%, 70% 100%, 30% 100%, 30% 38%, 0 38%);
}

.tool-icon--camera::before {
  inset: 8rpx 2rpx 4rpx;
  border: 4rpx solid currentColor;
  border-radius: 5rpx;
}

.tool-icon--camera::after {
  left: 11rpx;
  top: 12rpx;
  width: 8rpx;
  height: 8rpx;
  border: 4rpx solid currentColor;
  border-radius: 50%;
}

.tool-icon--mic::before {
  left: 9rpx;
  top: 0;
  width: 12rpx;
  height: 20rpx;
  border: 4rpx solid currentColor;
  border-radius: 10rpx;
}

.tool-icon--mic::after {
  left: 5rpx;
  bottom: 0;
  width: 20rpx;
  height: 15rpx;
  border-right: 4rpx solid currentColor;
  border-bottom: 4rpx solid currentColor;
  border-left: 4rpx solid currentColor;
  border-radius: 0 0 12rpx 12rpx;
}

.textarea-box {
  position: relative;
  margin-top: 16rpx;
  border: 1rpx solid #e1e8f1;
  border-radius: 14rpx;
  background: #fff;
}

.textarea-label {
  padding: 18rpx 20rpx 0;
  color: #111827;
  font-size: 25rpx;
  font-weight: 900;
}

.supplement-textarea {
  width: 100%;
  height: 128rpx;
  box-sizing: border-box;
  padding: 16rpx 20rpx 28rpx;
  color: #111827;
  font-size: 26rpx;
  line-height: 1.42;
}

:deep(.textarea-placeholder) {
  color: #8a94a9;
}

.counter {
  position: absolute;
  right: 20rpx;
  bottom: 18rpx;
  color: #8a94a9;
  font-size: 22rpx;
}

.ai-card {
  align-items: flex-start;
  gap: 18rpx;
  margin-top: 18rpx;
  padding: 22rpx;
  border-radius: 14rpx;
  background: linear-gradient(110deg, #f3fffa, #eefbf5);
  color: #30466e;
}

.ai-icon {
  width: 40rpx;
  height: 40rpx;
  color: #08a85c;
}

.ai-icon::before {
  left: 2rpx;
  top: 7rpx;
  width: 24rpx;
  height: 24rpx;
  background: currentColor;
  clip-path: polygon(50% 0, 64% 36%, 100% 50%, 64% 64%, 50% 100%, 36% 64%, 0 50%, 36% 36%);
}

.ai-icon::after {
  right: 0;
  top: 0;
  width: 12rpx;
  height: 12rpx;
  background: currentColor;
  clip-path: polygon(50% 0, 64% 36%, 100% 50%, 64% 64%, 50% 100%, 36% 64%, 0 50%, 36% 36%);
}

.ai-copy {
  min-width: 0;
  flex: 1;
}

.ai-title {
  color: #08a85c;
  font-size: 27rpx;
  font-weight: 900;
}

.ai-desc {
  margin-top: 12rpx;
  color: #30466e;
  font-size: 25rpx;
  line-height: 1.45;
}

.fixed-actions {
  position: fixed;
  right: 0;
  bottom: calc(138rpx + env(safe-area-inset-bottom));
  left: 0;
  z-index: 40;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28rpx;
  padding: 20rpx 36rpx 22rpx;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12rpx);
}

.action-button {
  height: 74rpx;
  border-radius: 12rpx;
  font-size: 31rpx;
}

.draft-button {
  border-color: #08a85c;
  color: #08a85c;
}

.submit-button {
  background: linear-gradient(135deg, #13c86b, #02a950);
}

@media (max-width: 430px) {
  .supplement-page {
    padding-bottom: calc(244rpx + env(safe-area-inset-bottom));
  }

  .nav-subtitle {
    margin: -3rpx 0 18rpx;
    font-size: 22rpx;
  }

  .content {
    gap: 14rpx;
    padding-right: 20rpx;
    padding-left: 20rpx;
  }

  .activity-card,
  .return-card {
    gap: 18rpx;
    padding: 20rpx;
  }

  .activity-illustration {
    width: 104rpx;
    height: 104rpx;
  }

  .section-title {
    font-size: 25rpx;
  }

  .status-chip {
    padding: 7rpx 14rpx;
    font-size: 20rpx;
  }

  .activity-title {
    margin-top: 14rpx;
    font-size: 27rpx;
  }

  .meta-row {
    gap: 10rpx;
    margin-top: 12rpx;
    font-size: 22rpx;
  }

  .card-icon {
    width: 62rpx;
    height: 62rpx;
  }

  .return-list {
    gap: 10rpx;
    margin-top: 14rpx;
    font-size: 22rpx;
  }

  .section-card {
    padding: 18rpx;
  }

  .supplement-list,
  .evidence-list {
    margin-top: 14rpx;
  }

  .supplement-row {
    gap: 14rpx;
    min-height: 70rpx;
    padding: 12rpx 14rpx;
  }

  .row-icon {
    width: 46rpx;
    height: 46rpx;
  }

  .row-title {
    font-size: 24rpx;
  }

  .row-desc {
    font-size: 20rpx;
  }

  .evidence-row {
    min-height: 48rpx;
    font-size: 22rpx;
  }

  .sync-chip {
    font-size: 19rpx;
  }

  .tool-grid {
    gap: 10rpx;
    margin-top: 14rpx;
  }

  .tool-button {
    height: 48rpx;
    font-size: 21rpx;
  }

  .textarea-label,
  .ai-title {
    font-size: 22rpx;
  }

  .supplement-textarea {
    height: 104rpx;
    font-size: 22rpx;
  }

  .ai-card {
    gap: 12rpx;
    margin-top: 12rpx;
    padding: 16rpx;
  }

  .ai-desc {
    font-size: 21rpx;
  }

  .fixed-actions {
    gap: 16rpx;
    padding: 16rpx 22rpx 18rpx;
  }

  .action-button {
    height: 64rpx;
    font-size: 26rpx;
  }
}

@media (max-width: 374px) {
  .content {
    padding-right: 14rpx;
    padding-left: 14rpx;
  }

  .activity-card,
  .return-card {
    align-items: flex-start;
  }

  .activity-illustration {
    width: 82rpx;
  }

  .meta-row {
    flex-wrap: wrap;
  }

  .tool-grid {
    grid-template-columns: 1fr;
  }

  .fixed-actions {
    padding-right: 14rpx;
    padding-left: 14rpx;
  }
}
</style>
