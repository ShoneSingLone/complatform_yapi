<template>
	<div class="x-page-view CtyunErrorCenter">
		<xPageContent>
			<div class="flex vertical center middle height100">
				<div class="flex vertical center middle">
					<xIcon icon="icon_mo_notice" class="CtyunErrorCenter-icon" />
					<div class="mt CtyunErrorCenter-title">{{ cptTitle }}</div>
					<div class="mt">{{ cptTips }}</div>
				</div>
			</div>
		</xPageContent>
	</div>
</template>

<script lang="ts">
export default async function () {
	return defineComponent({
		computed: {
			cptTips() {
				return i18n("longTipsLicenseExpired", { date: this.$route.query.result });
			},
			cptTitle() {
				return i18n("licenseExpired");
			}
		}
	});
}
</script>

<style lang="less">
.xIcon.CtyunErrorCenter-icon {
	fill: var(--ti-base-color-warn-4);
	width: 64px;
	height: 64px;
}
.CtyunErrorCenter-title {
	font-size: large;
	font-weight: 600;
}
</style>
