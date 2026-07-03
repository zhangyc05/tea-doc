<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { CompactFilterBar, EmptyState } from '@/components/common'
import { Button } from '@/components/ui'
import AdminLayout from '@/layouts/AdminLayout.vue'
import { useOperationMessage } from '@/lib/operationMessage'
import { createVirtualLabRoom, getVirtualLabState } from '@/stores/admin/virtualLabStore'

const router = useRouter()
const virtualLabState = getVirtualLabState()

const selectedDepartment = ref('全部')
const selectedMajor = ref('全部')
const selectedActivity = ref('全部')
const searchQuery = ref('')
const appliedSearchQuery = ref('')
const viewMode = ref<'card' | 'table'>('card')
const operationMessage = useOperationMessage()

const stats = computed(() => ({
  totalRooms: virtualLabState.rooms.length,
  departments: new Set(virtualLabState.rooms.map(room => room.affiliation.split('|')[0]?.trim())).size,
  inProgressActivities: virtualLabState.rooms.reduce((total, room) => total + room.inProgressActivities, 0),
  recordsCount: virtualLabState.rooms.reduce((total, room) => total + room.recordsCount, 0),
}))

const filteredRooms = computed(() => {
  const keyword = appliedSearchQuery.value.trim().toLowerCase()

  return virtualLabState.rooms.filter((room) => {
    const matchesDepartment = selectedDepartment.value === '全部' || room.affiliation.includes(selectedDepartment.value)
    const matchesMajor = selectedMajor.value === '全部' || room.affiliation.includes(selectedMajor.value)
    const matchesActivity = selectedActivity.value === '全部'
      || (selectedActivity.value === '进行中活动' && room.inProgressActivities > 0)
      || (selectedActivity.value === '已形成记录' && room.recordsCount > 0)
    const matchesKeyword = !keyword
      || `${room.name} ${room.leader} ${room.direction} ${room.affiliation}`.toLowerCase().includes(keyword)

    return matchesDepartment && matchesMajor && matchesActivity && matchesKeyword
  })
})

function createRoom() {
  createVirtualLabRoom()
  selectedDepartment.value = '全部'
  selectedMajor.value = '全部'
  selectedActivity.value = '全部'
  searchQuery.value = ''
  appliedSearchQuery.value = ''
  viewMode.value = 'card'
  operationMessage.fromStore(virtualLabState)
}

function resetFilters() {
  selectedDepartment.value = '全部'
  selectedMajor.value = '全部'
  selectedActivity.value = '全部'
  searchQuery.value = ''
  appliedSearchQuery.value = ''
  operationMessage.set('已重置筛选条件。')
}

function applyFilters() {
  appliedSearchQuery.value = searchQuery.value
  operationMessage.set(`已筛选出 ${filteredRooms.value.length} 个教研室。`)
}

function viewDetail(roomId: string) {
  router.push(`/admin/virtual-lab/rooms/${roomId}`)
}
</script>

