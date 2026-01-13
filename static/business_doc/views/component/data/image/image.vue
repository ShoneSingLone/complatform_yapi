<template>
	<DocContentOfDemo class="image-demo">
		<xMd :md="md" />
		<DemoAndCode title="基础用法" path="@/views/component/data/image/JiChuYongFa.vue" unfold />
		<DemoAndCode title="大图预览" path="@/views/component/data/image/DaTuYuLan.vue" unfold />
		<DemoAndCode title="加载失败" path="@/views/component/data/image/JiaZaiShiBai.vue" unfold />
		<DemoAndCode
			title="占位内容"
			path="@/views/component/data/image/ZhanWeiNeiRong.vue"
			unfold />
		<DemoAndCode title="懒加载" path="@/views/component/data/image/LanJiaZai.vue" unfold />
		<xMd :md="apiString" data-role="api" />
	</DocContentOfDemo>
</template>

<script lang="ts">
export default async function () {
	return {
		data() {
			return {
				md: `## Image 图片
图片容器，在保留原生img的特性下，支持懒加载，自定义占位、加载失败等`,
				apiString: `### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| src | 图片源，同原生 | string | — | - |
| fit | 确定图片如何适应容器框，同原生 [object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit) | string | fill / contain / cover / none / scale-down | - |
| alt | 原生 alt | string | - | - |
| referrer-policy | 原生 referrerPolicy | string | - | - |
| lazy | 是否开启懒加载 | boolean | — | false |
| scroll-container | 开启懒加载后，监听 scroll 事件的容器 | string / HTMLElement | — | 最近一个 overflow 值为 auto 或 scroll 的父元素 |
| preview-src-list | 开启图片预览功能 | Array | — | - |
| initial-index | 图片预览初始图片index | Number | — | - |

### Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| load | 图片加载成功触发 | (e: Event) |
| error | 图片加载失败触发 | (e: Error) |

### Slots
| 名称    | 说明         |
|---------|-------------|
| placeholder | 图片未加载的占位内容 |
| error | 加载失败的内容 |

### 图片预览功能特性

#### 移动端特性
1. **双击切换模式**：在移动端，双击图片可以切换显示模式（contain/original）
2. **触摸优化**：触摸操作不会穿透影响下层内容，避免误触
3. **关闭方式**：只能通过左上角关闭按钮关闭弹窗，点击背景不会关闭
4. **默认模式**：默认使用contain模式显示图片，保持良好的浏览体验

#### 通用特性
1. **毛玻璃加载效果**：图片加载过程中显示毛玻璃覆盖层，提升视觉体验
2. **幻灯片功能**：支持自动播放幻灯片，可调整播放速度
3. **多图预览**：支持多张图片预览，可通过左右箭头切换
4. **缩放旋转**：支持图片缩放、旋转等操作
5. **键盘导航**：支持键盘方向键切换图片，ESC键关闭预览
6. **状态记忆**：路径折叠状态和排序配置会保存到localStorage

#### 工具函数调用
通过 `_.$previewImgs(options)` 函数可以直接调用图片预览功能，支持以下选项：
- `urlList`: 图片URL列表
- `index`: 初始显示的图片索引
- `currentUrl`: 当前图片URL（优先级高于index）
- `autoPlay`: 是否自动播放幻灯片（默认false）`
			};
		}
	};
}
</script>

<style lang="less">
.image-demo {
	.block {
		padding: 30px 0;
		text-align: center;
		border-right: solid 1px #eff2f6;
		display: inline-block;
		width: 20%;
		box-sizing: border-box;
		vertical-align: top;
		&:last-child {
			border-right: none;
		}
	}

	.demonstration {
		display: block;
		color: #8492a6;
		font-size: 14px;
		margin-bottom: 20px;
	}

	.xImg {
		width: 300px;
		height: 200px;
	}

	.image-slot {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		background: #f5f7fa;
		color: #909399;
		font-size: 14px;
	}

	.dot {
		animation: dot 2s infinite steps(3, start);
		overflow: hidden;
	}

	.demo-image__error {
		width: 200px;
		height: 200px;
	}
}
</style>
