<script lang="ts">
export default async function () {
	if (!window._api?.zl) {
		_.$ajax.requestInjector = function (req) {
			return req;
		};
		_.$ajax.responseInjector = function (res) {
			return res;
		};
		window._api.cnooc = {
			/**
			 * @param param0  order_id, user_name, op_type, commet
			 */
			modifyPwd({ pwd }) {
				return _.$ajax.post(`modifyPwd`, { data: { pwd } });
			}
		};
	}
	return window._api.cnooc;
}
</script>
