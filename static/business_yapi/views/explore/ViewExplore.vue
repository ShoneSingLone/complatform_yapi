<style lang="less"></style>
<template>
	<div>
		<div class="x-padding">
			<xBreadcrumb separator="/">
				<xBreadcrumbItem @click="back(-1)"> root </xBreadcrumbItem>
				<xBreadcrumbItem v-for="(item, index) in pathStack" :key="index" @click="back(index)" preset="blue">
					{{ item }}
				</xBreadcrumbItem>
			</xBreadcrumb>
		</div>
		<div v-for="(item, index) in resource" :key="index" class="mt">
			<xBtn v-if="item.type === 'audio'" @click="palyAudio(item)">{{ item.name }}</xBtn>
			<xBtn v-else @click="getResource(item)" preset="blue">{{ item.name }}</xBtn>
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		setup() {
			let intervalTimer;
			const stateMusic = reactive({
				isPlaying: false, //是否播放中
				isPause: false, //是否暂停
				audio: new Audio(),
				currentTime: 0,
				ended: false, //是否播放结束
				muted: false, //是否静音
				duration: 0, //总播放时长,
				volume: (() => {
					const volume = _.$lStorage["PLAYER-VOLUME"];
					if (volume) {
						return Number(volume) * 100;
					} else {
						return 20;
					}
				})()
			});

			function stopSong() {
				stateMusic.isPlaying = false;
				stateMusic.audio.pause();
				stateMusic.audio.currentTime = 0;
				stateMusic.currentTime = 0;
			}

			function intervalCurrentTime() {
				stateMusic.currentTime = parseInt(stateMusic.audio.currentTime.toString());
				stateMusic.duration = parseInt(stateMusic.audio.duration.toString());
				stateMusic.ended = stateMusic.audio.ended;
			}

			return {
				async palyAudio({ path }) {
					stopSong();
					function canPlay() {
						return new Promise(resolve => {
							stateMusic.audio.onloadedmetadata = async event => {
								console.log("🚀 ~ file: stateMusic.tsx ~ line 292 ~ canPlay ~ event", event);
							};
							stateMusic.audio.oncanplaythrough = async event => {
								console.log("I think I can play through the entire ", event);
							};
							stateMusic.audio.oncanplay = function (event) {
								debugger;
								if (intervalTimer) {
									clearInterval(intervalTimer);
								}
								intervalTimer = setInterval(intervalCurrentTime, 1000);
								resolve(stateMusic.duration);
							};
						});
					}
					let uri = encodeURIComponent(JSON.stringify(path));

					stateMusic.audio.src = Vue._yapi_utils.appendToken(`${window._URL_PREFIX_4_DEV || ""}/api/resource/remote_music_file?uri=${uri}`);
					await canPlay();
					stateMusic.audio.play();
					stateMusic.isPlaying = true;
					const audioVolume = stateMusic.volume / 100;
					stateMusic.audio.volume = audioVolume;
				}
			};
		},
		data() {
			return {
				resource: [],
				pathStack: []
			};
		},
		mounted() {
			this.getResource();
		},
		methods: {
			back(index) {
				if (index === -1) {
					this.getResource({ path: [] });
				} else {
					this.getResource({ path: this.pathStack.slice(0, index + 1) });
				}
			},
			async getResource(item = {}) {
				this.pathStack = _.isArray(item?.path) ? item.path : [];
				_.$loading(true);
				try {
					const res = await _api.yapi.resourceLs({ path: this.pathStack });
					if (!res.errcode) {
						this.resource = res.data;
					}
				} catch (error) {
					console.error(error);
				} finally {
					_.$loading(false);
				}
			}
		}
	});
}
</script>
