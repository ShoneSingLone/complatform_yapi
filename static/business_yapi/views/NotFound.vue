<style lang="less">
.ViewNotFound {
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
	}

	body {
		min-height: 100vh;
		background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 2rem;
		color: #333;
		text-align: center;
	}

	.error-container {
		max-width: 800px;
		width: 100%;
		padding: 3rem;
		background-color: rgba(255, 255, 255, 0.9);
		border-radius: 12px;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
		transition: transform 0.3s ease;
	}

	.error-container:hover {
		transform: translateY(-5px);
	}

	.error-code {
		font-size: 8rem;
		font-weight: 700;
		background: linear-gradient(90deg, #3498db, #9b59b6);
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
		margin-bottom: 1rem;
		position: relative;
		display: inline-block;
	}

	.error-code::after {
		content: "";
		position: absolute;
		bottom: 15px;
		left: 10%;
		width: 80%;
		height: 15px;
		background-color: rgba(52, 152, 219, 0.1);
		z-index: -1;
		border-radius: 50%;
	}

	h1 {
		font-size: 2.2rem;
		margin-bottom: 1.5rem;
		color: #2c3e50;
	}

	.error-message {
		font-size: 1.1rem;
		line-height: 1.6;
		margin-bottom: 2rem;
		color: #7f8c8d;
	}

	.url-container {
		background-color: #f8f9fa;
		border-left: 4px solid #3498db;
		padding: 1rem 1.5rem;
		border-radius: 4px;
		margin: 2rem 0;
		font-family: monospace;
		word-break: break-all;
		text-align: left;
		transition: all 0.3s ease;
	}

	.url-container:hover {
		background-color: #f1f3f5;
		transform: translateX(5px);
	}

	.url-label {
		font-weight: 600;
		color: #3498db;
		margin-bottom: 0.5rem;
		display: block;
	}

	.back-button {
		display: inline-block;
		padding: 0.8rem 2rem;
		background-color: #3498db;
		color: white;
		text-decoration: none;
		border-radius: 30px;
		font-weight: 600;
		transition: all 0.3s ease;
		border: none;
		cursor: pointer;
		font-size: 1rem;
		margin-top: 1rem;
	}

	.back-button:hover {
		background-color: #2980b9;
		transform: translateY(-3px);
		box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
	}

	.home-link {
		color: #3498db;
		text-decoration: none;
		font-weight: 600;
		margin-left: 0.5rem;
		transition: color 0.3s ease;
	}

	.home-link:hover {
		color: #2980b9;
		text-decoration: underline;
	}

	footer {
		margin-top: 3rem;
		color: #95a5a6;
		font-size: 0.9rem;
	}

	@media (max-width: 768px) {
		.error-code {
			font-size: 6rem;
		}

		h1 {
			font-size: 1.8rem;
		}

		.error-container {
			padding: 2rem 1rem;
		}
	}

	@media (max-width: 480px) {
		.error-code {
			font-size: 4rem;
		}

		h1 {
			font-size: 1.5rem;
		}

		.error-message {
			font-size: 1rem;
		}

		.back-button {
			padding: 0.7rem 1.5rem;
			font-size: 0.9rem;
		}
	}
}
</style>
<template>
	<div class="ViewNotFound flex center middle height100 vertical">
		<div class="error-container">
			<div class="error-code">404</div>
			<h1>页面未找到</h1>
			<p class="error-message">
				抱歉，您尝试访问的页面不存在或已被移动。请检查您输入的网址是否正确，或返回首页继续浏览。
			</p>

			<div class="url-container" v-if="isShowFrom">
				<span class="url-label">您尝试访问的地址：</span>
				<span id="invalid-url">{{ invalidUrl }}</span>
			</div>

			<p>
				您可以前往
				<a href="/" class="home-link">首页</a>
			</p>
		</div>

		<footer>&copy;保留所有权利</footer>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return { invalidUrl: "" };
		},
		computed: {
			isShowFrom() {
				return this.$route.params?.from?.fullPath !== this.invalidUrl;
			}
		},
		mounted() {
			this.invalidUrl = this.$route.params?.from?.fullPath;
		}
	});
}
</script>
