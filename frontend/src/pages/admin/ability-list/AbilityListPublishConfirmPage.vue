<script setup lang="ts">
	import { useRouter } from 'vue-router'
	import AdminLayout from '@/layouts/AdminLayout.vue'

	const router = useRouter()

	// 处理发布操作
	function handlePublish() {
	  console.log('确认发布')
	  // 暂时不接接口
	}

	// 返回修改
	function goBack() {
	  router.push('/admin/ability-list/execution')
	}
</script>

<template>
	<AdminLayout active-key="ability-list-execution">
		<div class="page-root">
		<!-- 页面顶部 -->
		<div class="page-breadcrumb">
			能力清单 / 执行版 / 发布确认
		</div>
		<div class="page-description">
			确认发布执行版。发布后将作为当前周期运行口径，用于后续发展活动、档案归类、岗位/聘期对照和画像报告。
		</div>

		<!-- Hero 区 -->
		<div class="admin-hero">
			<div class="hero-content">
				<h1 class="hero-title">2027 年度教师能力清单执行版</h1>
				<span class="badge-status badge-warning">待发布</span>

				<div class="hero-summary">
					<div class="summary-item">
						<span class="summary-label">来源执行版：</span>
						<span class="summary-value">2026 年度教师能力清单执行版</span>
					</div>
					<div class="summary-item">
						<span class="summary-label">来源基准模板：</span>
						<span class="summary-value">教师能力清单基准模板 V1.0</span>
					</div>
					<div class="summary-item">
						<span class="summary-label">适用范围：</span>
						<span class="summary-value">全校教师</span>
					</div>
					<div class="summary-item">
						<span class="summary-label">指标数量：</span>
						<span class="summary-value">69 项</span>
					</div>
					<div class="summary-item">
						<span class="summary-label">最近调整：</span>
						<span class="summary-value">沿用 2026 年度执行标准，后续补充调整</span>
					</div>
				</div>
			</div>
		</div>

		<!-- 发布影响确认 -->
		<div class="impact-section">
			<h2 class="section-title">发布影响确认</h2>
			<div class="impact-cards">
				<div class="impact-card admin-card">
					<div class="impact-icon">
						<svg viewBox="0 0 32 32" aria-hidden="true">
							<path d="M16 4 12 8 20 8M12 12l8 8M12 12l-8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
						</svg>
					</div>
					<h3 class="impact-title">能力指标</h3>
					<p class="impact-description">69 项指标将作为 2027 年度能力判断口径。</p>
				</div>

				<div class="impact-card admin-card">
					<div class="impact-icon">
						<svg viewBox="0 0 32 32" aria-hidden="true">
							<path d="M16 4l6 6-6 6M6 16h20M6 26h20" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
						</svg>
					</div>
					<h3 class="impact-title">岗位/聘期要求</h3>
					<p class="impact-description">已带入岗位/聘期要求映射，发布后用于教师对照。</p>
				</div>

				<div class="impact-card admin-card">
					<div class="impact-icon">
						<svg viewBox="0 0 32 32" aria-hidden="true">
							<path d="M16 4l-4 4 8 8 4-4M8 16h16M8 26h16" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
						</svg>
					</div>
					<h3 class="impact-title">发展活动</h3>
					<p class="impact-description">教学反思、培训进修、企业实践、虚拟教研将按本版指标归类。</p>
				</div>

				<div class="impact-card admin-card">
					<div class="impact-icon">
						<svg viewBox="0 0 32 32" aria-hidden="true">
							<rect x="6" y="8" width="20" height="16" fill="none" stroke="currentColor" stroke-width="2" />
							<path d="M10 20v6M16 20v6M22 20v6" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
						</svg>
					</div>
					<h3 class="impact-title">成长档案</h3>
					<p class="impact-description">新入档事实将优先关联本执行版指标。</p>
				</div>

				<div class="impact-card admin-card">
					<div class="impact-icon">
						<svg viewBox="0 0 32 32" aria-hidden="true">
							<path d="M16 4l-4 4 8 8 4-4M8 16c0 4.4 3.6 8 8 8s8-3.6 8-8" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
						</svg>
					</div>
					<h3 class="impact-title">画像与报告</h3>
					<p class="impact-description">能力画像、岗位/聘期对照和分析报告将引用本版口径。</p>
				</div>
			</div>
		</div>

		<!-- 发布说明 -->
		<div class="notice-section">
			<div class="notice-card admin-card">
				<div class="notice-icon">
					<svg viewBox="0 0 20 20" aria-hidden="true">
						<circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" stroke-width="1.5" />
						<path d="M9 6l2 2-2 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
					</svg>
				</div>
				<div class="notice-content">
					<h4 class="notice-title">发布说明</h4>
					<p class="notice-text">
						发布后，2027 年度执行版将成为当前周期默认运行口径。2026 年度执行版将保留历史引用记录，不会被覆盖。
					</p>
				</div>
			</div>
		</div>

		<!-- 底部操作 -->
		<div class="action-section">
			<button class="btn-secondary" @click="goBack">返回修改</button>
			<button class="btn-primary" @click="handlePublish">确认发布</button>
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
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.hero-summary {
		display: flex;
		flex-direction: column;
		gap: 12px;
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

	/* 发布影响确认 */
	.impact-section {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.section-title {
		margin: 0;
		font-size: 18px;
		font-weight: 800;
		color: var(--color-text-primary);
	}

	.impact-cards {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 16px;
	}

	.impact-card {
		display: flex;
		flex-direction: column;
		gap: 12px;
		padding: 24px;
		background: white;
		border: 1px solid var(--color-card-border);
		border-radius: 12px;
		transition: all 0.16s ease;
	}

	.impact-card:hover {
		border-color: var(--color-primary);
		box-shadow: 0 4px 12px rgba(47, 191, 155, 0.1);
	}

	.impact-icon {
		display: flex;
		width: 48px;
		height: 48px;
		align-items: center;
		justify-content: center;
		border-radius: 12px;
		background: #f2f7ff;
		color: var(--color-primary);
		margin-bottom: 8px;
	}

	.impact-icon svg {
		width: 24px;
		height: 24px;
	}

	.impact-title {
		margin: 0;
		font-size: 16px;
		font-weight: 800;
		color: var(--color-text-primary);
	}

	.impact-description {
		margin: 0;
		color: #7d899b;
		font-size: 14px;
		line-height: 1.6;
	}

	/* 发布说明 */
	.notice-section {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.notice-card {
		display: flex;
		gap: 16px;
		padding: 20px;
		background: #fff9e6;
		border: 1px solid #ffd700;
		border-radius: 12px;
		align-items: flex-start;
	}

	.notice-icon {
		display: flex;
		width: 40px;
		height: 40px;
		flex-shrink: 0;
		align-items: center;
		justify-content: center;
		background: white;
		border-radius: 50%;
		color: #f59e0b;
	}

	.notice-icon svg {
		width: 20px;
		height: 20px;
	}

	.notice-content {
		flex: 1;
	}

	.notice-title {
		margin: 0 0 8px 0;
		font-size: 16px;
		font-weight: 800;
		color: #92400e;
	}

	.notice-text {
		margin: 0;
		color: #92400e;
		font-size: 14px;
		line-height: 1.6;
	}

	/* 底部操作 */
	.action-section {
		display: flex;
		justify-content: center;
		gap: 16px;
		padding: 24px 0;
	}

	@media (max-width: 768px) {
		.impact-cards {
			grid-template-columns: 1fr;
		}

		.action-section {
			flex-direction: column-reverse;
		}
	}
</style>
