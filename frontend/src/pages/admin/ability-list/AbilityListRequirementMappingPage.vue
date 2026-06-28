<script setup lang="ts">
	import { ref } from 'vue'

	// Mock 数据：要求对象
	const requirementGroups = [
		{
			key: 'position-competition',
			label: '岗位竞聘要求',
			children: [
				{ key: 'lecturer', label: '申报讲师' },
				{ key: 'associate-professor', label: '申报副教授' },
				{ key: 'professor', label: '申报教授' },
			],
		},
		{
			key: 'tenure-requirements',
			label: '聘期履职要求',
			children: [
				{ key: 'lecturer-tenure', label: '讲师聘期要求' },
				{ key: 'associate-professor-tenure', label: '副教授聘期要求' },
				{ key: 'professor-tenure', label: '教授聘期要求' },
			],
		},
	]

	// Mock 数据：要求项映射表
	const mappings = [
		{
			id: '1',
			requirementText: '近三年承担不少于 2 门专业课程教学',
			indicatorDimension: '教学能力',
			indicatorName: '教学工作量',
			level: '骨干',
			levelCriteria: '近三年专业课程授课门数 ≥ 2',
			documentCondition: '近三年专业课程授课门数 ≥ 2',
			confirmStatus: 'confirmed',
		},
		{
			id: '2',
			requirementText: '主持或参与校级以上教改项目',
			indicatorDimension: '教研能力',
			indicatorName: '教改项目',
			level: '胜任',
			levelCriteria: '校级及以上教改项目 ≥ 1',
			documentCondition: '校级及以上教改项目 ≥ 1',
			confirmStatus: 'pending',
		},
		{
			id: '3',
			requirementText: '近三年教学质量评价达到良好及以上',
			indicatorDimension: '教学能力',
			indicatorName: '课堂教学评价',
			level: '胜任',
			levelCriteria: '近三年综合评价等级 ≥ 良好',
			documentCondition: '近三年综合评价等级 ≥ 良好',
			confirmStatus: 'confirmed',
		},
		{
			id: '4',
			requirementText: '具有企事业实践或社会服务经历',
			indicatorDimension: '实践能力',
			indicatorName: '企业实践经历',
			level: '胜任',
			levelCriteria: '累计企业实践天数 ≥ 30',
			documentCondition: '累计企业实践天数 ≥ 30',
			confirmStatus: 'unconfigured',
		},
	]

	// 当前选中的要求对象
	const selectedGroup = ref('associate-professor')

	// 当前选中的映射项
	const selectedMapping = ref(mappings[0])

	// 编辑抽屉状态
	const editingMapping = ref<typeof mappings[0] | null>(null)

	// 统计数据
	const stats = {
		positionRequirements: 12,
		tenureRequirements: 12,
		confirmed: 19,
		pending: 5,
	}

	// 选择要求对象
	function selectGroup(key: string) {
		selectedGroup.value = key
	}

	// 选择映射项
	function selectMapping(mapping: typeof mappings[0]) {
		selectedMapping.value = mapping
	}

	// 打开编辑抽屉
	function openEditDrawer(mapping?: typeof mappings[0]) {
		editingMapping.value = mapping || selectedMapping.value
	}

	// 关闭编辑抽屉
	function closeEditDrawer() {
		editingMapping.value = null
	}

	// 新增要求项
	function addNewMapping() {
		openEditDrawer()
	}

	// 删除映射
	function deleteMapping() {
		console.log('删除映射：', selectedMapping.value)
		closeEditDrawer()
	}

	// 保存映射
	function saveMapping() {
		console.log('保存映射：', editingMapping.value)
		closeEditDrawer()
	}

	// 确认配置
	function confirmMapping() {
		console.log('确认配置：', selectedMapping.value)
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

	// 获取状态徽章类名
	function getStatusBadgeClass(status: string) {
		const classMap: Record<string, string> = {
			confirmed: 'badge-success',
			pending: 'badge-warning',
			unconfigured: 'badge-info',
		}
		return classMap[status] || 'badge-info'
	}

	// 获取状态标签
	function getStatusLabel(status: string) {
		const labelMap: Record<string, string> = {
			confirmed: '已确认',
			pending: '待确认',
			unconfigured: '未配置',
		}
		return labelMap[status] || '未知'
	}
</script>

<template>
	<div class="page-root">
		<!-- 页面顶部 -->
		<div class="page-breadcrumb">
			能力清单 / 执行版 / 岗位/聘期要求映射
		</div>

		<!-- Hero 区 -->
		<div class="admin-hero">
			<div class="hero-content">
				<h1 class="hero-title">岗位/聘期要求映射</h1>
				<span class="badge-status badge-warning">映射配置中</span>

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
						<div class="stat-value">12</div>
						<div class="stat-label">岗位竞聘要求</div>
					</div>
					<div class="stat-card">
						<div class="stat-value">12</div>
						<div class="stat-label">聘期履职要求</div>
					</div>
					<div class="stat-card">
						<div class="stat-value">19</div>
						<div class="stat-label">已确认映射</div>
					</div>
					<div class="stat-card">
						<div class="stat-value">5</div>
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
						<button class="btn-primary" @click="addNewMapping">新增要求项</button>
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
									<td>{{ mapping.level }}</td>
									<td>{{ mapping.documentCondition }}</td>
									<td>
										<span
											class="badge-status"
											:class="getStatusBadgeClass(mapping.confirmStatus)"
										>
											{{ getStatusLabel(mapping.confirmStatus) }}
										</span>
									</td>
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
							<span
								class="badge-status"
								:class="getStatusBadgeClass(selectedMapping.confirmStatus)"
							>
								{{ getStatusLabel(selectedMapping.confirmStatus) }}
							</span>
						</div>
					</div>

					<div class="detail-actions">
						<button class="btn-primary" @click="openEditDrawer(selectedMapping)">编辑映射</button>
						<button class="btn-outline" @click="deleteMapping">删除</button>
						<button class="btn-secondary" @click="confirmMapping">确认配置</button>
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
					<!-- 分组1：基本信息 -->
					<div class="form-section">
						<h4 class="form-section-title">基本信息</h4>
						<div class="form-group">
							<label class="form-label">要求来源</label>
							<select class="form-select">
								<option>岗位竞聘要求</option>
								<option>聘期履职要求</option>
							</select>
						</div>
						<div class="form-group">
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
						<div class="form-group">
							<label class="form-label">要求原文</label>
							<textarea
								class="form-textarea"
								rows="3"
								v-model="editingMapping.requirementText"
								placeholder="请输入要求原文"
							></textarea>
						</div>
					</div>

					<!-- 分组2：映射配置 -->
					<div class="form-section">
						<h4 class="form-section-title">映射配置</h4>
						<div class="form-group">
							<label class="form-label">对应能力维度</label>
							<select class="form-select">
								<option>教学能力</option>
								<option>教研能力</option>
								<option>实践能力</option>
								<option>服务能力</option>
							</select>
						</div>
						<div class="form-group">
							<label class="form-label">对应能力要素</label>
							<select class="form-select">
								<option>教学设计与实施</option>
								<option>教学资源开发</option>
								<option>教学评价与反馈</option>
							</select>
						</div>
						<div class="form-group">
							<label class="form-label">对应能力指标</label>
							<select class="form-select">
								<option>教学工作量</option>
								<option>课堂教学评价</option>
								<option>教改项目</option>
							</select>
						</div>
						<div class="form-group">
							<label class="form-label">要求等级</label>
							<select class="form-select">
								<option>新手</option>
								<option>胜任</option>
								<option selected>骨干</option>
								<option>名师</option>
							</select>
						</div>
						<div class="form-group">
							<label class="form-label">等级标准</label>
							<textarea
								class="form-textarea"
								rows="2"
								placeholder="承担核心课程教学并保持较稳定教学质量"
							></textarea>
						</div>
						<div class="form-group">
							<label class="form-label">制度补充条件</label>
							<input
								type="text"
								class="form-input"
								v-model="editingMapping.documentCondition"
								placeholder="近三年专业课程授课门数 ≥ 2"
							/>
						</div>
					</div>

					<!-- 分组3：对照依据 -->
					<div class="form-section">
						<h4 class="form-section-title">对照依据</h4>
						<div class="form-group">
							<label class="form-label">可引用档案事实</label>
							<input
								type="text"
								class="form-input"
								placeholder="教学工作记录、课程表、授课任务记录"
							/>
						</div>
						<div class="form-group">
							<label class="form-label">映射说明</label>
							<textarea
								class="form-textarea"
								rows="2"
								placeholder="系统后续将优先引用正式入档的教学工作事实进行对照"
							></textarea>
						</div>
						<div class="form-group">
							<label class="form-label">确认状态</label>
							<select class="form-select">
								<option value="confirmed">已确认</option>
								<option value="pending">待确认</option>
							</select>
						</div>
					</div>
				</div>

				<div class="drawer-actions">
					<button class="btn-danger" @click="deleteMapping">删除要求项</button>
					<div class="drawer-actions-right">
						<button class="btn-secondary" @click="closeEditDrawer">取消</button>
						<button class="btn-primary" @click="saveMapping">保存映射</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.page-root {
		display: flex;
		flex-direction: column;
		height: 100%;
		gap: 24px;
	}

	/* 页面顶部 */
	.page-breadcrumb {
		color: #7d899b;
		font-size: 13px;
		font-weight: 700;
	}

	/* Hero 区 */
	.admin-hero {
		padding: 32px;
		background: linear-gradient(135deg, #f8fbff 0%, #f0f7ff 100%);
		border-radius: 16px;
		border: 1px solid #e1efff;
	}

	.hero-content {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.hero-title {
		margin: 0;
		font-size: 24px;
		font-weight: 900;
		color: var(--color-text-primary);
		line-height: 1.3;
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.hero-description {
		color: #7d899b;
		font-size: 14px;
		line-height: 1.6;
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

	.hero-stats {
		display: flex;
		gap: 16px;
	}

	.stat-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 16px;
		background: white;
		border-radius: 12px;
		border: 1px solid var(--color-card-border);
		min-width: 100px;
	}

	.stat-value {
		font-size: 24px;
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
		display: flex;
		gap: 24px;
		flex: 1;
		min-height: 0;
	}

	/* 左侧：要求对象 */
	.groups-panel {
		width: 220px;
		flex-shrink: 0;
	}

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
	.mappings-panel {
		flex: 1;
		min-width: 0;
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

	.table-footer {
		display: flex;
		justify-content: space-between;
		padding: 16px;
		color: #7d899b;
		font-size: 13px;
		font-weight: 700;
	}

	/* 右侧：要求项详情 */
	.detail-panel {
		width: 320px;
		flex-shrink: 0;
	}

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
		display: flex;
		flex-direction: column;
		gap: 12px;
		padding: 16px;
		padding-top: 0;
	}

	/* 编辑抽屉样式 */
	.edit-drawer-overlay {
		position: fixed;
		inset: 0;
		z-index: 1000;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: flex-end;
		padding: 0;
	}

	.edit-drawer {
		width: 640px;
		height: 100%;
		background: white;
		display: flex;
		flex-direction: column;
		box-shadow: -4px 0 20px rgba(0, 0, 0, 0.1);
	}

	.drawer-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 24px;
		border-bottom: 1px solid var(--color-card-border);
	}

	.drawer-title {
		margin: 0;
		font-size: 18px;
		font-weight: 800;
		color: var(--color-text-primary);
	}

	.drawer-close {
		display: flex;
		width: 32px;
		height: 32px;
		align-items: center;
		justify-content: center;
		border: 0;
		border-radius: 8px;
		background: #f5f8ff;
		color: #7d899b;
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
		padding: 24px;
		overflow-y: auto;
	}

	.form-section {
		margin-bottom: 24px;
	}

	.form-section-title {
		margin: 0 0 16px 0;
		font-size: 16px;
		font-weight: 800;
		color: var(--color-text-primary);
	}

	.form-group {
		margin-bottom: 16px;
	}

	.form-label {
		display: block;
		margin-bottom: 8px;
		color: #7d899b;
		font-size: 13px;
		font-weight: 700;
	}

	.form-input,
	.form-select,
	.form-textarea {
		width: 100%;
		padding: 10px 12px;
		border: 1px solid var(--color-card-border);
		border-radius: 8px;
		font-size: 14px;
		color: var(--color-text-primary);
		background: white;
		transition: all 0.16s ease;
		font-family: inherit;
	}

	.form-input:focus,
	.form-select:focus,
	.form-textarea:focus {
		outline: none;
		border-color: var(--color-primary);
		box-shadow: 0 0 0 3px rgba(47, 191, 155, 0.1);
	}

	.form-textarea {
		resize: vertical;
		min-height: 80px;
	}

	.drawer-actions {
		display: flex;
		justify-content: space-between;
		gap: 12px;
		padding: 24px;
		border-top: 1px solid var(--color-card-border);
	}

	.drawer-actions-right {
		display: flex;
		gap: 12px;
	}

	.btn-danger {
		padding: 10px 16px;
		border: 1px solid #dc2626;
		border-radius: 8px;
		background: white;
		color: #dc2626;
		font-size: 14px;
		font-weight: 700;
		cursor: pointer;
		transition: all 0.16s ease;
		font-family: inherit;
	}

	.btn-danger:hover {
		background: #dc2626;
		color: white;
	}

	@media (max-width: 768px) {
		.main-workspace {
			flex-direction: column;
		}

		.groups-panel,
		.detail-panel {
			width: 100%;
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
