<template>
	<table @click="handleYearTableClick" class="el-year-table">
		<tbody>
			<tr>
				<td class="available" :class="getCellStyle(startYear + 0)">
					<a class="cell">{{ startYear }}</a>
				</td>
				<td class="available" :class="getCellStyle(startYear + 1)">
					<a class="cell">{{ startYear + 1 }}</a>
				</td>
				<td class="available" :class="getCellStyle(startYear + 2)">
					<a class="cell">{{ startYear + 2 }}</a>
				</td>
				<td class="available" :class="getCellStyle(startYear + 3)">
					<a class="cell">{{ startYear + 3 }}</a>
				</td>
			</tr>
			<tr>
				<td class="available" :class="getCellStyle(startYear + 4)">
					<a class="cell">{{ startYear + 4 }}</a>
				</td>
				<td class="available" :class="getCellStyle(startYear + 5)">
					<a class="cell">{{ startYear + 5 }}</a>
				</td>
				<td class="available" :class="getCellStyle(startYear + 6)">
					<a class="cell">{{ startYear + 6 }}</a>
				</td>
				<td class="available" :class="getCellStyle(startYear + 7)">
					<a class="cell">{{ startYear + 7 }}</a>
				</td>
			</tr>
			<tr>
				<td class="available" :class="getCellStyle(startYear + 8)">
					<a class="cell">{{ startYear + 8 }}</a>
				</td>
				<td class="available" :class="getCellStyle(startYear + 9)">
					<a class="cell">{{ startYear + 9 }}</a>
				</td>
				<td></td>
				<td></td>
			</tr>
		</tbody>
	</table>
</template>
<script lang="ts">
export default async function () {
	const [{ isDate, range, nextDate, getDayCountOfYear }] = await _.$importVue([
		"/common/ui-x/components/form/xDatePicker/dateUtils.vue"
	]);
	const { hasClass } = _xUtils;

	const datesInYear = year => {
		const numOfDays = getDayCountOfYear(year);
		const firstDay = new Date(year, 0, 1);
		return range(numOfDays).map(n => nextDate(firstDay, n));
	};

	return defineComponent({
		props: {
			disabledDate: {},
			value: {},
			defaultValue: {
				validator(val) {
					// null or valid Date Object
					return val === null || (val instanceof Date && isDate(val));
				}
			},
			date: {},
			selectionMode: {}
		},

		computed: {
			startYear() {
				return Math.floor(this.date.getFullYear() / 10) * 10;
			}
		},

		methods: {
			getCellStyle(year) {
				const style = {};
				const today = new Date();

				style.disabled =
					typeof this.disabledDate === "function"
						? datesInYear(year).every(this.disabledDate)
						: false;
				style.current =
					_.findIndex(
						_.$coerceTruthyValueToArray(this.value),
						date => date.getFullYear() === year
					) >= 0;
				style.today = today.getFullYear() === year;
				style.default = this.defaultValue && this.defaultValue.getFullYear() === year;

				return style;
			},

			handleYearTableClick(event) {
				const target = event.target;
				if (target.tagName === "A") {
					if (hasClass(target.parentNode, "disabled")) return;
					const year = target.textContent || target.innerText;
					if (this.selectionMode === "years") {
						const value = this.value || [];
						const idx = _.findIndex(value, date => date.getFullYear() === Number(year));
						const newValue =
							idx > -1
								? [...value.slice(0, idx), ...value.slice(idx + 1)]
								: [...value, new Date(year)];
						this.$emit("pick", newValue);
					} else {
						this.$emit("pick", Number(year));
					}
				}
			}
		}
	});
}
</script>
