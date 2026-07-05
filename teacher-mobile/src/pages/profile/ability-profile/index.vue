<script setup lang="ts">
import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobileNavbar from '../../../components/MobileNavbar.vue'
import MobilePageShell from '../../../components/MobilePageShell.vue'
import MobileStatusTag from '../../../components/MobileStatusTag.vue'

const dimensions = [
  { name: '教学设计', score: 88, desc: '课堂设计和数字化资源证据充分', tone: 'green' },
  { name: '教研协作', score: 76, desc: '虚拟教研贡献持续增加', tone: 'blue' },
  { name: '企业实践', score: 63, desc: '实践天数和岗位证明仍需补齐', tone: 'orange' },
  { name: '社会服务', score: 70, desc: '服务记录稳定，但影响力材料偏少', tone: 'purple' },
]

const weaknesses = [
  '企业实践岗位证明缺少最近一次部门核验结果',
  '教研成果材料偏重活动参与，缺少可复用成果证据',
]

const recommendations = [
  { title: '补齐企业实践证明', desc: '优先补充岗位任务、实践天数和企业评价材料' },
  { title: '参加数字化教学专题研修', desc: '提升资源共建和课堂数据分析证据强度' },
]

function goBack() {
  uni.navigateBack()
}

function navigateTo(url: string) {
  uni.navigateTo({ url })
}
</script>

<template>
  <MobilePageShell class="profile-detail-page" active="profile">
    <MobileNavbar title="我的能力画像" size="compact" @back="goBack" />

    <MobileCard class="hero-card">
      <view class="hero-top">
        <view>
          <text class="eyebrow">2026 年度发展周期</text>
          <text class="hero-title">发展指数 72</text>
        </view>
        <MobileStatusTag tone="green">胜任级</MobileStatusTag>
      </view>
      <text class="hero-desc">教学能力证据充分，企业实践和成果沉淀仍是本周期主要短板。</text>
      <view class="hero-actions">
        <MobileActionButton class="hero-action" variant="outline" @tap="navigateTo('/pages/profile/ability-profile/records/index?from=ability-profile')">
          画像记录
        </MobileActionButton>
        <MobileActionButton class="hero-action" variant="outline" @tap="navigateTo('/pages/profile/development-report/index?from=ability-profile')">
          发展报告
        </MobileActionButton>
      </view>
    </MobileCard>

    <MobileCard class="section-card">
      <text class="section-title">维度分布</text>
      <view v-for="item in dimensions" :key="item.name" class="dimension-row">
        <view class="dimension-head">
          <text class="dimension-name">{{ item.name }}</text>
          <text class="dimension-score">{{ item.score }}</text>
        </view>
        <view class="score-track">
          <view class="score-bar" :class="`score-bar--${item.tone}`" :style="{ width: `${item.score}%` }"></view>
        </view>
        <text class="dimension-desc">{{ item.desc }}</text>
      </view>
    </MobileCard>

    <MobileCard class="section-card">
      <text class="section-title">短板提示</text>
      <view v-for="item in weaknesses" :key="item" class="warning-row">
        <view class="warning-dot"></view>
        <text>{{ item }}</text>
      </view>
    </MobileCard>

    <MobileCard class="section-card">
      <text class="section-title">推荐方向</text>
      <view v-for="item in recommendations" :key="item.title" class="recommend-row">
        <text class="recommend-title">{{ item.title }}</text>
        <text class="recommend-desc">{{ item.desc }}</text>
      </view>
    </MobileCard>

    <MobileCard class="section-card action-card">
      <MobileActionButton class="wide-action" variant="outline" arrow @tap="navigateTo('/pages/profile/target-position/index?from=ability-profile')">
        目标岗位对照
      </MobileActionButton>
      <MobileActionButton class="wide-action" variant="outline" arrow @tap="navigateTo('/pages/profile/tenure-requirement/index?from=ability-profile')">
        聘期要求对照
      </MobileActionButton>
    </MobileCard>
  </MobilePageShell>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.profile-detail-page {
  padding-bottom: calc(150rpx + env(safe-area-inset-bottom));
}

.hero-card,
.section-card {
  margin-top: 22rpx;
  padding: 32rpx;
  border-radius: 30rpx;
}

.hero-top,
.dimension-head,
.hero-actions {
  display: flex;
  align-items: center;
}

.hero-top,
.dimension-head {
  justify-content: space-between;
}

.eyebrow,
.hero-desc,
.dimension-desc,
.recommend-desc {
  display: block;
  color: #66728a;
  font-size: 24rpx;
  line-height: 1.6;
}

.hero-title {
  display: block;
  margin-top: 8rpx;
  color: #10172d;
  font-size: 56rpx;
  font-weight: 900;
  line-height: 1.08;
}

.hero-desc {
  margin-top: 20rpx;
}

.hero-actions {
  gap: 18rpx;
  margin-top: 24rpx;
}

.hero-action {
  flex: 1;
  height: 72rpx;
  font-size: 25rpx;
}

.section-title {
  display: block;
  color: #10172d;
  font-size: 34rpx;
  font-weight: 900;
}

.dimension-row,
.recommend-row {
  margin-top: 24rpx;
}

.dimension-name,
.recommend-title {
  color: #172039;
  font-size: 28rpx;
  font-weight: 900;
}

.dimension-score {
  color: $teacher-mobile-primary-dark;
  font-size: 30rpx;
  font-weight: 900;
}

.score-track {
  height: 14rpx;
  margin: 14rpx 0 10rpx;
  overflow: hidden;
  border-radius: 999rpx;
  background: #edf3f7;
}

.score-bar {
  height: 100%;
  border-radius: inherit;
}

.score-bar--green {
  background: #0ec165;
}

.score-bar--blue {
  background: #4c8dff;
}

.score-bar--orange {
  background: #ff9f43;
}

.score-bar--purple {
  background: #8b6cff;
}

.warning-row {
  display: flex;
  gap: 16rpx;
  margin-top: 20rpx;
  color: #27324a;
  font-size: 26rpx;
  line-height: 1.55;
}

.warning-dot {
  flex: 0 0 auto;
  width: 14rpx;
  height: 14rpx;
  margin-top: 12rpx;
  border-radius: 999rpx;
  background: #ff9f43;
}

.recommend-desc {
  margin-top: 8rpx;
}

.action-card {
  display: grid;
  gap: 18rpx;
}

.wide-action {
  height: 82rpx;
  font-size: 26rpx;
}
</style>
