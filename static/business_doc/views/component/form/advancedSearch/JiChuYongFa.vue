<style lang="less"></style>
<template>
	<div>
		<xMd :md="md" class="mb" />
		<xAdvancedSearch mountTo="#xAdvancedSearchStamp">
			<xCard> 通过ID选择器，可以挂载到任意元素 </xCard>
		</xAdvancedSearch>
		<div class="xAdvancedSearch-target" id="xAdvancedSearchStamp"></div>
		<xDivider />
		<xMd :md="'没有mountTo 默认使用xDrawer'" class="mb" />
		<xAdvancedSearch> 没有mountTo 默认使用xDrawer </xAdvancedSearch>
	</div>
</template>
<script lang="ts">
export default async function () {
	const { THIS_FILE_URL } = this;
	return defineComponent({
		data() {
			return { md: "- 通过ID选择器，可以挂载到任意元素 " };
		}
	});
}
</script>
