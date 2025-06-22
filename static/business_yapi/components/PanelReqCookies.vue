<style lang="less">
.headers-panel {
	padding: 16px;

	.header-row {
		display: flex;
		gap: 8px;
		margin-bottom: 8px;
		align-items: center;

		.header-checkbox {
			width: 20px;
		}

		.header-input {
			flex: 1;
		}

		.header-actions {
			width: 40px;
		}
	}

	.add-header {
		margin-top: 16px;
	}
}
</style>
<template>
	<div class="headers-panel">
		<div v-for="(header, index) in headers" :key="index" class="header-row">
			<xCheckbox v-model="header.enabled" class="header-checkbox" />

			<xInput
				v-model="header.key"
				placeholder="Header Key"
				class="header-input"
				:disabled="!header.enabled" />

			<xInput
				v-model="header.value"
				placeholder="Header Value"
				class="header-input"
				:disabled="!header.enabled" />

			<div class="header-actions">
				<xBtn preset="text" icon="el-icon-delete" @click="removeHeader(index)" />
			</div>
		</div>

		<xBtn
			preset="primary"
			size="small"
			icon="el-icon-plus"
			class="add-header"
			@click="addHeader">
			Add Header
		</xBtn>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		name: "PanelReqBodyJsonHeaders",

		data() {
			return {
				headers: []
			};
		},

		methods: {
			addHeader() {
				this.headers.push({
					key: "",
					value: "",
					enabled: true
				});
			},

			removeHeader(index) {
				this.headers.splice(index, 1);
			},

			// Get all enabled headers as an object
			getHeaders() {
				return this.headers
					.filter(h => h.enabled && h.key)
					.reduce((acc, h) => {
						acc[h.key] = h.value;
						return acc;
					}, {});
			}
		}
	});
}
</script>
