<template>
	<div class="menu-bar">
		<!-- 左侧：Logo、搜索、面包屑 -->
		<div class="menu-bar-left">
			<div class="logo">
				<xIcon icon="logo" class="logo-icon" />
				<span class="logo-text">XSpace</span>
			</div>

			<div class="search-box">
				<xIcon icon="search" class="search-icon" />
				<input
					type="text"
					v-model="searchQuery"
					@keyup.enter="handleSearch"
					placeholder="搜索资源..."
					class="search-input" />
			</div>

			<div class="breadcrumb">
				<span
					v-for="(item, index) in breadcrumbItems"
					:key="index"
					class="breadcrumb-item">
					<span v-if="index > 0" class="breadcrumb-separator">/</span>
					<span
						class="breadcrumb-text"
						:class="{ active: index === breadcrumbItems.length - 1 }"
						@click="handleBreadcrumbClick(index)">
						{{ item }}
					</span>
				</span>
			</div>
		</div>

		<!-- 中间：工作区信息 -->
		<div class="menu-bar-center">
			<div class="workspace-info">
				<xIcon icon="desktop" class="workspace-icon" />
				<span class="workspace-text">{{ workspaceName }}</span>
			</div>
		</div>

		<!-- 右侧：用户头像、通知 -->
		<div class="menu-bar-right">
			<div class="notification-btn" @click="handleNotification">
				<xIcon icon="bell" class="notification-icon" />
				<span v-if="unreadCount > 0" class="notification-badge">{{ unreadCount }}</span>
			</div>

			<div class="user-menu" @click="toggleUserMenu">
				<img
					v-if="userInfo?.avatar"
					:src="userInfo.avatar"
					class="user-avatar"
					alt="avatar" />
				<div v-else class="user-avatar-placeholder">
					{{ userInitials }}
				</div>
				<xIcon icon="arrow-down" class="user-menu-arrow" />

				<!-- 用户下拉菜单 -->
				<div v-if="showUserMenu" class="user-dropdown">
					<div class="user-dropdown-header">
						<div class="user-name">{{ userInfo?.username || "User" }}</div>
						<div class="user-email">{{ userInfo?.email || "" }}</div>
					</div>
					<div class="user-dropdown-divider"></div>
					<div class="user-dropdown-item" @click="handleProfile">
						<xIcon icon="user" />
						<span>个人资料</span>
					</div>
					<div class="user-dropdown-item" @click="handleSettings">
						<xIcon icon="setting" />
						<span>系统设置</span>
					</div>
					<div class="user-dropdown-divider"></div>
					<div class="user-dropdown-item" @click="handleLogout">
						<xIcon icon="logout" />
						<span>退出登录</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	return {
		props: {
			currentPath: {
				type: String,
				default: "/"
			},
			userInfo: {
				type: Object,
				default: () => null
			}
		},
		data() {
			return {
				searchQuery: "",
				unreadCount: 0,
				showUserMenu: false,
				workspaceName: "我的工作区"
			};
		},
		computed: {
			// 面包屑导航项
			breadcrumbItems() {
				if (!this.currentPath || this.currentPath === "/") {
					return ["工作区"];
				}
				const parts = this.currentPath.split("/").filter(Boolean);
				return ["工作区", ...parts];
			},
			// 用户姓名首字母
			userInitials() {
				if (!this.userInfo?.username) return "U";
				return this.userInfo.username
					.split(" ")
					.map(n => n[0])
					.join("")
					.toUpperCase()
					.slice(0, 2);
			}
		},
		mounted() {
			this.fetchUnreadCount();
			// 点击外部关闭用户菜单
			document.addEventListener("click", this.handleClickOutside);
		},
		beforeDestroy() {
			document.removeEventListener("click", this.handleClickOutside);
		},
		methods: {
			// 处理搜索
			handleSearch() {
				if (this.searchQuery.trim()) {
					this.$emit("search", this.searchQuery.trim());
				}
			},

			// 处理面包屑点击
			handleBreadcrumbClick(index) {
				// 计算点击的路径
				if (index === 0) {
					this.$emit("navigate", "/");
				} else {
					const path =
						"/" + this.breadcrumbItems.slice(1, index + 1).join("/");
					this.$emit("navigate", path);
				}
			},

			// 处理通知
			handleNotification() {
				this.$emit("notification");
			},

			// 获取未读消息数
			async fetchUnreadCount() {
				try {
					const { data } = await _api.xspace.getUnreadCount();
					this.unreadCount = data.count || 0;
				} catch (error) {
					console.error("获取未读消息失败:", error);
				}
			},

			// 切换用户菜单
			toggleUserMenu(event) {
				event.stopPropagation();
				this.showUserMenu = !this.showUserMenu;
			},

			// 处理点击外部
			handleClickOutside(event) {
				const userMenu = this.$el.querySelector(".user-menu");
				if (userMenu && !userMenu.contains(event.target)) {
					this.showUserMenu = false;
				}
			},

			// 处理个人资料
			handleProfile() {
				this.showUserMenu = false;
				console.log("打开个人资料");
			},

			// 处理系统设置
			handleSettings() {
				this.showUserMenu = false;
				console.log("打开系统设置");
			},

				// 处理退出登录
			handleLogout() {
				this.showUserMenu = false;
				console.log("退出登录");
				// 跳转到登录页面
				window.location.href = "/login";
			}
		}
	};
}

