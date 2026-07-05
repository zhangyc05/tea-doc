<script setup lang="ts">
import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobileNavbar from '../../../components/MobileNavbar.vue'
import { rejectEnterprisePlan } from '../../../domain/enterprise'

const rejectRows = [
  { icon: 'person', label: '退回人', value: '信息工程学院教学办公室' },
  { icon: 'clock', label: '退回时间', value: '2026-05-29 14:32' },
  { icon: 'file', label: '退回原因', value: '部分关键信息需进一步完善' },
]

const planRows = [
  { icon: 'bag', label: '实践单位', value: '山东智联装备有限公司' },
  { icon: 'bag', label: '实践岗位', value: '现场工程师助理' },
  { icon: 'calendar', label: '计划时间', value: '2026-06-03 至 2026-06-14' },
  { icon: 'upload', label: '预计实践天数', value: '10 天' },
  { icon: 'clock', label: '提交时间', value: '2026-05-28 09:41' },
]

const modifyItems = [
  {
    index: '1',
    title: '实践内容描述',
    desc: '请补充具体参与的工作任务或学习内容',
  },
  {
    index: '2',
    title: '实践收获与教学转化方向',
    desc: '请说明预期收获及后续教学转化思路',
  },
]

function goBack() {
  uni.navigateBack()
}

function goEnterpriseList() {
  rejectEnterprisePlan()
  uni.navigateTo({ url: '/pages/activity/enterprise-list/index' })
}

function showAttachmentFeedback() {
  uni.showToast({ title: '已提交附件为本地模拟，请在修改计划页重新整理', icon: 'none' })
}

function goPlanEdit() {
  rejectEnterprisePlan()
  uni.navigateTo({ url: '/pages/activity/enterprise-plan-edit/index' })
}
</script>

<template>
  <view class="plan-rejected-page">
    <MobileNavbar title="实践计划退回修改" size="regular" @back="goBack" />

    <scroll-view scroll-y class="page-scroll">
      <view class="content">
        <view class="alert-card">
          <view class="alert-icon">!</view>
          <view class="alert-copy">
            <text class="alert-title">实践计划需要修改后重新提交</text>
            <text class="alert-desc">学院已退回，请根据退回意见修改后重新提交。</text>
          </view>
        </view>

        <MobileCard class="reject-card">
          <text class="section-title">退回信息</text>
          <view class="reject-list">
            <view v-for="item in rejectRows" :key="item.label" class="reject-row">
              <view class="line-icon" :class="`line-icon--${item.icon}`"></view>
              <text class="reject-label">{{ item.label }}</text>
              <text class="reject-value">{{ item.value }}</text>
            </view>
            <view class="reject-row reject-row--opinion">
              <view class="line-icon line-icon--message"></view>
              <text class="reject-label">退回意见</text>
            </view>
            <view class="opinion-box">
              <text>实践内容描述较为笼统，请补充具体参与的工作任务或学习内容；建议补充实践收获与教学转化方向，完善实践与教学关联性。</text>
            </view>
          </view>
        </MobileCard>

        <MobileCard class="plan-card">
          <text class="section-title">本次实践计划</text>
          <view class="plan-box">
            <view v-for="item in planRows" :key="item.label" class="plan-row">
              <view class="blue-icon" :class="`blue-icon--${item.icon}`"></view>
              <text class="plan-label">{{ item.label }}</text>
              <text class="plan-value">{{ item.value }}</text>
            </view>
          </view>

          <view class="divider"></view>

          <view class="modify-head">
            <text class="modify-title">需修改的内容</text>
            <text class="modify-count">（共 2 项）</text>
          </view>

          <view class="modify-list">
            <view v-for="item in modifyItems" :key="item.index" class="modify-row">
              <text class="modify-index">{{ item.index }}</text>
              <view class="modify-copy">
                <text class="modify-item-title">{{ item.title }}</text>
                <text class="modify-desc">{{ item.desc }}</text>
              </view>
              <text class="modify-tag">需修改</text>
            </view>
          </view>
        </MobileCard>

        <MobileCard class="attachment-card">
          <view class="attachment-title-row">
            <text class="section-title">已提交的附件</text>
            <text class="attachment-count">（1）</text>
          </view>
          <view class="attachment-file">
            <view class="pdf-icon"></view>
            <view class="file-copy">
              <text class="file-name">企业实践安排表.pdf</text>
              <text class="file-size">328 KB</text>
            </view>
            <text class="view-link" @tap="showAttachmentFeedback">查看</text>
          </view>
        </MobileCard>

        <view class="info-tip">
          <text class="info-icon">i</text>
          <text>修改完成后可直接重新提交，学院将再次审核。</text>
        </view>
      </view>
    </scroll-view>

    <view class="fixed-actions">
      <MobileActionButton class="action-button" variant="outline" @tap="goEnterpriseList">返回实践列表</MobileActionButton>
      <MobileActionButton class="action-button action-button--primary" variant="primary" @tap="goPlanEdit">修改计划并重新提交</MobileActionButton>
    </view>
  </view>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.plan-rejected-page {
  min-height: 100vh;
  background: #ffffff;
  color: #10172d;
}

