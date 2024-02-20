<template>
	<section id="ViewNote">
		<NoteAside />
		<NoteSection />
	</section>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["APP"],
		components: {
			NoteAside: () => _.$importVue("@/views/Note/NoteAside.vue"),
			NoteSection: () => _.$importVue("@/views/Note/NoteSection.vue")
		},
		mounted() {
			this.updateWikiMenuList({ belong_to: "all" });
		},
		provide() {
			const inject_note = this;
			return {
				inject_note
			};
		},
		data() {
			return {
				treeData: [],
				currentWiki: {}
			};
		},
		methods: {
			setCurrentWiki(data) {
				debugger;
				this.$router.push({
					path: this.$route.path,
					query: {
						...this.$route.query,
						wiki: data._id
					}
				});
			},
			async openGroupUpsertDialog(groupInfo) {
				const isModify = !!groupInfo;
				const upsert = await _.$importVue("@/views/Api/Group/Group.Upsert.vue", {
					parent: this,
					groupInfo
				});
				_.$openWindow(isModify ? i18n("修改分组信息") : i18n("添加分组"), upsert);
			},
			async updateWikiMenuList(payload) {
				const { data } = await _api.yapi.wikiMenu(payload);
				const { list, orderArray } = data;
				this.treeData = this.buildTree(list, orderArray);
			},
			buildTree(dataArray, orderArray) {
				console.time("buildTree");
				/* findChildren */
				this.allWiki = _.reduce(
					dataArray,
					(target, i) => {
						target[i._id] = i;
						return target;
					},
					{}
				);

				_.each(this.allWiki, item => {
					if (!item) return;
					const parent = this.allWiki[item.p_id];
					if (parent) {
						if (!_.isArray(parent.children)) {
							parent.children = [];
						}
						parent.children.push(item);
					}
				});

				let tree = _.filter(this.allWiki, item => item.p_id === 0);
				if (_.$isArrayFill(orderArray)) {
					tree = this.sortTreeByOrder(tree, orderArray);
				}
				console.timeEnd("buildTree");
				return tree;
			},
			sortTreeByOrder(treeData, orderArray = []) {
				treeData = _.cloneDeep(treeData);

				treeData.sort((nowItem, nextItem) => {
					const nowIndex = orderArray.indexOf(nowItem._id);
					const nextIndex = orderArray.indexOf(nextItem._id);
					return nowIndex - nextIndex;
				});

				return _.map(treeData, item => {
					if (_.$isArrayFill(item.children)) {
						item.children = this.sortTreeByOrder(item.children, orderArray);
					}
					return item;
				});
			}
		}
	});
}
</script>

<style lang="less">
#ViewNote {
	height: 100%;
	display: flex;
	flex-flow: row nowrap;
}
</style>
