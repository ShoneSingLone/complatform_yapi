<style lang="less">
#ProjectInterfaceSectionInterfaceDetailEditorDesc {
	width: 1px;
	height: 500px;
}
.log-sidebar {
	width: 300px;
	border-right: 1px solid #e9ecef;
	display: flex;
	flex-direction: column;
	height: 100%;
}
.log-wrapper {
	flex: 1;
	height: 1px;
	overflow: auto;
}
.logcontent {
	line-height: 24px;
	margin-top: var(--ui-one);
	padding: 0px 16px;
	a {
		color: var(--el-color-primary-active);
	}
}

.delete-btn {
	opacity: 0;
	transition: opacity 0.3s ease;
}

.x-card:hover .delete-btn {
	opacity: 1;
}
</style>
<template>
	<section
		class="x-page-view flex1 flash-when"
		id="ProjectInterfaceSectionInterfaceDetailEditorDesc">
		<div class="flex height100">
			<!-- 左侧记录栏 -->
			<div class="log-sidebar" v-if="!isShowEditor">
				<div class="p-4 border-bottom flex justify-between items-center">
					<xBtn icon="plus" @click="showAddInput" />
				</div>
				<div class="log-wrapper">
					<!-- 添加文件输入框 -->
					<div v-if="isShowAddInput" class="p-4 border-b">
						<div class="flex items-center gap-2">
							<xItem
								style="flex: 1"
								:configs="form.newFileConfigs"
								:value="new_file_name" />
							<xBtn size="small" @click="addNewFile" :disabled="!new_file_name.trim()"
								>保存</xBtn
							>
							<xBtn size="small" @click="hide_add_input">取消</xBtn>
						</div>
					</div>

					<ul>
						<li class="flex middle" v-for="({ title }, index) in cpt_desc_list" :key="title">
							<span class="logHead" @click="load_desc_by_index(index)">{{ title }}</span>
							<xBtn preset="text" icon="delete" @click="delete_desc(index)" />
						</li>
					</ul>
					<!-- 空状态 -->
					<div v-if="cpt_desc_list.length === 0" class="p-4 text-center text-gray-500">
						请点击“+”添加描述
					</div>
				</div>
			</div>

			<!-- 右侧编辑器区域 -->
			<div class="flex1">
				<xPageContent>
					<div class="flex mb10 middle" style="height: 48px">
						<xRender :render="vDomTitle" class="flex1" />
						<xGap l />
						<xBtn :configs="btnSaveOrModify" />
						<xBtn :configs="btnCancel" />
					</div>
					<TuiEditor
						:value="{md:markdown}"
						:asRender="!isShowEditor"
						@change="onMarkdownChange" />
				</xPageContent>
			</div>
		</div>
	</section>
