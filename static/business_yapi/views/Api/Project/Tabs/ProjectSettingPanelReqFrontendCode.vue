<style lang="less"></style>
<template>
	<div>
		<xForm col="2">
			<xItem :configs="form.editor" @save="btnOk.onClick" style="height: 500px" />
			<div class="padding">
				<xMd :md="cptCode" />
			</div>
		</xForm>
		<xBtn :configs="btnOk" />
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["APP", "inject_project"],
		data() {
			return {
				mdTips: ``,
				form: defItems({
					editor: {
						label: "",
						type: "textarea",
						itemType: "YapiItemMonaco",
						language: "javascript",
						value: ""
					}
				})
			};
		},
		watch: {
			"APP.cptProject.requestCode": {
				immediate: true,
				handler() {
					const requestCode = function RequestCode({ title, projectId, groupId, interfaceId, path, method, camelCase }) {
						return `\`\`\`js
/**
*  ${title}
*  ${window.location.href}/#/api/project?projectId=${projectId}&groupId=${groupId}&interfaceType=interface&interfaceId=${interfaceId}&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
*/
async ${camelCase(path)}({params,data}) {
	return await request({
		method: "${method}",
		url: \`${path}\`,
		params:params||{},
		data:data||{}
	});
}
\`\`\`
`;
					};

					const code = this.APP.cptProject.requestCode || requestCode.toString();
					this.form.editor.value = code;
				}
			}
		},
		computed: {
			cptCode() {
				try {
					const requestCode = this.returnRequestCode();
					const code = requestCode({
						title: "TitleDemo",
						path: "/path/demo",
						method: "GET",
						groupId: "1",
						projectId: "2",
						interfaceId: "3",
						camelCase: _.camelCase
					});
					return code;
				} catch (error) {
					return error.message;
				}
			},
			btnOk() {
				const vm = this;
				return {
					label: "确定",
					preset: "blue",
					onClick: async () => {
						try {
							const dataForm = {
								requestCode: this.form.editor.value,
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
			}
		},
		methods: {
			returnRequestCode() {
				try {
					const fn = new Function("params", `return (${this.form.editor.value})(params)`);
					return fn;
				} catch (error) {
					return () => error.message;
				}
			}
		}
	});
}
</script>
