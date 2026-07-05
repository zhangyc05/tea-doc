<script setup lang="ts">
import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobileNavbar from '../../../components/MobileNavbar.vue'
import MobileTabBar from '../../../components/MobileTabBar.vue'
import { confirmContribution, formatVirtualResearchSourceLine } from '../../../domain/virtualResearch'

const infoRows = [
  { label: '活动名称', value: '智能制造专业课程案例共创会', icon: 'file' },
  { label: '所属教研室', value: '智能制造课程虚拟教研室', icon: 'group' },
  { label: '活动时间', value: '2026-06-18 14:00-15:30', icon: 'calendar' },
  { label: '活动方式', value: '腾讯会议', icon: 'meeting' },
  { label: '组织人', value: '张主任', icon: 'user' },
  { label: '参与状态', value: '已参加', icon: 'check', strong: true },
]

const systemItems = [
  { title: '会议纪要', desc: '已生成', icon: 'doc' },
  { title: '阶段材料', desc: '已关联', icon: 'link' },
  { title: '个人贡献', desc: '已识别 2 项', icon: 'person' },
  { title: '确认后进入', desc: '等待归档', icon: 'folder' },
]

const contributions = [
  {
    index: 1,
    title: '提供企业设备调试案例素材',
    sourceKeys: ['stage-material', 'meeting-minutes'] as const,
    desc: '你提交的案例素材已被活动纪要引用，用于课程案例共创讨论。',
  },
  {
    index: 2,
    title: '补充设备故障诊断教学建议',
    sourceKeys: ['speech-excerpt', 'meeting-minutes'] as const,
    desc: '你在会议讨论中补充了设备故障诊断与调试环节的教学应用建议。',
  },
]

const files = ['会议纪要.pdf', '企业设备调试案例素材.pdf', '阶段任务分工记录']

function goBack() {
  uni.navigateBack()
}

function showFileFeedback(name: string) {
  uni.showToast({
    title: `关联材料预览为本地模拟：${name}`,
    icon: 'none',
  })
}

function goSupplementContribution() {
  uni.navigateTo({ url: '/pages/activity/virtual-research-supplement-material/index' })
}

function submitContribution() {
  confirmContribution()
  uni.navigateTo({ url: '/pages/activity/virtual-research-contribution-submitted/index' })
}
</script>

