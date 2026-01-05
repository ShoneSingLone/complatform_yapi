<style lang="less">
#ProjectInterfaceSectionInterfaceDetailEditorDesc {
	width: 1px;
	height: 100%;
	min-height: 500px;
}
.log-sidebar {
	width: 320px;
	border-right: 1px solid #e9ecef;
	display: flex;
	flex-direction: column;
	height: 100%;
	box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);
	background-color: #ffffff;
}
.log-wrapper {
	flex: 1;
	height: 1px;
	padding: 8px 0;
	/* 美化滚动条 */
	&::-webkit-scrollbar {
		width: 6px;
	}
	&::-webkit-scrollbar-track {
		background: #f1f1f1;
	}
	&::-webkit-scrollbar-thumb {
		background: #c1c1c1;
		border-radius: 3px;
	}
	&::-webkit-scrollbar-thumb:hover {
		background: #a8a8a8;
	}
}
.logcontent {
	line-height: 24px;
	margin-top: var(--ui-one);
	padding: 0px 16px;
	a {
		color: var(--el-color-primary-active);
		text-decoration: none;
		&:hover {
			text-decoration: underline;
		}
	}
}

/* Sidebar list items */
ul {
	list-style: none;
	padding: 0;
	margin: 0;
}

li {
	padding: 2px 16px;
	border-bottom: 1px solid #f5f7fa;
	transition: all 0.2s ease;
	cursor: pointer;
	position: relative;
	&:last-child {
		border-bottom: none;
	}
	&:hover {
		background-color: #f0f5ff;
		transform: translateX(2px);
	}
	&.active {
		background-color: #ecf5ff;
		border-left: 3px solid var(--el-color-primary);
		font-weight: 500;
	}
}

.logHead {
	display: flex;
	align-content: center;
	justify-items: flex-start;
	font-size: 14px;
	font-weight: 400;
	color: #303133;
	margin-right: 8px;
	flex: 1;
	transition: color 0.2s ease;
	&:hover {
		color: var(--el-color-primary);
	}
}

/* Add input section */
.p-4 {
	padding: 16px 16px;
}

.border-b {
	border-bottom: 1px solid #f0f2f5;
}

/* Header section */
.flex.mb10.middle {
	margin-bottom: 16px;
	padding: 16px 0;
	align-items: center;
}

/* Empty state */
.text-gray-500 {
	color: #909399;
	font-size: 14px;
	padding: 32px 16px;
	text-align: center;
	line-height: 1.5;
}

/* Sidebar Header */
.p-4.border-bottom.bg-white.flex.justify-between.items-center {
	border-bottom: 1px solid #e9ecef;
	padding: 14px 16px;
	background-color: #fafafa;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.text-base.font-semibold.text-gray-800.m-0 {
	font-size: 16px;
	font-weight: 600;
	color: #303133;
	margin: 0;
}

/* Buttons */
.x-btn {
	transition: all 0.2s ease;
	&:hover {
		transform: translateY(-1px);
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
	}
	&:active {
		transform: translateY(0);
	}
}

/* Add input container */
.p-4.border-b.bg-white {
	padding: 14px 16px;
	border-bottom: 1px solid #f0f2f5;
	background-color: #fafafa;
}

/* Editor area */
.x-page-view.flex1.flash-when {
	background-color: #ffffff;
}

/* Ensure proper spacing in the right editor */
.x-page-content {
	padding: 20px;
}

/* Title styles */
span[style*="font-weight:700;font-size:18px;"] {
	font-size: 18px;
	font-weight: 600;
	color: #303133;
	line-height: 1.4;
}

/* Form items */
.x-item {
	margin-bottom: 0;
}

/* Delete button */
.text-gray-400.hover\:text-red-500.transition-colors {
	transition: color 0.2s ease;
	color: #909399;
	&:hover {
		color: #f56c6c;
	}
	&:active {
		color: #e64949;
	}
}
</style>
<template>
	<section
		class="x-page-view flex1 flash-when"
		id="ProjectInterfaceSectionInterfaceDetailEditorDesc">
		<!-- 左侧记录栏 -->
		<div class="flex flex1 height1px">
			<div class="log-sidebar" v-if="!isShowEditor">
				<div class="log-wrapper">
					<!-- 添加文件输入框 -->
					<div v-if="isShowAddInput" class="p-4 border-b bg-white">
						<div class="flex items-center gap-2">
							<xItem
								style="flex: 1"
								:configs="form.newFileConfigs"
								:value="new_file_name" />
							<xBtn
								v-if="!readonly"
								@click="addNewFile"
								:disabled="!new_file_name.trim()"
								class="ml"
								preset="primary"
								size="small"
								>保存</xBtn
							>
							<xBtn
								@click="hide_add_input"
								preset="default"
								size="small"
								v-if="!readonly"
								>取消</xBtn
							>
						</div>
					</div>

					<ul class="flex1 vertical flex">
						<li
							class="flex middle overflow-hidden"
							v-for="({ title }, index) in cpt_desc_list"
							:key="title"
							:class="{ active: index === current_desc_index }">
							<span class="logHead" @click="load_desc_by_index(index)">{{
								title
							}}</span>
							<xBtn
								v-if="!readonly"
								preset="text"
								icon="delete"
								@click="delete_desc(index)"
								size="small"
								class="text-gray-400 hover:text-red-500 transition-colors"
								title="删除文档" />
						</li>
					</ul>
				</div>
			</div>

			<!-- 右侧编辑器区域 -->
			<div class="flex vertical flex1 x-padding">
				<div class="flex mb10 middle" style="height: 48px">
					<xRender :render="vDomTitle" class="flex1" />
					<xGap l />
					<xBtn :configs="btnSaveOrModify" v-if="!readonly" />
					<xBtn :configs="btnCancel" />
				</div>
				<TuiEditor
					class="flex1"
					:value="{ md: markdown }"
					:asRender="!isShowEditor"
					@change="onMarkdownChange" />
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
		mounted() {
			this.load_desc_by_index(0);
		},
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
						if (!this.x_item_value) {
							// 提供默认的空数组，确保始终返回正确的格式
							return [];
						}
						const descArray = JSON.parse(this.x_item_value);
						// 确保返回的是数组格式
						if (!Array.isArray(descArray)) {
							return [];
						}
						return _.map(descArray, ({ title, markdown }, _index) => {
							return {
								title: title || `未命名文档${_index + 1}`,
								markdown: markdown || "",
								_index
							};
						});
					} catch (error) {
						// 解析失败时返回空数组
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
						class: "flex1",
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
