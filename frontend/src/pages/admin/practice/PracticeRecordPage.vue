<script setup lang="ts">
import { computed, ref } from 'vue'
import AdminLayout from '@/layouts/AdminLayout.vue'

// 筛选条件
const selectedDepartment = ref('全部')
const selectedStatus = ref('全部')
const selectedDays = ref('全部')
const searchQuery = ref('')
const appliedSearchQuery = ref('')
const activeRecordId = ref('1')
const operationMessage = ref('')

// 统计数据
const stats = {
  inProgress: 12,
  summaryPending: 6,
  evaluationPending: 5,
  archivePending: 9,
  archived: 48,
}

// 实践记录数据
interface PracticeRecord {
  id: string
  teacher: string
  department: string
  major: string
  company: string
  position: string
  practicePeriod: string
  materialStatus: string
  currentStatus: string
  countedDays: string
  recentAction: string
}

const records: PracticeRecord[] = [
  {
    id: '1',
    teacher: '林老师',
    department: '智能制造学院',
    major: '机电一体化技术',
    company: '山西智能装备有限公司',
    position: '工艺改进实践',
    practicePeriod: '2026-07-01 至 2026-07-15 / 15 天',
    materialStatus: '日志完整 | 总结待提交 | 评价待上传',
    currentStatus: '待提交总结',
    countedDays: '暂未计入',
    recentAction: '07-15 完成实践',
  },
  {
    id: '2',
    teacher: '王老师',
    department: '智能制造学院',
    major: '工业机器人技术',
    company: '青岛工业机器人有限公司',
    position: '现场调试实践',
    practicePeriod: '2026-06-10 至 2026-06-22 / 12 天',
    materialStatus: '日志完整 | 总结已交 | 评价已上传',
    currentStatus: '待归档确认',
    countedDays: '归档后计入',
    recentAction: '06-24 提交总结',
  },
  {
    id: '3',
    teacher: '陈老师',
    department: '智能制造学院',
    major: '数控技术',
    company: '山西智能装备集团',
    position: '岗位实践',
    practicePeriod: '2026-05-01 至 2026-05-30 / 30 天',
    materialStatus: '材料完整',
    currentStatus: '已归档',
    countedDays: '已计入',
    recentAction: '06-02 已归档',
  },
  {
    id: '4',
    teacher: '赵老师',
    department: '电子信息学院',
    major: '软件技术',
    company: '济南智联科技有限公司',
    position: '项目开发实践',
    practicePeriod: '2026-07-08 至 2026-07-28 / 21 天',
    materialStatus: '日志待补 | 总结未提交 | 评价待上传',
    currentStatus: '实践中',
    countedDays: '暂未计入',
    recentAction: '07-18 提交日报',
  },
  {
    id: '5',
    teacher: '孙老师',
    department: '智能制造学院',
    major: '应用电子技术',
    company: '济南高端制造有限公司',
    position: '产线优化实践',
    practicePeriod: '2026-06-01 至 2026-06-18 / 18 天',
    materialStatus: '日志完整 | 总结已交 | 评价待上传',
    currentStatus: '待企业评价',
    countedDays: '暂未计入',
    recentAction: '06-19 企业反馈缺失',
  },
]

const recordRows = ref<PracticeRecord[]>(records)

const filteredRecords = computed(() => {
  const keyword = appliedSearchQuery.value.trim().toLowerCase()

  return recordRows.value.filter((record) => {
    const matchesDepartment = selectedDepartment.value === '全部' || record.department === selectedDepartment.value
    const matchesStatus = selectedStatus.value === '全部' || record.currentStatus === selectedStatus.value
    const matchesDays = selectedDays.value === '全部' || record.countedDays === selectedDays.value
    const matchesKeyword = !keyword
      || `${record.teacher} ${record.company} ${record.department} ${record.major}`.toLowerCase().includes(keyword)

    return matchesDepartment && matchesStatus && matchesDays && matchesKeyword
  })
})

const activeRecord = computed(() => {
  return recordRows.value.find((record) => record.id === activeRecordId.value) ?? recordRows.value[0]
})

function resetFilters() {
  selectedDepartment.value = '全部'
  selectedStatus.value = '全部'
  selectedDays.value = '全部'
  searchQuery.value = ''
  appliedSearchQuery.value = ''
  operationMessage.value = '已重置筛选条件。'
}

function viewDetail(id: string) {
  activeRecordId.value = id
  operationMessage.value = '已在表格中定位该实践记录。'
}

