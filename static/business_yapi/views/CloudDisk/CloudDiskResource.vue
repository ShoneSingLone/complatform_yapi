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
		<xCard>
			<xBreadcrumb :items="APP.breadcrumbItems" :itemRender="breadCrumbItemRender" />
		</xCard>
		<div class="flex flex1 vertical overflow-auto">
			<CloudDiskResourceItem v-for="(item, index) in resourceList" :key="index" :item="item" :checked="APP.selectedItems.includes(item._id)" @toggle="toggle(item)" @preview="preview(item)" />
		</div>
		<xDrawer :visible.sync="APP.homeListDrawer" :with-header="false" direction="btt" size="var(--xDrawer-height)" class="CloudDiskResource-drawer">
			<div class="flex middle center height100">
				<xGap f />
				<div class="flex vertical center" @click="handleUpload">
					<div class="CloudDiskResource-opr-icon mb4">
						<xIcon icon="_cloud_item_unknow" />
					</div>
					<span>上传文件</span>
				</div>
				<xGap f />
				<div class="flex vertical center" @click="openMakeNewDirDialog">
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
	const CHUNK_SIZE = 0.1 * 1024 * 1024; //1M

	return defineComponent({
		inject: ["APP"],
		components: {
			CloudDiskResourceItem: () => _.$importVue("@/views/CloudDisk/CloudDiskResourceItem.vue")
		},
		data() {
			return {
				chunkAndSizeArray: [],
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
			breadCrumbItemRender({ target, item, index, items }) {
				const isLastItem = index === items.length - 1;

				target.push(
					h(
						"xBtn",
						{
							preset: "text",
							onClick: () => {
								if (item.fileId === this.APP.fileId) {
									this.getResourceList();
								} else {
									this.APP.popDir(index, item);
								}
							}
						},
						[item.label]
					)
				);

				if (!isLastItem) {
					target.push(h("xIcon", { icon: "_back_group", style: "transform:rotate(180deg);" }));
				}
				return target;
			},
			//合并文件
			async mergeFile(fileInfo, chunkTotal) {
				const { md5Value, fileKey } = fileInfo[0];
				const params = {
					chunkTotal: chunkTotal,
					md5: md5Value,
					name: fileKey
				};
				const response = await makePostRequest("http://127.0.0.1:3000/merge", params);
			},
			//文件切片
			sliceFile(file) {
				_.$loading(true);
				//文件分片之后的集合
				const chunkAndSizeArray = [];
				let start = 0;
				let end;
				while (start < file.size) {
					end = Math.min(start + CHUNK_SIZE, file.size);
					//slice 截取文件字节
					chunkAndSizeArray.push({ chunk: file.slice(start, end), size: end - start });
					start = end;
				}
				_.$loading(false);
				return [...chunkAndSizeArray];
			},
			async handleUpload() {
				this.APP.homeListDrawer = false;
				const newFormData = ({ chunkTotal, chunkSize, chunkIndex, md5, chunk, name }) => {
					let formData = new FormData();
					formData.append("fileId", this.APP.fileId || 0);
					// 分片总数
					formData.append("chunkTotal", chunkTotal);
					// 分片大小
					formData.append("chunkSize", chunkSize);
					// 分片序号
					formData.append("chunkIndex", chunkIndex);
					// 文件唯一标识
					formData.append("fileHash", md5);
					//分片文件
					formData.append("file", new File([chunk], name));
					return formData;
				};
				const [file] = await _.$openFileSelector();
				/* 检测文件是否上传过 */
				const md5 = await _.$md5(file);
				const { name } = file;
				this.APP.triggerUploadFileChange({ md5, name });
				this.chunkAndSizeArray = this.sliceFile(file);
				this.APP.triggerUploadFileChange({ md5, chunkTotal: this.chunkAndSizeArray.length });
				const {
					data: { chunks: uploadedChunkArray, file: isMergeFile }
				} = await _api.yapi.resourceCloudDiskCheckChunks({ md5, fileName: name, fileId: this.APP.fileId });

				this.APP.triggerUploadFileChange({
					md5,
					uploaded: _.reduce(
						uploadedChunkArray,
						(uploaded, i) => {
							uploaded[i.chunkIndex] = true;
							return uploaded;
						},
						{}
					),
					isMerged: isMergeFile
				});

				const hasUploaded = (() => {
					if (uploadedChunkArray.length === 0) {
						return false;
					}
					// 文件的信息，hash值，分片总数，每条分片都是一致的内容
					const [{ fileHash, chunkTotal }] = uploadedChunkArray;

					if (fileHash === md5) {
						// 文件所有分片状态list,默认都填充为0（0: 未上传，1：已上传）
						const allChunkStatusList = new Array(Number(chunkTotal)).fill(0);
						// 遍历已上传的分片，获取已上传分片对应的索引 (chunkIndex为每个文件分片的索引)
						const chunkIndexArray = _.map(uploadedChunkArray, item => item.chunkIndex);
						/* 只有上传成功的chunk才会有记录 */
						// 遍历已上传分片的索引，将对应索引赋值为1，代表已上传的分片 （注意这里，服务端返回的值是按照索引正序排列）
						_.each(chunkIndexArray, index => (allChunkStatusList[index] = 1));

						this.chunksUploadStatus = [...allChunkStatusList];
						return true; // 返回是否上传过，为下面的秒传，断点续传做铺垫
					} else {
						return false;
					}
				})();

				const chunkTotal = this.chunkAndSizeArray.length;
				const callback = function (eventName, payload) {
					console.log(eventName, payload);
				};
				this.APP.triggerUploadFileChange({ md5, chunkTotal });

				if (isMergeFile) {
					//上传过,并且已经完整上传，直接提示上传成功（秒传）
					_.$msgSuccess("秒传成功");
					return Promise.resolve([]);
				} else if (hasUploaded) {
					//在所有的分片状态中找到未上传的分片，
					const needUploadchunkIndexArray = _.reduce(
						this.chunksUploadStatus,
						(target, status, index) => {
							if (status === 0) {
								target.push(index);
							}
							return target;
						},
						[]
					);

					_.each(needUploadchunkIndexArray, async chunkIndex => {
						try {
							const { chunk, size: chunkSize } = this.chunkAndSizeArray[chunkIndex];
							let formData = newFormData({ chunkTotal, chunkSize, chunkIndex, md5, chunk, name });
							const { data } = await _api.yapi.resourceCloudDiskShardUpload({ formData, callback });
							this.handleUploaded(md5, data);
						} catch (error) {
							console.log(error);
						}
					});
				} else {
					//未上传，执行完整上传逻辑
					_.each(this.chunkAndSizeArray, async ({ chunk, size: chunkSize }, chunkIndex) => {
						try {
							let formData = newFormData({ chunkTotal, chunkSize, chunkIndex, md5, chunk, name });
							const { data } = await _api.yapi.resourceCloudDiskShardUpload({ formData, callback });
							this.handleUploaded(md5, data);
						} catch (error) {
							console.log(error);
						}
					});
				}
			},
			handleUploaded(md5, { chunkIndex }) {
				const info = this.APP.fileRecords[md5];
				info.uploaded[chunkIndex] = true;
				this.APP.triggerUploadFileChange(info);
				const { chunkTotal, uploaded, name } = info;
				if (chunkTotal === Object.keys(uploaded).length) {
					_api.yapi.resourceCloudDiskCheckChunks({ md5, fileName: name, fileId: this.APP.fileId }).then(res => {
						this.getResourceList();
					});
				}
			},
			async openMakeNewDirDialog() {
				await _.$openModal({
					title: "新建文件夹",
					url: "@/views/CloudDisk/CloudDiskResource.NewDir.dialog.vue",
					parent: this,
					makeNewDir: this.makeNewDir
				});
				this.APP.homeListDrawer = false;
			},
			preview(item) {
				if (item.type === "image") {
					this.preview_image(item);
				}
				if (item.type === "dir") {
					this.APP.pushDir(item);
				}
			},
			preview_image(item) {
				const urlList = _.filter(this.resourceList, { type: "image" }).map(item => Vue._common_utils.appendToken(`${window._URL_PREFIX_4_DEV || ""}/api/resource/get?id=${item._id}`));
				const currentUrl = Vue._common_utils.appendToken(`${window._URL_PREFIX_4_DEV || ""}/api/resource/get?id=${item._id}`);
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
			async makeNewDir(name) {
				_.$loading(true);
				try {
					await _api.yapi.resourceCloudDiskDir({
						fileId: this.APP.fileId || 0,
						name
					});
					this.getResourceList();
				} catch (error) {
					_.$msgError(error);
					console.error(error);
				} finally {
					_.$loading(false);
				}
			},
			async getResourceList() {
				_.$loading(true);
				try {
					const { data } = await _api.yapi.resourceCloudDiskFileList({
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

					if (item.isdir) {
						type = "dir";
					} else if (/^image/.test(item.type) || ["image/jpeg", "image/png"].includes(item.type)) {
						type = "image";
					} else if (/^video/.test(item.type) || ["video/mp4"].includes(item.type)) {
						type = "video";
					} else {
					}

					return {
						...item,
						type
					};
				});
			}
		},
		watch: {
			"APP.fileId": {
				immediate: true,
				handler() {
					this.getResourceList();
				}
			}
		}
	});
}
</script>
