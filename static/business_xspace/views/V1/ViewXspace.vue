<template>
  <AuthScreen v-if="!isAuthenticated" />
  <div 
    v-else
    class="v1-desktop"
  >
    <!-- Top Bar -->
    <v1-desktop__topbar class="v1-desktop__topbar" />

    <!-- Desktop Area -->
    <div 
      class="v1-desktop__area"
      @dragover="onDragOver"
      @drop="onDrop"
    >
      <!-- Background Logo -->
      <v1-desktop__logo class="v1-desktop__logo">
        <xIcon icon="Monitor" size="400" />
      </v1-desktop__logo>

      <!-- Desktop Icons Grid -->
      <v1-desktop__icons class="v1-desktop__icons">
        <DesktopIcon 
          v-for="shortcut in shortcuts" 
          :key="shortcut.id" 
          :app="shortcut" 
          @click="openApp(shortcut.appId, false, shortcut.data)"
          @unpin="removeShortcut(shortcut.id)"
        />
      </v1-desktop__icons>

      <!-- Bottom Dock -->
      <v1-desktop__dock class="v1-desktop__dock">
        <Dock />
      </v1-desktop__dock>
    </div>
  </div>
</template>

<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
  return {
    inject: ['APP'],
    components: {
      AuthScreen: () => _.$importVue('@/views/v1/components/AuthScreen.vue'),
      TopBar: () => _.$importVue('@/views/v1/components/TopBar.vue'),
      DesktopIcon: () => _.$importVue('@/views/v1/components/DesktopIcon.vue'),
      Dock: () => _.$importVue('@/views/v1/components/Dock.vue')
    },
    provide() {
      return {
        // v1 Desktop Workspace 特有的局部状态（与全局 APP 完全独立）
        system: {
          apps: this.apps,
          shortcuts: this.shortcuts,
          openWindows: this.openWindows,
          activeWindowId: this.activeWindowId,
          pinnedApps: this.pinnedApps,
          // 方法
          pinApp: this.pinApp,
          unpinApp: this.unpinApp,
          addShortcut: this.addShortcut,
          removeShortcut: this.removeShortcut,
          openApp: this.openApp,
          focusWindow: this.focusWindow,
          closeWindow: this.closeWindow,
          minimizeWindow: this.minimizeWindow,
          toggleMaximize: this.toggleMaximize
        }
      };
    },
    data() {
      return {
        apps: [
          { id: 'api', name: 'API Manager', icon: '_database', color: '#6750A4', component: 'ApiManager' },
          { id: 'cicd', name: 'CI/CD', icon: '_ci', color: '#625B71', component: 'CicdManager' },
          { id: 'note', name: 'Documents', icon: '_article', color: '#7D5260', component: 'NoteManager' },
          { id: 'im', name: 'Chat', icon: '_contact', color: '#006A6A', component: 'ImManager' },
          { id: 'rtc', name: 'Meeting', icon: '_webrtc', color: '#B3261E', component: 'RtcManager' },
          { id: 'office', name: 'Cloud Storage', icon: '_cloud_o', color: '#0061A4', component: 'OfficeManager' },
          { id: 'hoppscotch', name: 'API Test', icon: '_hoppscotch', color: '#4F6600', component: 'Hoppscotch' },
          { id: 'explore', name: 'Explore', icon: 'search', color: '#984061', component: 'Explore' },
          { id: 'user', name: 'User', icon: 'user', color: '#006874', component: 'UserManager' },
          { id: 'group', name: 'Group', icon: 'folder', color: '#6750A4', component: 'ApiManager', hidden: true },
          { id: 'project', name: 'Project', icon: 'folder', color: '#6750A4', component: 'ApiManager', hidden: true },
          { id: 'api_folder', name: 'API Folder', icon: 'folder', color: '#6750A4', component: 'ApiManager', hidden: true },
          { id: 'doc_folder', name: 'Doc Folder', icon: 'folder', color: '#6750A4', component: 'ApiManager', hidden: true },
          { id: 'folder', name: 'Folder', icon: 'folder', color: '#6750A4', component: 'ApiManager', hidden: true },
          { id: 'api_endpoint', name: 'API', icon: '_code_o', color: '#6750A4', component: 'ApiManager', hidden: true },
          { id: 'doc', name: 'Document', icon: '_article', color: '#6750A4', component: 'ApiManager', hidden: true },
          { id: 'code', name: 'Code', icon: '_code_o', color: '#6750A4', component: 'ApiManager', hidden: true },
          { id: 'member_list', name: 'Members', icon: 'team', color: '#6750A4', component: 'ApiManager', hidden: true },
          { id: 'setting', name: 'Settings', icon: '_setting_outlined', color: '#6750A4', component: 'ApiManager', hidden: true }
        ],
        shortcuts: [
          { id: 'api', appId: 'api', name: 'API Manager', icon: '_database', color: '#6750A4' },
          { id: 'explore', appId: 'explore', name: 'Explore', icon: 'search', color: '#984061' },
          { id: 'note', appId: 'note', name: 'Documents', icon: '_article', color: '#7D5260' }
        ],
        openWindows: [],
        activeWindowId: null,
        nextZIndex: 10,
        theme: 'light',
        lastOpenedAppId: null,
        pinnedApps: ['api', 'explore']
      };
    },
    computed: {
      isAuthenticated() {
        return this.APP?.user?.isLogin;
      }
    },
    methods: {
      onDragOver(e) {
        e.preventDefault();
        if (e.dataTransfer) {
          e.dataTransfer.dropEffect = 'move';
        }
      },
      onDrop(e) {
        e.preventDefault();
        const action = e.dataTransfer?.getData('action');
        const appId = e.dataTransfer?.getData('text/plain');
        
        if (action === 'unpin' && appId) {
          this.unpinApp(appId);
        }
      },
      pinApp(appId) {
        if (!this.pinnedApps.includes(appId)) {
          this.pinnedApps.push(appId);
        }
      },
      unpinApp(appId) {
        this.pinnedApps = this.pinnedApps.filter(id => id !== appId);
      },
      addShortcut(shortcut) {
        if (!this.shortcuts.find(s => s.id === shortcut.id)) {
          this.shortcuts.push(shortcut);
        }
      },
      removeShortcut(id) {
        const index = this.shortcuts.findIndex(s => s.id === id);
        if (index > -1) {
          this.shortcuts.splice(index, 1);
        }
      },
      openApp(appId, forceNew = false, data) {
        this.lastOpenedAppId = appId;
        setTimeout(() => {
          if (this.lastOpenedAppId === appId) this.lastOpenedAppId = null;
        }, 1000);

        const existing = this.openWindows.find(w => w.appId === appId && (!data || w.data?.id === data.id));
        
        if (!forceNew && existing) {
          const lastActive = [...this.openWindows]
            .reverse()
            .find(w => w.appId === appId && (!data || w.data?.id === data.id) && !w.isMinimized);
          
          if (lastActive) {
            this.focusWindow(lastActive.id);
            return;
          }
          
          existing.isMinimized = false;
          this.focusWindow(existing.id);
          return;
        }

        const app = this.apps.find(a => a.id === appId);
        if (!app) return;

        const id = Math.random().toString(36).substring(7);
        const offset = this.openWindows.filter(w => w.appId === appId).length * 40;
        
        const newWindow = {
          id,
          appId,
          title: data?.name || `${app.name} ${offset > 0 ? `(${Math.floor(offset/40) + 1})` : ''}`,
          zIndex: this.nextZIndex++,
          isMinimized: false,
          isMaximized: false,
          x: 100 + offset,
          y: 50 + offset,
          width: 800,
          height: 600,
          data
        };

        this.openWindows.push(newWindow);
        this.activeWindowId = id;

        // Open window using _.openModal
        _.$openModal({
          title: newWindow.title,
          url: '@/views/v1/components/WindowModal.vue',
          parent: this,
          window: newWindow
        }, {
          fullscreen: newWindow.isMaximized
        });
      },
      focusWindow(id) {
        const win = this.openWindows.find(w => w.id === id);
        if (win) {
          win.zIndex = this.nextZIndex++;
          this.activeWindowId = id;
        }
      },
      closeWindow(id) {
        const index = this.openWindows.findIndex(w => w.id === id);
        if (index > -1) {
          this.openWindows.splice(index, 1);
        }
        if (this.activeWindowId === id) {
          this.activeWindowId = this.openWindows.length > 0 ? this.openWindows[this.openWindows.length - 1].id : null;
        }
      },
      minimizeWindow(id) {
        const win = this.openWindows.find(w => w.id === id);
        if (win) win.isMinimized = true;
      },
      toggleMaximize(id) {
        const win = this.openWindows.find(w => w.id === id);
        if (win) win.isMaximized = !win.isMaximized;
      }
    }
  };
}
</script>

