<script setup lang="ts">
	import { ref, computed } from 'vue'
	import AdminLayout from '@/layouts/AdminLayout.vue'

	// Mock 数据：建议来源
	const suggestionSources = [
	  { key: 'all', label: '全部建议' },
	  { key: 'policy', label: '制度文件' },
	  { key: 'feedback', label: '运行反馈' },
	  { key: 'manual', label: '人工补充' },
	]

	// 当前选中的建议来源
	const selectedSource = ref('all')

	// Mock 数据：优化建议列表
	const suggestions = [
	  {
	    id: '1',
	    source: 'feedback',
	    sourceLabel: '运行反馈',
	    issueType: '标准缺失',
	    keyLocation: '实施能力 / 企业实践成果转化',
	    content: '新增"企业实践成果转化"指标，用于评估企业实践中的成果产出记录',
	    basis: '本职群第 26 条成果材料未能给出清晰映射来源',
	    status: 'pending',
	    statusLabel: '待确认',
	  },
	  {
	    id: '2',
	    source: 'policy',
	    sourceLabel: '制度文件',
	    issueType: '标准不清',
	    keyLocation: '教研能力 / 教研资源',
	    content: '细化"教研资源"评估说明，区分主编、参与等不同一般参与',
	    basis: '2026年师资培养办法第三章第十二条',
	    status: 'pending',
	    statusLabel: '待确认',
	  },
	  {
	    id: '3',
	    source: 'feedback',
	    sourceLabel: '运行反馈',
	    issueType: '标准过宽',
	    keyLocation: '教学能力 / 教学资源建设',
	    content: '调整"覆盖多领域教学资源建设标准"，并补充说明适用范围',
	    basis: '课堂教学创新试点组织、院系反馈材料普遍表述资源',
	    status: 'pending',
	    statusLabel: '待确认',
	  },
	  {
	    id: '4',
	    source: 'manual',
	    sourceLabel: '人工补充',
	    issueType: '要求映射问题',
	    keyLocation: '服务能力 / 社会服务记录',
	    content: '补充与岗位和聘期要求的中间路径说明，提升后续映射溯源',
	    basis: '管理类人工补充建议',
	    status: 'adopted',
	    statusLabel: '已采纳',
	  },
	]

	// 当前选中的建议
	const selectedSuggestion = ref(suggestions[0])

	// 筛选标签
	const filterTags = [
	  { key: 'all', label: '全部' },
	  { key: 'missing', label: '标签缺失' },
	  { key: 'unclear', label: '标签不清' },
	  { key: 'duplicate', label: '标准重复' },
	  { key: 'wide', label: '标准过宽' },
	  { key: 'mapping', label: '要求映射问题' },
	]

	// 当前选中的筛选标签
	const selectedTag = ref('all')

	// 统计数据
	const stats = {
	  total: 18,
	  policy: 8,
	  feedback: 6,
	  manual: 4,
	  pending: 12,
	  adopted: 4,
	  rejected: 2,
	}

	// 选择建议来源
	function selectSource(key: string) {
	  selectedSource.value = key
	}

	// 选择建议
	function selectSuggestion(suggestion: typeof suggestions[0]) {
	  selectedSuggestion.value = suggestion
	}

	// 选择筛选标签
	function selectTag(key: string) {
	  selectedTag.value = key
	}

	// 根据筛选条件过滤建议
	const filteredSuggestions = computed(() => {
	  let result = suggestions

	  // 按来源筛选
	  if (selectedSource.value !== 'all') {
	    result = result.filter(s => s.source === selectedSource.value)
	  }

	  // 按标签筛选（这里简化处理，实际应该根据问题类型筛选）
	  if (selectedTag.value !== 'all') {
	    const tagMap: Record<string, string> = {
	      missing: '标准缺失',
	      unclear: '标准不清',
	      duplicate: '标准重复',
	      wide: '标准过宽',
	      mapping: '要求映射问题',
	    }
	    result = result.filter(s => s.issueType === tagMap[selectedTag.value])
	  }

	  return result
	})

	// 处理建议操作
	function handleAction(action: string, suggestion: typeof suggestions[0]) {
	  console.log(`${action}:`, suggestion)
	  // 这里可以添加具体的处理逻辑
	}
</script>

