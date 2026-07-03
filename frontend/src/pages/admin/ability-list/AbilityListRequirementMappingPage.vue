<script setup lang="ts">
	import { ref, computed } from 'vue'
	import { EmptyState, StatusBadge } from '@/components/common'
	import { Button } from '@/components/ui'
	import AdminLayout from '@/layouts/AdminLayout.vue'
	import { getRequirementMappingStatusLabel, type RequirementMappingStatus } from '@/domain/admin/ability-list'
	import { useOperationMessage } from '@/lib/operationMessage'
	import { getAbilityListRequirementMappingMock } from '@/services/mock/ability-list'
	import {
		confirmRequirementMapping,
		deleteRequirementMapping,
		getAbilityListState,
		saveRequirementMapping,
		type RequirementMapping,
	} from '@/stores/admin/abilityListStore'

	const abilityListState = getAbilityListState()
	const { requirementGroups } = getAbilityListRequirementMappingMock()

	const emptyMapping: RequirementMapping = {
		id: '',
		requirementText: '暂无要求项',
		indicatorDimension: '教学能力',
		indicatorName: '教学工作量',
		level: '胜任',
		levelCriteria: '待补充等级标准',
		documentCondition: '待补充制度条件',
		confirmStatus: 'pending',
	}

	const mappings = computed(() => abilityListState.requirementMappings)

	// 当前选中的要求对象
	const selectedGroup = ref('associate-professor')

	const selectedMappingId = ref(mappings.value[0]?.id ?? '')
	const selectedMapping = computed(() => {
		return mappings.value.find(mapping => mapping.id === selectedMappingId.value)
			?? mappings.value[0]
			?? emptyMapping
	})

	// 编辑抽屉状态
	const editingMapping = ref<RequirementMapping | null>(null)
	const operationMessage = useOperationMessage()

	// 统计数据
	const stats = computed(() => ({
		positionRequirements: 12,
		tenureRequirements: 12,
		confirmed: mappings.value.filter((item) => item.confirmStatus === 'confirmed').length + 17,
		pending: mappings.value.filter((item) => item.confirmStatus !== 'confirmed').length + 3,
	}))

	// 选择要求对象
	function selectGroup(key: string) {
		selectedGroup.value = key
		operationMessage.set(`已切换要求对象：${getSelectedGroupLabel()}。`)
	}

	// 选择映射项
	function selectMapping(mapping: RequirementMapping) {
		selectedMappingId.value = mapping.id
		operationMessage.set('已在右侧展示要求项详情。')
	}

	// 打开编辑抽屉
	function openEditDrawer(mapping?: RequirementMapping) {
		editingMapping.value = { ...(mapping || selectedMapping.value) }
	}

	// 关闭编辑抽屉
	function closeEditDrawer() {
		editingMapping.value = null
	}

	// 新增要求项
	function addNewMapping() {
		editingMapping.value = {
			id: `new-${Date.now()}`,
			requirementText: '新增要求项待完善',
			indicatorDimension: '教学能力',
			indicatorName: '教学工作量',
			level: '胜任',
			levelCriteria: '待补充等级标准',
			documentCondition: '待补充制度条件',
			confirmStatus: 'pending',
		}
		operationMessage.set('已创建待完善要求项。')
	}

	// 删除映射
	function deleteMapping() {
		const target = editingMapping.value || selectedMapping.value
		deleteRequirementMapping(target.id)
		selectedMappingId.value = mappings.value[0]?.id ?? ''
		operationMessage.fromStore(abilityListState)
		closeEditDrawer()
	}

	// 保存映射
	function saveMapping() {
		if (!editingMapping.value) return
		saveRequirementMapping(editingMapping.value)
		selectedMappingId.value = editingMapping.value.id
		operationMessage.fromStore(abilityListState)
		closeEditDrawer()
	}

	// 确认配置
	function confirmMapping() {
		confirmRequirementMapping(selectedMapping.value.id)
		operationMessage.fromStore(abilityListState)
	}

	// 获取选中要求对象的标签
	function getSelectedGroupLabel() {
		const findInGroups = (groups: typeof requirementGroups): string => {
			for (const group of groups) {
				if (group.key === selectedGroup.value) {
					return group.label
				}
				if (group.children) {
					const found = group.children.find(child => child.key === selectedGroup.value)
					if (found) return `${group.label} / ${found.label}`
				}
			}
			return ''
		}
		return findInGroups(requirementGroups)
	}

	function getLevelBadgeClass(level: string) {
		const classMap: Record<string, string> = {
			骨干: 'level-core',
			胜任: 'level-qualified',
			新手: 'level-new',
			名师: 'level-master',
		}
		return classMap[level] || 'level-qualified'
	}

	function getStatusLabel(status: RequirementMappingStatus) {
		return getRequirementMappingStatusLabel(status)
	}
