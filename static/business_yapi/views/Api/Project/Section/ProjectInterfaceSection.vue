<style lang="less">
#ProjectInterfaceSection {
	width: 1px;
}
</style>

<template>
	<section id="ProjectInterfaceSection" class="page-view flex1">
		<xPageContent>
			<ProjectInterfaceSectionInterfaceDetail v-if="cptInterfaceType === 'interface'" />
			<ProjectInterfaceSectionInterfaceList v-else />
		</xPageContent>
	</section>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["APP", "inject_project"],
		components: {
			ProjectInterfaceSectionInterfaceDetail: () => _.$importVue("@/views/Api/Project/Section/ProjectInterfaceSectionInterfaceDetail.vue"),
			ProjectInterfaceSectionInterfaceList: () => _.$importVue("@/views/Api/Project/Section/ProjectInterfaceSectionInterfaceList.vue")
		},
		provide() {
			return { inject_project_interface_section: this };
		},
		data() {
			const vm = this;

			const catid = {
				prop: "catid",
				label: i18n("接口分类"),
				width: 150,
				cellRenderer({ rowData }) {
					const label = _.find(vm.inject_project.allCategory, { _id: rowData.catid }).name;
					return label;
				}
			};

			const title = {
				prop: "title",
				label: i18n("接口名称"),
				cellRenderer({ rowData }) {
					return _useXui.render.Link({
						label: rowData.title,
						title: rowData.title,
						style: "text-align:left;",
						href: _.$aHashLink("/api/project", {
							...vm.$route.query,
							interfaceType: "interface",
							interfaceId: rowData._id
						})
					});
				}
			};

			const method = {
				prop: "method",
				label: i18n("请求方法"),
				width: 100
			};

			const path = {
				prop: "path",
				label: i18n("接口路径")
			};

			const status = {
				prop: "status",
				label: i18n("状态"),
				width: 150
			};

			const isProxy = {
				prop: "isProxy",
				label: i18n("转发"),
				width: 150,
				cellRenderer: params => {
					const { rowData } = params;
					return h("xTag", { type: rowData.isProxy ? "success" : "info" }, [rowData.isProxy ? "是" : "否"]);
				}
			};
			const isUseBackup = {
				prop: "isUseBackup",
				label: i18n("启用备份数据"),
				width: 100,
				cellRenderer: params => {
					const { rowData } = params;

					const tag = (() => {
						const isUseBackup = rowData.res_body_type === "backup" && !rowData.isProxy;
						return h("xTag", { type: isUseBackup ? "success" : "info" }, ["是"]);
					})();

					return [tag, !rowData.isSetBackupData && h("xTag", { type: "warning", class: "ml8" }, ["无备份数据"])];
				}
			};

			const maintainer = {
				prop: "tag",
				label: i18n("维护人"),
				width: 150
			};
			const tag = {
				prop: "tag",
				label: i18n("Tags"),
				width: 250
			};

			return {
				data: [],
				configsTable: defTable({
					onQuery() {
						filterListForm();
					},
					data: {
						set: new Set(),
						list: []
					},
					columns: [
						defTable.colMultiple({
							by: "_id",
							getConfigs() {
								return vm.configsTable;
							}
						}),
						{
							prop: "order",
							label: "序号",
							width: 60,
							cellRenderer({ rowIndex }) {
								return h("div", { style: "width:100%;text-align:right;" }, [rowIndex + 1]);
							}
						},
						catid,
						title,
						method,
						path,
						status,
						maintainer,
						isProxy,
						isUseBackup,
						tag
					]
				}),
				form: defItems({
					path: {
						label: "接口路径",
						value: "",
						clearable: true,
						onEnter: () => {
							this.filterList();
						}
					}
				})
			};
		},
		computed: {
			cptInterfaceType() {
				return this.$route.query.interfaceType;
			}
		},
		watch: {
			"inject_project.allInterface": {
				immediate: true,
				handler() {
					this.filterList();
				}
			}
		},
		methods: {
			resetFilter() {
				_.$setValToForm(this.form, {
					path: ""
				});
				this.$nextTick(() => {
					this.filterList();
				});
			},
			filterList() {
				let configsTableDataList = (() => {
					const filterForm = _.$pickValueFromConfigs(this.form);
					let _allInterface = _.cloneDeep(this.inject_project.allInterface);

					let paramKeys = Object.keys(filterForm);
					let prop;
					while ((prop = paramKeys.pop())) {
						const search = _.trim(filterForm[prop]);
						if (_.$isInput(search)) {
							_allInterface = _.filter(_allInterface, i => {
								if (prop == "status") {
									return search.includes(i.status);
								} else if (prop == "catid") {
									return search.includes(i.catid);
								} else if (prop == "method") {
									return search.includes(i.method);
								} else if (prop == "tag") {
									return _.some(i.tag, tag => search.includes(tag));
								} else if (prop == "isUseBackup") {
									if (search.includes("是")) {
										return i.res_body_type === "backup";
									}
									if (search.includes("否")) {
										return i.res_body_type !== "backup";
									}
									if (search.includes("无备份数据")) {
										if (!i.isSetBackupData) {
											return true;
										}
									}
									return false;
								} else if (prop == "witchEnv") {
									if (search.includes("unset")) {
										if (!i.witchEnv) {
											return true;
										}
									}
									if (!i.isProxy) {
										return false;
									}
									return search.includes(i.witchEnv);
								} else {
									return new RegExp(search, "i").test(i[prop]);
								}
							});
						}
						prop = paramKeys.pop();
					}
					return _allInterface;
				})();

				_.$setTableData(this.configsTable, { list: configsTableDataList });
			}
		}
	});
}
</script>
