<script setup lang="ts">
	import { ref, computed } from 'vue'
	import { useRoute } from 'vue-router'
	import { AdminInput, AdminSelect, AdminTable, AdminTableColumn } from '@/components/admin-ui'
	import { DetailSheet, StatusBadge } from '@/components/common'
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

	const route = useRoute()
	const abilityListState = getAbilityListState()
	const { requirementGroups } = getAbilityListRequirementMappingMock()

	const emptyMapping: RequirementMapping = {
		id: '',
		requirementText: '暂无要求项',
		indicatorDimension: '教学能力',
		indicatorName: '岗位基本教学工作量（课时/学年）',
		level: '胜任',
		levelCriteria: '待补充等级标准',
		documentCondition: '待补充制度条件',
		confirmStatus: 'pending',
	}

	const requirementSourceOptions = [
		{ label: '岗位竞聘要求', value: '岗位竞聘要求' },
		{ label: '聘期履职要求', value: '聘期履职要求' },
	]
	const requirementTargetOptions = [
		{ label: '申报讲师', value: '申报讲师' },
		{ label: '申报副教授', value: '申报副教授' },
		{ label: '申报教授', value: '申报教授' },
		{ label: '讲师聘期要求', value: '讲师聘期要求' },
		{ label: '副教授聘期要求', value: '副教授聘期要求' },
		{ label: '教授聘期要求', value: '教授聘期要求' },
	]
	const indicatorDimensionOptions = [
		{ label: '教学能力', value: '教学能力' },
		{ label: '教研能力', value: '教研能力' },
		{ label: '实践能力', value: '实践能力' },
		{ label: '服务能力', value: '服务能力' },
	]
	const indicatorElementOptions = [
		{ label: '教学实施', value: '教学实施' },
		{ label: '课程思政', value: '课程思政' },
		{ label: '数字素养', value: '数字素养' },
		{ label: '教学指导', value: '教学指导' },
		{ label: '技能竞赛', value: '技能竞赛' },
		{ label: '团队建设', value: '团队建设' },
	]
	const indicatorNameOptions = [
		{ label: '岗位基本教学工作量（课时/学年）', value: '岗位基本教学工作量（课时/学年）' },
		{ label: '岗位年听课课时数（课时/学年）', value: '岗位年听课课时数（课时/学年）' },
		{ label: '教学改革研究项目立项', value: '教学改革研究项目立项' },
		{ label: '企业锻炼时长（天/年）', value: '企业锻炼时长（天/年）' },
	]
	const levelOptions = [
		{ label: '新手', value: '新手' },
		{ label: '胜任', value: '胜任' },
		{ label: '骨干', value: '骨干' },
		{ label: '名师', value: '名师' },
	]
	const confirmStatusOptions = [
		{ label: '已确认', value: 'confirmed' },
		{ label: '待确认', value: 'pending' },
	]

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
			indicatorName: '岗位基本教学工作量（课时/学年）',
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

	function mappingRowClassName({ row }: { row: RequirementMapping }) {
		return selectedMapping.value?.id === row.id ? 'admin-table-row active' : 'admin-table-row'
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
						<AdminTable
							:data="mappings"
							row-key="id"
							:row-class-name="mappingRowClassName"
							empty-text="暂无要求项映射"
							@row-click="selectMapping"
						>
							<AdminTableColumn prop="requirementText" label="要求项" min-width="190" />
							<AdminTableColumn label="对应能力指标" min-width="220">
								<template #default="{ row }">
									{{ row.indicatorDimension }} / {{ row.indicatorName }}
								</template>
							</AdminTableColumn>
							<AdminTableColumn label="要求等级" min-width="100">
								<template #default="{ row }">
									<span class="level-badge" :class="getLevelBadgeClass(row.level)">{{ row.level }}</span>
								</template>
							</AdminTableColumn>
							<AdminTableColumn prop="documentCondition" label="制度补充条件" min-width="180" />
							<AdminTableColumn label="确认状态" min-width="120">
								<template #default="{ row }">
									<StatusBadge :status="row.confirmStatus" :label="getStatusLabel(row.confirmStatus)" />
								</template>
							</AdminTableColumn>
							<AdminTableColumn label="操作" min-width="150" fixed="right">
								<template #default="{ row }">
									<div class="row-actions">
										<Button variant="ghost" size="sm" @click.stop="openEditDrawer(row)">编辑</Button>
										<Button variant="danger" size="sm" @click.stop="selectMapping(row); deleteMapping()">删除</Button>
									</div>
								</template>
							</AdminTableColumn>
						</AdminTable>
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

		<DetailSheet
			:open="Boolean(editingMapping)"
			title="编辑要求项映射"
			width="complex"
			@update:open="value => { if (!value) closeEditDrawer() }"
			@cancel="closeEditDrawer"
		>
			<div v-if="editingMapping" class="drawer-form">
				<div class="form-section">
					<h4 class="form-section-title"><span>1</span>基本信息</h4>
					<div class="form-row">
						<label class="form-label">要求来源</label>
						<AdminSelect class="form-select" model-value="岗位竞聘要求" :options="requirementSourceOptions" :clearable="false" />
					</div>
					<div class="form-row">
						<label class="form-label">适用对象</label>
						<AdminSelect class="form-select" model-value="申报副教授" :options="requirementTargetOptions" :clearable="false" />
					</div>
					<div class="form-row">
						<label class="form-label">要求原文</label>
						<AdminInput
							class="form-textarea"
							v-model="editingMapping.requirementText"
							type="textarea"
							:rows="3"
							placeholder="请输入要求原文"
						/>
					</div>
				</div>

				<div class="form-section">
					<h4 class="form-section-title"><span>2</span>映射配置</h4>
					<div class="form-row">
						<label class="form-label">对应能力维度</label>
						<AdminSelect v-model="editingMapping.indicatorDimension" class="form-select" :options="indicatorDimensionOptions" :clearable="false" />
					</div>
					<div class="form-row">
						<label class="form-label">对应能力要素</label>
						<AdminSelect class="form-select" model-value="教学实施" :options="indicatorElementOptions" :clearable="false" />
					</div>
					<div class="form-row">
						<label class="form-label">对应能力指标</label>
						<AdminSelect v-model="editingMapping.indicatorName" class="form-select" :options="indicatorNameOptions" :clearable="false" />
					</div>
					<div class="form-row">
						<label class="form-label">要求等级</label>
						<AdminSelect v-model="editingMapping.level" class="form-select" :options="levelOptions" :clearable="false" />
					</div>
					<div class="form-row">
						<label class="form-label">等级标准</label>
						<AdminInput
							class="form-textarea"
							v-model="editingMapping.levelCriteria"
							type="textarea"
							:rows="2"
							placeholder="承担核心课程教学并保持较稳定教学质量"
						/>
					</div>
					<div class="form-row">
						<label class="form-label">制度补充条件</label>
						<AdminInput
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
						<AdminInput
							class="form-input"
							placeholder="教学工作记录、课程表、授课任务记录"
						/>
					</div>
					<div class="form-row">
						<label class="form-label">映射说明</label>
						<AdminInput
							class="form-textarea"
							type="textarea"
							:rows="2"
							placeholder="系统后续将优先引用正式入档的教学工作事实进行对照"
						/>
					</div>
					<div class="form-row">
						<label class="form-label">确认状态</label>
						<AdminSelect v-model="editingMapping.confirmStatus" class="form-select" :options="confirmStatusOptions" :clearable="false" />
					</div>
				</div>
			</div>

			<template #footer>
				<div class="drawer-actions">
					<Button variant="danger" @click="deleteMapping">删除要求项</Button>
					<div class="drawer-actions-right">
						<Button variant="outline" @click="closeEditDrawer">取消</Button>
						<Button @click="saveMapping">保存映射</Button>
					</div>
				</div>
			</template>
		</DetailSheet>
		</div>
	</AdminLayout>
</template>

<style scoped>
	.page-root {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		gap: var(--space-admin-card-gap);
		padding: var(--space-admin-2xl);
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
		gap: var(--space-admin-xl);
	}

	.hero-title {
		margin: 0;
		font-size: 30px;
		font-weight: 900;
		color: var(--color-admin-text-strong);
		line-height: 1.3;
		display: flex;
		align-items: center;
		gap: var(--space-admin-md);
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
		gap: var(--space-admin-xs);
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
		border-radius: var(--radius-admin-panel);
	}

	.stat-card {
		display: grid;
		grid-template-columns: 46px minmax(0, 1fr);
		align-items: center;
		gap: var(--space-admin-md);
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
		gap: var(--space-admin-lg);
		flex: 1;
		min-height: 0;
	}

	/* 左侧：要求对象 */
	.groups-tree {
		display: flex;
		flex-direction: column;
		gap: 4px;
		padding: var(--space-admin-lg);
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
		border-radius: var(--radius-admin-panel);
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
		margin-left: var(--space-admin-lg);
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
		padding: var(--space-admin-lg);
		color: #7d899b;
		font-size: 13px;
		font-weight: 700;
	}

	/* 右侧：要求项详情 */
	.detail-panel { min-width: 0; }

	.mapping-detail {
		display: flex;
		flex-direction: column;
		gap: var(--space-admin-md);
		padding: var(--space-admin-lg);
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
		gap: var(--space-admin-md);
		padding: var(--space-admin-lg);
		padding-top: 0;
	}

	.admin-card {
		background: #fff;
		border: 1px solid var(--color-admin-border);
		border-radius: var(--radius-admin-panel);
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
		border-radius: var(--radius-sm);
		font-size: 12px;
		font-weight: 900;
	}

	.level-core { background: #e8f0ff; color: var(--color-admin-primary); }
	.level-qualified { background: #dff8ec; color: #18a663; }
	.level-new { background: #eef3fb; color: var(--color-admin-text-muted); }
	.level-master { background: #efe7ff; color: #8848e8; }

	.row-actions {
		display: flex;
		gap: var(--space-admin-sm);
	}

	.drawer-form {
		display: flex;
		flex-direction: column;
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
		gap: var(--space-admin-md);
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
		border-radius: var(--radius-sm);
		background: var(--color-admin-primary);
		color: #fff;
		font-size: 13px;
		font-weight: 900;
	}

	.form-row {
		display: grid;
		grid-template-columns: 130px minmax(0, 1fr);
		align-items: start;
		gap: var(--space-admin-lg);
		margin-bottom: var(--space-admin-lg);
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
		border-radius: var(--radius-sm);
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
		gap: var(--space-admin-xs);
		margin-right: var(--space-admin-2xl);
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
		width: 100%;
		justify-content: space-between;
		gap: var(--space-admin-md);
	}

	.drawer-actions-right {
		display: flex;
		gap: var(--space-admin-md);
	}

	@media (max-width: 768px) {
		.main-workspace {
			grid-template-columns: 1fr;
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
