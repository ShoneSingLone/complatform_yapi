<template>
	<div class="card-JianDanKaPian">
		<xMd :md="md" />
		<div class="flex middle">
			<xAvatar icon="el-icon-user-solid"></xAvatar>
			<xAvatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></xAvatar>
			<xAvatar> user </xAvatar>
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				md: "支持三种类型：图标、图片和字符"
			};
		}
	});
}
</script>
<style lang="less"></style>