<template>
  <AdminLayout active-key="virtual-lab">
    <div class="virtual-lab-room-page">
      <section class="stats-section">
        <div class="stats-container">
          <div class="stat-card">
            <div class="stat-icon icon-room">▦</div>
            <div>
              <div class="stat-label">教研室总数</div>
              <div class="stat-value blue">{{ stats.totalRooms }} <span>个</span></div>
              <div class="stat-desc">当前纳入线上教研管理的虚拟教研室</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon icon-school">▥</div>
            <div>
              <div class="stat-label">覆盖院系</div>
              <div class="stat-value green">{{ stats.departments }} <span>个</span></div>
              <div class="stat-desc">已覆盖院系与跨院系教研方向</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon icon-active">▣</div>
            <div>
              <div class="stat-label">进行中活动</div>
              <div class="stat-value orange">{{ stats.inProgressActivities }} <span>个</span></div>
              <div class="stat-desc">本周仍在推进的线上教研活动</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon icon-record">▤</div>
            <div>
              <div class="stat-label">已形成记录</div>
              <div class="stat-value purple">{{ stats.recordsCount }} <span>条</span></div>
              <div class="stat-desc">沉淀会议纪要、材料与改进记录</div>
            </div>
          </div>
        </div>
      </section>

      <section class="main-section">
        <div class="content-card">
          <div class="card-header">
            <h2 class="table-title">教研室列表</h2>
            <div class="view-mode-switch">
              <button
                :class="['view-btn', { active: viewMode === 'card' }]"
                @click="viewMode = 'card'"
              >
                卡片视图
              </button>
              <button
                :class="['view-btn', { active: viewMode === 'table' }]"
                @click="viewMode = 'table'"
              >
                表格视图
              </button>
            </div>
          </div>

          <CompactFilterBar>
            <template #fields>
              <label class="filter-item">
                <span class="filter-label">院系：</span>
                <select v-model="selectedDepartment" class="filter-select">
                  <option>全部</option>
                  <option>智能制造学院</option>
                  <option>交通工程学院</option>
                  <option>现代服务学院</option>
                  <option>教育学院</option>
                  <option>教务处</option>
                </select>
              </label>
              <label class="filter-item">
                <span class="filter-label">专业群：</span>
                <select v-model="selectedMajor" class="filter-select">
                  <option>全部</option>
                  <option>智能制造专业群</option>
                  <option>工业机器人技术专业</option>
                  <option>新能源汽车专业群</option>
                  <option>电子商务专业群</option>
                  <option>学前教育专业群</option>
                </select>
              </label>
              <label class="filter-item">
                <span class="filter-label">活动情况：</span>
                <select v-model="selectedActivity" class="filter-select">
                  <option>全部</option>
                  <option>进行中活动</option>
                  <option>已形成记录</option>
                </select>
              </label>
            </template>
            <template #search>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="搜索教研室名称、负责人、教研方向"
                class="search-input"
                @keyup.enter="applyFilters"
              />
          </template>
          <template #actions>
            <Button variant="outline" @click="resetFilters">重置</Button>
            <Button variant="secondary" @click="applyFilters">查询</Button>
          </template>
            <template #message>
              <span v-if="operationMessage.text.value" class="operation-message">{{ operationMessage.text.value }}</span>
            </template>
          </CompactFilterBar>

          <div class="rooms-section">
            <div v-if="viewMode === 'card'" class="rooms-grid">
              <article
                v-for="room in filteredRooms"
                :key="room.id"
                class="room-card"
              >
                <div class="room-card-header">
                  <h3 class="room-name">{{ room.name }}</h3>
                  <span class="room-tag">线上教研</span>
                </div>
                <div class="room-meta">
                  <div>
                    <span class="info-label">方向</span>
                    <strong>{{ room.direction }}</strong>
                  </div>
                  <div>
                    <span class="info-label">归属</span>
                    <strong>{{ room.affiliation }}</strong>
                  </div>
                  <div>
                    <span class="info-label">负责人</span>
                    <strong>{{ room.leader }}</strong>
                  </div>
                  <div>
                    <span class="info-label">成员</span>
                    <strong>{{ room.members }} 人</strong>
                  </div>
                </div>
                <div class="room-metrics">
                  <span class="metric-pill active">进行中活动 {{ room.inProgressActivities }}</span>
                  <span class="metric-pill record">已形成记录 {{ room.recordsCount }}</span>
                </div>
                <div class="recent-row">
                  <span>最近活动：{{ room.recentActivity }}</span>
                  <b>{{ room.recentTime }}</b>
                </div>
                <div class="card-footer">
                  <Button @click="viewDetail(room.id)">查看详情</Button>
                </div>
              </article>
              <EmptyState
                v-if="filteredRooms.length === 0"
                class="room-empty-state"
                title="暂无符合条件的教研室"
              />
            </div>

            <div v-else class="table-container">
              <table class="room-table">
                <thead>
                  <tr>
                    <th>教研室</th>
                    <th>归属 / 方向</th>
                    <th>负责人 / 成员</th>
                    <th>活动与记录</th>
                    <th>最近动态</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="room in filteredRooms" :key="room.id">
                    <td>
                      <div class="room-title">{{ room.name }}</div>
                      <div class="sub-text">线上教研</div>
                    </td>
                    <td>
                      <div>{{ room.affiliation }}</div>
                      <div class="sub-text">{{ room.direction }}</div>
                    </td>
                    <td>
                      <div>{{ room.leader }}</div>
                      <div class="sub-text">{{ room.members }} 人</div>
                    </td>
                    <td>
                      <span class="metric-pill active">活动 {{ room.inProgressActivities }}</span>
                      <span class="metric-pill record">记录 {{ room.recordsCount }}</span>
                    </td>
                    <td>
                      <div>{{ room.recentActivity }}</div>
                      <div class="sub-text">{{ room.recentTime }}</div>
                    </td>
                    <td>
                      <Button variant="ghost" size="sm" @click="viewDetail(room.id)">查看详情</Button>
                    </td>
                  </tr>
                  <tr v-if="filteredRooms.length === 0">
                    <EmptyState as="td" variant="cell" :colspan="6" title="暂无符合条件的教研室" />
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  </AdminLayout>
</template>

