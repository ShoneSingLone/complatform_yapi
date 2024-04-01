<script lang="ts">
export default async function () {
	return [
		{
			icon: "_todo",
			label: i18n("License"),
			href: "/license"
		},
		{
			icon: "_query",
			label: i18n("密码修改"),
			href: "/pwd_modify"
		}
	];
}
</script>
