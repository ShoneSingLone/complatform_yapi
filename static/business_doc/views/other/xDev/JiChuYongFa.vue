<template>
	<div class="demo-xdev-basic">
		<h3>基础用法</h3>
		<p>xDev 组件用于展示调试信息，默认折叠状态。</p>
		<xDev :contents="demoData" @close="handleClose" />

		<h3>展示复杂数据</h3>
		<p>支持展示任意JavaScript对象，包括嵌套结构。</p>
		<xDev :contents="complexData" @close="handleClose" />

		<h3>实时数据</h3>
		<p>可以动态更新展示内容。</p>
		<xDev :contents="realTimeData" @close="handleClose" />
		<button @click="updateData" class="el-button el-button--primary">更新数据</button>
	</div>
</template>

<script>
export default async function () {
	return defineComponent({
		setup() {
			// 简单数据示例
			const demoData = ref({
				name: "xDev Component",
				version: "1.0.0",
				author: "Developer",
				description: "A draggable and collapsible debug component"
			});

			// 复杂数据示例
			const complexData = ref({
				user: {
					id: 123,
					name: "John Doe",
					email: "john@example.com",
					address: {
						city: "New York",
						country: "USA",
						zipcode: "10001"
					}
				},
				orders: [
					{ id: 1, product: "Product A", price: 100 },
					{ id: 2, product: "Product B", price: 200 },
					{ id: 3, product: "Product C", price: 300 }
				],
				status: {
					active: true,
					lastLogin: "2026-01-13T10:00:00Z"
				}
			});

			// 实时数据示例
			const realTimeData = ref({
				time: new Date().toLocaleString(),
				counter: 0,
				status: "running"
			});

			// 更新实时数据
			const updateData = () => {
				realTimeData.value = {
					time: new Date().toLocaleString(),
					counter: realTimeData.value.counter + 1,
					status: realTimeData.value.counter % 2 === 0 ? "running" : "paused"
				};
			};

			// 处理关闭事件
			const handleClose = () => {
				console.log("xDev component closed");
			};

			return {
				demoData,
				complexData,
				realTimeData,
				updateData,
				handleClose
			};
		}
	});
}
</script>

<style lang="less">
.demo-xdev-basic {
	padding: 20px;

	h3 {
		margin: 20px 0 10px 0;
		font-size: 16px;
		font-weight: bold;
	}

	p {
		margin: 10px 0;
		color: #606266;
	}

	button {
		margin: 10px 0;
	}

	.x-dev-component {
		margin: 10px 0;
	}
}
</style>