<style scoped>
.virtual-lab-room-page {
  min-height: 100vh;
  background: var(--color-admin-bg);
  color: var(--color-admin-text-strong);
}

.virtual-lab-room-page *,
.virtual-lab-room-page *::before,
.virtual-lab-room-page *::after {
  box-sizing: border-box;
}

.page-header {
  padding: 24px 0 18px;
}

.header-content,
.stats-container,
.main-section {
  max-width: 1560px;
  margin: 0 auto;
}

.header-content {
  padding: 0 22px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: var(--space-admin-xs);
  font-size: 14px;
  color: var(--color-admin-text-muted);
}

.breadcrumb .separator {
  color: #9aa8bd;
}

.breadcrumb .current {
  color: var(--color-admin-primary);
  font-weight: 600;
}

.page-desc {
  margin: 10px 0 0;
  font-size: 14px;
  line-height: 1.6;
  color: var(--color-admin-text-muted);
}

.view-btn {
  height: 34px;
  border-radius: var(--radius-sm);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.16s ease;
  white-space: nowrap;
}

.stats-section {
  background: var(--color-admin-bg);
}

.stats-container {
  padding: 0 22px 24px;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
}

.stat-card {
  min-height: 142px;
  display: grid;
  grid-template-columns: 66px minmax(0, 1fr);
  align-items: center;
  gap: var(--space-admin-lg);
  padding: 20px;
  background: #fff;
  border: 1px solid var(--color-admin-border);
  border-radius: var(--radius-admin-panel);
  box-shadow: var(--shadow-admin-card-subtle);
}

.stat-icon {
  width: 58px;
  height: 58px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  font-weight: 800;
}

.icon-room {
  color: var(--color-admin-primary);
  background: #e8f0ff;
}

.icon-school {
  color: #18a663;
  background: #dff8ec;
}

.icon-active {
  color: #f26a16;
  background: #fff0df;
}

.icon-record {
  color: #8848e8;
  background: #efe7ff;
}

.stat-label {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-admin-text-muted);
}

.stat-value {
  margin-top: 8px;
  font-size: 32px;
  line-height: 1;
  font-weight: 700;
}

.stat-value span {
  font-size: 14px;
  color: var(--color-admin-text-strong);
}

.stat-value.blue {
  color: var(--color-admin-primary);
}

.stat-value.green {
  color: #18a663;
}

.stat-value.orange {
  color: #f26a16;
}

.stat-value.purple {
  color: #8848e8;
}

.stat-desc {
  margin-top: 10px;
  font-size: 12px;
  line-height: 1.5;
  color: #8a98ad;
}

.main-section {
  padding: 0 22px 34px;
}

.content-card {
  background: #fff;
  border: 1px solid var(--color-admin-border);
  border-radius: var(--radius-admin-panel);
  overflow: hidden;
  box-shadow: var(--shadow-admin-card-faint);
}

.card-header {
  min-height: 58px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-admin-lg);
  border-bottom: 1px solid #e4ebf5;
}

.table-title {
  margin: 0;
  font-size: 17px;
  font-weight: 700;
  color: var(--color-admin-text-strong);
}

.view-mode-switch {
  display: flex;
  gap: var(--space-admin-xs);
}

.view-btn {
  padding: 0 14px;
  border: 1px solid #d7e2f2;
  background: #fff;
  color: var(--color-admin-text-muted);
}

.view-btn.active {
  border-color: var(--color-admin-primary);
  background: var(--color-admin-primary);
  color: #fff;
}

.filter-item {
  height: 36px;
  display: flex;
  align-items: center;
  gap: var(--space-admin-xs);
  padding: 0 10px;
  background: #fff;
  border: 1px solid #d7e2f2;
  border-radius: var(--radius-sm);
}

