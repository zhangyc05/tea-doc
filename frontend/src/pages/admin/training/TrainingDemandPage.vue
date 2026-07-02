<script setup lang="ts">
import { computed, ref } from 'vue'
import { StatusBadge } from '@/components/common'
import AdminLayout from '@/layouts/AdminLayout.vue'
import {
  addTrainingDemand,
  getTrainingState,
  matchTrainingDemand,
} from '@/stores/admin/trainingStore'

const trainingState = getTrainingState()

// 统计数据
const stats = {
  total: 96,
  fromProfile: 52,
  fromTeacher: 28,
  fromManagement: 16,
}

const demands = computed(() => trainingState.demands)

// 筛选条件
const selectedOrganization = ref('全校')
const selectedSource = ref('全部')
const selectedDirection = ref('全部')
const selectedMatchStatus = ref('全部')
const searchQuery = ref('')
const appliedSearchQuery = ref('')
const activeDemandId = ref('1')

const filteredDemands = computed(() => {
  const keyword = appliedSearchQuery.value.trim().toLowerCase()

  return demands.value.filter((demand) => {
    const matchesOrganization = selectedOrganization.value === '全校' || demand.department === selectedOrganization.value
    const matchesSource = selectedSource.value === '全部' || demand.source === selectedSource.value
    const matchesDirection = selectedDirection.value === '全部' || demand.direction.includes(selectedDirection.value)
    const matchesStatus = selectedMatchStatus.value === '全部' || demand.matchStatus === selectedMatchStatus.value
    const matchesKeyword = !keyword
      || `${demand.teacher} ${demand.department} ${demand.major} ${demand.direction} ${demand.suggestedResource}`
        .toLowerCase()
        .includes(keyword)

    return matchesOrganization && matchesSource && matchesDirection && matchesStatus && matchesKeyword
  })
})

const activeDemand = computed(() => {
  return demands.value.find((demand) => demand.id === activeDemandId.value) ?? demands.value[0]
})

function resetFilters() {
  selectedOrganization.value = '全校'
  selectedSource.value = '全部'
  selectedDirection.value = '全部'
  selectedMatchStatus.value = '全部'
  searchQuery.value = ''
  appliedSearchQuery.value = ''
  trainingState.operationMessage = '已重置筛选条件。'
}

function viewDetail(id: string) {
  activeDemandId.value = id
  trainingState.operationMessage = '已在右侧展示需求摘要。'
}

function applyFilters() {
  appliedSearchQuery.value = searchQuery.value
  trainingState.operationMessage = `已筛选出 ${filteredDemands.value.length} 条需求。`
}

function addDemand() {
  const demand = addTrainingDemand()
  activeDemandId.value = demand.id
  selectedMatchStatus.value = '待匹配'
  selectedSource.value = '全部'
  selectedDirection.value = '全部'
  selectedOrganization.value = '全校'
  searchQuery.value = ''
  appliedSearchQuery.value = ''
}

function showPendingDemands() {
  selectedMatchStatus.value = '待匹配'
  selectedOrganization.value = '全校'
  selectedSource.value = '全部'
  selectedDirection.value = '全部'
  searchQuery.value = ''
  appliedSearchQuery.value = ''
  trainingState.operationMessage = '已切换到待匹配需求。'
}

function matchDemand(id: string) {
  matchTrainingDemand(id, '1')
  activeDemandId.value = id
}
</script>

