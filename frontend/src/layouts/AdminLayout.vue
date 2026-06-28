<script setup lang="ts">
	import { computed, ref } from 'vue'
	import { useRoute } from 'vue-router'

	import AdminSidebar from '@/components/layout/AdminSidebar.vue'
	import AdminTopbar from '@/components/layout/AdminTopbar.vue'
	import AppBreadcrumb from '@/components/layout/AppBreadcrumb.vue'
	import FloatingAIAssistant from '@/components/layout/FloatingAIAssistant.vue'

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
	const sidebarCollapsed = ref(true)
	const toggleSidebar = () => {
	  sidebarCollapsed.value = !sidebarCollapsed.value
	}
</script>

<template>
	<div class="admin-layout">
		<AdminSidebar :active-key="resolvedActiveKey" :collapsed="sidebarCollapsed" @toggle="toggleSidebar" />

		<div class="admin-frame">
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
		display: flex;
		min-width: 0;
		flex: 1;
		flex-direction: column;
	}

	.admin-main {
		flex: 1;
		padding: var(--admin-page-gutter-y) var(--admin-page-gutter-x);
	}

	.admin-content-shell {
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
