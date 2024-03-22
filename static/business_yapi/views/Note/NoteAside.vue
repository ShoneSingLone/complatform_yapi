<style lang="less">
.GroupAside {
	background-color: white;
	.wiki-tree-wrapper {
		height: 1px;
		overflow: auto;
		position: relative;
		.is-current {
			.el-tree-node__content {
				color: var(--ui-primary);
				background: #ecf5ff;
				border-color: #b3d8ff;
			}
		}
	}
}
</style>

<template>
	<aside class="GroupAside x-sider_wrapper" :style="stateStyle">
		<div class="x-sider_wrapper_tree flex vertical">
			<div class="group-operate flex start middle mb10 left-tree box-shadow">
				<xItem :configs="configsSearch" class="flex1" />
				<xGap l="10" />
				<xIcon icon="currentLocation" class="icon-opreation_click pointer" />
				<!-- 添加分组 -->
				<xIcon icon="_add" class="icon-opreation_click pointer ml10" v-xtips="manual" @click="addNewWiki()" />
			</div>
			<div class="flex1 wiki-tree-wrapper" ref="refTreeScroll">
				<xTree
					ref="refTree"
					:contentRender="treeContentRender"
					:data="inject_note.treeData"
					:expandedKeys.sync="inject_note.expandedKeys"
					:props="treeProps"
					:filterHandler="treeFilterMethod"
					:dragAndDrop="handleDragAndDrop"
					@node-contextmenu="onNodeContextmenu" />
			</div>
		</div>
		<div class="resize_bar" icon="scroll" v-xmove="resizeOptions" />
	</aside>
</template>
<script lang="ts">
export default async function () {
	const { useXmove } = await _.$importVue("@/utils/hooks.vue");

	const NoteXTipsInsert = await _.$importVue("@/views/Note/Note.insert.vue");

	const getTreeOrder = (treeData, orderArray = []) => {
		treeData = _.cloneDeep(treeData);
		let item;
		while ((item = treeData.shift())) {
			orderArray.push(item._id);
			if (_.$isArrayFill(item.children)) {
				treeData.unshift(...item.children);
			}
		}
		return orderArray;
	};

	/* 分组信息 */
	return defineComponent({
		inject: ["APP", "inject_note"],
		mounted() {},
		setup(props) {
			const { stateStyle, resizeOptions } = useXmove(props);
			return {
				stateStyle,
				resizeOptions,
				treeProps: {
					value: "_id",
					label: "title",
					children: "children"
				}
			};
		},
		watch: {
			"inject_note.currentWiki": {
				handler(wiki) {
					if (wiki?._id) {
						this.$refs.refTree?.setCurrentKey?.(wiki._id);
					}
				},
				immediate: true
			}
		},
		data() {
			const vm = this;
			const onQueryChanged = _.debounce(query => {
				vm.$refs.refTree.filter(query);
			}, 1000);
			return {
				configsSearch: defItem({
					isSearch: false,
					value: "",
					placeholder: "搜索文档",
					onEmitValue({ val: query }) {
						onQueryChanged(query);
					},
					clearable: true
				}),
				groupListForShow: [],
				manual: {
					payload: {},
					content() {
						return h(NoteXTipsInsert, {
							...vm.manual.payload,
							hide() {
								vm.manual.visible = false;
							}
						});
					},
					trigger: "manual",
					visible: false,
					placement: "right-start"
				}
			};
		},
		methods: {
			scrollToLocation() {},
			onNodeContextmenu(event, data, node) {
				debugger;
			},
			async handleDragAndDrop({ drag, drop, type: dropType }) {
				const { inject_note } = this;
				const dragItem = { ...drag.data };
				const dropItem = { ...drop.data };
				if (dragItem._id == dropItem._id) {
					return;
				}
				const menuOrderArray = getTreeOrder(inject_note.treeData);
				const dragIndex = menuOrderArray.indexOf(dragItem._id);
				if (dropType === "inner") {
					dragItem.p_id = dropItem._id;
				}

				if (dropType === "after") {
					dragItem.p_id = dropItem.p_id;
					menuOrderArray.splice(dragIndex, 1);
					const dropIndex = menuOrderArray.indexOf(dropItem._id);
					menuOrderArray.splice(dropIndex + 1, 0, dragItem._id);
				}

				if (dropType === "before") {
					dragItem.p_id = dropItem.p_id;
					menuOrderArray.splice(dragIndex, 1);
					let dropIndex = menuOrderArray.indexOf(dropItem._id);
					if (dropIndex === 0) {
						menuOrderArray.unshift(dragItem._id);
					} else {
						menuOrderArray.splice(dropIndex - 1, 0, dragItem._id);
					}
				}
				try {
					await _api.yapi.wikiUpsertOne(dragItem);
					await _api.yapi.wikiResetMenuOrder({
						order: menuOrderArray,
						belong_type: inject_note.belongType,
						belong_id: (() => {
							// const { group_id, project_id } = cptRouter.value.query;
							// const s_map = {
							// 	group: group_id,
							// 	project: project_id
							// };
							return /* s_map[inject_note.belongType] */ "";
						})()
					});
					await inject_note.updateWikiMenuList();
					_.$msgSuccess(i18n("更新成功"));
				} catch (error) {
					_.$msgError(error.message);
				}
			},
			treeFilterMethod(query, node) {
				return new RegExp(query, "i").test(node.title);
			},
			async addNewWiki(node = {}) {
				this.manual.payload = {
					parent: this,
					parentDocId: node?._id,
					belong_type: this.inject_note.cptBelongType,
					belong_id: this.inject_note.cptBelongId
				};
				this.manual.visible = true;
			},
			/* 菜单 */
			treeContentRender({ node, data, injectRootTree }) {
				const vm = this;

				const vNodeTitleLabel = h(
					"div",
					{
						staticClass: "node-name pointer flex1",
						onClick() {
							vm.inject_note.setCurrentWiki(data);
						}
					},
					[data.title]
				);
				const vNodeGap = h("xGap", { attrs: { f: "" } });
				const vNodeIconAddSubwiki = h(
					"xIcon",
					{
						staticClass: "ml",
						icon: "_add",
						onClick() {
							vm.addNewWiki(data);
						}
					},
					[data.title]
				);

				return h(
					"div",
					{
						staticClass: "aside-tree-item flex middle flex1",
						attrs: {
							"data-wiki-id": data._id
						}
					},
					[vNodeTitleLabel, vNodeIconAddSubwiki]
				);
			}
		}
	});
}
</script>