function remindMaterial(id: string) {
  activeRecordId.value = id
  const target = recordRows.value.find((record) => record.id === id)
  operationMessage.value = target ? `已提醒 ${target.teacher} 补充实践材料。` : '已发送补材料提醒。'
}

function confirmArchive(id: string) {
  const target = recordRows.value.find((record) => record.id === id)
  if (!target) return
  target.currentStatus = '已归档'
  target.countedDays = '已计入'
  target.recentAction = '已确认归档'
  activeRecordId.value = id
  operationMessage.value = `${target.teacher} 的实践记录已确认归档。`
}

function viewArchive(id: string) {
  activeRecordId.value = id
  operationMessage.value = '已在表格中定位已归档记录。'
}

function exportRecords() {
  operationMessage.value = `已准备导出 ${filteredRecords.value.length} 条实践记录。`
}

function applyFilters() {
  appliedSearchQuery.value = searchQuery.value
  operationMessage.value = `已筛选出 ${filteredRecords.value.length} 条实践记录。`
}

function getStatusClass(status: string): string {
  const statusMap: Record<string, string> = {
    '材料待完善': 'incomplete',
    '待提交总结': 'incomplete',
    '待归档确认': 'pending-archive',
    '已归档': 'archived',
    '实践中': 'in-progress',
    '待企业评价': 'pending-evaluation',
  }
  return statusMap[status] || ''
}
</script>

<template>
  <AdminLayout active-key="practice-records">
    <div class="practice-record-page">
      <!-- 统计卡区域 -->
      <section class="stats-section">
        <div class="stats-container">
          <div class="stat-card">
            <div class="stat-icon icon-progress">▣</div>
            <div>
              <div class="stat-label">实践中</div>
              <div class="stat-value blue">{{ stats.inProgress }} <span>人</span></div>
              <div class="stat-desc">当前仍在进行中的企业实践记录</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon icon-summary">▤</div>
            <div>
              <div class="stat-label">待提交总结</div>
              <div class="stat-value orange">{{ stats.summaryPending }} <span>条</span></div>
              <div class="stat-desc">实践已结束，待教师补充实践总结</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon icon-evaluation">▥</div>
            <div>
              <div class="stat-label">待补企业评价</div>
              <div class="stat-value purple">{{ stats.evaluationPending }} <span>条</span></div>
              <div class="stat-desc">实践材料仍缺企业评价或鉴定</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon icon-archive-pending">▰</div>
            <div>
              <div class="stat-label">待归档确认</div>
              <div class="stat-value amber">{{ stats.archivePending }} <span>条</span></div>
              <div class="stat-desc">材料已较完整，待确认归档</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon icon-archived">▱</div>
            <div>
              <div class="stat-label">已归档</div>
              <div class="stat-value green">{{ stats.archived }} <span>条</span></div>
              <div class="stat-desc">已形成可沉淀的实践记录</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 主体内容区域 -->
      <section class="main-section">
        <div class="content-card">
          <div class="card-header">
            <h2 class="table-title">记录列表</h2>
            <button class="btn-primary" @click="exportRecords">⇩ 导出记录</button>
          </div>
          <!-- 筛选区 -->
          <div class="filter-section">
            <div class="filter-row">
              <label class="filter-item">
                <span class="filter-label">院系范围：</span>
                <select v-model="selectedDepartment" class="filter-select">
                  <option>全部</option>
                  <option>智能制造学院</option>
                  <option>电子信息学院</option>
                  <option>汽车工程学院</option>
                </select>
              </label>
              <label class="filter-item">
                <span class="filter-label">实践状态：</span>
                <select v-model="selectedStatus" class="filter-select">
                  <option>全部</option>
                  <option>实践中</option>
                  <option>待提交总结</option>
                  <option>待企业评价</option>
                  <option>待归档确认</option>
                  <option>已归档</option>
                </select>
              </label>
              <label class="filter-item">
                <span class="filter-label">计入 30 天：</span>
                <select v-model="selectedDays" class="filter-select">
                  <option>全部</option>
                  <option>已计入</option>
                  <option>待确认计入</option>
                  <option>暂未计入</option>
                </select>
              </label>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="搜索教师、实践单位"
                class="search-input"
                @keyup.enter="applyFilters"
              />
            </div>
            <div class="search-row">
              <button class="btn-reset" @click="resetFilters">重置</button>
              <button class="btn-secondary" @click="applyFilters">查询</button>
              <span v-if="operationMessage" class="operation-message">{{ operationMessage }}</span>
            </div>
          </div>

          <!-- 数据表格 -->
          <div class="table-section">
            <div class="table-container">
              <table class="record-table">
                <thead>
                  <tr>
                    <th>教师</th>
                    <th>实践单位 / 岗位</th>
                    <th>实践周期</th>
                    <th>材料状态</th>
                    <th>当前状态</th>
                    <th>计入 30 天</th>
                    <th>最近动作</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="record in filteredRecords"
                    :key="record.id"
                    :class="{ active: activeRecordId === record.id }"
                  >
                    <td>
                      <div class="teacher-name">{{ record.teacher }}</div>
                      <div class="sub-text">{{ record.department }} / {{ record.major }}</div>
                    </td>
                    <td>
                      <div class="company-name">{{ record.company }}</div>
                      <div class="sub-text">{{ record.position }}</div>
                    </td>
                    <td>{{ record.practicePeriod }}</td>
                    <td>{{ record.materialStatus }}</td>
                    <td>
                      <span
                        class="status-badge"
                        :class="getStatusClass(record.currentStatus)"
                      >
                        {{ record.currentStatus }}
                      </span>
                    </td>
                    <td>{{ record.countedDays }}</td>
                    <td>{{ record.recentAction }}</td>
                    <td>
                      <div class="btn-action-group">
                        <button class="btn-view" @click="viewDetail(record.id)">
                          查看详情
                        </button>
                        <button
                          v-if="record.currentStatus === '材料待完善' || record.currentStatus === '待提交总结' || record.currentStatus === '待企业评价' || record.currentStatus === '实践中'"
                          class="btn-remind"
                          @click="remindMaterial(record.id)"
                        >
                          提醒补材料
                        </button>
                        <button
                          v-if="record.currentStatus === '待归档确认'"
                          class="btn-confirm"
                          @click="confirmArchive(record.id)"
                        >
                          确认归档
                        </button>
                        <button
                          v-if="record.currentStatus === '已归档'"
                          class="btn-archive"
                          @click="viewArchive(record.id)"
                        >
                          查看档案
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="filteredRecords.length === 0">
                    <td colspan="8" class="empty-cell">暂无符合条件的实践记录</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="selected-summary" v-if="activeRecord">
              当前查看：{{ activeRecord.teacher }}，{{ activeRecord.currentStatus }}，{{ activeRecord.company }}。
            </div>
          </div>
        </div>
      </section>
    </div>
  </AdminLayout>
