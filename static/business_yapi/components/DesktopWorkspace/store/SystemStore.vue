<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
  // 应用列表
  const apps = [
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
  ];

  // 初始窗口列表
  const openWindows = [];

  // 固定的应用
  const pinnedApps = ['api', 'project', 'explore'];

  // 桌面快捷方式
  const shortcuts = [
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
  ];

  // 多桌面
  const desktops = [
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
  ];

  // 当前活动桌面
  let currentDesktopId = 'desktop-1';

  // 当前活动窗口 ID
  let activeWindowId = null;

  // 最后打开的应用 ID
  let lastOpenedAppId = null;

  // 生成唯一 ID
  const generateId = () => {
    return 'id-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
  };

  // 初始化系统
  const init = () => {
    // 可以从本地存储或 API 加载之前的状态
    loadState();
  };

  // 保存状态
  const saveState = async () => {
    try {
      const state = {
        openWindows,
        pinnedApps,
        shortcuts,
        desktops,
        currentDesktopId,
        activeWindowId
      };
      // 保存到本地存储作为备份
      localStorage.setItem('desktop-workspace-state', JSON.stringify(state));
      // 保存到服务器
      if (window._api && window._api.xspace && window._api.xspace.saveDesktopState) {
        try {
          await window._api.xspace.saveDesktopState(state);
        } catch (apiError) {
          console.error('API 保存状态失败，使用本地存储:', apiError);
        }
      }
    } catch (error) {
      console.error('保存状态失败:', error);
    }
  };

  // 加载状态
  const loadState = async () => {
    try {
      // 尝试从服务器加载
      if (window._api && window._api.xspace && window._api.xspace.loadDesktopState) {
        try {
          const response = await window._api.xspace.loadDesktopState();
          if (response && response.data) {
            const state = response.data;
            // 恢复状态
            if (state.openWindows) {
              openWindows.length = 0;
              openWindows.push(...state.openWindows);
            }
            if (state.pinnedApps) {
              pinnedApps.length = 0;
              pinnedApps.push(...state.pinnedApps);
            }
            if (state.shortcuts) {
              shortcuts.length = 0;
              shortcuts.push(...state.shortcuts);
            }
            if (state.desktops) {
              desktops.length = 0;
              desktops.push(...state.desktops);
            }
            if (state.currentDesktopId) {
              currentDesktopId = state.currentDesktopId;
            }
            if (state.activeWindowId) {
              activeWindowId = state.activeWindowId;
            }
            return;
          }
        } catch (apiError) {
          console.error('API 加载状态失败，使用本地存储:', apiError);
        }
      }
      
      // 从本地存储加载
      const savedState = localStorage.getItem('desktop-workspace-state');
      if (savedState) {
        const state = JSON.parse(savedState);
        // 恢复状态
        if (state.openWindows) {
          openWindows.length = 0;
          openWindows.push(...state.openWindows);
        }
        if (state.pinnedApps) {
          pinnedApps.length = 0;
          pinnedApps.push(...state.pinnedApps);
        }
        if (state.shortcuts) {
          shortcuts.length = 0;
          shortcuts.push(...state.shortcuts);
        }
        if (state.desktops) {
          desktops.length = 0;
          desktops.push(...state.desktops);
        }
        if (state.currentDesktopId) {
          currentDesktopId = state.currentDesktopId;
        }
        if (state.activeWindowId) {
          activeWindowId = state.activeWindowId;
        }
      }
    } catch (error) {
      console.error('加载状态失败:', error);
    }
  };

  // 打开应用
  const openApp = (appId, forceNew = false, data = null) => {
    const app = apps.find(a => a.id === appId);
    if (!app) return;

    lastOpenedAppId = appId;

    // 如果不是强制打开新窗口，检查是否已有该应用的窗口
    if (!forceNew) {
      const existingWindow = openWindows.find(win => win.appId === appId && (!data || JSON.stringify(win.data) === JSON.stringify(data)));
      if (existingWindow) {
        focusWindow(existingWindow.id);
        return;
      }
    }

    // 创建新窗口
    const newWindow = {
      id: generateId(),
      appId: app.id,
      title: app.name,
      x: 100 + (openWindows.length * 20),
      y: 100 + (openWindows.length * 20),
      width: 800,
      height: 600,
      isMinimized: false,
      isMaximized: false,
      zIndex: openWindows.length + 1,
      data: data,
      desktopId: currentDesktopId
    };

    openWindows.push(newWindow);
    focusWindow(newWindow.id);
    saveState();
  };

  // 关闭窗口
  const closeWindow = (windowId) => {
    const index = openWindows.findIndex(win => win.id === windowId);
    if (index > -1) {
      openWindows.splice(index, 1);
      // 如果关闭的是活动窗口，设置新的活动窗口
      if (activeWindowId === windowId) {
        activeWindowId = openWindows.length > 0 ? openWindows[openWindows.length - 1].id : null;
      }
      saveState();
    }
  };

  // 最小化窗口
  const minimizeWindow = (windowId) => {
    const window = openWindows.find(win => win.id === windowId);
    if (window) {
      window.isMinimized = true;
      // 最小化后，设置其他窗口为活动窗口
      const otherWindow = openWindows.find(win => win.id !== windowId && !win.isMinimized);
      if (otherWindow) {
        focusWindow(otherWindow.id);
      } else {
        activeWindowId = null;
      }
      saveState();
    }
  };

  // 最大化窗口
  const toggleMaximize = (windowId) => {
    const window = openWindows.find(win => win.id === windowId);
    if (window) {
      window.isMaximized = !window.isMaximized;
      saveState();
    }
  };

  // 聚焦窗口
  const focusWindow = (windowId) => {
    const window = openWindows.find(win => win.id === windowId);
    if (window) {
      // 将窗口置于最上层
      const maxZIndex = Math.max(...openWindows.map(win => win.zIndex), 0);
      window.zIndex = maxZIndex + 1;
      window.isMinimized = false;
      activeWindowId = windowId;
      saveState();
    }
  };

  // 固定应用到任务栏
  const pinApp = (appId) => {
    if (!pinnedApps.includes(appId)) {
      pinnedApps.push(appId);
      saveState();
    }
  };

  // 取消固定应用
  const unpinApp = (appId) => {
    const index = pinnedApps.indexOf(appId);
    if (index > -1) {
      pinnedApps.splice(index, 1);
      saveState();
    }
  };

  // 添加快捷方式
  const addShortcut = (shortcut) => {
    shortcuts.push(shortcut);
    saveState();
  };

  // 移除快捷方式
  const removeShortcut = (shortcutId) => {
    const index = shortcuts.findIndex(s => s.id === shortcutId);
    if (index > -1) {
      shortcuts.splice(index, 1);
      saveState();
    }
  };

  // 创建新桌面
  const createDesktop = () => {
    const newDesktop = {
      id: generateId(),
      name: `桌面 ${desktops.length + 1}`,
      windows: [],
      background: {
        type: 'default',
        url: '',
        color: '#f0f2f5',
        opacity: 1
      }
    };
    desktops.push(newDesktop);
    currentDesktopId = newDesktop.id;
    saveState();
    return newDesktop;
  };

  // 切换桌面
  const switchDesktop = (desktopId) => {
    const desktop = desktops.find(d => d.id === desktopId);
    if (desktop) {
      currentDesktopId = desktopId;
      saveState();
    }
  };

  // 重命名桌面
  const renameDesktop = (desktopId, name) => {
    const desktop = desktops.find(d => d.id === desktopId);
    if (desktop) {
      desktop.name = name;
      saveState();
    }
  };

  // 删除桌面
  const deleteDesktop = (desktopId) => {
    if (desktops.length > 1) {
      const index = desktops.findIndex(d => d.id === desktopId);
      if (index > -1) {
        // 将该桌面的窗口移动到其他桌面
        const desktopWindows = openWindows.filter(win => win.desktopId === desktopId);
        const otherDesktop = desktops.find(d => d.id !== desktopId);
        if (otherDesktop) {
          desktopWindows.forEach(win => {
            win.desktopId = otherDesktop.id;
          });
        }
        // 删除桌面
        desktops.splice(index, 1);
        // 如果删除的是当前桌面，切换到其他桌面
        if (currentDesktopId === desktopId) {
          currentDesktopId = desktops[0].id;
        }
        saveState();
      }
    }
  };

  // 更新桌面背景
  const updateDesktopBackground = (desktopId, background) => {
    const desktop = desktops.find(d => d.id === desktopId);
    if (desktop) {
      desktop.background = { ...desktop.background, ...background };
      saveState();
    }
  };

  // 为窗口添加groupId和projectId
  const updateWindowGroupAndProject = (windowId, groupId, projectId) => {
    const window = openWindows.find(win => win.id === windowId);
    if (window) {
      window.groupId = groupId;
      window.projectId = projectId;
      saveState();
    }
  };

  // 导出系统状态管理对象
  return {
    apps,
    openWindows,
    pinnedApps,
    shortcuts,
    desktops,
    currentDesktopId,
    activeWindowId,
    lastOpenedAppId,
    init,
    openApp,
    closeWindow,
    minimizeWindow,
    toggleMaximize,
    focusWindow,
    pinApp,
    unpinApp,
    addShortcut,
    removeShortcut,
    createDesktop,
    switchDesktop,
    renameDesktop,
    deleteDesktop,
    updateDesktopBackground,
    updateWindowGroupAndProject,
    saveState,
    loadState
  };
}
</script>