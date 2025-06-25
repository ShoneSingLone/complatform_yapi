<template>
	<xDialog>
		<xCard>
			<xForm ref="form" col="1">
				<xItem :configs="form.task_name" />
				<xItem :configs="form.task_output_type" />
				<xItem :configs="form.task_ref" />
				<xItem :configs="form.task_remark" />
				<xItem :configs="form.task_action" span="full" />
			</xForm>
		</xCard>
		<template #footer>
			<xBtn :configs="btnOk" />
			<xBtn @click="closeModal">{{ i18n("取消") }}</xBtn>
		</template>
	</xDialog>
</template>
<script lang="ts">
export default async function ({
	cicd_id,
	git_repo_id,
	onSuccess,
	row,
	remote_branches_options,
	git_repo,
	parent,
	$DIALOG_VM
}) {
	const { useDialogProps } = await _.$importVue("/common/utils/hooks.vue");
	const isUpdate = !!row;
	row = row || {};

	async function initRepo() {
		_.$confirm("是否初始化仓库？").then(() => {
			return _.$openModal({
				parent,
				title: "CloneRepo",
				url: "@/views/Api/Project/Tabs/ProjectCi/ProjectCi.GitRepo.Clone.dialog.vue",
				row: git_repo,
				isHideHeader: true,
				onSuccess() {}
			});
		});
	}

	await (async () => {
		try {
			const { data } = await _api.yapi.apiCicdGitBranchInfo({
				git_repo_id
			});
			git_repo = data.git_repo;
			remote_branches_options = _.map(data.branch_info.remoteBranches, i => ({
				label: i,
				value: i
			}));
		} catch (error) {
			_.$msgError(error);
			if (error.message === "GIT仓库未初始化") {
				git_repo = error.data.git_repo;
				$DIALOG_VM.closeModal();
				initRepo();
			}
		}
	})();

	return defineComponent({
		props: useDialogProps(),
		inject: ["APP"],
		data() {
			return {
				form: defItems({
					task_name: {
						value: "",
						label: i18n("任务名称"),
						rules: [_rules.required(), _rules.lessThan(50)]
					},
					task_ref: {
						value: "",
						label: i18n("任务触发分支"),
						itemType: "xItemSelect",
						multiple: true,
						msg: "",
						options: remote_branches_options,
						rules: [_rules.required()],
						itemSlots: {
							afterController() {
								const itemVm = this;

								return hxBtn({
									class: "ml4",
									icon: "refresh",
									async onClick() {
	const { data } = await _api.yapi.apiCicdGitBranchInfo({
				git_repo_id
			});
			git_repo = data.git_repo;
										remote_branches_options = _.map(
											data.branch_info.remoteBranches,
											i => ({
												label: i,
												value: i
											})
										);

										itemVm.configs.options = remote_branches_options;
									}
								});
							}
						}
					},
					task_output_type: {
						value: "ARCHIVE_FILE",
						label: "任务产出类型",
						itemType: "xItemSelect",
						options: [
							{ value: "ARCHIVE_FILE", label: "📦压缩包" },
							{ value: "DO_NOTHING", label: "DO_NOTHING" }
						],
						msg() {
							if (this.value !== "ARCHIVE_FILE") {
								return null;
							}
							return h("xMd", {
								md: `目前只做了前端NodeJs打压缩包的处理，约定了固定的处理方式，以后需要扩展再说吧。`
							});
						}
					},
					task_action: {
						value: `前端压缩包，默认运行
- git pull
- git checkout #{current_commit_hash}
- pnpm i
- pnpm arichive
有复杂需求再说
`,
						label: "任务执行脚本",
						type: "textarea",
						rules: [_rules.required()]
					},
					task_remark: {
						value: "",
						label: "任务说明",
						rules: [_rules.required()]
					}
				})
			};
		},
		setup() {
			const vm = this;
			const git_cmd = "git_cmd";

			/* 当前页可以接受提示信息 */
			onMounted(async () => {
				await _.$ensure(() => vm.APP.WS);
				vm.APP.WS.on(git_cmd, ({ msg }) => {
					vm.form.task_ref.msg = msg;
				});
			});

			onBeforeUnmount(async () => {
				await _.$ensure(() => vm.APP.WS);
				vm.APP.WS.off(git_cmd);
			});

			onMounted(() => {
				if (isUpdate) {
					_.$setFormValues(vm.form, row);
				}
			});

			return {
				btnOk: {
					label: i18n("确定"),
					preset: "primary",
					async onClick() {
						try {
							_.$loading(true);

							const [error] = await _.$validateForm(vm.$el);
							if (error) {
								return;
							}
							const { errcode, data, message } = await _api.yapi.apiCicdTaskAdd({
								...row,
								cicd_id,
								..._.$pickFormValues(vm.form)
							});
							if (_.$isSame(errcode, 0)) {
								onSuccess();
								vm.closeModal();
							}
						} catch (error) {
							_.$msgError(error);
						} finally {
							_.$loading(false);
						}
					}
				}
			};
		}
	});
}
</script>
