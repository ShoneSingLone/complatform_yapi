<template>
	<div class="card-DaiTuPian">
		<xMd :md="mdTitle" />
		<xForm>
			<xCard :body-style="{ padding: '0px' }" v-for="(o, index) in 2" :key="o">
				<img
					src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
					class="image" />
				<div style="padding: 14px">
					<span>好吃的汉堡</span>
					<div class="bottom clearfix">
						<time class="time">{{ currentDate }}</time>
						<xBtn>操作按钮</xBtn>
					</div>
				</div>
			</xCard>
		</xForm>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				mdTitle:
					"可配置定义更丰富的内容展示。\n配置`body-style`属性来自定义`body`部分的`style`，我们还使用了布局组件。",
				currentDate: _.$dateFormat()
			};
		}
	});
}
</script>
<style lang="less">
.card-DaiTuPian {
	.time {
		font-size: 13px;
		color: #999;
	}

	.bottom {
		margin-top: 13px;
		line-height: 12px;
	}

	.button {
		padding: 0;
		float: right;
	}

	.image {
		width: 100%;
		display: block;
	}
}
</style>