<template>
  <AdminLayout active-key="training-demands">
    <div class="training-demand-page">
      <!-- 统计卡区域 -->
      <section class="stats-section">
        <div class="stats-container">
          <div class="stat-card">
            <div class="stat-icon icon-demand">▤</div>
            <div>
              <div class="stat-label">需求总数</div>
              <div class="stat-value">{{ stats.total }} <span>条</span></div>
              <div class="stat-desc">当前周期形成的培训需求</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon icon-eye">●</div>
            <div>
              <div class="stat-label">画像观察</div>
              <div class="stat-value blue">{{ stats.fromProfile }} <span>条</span></div>
              <div class="stat-desc">来源于能力画像观察</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon icon-user">●</div>
            <div>
              <div class="stat-label">教师提出</div>
              <div class="stat-value purple">{{ stats.fromTeacher }} <span>条</span></div>
              <div class="stat-desc">教师主动提交的培训需求</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon icon-plus">＋</div>
            <div>
              <div class="stat-label">管理添加</div>
              <div class="stat-value orange">{{ stats.fromManagement }} <span>条</span></div>
              <div class="stat-desc">管理端主动补充的需求</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 主体内容区域 -->
      <section class="main-section">
        <div class="demand-workspace">
          <div class="main-content">
            <div class="content-card">
              <div class="card-header">
                <h2>需求管理</h2>
                <button class="btn-primary" type="button" @click="addDemand">＋ 新增需求</button>
              </div>
              <!-- 筛选区 -->
              <div class="filter-section">
                <div class="filter-row">
                  <div class="filter-item">
                    <label class="filter-label">组织范围</label>
                    <select v-model="selectedOrganization" class="filter-select">
                      <option>全校</option>
                      <option>智能制造学院</option>
                      <option>电子信息学院</option>
                    </select>
                  </div>
                  <div class="filter-item">
                    <label class="filter-label">需求来源</label>
                    <select v-model="selectedSource" class="filter-select">
                      <option>全部</option>
                      <option>能力画像观察</option>
                      <option>教师主动提出</option>
                      <option>管理主动添加</option>
                    </select>
                  </div>
                  <div class="filter-item">
                    <label class="filter-label">需求方向</label>
                    <select v-model="selectedDirection" class="filter-select">
                      <option>全部</option>
                      <option>数字化教学</option>
                      <option>AI 赋能课程建设</option>
                      <option>实践教学</option>
                      <option>课程思政</option>
                    </select>
                  </div>
                  <div class="filter-item">
                    <label class="filter-label">匹配状态</label>
                    <select v-model="selectedMatchStatus" class="filter-select">
                      <option>全部</option>
                      <option>已匹配</option>
                      <option>待匹配</option>
                      <option>暂不处理</option>
                    </select>
                  </div>
                  <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="搜索教师、需求关键词"
                    class="search-input"
                    @keyup.enter="applyFilters"
                  />
                </div>
                <div class="search-row">
                  <button class="btn-reset" @click="resetFilters">重置</button>
                  <button class="btn-secondary" @click="applyFilters">查询</button>
                  <div v-if="trainingState.operationMessage" class="operation-message">{{ trainingState.operationMessage }}</div>
                </div>
              </div>

              <!-- 数据表格 -->
              <div class="table-container">
                <table class="demand-table">
                  <thead>
                    <tr>
                      <th>需求对象</th>
                      <th>院系 / 专业</th>
                      <th>需求方向</th>
                      <th>需求来源</th>
                      <th>匹配状态</th>
                      <th>建议资源</th>
                      <th>操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="demand in filteredDemands"
                      :key="demand.id"
                      :class="{ active: activeDemandId === demand.id }"
                    >
                      <td>{{ demand.teacher }}</td>
                      <td>{{ demand.department }} / {{ demand.major }}</td>
                      <td>{{ demand.direction }}</td>
                      <td>{{ demand.source }}</td>
                      <td>
                        <StatusBadge :status="demand.matchStatus" />
                      </td>
                      <td>{{ demand.suggestedResource }}</td>
                      <td>
                        <button class="btn-view" @click="viewDetail(demand.id)">
                          查看
                        </button>
                        <button
                          v-if="demand.matchStatus === '待匹配'"
                          class="btn-view"
                          @click="matchDemand(demand.id)"
                        >
                          匹配资源
                        </button>
                      </td>
                    </tr>
                    <tr v-if="filteredDemands.length === 0">
                      <td colspan="7" class="empty-cell">暂无符合条件的培训需求</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- 右侧：资源匹配建议 -->
          <div class="sidebar">
            <div class="sidebar-card">
              <h3 class="sidebar-title">资源匹配建议</h3>
              <div class="suggestions-list">
                <div class="suggestion-item">
                  <div class="suggestion-icon green">◔</div>
                  <div>
                  <div class="suggestion-title">画像观察需求集中</div>
                  <div class="suggestion-desc">当前 52 条需求来源于能力画像观察，主要集中在数字化教学和实训课程组织。</div>
                  </div>
                </div>
                <div class="suggestion-item">
                  <div class="suggestion-icon blue">↗</div>
                  <div>
                  <div class="suggestion-title">教师主动需求上升</div>
                  <div class="suggestion-desc">本月教师主动提出 28 条培训需求，AI 赋能课程建设方向增长明显。</div>
                  </div>
                </div>
                <div class="suggestion-item">
                  <div class="suggestion-icon orange">!</div>
                  <div>
                  <div class="suggestion-title">待匹配资源</div>
                  <div class="suggestion-desc">30 条需求暂无合适资源承接，建议优先补充资源库。</div>
                  </div>
                </div>
              </div>
              <div class="selected-demand" v-if="activeDemand">
                <div class="suggestion-title">当前查看需求</div>
                <div class="selected-name">{{ activeDemand.teacher }} · {{ activeDemand.direction }}</div>
                <div class="suggestion-desc">{{ activeDemand.department }} / {{ activeDemand.major }}</div>
              </div>
              <button class="outline-action" type="button" @click="showPendingDemands">
                查看待匹配需求
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </AdminLayout>
</template>