<style lang="less">
.v1-desktop {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: var(--color-background);
  color: var(--color-on-background);
  user-select: none;
  display: flex;
  flex-direction: column;
  position: relative;

  &__topbar {
    position: relative;
    z-index: 100;
  }

  &__area {
    flex: 1;
    position: relative;
    overflow: hidden;
  }

  &__logo {
    position: absolute;
    inset: 0;
    z-index: 0;
    opacity: 0.03;
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__icons {
    position: absolute;
    inset: 0;
    z-index: 10;
    padding: 40px;
    display: grid;
    grid-template-columns: repeat(auto-fill, 100px);
    grid-template-rows: repeat(auto-fill, 110px);
    gap: 16px;
    align-content: start;
    pointer-events: auto;
  }

  &__dock {
    position: absolute;
    bottom: 32px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 50;
    pointer-events: auto;
  }
}

// 基础样式重置
*,
::before,
::after {
  box-sizing: border-box;
  border-width: 0;
  border-style: solid;
  border-color: currentColor;
}

::before,
::after {
  --tw-content: '';
}

html {
  line-height: 1.5;
  -webkit-text-size-adjust: 100%;
  -moz-tab-size: 4;
  tab-size: 4;
  font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-feature-settings: normal;
  font-variation-settings: normal;
}

body {
  margin: 0;
  line-height: inherit;
}

// 窗口过渡动画
.hero-enter-active,
.hero-leave-active {
  transition: all 0.3s ease;
}

.hero-enter-from,
.hero-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
