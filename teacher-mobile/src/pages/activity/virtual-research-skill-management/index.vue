<script setup lang="ts">
import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobileNavbar from '../../../components/MobileNavbar.vue'
import {
  addSupplementMaterial,
  getMobileVirtualResearchState,
  recordMemberProfileAction,
  saveSupplementDraft,
  submitSupplementMaterial,
} from '../../../domain/virtualResearch'

const recognizedItems = ['提供企业设备调试案例素材', '补充设备故障诊断教学建议']

const evidenceItems = [
  { icon: 'note', title: '会议纪要', status: '已关联', active: true },
  { icon: 'chat', title: '发言摘录', status: '已关联', active: true },
  { icon: 'folder', title: '阶段材料', status: '可选择', active: false },
  { icon: 'user', title: '任务分工', status: '可选择', active: false },
]

const materialActions = [
  { icon: 'upload', title: '上传资料' },
  { icon: 'camera', title: '拍照' },
  { icon: 'mic', title: '语音说明' },
]

const virtualResearchState = getMobileVirtualResearchState()

function goBack() {
  uni.navigateBack()
}

function handleEvidenceAction(title: string) {
  recordMemberProfileAction(`查看关联依据：${title}`)
  uni.showToast({ title: `${title} 已关联到虚拟教研成员资料`, icon: 'none' })
}

function handleSupplementMaterialAction(title: string) {
  const material = title === '语音说明'
    ? addSupplementMaterial('语音')
    : addSupplementMaterial(title === '拍照' ? '拍照' : '上传')
  recordMemberProfileAction(`${title}补充遗漏贡献材料`)
  uni.showToast({ title: `${material.name} 已加入`, icon: 'none' })
}

function saveContributionDraft() {
  saveSupplementDraft()
  uni.showToast({ title: '补充贡献草稿已保存', icon: 'none' })
}

function submitContributionSupplement() {
  submitSupplementMaterial()
  uni.navigateTo({ url: '/pages/activity/virtual-research-activity-detail-supplement-submitted/index' })
}
</script>

