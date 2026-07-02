<script setup lang="ts">
import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobileNavbar from '../../../components/MobileNavbar.vue'

const summaryStats = [
  { value: '5', label: '档案维度', type: 'person' },
  { value: '38', label: '入档记录', type: 'record' },
  { value: '22', label: '正式事实', type: 'trend' },
  { value: '8', label: '成果荣誉', type: 'award' },
]

const achievements = [
  { title: '课程建设', desc: ['2 门课程建设', '1 门课程资源'], type: 'course' },
  { title: '教学成果', desc: ['1 项校级教学成果奖', '1 篇教改论文'], type: 'teach' },
  { title: '科研成果', desc: ['2 项课题立项', '3 篇论文发表'], type: 'research' },
  { title: '企业实践', desc: ['1 家企业实践', '1 项项目合作'], type: 'practice' },
  { title: '社会服务', desc: ['2 项社会服务', '累计 48 学时'], type: 'service' },
]

const suggestions = [
  { title: '补充企业实践证据', desc: '建议增加企业实践经历和企业评价材料，完善实践能力依据。', action: '去补充', type: 'target' },
  { title: '深化教研方向', desc: '围绕课程改革与专业建设持续研究，争取更多高质量成果。', action: '去规划', type: 'book' },
  { title: '提升社会服务影响', desc: '结合专业优势，拓展社会服务形式，扩大服务范围与影响。', action: '去行动', type: 'person' },
]

function goBack() {
  uni.navigateBack()
}

function showToast(title: string) {
  uni.showToast({ title, icon: 'none' })
}
</script>

