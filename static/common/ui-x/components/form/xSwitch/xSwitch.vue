<style lang="less"></style>
<template>
	<div class="el-switch xSwitch" :class="{ 'is-disabled': switchDisabled, 'is-checked': checked }" role="switch" :aria-checked="checked" :aria-disabled="switchDisabled" @click.prevent="switchValue">
		<input
			class="el-switch__input"
			type="checkbox"
			@change="handleChange"
			ref="input"
			:id="id"
			:name="name"
			:true-value="activeValue"
			:false-value="inactiveValue"
			:disabled="switchDisabled"
			@keydown.enter="switchValue" />
		<span :class="['el-switch__label', 'el-switch__label--left', !checked ? 'is-active' : '']" v-if="inactiveIconClass || inactiveText">
			<i :class="[inactiveIconClass]" v-if="inactiveIconClass"></i>
			<span v-if="!inactiveIconClass && inactiveText" :aria-hidden="checked">{{ inactiveText }}</span>
		</span>
		<span class="el-switch__core" ref="core" :style="{ width: coreWidth + 'px' }"> </span>
		<span :class="['el-switch__label', 'el-switch__label--right', checked ? 'is-active' : '']" v-if="activeIconClass || activeText">
			<i :class="[activeIconClass]" v-if="activeIconClass"></i>
			<span v-if="!activeIconClass && activeText" :aria-hidden="!checked">{{ activeText }}</span>
		</span>
	</div>
</template>
<script lang="ts">
export default async function () {
	const [{ useFocus }] = await Promise.all([_.$importVue("/common/utils/hooks.vue")]);

	return defineComponent({
		name: "xSwitch",
		setup() {
			const { focus } = useFocus(this, "input");
			return { focus };
		},
		inject: {
			elForm: {
				default: ""
			}
		},
		props: {
			value: {
				type: [Boolean, String, Number],
				default: false
			},
			disabled: {
				type: Boolean,
				default: false
			},
			width: {
				type: Number,
				default: 40
			},
			activeIconClass: {
				type: String,
				default: ""
			},
			inactiveIconClass: {
				type: String,
				default: ""
			},
			activeText: String,
			inactiveText: String,
			activeColor: {
				type: String,
				default: ""
			},
			inactiveColor: {
				type: String,
				default: ""
			},
			activeValue: {
				type: [Boolean, String, Number],
				default: true
			},
			inactiveValue: {
				type: [Boolean, String, Number],
				default: false
			},
			name: {
				type: String,
				default: ""
			},
			validateEvent: {
				type: Boolean,
				default: true
			},
			id: String
		},
		data() {
			return {
				coreWidth: this.width
			};
		},
		created() {
			if (!~[this.activeValue, this.inactiveValue].indexOf(this.value)) {
				this.$emit("input", this.inactiveValue);
			}
		},
		computed: {
			checked() {
				return this.value === this.activeValue;
			},
			switchDisabled() {
				return this.disabled || (this.elForm || {}).disabled;
			}
		},
		watch: {
			checked() {
				this.$refs.input.checked = this.checked;
				if (this.activeColor || this.inactiveColor) {
					this.setBackgroundColor();
				}
				if (this.validateEvent) {
					this.dispatch("ElFormItem", "el.form.change", [this.value]);
				}
			}
		},
		methods: {
			handleChange(event) {
				const val = this.checked ? this.inactiveValue : this.activeValue;
				this.$emit("input", val);
				this.$emit("change", val);
				this.$nextTick(() => {
					// set input's checked property
					// in case parent refuses to change component's value
					if (this.$refs.input) {
						this.$refs.input.checked = this.checked;
					}
				});
			},
			setBackgroundColor() {
				let newColor = this.checked ? this.activeColor : this.inactiveColor;
				this.$refs.core.style.borderColor = newColor;
				this.$refs.core.style.backgroundColor = newColor;
			},
			switchValue() {
				!this.switchDisabled && this.handleChange();
			}
		},
		mounted() {
			/* istanbul ignore if */
			this.coreWidth = this.width || 40;
			if (this.activeColor || this.inactiveColor) {
				this.setBackgroundColor();
			}
			this.$refs.input.checked = this.checked;
		}
	});
}
</script>