<style scoped>
.training-demand-page {
  min-height: 100vh;
  background: #f6f9ff;
  color: #17233d;
}

.training-demand-page *,
.training-demand-page *::before,
.training-demand-page *::after {
  box-sizing: border-box;
}

.page-header {
  padding: 24px 0 12px;
}

.header-content,
.stats-container,
.main-section {
  max-width: 1560px;
  margin: 0 auto;
}

.header-content {
  padding: 0 22px;
}

.breadcrumb {
  color: #66758f;
  font-size: 14px;
  font-weight: 600;
}

.breadcrumb strong {
  color: #1268f6;
}

.stats-section {
  background: #f6f9ff;
}

.stats-container {
  padding: 0 22px 22px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.stat-card {
  min-height: 132px;
  display: grid;
  grid-template-columns: 82px minmax(0, 1fr);
  align-items: center;
  gap: 18px;
  padding: 22px 30px;
  background: #fff;
  border: 1px solid #dce6f5;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(35, 64, 110, 0.05);
}

.stat-icon {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 34px;
  font-weight: 800;
}

.icon-demand {
  color: #18b675;
  background: #dff8ec;
}

.icon-eye {
  color: #357cf5;
  background: #e8f0ff;
}

.icon-user {
  color: #8848e8;
  background: #efe7ff;
}

.icon-plus {
  color: #f26a16;
  background: #fff0df;
}

.stat-value {
  margin-top: 8px;
  font-size: 34px;
  line-height: 1;
  font-weight: 700;
  color: #18a663;
}

.stat-value.blue {
  color: #1268f6;
}

.stat-value.purple {
  color: #8848e8;
}

.stat-value.orange {
  color: #f26a16;
}

.stat-value span {
  font-size: 15px;
  font-weight: 600;
  color: #17233d;
}

.stat-label {
  font-size: 15px;
  color: #17233d;
  font-weight: 600;
}

.stat-desc {
  margin-top: 10px;
  font-size: 13px;
  color: #6c7890;
}

.main-section {
  padding: 0 22px 30px;
}

.demand-workspace {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 340px;
  gap: 20px;
  align-items: start;
}

.main-content {
  min-width: 0;
}

.content-card {
  background: #fff;
  border-radius: 8px;
  border: 1px solid #dce6f5;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(35, 64, 110, 0.05);
}

.card-header {
  height: 66px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
}

.card-header h2 {
  margin: 0;
  color: #17233d;
  font-size: 18px;
  font-weight: 700;
}

.filter-section {
  padding: 0 20px 20px;
  border-bottom: 1px solid #dce6f5;
}

.filter-row {
  display: grid;
  grid-template-columns: repeat(4, minmax(132px, 1fr)) minmax(220px, 1.25fr);
  gap: 10px;
  align-items: center;
}

.filter-item {
  min-width: 0;
}

.filter-label {
  display: none;
}

.filter-select {
  width: 100%;
  height: 40px;
  padding: 0 36px 0 14px;
  border: 1px solid #d7e2f1;
  border-radius: 6px;
  font-size: 13px;
  color: #1a2944;
  background: #fff;
  cursor: pointer;
  outline: none;
}

.search-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 10px;
}

.search-input {
  width: 100%;
  height: 40px;
  padding: 0 14px;
  border: 1px solid #d7e2f1;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.16s ease;
}

.search-input:focus {
  border-color: #1268f6;
}

.btn-reset {
  height: 40px;
  padding: 0 20px;
  background: #fff;
  border: 1px solid #d7e2f1;
  border-radius: 6px;
  color: #44536c;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.16s ease;
}

.btn-reset:hover {
  border-color: #1268f6;
  color: #1268f6;
}

.btn-secondary,
.btn-primary {
  height: 40px;
  padding: 0 22px;
  border: none;
  border-radius: 6px;
  background: #1268f6;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 8px 18px rgba(18, 104, 246, 0.18);
}

.btn-secondary:hover,
.btn-primary:hover {
  background: #0d57d4;
}

.operation-message {
  color: #1268f6;
  font-size: 13px;
  font-weight: 600;
}

.table-container {
  overflow-x: auto;
  padding: 0 20px 28px;
}

