<script lang="ts">
export default async function () {
	return defineComponent({
		name: "xAutoResizer",
		props: _xUtils.buildProps({
			disableWidth: Boolean,
			disableHeight: Boolean,
			onResize: {
				type: _xUtils.definePropType(Function)
			}
		}),
		setup(props, context) {
			const { slots } = context;
			const ns = _xUtils.useNamespace("auto-resizer");
			const { height, width, sizer } = _xUtils.useAutoResize(props);
			return function () {
				return h(
					"div",
					{
						ref: sizer,
						class: ns.b()
					},
					[
						slots.default &&
							slots.default({
								height: height.value,
								width: width.value
							})
					]
				);
			};
		}
	});
}
</script>
