<script setup lang="ts">
import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobileNavbar from '../../../components/MobileNavbar.vue'
import MobilePageShell from '../../../components/MobilePageShell.vue'
import MobileStatusTag from '../../../components/MobileStatusTag.vue'

const keyInfo = [
  { label: '证书名称', value: '职业院校教师数字素养提升培训证书' },
  { label: '培训项目', value: '教师数字素养提升专项培训' },
  { label: '发证单位', value: '全国职业院校教师培训中心' },
  { label: '获得时间', value: '2026.06.10' },
  { label: '培训学时', value: '32 学时' },
  { label: '证书编号', value: 'PX20260610027' },
]

const evidenceInfo = [
  { label: '数据来源', value: '部门导入培训名单' },
  { label: '识别依据', value: '姓名、工号、学院与当前账号一致' },
  { label: '当前账号', value: '林老师 ｜ 智能制造学院' },
]

function goBack() {
  uni.navigateBack()
}

function goEdit() {
  uni.navigateTo({ url: '/pages/todo/certificate-edit/index' })
}
</script>

<template>
  <MobilePageShell class="detail-page" active="todo">
    <MobileNavbar title="待确认记录" size="compact" @back="goBack" />

    <text class="page-hint">系统已帮你识别，请确认是否属于本人</text>

    <MobileCard class="summary-card">
      <view class="certificate-icon">
        <view class="certificate-icon__paper"></view>
      </view>
      <view class="summary-card__body">
        <MobileStatusTag tone="blue">待确认</MobileStatusTag>
        <text class="summary-title">确认一条培训证书</text>
        <text class="summary-desc">确认后将进入后续核验，通过后入档</text>
      </view>
      <text class="summary-state">待你确认</text>
    </MobileCard>

    <MobileCard class="info-card">
      <text class="section-title">关键信息</text>
      <view v-for="item in keyInfo" :key="item.label" class="info-row">
        <text class="info-label">{{ item.label }}：</text>
        <text class="info-value">{{ item.value }}</text>
      </view>
    </MobileCard>

    <MobileCard class="info-card">
      <text class="section-title">系统识别依据</text>
      <view v-for="item in evidenceInfo" :key="item.label" class="info-row">
        <text class="info-label">{{ item.label }}：</text>
        <text class="info-value">{{ item.value }}</text>
      </view>
    </MobileCard>

    <MobileCard class="material-card">
      <text class="section-title">相关材料</text>
      <view class="material-row">
        <view class="material-icon"></view>
        <text class="material-name">培训证书.jpg</text>
        <MobileActionButton class="material-link" variant="link" arrow>查看</MobileActionButton>
      </view>
    </MobileCard>

    <MobileCard class="confirm-card">
      <text class="section-title">请你确认</text>
      <text class="confirm-desc">如记录属于本人且信息无误，请直接确认；如信息有误，可先修改后再提交确认。</text>
      <MobileActionButton class="confirm-action confirm-action--primary" variant="primary">确认是我的</MobileActionButton>
      <MobileActionButton class="confirm-action confirm-action--outline" variant="outline" @tap="goEdit">信息有误，修改一下</MobileActionButton>
      <button class="reject-button">不是我的</button>
    </MobileCard>
  </MobilePageShell>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.detail-page {
  --detail-danger: #ff1f39;
}

.system-status,
.system-status__icons,
.nav-head,
.summary-card,
.info-row,
.material-row {
  display: flex;
  align-items: center;
}

.system-status {
  height: 42rpx;
  justify-content: space-between;
  padding: 0 18rpx;
}

.system-status__time {
  color: #050812;
  font-size: 30rpx;
  font-weight: 900;
  line-height: 1;
}

.system-status__icons {
  gap: 14rpx;
}

.status-signal {
  width: 38rpx;
  height: 26rpx;
  background: #050812;
  clip-path: polygon(0 70%, 18% 70%, 18% 100%, 0 100%, 0 70%, 27% 52%, 45% 52%, 45% 100%, 27% 100%, 27% 52%, 54% 32%, 72% 32%, 72% 100%, 54% 100%, 54% 32%, 82% 10%, 100% 10%, 100% 100%, 82% 100%, 82% 10%);
}

.status-wifi {
  position: relative;
  width: 36rpx;
  height: 26rpx;
  border: 8rpx solid #050812;
  border-color: #050812 transparent transparent;
  border-radius: 50%;
}

.status-wifi::after {
  position: absolute;
  right: 7rpx;
  bottom: -9rpx;
  width: 9rpx;
  height: 9rpx;
  border-radius: 50%;
  background: #050812;
  content: '';
}

.status-battery {
  position: relative;
  width: 52rpx;
  height: 26rpx;
  border: 4rpx solid #050812;
  border-radius: 8rpx;
}

.status-battery::before {
  position: absolute;
  top: 4rpx;
  left: 4rpx;
  width: 38rpx;
  height: 10rpx;
  border-radius: 4rpx;
  background: #050812;
  content: '';
}

.status-battery::after {
  position: absolute;
  top: 6rpx;
  right: -9rpx;
  width: 5rpx;
  height: 12rpx;
  border-radius: 0 4rpx 4rpx 0;
  background: #050812;
  content: '';
}