<template>
  <view class="supplement-page">
    <MobileNavbar title="补充遗漏贡献" size="compact" @back="goBack" />
    <view class="page-state">
      <text class="warning-chip">待确认</text>
      <text class="page-subtitle">补充系统未识别到的个人教研贡献</text>
      <text class="page-subtitle">虚拟教研成员资料</text>
    </view>

    <view class="content">
      <MobileCard class="activity-card">
        <view class="card-head">
          <view class="head-icon head-icon--calendar"></view>
          <text class="section-title">本次教研活动</text>
        </view>
        <view class="info-table">
          <view class="info-row">
            <text class="info-label">活动名称：</text>
            <text class="info-value">课程案例共创碰头会</text>
          </view>
          <view class="info-row">
            <text class="info-label">时间：</text>
            <text class="info-value">2026-06-03 14:00-15:30</text>
          </view>
          <view class="info-row">
            <text class="info-label">来源：</text>
            <text class="info-value">腾讯会议 ｜ 智能制造课程虚拟教研室</text>
          </view>
        </view>
      </MobileCard>

      <MobileCard class="recognized-card">
        <view class="card-head">
          <view class="head-icon head-icon--check"></view>
          <text class="section-title">系统已识别贡献</text>
        </view>
        <view class="recognized-list">
          <view v-for="item in recognizedItems" :key="item" class="recognized-row">
            <view class="square-dot"></view>
            <text>{{ item }}</text>
          </view>
        </view>
      </MobileCard>

      <MobileCard class="form-card">
        <view class="card-head">
          <view class="head-icon head-icon--edit"></view>
          <text class="section-title">我要补充的贡献</text>
        </view>
        <view class="field-block">
          <text class="field-label">贡献名称</text>
          <view class="input-shell">参与课程案例结构讨论</view>
        </view>
        <view class="field-block">
          <text class="field-label">补充说明</text>
          <view class="textarea-shell">
            我参与了课程案例结构讨论，并补充了案例在课堂导入、问题分析和实训任务中的使用建议。
          </view>
        </view>
        <text class="field-tip">你可以补充一句实际参与内容，AI 会帮你整理为贡献说明。</text>
      </MobileCard>

      <MobileCard class="ai-card">
        <view class="card-head">
          <view class="head-icon head-icon--spark"></view>
          <text class="section-title">AI 已整理贡献说明</text>
        </view>
        <view class="ai-result">
          你参与了课程案例结构讨论，并补充了案例在课堂导入、问题分析和实训任务中的使用建议。
        </view>
      </MobileCard>

      <MobileCard class="evidence-card">
        <view class="card-head">
          <view class="head-icon head-icon--link"></view>
          <text class="section-title">关联依据</text>
        </view>
        <view class="evidence-grid">
          <button
            v-for="item in evidenceItems"
            :key="item.title"
            class="evidence-item"
            :class="{ 'evidence-item--inactive': !item.active }"
            @tap="handleEvidenceAction(item.title)"
          >
            <view class="evidence-icon" :class="`evidence-icon--${item.icon}`"></view>
            <text class="evidence-title">{{ item.title }}</text>
            <text class="evidence-divider">|</text>
            <text class="evidence-status">{{ item.status }}</text>
          </button>
        </view>
      </MobileCard>

      <MobileCard class="material-card">
        <view class="card-head">
          <view class="head-icon head-icon--paperclip"></view>
          <text class="section-title">补充材料</text>
        </view>
        <view class="material-actions">
          <button
            v-for="item in materialActions"
            :key="item.title"
            class="material-action"
            @tap="handleSupplementMaterialAction(item.title)"
          >
            <view class="material-icon" :class="`material-icon--${item.icon}`"></view>
            <text>{{ item.title }}</text>
          </button>
        </view>
        <view v-for="file in virtualResearchState.supplementMaterials" :key="file.id" class="recognized-row">
          <view class="square-dot"></view>
          <text>{{ file.name }} ｜ {{ file.source }} ｜ {{ file.status }}</text>
        </view>
      </MobileCard>

      <MobileCard class="notice-card">
        <view class="card-head">
          <view class="head-icon head-icon--info"></view>
          <text class="section-title">提交后说明</text>
        </view>
        <text class="notice-text">补充后将回到贡献确认页，请再次确认本次活动的个人贡献。</text>
      </MobileCard>
    </view>

    <view class="fixed-actions">
      <MobileActionButton class="draft-button" variant="outline" @tap="saveContributionDraft">
        保存草稿
      </MobileActionButton>
      <MobileActionButton class="submit-button" variant="primary" @tap="submitContributionSupplement">
        提交补充
      </MobileActionButton>
    </view>
  </view>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.supplement-page {
  min-height: 100vh;
  padding-bottom: calc(136rpx + env(safe-area-inset-bottom));
  overflow-x: hidden;
  background:
    radial-gradient(circle at 85% 3%, rgba(233, 252, 241, 0.9), transparent 30%),
    linear-gradient(180deg, #fcfffd 0%, #f7fbf9 100%);
  color: #10172d;
}

.page-state {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 16rpx;
  margin-top: 6rpx;
  margin-bottom: 28rpx;
}

.warning-chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 50rpx;
  padding: 0 22rpx;
  border-radius: 12rpx;
  background: #fff1e6;
  color: #ff7a1a;
  font-size: 28rpx;
  font-weight: 900;
  line-height: 1;
}

.page-subtitle {
  color: #31456c;
  font-size: 28rpx;
  line-height: 1.2;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 18rpx;
  padding: 0 30rpx;
}

.activity-card,
.recognized-card,
.form-card,
.ai-card,
.evidence-card,
.material-card,
.notice-card {
  border-radius: 26rpx;
  padding: 28rpx 30rpx;
}

.card-head,
.info-row,
.recognized-row,
.evidence-grid,
.evidence-item,
.material-actions,
.material-action,
.fixed-actions {
  display: flex;
  align-items: center;
}

.card-head {
  gap: 24rpx;
}

.head-icon,
.square-dot,
.evidence-icon,
.material-icon {
  position: relative;
  flex: 0 0 auto;
}

.head-icon {
  width: 54rpx;
  height: 54rpx;
  border-radius: 14rpx;
  background: #e8fbf0;
  color: #12bd68;
}

.head-icon::before,
.head-icon::after,
.square-dot::before,
.evidence-icon::before,
.evidence-icon::after,
.material-icon::before,
.material-icon::after {
  position: absolute;
  content: '';
}

.head-icon--calendar::before {
  inset: 15rpx 12rpx 10rpx;
  border: 4rpx solid currentColor;
  border-radius: 6rpx;
}

.head-icon--calendar::after {
  top: 9rpx;
  left: 17rpx;
  right: 17rpx;
  height: 12rpx;
  border-right: 4rpx solid currentColor;
  border-left: 4rpx solid currentColor;
}

