<style lang="less"></style>
<template>
	<div>
		<xCard header="基本信息">
			<xForm col="3" style="--xdesc-item-width: 100px">
				<xDescItem v-for="(item, index) in cptDescItems" :key="index" :item="item" :span="item.span || 1" />
			</xForm>
		</xCard>
		<xGap t />
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["APP", "inject_interface_section_interface_detail"],
		data() {
			return {};
		},
		computed: {
			cptDescItems() {
				const detail = this.inject_interface_section_interface_detail.detailInfo || {};
				const { title, uid, up_time, path, tag, isProxy, witchEnv, method } = detail;
				console.log("🚀 ~ cptDescItems ~  title, uid, up_time, path, tag, isProxy, witchEnv :", title, uid, up_time, path, tag, isProxy, witchEnv);

				/* @ts-ignore */
				const { protocol, hostname, port } = location;
				const apiURL = String(`${this.APP.cptProject?.basepath}${path}`).replace(/\/\//g, "/");
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
					{ label: i18n("Tag"), value: tag || "--", span: "full" },
					{
						label: i18n("是否开启转发"),
						value: isProxy || "--",
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
		}
	});
}
</script>
