<template>
	<div style="height: 100vh">
		<h6>
			<slot> </slot>
		</h6>
		<h5>
			<slot name="first"></slot>
		</h5>
		<h4>
			<slot name="params" :title="title"></slot>
		</h4>
	</div>
</template>
<script lang="ts">
export default async function () {
	const title = this.THIS_FILE_URL;
	return defineComponent({
		data() {
			return {
				title
			};
		}
	});
}
</script>