</script>

<style lang="less">
.menu-bar {
	height: 48px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 16px;
	background: rgba(255, 255, 255, 0.1);
	backdrop-filter: blur(20px);
	-webkit-backdrop-filter: blur(20px);
	border-bottom: 1px solid rgba(255, 255, 255, 0.2);
	box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);

	.menu-bar-left {
		display: flex;
		align-items: center;
		flex: 1;
		gap: 24px;

		.logo {
			display: flex;
			align-items: center;
			gap: 8px;
			cursor: pointer;
			padding: 6px 8px;
			border-radius: 6px;
			transition: background 0.2s;

			&:hover {
				background: rgba(255, 255, 255, 0.1);
			}

			.logo-icon {
				font-size: 24px;
				color: #fff;
			}

			.logo-text {
				font-size: 16px;
				font-weight: 600;
				color: #fff;
			}
		}

		.search-box {
			display: flex;
			align-items: center;
			background: rgba(255, 255, 255, 0.15);
			border-radius: 20px;
			padding: 6px 12px;
			width: 200px;
			transition: background 0.2s;

			&:focus-within {
				background: rgba(255, 255, 255, 0.25);
			}

			.search-icon {
				font-size: 14px;
				color: rgba(255, 255, 255, 0.7);
				margin-right: 6px;
			}

			.search-input {
				background: none;
				border: none;
				outline: none;
				color: #fff;
				font-size: 13px;
				width: 100%;

				&::placeholder {
					color: rgba(255, 255, 255, 0.5);
				}
			}
		}

		.breadcrumb {
			display: flex;
			align-items: center;
			gap: 8px;

			.breadcrumb-item {
				display: flex;
				align-items: center;

				.breadcrumb-separator {
					color: rgba(255, 255, 255, 0.5);
					margin: 0 4px;
				}

				.breadcrumb-text {
					color: rgba(255, 255, 255, 0.7);
					cursor: pointer;
					padding: 4px 8px;
					border-radius: 4px;
					transition: all 0.2s;

					&:hover {
						background: rgba(255, 255, 255, 0.1);
						color: #fff;
					}

					&.active {
						color: #fff;
						font-weight: 500;
					}
				}
			}
		}
	}

	.menu-bar-center {
		display: flex;
		align-items: center;
		justify-content: center;

		.workspace-info {
			display: flex;
			align-items: center;
			gap: 8px;
			padding: 6px 16px;
			background: rgba(255, 255, 255, 0.1);
			border-radius: 12px;

			.workspace-icon {
				font-size: 16px;
				color: rgba(255, 255, 255, 0.8);
			}

			.workspace-text {
				font-size: 14px;
				color: #fff;
			}
		}
	}

	.menu-bar-right {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		flex: 1;
		gap: 16px;

		.notification-btn {
			position: relative;
			padding: 8px;
			cursor: pointer;
			border-radius: 6px;
			transition: background 0.2s;

			&:hover {
				background: rgba(255, 255, 255, 0.1);
			}

			.notification-icon {
				font-size: 18px;
				color: rgba(255, 255, 255, 0.8);
			}

			.notification-badge {
				position: absolute;
				top: 2px;
				right: 2px;
				background: #ff3b30;
				color: #fff;
				font-size: 10px;
				min-width: 16px;
				height: 16px;
				line-height: 16px;
				text-align: center;
				border-radius: 8px;
				padding: 0 4px;
			}
		}

		.user-menu {
			position: relative;
			display: flex;
			align-items: center;
			gap: 6px;
			cursor: pointer;
			padding: 4px;
			border-radius: 20px;
			transition: background 0.2s;

			&:hover {
				background: rgba(255, 255, 255, 0.1);
			}

			.user-avatar {
				width: 32px;
				height: 32px;
				border-radius: 50%;
				object-fit: cover;
			}

			.user-avatar-placeholder {
				width: 32px;
				height: 32px;
				border-radius: 50%;
				background: rgba(255, 255, 255, 0.2);
				display: flex;
				align-items: center;
				justify-content: center;
				color: #fff;
				font-size: 14px;
				font-weight: 500;
			}

			.user-menu-arrow {
				font-size: 12px;
			}
		}
	}
}