.filter-label {
  flex: 0 0 auto;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-admin-text-muted);
}

.filter-select {
  min-width: 0;
  flex: 1;
  border: 0;
  outline: none;
  background: transparent;
  color: var(--color-admin-text-strong);
  font-size: 13px;
}

.search-input {
  width: 100%;
  height: 36px;
  padding: 0 12px;
  border: 1px solid #d7e2f2;
  border-radius: var(--radius-sm);
  background: #fff;
  color: var(--color-admin-text-strong);
  font-size: 13px;
  outline: none;
}

.search-input:focus,
.filter-item:focus-within {
  border-color: var(--color-admin-primary);
  box-shadow: 0 0 0 3px rgba(18, 104, 246, 0.1);
}

.operation-message {
  font-size: 13px;
  color: var(--color-admin-primary);
}

.rooms-section {
  padding: 20px;
}

.rooms-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-admin-lg);
}

.room-card {
  min-height: 218px;
  display: flex;
  flex-direction: column;
  padding: 18px;
  border: 1px solid var(--color-admin-border);
  border-radius: var(--radius-admin-panel);
  background: #fff;
}

.room-card:hover {
  box-shadow: 0 8px 22px rgba(35, 64, 110, 0.08);
}

.room-card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-admin-md);
}

.room-name,
.room-title {
  margin: 0;
  color: var(--color-admin-text-strong);
  font-size: 16px;
  line-height: 1.35;
  font-weight: 700;
}

.room-tag {
  flex: 0 0 auto;
  padding: 3px 8px;
  border-radius: var(--radius-full);
  background: #e8f0ff;
  color: var(--color-admin-primary);
  font-size: 12px;
  font-weight: 600;
}

.room-meta {
  margin-top: 14px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-admin-sm) 18px;
}

.room-meta div {
  min-width: 0;
}

.info-label {
  display: block;
  margin-bottom: 4px;
  font-size: 12px;
  color: #8a98ad;
}

.room-meta strong {
  display: block;
  overflow: hidden;
  color: var(--color-admin-text-strong);
  font-size: 13px;
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.room-metrics {
  margin-top: 14px;
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-admin-xs);
}

.metric-pill {
  display: inline-flex;
  align-items: center;
  min-height: 24px;
  padding: 3px 8px;
  border-radius: var(--radius-full);
  font-size: 12px;
  font-weight: 600;
}

.metric-pill.active {
  background: #fff0df;
  color: #d85a0d;
}

.metric-pill.record {
  background: #e8f0ff;
  color: var(--color-admin-primary);
}

.recent-row {
  margin-top: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-admin-md);
  color: var(--color-admin-text-muted);
  font-size: 13px;
}

.recent-row span {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.recent-row b {
  flex: 0 0 auto;
  color: var(--color-admin-text-strong);
}

.card-footer {
  margin-top: auto;
  padding-top: 14px;
  text-align: right;
}

.table-container {
  width: 100%;
  overflow-x: auto;
}

.room-table {
  width: 100%;
  min-width: 980px;
  border-collapse: collapse;
  table-layout: fixed;
}

.room-table th,
.room-table td {
  padding: 14px 12px;
  border-bottom: 1px solid #e8eef7;
  text-align: left;
  vertical-align: middle;
  font-size: 13px;
  line-height: 1.5;
}

.room-table th {
  background: #f7faff;
  color: var(--color-admin-text-muted);
  font-weight: 700;
}

.room-table th:nth-child(1),
.room-table td:nth-child(1) {
  width: 22%;
}

.room-table th:nth-child(2),
.room-table td:nth-child(2) {
  width: 25%;
}

.room-table th:nth-child(6),
.room-table td:nth-child(6) {
  width: 92px;
  text-align: right;
}

.sub-text {
  margin-top: 4px;
  color: #8a98ad;
  font-size: 12px;
}

.room-empty-state {
  grid-column: 1 / -1;
}

@media (max-width: 1360px) {
  .stats-container {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

}

@media (max-width: 1024px) {
  .header-content {
    flex-direction: column;
  }

  .rooms-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 760px) {
  .stats-container {
    grid-template-columns: 1fr;
  }

  .room-meta {
    grid-template-columns: 1fr;
  }
}
</style>
