<style lang="less">
#ImSection {
	width: 1px;
}
</style>
<template>
	<section class="x-page-view flex1 flash-when" id="ImSection">
		<xPageContent>
			<div class="flex1 overflow-auto" ref="refChatContent">
				<div ref="refChatContentWrapper">
					inject_im.cptImChatWith: {{ inject_im.cptImChatWith }}
					<div class="content-item" v-for="item in contentArray" :key="item.add_time">
						<YapiChatContentItem :item="item" />
					</div>
				</div>
			</div>
			<div class="chat-content-editor">
				<TuiEditor
					:value="{ md: newChatContent }"
					@change="val => (newChatContent = val.md)"
					:asRender="false"
					style="height: 300px"
					@keydown="onKeydown" />
			</div>
			<div class="flex center width100 mt">
				<xBtn :configs="cptSendBtn" ref="refSendNewChatBtn" />
			</div>
		</xPageContent>
	</section>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["APP", "inject_im"],
		components: {
			YapiChatContentItem: () => _.$importVue("@/components/YapiChatContentItem.vue")
		},
		setup() {
			onMounted(() => {
				this.APP.$on("chat_one", item => {
					this.contentArray.push(item);
					this.setPosition();
				});
			});

			onUnmounted(() => {
				this.APP.$off("chat_one");
			});
		},
		data() {
			return {
				loading: false,
				newChatContent: "",
				contentArray: []
			};
		},
		computed: {
			cptSendBtn({ inject_im, newChatContent, sendNewChat }) {
				return {
					label: "发送(Ctrl+Enter)",
					preset: "primary",
					disabled: !inject_im.cptImChatWith.uid || !newChatContent,
					onClick: () => sendNewChat()
				};
			},
			cptBelongParams() {
				return {
					wsId: this.APP.WS_ID,
					belong_type: "chat_one",
					belong_id: [this.APP.user._id, this.inject_im.cptImChatWith.uid]
						.map(i => Number(i))
						.sort((a, b) => a - b)
						.join("_")
				};
			}
		},
		methods: {
			setPosition() {
				setTimeout(() => {
					const height = $(this.$refs.refChatContentWrapper).height();
					this.$refs.refChatContent.scrollTo({
						top: height,
						behavior: "smooth"
					});
				}, 1000);
			},
			async updateContent() {
				try {
					const {
						data: { list }
					} = await _api.yapi.wikiList(this.cptBelongParams);
					this.contentArray = list;
					this.setPosition();
				} catch (error) {
					console.error(error);
				} finally {
				}
			},
			onKeydown({ event, type }) {
				const isCtrlOrCommand = event.ctrlKey || event.metaKey;
				if (isCtrlOrCommand) {
					if (event.key === "Enter") {
						this.$refs.refSendNewChatBtn.handleClick();
					}
				}
			},
			async sendNewChat() {
				const vm = this;
				try {
					_.$loading(true);
					const params = _.merge(this.cptBelongParams, {
						title: "chat_content",
						type: Vue._yapi_var.ARTICLE,
						p_id: vm.pid,
						markdown: String(vm.newChatContent)
					});
					await _api.yapi.wiki_upsert_one(params);
					vm.$nextTick(() => {
						vm.newChatContent = "";
					});
				} catch (error) {
					console.error(error);
				} finally {
					_.$loading();
				}
			}
		},
		watch: {
			"inject_im.cptImChatWith"(cptImChatWith) {
				if (cptImChatWith.uid) {
					this.updateContent();
				}
			}
		}
	});
}
</script>
