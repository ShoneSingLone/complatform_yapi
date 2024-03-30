<template>
	<DocContentOfDemo class="demo-input">
		<xMd :md="mdTips" />
		<DemoAndCode title="基础用法" path="@/views/component/form/switch/JiChuYongFa.vue" unfold />
		<DemoAndCode title="文字描述" path="@/views/component/form/switch/WenZiMiaoShu.vue" unfold />
		<DemoAndCode title="扩展的 value 类型" path="@/views/component/form/switch/KuoZhanDeValueLeiXing.vue" unfold />
		<xMd :md="apiString" />
	</DocContentOfDemo>
</template>

<script lang="ts">
export default async function () {
	return {
		data() {
			return {
				mdTips: "## Switch 开关\n\n表示两种相互对立的状态间的切换，多用于触发「开/关」。",
				apiString: ` `
			};
		}
	};
}
</script>

<style lang="less"></style>
