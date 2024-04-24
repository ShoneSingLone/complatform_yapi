<style lang="less"></style>
<template>
	<div class="el-page-header xPageHeader">
		<div class="el-page-header__left" @click="$emit('back')">
			<i class="el-icon-back"></i>
			<div class="el-page-header__title">
				<slot name="title">{{ title }}</slot>
			</div>
		</div>
		<div class="el-page-header__content">
			<slot name="content">{{ content }}</slot>
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		name: "ElPageHeader",
		props: {
			title: {
				type: String,
				default() {
					return i18n("el.pageHeader.title");
				}
			},
			content: String
		}
	});
}
</script>
