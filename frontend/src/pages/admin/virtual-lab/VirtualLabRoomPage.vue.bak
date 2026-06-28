<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'

const router = useRouter()

// 筛选条件
const selectedDepartment = ref('全部')
const selectedMajor = ref('全部')
const selectedActivity = ref('全部')
const searchQuery = ref('')
const viewMode = ref('card')

// 统计数据
const stats = {
  totalRooms: 18,
  departments: 8,
  inProgressActivities: 26,
  recordsCount: 64,
}

// 教研室卡片数据
interface RoomCard {
  id: string
  name: string
  direction: string
  affiliation: string
  leader: string
  members: number
  inProgressActivities: number
  recordsCount: number
  recentActivity: string
  recentTime: string
}

const rooms: RoomCard[] = [
  {
    id: 'smart-manufacturing',
    name: '智能制造课程改革虚拟教研室',
    direction: '智能制造专业课程改革',
    affiliation: '智能制造学院 | 智能制造专业群',
    leader: '周明',
    members: 28,
    inProgressActivities: 2,
    recordsCount: 6,
    recentActivity: '智能产线课程项目化改造研讨',
    recentTime: '06-18',
  },
  {
    id: 'robot-teaching',
    name: '工业机器人教学资源共建教研室',
    direction: '机器人技术课程资源共建',
    affiliation: '智能制造学院 | 工业机器人技术专业',
    leader: '李倩',
    members: 16,
    inProgressActivities: 1,
    recordsCount: 4,
    recentActivity: '工业机器人实训资源复盘',
    recentTime: '06-12',
  },
  {
    id: 'digital-teaching',
    name: '数字化教学方法研究教研室',
    direction: 'AI辅助教学与课堂评价',
    affiliation: '教务处 | 跨院系',
    leader: '王磊',
    members: 35,
    inProgressActivities: 0,
    recordsCount: 9,
    recentActivity: '课堂数据应用专题研讨',
    recentTime: '06-05',
  },
  {
    id: 'new-energy-vehicles',
    name: '新能源汽车课程群教研室',
    direction: '新能源汽车课程群建设',
    affiliation: '交通工程学院 | 新能源汽车专业群',
    leader: '陈芳',
    members: 21,
    inProgressActivities: 1,
    recordsCount: 5,
    recentActivity: '课程标准修订交流',
    recentTime: '05-22',
  },
  {
    id: 'modern-service',
    name: '现代服务业课程设计教研室',
    direction: '服务类课程设计与评价',
    affiliation: '现代服务学院 | 电子商务专业群',
    leader: '赵婷',
    members: 18,
    inProgressActivities: 1,
    recordsCount: 3,
    recentActivity: '课程任务书优化讨论',
    recentTime: '05-17',
  },
  {
    id: 'preschool-edu',
    name: '学前教育实践教学教研室',
    direction: '实践教学与保教融合',
    affiliation: '教育学院 | 学前教育专业群',
    leader: '刘欣',
    members: 24,
    inProgressActivities: 2,
    recordsCount: 7,
    recentActivity: '保教融合案例共研',
    recentTime: '06-09',
  },
]

function createRoom() {
  console.log('新建教研室')
}

function resetFilters() {
  selectedDepartment.value = '全部'
  selectedMajor.value = '全部'
  selectedActivity.value = '全部'
  searchQuery.value = ''
}

function viewDetail(roomId: string) {
  router.push(`/admin/virtual-lab/rooms/${roomId}`)
}
</script>

