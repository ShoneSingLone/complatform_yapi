<style lang="less">
.YapiChatContentItem-wrapper {
	.YapiChatContentItem {
		width: 55%;
	}
}
</style>
<template>
	<div :class="cptClass">
		<div class="YapiChatContentItem el-card flex vertical x-padding">
			<span>{{ cptAddTime }}</span>
			<span>cptItemUid: {{ cptItemUid }}</span>
			<span>cptCurrentUserId: {{ cptCurrentUserId }}</span>
			<xGap t />
			<TuiEditor :value="cptContent" :asRender="true" />
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["APP"],
		props: ["item"],
		data() {
			return {};
		},
		computed: {
			cptClass({ cptItemUid, cptCurrentUserId }) {
				return [
					"YapiChatContentItem-wrapper width100 flex mb",
					{
						end: cptItemUid === cptCurrentUserId
					}
				];
			},
			cptCurrentUserId() {
				return this.APP.user._id;
			},
			cptItemUid({ item }) {
				return item.uid;
			},
			cptContent({ item }) {
				return { md: item?.markdown || "" };
			},
			cptAddTime() {
				return _.$dateFormat(this.item?.add_time);
			}
		}
	});
}
</script>
