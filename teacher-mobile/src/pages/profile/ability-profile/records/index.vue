<script setup lang="ts">
import MobileActionButton from '../../../../components/MobileActionButton.vue'
import MobileCard from '../../../../components/MobileCard.vue'
import MobileNavbar from '../../../../components/MobileNavbar.vue'
import MobilePageShell from '../../../../components/MobilePageShell.vue'
import MobileStatusTag from '../../../../components/MobileStatusTag.vue'

const records = [
  {
    id: 'certificate-digital-literacy',
    title: '职业院校教师数字素养提升培训证书',
    category: '个人发展',
    dimension: '教学设计',
    reason: '证明数字化教学工具和课堂资源建设能力',
    strength: '强证据',
    tone: 'green',
  },
  {
    id: 'enterprise-practice-shandong-software',
    title: '山东软件企业实践记录',
    category: '企业实践',
    dimension: '企业实践',
    reason: '支撑行业岗位任务理解，但企业评价仍待补充',
    strength: '待补证据',
    tone: 'orange',
  },
  {
    id: 'virtual-research-course-case-meeting',
    title: '课程案例共研活动记录',
    category: '教研科研',
    dimension: '教研协作',
    reason: '体现跨校协作、案例共建和成果共享贡献',
    strength: '一般证据',
    tone: 'blue',
  },
] as const

function goBack() {
  uni.navigateBack()
}

function goRecord(recordId: string) {
  uni.navigateTo({ url: `/pages/archive/record-detail/index?recordId=${recordId}` })
}
</script>

<template>
  <MobilePageShell class="records-page" active="profile">
    <MobileNavbar title="画像用到的记录" size="compact" @back="goBack" />

    <MobileCard class="summary-card">
      <text class="summary-title">画像引用记录</text>
      <text class="summary-desc">以下记录用于前台模拟的能力画像、岗位对照和发展报告，不在本页修改档案事实。</text>
    </MobileCard>

    <MobileCard v-for="record in records" :key="record.id" class="record-card">
      <view class="record-head">
        <text class="record-title">{{ record.title }}</text>
        <MobileStatusTag :tone="record.tone">{{ record.strength }}</MobileStatusTag>
      </view>
      <view class="meta-grid">
        <view>
          <text class="meta-label">档案分类</text>
          <text class="meta-value">{{ record.category }}</text>
        </view>
        <view>
          <text class="meta-label">引用维度</text>
          <text class="meta-value">{{ record.dimension }}</text>
        </view>
      </view>
      <text class="reason-text">{{ record.reason }}</text>
      <MobileActionButton class="detail-action" variant="outline" arrow @tap="goRecord(record.id)">查看档案详情</MobileActionButton>
    </MobileCard>
  </MobilePageShell>
</template>

<style lang="scss" scoped>
.records-page {
  padding-bottom: 56rpx;
}

.summary-card,
.record-card {
  margin-top: 22rpx;
  padding: 30rpx;
}

.summary-title,
.record-title {
  display: block;
  color: #10172d;
  font-weight: 900;
}

.summary-title {
  font-size: 38rpx;
}

.summary-desc,
.meta-label,
.reason-text {
  display: block;
  color: #66728a;
  font-size: 24rpx;
  line-height: 1.6;
}

.summary-desc {
  margin-top: 12rpx;
}

.record-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 18rpx;
}

.record-title {
  flex: 1;
  font-size: 30rpx;
  line-height: 1.35;
}

.meta-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18rpx;
  margin-top: 24rpx;
}

.meta-value {
  display: block;
  margin-top: 6rpx;
  color: #172039;
  font-size: 27rpx;
  font-weight: 900;
}

.reason-text {
  margin-top: 22rpx;
}

.detail-action {
  width: 100%;
  height: 76rpx;
  margin-top: 24rpx;
  font-size: 26rpx;
}
</style>
