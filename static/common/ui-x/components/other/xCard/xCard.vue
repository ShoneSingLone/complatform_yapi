<template>
	<div class="el-card xCard flex vertical" :class="cptClassName">
		<div class="el-card__header width100" v-if="$slots.header || header">
			<xRender :render="$slots.header || header" />
		</div>
		<div :class="cptBodyClass" :style="bodyStyle">
			<slot></slot>
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		name: "xCard",
		props: {
			header: {},
			bodyStyle: {},
			bodyClass: {},
			shadow: {
				type: String
			}
		},
		computed: {
			cptClassName() {
				if (this.shadow) {
					return `is-${this.shadow}-shadow`;
				} else {
					if (this.$X_APP_THEME === "tiny") {
						return "";
					} else {
						return "is-always-shadow";
					}
				}
			},
			cptBodyClass() {
				return ["el-card__body flex1", this.bodyClass || {}];
			}
		}
	});
}
</script>
<style lang="less">
.xCard {
	.el-card__body {
		position: relative;
	}
}
</style>
