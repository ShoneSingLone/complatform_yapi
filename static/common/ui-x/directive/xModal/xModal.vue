<template>
	<transition name="viewer-fade">
		<div class="el-dialog__wrapper" :style="cptWrapperStyle">
			<div role="dialog" :class="dialogClass" :style="dialogStyle" ref="refDialog">
				<div class="el-dialog__header" v-if="!isHideHeader">
					<div class="el-dialog__title-bar" v-xmove="moveOptions" />
					<span class="el-dialog__title">
						<span class="xModel-title_prefixe"></span>
						<xRender :render="cpt_title" />
					</span>
					<button
						v-if="isShowFullScreen"
						type="button"
						aria-label="Close"
						class="x-dialog__headerbtn fullscreen"
						@click="toggleFullScreen">
						<xIcon
							v-if="dialogClass.fullscreen"
							class="el-icon el-icon-copy-document"
							icon="copy-document"
							style="transform: rotate(180deg)"></xIcon>
						<xIcon
							v-else
							class="el-icon el-icon-full-screen"
							icon="full-screen"></xIcon>
					</button>
					<button
						type="button"
						aria-label="Close"
						class="x-dialog__headerbtn close"
						@click="closeModal({ isClickCloseIcon: true })">
						<!-- <i class="el-dialog__close el-icon el-icon-close"></i> -->
						<xIcon :icon="cptCloseIcon" class="el-dialog__close" />
					</button>
				</div>
				<transition name="slide">
					<component
						:is="ContentComponent"
						ref="refContent"
						:closeModal="closeModal"
						@hook:mounted="setDialogOffset" />
				</transition>
			</div>
		</div>
	</transition>