</script>

<template>
	<AdminLayout active-key="ability-list-execution">
		<div class="page-root">
		<!-- 页面顶部 -->
		<div class="page-breadcrumb">
			能力清单 / 执行版 / 岗位/聘期要求映射
		</div>
		<div v-if="operationMessage.text.value" class="operation-message">{{ operationMessage.text.value }}</div>

		<!-- Hero 区 -->
		<div class="admin-hero">
			<div class="hero-content">
				<h1 class="hero-title">岗位/聘期要求映射</h1>
				<StatusBadge status="pending" label="映射配置中" />

				<div class="hero-description">
					将岗位竞聘和聘期履职要求对应到当前执行版能力指标，用于后续教师目标对照、差距分析和正式档案事实引用。
				</div>

				<div class="hero-summary">
					<div class="summary-item">
						<span class="summary-label">当前执行版：</span>
						<span class="summary-value">2027 年度教师能力清单执行版</span>
					</div>
					<div class="summary-item">
						<span class="summary-label">适用范围：</span>
						<span class="summary-value">全校教师</span>
					</div>
				</div>

				<div class="hero-stats">
					<div class="stat-card">
						<div class="stat-value">{{ stats.positionRequirements }}</div>
						<div class="stat-label">岗位竞聘要求</div>
					</div>
					<div class="stat-card">
						<div class="stat-value">{{ stats.tenureRequirements }}</div>
						<div class="stat-label">聘期履职要求</div>
					</div>
					<div class="stat-card">
						<div class="stat-value">{{ stats.confirmed }}</div>
						<div class="stat-label">已确认映射</div>
					</div>
					<div class="stat-card">
						<div class="stat-value">{{ stats.pending }}</div>
						<div class="stat-label">待确认映射</div>
					</div>
				</div>
			</div>
		</div>

		<!-- 主体工作区：三栏布局 -->
		<div class="main-workspace">
			<!-- 左侧：要求对象 -->
			<div class="groups-panel">
				<div class="admin-card">
					<div class="admin-card-header">
						<h3 class="admin-card-title">要求对象</h3>
					</div>
					<div class="groups-tree">
						<div
							v-for="group in requirementGroups"
							:key="group.key"
							class="group-item"
						>
							<!-- 无子项的分组 -->
							<div
								v-if="!group.children"
								class="group-node"
								:class="{ active: selectedGroup === group.key }"
								@click="selectGroup(group.key)"
							>
								{{ group.label }}
							</div>

							<!-- 有子项的分组 -->
							<div v-else class="group-expanded">
								<div
									class="group-parent"
									:class="{ active: group.children.some(child => child.key === selectedGroup) }"
								>
									{{ group.label }}
								</div>
								<div class="group-children">
									<div
										v-for="child in group.children"
										:key="child.key"
										class="group-child"
										:class="{ active: selectedGroup === child.key }"
										@click="selectGroup(child.key)"
									>
										{{ child.label }}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- 中间：要求项映射表 -->
			<div class="mappings-panel">
				<div class="admin-card">
					<div class="admin-card-header">
						<h3 class="admin-card-title">{{ getSelectedGroupLabel() }}｜要求项映射</h3>
						<Button @click="addNewMapping">新增要求项</Button>
					</div>

					<div class="admin-table-container">
						<table class="admin-table">
							<thead>
								<tr>
									<th>要求项</th>
									<th>对应能力指标</th>
									<th>要求等级</th>
									<th>制度补充条件</th>
									<th>确认状态</th>
									<th>操作</th>
								</tr>
							</thead>
							<tbody>
								<tr
							v-for="mapping in mappings"
									:key="mapping.id"
									class="admin-table-row"
									:class="{ active: selectedMapping?.id === mapping.id }"
									@click="selectMapping(mapping)"
								>
									<td>{{ mapping.requirementText }}</td>
									<td>{{ mapping.indicatorDimension }} / {{ mapping.indicatorName }}</td>
									<td><span class="level-badge" :class="getLevelBadgeClass(mapping.level)">{{ mapping.level }}</span></td>
									<td>{{ mapping.documentCondition }}</td>
									<td>
										<StatusBadge :status="mapping.confirmStatus" :label="getStatusLabel(mapping.confirmStatus)" />
									</td>
									<td>
										<div class="row-actions">
											<Button variant="ghost" size="sm" @click.stop="openEditDrawer(mapping)">编辑</Button>
											<Button variant="danger" size="sm" @click.stop="selectMapping(mapping); deleteMapping()">删除</Button>
										</div>
									</td>
								</tr>
								<tr v-if="mappings.length === 0">
									<EmptyState as="td" variant="cell" :colspan="6" title="暂无要求项映射" />
								</tr>
							</tbody>
						</table>
					</div>

					<div class="table-footer">
						<span>共 {{ mappings.length }} 条</span>
						<span>第 1 页</span>
						<span>每页 10 条/页</span>
					</div>
				</div>
			</div>

			<!-- 右侧：要求项详情 -->
			<div class="detail-panel">
				<div class="admin-card">
					<div class="admin-card-header">
						<h3 class="admin-card-title">要求项详情</h3>
					</div>
					<div class="mapping-detail">
						<div class="detail-item">
							<span class="detail-label">要求原文：</span>
							<span class="detail-value">{{ selectedMapping.requirementText }}</span>
						</div>
						<div class="detail-item">
							<span class="detail-label">要求来源：</span>
							<span class="detail-value">岗位竞聘要求</span>
						</div>
						<div class="detail-item">
							<span class="detail-label">适用对象：</span>
							<span class="detail-value">申报副教授</span>
						</div>
						<div class="detail-item">
							<span class="detail-label">对应能力指标：</span>
							<span class="detail-value">{{ selectedMapping.indicatorDimension }} / {{ selectedMapping.indicatorName }}</span>
						</div>
						<div class="detail-item">
							<span class="detail-label">要求等级：</span>
							<span class="detail-value">{{ selectedMapping.level }}</span>
						</div>
						<div class="detail-item">
							<span class="detail-label">等级标准：</span>
							<span class="detail-value">承担核心课程教学并保持较稳定教学质量</span>
						</div>
						<div class="detail-item">
							<span class="detail-label">制度补充条件：</span>
							<span class="detail-value">{{ selectedMapping.documentCondition }}</span>
						</div>
						<div class="detail-item">
							<span class="detail-label">可引用档案事实：</span>
							<span class="detail-value">教学工作记录、课程表、授课任务记录</span>
						</div>
						<div class="detail-item">
							<span class="detail-label">映射说明：</span>
							<span class="detail-value">后续教师档案基于正式入档事实判断是否已具备对应依据。</span>
						</div>
						<div class="detail-item">
							<span class="detail-label">确认状态：</span>
							<StatusBadge :status="selectedMapping.confirmStatus" :label="getStatusLabel(selectedMapping.confirmStatus)" />
						</div>
					</div>

					<div class="detail-actions">
						<Button @click="openEditDrawer(selectedMapping)">编辑映射</Button>
						<Button variant="danger" @click="deleteMapping">删除</Button>
						<Button variant="secondary" @click="confirmMapping">确认配置</Button>
					</div>
				</div>
			</div>
		</div>

		<!-- 编辑抽屉 -->
		<div v-if="editingMapping" class="edit-drawer-overlay" @click="closeEditDrawer">
			<div class="edit-drawer" @click.stop>
				<div class="drawer-header">
					<h3 class="drawer-title">编辑要求项映射</h3>
					<button class="drawer-close" @click="closeEditDrawer">
						<svg viewBox="0 0 24 24" aria-hidden="true">
							<path d="M6 6l12 12M18 6l-12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
						</svg>
					</button>
				</div>

				<div class="drawer-form">
					<div class="form-section">
						<h4 class="form-section-title"><span>1</span>基本信息</h4>
						<div class="form-row">
							<label class="form-label">要求来源</label>
							<select class="form-select">
								<option>岗位竞聘要求</option>
								<option>聘期履职要求</option>
							</select>
						</div>
						<div class="form-row">
							<label class="form-label">适用对象</label>
							<select class="form-select">
								<option>申报讲师</option>
								<option selected>申报副教授</option>
								<option>申报教授</option>
								<option>讲师聘期要求</option>
								<option>副教授聘期要求</option>
								<option>教授聘期要求</option>
							</select>
						</div>
						<div class="form-row">
							<label class="form-label">要求原文</label>
							<textarea
								class="form-textarea"
								rows="3"
								v-model="editingMapping.requirementText"
								placeholder="请输入要求原文"
							></textarea>
						</div>
					</div>

					<div class="form-section">
						<h4 class="form-section-title"><span>2</span>映射配置</h4>
						<div class="form-row">
							<label class="form-label">对应能力维度</label>
							<select v-model="editingMapping.indicatorDimension" class="form-select">
								<option>教学能力</option>
								<option>教研能力</option>
								<option>实践能力</option>
								<option>服务能力</option>
							</select>
						</div>
						<div class="form-row">
							<label class="form-label">对应能力要素</label>
							<select class="form-select">
								<option>教学设计与实施</option>
								<option>教学资源开发</option>
								<option>教学评价与反馈</option>
							</select>
						</div>
						<div class="form-row">
							<label class="form-label">对应能力指标</label>
							<select v-model="editingMapping.indicatorName" class="form-select">
								<option>教学工作量</option>
								<option>课堂教学评价</option>
								<option>教改项目</option>
								<option>企业实践经历</option>
							</select>
						</div>
						<div class="form-row">
							<label class="form-label">要求等级</label>
							<select v-model="editingMapping.level" class="form-select">
								<option>新手</option>
								<option>胜任</option>
								<option>骨干</option>
								<option>名师</option>
							</select>
						</div>
						<div class="form-row">
							<label class="form-label">等级标准</label>
							<textarea
								class="form-textarea"
								rows="2"
								v-model="editingMapping.levelCriteria"
								placeholder="承担核心课程教学并保持较稳定教学质量"
							></textarea>
						</div>
						<div class="form-row">
							<label class="form-label">制度补充条件</label>
							<input
								type="text"
								class="form-input"
								v-model="editingMapping.documentCondition"
								placeholder="近三年专业课程授课门数 ≥ 2"
							/>
						</div>
					</div>

					<div class="form-section">
						<h4 class="form-section-title"><span>3</span>对照依据</h4>
						<div class="form-row">
							<label class="form-label">可引用档案事实</label>
							<input
								type="text"
								class="form-input"
								placeholder="教学工作记录、课程表、授课任务记录"
							/>
						</div>
						<div class="form-row">
							<label class="form-label">映射说明</label>
							<textarea
								class="form-textarea"
								rows="2"
								placeholder="系统后续将优先引用正式入档的教学工作事实进行对照"
							></textarea>
						</div>
						<div class="form-row radio-row">
							<label class="form-label">确认状态</label>
							<label class="radio-option">
								<input v-model="editingMapping.confirmStatus" type="radio" value="confirmed" />
								已确认
							</label>
							<label class="radio-option">
								<input v-model="editingMapping.confirmStatus" type="radio" value="pending" />
								待确认
							</label>
						</div>
					</div>
				</div>

				<div class="drawer-actions">
					<Button variant="danger" @click="deleteMapping">删除要求项</Button>
					<div class="drawer-actions-right">
						<Button variant="outline" @click="closeEditDrawer">取消</Button>
						<Button @click="saveMapping">保存映射</Button>
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
		min-height: 100vh;
		gap: 18px;
		padding: 24px;
		background: var(--color-admin-bg);
		color: var(--color-admin-text-strong);
	}

	.page-root *,
	.page-root *::before,
	.page-root *::after {
		box-sizing: border-box;
	}

	/* 页面顶部 */
	.page-breadcrumb {
		color: #7d899b;
		font-size: 13px;
		font-weight: 700;
	}

	.operation-message {
		color: var(--color-admin-primary);
		font-size: 13px;
		font-weight: 800;
	}

	/* Hero 区 */
	.admin-hero {
		position: relative;
		min-height: 250px;
		padding: 30px 38px;
		background: linear-gradient(135deg, var(--color-admin-bg-soft) 0%, #f0f7ff 100%);
		border-radius: 14px;
		border: 1px solid var(--color-admin-border);
		box-shadow: var(--shadow-admin-card-faint);
	}

	.hero-content {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.hero-title {
		margin: 0;
		font-size: 30px;
		font-weight: 900;
		color: var(--color-admin-text-strong);
		line-height: 1.3;
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.hero-description {
		color: #263b63;
		font-size: 15px;
		line-height: 1.6;
	}

	.hero-summary {
		display: flex;
		gap: 34px;
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

	.hero-stats {
		max-width: 1120px;
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 0;
		padding: 16px 22px;
		background: #fff;
		border: 1px solid var(--color-admin-border);
		border-radius: 8px;
	}

	.stat-card {
		display: grid;
		grid-template-columns: 46px minmax(0, 1fr);
		align-items: center;
		gap: 12px;
		padding: 0 24px;
		border-left: 1px solid #d7e2f2;
	}

	.stat-card:first-child {
		border-left: 0;
	}

	.stat-value {
		font-size: 28px;
		font-weight: 900;
		color: var(--color-primary);
	}

	.stat-label {
		font-size: 13px;
		color: #7d899b;
		font-weight: 700;
	}

	/* 主体工作区：三栏布局 */
	.main-workspace {
		display: grid;
		grid-template-columns: 300px minmax(0, 1fr) 560px;
		gap: 16px;
		flex: 1;
		min-height: 0;
	}

	/* 左侧：要求对象 */
	.groups-tree {
		display: flex;
		flex-direction: column;
		gap: 4px;
		padding: 16px;
	}

	.group-item {
		display: flex;
		flex-direction: column;
	}

	.group-node,
	.group-parent,
	.group-child {
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

	.group-node:hover,
	.group-child:hover {
		background: #f5f8ff;
		color: var(--color-primary);
	}

	.group-node.active,
	.group-child.active {
		background: #f2f7ff;
		color: var(--color-primary);
	}

	.group-parent {
		font-size: 15px;
		font-weight: 800;
		color: #263856;
		cursor: default;
	}

	.group-parent.active {
		color: var(--color-primary);
	}

	.group-children {
		display: flex;
		flex-direction: column;
		gap: 2px;
		margin-top: 4px;
		margin-left: 16px;
	}

	/* 中间：要求项映射表 */
	.mappings-panel { min-width: 0; }

	.admin-table-row {
		cursor: pointer;
	}

	.admin-table-row.active {
		background: #f2f7ff;
	}

	.admin-table-row:hover {
		background: #f5f8ff;
	}

	.table-footer {
		display: flex;
		justify-content: space-between;
		padding: 16px;
		color: #7d899b;
		font-size: 13px;
		font-weight: 700;
	}

	/* 右侧：要求项详情 */
	.detail-panel { min-width: 0; }

	.mapping-detail {
		display: flex;
		flex-direction: column;
		gap: 12px;
		padding: 16px;
		max-height: 500px;
		overflow-y: auto;
	}

	.detail-item {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.detail-label {
		color: #7d899b;
		font-size: 13px;
		font-weight: 700;
	}

	.detail-value {
		color: #263856;
		font-size: 14px;
		line-height: 1.5;
		font-weight: 600;
	}

	.detail-actions {
		display: grid;
		grid-template-columns: 1fr 1fr 1.2fr;
		gap: 12px;
		padding: 16px;
		padding-top: 0;
	}

	.admin-card {
		background: #fff;
		border: 1px solid var(--color-admin-border);
		border-radius: 8px;
		box-shadow: var(--shadow-admin-card-faint);
		overflow: hidden;
	}

	.admin-card-header {
		min-height: 58px;
		padding: 0 20px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid #e4ebf5;
	}

	.admin-card-title {
		margin: 0;
		color: var(--color-admin-text-strong);
		font-size: 18px;
		font-weight: 900;
	}

	.admin-table-container { overflow-x: auto; }

	.admin-table {
		width: 100%;
		min-width: 760px;
		border-collapse: collapse;
		table-layout: fixed;
	}

	.admin-table th,
	.admin-table td {
		padding: 15px 14px;
		border-bottom: 1px solid #e8eef7;
		text-align: left;
		vertical-align: middle;
		color: var(--color-admin-text-strong);
		font-size: 13px;
		line-height: 1.55;
	}

	.admin-table th {
		background: #f7faff;
		color: var(--color-admin-text-muted);
		font-weight: 900;
	}

	.level-badge {
		display: inline-flex;
		min-height: 24px;
		align-items: center;
		padding: 3px 8px;
		border-radius: 6px;
		font-size: 12px;
		font-weight: 900;
	}

	.level-core { background: #e8f0ff; color: var(--color-admin-primary); }
	.level-qualified { background: #dff8ec; color: #18a663; }
	.level-new { background: #eef3fb; color: var(--color-admin-text-muted); }
	.level-master { background: #efe7ff; color: #8848e8; }

	.row-actions {
		display: flex;
		gap: 10px;
	}

	/* 编辑抽屉样式 */
	.edit-drawer-overlay {
		position: fixed;
		inset: 0;
		z-index: 1000;
		background: rgba(15, 23, 42, 0.42);
		backdrop-filter: blur(2px);
		display: flex;
		justify-content: flex-end;
		padding: 0;
	}

	.edit-drawer {
		width: min(660px, 100vw);
		height: 100%;
		background: white;
		display: flex;
		flex-direction: column;
		box-shadow: -8px 0 30px rgba(35, 64, 110, 0.18);
	}

	.drawer-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		min-height: 76px;
		padding: 0 28px;
		border-bottom: 1px solid var(--color-admin-border);
	}

	.drawer-title {
		margin: 0;
		font-size: 20px;
		font-weight: 900;
		color: var(--color-admin-text-strong);
	}

	.drawer-close {
		display: flex;
		width: 32px;
		height: 32px;
		align-items: center;
		justify-content: center;
		border: 0;
		border-radius: 6px;
		background: transparent;
		color: #263b63;
		cursor: pointer;
		transition: all 0.16s ease;
	}

	.drawer-close:hover {
		background: #eaf2ff;
		color: var(--color-primary);
	}

	.drawer-close svg {
		width: 16px;
		height: 16px;
	}

	.drawer-form {
		flex: 1;
		padding: 0 28px 24px;
		overflow-y: auto;
	}

	.form-section {
		padding: 26px 0;
		border-bottom: 1px solid var(--color-admin-border);
		margin-bottom: 0;
	}

	.form-section-title {
		margin: 0 0 22px;
		display: flex;
		align-items: center;
		gap: 12px;
		font-size: 17px;
		font-weight: 900;
		color: var(--color-admin-text-strong);
	}

	.form-section-title span {
		width: 24px;
		height: 24px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: 6px;
		background: var(--color-admin-primary);
		color: #fff;
		font-size: 13px;
		font-weight: 900;
	}

	.form-row {
		display: grid;
		grid-template-columns: 130px minmax(0, 1fr);
		align-items: start;
		gap: 16px;
		margin-bottom: 16px;
	}

	.form-row:last-child {
		margin-bottom: 0;
	}

	.form-label {
		padding-top: 10px;
		color: #263b63;
		font-size: 14px;
		font-weight: 800;
	}

	.form-input,
	.form-select,
	.form-textarea {
		width: 100%;
		min-height: 40px;
		padding: 10px 14px;
		border: 1px solid #d7e2f2;
		border-radius: 6px;
		font-size: 14px;
		color: var(--color-admin-text-strong);
		background: white;
		transition: all 0.16s ease;
		font-family: inherit;
	}

	.form-input:focus,
	.form-select:focus,
	.form-textarea:focus {
		outline: none;
		border-color: var(--color-admin-primary);
		box-shadow: 0 0 0 3px rgba(18, 104, 246, 0.1);
	}

	.form-textarea {
		resize: vertical;
		min-height: 78px;
		line-height: 1.6;
	}

	.radio-row {
		align-items: center;
	}

	.radio-option {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		margin-right: 24px;
		color: #263b63;
		font-size: 14px;
		font-weight: 700;
	}

	.radio-option input {
		width: 16px;
		height: 16px;
	}

	.drawer-actions {
		display: flex;
		justify-content: space-between;
		gap: 12px;
		padding: 20px 28px;
		border-top: 1px solid var(--color-admin-border);
		background: #fff;
	}

	.drawer-actions-right {
		display: flex;
		gap: 12px;
	}

	@media (max-width: 768px) {
		.main-workspace {
			grid-template-columns: 1fr;
		}

		.edit-drawer {
			width: 100%;
			max-width: 100%;
		}

		.hero-stats {
			flex-wrap: wrap;
		}

		.stat-card {
			flex: 1;
			min-width: 120px;
		}
	}
</style>
