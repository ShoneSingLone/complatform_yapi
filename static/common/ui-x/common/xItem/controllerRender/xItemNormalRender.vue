<script lang="ts">
export default async function () {
	return function render() {
		const vm = this;
		const CONFIGS = this.cptConfigs;

		const xItem_controllerProps = {
			...CONFIGS,
			readonly: CONFIGS.readonly,
			disabled: vm.cptDisabled,
			attrs: {
				...vm.cpt_bindProps.attrs,
				disabled: vm.cptDisabled,
				queryData: vm.cpt_queryData
			},
			props: {
				...vm.cpt_bindProps.props,
				disabled: vm.cptDisabled,
				queryData: vm.cpt_queryData
			},
			configs: {
				...CONFIGS,
				disabled: vm.cptDisabled,
				options: vm.cpt_options
			},
			value: vm.p_value,
			on: vm.p_listeners,
			onChange: val => {
				vm.p_value = val;
			}
		};
		return h(
			"div",
			{
				vIf: !vm.cpt_isHide,
				staticClass: "xItem-wrapper flex vertical",
				attrs: {
					"data-form-item-type": vm.itemType,
					"data-form-item-id": vm.cpt_id,
					disabled: vm.cptDisabled
				},
				style: vm.cptStyle
			},
			[
				h(
					"div",
					{
						staticClass: "xItem-label-contorller"
					},
					[
						/* label */
						h(
							"label",
							{
								ref: "refItemLabel",
								vIf: vm.cpt_label,
								staticClass: "xItem_label flex middle"
							},
							[
								h(
									"span",
									{
										vIf: vm.cpt_isRequired,
										staticClass: "xItem_label-required"
									},
									["*"]
								),
								h("span", { staticClass: "xItem_label-text" }, [vm.cpt_label]),
								h(
									"xTooltip",
									{
										vIf: vm.calTips(),
										// effect: "dark",
										content: vm.calTips(),
										placement: "top-end"
									},
									[
										h("xIcon", {
											icon: "tips",
											staticClass: "ml4"
										})
									]
								)
							]
						),
						/* contorller */
						h(
							"div",
							{
								class: {
									xItem_controller: true,
									"el-form-item is-error": !!vm.errorTips
								}
							},
							[
								h(vm.itemType, xItem_controllerProps),
								/* afterController插槽 */
								h("xRender", {
									vIf: CONFIGS?.itemSlots?.afterController,
									render: CONFIGS?.itemSlots?.afterController,
									payload: { xItem: vm }
								})
							]
						),

						/* 校验错误提示 */
						h(
							"xTooltip",
							{
								vIf: vm.errorTips,
								effect: "dark",
								content: vm.errorTips,
								placement: "top-end"
							},
							[
								h("xIcon", {
									icon: "exclamationMark",
									staticClass: "xItem_error-msg ml4"
								})
							]
						)
					]
				),
				/* 信息提示 */
				h("div", { vIf: vm.calMsg(), staticClass: "xItem-msg" }, [vm.calMsg()])
			]
		);
	};
}
</script>
