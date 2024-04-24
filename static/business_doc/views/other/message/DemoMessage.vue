<template>
	<DocContentOfDemo>
		<xMd :md="md1" />
		<div class="DemoMessage-demo">
			<div role="alert" class="el-message el-message--info is-closable" style="position: relative">
				<i class="el-message__icon el-icon-info"></i>
				<p class="el-message__content">这是一条消息提示</p>
				<i class="el-message__closeBtn el-icon-close"></i>
			</div>
			<div role="alert" class="el-message el-message--success is-closable" style="position: relative">
				<i class="el-message__icon el-icon-success"></i>
				<p class="el-message__content">恭喜你，这是一条成功消息</p>
				<i class="el-message__closeBtn el-icon-close"></i>
			</div>
			<div role="alert" class="el-message el-message--warning is-closable" style="position: relative">
				<i class="el-message__icon el-icon-warning"></i>
				<p class="el-message__content">警告哦，这是一条警告消息</p>
				<i class="el-message__closeBtn el-icon-close"></i>
			</div>
			<div role="alert" class="el-message el-message--error is-closable" style="position: relative">
				<i class="el-message__icon el-icon-error"></i>
				<p class="el-message__content">错了哦，这是一条错误消息</p>
				<i class="el-message__closeBtn el-icon-close"></i>
			</div>
		</div>
		<DemoAndCode title="基础用法" path="@/views/other/message/JiChuYongFa.vue" unfold />
		<DemoAndCode title="不同状态" path="@/views/other/message/BuTongZhuangTai.vue" unfold />
		<DemoAndCode title="可关闭" path="@/views/other/message/KeGuanBi.vue" unfold />
		<DemoAndCode title="文字居中" path="@/views/other/message/WenZiJuZhong.vue" unfold />
		<DemoAndCode title="使用 HTML 片段" path="@/views/other/message/ShiYongHtmlPianDuan.vue" unfold />
		<xMd :md="apiString" data-role="api" />
	</DocContentOfDemo>
</template>

<script lang="ts">
export default async function () {
	/* 用于加载样式，实际使用中是懒加载，不用担心 */
	const _message = await _.$importVue("/common/ui-x/directive/xMessage/xMessage.vue");
	return {
		data() {
			return {
				md1: `## Message 消息提示

常用于主动操作后的反馈提示。与 Notification 的区别是后者更多用于系统级通知的被动提醒。

- 全局方法 \`_.$msg\` 用于调用，
- 调用 \`_.$msg\` 会返回当前 Message 的实例。如果需要手动关闭实例，可以调用它的 \`close\` 方法。
- 如果需要手动关闭全部实例，可以调用 \`_.$msg.closeAll\` 方法。

`,
				apiString: `### Options
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| message | 消息文字 | string / VNode | — | — |
| type | 主题 | string | success/warning/info/error | info |
| iconClass | 自定义图标的类名，会覆盖 \`type\` | string | — | — |
| dangerouslyUseHTMLString | 是否将 message 属性作为 HTML 片段处理 | boolean | — | false |
| customClass | 自定义类名 | string | — | — |
| duration | 显示时间, 毫秒。设为 0 则不会自动关闭 | number | — | 3000 |
| showClose | 是否显示关闭按钮 | boolean | — | false |
| center | 文字是否居中 | boolean | — | false |
| onClose | 关闭时的回调函数, 参数为被关闭的 message 实例 | function | — | — |
| offset | Message 距离窗口顶部的偏移量 | number | — | 20 |

### 方法

| 方法名 | 说明 |
| ---- | ---- |
| close | 关闭当前的 Message |				`
			};
		}
	};
}
</script>

<style lang="less">
.el-message {
	min-width: 380px;
	box-sizing: border-box;
	border-width: 1px;
	border-style: solid;
	border-color: var(--el-border-color-lighter);
	position: fixed;
	left: 50%;
	top: 20px;
	transform: translateX(-50%);
	background-color: #edf2fc;
	transition:
		opacity 0.3s,
		transform 0.4s,
		top 0.4s;
	padding: 15px 15px 15px 20px;
	display: flex;
	align-items: center;

	p {
		margin: 0;
	}

	&.is-closable {
		.el-message__content {
			padding-right: 16px;
		}
	}

	&.is-center {
		justify-content: center;
	}

	&.el-message--info {
		background-color: var(--xAlert-info-light-bg-color);
		border-color: var(--xMessage-info-border-color, var(--el-color-info-light-8));
		.el-message__content {
			color: var(--xAlert-info-light-color);
		}
	}

	&.el-message--success {
		background-color: var(--xAlert-success-light-bg-color);
		border-color: var(--xMessage-success-border-color, var(--el-color-success-light-8));
		.el-message__content {
			color: var(--xAlert-success-light-color);
		}
	}

	&.el-message--warning {
		background-color: var(--xAlert-warning-light-bg-color);
		border-color: var(--xMessage-warning-border-color, var(--el-color-warning-light-8));
		.el-message__content {
			color: var(--xAlert-warning-light-color);
		}
	}

	&.el-message--error {
		background-color: var(--xAlert-error-light-bg-color);
		border-color: var(--xMessage-error-border-color, var(--el-color-error-light-8));

		.el-message__content {
			color: var(--xAlert-error-light-color);
		}
	}

	.el-message__icon {
		margin-right: 10px;
	}

	.el-message__content {
		padding: 0;
		font-size: 14px;
		line-height: 1;
	}

	.el-message__closeBtn {
		position: absolute;
		top: 50%;
		right: 15px;
		transform: translateY(-50%);
		cursor: pointer;
		color: var(--xAlert-close-btn-color);
		font-size: 16px;

		&:hover {
			color: var(--el-text-color-secondary);
		}
	}

	.el-icon- {
		&success {
			color: var(--el-color-success);
		}

		&error {
			color: var(--el-color-error);
		}

		&info {
			color: var(--el-text-color-secondary);
		}

		&warning {
			color: var(--el-color-warning);
		}
	}

	.el-message-fade-enter,
	.el-message-fade-leave-active {
		opacity: 0;
		-webkit-transform: translate(-50%, -100%);
		transform: translate(-50%, -100%);
	}
}

.DemoMessage-demo {
	height: 270px;

	> div {
		margin-bottom: 16px;
	}
}
</style>
