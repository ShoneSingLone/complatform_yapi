<template>
	<section id="ViewOffice">
		<AppHeader class="is-show-header" />
		<div class="flex1-overflow-auto flex">
			<div
				id="luckysheet"
				style="
					margin: 0px;
					padding: 0px;
					position: absolute;
					width: 100%;
					height: 100%;
					left: 0px;
					top: 0px;
				"></div>
		</div>
	</section>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["APP"],
		provide() {
			const inject_office = this;
			return {
				inject_office
			};
		},
		components: {
			AppHeader: () => _.$importVue("@/views/Api/Header/ApiHeader.vue")
		},
		async mounted() {
			_.$appendStyle(
				"https://cdn.jsdelivr.net/npm/luckysheet/dist/plugins/css/pluginsCss.css"
			);

			_.$appendStyle("https://cdn.jsdelivr.net/npm/luckysheet/dist/plugins/plugins.css");
			_.$appendStyle("https://cdn.jsdelivr.net/npm/luckysheet/dist/css/luckysheet.css");
			_.$appendStyle(
				"https://cdn.jsdelivr.net/npm/luckysheet/dist/assets/iconfont/iconfont.css"
			);

			await _.$appendScript("@/assets/js/luckysheet.plugin.js");
			window.luckysheetPlugin = _.noConflict();
			const luckysheet = await _.$appendScript("@/assets/js/luckysheet.umd.js", "luckysheet");
			// 初始化表格
			var options = {
				container: "luckysheet" //luckysheet为容器id
			};
			luckysheet.create(options);
		},
		setup() {}
	});
}
</script>

<style lang="less">
#ViewOffice {
	height: 100%;
	width: 100%;
	display: flex;
	flex-flow: column nowrap;
	&.is-show-header {
		flex-flow: column nowrap;
	}
}
</style>
