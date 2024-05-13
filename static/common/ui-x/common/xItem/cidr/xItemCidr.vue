<template>
	<div class="xItemCidr">
		<xItemIpAddress v-model="ipObj" />
		<span class="cidr-point">/</span>
		<xSelect class="xItemCidr__mask is-select" @change="handleChangePort" v-model="port" v-if="portOption.length > 0">
			<xOption v-for="item of portOption" :key="item.value" :label="item.label" :value="item.value" />
		</xSelect>
		<div v-else class="cloud-ip-contaienr xItemCidr__contaienr cloud-flex-ip-v4">
			<div class="el-tooltip cloud-ip-input xItemCidr__center xItemCidr__input el-input el-input--small cloud-ip-v4__content">
				<xInput v-model="port" maxlength="3" />
			</div>
		</div>
	</div>
</template>

<script>
export default async function () {
	const { mixins } = await _.$importVue("/common/ui-x/common/ItemMixins.vue");
	return {
		name: "xItemCidr",
		mixins: [mixins],
		props: ["value", "configs", "options"],
		data() {/
			return {
				ipObj: {
					one: "",
					two: "",
					three: "",
					four: ""
				},
				port: ""
			};
		},
		watch: {
			value: {
				immediate: true,
				handler(value) {
					if (value) {
						let [ipString, port] = value?.split("/");
						this.port = port || "";
						/*  */
						ipString = ipString || "";
						let [one, two, three, four] = ipString?.split(".");
						this.ipObj = {
							one: one || "",
							two: two || "",
							three: three || "",
							four: four || ""
						};
					}
				}
			},
			ipObj: {
				// immediate: true,
				deep: true,
				handler(values) {
					if (values) {
						this.handleEmitIpAdd(values);
					}
				}
			}
		},
		computed: {
			portOption({ options }) {
				let arr1 = [];
				const [start, end] = options;
				for (let i = start; i <= end; i++) {
					arr1.push(i);
				}
				return arr1.map(item => ({ label: item, value: item + "" }));
			}
		},
		methods: {
			handleChangePort() {
				this.handleEmitIpAdd(this.ipObj);
			},
			handleEmitIpAdd(values) {
				let str = Object.keys(values).reduce((str, item) => {
					str += `${values[`${item}`]}.`;
					return str;
				}, "");
				//使用replace替换掉最后的.
				str = str.replace(/.$/, "");
				if (this.port) {
					str += `/${this.port}`;
				}
				this.$emit("change", str);
			}
		}
	};
}
</script>

<style scoped lang="scss">
.xItemCidr,
.xItemCidr__contaienr {
	display: inline-block;
	input {
		text-align: center;
	}
}

.xItemCidr__input:not(:first-of-type):before {
	content: ".";
	position: absolute;
	left: -13px;
	bottom: 0;
	padding: 0 5px;
}

.xItemCidr__input.el-input--mini {
	width: 52px;
}

.xItemCidr__mask {
	display: inline-block;
	width: 47px;
}

.xItemCidr__mask.is-select {
	width: 70px;
}

.xItemCidr__mask.el-input--mini {
	width: 45px;
}

.xItemCidr {
	.cloud-ip-input {
		position: relative;
	}
	.cloud-ip-v4__content:not(:first-of-type):before {
		content: ".";
		position: absolute;
		left: -13px;
		bottom: 0;
	}
	.cloud-ip-v6__content {
		width: 58px;
		margin-bottom: 10px;
	}
	.cloud-ip-v6__content:not(:first-of-type):before {
		content: ":";
		position: absolute;
		left: -13px;
		top: 47%;
		-webkit-transform: translateY(-50%);
		transform: translateY(-50%);
	}
}
</style>
