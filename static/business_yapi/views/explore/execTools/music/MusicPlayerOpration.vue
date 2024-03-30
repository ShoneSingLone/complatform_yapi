<style lang="less"></style>
<template>
	<div class="flex middle center">
		<xBtn :configs="btnPre" />
		<xGap l="4" />
		<xBtn :configs="btnStop" />
		<xGap l="4" />
		<xBtn :configs="playOrPause" />
		<xGap l="4" />
		<xBtn :configs="btnNext" />
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["inject_explore"],
		setup() {
			return {};
		},
		computed: {
			stateMusicPlayer() {
				return this.inject_explore.stateMusicPlayer;
			},
			methodsMusicPlayer() {
				return this.inject_explore.methodsMusicPlayer;
			},
			btnPre() {
				return {
					label: () =>
						h("xIcon", {
							icon: "_prevsong"
						}),
					onClick: this.methodsMusicPlayer.palyPrevSong
				};
			},
			btnStop() {
				return {
					label: () =>
						h("xIcon", {
							icon: "_stopsong"
						}),
					onClick: this.methodsMusicPlayer.stopSong
				};
			},
			btnNext() {
				return {
					label: () =>
						h("xIcon", {
							icon: "_nextsong"
						}),
					onClick: this.methodsMusicPlayer.playNextSong
				};
			},
			iconSound() {
				return this.isMute ? "soundMute" : "sound";
			},
			playOrPause() {
				const vm = this;
				return {
					label: () => (vm.stateMusicPlayer.isPlaying ? h("xIcon", { icon: "_pausesong" }) : h("xIcon", { icon: "_playsong" })),
					onClick() {
						vm.methodsMusicPlayer.togglePlayOrPause();
					}
				};
			}
		},
		methods: {
			toggleVolumeMute() {
				this.isMute = !this.isMute;
			}
		}
	});
}
</script>
