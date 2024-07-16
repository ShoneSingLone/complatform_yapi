<script lang="ts">
export default async function () {
	const LOOP_TYPE_NAME_ARRAY = ["playOrder", "playRandom", "playLoop", "playSingleLoop"];

	return {
		useMusic() {
			let intervalTimer;
			const stateAudio = reactive({
				AudioArray: [],
				loopType: 0,
				audioName: "",
				isPlaying: false, //是否播放中
				isPause: false, //是否暂停
				audio: new Audio(),
				currentTime: 0,
				ended: false, //是否播放结束
				duration: 0, //总播放时长,
				isMute: false, //是否静音
				volume: 100
			});
			onBeforeMount(async () => {
				stateAudio.AudioArray = (await _.$idb.get("AudioArray")) || [];
			});

			onMounted(() => {
				navigator.mediaSession.setActionHandler("play", () => {
					togglePlayOrPause();
				});
				navigator.mediaSession.setActionHandler("pause", () => {
					togglePlayOrPause();
				});
				navigator.mediaSession.setActionHandler("previoustrack", () => {
					palyPrevSong();
				});
				navigator.mediaSession.setActionHandler("nexttrack", () => {
					playNextSong();
				});
			});

			watch(
				() => stateAudio.ended,
				ended => {
					if (!ended) return;
					handlePlayEnd();
				}
			);

			watch(
				() => stateAudio.audioName,
				audioName => {
					_.$setDocTitle(audioName);
				}
			);

			const Cpt_iconPlayModel = computed(() => {
				return LOOP_TYPE_NAME_ARRAY[stateAudio.loopType];
			});

			function handlePlayEnd() {
				stopSong();
				const currentSongIndex = _.findIndex(stateAudio.AudioArray, {
					name: stateAudio.audioName
				});

				if (currentSongIndex > -1) {
					playMethods[Cpt_iconPlayModel.value](currentSongIndex);
				}
			}

			function setCurrentTime(val) {
				try {
					stateAudio.audio.currentTime = val;
				} catch (error) {
					console.error(error);
				} finally {
				}
			}
			function intervalCurrentTime() {
				stateAudio.currentTime = parseInt(stateAudio.audio.currentTime.toString());
				stateAudio.duration = parseInt(stateAudio.audio.duration.toString());
				stateAudio.ended = stateAudio.audio.ended;
			}

			function palyPrevSong() {
				const currentSongIndex = _.findIndex(stateAudio.AudioArray, {
					name: stateAudio.audioName
				});
				if (currentSongIndex > -1) {
					if (currentSongIndex === 0) {
						playAudio(stateAudio.AudioArray[stateAudio.AudioArray.length - 1]);
					} else {
						playAudio(stateAudio.AudioArray[currentSongIndex - 1]);
					}
				}
			}
			function stopSong() {
				stateAudio.isPlaying = false;
				stateAudio.audio.pause();
				stateAudio.audio.currentTime = 0;
				stateAudio.currentTime = 0;
			}
			function togglePlayOrPause() {
				if (!stateAudio.audioName) return;
				stateAudio.isPlaying = !stateAudio.isPlaying;
				if (stateAudio.isPlaying) {
					stateAudio.audio.play();
				} else {
					stateAudio.audio.pause();
				}
			}

			function playNextSong() {
				if (Cpt_iconPlayModel.value === "playSingleLoop") {
					const currentSongIndex = _.findIndex(stateAudio.AudioArray, {
						name: stateAudio.audioName
					});
					if (currentSongIndex > -1) {
						playMethods.playLoop(currentSongIndex);
					}
				} else {
					handlePlayEnd();
				}
			}

			function playMedia(record, { resource }) {
				resource = resource || [];
				if (record.type === "audio") {
					playAudio(record);

					stateAudio.AudioArray = _.uniqBy(
						[...stateAudio.AudioArray, ..._.filter(resource, i => i.type === "audio")],
						"_id"
					);
					_.$idb.set("AudioArray", stateAudio.AudioArray);
				}
				if (record.type === "video") {
					playVideo(record);
				}
			}

			async function playVideo(record) {
				const { path, _id } = record;
				let uri = encodeURIComponent(JSON.stringify(path));

				return _.$openModal({
					title: "video player",
					url: "@/views/explore/execTools/video/VideoPlayer.dialog.vue",
					uri,
					id: _id
				});
			}

			async function playAudio(record) {
				const { path, name, _id } = record;
				stopSong();
				function canPlay() {
					return new Promise(resolve => {
						stateAudio.audio.onloadedmetadata = async event => {};
						stateAudio.audio.oncanplaythrough = async event => {
							console.log("I think I can play through the entire ", event);
						};
						stateAudio.audio.oncanplay = function (event) {
							if (intervalTimer) {
								clearInterval(intervalTimer);
							}
							intervalTimer = setInterval(intervalCurrentTime, 1000);
							resolve(stateAudio.duration);
						};
					});
				}
				let uri = encodeURIComponent(JSON.stringify(path));
				stateAudio.audioName = name;
				stateAudio.audio.src = Vue._common_utils.appendToken(
					`${window._URL_PREFIX_4_DEV || ""}/api/resource/audio?id=${_id}`
				);
				(async () => {
					try {
						const {
							data: { title, artist, album, image }
						} = await _api.yapi.audioDetail({
							id: _id
						});
						/* 
						artwork 是一个包含多个图片对象的数组。每个图片对象具有 src（图片的链接）、sizes（图片尺寸）和 type（图片类型）属性。通过设置这些图片信息，可以在支持的环境中（如某些浏览器）显示与媒体相关的图片，例如专辑封面等。
						*/
						navigator.mediaSession.metadata = new MediaMetadata({
							title,
							artist,
							album,
							artwork: [{ src: image || "", sizes: "", type: "" }]
						});
					} catch (error) {
						console.error(error);
					} finally {
					}
				})();
				await canPlay();
				stateAudio.audio.play();
				stateAudio.isPlaying = true;
				const audioVolume = stateAudio.volume / 100;
				stateAudio.audio.volume = audioVolume;
			}
			const playMethods = {
				playLoop(currentSongIndex) {
					const next = currentSongIndex + 1;
					if (next > stateAudio.AudioArray.length - 1) {
						playAudio(stateAudio.AudioArray[0]);
					} else {
						playAudio(stateAudio.AudioArray[next]);
					}
				},
				playRandom(currentSongIndex) {
					let next;
					/* 如果只有一首，循环一首 */
					if (stateAudio.AudioArray.length === 1) {
						next = 0;
						playAudio(stateAudio.AudioArray[0]);
						return;
					}
					const max = stateAudio.AudioArray.length - 1;
					const min = 0;
					const getNext = () => Math.floor(Math.random() * (max - min + 1)) + min;
					next = getNext();
					while (next === currentSongIndex) {
						next = getNext();
					}
					playAudio(stateAudio.AudioArray[next]);
				},
				playOrder(currentSongIndex) {
					const next = currentSongIndex + 1;
					if (next > stateAudio.AudioArray.length - 1) {
						stopSong();
					} else {
						playAudio(stateAudio.AudioArray[next]);
					}
				},
				playSingleLoop(currentSongIndex) {
					playAudio(stateAudio.AudioArray[currentSongIndex]);
				}
			};

			function toggleVolumeMute() {
				stateAudio.isMute = !stateAudio.isMute;
				stateAudio.audio.muted = stateAudio.isMute;
			}

			const cacheAudioVolume = _.debounce(function (audiovolume) {
				_.$lStorage["PLAYER-VOLUME"] = audiovolume;
			}, 1000);

			return {
				LOOP_TYPE_NAME_ARRAY,
				playAudio,
				playMedia,
				/*  */
				stateAudio,
				methodsMusicPlayer: {
					setCurrentTime,
					palyPrevSong,
					stopSong,
					togglePlayOrPause,
					playNextSong,
					toggleVolumeMute,
					setVolume(n) {
						n = n > 100 ? 100 : n;
						n = n < 0 ? 0 : n;
						stateAudio.volume = n;
						const audioVolume = n / 100;
						stateAudio.audio.volume = audioVolume;
						cacheAudioVolume(audioVolume);
					},
					async togglePlayModel() {
						stateAudio.loopType =
							(stateAudio.loopType + 1) % LOOP_TYPE_NAME_ARRAY.length;
					}
				}
			};
		}
	};
}
</script>
