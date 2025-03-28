<template>
	<div class="el-step" :style="style" :class="cptClassStep">
		<!-- icon & line -->
		<div class="el-step__head" :class="cptClassStepHead">
			<div
				class="el-step__line"
				:style="isLast ? '' : { marginRight: $parent.stepOffset + 'px' }">
				<i class="el-step__line-inner" :style="lineStyle"></i>
			</div>

			<div class="el-step__icon" :class="cptClassStepIcon">
				<slot v-if="currentStatus !== 'success' && currentStatus !== 'error'" name="icon">
					<xIcon v-if="icon" class="el-step__icon-inner" :icon="[icon]" />
					<div class="el-step__icon-inner" v-if="!icon && !isSimple">{{ index + 1 }}</div>
				</slot>
				<xIcon v-else :class="cptIconClass" :icon="'icon_' + cptIconName" />
			</div>
		</div>
		<!-- title & description -->
		<div class="el-step__main">
			<div class="el-step__title" ref="title" :class="['is-' + currentStatus]">
				<slot name="title">{{ title }}</slot>
			</div>
			<div v-if="isSimple" class="el-step__arrow"></div>
			<div v-else class="el-step__description" :class="['is-' + currentStatus]">
				<slot name="description">{{ description }}</slot>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		name: "ElStep",
		props: {
			title: String,
			icon: String,
			description: String,
			status: String
		},

		data() {
			return {
				index: -1,
				lineStyle: {},
				internalStatus: ""
			};
		},

		beforeCreate() {
			this.$parent.steps.push(this);
		},

		beforeDestroy() {
			const steps = this.$parent.steps;
			const index = steps.indexOf(this);
			if (index >= 0) {
				steps.splice(index, 1);
			}
		},

		computed: {
			cptIconName({ currentStatus }) {
				return currentStatus === "success" ? "check" : "close";
			},
			cptIconClass({ cptIconName }) {
				return ["el-step__icon-inner is-status", `el-icon-${cptIconName}`];
			},
			cptClassStepIcon() {
				return `is-${this.icon ? "icon" : "text"}`;
			},
			cptClassStep() {
				const { isSimple, $parent, isLast, space, isCenter, isVertical } = this;

				return [
					isSimple ? "is-simple" : `is-${$parent.direction}`,
					{
						"is-flex": isLast && !space && !isCenter,
						"is-center": isCenter && !isVertical && !isSimple
					}
				];
			},
			cptClassStepHead() {
				return `is-${this.currentStatus}`;
			},
			currentStatus() {
				return this.status || this.internalStatus;
			},
			prevStatus() {
				const prevStep = this.$parent.steps[this.index - 1];
				return prevStep ? prevStep.currentStatus : "wait";
			},
			isCenter() {
				return this.$parent.alignCenter;
			},
			isVertical() {
				return this.$parent.direction === "vertical";
			},
			isSimple() {
				return this.$parent.simple;
			},
			isLast() {
				const parent = this.$parent;
				return parent.steps[parent.steps.length - 1] === this;
			},
			stepsCount() {
				return this.$parent.steps.length;
			},
			space() {
				const {
					isSimple,
					$parent: { space }
				} = this;
				return isSimple ? "" : space;
			},
			style: function () {
				const style = {};
				const parent = this.$parent;
				const len = parent.steps.length;

				const space =
					typeof this.space === "number"
						? this.space + "px"
						: this.space
							? this.space
							: 100 / (len - (this.isCenter ? 0 : 1)) + "%";
				style.flexBasis = space;
				if (this.isVertical) return style;
				if (this.isLast) {
					style.maxWidth = 100 / this.stepsCount + "%";
				} else {
					style.marginRight = -this.$parent.stepOffset + "px";
				}

				return style;
			}
		},

		methods: {
			updateStatus(val) {
				const prevChild = this.$parent.$children[this.index - 1];

				if (val > this.index) {
					this.internalStatus = this.$parent.finishStatus;
				} else if (val === this.index && this.prevStatus !== "error") {
					this.internalStatus = this.$parent.processStatus;
				} else {
					this.internalStatus = "wait";
				}

				if (prevChild) prevChild.calcProgress(this.internalStatus);
			},

			calcProgress(status) {
				let step = 100;
				const style = {};

				style.transitionDelay = 150 * this.index + "ms";
				if (status === this.$parent.processStatus) {
					step = this.currentStatus !== "error" ? 0 : 0;
				} else if (status === "wait") {
					step = 0;
					style.transitionDelay = -150 * this.index + "ms";
				}

				style.borderWidth = step && !this.isSimple ? "1px" : 0;
				this.$parent.direction === "vertical"
					? (style.height = step + "%")
					: (style.width = step + "%");

				this.lineStyle = style;
			}
		},

		mounted() {
			const unwatch = this.$watch("index", val => {
				this.$watch("$parent.active", this.updateStatus, { immediate: true });
				this.$watch(
					"$parent.processStatus",
					() => {
						const activeIndex = this.$parent.active;
						this.updateStatus(activeIndex);
					},
					{ immediate: true }
				);
				unwatch();
			});
		}
	});
}
</script>
