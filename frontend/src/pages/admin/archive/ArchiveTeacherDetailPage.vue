<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'

interface SourceRecord {
  id: string
  title: string
  source: string
  status: '已确认入档' | '待说明'
  archiveTime: string
  content: string
  buttonText: string
}

const route = useRoute()
const router = useRouter()

const teacherId = computed(() => route.params.teacherId || 'lin')

// 来源记录抽屉状态
const drawerOpen = ref(false)
const drawerTitle = ref('')
const drawerType = ref('')

// 来源记录数据
const sourceRecords = computed<SourceRecord[]>(() => {
  if (drawerType.value === '基本信息') {
    return [
      {
        id: '1',
        title: '教师基本信息',
        source: '人事系统',
        status: '已确认入档',
        archiveTime: '2026-06-12',
        content: '林老师基本信息已确认，包含学历、入职时间、研究方向等信息。',
        buttonText: '查看记录详情',
      },
    ]
  } else if (drawerType.value === '教学工作') {
    return [
      {
        id: '1',
        title: '2026春季学期授课记录',
        source: '教务系统',
        status: '已确认入档',
        archiveTime: '2026-06-12',
        content: '本发展周期内承担《机电系统控制技术》《电气控制与PLC应用》《工业机器人技术》3门课程教学任务。',
        buttonText: '查看记录详情',
      },
      {
        id: '2',
        title: '《机电系统控制技术》学生教学评价结果',
        source: '教学评价系统',
        status: '已确认入档',
        archiveTime: '2026-06-16',
        content: '学生教学评价整体稳定，课程反馈较好。',
        buttonText: '查看记录详情',
      },
      {
        id: '3',
        title: '课程建设成果《机电系统控制技术》阶段材料',
        source: '院系上传',
        status: '已确认入档',
        archiveTime: '2026-06-18',
        content: '课程建设已有1项确认入档。',
        buttonText: '查看记录详情',
      },
      {
        id: '4',
        title: '课堂教学照片（第5周）',
        source: '教学活动沉淀',
        status: '已确认入档',
        archiveTime: '2026-06-08',
        content: '教学过程记录完整。',
        buttonText: '查看记录详情',
      },
      {
        id: '5',
        title: '《机电系统控制技术》课程建设支撑材料',
        source: '教师补充材料',
        status: '待说明',
        archiveTime: '待确认',
        content: '该材料仍在补充中，当前不写入正文，仅作待说明提示。',
        buttonText: '查看处理情况',
      },
    ]
  } else if (drawerType.value === '教研科研') {
    return [
      {
        id: '1',
        title: '学术论文发表记录',
        source: '科研系统',
        status: '已确认入档',
        archiveTime: '2026-06-15',
        content: '发表学术论文1篇，相关成果已提交并确认入档。',
        buttonText: '查看记录详情',
      },
    ]
  } else {
    return [
      {
        id: '1',
        title: '示例记录',
        source: '系统导入',
        status: '已确认入档',
        archiveTime: '2026-06-18',
        content: '示例记录内容。',
        buttonText: '查看记录详情',
      },
    ]
  }
})

// 标签页状态
const activeTab = ref('all')

const tabs = computed(() => {
  const confirmed = sourceRecords.value.filter(r => r.status === '已确认入档').length
  const pending = sourceRecords.value.filter(r => r.status === '待说明').length
  return [
    { label: '全部', value: 'all', count: sourceRecords.value.length },
    { label: '已确认入档', value: 'confirmed', count: confirmed },
    { label: '待说明', value: 'pending', count: pending },
  ]
})

function goBack() {
  router.push('/admin/archive/query')
}

function printArchive() {
  console.log('打印档案')
}

function exportPdf() {
  console.log('导出PDF')
}

function openDrawer(type: string) {
  drawerType.value = type
  if (type === '基本信息') {
    drawerTitle.value = '基本信息 | 来源记录'
  } else if (type === '教学工作') {
    drawerTitle.value = '教学工作 | 来源记录'
  } else if (type === '教研科研') {
    drawerTitle.value = '教研科研 | 来源记录'
  } else {
    drawerTitle.value = `${type} | 来源记录`
  }
  drawerOpen.value = true
}

function closeDrawer() {
  drawerOpen.value = false
}

function switchTab(tabValue: string) {
  activeTab.value = tabValue
}

