<script lang="ts">
export default async function () {
	const ComponentPageRouterView = {
		render(h) {
			return h("div", { class: "x-page-view" }, [h("xPageContent", [h("router-view")])]);
		}
	};
	const ComponentRouterView = {
		render(h) {
			return h("router-view");
		}
	};

	const routes = [_.$newRoute("/license", "@/views/License.vue"), _.$newRoute("/pwd_modify", "@/views/PwdModify.vue")];
	routes.push({
		/* 兜底：NotFound */
		path: "*",
		redirect: routes[0].path
	});
	return routes;
}
</script>
