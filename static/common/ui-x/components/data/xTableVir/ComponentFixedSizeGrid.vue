<script lang="ts">
export default async function () {
	const { AUTO_ALIGNMENT, SMART_ALIGNMENT, START_ALIGNMENT, CENTERED_ALIGNMENT, END_ALIGNMENT } =
		_xUtils;
	const [{ createGrid }] = await _.$importVue([
		"/common/ui-x/components/data/xVirtualList/xBuildList.vue"
	]);
	return createGrid({
		name: "ComponentFixedSizeGrid",
		getColumnPosition: ({ columnWidth }, index) => [columnWidth, index * columnWidth],
		getRowPosition: ({ rowHeight }, index) => [rowHeight, index * rowHeight],
		getEstimatedTotalHeight: ({ totalRow, rowHeight }) => rowHeight * totalRow,
		getEstimatedTotalWidth: ({ totalColumn, columnWidth }) => columnWidth * totalColumn,
		getColumnOffset: (
			{ totalColumn, columnWidth, width },
			columnIndex,
			alignment,
			scrollLeft,
			_,
			scrollBarWidth2
		) => {
			width = Number(width);
			const lastColumnOffset = Math.max(0, totalColumn * columnWidth - width);
			const maxOffset = Math.min(lastColumnOffset, columnIndex * columnWidth);
			const minOffset = Math.max(
				0,
				columnIndex * columnWidth - width + scrollBarWidth2 + columnWidth
			);
			if (alignment === "smart") {
				if (scrollLeft >= minOffset - width && scrollLeft <= maxOffset + width) {
					alignment = AUTO_ALIGNMENT;
				} else {
					alignment = CENTERED_ALIGNMENT;
				}
			}
			switch (alignment) {
				case START_ALIGNMENT:
					return maxOffset;
				case END_ALIGNMENT:
					return minOffset;
				case CENTERED_ALIGNMENT: {
					const middleOffset = Math.round(minOffset + (maxOffset - minOffset) / 2);
					if (middleOffset < Math.ceil(width / 2)) {
						return 0;
					} else if (middleOffset > lastColumnOffset + Math.floor(width / 2)) {
						return lastColumnOffset;
					} else {
						return middleOffset;
					}
				}
				case AUTO_ALIGNMENT:
				default:
					if (scrollLeft >= minOffset && scrollLeft <= maxOffset) {
						return scrollLeft;
					} else if (minOffset > maxOffset) {
						return minOffset;
					} else if (scrollLeft < minOffset) {
						return minOffset;
					} else {
						return maxOffset;
					}
			}
		},
		getRowOffset: (
			{ rowHeight, height, totalRow },
			rowIndex,
			align,
			scrollTop,
			_,
			scrollBarWidth2
		) => {
			height = Number(height);
			const lastRowOffset = Math.max(0, totalRow * rowHeight - height);
			const maxOffset = Math.min(lastRowOffset, rowIndex * rowHeight);
			const minOffset = Math.max(
				0,
				rowIndex * rowHeight - height + scrollBarWidth2 + rowHeight
			);
			if (align === SMART_ALIGNMENT) {
				if (scrollTop >= minOffset - height && scrollTop <= maxOffset + height) {
					align = AUTO_ALIGNMENT;
				} else {
					align = CENTERED_ALIGNMENT;
				}
			}
			switch (align) {
				case START_ALIGNMENT:
					return maxOffset;
				case END_ALIGNMENT:
					return minOffset;
				case CENTERED_ALIGNMENT: {
					const middleOffset = Math.round(minOffset + (maxOffset - minOffset) / 2);
					if (middleOffset < Math.ceil(height / 2)) {
						return 0;
					} else if (middleOffset > lastRowOffset + Math.floor(height / 2)) {
						return lastRowOffset;
					} else {
						return middleOffset;
					}
				}
				case AUTO_ALIGNMENT:
				default:
					if (scrollTop >= minOffset && scrollTop <= maxOffset) {
						return scrollTop;
					} else if (minOffset > maxOffset) {
						return minOffset;
					} else if (scrollTop < minOffset) {
						return minOffset;
					} else {
						return maxOffset;
					}
			}
		},
		getColumnStartIndexForOffset: ({ columnWidth, totalColumn }, scrollLeft) =>
			Math.max(0, Math.min(totalColumn - 1, Math.floor(scrollLeft / columnWidth))),
		getColumnStopIndexForStartIndex: (
			{ columnWidth, totalColumn, width },
			startIndex,
			scrollLeft
		) => {
			const left = startIndex * columnWidth;
			const visibleColumnsCount = Math.ceil((width + scrollLeft - left) / columnWidth);
			return Math.max(0, Math.min(totalColumn - 1, startIndex + visibleColumnsCount - 1));
		},
		getRowStartIndexForOffset: ({ rowHeight, totalRow }, scrollTop) =>
			Math.max(0, Math.min(totalRow - 1, Math.floor(scrollTop / rowHeight))),
		getRowStopIndexForStartIndex: ({ rowHeight, totalRow, height }, startIndex, scrollTop) => {
			const top = startIndex * rowHeight;
			const numVisibleRows = Math.ceil((height + scrollTop - top) / rowHeight);
			return Math.max(0, Math.min(totalRow - 1, startIndex + numVisibleRows - 1));
		},
		initCache: () => void 0,
		clearCache: true,
		validateProps: () => {}
	});
}
</script>