function viewRecordDetail(record: SourceRecord) {
  console.log('查看记录详情', record)
}

function filteredRecords() {
  if (activeTab.value === 'all') {
    return sourceRecords.value
  } else if (activeTab.value === 'confirmed') {
    return sourceRecords.value.filter(r => r.status === '已确认入档')
  } else if (activeTab.value === 'pending') {
    return sourceRecords.value.filter(r => r.status === '待说明')
  }
  return sourceRecords.value
}

const tabClass = (tabValue: string) => {
  return activeTab.value === tabValue ? 'active' : ''
}

const statusBadgeClass = (status: SourceRecord['status']) => {
  return status === '已确认入档' ? 'badge-success' : 'badge-warning'
}
</script>

<template>
  <AdminLayout active-key="archive-query">
    <div class="archive-teacher-detail-page">
      <!-- 顶部栏 -->
      <section class="top-bar">
        <div class="top-bar-content">
          <button class="btn-back" @click="goBack">
            <span>←</span>
            <span>返回档案查询</span>
          </button>

          <div class="top-bar-center">
            <h1 class="page-title">林老师成长档案</h1>
            <p class="page-subtitle">2026年度发展周期</p>
          </div>

          <div class="top-bar-actions">
            <button class="btn-action" @click="printArchive">打印</button>
            <button class="btn-action" @click="exportPdf">导出 PDF</button>
            <button class="btn-action" @click="goBack">关闭</button>
          </div>
        </div>
      </section>

      <!-- 档案首页头部 -->
      <section class="archive-header">
        <div class="header-content">
          <div class="header-left">
            <div class="teacher-profile">
              <div class="avatar-large">林</div>
              <div class="profile-info">
                <h2 class="profile-title">林老师成长档案</h2>
                <p class="profile-meta">智能制造学院 | 讲师 | 聘期第2年</p>
                <p class="profile-time">档案形成时间：2026-06-18</p>
                <p class="profile-status">
                  档案状态：可查询 | 含1条更正说明
                </p>
              </div>
            </div>
          </div>

          <div class="header-right">
            <div class="header-background">
              <div class="background-placeholder"></div>
            </div>
          </div>
        </div>

        <div class="header-tip">
          <span class="tip-icon">ℹ️</span>
          <span class="tip-text">本档案仅展示已确认入档的内容。正在确认、正在更正或来源异常的内容，不直接写入正文。</span>
        </div>
      </section>

      <!-- 主体内容区 -->
      <section class="main-content">
        <!-- 左侧内容区 -->
        <div class="content-area">
          <!-- 基本信息区 -->
          <div class="content-section">
            <h2 class="section-title">基本信息</h2>
            <div class="section-body">
              <div class="info-main">
                <p class="info-text">
                  林老师，女，1988年9月出生，中共党员，现任智能制造学院讲师。研究方向为机电系统建模与控制、智能装备故障诊断与预测维护。
                </p>
                <p class="info-text">
                  2024年7月入职学校，主要承担《机电系统控制技术》《电气控制与PLC应用》等课程的教学任务，同时积极参与学科与专业建设工作。
                </p>
                <p class="info-text">
                  当前处于聘期第2年，所提交材料经学院审核，已确认入档。
                </p>
              </div>
              <div class="info-sidebar">
                <div class="info-card">
                  <h3 class="info-card-title">基本信息</h3>
                  <div class="info-list">
                    <div class="info-item">
                      <span class="info-label">姓名：</span>
                      <span class="info-value">林老师</span>
                    </div>
                    <div class="info-item">
                      <span class="info-label">所属学院：</span>
                      <span class="info-value">智能制造学院</span>
                    </div>
                    <div class="info-item">
                      <span class="info-label">职称：</span>
                      <span class="info-value">讲师</span>
                    </div>
                    <div class="info-item">
                      <span class="info-label">学历：</span>
                      <span class="info-value">硕士研究生</span>
                    </div>
                    <div class="info-item">
                      <span class="info-label">研究方向：</span>
                      <span class="info-value">机电系统建模与控制、智能装备故障诊断与预测维护</span>
                    </div>
                    <div class="info-item">
                      <span class="info-label">入职时间：</span>
                      <span class="info-value">2024-07-01</span>
                    </div>
                  </div>
                  <button class="btn-source" @click="openDrawer('基本信息')">
                    查看来源记录
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- 教学工作区 -->
          <div class="content-section">
            <h2 class="section-title">教学工作</h2>
            <div class="section-body">
              <div class="info-main">
                <p class="info-text">
                  本发展周期内，林老师承担3门课程的教学任务，合计教学工作量饱满。课程信息与教学任务已与教务系统同步，学生教学评价总体稳定，教学过程记录完整。
                </p>
                <p class="info-text">
                  在课程建设方面，1门课程完成阶段性建设并通过学院认定，相关材料已入档。
                </p>

                <div class="notice-box">
                  <h4 class="notice-title">待说明事项</h4>
                  <p class="notice-text">
                    课程《机电系统控制技术》课程建设支撑材料仍在补充中，预计下月完成确认。
                  </p>
                </div>

                <div class="content-cards">
                  <div class="content-card">
                    <h4 class="card-title">本学期课程一览</h4>
                    <ul class="card-list">
                      <li>《机电系统控制技术》（48学时）</li>
                      <li>《电气控制与PLC应用》（64学时）</li>
                      <li>《工业机器人技术》（32学时）</li>
                    </ul>
                  </div>

                  <div class="content-card">
                    <h4 class="card-title">学生教学评价</h4>
                    <div class="evaluation-score">4.61 / 5.00</div>
                    <p class="evaluation-info">评价人数：236人</p>
                    <p class="evaluation-info">评价来源：教务系统（2026春季学期）</p>
                  </div>

                  <div class="content-card">
                    <h4 class="card-title">课堂教学实录</h4>
                    <div class="classroom-photo-placeholder">
                      <div class="placeholder-icon">📷</div>
                      <p class="placeholder-text">课堂图片占位</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="info-sidebar">
                <button class="btn-source" @click="openDrawer('教学工作')">
                  查看来源记录
                </button>
              </div>
            </div>
          </div>

          <!-- 教研科研区 -->
          <div class="content-section">
            <h2 class="section-title">教研科研</h2>
            <div class="section-body">
              <div class="info-main">
                <p class="info-text">
                  本周期内，林老师围绕机电系统建模与智能诊断方向开展研究，参与1项校级科研项目，完成阶段性研究任务。发表学术论文1篇，相关成果已提交并确认入档。
                </p>

                <div class="content-cards">
                  <div class="content-card">
                    <h4 class="card-title">研究成果材料（论文）</h4>
                    <p class="card-content">基于时序特征的机床主轴动态故障诊断方法研究</p>
                  </div>
                </div>
              </div>

              <div class="info-sidebar">
                <button class="btn-source" @click="openDrawer('教研科研')">
                  查看来源记录
                </button>
              </div>
            </div>
          </div>

          <!-- 企业实践区 -->
          <div class="content-section">
            <h2 class="section-title">企业实践</h2>
            <div class="section-body">
              <div class="info-main">
                <p class="info-text">
                  林老师在数智装备企业实践基地完成20天实践锻炼，参与企业技术项目合作，将实践经历融入课程教学，提升学生实践能力培养。
                </p>
              </div>
              <div class="info-sidebar">
                <button class="btn-source" @click="openDrawer('企业实践')">
                  查看来源记录
                </button>
              </div>
            </div>
          </div>

          <!-- 社会服务区 -->
          <div class="content-section">
            <h2 class="section-title">社会服务</h2>
            <div class="section-body">
              <div class="info-main">
                <p class="info-text">
                  参与社区技术培训服务，开展机电装备维护技术讲座，服务企业技术工人技能提升。
                </p>
              </div>
              <div class="info-sidebar">
                <button class="btn-source" @click="openDrawer('社会服务')">
                  查看来源记录
                </button>
              </div>
            </div>
          </div>

          <!-- 成果荣誉区 -->
          <div class="content-section">
            <h2 class="section-title">成果荣誉</h2>
            <div class="section-body">
              <div class="info-main">
                <p class="info-text">
                  获得数智课程建设成果认证，入选学院优秀青年教师培养计划。
                </p>
              </div>
              <div class="info-sidebar">
                <button class="btn-source" @click="openDrawer('成果荣誉')">
                  查看来源记录
                </button>
              </div>
            </div>
          </div>

          <!-- 个人发展区 -->
          <div class="content-section">
            <h2 class="section-title">个人发展</h2>
            <div class="section-body">
              <div class="info-main">
                <p class="info-text">
                  积极参与教学能力提升培训，完成专业发展课程学习，不断提升教学科研水平。
                </p>
              </div>
              <div class="info-sidebar">
                <button class="btn-source" @click="openDrawer('个人发展')">
                  查看来源记录
                </button>
              </div>
            </div>
          </div>

          <!-- 考核评价区 -->
          <div class="content-section">
            <h2 class="section-title">考核评价</h2>
            <div class="section-body">
              <div class="info-main">
                <p class="info-text">
                  年度考核评价为良好，教学工作量饱满，科研进展顺利，服务贡献突出。
                </p>
              </div>
              <div class="info-sidebar">
                <button class="btn-source" @click="openDrawer('考核评价')">
                  查看来源记录
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧阅读导航 -->
        <aside class="reading-nav">
          <h3 class="nav-title">阅读导航</h3>
          <ul class="nav-list">
            <li class="nav-item">
              <a href="#archive-header" class="nav-link">档案首页</a>
            </li>
            <li class="nav-item">
              <a href="#basic-info" class="nav-link">基本信息</a>
            </li>
            <li class="nav-item">
              <a href="#teaching" class="nav-link">教学工作</a>
            </li>
            <li class="nav-item">
              <a href="#research" class="nav-link">教研科研</a>
            </li>
            <li class="nav-item">
              <a href="#practice" class="nav-link">企业实践</a>
            </li>
            <li class="nav-item">
              <a href="#service" class="nav-link">社会服务</a>
            </li>
            <li class="nav-item">
              <a href="#honors" class="nav-link">成果荣誉</a>
            </li>
            <li class="nav-item">
              <a href="#development" class="nav-link">个人发展</a>
            </li>
            <li class="nav-item">
              <a href="#evaluation" class="nav-link">考核评价</a>
            </li>
            <li class="nav-item">
              <a href="#sources" class="nav-link">资料来源与更正记录</a>
            </li>
          </ul>
        </aside>
      </section>
    </div>

    <!-- 来源记录抽屉 -->
    <transition name="drawer">
      <div v-if="drawerOpen" class="drawer-overlay" @click="closeDrawer">
        <div class="drawer" @click.stop>
          <div class="drawer-header">
            <h2 class="drawer-title">{{ drawerTitle }}</h2>
            <p class="drawer-description">
              用于查看{{ drawerType }}正文对应的已确认入档记录。正在补充、正在更正或来源异常的内容，不直接写入正文。
            </p>
            <button class="btn-close" @click="closeDrawer">关闭</button>
          </div>

          <div class="drawer-tabs">
            <button
              v-for="tab in tabs"
              :key="tab.value"
              class="tab-btn"
              :class="tabClass(tab.value)"
              @click="switchTab(tab.value)"
            >
              {{ tab.label }} {{ tab.count }}
            </button>
          </div>

          <div class="drawer-content">
            <div
              v-for="record in filteredRecords()"
              :key="record.id"
              class="record-item"
            >
              <div class="record-header">
                <h4 class="record-title">{{ record.title }}</h4>
                <span class="record-status" :class="statusBadgeClass(record.status)">
                  {{ record.status }}
                </span>
              </div>
              <div class="record-meta">
                <span class="meta-item">来源：{{ record.source }}</span>
                <span class="meta-item">入档时间：{{ record.archiveTime }}</span>
              </div>
              <p class="record-content">{{ record.content }}</p>
              <button class="btn-detail" @click="viewRecordDetail(record)">
                {{ record.buttonText }}
              </button>
            </div>
          </div>

          <div class="drawer-footer">
            <p class="footer-tip">仅已确认入档的记录会写入档案正文。</p>
          </div>
        </div>
      </div>
    </transition>
  </AdminLayout>
