<script setup lang="ts">
import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobileNavbar from '../../../components/MobileNavbar.vue'
import { saveStageMaterialDraft, submitStageMaterial } from '../../../domain/virtualResearch'

const uploadActions = [
  { icon: 'folder', title: '上传资料', desc: '支持 PDF/Word/PPT 等' },
  { icon: 'camera', title: '拍照', desc: '拍摄纸质或屏幕内容' },
  { icon: 'mic', title: '语音说明', desc: '语音转文字并保存' },
]

function goBack() {
  uni.navigateBack()
}

function showToast(title: string) {
  uni.showToast({ title, icon: 'none' })
}

function saveDraft() {
  saveStageMaterialDraft()
  uni.showToast({ title: '阶段材料草稿已保存', icon: 'none' })
}

function submitMaterial() {
  submitStageMaterial()
  uni.navigateTo({ url: '/pages/activity/virtual-research-stage-submitted/index' })
}
</script>

<template>
  <view class="stage-material-page">
    <MobileNavbar title="提交阶段材料" size="compact" @back="goBack">
      <template #right>
        <text class="nav-status">待提交</text>
      </template>
    </MobileNavbar>

    <view class="content">
      <MobileCard class="activity-card">
        <view class="card-head">
          <view class="head-icon head-icon--group"></view>
          <text class="eyebrow">本次教研活动</text>
        </view>
        <view class="activity-body">
          <view class="activity-copy">
            <text class="activity-title">课程案例共创碰头会</text>
            <view class="meta-row">
              <view class="meta-icon meta-icon--calendar"></view>
              <text>2026-06-03（周二）14:00-15:30</text>
            </view>
            <view class="meta-row">
              <view class="meta-icon meta-icon--video"></view>
              <text>腾讯会议　会议号：123 456 789</text>
            </view>
            <view class="meta-row">
              <view class="meta-icon meta-icon--team"></view>
              <text>智能制造课程虚拟教研室</text>
            </view>
          </view>
          <view class="meeting-art"></view>
        </view>
      </MobileCard>

      <MobileCard class="task-card">
        <view class="card-head task-head">
          <view class="head-icon head-icon--task"></view>
          <text class="section-title">我的任务</text>
          <button class="detail-link" @tap="showToast('查看详情')">查看详情</button>
        </view>
        <view class="task-body">
          <view class="task-icon"></view>
          <view class="task-copy">
            <view class="task-title-row">
              <text class="task-title">案例素材准备</text>
              <text class="green-chip">进行中</text>
            </view>
            <text class="task-desc">会前准备 1 个企业设备调试案例，可用于会议共创讨论。</text>
          </view>
        </view>
      </MobileCard>

      <MobileCard class="upload-card">
        <view class="card-head">
          <view class="head-icon head-icon--upload"></view>
          <text class="section-title">上传材料</text>
        </view>
        <view class="upload-actions">
          <button v-for="item in uploadActions" :key="item.title" class="upload-action" @tap="showToast(item.title)">
            <view class="upload-action-icon" :class="`upload-action-icon--${item.icon}`"></view>
            <text class="upload-title">{{ item.title }}</text>
            <text class="upload-desc">{{ item.desc }}</text>
          </button>
        </view>
        <view class="file-row">
          <view class="pdf-icon">PDF</view>
          <view class="file-copy">
            <text class="file-name">设备调试案例素材.pdf</text>
            <text class="file-meta">PDF · 3.2MB</text>
          </view>
          <button class="remove-button" @tap="showToast('移除材料')">×</button>
        </view>
        <view class="hint-bar">
          <view class="hint-icon"></view>
          <text>如有更多资料，可在提交后继续补充。</text>
        </view>
      </MobileCard>

      <MobileCard class="explain-card">
        <view class="card-head">
          <view class="head-icon head-icon--note"></view>
          <text class="section-title">补充说明（选填）</text>
        </view>
        <view class="textarea-box">
          <text>该案例来源于某制造企业数控设备调试实践，适用于《智能制造基础》课程中“设备故障诊断与调试”教学环节。</text>
          <text class="count">48/200</text>
        </view>
      </MobileCard>

      <MobileCard class="ai-card">
        <view class="card-head">
          <view class="head-icon head-icon--spark"></view>
          <text class="section-title">AI 已整理材料说明</text>
        </view>
        <text class="ai-text">
          你准备的企业设备调试案例可用于《智能制造基础》课程中的设备故障诊断与调试教学环节，包含案例背景、设备问题、调试过程及可提炼的教学点。
        </text>
        <view class="ai-actions">
          <button @tap="showToast('不准确，重新整理')">不准确，重新整理</button>
          <text>|</text>
          <button @tap="showToast('重新生成')">重新生成 ↻</button>
        </view>
      </MobileCard>

      <MobileCard class="notice-card">
        <view class="card-head">
          <view class="head-icon head-icon--shield"></view>
          <text class="section-title">提交后说明</text>
        </view>
        <text class="notice-text">
          提交后将作为本次教研活动的阶段材料，会议结束后可用于生成会议纪要、沉淀阶段成果，并会用于个人贡献识别。
        </text>
      </MobileCard>
    </view>

    <view class="fixed-actions">
      <MobileActionButton class="draft-button" variant="outline" @tap="saveDraft">
        保存草稿
      </MobileActionButton>
      <MobileActionButton class="submit-button" variant="primary" @tap="submitMaterial">
        提交材料
      </MobileActionButton>
    </view>
  </view>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.stage-material-page {
  min-height: 100vh;
  padding-bottom: calc(144rpx + env(safe-area-inset-bottom));
  overflow-x: hidden;
  background: linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);
  color: #111827;
}