<template>
  <AdminLayout active-key="virtual-lab">
    <div class="virtual-lab-room-page">
      <!-- 页面头部 -->
      <section class="page-header">
        <div class="header-content">
          <div class="breadcrumb">
            <span>虚拟教研室</span>
          </div>
          <h1 class="page-title">虚拟教研室</h1>
          <p class="page-description">
            按教研室查看线上教研开展情况，进入详情查看活动、会议材料和已形成记录。
          </p>
        </div>
        <div class="header-action">
          <button class="btn-primary" @click="createRoom">新建教研室</button>
        </div>
      </section>

      <!-- 统计卡区域 -->
      <section class="stats-section">
        <div class="stats-container">
          <div class="stat-card">
            <div class="stat-value">{{ stats.totalRooms }} 个</div>
            <div class="stat-label">教研室总数</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ stats.departments }} 个</div>
            <div class="stat-label">覆盖院系</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ stats.inProgressActivities }} 个</div>
            <div class="stat-label">进行中活动</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ stats.recordsCount }} 条</div>
            <div class="stat-label">已形成记录</div>
          </div>
        </div>
      </section>

      <!-- 主体内容区域 -->
      <section class="main-section">
        <div class="content-card">
          <!-- 筛选区 -->
          <div class="filter-section">
            <div class="filter-row">
              <div class="filter-item">
                <label class="filter-label">院系</label>
                <select v-model="selectedDepartment" class="filter-select">
                  <option>全部</option>
                  <option>智能制造学院</option>
                  <option>交通工程学院</option>
                  <option>现代服务学院</option>
                  <option>教育学院</option>
                </select>
              </div>
              <div class="filter-item">
                <label class="filter-label">专业群</label>
                <select v-model="selectedMajor" class="filter-select">
                  <option>全部</option>
                  <option>智能制造专业群</option>
                  <option>工业机器人技术专业</option>
                  <option>新能源汽车专业群</option>
                  <option>电子商务专业群</option>
                </select>
              </div>
              <div class="filter-item">
                <label class="filter-label">活动情况</label>
                <select v-model="selectedActivity" class="filter-select">
                  <option>全部</option>
                  <option>进行中活动</option>
                  <option>已形成记录</option>
                </select>
              </div>
              <button class="btn-reset" @click="resetFilters">重置</button>
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
            <div class="search-row">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="搜索教研室名称、负责人、教研方向"
                class="search-input"
              />
            </div>
          </div>

          <!-- 教研室卡片 -->
          <div class="rooms-section">
            <h2 class="section-title">教研室列表</h2>
            <div class="rooms-grid">
              <div
                v-for="room in rooms"
                :key="room.id"
                class="room-card"
              >
                <div class="card-header">
                  <h3 class="room-name">{{ room.name }}</h3>
                </div>
                <div class="card-body">
                  <div class="room-info">
                    <div class="info-item">
                      <span class="info-label">方向：</span>
                      <span class="info-value">{{ room.direction }}</span>
                    </div>
                    <div class="info-item">
                      <span class="info-label">归属：</span>
                      <span class="info-value">{{ room.affiliation }}</span>
                    </div>
                    <div class="info-item">
                      <span class="info-label">负责人：</span>
                      <span class="info-value">{{ room.leader }}</span>
                    </div>
                    <div class="info-item">
                      <span class="info-label">成员：</span>
                      <span class="info-value">{{ room.members }}人</span>
                    </div>
                    <div class="info-item">
                      <span class="info-label">进行中活动：</span>
                      <span class="info-value">{{ room.inProgressActivities }}</span>
                    </div>
                    <div class="info-item">
                      <span class="info-label">已形成记录：</span>
                      <span class="info-value">{{ room.recordsCount }}</span>
                    </div>
                    <div class="info-item">
                      <span class="info-label">最近活动：</span>
                      <span class="info-value">{{ room.recentActivity }}</span>
                    </div>
                    <div class="info-item">
                      <span class="info-label">最近时间：</span>
                      <span class="info-value">{{ room.recentTime }}</span>
                    </div>
                  </div>
                </div>
                <div class="card-footer">
                  <button class="btn-detail" @click="viewDetail(room.id)">
                    查看详情
                  </button>
                </div>
              </div>
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
  background: var(--color-page-bg);
}

.page-header {
  padding: 32px 0;
  background: white;
  border-bottom: 1px solid var(--color-card-border);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.header-content {
  max-width: var(--admin-content-max-width);
  margin: 0 auto;
  padding: 0 24px;
  flex: 1;
}

.header-action {
  padding: 0 24px;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--color-text-secondary);
  margin-bottom: 16px;
}

