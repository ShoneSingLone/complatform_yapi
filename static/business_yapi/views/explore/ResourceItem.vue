<style lang="less">
.resource-item {
	--card-bg: #f5f5f5;
	--hover-bg: #e8e8e8;
	--shadow: 0 1px 2px 1px rgba(0, 0, 0, 0.1);
	--border-radius: 8px;
	width: 100%;
	padding: 4px 5px;
	border-radius: 5px;
	display: flex;
	border: 1.5px solid transparent;
	font-size: 14px;
	align-items: flex-start;
	min-height: 30px;
	height: auto;
	transition: 50ms;
	cursor: pointer;

	&:hover {
		background-color: var(--hover-bg);
		box-shadow: var(--shadow);
	}

	&.file {
		color: #555;
	}

	img {
		width: 25px;
		height: 25px;
		margin-right: 5px;
		margin-top: 1px;
		flex-shrink: 0;
		object-fit: cover;
		border-radius: 3px;
	}

	&.file img {
		width: 22px;
		height: 22px;
		margin-left: 2px;
		margin-right: 7px;
		margin-top: 3px;
	}

	&.file img[alt="preview"] {
		width: 40px;
		height: 40px;
		object-fit: cover;
		border: 1px solid #e0e0e0;
		border-radius: 4px;
		margin-right: 8px;
		margin-top: 0;
	}

	.name {
		flex-grow: 1;
		margin-right: 10px;
		word-break: break-all;
	}

	.type {
		font-size: 12px;
		color: #888;
		min-width: 60px;
		flex-shrink: 0;
		padding-top: 2px;
	}
}
</style>
<template>
	<div v-if="resource.type === 'img'" class="resource-item file" @click="clickItem">
		<img :src="cpt_img_preview_src" alt="preview" />
		<div class="name">{{ resource.name }}</div>
		<div class="type">{{ resource.type }}</div>
	</div>
	<div v-else class="resource-item" :class="{ file: isShow(resource) }" @click="clickItem">
		<img :src="getIcon(resource)" alt="icon" />
		<div class="name">{{ resource.name }}</div>
		<div class="type">{{ resource.type }}</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	const { THIS_FILE_URL } = this;
	return defineComponent({
		props: ["resource"],
		data() {
			return { THIS_FILE_URL };
		},
		computed: {
			cpt_img_preview_src() {
				let uri = encodeURIComponent(JSON.stringify(this.resource.path));

				return Vue._common_utils.appendToken(
					_.$ajax.urlWrapper(`/api/resource/get?uri=${uri}&preview=true`)
				);
			}
		},
		methods: {
			isShow(item) {
				return ["audio", "video", "img"].includes(item.type);
			},
			clickItem() {
				if (this.isShow(this.resource)) {
					this.$emit("play-media", this.resource);
				} else {
					this.$emit("subdir", this.resource);
				}
			},
			getIcon(item) {
				if (item.type === "folder") {
					return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%234a90e2'%3E%3Cpath d='M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z'/%3E%3C/svg%3E";
				} else if (item.type === "audio") {
					return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%234caf50'%3E%3Cpath d='M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z'/%3E%3C/svg%3E";
				} else if (item.type === "video") {
					return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ff9800'%3E%3Cpath d='M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z'/%3E%3C/svg%3E";
				} else {
					return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%239e9e9e'%3E%3Cpath d='M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z'/%3E%3C/svg%3E";
				}
			}
		}
	});
}
</script>
