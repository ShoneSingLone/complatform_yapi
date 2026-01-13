<style lang="less"></style>
<template>
	<div style="--xItem-wrapper-width: 100%">
		<xItem :configs="form.bucketPolicies" />
		<div>{{ form.bucketPolicies.value }}</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		components: {
			xItemRadioGroup: () => _.$importVue("/common/ui-x/common/xItem/xItemRadioGroup.vue")
		},
		data() {
			return {
				form: defItems({
					bucketPolicies: {
						value: "",
						itemType: "xItemRadioGroup",
						label: i18n("桶策略"),
						minWidth: 180,
						isUseBorder: true,
						options: [
							{
								label: "私有",
								value: "private"
							},
							{
								label: "公共读",
								value: "public-read",
								tips: "中风险",
								type: "warning"
							},
							{
								label: "公共读写",
								value: "public-read-write",
								tips: "高风险",
								type: "danger"
							}
						],
						renderOption(item) {
							if (item.tips) {
								return hDiv([
									item.label,
									h("xTag", { type: item.type }, [item.tips])
								]);
							} else {
								return item.label;
							}
						},
						rules: [_rules.required()]
					}
				})
			};
		}
	});
}
</script>