.page-title {
  margin: 0 0 8px 0;
  font-size: 24px;
  font-weight: 700;
  color: var(--color-text-primary);
}

.page-description {
  margin: 0;
  font-size: 14px;
  color: var(--color-text-secondary);
  line-height: 1.5;
}

.btn-primary {
  padding: 10px 20px;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.16s ease;
}

.btn-primary:hover {
  background: #28a38a;
}

.stats-section {
  background: white;
  border-bottom: 1px solid var(--color-card-border);
}

.stats-container {
  max-width: var(--admin-content-max-width);
  margin: 0 auto;
  padding: 24px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.stat-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid var(--color-card-border);
}

.stat-value {
  font-size: 32px;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: 8px;
}

.stat-label {
  font-size: 14px;
  color: var(--color-text-secondary);
  font-weight: 600;
}

.main-section {
  max-width: var(--admin-content-max-width);
  margin: 0 auto;
  padding: 24px;
}

.content-card {
  background: white;
  border-radius: 12px;
  border: 1px solid var(--color-card-border);
  overflow: hidden;
}

.filter-section {
  padding: 20px 24px;
  border-bottom: 1px solid var(--color-card-border);
}

.filter-row {
  display: flex;
  gap: 16px;
  align-items: flex-end;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.filter-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.filter-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--color-text-secondary);
}

.filter-select {
  padding: 8px 12px;
  border: 1px solid var(--color-card-border);
  border-radius: 6px;
  font-size: 13px;
  background: white;
  cursor: pointer;
  outline: none;
  min-width: 140px;
}

.search-row {
  display: flex;
}

.search-input {
  flex: 1;
  padding: 10px 16px;
  border: 1px solid var(--color-card-border);
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.16s ease;
}

.search-input:focus {
  border-color: var(--color-primary);
}

.btn-reset {
  padding: 8px 16px;
  background: transparent;
  border: 1px solid var(--color-card-border);
  border-radius: 6px;
  color: var(--color-text-secondary);
  font-size: 13px;
  cursor: pointer;
  transition: all 0.16s ease;
}

.btn-reset:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.view-mode-switch {
  display: flex;
  gap: 8px;
  margin-left: auto;
}

.view-btn {
  padding: 8px 16px;
  background: transparent;
  border: 1px solid var(--color-card-border);
  border-radius: 6px;
  color: var(--color-text-secondary);
  font-size: 13px;
  cursor: pointer;
  transition: all 0.16s ease;
}

.view-btn.active {
  background: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}

.rooms-section {
  padding: 24px;
}

.section-title {
  margin: 0 0 20px 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.rooms-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.room-card {
  border: 1px solid var(--color-card-border);
  border-radius: 12px;
  overflow: hidden;
  transition: box-shadow 0.16s ease;
}

.room-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.card-header {
  padding: 16px;
  background: #f8fafc;
  border-bottom: 1px solid var(--color-card-border);
}

.room-name {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.card-body {
  padding: 16px;
}

.room-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.info-item {
  display: flex;
  font-size: 13px;
}

.info-label {
  color: var(--color-text-secondary);
  font-weight: 500;
  min-width: 100px;
}

.info-value {
  color: var(--color-text-primary);
  flex: 1;
}

.card-footer {
  padding: 12px 16px;
  border-top: 1px solid var(--color-card-border);
  text-align: right;
}

.btn-detail {
  padding: 8px 16px;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  transition: background 0.16s ease;
}

.btn-detail:hover {
  background: #28a38a;
}

@media (max-width: 1024px) {
  .stats-container {
    grid-template-columns: repeat(2, 1fr);
  }

  .rooms-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    gap: 16px;
  }

  .stats-container {
    grid-template-columns: 1fr;
  }

  .filter-row {
    flex-direction: column;
    align-items: stretch;
  }

  .view-mode-switch {
    margin-left: 0;
  }
}
</style>
