<script setup lang="ts">
	import { ref } from 'vue'
	import { useRouter } from 'vue-router'
	import AdminLayout from '@/layouts/AdminLayout.vue'

	const router = useRouter()

	// Mock 数据：能力结构树
	const abilityTree = [
	  {
	    key: 'basic',
	    label: '基本能力',
	    children: null,
	  },
	  {
	    key: 'teaching',
	    label: '教学能力',
	    children: [
	      { key: 'teaching-design', label: '教学设计与实施' },
	      { key: 'teaching-resource', label: '教学资源开发' },
	      { key: 'teaching-evaluation', label: '教学评价与反馈' },
	      { key: 'teaching-innovation', label: '教学创新与改进' },
	    ],
	  },
	  {
	    key: 'research',
	    label: '教研能力',
	    children: null,
	  },
	  {
	    key: 'practice',
	    label: '实践能力',
	    children: null,
	  },
	  {
	    key: 'service',
	    label: '服务能力',
	    children: null,
	  },
	]

	// Mock 数据：指标表格数据
	const indicators = [
	  {
	    key: 'teaching-workload',
	    name: '教学工作量（课时/学期）',
	    novice: '≥64',
	    competent: '≥96',
	    backbone: '≥128',
	    expert: '≥160',
	    basis: '教学工作记录',
	    status: 'enabled',
	  },
	  {
	    key: 'teaching-evaluation',
	    name: '课堂教学评价（学生评分）',
	    novice: '≥80分',
	    competent: '≥85分',
	    backbone: '≥90分',
	    expert: '≥95分',
	    basis: '教学质量评价',
	    status: 'enabled',
	  },
	  {
	    key: 'listening-hours',
	    name: '听课课时（课时/学期）',
	    novice: '≥8',
	    competent: '≥16',
	    backbone: '≥24',
	    expert: '≥32',
	    basis: '教学活动记录',
	    status: 'enabled',
	  },
	  {
	    key: 'teaching-compliance',
	    name: '教学规范执行',
	    novice: '≥80%',
	    competent: '≥90%',
	    backbone: '≥95%',
	    expert: '≥98%',
	    basis: '教学规范检查',
	    status: 'enabled',
	  },
	  {
	    key: 'teaching-resource-construction',
	    name: '教学资源建设（门/年）',
	    novice: '≥1',
	    competent: '≥2',
	    backbone: '≥3',
	    expert: '≥5',
	    basis: '课程资源记录',
	    status: 'enabled',
	  },
	  {
	    key: 'it-teaching-level',
	    name: '信息化教学应用水平',
	    novice: '≥60分',
	    competent: '≥75分',
	    backbone: '≥85分',
	    expert: '≥95分',
	    basis: '信息化应用评价',
	    status: 'enabled',
	  },
	]

	// 当前选中的能力项
	const selectedAbility = ref('teaching-design')

	// 当前选中的指标
	const selectedIndicator = ref<typeof indicators[0] | null>(null)

	// 选择能力项
	function selectAbility(key: string) {
	  selectedAbility.value = key
	}

	// 选择指标
	function selectIndicator(indicator: typeof indicators[0]) {
	  selectedIndicator.value = indicator
	}

	// 获取选中能力项的标签
	function getSelectedAbilityLabel() {
	  const findInTree = (items: typeof abilityTree): string => {
	    for (const item of items) {
	      if (item.key === selectedAbility.value) {
	        return item.label
	      }
	      if (item.children) {
	        for (const child of item.children) {
	          if (child.key === selectedAbility.value) {
	            return `${item.label} / ${child.label}`
	          }
	        }
	      }
	    }
	    return ''
	  }
	  return findInTree(abilityTree)
	}

	// 获取选中能力项的描述
	function getSelectedAbilityDescription() {
	  const descriptions: Record<string, string> = {
	    'teaching-design': '聚焦教学目标设计、教学过程组织与实施，作为教师教学能力发展的长期标准参考。',
	    'teaching-resource': '评估教学资源开发与应用能力，包括课程设计、教材编写、数字化资源建设等。',
	    'teaching-evaluation': '关注教学评价能力，包括学生学习评价、教学反思、教学改进等。',
	    'teaching-innovation': '评估教学创新与改进能力，包括教学方法创新、技术应用创新等。',
	  }
	  return descriptions[selectedAbility.value] || ''
	}

	// 按钮处理函数
	function goToOptimization() {
	  router.push('/admin/ability-list/base/optimization')
	}

	function goToVersionHistory() {
	  // 暂不实现
	  console.log('查看版本记录')
	}

	function deriveExecutionVersion() {
	  // 暂不实现，或跳转到发布确认页
	  console.log('派生执行版')
	}

	function editIndicator(indicator: typeof indicators[0]) {
	  console.log('编辑指标：', indicator)
	}

	function showIndicatorDescription() {
	  console.log('显示指标说明')
	}
