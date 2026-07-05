<script setup lang="ts">
import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobileNavbar from '../../../components/MobileNavbar.vue'
import MobilePageShell from '../../../components/MobilePageShell.vue'
import MobileStatusTag from '../../../components/MobileStatusTag.vue'

const satisfied = ['教学设计能力达到胜任级', '数字化教学培训学时已满足', '教研活动参与频次达标']
const gaps = ['企业实践不少于 30 天的近三年证明不足', '课程改革成果缺少可引用档案记录']
const actions = ['补充企业实践证明', '沉淀课程案例成果', '关注专业带头人岗位培训']

function goBack() {
  uni.navigateBack()
}

function navigateTo(url: string) {
  uni.navigateTo({ url })
}
</script>

<template>
  <MobilePageShell class="target-page" active="profile">
    <MobileNavbar title="目标岗位对照" size="compact" @back="goBack" />

    <MobileCard class="hero-card">
      <view class="hero-head">
        <view>
          <text class="eyebrow">目标岗位</text>
          <text class="hero-title">专业带头人后备</text>
        </view>
        <MobileStatusTag tone="blue">匹配度 78%</MobileStatusTag>
      </view>
      <text class="hero-desc">已满足教学和教研基础要求，企业实践与成果沉淀是主要缺口。</text>
    </MobileCard>

    <MobileCard class="section-card">
      <text class="section-title">已满足要求</text>
      <text v-for="item in satisfied" :key="item" class="list-item list-item--done">{{ item }}</text>
    </MobileCard>

    <MobileCard class="section-card">
      <text class="section-title">缺口要求</text>
      <text v-for="item in gaps" :key="item" class="list-item list-item--gap">{{ item }}</text>
      <view class="evidence-actions">
        <MobileActionButton class="wide-action" variant="outline" arrow @tap="navigateTo('/pages/profile/ability-profile/records/index?dimension=enterprise&from=target-position')">
          查看画像证据
        </MobileActionButton>
        <MobileActionButton class="wide-action" variant="outline" arrow @tap="navigateTo('/pages/archive/record-detail/index?recordId=enterprise-practice-shandong-software')">
          查看实践记录
        </MobileActionButton>
      </view>
    </MobileCard>

    <MobileCard class="section-card">
      <text class="section-title">建议行动</text>
      <text v-for="item in actions" :key="item" class="action-text">{{ item }}</text>
    </MobileCard>
  </MobilePageShell>
</template>

<style lang="scss" scoped>
.target-page {
  padding-bottom: calc(150rpx + env(safe-area-inset-bottom));
}

.hero-card,
.section-card {
  margin-top: 22rpx;
  padding: 32rpx;
  border-radius: 30rpx;
}

.hero-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18rpx;
}

.eyebrow,
.hero-desc,
.list-item,
.action-text {
  display: block;
  color: #66728a;
  font-size: 25rpx;
  line-height: 1.6;
}

.hero-title,
.section-title {
  display: block;
  color: #10172d;
  font-weight: 900;
}

.hero-title {
  margin-top: 8rpx;
  font-size: 44rpx;
}

.section-title {
  font-size: 34rpx;
}

.hero-desc,
.list-item,
.action-text {
  margin-top: 16rpx;
}

.list-item--done {
  color: #168a53;
}

.list-item--gap {
  color: #c77712;
}

.evidence-actions {
  display: grid;
  gap: 18rpx;
  margin-top: 24rpx;
}

.wide-action {
  height: 82rpx;
  font-size: 26rpx;
}
</style>
