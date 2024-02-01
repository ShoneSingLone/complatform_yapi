<template>
	<div class="YapiItemMonaco mt" ref="refMonacoContainer" />
</template>

<script lang="ts">
export default async function () {
	const { mixins } = await _.$importVue("/common/ui-x/common/ItemMixins.vue");
	return defineComponent({
		mixins: [mixins],
		inject: ["APP", "xItem"],
		props: ["value", "options", "configs"],
		async mounted() {
			const vm = this;
			const container = this.$refs.refMonacoContainer;
			const require = await _.$appendScript("//repo.bfw.wiki/bfwrepo/js/monaco-editor/loader.js", "require");
			require.config({ paths: { vs: "//repo.bfw.wiki/bfwrepo/js/monaco-editor" } });
			require(["vs/editor/editor.main"], function () {
				const { monaco } = window;
				vm.raw$editor = monaco.editor.create(container, {
					value: vm.mixin_value || "",
					language: vm.configs?.language || "json"
				});
				vm.raw$editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, function () {
					vm.raw$editor.getAction("editor.action.formatDocument").run();
					vm.xItem.$emit("save");
				});
				vm.$nextTick(() => {
					vm.raw$editor.getAction("editor.action.formatDocument").run();
					vm.raw$editor.onDidChangeModelContent(vm.syncData);
				});
			});
		},
		methods: {
			syncData() {
				const newCode = this.raw$editor.getValue();
				if (newCode !== this.mixin_value) {
					this.mixin_value = newCode;
				}
			}
		}
	});
}
</script>

<style lang="less">
.YapiItemMonaco {
	width: 100%;
	height: 800px;
}
</style>