.nav-head {
  height: 72rpx;
  justify-content: space-between;
}

.back-button {
  position: relative;
  width: 72rpx;
  height: 72rpx;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
}

.back-button::after,
.reject-button::after {
  display: none;
  border: 0;
}

.back-button__icon {
  position: absolute;
  top: 20rpx;
  left: 22rpx;
  width: 26rpx;
  height: 26rpx;
  border-bottom: 5rpx solid #0d1430;
  border-left: 5rpx solid #0d1430;
  transform: rotate(45deg);
}

.nav-title {
  color: #10172d;
  font-size: 34rpx;
  font-weight: 900;
  line-height: 1;
}

.nav-spacer {
  width: 72rpx;
}

.page-hint {
  display: block;
  margin: 0 18rpx 12rpx;
  color: #526079;
  font-size: 25rpx;
  line-height: 1.3;
}

.summary-card,
.info-card,
.material-card,
.confirm-card {
  margin-top: 12rpx;
  padding: 22rpx 32rpx;
}

.summary-card {
  position: relative;
  gap: 28rpx;
  min-height: 112rpx;
}

.certificate-icon {
  position: relative;
  width: 78rpx;
  height: 78rpx;
  flex: 0 0 78rpx;
  border-radius: 24rpx;
  background: #eaf4ff;
  color: #1677ff;
}

.certificate-icon__paper {
  position: absolute;
  top: 18rpx;
  left: 24rpx;
  width: 32rpx;
  height: 42rpx;
  border: 7rpx solid currentColor;
  border-radius: 6rpx;
}

.certificate-icon__paper::before,
.certificate-icon__paper::after {
  position: absolute;
  left: 9rpx;
  width: 18rpx;
  height: 5rpx;
  border-radius: 5rpx;
  background: currentColor;
  content: '';
}

.certificate-icon__paper::before {
  top: 15rpx;
}

.certificate-icon__paper::after {
  top: 29rpx;
}

.summary-card__body {
  min-width: 0;
  flex: 1;
}

.summary-title {
  display: block;
  margin-top: 10rpx;
  color: #10172d;
  font-size: 30rpx;
  font-weight: 900;
  line-height: 1.2;
}

.summary-desc {
  display: block;
  margin-top: 10rpx;
  color: #35425e;
  font-size: 23rpx;
  line-height: 1.28;
}

.summary-state {
  position: absolute;
  top: 32rpx;
  right: 34rpx;
  color: var(--detail-danger);
  font-size: 27rpx;
  font-weight: 900;
  line-height: 1;
}

.section-title {
  display: block;
  color: #10172d;
  font-size: 31rpx;
  font-weight: 900;
  line-height: 1.2;
}

.info-row {
  min-height: 39rpx;
  border-bottom: 1rpx solid $teacher-mobile-card-border;
  color: #2f3d5b;
  font-size: 22rpx;
  line-height: 1.25;
}

.info-row:first-of-type {
  margin-top: 16rpx;
}

.info-row:last-child {
  border-bottom: 0;
}

.info-label {
  width: 176rpx;
  flex: 0 0 176rpx;
  color: #526079;
}

.info-value {
  min-width: 0;
  flex: 1;
}

.material-row {
  gap: 18rpx;
  min-height: 58rpx;
  margin-top: 14rpx;
}

.material-icon {
  position: relative;
  width: 46rpx;
  height: 46rpx;
  flex: 0 0 46rpx;
  border-radius: 12rpx;
  background: #eaf4ff;
}

.material-icon::before {
  position: absolute;
  inset: 12rpx;
  border: 5rpx solid #1677ff;
  border-radius: 6rpx;
  content: '';
}

.material-icon::after {
  position: absolute;
  right: 16rpx;
  bottom: 16rpx;
  width: 18rpx;
  height: 16rpx;
  background: #1677ff;
  clip-path: polygon(0 100%, 38% 48%, 58% 72%, 78% 38%, 100% 100%);
  content: '';
}

.material-name {
  flex: 1;
  color: #10172d;
  font-size: 25rpx;
  font-weight: 800;
}

.material-link {
  gap: 10rpx;
  color: #2f3d5b;
  font-size: 25rpx;
}

.confirm-desc {
  display: block;
  margin-top: 14rpx;
  color: #35425e;
  font-size: 23rpx;
  line-height: 1.35;
}

.confirm-action {
  width: 100%;
  height: 56rpx;
  margin-top: 16rpx;
  border-radius: 14rpx;
  font-size: 27rpx;
  line-height: 56rpx;
}

.confirm-action--outline {
  margin-top: 12rpx;
  background: #fff;
}

.reject-button {
  width: 100%;
  height: 56rpx;
  margin: 12rpx 0 0;
  padding: 0;
  border: 0;
  border-radius: 14rpx;
  background: #f2f5fa;
  color: #2f3d5b;
  font-size: 25rpx;
  font-weight: 900;
  line-height: 56rpx;
}

@media (max-width: 374px) {
  .summary-card,
  .info-card,
  .material-card,
  .confirm-card {
    padding-right: 26rpx;
    padding-left: 26rpx;
  }

  .info-label {
    width: 150rpx;
    flex-basis: 150rpx;
  }
}
</style>
