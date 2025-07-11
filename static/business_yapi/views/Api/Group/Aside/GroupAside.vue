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
				<div
					class="pointer"
					@click="() => Group.openGroupUpsertDialog()"
					v-xtips="cptGroupTips">
					<!-- 添加分组 -->
					<xIcon icon="_add" class="icon-opreation_click" />
				</div>
			</div>
			<div class="flex1-overflow-auto" ref="refTreeScroll">
				<xTree
					:data="groupListForShow"
					:props="props"
					:contentRender="nodeRender"
					:expandedKeys="expandedKeys" />
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
		inject: ["APP", "Group"],
		mounted() {
			this.scrollToLocation();
		},
		setup(props) {
			const { stateStyle, resizeOptions } = useXmove(props);
			return {
				stateStyle,
				resizeOptions,
				fnUpsertGroupInfo: () => console.log("fnUpsertGroupInfo")
			};
		},
		data() {
			const vm = this;
			return {
				props: {
					value: "group_name",
					label: "group_name",
					children: "children"
				},
				expandedKeys: ["非分组成员", "分组成员", "开发者", "所有者"],
				configsSearch: defItem({
					isSearch: false,
					value: "",
					placeholder: "搜索分组",
					onEmitValue() {
						vm.searchGroup();
					},
					clearable: true
				}),
				groupListForShow: []
			};
		},
		methods: {
			searchGroup: _.debounce(function () {
				const vm = this;
				const { groupList } = vm.APP;
				const keywords = vm.configsSearch.value;
				let groupListForShow;

				if (keywords === "") {
					const { true: notInGroup, undefined: inGroup } = _.groupBy(
						groupList,
						"notInGroup"
					);
					const { owner, member } = _.groupBy(inGroup, "role");
					let { true: privateSpace, undefined: otherOwner } = _.groupBy(
						owner,
						"privateSpace"
					);

					groupListForShow = [
						{
							...(privateSpace?.[0] || {}),
							icon: "_icon_group_personal"
						},
						{
							group_name: "分组成员",
							icon: "_icon_group_include",
							children: [
								{
									group_name: "所有者",
									icon: "_icon_group_include_owner",
									children: _.map(otherOwner, i => ({
										...i,
										icon: "_icon_group_include_owner"
									}))
								},
								{
									group_name: "开发者",
									icon: "_icon_group_include_member",
									children: _.map(member, i => ({
										...i,
										icon: "_icon_group_include_member"
									}))
								}
							]
						},
						{
							group_name: "非分组成员",
							icon: "_icon_group_exclude",
							children: _.map(notInGroup, i => ({
								...i,
								icon: "_icon_group_exclude"
							}))
						}
					];
				} else {
					groupListForShow = _.filter(groupList, group =>
						new RegExp(keywords, "i").test(group.group_name)
					).map(i => ({
						...i,
						icon: "_icon_group_exclude"
					}));
				}
				vm.groupListForShow = groupListForShow;
			}, 300),
			async scrollToLocation() {
				await _.$ensure(() => this.$refs.refTreeScroll);
				setTimeout(() => {
					try {
						this.$el
							.querySelector(".is-current")
							.scrollIntoView({ behavior: "smooth", block: "center" });
					} catch (error) {}
				}, 1000);
			},
			/* 菜单 */
			nodeRender({ node, data }) {
				const { _id } = this.APP.cptCurrentGroup || {};
				return h(
					"div",
					{
						class: {
							asideTreeItem: true,
							"is-current": _.$isSame(_id, data._id)
						},
						onClick: () => this.selectGroup(data._id)
					},
					[
						h("xIcon", { icon: data.icon }),
						hDiv({ staticClass: "node-name" }, [data.group_name]),
						h("xIcon", {
							icon: "currentLocation",
							staticClass: "node-icon-current",
							attrs: { color: "var(--el-color-primary)" }
						})
					]
				);
			},
			async selectGroup(group_id) {
				if (!group_id) {
					return;
				}
				this.$router.push({ path: "/api/group", query: { group_id } });
			}
		},
		computed: {
			cptGroupTips() {
				return {
					content: "添加分组",
					placement: "right",
					style: "--min-width:unset;"
				};
			}
		},
		watch: {
			"APP.groupList"() {
				this.searchGroup();
			}
		}
	});
}
</script>