.nav-status {
  display: inline-flex;
  align-items: center;
  height: 42rpx;
  padding: 0 18rpx;
  border-radius: 18rpx;
  background: #fff2e6;
  color: #ff7a1a;
  font-size: 24rpx;
  font-weight: 900;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  padding: 22rpx 30rpx 0;
}

.activity-card,
.task-card,
.upload-card,
.explain-card,
.ai-card,
.notice-card {
  border-radius: 24rpx;
  padding: 28rpx 30rpx;
}

.activity-card {
  background: linear-gradient(135deg, #f8fbff, #ffffff);
}

.card-head,
.activity-body,
.meta-row,
.task-head,
.task-body,
.task-title-row,
.upload-actions,
.file-row,
.hint-bar,
.ai-actions,
.fixed-actions {
  display: flex;
  align-items: center;
}

.card-head {
  gap: 20rpx;
}

.head-icon,
.meta-icon,
.meeting-art,
.task-icon,
.upload-action-icon,
.pdf-icon,
.hint-icon {
  position: relative;
  flex: 0 0 auto;
}

.head-icon {
  width: 54rpx;
  height: 54rpx;
  border-radius: 14rpx;
  background: #eef5ff;
  color: #2f78f5;
}

.head-icon::before,
.head-icon::after,
.meta-icon::before,
.meta-icon::after,
.meeting-art::before,
.meeting-art::after,
.task-icon::before,
.upload-action-icon::before,
.upload-action-icon::after,
.hint-icon::before {
  position: absolute;
  content: '';
}

.head-icon--group::before,
.meta-icon--team::before {
  left: 18rpx;
  top: 14rpx;
  width: 16rpx;
  height: 16rpx;
  border-radius: 50%;
  background: currentColor;
  box-shadow: -13rpx 5rpx 0 -3rpx currentColor, 13rpx 5rpx 0 -3rpx currentColor;
}

.head-icon--group::after,
.meta-icon--team::after {
  left: 12rpx;
  bottom: 11rpx;
  width: 30rpx;
  height: 14rpx;
  border-radius: 16rpx 16rpx 4rpx 4rpx;
  background: currentColor;
}

.head-icon--task,
.head-icon--shield {
  background: #e9fbf1;
  color: #13b966;
}

.head-icon--task::before,
.head-icon--shield::before {
  inset: 12rpx;
  border-radius: 8rpx;
  background: currentColor;
}

.head-icon--task::after,
.head-icon--shield::after {
  left: 20rpx;
  top: 24rpx;
  width: 15rpx;
  height: 8rpx;
  border-bottom: 5rpx solid #fff;
  border-left: 5rpx solid #fff;
  transform: rotate(-45deg);
}

.head-icon--upload {
  background: #f1ebff;
  color: #8b5cf6;
}

.head-icon--upload::before {
  left: 15rpx;
  bottom: 12rpx;
  width: 24rpx;
  height: 12rpx;
  border: 5rpx solid currentColor;
  border-top: 0;
  border-radius: 0 0 6rpx 6rpx;
}

.head-icon--upload::after {
  left: 23rpx;
  top: 11rpx;
  width: 9rpx;
  height: 22rpx;
  border-left: 5rpx solid currentColor;
  border-top: 5rpx solid currentColor;
  transform: rotate(45deg);
}

.head-icon--note {
  background: #fff4e3;
  color: #f28a00;
}

.head-icon--note::before {
  inset: 13rpx 15rpx;
  border-radius: 5rpx;
  background: currentColor;
}

.head-icon--note::after {
  left: 22rpx;
  top: 23rpx;
  width: 12rpx;
  height: 4rpx;
  border-radius: 4rpx;
  background: #fff;
  box-shadow: 0 9rpx 0 #fff;
}

.head-icon--spark {
  background: #eef5ff;
  color: #2f78f5;
}

.head-icon--spark::before {
  left: 12rpx;
  top: 12rpx;
  width: 20rpx;
  height: 20rpx;
  background: currentColor;
  clip-path: polygon(50% 0, 62% 36%, 100% 50%, 62% 64%, 50% 100%, 38% 64%, 0 50%, 38% 36%);
  box-shadow: 19rpx 19rpx 0 currentColor;
}

.eyebrow,
.section-title,
.activity-title,
.meta-row text,
.task-title,
.task-desc,
.upload-title,
.upload-desc,
.file-name,
.file-meta,
.hint-bar text,
.ai-text,
.notice-text {
  display: block;
}

.eyebrow,
.section-title {
  color: #0b1224;
  font-size: 32rpx;
  font-weight: 900;
  line-height: 1.2;
}

.activity-body {
  justify-content: space-between;
  gap: 22rpx;
  margin-top: 22rpx;
}

.activity-copy {
  min-width: 0;
  flex: 1;
}

.activity-title {
  color: #080f20;
  font-size: 34rpx;
  font-weight: 900;
  line-height: 1.2;
}

.meta-row {
  gap: 16rpx;
  margin-top: 18rpx;
  color: #30466e;
  font-size: 25rpx;
  line-height: 1.2;
}

.meta-icon {
  width: 28rpx;
  height: 28rpx;
  color: #64748b;
}

.meta-icon--calendar::before {
  inset: 4rpx;
  border: 3rpx solid currentColor;
  border-radius: 5rpx;
}

.meta-icon--calendar::after {
  left: 8rpx;
  right: 8rpx;
  top: 2rpx;
  height: 9rpx;
  border-right: 3rpx solid currentColor;
  border-left: 3rpx solid currentColor;
}

.meta-icon--video::before {
  left: 3rpx;
  top: 8rpx;
  width: 18rpx;
  height: 14rpx;
  border: 3rpx solid currentColor;
  border-radius: 4rpx;
}

.meta-icon--video::after {
  right: 2rpx;
  top: 10rpx;
  border-top: 5rpx solid transparent;
  border-bottom: 5rpx solid transparent;
  border-left: 8rpx solid currentColor;
}

.meeting-art {
  width: 178rpx;
  height: 150rpx;
  border-radius: 22rpx;
  background: linear-gradient(135deg, #eaf2ff, #f7fbff);
}

.meeting-art::before {
  right: 18rpx;
  top: 24rpx;
  width: 88rpx;
  height: 68rpx;
  border: 8rpx solid #8bb6ff;
  border-radius: 12rpx;
}

.meeting-art::after {
  left: 25rpx;
  bottom: 24rpx;
  width: 48rpx;
  height: 48rpx;
  border-radius: 50% 50% 10rpx 10rpx;
  background: #2f78f5;
  box-shadow: 86rpx -18rpx 0 -14rpx #2f78f5;
}

.detail-link {
  margin: 0 0 0 auto;
  padding: 0;
  border: 0;
  background: transparent;
  color: #08a85c;
  font-size: 26rpx;
  font-weight: 900;
}

.detail-link::after,
.upload-action::after,
.remove-button::after,
.ai-actions button::after {
  display: none;
}

.task-body {
  gap: 24rpx;
  margin-top: 24rpx;
  margin-left: 64rpx;
  padding: 26rpx;
  border-radius: 18rpx;
  background: linear-gradient(90deg, #effbf5, #fbfffd);
}

.task-icon {
  width: 56rpx;
  height: 56rpx;
  border-radius: 8rpx;
  background: #13b966;
}

.task-icon::before {
  left: 17rpx;
  top: 22rpx;
  width: 18rpx;
  height: 10rpx;
  border-bottom: 6rpx solid #fff;
  border-left: 6rpx solid #fff;
  transform: rotate(-45deg);
}

.task-copy {
  min-width: 0;
  flex: 1;
}

.task-title-row {
  justify-content: space-between;
  gap: 16rpx;
}

.task-title {
  color: #111827;
  font-size: 30rpx;
  font-weight: 900;
}

.green-chip {
  flex: 0 0 auto;
  padding: 8rpx 16rpx;
  border-radius: 10rpx;
  background: #e8fbf0;
  color: #08a85c;
  font-size: 23rpx;
  font-weight: 900;
}

.task-desc {
  margin-top: 18rpx;
  color: #445572;
  font-size: 26rpx;
  line-height: 1.5;
}

.upload-actions {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12rpx;
  margin-top: 24rpx;
}

.upload-action {
  min-width: 0;
  height: 128rpx;
  margin: 0;
  padding: 18rpx 6rpx;
  border: 1rpx solid #e0e7f2;
  border-radius: 12rpx;
  background: linear-gradient(180deg, #ffffff, #f8fbff);
  text-align: center;
}

.upload-action-icon {
  width: 42rpx;
  height: 42rpx;
  margin: 0 auto 10rpx;
  color: #2f78f5;
}

.upload-action-icon--folder::before {
  left: 2rpx;
  top: 13rpx;
  width: 38rpx;
  height: 25rpx;
  border-radius: 6rpx;
  background: currentColor;
}

.upload-action-icon--folder::after {
  left: 7rpx;
  top: 7rpx;
  width: 22rpx;
  height: 10rpx;
  border-radius: 6rpx 6rpx 0 0;
  background: currentColor;
}

.upload-action-icon--camera {
  color: #0db766;
}

.upload-action-icon--camera::before {
  left: 3rpx;
  top: 12rpx;
  width: 36rpx;
  height: 25rpx;
  border-radius: 7rpx;
  background: currentColor;
}

.upload-action-icon--camera::after {
  left: 15rpx;
  top: 18rpx;
  width: 12rpx;
  height: 12rpx;
  border: 4rpx solid #fff;
  border-radius: 50%;
}

.upload-action-icon--mic {
  color: #f08300;
}

.upload-action-icon--mic::before {
  left: 15rpx;
  top: 3rpx;
  width: 12rpx;
  height: 25rpx;
  border-radius: 14rpx;
  background: currentColor;
}

.upload-action-icon--mic::after {
  left: 11rpx;
  bottom: 5rpx;
  width: 20rpx;
  height: 16rpx;
  border-bottom: 5rpx solid currentColor;
  border-left: 5rpx solid currentColor;
  border-right: 5rpx solid currentColor;
  border-radius: 0 0 14rpx 14rpx;
}

.upload-title {
  color: #111827;
  font-size: 25rpx;
  font-weight: 900;
}

.upload-desc {
  margin-top: 8rpx;
  color: #66748d;
  font-size: 21rpx;
  line-height: 1.25;
}

.file-row {
  gap: 18rpx;
  margin-top: 22rpx;
  padding: 14rpx 18rpx;
  border: 1rpx solid #e0e7f2;
  border-radius: 12rpx;
}

.pdf-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36rpx;
  height: 42rpx;
  border-radius: 5rpx;
  background: #f5222d;
  color: #fff;
  font-size: 13rpx;
  font-weight: 900;
}

.file-copy {
  min-width: 0;
  flex: 1;
}

.file-name {
  color: #111827;
  font-size: 25rpx;
  font-weight: 900;
}

.file-meta {
  margin-top: 4rpx;
  color: #475569;
  font-size: 23rpx;
}

.remove-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34rpx;
  height: 34rpx;
  margin: 0;
  padding: 0;
  border: 3rpx solid #64748b;
  border-radius: 50%;
  background: transparent;
  color: #64748b;
  font-size: 30rpx;
  line-height: 1;
}

.hint-bar {
  gap: 16rpx;
  margin-top: 18rpx;
  padding: 16rpx 18rpx;
  border-radius: 12rpx;
  background: #f7fbff;
  color: #52627c;
  font-size: 25rpx;
}

.hint-icon {
  width: 26rpx;
  height: 26rpx;
  color: #2f78f5;
}

.hint-icon::before {
  inset: 4rpx;
  border-radius: 50%;
  background: currentColor;
}

.textarea-box {
  position: relative;
  min-height: 132rpx;
  margin-top: 22rpx;
  padding: 22rpx 26rpx 40rpx;
  border: 1rpx solid #dfe7f2;
  border-radius: 12rpx;
  color: #111827;
  font-size: 27rpx;
  line-height: 1.55;
}

.count {
  position: absolute;
  right: 22rpx;
  bottom: 14rpx;
  color: #53627b;
  font-size: 23rpx;
}

.ai-card {
  background: linear-gradient(135deg, #f4f9ff, #eef6ff);
}

.ai-text,
.notice-text {
  margin-top: 22rpx;
  padding-left: 74rpx;
  color: #223756;
  font-size: 27rpx;
  line-height: 1.58;
}

.ai-actions {
  justify-content: flex-end;
  gap: 18rpx;
  margin-top: 22rpx;
  color: #1677ff;
  font-size: 25rpx;
  font-weight: 900;
}

.ai-actions button {
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  color: #1677ff;
  font-size: 25rpx;
  font-weight: 900;
}

.notice-card {
  background: linear-gradient(135deg, #fffaf2, #fffdf8);
}

.fixed-actions {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 45;
  gap: 24rpx;
  padding: 18rpx 30rpx calc(20rpx + env(safe-area-inset-bottom));
  border-top: 1rpx solid rgba(232, 238, 246, 0.96);
  background: rgba(255, 255, 255, 0.96);
}

.draft-button,
.submit-button {
  height: 78rpx;
  flex: 1;
  border-radius: 14rpx;
  font-size: 32rpx;
}

.submit-button {
  background: linear-gradient(135deg, #2d7cf6, #1468ee);
  box-shadow: 0 18rpx 32rpx rgba(22, 104, 238, 0.22);
}

@media (max-width: 430px) {
  .stage-material-page {
    padding-bottom: calc(120rpx + env(safe-area-inset-bottom));
  }

  .content {
    gap: 12rpx;
    padding: 16rpx 20rpx 0;
  }

  .activity-card,
  .task-card,
  .upload-card,
  .explain-card,
  .ai-card,
  .notice-card {
    padding: 18rpx;
  }

  .head-icon {
    width: 40rpx;
    height: 40rpx;
    border-radius: 10rpx;
  }

  .eyebrow,
  .section-title {
    font-size: 25rpx;
  }

  .activity-body {
    gap: 12rpx;
    margin-top: 14rpx;
  }

  .activity-title {
    font-size: 26rpx;
  }

  .meta-row {
    gap: 10rpx;
    margin-top: 10rpx;
    font-size: 19rpx;
  }

  .meeting-art {
    width: 92rpx;
    height: 88rpx;
  }

  .task-body {
    gap: 14rpx;
    margin-top: 14rpx;
    margin-left: 46rpx;
    padding: 16rpx;
  }

  .task-icon {
    width: 42rpx;
    height: 42rpx;
  }

  .task-title {
    font-size: 23rpx;
  }

  .green-chip {
    padding: 5rpx 10rpx;
    font-size: 17rpx;
  }

  .task-desc {
    margin-top: 9rpx;
    font-size: 20rpx;
  }

  .detail-link {
    font-size: 20rpx;
  }

  .upload-actions {
    gap: 10rpx;
    margin-top: 14rpx;
  }

  .upload-action {
    height: 92rpx;
    padding: 11rpx 6rpx;
  }

  .upload-action-icon {
    width: 30rpx;
    height: 30rpx;
    margin-bottom: 5rpx;
  }

  .upload-title {
    font-size: 19rpx;
  }

  .upload-desc {
    margin-top: 4rpx;
    font-size: 16rpx;
  }

  .file-row {
    gap: 12rpx;
    margin-top: 12rpx;
    padding: 10rpx 12rpx;
  }

  .file-name {
    font-size: 20rpx;
  }

  .file-meta,
  .hint-bar,
  .count {
    font-size: 18rpx;
  }

  .hint-bar {
    gap: 10rpx;
    margin-top: 10rpx;
    padding: 10rpx 12rpx;
  }

  .textarea-box {
    min-height: 92rpx;
    margin-top: 12rpx;
    padding: 14rpx 16rpx 30rpx;
    font-size: 20rpx;
  }

  .ai-text,
  .notice-text {
    margin-top: 12rpx;
    padding-left: 54rpx;
    font-size: 20rpx;
  }

  .ai-actions {
    gap: 10rpx;
    margin-top: 10rpx;
    font-size: 18rpx;
  }

  .ai-actions button {
    font-size: 18rpx;
  }

  .fixed-actions {
    gap: 12rpx;
    padding: 12rpx 20rpx calc(14rpx + env(safe-area-inset-bottom));
  }

  .draft-button,
  .submit-button {
    height: 56rpx;
    font-size: 24rpx;
  }
}

@media (max-width: 374px) {
  .content {
    padding-right: 14rpx;
    padding-left: 14rpx;
  }

  .meeting-art {
    display: none;
  }

  .task-body,
  .ai-text,
  .notice-text {
    margin-left: 0;
    padding-left: 0;
  }
}
</style>
