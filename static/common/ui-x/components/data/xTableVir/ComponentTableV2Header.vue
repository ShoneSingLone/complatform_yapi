<script lang="ts">
export default async function () {
	const { castArray, enforceUnit, useNamespace, tableV2HeaderProps } = _xUtils;

	return defineComponent({
		name: "ComponentTableV2Header",
		props: tableV2HeaderProps,
		setup(props) {
			const vm = this;
			const slots = this.$vSlots || {};
			const ns = useNamespace("table-v2");
			const headerRef = ref();
			const headerStyle = computed(() => {
				return enforceUnit({
					width: props.width,
					height: props.height
				});
			});
			const rowStyle = computed(() =>
				enforceUnit({
					width: props.rowWidth,
					height: props.height
				})
			);
			const headerHeights = computed(() => castArray(unref(props.headerHeight)));
			const scrollToLeft = left => {
				const headerEl = unref(headerRef);
				nextTick(() => {
					_.$val(headerEl, "scroll") &&
						headerEl.scroll({
							left
						});
				});
			};
			const renderFixedRows = () => {
				const fixedRowClassName = ns.e("fixed-header-row");
				const { columns, fixedHeaderData, rowHeight } = props;
				return _.$callFn(
					fixedHeaderData,
					"map"
				)((fixedRowData, fixedRowIndex) => {
					const style = enforceUnit({
						height: rowHeight,
						width: "100%"
					});
					// console.log("renderFixedRows", columns.width, columns);
					return (
						slots.fixed &&
						slots.fixed({
							class: fixedRowClassName,
							columns,
							rowData: fixedRowData,
							rowIndex: -(fixedRowIndex + 1),
							style
						})
					);
				});
			};
			const renderDynamicRows = () => {
				const dynamicRowClassName = ns.e("dynamic-header-row");
				const { columns } = props;
				return unref(headerHeights).map((rowHeight, rowIndex) => {
					const style = enforceUnit({
						width: "100%",
						height: rowHeight
					});
					// console.log("renderDynamicRows", columns.width, columns);
					return (
						slots.dynamic &&
						slots.dynamic({
							class: dynamicRowClassName,
							columns: columns,
							headerIndex: rowIndex,
							style
						})
					);
				});
			};

			vm.scrollToLeft = scrollToLeft;

			return function () {
				if (props.height <= 0) {
					return;
				}
				return h(
					"div",
					{
						ref: headerRef,
						class: props.classV2,
						style: unref(headerStyle),
						attrs: {
							role: "rowgroup",
							"data-role": "table-main_header"
						}
					},
					[
						h(
							"div",
							{
								style: unref(rowStyle),
								class: ns.e("header")
							},
							[renderDynamicRows(), renderFixedRows()]
						)
					]
				);
			};
		}
	});
}
</script>
