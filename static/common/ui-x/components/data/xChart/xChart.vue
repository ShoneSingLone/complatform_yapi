<style lang="less"></style>
<template>
	<xAutoResizer>
		<template #default="{ width, height }">
			<div
				:key="_uid"
				class="x-chart flex flex1 center middle"
				:width="width"
				:height="height" />
		</template>
	</xAutoResizer>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		name: "xCharts",
		props: {
			/*任一附带信息*/
			payload: {
				required: false,
				type: [Object, String],
				default: ""
			},
			/**
			 * 一个js文件名，里面有显示echart需要的配置信息和接口数据的处理方法
			 * 或者一个对象CONFIGS_MAP
			 */
			configs: {
				type: [String, Object],
				required: true,
				validator(value) {
					// ["initOptions", "updateOptions"];
					return true;
				}
			},
			dataset: {
				type: [Array, Object],
				/* 接口返回的数据，通过对应的handler来处理数据 */
				default() {
					return [];
				}
			}
		},
		setup() {
			const vm = this;

			vm.updateOptions = _.debounce(async function () {
				const echarts = await _.$appendScript(
					"/common/libs/echarts/echarts.min.js",
					"echarts"
				);
				if (vm.myChart) {
					vm.myChart.dispose();
				}
				await _.$ensure(() => vm.$el);
				const options = vm.helper.initOptions(vm.$props);
				vm.options = vm.helper.updateOptions(options, vm.dataset);
				vm.myChart = markRaw(echarts.init(vm.$el));
				if (vm?.helper?.afterInit) {
					vm?.helper?.afterInit({ instance: vm.myChart });
				}
				vm.myChart.showLoading();
				vm.myChart.setOption(vm.options);
				vm.myChart.hideLoading();
			}, 300);
			return { myChart: false };
		},
		computed: {
			helper() {
				if (_.isPlainObject(this.configs)) {
					return this.configs;
				}
				// return CONFIGS_MAP[this.configs];
			}
		},
		watch: {
			dataset() {
				this.updateOptions();
			}
		},
		mounted() {
			this.init();
		},
		methods: {
			async init() {
				this.observe();
				this.updateOptions();
			},
			observe() {
				//如果有变化了 那么就调用echart的resize方法改变大小
				this.resizeObserver = new ResizeObserver(() => {
					if (this.myChart) {
						this.updateOptions();
						if (this?.helper?.onResize) {
							this.helper.onResize({
								instance: this.myChart,
								chartVM: this
							});
						}
					}
				});
				this.resizeObserver.observe(this.$el);
			}
		}
	});
}
</script>
