<style lang="less">
.office-section {
	display: flex;
	height: 100vh;

	.sidebar {
		width: 250px;
		border-right: 1px solid #eee;
		padding: 20px;

		.file-manager {
			.search-box {
				margin-bottom: 20px;
			}

			.file-list {
				.file-item {
					display: flex;
					align-items: center;
					padding: 8px;
					cursor: pointer;

					&:hover {
						background: #f5f5f5;
					}

					.file-icon {
						margin-right: 10px;
					}
				}
			}
		}
	}

	.main-content {
		flex: 1;
		display: flex;
		flex-direction: column;

		.toolbar {
			padding: 10px;
			border-bottom: 1px solid #eee;
			display: flex;
			align-items: center;
			gap: 10px;
		}

		.editor-container {
			flex: 1;
			padding: 20px;
			position: relative;
		}

		.status-bar {
			padding: 8px;
			border-top: 1px solid #eee;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
	}

	.collaborators {
		position: fixed;
		top: 20px;
		right: 20px;
		display: flex;
		gap: 8px;

		.avatar {
			position: relative;

			&::after {
				content: "";
				position: absolute;
				bottom: 0;
				right: 0;
				width: 8px;
				height: 8px;
				border-radius: 50%;
				background: #52c41a;
			}
		}
	}
}
</style>
<template>
	<div class="office-section">
		<!-- Sidebar -->
		<div class="sidebar">
			<div class="file-manager">
				<a-input-search
					v-model="searchQuery"
					placeholder="Search files..."
					class="search-box" />
				<div class="file-list">
					<div v-for="file in filteredFiles" :key="file.id" class="file-item">
						<xIcon :icon="file.type" class="file-icon" />
						<span>{{ file.name }}</span>
					</div>
				</div>
			</div>
		</div>

		<!-- Main Content -->
		<div class="main-content">
			<!-- Toolbar -->
			<div class="toolbar">
				<a-input
					v-model="documentTitle"
					placeholder="Document Title"
					style="width: 200px" />
				<xBtnGroup>
					<xBtn @click="applyFormat('bold')"><bold-outlined /></xBtn>
					<xBtn @click="applyFormat('italic')"><italic-outlined /></xBtn>
					<xBtn @click="applyFormat('underline')"><underline-outlined /></xBtn>
				</xBtnGroup>
				<xDropdown>
					<xBtn>
						Share
						<down-outlined />
					</xBtn>
					<template #dropdown>
						<xMenu>
							<xMenuItem @click="inviteCollaborator">Invite Collaborator</xMenuItem>
							<xMenuItem @click="shareDocument">Share Link</xMenuItem>
						</xMenu>
					</template>
				</xDropdown>
			</div>

			<!-- Editor -->
			<div class="editor-container">
				<quill-editor
					v-model="content"
					:options="editorOptions"
					@text-change="onTextChange" />

				<!-- Collaborators -->
				<div class="collaborators">
					<xAvatar
						v-for="user in onlineUsers"
						:key="user.id"
						:src="user.avatar"
						class="avatar"
						:title="user.name" />
				</div>
			</div>

			<!-- Status Bar -->
			<div class="status-bar">
				<span>{{ wordCount }} words</span>
				<span>{{ saveStatus }}</span>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	const { THIS_FILE_URL } = this;
	return defineComponent({
		data() {
			return { THIS_FILE_URL };
		}
	});
}
</script>