</template>
<script lang="ts">
export default async function ({ PRIVATE_GLOBAL, options, modalConfigs }) {
	modalConfigs = modalConfigs || {};
	options = options || {};

	const isHideHeader = options.isHideHeader || false;
	function useModal(vm) {
		onMounted(() => {
			vm.deviceSupportInstall();
			document.body.appendChild(vm.$el);
			vm.styleOverflow = document.body.style.overflow;
			// vm.stylePointerEvents = document.body.style.pointerEvents;
			document.body.style.overflow = "hidden";
			// document.body.style.pointerEvents = "none";
		});

		onBeforeUnmount(() => {
			document.body.style.overflow = vm.styleOverflow;
			// document.body.style.pointerEvents = vm.stylePointerEvents;
			if (vm.$el && vm.$el.parentNode) {
				vm.$el.parentNode.removeChild(vm.$el);
			}
		});
	}
	return defineComponent({
		name: "xModal",
		provide() {
			return {
				inject_modal: this
			};
		},
		async mounted() {
			/* 兼容废弃代码 */
			if (options._VueCtor) {
				this.ContentComponent = options._VueCtor;
			} else {
				options.$DIALOG_VM = this;
				this.ContentComponent = await _.$importVue(options.url, options);
			}
		},
		setup(props) {
			const vm = this;
			useModal(this);
			const { useAutoResize } = _xUtils;

			const {
				height: refDialogRectHeight,
				width: refDialogRectWidth,
				sizer: refDialog
			} = useAutoResize(props);
			const {
				height: refContentHeight,
				width: refContentWidth,
				sizer: refContent
			} = useAutoResize(props);

			const setDialogOffset = _.throttle(() => {
				try {
					let left = (() => {
						if (vm.dialogClass.fullscreen) {
							return 0;
						}
						let left = (_.$single.win.width() - refDialogRectWidth.value) / 2;

						if (left < 0) {
							return 0;
						}
						return left;
					})();

					let topOnepice = (() => {
						if (vm.dialogClass.fullscreen) {
							return 0;
						}

						let topOnepice = 2;
						const topTotal = _.$single.win.height() - refDialogRectHeight.value;
						if (topTotal >= 4) {
							topOnepice = topTotal / 4;
						}
						return topOnepice;
					})();

					vm.dialogStyle = {
						"margin-top": "0",
						opacity: 1,
						left: `${left}px`,
						top: `${topOnepice}px`
					};
				} catch (error) {
					return {};
				}
			}, 32);

			watch(
				() => {
					return [
						refDialogRectHeight.value,
						refDialogRectWidth.value,
						refContentHeight.value,
						refContentWidth.value
					];
				},
				rectArray => {
					if (_.every(rectArray, val => !!val)) {
						setDialogOffset();
					}
				}
			);

			const setPosition = _.throttle(function ({ left, top }) {
				vm.dialogStyle = _.merge(vm.dialogStyle, {
					left: `${left}px`,
					top: `${top}px`
				});
			}, 18);

			onMounted(() => {
				// _.$single.win.on("resize.xModal", setDialogOffset);
			});
			onBeforeUnmount(() => {
				// _.$single.win.off("resize.xModal", setDialogOffset);
			});

			return {
				isHideHeader: ref(isHideHeader),
				toggleFullScreen() {
					vm.dialogClass.fullscreen = !vm.dialogClass.fullscreen;
					if (!vm.dialogClass.fullscreen) {
						vm.setDialogOffset();
					}
				},
				setPosition,
				setDialogOffset,
				/*  */
				refDialog,
				refContent,
				moveOptions: {
					left: 0,
					width: 0,
					onStart() {
						const { left, top } = vm.$refs.refDialog.getBoundingClientRect();
						vm.moveOptions.left = left;
						vm.moveOptions.top = top;
					},
					onMoving({ clickEvent, movingEvent }) {
						const offsetLeft = movingEvent.clientX - clickEvent.clientX;
						const offsetTop = movingEvent.clientY - clickEvent.clientY;
						let left = vm.moveOptions.left + offsetLeft;
						let top = vm.moveOptions.top + offsetTop;

						(function () {
							if (left <= 0) {
								left = 0;
								return;
							}

							const width = refDialogRectWidth.value;
							if (left + width > _.$single.win.width()) {
								left = _.$single.win.width() - width;
								return;
							}
						})();

						(function () {
							if (top <= 0) {
								top = 0;
								return;
							}

							const height = refDialogRectHeight.value;
							if (top + height > _.$single.win.height()) {
								top = _.$single.win.height() - height;
								return;
							}
						})();
						setPosition({
							left,
							top
						});
					}
				}
			};
		},
		// beforeDestroy() {
		// 	/* 清理content组件 */
		// 	if (this.$refs?.refContent) {
		// 		this.$refs.refContent.$destroy();
		// 	}
		// },
		data() {
			return {
				/* TODO: 动画闪烁 */
				// ContentComponent: defineComponent({ template: `<div class="el-skeleton is-animated flex vertical x-padding" style="min-width: 200px;"><div class="el-skeleton__item el-skeleton__p is-first"></div><div class="el-skeleton__item el-skeleton__p el-skeleton__paragraph is-last mt"></div></div>` }),
				ContentComponent: "",
				isShowFullScreen: _.isBoolean(modalConfigs.fullscreen),
				viewerZIndex: 0,
				left: 0,
				dialogClass: {
					"el-dialog": true,
					fullscreen: !!_.$val(modalConfigs, "fullscreen")
				},
				dialogStyle: {
					transform: "unset",
					marginTop: 0,
					opacity: 0,
					left: 0,
					top: 0
				}
			};
		},
		methods: {
			deviceSupportInstall() {},
			async closeModal(options) {
				options = options || {};
				const { isClickCloseIcon } = options;
				let isClose = true;

				if (options.onCancel) {
					isClose = await options.onCancel();
				}

				if (isClose) {
					this.dialogStyle = {
						...this.dialogStyle,
						opacity: 0
					};
					setTimeout(() => {
						this.isClickCloseIcon = isClickCloseIcon;
						this.$destroy();
					}, 300);
				}
			}
		},
		computed: {
			cptCloseIcon() {
				return PRIVATE_GLOBAL.x_modal_close_icon;
			},
			cpt_title() {
				return options.title;
			},
			cptWrapperStyle() {
				return {
					"--xModal-zIndex": this.viewerZIndex
				};
			}
		},
		watch: {
			"dialogClass.fullscreen"() {
				/*
        this.dialogStyle.opacity = 0;
        setTimeout(() => {
        	this.dialogStyle.opacity = 1;
        }, 300);
        */
			}
		}
	});
}
</script>
<style lang="less">
// * { outline: 1px solid red; }

