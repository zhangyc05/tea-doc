<script setup lang="ts">
	import { ref, computed } from 'vue'
	import { AdminIcon, AdminInput, AdminSelect, AdminTable, AdminTableColumn } from '@/components/admin-ui'
	import { DetailSheet, StatusBadge } from '@/components/common'
	import { Button } from '@/components/ui'
	import AdminLayout from '@/layouts/AdminLayout.vue'
	import { getRequirementMappingStatusLabel, type RequirementMappingStatus } from '@/domain/admin/ability-list'
	import { getAbilityListRequirementMappingMock } from '@/services/mock/ability-list'
	import {
		confirmRequirementMapping,
		deleteRequirementMapping,
		getRequirementMappingsForGroup,
		saveRequirementMapping,
		type RequirementMapping,
	} from '@/stores/admin/abilityListStore'
	import requirementMappingHeroArt from '@/assets/admin/ability-list-base-assets/ability-list-base-hero-art.png'

	const { requirementGroups } = getAbilityListRequirementMappingMock()

	const overviewStats = [
		{ key: 'position', value: '12', unit: '项', label: '岗位竞聘要求', icon: 'user', tone: 'blue' },
		{ key: 'tenure', value: '12', unit: '项', label: '聘期履职要求', icon: 'document', tone: 'cyan' },
		{ key: 'confirmed', value: '19', unit: '项', label: '已确认映射', icon: 'check', tone: 'green' },
		{ key: 'pending', value: '5', unit: '项', label: '待确认映射', icon: 'clock', tone: 'orange' },
	]

	const emptyMapping: RequirementMapping = {
		id: '',
		requirementGroupKey: 'associate-professor',
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
	const pageSizeOptions = [
		{ label: '10 条/页', value: '10' },
	]

	// 当前选中的要求对象
	const selectedGroup = ref('associate-professor')

	const filteredMappings = computed(() => getRequirementMappingsForGroup(selectedGroup.value))
	const selectedMappingId = ref(filteredMappings.value[0]?.id ?? '')
	const selectedMapping = computed(() => {
		return filteredMappings.value.find(mapping => mapping.id === selectedMappingId.value)
			?? filteredMappings.value[0]
			?? { ...emptyMapping, requirementGroupKey: selectedGroup.value }
	})

	// 编辑抽屉状态
	const editingMapping = ref<RequirementMapping | null>(null)

	// 选择要求对象
	function selectGroup(key: string) {
		selectedGroup.value = key
		selectedMappingId.value = getRequirementMappingsForGroup(key)[0]?.id ?? ''
	}

	// 选择映射项
	function selectMapping(mapping: RequirementMapping) {
		selectedMappingId.value = mapping.id
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
			requirementGroupKey: selectedGroup.value,
			requirementText: '新增要求项待完善',
			indicatorDimension: '教学能力',
			indicatorName: '岗位基本教学工作量（课时/学年）',
			level: '胜任',
			levelCriteria: '待补充等级标准',
			documentCondition: '待补充制度条件',
			confirmStatus: 'pending',
		}
	}

	// 删除映射
	function deleteMapping() {
		const target = editingMapping.value || selectedMapping.value
		if (!target.id) return
		deleteRequirementMapping(target.id)
		selectedMappingId.value = filteredMappings.value[0]?.id ?? ''
		closeEditDrawer()
	}

	// 保存映射
	function saveMapping() {
		if (!editingMapping.value) return
		saveRequirementMapping({
			...editingMapping.value,
			requirementGroupKey: editingMapping.value.requirementGroupKey || selectedGroup.value,
		})
		selectedMappingId.value = editingMapping.value.id
		closeEditDrawer()
	}

	// 确认配置
	function confirmMapping() {
		if (!selectedMapping.value.id) return
		confirmRequirementMapping(selectedMapping.value.id)
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

	function getSelectedSourceLabel() {
		const parent = requirementGroups.find(group => group.children?.some(child => child.key === selectedGroup.value))
		return parent?.label ?? getSelectedGroupLabel()
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
		<!-- Hero 区 -->
		<section class="mapping-hero">
			<div class="hero-art" aria-hidden="true">
				<img :src="requirementMappingHeroArt" alt="" />
			</div>
			<div class="hero-emblem" aria-hidden="true">
				<AdminIcon name="switch" />
			</div>
			<div class="hero-content">
				<div class="hero-title-row">
					<h1 class="hero-title">岗位/聘期要求映射</h1>
					<StatusBadge status="pending" label="映射配置中" />
				</div>

				<p class="hero-description">
					将岗位竞聘和聘期履职要求对应到当前执行版能力指标，用于后续教师目标对照、差距分析和正式档案事实引用。
				</p>

				<div class="hero-summary">
					<div class="summary-item">
						<AdminIcon name="document" />
						<span class="summary-label">当前执行版：</span>
						<span class="summary-value">2027 年度教师能力清单执行版</span>
					</div>
					<div class="summary-item">
						<AdminIcon name="user" />
						<span class="summary-label">适用范围：</span>
						<span class="summary-value">全校教师</span>
					</div>
				</div>

				<div class="hero-stats">
					<div
						v-for="item in overviewStats"
						:key="item.key"
						class="stat-card"
						:class="`stat-${item.tone}`"
					>
						<span class="stat-icon"><AdminIcon :name="item.icon" /></span>
						<span class="stat-copy">
							<strong>{{ item.value }}</strong>
							<em>{{ item.unit }}</em>
							<span>{{ item.label }}</span>
						</span>
					</div>
				</div>
			</div>
		</section>

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
							<!-- 有子项的分组 -->
							<div class="group-expanded">
								<div
									class="group-parent"
									:class="{ active: group.children.some(child => child.key === selectedGroup) }"
								>
									<span class="group-parent-icon">
										<AdminIcon :name="group.key.includes('tenure') ? 'finished' : 'briefcase'" />
									</span>
									<span>{{ group.label }}</span>
									<AdminIcon name="arrow-up" />
								</div>
								<div class="group-children">
									<div
										v-for="child in group.children"
										:key="child.key"
										class="group-child"
										:class="{ active: selectedGroup === child.key }"
										@click="selectGroup(child.key)"
									>
										<span class="group-radio" aria-hidden="true"></span>
										<span>{{ child.label }}</span>
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
							class="mapping-table"
							:data="filteredMappings"
							row-key="id"
							border
							:row-class-name="mappingRowClassName"
							empty-text="暂无要求项映射"
							@row-click="selectMapping"
						>
							<AdminTableColumn prop="requirementText" label="要求项" min-width="130" />
							<AdminTableColumn label="对应能力指标" min-width="120">
								<template #default="{ row }">
									{{ row.indicatorDimension }} / {{ row.indicatorName }}
								</template>
							</AdminTableColumn>
							<AdminTableColumn label="要求等级" min-width="72" align="center">
								<template #default="{ row }">
									<span class="level-badge" :class="getLevelBadgeClass(row.level)">{{ row.level }}</span>
								</template>
							</AdminTableColumn>
							<AdminTableColumn prop="documentCondition" label="制度补充条件" min-width="108" />
							<AdminTableColumn label="确认状态" min-width="88" align="center">
								<template #default="{ row }">
									<StatusBadge :status="row.confirmStatus" :label="getStatusLabel(row.confirmStatus)" />
								</template>
							</AdminTableColumn>
						</AdminTable>
					</div>

					<div class="table-footer">
						<span>共 {{ filteredMappings.length }} 条</span>
						<div class="pager-actions" aria-label="分页">
							<button class="pager-button" type="button" disabled aria-label="上一页">
								<AdminIcon name="arrow-left" />
							</button>
							<span class="pager-button active" aria-current="page">1</span>
							<button class="pager-button" type="button" disabled aria-label="下一页">
								<AdminIcon name="arrow-right" />
							</button>
						</div>
						<AdminSelect
							class="page-size-select"
							model-value="10"
							:options="pageSizeOptions"
							:clearable="false"
							disabled
						/>
					</div>
				</div>
			</div>

			<!-- 右侧：要求项详情 -->
			<div class="detail-panel">
				<div class="admin-card">
					<div class="admin-card-header">
						<h3 class="admin-card-title">
							<AdminIcon name="document" />
							要求项详情
						</h3>
						<Button class="detail-delete-action" variant="danger" size="sm" @click="deleteMapping">
							<AdminIcon name="delete" />
							删除
						</Button>
					</div>
					<div class="mapping-detail">
						<div class="detail-item">
							<span class="detail-label">要求原文：</span>
							<span class="detail-value">{{ selectedMapping.requirementText }}</span>
						</div>
						<div class="detail-item">
							<span class="detail-label">要求来源：</span>
							<span class="detail-value">{{ getSelectedSourceLabel() }}</span>
						</div>
						<div class="detail-item">
							<span class="detail-label">适用对象：</span>
							<span class="detail-value">{{ getSelectedGroupLabel() }}</span>
						</div>
						<div class="detail-item">
							<span class="detail-label">对应能力指标：</span>
							<span class="detail-value">{{ selectedMapping.indicatorDimension }} / {{ selectedMapping.indicatorName }}</span>
						</div>
						<div class="detail-item">
							<span class="detail-label">要求等级：</span>
							<span class="level-badge" :class="getLevelBadgeClass(selectedMapping.level)">{{ selectedMapping.level }}</span>
						</div>
						<div class="detail-item level-standard-card">
							<span class="detail-label">等级标准：</span>
							<span class="detail-value">{{ selectedMapping.levelCriteria }}</span>
							<AdminIcon name="info" />
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
						<Button variant="outline" @click="openEditDrawer(selectedMapping)">
							<AdminIcon name="edit" />
							编辑映射
						</Button>
						<Button variant="danger" @click="deleteMapping">
							<AdminIcon name="delete" />
							删除
						</Button>
						<Button @click="confirmMapping">
							<AdminIcon name="check" />
							确认配置
						</Button>
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
						<AdminSelect class="form-select" :model-value="getSelectedSourceLabel()" :options="requirementSourceOptions" :clearable="false" />
					</div>
					<div class="form-row">
						<label class="form-label">适用对象</label>
						<AdminSelect class="form-select" :model-value="getSelectedGroupLabel()" :options="requirementTargetOptions" :clearable="false" />
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
		padding: var(--space-admin-xs) var(--space-admin-2xl) var(--space-admin-2xl);
		background: var(--color-admin-bg);
		color: var(--color-admin-text-strong);
	}

	.page-root *,
	.page-root *::before,
	.page-root *::after {
		box-sizing: border-box;
	}

	/* Hero 区 */
	.mapping-hero {
		position: relative;
		min-height: 238px;
		overflow: hidden;
		padding: 24px 36px 18px 104px;
		background: linear-gradient(135deg, var(--color-admin-bg-soft) 0%, #f0f7ff 100%);
		border-radius: var(--radius-admin-panel);
		border: 1px solid var(--color-admin-border);
		box-shadow: var(--shadow-admin-card-faint);
	}

	.mapping-hero::before {
		position: absolute;
		inset: 0;
		z-index: 1;
		pointer-events: none;
		background: linear-gradient(90deg, rgba(255, 255, 255, 0.94) 0%, rgba(255, 255, 255, 0.86) 55%, rgba(255, 255, 255, 0.08) 100%);
		content: '';
	}

	.hero-art {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 0;
		width: min(42%, 560px);
		opacity: 0.86;
	}

	.hero-art img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: right center;
	}

	.hero-emblem {
		position: absolute;
		top: 36px;
		left: 34px;
		z-index: 2;
		display: flex;
		width: 72px;
		height: 72px;
		align-items: center;
		justify-content: center;
		border: 10px solid rgba(255, 255, 255, 0.9);
		border-radius: 50%;
		background: linear-gradient(145deg, var(--color-primary), var(--color-primary-hover));
		color: #fff;
		box-shadow: 0 14px 28px rgba(11, 99, 246, 0.18);
	}

	.hero-emblem :deep(svg) {
		width: 30px;
		height: 30px;
	}

	.hero-content {
		position: relative;
		z-index: 2;
		display: flex;
		flex-direction: column;
		gap: var(--space-admin-md);
		max-width: min(1010px, 76%);
	}

	.hero-title-row {
		display: flex;
		align-items: center;
		gap: var(--space-admin-md);
	}

	.hero-title {
		margin: 0;
		font-size: 30px;
		font-weight: 900;
		color: var(--color-admin-text-strong);
		line-height: 1.3;
	}

	.hero-description {
		margin: 0;
		color: #263b63;
		font-size: 15px;
		line-height: 1.6;
	}

	.hero-summary {
		display: flex;
		gap: var(--space-admin-2xl);
	}

	.summary-item {
		display: flex;
		align-items: center;
		gap: var(--space-admin-xs);
		font-size: 14px;
	}

	.summary-item :deep(svg) {
		width: 18px;
		height: 18px;
		color: #6d7b92;
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
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 0;
		margin-top: var(--space-admin-sm);
		padding: 9px 18px;
		background: #fff;
		border: 1px solid var(--color-admin-border);
		border-radius: var(--radius-admin-panel);
	}

	.stat-card {
		display: flex;
		align-items: center;
		gap: var(--space-admin-md);
		padding: 0 22px;
		border-left: 1px solid #d7e2f2;
	}

	.stat-card:first-child {
		border-left: 0;
	}

	.stat-icon {
		display: flex;
		width: 46px;
		height: 46px;
		flex: none;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		background: #ecf4ff;
		color: var(--color-primary);
	}

	.stat-icon :deep(svg) {
		width: 24px;
		height: 24px;
	}

	.stat-green .stat-icon { background: #e7f7e4; color: #3daf4a; }
	.stat-orange .stat-icon { background: #fff0dc; color: #f07a22; }
	.stat-cyan .stat-icon { background: #e4fbf7; color: #25a99a; }

	.stat-copy {
		display: grid;
		grid-template-columns: auto auto;
		align-items: baseline;
		column-gap: var(--space-admin-xs);
		row-gap: 2px;
	}

	.stat-copy strong {
		color: #020b25;
		font-size: 26px;
		font-weight: 950;
		line-height: 1;
	}

	.stat-copy em {
		color: #263856;
		font-size: 13px;
		font-style: normal;
		font-weight: 800;
	}

	.stat-copy span {
		grid-column: 1 / -1;
		font-size: 13px;
		color: #7d899b;
		font-weight: 700;
	}

	/* 主体工作区：三栏布局 */
	.main-workspace {
		display: grid;
		grid-template-columns: 255px minmax(0, 1fr) 470px;
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

	.group-child:hover {
		background: #f5f8ff;
		color: var(--color-primary);
	}

	.group-child.active {
		background: #f2f7ff;
		color: var(--color-primary);
	}

	.group-parent {
		font-size: 15px;
		font-weight: 800;
		color: #263856;
		cursor: default;
		justify-content: space-between;
		gap: var(--space-admin-sm);
	}

	.group-parent.active {
		color: var(--color-primary);
	}

	.group-parent-icon {
		display: flex;
		width: 22px;
		height: 22px;
		align-items: center;
		justify-content: center;
		color: var(--color-primary);
	}

	.group-parent > span:nth-child(2) {
		margin-right: auto;
	}

	.group-parent :deep(svg) {
		width: 16px;
		height: 16px;
	}

	.group-children {
		display: flex;
		flex-direction: column;
		gap: var(--space-admin-xs);
		margin-top: 4px;
		margin-left: var(--space-admin-sm);
	}

	.group-radio {
		width: 14px;
		height: 14px;
		flex: none;
		border: 2px solid #b8c7df;
		border-radius: 50%;
		background: #fff;
	}

	.group-child.active .group-radio {
		border-color: var(--color-primary);
		box-shadow: inset 0 0 0 3px #fff;
		background: var(--color-primary);
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

	.admin-table-container {
		overflow: hidden;
		padding: 0 var(--space-admin-sm);
		border: 0;
		background: transparent;
	}

	.mapping-table {
		width: 100%;
	}

	.mapping-table :deep(.el-table__inner-wrapper::before) {
		background: transparent;
	}

	.mapping-table :deep(.el-table__header th) {
		height: 44px;
		background: #f7faff;
		color: var(--color-admin-text-strong);
		font-size: 13px;
		font-weight: 900;
	}

	.mapping-table :deep(.el-table__cell) {
		padding: 12px 10px;
		color: var(--color-admin-text-title);
		font-size: 13px;
		font-weight: 750;
		line-height: 1.55;
	}

	.mapping-table :deep(.el-table__row) {
		height: 66px;
	}

	.mapping-table :deep(.inline-flex) {
		white-space: nowrap;
	}

	.mapping-table :deep(.el-table__body td:last-child .cell) {
		display: flex;
		justify-content: center;
		overflow: visible;
	}

	.table-footer {
		display: flex;
		min-height: 58px;
		align-items: center;
		justify-content: space-between;
		padding: 0 var(--space-admin-sm) 0 var(--space-admin-lg);
		color: #7d899b;
		font-size: 13px;
		font-weight: 700;
	}

	.pager-actions {
		display: flex;
		align-items: center;
		gap: var(--space-admin-sm);
	}

	.pager-button {
		display: inline-flex;
		width: 36px;
		height: 36px;
		align-items: center;
		justify-content: center;
		border: 1px solid var(--color-admin-border);
		border-radius: var(--radius-sm);
		background: #fff;
		color: var(--color-admin-text-subtle);
		font-family: inherit;
		font-size: 14px;
		font-weight: 900;
	}

	.pager-button.active {
		border-color: var(--color-admin-primary);
		background: var(--color-admin-primary);
		color: #fff;
		box-shadow: var(--shadow-admin-primary-action);
	}

	.pager-button:disabled {
		cursor: not-allowed;
		opacity: 0.58;
	}

	.pager-button :deep(svg) {
		width: 16px;
		height: 16px;
	}

	.page-size-select {
		width: 110px;
	}

	/* 右侧：要求项详情 */
	.detail-panel { min-width: 0; }

	.detail-panel .admin-card {
		display: flex;
		min-height: 470px;
		flex-direction: column;
	}

	.mapping-detail {
		display: flex;
		flex: 1;
		flex-direction: column;
		gap: var(--space-admin-sm);
		padding: 14px 18px;
		overflow: hidden;
	}

	.detail-item {
		display: grid;
		grid-template-columns: 116px minmax(0, 1fr);
		align-items: start;
		gap: var(--space-admin-sm);
	}

	.detail-label {
		color: #7d899b;
		font-size: 13px;
		font-weight: 700;
		line-height: 1.45;
	}

	.detail-value {
		color: #263856;
		font-size: 14px;
		line-height: 1.45;
		font-weight: 600;
	}

	.detail-actions {
		display: grid;
		grid-template-columns: 1fr 1fr 1.25fr;
		gap: var(--space-admin-md);
		padding: 8px 18px;
		border-top: 1px solid #e4ebf5;
		background: #fff;
	}

	.detail-delete-action {
		border-color: rgba(239, 68, 68, 0.18);
		background: #fff7f7;
		color: #ef4444;
	}

	.detail-delete-action :deep(svg),
	.detail-actions :deep(svg) {
		width: 16px;
		height: 16px;
	}

	.level-standard-card {
		position: relative;
		display: grid;
		grid-template-columns: 92px minmax(0, 1fr) 18px;
		align-items: start;
		gap: var(--space-admin-md);
		padding: 10px 12px;
		border-radius: var(--radius-admin-panel);
		background: #f5f8ff;
	}

	.level-standard-card .detail-label,
	.level-standard-card .detail-value {
		margin: 0;
	}

	.level-standard-card :deep(svg) {
		color: var(--color-primary);
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
		display: flex;
		align-items: center;
		gap: var(--space-admin-sm);
		color: var(--color-admin-text-strong);
		font-size: 18px;
		font-weight: 900;
	}

	.admin-card-title :deep(svg) {
		width: 20px;
		height: 20px;
		color: var(--color-primary);
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
