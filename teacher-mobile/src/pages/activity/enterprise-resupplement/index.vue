<script setup lang="ts">
import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobileNavbar from '../../../components/MobileNavbar.vue'

const infoRows = [
  { label: '实践单位：', value: '山东某软件科技有限公司', type: 'building' },
  { label: '实践岗位：', value: '软件开发工程师', type: 'person' },
  { label: '实践时间：', value: '2023.07 - 2023.12', type: 'calendar' },
  { label: '实践天数：', value: '180 天', type: 'clock' },
]

function goBack() {
  uni.navigateBack()
}

function submitAgain() {
  uni.navigateTo({ url: '/pages/activity/enterprise-supplement-submitted/index' })
}
</script>

<template>
  <view class="resupplement-page">
    <MobileNavbar title="需要补充" size="regular" @back="goBack" />

    <view class="content">
      <view class="alert-card">
        <view class="alert-icon"></view>
        <view class="alert-copy">
          <view class="alert-title-row">
            <text class="alert-title">这条企业实践记录还需要补充材料</text>
            <text class="alert-tag">需补充</text>
          </view>
          <text class="alert-desc">部门核验时发现，当前材料还不能完整确认实践情况。</text>
        </view>
      </view>

      <MobileCard class="record-card">
        <view class="record-head">
          <view class="section-icon section-icon--bag"></view>
          <view class="record-copy">
            <text class="record-title">山东某软件科技有限公司企业实践</text>
            <view class="record-meta">
              <text>企业实践</text>
              <text class="divider">|</text>
              <text>行业实践</text>
              <text class="divider">|</text>
              <text class="orange-text">需补充</text>
            </view>
          </view>
        </view>

        <view class="info-box">
          <text class="green-section-title">系统已整理</text>
          <view v-for="item in infoRows" :key="item.label" class="info-row">
            <view class="line-icon" :class="`line-icon--${item.type}`"></view>
            <text class="info-label">{{ item.label }}</text>
            <text class="info-value">{{ item.value }}</text>
          </view>
        </view>
      </MobileCard>

      <MobileCard class="feedback-card">
        <view class="section-head">
          <view class="section-icon section-icon--feedback"></view>
          <text class="section-title">核验反馈</text>
        </view>
        <view class="feedback-message">
          <text>当前材料缺少单位盖章页，请补充带有单位盖章或签字的证明材料。</text>
        </view>
        <view class="feedback-row">
          <view class="mini-icon mini-icon--department"></view>
          <text class="feedback-label">反馈部门：</text>
          <text class="feedback-value">智能制造学院</text>
        </view>
        <view class="feedback-row">
          <view class="mini-icon mini-icon--time"></view>
          <text class="feedback-label">反馈时间：</text>
          <text class="feedback-value">今天 10:28</text>
        </view>
      </MobileCard>

      <MobileCard class="material-card">
        <view class="section-head">
          <view class="section-icon section-icon--file"></view>
          <text class="section-title">已提交材料</text>
        </view>
        <view class="submitted-row">
          <view class="pdf-icon"></view>
          <view class="material-copy">
            <text class="file-name">企业实践证明.pdf</text>
            <text class="file-meta">PDF ｜ 2.4MB</text>
          </view>
          <text class="returned-text">已退回补充</text>
        </view>
        <text class="submit-time">提交时间：今天 09:41</text>
      </MobileCard>

      <MobileCard class="upload-card">
        <view class="section-head">
          <view class="section-icon section-icon--upload"></view>
          <view class="section-copy">
            <text class="section-title">重新上传材料</text>
            <text class="section-desc">请上传带单位盖章或签字的企业实践证明 / 企业鉴定材料。</text>
          </view>
        </view>
        <view class="upload-drop">
          <view class="upload-plus">+</view>
          <text>上传新的证明材料</text>
        </view>
      </MobileCard>

      <MobileCard class="remark-card">
        <view class="section-head">
          <view class="section-icon section-icon--edit"></view>
          <text class="section-title">补充说明</text>
          <text class="optional-tag">可选</text>
        </view>
        <view class="textarea-box">
          <textarea
            class="remark-input"
            placeholder="请输入补充说明，例如：本次补充上传了盖章页"
            :maxlength="200"
          />
          <text class="textarea-count">0/200</text>
        </view>
      </MobileCard>

      <view class="notice-card">
        <view class="notice-icon">i</view>
        <text>重新提交后，将再次提交所在学院或人事相关部门核验。</text>
      </view>
    </view>

    <view class="bottom-actions">
      <MobileActionButton class="action-button action-button--later" variant="outline">稍后处理</MobileActionButton>
      <MobileActionButton class="action-button" variant="primary" @tap="submitAgain">重新提交</MobileActionButton>
    </view>
  </view>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.resupplement-page {
  min-height: 100vh;
  padding-bottom: calc(148rpx + env(safe-area-inset-bottom));
  background:
    radial-gradient(circle at 12% 0%, rgba(224, 251, 238, 0.72), transparent 34%),
    linear-gradient(180deg, #fbfffd 0%, #ffffff 45%, #f5faf8 100%);
  color: #10172d;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 22rpx;
  padding: 22rpx 34rpx 0;
}

.alert-card,
.alert-title-row,
.record-head,
.record-meta,
.info-row,
.section-head,
.feedback-row,
.submitted-row,
.upload-drop,
.notice-card,
.bottom-actions {
  display: flex;
  align-items: center;
}

.alert-card {
  gap: 28rpx;
  padding: 28rpx 34rpx;
  border: 2rpx solid rgba(255, 118, 38, 0.25);
  border-radius: 24rpx;
  background: linear-gradient(100deg, rgba(255, 252, 249, 0.98), rgba(255, 247, 238, 0.82));
}

.alert-icon {
  position: relative;
  width: 104rpx;
  height: 104rpx;
  flex: 0 0 auto;
  border: 18rpx solid #ffeadb;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff872b, #ff5c15);
}

.alert-icon::before {
  position: absolute;
  left: 39rpx;
  top: 24rpx;
  width: 14rpx;
  height: 42rpx;
  border-radius: 999rpx;
  background: #fff;
  content: '';
}

.alert-icon::after {
  position: absolute;
  left: 39rpx;
  bottom: 23rpx;
  width: 14rpx;
  height: 14rpx;
  border-radius: 50%;
  background: #fff;
  content: '';
}

.alert-copy {
  min-width: 0;
  flex: 1;
}

.alert-title-row {
  gap: 18rpx;
}

.alert-title,
.alert-desc,
.record-title,
.green-section-title,
.section-title,
.section-desc,
.info-label,
.info-value,
.feedback-message,
.feedback-label,
.feedback-value,
.file-name,
.file-meta,
.submit-time {
  display: block;
}

.alert-title {
  min-width: 0;
  flex: 1;
  color: #ff5317;
  font-size: 34rpx;
  font-weight: 900;
  line-height: 1.25;
}

.alert-tag {
  flex: 0 0 auto;
  padding: 11rpx 22rpx;
  border: 2rpx solid rgba(255, 104, 36, 0.28);
  border-radius: 14rpx;
  background: #fff1e8;
  color: #ff5a18;
  font-size: 26rpx;
  font-weight: 900;
}

.alert-desc {
  margin-top: 18rpx;
  color: #344054;
  font-size: 27rpx;
  line-height: 1.55;
}

.record-card,
.feedback-card,
.material-card,
.upload-card,
.remark-card {
  padding: 30rpx 32rpx;
  border-radius: 24rpx;
}

.record-head {
  gap: 24rpx;
}

.section-icon {
  position: relative;
  width: 62rpx;
  height: 62rpx;
  flex: 0 0 auto;
  border-radius: 14rpx;
  background: #e7f8ef;
  color: #12b86a;
}

.section-icon::before,
.section-icon::after {
  position: absolute;
  content: '';
}

.section-icon--bag::before {
  left: 17rpx;
  top: 22rpx;
  width: 30rpx;
  height: 26rpx;
  border-radius: 5rpx;
  background: currentColor;
}

.section-icon--bag::after {
  left: 26rpx;
  top: 16rpx;
  width: 12rpx;
  height: 10rpx;
  border: 4rpx solid currentColor;
  border-bottom: 0;
  border-radius: 9rpx 9rpx 0 0;
}

.record-copy,
.section-copy,
.material-copy {
  min-width: 0;
  flex: 1;
}

.record-title {
  font-size: 34rpx;
  font-weight: 900;
  line-height: 1.28;
}

.record-meta {
  flex-wrap: wrap;
  gap: 18rpx;
  margin-top: 16rpx;
  color: #536079;
  font-size: 27rpx;
}

.divider {
  color: #b7c0cd;
}

.orange-text,
.returned-text {
  color: #ff5a18;
  font-weight: 900;
}

.info-box {
  margin-top: 24rpx;
  padding: 24rpx 28rpx 20rpx;
  border: 2rpx solid #e4e9ef;
  border-radius: 16rpx;
  background: #fff;
}

.green-section-title {
  color: #09a75b;
  font-size: 30rpx;
  font-weight: 900;
}

.info-row {
  gap: 18rpx;
  padding: 22rpx 0;
  border-bottom: 2rpx dashed #edf1f4;
}

.info-row:last-child {
  border-bottom: 0;
}

.line-icon,
.mini-icon {
  position: relative;
  width: 36rpx;
  height: 36rpx;
  flex: 0 0 auto;
  color: #344054;
}

.line-icon--building::before {
  position: absolute;
  inset: 6rpx 8rpx 2rpx;
  border-radius: 3rpx;
  background: currentColor;
  box-shadow: 10rpx 8rpx 0 -2rpx currentColor;
  content: '';
}

.line-icon--person::before {
  position: absolute;
  left: 11rpx;
  top: 5rpx;
  width: 14rpx;
  height: 14rpx;
  border: 4rpx solid currentColor;
  border-radius: 50%;
  content: '';
}

.line-icon--person::after {
  position: absolute;
  left: 7rpx;
  bottom: 3rpx;
  width: 22rpx;
  height: 14rpx;
  border: 4rpx solid currentColor;
  border-radius: 14rpx 14rpx 4rpx 4rpx;
  content: '';
}

.line-icon--calendar::before {
  position: absolute;
  inset: 6rpx 4rpx 4rpx;
  border: 4rpx solid currentColor;
  border-radius: 5rpx;
  content: '';
}

.line-icon--calendar::after {
  position: absolute;
  left: 9rpx;
  right: 9rpx;
  top: 16rpx;
  height: 4rpx;
  background: currentColor;
  content: '';
}

.line-icon--clock::before {
  position: absolute;
  inset: 4rpx;
  border: 4rpx solid currentColor;
  border-radius: 50%;
  content: '';
}

.line-icon--clock::after {
  position: absolute;
  left: 17rpx;
  top: 10rpx;
  width: 4rpx;
  height: 13rpx;
  border-radius: 999rpx;
  background: currentColor;
  box-shadow: 7rpx 10rpx 0 -1rpx currentColor;
  content: '';
}

.info-label {
  flex: 0 0 160rpx;
  color: #344054;
  font-size: 27rpx;
}

.info-value {
  min-width: 0;
  flex: 1;
  color: #344054;
  font-size: 27rpx;
  line-height: 1.35;
  text-align: right;
}

.section-head {
  gap: 22rpx;
}

.section-title {
  font-size: 34rpx;
  font-weight: 900;
}

.section-desc {
  margin-top: 12rpx;
  color: #344054;
  font-size: 27rpx;
  line-height: 1.48;
}

.section-icon--feedback {
  background: #fff0e6;
  color: #ff6a1f;
}

.section-icon--feedback::before {
  left: 15rpx;
  top: 19rpx;
  width: 34rpx;
  height: 24rpx;
  border-radius: 7rpx;
  background: currentColor;
}

.section-icon--feedback::after {
  left: 24rpx;
  top: 39rpx;
  border-top: 10rpx solid currentColor;
  border-right: 10rpx solid transparent;
}

.feedback-message {
  margin: 22rpx 0 18rpx 84rpx;
  padding: 17rpx 22rpx;
  border: 2rpx solid #ffe1c8;
  border-radius: 12rpx;
  background: linear-gradient(90deg, #fff7ed, #fffaf5);
  color: #ff5317;
  font-size: 27rpx;
  font-weight: 900;
  line-height: 1.45;
}

.feedback-row {
  gap: 18rpx;
  padding: 8rpx 0 8rpx 84rpx;
}

.mini-icon--department::before {
  position: absolute;
  left: 4rpx;
  top: 9rpx;
  width: 28rpx;
  height: 21rpx;
  border-top: 7rpx solid currentColor;
  border-bottom: 7rpx solid currentColor;
  content: '';
}

.mini-icon--department::after {
  position: absolute;
  left: 9rpx;
  bottom: 1rpx;
  width: 18rpx;
  height: 8rpx;
  background: currentColor;
  content: '';
}

.mini-icon--time::before {
  position: absolute;
  inset: 4rpx;
  border: 4rpx solid currentColor;
  border-radius: 50%;
  content: '';
}

.mini-icon--time::after {
  position: absolute;
  left: 17rpx;
  top: 10rpx;
  width: 4rpx;
  height: 13rpx;
  border-radius: 999rpx;
  background: currentColor;
  box-shadow: 7rpx 10rpx 0 -1rpx currentColor;
  content: '';
}

.feedback-label {
  flex: 0 0 150rpx;
  color: #344054;
  font-size: 27rpx;
}

.feedback-value {
  min-width: 0;
  flex: 1;
  color: #344054;
  font-size: 27rpx;
  text-align: right;
}

.section-icon--file::before {
  left: 20rpx;
  top: 15rpx;
  width: 24rpx;
  height: 34rpx;
  border-radius: 4rpx;
  background: currentColor;
}

.section-icon--file::after {
  left: 27rpx;
  top: 27rpx;
  width: 12rpx;
  height: 4rpx;
  border-radius: 999rpx;
  background: #eafff2;
  box-shadow: 0 10rpx 0 #eafff2;
}

.submitted-row {
  gap: 26rpx;
  margin: 20rpx 0 0 84rpx;
  padding-bottom: 20rpx;
  border-bottom: 2rpx solid #edf1f4;
}

.pdf-icon {
  position: relative;
  width: 76rpx;
  height: 76rpx;
  flex: 0 0 auto;
  border-radius: 14rpx;
  background: linear-gradient(135deg, #ff5f5a, #ef2f34);
}

.pdf-icon::before {
  position: absolute;
  left: 20rpx;
  top: 23rpx;
  width: 36rpx;
  height: 27rpx;
  border: 5rpx solid #fff;
  border-right: 0;
  border-left: 0;
  content: '';
  transform: rotate(-22deg);
}

.file-name {
  font-size: 30rpx;
  font-weight: 900;
}

.file-meta {
  margin-top: 10rpx;
  color: #526079;
  font-size: 26rpx;
}

.returned-text {
  flex: 0 0 auto;
  font-size: 28rpx;
}

.submit-time {
  margin: 16rpx 0 0 84rpx;
  color: #687386;
  font-size: 26rpx;
}

.section-icon--upload::before {
  left: 14rpx;
  top: 22rpx;
  width: 36rpx;
  height: 24rpx;
  border-radius: 14rpx;
  background: currentColor;
  box-shadow: -9rpx 7rpx 0 -1rpx currentColor, 11rpx 8rpx 0 -2rpx currentColor;
}

.section-icon--upload::after {
  left: 29rpx;
  top: 22rpx;
  width: 6rpx;
  height: 26rpx;
  border-radius: 999rpx;
  background: #eafff2;
  box-shadow: 0 0 0 0 #eafff2;
}

.upload-drop {
  justify-content: center;
  gap: 16rpx;
  margin: 24rpx 14rpx 0 84rpx;
  min-height: 92rpx;
  border: 2rpx dashed #0eb35f;
  border-radius: 14rpx;
  background: #fbfffd;
  color: #08a85c;
  font-size: 29rpx;
  font-weight: 900;
}

.upload-plus {
  width: 32rpx;
  height: 32rpx;
  border: 3rpx solid currentColor;
  border-radius: 50%;
  font-size: 28rpx;
  font-weight: 900;
  line-height: 27rpx;
  text-align: center;
}

.section-icon--edit::before {
  left: 17rpx;
  top: 17rpx;
  width: 30rpx;
  height: 10rpx;
  border-radius: 999rpx;
  background: currentColor;
  transform: rotate(-42deg);
}

.section-icon--edit::after {
  left: 15rpx;
  bottom: 13rpx;
  width: 34rpx;
  height: 5rpx;
  border-radius: 999rpx;
  background: currentColor;
}

.optional-tag {
  padding: 6rpx 16rpx;
  border-radius: 999rpx;
  background: #dcf7e8;
  color: #08a85c;
  font-size: 24rpx;
  font-weight: 900;
}

.textarea-box {
  position: relative;
  margin: 24rpx 14rpx 0 84rpx;
  min-height: 102rpx;
  border: 2rpx solid #e1e6ed;
  border-radius: 14rpx;
  background: #fbfcfe;
}

.remark-input {
  width: 100%;
  height: 102rpx;
  padding: 20rpx 24rpx 30rpx;
  color: #344054;
  font-size: 26rpx;
  line-height: 1.45;
  box-sizing: border-box;
}

.textarea-count {
  position: absolute;
  right: 20rpx;
  bottom: 12rpx;
  color: #8a94a6;
  font-size: 24rpx;
}

.notice-card {
  gap: 26rpx;
  padding: 24rpx 34rpx;
  border-radius: 18rpx;
  background: linear-gradient(90deg, #eafff2, #f8fffb);
  color: #1f2a44;
  font-size: 28rpx;
  font-weight: 800;
  line-height: 1.45;
}

.notice-icon {
  width: 34rpx;
  height: 34rpx;
  flex: 0 0 auto;
  border: 4rpx solid #0aae5d;
  border-radius: 50%;
  color: #0aae5d;
  font-size: 23rpx;
  font-weight: 900;
  line-height: 27rpx;
  text-align: center;
}

.bottom-actions {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 5;
  gap: 34rpx;
  padding: 24rpx 34rpx calc(26rpx + env(safe-area-inset-bottom));
  background: rgba(255, 255, 255, 0.94);
  backdrop-filter: blur(16rpx);
}

.action-button {
  height: 84rpx;
  flex: 1;
  border-radius: 14rpx;
  font-size: 32rpx;
}

.action-button--later {
  background: #fff;
}

@media (max-width: 370px) {
  .content {
    padding-right: 24rpx;
    padding-left: 24rpx;
  }

  .alert-card {
    gap: 22rpx;
    padding-right: 24rpx;
    padding-left: 24rpx;
  }

  .alert-title-row {
    align-items: flex-start;
    flex-direction: column;
    gap: 12rpx;
  }

  .info-label,
  .feedback-label {
    flex-basis: 138rpx;
  }

  .feedback-message,
  .feedback-row,
  .submitted-row,
  .submit-time,
  .upload-drop,
  .textarea-box {
    margin-left: 0;
    padding-left: 0;
  }

  .bottom-actions {
    gap: 22rpx;
    padding-right: 24rpx;
    padding-left: 24rpx;
  }
}
</style>
