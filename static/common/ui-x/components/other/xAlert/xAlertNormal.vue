<template>
	<transition name="el-alert-fade">
		<div
			class="el-alert"
			:class="[typeClass, center ? 'is-center' : '', 'is-' + effect]"
			v-show="visible"
			role="alert">
			<i class="el-alert__icon" :class="[iconClass, isBigIcon]" v-if="showIcon"></i>
			<div class="el-alert__content">
				<span class="el-alert__title" :class="[isBoldTitle]" v-if="title || $slots.title">
					<slot name="title">{{ title }}</slot>
				</span>
				<p class="el-alert__description" v-if="$slots.default && !description">
					<slot></slot>
				</p>
				<p class="el-alert__description" v-if="description && !$slots.default">
					{{ description }}
				</p>
				<i
					class="el-alert__closebtn"
					:class="{ 'is-customed': closeText !== '', 'el-icon-close': closeText === '' }"
					v-show="closable"
					@click="close()"
					>{{ closeText }}</i
				>
			</div>
		</div>
	</transition>
</template>
<script lang="ts">
export default async function () {
	const TYPE_CLASSES_MAP = {
		success: "el-icon-success",
		warning: "el-icon-warning",
		error: "el-icon-error"
	};

	return defineComponent({
		name: "xAlert",
		props: {
			title: {
				type: String,
				default: ""
			},
			description: {
				type: String,
				default: ""
			},
			type: {
				type: String,
				default: "info"
			},
			closable: {
				type: Boolean,
				default: true
			},
			closeText: {
				type: String,
				default: ""
			},
			showIcon: Boolean,
			center: Boolean,
			effect: {
				type: String,
				default: "light",
				validator: function (value) {
					return ["light", "dark"].indexOf(value) !== -1;
				}
			}
		},

		data() {
			return {
				visible: true
			};
		},

		methods: {
			close() {
				this.visible = false;
				this.$emit("close");
			}
		},

		computed: {
			typeClass() {
				return `el-alert--${this.type}`;
			},

			iconClass() {
				return TYPE_CLASSES_MAP[this.type] || "el-icon-info";
			},

			isBigIcon() {
				return this.description || this.$slots.default ? "is-big" : "";
			},

			isBoldTitle() {
				return this.description || this.$slots.default ? "is-bold" : "";
			}
		}
	});
}
</script>