.el-dialog {
	position: relative;
	margin: 0 auto 50px;
	border-radius: var(--border-radius--mini);
	-webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
	box-sizing: border-box;
	width: 50%;
	background-color: var(--xModal-bg-color, #fff);

	&.is-fullscreen {
		width: 100%;
		margin-top: 0;
		margin-bottom: 0;
		height: 100%;
		overflow: auto;
	}
}

.el-dialog__header {
	padding: 20px 20px 10px;
}

.el-dialog__headerbtn {
	position: absolute;
	top: 20px;
	right: 20px;
	padding: 0;
	background: 0 0;
	border: none;
	outline: 0;
	cursor: pointer;
	font-size: 16px;
}

.el-dialog__headerbtn .el-dialog__close {
	color: var(--el-text-color-secondary);
}

.el-dialog__headerbtn:focus .el-dialog__close,
.el-dialog__headerbtn:hover .el-dialog__close {
	color: var(--el-color-primary);
}

.el-dialog__title {
	line-height: 24px;
	font-size: 18px;
	color: var(--el-text-color-primary);
}

.el-dialog__body {
	padding: 30px 20px;
	color: var(--el-text-color-regular);
	font-size: 14px;
	word-break: break-all;
}

.el-dialog__footer {
	padding: 10px 20px 20px;
	text-align: right;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
}

.el-dialog--center {
	text-align: center;
}

.el-dialog--center .el-dialog__body {
	text-align: initial;
	padding: 25px 25px 30px;
}

.el-dialog--center .el-dialog__footer {
	text-align: inherit;
}

.dialog-fade-enter-active {
	-webkit-animation: dialog-fade-in 0.3s;
	animation: dialog-fade-in 0.3s;
}

.dialog-fade-leave-active {
	-webkit-animation: dialog-fade-out 0.3s;
	animation: dialog-fade-out 0.3s;
}

@-webkit-keyframes dialog-fade-in {
	0% {
		-webkit-transform: translate3d(0, -20px, 0);
		transform: translate3d(0, -20px, 0);
		opacity: 0;
	}

	100% {
		-webkit-transform: translate3d(0, 0, 0);
		transform: translate3d(0, 0, 0);
		opacity: 1;
	}
}

@keyframes dialog-fade-in {
	0% {
		-webkit-transform: translate3d(0, -20px, 0);
		transform: translate3d(0, -20px, 0);
		opacity: 0;
	}

	100% {
		-webkit-transform: translate3d(0, 0, 0);
		transform: translate3d(0, 0, 0);
		opacity: 1;
	}
}

@-webkit-keyframes dialog-fade-out {
	0% {
		-webkit-transform: translate3d(0, 0, 0);
		transform: translate3d(0, 0, 0);
		opacity: 1;
	}

	100% {
		-webkit-transform: translate3d(0, -20px, 0);
		transform: translate3d(0, -20px, 0);
		opacity: 0;
	}
}

@keyframes dialog-fade-out {
	0% {
		-webkit-transform: translate3d(0, 0, 0);
		transform: translate3d(0, 0, 0);
		opacity: 1;
	}

	100% {
		-webkit-transform: translate3d(0, -20px, 0);
		transform: translate3d(0, -20px, 0);
		opacity: 0;
	}
}

.el-dialog__wrapper {
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	margin: 0;
	overflow: hidden;
	z-index: var(--xModal-zIndex);
	&::before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		// background-color: rgba(255, 255, 255, 0.5);
		// backdrop-filter: blur(1px);
	}

	> .el-dialog {
		width: auto;
		margin: auto;
		overflow: hidden;
		border-radius: var(--xModel-dialog-border-radius, --border-radius--mini);
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
		box-sizing: border-box;
		position: absolute;
		transition: opacity 0.3s ease-in-out;
		box-shadow:
			0 6px 16px 0 rgba(0, 0, 0, 0.08),
			0 3px 6px -4px rgba(0, 0, 0, 0.12),
			0 9px 28px 8px rgba(0, 0, 0, 0.05);

		&.fullscreen {
			display: flex;
			flex-flow: column nowrap;
			width: 100vw;
			height: 100vh;
		}

		> .el-dialog__header {
			padding: var(--ui-one);
			border-bottom: 1px solid #eee;
			.el-dialog__title-bar {
				cursor: move;
				background-color: transparent;
				position: absolute;
				top: 0;
				right: 0;
				height: 10px;
				z-index: 1;
				left: 0;
			}

			.x-dialog__headerbtn {
				position: absolute;
				top: 20px;
				padding: 0;
				background: 0 0;
				border: none;
				outline: 0;
				cursor: pointer;
				font-size: 16px;

				&.fullscreen {
					right: 36px;
				}

				&.close {
					right: 10px;
				}
			}
		}
	}
}
</style>
