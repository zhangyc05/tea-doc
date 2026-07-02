<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'
import {
  getArchiveDefaultSourceRecords,
  getArchiveTeacherName,
} from '@/services/mock/archive'
import type { ArchiveSourceRecord } from '@/domain/admin/archive'
import {
  getArchiveSourceRecordsForFact,
  getTeacherArchiveFacts,
} from '@/stores/admin/archiveStore'

const route = useRoute()
const router = useRouter()

const teacherId = computed(() => route.params.teacherId || 'lin')
const teacherName = computed(() => getArchiveTeacherName(String(teacherId.value)))
const teacherArchiveFacts = computed(() => getTeacherArchiveFacts(teacherName.value))

// 来源记录抽屉状态
const drawerOpen = ref(false)
const drawerTitle = ref('')
const drawerType = ref('')
const actionMessage = ref('')

// 来源记录数据
const sourceRecords = computed<ArchiveSourceRecord[]>(() => {
  const archivedRecords = getTeacherArchiveFacts(teacherName.value)
    .filter(fact => isFactInDrawerType(fact.dimension, drawerType.value))
    .flatMap(fact => {
      return getArchiveSourceRecordsForFact(fact.id).map(record => ({
        id: fact.id,
        title: fact.title,
        source: record.source,
        status: '已确认入档' as const,
        archiveTime: fact.archiveTime,
        content: `${fact.title} 已由档案处理工作台确认入档，来源文件：${record.originalFile}。`,
        buttonText: '查看记录详情',
      }))
    })

  return [...archivedRecords, ...getArchiveDefaultSourceRecords(drawerType.value)]
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
  window.print()
}

function exportPdf() {
  const blob = new Blob(['林老师成长档案\n2026年度发展周期\n此文件为页面导出示例。'], {
    type: 'text/plain;charset=utf-8',
  })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `teacher-archive-${teacherId.value}.txt`
  link.click()
  URL.revokeObjectURL(url)
  actionMessage.value = '已生成导出文件'
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

function viewRecordDetail(record: ArchiveSourceRecord) {
  actionMessage.value =
    record.status === '待说明' ? '该记录仍在补充中，可在档案处理工作台继续处理。' : `${record.title} 已在当前来源记录中展示。`
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

const statusBadgeClass = (status: ArchiveSourceRecord['status']) => {
  return status === '已确认入档' ? 'badge-success' : 'badge-warning'
}

function isFactInDrawerType(dimension: string, type: string) {
  if (dimension === type) return true
  if (type === '教学工作' && dimension === '教师培训') return true
  if (type === '个人发展' && dimension === '教师培训') return true
  return false
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
      <section id="archive-header" class="archive-header">
        <div class="header-content">
          <div class="header-left">
            <div class="teacher-profile">
              <div class="avatar-large">
                <span class="avatar-face"></span>
              </div>
              <div class="profile-info">
                <h2 class="profile-title">林老师成长档案</h2>
                <p class="profile-meta">智能制造学院 | 讲师 | 聘期第2年</p>
                <p class="profile-time">档案形成时间：2026-06-18</p>
                <div class="profile-badges">
                  <span class="profile-badge success">可查询</span>
                  <span class="profile-badge warning">含1条更正说明</span>
                </div>
              </div>
            </div>
          </div>

          <div class="header-right">
            <div class="header-background">
              <div class="campus-scene"></div>
            </div>
          </div>
        </div>

        <div class="header-tip">
          <span class="tip-icon">ℹ️</span>
          <span class="tip-text">本档案仅展示已确认入档的内容。正在确认、正在更正或来源异常的内容，不直接写入正文。</span>
        </div>
      </section>

      <p v-if="actionMessage" class="action-toast">{{ actionMessage }}</p>

      <!-- 主体内容区 -->
      <section class="main-content">
        <!-- 左侧内容区 -->
        <div class="content-area">
          <!-- 基本信息区 -->
          <div id="basic-info" class="content-section">
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
          <div id="teaching" class="content-section">
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
                    <div class="stars" aria-label="4.61分">★★★★★</div>
                    <p class="evaluation-info">评价人数：236人</p>
                    <p class="evaluation-info">评价来源：教务系统（2026春季学期）</p>
                  </div>

                  <div class="content-card">
                    <h4 class="card-title">课堂教学实录</h4>
                    <div class="classroom-photo-placeholder">
                      <div class="class-board"></div>
                      <div class="class-seats"></div>
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
          <div id="research" class="content-section">
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
          <div id="practice" class="content-section">
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
          <div id="service" class="content-section">
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
          <div id="honors" class="content-section">
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
          <div id="development" class="content-section">
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
          <div id="evaluation" class="content-section">
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

          <div id="sources" class="content-section sources-section">
            <h2 class="section-title">资料来源与更正记录</h2>
            <div class="section-body">
              <div class="info-main">
                <p class="info-text">
                  本档案正文由已确认入档记录生成。当前有1条课程建设支撑材料仍待说明，确认前不写入正文。
                </p>
                <div v-if="teacherArchiveFacts.length > 0" class="content-cards">
                  <div
                    v-for="fact in teacherArchiveFacts"
                    :key="fact.id"
                    class="content-card"
                  >
                    <h4 class="card-title">{{ fact.title }}</h4>
                    <p class="card-content">{{ fact.dimension }} · {{ fact.archiveTime }} 确认入档</p>
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
            <button class="btn-close" @click="closeDrawer">× 关闭</button>
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
              :class="{ pending: record.status === '待说明' }"
            >
              <div class="record-header">
                <span class="record-index">{{ record.id }}</span>
                <h4 class="record-title">{{ record.title }}</h4>
              </div>
              <div class="record-meta">
                <span class="meta-item">来源：{{ record.source }}</span>
                <span class="record-status" :class="statusBadgeClass(record.status)">
                  {{ record.status }}
                </span>
                <span class="meta-item">入档时间：{{ record.archiveTime }}</span>
              </div>
              <p class="record-content"><strong>对应正文：</strong>{{ record.content }}</p>
              <button class="btn-detail" @click="viewRecordDetail(record)">
                {{ record.buttonText }}
                <span>›</span>
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
  position: fixed;
  inset: 0;
  z-index: 500;
  overflow-y: auto;
  min-height: 100vh;
  background: rgba(12, 27, 54, 0.68);
  padding: 12px 0 32px;
}

.top-bar,
.archive-header,
.main-content {
  width: min(100% - 96px, 1320px);
  margin: 0 auto;
  background: #fff;
}

.top-bar {
  position: sticky;
  top: 0;
  z-index: 100;
  border: 1px solid #dbe5f4;
  border-bottom: 0;
  border-radius: 12px 12px 0 0;
}

.top-bar-content {
  min-height: 72px;
  padding: 0 26px;
  display: grid;
  grid-template-columns: 220px minmax(0, 1fr) 330px;
  align-items: center;
  gap: 16px;
}

.btn-back,
.btn-action,
.btn-source,
.btn-close,
.tab-btn,
.btn-detail {
  font: inherit;
  cursor: pointer;
}

.btn-back {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  width: fit-content;
  padding: 8px 0;
  background: transparent;
  border: 0;
  color: #12346c;
  font-size: 14px;
  font-weight: 600;
}

.btn-back span:first-child {
  font-size: 22px;
  line-height: 1;
}

.top-bar-center {
  text-align: center;
}

.page-title {
  margin: 0;
  color: #07183d;
  font-size: 20px;
  line-height: 1.2;
  font-weight: 800;
}

.page-subtitle {
  margin: 6px 0 0;
  color: #3e5c8e;
  font-size: 13px;
}

.top-bar-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.btn-action {
  height: 38px;
  min-width: 88px;
  padding: 0 16px;
  background: #fff;
  border: 1px solid #d2def0;
  border-radius: 7px;
  color: #12346c;
  font-size: 14px;
  font-weight: 600;
}

.btn-action:hover,
.btn-source:hover,
.btn-detail:hover {
  border-color: #0f5eef;
  color: #0f5eef;
  background: #f4f8ff;
}

.archive-header {
  padding: 20px 26px 18px;
  border-left: 1px solid #dbe5f4;
  border-right: 1px solid #dbe5f4;
}

.header-content {
  display: grid;
  grid-template-columns: minmax(460px, 1fr) minmax(340px, 520px);
  gap: 28px;
  align-items: stretch;
}

.teacher-profile {
  display: flex;
  align-items: center;
  gap: 28px;
  min-height: 190px;
}

.avatar-large {
  position: relative;
  flex: none;
  width: 138px;
  height: 138px;
  border-radius: 50%;
  background: radial-gradient(circle at 48% 42%, #ffe2d3 0 22%, transparent 23%),
    linear-gradient(150deg, #eef4ff, #c7d9ff);
  box-shadow: inset 0 0 0 1px #d9e5f7;
}

.avatar-face {
  position: absolute;
  left: 50%;
  top: 28px;
  width: 74px;
  height: 78px;
  transform: translateX(-50%);
  border-radius: 36px 36px 30px 30px;
  background:
    radial-gradient(circle at 30px 36px, #1f2a3d 0 2px, transparent 3px),
    radial-gradient(circle at 48px 36px, #1f2a3d 0 2px, transparent 3px),
    radial-gradient(circle at 39px 51px, #e87762 0 3px, transparent 4px),
    linear-gradient(#ffd9c8, #ffcdbb);
  box-shadow: 0 22px 0 -8px #f2b9aa;
}

.avatar-face::before {
  content: '';
  position: absolute;
  left: -9px;
  top: -18px;
  width: 92px;
  height: 58px;
  border-radius: 46px 46px 28px 28px;
  background:
    radial-gradient(circle at 34px 24px, transparent 0 23px, #24283a 24px),
    #24283a;
  clip-path: polygon(0 0, 100% 0, 98% 82%, 72% 70%, 53% 28%, 33% 70%, 4% 82%);
}

.avatar-face::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -44px;
  width: 74px;
  height: 44px;
  border-radius: 34px 34px 18px 18px;
  background: #5a8ff2;
}

.profile-title {
  margin: 0 0 12px;
  color: #07183d;
  font-size: 32px;
  line-height: 1.15;
  font-weight: 800;
}

.profile-meta {
  margin: 0 0 12px;
  color: #173c7b;
  font-size: 17px;
  font-weight: 700;
}

.profile-time {
  margin: 0 0 10px;
  color: #445f8d;
  font-size: 14px;
}

.profile-badges {
  display: flex;
  gap: 10px;
}

.profile-badge {
  display: inline-flex;
  align-items: center;
  height: 28px;
  padding: 0 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 700;
}

.profile-badge.success {
  background: #eaf9ee;
  color: #15923e;
}

.profile-badge.warning {
  background: #fff3e8;
  color: #ea6b1f;
}

.header-background {
  height: 190px;
  overflow: hidden;
  border-radius: 8px;
  background: linear-gradient(90deg, #f8fbff 0%, rgba(248, 251, 255, 0.2) 30%, transparent 58%),
    linear-gradient(180deg, #b8d9ff 0%, #eef7ff 52%, #dfeacb 53%, #8fc36f 100%);
}

.campus-scene {
  position: relative;
  width: 100%;
  height: 100%;
}

.campus-scene::before {
  content: '';
  position: absolute;
  right: 24px;
  top: 36px;
  width: 260px;
  height: 84px;
  border-radius: 4px;
  background:
    repeating-linear-gradient(90deg, transparent 0 30px, rgba(255, 255, 255, 0.9) 31px 48px),
    linear-gradient(#ffffff, #e6eef8);
  box-shadow: -150px 28px 0 -18px #f3f7fd;
}

.campus-scene::after {
  content: '';
  position: absolute;
  right: 0;
  bottom: 0;
  width: 80%;
  height: 58px;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.9), transparent 42%),
    repeating-linear-gradient(110deg, rgba(255, 255, 255, 0.65) 0 10px, transparent 11px 26px);
}

.header-tip {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
  width: min(660px, 62%);
  padding: 9px 14px;
  border: 1px solid #cfe0fa;
  border-radius: 6px;
  background: #f2f7ff;
  color: #304f82;
  font-size: 13px;
  position: relative;
}

.tip-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #0f5eef;
  color: #fff;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
}

.action-toast {
  position: fixed;
  left: 50%;
  top: 88px;
  z-index: 1200;
  transform: translateX(-50%);
  margin: 0;
  padding: 10px 18px;
  border: 1px solid #cfe0fa;
  border-radius: 999px;
  background: #fff;
  color: #12346c;
  box-shadow: 0 12px 24px rgba(21, 48, 93, 0.18);
  font-size: 13px;
  font-weight: 700;
}

.main-content {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 210px;
  gap: 0;
  align-items: start;
  min-height: 620px;
  border: 1px solid #dbe5f4;
  border-top: 0;
  border-radius: 0 0 12px 12px;
}

.content-area {
  padding: 0 26px 32px;
}

.content-section {
  padding: 24px 0;
  border-top: 1px solid #dce6f5;
  scroll-margin-top: 88px;
}

.content-section:first-child {
  border-top: 0;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0 0 14px;
  color: #07183d;
  font-size: 22px;
  line-height: 1.2;
  font-weight: 800;
}

.section-title::before {
  content: '';
  width: 26px;
  height: 26px;
  border: 2px solid #0f5eef;
  border-radius: 8px;
  background: #eef5ff;
}

.section-body {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 330px;
  gap: 28px;
}

.info-main {
  min-width: 0;
}

.info-text {
  margin: 0 0 12px;
  color: #17315f;
  font-size: 14px;
  line-height: 1.9;
}

.info-sidebar {
  min-width: 0;
}

.info-card {
  padding: 18px;
  border: 1px solid #d5e1f1;
  border-radius: 7px;
  background: #fbfdff;
}

.info-card-title {
  display: none;
}

.info-list {
  display: grid;
  gap: 10px;
}

.info-item {
  display: grid;
  grid-template-columns: 76px minmax(0, 1fr);
  gap: 8px;
  color: #17315f;
  font-size: 13px;
  line-height: 1.55;
}

.info-label {
  color: #526b96;
  font-weight: 700;
  text-align: justify;
  text-align-last: justify;
}

.info-value {
  min-width: 0;
  color: #17315f;
  font-weight: 600;
}

.btn-source {
  align-self: flex-end;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-width: 132px;
  height: 34px;
  margin-top: 16px;
  padding: 0 10px;
  border: 0;
  background: transparent;
  color: #0f5eef;
  font-size: 14px;
  font-weight: 700;
}

.btn-source::after {
  content: '›';
  font-size: 22px;
  line-height: 1;
}

.notice-box {
  display: flex;
  gap: 8px;
  margin: 14px 0 14px;
  padding: 9px 12px;
  border: 1px solid #f7d88a;
  border-radius: 6px;
  background: #fffaf0;
}

.notice-title,
.notice-text {
  margin: 0;
  color: #a35d00;
  font-size: 13px;
  line-height: 1.6;
}

.notice-title {
  flex: none;
  font-weight: 800;
}

.content-cards {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  margin-top: 14px;
}

.content-card {
  min-height: 112px;
  padding: 14px;
  border: 1px solid #d8e4f5;
  border-radius: 7px;
  background: #f8fbff;
}

.card-title {
  margin: 0 0 10px;
  color: #0f5eef;
  font-size: 14px;
  font-weight: 800;
}

.card-list {
  margin: 0;
  padding-left: 16px;
  color: #17315f;
  font-size: 13px;
  line-height: 1.75;
}

.card-content {
  margin: 0;
  color: #17315f;
  font-size: 13px;
  line-height: 1.7;
}

.evaluation-score {
  margin: 0 0 4px;
  color: #07183d;
  font-size: 28px;
  line-height: 1.1;
  font-weight: 800;
}

.stars {
  color: #18a64a;
  letter-spacing: 2px;
  font-size: 18px;
}

.evaluation-info {
  margin: 8px 0 0;
  color: #526b96;
  font-size: 12px;
}

.classroom-photo-placeholder {
  position: relative;
  height: 74px;
  overflow: hidden;
  border-radius: 5px;
  background: linear-gradient(180deg, #eaf2ff 0 48%, #e5ecf4 49% 100%);
}

.class-board {
  position: absolute;
  right: 18px;
  top: 14px;
  width: 82px;
  height: 34px;
  border-radius: 3px;
  background: #28405f;
  box-shadow: inset 0 0 0 3px #d8e8ff;
}

.class-seats {
  position: absolute;
  left: 18px;
  bottom: 10px;
  width: 130px;
  height: 24px;
  background: repeating-linear-gradient(90deg, #39445a 0 16px, transparent 17px 30px);
}

.sources-section {
  margin-bottom: 0;
}

.reading-nav {
  position: sticky;
  top: 72px;
  min-height: calc(100vh - 84px);
  padding: 32px 22px;
  border-left: 1px solid #dbe5f4;
  background: #fff;
}

.nav-title {
  margin: 0 0 18px;
  color: #17315f;
  font-size: 15px;
  font-weight: 800;
}

.nav-list {
  position: relative;
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-list::before {
  content: '';
  position: absolute;
  left: 8px;
  top: 9px;
  bottom: 12px;
  width: 2px;
  background: #dbe5f4;
}

.nav-item {
  position: relative;
  margin: 0 0 13px;
  padding-left: 28px;
}

.nav-item::before {
  content: '';
  position: absolute;
  left: 4px;
  top: 8px;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #b9c7dc;
}

.nav-item:first-child::before {
  box-shadow: 0 0 0 4px #eaf2ff;
  background: #0f5eef;
}

.nav-link {
  color: #405985;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
}

.nav-link:hover,
.nav-item:first-child .nav-link {
  color: #0f5eef;
}

.drawer-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(16, 29, 52, 0.62);
}

.drawer {
  position: absolute;
  top: 54px;
  right: 14px;
  bottom: 0;
  width: min(540px, calc(100vw - 28px));
  display: flex;
  flex-direction: column;
  border-radius: 12px 12px 0 0;
  background: #fff;
  box-shadow: -16px 0 34px rgba(15, 32, 61, 0.18);
}

.drawer-header {
  position: relative;
  padding: 26px 26px 16px;
}

.drawer-title {
  margin: 0 0 10px;
  color: #07183d;
  font-size: 20px;
  font-weight: 800;
}

.drawer-description {
  margin: 0;
  max-width: 390px;
  color: #405985;
  font-size: 14px;
  line-height: 1.65;
}

.btn-close {
  position: absolute;
  top: 18px;
  right: 18px;
  height: 36px;
  padding: 0 13px;
  border: 1px solid #d2def0;
  border-radius: 7px;
  background: #fff;
  color: #12346c;
  font-weight: 700;
}

.drawer-tabs {
  display: flex;
  gap: 10px;
  padding: 0 26px 16px;
}

.tab-btn {
  height: 34px;
  padding: 0 14px;
  border: 1px solid #d2def0;
  border-radius: 6px;
  background: #fff;
  color: #405985;
  font-size: 13px;
  font-weight: 700;
}

.tab-btn.active {
  border-color: #0f5eef;
  color: #0f5eef;
  background: #f1f6ff;
}

.drawer-content {
  flex: 1;
  overflow-y: auto;
  padding: 0 26px 16px;
}

.record-item {
  margin-bottom: 14px;
  padding: 16px 16px 14px;
  border: 1px solid #d8e4f5;
  border-radius: 8px;
  background: #fff;
}

.record-item.pending {
  border-color: #f2d19c;
  background: #fffaf3;
}

.record-header {
  display: grid;
  grid-template-columns: 24px minmax(0, 1fr);
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
}

.record-index {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 6px;
  background: #eaf2ff;
  color: #0f5eef;
  font-size: 14px;
  font-weight: 800;
}

.pending .record-index {
  background: #fff1df;
  color: #f08a24;
}

.record-title {
  margin: 0;
  color: #07183d;
  font-size: 15px;
  font-weight: 800;
}

.record-meta {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 12px;
  padding-left: 34px;
}

.meta-item {
  color: #405985;
  font-size: 13px;
  font-weight: 600;
}

.record-status {
  display: inline-flex;
  align-items: center;
  height: 24px;
  padding: 0 10px;
  border-radius: 5px;
  font-size: 12px;
  font-weight: 800;
}

.badge-success {
  background: #eaf9ee;
  color: #15923e;
}

.badge-warning {
  background: #fff1df;
  color: #df781a;
}

.record-content {
  margin: 0 0 12px;
  padding-left: 34px;
  color: #405985;
  font-size: 13px;
  line-height: 1.65;
}

.record-content strong {
  color: #17315f;
}

.btn-detail {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-left: auto;
  min-width: 126px;
  height: 32px;
  border: 1px solid #d2def0;
  border-radius: 6px;
  background: #fff;
  color: #17315f;
  font-size: 13px;
  font-weight: 700;
}

.drawer-footer {
  padding: 12px 26px;
  background: #f3f7ff;
}

.footer-tip {
  margin: 0;
  color: #405985;
  font-size: 13px;
}

.drawer-enter-active,
.drawer-leave-active {
  transition: all 0.22s ease;
}

.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
}

.drawer-enter-from .drawer,
.drawer-leave-to .drawer {
  transform: translateX(100%);
}

@media (max-width: 1320px) {
  .top-bar,
  .archive-header,
  .main-content {
    width: min(100% - 48px, 1320px);
  }

  .top-bar-content {
    grid-template-columns: 190px minmax(0, 1fr) 290px;
  }

  .header-content {
    grid-template-columns: minmax(440px, 1fr) minmax(280px, 430px);
  }

  .section-body {
    grid-template-columns: minmax(0, 1fr) 300px;
  }

  .content-cards {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 980px) {
  .top-bar,
  .archive-header,
  .main-content {
    width: min(100% - 32px, 1320px);
  }

  .top-bar-content,
  .header-content,
  .main-content,
  .section-body {
    grid-template-columns: 1fr;
  }

  .top-bar-actions {
    justify-content: center;
  }

  .header-tip {
    width: 100%;
    margin-top: 14px;
  }

  .reading-nav {
    display: none;
  }

  .content-cards {
    grid-template-columns: 1fr;
  }
}
</style>
