<style lang="less"></style>
<template>
	<transition name="el-message-fade" @after-leave="handleAfterLeave">
		<div :class="cptClass" :style="positionStyle" v-show="visible" @mouseenter="clearTimer" @mouseleave="startTimer" role="alert">
			<i :class="iconClass" v-if="iconClass"></i>
			<i :class="typeClass" v-else></i>
			<xRender :render="msgRender" />
			<i v-if="showClose" class="el-message__closeBtn el-icon-close" @click="close"></i>
		</div>
	</transition>
</template>
<script lang="ts">
export default async function () {
	const typeMap = {
		success: "success",
		info: "info",
		warning: "warning",
		error: "error"
	};

	return defineComponent({
		data() {
			return {
				visible: false,
				message: "",
				duration: 3000,
				type: "info",
				iconClass: "",
				customClass: "",
				onClose: null,
				showClose: false,
				closed: false,
				verticalOffset: 20,
				timer: null,
				dangerouslyUseHTMLString: false,
				center: false
			};
		},

		computed: {
			cptClass() {
				const { type, iconClass, center, showClose, customClass } = this;
				return ["el-message", type && !iconClass ? `el-message--${type}` : "", center ? "is-center" : "", showClose ? "is-closable" : "", customClass];
			},
			typeClass() {
				return this.type && !this.iconClass ? `el-message__icon el-icon-${typeMap[this.type]}` : "";
			},
			positionStyle() {
				return {
					top: `${this.verticalOffset}px`
				};
			}
		},

		watch: {
			closed(newVal) {
				if (newVal) {
					this.visible = false;
				}
			}
		},

		methods: {
			msgRender() {
				const { dangerouslyUseHTMLString, message } = this;
				if (dangerouslyUseHTMLString) {
					return h("p", {
						class: "el-message__content",
						domProps: { innerHTML: message }
					});
				} else {
					let children;
					if (_.isFunction(message)) {
						children = message.call();
					} else {
						children = message;
					}
					return h("p", {
						class: "el-message__content",
						children
					});
				}
			},
			handleAfterLeave() {
				this.$destroy(true);
				this.$el.parentNode.removeChild(this.$el);
			},

			close() {
				this.closed = true;
				if (typeof this.onClose === "function") {
					this.onClose(this);
				}
			},

			clearTimer() {
				clearTimeout(this.timer);
			},

			startTimer() {
				if (this.duration > 0) {
					this.timer = setTimeout(() => {
						if (!this.closed) {
							this.close();
						}
					}, this.duration);
				}
			},
			keydown(e) {
				if (e.keyCode === 27) {
					// esc关闭消息
					if (!this.closed) {
						this.close();
					}
				}
			}
		},
		mounted() {
			this.startTimer();
			document.addEventListener("keydown", this.keydown);
		},
		beforeDestroy() {
			document.removeEventListener("keydown", this.keydown);
		}
	});
}
</script>