.page-scroll {
  height: calc(100vh - 154rpx);
}

.content {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  padding: 24rpx 30rpx calc(166rpx + env(safe-area-inset-bottom));
}

.alert-card,
.reject-row,
.plan-row,
.modify-head,
.modify-row,
.attachment-title-row,
.attachment-file,
.info-tip,
.fixed-actions {
  display: flex;
  align-items: center;
}

.alert-card {
  gap: 26rpx;
  padding: 32rpx 30rpx;
  border-radius: 18rpx;
  background: linear-gradient(105deg, #fff2e8 0%, #fff7f2 100%);
}

.alert-icon {
  width: 88rpx;
  height: 88rpx;
  flex: 0 0 auto;
  border: 6rpx solid #e95516;
  border-radius: 50%;
  color: #e95516;
  font-size: 58rpx;
  font-weight: 900;
  line-height: 78rpx;
  text-align: center;
}

.alert-title,
.alert-desc,
.section-title,
.reject-label,
.reject-value,
.opinion-box text,
.plan-label,
.plan-value,
.modify-title,
.modify-count,
.modify-item-title,
.modify-desc,
.attachment-count,
.file-name,
.file-size {
  display: block;
}

.alert-title {
  color: #e95516;
  font-size: 34rpx;
  font-weight: 900;
  line-height: 1.3;
}

.alert-desc {
  margin-top: 10rpx;
  color: #10172d;
  font-size: 28rpx;
  line-height: 1.4;
}

.reject-card,
.plan-card,
.attachment-card {
  padding: 28rpx;
  border-radius: 18rpx;
}

.section-title {
  color: #10172d;
  font-size: 38rpx;
  font-weight: 900;
  line-height: 1.3;
}

.reject-list {
  margin-top: 24rpx;
}

.reject-row {
  min-height: 56rpx;
}

.reject-row--opinion {
  margin-top: 8rpx;
}

.line-icon,
.blue-icon {
  position: relative;
  width: 40rpx;
  height: 40rpx;
  flex: 0 0 auto;
  margin-right: 20rpx;
}

.line-icon {
  color: #343b4b;
}

.line-icon::before,
.line-icon::after,
.blue-icon::before,
.blue-icon::after {
  position: absolute;
  content: '';
}

.line-icon--person::before {
  left: 13rpx;
  top: 5rpx;
  width: 14rpx;
  height: 14rpx;
  border: 4rpx solid currentColor;
  border-radius: 50%;
}

.line-icon--person::after {
  left: 7rpx;
  bottom: 4rpx;
  width: 26rpx;
  height: 16rpx;
  border: 4rpx solid currentColor;
  border-bottom: 0;
  border-radius: 20rpx 20rpx 0 0;
}

.line-icon--clock::before,
.blue-icon--clock::before {
  inset: 5rpx;
  border: 4rpx solid currentColor;
  border-radius: 50%;
}

.line-icon--clock::after,
.blue-icon--clock::after {
  left: 19rpx;
  top: 12rpx;
  width: 12rpx;
  height: 12rpx;
  border-left: 4rpx solid currentColor;
  border-bottom: 4rpx solid currentColor;
}

.line-icon--file::before {
  inset: 6rpx 10rpx;
  border: 4rpx solid currentColor;
  border-radius: 4rpx;
}

.line-icon--file::after {
  left: 15rpx;
  top: 17rpx;
  width: 12rpx;
  height: 3rpx;
  background: currentColor;
  box-shadow: 0 9rpx 0 currentColor;
}

.line-icon--message::before {
  inset: 7rpx 5rpx 10rpx;
  border: 4rpx solid currentColor;
  border-radius: 9rpx;
}

.line-icon--message::after {
  left: 14rpx;
  bottom: 4rpx;
  width: 10rpx;
  height: 10rpx;
  border-left: 4rpx solid currentColor;
  border-bottom: 4rpx solid currentColor;
  transform: rotate(-35deg);
}

.reject-label {
  width: 126rpx;
  flex: 0 0 auto;
  color: #343b4b;
  font-size: 29rpx;
  line-height: 1.35;
}

.reject-value {
  min-width: 0;
  flex: 1;
  color: #10172d;
  font-size: 29rpx;
  line-height: 1.35;
}

.opinion-box {
  margin-top: 6rpx;
  padding: 20rpx 24rpx;
  border-radius: 12rpx;
  background: #fff2e8;
}

.opinion-box text {
  color: #10172d;
  font-size: 28rpx;
  line-height: 1.7;
}

.plan-box {
  margin-top: 22rpx;
  padding: 18rpx 18rpx;
  border-radius: 12rpx;
  background: linear-gradient(100deg, #f3f8ff 0%, #f9fcff 100%);
}

.plan-row {
  min-height: 56rpx;
}

.blue-icon {
  color: #2876f0;
}

.blue-icon::before {
  inset: 7rpx;
  border-radius: 7rpx;
  background: currentColor;
}

.blue-icon::after {
  left: 16rpx;
  top: 15rpx;
  width: 10rpx;
  height: 4rpx;
  border-radius: 999rpx;
  background: #fff;
  box-shadow: 0 9rpx 0 #fff;
}

.blue-icon--calendar::before,
.blue-icon--upload::before {
  inset: 6rpx;
  border: 4rpx solid currentColor;
  border-radius: 9rpx;
  background: transparent;
}

.blue-icon--calendar::after {
  left: 13rpx;
  top: 16rpx;
  width: 14rpx;
  height: 4rpx;
  border-radius: 999rpx;
  background: currentColor;
  box-shadow: 0 10rpx 0 currentColor;
}

.blue-icon--upload::after {
  left: 17rpx;
  top: 12rpx;
  width: 10rpx;
  height: 18rpx;
  border-top: 4rpx solid currentColor;
  border-left: 4rpx solid currentColor;
  transform: rotate(45deg);
}

.blue-icon--clock::before {
  background: transparent;
}

.blue-icon--clock::after {
  background: transparent;
  box-shadow: none;
}

.plan-label {
  width: 268rpx;
  flex: 0 0 auto;
  color: #343b4b;
  font-size: 29rpx;
  line-height: 1.35;
}

.plan-value {
  min-width: 0;
  flex: 1;
  color: #10172d;
  font-size: 29rpx;
  line-height: 1.35;
}

.divider {
  height: 1rpx;
  margin: 26rpx 0 22rpx;
  background: #e7edf5;
}

.modify-count {
  margin-left: 10rpx;
  color: #687386;
  font-size: 29rpx;
}

.modify-title {
  color: #10172d;
  font-size: 32rpx;
  font-weight: 900;
}

.modify-row {
  min-height: 118rpx;
  border-bottom: 1rpx solid #eef2f7;
}

.modify-row:last-child {
  border-bottom: 0;
}

.modify-index {
  width: 58rpx;
  height: 58rpx;
  flex: 0 0 auto;
  margin-right: 22rpx;
  border-radius: 50%;
  background: #fff0dc;
  color: #ff7a1a;
  font-size: 34rpx;
  font-weight: 900;
  line-height: 58rpx;
  text-align: center;
}

.modify-copy {
  min-width: 0;
  flex: 1;
}

.modify-item-title {
  color: #10172d;
  font-size: 29rpx;
  font-weight: 900;
  line-height: 1.3;
}

.modify-desc {
  margin-top: 8rpx;
  color: #687386;
  font-size: 26rpx;
  line-height: 1.3;
}

.modify-tag {
  width: 100rpx;
  height: 48rpx;
  flex: 0 0 auto;
  border-radius: 9rpx;
  background: #fff0dc;
  color: #ff7a1a;
  font-size: 28rpx;
  font-weight: 800;
  line-height: 48rpx;
  text-align: center;
}

.attachment-count {
  color: #687386;
  font-size: 29rpx;
}

.attachment-file {
  gap: 20rpx;
  margin-top: 20rpx;
  padding: 20rpx 22rpx;
  border: 1rpx solid #e9eef5;
  border-radius: 14rpx;
}

.pdf-icon {
  position: relative;
  width: 72rpx;
  height: 72rpx;
  flex: 0 0 auto;
  border-radius: 8rpx;
  background: linear-gradient(135deg, #ff6a62, #de1d2d);
}

.pdf-icon::before {
  position: absolute;
  left: 21rpx;
  top: 20rpx;
  width: 30rpx;
  height: 30rpx;
  border: 3rpx solid #fff;
  border-top: 0;
  border-right: 0;
  border-radius: 50%;
  content: '';
  transform: rotate(-28deg);
}

.file-copy {
  min-width: 0;
  flex: 1;
}

.file-name {
  color: #10172d;
  font-size: 29rpx;
  font-weight: 800;
  line-height: 1.35;
}

.file-size {
  margin-top: 4rpx;
  color: #687386;
  font-size: 25rpx;
}

.view-link {
  color: #2876f0;
  font-size: 29rpx;
  font-weight: 800;
}

.info-tip {
  gap: 16rpx;
  padding: 22rpx 30rpx;
  border-radius: 12rpx;
  background: linear-gradient(100deg, #eaf3ff 0%, #f3f8ff 100%);
  color: #2876f0;
  font-size: 27rpx;
  font-weight: 800;
  line-height: 1.4;
}

.info-icon {
  width: 38rpx;
  height: 38rpx;
  flex: 0 0 auto;
  border-radius: 50%;
  background: #2876f0;
  color: #fff;
  font-size: 28rpx;
  font-weight: 900;
  line-height: 38rpx;
  text-align: center;
}

.fixed-actions {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  gap: 22rpx;
  padding: 18rpx 28rpx calc(18rpx + env(safe-area-inset-bottom));
  background: rgba(255, 255, 255, 0.96);
}

.action-button {
  height: 76rpx;
  flex: 1;
  border-radius: 14rpx;
  font-size: 30rpx;
}

.action-button--primary {
  flex: 1.5;
}

.fixed-actions :deep(.mobile-action-button--outline) {
  border-color: #d7dee8;
  color: #10172d;
}

.fixed-actions :deep(.mobile-action-button--primary) {
  background: linear-gradient(135deg, #2f82ff, #2368e8);
  box-shadow: 0 18rpx 34rpx rgba(35, 104, 232, 0.2);
}

@media (max-width: 374px) {
  .content {
    padding-right: 18rpx;
    padding-left: 18rpx;
  }

  .alert-card {
    gap: 18rpx;
    padding: 24rpx 20rpx;
  }

  .alert-icon {
    width: 70rpx;
    height: 70rpx;
    font-size: 44rpx;
    line-height: 62rpx;
  }

  .alert-title,
  .section-title {
    font-size: 30rpx;
  }

  .alert-desc,
  .reject-label,
  .reject-value,
  .opinion-box text,
  .plan-label,
  .plan-value,
  .modify-tag,
  .file-name,
  .view-link {
    font-size: 24rpx;
  }

  .reject-card,
  .plan-card,
  .attachment-card {
    padding: 20rpx;
  }

  .reject-label {
    width: 104rpx;
  }

  .plan-label {
    width: 188rpx;
  }

  .modify-row {
    min-height: 112rpx;
  }

  .modify-index {
    width: 50rpx;
    height: 50rpx;
    margin-right: 14rpx;
    font-size: 30rpx;
    line-height: 50rpx;
  }

  .modify-item-title,
  .modify-desc,
  .info-tip {
    font-size: 23rpx;
  }

  .modify-tag {
    width: 84rpx;
    height: 42rpx;
    line-height: 42rpx;
  }

  .fixed-actions {
    gap: 14rpx;
    padding-right: 18rpx;
    padding-left: 18rpx;
  }

  .action-button {
    font-size: 25rpx;
  }
}
</style>
