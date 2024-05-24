<style lang="less">
.CloudDiskResource-opr-icon {
	width: 64px;
	height: 64px;
	background-color: var(--el-border-color);
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	.xIcon {
		width: 48px;
		height: 48px;
	}
}

.CloudDiskResource-drawer {
	--xDrawer-height: 120px;
}
</style>
<template>
	<div class="flex vertical height100 CloudDiskResource">
		<div class="flex flex1 vertical overflow-auto">
			<CloudDiskResourceItem v-for="(item, index) in resourceList" :key="index" :item="item" :checked="APP.selectedItems.includes(item._id)" @toggle="toggle(item)" @preview="preview(item)" />
		</div>
		<xDrawer :visible.sync="APP.homeListDrawer" :with-header="false" direction="btt" size="var(--xDrawer-height)" class="CloudDiskResource-drawer">
			<div class="flex middle center height100">
				<xGap f />
				<div class="flex vertical center" @click="selectFile">
					<div class="CloudDiskResource-opr-icon mb4">
						<xIcon icon="_cloud_item_unknow" />
					</div>
					<span>上传文件</span>
				</div>
				<xGap f />
				<div class="flex vertical center" @click="makeNewDir">
					<div class="CloudDiskResource-opr-icon mb4">
						<xIcon icon="_cloud_item_dir" />
					</div>
					<span>新建文件夹</span>
				</div>
				<xGap f />
			</div>
		</xDrawer>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["APP"],
		components: {
			CloudDiskResourceItem: () => _.$importVue("@/views/CloudDisk/CloudDiskResourceItem.vue")
		},
		mounted() {
			this.getResourceList();
		},
		data() {
			return {
				resourceList: [],
				sort: "name",
				sortOptions: [
					{
						name: "按名称排序",
						key: "name"
					},
					{
						name: "按时间排序",
						key: "created_time"
					}
				]
			};
		},
		methods: {
			async selectFile() {
				const files = await _.$openFileSelector();
				this.APP.homeListDrawer = false;
			},
			async makeNewDir() {
				await _.$openModal({
					title: "新建文件夹",
					url: "@/views/CloudDisk/CloudDiskResource.NewDir.dialog.vue",
					parent: this,
					async makeNewDir(name) {
						debugger;
					}
				});
				this.APP.homeListDrawer = false;
			},
			preview(item) {
				const urlList = _.filter(this.resourceList, { type: "image" }).map(item => Vue._yapi_utils.appendToken(`${window._URL_PREFIX_4_DEV || ""}/api/resource/get?id=${item._id}`));
				const currentUrl = Vue._yapi_utils.appendToken(`${window._URL_PREFIX_4_DEV || ""}/api/resource/get?id=${item._id}`);
				_.$previewImgs({ urlList, currentUrl });
			},
			toggle(item) {
				const index = _.findIndex(this.APP.selectedItems, i => i === item._id);
				if (~index) {
					this.APP.selectedItems.splice(index, 1);
				} else {
					this.APP.selectedItems.push(item._id);
				}
			},
			async getResourceList() {
				_.$loading(true);
				try {
					const { data } = await _api.yapi.getResourceCloudDiskFileList({
						fileId: this.APP.fileId || 0,
						orderby: this.APP.listSortBy
					});
					this.setList(data);
				} catch (error) {
					console.error(error);
				} finally {
					_.$loading(false);
				}
			},
			setList(data) {
				this.resourceList = _.map(data, item => {
					let type = "none";
					try {
						if (item.isdir) {
							type = "dir";
						} else if (/^image/.test(item.type) || ["image/jpeg", "image/png"].includes(item.type)) {
							type = "image";
						} else if (/^video/.test(item.type) || ["video/mp4"].includes(item.type)) {
							type = "video";
						} else {
						}
					} catch (e) {
						//TODO handle the exception
					}
					return {
						...item,
						type
					};
				});
			}
		}
	});
}
</script>
