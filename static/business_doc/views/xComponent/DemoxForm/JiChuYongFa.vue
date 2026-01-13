<template>
	<div>
		<xForm>
			<div span="full">trigger eventName:{{ tipsString }}</div>
			<xItem :configs="xItemInput" @change="tipsString = 'event change'" />
			<xItem :configs="xItemSelect" />
			<xItem :configs="xItemCheck" />
			<xItem :configs="xItemInput3" />
		</xForm>
		<xBtn :configs="xBtnConfigs" />
	</div>
</template>
<script lang="ts">
export default async function () {
	function usexItemTips({ vm, selector, render }) {
		// Create a popover element
		let popoverEl = null;
		let targetElement = null;
		let timer = null;

		// Password strength evaluation function
		const evaluatePasswordStrength = password => {
			const rules = [
				{ name: "长度至少8位", check: pwd => pwd.length >= 8 },
				{ name: "包含大写字母", check: pwd => /[A-Z]/.test(pwd) },
				{ name: "包含小写字母", check: pwd => /[a-z]/.test(pwd) },
				{ name: "包含数字", check: pwd => /\d/.test(pwd) },
				{ name: "包含特殊字符", check: pwd => /[^A-Za-z0-9]/.test(pwd) }
			];

			const results = rules.map(rule => ({
				...rule,
				passed: rule.check(password)
			}));

			const passedCount = results.filter(r => r.passed).length;
			let strength = "弱";
			if (passedCount === 5) strength = "强";
			else if (passedCount >= 3) strength = "中";

			return { results, strength, passedCount };
		};

		// Create popover content
		const createPopoverContent = password => {
			const { results, strength } = evaluatePasswordStrength(password);
			return `
					<div class="password-strength-tips">
						<div class="strength-title">密码强度：<span class="strength-${strength}">${strength}</span></div>
						<ul class="strength-rules">
							${results
								.map(
									rule => `
								<li class="rule-item ${rule.passed ? "passed" : ""}">
									<span class="rule-icon">${rule.passed ? "✓" : "✗"}</span>
									<span class="rule-text">${rule.name}</span>
								</li>
							`
								)
								.join("")}
						</ul>
					</div>
				`;
		};

		// Show popover
		const showPopover = (element, password) => {
			if (!element) return;

			// Remove existing popover if any
			removePopover();

			// Create new popover
			popoverEl = document.createElement("div");
			popoverEl.className = "el-popover el-popper password-strength-popover";
			popoverEl.style.cssText = `
				position: absolute;
				background: #fff;
				border: 1px solid var(--el-border-color-lighter);
				padding: 12px;
				z-index: 2000;
				color: var(--el-text-color-regular);
				line-height: 1.4;
				font-size: 14px;
				box-shadow: var(--normal-box-shadow);
				border-radius: var(--border-radius);
				min-width: 250px;
			`;

			// Set content using render function if provided, otherwise use default
			if (typeof render === "function") {
				// Evaluate password strength for the render function
				const strengthResult = evaluatePasswordStrength(password);
				// Use render function to generate content
				const renderContent = render({ password, strength: strengthResult });
				// Check if render returns an element or HTML string
				if (renderContent instanceof Element) {
					popoverEl.appendChild(renderContent);
				} else {
					popoverEl.innerHTML = renderContent;
				}
			} else {
				// Use default password strength content
				popoverEl.innerHTML = createPopoverContent(password);
			}

			// Append to body
			document.body.appendChild(popoverEl);

			// Position popover
			const rect = element.getBoundingClientRect();
			popoverEl.style.left = `${rect.left + window.pageXOffset}px`;
			popoverEl.style.top = `${rect.bottom + window.pageYOffset + 8}px`;

			// Add transition
			setTimeout(() => {
				popoverEl.style.opacity = "1";
				popoverEl.style.transform = "translateY(0)";
				popoverEl.style.transition = "opacity 0.2s, transform 0.2s";
			}, 0);
		};

		// Remove popover
		const removePopover = () => {
			if (popoverEl && popoverEl.parentNode) {
				popoverEl.parentNode.removeChild(popoverEl);
				popoverEl = null;
			}
		};

		// Handle input changes
		const handleInputChange = element => {
			const input = element.querySelector("input, textarea");
			if (input) {
				const password = input.value;
				if (password) {
					showPopover(element, password);
				} else {
					removePopover();
				}
			}
		};

		// Check if we should show password tips
		const handleMaybeShowPasswordTips = () => {
			// Find all xItem elements matching the selector
			const xItems = document.querySelectorAll(`.xItem-wrapper[selector="${selector}"]`);

			xItems.forEach(item => {
				const input = item.querySelector("input, textarea");
				if (input && document.activeElement === input) {
					targetElement = item;
					handleInputChange(item);
				} else if (targetElement === item && document.activeElement !== input) {
					removePopover();
					targetElement = null;
				}
			});
		};

		onMounted(() => {
			// Add event listeners
			$("body").on(
				"input.administratorPassword_tips",
				`.xItem-wrapper[selector="${selector}"] input, .xItem-wrapper[selector="${selector}"] textarea`,
				function () {
					const xItem = this.closest(".xItem-wrapper");
					if (xItem) {
						handleInputChange(xItem);
					}
				}
			);

			$("body").on(
				"focus.administratorPassword_tips",
				`.xItem-wrapper[selector="${selector}"] input, .xItem-wrapper[selector="${selector}"] textarea`,
				function () {
					const xItem = this.closest(".xItem-wrapper");
					if (xItem) {
						handleInputChange(xItem);
					}
				}
			);

			$("body").on(
				"blur.administratorPassword_tips",
				`.xItem-wrapper[selector="${selector}"] input, .xItem-wrapper[selector="${selector}"] textarea`,
				function () {
					timer = setTimeout(() => {
						removePopover();
						targetElement = null;
					}, 200);
				}
			);
		});

		onBeforeUnmount(() => {
			// Clear timer
			if (timer) {
				clearTimeout(timer);
			}

			// Remove event listeners
			$("body").off(".administratorPassword_tips");

			// Remove popover
			removePopover();
		});
	}

	return defineComponent({
		computed: {
			xBtnConfigs() {
				const vm = this;
				return {
					label: "提交",
					type: "primary",
					onClick() {
						_.$validateForm(vm.$el);
					}
				};
			}
		},
		setup() {
			usexItemTips({ vm: this, selector: "this-x-item-will-show-popup", render() {} });
		},

		data() {
			const vm = this;
			const msg =
				"asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfas\ndfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfapn\nsdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdf";

			return {
				tipsString: "",
				xItemInput: {
					value: "",
					label: "xItemInput",
					tips: "asdfasdf",
					selector: "this-x-item-will-show-popup",
					msg,
					onFocus() {
						vm.tipsString = "onFocus";
					},
					onBlur() {
						vm.tipsString = "onBlur";
					},
					onEnter() {
						vm.tipsString = "onEnter";
					},
					onEmitValue() {
						// vm.tipsString = "change";
					},
					rules: [_rules.required()],
					itemSlots: {
						afterController() {
							return hSpan({ class: "ml8" }, ["台"]);
						}
					}
				},
				xItemSelect: {
					value: "",
					label: "xItemSelect",
					itemType: "xItemSelect",
					options: [
						{
							label: "1",
							value: "1"
						},
						{
							label: "2",
							value: "2"
						}
					],
					onFocus() {
						vm.tipsString = "onFocus";
					},
					onBlur() {
						vm.tipsString = "onBlur";
					}
				},
				xItemCheck: {
					value: "",
					label: "xItemCheck",
					itemType: "xItemCheck",
					options: ["item"],
					rules: [
						{
							async validator({ val }) {
								return "但凡校验，铁定报错！" + val;
							}
						}
					]
				},
				xItemSelectSub: {
					value: "",
					itemType: "xItemSelect",
					options: [
						{
							label: "1",
							value: "1"
						},
						{
							label: "2",
							value: "2"
						}
					],
					onFocus() {
						vm.tipsString = "onFocus";
					},
					onBlur() {
						vm.tipsString = "onBlur";
					}
				},
				xItemInput3: {
					value: "",
					msg: "没有label",
					$vSlots: {
						prepend() {
							return h("xItem", {
								configs: vm.xItemSelectSub,
								style: `--xItem-wrapper-width:80px`
							});
						}
					},
					onFocus() {
						vm.tipsString = "onFocus";
					},
					onBlur() {
						vm.tipsString = "onBlur";
					},
					rules: [_rules.required()]
				}
			};
		}
	});
}
</script>
<style lang="less"></style>
