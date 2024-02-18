<template>
	<xDialog id="ProjectSettingConfirmMergeInterfaceDialog">
		<xForm col="2">
			<div span="full">
				<xBtn :configs="btnRun" />
				<xBtn :configs="btnSave" />
			</div>
			<xItem :configs="form.editor" />
			<div class="padding">
				<xBlock header="响应详情" class="flex vertical" :bodyClass="{ 'overflow-auto flex flex1': true }" style="height: 500px">
					<xMd :md="cptCode" />
				</xBlock>
			</div>
		</xForm>
		<template #footer>
			<xBtn :configs="btnOk" />
			<xBtn :configs="btnCancel">{{ i18n("取消") }}</xBtn>
		</template>
	</xDialog>
</template>
<script lang="ts">
export default async function ({ mockHref, reqMethod, interfaceId, projectId }) {
	const token = "";
	/* 必要，混入"$closeWindow", "$layerMax", "$layerMin", "$layerRestore" */
	const { useDialogProps } = await _.$importVue("/common/utils/hooks.vue");
	return defineComponent({
		inject: ["APP", "inject_project"],
		props: useDialogProps(),
		data() {
			return {
				response: "",
				form: defItems({
					editor: {
						type: "textarea",
						itemType: "YapiItemMonaco",
						language: "javascript",
						value: ``
					}
				})
			};
		},
		mounted() {
			this.setEditorValue();
		},
		computed: {
			cptCode() {
				let response = "";
				try {
					if (this.response) {
						response = JSON.stringify(this.response, null, 2);
					}
				} catch (error) {
					console.error(error);
				}
				if (response) {
					return `\`\`\`json
${response}
\`\`\``;
				}
				return response;
			},
			btnRun() {
				const vm = this;
				vm.response = "";
				return {
					label: i18n("运行"),
					onClick() {
						vm.run();
					}
				};
			},
			btnSave() {
				const vm = this;
				vm.response = "";
				return {
					label: i18n("保存用例"),
					preset: "blue",
					onClick() {
						vm.saveUseCase();
					}
				};
			},
			btnOk() {
				const vm = this;
				return {
					label: i18n("确定"),
					async onClick() {
						vm.$closeWindow();
					}
				};
			},
			btnCancel() {
				const vm = this;
				return {
					label: i18n("取消"),
					preset: "blue",
					async onClick() {
						vm.$closeWindow();
					}
				};
			}
		},
		methods: {
			async saveUseCase() {
				try {
					const id = this.currentUseCase?._id;
					const dataForm = {
						id,
						interfaceId,
						projectId,
						usecaseCode: this.form.editor.value
					};
					await _api.yapi.interface_usecase_upsert(dataForm);
					this.APP.updateGroupProjectList();
					_.$msgSuccess("更新成功");
				} catch (error) {
					_.$msgError(error);
				}
			},
			async setEditorValue() {
				try {
					const res = await _api.yapi.interface_usecase_get_all(interfaceId);
					if (!res.errcode) {
						const { data } = res;
						if (data.length > 0) {
							this.form.editor.value = data[0].usecaseCode;
							this.currentUseCase = data[0];
						}
					}
				} catch (error) {
					_.$msgError(error);
				}
			},
			async run() {
				await _.$appendScript("/common/libs/axios.js", "axios");
				let fnRun;
				try {
					fnRun = new Function(`${this.form.editor.value}
	return run();
`);
					this.response = await fnRun();
				} catch (error) {
					console.error(error);
					_.$msgError(error);
				}
			}
		}
	});
}
</script>
<style lang="less">
#ProjectSettingConfirmMergeInterfaceDialog {
	height: 100%;
	.el-card__body {
		min-height: 100px;
	}
}
</style>
