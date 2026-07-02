<script setup lang="ts">
import MobileCard from '../../../components/MobileCard.vue'
import MobileNavbar from '../../../components/MobileNavbar.vue'

const filters = ['全部', '记录确认', '材料更新', '草稿保存', '其他']

const groups = [
  {
    title: '今天',
    count: '3 条',
    items: [
      {
        icon: 'shield',
        title: '已确认一条培训证书',
        desc: '《数字化教学能力提升》证书已完成本人确认',
        tag: '培训与研修',
        tagTone: 'green',
        time: '09:21',
      },
      {
        icon: 'doc',
        title: '培训学时已记录',
        desc: '《数字化教学能力提升》已记录 16 学时',
        tag: '培训与研修',
        tagTone: 'blue',
        time: '10:35',
      },
      {
        icon: 'book',
        title: '已保存一篇教学反思',
        desc: '《智能制造基础》第 5 次课后反思已保存草稿',
        tag: '教学实践',
        tagTone: 'orange',
        time: '11:48',
      },
    ],
  },
  {
    title: '昨天',
    count: '2 条',
    items: [
      {
        icon: 'star',
        title: '已确认一条精品课程建设成果',
        desc: '《智能制造课程建设成果》已完成本人确认',
        tag: '教学改革',
        tagTone: 'purple',
        time: '16:45',
      },
      {
        icon: 'building',
        title: '企业实践记录已更新',
        desc: '已更新企业实践记录：XX 科技有限公司',
        tag: '社会服务',
        tagTone: 'green',
        time: '14:22',
      },
    ],
  },
  {
    title: '更早',
    count: '3 条',
    items: [
      {
        icon: 'doc',
        title: '材料已补充完成',
        desc: '已补充“企业实践证明材料”相关附件',
        tag: '成果与贡献',
        tagTone: 'blue',
        time: '03-18  18:30',
      },
      {
        icon: 'edit',
        title: '教学反思已更新',
        desc: '《智能制造基础》第 4 次课后反思已更新',
        tag: '教学实践',
        tagTone: 'orange',
        time: '03-17  21:10',
      },
      {
        icon: 'shield',
        title: '一条记录已确认',
        desc: '《您爱的学术论文记录》已完成本人确认',
        tag: '教学与研究',
        tagTone: 'green',
        time: '03-16  09:15',
      },
    ],
  },
]

function goBack() {
  uni.navigateBack()
}

function showToast(title: string) {
  uni.showToast({ title, icon: 'none' })
}
</script>

<template>
  <view class="recent-page">
    <MobileNavbar title="最近更新" size="compact" @back="goBack">
      <template #right>
        <button class="filter-button" @tap="showToast('筛选')">
          <view class="filter-icon"></view>
          <text>筛选</text>
        </button>
      </template>
    </MobileNavbar>

    <view class="filter-tabs">
      <button
        v-for="(item, index) in filters"
        :key="item"
        class="filter-tab"
        :class="{ 'filter-tab--active': index === 0 }"
        @tap="showToast(item)"
      >
        {{ item }}
      </button>
    </view>

    <view class="content">
      <view v-for="group in groups" :key="group.title" class="date-group">
        <view class="group-head">
          <view class="group-title-wrap">
            <view class="green-dot"></view>
            <text class="group-title">{{ group.title }}</text>
          </view>
          <text class="group-count">{{ group.count }}</text>
        </view>

        <MobileCard v-for="item in group.items" :key="item.title" class="update-card">
          <button class="update-row" @tap="showToast(item.title)">
            <view class="record-icon" :class="`record-icon--${item.icon}`"></view>
            <view class="record-main">
              <text class="record-title">{{ item.title }}</text>
              <text class="record-desc">{{ item.desc }}</text>
              <text class="record-tag" :class="`record-tag--${item.tagTone}`">{{ item.tag }}</text>
            </view>
            <view class="record-side">
              <text class="record-time">{{ item.time }}</text>
              <view class="row-arrow"></view>
            </view>
          </button>
        </MobileCard>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
@import '../../../styles/tokens.scss';

