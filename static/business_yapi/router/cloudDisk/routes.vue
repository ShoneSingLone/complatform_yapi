<script lang="ts">
export default async function () {
	const ComponentRouterView = {
		render(h) {
			return h("router-view");
		}
	};
	return [
		_.$newRoute("/login", "@/views/Login/Login.vue"),
		_.$newRoute("/home", "@/views/CloudDisk/CloudDiskHome.vue", {
			redirect: "/home/list",
			children: [_.$newRoute("/home/list", "@/views/CloudDisk/CloudDiskHomeList.vue")]
		}),
		{
			/* 本来应该是NotFound，但是没有必要 */
			path: "*",
			redirect: "/login"
		}
	];
}
</script>