</script>

<template>
	<AdminLayout active-key="ability-list-base">
		<div class="page-root">
		<!-- 顶部说明区 -->
		<div class="page-breadcrumb">
			能力清单 / 基准模板
		</div>
		<div class="page-description">
			维护学校长期使用的教师能力标准，用于派生年度、聘期或建设周期执行版。
		</div>

		<!-- Hero 区 -->
		<div class="admin-hero">
			<div class="hero-content">
				<div class="hero-header">
					<h1 class="hero-title">教师能力清单基准模板 V1.0</h1>
					<span class="badge-status badge-success">已启用</span>
				</div>

				<div class="hero-summary">
					<div class="summary-item">
						<span class="summary-label">最近更新：</span>
						<span class="summary-value">2026-06-08 20:30</span>
					</div>
					<div class="summary-item">
						<span class="summary-label">能力结构：</span>
						<span class="summary-value">基本能力 + 教学能力 + 教研能力 + 实践能力 + 服务能力</span>
					</div>
					<div class="summary-item">
						<span class="summary-label">当前指标：</span>
						<span class="summary-value">69 项</span>
					</div>
				</div>

				<div class="hero-actions">
					<button class="btn-primary" @click="goToOptimization">优化基准模板</button>
					<button class="btn-secondary" @click="goToVersionHistory">查看版本记录</button>
					<button class="btn-outline" @click="deriveExecutionVersion">派生执行版</button>
				</div>

				<div class="hero-note">
					可基于制度文件和运行反馈形成优化建议，确认后再应用到基准模板。
				</div>
			</div>

			<div class="hero-illustration">
				<!-- 蓝色教育治理插画区域 -->
				<div class="illustration-placeholder">
					<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
						<rect width="200" height="200" fill="#f0f7ff" rx="12" />
						<circle cx="100" cy="80" r="40" fill="#e1efff" />
						<rect x="40" y="130" width="120" height="8" fill="#d0e7ff" rx="4" />
						<rect x="60" y="145" width="80" height="8" fill="#d0e7ff" rx="4" />
						<rect x="70" y="160" width="60" height="8" fill="#d0e7ff" rx="4" />
					</svg>
				</div>
			</div>
		</div>

		<!-- 主体工作区 -->
		<div class="main-workspace">
			<!-- 左侧：能力结构 -->
			<div class="ability-structure-panel">
				<div class="admin-card">
					<div class="admin-card-header">
						<h3 class="admin-card-title">能力结构</h3>
					</div>
					<div class="ability-tree">
						<div
							v-for="item in abilityTree"
							:key="item.key"
							class="ability-tree-item"
						>
							<!-- 无子项的能力 -->
							<div
								v-if="!item.children"
								class="ability-node"
								:class="{ active: selectedAbility === item.key }"
								@click="selectAbility(item.key)"
							>
								{{ item.label }}
							</div>

							<!-- 有子项的能力 -->
							<div v-else class="ability-group">
								<div
									class="ability-parent"
									:class="{ active: item.children.some(child => child.key === selectedAbility) }"
								>
									{{ item.label }}
								</div>
								<div class="ability-children">
									<div
										v-for="child in item.children"
										:key="child.key"
										class="ability-child"
										:class="{ active: selectedAbility === child.key }"
										@click="selectAbility(child.key)"
									>
										{{ child.label }}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- 右侧：指标表格 -->
			<div class="indicators-panel">
				<div class="admin-card">
					<div class="admin-card-header">
						<h3 class="admin-card-title">{{ getSelectedAbilityLabel() }}</h3>
						<button class="btn-link" @click="showIndicatorDescription">指标说明</button>
					</div>
					<div v-if="getSelectedAbilityDescription()" class="ability-description">
						{{ getSelectedAbilityDescription() }}
					</div>
					<div class="admin-table-container">
						<table class="admin-table">
							<thead>
								<tr>
									<th>指标名称</th>
									<th>新手</th>
									<th>胜任</th>
									<th>骨干</th>
									<th>名师</th>
									<th>建议依据</th>
									<th>状态</th>
									<th>操作</th>
								</tr>
							</thead>
							<tbody>
								<tr
									v-for="indicator in indicators"
									:key="indicator.key"
									class="admin-table-row"
									:class="{ active: selectedIndicator?.key === indicator.key }"
									@click="selectIndicator(indicator)"
								>
									<td>{{ indicator.name }}</td>
									<td>{{ indicator.novice }}</td>
									<td>{{ indicator.competent }}</td>
									<td>{{ indicator.backbone }}</td>
									<td>{{ indicator.expert }}</td>
									<td>{{ indicator.basis }}</td>
									<td>
										<span class="badge-status badge-success">已启用</span>
									</td>
									<td>
										<button class="btn-link">编辑</button>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
		</div>
	</AdminLayout>
