<template>
	<xDialog id="ProjectSettingConfirmMergeInterfaceDialog">
		<xAlert title="不保留旧数据，完全使用新数据。数据同步后，可能会造成原本的修改数据丢失" type="warning" />
		<div class="postman-dataImport-modal flex1">
			<div class="postman-dataImport-modal-content">
				<div :key="index" class="postman-dataImport-show-diff" v-for="(item, index) in domainData">
					<span class="logcontent" v-html="item.content" />
				</div>
			</div>
			<div class="padding">
				{{ cptTaskNotice }}
			</div>
		</div>
		<template #footer>
			<xBtn :configs="btnOk" />
			<xBtn :configs="btnCancel">{{ i18n("取消") }}</xBtn>
		</template>
	</xDialog>
</template>
<script lang="ts">
export default async function ({ domainData, originData, allCategory, dataSync }) {
	const token = "";
	/* 必要，混入"$closeWindow", "$layerMax", "$layerMin", "$layerRestore" */
	const { useDialogProps } = await _.$importVue("/common/utils/hooks.vue");
	return defineComponent({
		inject: ["APP"],
		props: useDialogProps(),
		data() {
			return {
				domainData,
				successNum: 0,
				existNum: 0,
				hasDone: 0,
				apis: originData.apis,
				apisTotal: originData.apis.length
			};
		},
		computed: {
			cptTaskNotice() {
				if (this.hasDone === this.apisTotal) {
					let exist = this.existNum ? "，其中" + this.existNum + "个接口已存在" : "";
					return `数据已全部导入，共执行任务 ${this.hasDone} 个${exist}`;
				}
				if (this.hasDone) {
					return `正在导入，已执行任务 ${this.hasDone} 个，共 ${this.apisTotal} 个`;
				}
				return `需要导入的接口共 ${this.apisTotal} 个`;
			},
			btnOk() {
				const vm = this;
				const label = (function () {
					if (dataSync === "normal") {
						return "只导入新增接口";
					}
					if (dataSync === "good") {
						return "智能合并";
					}
					return "全部覆盖";
				})();
				return {
					label,
					disabled() {
						return !_.$isArrayFill(vm.apis);
					},
					onClick: async () => {
						return this.handleAddInterface();
					}
				};
			},
			btnCancel() {
				return {
					label: i18n("取消"),
					preset: "blue",
					onClick: async () => {
						this.$closeWindow();
					}
				};
			}
		},
		methods: {
			async preprocessCategory(cats) {
				try {
					const vm = this;
					let catsObj = {};
					if (_.isArray(cats)) {
						for (let i = 0; i < cats.length; i++) {
							let cat = cats[i];
							let findCat = _.find(allCategory, { name: cat.name });
							catsObj[cat.name] = cat;
							/* 如果已经存在，直接使用 */
							if (findCat) {
								cat.id = findCat._id;
							} else {
								/* 调用接口=>新增  */
								let res = await _api.yapi.interfaceAddCat({
									name: cat.name,
									project_id: vm.APP.cptProjectId,
									desc: cat.desc
								});
								if (res?.errcode === 0) {
									cat.id = res._id;
								} else {
									throw new Error(res.message);
								}
							}
						}
					}
					return catsObj;
				} catch (error) {
					_.$msgError(error);
					return false;
				}
			},
			async handleAddInterface() {
				_.$loading(true);
				try {
					const vm = this;
					const cats = await this.preprocessCategory(originData.cats);
					if (cats === false) {
						return;
					}
					let { basePath } = originData;
					vm.hasDone = 0;
					vm.successNum = 0;
					const projectId = vm.APP.cptProjectId;

					/* 如果有公用前缀 */
					if (basePath) {
						await _api.yapi.project_update({
							id: projectId,
							basepath: basePath
							/* token */
						});
					}

					let api;
					while ((api = vm.apis.pop())) {
						try {
							let interfaceInfo = Object.assign(api, {
								project_id: projectId
							});
							if (basePath) {
								interfaceInfo.path = interfaceInfo.path.indexOf(basePath) === 0 ? interfaceInfo.path.substr(basePath.length) : interfaceInfo.path;
							}
							if (interfaceInfo.catname && cats[interfaceInfo.catname] && typeof cats[interfaceInfo.catname] === "object" && cats[interfaceInfo.catname].id) {
								interfaceInfo.catid = cats[interfaceInfo.catname].id;
							}
							interfaceInfo.token = token;
							if (dataSync === "normal") {
								// normal
								let res = await _api.yapi.interface_add(interfaceInfo);
								if (res.errcode) {
									if (res.errcode === 40022) {
										vm.existNum++;
									} else {
										_.$msgError(res);
									}
								} else {
									vm.successNum++;
								}
							} else {
								// merge good
								interfaceInfo.dataSync = dataSync;
								let res = await _api.yapi.interface_upsert(interfaceInfo);
								if (res.errcode) {
									_.$msgError(res);
								} else {
									vm.successNum++;
								}
							}
						} catch (error) {
						} finally {
							vm.hasDone++;
						}
					}
				} catch (error) {
					_.$msgError(error);
				} finally {
					_.$loading(false);
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
