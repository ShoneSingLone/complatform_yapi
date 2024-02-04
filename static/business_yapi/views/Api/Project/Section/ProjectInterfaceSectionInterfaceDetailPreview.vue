<style lang="less"></style>
<template>
	<div class="flex1-overflow-auto">
		<xCard header="基本信息">
			<xForm col="3" style="--xdesc-item-width: 100px">
				<xDescItem v-for="(item, index) in cptDescItems" :key="index" :item="item" :span="item.span || 1" />
			</xForm>
		</xCard>
		<xGap t />
		<xCard header="请求">
			<xCard header="ReqHeaders">
				<xForm col="1" style="--xdesc-item-width: 100px">
					<YapiApiRequestBodyPreviewer :item="cptHeadersParams" />
				</xForm>
			</xCard>
			<xGap t />
			<xCard header="ReqBody">
				<xForm col="1" style="--xdesc-item-width: 100px">
					<YapiApiRequestBodyPreviewer :item="sourceReqBodyOther" />
				</xForm>
			</xCard>
		</xCard>
		<xGap t />
		<!-- <xCard header="源数据">
			<xForm col="1" style="--xdesc-item-width: 100px">
				<xItem :configs="form.source" />
			</xForm>
		</xCard> -->
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["APP", "inject_interface_section_interface_detail"],
		data() {
			return {
				sourceReqHeaders: [],
				sourceReqBodyOther: {},
				form: defItems({
					source: {
						label: i18n("源数据"),
						itemType: "YapiItemMonaco",
						readOnly: true,
						value: ""
					}
				})
			};
		},
		computed: {
			cptHeadersParams() {
				if (this.sourceReqHeaders.length) {
					return _.reduce(
						this.sourceReqHeaders,
						(target, item) => {
							const { name, required, desc } = item;
							if (required === "1") {
								target.required.push(name);
							}
							target.properties[name] = {
								type: "string",
								desc
							};
							return target;
						},
						{
							type: "object",
							required: [],
							properties: {}
						}
					);
				}
			},
			cptCode() {
				try {
					const fn = new Function("params", `return (${this.APP.cptProject.requestCode})(params)`);
					const { title, _id, up_time, path, tag, isProxy, witchEnv, method } = this.cptInfo;

					return fn({
						title,
						path,
						method,
						groupId: this.APP.cptGroupId,
						projectId: this.APP.cptProjectId,
						interfaceId: _id,
						camelCase: _.camelCase
					});
				} catch (error) {
					return error.message;
				}
			},
			cptInfo() {
				return this.inject_interface_section_interface_detail.detailInfo || {};
			},
			cptDescItems() {
				const { title, uid, up_time, path, tag, isProxy, witchEnv, method } = this.cptInfo;
				console.log("🚀 ~ cptDescItems ~  title, uid, up_time, path, tag, isProxy, witchEnv :", title, uid, up_time, path, tag, isProxy, witchEnv);

				/* @ts-ignore */
				const { protocol, hostname, port } = location;
				const apiURL = String(`${this.APP.cptProject?.basepath || ""}${path}`).replace(/\/\//g, "/");
				const mockHref = `${protocol}//${hostname}${port ? `:${port}` : ""}/mock/${this.APP.cptProject._id}${apiURL}`;

				return [
					{ label: i18n("接口名称"), value: title || "--" },
					{ label: i18n("维护人"), value: uid || "--" },
					{ label: i18n("状态"), value: status || "--" },
					{ label: i18n("更新时间"), value: up_time || "--" },
					{
						label: i18n("接口"),
						value: path || "--",
						span: "full",
						readonlyAs: () => {
							const vDomMockHref = (() => {
								if (method === "GET") {
									return h("div", { class: "mt" }, [h("xTag", { class: "mr" }, ["mock地址"]), h("a", { attrs: { href: mockHref, target: "_blank" } }, [mockHref])]);
								}
								return h("div", { class: "mt" }, [h("xTag", { class: "mr" }, ["mock地址"]), h("span", [mockHref])]);
							})();
							return h("div", [h("div", [h("xTag", { class: "mr" }, [method]), h("span", [path])]), vDomMockHref]);
						}
					},
					{
						label: i18n("code"),
						value: path || "--",
						span: "2",
						readonlyAs: () => {
							return h("xMd", {
								id: "cptCode",
								md: this.cptCode,
								class: "pointer",
								nativeOn: {
									click: async () => {
										try {
											await navigator.clipboard.writeText($("#cptCode").text());
											_.$msgSuccess("复制成功");
										} catch (err) {}
									}
								}
							});
						}
					},
					{
						label: i18n("Tag"),
						value: tag || "--",
						readonlyAs: () => _.map(tag, i => h("xTag", { class: "mr" }, [i]))
					},
					{
						label: i18n("是否开启转发"),
						value: isProxy || "--",
						span: "full",
						readonlyAs: () => {
							if (isProxy) {
								const env = _.find(this.APP.cptProject.env, { _id: witchEnv });
								return h("div", [h("xTag", { class: "mr" }, [env.name]), h("span", [env.domain])]);
							} else {
								return "否";
							}
						}
					}
				];
			}
		},
		watch: {
			cptInfo: {
				handler(val) {
					if (val) {
						const source = _.cloneDeep(val);
						this.sourceReqHeaders = source.req_headers || [];
						try {
							this.sourceReqBodyOther = JSON.parse(source.req_body_other);
							this.form.source.value = JSON.stringify(source, null, 2);
						} catch (error) {
							_.$msgError(error);
						}
					}
				},
				immediate: true
			}
		}
	});
}
</script>