</template>

<style scoped>
.practice-record-page {
  min-height: 100vh;
  background: #f6f9ff;
  color: #17233d;
}

.practice-record-page *,
.practice-record-page *::before,
.practice-record-page *::after {
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
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #66758f;
}

.breadcrumb .separator {
  color: var(--color-text-hint);
}

.breadcrumb .current {
  color: #1268f6;
  font-weight: 600;
}

.stats-section {
  background: #f6f9ff;
}

.stats-container {
  padding: 0 22px 26px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
}

.stat-card {
  min-height: 150px;
  display: grid;
  grid-template-columns: 72px minmax(0, 1fr);
  align-items: center;
  gap: 16px;
  padding: 22px;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #dce6f5;
  box-shadow: 0 8px 24px rgba(35, 64, 110, 0.05);
}

.stat-icon {
  width: 62px;
  height: 62px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  font-weight: 800;
}

.icon-progress {
  color: #1268f6;
  background: #e8f0ff;
}

.icon-summary {
  color: #f26a16;
  background: #fff0df;
}

.icon-evaluation {
  color: #8848e8;
  background: #efe7ff;
}

.icon-archive-pending {
  color: #f2a400;
  background: #fff3d6;
}

.icon-archived {
  color: #18a663;
  background: #dff8ec;
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

.stat-value.orange {
  color: #f26a16;
}

.stat-value.purple {
  color: #8848e8;
}

.stat-value.amber {
  color: #f2a400;
}

.stat-value.green {
  color: #18a663;
}

.stat-label {
  font-size: 15px;
  color: #17233d;
  font-weight: 600;
  white-space: nowrap;
}

.stat-desc {
  margin-top: 10px;
  color: #52617a;
  font-size: 13px;
  line-height: 1.5;
}

.main-section {
  padding: 0 22px 32px;
}

.content-card {
  background: #fff;
  border-radius: 8px;
  border: 1px solid #dce6f5;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(35, 64, 110, 0.05);
}

.card-header {
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
}

.table-title {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: #17233d;
}

.filter-section {
  padding: 0 20px 16px;
}

.filter-row {
  display: grid;
  grid-template-columns: 190px 190px 190px minmax(260px, 1fr);
  gap: 14px;
  align-items: center;
}

.filter-item {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: center;
  gap: 8px;
}

.filter-label {
  font-size: 14px;
  font-weight: 600;
  color: #263653;
  white-space: nowrap;
}

.filter-select {
  width: 100%;
  height: 40px;
  padding: 0 32px 0 12px;
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
  gap: 12px;
  align-items: center;
  margin-top: 10px;
}

.search-input {
  flex: 1;
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

.btn-reset,
.btn-secondary,
.btn-primary {
  height: 40px;
  padding: 0 20px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
}

.btn-reset {
  background: #fff;
  border: 1px solid #d7e2f1;
  color: #44536c;
}

.btn-secondary,
.btn-primary {
  background: #1268f6;
  border: 1px solid #1268f6;
  color: #fff;
  box-shadow: 0 8px 18px rgba(18, 104, 246, 0.18);
}

.operation-message,
.selected-summary {
  color: #1268f6;
  font-size: 13px;
  font-weight: 600;
}

.table-section {
  padding: 0 20px 22px;
}

.table-container {
  overflow-x: auto;
}

.record-table {
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  border: 1px solid #dce6f5;
}

.record-table th {
  padding: 13px 12px;
  text-align: left;
  font-size: 13px;
  font-weight: 600;
  color: #17233d;
  border-right: 1px solid #e4ecf7;
  border-bottom: 1px solid #dce6f5;
  background: #f8fbff;
}

.record-table td {
  padding: 14px 12px;
  font-size: 13px;
  line-height: 1.6;
  color: #24314c;
  border-right: 1px solid #e4ecf7;
  border-bottom: 1px solid #e4ecf7;
  vertical-align: middle;
}

.record-table th:last-child,
.record-table td:last-child {
  border-right: none;
}

.record-table tr.active td {
  background: #f4f8ff;
}

.record-table th:nth-child(1),
.record-table td:nth-child(1) {
  width: 12%;
}

.record-table th:nth-child(2),
.record-table td:nth-child(2) {
  width: 17%;
}

.record-table th:nth-child(3),
.record-table td:nth-child(3) {
  width: 11%;
}

.record-table th:nth-child(4),
.record-table td:nth-child(4) {
  width: 13%;
}

.record-table th:nth-child(5),
.record-table td:nth-child(5) {
  width: 12%;
  text-align: center;
}

.record-table th:nth-child(6),
.record-table td:nth-child(6) {
  width: 11%;
  text-align: center;
}

.record-table th:nth-child(7),
.record-table td:nth-child(7) {
  width: 11%;
  text-align: center;
}

.record-table th:nth-child(8),
.record-table td:nth-child(8) {
  width: 13%;
  text-align: center;
}

.record-table tr:last-child td {
  border-bottom: none;
}

.teacher-name,
.company-name {
  font-weight: 700;
  color: #17233d;
}

.sub-text {
  color: #52617a;
  font-size: 12px;
}

.status-badge {
  display: inline-block;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;
}

.status-badge.in-progress {
  background: #eaf2ff;
  color: #1268f6;
  border: 1px solid #cfe0ff;
}

.status-badge.incomplete {
  background: #fff0e8;
  color: #f26a16;
  border: 1px solid #ffd3c4;
}

.status-badge.pending-evaluation {
  background: #fff0e8;
  color: #f26a16;
  border: 1px solid #ffd3c4;
}

.status-badge.pending-archive {
  background: #dff8ec;
  color: #18a663;
  border: 1px solid #bdeed7;
}

.status-badge.archived {
  background: #dff8ec;
  color: #18a663;
  border: 1px solid #bdeed7;
}

.btn-action-group {
  display: flex;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
}

.btn-view,
.btn-remind,
.btn-confirm,
.btn-archive {
  padding: 0;
  background: transparent;
  border: none;
  color: #1268f6;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
}

.btn-remind,
.btn-confirm {
  color: #1268f6;
}

.btn-archive {
  color: #18a663;
}

.empty-cell {
  height: 120px;
  text-align: center;
  color: #66758f;
}

.selected-summary {
  padding-top: 12px;
}

@media (max-width: 1320px) {
  .stats-container {
    grid-template-columns: repeat(2, 1fr);
  }

  .filter-row {
    grid-template-columns: repeat(2, minmax(220px, 1fr));
  }
}

@media (max-width: 768px) {
  .stats-container,
  .filter-row {
    grid-template-columns: 1fr;
  }

  .search-row {
    flex-wrap: wrap;
  }
}
</style>
