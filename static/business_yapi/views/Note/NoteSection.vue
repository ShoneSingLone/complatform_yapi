<style lang="less"></style>
<template>
	<section class="page-view flex1">
		<xPageContent>
			<div class="flex mb10 middle" style="height: 48px">
				<xItem :configs="form.isReadonly" />
				<xRender :render="vDomTitle" />
				<xGap f="1" />
				<xBtn :configs="btnSave" />
			</div>
			<TuiEditor v-model="wikiContent" :isReadonly="form.isReadonly.value" />
		</xPageContent>
	</section>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["APP", "inject_note"],
		data() {
			return {
				title: "",
				form: defItems({
					titleConfigs: { placeholder: "文档名称" },
					isReadonly: {
						value: true,
						itemType: "xItemSwitch",
						options: [
							{
								label: "预览",
								value: true
							}
						]
					}
				})
			};
		},
		computed: {
			wikiContent: {
				get() {
					return {
						md: this.inject_note.currentWiki.markdown || ""
					};
				},
				set(modelValue, oldModelValue) {
					this.inject_note.currentWiki.markdown = modelValue.md;
				}
			},
			btnSave() {
				const vm = this;
				return {
					label: "修改",
					preset: "blue",
					isShow() {
						return !vm.form.isReadonly.value;
					},
					onClick: vm.save
				};
			}
		},
		methods: {
			vDomTitle() {
				if (this.form.isReadonly.value) {
					return h("span", { class: "ml", style: "font-weight:700;font-size:18px;" }, [this.inject_note.currentWiki.title]);
				} else {
					return h("xItem", {
						configs: this.form.titleConfigs,
						value: this.inject_note.currentWiki.title,
						onEmitValue({ val }) {
							this.title = val;
						}
					});
				}
			}
		}
	});
}
</script>