<template>
  <view class="report-page">
    <MobileNavbar title="2026 年度发展报告" size="compact" @back="goBack">
      <template #right>
        <button class="share-button" @tap="showToast('导出报告')"></button>
      </template>
    </MobileNavbar>

    <view class="meta-row">
      <view class="draft-status"></view>
      <text>AI 已生成草稿</text>
      <text class="divider">|</text>
      <text>基于 38 条已入档记录整理</text>
      <text class="update-time">更新时间：2026-03-18</text>
    </view>

    <view class="notice-bar">
      <view class="info-icon"></view>
      <text>本报告由系统基于已入档记录生成，供个人发展参考，不作为评价结论。</text>
    </view>

    <view class="content">
      <MobileCard class="section-card overview-card">
        <view class="section-title-row">
          <text class="section-index">一</text>
          <text class="section-title">成长概况</text>
        </view>
        <view class="profile-row">
          <view class="avatar">
            <view class="face"></view>
          </view>
          <view class="profile-copy">
            <text class="teacher-name">张三</text>
            <text class="teacher-meta">信息工程学院｜副教授</text>
            <text class="teacher-meta">入校 5 年</text>
          </view>
          <view class="stat-grid">
            <view v-for="item in summaryStats" :key="item.label" class="summary-stat">
              <view class="summary-icon" :class="`summary-icon--${item.type}`"></view>
              <text class="summary-value">{{ item.value }}</text>
              <text class="summary-label">{{ item.label }}</text>
            </view>
          </view>
        </view>
        <view class="summary-box">
          <text>本年度在教学、教研和社会服务方面持续投入，形成了稳定的履职表现和阶段性成果；企业实践记录较少，建议补充企业评价等材料，进一步完善发展证据。</text>
        </view>
      </MobileCard>

      <MobileCard class="section-card achievement-card">
        <view class="section-title-row">
          <text class="section-index">二</text>
          <text class="section-title">主要成果</text>
        </view>
        <view class="achievement-grid">
          <view v-for="item in achievements" :key="item.title" class="achievement-item">
            <view class="achievement-icon" :class="`achievement-icon--${item.type}`"></view>
            <text class="achievement-title">{{ item.title }}</text>
            <text v-for="line in item.desc" :key="line" class="achievement-desc">{{ line }}</text>
          </view>
        </view>
      </MobileCard>

      <MobileCard class="section-card radar-card">
        <view class="section-title-row">
          <text class="section-index">三</text>
          <text class="section-title">能力发展雷达</text>
        </view>
        <view class="radar-body">
          <view class="radar-wrap">
            <view class="radar-grid"></view>
            <view class="radar-fill"></view>
            <text class="radar-label radar-label--top">教学能力<text>4/5</text></text>
            <text class="radar-label radar-label--right">教研能力<text>3/5</text></text>
            <text class="radar-label radar-label--bottom-right">实践能力<text>2/5</text></text>
            <text class="radar-label radar-label--bottom-left">服务能力<text>3/5</text></text>
            <text class="radar-label radar-label--left">基本能力<text>4/5</text></text>
          </view>
          <view class="interpret-card">
            <view class="interpret-title">
              <view class="star-icon"></view>
              <text>能力发展解读</text>
            </view>
            <text>· 教学能力和基本能力表现较好，处于骨干级水平；</text>
            <text>· 教研能力稳步提升，成果逐渐积累；</text>
            <text>· 企业实践能力相对薄弱，建议加强企业实践和行业服务。</text>
          </view>
        </view>
      </MobileCard>

      <MobileCard class="section-card suggestion-card">
        <view class="section-title-row">
          <text class="section-index">四</text>
          <text class="section-title">下一步发展建议</text>
        </view>
        <view class="suggestion-grid">
          <view v-for="item in suggestions" :key="item.title" class="suggestion-item">
            <view class="suggestion-icon" :class="`suggestion-icon--${item.type}`"></view>
            <text class="suggestion-title">{{ item.title }}</text>
            <text class="suggestion-desc">{{ item.desc }}</text>
            <button class="suggestion-button" @tap="showToast(item.action)">{{ item.action }}</button>
          </view>
        </view>
      </MobileCard>
    </view>

    <view class="fixed-actions">
      <button class="text-action" @tap="showToast('引用记录')">
        <view class="quote-icon"></view>
        <text>引用记录</text>
      </button>
      <button class="text-action" @tap="showToast('重新生成')">
        <view class="refresh-icon"></view>
        <text>重新生成</text>
      </button>
      <MobileActionButton class="save-button" variant="primary" @tap="showToast('确认保存报告')">
        确认保存报告
      </MobileActionButton>
    </view>
  </view>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.report-page {
  min-height: 100vh;
  padding-bottom: calc(180rpx + env(safe-area-inset-bottom));
  overflow-x: hidden;
  background: linear-gradient(180deg, #ffffff 0%, #f9fbff 100%);
  color: #10172d;
}

.share-button {
  position: relative;
  width: 64rpx;
  height: 64rpx;
  margin-right: 18rpx;
  padding: 0;
  border: 0;
  background: transparent;
}

.share-button::before {
  position: absolute;
  right: 15rpx;
  top: 15rpx;
  width: 28rpx;
  height: 28rpx;
  border-top: 5rpx solid #111827;
  border-right: 5rpx solid #111827;
  content: '';
}

.share-button::after {
  position: absolute;
  right: 15rpx;
  bottom: 15rpx;
  width: 30rpx;
  height: 30rpx;
  border: 5rpx solid #111827;
  border-top: 0;
  border-right: 0;
  border-radius: 4rpx;
  content: '';
}

.meta-row,
.notice-bar,
.section-title-row,
.profile-row,
.stat-grid,
.achievement-grid,
.radar-body,
.interpret-title,
.suggestion-grid,
.fixed-actions,
.text-action {
  display: flex;
  align-items: center;
}

.meta-row {
  gap: 16rpx;
  padding: 12rpx 32rpx 14rpx;
  color: #475569;
  font-size: 25rpx;
  line-height: 1.3;
}

.draft-status {
  width: 13rpx;
  height: 13rpx;
  border-radius: 50%;
  background: #20b96b;
}

.divider {
  color: #b6c0d2;
}

.update-time {
  margin-left: auto;
}

.notice-bar {
  gap: 12rpx;
  margin: 0 32rpx 22rpx;
  padding: 17rpx 20rpx;
  border-radius: 10rpx;
  background: #eef5ff;
  color: #2f78f5;
  font-size: 26rpx;
  line-height: 1.35;
}

.info-icon,
.section-index,
.summary-icon,
.achievement-icon,
.suggestion-icon,
.star-icon,
.quote-icon,
.refresh-icon {
  position: relative;
  flex: 0 0 auto;
}

.info-icon {
  width: 24rpx;
  height: 24rpx;
  border: 3rpx solid currentColor;
  border-radius: 50%;
}

.info-icon::before {
  position: absolute;
  left: 9rpx;
  top: 8rpx;
  width: 3rpx;
  height: 9rpx;
  background: currentColor;
  content: '';
}

.content {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
  padding: 0 32rpx 26rpx;
}

.section-card {
  border-radius: 14rpx;
  padding: 28rpx 26rpx 26rpx;
}

.section-title-row {
  gap: 20rpx;
}

.section-index {
  display: inline-flex;
  width: 58rpx;
  height: 52rpx;
  align-items: center;
  justify-content: center;
  border-radius: 8rpx 8rpx 0 0;
  background: linear-gradient(135deg, #5ca0ff, #2f78f5);
  color: #fff;
  font-size: 28rpx;
  font-weight: 900;
}

.section-title {
  color: #0b1224;
  font-size: 34rpx;
  font-weight: 900;
}

.profile-row {
  gap: 22rpx;
  margin-top: 28rpx;
}

.avatar {
  position: relative;
  width: 90rpx;
  height: 90rpx;
  flex: 0 0 auto;
  overflow: hidden;
  border-radius: 50%;
  background: linear-gradient(180deg, #f1f5f9, #dbe5f0);
}

.face {
  position: absolute;
  left: 28rpx;
  top: 18rpx;
  width: 34rpx;
  height: 34rpx;
  border-radius: 50%;
  background: #f2c7a6;
  box-shadow: 0 37rpx 0 20rpx #ffffff, 0 -3rpx 0 7rpx #1f2937;
}

.profile-copy {
  width: 148rpx;
  flex: 0 0 auto;
}

.teacher-name,
.teacher-meta,
.summary-value,
.summary-label,
.achievement-title,
.achievement-desc,
.suggestion-title,
.suggestion-desc {
  display: block;
}

.teacher-name {
  color: #111827;
  font-size: 31rpx;
  font-weight: 900;
}

.teacher-meta {
  margin-top: 8rpx;
  color: #475569;
  font-size: 24rpx;
  line-height: 1.25;
}

.stat-grid {
  min-width: 0;
  flex: 1;
  justify-content: space-between;
}

.summary-stat {
  min-width: 0;
  flex: 1;
  border-left: 1rpx solid #edf1f7;
  text-align: center;
}

.summary-icon,
.achievement-icon,
.suggestion-icon {
  width: 54rpx;
  height: 54rpx;
  margin: 0 auto 10rpx;
  border-radius: 50%;
  background: #eef5ff;
  color: #2f78f5;
}

.summary-icon::before,
.achievement-icon::before,
.suggestion-icon::before,
.star-icon::before,
.quote-icon::before,
.refresh-icon::before {
  position: absolute;
  content: '';
}

.summary-icon::before,
.achievement-icon::before,
.suggestion-icon::before {
  inset: 16rpx;
  border-radius: 4rpx;
  background: currentColor;
}

.summary-icon--record,
.achievement-icon--teach,
.suggestion-icon--book {
  background: #eaf9f0;
  color: #22b56b;
}

.summary-icon--trend,
.achievement-icon--research,
.suggestion-icon--person {
  background: #f2ecff;
  color: #8b5cf6;
}

.summary-icon--award,
.achievement-icon--practice {
  background: #fff3e3;
  color: #f59e0b;
}

.achievement-icon--service {
  background: #fff1f1;
  color: #ef4444;
}

.summary-value {
  color: #0b1224;
  font-size: 36rpx;
  font-weight: 900;
}

.summary-label {
  color: #475569;
  font-size: 23rpx;
}

.summary-box {
  margin-top: 28rpx;
  padding: 22rpx 24rpx;
  border-radius: 10rpx;
  background: #eef5ff;
  color: #21385f;
  font-size: 27rpx;
  line-height: 1.65;
}

.achievement-grid {
  justify-content: space-between;
  gap: 0;
  margin-top: 34rpx;
}

.achievement-item {
  min-width: 0;
  flex: 1;
  padding: 0 10rpx;
  border-right: 1rpx solid #e8edf5;
  text-align: center;
}

.achievement-item:last-child {
  border-right: 0;
}

.achievement-title {
  margin-top: 12rpx;
  color: #111827;
  font-size: 25rpx;
  font-weight: 900;
}

.achievement-desc {
  margin-top: 12rpx;
  color: #475569;
  font-size: 22rpx;
  line-height: 1.35;
}

.radar-body {
  align-items: stretch;
  gap: 28rpx;
  margin-top: 26rpx;
}

.radar-wrap {
  position: relative;
  width: 330rpx;
  min-height: 294rpx;
  flex: 0 0 auto;
}

.radar-grid,
.radar-fill {
  position: absolute;
  left: 75rpx;
  top: 58rpx;
  width: 178rpx;
  height: 178rpx;
}

.radar-grid {
  background:
    repeating-radial-gradient(circle, transparent 0 24rpx, rgba(148, 163, 184, 0.32) 25rpx 26rpx),
    conic-gradient(from 18deg, transparent 0 18%, rgba(148, 163, 184, 0.28) 18% 18.6%, transparent 18.6% 38%, rgba(148, 163, 184, 0.28) 38% 38.6%, transparent 38.6% 58%, rgba(148, 163, 184, 0.28) 58% 58.6%, transparent 58.6% 78%, rgba(148, 163, 184, 0.28) 78% 78.6%, transparent 78.6%);
  clip-path: polygon(50% 0, 100% 38%, 82% 100%, 18% 100%, 0 38%);
}

.radar-fill {
  background: rgba(47, 120, 245, 0.26);
  border: 3rpx solid #2f78f5;
  clip-path: polygon(50% 15%, 82% 38%, 66% 83%, 24% 77%, 17% 42%);
}

.radar-label {
  position: absolute;
  color: #111827;
  font-size: 22rpx;
  font-weight: 800;
  text-align: center;
}

.radar-label text {
  display: block;
  margin-top: 5rpx;
  color: #2f78f5;
}

.radar-label--top {
  top: 0;
  left: 126rpx;
}

.radar-label--right {
  top: 108rpx;
  right: 0;
}

.radar-label--bottom-right {
  right: 34rpx;
  bottom: 8rpx;
  color: #f97316;
}

.radar-label--bottom-left {
  bottom: 8rpx;
  left: 46rpx;
}

.radar-label--left {
  top: 116rpx;
  left: 0;
}

.radar-label--bottom-right text {
  color: #f97316;
}

.radar-label--bottom-left text {
  color: #16a34a;
}

.interpret-card {
  min-width: 0;
  flex: 1;
  padding: 24rpx;
  border-radius: 14rpx;
  background: #eef5ff;
  color: #244268;
  font-size: 24rpx;
  line-height: 1.55;
}

.interpret-card text {
  display: block;
  margin-top: 10rpx;
}

.interpret-title {
  gap: 12rpx;
  color: #2f78f5;
  font-size: 27rpx;
  font-weight: 900;
}

.star-icon {
  width: 32rpx;
  height: 32rpx;
  border-radius: 50%;
  background: #2f78f5;
}

.star-icon::before {
  inset: 8rpx;
  background: #fff;
  clip-path: polygon(50% 0, 63% 34%, 100% 35%, 70% 57%, 80% 94%, 50% 72%, 20% 94%, 30% 57%, 0 35%, 37% 34%);
}

.suggestion-grid {
  gap: 18rpx;
  margin-top: 26rpx;
}

.suggestion-item {
  min-width: 0;
  flex: 1;
  padding: 22rpx 18rpx;
  border-radius: 12rpx;
  background: #f3f7fc;
}

.suggestion-title {
  color: #111827;
  font-size: 25rpx;
  font-weight: 900;
}

.suggestion-desc {
  min-height: 112rpx;
  margin-top: 14rpx;
  color: #374968;
  font-size: 24rpx;
  line-height: 1.52;
}

.suggestion-button {
  width: 110rpx;
  height: 46rpx;
  margin: 16rpx auto 0;
  padding: 0;
  border: 2rpx solid #2f78f5;
  border-radius: 8rpx;
  background: #fff;
  color: #2f78f5;
  font-size: 24rpx;
  font-weight: 900;
}

.suggestion-button::after,
.text-action::after {
  display: none;
}

.fixed-actions {
  position: fixed;
  z-index: 20;
  right: 0;
  bottom: 0;
  left: 0;
  gap: 18rpx;
  padding: 18rpx 32rpx calc(18rpx + env(safe-area-inset-bottom));
  border-top: 1rpx solid #edf1f7;
  background: rgba(255, 255, 255, 0.96);
}

.text-action {
  gap: 10rpx;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  color: #334155;
  font-size: 25rpx;
  font-weight: 800;
}

.quote-icon,
.refresh-icon {
  width: 36rpx;
  height: 36rpx;
}

.quote-icon::before {
  inset: 6rpx 8rpx;
  border: 4rpx solid currentColor;
  border-radius: 4rpx;
}

.refresh-icon::before {
  inset: 5rpx;
  border: 4rpx solid currentColor;
  border-left-color: transparent;
  border-radius: 50%;
}

.save-button {
  width: 250rpx;
  margin-left: auto;
}

@media (max-width: 370px) {
  .report-page {
    padding-bottom: calc(220rpx + env(safe-area-inset-bottom));
  }

  .meta-row {
    flex-wrap: wrap;
  }

  .update-time {
    width: 100%;
    margin-left: 29rpx;
  }

  .content {
    padding-right: 24rpx;
    padding-left: 24rpx;
  }

  .profile-row {
    align-items: flex-start;
    flex-wrap: wrap;
  }

  .stat-grid {
    width: 100%;
    flex-basis: 100%;
  }

  .radar-body,
  .suggestion-grid {
    flex-direction: column;
  }

  .radar-wrap {
    margin: 0 auto;
  }

  .suggestion-desc {
    min-height: 0;
  }

  .save-button {
    width: 214rpx;
  }
}
</style>