<template>
	<AdminLayout active-key="ability-list-base">
		<div class="page-root">
		<!-- 页面顶部 -->
		<div class="page-breadcrumb">
			能力清单 / 基准模板 / 优化基准模板
		</div>
		<div class="page-description">
			基于制度文件和运行反馈形成优化建议，人工确认后再应用到基准模板。
		</div>

		<!-- Hero 区 -->
		<div class="admin-hero">
			<div class="hero-content">
				<h1 class="hero-title">优化基准模板</h1>

				<div class="hero-stats">
					<div class="stat-item">
						<span class="stat-label">优化建议共：</span>
						<span class="stat-value">{{ stats.total }} 条</span>
					</div>
					<div class="stat-item">
						<span class="stat-label">制度文件：</span>
						<span class="stat-value">{{ stats.policy }} 条</span>
					</div>
					<div class="stat-item">
						<span class="stat-label">运行反馈：</span>
						<span class="stat-value">{{ stats.feedback }} 条</span>
					</div>
					<div class="stat-item">
						<span class="stat-label">人工补充：</span>
						<span class="stat-value">{{ stats.manual }} 条</span>
					</div>
					<div class="stat-item">
						<span class="stat-label">待确认：</span>
						<span class="stat-value">{{ stats.pending }} 条</span>
					</div>
					<div class="stat-item">
						<span class="stat-label">已采纳：</span>
						<span class="stat-value">{{ stats.adopted }} 条</span>
					</div>
					<div class="stat-item">
						<span class="stat-label">已弃用：</span>
						<span class="stat-value">{{ stats.rejected }} 条</span>
					</div>
				</div>

				<div class="hero-actions">
					<button class="btn-primary">上传制度文件</button>
					<button class="btn-secondary">重新分析运行反馈</button>
					<button class="btn-outline">查看版本记录</button>
				</div>
			</div>
		</div>

		<!-- 主体工作区：三栏布局 -->
		<div class="main-workspace">
			<!-- 左侧：建议来源 -->
			<div class="source-panel">
				<div class="admin-card">
					<div class="admin-card-header">
						<h3 class="admin-card-title">建议来源</h3>
					</div>
					<div class="source-list">
						<div
							v-for="source in suggestionSources"
							:key="source.key"
							class="source-item"
							:class="{ active: selectedSource === source.key }"
							@click="selectSource(source.key)"
						>
							{{ source.label }}
						</div>
					</div>
				</div>
			</div>

			<!-- 中间：优化建议列表 -->
			<div class="suggestions-panel">
				<div class="admin-card">
					<div class="admin-card-header">
						<h3 class="admin-card-title">优化建议列表</h3>
					</div>

					<!-- 筛选标签 -->
					<div class="filter-tags">
						<div
							v-for="tag in filterTags"
							:key="tag.key"
							class="filter-tag"
							:class="{ active: selectedTag === tag.key }"
							@click="selectTag(tag.key)"
						>
							{{ tag.label }}
						</div>
					</div>

					<!-- 建议列表表格 -->
					<div class="admin-table-container">
						<table class="admin-table">
							<thead>
								<tr>
									<th>来源</th>
									<th>问题类型</th>
									<th>关键位置</th>
									<th>建议内容</th>
									<th>来源依据</th>
									<th>处理状态</th>
									<th>操作</th>
								</tr>
							</thead>
							<tbody>
								<tr
									v-for="suggestion in filteredSuggestions"
									:key="suggestion.id"
									class="admin-table-row"
									:class="{ active: selectedSuggestion?.id === suggestion.id }"
									@click="selectSuggestion(suggestion)"
								>
									<td>{{ suggestion.sourceLabel }}</td>
									<td>{{ suggestion.issueType }}</td>
									<td>{{ suggestion.keyLocation }}</td>
									<td>{{ suggestion.content }}</td>
									<td>{{ suggestion.basis }}</td>
									<td>
										<span
											class="badge-status"
											:class="{
												'badge-warning': suggestion.status === 'pending',
												'badge-success': suggestion.status === 'adopted',
												'badge-info': suggestion.status === 'rejected',
											}"
										>
											{{ suggestion.statusLabel }}
										</span>
									</td>
									<td>
										<div class="action-buttons">
											<button class="btn-link" @click.stop="handleAction('view', suggestion)">查看详情</button>
											<button v-if="suggestion.status === 'pending'" class="btn-link" @click.stop="handleAction('adopt', suggestion)">采纳</button>
											<button v-if="suggestion.status === 'pending'" class="btn-link" @click.stop="handleAction('defer', suggestion)">暂缓</button>
											<button v-if="suggestion.status === 'pending'" class="btn-link" @click.stop="handleAction('reject', suggestion)">弃用</button>
										</div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>

			<!-- 右侧：建议详情 -->
			<div class="detail-panel">
				<div class="admin-card">
					<div class="admin-card-header">
						<h3 class="admin-card-title">建议详情</h3>
					</div>
					<div class="suggestion-detail">
						<div class="detail-item">
							<span class="detail-label">建议来源：</span>
							<span class="detail-value">{{ selectedSuggestion.sourceLabel }}</span>
						</div>
						<div class="detail-item">
							<span class="detail-label">问题类型：</span>
							<span class="detail-value">{{ selectedSuggestion.issueType }}</span>
						</div>
						<div class="detail-item">
							<span class="detail-label">关键位置：</span>
							<span class="detail-value">{{ selectedSuggestion.keyLocation }}</span>
						</div>
						<div class="detail-item">
							<span class="detail-label">建议内容：</span>
							<span class="detail-value">{{ selectedSuggestion.content }}</span>
						</div>
						<div class="detail-item">
							<span class="detail-label">来源依据：</span>
							<span class="detail-value">{{ selectedSuggestion.basis }}</span>
						</div>
						<div class="detail-item">
							<span class="detail-label">影响说明：</span>
							<span class="detail-value">无法准确记录和评价企业实践相关成果，影响教师成果完整性与评价公平性。</span>
						</div>
						<div class="detail-item">
							<span class="detail-label">处置意见：</span>
							<span class="detail-value">计划修订该指标，并明确成果类别、确认口径与适用范围。</span>
						</div>
					</div>

					<div class="detail-actions">
						<button class="btn-primary">采纳并应用</button>
						<button class="btn-secondary">暂缓处理</button>
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

	/* 页面顶部 */
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
	}

	.hero-stats {
		display: flex;
		flex-wrap: wrap;
		gap: 24px;
	}

	.stat-item {
		display: flex;
		gap: 6px;
		font-size: 14px;
	}

	.stat-label {
		color: #7d899b;
		font-weight: 700;
	}

	.stat-value {
		color: #263856;
		font-weight: 800;
	}

	.hero-actions {
		display: flex;
		gap: 12px;
	}

	/* 主体工作区：三栏布局 */
	.main-workspace {
		display: flex;
		gap: 24px;
		flex: 1;
		min-height: 0;
	}

	/* 左侧：建议来源 */
	.source-panel {
		width: 200px;
		flex-shrink: 0;
	}

	.source-list {
		display: flex;
		flex-direction: column;
		gap: 4px;
		padding: 16px;
	}

	.source-item {
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

	.source-item:hover {
		background: #f5f8ff;
		color: var(--color-primary);
	}

	.source-item.active {
		background: #f2f7ff;
		color: var(--color-primary);
	}

	/* 中间：优化建议列表 */
	.suggestions-panel {
		flex: 1;
		min-width: 0;
	}

	.filter-tags {
		display: flex;
		gap: 8px;
		padding: 16px;
		padding-bottom: 8px;
		flex-wrap: wrap;
	}

	.filter-tag {
		display: inline-flex;
		padding: 6px 12px;
		border-radius: 16px;
		background: #f5f8ff;
		color: #7d899b;
		font-size: 13px;
		font-weight: 700;
		cursor: pointer;
		transition: all 0.16s ease;
		border: 1px solid #e1efff;
	}

	.filter-tag:hover {
		background: #f2f7ff;
		color: var(--color-primary);
		border-color: var(--color-primary);
	}

	.filter-tag.active {
		background: var(--color-primary);
		color: white;
		border-color: var(--color-primary);
	}

	.action-buttons {
		display: flex;
		gap: 8px;
		flex-wrap: wrap;
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

	/* 右侧：建议详情 */
	.detail-panel {
		width: 320px;
		flex-shrink: 0;
	}

	.suggestion-detail {
		display: flex;
		flex-direction: column;
		gap: 16px;
		padding: 16px;
	}

	.detail-item {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.detail-label {
		color: #7d899b;
		font-size: 13px;
		font-weight: 700;
	}

	.detail-value {
		color: #263856;
		font-size: 14px;
		line-height: 1.6;
		font-weight: 600;
	}

	.detail-actions {
		display: flex;
		gap: 12px;
		padding: 16px;
		padding-top: 0;
	}
</style>
