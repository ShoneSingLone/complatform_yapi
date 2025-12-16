<template>
	<xDialog>
		<div class="video-player-container">
			<!-- 视频播放区域 -->
			<div class="video-area">
				<!-- 固定宽高比的视频容器 -->
				<div class="video-container">
					<video ref="refVideo" controls="true" class="video-element" />
				</div>

				<div class="custom-controls">
					<xItem :configs="xItemPlaybackRate" style="--xItem-wrapper-width: 120px" />
					<xBtn :configs="btnFullscreen" />
				</div>
				<!-- 自定义控制栏 -->
				<div class="custom-controls">
					<xBtn :configs="btnPre" />
					<xBtn :configs="btnNext" />
				</div>
			</div>
			<!-- 播放列表 -->
			<div class="playlist">
				<ul>
					<li
						v-for="(video, index) in all_video_array"
						:key="index"
						@click="playVideo(index)"
						:class="{ active: index === currentIndex }"
						class="playlist-item">
						{{ video.name || "视频 " + (index + 1) }}
					</li>
				</ul>
			</div>
		</div>
	</xDialog>
</template>
<script lang="ts">
export default async function ({ item, all_video_array, current_index, current_resource }) {
	const { useDialogProps } = await _.$importVue("/common/utils/hooks.vue");
	return defineComponent({
		inject: ["APP"],
		props: useDialogProps(),
		mounted() {
			this.setErrorHandler();
			this.setupFullscreenListeners();
		},
		data() {
			return {
				currentIndex: current_index || 0,
				all_video_array: all_video_array || [],
				isFullscreen: false
			};
		},
		computed: {
			uri() {
				return "";
			},
			videoSrc() {
				if (all_video_array.length === 0) return "";
				const video = all_video_array[this.currentIndex];
				return video?.uri || "";
			},
			btnPre() {
				return {
					label: () =>
						h("xIcon", {
							icon: "_prevsong"
						}),
					onClick: this.playPrevious,
					disabled: this.currentIndex === 0
				};
			},
			btnNext() {
				return {
					label: () =>
						h("xIcon", {
							icon: "_nextsong"
						}),
					onClick: this.playNext,
					disabled: this.currentIndex === all_video_array.length - 1
				};
			},
			btnFullscreen() {
				return {
					label: this.isFullscreen ? "退出全屏" : "全屏",
					onClick: this.toggleFullscreen
				};
			},
			xItemPlaybackRate() {
				return {
					value: 1,
					itemType: "xItemSelect",
					options: [
						{ label: "0.5x", value: 0.5 },
						{ label: "0.75x", value: 0.75 },
						{ label: "1x", value: 1 },
						{ label: "1.25x", value: 1.25 },
						{ label: "1.5x", value: 1.5 },
						{ label: "2x", value: 2 }
					],
					onEmitValue(val) {
						this.changePlaybackRate();
					}
				};
			}
		},
		watch: {
			// 直接监听currentIndex变化，确保视频能够正确更新
			currentIndex() {
				this.updateVideoSrc();
			}
		},
		methods: {
			async setErrorHandler() {
				await _.$ensure(() => this.$refs.refVideo);
				const video = this.$refs.refVideo;

				video.addEventListener("error", event => {
					_.$msgError(item.name + ": " + this.videoSrc);
				});

				// 确保allVideos数据正确初始化
				if (all_video_array.length > 0) {
					video.src = this.videoSrc;
				}
			},
			updateVideoSrc() {
				const newSrc = this.videoSrc;
				const video = this.$refs.refVideo;
				if (video && newSrc) {
					console.log("updateVideoSrc - newSrc:", newSrc);
					// 直接更新视频源并播放，这是更可靠的方式
					video.src = newSrc;
					video.play().catch(error => {
						console.warn("Autoplay failed:", error);
					});
				}
			},
			playVideo(index) {
				this.currentIndex = index;
			},
			playPrevious() {
				if (this.currentIndex > 0) {
					this.currentIndex--;
				}
			},
			playNext() {
				if (this.currentIndex < all_video_array.length - 1) {
					this.currentIndex++;
				}
			},
			changePlaybackRate() {
				const video = this.$refs.refVideo;
				if (video) {
					video.playbackRate = this.xItemPlaybackRate.value;
				}
			},
			toggleFullscreen() {
				const video = this.$refs.refVideo;
				if (!video) return;

				if (!this.isFullscreen) {
					// 进入全屏
					if (video.requestFullscreen) {
						video.requestFullscreen();
					} else if (video.mozRequestFullScreen) {
						video.mozRequestFullScreen();
					} else if (video.webkitRequestFullscreen) {
						video.webkitRequestFullscreen();
					} else if (video.msRequestFullscreen) {
						video.msRequestFullscreen();
					}
				} else {
					// 退出全屏
					if (document.exitFullscreen) {
						document.exitFullscreen();
					} else if (document.mozCancelFullScreen) {
						document.mozCancelFullScreen();
					} else if (document.webkitExitFullscreen) {
						document.webkitExitFullscreen();
					} else if (document.msExitFullscreen) {
						document.msExitFullscreen();
					}
				}
				this.isFullscreen = !this.isFullscreen;
			},
			setupFullscreenListeners() {
				// 添加全屏状态变化事件监听器
				document.addEventListener("fullscreenchange", this.handleFullscreenChange);
				document.addEventListener("webkitfullscreenchange", this.handleFullscreenChange);
				document.addEventListener("mozfullscreenchange", this.handleFullscreenChange);
				document.addEventListener("MSFullscreenChange", this.handleFullscreenChange);
			},
			removeFullscreenListeners() {
				// 移除全屏状态变化事件监听器
				document.removeEventListener("fullscreenchange", this.handleFullscreenChange);
				document.removeEventListener("webkitfullscreenchange", this.handleFullscreenChange);
				document.removeEventListener("mozfullscreenchange", this.handleFullscreenChange);
				document.removeEventListener("MSFullscreenChange", this.handleFullscreenChange);
			},
			handleFullscreenChange() {
				// 检测当前是否处于全屏状态
				this.isFullscreen = !!(
					document.fullscreenElement ||
					document.webkitFullscreenElement ||
					document.mozFullScreenElement ||
					document.msFullscreenElement
				);
			}
		}
	});
}
</script>
<style lang="less">
.video-player-container {
	display: flex;
	flex-direction: column;
	padding: 10px;
	max-width: 100%;
	max-height: 100%;

	@media (min-width: 768px) {
		flex-direction: row;
	}
}

