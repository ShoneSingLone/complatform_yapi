<script lang="ts">
export default async function () {
	if (!window._opts.cnooc) {
		/*枚举选项*/
		window._opts.cnooc = {};
	}
	return window._opts.cnooc;
}
</script>