</template>

<style scoped>
	.page-root {
		display: flex;
		flex-direction: column;
		height: 100%;
		gap: 24px;
	}

	/* 顶部说明区 */
	.page-breadcrumb {
		color: #7d899b;
		font-size: 13px;
		font-weight: 700;
	}

	.page-description {
		color: #263856;
		font-size: 15px;
		line-height: 1.6;
		margin-top: 8px;
	}

	/* Hero 区 */
	.admin-hero {
		display: flex;
		align-items: stretch;
		justify-content: space-between;
		gap: 32px;
		padding: 32px;
		background: linear-gradient(135deg, #f8fbff 0%, #f0f7ff 100%);
		border-radius: 16px;
		border: 1px solid #e1efff;
	}

	.hero-content {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.hero-header {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.hero-title {
		margin: 0;
		font-size: 24px;
		font-weight: 900;
		color: var(--color-text-primary);
		line-height: 1.3;
	}

	.hero-summary {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.summary-item {
		display: flex;
		gap: 8px;
		font-size: 14px;
	}

	.summary-label {
		color: #7d899b;
		font-weight: 700;
	}

	.summary-value {
		color: #263856;
		font-weight: 600;
	}

	.hero-actions {
		display: flex;
		gap: 12px;
	}

	.hero-note {
		color: #7d899b;
		font-size: 13px;
		line-height: 1.5;
		padding: 12px;
		background: rgba(255, 255, 255, 0.6);
		border-radius: 8px;
		border: 1px solid #e1efff;
	}

	.hero-illustration {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 200px;
		flex-shrink: 0;
	}

	.illustration-placeholder {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	/* 主体工作区 */
	.main-workspace {
		display: flex;
		gap: 24px;
		flex: 1;
		min-height: 0;
	}

	/* 左侧能力结构 */
	.ability-structure-panel {
		width: 280px;
		flex-shrink: 0;
	}

	.ability-tree {
		display: flex;
		flex-direction: column;
		gap: 4px;
		padding: 16px;
	}

	.ability-tree-item {
		display: flex;
		flex-direction: column;
	}

	.ability-node,
	.ability-parent,
	.ability-child {
		display: flex;
		align-items: center;
		padding: 10px 12px;
		border-radius: 8px;
		cursor: pointer;
		transition: all 0.16s ease;
		font-size: 14px;
		font-weight: 700;
		color: #263856;
	}

	.ability-node:hover,
	.ability-child:hover {
		background: #f5f8ff;
		color: var(--color-primary);
	}

	.ability-node.active,
	.ability-child.active {
		background: #f2f7ff;
		color: var(--color-primary);
	}

	.ability-parent {
		font-size: 15px;
		font-weight: 800;
		color: #263856;
		cursor: default;
	}

	.ability-parent.active {
		color: var(--color-primary);
	}

	.ability-children {
		display: flex;
		flex-direction: column;
		gap: 2px;
		margin-top: 4px;
		margin-left: 16px;
	}

	/* 右侧指标表格 */
	.indicators-panel {
		flex: 1;
		min-width: 0;
	}

	.ability-description {
		padding: 0 16px 16px;
		color: #7d899b;
		font-size: 13px;
		line-height: 1.6;
	}

	.admin-table-row {
		cursor: pointer;
	}

	.admin-table-row.active {
		background: #f2f7ff;
	}

	.admin-table-row:hover {
		background: #f5f8ff;
	}
</style>
