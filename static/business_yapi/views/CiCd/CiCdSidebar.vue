<style lang="less">
#CiCdSidebar {
	/* 侧边栏样式 */
	&.sidebar {
		width: 280px;
		background: #1a202c;
		color: white;
		padding: 0;
		position: relative;
		height: 100%;
		overflow-y: auto;
	}

	.sidebar-header {
		padding: var(--ui-one) 20px;
		border-bottom: 1px solid #2d3748;
	}

	.logo {
		font-size: 20px;
		font-weight: 700;
		color: #63b3ed;
	}

	.nav-menu {
		padding: 20px 0;
	}

	.nav-item {
		display: block;
		padding: 12px 20px;
		color: #a0aec0;
		text-decoration: none;
		transition: all 0.2s;
		border-left: 3px solid transparent;
	}

	.nav-item:hover,
	.nav-item.active {
		background: #2d3748;
		color: white;
		border-left-color: #63b3ed;
	}

	.nav-item i {
		margin-right: 12px;
		width: 16px;
	}
}
</style>
<template>
	<nav class="sidebar" id="CiCdSidebar">
		<div class="sidebar-header">
			<div class="logo">🚀 CI/CD Platform</div>
		</div>
		<div class="nav-menu">
			<a :href="menu.href" class="nav-item" v-for="menu in menuArray" :key="menu.id">
				<i>{{ menu.icon }}</i> {{ menu.title }}
			</a>
		</div>
	</nav>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		setup() {
			const vm = this;

			watch(
				() => vm.$route.path,
				async path => {
					let $el;
					await _.$ensure(() => {
						$el = $(vm.$el);
						return !!$el?.length;
					});
					$el.find(".nav-item").removeClass("active");
					const $target = $el.find(`[href*="${path}"`);
					$target.addClass("active");
				},
				{ immediate: true }
			);

			return {
				menuArray: _.map(
					[
						{ href: "/cicd/dashboard", title: "仪表板", id: "dashboard", icon: "📊" },
						{ href: "/cicd/task_list", title: "任务配置", id: "task", icon: "📁" },
						{ href: "/cicd/builds", title: "构建历史", id: "builds", icon: "🔨" },
						{
							href: "/cicd/artifacts",
							title: "产出物管理",
							id: "artifacts",
							icon: "📦"
						},
						{
							href: "/cicd/webhooks",
							title: "Webhook配置",
							id: "webhooks",
							icon: "🔗"
						},
						{ href: "/cicd/settings", title: "系统设置", id: "settings", icon: "⚙️" }
					],
					menu => {
						menu.href = _.$aHashLink(menu.href, vm.$route.query);
						return menu;
					}
				)
			};
		}
	});
}
</script>
