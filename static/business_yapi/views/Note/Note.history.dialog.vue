<template>
	<div class="x-padding flex vertical height100 note-history-dialog-vue">
		<!-- 搜索框 -->
		<div class="search-container flex middle">
			<xInput
				class="flex1"
				clearable
				v-model="searchText"
				placeholder="搜索历史记录..."
				@enter="configs_log_list.onQuery({ page: 1 })">
				<template slot="append">
					<xIcon
						icon="_search"
						@click="configs_log_list.onQuery({ page: 1 })"
						class="pointer" />
				</template>
			</xInput>
			<xGap f />
			<button class="toggle-all-btn" @click="toggleAll">
				{{ cpt_current_all_expanded ? "全部折叠" : "全部展开" }}
			</button>
		</div>
		<!-- 历史记录列表 -->
		<div class="history-list">
			<NoteHistoryDiff
				v-for="info in configs_log_list.data.list"
				:key="info._id"
				:info="info" />

			<!-- 空状态提示 -->
			<div
				class="empty-state height100 flex vertical center"
				v-if="configs_log_list.data.list.length === 0">
				<div class="empty-icon">📜</div>
				<div class="empty-text">暂无历史记录</div>
			</div>
		</div>
		<xPagination :configs="configs_log_list" />
	</div>
</template>

<script lang="ts">
export default async function ({ OPTIONS: { wiki } }) {
	const typeid = wiki._id;

	return defineComponent({
		components: {
			NoteHistoryDiff: () => _.$importVue("@/views/Note/NoteHistoryDiff.vue")
		},
		mounted() {
			this.configs_log_list.onQuery();
		},
		computed: {
			cpt_current_all_expanded() {
				const current = _.filter(this.showContent, Boolean);
				return current.length === this.configs_log_list.data.list.length;
			}
		},
		data(vm) {
			return {
				searchText: "",
				showContent: {},
				configs_log_list: defTable({
					async onQuery(pagination) {
						_.$loading(true);
						try {
							const { page, size } = _.$setPagination(
								vm.configs_log_list,
								pagination
							);
							const { data: list_total_data } = await _api.yapi.get_log_list({
								query_params: { key: vm.searchText, type: "wiki_log" },
								type: "wiki_doc",
								typeid,
								page,
								size
							});
							_.$setTableData(vm.configs_log_list, list_total_data);
						} catch (error) {
							_.$msgError(error);
						} finally {
							_.$loading(false);
						}
					},
					data: {
						list: []
					},
					columns: []
				})
			};
		},
		methods: {
			noteContent(content) {
				let a = String(content).split("\\n");
				a = a.join("<br/>");
				a = a.split("\\t");
				a = a.join("  ");
				a = a.split(`\\&quot;`);
				a = a.join('"');
				return a;
			},
			toggleCollapse(id) {
				const isShow = !this.showContent[id];
				_.$val(this, `showContent.${id}`, isShow);
			},
			toggleAll() {
				if (this.cpt_current_all_expanded) {
					this.showContent = {};
				} else {
					this.showContent = _.reduce(
						this.configs_log_list.data.list,
						(showContent, row) => {
							showContent[row._id] = true;
							return showContent;
						},
						{}
					);
				}
			},
			isShow(id) {
				return this.showContent[id] || false;
			}
		}
	});
}
</script>

<style lang="less">
.note-history-dialog-vue {
	width: 60vw;
	/* 基础样式 */

	* {
		box-sizing: border-box;
		font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
	}

	color: #333;
	background-color: #f7f8fa;

	/* 搜索框优化 */

	.search-container {
		padding: 1rem;
		background-color: #fff;
		border-bottom: 1px solid #f0f0f0;
		position: relative;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
	}

	/* 空状态样式 */

	.empty-state {
		text-align: center;
		padding: 4rem 1rem;
		color: #adb5bd;

		.empty-icon {
			font-size: 3rem;
			margin-bottom: 1rem;
			opacity: 0.7;
		}

		.empty-text {
			font-size: 1rem;
			font-weight: 500;
		}
	}

	/* 全部展开/折叠按钮 */

	.toggle-all-btn {
		color: var(--el-color-primary);
		background: none;
		border: none;
		cursor: pointer;
		font-size: 0.8rem;
		transition: color 0.2s;
		margin-left: 10px;
	}

	/* 历史记录列表 */

	.history-list {
		flex: 1;
		overflow-y: auto;
		padding: 0.8rem;

		/* 滚动条美化 */

		&::-webkit-scrollbar {
			width: 6px;
			height: 6px;
		}

		&::-webkit-scrollbar-track {
			background: #f1f1f1;
			border-radius: 3px;
		}

		&::-webkit-scrollbar-thumb {
			background: #c1c1c1;
			border-radius: 3px;
		}

		&::-webkit-scrollbar-thumb:hover {
			background: #a8a8a8;
		}
	}
}
</style>
