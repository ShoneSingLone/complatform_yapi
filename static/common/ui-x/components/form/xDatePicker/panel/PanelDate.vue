<template>
	<transition name="el-zoom-in-top" @after-enter="handleEnter" @after-leave="handleLeave">
		<div
			v-show="visible"
			class="el-picker-panel el-date-picker el-popper"
			:class="[
				{
					'has-sidebar': $slots.sidebar || shortcuts,
					'has-time': showTime
				},
				popperClass
			]">
			<div class="el-picker-panel__body-wrapper">
				<slot name="sidebar" class="el-picker-panel__sidebar"></slot>
				<div class="el-picker-panel__sidebar" v-if="shortcuts">
					<button
						type="button"
						class="el-picker-panel__shortcut"
						v-for="(shortcut, key) in shortcuts"
						:key="key"
						@click="handleShortcutClick(shortcut)">
						{{ shortcut.text }}
					</button>
				</div>
				<div class="el-picker-panel__body">
					<div class="el-date-picker__time-header" v-if="showTime">
						<span class="el-date-picker__editor-wrap">
							<xInput
								:placeholder="i18n('el.datepicker.selectDate')"
								:value="visibleDate"
								size="small"
								@input="val => (userInputDate = val)"
								@change="handleVisibleDateChange" />
						</span>
						<span
							class="el-date-picker__editor-wrap"
							v-clickoutside="handleTimePickClose">
							<xInput
								ref="input"
								@focus="timePickerVisible = true"
								:placeholder="i18n('el.datepicker.selectTime')"
								:value="visibleTime"
								size="small"
								@input="val => (userInputTime = val)"
								@change="handleVisibleTimeChange" />
							<PanelTime
								ref="timepicker"
								:time-arrow-control="arrowControl"
								@pick="handleTimePick"
								:visible="timePickerVisible"
								@mounted="proxyTimePickerDataProperties">
							</PanelTime>
						</span>
					</div>
					<div
						class="el-date-picker__header"
						:class="{
							'el-date-picker__header--bordered':
								currentView === 'year' || currentView === 'month'
						}"
						v-show="currentView !== 'time'">
						<button
							type="button"
							@click="prevYear"
							:aria-label="i18n('el.datepicker.prevYear')"
							class="el-picker-panel__icon-btn el-date-picker__prev-btn el-icon-d-arrow-left"></button>
						<button
							type="button"
							@click="prevMonth"
							v-show="currentView === 'date'"
							:aria-label="i18n('el.datepicker.prevMonth')"
							class="el-picker-panel__icon-btn el-date-picker__prev-btn el-icon-arrow-left"></button>
						<span
							@click="showYearPicker"
							role="button"
							class="el-date-picker__header-label"
							>{{ yearLabel }}</span
						>
						<span
							@click="showMonthPicker"
							v-show="currentView === 'date'"
							role="button"
							class="el-date-picker__header-label"
							:class="{ active: currentView === 'month' }"
							>{{ cptMonth }}</span
						>
						<button
							type="button"
							@click="nextYear"
							:aria-label="i18n('el.datepicker.nextYear')"
							class="el-picker-panel__icon-btn el-date-picker__next-btn el-icon-d-arrow-right"></button>
						<button
							type="button"
							@click="nextMonth"
							v-show="currentView === 'date'"
							:aria-label="i18n('el.datepicker.nextMonth')"
							class="el-picker-panel__icon-btn el-date-picker__next-btn el-icon-arrow-right"></button>
					</div>

					<div class="el-picker-panel__content">
						<BasicDateTable
							v-show="currentView === 'date'"
							@pick="handleDatePick"
							:selection-mode="selectionMode"
							:first-day-of-week="firstDayOfWeek"
							:value="value"
							:default-value="defaultValue ? new Date(defaultValue) : null"
							:date="date"
							:cell-class-name="cellClassName"
							:disabled-date="disabledDate">
						</BasicDateTable>
						<BasicYearTable
							v-show="currentView === 'year'"
							@pick="handleYearPick"
							:selection-mode="selectionMode"
							:value="value"
							:default-value="defaultValue ? new Date(defaultValue) : null"
							:date="date"
							:disabled-date="disabledDate">
						</BasicYearTable>
						<BasicMonthTable
							v-show="currentView === 'month'"
							@pick="handleMonthPick"
							:selection-mode="selectionMode"
							:value="value"
							:default-value="defaultValue ? new Date(defaultValue) : null"
							:date="date"
							:disabled-date="disabledDate">
						</BasicMonthTable>
					</div>
				</div>
			</div>

			<div
				class="el-picker-panel__footer"
				v-show="
					footerVisible &&
					(currentView === 'date' || currentView === 'month' || currentView === 'year')
				">
				<xBtn
					size="mini"
					preset="text"
					class="el-picker-panel__link-btn"
					@click="changeToNow"
					v-show="
						selectionMode !== 'dates' &&
						selectionMode !== 'months' &&
						selectionMode !== 'years'
					">
					{{ i18n("el.datepicker.now") }}
				</xBtn>
				<xBtn plain size="mini" class="el-picker-panel__link-btn" @click="confirm">
					{{ i18n("el.datepicker.confirm") }}
				</xBtn>
			</div>
		</div>
	</transition>
