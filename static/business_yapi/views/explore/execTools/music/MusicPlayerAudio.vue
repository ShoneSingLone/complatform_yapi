<style lang="less"></style>
<template>
	<div class="flex1 flex middle" id="MusicPlayerAudio">
		<span>{{ formatDuring(stateMusicPlayer.currentTime) }}</span>
		<xGap l />
		<elSlider class="flex1" :min="0" :max="stateMusicPlayer.duration" v-model="stateMusicPlayer.currentTime" :tooltip-visible="false" :format-tooltip="formatTooltip" @change="changSongProgress" />
		<xGap l />
		<span>{{ formatDuring(stateMusicPlayer.duration) }}</span>
	</div>
</template>
<script lang="ts">
export default async function () {
	function formatDuring(during) {
		const s = Math.floor(during) % 60;
		during = Math.floor(during / 60);
		const i = during % 60;

		let ii = i < 10 ? `0${i}` : i;
		let ss = s < 10 ? `0${s}` : s;

		ii = _.isNaN(ii) ? "00" : ii;
		ss = _.isNaN(ss) ? "00" : ss;
		return ii + ":" + ss;
	}

	return defineComponent({
		inject: ["inject_explore"],
		setup() {
			return {
				formatDuring
			};
		},
		computed: {
			stateMusicPlayer() {
				return this.inject_explore.stateMusicPlayer;
			},
			methodsMusicPlayer() {
				return this.inject_explore.methodsMusicPlayer;
			}
		},
		methods: {
			formatTooltip(val) {
				return formatDuring(val);
			},
			changSongProgress(val) {
				this.methodsMusicPlayer.setCurrentTime(val);
			}
		}
	});
}
</script>
