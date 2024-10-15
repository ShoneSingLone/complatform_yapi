<style lang="less">
#ProjectInterfaceSectionInterfaceDetailEditor {
	height: 100%;
	overflow: auto;
}
</style>
<template>
	<div v-if="isShow" id="ProjectInterfaceSectionInterfaceDetailEditor" class="flex1">
		<xCard>
			<div class="flex middle">
				<xItem :configs="form.path" v-model="formData.path" class="mr" />
				<xBtn :configs="btnRunTest" />
			</div>
		</xCard>
		<xGap t />
		<div class="flex middle">
			<xGap f />
			<xBtn :configs="btnUpdate" />
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["APP", "inject_project", "inject_interface_section_interface_detail"],
		props: {
			interfaceInfo: {
				type: Object,
				default() {
					return {};
				}
			}
		},
		setup() {
			return {
				btnRunTest: {
					preset: "primary",
					label: "运行"
				}
			};
		},
		data() {
			const vm = this;
			return {
				isShow: true,
				formData: {},
				xItemInterface: {
					label: "接口信息",
					itemType: "xItemMonaco"
				},
				form: defItems({
					method: {
						itemType: "xItemSelect",
						options: _opts.yapi.httpMethod
					},
					path: {
						$vSlots: {
							prepend() {
								return hxItem({
									configs: vm.form.method,
									value: vm.formData.method,
									onChange(val) {
										if (vm.formData.method !== val) {
											vm.formData.method = val;
										}
									},
									style: `--xItem-wrapper-width:106px`
								});
							}
						}
					}
				})
			};
		},
		computed: {
			cptFormDataResBackupJson: {
				get() {
					return this.formData.resBackupJson || "";
				},
				set(req_params) {
					this.formData.resBackupJson = req_params;
					return true;
				}
			},
			cptFormDataReqParams: {
				get() {
					return this.formData.req_params || [];
				},
				set(req_params) {
					this.formData.req_params = req_params;
					return true;
				}
			},
			btnUpdate() {
				return {
					label: "更新",
					preset: "blue",
					onClick: () => {
						return this.onSubmit();
					}
				};
			}
		},
		methods: {
			async onSubmit() {
				const [atLeastOne] = await _.$validateForm(this.$el);
				if (atLeastOne) {
					return;
				}
				_.$loading(true);
				try {
					const formData = this.formData;
					const { data } = await _api.yapi.interface_up(formData);
					if (data) {
						this.inject_project.getInterfaceList();
						this.inject_interface_section_interface_detail.updateInterface();
					}
					_.$msg("修改成功");
				} catch (error) {
					_.$msgError("修改失败");
				} finally {
					_.$loading(false);
				}
			}
		},
		watch: {
			"APP.cptInterfaceId": {
				immediate: true,
				handler(val) {
					this.isShow = false;
					this.formData = {
						...this.interfaceInfo
					};

					this.$nextTick(() => {
						this.isShow = true;
					});
				}
			}
		}
	});
}
</script>
