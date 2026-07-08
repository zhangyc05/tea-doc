<script setup lang="ts">
	import { computed, ref } from 'vue'
	import { useRoute } from 'vue-router'

	import AdminSidebar from '@/components/layout/AdminSidebar.vue'
	import AdminTopbar from '@/components/layout/AdminTopbar.vue'
	import AppBreadcrumb from '@/components/layout/AppBreadcrumb.vue'
	import FloatingAIAssistant from '@/components/layout/FloatingAIAssistant.vue'
	import backgroundImage from '@/images/background-image@2x.png'

	const props = withDefaults(
	  defineProps<{
	    activeKey?: string
	    breadcrumb?: string[]
	    pageTitle?: string
	  }>(),
	  {
	    activeKey: '',
	    breadcrumb: undefined,
	    pageTitle: '',
	  },
	)

	const route = useRoute()

	const resolvedActiveKey = computed(() => props.activeKey || String(route.meta.menuKey ?? 'training-resources'))
	const resolvedBreadcrumb = computed(() => {
	  if (props.breadcrumb?.length) return props.breadcrumb
	  return Array.isArray(route.meta.breadcrumb) ? (route.meta.breadcrumb as string[]) : ['管理端']
	})

	// 侧边栏折叠状态管理
	const sidebarCollapsed = ref(false)
	const toggleSidebar = () => {
	  sidebarCollapsed.value = !sidebarCollapsed.value
	}
	const handleNavigate = () => {
	  sidebarCollapsed.value = false
	}
</script>

<template>
	<div class="admin-layout">
		<AdminSidebar :active-key="resolvedActiveKey" :collapsed="sidebarCollapsed" @toggle="toggleSidebar" @navigate="handleNavigate" />

		<div class="admin-frame">
			<div
				class="admin-main-background"
				:style="{ backgroundImage: `url(${backgroundImage})` }"
				aria-hidden="true"
			/>
			<AdminTopbar />

			<main class="admin-main">
				<div class="admin-content-shell">
					<AppBreadcrumb class="sr-only" :items="resolvedBreadcrumb" />
					<section>
						<slot />
					</section>
				</div>
			</main>
		</div>

		<FloatingAIAssistant scene="admin" />
	</div>
</template>

<style scoped>
	.admin-layout {
		display: flex;
		min-height: 100vh;
		background: var(--color-page-bg);
		color: var(--color-text-primary);
	}

	.admin-frame {
		position: relative;
		display: flex;
		min-width: 0;
		flex: 1;
		flex-direction: column;
		overflow: hidden;
	}

	.admin-frame::before {
		position: absolute;
		inset: 0;
		z-index: 1;
		background: rgba(255, 255, 255, 0.48);
		content: '';
		pointer-events: none;
	}

	.admin-main {
		position: relative;
		z-index: 1;
		flex: 1;
		padding: var(--admin-page-gutter-y) var(--admin-page-gutter-x);
	}

	.admin-main-background {
		position: absolute;
		inset: 0;
		z-index: 0;
		background-color: var(--color-admin-bg);
		background-position: right top;
		background-repeat: no-repeat;
		background-size: cover;
		pointer-events: none;
	}

	.admin-content-shell {
		position: relative;
		z-index: 1;
		width: 100%;
		max-width: var(--admin-content-max-width);
	}

	@media (max-width: 1280px) {
		.admin-main {
			overflow-x: auto;
		}

		.admin-content-shell {
			min-width: 980px;
		}
	}
</style>
