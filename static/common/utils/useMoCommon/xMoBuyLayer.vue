<style lang="less">
.xMoBuyLayer-wrapper {
	width: 100%;
	height: 80px;
	background-color: var(--el-bg-color);
}

.xMoBuyLayer-price-item {
	margin-left: calc(var(--xMoCurrentConfigurations-width) / 2 + var(--ui-one));
}

.xMoBuyLayer-price-num {
	color: var(--el-color-danger);
	font-size: var(--ui-font-size-data-overview);
}

.xMoBuyLayer-opr {
	margin-right: calc(var(--xMoCurrentConfigurations-width) + var(--ui-one));
}
</style>
<template>
	<div class="xMoBuyLayer-wrapper flex center middle">
		<div class="xMoBuyLayer-price-item flex middle">
			<slot name="left"> </slot>
			<slot>
				<span class="xMoBuyLayer-label mr" v-if="!configs.isHideCost">{{ i18n("配置费用") }}: </span>
				<span class="xMoBuyLayer-price-elmt flex middle" v-if="!configs.isHideCost">
					<span class="xMoBuyLayer-price-num mr"> {{ cptPrice || "--" }} </span>
					<span class="xMoBuyLayer-price-unit mr" v-if="cptPrice">/</span>
					<span class="xMoBuyLayer-price-unit mr" v-if="cptPrice">{{ configs.measureUnit }}</span>
				</span>
			</slot>
		</div>
		<xGap f />
		<div class="xMoBuyLayer-opr flex middle">
			<slot name="right">
				<xBtn :configs="btnOk" />
				<xBtn :configs="btnCancel" />
			</slot>
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		props: {
			configs: {
				type: Object,
				default: () => ({
					/*
					isHideCost,
					onOk,
					onCancel,
					priceInfo
				 */
				})
			}
		},
		data() {
			return {};
		},
		computed: {
			cptPrice() {
				const { value, singleValue, measureUnit, currency, symbol } = this.configs?.priceInfo;

				if (!singleValue) {
					return "";
				}
				return `${symbol} ${singleValue} ${currency}`;
			},
			btnOk() {
				const vm = this;
				if (vm?.configs?.btnOk) {
					return vm?.configs?.btnOk;
				}
				const configs = _.merge({
					label: i18n("立即申请"),
					preset: "blue",
					isHide() {
						return !vm?.configs?.isShowBtn;
					},
					onClick() {
						if (vm.configs.onOk) {
							return vm.configs.onOk();
						} else {
							throw new Error("miss onOk callback");
						}
					}
				});
				return configs;
			},
			btnCancel() {
				if (this?.configs?.btnCancel) {
					return this?.configs?.btnCancel;
				}
				return {
					label: i18n("取消"),
					onClick: () => {
						this.configs.onCancel && this.configs.onCancel();
					}
				};
			}
		}
	});
}
</script>
