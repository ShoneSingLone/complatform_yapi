<template>
	<div id="ProjectHoppscotch" class="height100 width100">
		<iframe
			ref="hoppscotchFrame"
			:src="hoppscotchUrl"
			class="height100 width100 border0"
			frameborder="0"
			allowfullscreen
		></iframe>
	</div>
</template>

<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["APP"],
		data() {
			return {
				hoppscotchUrl: "https://hoppscotch.io/"
			};
		},
		computed: {
			projectId() {
				return this.APP.cptProjectId;
			}
		},
		mounted() {
			// 可以在这里添加与 Hoppscotch 的交互逻辑
			// 例如：发送当前项目信息到 Hoppscotch
			this.setupHoppscotchCommunication();
		},
		methods: {
			setupHoppscotchCommunication() {
				// 监听来自 Hoppscotch 的消息
				window.addEventListener('message', (event) => {
					if (event.origin === 'https://hoppscotch.io') {
						// 处理来自 Hoppscotch 的消息
						console.log('Message from Hoppscotch:', event.data);
					}
				});

				// 可以向 Hoppscotch 发送消息
				const sendMessageToHoppscotch = (data: any) => {
					const frame = this.$refs.hoppscotchFrame as HTMLIFrameElement;
					if (frame && frame.contentWindow) {
						frame.contentWindow.postMessage(data, 'https://hoppscotch.io');
					}
				};

				// 示例：发送当前项目信息
				setTimeout(() => {
					sendMessageToHoppscotch({
						type: 'YAPI_PROJECT_INFO',
						projectId: this.projectId,
						source: 'yapi'
					});
				}, 1000);
			}
		}
	});
}
</script>

<style lang="less">
#ProjectHoppscotch {
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
}
</style>