</template>

<style scoped>
.archive-teacher-detail-page {
  min-height: 100vh;
  background: #f5f7fa;
}

/* 顶部栏 */
.top-bar {
  background: white;
  border-bottom: 1px solid var(--color-card-border);
  position: sticky;
  top: 0;
  z-index: 100;
}

.top-bar-content {
  max-width: var(--admin-content-max-width);
  margin: 0 auto;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn-back {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: transparent;
  border: 1px solid var(--color-card-border);
  border-radius: 6px;
  color: var(--color-text-primary);
  cursor: pointer;
  transition: all 0.16s ease;
}

.btn-back:hover {
  background: #f8fafc;
  border-color: var(--color-primary);
}

.top-bar-center {
  flex: 1;
  text-align: center;
}

.page-title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.page-subtitle {
  margin: 4px 0 0 0;
  font-size: 13px;
  color: var(--color-text-secondary);
}

.top-bar-actions {
  display: flex;
  gap: 8px;
}

.btn-action {
  padding: 8px 16px;
  background: transparent;
  border: 1px solid var(--color-card-border);
  border-radius: 6px;
  color: var(--color-text-primary);
  cursor: pointer;
  transition: all 0.16s ease;
}

.btn-action:hover {
  background: #f8fafc;
  border-color: var(--color-primary);
}

/* 档案首页头部 */
.archive-header {
  background: white;
  border-bottom: 1px solid var(--color-card-border);
  padding: 32px 24px;
}

.header-content {
  max-width: var(--admin-content-max-width);
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 32px;
}

.header-left {
  flex: 1;
}

.teacher-profile {
  display: flex;
  gap: 16px;
  align-items: center;
}

.avatar-large {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-weight: 600;
}

.profile-info {
  flex: 1;
}

.profile-title {
  margin: 0 0 8px 0;
  font-size: 24px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.profile-meta {
  margin: 0 0 4px 0;
  font-size: 14px;
  color: var(--color-text-secondary);
}

.profile-time {
  margin: 0 0 4px 0;
  font-size: 13px;
  color: var(--color-text-hint);
}

.profile-status {
  margin: 0;
  font-size: 13px;
  color: var(--color-primary);
  font-weight: 500;
}

.header-right {
  width: 200px;
  height: 120px;
}

.header-background {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
}

.background-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.header-tip {
  max-width: var(--admin-content-max-width);
  margin: 16px auto 0;
  padding: 12px 24px;
  background: #f0f9ff;
  border-left: 3px solid var(--color-primary);
  display: flex;
  align-items: center;
  gap: 12px;
}

.tip-icon {
  font-size: 16px;
}

.tip-text {
  font-size: 13px;
  color: var(--color-text-secondary);
}

/* 主体内容区 */
.main-content {
  max-width: var(--admin-content-max-width);
  margin: 0 auto;
  padding: 24px;
  display: grid;
  grid-template-columns: 1fr 240px;
  gap: 24px;
}

.content-area {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.content-section {
  background: white;
  border-radius: 8px;
  border: 1px solid var(--color-card-border);
  padding: 24px;
}

.section-title {
  margin: 0 0 16px 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.section-body {
  display: flex;
  gap: 24px;
}

.info-main {
  flex: 1;
}

.info-text {
  margin: 0 0 12px 0;
  font-size: 14px;
  line-height: 1.6;
  color: var(--color-text-secondary);
}

.info-sidebar {
  width: 200px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.info-card {
  background: #f8fafc;
  border-radius: 8px;
  padding: 16px;
}

.info-card-title {
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.info-item {
  display: flex;
  font-size: 12px;
  line-height: 1.4;
}

.info-label {
  color: var(--color-text-secondary);
  min-width: 60px;
}

.info-value {
  color: var(--color-text-primary);
  flex: 1;
}

.btn-source {
  padding: 8px 12px;
  background: white;
  border: 1px solid var(--color-primary);
  border-radius: 6px;
  color: var(--color-primary);
  font-size: 12px;
  cursor: pointer;
  transition: all 0.16s ease;
}

.btn-source:hover {
  background: var(--color-primary);
  color: white;
}

.notice-box {
  background: #fffbeb;
  border-left: 3px solid #f59e0b;
  border-radius: 6px;
  padding: 12px 16px;
  margin-bottom: 16px;
}

.notice-title {
  margin: 0 0 8px 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.notice-text {
  margin: 0;
  font-size: 13px;
  line-height: 1.5;
  color: var(--color-text-secondary);
}

.content-cards {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.content-card {
  background: #f8fafc;
  border-radius: 8px;
  padding: 16px;
}

.card-title {
  margin: 0 0 8px 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.card-list {
  margin: 0;
  padding-left: 20px;
  font-size: 13px;
  line-height: 1.6;
  color: var(--color-text-secondary);
}

.card-list li {
  margin-bottom: 4px;
}

.card-content {
  font-size: 13px;
  line-height: 1.5;
  color: var(--color-text-secondary);
}

.evaluation-score {
  font-size: 24px;
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: 4px;
}

.evaluation-info {
  margin: 0;
  font-size: 12px;
  color: var(--color-text-hint);
}

.classroom-photo-placeholder {
  background: #f1f5f9;
  border-radius: 6px;
  padding: 32px;
  text-align: center;
}

.placeholder-icon {
  font-size: 32px;
  margin-bottom: 8px;
}

.placeholder-text {
  margin: 0;
  font-size: 12px;
  color: var(--color-text-hint);
}

/* 右侧阅读导航 */
.reading-nav {
  background: white;
  border-radius: 8px;
  border: 1px solid var(--color-card-border);
  padding: 16px;
  height: fit-content;
  position: sticky;
  top: 80px;
}

.nav-title {
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  margin-bottom: 4px;
}

.nav-link {
  display: block;
  padding: 8px 12px;
  font-size: 13px;
  color: var(--color-text-secondary);
  text-decoration: none;
  border-radius: 6px;
  transition: all 0.16s ease;
}

.nav-link:hover {
  background: #f8fafc;
  color: var(--color-primary);
}

/* 来源记录抽屉 */
.drawer-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.drawer {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 540px;
  background: white;
  box-shadow: -4px 0 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.drawer-header {
  padding: 20px;
  border-bottom: 1px solid var(--color-card-border);
  position: relative;
}

.drawer-title {
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.drawer-description {
  margin: 0 0 12px 0;
  font-size: 13px;
  line-height: 1.5;
  color: var(--color-text-secondary);
}

.btn-close {
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 6px 12px;
  background: transparent;
  border: 1px solid var(--color-card-border);
  border-radius: 6px;
  color: var(--color-text-primary);
  cursor: pointer;
  font-size: 13px;
}

.btn-close:hover {
  background: #f8fafc;
}

.drawer-tabs {
  display: flex;
  gap: 8px;
  padding: 16px 20px 0;
  border-bottom: 1px solid var(--color-card-border);
}

.tab-btn {
  padding: 8px 16px;
  background: transparent;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all 0.16s ease;
}

.tab-btn:hover {
  background: #f8fafc;
}

.tab-btn.active {
  background: var(--color-primary);
  color: white;
}

.drawer-content {
  flex: 1;
  overflow-y: auto;
  padding: 16px 20px;
}

.record-item {
  background: #f8fafc;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
}

.record-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.record-title {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.record-status {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
}

.badge-success {
  background: #f0fdf4;
  color: #22c55e;
}

.badge-warning {
  background: #fffbeb;
  color: #f59e0b;
}

.record-meta {
  display: flex;
  gap: 16px;
  margin-bottom: 8px;
}

.meta-item {
  font-size: 12px;
  color: var(--color-text-hint);
}

.record-content {
  margin: 0 0 12px 0;
  font-size: 13px;
  line-height: 1.5;
  color: var(--color-text-secondary);
}

.btn-detail {
  padding: 8px 12px;
  background: white;
  border: 1px solid var(--color-card-border);
  border-radius: 6px;
  font-size: 12px;
  color: var(--color-text-primary);
  cursor: pointer;
  transition: all 0.16s ease;
}

.btn-detail:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.drawer-footer {
  padding: 16px 20px;
  border-top: 1px solid var(--color-card-border);
}

.footer-tip {
  margin: 0;
  font-size: 12px;
  color: var(--color-text-hint);
  text-align: center;
}

/* 抽屉动画 */
.drawer-enter-active,
.drawer-leave-active {
  transition: all 0.3s ease;
}

.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
}

.drawer-enter-from .drawer,
.drawer-leave-to .drawer {
  transform: translateX(100%);
}

@media (max-width: 768px) {
  .main-content {
    grid-template-columns: 1fr;
  }

  .reading-nav {
    display: none;
  }

  .section-body {
    flex-direction: column;
  }

  .info-sidebar {
    width: 100%;
  }

  .drawer {
    width: 100%;
  }
}
</style>