<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'
import { createVirtualLabRoom, getVirtualLabState } from '@/stores/admin/virtualLabStore'

const router = useRouter()
const virtualLabState = getVirtualLabState()

const selectedDepartment = ref('全部')
const selectedMajor = ref('全部')
const selectedActivity = ref('全部')
const searchQuery = ref('')
const appliedSearchQuery = ref('')
const viewMode = ref<'card' | 'table'>('card')
const operationMessage = ref('')

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
  operationMessage.value = virtualLabState.operationMessage
}

function resetFilters() {
  selectedDepartment.value = '全部'
  selectedMajor.value = '全部'
  selectedActivity.value = '全部'
  searchQuery.value = ''
  appliedSearchQuery.value = ''
  operationMessage.value = '已重置筛选条件。'
}

function applyFilters() {
  appliedSearchQuery.value = searchQuery.value
  operationMessage.value = `已筛选出 ${filteredRooms.value.length} 个教研室。`
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

          <div class="filter-section">
            <div class="filter-row">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="搜索教研室名称、负责人、教研方向"
                class="search-input"
                @keyup.enter="applyFilters"
              />
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
            </div>
            <div class="search-row">
              <button class="btn-reset" @click="resetFilters">重置</button>
              <button class="btn-secondary" @click="applyFilters">查询</button>
              <span v-if="operationMessage" class="operation-message">{{ operationMessage }}</span>
            </div>
          </div>

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
                  <button class="btn-detail" @click="viewDetail(room.id)">查看详情</button>
                </div>
              </article>
              <div v-if="filteredRooms.length === 0" class="empty-panel">暂无符合条件的教研室</div>
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
                      <button class="btn-view" @click="viewDetail(room.id)">查看详情</button>
                    </td>
                  </tr>
                  <tr v-if="filteredRooms.length === 0">
                    <td colspan="6" class="empty-cell">暂无符合条件的教研室</td>
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
  background: #f6f9ff;
  color: #17233d;
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
  gap: 8px;
  font-size: 14px;
  color: #66758f;
}

.breadcrumb .separator {
  color: #9aa8bd;
}

.breadcrumb .current {
  color: #1268f6;
  font-weight: 600;
}

.page-desc {
  margin: 10px 0 0;
  font-size: 14px;
  line-height: 1.6;
  color: #66758f;
}

.btn-primary,
.btn-secondary,
.btn-reset,
.btn-detail,
.btn-view,
.view-btn {
  height: 34px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.16s ease;
  white-space: nowrap;
}

.btn-primary {
  padding: 0 16px;
  border: 1px solid #1268f6;
  background: #1268f6;
  color: #fff;
}

.btn-primary:hover,
.btn-detail:hover,
.btn-view:hover,
.btn-secondary:hover {
  background: #0d55d8;
  border-color: #0d55d8;
}

.stats-section {
  background: #f6f9ff;
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
  gap: 16px;
  padding: 20px;
  background: #fff;
  border: 1px solid #dce6f5;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(35, 64, 110, 0.05);
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
  color: #1268f6;
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
  color: #66758f;
}

.stat-value {
  margin-top: 8px;
  font-size: 32px;
  line-height: 1;
  font-weight: 700;
}

.stat-value span {
  font-size: 14px;
  color: #17233d;
}

.stat-value.blue {
  color: #1268f6;
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
  border: 1px solid #dce6f5;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(35, 64, 110, 0.04);
}

.card-header {
  min-height: 58px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  border-bottom: 1px solid #e4ebf5;
}

.table-title {
  margin: 0;
  font-size: 17px;
  font-weight: 700;
  color: #17233d;
}

.view-mode-switch {
  display: flex;
  gap: 8px;
}

.view-btn {
  padding: 0 14px;
  border: 1px solid #d7e2f2;
  background: #fff;
  color: #66758f;
}

.view-btn.active {
  border-color: #1268f6;
  background: #1268f6;
  color: #fff;
}

.filter-section {
  padding: 18px 20px;
  border-bottom: 1px solid #e4ebf5;
  background: #fbfdff;
}

.filter-row {
  display: grid;
  grid-template-columns: minmax(260px, 1.4fr) repeat(3, minmax(180px, 0.72fr));
  gap: 12px;
  align-items: center;
}

.filter-item {
  height: 36px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 10px;
  background: #fff;
  border: 1px solid #d7e2f2;
  border-radius: 6px;
}

.filter-label {
  flex: 0 0 auto;
  font-size: 13px;
  font-weight: 600;
  color: #66758f;
}

.filter-select {
  min-width: 0;
  flex: 1;
  border: 0;
  outline: none;
  background: transparent;
  color: #17233d;
  font-size: 13px;
}

.search-input {
  width: 100%;
  height: 36px;
  padding: 0 12px;
  border: 1px solid #d7e2f2;
  border-radius: 6px;
  background: #fff;
  color: #17233d;
  font-size: 13px;
  outline: none;
}

.search-input:focus,
.filter-item:focus-within {
  border-color: #1268f6;
  box-shadow: 0 0 0 3px rgba(18, 104, 246, 0.1);
}

.search-row {
  margin-top: 12px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.btn-reset {
  padding: 0 14px;
  border: 1px solid #d7e2f2;
  background: #fff;
  color: #66758f;
}

.btn-reset:hover {
  border-color: #1268f6;
  color: #1268f6;
}

.btn-secondary {
  padding: 0 16px;
  border: 1px solid #1268f6;
  background: #1268f6;
  color: #fff;
}

.operation-message {
  font-size: 13px;
  color: #1268f6;
}

.rooms-section {
  padding: 20px;
}

.rooms-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.room-card {
  min-height: 218px;
  display: flex;
  flex-direction: column;
  padding: 18px;
  border: 1px solid #dce6f5;
  border-radius: 8px;
  background: #fff;
}

.room-card:hover {
  box-shadow: 0 8px 22px rgba(35, 64, 110, 0.08);
}

.room-card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.room-name,
.room-title {
  margin: 0;
  color: #17233d;
  font-size: 16px;
  line-height: 1.35;
  font-weight: 700;
}

.room-tag {
  flex: 0 0 auto;
  padding: 3px 8px;
  border-radius: 999px;
  background: #e8f0ff;
  color: #1268f6;
  font-size: 12px;
  font-weight: 600;
}

.room-meta {
  margin-top: 14px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px 18px;
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
  color: #17233d;
  font-size: 13px;
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.room-metrics {
  margin-top: 14px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.metric-pill {
  display: inline-flex;
  align-items: center;
  min-height: 24px;
  padding: 3px 8px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
}

.metric-pill.active {
  background: #fff0df;
  color: #d85a0d;
}

.metric-pill.record {
  background: #e8f0ff;
  color: #1268f6;
}

.recent-row {
  margin-top: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  color: #66758f;
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
  color: #17233d;
}

.card-footer {
  margin-top: auto;
  padding-top: 14px;
  text-align: right;
}

.btn-detail,
.btn-view {
  padding: 0 14px;
  border: 1px solid #1268f6;
  background: #1268f6;
  color: #fff;
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
  color: #66758f;
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

.empty-panel,
.empty-cell {
  padding: 28px;
  text-align: center;
  color: #8a98ad;
  font-size: 13px;
}

.empty-panel {
  grid-column: 1 / -1;
  border: 1px dashed #d7e2f2;
  border-radius: 8px;
  background: #fbfdff;
}

@media (max-width: 1360px) {
  .stats-container {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .filter-row {
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
  .stats-container,
  .filter-row {
    grid-template-columns: 1fr;
  }

  .room-meta {
    grid-template-columns: 1fr;
  }
}
</style>
