<style lang="less"></style>
<template>
	<div class="height100 flex vertical">
		<xTablebar style="--xItem-wrapper-width: 424px; --xItem-label-width: 76px" :configs="inject_project_interface_section.configsTable">
			<template #left>
				<xBtn :configs="btnChaneProxy" />
			</template>
			<xItem :configs="inject_project_interface_section.form.path" />
			<template #right>
				<xBtn :configs="btnRest" class="ml4" />
			</template>
		</xTablebar>

		<div class="flex1 mt">
			<xTableVir :columns="inject_project_interface_section.configsTable.columns" :data="inject_project_interface_section.configsTable.data.list" fixed />
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["APP", "inject_project", "inject_project_interface_section"],
		computed: {
			btnChaneProxy() {
				return {
					label: "切换代理",
					disabled: () => {
						return this.inject_project_interface_section.configsTable.data.set.size === 0;
					},
					onClick: () => {
						return this.changeProxy();
					}
				};
			},
			btnRest() {
				return {
					label: "重置",
					onClick: () => {
						return this.inject_project_interface_section.resetFilter();
					}
				};
			}
		},
		methods: {
			async changeProxy() {
				const DialogTypeVueSFC = await _.$importVue("@/components/YapiChangeProxyDialog.vue", {
					parent: this,
					selected: Array.from(this.inject_project_interface_section.configsTable.data.set)
				});
				const vm = _.$openWindow(i18n("切换代理"), DialogTypeVueSFC, {
					maxmin: true,
					fullscreen: false
				});
			}
		}
	});
}
</script>