.head-icon--check::before {
  inset: 11rpx;
  border-radius: 50%;
  background: currentColor;
}

.head-icon--check::after {
  left: 20rpx;
  top: 24rpx;
  width: 16rpx;
  height: 9rpx;
  border-bottom: 5rpx solid #fff;
  border-left: 5rpx solid #fff;
  transform: rotate(-45deg);
}

.head-icon--edit::before {
  left: 15rpx;
  top: 28rpx;
  width: 26rpx;
  height: 5rpx;
  border-radius: 5rpx;
  background: currentColor;
}

.head-icon--edit::after {
  left: 15rpx;
  top: 16rpx;
  width: 24rpx;
  height: 8rpx;
  border-radius: 6rpx;
  background: currentColor;
  transform: rotate(-42deg);
}

.head-icon--spark::before {
  left: 12rpx;
  top: 12rpx;
  width: 18rpx;
  height: 18rpx;
  background: currentColor;
  clip-path: polygon(50% 0, 62% 36%, 100% 50%, 62% 64%, 50% 100%, 38% 64%, 0 50%, 38% 36%);
  box-shadow: 18rpx 18rpx 0 currentColor;
}

.head-icon--link::before,
.head-icon--paperclip::before {
  left: 14rpx;
  top: 19rpx;
  width: 26rpx;
  height: 14rpx;
  border: 5rpx solid currentColor;
  border-radius: 16rpx;
  transform: rotate(-45deg);
}

.head-icon--info::before {
  inset: 12rpx;
  border: 4rpx solid currentColor;
  border-radius: 50%;
}

.head-icon--info::after {
  left: 25rpx;
  top: 22rpx;
  width: 5rpx;
  height: 16rpx;
  border-radius: 5rpx;
  background: currentColor;
  box-shadow: 0 -9rpx 0 -1rpx currentColor;
}

.section-title,
.info-label,
.info-value,
.recognized-row text,
.field-label,
.field-tip,
.ai-result,
.evidence-title,
.evidence-status,
.material-action text,
.notice-text {
  display: block;
}

.section-title {
  color: #0b1224;
  font-size: 34rpx;
  font-weight: 900;
  line-height: 1.2;
}

.info-table {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
  margin-top: 28rpx;
  padding-left: 86rpx;
}

.info-row {
  gap: 34rpx;
  color: #111827;
  font-size: 29rpx;
  line-height: 1.28;
}

.info-label {
  width: 140rpx;
  flex: 0 0 auto;
  color: #30466e;
  font-weight: 700;
}

.info-value {
  min-width: 0;
  flex: 1;
  overflow-wrap: anywhere;
}

.recognized-list {
  display: flex;
  flex-direction: column;
  gap: 18rpx;
  margin-top: 24rpx;
  padding-left: 86rpx;
}

.recognized-row {
  gap: 16rpx;
  color: #111827;
  font-size: 29rpx;
  line-height: 1.25;
}

.square-dot {
  width: 16rpx;
  height: 16rpx;
  border-radius: 4rpx;
  background: #18c970;
  box-shadow: 0 0 0 4rpx #e6f8ee;
}

.field-block {
  margin-top: 24rpx;
}

.field-label {
  color: #30466e;
  font-size: 27rpx;
  font-weight: 700;
  line-height: 1.2;
}

.input-shell,
.textarea-shell {
  box-sizing: border-box;
  width: 100%;
  margin-top: 14rpx;
  border: 1rpx solid rgba(8, 168, 92, 0.35);
  border-radius: 12rpx;
  background: rgba(255, 255, 255, 0.82);
  color: #111827;
  font-size: 28rpx;
  line-height: 1.5;
}

.input-shell {
  min-height: 72rpx;
  padding: 18rpx 24rpx;
}

.textarea-shell {
  min-height: 134rpx;
  padding: 20rpx 24rpx;
}

.field-tip {
  margin-top: 18rpx;
  color: #5e6d87;
  font-size: 25rpx;
  line-height: 1.45;
}

