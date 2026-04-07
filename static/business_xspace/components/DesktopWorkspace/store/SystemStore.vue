<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
  // 确保 Vue 可用
  const Vue = window.Vue;
  
  // 生成唯一 ID
  const generateId = function() {
    return 'id-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
  };

  // 使用 Vue.observable 创建响应式状态
  const state = Vue.observable({
    // 全局环境
    currentEnvironment: 'Development',
    environments: [
      { id: 'Development', name: 'Development', color: '#52C41A' },
      { id: 'Test', name: 'Test', color: '#165DFF' },
      { id: 'Staging', name: 'Staging', color: '#FAAD14' },
      { id: 'Production', name: 'Production', color: '#FF4D4F' }
    ],

    // 应用列表
    apps: [
      {
        id: 'api',
        name: 'API 管理',
        icon: 'LayoutGrid',
        color: '#3182ce',
        component: 'ApiManager'
      },
      {
        id: 'project',
        name: '项目管理',
        icon: 'Folder',
        color: '#67c23a',
        component: 'ProjectManager'
      },
      {
        id: 'doc',
        name: '文档管理',
        icon: 'FileText',
        color: '#e6a23c',
        component: 'DocManager'
      },
      {
        id: 'explore',
        name: '资源浏览',
        icon: 'Compass',
        color: '#f56c6c',
        component: 'Explore'
      },
      {
        id: 'settings',
        name: '系统设置',
        icon: 'Settings',
        color: '#909399',
        component: 'Settings'
      }
    ],

    // 初始窗口列表
    openWindows: [],

    // 固定的应用
    pinnedApps: ['api', 'project', 'explore'],

    // 桌面快捷方式
    shortcuts: [
      {
        id: 'shortcut-api',
        appId: 'api',
        name: 'API 管理',
        icon: 'LayoutGrid',
        color: '#3182ce',
        data: null
      },
      {
        id: 'shortcut-project',
        appId: 'project',
        name: '项目管理',
        icon: 'Folder',
        color: '#67c23a',
        data: null
      }
    ],

    // 多桌面
    desktops: [
      {
        id: 'desktop-1',
        name: '桌面 1',
        windows: [],
        background: {
          type: 'default',
          url: '',
          color: '#f0f2f5',
          opacity: 1
        }
      }
    ],

    // 当前活动桌面
    currentDesktopId: 'desktop-1',

    // 当前活动窗口 ID
    activeWindowId: null,

    // 最后打开的应用 ID
    lastOpenedAppId: null
  });

  // 保存状态
  const saveState = async () => {
    try {
      const stateToSave = {
        openWindows: state.openWindows,
        pinnedApps: state.pinnedApps,
        shortcuts: state.shortcuts,
        desktops: state.desktops,
        currentDesktopId: state.currentDesktopId,
        activeWindowId: state.activeWindowId
      };
      // 保存到本地存储作为备份
      localStorage.setItem('desktop-workspace-state', JSON.stringify(stateToSave));
      // 保存到服务器
      const api = _.$api;
      if (api && api.xspace && api.xspace.saveDesktopState) {
        try {
          await api.xspace.saveDesktopState(stateToSave);
        } catch (apiError) {
          console.error('API 保存状态失败，使用本地存储:', apiError);
        }
      }
    } catch (error) {
      console.error('保存状态失败:', error);
    }
  };

  // 加载状态
  const loadState = async function() {
    try {
      // 尝试从服务器加载
      var api = _.$api;
      if (api && api.xspace && api.xspace.loadDesktopState) {
        try {
          var response = await api.xspace.loadDesktopState();
          if (response && response.data) {
            var loadedState = response.data;
            // 恢复状态
            if (loadedState.openWindows) {
              state.openWindows.splice(0, state.openWindows.length, ...loadedState.openWindows);
            }
            if (loadedState.pinnedApps) {
              state.pinnedApps.splice(0, state.pinnedApps.length, ...loadedState.pinnedApps);
            }
            if (loadedState.shortcuts) {
              state.shortcuts.splice(0, state.shortcuts.length, ...loadedState.shortcuts);
            }
            if (loadedState.desktops) {
              state.desktops.splice(0, state.desktops.length, ...loadedState.desktops);
            }
            if (loadedState.currentDesktopId) {
              state.currentDesktopId = loadedState.currentDesktopId;
            }
            if (loadedState.activeWindowId) {
              state.activeWindowId = loadedState.activeWindowId;
            }
            return;
          }
        } catch (apiError) {
          console.error('API 加载状态失败，使用本地存储:', apiError);
        }
      }
      
      // 从本地存储加载
      var savedState = localStorage.getItem('desktop-workspace-state');
      if (savedState) {
        var loadedState = JSON.parse(savedState);
        // 恢复状态
        if (loadedState.openWindows) {
          state.openWindows.splice(0, state.openWindows.length, ...loadedState.openWindows);
        }
        if (loadedState.pinnedApps) {
          state.pinnedApps.splice(0, state.pinnedApps.length, ...loadedState.pinnedApps);
        }
        if (loadedState.shortcuts) {
          state.shortcuts.splice(0, state.shortcuts.length, ...loadedState.shortcuts);
        }
        if (loadedState.desktops) {
          state.desktops.splice(0, state.desktops.length, ...loadedState.desktops);
        }
        if (loadedState.currentDesktopId) {
          state.currentDesktopId = loadedState.currentDesktopId;
        }
        if (loadedState.activeWindowId) {
          state.activeWindowId = loadedState.activeWindowId;
        }
      }
    } catch (error) {
      console.error('加载状态失败:', error);
    }
  };

  // 打开应用
  const openApp = function(appId, forceNew, data) {
    if (forceNew === undefined) forceNew = false;
    if (data === undefined) data = null;
    
    var app = state.apps.find(function(a) { return a.id === appId; });
    if (!app) return;

    state.lastOpenedAppId = appId;

    // 如果不是强制打开新窗口，检查是否已有该应用的窗口
    if (!forceNew) {
      var existingWindow = state.openWindows.find(function(win) {
        return win.appId === appId && (!data || JSON.stringify(win.data) === JSON.stringify(data));
      });
      if (existingWindow) {
        focusWindow(existingWindow.id);
        return;
      }
    }

    // 创建新窗口
    var newWindow = {
      id: generateId(),
      appId: app.id,
      title: data ? data.name : app.name,
      x: 100 + (state.openWindows.length * 20),
      y: 100 + (state.openWindows.length * 20),
      width: 800,
      height: 600,
      isMinimized: false,
      isMaximized: false,
      zIndex: state.openWindows.length + 1,
      data: data,
      desktopId: state.currentDesktopId
    };

    state.openWindows.push(newWindow);
    focusWindow(newWindow.id);
    saveState();
  };

  // 关闭窗口
  const closeWindow = function(windowId) {
    var index = state.openWindows.findIndex(function(win) { return win.id === windowId; });
    if (index > -1) {
      state.openWindows.splice(index, 1);
      // 如果关闭的是活动窗口，设置新的活动窗口
      if (state.activeWindowId === windowId) {
        state.activeWindowId = state.openWindows.length > 0 ? state.openWindows[state.openWindows.length - 1].id : null;
      }
      saveState();
    }
  };

  // 最小化窗口
  const minimizeWindow = function(windowId) {
    var window = state.openWindows.find(function(win) { return win.id === windowId; });
    if (window) {
      window.isMinimized = true;
      // 最小化后，设置其他窗口为活动窗口
      var otherWindow = state.openWindows.find(function(win) { return win.id !== windowId && !win.isMinimized; });
      if (otherWindow) {
        focusWindow(otherWindow.id);
      } else {
        state.activeWindowId = null;
      }
      saveState();
    }
  };

  // 最大化窗口
  const toggleMaximize = function(windowId) {
    var window = state.openWindows.find(function(win) { return win.id === windowId; });
    if (window) {
      window.isMaximized = !window.isMaximized;
      saveState();
    }
  };

  // 聚焦窗口
  const focusWindow = function(windowId) {
    var window = state.openWindows.find(function(win) { return win.id === windowId; });
    if (window) {
      // 将窗口置于最上层
      var maxZIndex = Math.max.apply(null, state.openWindows.map(function(win) { return win.zIndex; }).concat([0]));
      window.zIndex = maxZIndex + 1;
      window.isMinimized = false;
      state.activeWindowId = windowId;
      saveState();
    }
  };

  // 固定应用到任务栏
  const pinApp = function(appId) {
    if (!state.pinnedApps.includes(appId)) {
      state.pinnedApps.push(appId);
      saveState();
    }
  };

  // 取消固定应用
  const unpinApp = function(appId) {
    var index = state.pinnedApps.indexOf(appId);
    if (index > -1) {
      state.pinnedApps.splice(index, 1);
      saveState();
    }
  };

  // 添加快捷方式
  const addShortcut = function(shortcut) {
    state.shortcuts.push(shortcut);
    saveState();
  };

  // 移除快捷方式
  const removeShortcut = function(shortcutId) {
    var index = state.shortcuts.findIndex(function(s) { return s.id === shortcutId; });
    if (index > -1) {
      state.shortcuts.splice(index, 1);
      saveState();
    }
  };

  // 创建新桌面
  const createDesktop = function() {
    var newDesktop = {
      id: generateId(),
      name: '桌面 ' + (state.desktops.length + 1),
      windows: [],
      background: {
        type: 'default',
        url: '',
        color: '#f0f2f5',
        opacity: 1
      }
    };
    state.desktops.push(newDesktop);
    state.currentDesktopId = newDesktop.id;
    saveState();
    return newDesktop;
  };

  // 切换桌面
  const switchDesktop = function(desktopId) {
    state.currentDesktopId = desktopId;
    saveState();
  };

  // 重命名桌面
  const renameDesktop = function(desktopId, name) {
    var desktop = state.desktops.find(function(d) { return d.id === desktopId; });
    if (desktop) {
      desktop.name = name;
      saveState();
    }
  };

  // 删除桌面
  const deleteDesktop = function(desktopId) {
    if (state.desktops.length > 1) {
      var index = state.desktops.findIndex(function(d) { return d.id === desktopId; });
      if (index > -1) {
        // 将该桌面的窗口移动到其他桌面
        var desktopWindows = state.openWindows.filter(function(win) { return win.desktopId === desktopId; });
        var otherDesktop = state.desktops.find(function(d) { return d.id !== desktopId; });
        if (otherDesktop) {
          desktopWindows.forEach(function(win) {
            win.desktopId = otherDesktop.id;
          });
        }
        // 删除桌面
        state.desktops.splice(index, 1);
        // 如果删除的是当前桌面，切换到其他桌面
        if (state.currentDesktopId === desktopId) {
          state.currentDesktopId = state.desktops[0].id;
        }
        saveState();
      }
    }
  };

  // 更新桌面背景
  const updateDesktopBackground = function(desktopId, background) {
    var desktop = state.desktops.find(function(d) { return d.id === desktopId; });
    if (desktop) {
      desktop.background = Object.assign({}, desktop.background, background);
      saveState();
    }
  };

  // 切换全局环境
  const switchEnvironment = function(envId) {
    var env = state.environments.find(function(e) { return e.id === envId; });
    if (env) {
      state.currentEnvironment = envId;
      saveState();
    }
  };

  // 获取当前环境信息
  const getCurrentEnvironment = function() {
    return state.environments.find(function(e) { return e.id === state.currentEnvironment; });
  };

  // 批量移动资源
  const batchMoveResources = function(resourceIds, targetParentId) {
    console.log('批量移动资源:', resourceIds, '到:', targetParentId);
    saveState();
    return true;
  };

  // 批量复制资源
  const batchCopyResources = function(resourceIds) {
    console.log('批量复制资源:', resourceIds);
    saveState();
    return true;
  };

  // 批量删除资源
  const batchDeleteResources = function(resourceIds) {
    console.log('批量删除资源:', resourceIds);
    // 触发删除确认事件
    if (typeof _ !== 'undefined' && _.$emit) {
      _.$emit('batch-delete-resources', resourceIds);
    }
    saveState();
    return true;
  };

  // 重新排序窗口（用于拖拽排序）
  const reorderWindows = function(windowId, targetIndex) {
    var currentIndex = -1;
    for (var i = 0; i < state.openWindows.length; i++) {
      if (state.openWindows[i].id === windowId) {
        currentIndex = i;
        break;
      }
    }
    
    if (currentIndex === -1 || currentIndex === targetIndex) return;
    
    var window = state.openWindows.splice(currentIndex, 1)[0];
    var insertIndex = targetIndex > currentIndex ? targetIndex - 1 : targetIndex;
    state.openWindows.splice(insertIndex, 0, window);
    
    saveState();
  };

  // 为窗口添加 groupId 和 projectId
  const updateWindowGroupAndProject = function(windowId, groupId, projectId) {
    var window = state.openWindows.find(function(win) { return win.id === windowId; });
    if (window) {
      window.groupId = groupId;
      window.projectId = projectId;
      saveState();
    }
  };

  // 初始化系统
  const init = function() {
    loadState();
  };

  // 导出系统状态管理对象 - 将所有方法添加到 state 对象
  state.init = init;
  state.saveState = saveState;
  state.loadState = loadState;
  state.openApp = openApp;
  state.closeWindow = closeWindow;
  state.minimizeWindow = minimizeWindow;
  state.toggleMaximize = toggleMaximize;
  state.focusWindow = focusWindow;
  state.pinApp = pinApp;
  state.unpinApp = unpinApp;
  state.addShortcut = addShortcut;
  state.removeShortcut = removeShortcut;
  state.createDesktop = createDesktop;
  state.switchDesktop = switchDesktop;
  state.renameDesktop = renameDesktop;
  state.deleteDesktop = deleteDesktop;
  state.updateDesktopBackground = updateDesktopBackground;
  state.updateWindowGroupAndProject = updateWindowGroupAndProject;
  state.switchEnvironment = switchEnvironment;
  state.getCurrentEnvironment = getCurrentEnvironment;
  state.batchMoveResources = batchMoveResources;
  state.batchCopyResources = batchCopyResources;
  state.batchDeleteResources = batchDeleteResources;
  state.reorderWindows = reorderWindows;
  
  return state;
}
</script>
