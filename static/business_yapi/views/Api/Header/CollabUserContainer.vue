<template>
	<div class="online-users-container">
		<div
			v-for="(user, index) in current_online_user"
			:title="username(user._id)"
			:key="user._id"
			class="collab-user"
			:style="iconStyle(index)">
			<!-- 用户信息 -->
			<div class="user-details">
				<xIcon
					:img="useravatar(user)"
					:iscache="true"
					class="user-avatar-icon" />
			</div>
		</div>
		<xBadge
			:value="current_online_user.length"
			class="success online-users-count-badge" />
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["APP"],
		data() {
			return {};
		},
		methods: {
			username(uid) {
				return (
					_.find(this.APP.all_user, user => _.$isSame(user.uid, uid))
						?.username || "匿名"
				);
			},
			useravatar(user) {
				return _common_utils.avatar_url(user._id);
			},
			iconStyle(index) {
				return {
					zIndex: index + 1,
					left: index * 20 + "px"
				};
			}
		},
		computed: {
			current_online_user() {
				return _.map(this.APP.current_online_user, item => item);
			}
		}
	});
}
</script>

<style lang="less">
.online-users-container {
	position: relative;

	.online-users-count-badge {
		position: absolute;
		top: -10px;
		right: 0;
	}

	.collab-user {
		position: absolute;
		right: 0;
		bottom: 0;
		transform: translateY(50%);
		display: inline-flex;
		align-items: center;
		background: white;
		border-radius: 50%;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
		transition: all 0.2s ease;

		&:hover {
			transform: translateY(40%) scale(1.6);
			box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
			z-index: 999 !important; /* 确保悬停时置顶 */
		}

		.user-avatar-wrapper {
			position: relative;
			margin-right: 10px;

			.user-avatar {
				width: 32px;
				height: 32px;
				object-fit: cover;
				border: 2px solid #f3f4f6;
			}
		}

		.user-details {
			display: flex;
			align-items: center;
			gap: 6px;

			.user-avatar-icon {
				width: 32px;
				height: 32px;
				border-radius: 50%;
			}
		}
	}
}

@keyframes pulse {
	0% {
		transform: scale(0.9);
		box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
	}

	70% {
		transform: scale(1);
		box-shadow: 0 0 0 4px rgba(59, 130, 246, 0);
	}

	100% {
		transform: scale(0.9);
		box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
	}
}
</style>