</template>
<script lang="ts">
export default async function () {
	const { mixins } = await _.$importVue("/common/ui-x/common/ItemMixins.vue");
	return defineComponent({
		mixins: [mixins],
		inject: ["APP"],
		data() {
			const vm = this;
			return {
				current_desc_index: 0,
				markdown: "",
				title: "",
				editingTitle: "",
				isShowEditor: false,
				// 新增属性：控制添加输入框
				isShowAddInput: false,
				new_file_name: "",
				form: defItems({
					titleConfigs: {
						placeholder: "文档名称",
						onEmitValue({ val }) {
							vm.editingTitle = val;
						}
					},
					newFileConfigs: {
						placeholder: "输入文件名",
						onEmitValue({ val }) {
							vm.new_file_name = val;
						}
					}
				})
			};
		},
		computed: {
			cpt_desc_list: {
				get() {
					try {
						/* [{title,markdown}] */
						const descArray = JSON.parse(this.x_item_value);
						return _.map(descArray, ({ title, markdown }, _index) => {
							return {
								title,
								markdown,
								_index
							};
						});
					} catch (error) {
						return [];
					}
				},
				set(value) {
					this.x_item_value = JSON.stringify(value);
				}
			},
			btnSaveOrModify() {
        const vm = this;
				// 将x_item_value解析为对象
				return {
					label: vm.isShowEditor ? "保存" : "修改",
					preset: "blue",
					async onClick() {
						if (vm.isShowEditor) {
							await vm.save();
						} else {
							const descItem = vm.cpt_desc_list[vm.current_desc_index];
							vm.editingTitle = descItem?.title || "";
						}

						vm.isShowEditor = !vm.isShowEditor;
					}
				};
			},
			btnCancel() {
				const vm = this;
				return {
					label: "取消",
					isHide() {
						return !vm.isShowEditor;
					},
					async onClick() {
						vm.isShowEditor = false;
						// 这里可以根据需要添加取消逻辑
					}
				};
			}
		},
		methods: {
			onMarkdownChange({ md }) {
				this.markdown = md;
			},
			// 添加文件相关方法
			showAddInput() {
				this.isShowAddInput = true;
				this.new_file_name = "";
			},
			hide_add_input() {
				this.isShowAddInput = false;
				this.new_file_name = "";
			},
			async addNewFile() {
				const vm = this;
				if (!vm.new_file_name.trim()) {
					_.$msgError("请输入文件名");
					return;
				}

				try {
					_.$loading(true);
					const _index = vm.cpt_desc_list.length;
					const desc_list = _.cloneDeep(vm.cpt_desc_list);
					desc_list.push({
						title: vm.new_file_name,
						markdown: "",
						index: _index
					});
					vm.cpt_desc_list = desc_list;

					_.$msg("添加成功");
					// 隐藏输入框
					vm.hide_add_input();
					// 切换到新创建的文件
					vm.load_desc_by_index(_index);
				} catch (error) {
					console.error("添加文件失败:", error);
					_.$msgError("添加失败");
				} finally {
					_.$loading(false);
				}
			},
			load_desc_by_index(_index) {
				const vm = this;
				// 找到对应的日志项
				let descItem = vm.cpt_desc_list[_index];
				if (!descItem) {
					descItem = _.first(vm.cpt_desc_list);
				}
				if (descItem) {
					// 更新当前编辑器内容
					vm.current_desc_index = _index;
					vm.title = descItem.title;
					vm.markdown = descItem.markdown || "";
					vm.editingTitle = descItem.title || "";
				}
			},
			async save() {
				const vm = this;
				try {
					_.$loading(true);
					// 纯前端处理，不调用后端API
					const desc_list = _.cloneDeep(vm.cpt_desc_list);
					desc_list[vm.current_desc_index] = {
						title: vm.editingTitle,
						markdown: vm.markdown
					};
					vm.cpt_desc_list = desc_list;

					_.$msg("保存成功");
					// 保存成功后重新加载日志（这里可以根据需要更新日志记录）
				} catch (error) {
					console.error("保存文档失败:", error);
					_.$msgError("保存失败");
				} finally {
					_.$loading(false);
				}
			},
			vDomTitle() {
				const vm = this;
				if (vm.isShowEditor) {
					const itemProps = {
						style: "flex1",
						configs: vm.form.titleConfigs,
						value: vm.editingTitle || ""
					};
					return h("xItem", itemProps);
				} else {
					// 正确解析x_item_value作为JSON字符串
					const parsedItemValue = vm.cpt_desc_list[vm.current_desc_index];
					return h(
						"span",
						{
							style: "font-weight:700;font-size:18px;"
						},
						[parsedItemValue?.title || "文档"]
					);
				}
			},
			getTime(time) {
				return _.$dateFormat(time);
			},
			getTimeAgo(time) {
				return _.$timeAgo(time);
			},
			async delete_desc(_index) {
				const vm = this;
				try {
					_.$loading(true);
					// 纯前端处理，不调用后端API

					// 从日志列表中移除该条目
					const desc_list = _.cloneDeep(vm.cpt_desc_list);
					desc_list.splice(_index, 1);
					vm.cpt_desc_list = desc_list;

					_.$msg("删除成功");
					// 删除后右侧编辑器变为可编辑状态
					vm.isShowEditor = true;
					// 如果当前正在查看被删除的文档，需要更新编辑器内容
					vm.load_desc_by_index(0);
				} catch (error) {
					console.error("删除日志失败:", error);
					_.$msgError("删除失败");
				} finally {
					_.$loading(false);
				}
			}
		}
	});
}
</script>
