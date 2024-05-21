<script lang="ts">
export default async function () {
	const [, [VueRouter, routes]] = await Promise.all([
		Promise.all([
			_.$importVue("/common/ui-x/useXui.vue"),
			_.$importVue("/common/ui-element/useElementUI.NoJS.vue", {
				// _.$importVue("/common/ui-element/useElementUI.vue", {
				size: "small",
				I18N_LANGUAGE: window.I18N_LANGUAGE
			})
		]),
		_.$importVue([
			"/common/libs/VueRouter.vue",
			"@/router/cloudDisk/routes.vue",
			/*常量*/
			"@/utils/var.vue",
			/*接口*/
			"@/utils/api.vue",
			/*校验规则*/
			"/common/utils/rules.vue",
			/*枚举选项*/
			"@/utils/utils.vue",
			/*工具函数*/
			// "@/utils/helper.vue",
			/*复用组件*/
			// "@/utils/reuse.vue"
			/*通用下拉项*/
			"@/utils/opts.vue",
			/* 项目独有样式 */
			"@/yapi.defaul.style.vue"
		])
	]);

	/* app entry  */
	const router = new VueRouter({ routes });
	const LOADING_STATUS = 0;
	const GUEST_STATUS = 1;
	const MEMBER_STATUS = 2;
	/*  */
	_.$yapiRouter = router;

	// router.beforeEach(function (to, from) {});

	var rootApp = new Vue({
		el: "#app",
		router,
		components: {
			ViewApp: () => _.$importVue("@/layout/AppLayoutLevel.vue")
		},
		template: `<ViewApp/>`,
		provide() {
			return {
				APP: this
			};
		},
		mounted() {
			this.initMobileModel();
			this.refreshUserInfo();
		},
		data() {
			const vm = this;
			vm.refreshUserInfo = _.$asyncDebounce(
				vm,
				async function refreshUserInfo() {
					try {
						if (!vm.user.isLogin) {
							const { data: userInfo } = await _api.yapi.userStatus();
							vm._setUser(userInfo);
						}

						if (vm.user.isLogin) {
							const { data: allUser } = await _api.yapi.userSearch({});
							vm.allUser = allUser;

							/* TODO: 跳转到首页 或者note应用*/
							if (vm.$route.path === "/home") {
								return;
							} else {
								vm.$router.push({ path: "/home" });
							}
						}
						return true;
					} catch (error) {
						/* 未登录，跳转登录界面 */
						vm.$router.push("/login");
					} finally {
						$("body").removeClass("x-loading");
					}
				},
				10
			);

			return {
				currentTabName: "首页",
				homeListDrawer: false,
				/* ****************** */
				isMobile: /Mobile/gi.test(window.navigator.userAgent),
				useMobileView: true,
				BASE_URL: window.__BASE_URL || window.location.origin,
				expandedKeys: {
					group: []
				},
				allUser: [],
				menu: {},
				globalSize: "",
				isFooterFold: false,
				urlHash: window.location.hash,
				user: {
					add_time: "",
					email: "",
					role: "",
					study: false,
					type: "",
					up_time: "",
					username: "",
					_id: "",
					isLogin: false,
					isLDAP: false,
					userName: null,
					uid: null,
					loginState: LOADING_STATUS,
					breadcrumb: [],
					studyTip: 0,
					imageUrl: ""
				},
				news: {
					newsData: {
						list: [],
						total: 0
					},
					curpage: 1
				},
				/* group */
				groupList: [],
				groupMemberList: [],
				groupProjectList: []
			};
		},
		methods: {
			getShareUrl({ state }) {
				// #ifndef H5
				uni.getClipboardData({
					success: res => {
						if (res.data.includes("http://127.0.0.1:7001/")) {
							let key = res.data.substring(res.data.lastIndexOf("\/") + 1, res.data.length);
							if (!key) {
								return;
							}
							uni.showModal({
								content: "检测到有分享内容，是否打开？",
								success: res => {
									if (res.confirm) {
										uni.navigateTo({
											url: "/pages/shareurl/shareurl?key=" + key
										});
										// 清空剪切板
										uni.setClipboardData({
											data: ""
										});
									}
								}
							});
						}
					}
				});
				// #endif
			},
			clearList({ state }) {
				if (state.user) {
					uni.removeStorageSync("downlist_" + state.user.id);
					uni.removeStorageSync("uploadList_" + state.user.id);

					state.uploadList = [];
					state.downlist = [];
				}
			},
			initList({ state }) {
				if (state.user) {
					let d = uni.getStorageSync("downlist_" + state.user.id);
					let u = uni.getStorageSync("uploadList_" + state.user.id);

					state.downlist = d ? JSON.parse(d) : [];
					state.uploadList = u ? JSON.parse(u) : [];
				}
			},
			// 创建一个下载任务
			createDownLoadJob({ state }, obj) {
				state.downlist.unshift(obj);
				uni.setStorage({
					key: "downlist_" + state.user.id,
					data: JSON.stringify(state.downlist)
				});
			},
			// 更新下载任务进度
			updateDownLoadJob({ state }, obj) {
				let i = state.downlist.findIndex(item => item.key === obj.key);
				if (i !== -1) {
					state.downlist[i].progress = obj.progress;
					state.downlist[i].status = obj.status;
					uni.setStorage({
						key: "downlist_" + state.user.id,
						data: JSON.stringify(state.downlist)
					});
				}
			},
			// 创建一个上传任务
			createUploadJob({ state }, obj) {
				state.uploadList.unshift(obj);
				uni.setStorage({
					key: "uploadList_" + state.user.id,
					data: JSON.stringify(state.uploadList)
				});
			},
			// 更新上传任务进度
			updateUploadJob({ state }, obj) {
				let i = state.uploadList.findIndex(item => item.key === obj.key);
				if (i !== -1) {
					state.uploadList[i].progress = obj.progress;
					state.uploadList[i].status = obj.status;
					uni.setStorage({
						key: "uploadList_" + state.user.id,
						data: JSON.stringify(state.uploadList)
					});
				}
			},
			logout({ state }) {
				$H.post(
					"/logout",
					{},
					{
						token: true
					}
				);
				state.user = null;
				state.token = null;
				uni.removeStorageSync("user");
				uni.removeStorageSync("token");

				uni.reLaunch({
					url: "/pages/login/login"
				});
			},
			login({ state }, user) {
				state.user = user;
				state.token = user.token;

				uni.setStorageSync("user", JSON.stringify(user));
				uni.setStorageSync("token", user.token);
			},
			initUser({ state }) {
				let user = uni.getStorageSync("user");
				if (user) {
					state.user = JSON.parse(user);
					state.token = state.user.token;
				}
			},
			updateSize({ state }, e) {
				state.user.total_size = e.total_size;
				state.user.used_size = e.used_size;
			},
			/* ******************** */
			routerUpsertQuery(query) {
				this.$router.push({
					path: this.$route.path,
					query: {
						...this.$route.query,
						...query
					}
				});
			},
			initMobileModel() {
				if (this.isMobile) {
					$("body").addClass("app-mobile");
				}
			},
			/* ************************methods************************ */
			_setUser(userInfo) {
				const isLogin = !!userInfo._id;
				this.user = {
					...userInfo,
					isLogin,
					isLDAP: !!userInfo.ladp,
					role: userInfo ? userInfo.role : null,
					loginState: isLogin ? MEMBER_STATUS : GUEST_STATUS,
					userName: userInfo ? userInfo.username : null,
					uid: userInfo ? isLogin : null,
					type: userInfo ? userInfo.type : null,
					study: userInfo ? userInfo.study : false
				};
			},
			/**
			 * 如果group是对象，直接赋值，
			 * 如果是Id(可能不是数字),则需要request
			 * @param groupId
			 * @returns {Promise<void>}
			 */
			async logoutActions() {
				try {
					const { data } = await _api.yapi.userLogout();
					if (data === "ok") {
						_.$lStorage.x_token = "";
						this._setUser({
							isLogin: false,
							loginState: GUEST_STATUS,
							userName: null,
							uid: null,
							role: "",
							type: ""
						});
						this.$router.push("/login");
						_.$msgSuccess(i18n("退出成功! "));
					}
				} catch (error) {
					_.$msgError(error);
				}
			}
		},
		computed: {},
		watch: {
			"$route.path": {
				immediate: true,
				handler() {
					this.refreshUserInfo().then(res => {
						console.log("🚀 ~ this.refreshUserInfo ~ res:", res);
					});
				}
			}
		}
	});

	return rootApp;
}
</script>

<style lang="less"></style>
