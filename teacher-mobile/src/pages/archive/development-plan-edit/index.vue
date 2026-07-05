<script setup lang="ts">
import { computed, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

import MobileActionButton from '../../../components/MobileActionButton.vue'
import MobileCard from '../../../components/MobileCard.vue'
import MobileNavbar from '../../../components/MobileNavbar.vue'
import MobilePageShell from '../../../components/MobilePageShell.vue'
import MobileStatusTag from '../../../components/MobileStatusTag.vue'
import {
  getArchiveDraftRecords,
  saveArchiveDevelopmentPlanDraft,
  submitArchiveDevelopmentPlanDraft,
} from '../../../domain/archive'

type DraftQuery = {
  draftId?: string
}

const query = ref<DraftQuery>({})
const fallbackDraft = getArchiveDraftRecords()[0]
const target = ref(fallbackDraft?.target || '')
const actions = ref(fallbackDraft?.actions || '')
const evidence = ref(fallbackDraft?.evidence || '')

onLoad((options) => {
  query.value = options as DraftQuery
  const draft = currentDraft.value
  target.value = draft.target
  actions.value = draft.actions
  evidence.value = draft.evidence
})

const currentDraft = computed(() => {
  return getArchiveDraftRecords().find((draft) => draft.id === query.value.draftId) || fallbackDraft
})

function goBack() {
  uni.navigateBack()
}

function goDraftList() {
  uni.navigateTo({ url: '/pages/archive/draft-list/index' })
}

function saveDraft() {
  saveArchiveDevelopmentPlanDraft(currentDraft.value.id, {
    target: target.value,
    actions: actions.value,
    evidence: evidence.value,
  })
  uni.showToast({ title: '草稿已保存', icon: 'none' })
}

function submitDraft() {
  const record = submitArchiveDevelopmentPlanDraft(currentDraft.value.id)
  uni.navigateTo({
    url: `/pages/archive/record-detail/index?recordId=${record.id}`,
  })
}
</script>

<template>
  <MobilePageShell class="development-plan-edit-page" active="archive">
    <MobileNavbar title="发展计划编辑" size="compact" @back="goBack" />

    <MobileCard class="hero-card">
      <view class="hero-icon"></view>
      <view class="hero-copy">
        <MobileStatusTag tone="blue">草稿</MobileStatusTag>
        <text class="hero-title">{{ currentDraft.title }}</text>
        <text class="hero-meta">{{ currentDraft.categoryName }} ｜ {{ currentDraft.updatedAt }}</text>
      </view>
    </MobileCard>

    <MobileCard class="section-card">
      <text class="section-title">发展目标</text>
      <textarea
        v-model="target"
        class="plan-textarea"
        auto-height
        maxlength="240"
        placeholder="填写本年度发展目标"
      />
    </MobileCard>

    <MobileCard class="section-card">
      <text class="section-title">行动安排</text>
      <textarea
        v-model="actions"
        class="plan-textarea"
        auto-height
        maxlength="300"
        placeholder="填写培训、实践、教研等行动安排"
      />
    </MobileCard>

    <MobileCard class="section-card">
      <text class="section-title">佐证材料</text>
      <textarea
        v-model="evidence"
        class="plan-textarea"
        auto-height
        maxlength="240"
        placeholder="填写后续计划关联的材料或记录"
      />
    </MobileCard>

    <MobileCard class="section-card">
      <text class="section-title">提交后状态</text>
      <text class="status-desc">
        保存草稿只保留在手机端草稿记录；提交核验后会生成个人发展维度待核验档案记录，并进入档案处理队列。
      </text>
    </MobileCard>

    <view class="footer-actions">
      <MobileActionButton class="footer-button" variant="outline" @tap="goDraftList">
        返回草稿
      </MobileActionButton>
      <MobileActionButton class="footer-button" variant="outline" @tap="saveDraft">
        保存草稿
      </MobileActionButton>
      <MobileActionButton class="footer-button" variant="primary" @tap="submitDraft">
        提交核验
      </MobileActionButton>
    </view>
  </MobilePageShell>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.development-plan-edit-page {
  min-height: 100vh;
  padding: calc(var(--status-bar-height) + 4rpx) 30rpx calc(206rpx + env(safe-area-inset-bottom));
  overflow-x: hidden;
  background:
    radial-gradient(circle at 12% 2%, rgba(225, 239, 255, 0.82), transparent 31%),
    linear-gradient(180deg, #ffffff 0%, #f8fbff 52%, #f7faf8 100%);
  color: #10172d;
}

.hero-card,
.section-card {
  border-radius: 30rpx;
  box-shadow: 0 22rpx 56rpx rgba(35, 51, 87, 0.07);
}

.hero-card {
  display: flex;
  align-items: center;
  gap: 26rpx;
  margin-top: 30rpx;
  padding: 32rpx;
  border: 2rpx solid rgba(200, 224, 255, 0.92);
  background: linear-gradient(112deg, #edf5ff 0%, #f9fcff 100%);
}

.hero-icon {
  width: 128rpx;
  height: 128rpx;
  flex: 0 0 128rpx;
  border-radius: 40rpx;
  background:
    linear-gradient(90deg, transparent 40%, rgba(255, 255, 255, 0.72) 41%, rgba(255, 255, 255, 0.72) 52%, transparent 53%),
    #1677ff;
}

.hero-copy {
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
  gap: 12rpx;
}

.hero-title {
  color: #10172d;
  font-size: 38rpx;
  font-weight: 900;
  line-height: 1.26;
}

.hero-meta,
.status-desc {
  color: #5d6b82;
  font-size: 24rpx;
  font-weight: 700;
  line-height: 1.55;
}

.section-card {
  margin-top: 24rpx;
  padding: 30rpx;
  background: rgba(255, 255, 255, 0.94);
}

.section-title {
  display: block;
  color: #10172d;
  font-size: 32rpx;
  font-weight: 900;
  line-height: 1.2;
}

.plan-textarea {
  box-sizing: border-box;
  width: 100%;
  min-height: 168rpx;
  margin-top: 20rpx;
  padding: 22rpx;
  border: 2rpx solid #e2edf8;
  border-radius: 24rpx;
  background: #f7fbff;
  color: #17233d;
  font-size: 26rpx;
  font-weight: 800;
  line-height: 1.55;
}

.status-desc {
  display: block;
  margin-top: 18rpx;
}

.footer-actions {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 4;
  display: grid;
  grid-template-columns: 0.9fr 0.9fr 1fr;
  gap: 14rpx;
  padding: 24rpx 30rpx calc(28rpx + env(safe-area-inset-bottom));
  border-top: 2rpx solid rgba(220, 232, 244, 0.82);
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 -18rpx 42rpx rgba(35, 51, 87, 0.08);
}

.footer-button {
  min-width: 0;
}
</style>