<template>
  <view class="contribution-confirm-page">
    <MobileNavbar title="教研活动详情" size="compact" @back="goBack" />
    <text class="nav-subtitle">确认本次活动中的个人贡献</text>
    <text class="nav-subtitle">待确认详情页</text>

    <view class="content">
      <MobileCard class="hero-card">
        <view class="hero-icon">
          <view class="people-icon"></view>
        </view>
        <view class="hero-copy">
          <view class="hero-title-row">
            <text class="hero-title">贡献待确认</text>
            <text class="pending-chip">待确认</text>
          </view>
          <text class="hero-desc">系统已根据会议纪要、阶段材料和参会记录整理你的个人贡献，请确认是否准确。</text>
        </view>
      </MobileCard>

      <MobileCard class="section-card">
        <text class="section-title">活动信息</text>
        <view class="info-list">
          <view v-for="row in infoRows" :key="row.label" class="info-row">
            <view class="small-icon" :class="`small-icon--${row.icon}`"></view>
            <text class="info-label">{{ row.label }}</text>
            <text class="info-value" :class="{ 'info-value--strong': row.strong }">{{ row.value }}</text>
          </view>
        </view>
      </MobileCard>

      <MobileCard class="section-card system-card">
        <text class="section-title">系统已整理</text>
        <view class="system-grid">
          <view v-for="item in systemItems" :key="item.title" class="system-item">
            <view class="system-icon" :class="`system-icon--${item.icon}`"></view>
            <view class="system-copy">
              <text class="system-title">{{ item.title }}</text>
              <text class="system-desc">{{ item.desc }}</text>
            </view>
          </view>
        </view>
      </MobileCard>

      <MobileCard class="section-card contribution-card">
        <text class="section-title">待你确认的个人贡献</text>
        <view class="contribution-list">
          <view v-for="item in contributions" :key="item.index" class="contribution-item">
            <view class="contribution-head">
              <text class="index-dot">{{ item.index }}</text>
              <text class="contribution-title">{{ item.title }}</text>
              <text class="recognized-chip">已识别</text>
            </view>
            <view class="tag-row">
              <text v-for="tag in formatVirtualResearchSourceLine([...item.sourceKeys]).split('、')" :key="tag" class="source-tag">{{ tag }}</text>
            </view>
            <text class="contribution-desc">{{ item.desc }}</text>
          </view>
        </view>

        <view class="supplement-tip">
          <text>如有遗漏，可补充一句说明或补传相关材料。</text>
          <button class="supplement-row" @tap="goSupplementContribution">
            <view class="pen-icon"></view>
            <text>补充遗漏或材料</text>
            <wd-icon name="chevron-right" size="24rpx" color="#7b8495" />
          </button>
        </view>
      </MobileCard>

      <MobileCard class="section-card file-card">
        <text class="section-title">本次已关联材料</text>
        <view class="file-list">
          <button v-for="file in files" :key="file" class="file-row" @tap="showFileFeedback(file)">
            <view class="file-icon"></view>
            <text>{{ file }}</text>
            <wd-icon name="chevron-right" size="24rpx" color="#7b8495" />
          </button>
        </view>
      </MobileCard>

      <text class="bottom-note">确认后将进入等待归档状态</text>
    </view>

    <view class="fixed-actions">
      <MobileActionButton class="action-button outline-button" variant="outline" @tap="goSupplementContribution">
        补充遗漏
      </MobileActionButton>
      <MobileActionButton class="action-button primary-button" variant="primary" @tap="submitContribution">
        确认贡献
      </MobileActionButton>
    </view>

    <MobileTabBar active="activity" />
  </view>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.contribution-confirm-page {
  min-height: 100vh;
  padding-bottom: calc(300rpx + env(safe-area-inset-bottom));
  overflow-x: hidden;
  background:
    radial-gradient(circle at 84% 7%, rgba(229, 250, 239, 0.82), transparent 28%),
    linear-gradient(180deg, #fdfffe 0%, #fff 35%, #f8fbfa 100%);
  color: #10172d;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 22rpx;
  padding: 0 28rpx;
}

.nav-subtitle {
  display: block;
  margin: -8rpx 0 24rpx;
  color: #30466e;
  font-size: 26rpx;
  line-height: 1;
  text-align: center;
}

.hero-card,
.section-card {
  border-radius: 24rpx;
}

.hero-card {
  display: flex;
  align-items: center;
  gap: 32rpx;
  padding: 36rpx 34rpx;
  border-color: #d9f2e5;
  background: linear-gradient(110deg, #f8fffb 0%, #f5fffa 100%);
}

.hero-icon,
.people-icon,
.small-icon,
.system-icon,
.index-dot,
.pen-icon,
.file-icon,
.row-arrow {
  position: relative;
  flex: 0 0 auto;
}

.hero-icon {
  width: 110rpx;
  height: 110rpx;
  color: #10b966;
}

.people-icon {
  width: 110rpx;
  height: 110rpx;
}

.people-icon::before,
.people-icon::after,
.small-icon::before,
.small-icon::after,
.system-icon::before,
.system-icon::after,
.pen-icon::before,
.pen-icon::after,
.file-icon::before,
.file-icon::after,
.row-arrow::before {
  position: absolute;
  content: '';
}

.people-icon::before {
  left: 38rpx;
  top: 8rpx;
  width: 28rpx;
  height: 28rpx;
  border-radius: 50%;
  background: currentColor;
  box-shadow: -36rpx 38rpx 0 -2rpx currentColor, 38rpx 38rpx 0 -2rpx currentColor;
}

.people-icon::after {
  left: 5rpx;
  right: 5rpx;
  bottom: 6rpx;
  height: 48rpx;
  border: 10rpx solid currentColor;
  border-top: 0;
  border-radius: 0 0 58rpx 58rpx;
}

.hero-copy {
  min-width: 0;
  flex: 1;
}

.hero-title-row,
.info-row,
.system-grid,
.system-item,
.contribution-head,
.tag-row,
.supplement-row,
.file-row,
.fixed-actions {
  display: flex;
  align-items: center;
}

.hero-title-row {
  flex-wrap: wrap;
  gap: 18rpx;
}

.hero-title,
.hero-desc,
.section-title,
.info-label,
.info-value,
.system-title,
.system-desc,
.contribution-title,
.contribution-desc {
  display: block;
}

.hero-title {
  min-width: 0;
  flex: 1 1 auto;
  color: #070d1d;
  font-size: 42rpx;
  font-weight: 900;
  line-height: 1.18;
}

.pending-chip,
.recognized-chip {
  flex: 0 0 auto;
  border-radius: 10rpx;
  background: #e8fbf0;
  color: #06934f;
  font-weight: 900;
}

.pending-chip {
  padding: 12rpx 24rpx;
  font-size: 28rpx;
}

.hero-desc {
  margin-top: 18rpx;
  color: #30466e;
  font-size: 31rpx;
  line-height: 1.45;
}

.section-card {
  padding: 32rpx;
}

.section-title {
  color: #070d1d;
  font-size: 34rpx;
  font-weight: 900;
  line-height: 1.25;
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: 27rpx;
  margin-top: 30rpx;
}

.info-row {
  gap: 18rpx;
  min-width: 0;
  font-size: 29rpx;
  line-height: 1.3;
}

.small-icon {
  width: 30rpx;
  height: 30rpx;
  color: #10b966;
}

.small-icon::before {
  inset: 4rpx;
  border: 3rpx solid currentColor;
  border-radius: 6rpx;
}

.small-icon--group::before,
.small-icon--user::before {
  top: 2rpx;
  left: 9rpx;
  width: 12rpx;
  height: 12rpx;
  border-radius: 50%;
}

.small-icon--group::after,
.small-icon--user::after {
  right: 3rpx;
  bottom: 2rpx;
  left: 3rpx;
  height: 13rpx;
  border: 3rpx solid currentColor;
  border-radius: 16rpx 16rpx 6rpx 6rpx;
}

.small-icon--calendar::after {
  left: 9rpx;
  right: 9rpx;
  top: 0;
  height: 10rpx;
  border-right: 3rpx solid currentColor;
  border-left: 3rpx solid currentColor;
}

.small-icon--check::after {
  left: 10rpx;
  top: 9rpx;
  width: 12rpx;
  height: 7rpx;
  border-bottom: 3rpx solid currentColor;
  border-left: 3rpx solid currentColor;
  transform: rotate(-45deg);
}

.info-label {
  flex: 0 0 132rpx;
  color: #5d6b84;
}

.info-value {
  min-width: 0;
  flex: 1;
  color: #111827;
  overflow-wrap: anywhere;
}

.info-value--strong {
  color: #08a85c;
  font-weight: 900;
}

.system-grid {
  flex-wrap: nowrap;
  gap: 18rpx;
  margin-top: 24rpx;
}

.system-item {
  min-width: 0;
  flex: 1;
  gap: 12rpx;
  min-height: 72rpx;
  padding: 0 16rpx;
  border: 1rpx solid #dff2e8;
  border-radius: 14rpx;
  background: #fafffc;
}

.system-icon {
  width: 40rpx;
  height: 40rpx;
  color: #0fb463;
}

.system-icon::before {
  inset: 6rpx;
  border: 4rpx solid currentColor;
  border-radius: 6rpx;
}

.system-icon--link::before {
  top: 15rpx;
  height: 12rpx;
  border-radius: 12rpx;
  transform: rotate(-45deg);
}

.system-icon--person::before {
  top: 4rpx;
  left: 14rpx;
  width: 12rpx;
  height: 12rpx;
  border-radius: 50%;
}

.system-icon--person::after {
  right: 7rpx;
  bottom: 5rpx;
  left: 7rpx;
  height: 15rpx;
  border: 4rpx solid currentColor;
  border-radius: 18rpx 18rpx 6rpx 6rpx;
}

.system-icon--folder::before {
  top: 15rpx;
  height: 18rpx;
}

.system-icon--folder::after {
  left: 9rpx;
  top: 8rpx;
  width: 18rpx;
  height: 10rpx;
  border: 4rpx solid currentColor;
  border-bottom: 0;
  border-radius: 6rpx 6rpx 0 0;
}

.system-copy {
  min-width: 0;
}

.system-title,
.system-desc {
  color: #10172d;
  font-size: 25rpx;
  line-height: 1.2;
}

.system-desc {
  margin-top: 4rpx;
}

.contribution-list {
  display: flex;
  flex-direction: column;
  gap: 18rpx;
  margin-top: 24rpx;
}

.contribution-item {
  padding: 22rpx 22rpx 24rpx;
  border: 1rpx solid #e7ecf2;
  border-radius: 18rpx;
  background: #fff;
  box-shadow: 0 10rpx 28rpx rgba(31, 45, 78, 0.04);
}

.contribution-head {
  gap: 16rpx;
  min-width: 0;
}

.index-dot {
  display: flex;
  width: 34rpx;
  height: 34rpx;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #10b966;
  color: #fff;
  font-size: 23rpx;
  font-weight: 900;
}

.contribution-title {
  min-width: 0;
  flex: 1;
  color: #111827;
  font-size: 30rpx;
  font-weight: 900;
  line-height: 1.25;
}

.recognized-chip {
  padding: 10rpx 18rpx;
  font-size: 25rpx;
}

.tag-row {
  flex-wrap: wrap;
  gap: 14rpx;
  margin: 18rpx 0 0 48rpx;
}

.source-tag {
  padding: 8rpx 18rpx;
  border-radius: 9rpx;
  background: #e8fbf0;
  color: #08a85c;
  font-size: 25rpx;
  font-weight: 800;
}

.contribution-desc {
  margin: 14rpx 0 0 48rpx;
  color: #30466e;
  font-size: 27rpx;
  line-height: 1.45;
}

.supplement-tip {
  margin-top: 22rpx;
  padding: 20rpx 20rpx 22rpx;
  border-radius: 18rpx;
  background: linear-gradient(100deg, #f9fffc, #eefbf5);
  color: #3d4b64;
  font-size: 27rpx;
  line-height: 1.4;
}

.supplement-row,
.file-row {
  width: 100%;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  text-align: left;
}

.supplement-row::after,
.file-row::after {
  display: none;
}

.supplement-row {
  gap: 18rpx;
  height: 68rpx;
  margin-top: 18rpx;
  padding: 0 18rpx;
  border-radius: 14rpx;
  background: #eafbf3;
  color: #10172d;
  font-size: 29rpx;
  font-weight: 900;
}

.pen-icon {
  width: 34rpx;
  height: 34rpx;
  color: #08a85c;
}

.pen-icon::before {
  left: 7rpx;
  top: 2rpx;
  width: 11rpx;
  height: 29rpx;
  border-radius: 5rpx;
  background: currentColor;
  transform: rotate(42deg);
}

.pen-icon::after {
  left: 3rpx;
  bottom: 2rpx;
  width: 19rpx;
  height: 4rpx;
  border-radius: 4rpx;
  background: currentColor;
}

.file-list {
  margin-top: 22rpx;
}

.file-row {
  gap: 18rpx;
  min-height: 58rpx;
  color: #111827;
  font-size: 29rpx;
}

.file-icon {
  width: 28rpx;
  height: 34rpx;
  color: #10b966;
}

.file-icon::before {
  inset: 2rpx 5rpx;
  border: 3rpx solid currentColor;
  border-radius: 4rpx;
}

.file-icon::after {
  left: 11rpx;
  top: 12rpx;
  width: 10rpx;
  height: 3rpx;
  border-radius: 3rpx;
  background: currentColor;
  box-shadow: 0 8rpx 0 currentColor;
}

.row-arrow {
  width: 18rpx;
  height: 18rpx;
  margin-left: auto;
  color: #64748b;
}

.row-arrow::before {
  inset: 0;
  border-top: 4rpx solid currentColor;
  border-right: 4rpx solid currentColor;
  transform: rotate(45deg);
}

.bottom-note {
  display: block;
  padding: 18rpx 0 0;
  color: #9aa2b2;
  font-size: 27rpx;
  text-align: center;
}

.fixed-actions {
  position: fixed;
  right: 0;
  bottom: calc(138rpx + env(safe-area-inset-bottom));
  left: 0;
  z-index: 40;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32rpx;
  padding: 22rpx 44rpx 24rpx;
  background: rgba(255, 255, 255, 0.94);
  backdrop-filter: blur(12rpx);
}

.action-button {
  height: 78rpx;
  border-radius: 14rpx;
  font-size: 32rpx;
}

.outline-button {
  border-color: #08b85a;
  color: #08a85c;
}

.primary-button {
  background: linear-gradient(135deg, #14c86d, #02a950);
}

@media (max-width: 430px) {
  .contribution-confirm-page {
    padding-bottom: calc(272rpx + env(safe-area-inset-bottom));
  }

  .content {
    gap: 14rpx;
    padding-right: 20rpx;
    padding-left: 20rpx;
  }

  .nav-subtitle {
    margin: -4rpx 0 18rpx;
    font-size: 22rpx;
  }

  .hero-card {
    gap: 20rpx;
    padding: 24rpx 22rpx;
  }

  .hero-icon,
  .people-icon {
    width: 82rpx;
    height: 82rpx;
  }

  .people-icon::before {
    left: 28rpx;
    top: 6rpx;
    width: 22rpx;
    height: 22rpx;
    box-shadow: -27rpx 28rpx 0 -2rpx currentColor, 29rpx 28rpx 0 -2rpx currentColor;
  }

  .people-icon::after {
    height: 36rpx;
    border-width: 8rpx;
    border-top: 0;
  }

  .hero-title {
    font-size: 30rpx;
  }

  .pending-chip {
    padding: 8rpx 16rpx;
    font-size: 22rpx;
  }

  .hero-desc {
    margin-top: 10rpx;
    font-size: 23rpx;
  }

  .section-card {
    padding: 20rpx;
  }

  .section-title {
    font-size: 27rpx;
  }

  .info-list {
    gap: 15rpx;
    margin-top: 20rpx;
  }

  .info-row,
  .file-row {
    gap: 12rpx;
    font-size: 23rpx;
  }

  .info-label {
    flex-basis: 112rpx;
  }

  .system-grid {
    gap: 10rpx;
    margin-top: 16rpx;
  }

  .system-item {
    gap: 8rpx;
    min-height: 56rpx;
    padding: 0 8rpx;
  }

  .system-icon {
    width: 30rpx;
    height: 30rpx;
  }

  .system-title,
  .system-desc {
    font-size: 20rpx;
  }

  .contribution-list {
    gap: 12rpx;
    margin-top: 18rpx;
  }

  .contribution-item {
    padding: 16rpx;
  }

  .contribution-head {
    gap: 10rpx;
  }

  .index-dot {
    width: 27rpx;
    height: 27rpx;
    font-size: 18rpx;
  }

  .contribution-title {
    font-size: 24rpx;
  }

  .recognized-chip {
    padding: 7rpx 12rpx;
    font-size: 20rpx;
  }

  .tag-row,
  .contribution-desc {
    margin-left: 37rpx;
  }

  .tag-row {
    gap: 9rpx;
    margin-top: 12rpx;
  }

  .source-tag {
    padding: 6rpx 13rpx;
    font-size: 20rpx;
  }

  .contribution-desc {
    margin-top: 10rpx;
    font-size: 22rpx;
  }

  .supplement-tip {
    margin-top: 14rpx;
    padding: 14rpx;
    font-size: 22rpx;
  }

  .supplement-row {
    height: 56rpx;
    margin-top: 12rpx;
    font-size: 24rpx;
  }

  .fixed-actions {
    gap: 16rpx;
    padding: 16rpx 22rpx 18rpx;
  }

  .action-button {
    height: 66rpx;
    font-size: 26rpx;
  }
}

@media (max-width: 374px) {
  .content {
    padding-right: 14rpx;
    padding-left: 14rpx;
  }

  .hero-card {
    align-items: flex-start;
  }

  .hero-title-row,
  .contribution-head {
    align-items: flex-start;
  }

  .system-grid {
    flex-wrap: wrap;
  }

  .system-item {
    width: calc(50% - 5rpx);
    flex: 0 0 auto;
    box-sizing: border-box;
  }

  .recognized-chip {
    align-self: flex-start;
  }

  .fixed-actions {
    padding-right: 14rpx;
    padding-left: 14rpx;
  }
}
</style>