.demand-table {
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  border: 1px solid #dce6f5;
}

.demand-table th {
  padding: 14px 12px;
  text-align: left;
  font-size: 13px;
  font-weight: 600;
  color: #17233d;
  border-right: 1px solid #e4ecf7;
  border-bottom: 1px solid #dce6f5;
  background: #f8fbff;
}

.demand-table td {
  padding: 18px 12px;
  font-size: 13px;
  line-height: 1.55;
  color: #24314c;
  border-right: 1px solid #e4ecf7;
  border-bottom: 1px solid #e4ecf7;
  vertical-align: middle;
}

.demand-table th:last-child,
.demand-table td:last-child {
  border-right: none;
}

.demand-table tr.active td {
  background: #f4f8ff;
}

.demand-table th:nth-child(1),
.demand-table td:nth-child(1) {
  width: 9%;
  font-weight: 700;
}

.demand-table th:nth-child(2),
.demand-table td:nth-child(2) {
  width: 24%;
}

.demand-table th:nth-child(3),
.demand-table td:nth-child(3) {
  width: 15%;
}

.demand-table th:nth-child(4),
.demand-table td:nth-child(4) {
  width: 13%;
}

.demand-table th:nth-child(5),
.demand-table td:nth-child(5) {
  width: 12%;
}

.demand-table th:nth-child(6),
.demand-table td:nth-child(6) {
  width: 21%;
}

.demand-table th:nth-child(7),
.demand-table td:nth-child(7) {
  width: 6%;
}

.demand-table tr:last-child td {
  border-bottom: none;
}

.btn-view {
  padding: 0;
  background: transparent;
  color: #1268f6;
  border: none;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
}

.btn-view:hover {
  color: #0d57d4;
}

.empty-cell {
  height: 120px;
  text-align: center;
  color: #66758f;
}

.sidebar {
  min-width: 0;
}

.sidebar-card {
  background: #fff;
  border-radius: 8px;
  border: 1px solid #dce6f5;
  padding: 18px;
  box-shadow: 0 8px 24px rgba(35, 64, 110, 0.05);
}

.sidebar-title {
  margin: 0 0 20px 0;
  font-size: 18px;
  font-weight: 700;
  color: #17233d;
}

.suggestions-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.suggestion-item {
  display: grid;
  grid-template-columns: 72px minmax(0, 1fr);
  gap: 16px;
  align-items: center;
  min-height: 124px;
  padding: 18px 16px;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #dce6f5;
}

.suggestion-icon {
  width: 62px;
  height: 62px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  font-weight: 800;
}

.suggestion-icon.green {
  color: #18a663;
  background: #dff8ec;
}

.suggestion-icon.blue {
  color: #1268f6;
  background: #e8f0ff;
}

.suggestion-icon.orange {
  color: #f26a16;
  background: #fff0df;
}

.suggestion-title {
  font-size: 14px;
  font-weight: 700;
  color: #17233d;
  margin-bottom: 8px;
}

.suggestion-desc {
  font-size: 13px;
  line-height: 1.65;
  color: #52617a;
}

.selected-demand {
  margin: 14px 0 0;
  padding: 16px;
  border: 1px solid #dce6f5;
  border-radius: 8px;
  background: #f8fbff;
}

.selected-name {
  color: #17233d;
  font-size: 14px;
  font-weight: 700;
}

.outline-action {
  width: 100%;
  height: 48px;
  margin-top: 16px;
  border: 1px solid #1268f6;
  border-radius: 6px;
  background: #fff;
  color: #1268f6;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
}

.outline-action:hover {
  background: #f2f7ff;
}

@media (max-width: 1320px) {
  .stats-container {
    grid-template-columns: repeat(2, 1fr);
  }

  .demand-workspace {
    grid-template-columns: 1fr;
  }

  .filter-row {
    grid-template-columns: repeat(2, minmax(220px, 1fr));
  }

  .sidebar-card {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
  }

  .sidebar-title,
  .suggestions-list,
  .outline-action {
    grid-column: 1 / -1;
  }

  .suggestions-list {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 768px) {
  .stats-container {
    grid-template-columns: 1fr;
  }

  .stat-card,
  .suggestion-item {
    grid-template-columns: 64px minmax(0, 1fr);
    padding: 18px;
  }

  .stat-icon,
  .suggestion-icon {
    width: 58px;
    height: 58px;
  }

  .filter-row,
  .sidebar-card,
  .suggestions-list {
    grid-template-columns: 1fr;
  }

  .search-row {
    flex-wrap: wrap;
  }
}
</style>
