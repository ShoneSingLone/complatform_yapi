<style lang="less">
#ViewExplore {
	background-color: var(--el-color-white);
	* {
		// outline: 1px solid yellowgreen;
	}
}
</style>
<template>
	<div class="height100 flex vertical" id="ViewExplore">
		<div class="x-padding">
			<xBreadcrumb separator="/">
				<xBreadcrumbItem class="pointer" @click="back(-1)"> root </xBreadcrumbItem>
				<xBreadcrumbItem class="pointer" v-for="(item, index) in pathStack" :key="index" @click="back(index)" preset="blue">
					{{ item }}
				</xBreadcrumbItem>
			</xBreadcrumb>
		</div>
		<div class="flex1 overflow-auto el-card">
			<div v-for="(item, index) in resource" :key="index" class="mt">
				<xBtn v-if="item.type === 'audio'" @click="playAudio(item)" :preset="item.name === stateMusicPlayer.songId ? 'blue' : ''">{{ item.name }}</xBtn>
				<xBtn v-else @click="getResource(item)" preset="text">
					<div class="flex">
						<xGap l /><span> {{ item.name }}</span>
					</div>
				</xBtn>
			</div>
		</div>
		<div class="player-opr x-padding">
			<MusicPlayerAudio />
			<MusicPlayerOpration />
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		components: {
			MusicPlayerAudio: () => _.$importVue("@/views/explore/execTools/music/MusicPlayerAudio.vue"),
			MusicPlayerOpration: () => _.$importVue("@/views/explore/execTools/music/MusicPlayerOpration.vue")
		},
		setup() {
			const vm = this;
			let intervalTimer;
			const stateMusicPlayer = reactive({
				songId: "",
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
						return 100;
					}
				})()
			});

			function setCurrentTime(val) {
				stateMusicPlayer.audio.currentTime = val;
			}
			function intervalCurrentTime() {
				stateMusicPlayer.currentTime = parseInt(stateMusicPlayer.audio.currentTime.toString());
				stateMusicPlayer.duration = parseInt(stateMusicPlayer.audio.duration.toString());
				stateMusicPlayer.ended = stateMusicPlayer.audio.ended;
			}

			function palyPrevSong() {
				const currentSongIndex = _.findIndex(vm.cptResourceOnlyAudio, {
					name: stateMusicPlayer.songId
				});
				debugger;
				if (currentSongIndex > -1) {
					if (currentSongIndex === 0) {
						playAudio(vm.cptResourceOnlyAudio[vm.cptResourceOnlyAudio.length - 1]);
					} else {
						playAudio(vm.cptResourceOnlyAudio[currentSongIndex - 1]);
					}
				}
			}
			function stopSong() {
				stateMusicPlayer.isPlaying = false;
				stateMusicPlayer.audio.pause();
				stateMusicPlayer.audio.currentTime = 0;
				stateMusicPlayer.currentTime = 0;
			}
			function togglePlayOrPause() {
				if (!stateMusicPlayer.songId) return;
				stateMusicPlayer.isPlaying = !stateMusicPlayer.isPlaying;
				if (stateMusicPlayer.isPlaying) {
					stateMusicPlayer.audio.play();
				} else {
					stateMusicPlayer.audio.pause();
				}
			}

			function playNextSong() {
				const currentSongIndex = _.findIndex(vm.cptResourceOnlyAudio, {
					name: stateMusicPlayer.songId
				});
				if (currentSongIndex > -1) {
					playMethods.playLoop(currentSongIndex);
				}
			}

			async function playAudio(record) {
				const { path, name } = record;
				stopSong();
				function canPlay() {
					return new Promise(resolve => {
						stateMusicPlayer.audio.onloadedmetadata = async event => {
							console.log("🚀 ~ file: stateMusicPlayer.tsx ~ line 292 ~ canPlay ~ event", event);
						};
						stateMusicPlayer.audio.oncanplaythrough = async event => {
							console.log("I think I can play through the entire ", event);
						};
						stateMusicPlayer.audio.oncanplay = function (event) {
							if (intervalTimer) {
								clearInterval(intervalTimer);
							}
							intervalTimer = setInterval(intervalCurrentTime, 1000);
							resolve(stateMusicPlayer.duration);
						};
					});
				}
				let uri = encodeURIComponent(JSON.stringify(path));
				stateMusicPlayer.songId = name;
				stateMusicPlayer.audio.src = Vue._yapi_utils.appendToken(`${window._URL_PREFIX_4_DEV || ""}/api/resource/remote_music_file?uri=${uri}`);
				await canPlay();
				stateMusicPlayer.audio.play();
				stateMusicPlayer.isPlaying = true;
				const audioVolume = stateMusicPlayer.volume / 100;
				stateMusicPlayer.audio.volume = audioVolume;
			}
			const playMethods = {
				playLoop(currentSongIndex) {
					const next = currentSongIndex + 1;
					if (next > vm.cptResourceOnlyAudio.length - 1) {
						playAudio(vm.cptResourceOnlyAudio[0]);
					} else {
						playAudio(vm.cptResourceOnlyAudio[next]);
					}
				},
				playRandom(currentSongIndex) {
					let next;
					/* 如果只有一首，循环一首 */
					if (vm.cptResourceOnlyAudio.length === 1) {
						next = 0;
						playAudio(vm.cptResourceOnlyAudio[0]);
						return;
					}
					const max = vm.cptResourceOnlyAudio.length - 1;
					const min = 0;
					const getNext = () => Math.floor(Math.random() * (max - min + 1)) + min;
					next = getNext();
					while (next === currentSongIndex) {
						next = getNext();
					}
					playAudio(vm.cptResourceOnlyAudio[next]);
				},
				playOrder(currentSongIndex) {
					const next = currentSongIndex + 1;
					if (next > vm.cptResourceOnlyAudio.length - 1) {
						stopSong();
					} else {
						playAudio(vm.cptResourceOnlyAudio[next]);
					}
				},
				playSingleLoop(currentSongIndex) {
					playAudio(vm.cptResourceOnlyAudio[currentSongIndex]);
				}
			};

			return {
				playAudio,
				/*  */
				stateMusicPlayer,
				methodsMusicPlayer: {
					setCurrentTime,
					palyPrevSong,
					stopSong,
					togglePlayOrPause,
					playNextSong
				}
			};
		},
		provide() {
			return {
				inject_explore: this
			};
		},
		data() {
			return {
				resource: [],
				pathStack: []
			};
		},
		computed: {
			cptResourceOnlyAudio() {
				return _.filter(this.resource, { type: "audio" });
			}
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
						this.resource = _.orderBy(res.data, ["type"]);
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