.ai-result {
  margin-top: 22rpx;
  margin-left: 86rpx;
  padding: 24rpx;
  border-radius: 14rpx;
  background: linear-gradient(135deg, #effcf4, #f7fffb);
  color: #111827;
  font-size: 28rpx;
  line-height: 1.55;
}

.evidence-grid {
  flex-wrap: wrap;
  gap: 18rpx 22rpx;
  margin-top: 24rpx;
  padding-left: 86rpx;
}

.evidence-item {
  width: calc(50% - 11rpx);
  min-height: 70rpx;
  box-sizing: border-box;
  gap: 14rpx;
  margin: 0;
  padding: 0 18rpx;
  border: 1rpx solid #d5f2e3;
  border-radius: 10rpx;
  background: #fbfffd;
  text-align: left;
}

.evidence-item::after,
.material-action::after {
  display: none;
}

.evidence-item--inactive .evidence-status {
  color: #1677ff;
}

.evidence-icon {
  width: 34rpx;
  height: 34rpx;
  color: #0fb463;
}

.evidence-icon--note::before {
  inset: 5rpx 8rpx;
  border: 4rpx solid currentColor;
  border-radius: 5rpx;
}

.evidence-icon--note::after {
  left: 13rpx;
  top: 15rpx;
  width: 12rpx;
  height: 4rpx;
  border-radius: 3rpx;
  background: currentColor;
  box-shadow: 0 9rpx 0 currentColor;
}

.evidence-icon--chat::before {
  inset: 7rpx 3rpx 8rpx;
  border: 4rpx solid currentColor;
  border-radius: 8rpx;
}

.evidence-icon--chat::after {
  left: 10rpx;
  top: 17rpx;
  width: 5rpx;
  height: 5rpx;
  border-radius: 50%;
  background: currentColor;
  box-shadow: 10rpx 0 0 currentColor, 20rpx 0 0 currentColor;
}

.evidence-icon--folder::before {
  left: 3rpx;
  top: 12rpx;
  width: 28rpx;
  height: 19rpx;
  border-radius: 5rpx;
  background: currentColor;
}

.evidence-icon--folder::after {
  left: 6rpx;
  top: 7rpx;
  width: 18rpx;
  height: 8rpx;
  border-radius: 5rpx 5rpx 0 0;
  background: currentColor;
}

.evidence-icon--user::before {
  left: 12rpx;
  top: 5rpx;
  width: 12rpx;
  height: 12rpx;
  border: 4rpx solid currentColor;
  border-radius: 50%;
}

.evidence-icon--user::after {
  left: 5rpx;
  bottom: 4rpx;
  width: 26rpx;
  height: 14rpx;
  border: 4rpx solid currentColor;
  border-radius: 16rpx 16rpx 4rpx 4rpx;
}

.evidence-title {
  min-width: 0;
  color: #111827;
  font-size: 27rpx;
  line-height: 1.2;
  white-space: nowrap;
}

.evidence-divider {
  color: #64748b;
  font-size: 26rpx;
}

.evidence-status {
  color: #08a85c;
  font-size: 25rpx;
  font-weight: 900;
  line-height: 1.2;
  white-space: nowrap;
}

.material-actions {
  gap: 22rpx;
  margin-top: 24rpx;
  padding-left: 86rpx;
}

.material-action {
  justify-content: center;
  gap: 12rpx;
  min-width: 0;
  height: 62rpx;
  flex: 1;
  margin: 0;
  padding: 0 14rpx;
  border: 1rpx solid #d5f2e3;
  border-radius: 9rpx;
  background: #fbfffd;
  color: #111827;
  font-size: 27rpx;
  font-weight: 700;
}

.material-icon {
  width: 34rpx;
  height: 34rpx;
  color: #08b85a;
}

.material-icon--upload::before {
  left: 5rpx;
  bottom: 5rpx;
  width: 24rpx;
  height: 14rpx;
  border: 4rpx solid currentColor;
  border-top: 0;
  border-radius: 0 0 6rpx 6rpx;
}

.material-icon--upload::after {
  left: 12rpx;
  top: 4rpx;
  width: 10rpx;
  height: 18rpx;
  border-left: 5rpx solid currentColor;
  border-top: 5rpx solid currentColor;
  transform: rotate(45deg);
}

.material-icon--camera::before {
  left: 4rpx;
  top: 10rpx;
  width: 26rpx;
  height: 19rpx;
  border: 4rpx solid currentColor;
  border-radius: 6rpx;
}

.material-icon--camera::after {
  left: 13rpx;
  top: 15rpx;
  width: 8rpx;
  height: 8rpx;
  border: 4rpx solid currentColor;
  border-radius: 50%;
}

.material-icon--mic::before {
  left: 12rpx;
  top: 3rpx;
  width: 11rpx;
  height: 20rpx;
  border: 4rpx solid currentColor;
  border-radius: 12rpx;
}

.material-icon--mic::after {
  left: 9rpx;
  bottom: 4rpx;
  width: 17rpx;
  height: 13rpx;
  border-bottom: 4rpx solid currentColor;
  border-left: 4rpx solid currentColor;
  border-right: 4rpx solid currentColor;
  border-radius: 0 0 14rpx 14rpx;
}

.notice-text {
  margin-top: 20rpx;
  padding-left: 86rpx;
  color: #30466e;
  font-size: 26rpx;
  line-height: 1.45;
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
  box-shadow: 0 -12rpx 36rpx rgba(21, 40, 74, 0.06);
}

.draft-button,
.submit-button {
  height: 78rpx;
  flex: 1;
  border-radius: 16rpx;
  font-size: 32rpx;
}

@media (max-width: 430px) {
  .supplement-page {
    padding-bottom: calc(116rpx + env(safe-area-inset-bottom));
  }

  .page-state {
    gap: 8rpx;
    margin-top: 0;
    margin-bottom: 16rpx;
  }

  .warning-chip {
    height: 38rpx;
    padding: 0 16rpx;
    font-size: 22rpx;
  }

  .page-subtitle {
    font-size: 21rpx;
  }

  .content {
    gap: 10rpx;
    padding: 0 20rpx;
  }

  .activity-card,
  .recognized-card,
  .form-card,
  .ai-card,
  .evidence-card,
  .material-card,
  .notice-card {
    padding: 18rpx;
  }

  .card-head {
    gap: 14rpx;
  }

  .head-icon {
    width: 40rpx;
    height: 40rpx;
    border-radius: 10rpx;
  }

  .section-title {
    font-size: 25rpx;
  }

  .info-table,
  .recognized-list,
  .ai-result,
  .evidence-grid,
  .material-actions,
  .notice-text {
    margin-top: 14rpx;
    padding-left: 54rpx;
  }

  .info-table {
    gap: 11rpx;
  }

  .info-row {
    gap: 20rpx;
    font-size: 21rpx;
  }

  .info-label {
    width: 98rpx;
  }

  .recognized-list {
    gap: 10rpx;
  }

  .recognized-row {
    gap: 10rpx;
    font-size: 21rpx;
  }

  .square-dot {
    width: 11rpx;
    height: 11rpx;
  }

  .field-block {
    margin-top: 16rpx;
  }

  .field-label {
    font-size: 20rpx;
  }

  .input-shell,
  .textarea-shell {
    margin-top: 8rpx;
    font-size: 20rpx;
  }

  .input-shell {
    min-height: 50rpx;
    padding: 11rpx 16rpx;
  }

  .textarea-shell {
    min-height: 88rpx;
    padding: 13rpx 16rpx;
  }

  .field-tip {
    margin-top: 10rpx;
    font-size: 18rpx;
  }

  .ai-result {
    padding: 15rpx;
    font-size: 21rpx;
  }

  .evidence-grid {
    gap: 10rpx 12rpx;
  }

  .evidence-item {
    width: calc(50% - 6rpx);
    min-height: 48rpx;
    gap: 7rpx;
    padding: 0 8rpx;
  }

  .evidence-icon {
    width: 25rpx;
    height: 25rpx;
  }

  .evidence-title,
  .evidence-divider,
  .evidence-status {
    font-size: 18rpx;
  }

  .material-actions {
    gap: 10rpx;
  }

  .material-action {
    gap: 7rpx;
    height: 46rpx;
    padding: 0 8rpx;
    font-size: 20rpx;
  }

  .material-icon {
    width: 25rpx;
    height: 25rpx;
  }

  .notice-text {
    font-size: 20rpx;
  }

  .fixed-actions {
    gap: 12rpx;
    padding: 12rpx 20rpx calc(14rpx + env(safe-area-inset-bottom));
  }

  .draft-button,
  .submit-button {
    height: 56rpx;
    border-radius: 12rpx;
    font-size: 24rpx;
  }
}

@media (max-width: 374px) {
  .content {
    padding-right: 14rpx;
    padding-left: 14rpx;
  }

  .info-table,
  .recognized-list,
  .ai-result,
  .evidence-grid,
  .material-actions,
  .notice-text {
    padding-left: 0;
  }

  .evidence-item {
    width: 100%;
  }
}
</style>
