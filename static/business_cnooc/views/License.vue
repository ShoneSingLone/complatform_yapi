<style lang="less">
#license-page {
	.descriptions-style1 {
		&.xForm {
			--xItem-label-width: 200px;
			border-left: 1px solid var(--el-border-color);
			border-bottom: 1px solid var(--el-border-color);
			.xFormItem {
				border-top: 1px solid var(--el-border-color);
				border-right: 1px solid var(--el-border-color);
				margin-top: 0;
				margin-right: 0;
				.xItemDesc-wrapper {
					padding: 0;
					height: 100%;
					> div {
						height: 100%;
						line-height: 48px;
						&.xItemDesc-wrapper_label {
							padding-left: var(--ui-one);
							border-right: 1px solid var(--el-border-color);
							background-color: var(--el-fill-color-lighter);
						}
						&.xItemDesc-wrapper_content {
							padding-left: var(--ui-one);
						}
					}
				}
			}
		}
	}
}
</style>

<template>
	<div class="x-page-view">
		<xPageTitle>
			<template #title>
				<span class="mr">{{ i18n("License") }}</span>
				<xGap f />
			</template>
			<xBtn :configs="btnImportLicense" />
		</xPageTitle>
		<xPageContent style="--xItem-label-width: 200px" id="license-page">
			<xCard header="基本信息">
				<xForm col="3" class="descriptions-style1">
					<xItemDesc v-for="(item, index) in itemsBaseInfo" :key="index" :item="item" />
				</xForm>
			</xCard>
			<xGap t />
			<xCard header="控制详情">
				<xForm col="3" class="descriptions-style1">
					<xItemDesc v-for="(item, index) in itemsDetial" :key="index" :item="item" />
				</xForm>
			</xCard>
		</xPageContent>
	</div>
</template>

<script lang="ts">
export default async function () {
	return {
		inject: ["APP"],
		data() {
			const vm = this;
			_.$loading();
			return {
				itemsBaseInfo: [
					{ label: i18n("License文件名称"), value: "kooriookami" },
					{ label: i18n("激活时间"), value: "18100000000" },
					{ label: i18n("到期时间"), value: "Suzhou" }
				],
				itemsDetial: [{ label: i18n("物理主机CPU个数"), value: "kooriookami" }, { label: i18n("物理主机CPU已纳管个数"), value: "18100000000" }, { isEmpty: true }]
			};
		},
		methods: {
			setFormInfo(formData) {
				this.itemsBaseInfo = [
					{ label: i18n("License文件名称"), value: "kooriookami" },
					{ label: i18n("激活时间"), value: "18100000000" },
					{ label: i18n("到期时间"), value: "Suzhou" }
				];
				this.itemsDetial = [
					{ label: i18n("物理主机CPU个数"), value: "kooriookami" },
					{ label: i18n("物理主机CPU已纳管个数"), value: "18100000000" }
				];
			}
		},
		computed: {
			btnImportLicense() {
				const vm = this;
				return {
					label: i18n("License导入"),
					preset: "blue",
					async onClick() {
						const files = await _.$openFileSelector();
						_.$loading(true);
						var formData = new FormData();
						formData.append("file", files[0]);
						try {
							$.ajax({
								headers: { "X-Language": localStorage["X-Language"] || "zh-CN" },
								type: "POST",
								url: "/rest/fc/admin/v1.0/license/upload",
								data: formData,
								contentType: false,
								processData: false,
								mimeType: "multipart/form-data",
								success: function (data) {
									var data = JSON.parse(data);
									if (data.code == "200") {
										vm.setFormInfo(data);
										$("#upload").val("");
										_.$msgSuccess(i18n("msgUploadedSuccess"));
									} else {
										$("#upload").val("");
										_.$msgError(data.message);
									}
								}
							});
						} catch (e) {
							_.$msgError(e);
						} finally {
							_.$loading(false);
						}
					}
				};
			}
		}
	};
}
</script>
