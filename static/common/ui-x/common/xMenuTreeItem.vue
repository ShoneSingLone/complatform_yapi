<script lang="ts">
export default async function () {
	const X_MENU_TREE_ITEM = "xMenuTreeItem";

	return {
		name: X_MENU_TREE_ITEM,
		props: [
			"item",
			"clickItem",
			"renders",
			"active",
			"isDefaultOpen",
			"level",
			"folderIcon",
			"collapse"
		],

		setup(props, { slots }) {
			const vm = this;

			var state = {
				isOpen: props.isDefaultOpen || false
			};
			state = reactive(state);
			vm.$on("open", isOpen => {
				state.isOpen = isOpen;
			});
			return {
				state,
				slots,
				handler() {
					vm.clickItem && vm.clickItem(vm.item);
				},
				scopeSlotsDefault() {
					if (_.$val(slots, "label")) {
						return _.$callFn(slots, "label").call(vm, { item: vm.item });
					}
					if (_.$val(props, "renders.label")) {
						return _.$callFn(props, "renders.label").call(vm, { item: vm.item });
					}

					return hDiv({ staticClass: "el-submenu__title-text" }, [vm.cptLabel]);
				},
				toggle() {
					/* 如果折叠就不跳转 */
					if (vm.isFolder) {
						state.isOpen = !state.isOpen;
					} else {
						vm.clickItem && vm.clickItem(vm.item);
						vm.dispatch(X_MENU_TREE_ITEM, "open", true);
					}
				}
			};
		},
		computed: {
			isActive() {
				const isActive = this.active(this.item);
				if (isActive) {
					this.dispatch(X_MENU_TREE_ITEM, "open", true);
				}
				return isActive;
			},
			cptLabel() {
				return _.$val(this, "item.label");
			},
			isFolder: function () {
				return _.$val(this, "item.children") && _.$val(this, "item.children.length");
			},
			cptChildren: function () {
				return _.$val(this, "item.children") || [];
			},
			cptClassFolderIcon() {
				return [
					"xMenuTreeItem-submenu-icon-arrow",
					{
						"xMenuTreeItem-icon-arrow-up": !this.state.isOpen
					}
					// { "el-submenu__icon-arrow": true, "el-icon-arrow-down": !this.state.isOpen, "el-icon-arrow-up": this.state.isOpen }
				];
			}
		},
		render() {
			let {
				$attrs,
				toggle,
				item,
				level,
				collapse,
				folderIcon,
				cptClassFolderIcon,
				scopeSlotsDefault,
				cptChildren,
				isFolder,
				isActive,
				state,
				active,
				clickItem,
				renders,
				$router
			} = this;
			/* 缩进级别 */
			level = Number(level || 0);
			folderIcon = folderIcon || "xMenuTreeItemFolderIcon";
			collapse = !!collapse;
			const vm = this;

			return h(
				"div",
				mergeProps4h([
					$attrs,
					{
						attrs: $attrs
					},
					{
						class: {
							"xMenuTreeItem el-menu": true,
							active: isActive,
							open: state.isOpen,
							collapse: collapse
						},
						attrs: {
							role: "menubar",
							"data-nest-level": level,
							"data-href-key": _.camelCase(item.href)
						}
					}
				]),
				[
					h(
						"div",
						{
							staticClass: "el-submenu",
							attrs: { role: "menuitem" },
							on: { click: toggle }
						},
						[
							h(
								"div",
								{
									staticClass: "xMenuTreeItem-submenu-wrapper el-submenu__title",
									onClick() {
										if (item.href) {
											if (item.DO_NOT_TO) {
												return;
											}
											if (_.isFunction(item.beforePush)) {
												return item.beforePush.call(vm, item);
											} else {
												$router.push({ path: item.href });
											}
										}
									}
								},
								[
									h("xIcon", {
										vIf: _.$val(item, "icon"),
										staticClass: "xMenuTreeItem-submenu-icon",
										attrs: { icon: _.$val(item, "icon") }
									}),
									scopeSlotsDefault({ item }),
									h("xGap", { vIf: isFolder, attrs: { f: "" } }),
									h("xIcon", {
										vIf: isFolder,
										class: cptClassFolderIcon,
										icon: folderIcon
									})
									// h("xGap", { attrs: { f: "" } }),
									// h("i", { vIf: isFolder, class: cptClassFolderIcon })
								]
							)
						]
					),
					h(
						"div",
						{ vIf: isFolder && !collapse },
						_.map(cptChildren, function (child, index) {
							const treeProps = {
								directives: [
									{
										name: "show",
										rawName: "v-show",
										value: state.isOpen,
										expression: "state.isOpen"
									}
								],

								key: index,
								staticStyle: {
									"padding-left": "var(--xMenuTreeItemPaddingLeft,var(--ui-one))"
								},
								renders,
								active: active,
								clickItem: clickItem,
								item: child,
								level: level + 1,
								folderIcon
							};
							return h("xMenuTreeItem", treeProps);
						})
					)
				]
			);
		}
	};
}
</script>
<style lang="less">
.xMenuTreeItem {
}

.xMenuTreeItem-submenu-wrapper {
	display: flex;
	align-items: center;
	position: relative;
}
.xMenuTreeItem-submenu-icon {
	margin-right: var(--ui-half);
}
.xMenuTreeItem-submenu-icon-arrow {
	transition: all 0.3s ease-in-out;
	&.xMenuTreeItem-icon-arrow-up {
		transform: rotate(180deg);
	}
}
</style>
