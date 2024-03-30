<style lang="less"></style>

<template>
	<div class="x-page-view" id="LogList">
		<xPageTitle>
			<template #title>
				<span class="mr">{{ i18n("密码修改") }}</span>
				<xGap f />
			</template>
		</xPageTitle>
		<xPageContent>
			<div class="flex middle center">
				<xCard style="width: 600px; --xItem-wrapper-width: 100%; --xItem-controller-width: 100%">
					<xForm ref="form" col="1">
						<!-- 密码 -->
						<xItem span="full" :configs="configsForm.password" autocomplete="current-password" />
						<!-- 确认密码 -->
						<xItem span="full" :configs="configsForm.confirm" autocomplete="current-password" />
						<div class="flex end width100" span="full"><xGap f /><xBtn :configs="btnModify" /></div>
					</xForm>
				</xCard>
			</div>
		</xPageContent>
	</div>
</template>

<script lang="ts">
export default async function () {
	return {
		inject: ["APP"],
		data() {
			const vm = this;
			return {
				configsForm: {
					password: defItem({
						value: _.$lStorage.reg_password || "",
						isPwd: true,
						/* render的时候重新获取 */
						placeholder: i18n("密码"),
						rules: [_rules.required(i18n("请输入密码"), ["update"])],
						onValidateFail: thisConfigs => {
							console.log(thisConfigs.itemTips);
						}
					}),
					confirm: defItem({
						value: _.$lStorage.reg_confirm || "",
						isPwd: true,
						/* render的时候重新获取 */
						placeholder: i18n("请再次输入密码!"),
						rules: [
							_rules.required(i18n("请再次输入密码!")),
							{
								validator: async ({ val }) => {
									if (vm.configsForm.password.value !== val) {
										return i18n("两次输入的密码不一致!");
									}
									return "";
								},
								trigger: ["update"]
							}
						]
					})
				}
			};
		},
		computed: {
			btnModify() {
				const vm = this;
				return {
					label: i18n("确认修改"),
					preset: "blue",
					async onClick() {
						const [atLestOne] = await _.$validateForm(vm.$el);
						if (atLestOne) return;
						_.$loading(true);
						try {
							const params = _.$pickValueFromConfigs(vm.configsForm);
							const res = await _api.cnooc.modifyPwd(params);
							if (res.code == 200) {
								_.$msgSuccess(i18n("修改成功"));
							} else {
								_.$msgError(res.message);
							}
						} catch (error) {
							_.$msgError(error);
						} finally {
							_.$loading(false);
						}
					}
				};
			}
		}
	};
}
</script>