.recent-page {
  min-height: 100vh;
  overflow-x: hidden;
  background:
    radial-gradient(circle at 80% 2%, rgba(237, 248, 255, 0.9), transparent 30%),
    linear-gradient(180deg, #ffffff 0%, #fbfdff 42%, #f8fbfb 100%);
  color: #111827;
}

.filter-button,
.filter-tab,
.update-row {
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
}

.filter-button::after,
.filter-tab::after,
.update-row::after {
  display: none;
}

.filter-button {
  display: flex;
  align-items: center;
  gap: 12rpx;
  margin-right: 28rpx;
  color: #111827;
  font-size: 31rpx;
  line-height: 1;
}

.filter-icon,
.record-icon,
.row-arrow,
.green-dot {
  position: relative;
  flex: 0 0 auto;
}

.filter-icon {
  width: 34rpx;
  height: 34rpx;
  color: #111827;
}

.filter-icon::before,
.filter-icon::after,
.record-icon::before,
.record-icon::after,
.row-arrow::before {
  position: absolute;
  content: '';
}

.filter-icon::before {
  left: 2rpx;
  top: 2rpx;
  width: 29rpx;
  height: 22rpx;
  border: 5rpx solid currentColor;
  border-bottom: 0;
  clip-path: polygon(0 0, 100% 0, 63% 100%, 37% 100%);
}

.filter-icon::after {
  left: 14rpx;
  top: 20rpx;
  width: 7rpx;
  height: 13rpx;
  border-radius: 5rpx;
  background: currentColor;
}

.filter-tabs {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 0;
  margin: 20rpx 22rpx 34rpx;
  padding: 10rpx;
  border: 1rpx solid #e7ebf2;
  border-radius: 999rpx;
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 12rpx 34rpx rgba(35, 51, 87, 0.06);
}

.filter-tab {
  display: flex;
  height: 66rpx;
  align-items: center;
  justify-content: center;
  border-radius: 999rpx;
  color: #111827;
  font-size: 31rpx;
  font-weight: 700;
  white-space: nowrap;
}

.filter-tab--active {
  background: linear-gradient(135deg, #09bd62, #02a950);
  box-shadow: 0 14rpx 26rpx rgba(2, 169, 80, 0.24);
  color: #fff;
  font-weight: 900;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 34rpx;
  padding: 0 30rpx 28rpx;
}

.date-group {
  display: flex;
  flex-direction: column;
  gap: 14rpx;
}

.group-head,
.group-title-wrap,
.update-row,
.record-side {
  display: flex;
  align-items: center;
}

.group-head {
  justify-content: space-between;
  padding: 0 8rpx;
}

.group-title-wrap {
  gap: 18rpx;
}

.green-dot {
  width: 13rpx;
  height: 13rpx;
  border-radius: 50%;
  background: #08a85c;
}

.group-title,
.group-count,
.record-title,
.record-desc,
.record-tag,
.record-time {
  display: block;
}

.group-title {
  color: #111827;
  font-size: 35rpx;
  font-weight: 900;
  line-height: 1.25;
}

.group-count {
  color: #3f4654;
  font-size: 27rpx;
  line-height: 1.2;
}

.update-card {
  border-radius: 18rpx;
}

.update-row {
  width: 100%;
  min-height: 142rpx;
  gap: 32rpx;
  padding: 26rpx 28rpx 24rpx 24rpx;
  text-align: left;
}

.record-icon {
  width: 96rpx;
  height: 96rpx;
  border-radius: 50%;
  background: #eaf8f0;
  color: #0ba95b;
}

.record-icon--doc {
  background: #edf5ff;
  color: #1d74f5;
}

.record-icon--book,
.record-icon--edit {
  background: #fff4e6;
  color: #ff870f;
}

.record-icon--star {
  background: #f2eaff;
  color: #7644e8;
}

.record-icon--building {
  background: #e9f8ef;
  color: #09a85c;
}

.record-icon::before {
  left: 30rpx;
  top: 24rpx;
  width: 38rpx;
  height: 44rpx;
  border-radius: 8rpx;
  background: currentColor;
}

.record-icon--shield::before {
  left: 28rpx;
  top: 20rpx;
  width: 44rpx;
  height: 52rpx;
  border-radius: 10rpx 10rpx 24rpx 24rpx;
  clip-path: polygon(50% 0, 92% 14%, 88% 62%, 50% 100%, 12% 62%, 8% 14%);
}

.record-icon--shield::after {
  left: 36rpx;
  top: 39rpx;
  width: 24rpx;
  height: 13rpx;
  border-bottom: 7rpx solid #fff;
  border-left: 7rpx solid #fff;
  transform: rotate(-45deg);
}

.record-icon--doc::before {
  border-radius: 7rpx;
  clip-path: polygon(0 0, 72% 0, 100% 28%, 100% 100%, 0 100%);
}

.record-icon--doc::after {
  left: 40rpx;
  top: 42rpx;
  width: 20rpx;
  height: 6rpx;
  border-radius: 5rpx;
  background: #fff;
  box-shadow: 0 15rpx 0 #fff;
}

.record-icon--book::before {
  left: 25rpx;
  top: 27rpx;
  width: 48rpx;
  height: 40rpx;
  border-radius: 8rpx 18rpx 18rpx 8rpx;
  box-shadow: -16rpx 0 0 -2rpx currentColor;
}

.record-icon--star::before {
  left: 27rpx;
  top: 23rpx;
  width: 46rpx;
  height: 46rpx;
  border-radius: 8rpx;
}

.record-icon--star::after {
  left: 38rpx;
  top: 35rpx;
  width: 24rpx;
  height: 24rpx;
  background: #fff;
  clip-path: polygon(50% 0, 62% 34%, 100% 34%, 70% 55%, 82% 92%, 50% 70%, 18% 92%, 30% 55%, 0 34%, 38% 34%);
}

.record-icon--building::before {
  left: 27rpx;
  top: 24rpx;
  width: 46rpx;
  height: 43rpx;
  clip-path: polygon(50% 0, 100% 22%, 100% 33%, 88% 33%, 88% 100%, 12% 100%, 12% 33%, 0 33%, 0 22%);
}

.record-icon--building::after {
  left: 35rpx;
  top: 45rpx;
  width: 7rpx;
  height: 22rpx;
  background: #fff;
  box-shadow: 12rpx 0 0 #fff, 24rpx 0 0 #fff;
}

.record-icon--edit::before {
  left: 28rpx;
  top: 27rpx;
  width: 41rpx;
  height: 41rpx;
  border-radius: 7rpx;
}

.record-icon--edit::after {
  left: 49rpx;
  top: 21rpx;
  width: 12rpx;
  height: 42rpx;
  border-radius: 8rpx;
  background: #fff;
  transform: rotate(45deg);
}

.record-main {
  min-width: 0;
  flex: 1;
}

.record-title {
  color: #111827;
  font-size: 31rpx;
  font-weight: 900;
  line-height: 1.25;
}

.record-desc {
  margin-top: 12rpx;
  color: #3f4654;
  font-size: 26rpx;
  line-height: 1.3;
}

.record-tag {
  margin-top: 12rpx;
  font-size: 25rpx;
  font-weight: 900;
  line-height: 1.2;
}

.record-tag--green {
  color: #08a85c;
}

.record-tag--blue {
  color: #1672ef;
}

.record-tag--orange {
  color: #ff7d0b;
}

.record-tag--purple {
  color: #7644e8;
}

.record-side {
  gap: 24rpx;
  flex: 0 0 auto;
  color: #111827;
}

.record-time {
  color: #3f4654;
  font-size: 29rpx;
  line-height: 1.2;
  white-space: nowrap;
}

.row-arrow {
  width: 22rpx;
  height: 22rpx;
  color: #050812;
}

.row-arrow::before {
  inset: 0;
  border-top: 5rpx solid currentColor;
  border-right: 5rpx solid currentColor;
  transform: rotate(45deg);
}

@media (max-width: 430px) {
  .filter-button {
    margin-right: 12rpx;
    gap: 7rpx;
    font-size: 23rpx;
  }

  .filter-icon {
    width: 25rpx;
    height: 25rpx;
  }

  .filter-tabs {
    margin: 14rpx 12rpx 24rpx;
    padding: 7rpx;
  }

  .filter-tab {
    height: 50rpx;
    font-size: 23rpx;
  }

  .content {
    gap: 24rpx;
    padding: 0 12rpx 20rpx;
  }

  .date-group {
    gap: 10rpx;
  }

  .group-title {
    font-size: 27rpx;
  }

  .group-count {
    font-size: 21rpx;
  }

  .update-card {
    border-radius: 12rpx;
  }

  .update-row {
    min-height: 116rpx;
    gap: 18rpx;
    padding: 18rpx;
  }

  .record-icon {
    width: 68rpx;
    height: 68rpx;
  }

  .record-title {
    font-size: 23rpx;
  }

  .record-desc {
    margin-top: 8rpx;
    font-size: 20rpx;
  }

  .record-tag {
    margin-top: 8rpx;
    font-size: 19rpx;
  }

  .record-side {
    gap: 10rpx;
  }

  .record-time {
    font-size: 21rpx;
  }

  .row-arrow {
    width: 16rpx;
    height: 16rpx;
  }
}

@media (max-width: 374px) {
  .filter-tabs {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }

  .filter-tab {
    font-size: 20rpx;
  }

  .content {
    padding-right: 10rpx;
    padding-left: 10rpx;
  }

  .update-row {
    gap: 12rpx;
    padding: 16rpx 14rpx;
  }

  .record-side {
    align-items: flex-end;
    flex-direction: column;
  }
}
</style>