.video-area {
	flex: 1;
	margin: 0 auto 10px;
	width: 100%;
	max-width: 100%;

	@media (min-width: 768px) {
		margin-bottom: 0;
		margin-right: 10px;
		max-width: 800px;
	}

	/* 固定宽高比的视频容器，确保视频切换时大小不变 */
	.video-container {
		position: relative;
		width: 100%;
		padding-top: 56.25%; /* 16:9 宽高比 */
		background-color: #000;
		border-radius: 4px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
		overflow: hidden;
	}

	/* 视频元素充满容器，保持原始宽高比 */
	.video-element {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
}

.custom-controls {
	display: flex;
	align-items: center;
	margin-top: 10px;
	gap: 10px;
}

.control-btn {
	padding: 6px 12px;
	background-color: #4a90e2;
	color: white;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	font-size: 14px;
	transition: all 0.2s;

	&:hover {
		background-color: #3a80d2;
	}

	&:disabled {
		background-color: #cccccc;
		cursor: not-allowed;
	}
}

.speed-select {
	padding: 6px;
	border: 1px solid #ddd;
	border-radius: 4px;
	background-color: white;
	cursor: pointer;
	font-size: 14px;
}

.playlist {
	width: 100%;
	max-width: 300px;
	max-height: 400px;
	overflow-y: auto;
	border: 1px solid #eee;
	border-radius: 4px;
	padding: 10px;
	background-color: #f9f9f9;

	@media (min-width: 768px) {
		width: 300px;
	}

	h4 {
		margin: 0 0 10px 0;
		font-size: 16px;
		color: #333;
	}

	ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.playlist-item {
		padding: 8px 12px;
		margin-bottom: 5px;
		border-radius: 4px;
		cursor: pointer;
		transition: all 0.2s;
		font-size: 14px;
		color: #666;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;

		&:hover {
			background-color: #e6f0fa;
			color: #333;
		}

		&.active {
			background-color: #4a90e2;
			color: white;
		}
	}
}
</style>
