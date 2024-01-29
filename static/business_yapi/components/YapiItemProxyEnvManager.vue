<template>
	<xDialog id="YapiItemProxyEnvManager">
		<xForm col="1">
			<xItem :configs="form.editor" @save="btnOk.onClick" />
		</xForm>
		<template #footer>
			<xBtn :configs="btnOk" />
			<xBtn :configs="btnCancel">{{ i18n("取消") }}</xBtn>
		</template>
	</xDialog>
</template>
<script lang="ts">
export default async function ({}) {
	/* 必要，混入"$closeWindow", "$layerMax", "$layerMin", "$layerRestore" */
	const { useDialogProps } = await _.$importVue("/common/utils/hooks.vue");
	return defineComponent({
		inject: ["APP",],
		props: useDialogProps(),
		data() {
			return {
				form: defItems({
					editor: {
						label: "",
						type: "textarea",
						itemType: "YapiItemMonaco",
						value: JSON.stringify(this.APP.cptProject.env)
					},
					witchEnv: {
						value: "",
						label: i18n("转发环境"),
						itemType: "YapiItemProxyEnv"
					}
				})
			};
		},
		computed: {
			btnOk() {
				const vm = this;
				return {
					label: "确定",
					preset: "blue",
					onClick: async () => {
						try {
							const dataForm = {
								env: JSON.parse(this.form.editor.value),
								id: this.APP.cptProjectId
							};
							await _api.yapi.project_update(dataForm);
							this.APP.updateGroupProjectList();
							_.$msgSuccess("更新成功");
						} catch (error) {
							_.$msgError(error);
						}
					}
				};
			},
			btnCancel() {
				return {
					label: i18n("取消"),
					onClick: async () => {
						this.$closeWindow();
					}
				};
			}
		},
		methods: {}
	});
}
</script>
<style lang="less">
#YapiItemProxyEnvManager {
	width: 1024px;
	.el-card__body {
		min-height: 100px;
	}
}
</style>
