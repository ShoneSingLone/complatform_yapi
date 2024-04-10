<template>
	<div :class="xDialogClass" v-bind="$attrs" ref="refDialog" :style="cptRootStyle">
		<div class="xDialog-body">
			<slot />
		</div>
		<div class="xDialog-footer">
			<slot name="footer" />
		</div>
	</div>
</template>

<script lang="ts">
export default async function () {
	return {
		props: ["title"],
		inject: {
			inject_modal: {
				/* xModal */
				type: Object,
				default: () => {
					return {};
				}
			}
		},
		setup(props) {
			const { inject_modal } = this;
			const { useAutoResize } = _useXui;
			const { height, width, sizer: refDialog } = useAutoResize(props);
			const { height: windowHeight, width: windowWidth } = _useXui.useWindowSize();

			const cptRootStyle = computed(() => {
				if (inject_modal.dialogClass?.fullscreen) {
					return {
						// flex: "1",
						// height: "100%",
						// width: "100%"
					};
				}

				let _height,
					_width,
					_style = {};
				if (height.value && height.value > windowHeight.value) {
					_height = windowHeight.value;
				}
				if (width.value && width.value > windowWidth.value) {
					_width = windowWidth.value;
				}

				if (_height) {
					_style.height = _height + "px";
				}
				if (_width) {
					_style.width = _width + "px";
				}
				return _style;
			});

			return { refDialog, cptRootStyle };
		},
		computed: {
			xDialogClass() {
				return {
					"xDialog xDialog-wrapper": true,
					fullscreen: this.inject_modal.dialogClass?.fullscreen
				};
			}
		}
	};
}
</script>

<style lang="less">
.xDialog {
	--xDialog-padding: var(--ui-one);

	&.xDialog-wrapper {
		display: flex;
		flex-flow: column nowrap;
		height: 100%;
		max-height: calc(100vh - 200px);
		min-width: unset;
		width: var(--xDialog-wrapper-width, 600px);

		&.fullscreen {
			max-height: 100vh;
			width: 100vw;
		}

		&.xDialog-list-view {
			max-height: 100%;

			.xDialog-body {
				padding-top: 0;
				padding-left: 0;
				padding-right: 0;
			}

			.page-content-wrapper {
				// padding: 0;
			}
		}
	}

	.xDialog-body {
		height: 1px;
		flex: 1;
		overflow: auto;
		padding: var(--xDialog-padding);
		display: flex;
		flex-flow: column nowrap;
	}

	.xDialog-footer {
		padding: 0 var(--xDialog-padding) var(--xDialog-padding);
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-end;
		align-items: center;
	}
}
</style>