</template>
<script lang="ts">
export default async function () {
	const [
		{
			formatDate,
			parseDate,
			getWeekNumber,
			isDate,
			modifyDate,
			modifyTime,
			modifyWithTimeString,
			clearMilliseconds,
			clearTime,
			prevYear,
			nextYear,
			prevMonth,
			nextMonth,
			changeYearMonthAndClampDate,
			extractDateFormat,
			extractTimeFormat,
			timeWithinRange
		},
		Clickoutside
	] = await _.$importVue([
		"/common/ui-x/components/form/xDatePicker/dateUtils.vue",
		"/common/ui-x/directive/clickoutside.vue"
	]);

	return defineComponent({
		directives: { Clickoutside },
		watch: {
			showTime(val) {
				/* istanbul ignore if */
				if (!val) return;
				this.$nextTick(_ => {
					const inputElm = this.$refs.input.$el;
					if (inputElm) {
						this.pickerWidth = inputElm.getBoundingClientRect().width + 10;
					}
				});
			},

			value(val) {
				if (this.selectionMode === "dates" && this.value) return;
				if (this.selectionMode === "months" && this.value) return;
				if (this.selectionMode === "years" && this.value) return;
				if (isDate(val)) {
					this.date = new Date(val);
				} else {
					this.date = this.getDefaultValue();
				}
			},

			defaultValue(val) {
				if (!isDate(this.value)) {
					this.date = val ? new Date(val) : new Date();
				}
			},

			timePickerVisible(val) {
				if (val) this.$nextTick(() => this.$refs.timepicker.adjustSpinners());
			},

			selectionMode(newVal) {
				if (newVal === "month") {
					/* istanbul ignore next */
					if (this.currentView !== "year" || this.currentView !== "month") {
						this.currentView = "month";
					}
				} else if (newVal === "dates") {
					this.currentView = "date";
				} else if (newVal === "years") {
					this.currentView = "year";
				} else if (newVal === "months") {
					this.currentView = "month";
				}
			}
		},

		methods: {
			proxyTimePickerDataProperties() {
				const format = timeFormat => {
					this.$refs.timepicker.format = timeFormat;
				};
				const value = value => {
					this.$refs.timepicker.value = value;
				};
				const date = date => {
					this.$refs.timepicker.date = date;
				};
				const selectableRange = selectableRange => {
					this.$refs.timepicker.selectableRange = selectableRange;
				};

				this.$watch("value", value);
				this.$watch("date", date);
				this.$watch("selectableRange", selectableRange);

				format(this.timeFormat);
				value(this.value);
				date(this.date);
				selectableRange(this.selectableRange);
			},

			handleClear() {
				this.date = this.getDefaultValue();
				this.$emit("pick", null);
			},

			emit(value, ...args) {
				if (!value) {
					this.$emit("pick", value, ...args);
				} else if (Array.isArray(value)) {
					const dates = value.map(date =>
						this.showTime ? clearMilliseconds(date) : clearTime(date)
					);
					this.$emit("pick", dates, ...args);
				} else {
					this.$emit(
						"pick",
						this.showTime ? clearMilliseconds(value) : clearTime(value),
						...args
					);
				}
				this.userInputDate = null;
				this.userInputTime = null;
			},

			// resetDate() {
			//   this.date = new Date(this.date);
			// },

			showMonthPicker() {
				this.currentView = "month";
			},

			showYearPicker() {
				this.currentView = "year";
			},

			// XXX: 没用到
			// handleLabelClick() {
			//   if (this.currentView === 'date') {
			//     this.showMonthPicker();
			//   } else if (this.currentView === 'month') {
			//     this.showYearPicker();
			//   }
			// },

			prevMonth() {
				this.date = prevMonth(this.date);
			},

			nextMonth() {
				this.date = nextMonth(this.date);
			},

			prevYear() {
				if (this.currentView === "year") {
					this.date = prevYear(this.date, 10);
				} else {
					this.date = prevYear(this.date);
				}
			},

			nextYear() {
				if (this.currentView === "year") {
					this.date = nextYear(this.date, 10);
				} else {
					this.date = nextYear(this.date);
				}
			},

			handleShortcutClick(shortcut) {
				if (shortcut.onClick) {
					shortcut.onClick(this);
				}
			},

			handleTimePick(value, visible, first) {
				if (isDate(value)) {
					const newDate = this.value
						? modifyTime(
								this.value,
								value.getHours(),
								value.getMinutes(),
								value.getSeconds()
							)
						: modifyWithTimeString(this.getDefaultValue(), this.defaultTime);
					this.date = newDate;
					this.emit(this.date, true);
				} else {
					this.emit(value, true);
				}
				if (!first) {
					this.timePickerVisible = visible;
				}
			},

			handleTimePickClose() {
				this.timePickerVisible = false;
			},

			handleMonthPick(month) {
				if (this.selectionMode === "month") {
					this.date = modifyDate(this.date, this.year, month, 1);
					this.emit(this.date);
				} else if (this.selectionMode === "months") {
					this.emit(month, true);
				} else {
					this.date = changeYearMonthAndClampDate(this.date, this.year, month);
					// TODO: should emit intermediate value ??
					// this.emit(this.date);
					this.currentView = "date";
				}
			},

			handleDatePick(value) {
				if (this.selectionMode === "day") {
					let newDate = this.value
						? modifyDate(
								this.value,
								value.getFullYear(),
								value.getMonth(),
								value.getDate()
							)
						: modifyWithTimeString(value, this.defaultTime);
					// change default time while out of selectableRange
					if (!this.checkDateWithinRange(newDate)) {
						newDate = modifyDate(
							this.selectableRange[0][0],
							value.getFullYear(),
							value.getMonth(),
							value.getDate()
						);
					}
					this.date = newDate;
					this.emit(this.date, this.showTime);
				} else if (this.selectionMode === "week") {
					this.emit(value.date);
				} else if (this.selectionMode === "dates") {
					this.emit(value, true); // set false to keep panel open
				}
			},

			handleYearPick(year) {
				if (this.selectionMode === "year") {
					this.date = modifyDate(this.date, year, 0, 1);
					this.emit(this.date);
				} else if (this.selectionMode === "years") {
					this.emit(year, true);
				} else {
					this.date = changeYearMonthAndClampDate(this.date, year, this.month);
					// TODO: should emit intermediate value ??
					// this.emit(this.date, true);
					this.currentView = "month";
				}
			},

			changeToNow() {
				// NOTE: not a permanent solution
				//       consider disable "now" button in the future
				if (
					(!this.disabledDate || !this.disabledDate(new Date())) &&
					this.checkDateWithinRange(new Date())
				) {
					this.date = new Date();
					this.emit(this.date);
				}
			},

			confirm() {
				if (
					this.selectionMode === "dates" ||
					this.selectionMode === "months" ||
					this.selectionMode === "years"
				) {
					this.emit(this.value);
				} else {
					// value were emitted in handle{Date,Time}Pick, nothing to update here
					// deal with the scenario where: user opens the picker, then confirm without doing anything
					const value = this.value
						? this.value
						: modifyWithTimeString(this.getDefaultValue(), this.defaultTime);
					this.date = new Date(value); // refresh date
					this.emit(value);
				}
			},

			resetView() {
				if (this.selectionMode === "month" || this.selectionMode === "months") {
					this.currentView = "month";
				} else if (this.selectionMode === "year" || this.selectionMode === "years") {
					this.currentView = "year";
				} else {
					this.currentView = "date";
				}
			},

			handleEnter() {
				document.body.addEventListener("keydown", this.handleKeydown);
			},

			handleLeave() {
				this.$emit("dodestroy");
				document.body.removeEventListener("keydown", this.handleKeydown);
			},

			handleKeydown(event) {
				const keyCode = event.keyCode;
				const list = [38, 40, 37, 39];
				if (this.visible && !this.timePickerVisible) {
					if (list.indexOf(keyCode) !== -1) {
						this.handleKeyControl(keyCode);
						event.stopPropagation();
						event.preventDefault();
					}
					if (
						keyCode === 13 &&
						this.userInputDate === null &&
						this.userInputTime === null
					) {
						// Enter
						this.emit(this.date, false);
					}
				}
			},

			handleKeyControl(keyCode) {
				const mapping = {
					year: {
						38: -4,
						40: 4,
						37: -1,
						39: 1,
						offset: (date, step) => date.setFullYear(date.getFullYear() + step)
					},
					month: {
						38: -4,
						40: 4,
						37: -1,
						39: 1,
						offset: (date, step) => date.setMonth(date.getMonth() + step)
					},
					week: {
						38: -1,
						40: 1,
						37: -1,
						39: 1,
						offset: (date, step) => date.setDate(date.getDate() + step * 7)
					},
					day: {
						38: -7,
						40: 7,
						37: -1,
						39: 1,
						offset: (date, step) => date.setDate(date.getDate() + step)
					}
				};
				const mode = this.selectionMode;
				const year = 3.1536e10;
				const now = this.date.getTime();
				const newDate = new Date(this.date.getTime());
				while (Math.abs(now - newDate.getTime()) <= year) {
					const map = mapping[mode];
					map.offset(newDate, map[keyCode]);
					if (typeof this.disabledDate === "function" && this.disabledDate(newDate)) {
						continue;
					}
					this.date = newDate;
					this.$emit("pick", newDate, true);
					break;
				}
			},

			handleVisibleTimeChange(value) {
				const time = parseDate(value, this.timeFormat);
				if (time && this.checkDateWithinRange(time)) {
					this.date = modifyDate(time, this.year, this.month, this.monthDate);
					this.userInputTime = null;
					this.$refs.timepicker.value = this.date;
					this.timePickerVisible = false;
					this.emit(this.date, true);
				}
			},

			handleVisibleDateChange(value) {
				const date = parseDate(value, this.dateFormat);
				if (date) {
					if (typeof this.disabledDate === "function" && this.disabledDate(date)) {
						return;
					}
					this.date = modifyTime(
						date,
						this.date.getHours(),
						this.date.getMinutes(),
						this.date.getSeconds()
					);
					this.userInputDate = null;
					this.resetView();
					this.emit(this.date, true);
				}
			},

			isValidValue(value) {
				return (
					value &&
					!isNaN(value) &&
					(typeof this.disabledDate === "function" ? !this.disabledDate(value) : true) &&
					this.checkDateWithinRange(value)
				);
			},

			getDefaultValue() {
				// if default-value is set, return it
				// otherwise, return now (the moment this method gets called)
				return this.defaultValue ? new Date(this.defaultValue) : new Date();
			},

			checkDateWithinRange(date) {
				return this.selectableRange.length > 0
					? timeWithinRange(date, this.selectableRange, this.format || "HH:mm:ss")
					: true;
			}
		},

		components: {
			PanelTime: () =>
				_.$importVue("/common/ui-x/components/form/xDatePicker/panel/PanelTime.vue"),
			BasicDateTable: () =>
				_.$importVue("/common/ui-x/components/form/xDatePicker/basic/BasicDateTable.vue"),
			BasicMonthTable: () =>
				_.$importVue("/common/ui-x/components/form/xDatePicker/basic/BasicMonthTable.vue"),
			BasicYearTable: () =>
				_.$importVue("/common/ui-x/components/form/xDatePicker/basic/BasicYearTable.vue")
		},

		data() {
			return {
				popperClass: "",
				date: new Date(),
				value: "",
				defaultValue: null, // use getDefaultValue() for time computation
				defaultTime: null,
				showTime: false,
				selectionMode: "day",
				shortcuts: "",
				visible: false,
				currentView: "date",
				disabledDate: "",
				cellClassName: "",
				selectableRange: [],
				firstDayOfWeek: 7,
				showWeekNumber: false,
				timePickerVisible: false,
				format: "",
				arrowControl: false,
				userInputDate: null,
				userInputTime: null
			};
		},

		computed: {
			cptMonth() {
				return i18n(`el.datepicker.month${this.month + 1}`);
			},
			year() {
				return this.date.getFullYear();
			},

			month() {
				return this.date.getMonth();
			},

			week() {
				return getWeekNumber(this.date);
			},

			monthDate() {
				return this.date.getDate();
			},

			footerVisible() {
				return (
					this.showTime ||
					this.selectionMode === "dates" ||
					this.selectionMode === "months" ||
					this.selectionMode === "years"
				);
			},

			visibleTime() {
				if (this.userInputTime !== null) {
					return this.userInputTime;
				} else {
					return formatDate(this.value || this.defaultValue, this.timeFormat);
				}
			},

			visibleDate() {
				if (this.userInputDate !== null) {
					return this.userInputDate;
				} else {
					return formatDate(this.value || this.defaultValue, this.dateFormat);
				}
			},

			yearLabel() {
				const yearTranslation = i18n("el.datepicker.year");
				if (this.currentView === "year") {
					const startYear = Math.floor(this.year / 10) * 10;
					if (yearTranslation) {
						return (
							startYear +
							" " +
							yearTranslation +
							" - " +
							(startYear + 9) +
							" " +
							yearTranslation
						);
					}
					return startYear + " - " + (startYear + 9);
				}
				return this.year + " " + yearTranslation;
			},

			timeFormat() {
				if (this.format) {
					return extractTimeFormat(this.format);
				} else {
					return "HH:mm:ss";
				}
			},

			dateFormat() {
				if (this.format) {
					return extractDateFormat(this.format);
				} else {
					return "yyyy-MM-dd";
				}
			}
		}
	});
}
</script>
