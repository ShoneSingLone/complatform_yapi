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
      height: auto;
      width: 100%;
      display: flex;
      padding: 0 10px 5px 10px;
      margin-top: 3px;
      align-items: center;
      border-bottom: 1px solid #e0e0e0;
      transition: all 0.2s ease;
      
      .toolbar-toggle {
        border-radius: 4px;
        border: 1px solid transparent;
        padding: 5px 8px;
        font-size: 13px;
        background-color: transparent;
        color: #333;
        cursor: pointer;
        transition: all 100ms ease;
        margin-right: 5px;
        
        &:hover {
          background-color: rgba(0, 0, 0, 0.05);
          border-color: rgba(0, 0, 0, 0.1);
        }
        
        &:focus {
          outline: none;
          background-color: rgba(74, 144, 226, 0.1);
          border-color: rgba(74, 144, 226, 0.3);
        }
      }
      
      .toolbar-content {
        display: flex;
        align-items: center;
        width: 100%;
        transition: all 0.2s ease;
        
        &.collapsed {
          display: none;
        }
        
        .sort-controls {
          display: flex;
          align-items: center;
          margin-right: 15px;
          gap: 5px;
          
          .sort-description {
            font-size: 13px;
            color: #666;
          }
          
          .sort-btn {
            border-radius: 4px;
            border: 1px solid transparent;
            padding: 5px 8px;
            font-size: 13px;
            background-color: transparent;
            color: #333;
            cursor: pointer;
            transition: all 100ms ease;
            font-weight: 500;
            display: inline-flex;
            align-items: center;
            gap: 3px;
            
            &:hover {
              background-color: rgba(0, 0, 0, 0.05);
              border-color: rgba(0, 0, 0, 0.1);
            }
            
            &:focus {
              outline: none;
              background-color: rgba(74, 144, 226, 0.1);
              border-color: rgba(74, 144, 226, 0.3);
            }
            
            &.active {
              background-color: rgba(74, 144, 226, 0.15);
              border-color: rgba(74, 144, 226, 0.4);
              color: #4a90e2;
            }
            
            &.sort-level-1 {
              box-shadow: 0 0 0 1px #4a90e2;
            }
            
            &.sort-level-2 {
              box-shadow: 0 0 0 1px #5cb85c;
            }
            
            .sort-order-indicator {
              font-size: 11px;
            }
          }
        }
        
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
    }
    
    /* 响应式设计 */
    @media (max-width: 768px) {
      .toolbar {
        flex-wrap: wrap;
        padding-bottom: 10px;
        height: auto;
        
        .toolbar-content {
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 5px;
          
          .sort-controls {
            width: 100%;
            margin-right: 0;
            flex-wrap: wrap;
            justify-content: space-between;
            
            .sort-btn {
              flex: 1;
              min-width: 70px;
              text-align: center;
            }
          }
          
          .search-box {
            width: 100%;
            min-width: auto;
            max-width: none;
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
        padding: 4px 5px;
        border-radius: 5px;
        display: flex;
        border: 1.5px solid transparent;
        font-size: 14px;
        align-items: flex-start;
        min-height: 30px;
        height: auto;
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
          margin-top: 1px;
          flex-shrink: 0;
        }
        
        &.file img {
          width: 22px;
          height: 22px;
          margin-left: 2px;
          margin-right: 7px;
          margin-top: 3px;
        }
        
        .name {
          flex-grow: 1;
          margin-right: 10px;
          word-break: break-all;
        }
        
        .type {
          font-size: 12px;
          color: #888;
          min-width: 60px;
          flex-shrink: 0;
          padding-top: 2px;
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
      <button class="toolbar-toggle" @click="toggleToolbar" title="切换工具栏">
        {{ toolbarCollapsed ? '▼' : '▲' }}
      </button>
      <div class="toolbar-content" :class="{ collapsed: toolbarCollapsed }">
        <div class="sort-controls">
          <div class="sort-description">排序方式：</div>
          <div v-for="option in sortOptions" :key="option.value" class="sort-btn-group">
            <button 
              class="sort-btn"
              :class="getSortBtnClass(option.value)"
              @click="toggleSortField(option.value)"
              :title="option.label + '排序'"
            >
              {{ option.label }}
              <span class="sort-order-indicator">{{ getSortOrderIndicator(option.value) }}</span>
            </button>
          </div>
        </div>
        <div class="search-box">
          <input v-model.lazy="searchKey" placeholder="搜索" clearable class="input" />
        </div>
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
			// 从localStorage读取排序设置，如果没有则使用默认值
			const savedSortConfig = _.$lStorage["VIEW_EXPLORE_SORT_CONFIG"];
			const defaultSortConfig = [
				{ field: "type", order: "asc" },
				{ field: "name", order: "asc" }
			];
			
			return {
				resource: _.$lStorage["VIEW_EXPLORE_RESOURCE"] || [],
				pathStack: _.$lStorage["VIEW_EXPLORE_PATH_STACK"] || [],
				searchKey: "",
				sortConfig: savedSortConfig || defaultSortConfig, // 排序配置：支持多个字段
				sortOptions: [
					{ label: "名称", value: "name" },
					{ label: "类型", value: "type" },
					{ label: "大小", value: "size" },
					{ label: "修改时间", value: "mtime" }
				],
				toolbarCollapsed: _.$lStorage["VIEW_EXPLORE_TOOLBAR_COLLAPSED"] === 'true' || false
			};
		},
		computed: {
				cptResource() {
					let filtered = this.resource;
					// 搜索过滤
					if (this.searchKey) {
						filtered = _.filter(filtered, item =>
							_.lowerCase(item.name || '').includes(this.searchKey)
						);
					}
					// 组合排序处理
					return [...filtered].sort((a, b) => {
						// 按sortConfig中的字段顺序依次比较
						for (const { field, order } of this.sortConfig) {
							let compareResult = 0;
							// 处理名称字段的自然排序
							if (field === 'name') {
								const aName = String(a.name || '');
								const bName = String(b.name || '');
								const aParts = aName.split(/(\d+)/);
								const bParts = bName.split(/(\d+)/);
								
								// 比较每一部分
								for (let i = 0; i < Math.min(aParts.length, bParts.length); i++) {
									const aPart = aParts[i];
									const bPart = bParts[i];
									
									// 如果都是数字，按数值比较
									if (/^\d+$/.test(aPart) && /^\d+$/.test(bPart)) {
										const aInt = parseInt(aPart);
										const bInt = parseInt(bPart);
										if (aInt !== bInt) {
											compareResult = order === 'asc' ? aInt - bInt : bInt - aInt;
											break;
										}
									} else {
										// 否则按字符串比较
										const compare = aPart.localeCompare(bPart);
										if (compare !== 0) {
											compareResult = order === 'asc' ? compare : -compare;
											break;
										}
									}
								}
								
								// 如果一个是另一个的前缀，比较长度
								if (compareResult === 0) {
									compareResult = order === 'asc' ? 
										aParts.length - bParts.length : 
										bParts.length - aParts.length;
								}
							} else {
								// 其他字段（type/size/mtime）直接比较
								const aValue = a[field] || '';
								const bValue = b[field] || '';
								if (aValue !== bValue) {
									compareResult = aValue > bValue ? 1 : -1;
									compareResult = order === 'asc' ? compareResult : -compareResult;
								}
							}
							
							// 如果当前字段比较结果不为0，则返回该结果
							if (compareResult !== 0) return compareResult;
						}
						// 所有字段都相同，保持原顺序
						return 0;
					});
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
        return ['audio', 'video','img'].includes(item.type);
      },
      back(index) {
        if (index === -1) {
          this.getResource({ path: [] });
        } else {
          this.getResource({ path: this.pathStack.slice(0, index + 1) });
        }
      },
      // 获取排序按钮的CSS类
      getSortBtnClass(field) {
        const sortIndex = this.sortConfig.findIndex(item => item.field === field);
        if (sortIndex === -1) {
          return {};
        }
        return {
          'sort-btn': true,
          'active': true,
          [`sort-level-${sortIndex + 1}`]: true
        };
      },
      // 获取排序方向指示器
      getSortOrderIndicator(field) {
        const sortItem = this.sortConfig.find(item => item.field === field);
        if (!sortItem) {
          return '';
        }
        return sortItem.order === 'asc' ? '↑' : '↓';
      },
      // 切换排序字段
      toggleSortField(field) {
        const existingIndex = this.sortConfig.findIndex(item => item.field === field);
        
        if (existingIndex === -1) {
          // 如果字段不在排序配置中，添加到末尾
          this.sortConfig.push({ field, order: 'asc' });
        } else if (existingIndex === 0 && this.sortConfig.length === 1) {
          // 如果是唯一的排序字段，切换排序方向
          this.sortConfig[existingIndex].order = this.sortConfig[existingIndex].order === 'asc' ? 'desc' : 'asc';
        } else {
          // 如果字段已在排序配置中，调整其优先级
          const [sortItem] = this.sortConfig.splice(existingIndex, 1);
          this.sortConfig.unshift(sortItem);
        }
        
        // 限制最大排序字段数为2
        if (this.sortConfig.length > 2) {
          this.sortConfig.pop();
        }
        
        // 保存排序配置到localStorage
        this.saveSortConfig();
      },
      // 保存排序配置到localStorage
			saveSortConfig() {
				_.$lStorage["VIEW_EXPLORE_SORT_CONFIG"] = this.sortConfig;
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
      },
      toggleToolbar() {
        this.toolbarCollapsed = !this.toolbarCollapsed;
        _.$lStorage["VIEW_EXPLORE_TOOLBAR_COLLAPSED"] = this.toolbarCollapsed;
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
