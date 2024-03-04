<style lang="less">
.GroupAside {
	background-color: white;
}
</style>

<template>
	<aside class="GroupAside x-sider_wrapper" :style="stateStyle">
		<div class="x-sider_wrapper_tree flex vertical">
			<div class="group-operate flex start middle mb10 left-tree box-shadow">
				<xItem :configs="configsSearch" class="flex1" />
				<xGap l="10" />
				<div class="pointer" v-xtips="{ content: '新增', placement: 'right', style: '--min-width:unset;', trigger: 'hover' }" @click="addNewWiki">
					<!-- 添加分组 -->
					<xIcon icon="_add" class="icon-opreation_click" />
				</div>
			</div>
			<div class="flex1" style="height: 1px; overflow: auto" ref="refTreeScroll">
				<elTree :data="inject_note.treeData" node-key="href" default-expand-all :expand-on-click-node="false">
					<xRender :render="nodeRender" :payload="payload" slot-scope="payload" />
				</elTree>
			</div>
		</div>
		<div class="resize_bar" icon="scroll" v-xmove="resizeOptions" />
	</aside>
</template>
<script lang="ts">
export default async function () {
	const { useXmove } = await _.$importVue("@/utils/hooks.vue");
	/* 分组信息 */
	return defineComponent({
		inject: ["APP", "inject_note"],
		mounted() {},
		setup(props) {
			const { stateStyle, resizeOptions } = useXmove(props);
			return {
				stateStyle,
				resizeOptions
			};
		},
		data() {
			const vm = this;
			return {
				configsSearch: defItem({
					isSearch: false,
					value: "",
					placeholder: "搜索文档",
					onEmitValue() {},
					clearable: true
				}),
				groupListForShow: []
			};
		},
		methods: {
			async addNewWiki(node) {
				return _.$openModal({
					title: i18n("添加文档"),
					url: "@/views/Note/Note.dialog.insert.vue",
					parent: this,
					parentDocId: node?._id,
					belong_type: this.inject_note.cptBelongType,
					belong_id: this.inject_note.cptBelongId
				});
			},
			/* 菜单 */
			nodeRender({ node, data }) {
				const vm = this;
				return h(
					"div",
					{
						class: {
							asideTreeItem: true
						}
					},
					[
						h(
							"div",
							{
								staticClass: "node-name",
								onClick() {
									vm.inject_note.setCurrentWiki(data);
								}
							},
							[data.title]
						)
					]
				);
			}
		}
	});
}
</script>
