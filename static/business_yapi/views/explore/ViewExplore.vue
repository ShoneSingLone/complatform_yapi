<style lang="less">
#ViewExplore {
  --card-bg: #f5f5f5;
  --hover-bg: #e8e8e8;
  --shadow: 0 1px 2px 1px rgba(0, 0, 0, 0.1);
  --border-radius: 8px;
  background-color: var(--el-color-white);
  display: flex;
  flex-direction: column;
  height: 100%;
  
  .path-bar {
    height: 35px;
    width: 100%;
    display: flex;
    padding: 4px 10px 0 10px;
    align-items: center;
    border-bottom: 1px solid #e0e0e0;
    
    .breadcrumb {
      display: flex;
      align-items: center;
      overflow-x: auto;
      flex-grow: 1;
      height: 100%;
      
      &::-webkit-scrollbar {
        height: 2px;
      }
      
      &::-webkit-scrollbar-thumb {
        background: #7f7f7f70;
        background-clip: padding-box;
        border: 0px solid transparent;
        border-radius: 10px;
      }
      
      .breadcrumb-item {
        display: block;
        height: 100%;
        white-space: nowrap;
        padding: 2px 5px;
        height: min-content;
        border-radius: 5px;
        font-size: 15px;
        transition: 50ms;
        cursor: pointer;
        
        &:hover {
          background-color: var(--hover-bg);
        }
      }
      
      .separator {
        opacity: 0.4;
        font-size: 14px;
        line-height: 1;
        height: 14px;
        margin: 0 4px;
      }
    }
  }
  
  .toolbar {
    height: 42px;
    width: 100%;
    display: flex;
    padding: 0 10px 5px 10px;
    margin-top: 3px;
    align-items: center;
    border-bottom: 1px solid #e0e0e0;
    
    .search-box {
      margin-left: auto;
      min-width: 170px;
      width: 26%;
      max-width: 400px;
      
      .input {
        border-radius: var(--border-radius);
        border: 1px solid #ddd;
        padding: 6px 10px;
        width: 100%;
        font-size: 14px;
        
        &:focus {
          outline: none;
          border-color: #4a90e2;
          box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
        }
      }
    }
  }
  
  .resource-list {
    flex-grow: 1;
    overflow: auto;
    padding: 10px;
    
    .resource-item {
      width: 100%;
      padding: 2px 5px;
      border-radius: 5px;
      display: flex;
      border: 1.5px solid transparent;
      font-size: 14px;
      align-items: center;
      height: 30px;
      transition: 50ms;
      cursor: pointer;
      
      &:hover {
        background-color: var(--hover-bg);
        box-shadow: var(--shadow);
      }
      
      &.file {
        color: #555;
      }
      
      img {
        width: 25px;
        height: 25px;
        margin-right: 5px;
      }
      
      &.file img {
        width: 22px;
        height: 22px;
        margin-left: 2px;
        margin-right: 7px;
      }
      
      .name {
        flex-grow: 1;
      }
      
      .type {
        font-size: 12px;
        color: #888;
        margin-right: 10px;
      }
    }
  }
  
  .player-opr {
    background-color: var(--card-bg);
    padding: 10px;
    border-top: 1px solid #e0e0e0;
    display: flex;
    align-items: center;
    
    &.hidden {
      display: none;
    }
    
    .player-info {
      display: flex;
      align-items: center;
      margin-right: 15px;
      
      .song-name {
        font-size: 14px;
        font-weight: 500;
        margin-right: 5px;
      }
    }
    
    .player-controls {
      display: flex;
      align-items: center;
      flex-grow: 1;
      
      .volume-control {
        display: flex;
        align-items: center;
        margin-right: 15px;
      }
      
      .play-model {
        margin-right: 15px;
      }
      
      .operation {
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
<template>
  <div id="ViewExplore">
    <!-- 路径栏 -->
    <div class="path-bar">
      <div class="breadcrumb">
        <div class="breadcrumb-item" @click="back(-1)">root</div>
        <span class="separator">/</span>
        <div v-for="(item, index) in pathStack" :key="index" class="breadcrumb-item" @click="back(index)">
          {{ item }}
        </div>
      </div>
    </div>
    
    <!-- 工具栏 -->
    <div class="toolbar">
      <div class="search-box">
        <input v-model.lazy="searchKey" placeholder="搜索" clearable class="input" />
      </div>
    </div>
    
    <!-- 资源列表 -->
    <div class="resource-list">
      <div 
        v-for="(item, index) in cptResource" 
        :key="index" 
        class="resource-item" 
        :class="{ 'file': isShow(item) }" 
        @click="isShow(item) ? playMedia(item) : getResource(item)"
      >
        <img :src="getIcon(item)" alt="icon" />
        <div class="name">{{ item.name }}</div>
        <div class="type">{{ item.type }}</div>
      </div>
    </div>
    
    <!-- 音频播放器 -->
    <div v-if="stateAudio.songId" class="player-opr">
      <div class="player-info">
        <span class="song-name">{{ stateAudio.songId }}</span>
      </div>
      <div class="player-controls">
        <MusicPlayerAudio />
        <div class="volume-control">
          <MusicPlayerVolume class="flex1" />
        </div>
        <div class="play-model">
          <MusicPlayerModel />
        </div>
        <div class="operation">
          <MusicPlayerOpration />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default async function () {
	const LOOP_TYPE_NAME_ARRAY = ["playOrder", "playRandom", "playLoop", "playSingleLoop"];
	return defineComponent({
		components: {
			MusicPlayerModel: () =>
				_.$importVue("@/views/explore/execTools/music/MusicPlayerModel.vue"),
			MusicPlayerVolume: () =>
				_.$importVue("@/views/explore/execTools/music/MusicPlayerVolume.vue"),
			MusicPlayerAudio: () =>
				_.$importVue("@/views/explore/execTools/music/MusicPlayerAudio.vue"),
			MusicPlayerOpration: () =>
				_.$importVue("@/views/explore/execTools/music/MusicPlayerOpration.vue")
		},
		setup() {
			const vm = this;
			let intervalTimer;
			const stateAudio = reactive({
				loopType: 0,
				songId: "",
				isPlaying: false, //是否播放中
				isPause: false, //是否暂停
				audio: new Audio(),
				currentTime: 0,
				ended: false, //是否播放结束
				duration: 0, //总播放时长,
				isMute: false, //是否静音
				volume: (() => {
					const volume = _.$lStorage["PLAYER-VOLUME"];
					if (volume) {
						return Number(volume) * 100;
					} else {
						return 100;
					}
				})()
			});

			watch(
				() => stateAudio.ended,
				ended => {
					if (!ended) return;
					handlePlayEnd();
				}
			);

			const cptIconPlayModel = computed(() => {
				return LOOP_TYPE_NAME_ARRAY[stateAudio.loopType];
			});

			function handlePlayEnd() {
				stopSong();
				const currentSongIndex = _.findIndex(vm.cptResourceOnlyAudio, {
					name: stateAudio.songId
				});

				if (currentSongIndex > -1) {
					playMethods[cptIconPlayModel.value](currentSongIndex);
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
				const currentSongIndex = _.findIndex(vm.cptResourceOnlyAudio, {
					name: stateAudio.songId
				});
				if (currentSongIndex > -1) {
					if (currentSongIndex === 0) {
						playAudio(vm.cptResourceOnlyAudio[vm.cptResourceOnlyAudio.length - 1]);
					} else {
						playAudio(vm.cptResourceOnlyAudio[currentSongIndex - 1]);
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
				if (!stateAudio.songId) return;
				stateAudio.isPlaying = !stateAudio.isPlaying;
				if (stateAudio.isPlaying) {
					stateAudio.audio.play();
				} else {
					stateAudio.audio.pause();
				}
			}

			function playNextSong() {
				if (cptIconPlayModel.value === "playSingleLoop") {
					const currentSongIndex = _.findIndex(vm.cptResourceOnlyAudio, {
						name: stateAudio.songId
					});
					if (currentSongIndex > -1) {
						playMethods.playLoop(currentSongIndex);
					}
				} else {
					handlePlayEnd();
				}
			}

			function playMedia(record) {
				if (record.type === "audio") {
					playAudio(record);
				}
				if (record.type === "video") {
					playVideo(record);
				}
			}

			async function playVideo(record) {
				const { path, name } = record;
				let uri = encodeURIComponent(JSON.stringify(path));

				return _.$openModal({
					title: "video player",
					url: "@/views/explore/execTools/video/VideoPlayer.dialog.vue",
					uri,
					item: record
				});
			}

			async function playAudio(record) {
				const { path, name } = record;
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
				stateAudio.songId = name;
				stateAudio.audio.src = Vue._common_utils.appendToken(
					`${window._AJAX_URL_PREFIX || ""}/api/resource/audio?uri=${uri}`
				);
				await canPlay();
				stateAudio.audio.play();
				stateAudio.isPlaying = true;
				const audioVolume = stateAudio.volume / 100;
				stateAudio.audio.volume = audioVolume;
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
		},
		provide() {
			return {
				inject_explore: this
			};
		},
		data() {
			return {
				resource: _.$lStorage["VIEW_EXPLORE_PATH_STACK"] || [],
				pathStack: _.$lStorage["VIEW_EXPLORE_RESOURCE"] || [],
				searchKey: ""
			};
		},
		computed: {
			cptResource() {
				if (this.searchKey) {
					return _.filter(this.resource, item =>
						_.lowerCase(item.name).includes(this.searchKey)
					);
				}
				return this.resource;
			},
			cptResourceOnlyAudio() {
				return _.filter(this.cptResource, { type: "audio" });
			}
		},
		mounted() {
			this.getResource();
		},
		methods: {
      isShow(item) {
        return ['audio', 'video'].includes(item.type);
      },
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
            this.resource = _.orderBy(res.data, ['type']);
          }
        } catch (error) {
          console.error(error);
        } finally {
          _.$loading(false);
        }
      },
      getIcon(item) {
        if (item.type === "folder") {
          return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%234a90e2'%3E%3Cpath d='M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z'/%3E%3C/svg%3E";
        } else if (item.type === "audio") {
          return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%234caf50'%3E%3Cpath d='M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z'/%3E%3C/svg%3E";
        } else if (item.type === "video") {
          return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ff9800'%3E%3Cpath d='M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z'/%3E%3C/svg%3E";
        } else {
          return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%239e9e9e'%3E%3Cpath d='M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z'/%3E%3C/svg%3E";
        }
      }
    },
		watch: {
			pathStack(val) {
				_.$lStorage["VIEW_EXPLORE_PATH_STACK"] = val;
			},
			resource(val) {
				_.$lStorage["VIEW_EXPLORE_RESOURCE"] = val;
			}
		}
	});
}
</script>
